import React, {useState} from 'react'

const ManualLogEntry = () => {
    const [hours, setHours] = useState(0)
    const [activity, setActivity] = useState('');
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
                <h6 className="totals"></h6>
            </div>
        </div>
    )
}

export default ManualLogEntry
