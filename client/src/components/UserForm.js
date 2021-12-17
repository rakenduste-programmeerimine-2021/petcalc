import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button } from 'antd';
import './App.css';
import LoginCalculator from './LoginCalculator';
import Logout from "./Logout";
import { Context } from "../store";
import { updatePets } from "../store/actions";

function Form () {
    const [state, dispatch] = useContext(Context);
    const [isAnswered, setIsAnswered] = useState(false);
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [morning, setMorning] = useState("");
    const [evening, setEvening] = useState("");
    const [day, setDay] = useState("");
    const [week, setWeek] = useState("");
    const [month, setMonth] = useState("");
    const [money, setMoney] = useState("");
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);
    const inputRef7 = useRef(null);
    const inputRef8 = useRef(null);
    
    
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
        }); 
    },[]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        setIsAnswered(true);


    }


    if(isAnswered){
        const result = LoginCalculator(state.pets.data, species, age, morning, evening, day, week, month, money)
        if (result == true) {return(<p>Te saate {species} võtta</p>)}
        else if (result == false){return(<p>Te ei saa {species} võtta</p>)}
    }

    return(
        <>
            <Logout/>
            <div class = "main">
                <h2>Lemmiklooma kalkulaator</h2>
                <p>Lemmiklooma kalkulaator võimaldab sul sisestada andmeid enda kohta ja saada soovitusi, millist lemmiklooma sa saaksid endale võtta. Registreeri ning saad lisada mitu looma ja kõigi peale kokku arvutada.</p>
                <form onSubmit={handleSubmit}>    
                    <div class="container">
                        <div class="subcont">
                            <label>Mis on looma liik?</label><br/>
                            <Input placeholder="Liik" ref={inputRef1} type="text" value={species} onChange={(e) => setSpecies( e.target.value)} autoFocus /><br/>
                            <label>Mis on looma vanus?</label><br/>
                            <Input placeholder="Vanus" ref={inputRef2} type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br/>
                            <label>Mitu min on sul kindlasti iga päeva hommikul vaba aega tegeleda loomaga?</label><br/>
                            <Input placeholder="Hommik" ref={inputRef3} type="text" value={morning} onChange={(e) => setMorning(e.target.value)} /><br/>
                            <label>Mitu min on sul kindlasti iga päeva õhtul vaba aega tegeleda loomaga?</label><br/>
                            <Input placeholder="Õhtu" ref={inputRef4} type="text" value={evening} onChange={(e) => setEvening(e.target.value)} /><br/>
                        </div>
                        <div class="subcont"> 
                            <label>Mitu min on sul kindlasti iga päeva keskel vaba aega tegeleda loomaga?</label><br/>
                            <Input placeholder="Päev" ref={inputRef5} type="text" value={day} onChange={(e) => setDay(e.target.value)} /><br/>
                            <label>Mitu h nädalas saad sa lisaks loomaga tegeleda?</label><br/>
                            <Input placeholder="Nädal" ref={inputRef6} type="text" value={week} onChange={(e) => setWeek(e.target.value)} /><br/>
                            <label>Mitu päeva kuus keskmiselt oled sa kodust eemal?</label><br/>
                            <Input placeholder="Kuu" ref={inputRef7} type="text" value={month} onChange={(e) => setMonth(e.target.value)} /><br/>
                            <label>Kui palju raha saad sa kuus loomale kulutada?</label><br/>
                            <Input placeholder="Raha" ref={inputRef8} type="text" value={money} onChange={(e) => setMoney(e.target.value)} /><br/>
                        </div>
                    </div>
                    <Button htmlType="submit" type="primary">Sisesta</Button>
                </form>    
            </div>
        </>
    );
}

export default Form;