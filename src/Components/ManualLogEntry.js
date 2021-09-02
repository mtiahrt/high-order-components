import React, {useState} from 'react';
import withHealthCounter from './SharedCode/WithHealthCounter';

const ManualLogEntry = props => {
    const [hours, setHours] = useState(0)
    const [activity, setActivity] = useState('');
    const {healthStats, addHealthStat} = props;

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
        const newEntry = {
            id: healthStats.length,
            name: activity,
            hours: Number(hours)
        };
        addHealthStat(newEntry);
    }

    return (
        <div className='manual-log'>
            <h5>{props.title}</h5>
            <label>Enter Activity</label>
            <input className='activity' onChange={handleChange} value={activity} type="text" name="activity"/><br/>
            <label>Enter Hours</label>
            <input className='hours' onChange={handleChange} value={hours} type="text" name="hours"/><br/>
            <button onClick={buildNewHealthStatEntry} type="button" name="total">Submit</button>
        </div>
    )
}

export default withHealthCounter(ManualLogEntry);
