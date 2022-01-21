import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button } from 'antd';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import Pets from './Pets';
import Logout from "./Logout";
import { Context } from "../store";
import { updatePets, addPet } from "../store/actions";
import { registerLocale } from  "react-datepicker";
import et from 'date-fns/locale/et';
registerLocale('et', et);

function Manager () {
    const [state, dispatch] = useContext(Context);
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [species, setSpecies] = useState(null);
    const [petType, setPetType] = useState([]);
    const [error, setError] = useState([]);
    const [err, setErr] = useState(false);
    const [succ, setSucc] = useState(false);
    const inputRef1 = useRef(null);

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
            dateOfBirth: Date.parse(dob),
            type: species.sel.label,
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
        }).then(async (result) => {
            console.log(result);
            if(typeof result.message === 'undefined'){
                setError(result.msg?result.msg[0].param +" "+ result.msg[0].msg:result.error)
                setErr(true);
            } else {
                setErr(false);
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
            }
        }); 
    }

    const handleAdd = () => {
        if (showAdd) {
            setShowAdd(false);
        } else {
            fetch('http://localhost:8081/api/pettype/').then
                (data => data.json()
                ).then(data => {
                console.log(data);
                setPetType(data);
            });
            setShowAdd(true);
        }
    } 

    const renderList = () => {
        return (petType.map(data =>({label:data.species,value:data._id})));
    }

    return(
        <>
            <Logout/>
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
            <div class = "main">
                <h2>Halda looma</h2>
                <Pets />
                <Button onClick={handleAdd} type="primary">Lisa loom</Button>
                <form style={showAdd ? {display:'block' }:  {display:'none'}} onSubmit={handleSubmit}> 
                    <label>Mis on looma nimi?</label><br/>
                    <Input placeholder="Nimi" ref={inputRef1} type="text" value={name} onChange={(e) => setName( e.target.value)} /><br/>
                    <label>Mis on looma sünnikuupäev?</label><br/>
                    <DatePicker locale="et" dateFormat="yyyy-MM-dd" selected={dob} onChange={(date) => setDob(date)} />
                    <label>Mis on looma liik?</label><br/>
                    <Select class="addForm" defaultValue={species} onChange={(sel)=>setSpecies({sel})} options={renderList()}   />
                    <Button htmlType="submit" type="primary">Sisesta</Button>
                </form>    
            </div>
        </>
    );
}

export default Manager;