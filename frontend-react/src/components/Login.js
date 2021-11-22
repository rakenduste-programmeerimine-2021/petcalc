import { Button, Input } from 'antd';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import './App.css';

export default function Login ({setUser}){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await (await fetch('http://localhost:8081/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password}),
            })).json();

        if(token.token) {
            setUser(token);
            setError("")
          } else if (token.error){
            setError(token.error)
          } else {
            setError(token.msg['0'].msg)
          }
        
        /* await dispatch(loginUser(token)); */
        history.push('/form');
    }

    return (
        <div style={{ float: "left", textAlign: "left"  }}>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br/>
                <Input placeholder="Email" type = "text" onChange={(e) => setEmail(e.target.value)} /><br/>
                <label>Password:</label><br/>
                <Input.Password onChange={(e) => setPassword(e.target.value)} /><br/>
                <Button type="primary" htmlType="submit">Login</Button><br/>
            </form>
        </div>
    );
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired
  };