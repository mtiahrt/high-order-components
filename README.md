### installing this app
1. clone this repo
2. npm install
3. npm start


## What is a higher-order component in React?
Higher-order components is a pattern that is available to us because of React's compositional nature.  Specifically, <b>a higher-order component is a function that takes a component as a parameter and returns a new component.</b>  

```const EnhancedComponent = higherOrderComponent(myComponent)```

Or

``const IronMan = withSuit(TonyStark)``

This new component called ```EnhancedComponent``` will include all the components original functionally along with features the higher-order component includes.  

### Why is there a need for high-order components?
High-order components or HOCs is a useful pattern to re-use common code logic across multiple components.  This option is more favorable than lifting the state when you are working with multiple components that you want to share the code with.  I will demonstrate this in a code example with the fitness logger app. 

### Simple app for logging Fitness activity
I need an app that will track my different fitness activities and amount of time per activity.  For example:  ```[ {Running: 1, Football: 3} ]```Finished code example can be found [here.](https://github.com/mtiahrt/high-order-components) <br>
This data model is an array of objects where 1 and 3 represent hours by that activity.  If the activity has an existing entry already logged then I want to sum the hours of this entry to the existing entry already available.  My fitness logger will allow 2 different ways to log your data.  One component has predefined activities and time amounts called ``FurnishedLogEntry.js``.  In the other component the user has more freedom to enter any activity they want with free text.  I'll call this component the ```ManualLogEntry.js```

<details>
<summary>App.js</summary>

```js
import './App.css';
import FurnishLogEntry from './Components/FurnishLogEntry';
import ManualLogEntry from './Components/ManualLogEntry';
function App() {
  return (
    <div className="App">
      <h3>Enter your fitness hours</h3>
      <header className="App-header">
      <ManualLogEntry/>
      <FurnishLogEntry/>
      </header>
    </div>
  );
}

export default App;
```
</details>
<details>
<summary>FurnishedLogEntry.js</summary>

```js
import React, {useState} from 'react'

const FurnishLogEntry = () => {
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
    
    const getSelectOptions = (values, activity) => {
        return (
            <select name={activity} onChange={e => buildNewHealthStatEntry(e.currentTarget.name, Number(e.currentTarget.value))}
                    className={`${activity}-hours`}>
                {values.map(item => <option key={item} value={item}>{item} hours</option>)})
            </select>
        )
    }
    
    const addHealthStat = newHealthStatEntry => {
        newHealthStatEntry.new ?
            setHealthStats(prevState => [{...newHealthStatEntry},...prevState]) :
            setHealthStats(prevState => [newHealthStatEntry, ...prevState.filter(x => x.id !== newHealthStatEntry.id)])
    }
    
    return (
        <div className="furnish-log">
            <h5>{props.title}</h5>
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
export default FurnishLogEntry
```
</details>
<details>
<summary>ManualLogEntry.js</summary>

```js
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
        //make sure no letters are entered
        if(/^\d*\.?\d*$/.test(e.target.value)){
            setHours(e.target.value)
        }
    }
    //same logic in FurnishedLogEntry
    const buildNewHealthStatEntry = (activity, hours) => {
        const newHealthStat = createNewHealthStat(activity, hours)
        addHealthStat(newHealthStat);
    }
    //same logic in FurnishedLogEntry
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
    //same logic in FurnishedLogEntry
    const addHealthStat = newHealthStatEntry => {
        newHealthStatEntry.new ?
            setHealthStats(prevState => [{...newHealthStatEntry},...prevState]) :
            setHealthStats(prevState => [newHealthStatEntry, ...prevState.filter(x => x.id !== newHealthStatEntry.id)])
    }

    return (
        <div className='manual-log'>
            <label for="activity">Enter Activity</label>
            <input className='activity' onChange={handleChange} value={activity} type="text" name="activity"/><br/>
            <label for="hours">Enter Hours</label>
            <input className='hours' onChange={handleChange} value={hours} type="text" name="hours"/><br/>
            <button onClick={() => buildNewHealthStatEntry(activity, Number(hours))} type="button" name="total">Submit</button>
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
```
</details>
 
 ### Do you see the redundant code in these components?
If you were paying close attention you might have noticed that the function expressions named `addHealthStat`, `createNewHealthStat`, and `buildNewHealthStatEntry` are identical in both entry components making them a good candidates to move into a HOC. 

```js
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
```
`buildNewHealthStatEntry` is the parent function that builds the js object to be added or modified. 
`createNewHealthStat` creates new health stat entry, checks if the same activity is in the list already.  If so we find the existing entry then it is summed the existing entry with the new one. If not we will add the new health entry to the list.
`addHealthStat` receives the new entry from `createNewHealthStat` and updates the components state accordingly. 
### How do I create a functional HOC?
We can create a functional HOC in 5 steps. 
1. Create the HOC component file with the prefixed naming convention `with`. This component it will be called `withHealthCounter.js`
2. HOC must return the original component that was passed in
3. Pass through the given props.
4. Import the HOC into the original component
5. Export the original component being passed into the HOC
    * ``export default withHealthCounter(ManualLogEntry)``

### Add HOC to our fitness logger app
Now that we know what actions we need, lets apply those changes to our app.  Let's create the HOC now to share the addHealthStat and  buildNewHealthStatEntry function.

<details>
<summary>withHealthCounter.js</summary>

```js
import React, {useState} from 'react';

const withHealthCounter = WrappedComponent => props => {
    //each component will have it's own instance of local state
    const [healthStats, setHealthStats] = useState([]);
    
    //shared functions for both components
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
    // Step 2.  Return the orginal component with the new props 
    return (
        <>
            <WrappedComponent healthStats={healthStats}
                //only 2 HOC props need to be shared. Enhanced componets
                //only need access buildNewHealthStat function and title
                buildNewHealthStatEntry={buildNewHealthStatEntry}
                title={props.title}
                // Step 3 Very IMPORTANT return any props from the orginal component
                {...props} />
        </>
    )
}

export default withHealthCounter
```
</details>

With this new file addition to my project I have completed steps 1, 2, and 3.<br>
<b>Step 1</b> creating new file using the proper naming convention ```with```<br>
<b>Step 2</b> is complete with returning the WrappedComponent.<br>
<b>Step 3</b> This step is very <b>important</b>!! Pass through the given `{...props}`. This prevents any props, sent by the user, from being swallowed by the HOC. 

I added the functions `addHealthStat`, `createNewHealthStat`, and `buildNewHealthStatEntry` that I want to share in the HOC.  `buildNewHealthStatEntry` is the only function to the enhanced component because it already calls `createNewHealthStat` and `addHealthStat`.  This hides complexity from the user like a facade pattern.  Now any component that is passed into this HOC will get the added functionality of the `buildNewHealthStatEntry`. aka... the `WrappedComponent`

### Let's use the HOC now
If you have been keeping track we still need to complete steps 4, and 5 of our checklist.<br><br>
<b>Step 4.</b>  Import the HOC.  Piece of cake.  Just like most imports I just need to add this to both `FurnishLogEntry.js` and `manualLogEntry.js`

```js
import withHealthCounter from './SharedCode/WithHealthCounter';
```

<b>Step 5.</b>  Export the Component received back from the HOC when this component is passed in.  This looks a little different from most exports just because we are exporting the result of a function call.  The function being the HOC. Again, this needs to be added to both  `FurnishLogEntry.js` and `manualLogEntry.js`

```js
export default withHealthCounter(ManualLogEntry);
```

Now that the HOC is importing and exporting everything correctly we can remove the duplicate code and use the code from the HOC instead.  Here is the updated code for the wrapped components.

<details>
<summary>FurnishLogEntry.js</summary>

```js
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
            {getSelectOptions( [4,5,6,7,8] , 'sleep')}<br/>
            <h6>Exercise</h6>
            {getSelectOptions( [1,2,3,4,5] , 'exercise')}<br/>
            <h6>Meditate</h6>
            {getSelectOptions( [1,2,3,4,5] , 'meditate')}<br/>
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
```
</details>


<details>
<summary>ManualLogEntry.js</summary>

```js
import React, {useState} from 'react';
import withHealthCounter from './SharedCode/WithHealthCounter';

const ManualLogEntry = props => {
    const [hours, setHours] = useState(0)
    const [activity, setActivity] = useState('');
    const {healthStats, title, buildNewHealthStatEntry} = props;

    const handleChange = ( e ) => {
        if(e.target.classList.contains('activity')){
            setActivity(e.target.value)
            return
        }
        //make sure no letters are entered
        if(/^\d*\.?\d*$/.test(e.target.value)){
            setHours(e.target.value)
        }
    }

    return (
        <div className='manual-log'>
            <h5>{title}</h5>
            <label>Enter Activity</label>
            <input className='activity' onChange={handleChange} value={activity} type="text" name="activity"/><br/>
            <label>Enter Hours</label>
            <input className='hours' onChange={handleChange} value={hours} type="text" name="hours"/><br/>
            <button onClick={() => buildNewHealthStatEntry(activity, Number(hours))} type="button" name="total">Submit</button>
            <div className='totals'>
                <h6>Totals:</h6>
                {healthStats.map(item => (
                    <li key={item.id}>{item.name} hours {item.hours}</li>
                ))}
            </div>
        </div>
    )
}

export default withHealthCounter(ManualLogEntry);

```
</details>

## Conclusion
Let's review what we went over.  High Order Components takes a component as a parameter and returns a new component while adding shared code to the wrapped component.  HOC are useful for keeping your code base DRY.  I showed examples of this by moving the `addHealthStat` and `buildNewHealthStatEntry` into the HOC.  While moving and sharing the `buildNewHealthStatEntry` function for the enhanced components to use.
