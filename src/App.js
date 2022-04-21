import React from 'react';
import LoginApp from './pages/Login';
import CreatePlaylist from './pages/createPlaylist';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const { isAuthorized } = useSelector((state) => state.auth)

  return (
    <div className="App-header">
      <Router>
        <Switch>
          <Route path='/create-playlist' exact>
              {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" /> }
          </Route>
          <Route path="/" exact>
            <LoginApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
