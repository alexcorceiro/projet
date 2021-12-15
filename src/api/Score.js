import React , {useEffect, useState} from 'react';

function Score() {
    const [data, setdata] = useState(undefined);
    const [username, setusername] = useState(undefined);
    const [score, setscore] = useState([]);

        useEffect (() => {
            (async () => {
                const newData = await getData();
                setdata(newData);
            })();
            return () => {};
        }, []);

        constgetData = async () => {
            const dataJson = await fetch(" https://animalfinderapi.herokuapp.com/score");
            return await dataJson.json();
        };
        const

        if (!data){
            return<p>waiting</p>
        }
    return <p>{data.results[0].name.first}</p>
    
    }

export default Score
