import React from 'react'

const ManualLogEntry = () => {
    return (
        <div className='manual-log'>
            <label for="activity">Enter Activity</label>
            <input type="text" name="activity"/><br/>
            <label for="hours">Enter Hours</label>
            <input type="text" name="hours"/><br/>
            <button type="button" name="total">Submit</button>
            <div>
                <h6>Totals:</h6>
                <h6 className="totals"></h6>
            </div>
        </div>
    )
}

export default ManualLogEntry
