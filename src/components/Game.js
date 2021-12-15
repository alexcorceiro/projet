import React, { useEffect, useState } from "react";
import User from '../api/User';
import Score from '../api/Score';
import word from '../api/word';
import Modal, { modalStatus } from "Modal";
import "./Game.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import alphabe from './Keyboard';

const letters = {
  letterFail: [],
  letterSuccess: [],
};

const tentative = 10;

const info = {
  visible: false,
  isWin: false,
};

const GOOD_LETTER = "azertyuiopqsdfghjklmwxcvbnéàèôêâ";

function Game(props) {
  const [randomWord, setrandomWord] = useState(undefined);
  const [letterTry, setletterTry] = useState(letters);
  const [nbtentative, setnbLuck] = useState(tentative);
  const [modalInfo, setmodalInfo] = useState(info);
  const alphabe = data(
    () =>
      randomWord
        ? randomWord.alphabe && randomWord.alphabe.toLowerCase().split("")
        : [],
    [randomWord]
  );

  const handleUserKeyPress = ( ({ key }) => {
      
      if (
        letterTry.letterFail.includes(key) ||
        letterTry.letterSuccess.includes(key)
      ) {
        toast(` lettre deja utiliser : ${key}`);
        return null;
      }

      if (alphabe.includes(key)) {
        setletterTry({
          letterFail: letterTry.letterFail,
          letterSuccess: [...letterTry.letterSuccess, key],
        });

      }else {
        setletterTry({
          letterSuccess: letterTry.letterSuccess,
          letterFail: [...letterTry.letterFail, key],
        });
        setnbLuck(nbtentative - 1);
      }

      if (nbtentative === 1) {
        return setmodalInfo({
          isWin: false,
          visible: true,
        });
      }
      if (alphabe.every((el) => [...letterTry.letterSuccess, key].includes(el))) {
        return setmodalInfo({
          isWin: true,
          visible: true,
        });
      }
    },
    [letterTry.letterFail, letterTry.letterSuccess, nbtentative, alphabe]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    getRandomWord();
  }, []);

  const getRandomWord = async () => {
    const { data } = await User.getRandomWord();
    console.log(data.alphabe);
    const firstLetter = data.alphabe[0].toLowerCase();
    setletterTry({ letterFail: [], letterSuccess: [firstLetter] });
    setrandomWord(data);
  };
  const postScore = async () => {
    const body = {
      isWin: modalInfo.isWin,
      ...randomWord,
      username: props.username,
    };
    await User.postGame(body);

    props.onUpdateScore();
    setnbLuck(tentative);
    setmodalInfo(info);
    getRandomWord();
  };

  const onValid = () => {
    postScore();
  };

  return (
    <div className="games">
      <ToastContainer />
      <Modal
        visibility={modalInfo.visible}
        status={modalInfo.isWin 
            ? modalStatus.sucess 
            : modalStatus.fail}
        title={modalInfo.isWin 
            ? "tu a Gagner ! " 
            : "tu as perdu "}
        onValid={onValid}
      />

      <div> Nombre d'essai restant: {nbtentative}</div>

      <p>Lettre éssayé : {letterTry.letterFail+", "}</p>
      <div className="letter2">
        {alphabe.map((el, index) => (
          <div key={index} className="letter1">
            {letterTry.letterSuccess.includes(el) && el}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Game;
