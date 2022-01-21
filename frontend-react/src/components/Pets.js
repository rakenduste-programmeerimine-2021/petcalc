import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useContext } from "react";
import './App.css';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { Input, Button } from 'antd';
import { DeleteFilled, CloseCircleOutlined } from '@ant-design/icons';
import { addPet, removePet } from "../store/actions";
import { Context } from "../store";
import './subordinate-meerkat-pack.jpg';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import et from 'date-fns/locale/et';
registerLocale('et', et)

function Pets() {
    const [state, dispatch] = useContext(Context);
    const [editName, setEditName] = useState("");
    const [currentPet, setCurrentPet] = useState({});
    const [editDob, setEditDob] = useState(new Date());
    const [editSpecies, setEditSpecies] = useState(null);
    const [petType, setPetType] = useState([]);
    const today = new Date();
    const [error, setError] = useState([]);
    const [err, setErr] = useState(false);
    const [succ, setSucc] = useState(false);

    const handleDelete = (pet,e) => {
        e.preventDefault();
        fetch('http://localhost:8081/api/pet/delete/' + pet._id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
            },
        })
        .then(data => {
            return data.json();
        }).then(async (result) => {
            console.log(result);
            if(typeof result.message === 'undefined'){
                setError(result.msg?result.msg[0].param +" "+ result.msg[0].msg:result.error)
                setErr(true);
            } else {
                setSucc(true);
                setErr(false);
                setError(result.message);
                await dispatch(removePet(pet._id));
            }
        })
        console.log(state)            
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const changedPet = {
            ...currentPet,
            name: editName,
            dateOfBirth: editDob,
            type: editSpecies.sel.label,
        }
        fetch('http://localhost:8081/api/pet/update/'+currentPet._id, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
            },
            body: JSON.stringify(changedPet),
        }).then(data => {
            return data.json();
        }).then(async (result) => {
            console.log(result);
            if(typeof result.message === 'undefined'){
                setError(result.msg?result.msg[0].param +" "+ result.msg[0].msg:result.error)
                setErr(true);
            } else {
                setSucc(true);
                setErr(false);
                setError(result.message);
                await dispatch(removePet(currentPet._id));
                await dispatch(addPet(changedPet));
            }
        })
        console.log(state)
        
    }

    const handleSetCurrentPet = (pet, e) => {
        e.preventDefault();
        setCurrentPet({
            _id:pet._id,
            ...pet
        });
        setEditName(pet.name);
        setEditDob(pet.dateOfBirth);
        setEditSpecies({label:pet.type,value:0});
        fetch('http://localhost:8081/api/pettype/').then
            (data => data.json()
            ).then(data => {
            console.log(data);
            setPetType(data);
        });
    }

    const renderList = () => {
        return (petType.map(data =>({label:data.species,value:data._id})));
    }
    
    return (
        <>
            {succ && 
            (
                <>
                    <h4>{error}     <span onClick={()=>{setSucc(false)}}><CloseCircleOutlined /></span></h4>
                </>
            )
            }
            {err && 
            (
                <>
                    <h3>{error}     <span onClick={()=>{setErr(false)}}><CloseCircleOutlined /></span></h3>
                </>
            )
            }
            <ul className='pts'>  
            {state.pets.data.map((pet) => (
                <li key={pet._id} className='class1'>
                    <div className='containe'>
                        <div className="subcon" >
                            {pet.name}<br/>
                            {pet.type}<br/>
                            Vanus: {(today - pet.dateOfBirth)/86400000/365>1?`${parseInt((today - pet.dateOfBirth)/86400000/365)} aastat, ${parseInt((today - pet.dateOfBirth)/86400000/30)-parseInt((today - pet.dateOfBirth)/86400000/30/12)*12} kuud, ${parseInt((today - pet.dateOfBirth)/86400000)-parseInt((today - pet.dateOfBirth)/86400000/30)*30} päeva`:(((today - pet.dateOfBirth)/86400000/365)<=1 && (today - pet.dateOfBirth)/86400000/30>1?`${parseInt((today - pet.dateOfBirth)/86400000/30)} kuud, ${parseInt((today - pet.dateOfBirth)/86400000)-parseInt((today - pet.dateOfBirth)/86400000/30)*30} päeva`:((today - pet.dateOfBirth)/86400000/365)<=1 && ((today - pet.dateOfBirth)/86400000/30<=1 && (today - pet.dateOfBirth)/86400000>1?`${parseInt((today - pet.dateOfBirth)/86400000)} päeva`:'0 päeva'))}
                        </div>
                        <div className="subcon" >
                            <img src="./subordinate-meerkat-pack.jpg" alt='looma pilt'></img>
                            <span style={{display:"block", height:20, width:20, float:"right", cursor:"pointer"}} onClick={(e)=>{handleDelete(pet,e)}}><DeleteFilled /></span><br/>
                            <Popup  trigger={<Button type='primary' style={{float:"right"}}>Muuda</Button>} onOpen={(e)=>{handleSetCurrentPet(pet,e)}}>
                                <form onSubmit={handleUpdate}>    
                                    <label>Mis on looma nimi?</label><br/>
                                    <Input placeholder="Nimi" type="text" value={editName} onChange={(e) => setEditName( e.target.value)} /><br/>
                                    <label>Mis on looma sünnikuupäev?</label><br/>
                                    <DatePicker locale="et" dateFormat="yyyy-MM-dd" selected={editDob} onChange={(date) => setEditDob(date)} /><br/>
                                    <label>Mis on looma liik?</label><br/>
                                    <Select class="addForm" defaultValue={editSpecies} onChange={(sel)=>setEditSpecies({sel})} options={renderList()}   />
                                    <Button htmlType="submit" type="primary">Sisesta</Button>
                                </form>
                            </Popup>
                        </div>
                    <br/></div>
                </li>
            ))}
            </ul>
        </>
    )
}

export default Pets;