const { useEffect, useState } = require("react")

function Calculator (species, dob, minInMorning, minInEvening, minInDay, hInWeek, dInMonth, moneyInMonth) {
    const [petType, setPetType] = useState([]);
    const today = new Date();
    const age = parseInt((today - dob)/86400000/30);

    useEffect(()=>{
        fetch('http://localhost:8081/api/pettype/'+species)
        .then(data => { 
            data.json();
        }).then(data => {
            console.log(data);
            setPetType(data);
        });
    },[]);
    
    if (minInMorning >= petType.minInMorning && minInDay >= petType.minInDay && minInEvening >= petType.minInEvening && hInWeek >= petType.hInWeek && dInMonth <= petType.dInMonth && moneyInMonth >= petType.moneyInMonth) {
        if(age<petType.youngUntilXMonths && hInWeek>=2*petType.hInWeek){return true}else{return false}
    }
    if (minInMorning <= petType.minInMorning || minInDay <= petType.minInDay || minInEvening <= petType.minInEvening || hInWeek <= petType.hInWeek || dInMonth >= petType.dInMonth || moneyInMonth <= petType.moneyInMonth) {
        return false
    }
} 

export default Calculator;