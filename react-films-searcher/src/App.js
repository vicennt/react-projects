import React from 'react'
import { Home } from './screens/Home'
import { Detail } from './screens/Detail'
import { NotFound } from './screens/NotFound'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.css'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/detail/:movieId' component={Detail}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
