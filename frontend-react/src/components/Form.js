import { useState } from "react";
import Calculator from './Calculator';

function Form () {
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
        return(calculate(species, age, morning, evening, day, week, month, money));
    }

    return(
        <> 
            <div style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                    <label>Mis on looma liik?</label>
                    <Input placeholder="Liik" ref={inputRef1} type="text" value={species} onChange={(e) => setSpecies( e.target.value)} autoFocus/>
                    <label>Mis on looma vanus?</label>
                    <Input placeholder="Vanus" ref={inputRef2} type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                    <label>Mitu min on sul kindlasti iga päeva hommikul vaba aega tegeleda loomaga?</label>
                    <Input placeholder="Hommik" ref={inputRef3} type="text" value={morning} onChange={(e) => setMorning(e.target.value)} />
                    <label>Mitu min on sul kindlasti iga päeva õhtul vaba aega tegeleda loomaga?</label>
                    <Input placeholder="Õhtu" ref={inputRef4} type="text" value={evening} onChange={(e) => setEvening(e.target.value)} />
                    <label>Mitu min on sul kindlasti iga päeva keskel vaba aega tegeleda loomaga?</label>
                    <Input placeholder="Päev" ref={inputRef5} type="text" value={day} onChange={(e) => setDay(e.target.value)} />
                    <label>Mitu h nädalas saad sa lisaks loomaga tegeleda?</label>
                    <Input placeholder="Nädal" ref={inputRef6} type="text" value={week} onChange={(e) => setWeek(e.target.value)} />
                    <label>Mitu päeva kuus keskmiselt oled sa kodust eemal?</label>
                    <Input placeholder="Kuu" ref={inputRef7} type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
                    <label>Kui palju raha saad sa kuus loomale kulutada?</label>
                    <Input placeholder="Raha" ref={inputRef8} type="text" value={money} onChange={(e) => setMoney(e.target.value)} />
                    <Button htmlType="submit" type="primary">Sisesta</Button>
                </form> 
            </div>
        </>
    );
}

export default Form;