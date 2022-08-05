import logo from './logo.svg';
import './App.css';
import { Signup } from './component/Auth/Signup';
import { Login } from './component/Auth/Login';
import {Redirect, Route,Switch} from "react-router-dom";
import {Router} from "react-router";

import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { Profile } from './component/profile/Profile';
import { Forgotpassword } from './component/Auth/Forgotpassword';
// import { Update } from './component/Expensetracker/Update';
import { Expense } from './component/Expensetracker/Expense';

function App() {

  const authctx=useContext(AuthContext)
  const isloggendin=authctx.isLoggedIn;
  console.log("user", isloggendin)
  return (
    <div>
    <h1>h1</h1>
    {/* <Router> */}
    <Switch>
    <Route path="/login">
    <Login />
    </Route>
    <Route path="/" exact>
    <Signup />
    </Route>
    { isloggendin && (<Route path="/expense">
      <Expense />
    </Route>)
    }
    

    { isloggendin && (<Route path="/profile">
      <Profile />
    </Route>)
    }

      <Route path="/forgotpassword">
    <Forgotpassword />
    </Route> 

     {/* <Route path="/update/:spendid/:routeid/:desc/:category">
      <Update/>
     </Route>  */}

    <Route path="*">
    <Redirect to="/login"></Redirect>
    </Route>
    
    </Switch>
    
      {/* </Router> */}
    </div>
  );
}

export default App;
