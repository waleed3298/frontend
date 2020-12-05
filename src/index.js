import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddProperty from './components/addProperty';
import reportWebVitals from './reportWebVitals';
import { Route , BrowserRouter } from 'react-router-dom';
import PropertyDisplay from './components/advertisements';
import SignUp from './components/signup';
import Login from './components/login';
import Ecom from './components/ecommerce';
import EditProperty from './components/editproperty';

const routing=(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}></Route>
      <Route path="/addProperty" component={AddProperty}></Route>
      <Route path="/advertisements" component={PropertyDisplay}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/store" component={Ecom}></Route>
      <Route path="/editproperty" component={EditProperty}></Route>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
