import React , {useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AddItem from './components/e-commerce/addItem';
import PropertyAds from './components/dashboard/propertyAds';
import SavedAds from './components/dashboard/savedAds';
import DashboardItems from './components/dashboard/items';
import ProductListScreen from './components/e-commerce/items';
import NotFound from './components/notFound';
import Landing from './components/landing';
import ItemDetail from './components/e-commerce/itemDetail';
import PriceIndex from './components/priceIndex';
import Blogs from './components/Blog/blogs';
import BlogDetail from './components/Blog/blogdetail';
import cityPriceIndex from './components/cityPriceIndex';
import CityIndex from './components/cityIndex';
import CartScreen from './components/e-commerce/cartScreen';
import Shipping from './components/e-commerce/shipping';
import PaymentScreen from './components/e-commerce/paymentScreen';
import PlaceOrderScreen from './components/e-commerce/placeOrder';
import Payment from './components/payment';
import OrdersList from './components/dashboard/ordersList';
import OrderDetails from './components/dashboard/orderDetails';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import landing from './components/e-commerce/landing';
import AdPayment from './components/dashboard/adPayment';
import Prediction from './components/predictor/prediction';

import {checkStatus, logout} from './reducers/userSlice';
import Comparison from './components/property-management/comparison';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFound';
import ItemSearch from './components/e-commerce/itemSearch';
import CreateProfile from './components/dashboard/createProfile';
import EditProfile from './components/dashboard/editProfile';


function App(){
	const dispatch = useCallback(useDispatch(), []);
	useEffect(() => dispatch(checkStatus()), [dispatch]);

        return (
          <>
            <BrowserRouter>
    <CookiesProvider>
    <Switch>
    <Route exact path="/" component={Landing}></Route>
      <Route exact path="/nav" component={Navigation}></Route>
      <Route exact path='/login' component = {Login}></Route>
      <Route exact path="/addProperty" component={AddProperty}></Route>
      <Route exact path="/advertisements" component={PropertyDisplay}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/editproperty/:handle" component={EditProperty}></Route>
      <Route exact path="/map" component={Map}></Route>
      <Route exact path="/AdDetails/:handle" component={PropertyDetails}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <Route exact path="/dashboardAds" component={PropertyAds}></Route>
      <Route exact path="/Saved" component={SavedAds}></Route>
      <Route exact path="/StoreItems" component={DashboardItems}></Route>
      <Route exact path="/properties" component={Properties}></Route>
      <Route exact path="/plots" component={Plots}></Route>
      <Route exact path="/commercial-areas" component={Commercial}></Route>
      <Route exact path='/search/:handle?' component={SearchResult}></Route>
      <Route exact path="/chat" component={Chat}></Route>
      <Route exact path="/store" component={landing}></Route>
      <Route exact path="/store-items" component={ProductListScreen}></Route>
      <Route exact path="/AddItem" component={AddItem}></Route>
      <Route exact path="/product/:id" component={ItemDetail}></Route>
      <Route exact path="/price-index" component={PriceIndex}></Route>
      <Route exact path="/Blogs" component={Blogs}></Route>
      <Route exact path="/Blog/:handle" component={BlogDetail}></Route>
      <Route exact path="/CityIndex/:handle" component={cityPriceIndex}></Route>
      <Route exact path="/cart/:id?" component={CartScreen}></Route>
      <Route exact path="/shipping" component={Shipping}></Route>
      <Route exact path="/payment" component={PaymentScreen}></Route>
      <Route exact path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route exact path="/orders" component={OrdersList}></Route>
      <Route exact path="/order/:id" component={OrderDetails}></Route>
      <Route exact path="/adPayment" component={AdPayment}></Route>
      <Route exact path="/prediction" component={Prediction}></Route>
      <Route exact path="/chat/:chatUuid" component={ChatPage} />
			<Route exact path="/inbox/:handle?" component={HomePage} />
			<Route exact path="/items/" component={ItemSearch} />
			<Route exact path="/createProfile/" component={CreateProfile} />
			<Route exact path="/editProfile/:handle" component={EditProfile} />
			<Route exact path="/comparison/:handle?" component={Comparison} />
			<Route exact path="/Index/:handle" component={CityIndex} />
			
<Route component={NotFound} />
      </Switch>      
    </CookiesProvider>
  </BrowserRouter>
</>
        )
}

export default App;
