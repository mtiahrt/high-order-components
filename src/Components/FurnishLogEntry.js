import React from 'react'

const FurnishLogEntry = () => {
    return (
        <div className="furnish-log">
            <h6>Sleep</h6>
            <select className="sleep-hours">
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
            </select><br/>
            <h6>Exercise</h6>
            <select className="exercise-hours">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
            </select><br/>
            <h6>Meditate</h6>
            <select className="meditate-hours">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
            </select>
            <div>
                <h6>Totals:</h6>
                <h6 className="totals"></h6>
            </div>
        </div>
    )
}
export default FurnishLogEntry
