import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const getData = async (personId) => {
  try {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/users/' + personId)
    return resp.data
  } catch (err) {
    console.log(err)
  }
}

function App() {
  const [personObj, setPersonObj] = useState({});
  useEffect(() => {
    async function getPersonDetails() {
      const personData = await getData(5);
      setPersonObj(personData)
    }
    getPersonDetails()
  }, [])
  const headers = {
    id: 'Id',
    name: 'Name',
    username: 'User Name'
  }
  const headerKeys = Object.keys(headers);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            {headerKeys.map((labelKey) => <th key={labelKey}>{headers[labelKey]}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headerKeys.map((labelKey) => <td key={personObj[labelKey]}>{personObj[labelKey]}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
