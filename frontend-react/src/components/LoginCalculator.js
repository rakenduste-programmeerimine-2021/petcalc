const { useEffect, useState } = require("react")

function LoginCalculator (pets, species, dob, minInMorning, minInEvening, minInDay, hInWeek, dInMonth, moneyInMonth) {
    const [petType, setPetType] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    
    const today = new Date();
    const age = parseInt((today - dob)/86400000/30);

    useEffect(()=>{
        fetch('http://localhost:8081/api/pettype/'+species)
        .then(data => { 
            data.json();
        }).then(async (data) => {
            console.log(data);
            setPetType(data);
        }); 
    },[]); 

    const getPetType = (spec) => {
        fetch('http://localhost:8081/api/pettype/'+spec)
        .then(data => { 
            data.json();
        }).then(async (data) => {
            console.log(data);
            return data;
        });
    }

    const currentTypes = pets.map(data =>setPetTypes(petTypes => [...petTypes, getPetType(data.type)]))
    
    const sumMinInMorning = Object.values(currentTypes).reduce((r, {minInMorning  }) => r + minInMorning, 0) + petType.minInMorning;
    const sumMinInDay = Object.values(currentTypes).reduce((r, { minInDay }) => r + minInDay, 0)+petType.minInDay;
    const sumMinInEvening = Object.values(currentTypes).reduce((r, { minInEvening }) => r + minInEvening, 0)+petType.minInEvening;
    const sumHInWeek = Object.values(currentTypes).reduce((r, { hInWeek }) => r + hInWeek, 0)+petType.hInWeek;
    const sumDInMonth = Object.values(currentTypes).reduce((r, { dInMonth }) => r + dInMonth, 0)+petType.dInMonth;
    const sumMoneyInMonth = Object.values(currentTypes).reduce((r, { moneyInMonth }) => r + moneyInMonth, 0)+petType.moneyInMonth;
    
    if (minInMorning >= sumMinInMorning && minInDay >= sumMinInDay && minInEvening >= sumMinInEvening && hInWeek >= sumHInWeek && dInMonth <= sumDInMonth && moneyInMonth >= sumMoneyInMonth) {
        if(age<petType.youngUntilXMonths && hInWeek>=2*sumHInWeek){return true}else{return false}
    }
    if (minInMorning <= sumMinInMorning || minInDay <= sumMinInDay || minInEvening <= sumMinInEvening || hInWeek <= sumHInWeek || dInMonth >= sumDInMonth || moneyInMonth <= sumMoneyInMonth) {
        return false
    }
} 

export default LoginCalculator;