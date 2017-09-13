import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/speed';
class Header extends Component{
  render(){
    return(
      <div className='header'>
        <div className='row'>
          <div className='col m8'>
            <div className='row'>
              <div className="col m4"><button className='btn' onClick={this.props.resumeGame}>Start</button></div>
              <div className="col m4"><button className='btn' onClick={this.props.pauseGame}>Pause</button></div>
              <div className="col m4"><button className='btn'>Clear</button></div>
            </div>
          </div>
          <div className='col m4'>
            <h5>Generation: <span>0</span></h5>
          </div>
        </div>
      </div>
    )
  }

};

export default connect(null, actions)(Header);
