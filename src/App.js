import React from 'react';
import './App.css';

import PersonList from './Components/PersonList';
import PersonInput from './Components/PersonInput';

function App() {
  return (
    <div className="App">
      <PersonList />
      <PersonInput />
    </div>
  );
}

export default App;
