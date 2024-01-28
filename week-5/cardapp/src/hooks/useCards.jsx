import { useState, useEffect } from "react";


export function useCards(flag){
    const [cards, setCards] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:3200/api/v1/cards/')
        .then((res)=>{
            return res.json();
        })
        .then((d)=>{
          console.log(d);
          setCards(d.cards);
        })
      },
     [flag]);
    
     return cards;
}