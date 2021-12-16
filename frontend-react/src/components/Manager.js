import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button } from 'antd';
import './App.css';
import Pets from './Pets';
import Logout from "./Logout";
import { Context } from "../store";
import { updatePets, addPet } from "../store/actions";

function Manager () {
    const [state, dispatch] = useContext(Context);
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [species, setSpecies] = useState("");
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    
    useEffect(()=>{
        fetch('http://localhost:8081/api/pet/user/'+state.auth.user.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + state.auth.token,
            },
        }).then(data => { 
            return data.json();
        }).then(async (data) => {
            console.log(data.body);
            await dispatch(updatePets(data.body));
            console.log(state);
        }); 
    },[]); 


    const handleSubmit = (e) => {
        e.preventDefault();
        const pet = {
            name,
            dateOfBirth: dob,
            type: species,
            user: state.auth.user.id,
        }
        fetch('http://localhost:8081/api/pet/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
          },
          body: JSON.stringify(pet),
        })
        .then(data => { 
            return data.json();
        }).then(async (data) => {
            console.log(data);
            await dispatch(addPet(pet));
        });         
    }


    const handleClick = () => {
        if (showAdd) {
            setShowAdd(false);
        } else setShowAdd(true);
    } 
      
 

    return(
        <>
            <Logout/>
            <div class = "main">
                <h2>Halda looma</h2>
                <Pets pets={state.pets.data} />
                <Button onClick={handleClick} type="primary">Lisa loom</Button>
                <form class="addForm" style={showAdd ? {display:'block' }:  {display:'none'}} onSubmit={handleSubmit}>    
                    <label>Mis on looma nimi?</label><br/>
                    <Input placeholder="Nimi" ref={inputRef1} type="text" value={name} onChange={(e) => setName( e.target.value)} /><br/>
                    <label>Mis on looma sünnikuupäev?</label><br/>
                    <Input placeholder="Sünnikuupäev" ref={inputRef2} type="text" value={dob} onChange={(e) => setDob(e.target.value)} /><br/>
                    <label>Mis on looma liik?</label><br/>
                    <Input placeholder="Liik" ref={inputRef3} type="text" value={species} onChange={(e) => setSpecies(e.target.value)} /><br/>
                    <Button htmlType="submit" type="primary">Sisesta</Button>
                </form>    
            </div>
        </>
    );
}

export default Manager;