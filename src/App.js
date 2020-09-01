import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './containers/login/login.jsx'
import Admin from './containers/admin/admin.jsx'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        <Redirect to="/admin"/>
      </Switch>
    </div>
  );
}

export default App;
