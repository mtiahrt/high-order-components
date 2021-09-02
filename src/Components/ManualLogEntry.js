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
    const buildNewHealthStatEntry = () =>{
        //maybe just a callback? 
        const newEntry = {
            id: healthStats.length,
            name: activity,
            hours: Number(hours)
        };
        addHealthStat(newEntry);
    }
    const addHealthStat = newHealthStatEntry => {
        if(healthStats.some(item => item.name === newHealthStatEntry.name)){
            const index = healthStats.map( e =>  e.name).indexOf(newHealthStatEntry.name);
            const newStat = [...healthStats];
            newStat[index].hours += newHealthStatEntry.hours
            setHealthStats(newStat)
        }else{
            setHealthStats(prevState => [newHealthStatEntry,...prevState])
        }
    }

    return (
        <div className='manual-log'>
            <label for="activity">Enter Activity</label>
            <input className='activity' onChange={handleChange} value={activity} type="text" name="activity"/><br/>
            <label for="hours">Enter Hours</label>
            <input className='hours' onChange={handleChange} value={hours} type="text" name="hours"/><br/>
            <button onClick={buildNewHealthStatEntry} type="button" name="total">Submit</button>
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
