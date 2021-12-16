import { useState, useEffect, useContext } from "react";
import { Input, Button } from 'antd';
import './App.css';
import { Context } from "../store";
import Logout from "./Logout";
import Popup from "reactjs-popup";
import { logoutUser } from "../store/actions";
import { useHistory } from "react-router-dom";


function Profile () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [againPassword, setAgainPassword] = useState();
    const [securityQuestion, setSecurityQuestion] = useState();
    const [securityAnswer, setSecurityAnswer] = useState();
    const [deletionConfirm, setDelete] = useState(false);
    const [error, setError] = useState("");
    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    useEffect(()=>{setEmail(state.auth.user.email);console.log(state);},[]);

    async function updatef(credentials) {
        return fetch('http://localhost:8081/api/user/update', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authentication': state.auth.token,
            },
            body: JSON.stringify(credentials),
        })
          .then(data => data.json())
          
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await updatef({
            email, password, againPassword, securityQuestion, securityAnswer
        });   
        
        console.log(result);
        
        history.push('/profile');
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/api/user/delete/'+state.auth.user.id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + state.auth.token,
            },
        })
        .then(async (data) => {
            await data.json();
            console.log(data);
            await dispatch(logoutUser());
            history.push('/form');
        })
        
    }

    

    return(
        <>
            <Logout/>
            <div class = "main">
                <h2>Kasutaja seaded</h2>
                <form onSubmit={handleSubmit}>    
                    <div class="container">
                        <div class="subcont">
                            <label>Muuda emaili</label><br/>
                            <Input placeholder="Email" value={email} type="text" onChange={(e) => setEmail( e.target.value)} autoFocus /><br/>
                            <label>Muuda salasõna</label><br/>
                            <Input.Password onChange={(e) => setPassword(e.target.value)} /><br/>
                            <label>Salasõna kordus</label><br/>
                            <Input.Password onChange={(e) => setAgainPassword(e.target.value)} /><br/>
                            <label>Taastamisküsuimus</label><br/>
                            <Input placeholder="Küsimus?" type="text" onChange={(e) => setSecurityQuestion(e.target.value)} /><br/>
                        </div>
                        <div class="subcont"> 
                            <label>Taastamisküsuimuse vastus</label><br/>
                            <Input placeholder="Vastus!" type="text" onChange={(e) => setSecurityAnswer(e.target.value)} /><br/>
                            <label>Kasutaja kustutamine</label>
                            <Popup trigger={<Button type="primary">Kustuta kasutaja jäädavalt!</Button>}>
                                <form onSubmit={handleDelete}>    
                                    <label>Kas oled kindel, et soovid kasutaja kustutada?</label><br/>
                                    <label>Sisesta '{state.auth.user.email}'</label><br/>
                                    <Input placeholder="Kustuta kasutaja" onChange={(e) => setDelete(e.target.value)} type="text" /><br/>
                                    {deletionConfirm && (<Button htmlType="submit" type="primary" >Kustuta kasutaja</Button>)}
                                    {!deletionConfirm && (<Button htmlType="submit" type="primary" disabled>Kustuta kasutaja</Button>)}
                                </form>
                            </Popup>            
                        </div>
                    </div>
                    <Button htmlType="submit" type="primary">Salvesta</Button>
                </form>    
            </div>
        </>
    );
}

export default Profile;