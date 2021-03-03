import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import AddProperty from './components/property-management/addProperty';
import reportWebVitals from './reportWebVitals';
import { Route , BrowserRouter } from 'react-router-dom';
import PropertyDisplay from './components/property-management/advertisements';
import SignUp from './components/authentication/signup';
import Login from './components/authentication/login';
import EditProperty from './components/property-management/editproperty';
import Map from './components/map';
import PropertyDetails from './components/property-management/propertyDetails';
import {CookiesProvider} from 'react-cookie';
import Navigation from './components/navbar';
import Dashboard from './components/dashboard/dashboard';
import Properties from './components/property-management/properties';
import Plots from './components/property-management/plots';
import Commercial from './components/property-management/commercial';
import SearchResult from './components/property-management/search-results';
import MapDetail from './components/property-management/detailmap';
import Chat from './components/chat';
import Results from './components/results';
import Landing from './components/e-commerce/landing';
import AddItem from './components/e-commerce/addItem';
import PropertyAds from './components/dashboard/propertyAds';
import SavedAds from './components/dashboard/savedAds';
import DashboardItems from './components/dashboard/items';
import Items from './components/e-commerce/items';

const routing=(
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/nav" component={Navigation}></Route>
      <Route path="/addProperty" component={AddProperty}></Route>
      <Route path="/advertisements" component={PropertyDisplay}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/editproperty/:handle" component={EditProperty}></Route>
      <Route path="/map" component={Map}></Route>
      <Route path="/map/:handle" component={MapDetail}></Route>
      <Route path="/AdDetails/:handle" component={PropertyDetails}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/dashboardAds" component={PropertyAds}></Route>
      <Route path="/Saved" component={SavedAds}></Route>
      <Route path="/StoreItems" component={DashboardItems}></Route>
      <Route path="/properties" component={Properties}></Route>
      <Route path="/plots" component={Plots}></Route>
      <Route path="/commercial-areas" component={Commercial}></Route>
      <Route path='/search/:handle' component={SearchResult}></Route>
      <Route path="/chat" component={Chat}></Route>
      <Route exact path="/results/:handle" component={Results}></Route>
      <Route path="/store" component={Landing}></Route>
      <Route path="/store-items" component={Items}></Route>
      <Route path="/AddItem" component={AddItem}></Route>
      
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(routing,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
