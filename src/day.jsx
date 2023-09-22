import React from 'react';


const currentDate = new Date();
const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

const DayComponent = () => {

    return (<>  <h1>Today is {day}</h1>    </>);
};

export default { DayComponent };
