import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { useAuth0 } from './react-auth0-spa';

function App() {

  const [ response, setResponse ] = useState('')
  const { getTokenSilently } = useAuth0()

  const callApi = (event) => {

    getTokenSilently()
    .then(token => {

      fetch('http://localhost:3001/users', {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      .then(res => res.text())
      .then(text => setResponse(text))
      .catch(e => setResponse("API Failure"))
      
    })
    .catch(e => setResponse("Token failiure"))

  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callApi}>Call API</button>
        <p>API response: {response}</p>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
