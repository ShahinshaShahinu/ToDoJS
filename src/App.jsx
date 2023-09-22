import { useEffect, useState } from 'react';
import './App.css';

import CurrentDay from './day';

function App() {
  const [toDos, setToDos] = useState([]);

  const [toDo, setToDo] = useState('');

  const [count, setCount] = useState(0);
  const [dupllicateError, setDuplicate] = useState('');
  const [errors, setError] = useState('');

  const [time, setTime] = useState('');





  useEffect(() => {

    console.log('MOunting');

    return (() => {
      console.log('Unmounting');
    })
  }, [])






  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      setTime(currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds());
    }, 1000);
    // 1000 milliseconds 1second
    return () => {
      clearInterval(interval);
      //when the component unmounts
      // Cleanup the interval 
    };
  }, []);





  console.log(time); console.log(time); console.log(time); console.log(time);
  function deleteitem(item) {
    setToDos(toDos.filter(obj => {
      return item !== obj.id;
    }));
  }


  function TodoError() {
    return 'please input ToDo';
  };

  return (

    <>

      <div className="app">
        <div className="mainHeading">

          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <CurrentDay.DayComponent />
          <br />
          <div style={{
            left: '7rem',
            position: 'relative'

          }}>
            <h1> <p ></p> {time}</h1>
          </div>
        </div>
        <div className="center" style={{ display: 'flex', justifyContent: 'center' }}>

          <div className="input">
            <input value={toDo} onChange={(e) => { setToDo(e.target.value), setError(''); setDuplicate(''); }}
              type="text" placeholder="🖊️ Add item..." />

            <button type="button" onClick={() => {

              const duplicate = toDos.some(obj => obj.text === toDo);
              console.log(duplicate);

              if (duplicate || toDo.trim() == '') {
                console.log(duplicate);
                if (toDo.trim() == '') {

                  setDuplicate('');
                  setError(TodoError());

                }
                if (duplicate) {
                  setDuplicate('The ToDo Already exists');
                }

              } else {

                setToDos([...toDos, { id: Date.now(), text: toDo, status: false } ]); setCount(count + 1);
                setError('');
                setDuplicate('');


              }
            }}> +</button>
            <p style={{ color: 'black' }}> {count} </p>

          </div >

        </div>

        <div className="errorDE" style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ color: 'red' }}>{errors}{dupllicateError}</p>
        </div>
        <div className="todos">
          {toDos.map((obj) => {
            return (
              <div className="todo" key={obj.id}>
                <div className="left">

                  <input onChange={(e) => {
                    console.log(e.target.checked);
                    console.log(obj);

                    setToDos(toDos.filter(obj2 => {
                      if (obj2.id == obj.id) {
                        obj2.status = e.target.checked
                      }
                      return obj2
                    }))
                  }}
                    value={obj.status} type="checkbox" name="" id="" />

                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <i onClick={() => { deleteitem(obj.id); setCount(count - 1); setError(''); setDuplicate(''); }} className="fas fa-times"></i>


                </div>


              </div>


            )
          })}

          {
            toDos.map((obj) => {
              if (obj.status) {
                return (<h3>{obj.text}</h3>)
              }
              return null
            })

          }
        </div>
      </div>
    </>
  )
}

export default App

//e is a event  
// map is a dynamically looping each todo list , adding , dynamically or multiply to listing 