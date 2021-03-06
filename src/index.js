import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import AddProperty from './components/property-management/addProperty';
import reportWebVitals from './reportWebVitals';
import { Route , BrowserRouter, Switch } from 'react-router-dom';
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
import Landing from './components/e-commerce/landing';
import AddItem from './components/e-commerce/addItem';
import PropertyAds from './components/dashboard/propertyAds';
import SavedAds from './components/dashboard/savedAds';
import DashboardItems from './components/dashboard/items';
import Items from './components/e-commerce/items';
import NotFound from './components/notFound';
const routing=(
  <BrowserRouter>
    <CookiesProvider>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/nav" component={Navigation}></Route>
      <Route exact path="/addProperty" component={AddProperty}></Route>
      <Route exact path="/advertisements" component={PropertyDisplay}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/editproperty/:handle" component={EditProperty}></Route>
      <Route exact path="/map" component={Map}></Route>
      <Route exact path="/map/:handle" component={MapDetail}></Route>
      <Route exact path="/AdDetails/:handle" component={PropertyDetails}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <Route exact path="/dashboardAds" component={PropertyAds}></Route>
      <Route exact path="/Saved" component={SavedAds}></Route>
      <Route exact path="/StoreItems" component={DashboardItems}></Route>
      <Route exact path="/properties" component={Properties}></Route>
      <Route exact path="/plots" component={Plots}></Route>
      <Route exact path="/commercial-areas" component={Commercial}></Route>
      <Route exact path='/search/:handle' component={SearchResult}></Route>
      <Route exact path="/chat" component={Chat}></Route>
      <Route exact path="/store" component={Landing}></Route>
      <Route exact path="/store-items" component={Items}></Route>
      <Route exact path="/AddItem" component={AddItem}></Route>
      <Route component={NotFound} />
      </Switch>      
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(routing,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
