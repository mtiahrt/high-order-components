import React, {useState} from 'react';

const withHealthCounter = WrappedComponent => props => {
    const [healthStats, setHealthStats] = useState([]);

    const buildNewHealthStatEntry = (activity, hours) => {
        const newHealthStat = createNewHealthStat(activity, hours)
        addHealthStat(newHealthStat);
    }

    const createNewHealthStat = (name, hours) => {
        const existingEntry = healthStats.find(item => item.name === name);
        if (existingEntry) {
            return {
                ...existingEntry,
                new: false,
                hours: existingEntry.hours + hours
            }
        }
        return {name: name, hours: hours, id: healthStats.length, new: true};
        };

    const addHealthStat = newHealthStatEntry => {
        newHealthStatEntry.new ?
            setHealthStats(prevState => [{...newHealthStatEntry},...prevState]) :
            setHealthStats(prevState => [newHealthStatEntry, ...prevState.filter(x => x.id !== newHealthStatEntry.id)])
    }
    return (
        <>
            <WrappedComponent healthStats={healthStats}
                buildNewHealthStatEntry={buildNewHealthStatEntry}
                title={props.title}
                {...props} />
        </>
    )
}

export default withHealthCounter
