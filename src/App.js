import React from 'react';
import './App.css';
import LandingPage from './components/landingPage';


function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        Find your beer!
      </nav>
      <main className="App-main">
        <LandingPage />
      </main>
    </div>
  );
}

export default App;
