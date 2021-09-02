import React, {useState} from 'react'

const ManualLogEntry = () => {
    const [hours, setHours] = useState(0)
    const [activity, setActivity] = useState('');
    const [healthStats, setHealthStats] = useState([]);

    const handleChange = ( e ) => {
        if(e.target.classList.contains('activity')){
            setActivity(e.target.value)
            return
        }
        //make sure not letters are entered
        if(/^\d*\.?\d*$/.test(e.target.value)){
            setHours(e.target.value)
        }
    }

    const addHealthStatManual = () => {
        const newStatEntry = {
            id: healthStats.length,
            name: activity,
            hours: Number(hours)
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
        <div className='manual-log'>
            <label for="activity">Enter Activity</label>
            <input className='activity' onChange={handleChange} value={activity} type="text" name="activity"/><br/>
            <label for="hours">Enter Hours</label>
            <input className='hours' onChange={handleChange} value={hours} type="text" name="hours"/><br/>
            <button onClick={addHealthStatManual} type="button" name="total">Submit</button>
            <div>
                <h6>Totals:</h6>
                {healthStats.map(item => (
                    <li key={item.id}>{item.name} hours {item.hours}</li>
                ))}
            </div>
        </div>
    )
}

export default ManualLogEntry
