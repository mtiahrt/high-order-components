import React, {useState} from 'react';

const withHealthCounter = WrappedComponent => props => {
    const [healthStats, setHealthStats] = useState([]);

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
        <>
            <WrappedComponent healthStats={healthStats} 
                addHealthStat={addHealthStat} 
                title={props.title}
                {...props} />
            <div className='totals'>
                <h6>Totals:</h6>
                    {healthStats.map(item => (
                        <li key={item.id}>{item.name} hours {item.hours}</li>
                    ))}
            </div>
        </>
    )
}

export default withHealthCounter
