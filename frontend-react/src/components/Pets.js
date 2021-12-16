import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useRef, useContext } from "react";
import { Input, Button } from 'antd';
import './App.css';
import { addPet, removePet } from "../store/actions";
import { Context } from "../store";

function Pets(pets) {
    const [state, dispatch] = useContext(Context);
    const [ename, setEName] = useState("");
    const [edob, setEDob] = useState("");
    const [especies, setESpecies] = useState("");
    const [age, setAge] = useState("");
    const inputRefe1 = useRef(null);
    const inputRefe2 = useRef(null);
    const inputRefe3 = useRef(null);
    const today = new Date();

    const handleDelete = (pet) => {
        fetch('http://localhost:8081/api/pet/delete/' + pet._id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
            },
        })
        .then(data => { 
            return data.json();
        }).then(async (data) => {
            console.log(data);
            await dispatch(removePet(pet));
        });         
    }

    const handleUpdate = async (pet) => {
        const changedPet = {
            ...pet,
            name: ename,
            dateOfBirth: edob,
            type: especies,
        }
        await fetch('http://localhost:8081/api/pet/update/' + pet.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
        },
          body: JSON.stringify(changedPet),
        })
        .then(async (data) => {
            await data.json();
            console.log(data);
            await dispatch(removePet(pet._id));
            await dispatch(addPet(changedPet));
        })
        
    }
    
    return (
        <ul>  
        {state.pets.data.map((pet) => (
            <li key={pet._id} className='containe'>
                <div className="subcon" >
                    {pet.name}<br/>
                    {pet.type}<br/>
                    {(today - pet.dateOfBirth)/86400000/365>1?`${parseInt((today - pet.dateOfBirth)/86400000/365)} aastat, ${parseInt((today - pet.dateOfBirth)/86400000/30)-parseInt((today - pet.dateOfBirth)/86400000/30/12)*12} kuud, ${parseInt((today - pet.dateOfBirth)/86400000)-parseInt((today - pet.dateOfBirth)/86400000/30)*30} päeva`:(((today - pet.dateOfBirth)/86400000/365)==0 && (today - pet.dateOfBirth)/86400000/30>1?`${parseInt((today - pet.dateOfBirth)/86400000/30)} kuud, ${parseInt((today - pet.dateOfBirth)/86400000)-parseInt((today - pet.dateOfBirth)/86400000/30)*30} päeva`:((today - pet.dateOfBirth)/86400000/365)==0 && ((today - pet.dateOfBirth)/86400000/30==0 && (today - pet.dateOfBirth)/86400000>1?`${parseInt((today - pet.dateOfBirth)/86400000)} päeva`:'0 päeva'))}
                </div>
                <div className="subcon" >
                    {/* <img src=".../public/logo192.png"></img> */}
                    <Button type="submit" onClick={handleDelete(pet)}>Kustuta</Button><br/>
                    <Popup trigger={<button>Muuda</button>}>
                        <form>    
                            <label>Mis on looma nimi?</label><br/>
                            <Input placeholder="Nimi" value={pet.name} ref={inputRefe1} type="text" value={ename} onChange={(e) => setEName( e.target.value)} autoFocus /><br/>
                            <label>Mis on looma sünnikuupäev?</label><br/>
                            <Input placeholder="Sünnikuupäev" value={pet.dateOfBirth} ref={inputRefe2} type="text" value={edob} onChange={(e) => setEDob(e.target.value)} /><br/>
                            <label>Mis on looma liik?</label><br/>
                            <Input placeholder="Liik" value={pet.type} ref={inputRefe3} type="text" value={especies} onChange={(e) => setESpecies(e.target.value)} /><br/>
                            <Button type="submit" onClick={handleUpdate(pet)} type="primary">Sisesta</Button>
                        </form>
                    </Popup>
                </div>
            </li>
        ))}
        </ul>
    )
}

export default Pets;