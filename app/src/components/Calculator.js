const { useEffect } = require("react")

function Calculator (species, age, minInMorning, minInEvening, minInDay, hInWeek, dInMonth, moneyInMonth) {
    const [petType, setPetType] = useEffect([]);
    useEffect(()=>{
        fetch('http://localhost:8081/api/pettype/'+species).then(data => { 
          return data.json();
      }).then(async (data) => {
          console.log(data);
          await setPetType(data);
      });
      },[]);
    
    if (minInMorning >= petType.minInMorning && minInDay >= petType.minInDay && minInEvening >= petType.minInEvening && hInWeek >= petType.hInWeek && dInMonth >= petType.dInMonth && moneyInMonth >= petType.moneyInMonth) {
        if(age<petType.youngUntilXMonths && hInWeek>=2*petType.hInWeek){return true}else{return false}
    }
    if (minInMorning <= petType.minInMorning || minInDay <= petType.minInDay || minInEvening <= petType.minInEvening || hInWeek <= petType.hInWeek || dInMonth <= petType.dInMonth || moneyInMonth <= petType.moneyInMonth) {
        return false
    }
} 

export default Calculator;