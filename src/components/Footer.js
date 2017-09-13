import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/size';
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
              <div className="col m4"><button className='btn'>Slow</button></div>
              <div className="col m4"><button className='btn'>Medium</button></div>
              <div className="col m4"><button className='btn'>Fast</button></div>
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

export default connect(mapStateToProps, actions)(Footer);
