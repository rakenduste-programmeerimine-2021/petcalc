import { loginUser } from "../store/actions";
import { Button, Input } from 'antd';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store";
import './App.css';

export default function Login (){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    async function loginf(credentials) {
        return fetch('http://localhost:8081/api/user/login', {
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

        const token = await loginf({
            email,
            password
        });   

        await dispatch(loginUser(token));
        console.log(state);
        history.push('/form');
    }

    return (
        <div class="login-wrapper">
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
