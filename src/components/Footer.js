import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/size';
import {changeSpeedSlow, changeSpeedNormal, changeSpeedFast} from '../actions/speed';
// export default ({changeSize}) => {
class Footer extends Component{

  changeSize(n){
    switch(n){
      case 0:
        this.props.changeSizeSmall();
        return;
      case 1:
        this.props.changeSizeMedium();
        return;
      case 2:
        this.props.changeSizeBig();
        return;
    }
  }

  changeSpeed(n){
    switch(n){
      case 0:
        this.props.changeSpeedSlow();
        return;
      case 1:
        this.props.changeSpeedNormal();
        return;
      case 2:
        this.props.changeSpeedFast();
        return;
    }
  }

  render(){
    return(
      <div className='footer'>
        <div className='row' style={{marginTop:'10px'}}>
          <div className='col m2'>
            <h5 style={{margin:0}}>Size: </h5>
          </div>
          <div className='col m10'>
            <div className='row'>
              <div className="col m4"><button className='btn' onClick={this.changeSize.bind(this, 0)}>50x30</button></div>
              <div className="col m4"><button className='btn' onClick={this.changeSize.bind(this, 1)}>70X50</button></div>
              <div className="col m4"><button className='btn' onClick={this.changeSize.bind(this, 2)}>100x80</button></div>
            </div>
          </div>
        </div>

        <div className='row' style={{marginTop:'10px'}}>
          <div className='col m2'>
            <h5 style={{margin:0}}>Speed: </h5>
          </div>
          <div className='col m10'>
            <div className='row'>
              <div className="col m4"><button className='btn' onClick={this.changeSpeed.bind(this, 0)}>Slow</button></div>
              <div className="col m4"><button className='btn' onClick={this.changeSpeed.bind(this, 1)}>Medium</button></div>
              <div className="col m4"><button className='btn' onClick={this.changeSpeed.bind(this, 2)}>Fast</button></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state){
  return {
    size: state.size
  };
}

function mapDispatchToProps(dispatch){
  return {
    changeSizeSmall: ()=>{
      dispatch(actions.changeSizeSmall());
    },
    changeSizeMedium: () => {
      dispatch(actions.changeSizeMedium());
    },
    changeSizeLarge: () => {
      dispatch(actions.changeSizeBig());
    },
    changeSpeedSlow: () => {
      dispatch(changeSpeedSlow());
    },
    changeSpeedNormal: () => {
      dispatch(changeSpeedNormal());
    },
    changeSpeedFast: () => {
      dispatch(changeSpeedFast());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
