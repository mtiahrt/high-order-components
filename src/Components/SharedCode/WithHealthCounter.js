import React, {useState} from 'react';


const withHealthCounter = OriginalComponent => props => {
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
    <OriginalComponent healthStats={healthStats} 
        addHealthStat={addHealthStat} 
        sharedProp = 'Hello HOC'
        {...props} />//importand!!!  Send any other props associated to the wrapped component on through
    )
}

export default withHealthCounter
