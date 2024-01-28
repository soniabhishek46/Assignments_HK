
function Card({name, description, social, interests, id, setFlag, setEditData}){
    function onEdit(){
        setEditData({flag: true, card: {id, name, description, social, interests}});
    }

    function onDelete(){
        fetch('http://localhost:3200/api/v1/card/'+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }  
        }).then((res)=>{
            alert('Deleted!');
            setFlag(fl=> !fl);
        })
    }

    return(
        <div className="rounded-lg shadow-md px-4 py-4 text-slate-600 flex flex-col gap-2 mx-2 my-2 bg-orange-50" key={id} >
            <div className='text-3xl'>{name}</div>
            <div>{description}</div>
            <div className="flex gap-2">
            {social.map(s => {
                return <button className="bg-orange-300 rounded-lg px-8 py-2 text-sm">{s}</button>
            })}
            </div>
            <div className="">Interests</div>
            <ul>
            {interests.map(intst => {
                return <li className="text-sm">{intst}</li>
            })}
            </ul>
            <div className="flex gap-2">
                <button className="bg-green-400 rounded-lg px-8 py-2 text-sm" onClick={onEdit} >Edit</button>
                <button className="bg-red-400 rounded-lg px-8 py-2 text-sm" onClick={onDelete} >Delete</button>
            </div>
        </div>
    );
}

export default Card;