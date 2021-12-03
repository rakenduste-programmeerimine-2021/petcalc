import { useState, useEffect, useContext } from "react";
import { Input, Button } from 'antd';
import './App.css';
import { Context } from "../store";

function Profile () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [againPassword, setAgainPassword] = useState();
    const [securityQuestion, setSecurityQuestion] = useState();
    const [securityAnswer, setSecurityAnswer] = useState();
    const [error, setError] = useState("");
    const [state, dispatch] = useContext(Context);

    useEffect(()=>{setEmail(state.auth.user.email);console.log(state);},[]);

    async function updatef(credentials) {
        return fetch('http://localhost:8081/api/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await updatef({
            email, password, againPassword, securityQuestion, securityAnswer
        });   
        console.log(result);
    }


    

    return(
        <div class = "main">
            <p>Kasutaja seaded</p>
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
                    </div>
                </div>
                <Button htmlType="submit" type="primary">Salvesta</Button>
            </form>    
        </div>
    );
}

export default Profile;