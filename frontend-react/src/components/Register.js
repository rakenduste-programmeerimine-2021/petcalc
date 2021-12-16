import { Button, Input } from 'antd';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import './App.css';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [againPassword, setAgainPassword] = useState();
    const [securityQuestion, setSecurityQuestion] = useState();
    const [securityAnswer, setSecurityAnswer] = useState();
    const [error, setError] = useState("");
    const history = useHistory();

    async function registerf(credentials) {
        return fetch('http://localhost:8081/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(data => { 
            return data.json();
        }).then(async (data) => {
            console.log(data);
        }); 
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await registerf({
            email, password, againPassword, securityQuestion, securityAnswer
        });   
        console.log(result);
    }
    

    return(
        <div class="login-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br/>
                <Input placeholder="Email" type = "text" onChange={(e) => setEmail(e.target.value)} /><br/>
                <label>Password:</label><br/>
                <Input.Password onChange={(e) => setPassword(e.target.value)} /><br/>
                <label>Confirm password:</label><br/>
                <Input.Password onChange={(e) => setAgainPassword(e.target.value)} /><br/>
                <label>Security question:</label><br/>
                <Input placeholder="Question" type = "select" onChange={(e) => setSecurityQuestion(e.target.value)} /><br/>
                <label>Security answer:</label><br/>
                <Input placeholder="Answer" type = "text" onChange={(e) => setSecurityAnswer(e.target.value)} /><br/>
                <Button type="primary" htmlType="submit">Sign up</Button><br/>
            </form>
        </div>
    )
}

export default Register;