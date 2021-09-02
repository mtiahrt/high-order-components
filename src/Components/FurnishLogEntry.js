import React, {useState} from 'react'

const FurnishLogEntry = () => {
    const [healthStats, setHealthStats] = useState([]);

    const addHealthStat = e => {
        const newStatEntry = {
            id: healthStats.length,
            name: e.currentTarget.name,
            hours: Number(e.currentTarget.value)
        };
        if(healthStats.some(item => item.name === newStatEntry.name)){
            const index = healthStats.map( e =>  e.name).indexOf(newStatEntry.name);
            const newStat = [...healthStats];
            newStat[index].hours += newStatEntry.hours
            setHealthStats(newStat)
        }else{
            setHealthStats(prevState => [newStatEntry,...prevState])
        }
    }
    return (
        <div className="furnish-log">
            <h6>Sleep</h6>
            <select name='sleep' onChange={addHealthStat} className="sleep-hours">
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
            </select><br/>
            <h6>Exercise</h6>
            <select name='exercise' onChange={addHealthStat} className="exercise-hours">
                <option value='1'>1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
            </select><br/>
            <h6>Meditate</h6>
            <select name='meditate' onChange={addHealthStat} className="meditate-hours">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
            </select>
            <div>
                <h6>Totals:</h6>
                {healthStats.map(item => (
                    <li key={item.id}>{item.name} hours {item.hours}</li>
                ))}
            </div>
        </div>
    )
}
export default FurnishLogEntry
