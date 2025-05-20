import { useMemo } from "react";

function CurrentDate() {

    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

    const DayComponent = useMemo(() => {
        return (<>  <h1>Today is {day}</h1>    </>);
    }, [day]);

    return DayComponent
}

export default CurrentDate