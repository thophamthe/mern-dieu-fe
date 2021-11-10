import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './component/layout/LoginPage';
import { HomePage } from './component/layout';
import { Notfound } from './component/common';
import { NewuserForm } from './features/Newuser/NewuserForm';

function App() {
  const logging = localStorage.getItem("token")

  //thay đoạn homepage
  return (
    
    <div>
      <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/" >
              <HomePage/>
        
          </Route>
          <Route path="/newuser">
            <NewuserForm/>
          </Route>
         
          <Route>
            <Notfound/>
          </Route>
      </Switch>
      
    </div>
    
  );
}

export default App;
