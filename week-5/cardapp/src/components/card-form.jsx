import { useEffect, useState } from "react"

export function CardForm({setFlag, editData, setEditData}){
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [social, setSocial] = useState([]);
    const [interests, setInterests] = useState([]);

    useEffect(()=>{
        if (editData.flag){
        setUsername(editData.card.name);
        setDescription(editData.card.description);
        setSocial(editData.card.social);
        setInterests(editData.card.interests);
        }
    }, [editData])

    function onSave(){
        if(!editData.flag){
            fetch('http://localhost:3200/api/v1/add-card', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, description, social, interests}),
            })
            .then((d)=>reset_inputs())
        }
        else{
            fetch('http://localhost:3200/api/v1/update-card/', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: editData.card.id, username, description, social, interests}),
            })
            .then((d)=>reset_inputs())
        }
    }

    function reset_inputs(){
        setUsername('');
        setDescription('');
        setSocial([]);
        setInterests([]);
        setFlag((fl)=>!fl);
        setEditData({flag: false, card: {name: '', description: '', social: [''], interests: ['']}});
    }

    return(
        <div className="flex flex-col text-slate-600 px-4 py-4 gap-2">
            <label>Name</label>
            <input onChange={(e)=> setUsername(e.target.value)} value={username} className="border border-grey-600 rounded-lg px-2 py-1 outline-none"></input>
            <label>Description</label>
            <input onChange={(e)=> setDescription(e.target.value)} value = {description} className="border border-grey-600 rounded-lg px-2 py-1 outline-none"></input>
            <label>Social (Comma separated values)</label>
            <input onChange={(e)=> setSocial(e.target.value.split(','))} value = {social.join(',')} className="border border-grey-600 rounded-lg px-2 py-1 outline-none"></input>
            <label>Interests (Comma separated values)</label>
            <input onChange={(e)=> setInterests(e.target.value.split(','))} value={interests.join(',')} className="border border-grey-600 rounded-lg px-2 py-1 outline-none"></input>
            <button className="bg-blue-400 rounded-lg px-4 py-2" onClick={onSave}>Save</button>
        </div>
    )
}