import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/speed';
import start from '../etc/logic';

class Header extends Component{
  resume(){
    this.props.resumeGame();
  }
  pause(){
    this.props.pauseGame();
  }
  clear(){
    this.props.clearGame();
  }
  render(){
    return(
      <div className='header'>
        <div className='row'>
          <div className='col m8'>
            <div className='row'>
              <div className="col m4"><button className='btn' onClick={this.resume.bind(this)}>Start</button></div>
              <div className="col m4"><button className='btn' onClick={this.pause.bind(this)}>Pause</button></div>
              <div className="col m4"><button className='btn' onClick={this.clear.bind(this)}>Clear</button></div>
            </div>
          </div>
          <div className='col m4'>
            <h5>Generation: <span>{this.props.otherStates.generation}</span></h5>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state){
  return{
    size: state.size,
    speed: state.speed,
    otherStates: state.otherStates
  };
}

export default connect(mapStateToProps, actions)(Header);
