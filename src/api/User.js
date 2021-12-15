import React , {useEffect, useState} from 'react';

function Word() {
    const [data, setdata] = useState(undefined);
    const [username, setusername] = useState()

        useEffect (() => {
            (async () => {
                const newData = await getData();
                setdata(newData);
            })();
            return () => {};
        }, []);

        constgetData = async () => {
            const dataJson = await fetch(" https://animalfinderapi.herokuapp.com/user/:id");
            return await dataJson.json();
        };

        const postData = async () => {
            const dataJson = await fetch(" https://animalfinderapi.herokuapp.com/game", {
                body: JSON.stringify({
                    methode:'POST',
                    username: "",
                    iswin: false,
                    username
                })
            });
            return await dataJson.json();
        };
        if (!data){
            return<p>waiting</p>
        }
    return (
        <div>
            <p>{data.results[0].name.first}</p>
        </div>
    )
}

export default Word
