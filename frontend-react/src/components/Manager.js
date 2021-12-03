import { useState, useRef } from "react";
import { Input, Button } from 'antd';
import './App.css';
import Calculator from './Calculator';

function Manager () {
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);
    const inputRef7 = useRef(null);
    const inputRef8 = useRef(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [morning, setMorning] = useState("");
    const [evening, setEvening] = useState("");
    const [day, setDay] = useState("");
    const [week, setWeek] = useState("");
    const [month, setMonth] = useState("");
    const [money, setMoney] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsAnswered(true);


    }


    if(isAnswered){
        const result = Calculator(species, age, morning, evening, day, week, month, money)
        if (result == true) {return(<p>Te saate {species} võtta</p>)}
        else if (result == false){return(<p>Te ei saa {species} võtta</p>)}
    }

    return(
        <div class = "main">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
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
    );
}

export default Manager;