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

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerUser = await (await fetch('http://localhost:8081/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password, againPassword, securityQuestion, securityAnswer}),
            })).json();

        if(registerUser.error) {
            setError(registerUser.error)
          } else if (registerUser.message){
            setError("Success!")
          } else {
            setError(registerUser.msg['0'].msg)
          }
    }
    

    return(
        <div style={{ float: "left", textAlign: "left"  }}>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br/>
                <Input placeholder="Email" type = "text" onChange={(e) => setEmail(e.target.value)} /><br/>
                <label>Password:</label><br/>
                <Input placeholder="Password" type = "password" onChange={(e) => setPassword(e.target.value)} /><br/>
                <label>Confirm password</label><br/>
                <Input placeholder="Password" type = "password" onChange={(e) => setAgainPassword(e.target.value)} /><br/>
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