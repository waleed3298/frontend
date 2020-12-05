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
         <Navigation color="Transparent"/>
         <Header />
         <Home />
         <Footer />
         </div>
        )
        }
}

export default App;
