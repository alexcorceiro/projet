import React from 'react';


export default function Keyboard(){
    const alphabe = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
    const listItems = alphabe.map((alphabe) => <button onClick={handleClick}>{alphabe}</button>)
    return (
       listItems
    )
}