import { loginUser } from "../store/actions";
import { Button, Input } from 'antd';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store";
import { CloseCircleOutlined } from '@ant-design/icons';
import './App.css';

export default function Login (){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState(false);
    const [error, setError] = useState([]);
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

        const result = await loginf({
            email,
            password
        });   

        
        console.log(result);
        if(typeof result.error !== 'undefined'){
            setError(result.msg?result.msg[0].param +" "+ result.msg[0].msg:result.error)
            setErr(true);
        } else {
            setErr(false);
            await dispatch(loginUser(result));
            history.push('/form');
        }
    }

    return (
        <>
            {err && 
            (
                <>
                    <h3>{error}     <span onClick={()=>{setErr(false)}}><CloseCircleOutlined /></span></h3>
                </>
            )
            }
            <div class="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <label>Email:</label><br/>
                    <Input placeholder="Email" type = "text" onChange={(e) => setEmail(e.target.value)} autoFocus /><br/>
                    <label>Password:</label><br/>
                    <Input.Password onChange={(e) => setPassword(e.target.value)} /><br/>
                    <Button type="primary" htmlType="submit">Login</Button><br/>
                </form>
            </div>
        </>
    );
}
