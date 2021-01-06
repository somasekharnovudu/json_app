import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const getData = async (toDoId) => {
  try {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/todos/' + toDoId)
    return resp.data
  } catch (err) {
    console.log(err)
  }
}

function App() {
  const [todoId, setToDoId] = useState('');
  const [toDoitem, setToDoitem] = useState({})
  const getToDoItem = async () => {
    const resp = await getData(todoId)
    setToDoitem(resp)
  }
  const headers = {
    id: 'Id',
    title: 'Name',
    completed: 'Completed'
  }
  const headerKeys = Object.keys(headers);
  return (
    <div className="App">
      <div className="formContainer">
        <div className="inputContainer">
          <label htmlFor="todoId">Id: </label>
          <input type="text" id='todoId' value={todoId} onChange={(e) => setToDoId(e.target.value)} />
        </div>
        <button onClick={getToDoItem}>Submit</button>
      </div>
      {
        toDoitem.id && <table>
          <thead>
            <tr>
              {headerKeys.map((labelKey) => <th key={labelKey}>{headers[labelKey]}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headerKeys.map((labelKey) => {
                let dataItem = <td key={toDoitem[labelKey]}>{toDoitem[labelKey]}</td>
                if (labelKey === 'completed') {
                  dataItem = <td key={toDoitem[labelKey]}>{toDoitem[labelKey] === true ? 'Completed' : 'Not Completed'}</td>
                }
                return dataItem
              })}
            </tr>
          </tbody>
        </table>
      }
    </div>
  );
}

export default App;
