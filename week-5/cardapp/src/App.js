import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import { useEffect, useState } from 'react';
import { useCards } from './hooks/useCards';
import { CardForm } from './components/card-form';


function App() {
  const [flag, setFlag] = useState(false);
  const [editData, setEditData] = useState({flag: false, card: {name: '', description: '', social: [''], interests: ['']}});

  const cards = useCards(flag);

  return (
    <div className='w-[50%]'>
      <CardForm setFlag={setFlag} editData={editData} setEditData={setEditData} />
      {cards.map((crd)=>{
        return (
        <Card name={crd.username}
        description={crd.description} 
        social={crd.social}
        interests={crd.interests}
        id={crd._id}
        setFlag={setFlag}
        setEditData={setEditData}
        />)
      })}
    </div>
  );
}

export default App;
