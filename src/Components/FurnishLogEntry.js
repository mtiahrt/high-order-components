import React from 'react';
import withHealthCounter from "./SharedCode/WithHealthCounter";

const FurnishLogEntry = (props) => {
    const {healthStats, title, buildNewHealthStatEntry} = props;
    const getSelectOptions = (values, activity) => {
        return (
            <select name={activity} onChange={e => buildNewHealthStatEntry(e.currentTarget.name, Number(e.currentTarget.value))}
                    className={`${activity}-hours`}>
                {values.map(item => <option key={item} value={item}>{item} hours</option>)})
            </select>
        )
    }
    return (
        <div className="furnish-log">
            <h5>{title}</h5>
            <h6>Sleep</h6>
            {getSelectOptions( [4,5,6,7,8] ,'sleep')}<br/>
            <h6>Exercise</h6>
            {getSelectOptions( [1,2,3,4,5] ,'exercise')}<br/>
            <h6>Meditate</h6>
            {getSelectOptions( [1,2,3,4,5] ,'meditate')}<br/>
            <div className='totals'>
                <h6>Totals:</h6>
                <ul>
                    {healthStats.map(item => (
                        <li key={item.id}>{item.name} hours {item.hours}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default withHealthCounter(FurnishLogEntry);