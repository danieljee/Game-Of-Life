import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Panel from './Panel';
class App extends Component {
  constructor(){
    super();

    this.state = {
      firstLoaded: true
    };
  }
  changeFirstLoaded(){
    this.setState({
      firstLoaded:false
    });
  }

  render() {
    return (
      <div className="container">
        <div className='gameContainer z-depth-4'>
          <Header/>
          <Panel firstLoaded={this.state.firstLoaded} changeFirstLoaded={this.changeFirstLoaded.bind(this)}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
