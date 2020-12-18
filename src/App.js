import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navbar';
import Header from './components/Header';
import Home from './components/home';
import Footer from './components/footer';

class App extends Component{

    render(){
        return (
        <div id="wrapper">
         <Navigation link1="Map" link2="Houses" link3="Plots" link4="Commercial"  color="Transparent"/>
         <Header />
         <Home />
         <Footer />
         </div>
        )
        }
}

export default App;
