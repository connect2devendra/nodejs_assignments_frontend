import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login  from './components/Pages/Login';
import Profile  from './components/Pages/Profile';
import Users  from './components/Pages/Users';


function App() {
  return (

    <Router>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
    </Router>    
  )
}

export default App;
