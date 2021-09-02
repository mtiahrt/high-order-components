import React from 'react';
import withHealthCounter from "./SharedCode/WithHealthCounter";

const FurnishLogEntry = (props) => {
    const {healthStats, addHealthStat} = props;
    const buildNewHealthStatEntry = e => {
        //maybe just a callback? 
        const newEntry = {
            id: healthStats.length,
            name: e.currentTarget.name,
            hours: Number(e.currentTarget.value)
        };
        addHealthStat(newEntry);
    }
    return (
        <div className="furnish-log">
            <h5>{props.sharedProp}</h5>
            <h6>Sleep</h6>
            <select name='sleep' onChange={buildNewHealthStatEntry} className="sleep-hours">
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
            </select><br/>
            <h6>Exercise</h6>
            <select name='exercise' onChange={buildNewHealthStatEntry} className="exercise-hours">
                <option value='1'>1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
            </select><br/>
            <h6>Meditate</h6>
            <select name='meditate' onChange={buildNewHealthStatEntry} className="meditate-hours">
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
export default withHealthCounter(FurnishLogEntry);
