const { useEffect } = require("react")

function LoginCalculator (pets, species, age, minInMorning, minInEvening, minInDay, hInWeek, dInMonth, moneyInMonth) {
    const [petType, setPetType] = useEffect([]);
    useEffect(()=>{
        fetch('http://localhost:8081/api/pettype/'+species).then(res => {
          return res.json();
        }).then(data => { 
          return data.json();
      }).then(async (data) => {
          console.log(data);
          await setPetType(data);
      }); 
  },[]); 

      const sumMinInMorning = Object.values(pets).reduce((r, {minInMorning  }) => r + minInMorning, 0) + petType.minInMorning;
      const sumMinInDay = Object.values(pets).reduce((r, { minInDay }) => r + minInDay, 0)+petType.minInDay;
      const sumMinInEvening = Object.values(pets).reduce((r, { minInEvening }) => r + minInEvening, 0)+petType.minInEvening;
      const sumHInWeek = Object.values(pets).reduce((r, { hInWeek }) => r + hInWeek, 0)+petType.hInWeek;
      const sumDInMonth = Object.values(pets).reduce((r, { dInMonth }) => r + dInMonth, 0)+petType.dInMonth;
      const sumMoneyInMonth = Object.values(pets).reduce((r, { moneyInMonth }) => r + moneyInMonth, 0)+petType.moneyInMonth;
      
    if (minInMorning >= sumMinInMorning && minInDay >= sumMinInDay && minInEvening >= sumMinInEvening && hInWeek >= sumHInWeek && dInMonth >= sumDInMonth && moneyInMonth >= sumMoneyInMonth) {
        if(age<petType.youngUntilXMonths && hInWeek>=2*sumHInWeek){return true}else{return false}
    }
    if (minInMorning <= sumMinInMorning || minInDay <= sumMinInDay || minInEvening <= sumMinInEvening || hInWeek <= sumHInWeek || dInMonth <= sumDInMonth || moneyInMonth <= sumMoneyInMonth) {
        return false
    }
} 

export default LoginCalculator;