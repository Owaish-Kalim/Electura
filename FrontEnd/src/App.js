import React from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminHome from './Contents/admin/AdminHome';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import SignUp from './Contents/signUp'



class App extends React.Component {

  

  render(){
    return (
      <div className="App">
        <ReactNotification />
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin/home" component={AdminHome} />
            <Route path="/admin/home" component={AdminHome} />
            <Route path="/admin/signUp" component={SignUp} />
            <Redirect to="/admin/home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



