import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/speed';
import {incrementGeneration, resetGeneration} from '../actions/other';
import start from '../etc/logic';

class Panel extends Component{
  constructor(){
    super();
    this.state = {
      firstLoaded: true,
      intervalId: null
    };
  }
  componentDidMount(){
    if (this.state.firstLoaded){
      let total = 0;
      const cells = document.getElementsByClassName('cell');
      for(var i = 0; i < cells.length; i++){
        let rand = Math.random();
        if (rand< 0.5){
          cells[i].classList.remove('dead');
          cells[i].classList.add('alive');
          total++;
        }
      }
      this.setState({
        firstLoaded:false
      });
    }

    this.startGame(this.props.speed.simSpeed);
  }

  startGame(speed){
    const columns = this.props.size.columns;
    const rows = this.props.size.rows;
    this.setState({
      intervalId: start(columns, rows, speed, this.props.pauseGame, this.props.incrementGeneration, this.props.resetGeneration)
    });
  }

  componentWillReceiveProps(nextProp){
    console.log('received props!');
    console.log(nextProp);
    if (nextProp.speed.paused){
      console.log('game paused');
      clearInterval(this.state.intervalId);
      if(nextProp.speed.cleared){
        console.log('cleared');
        this.clearPanel();
      }
    } else if (nextProp.speed.simSpeed !== this.props.speed.simSpeed) {
      clearInterval(this.state.intervalId);
      this.startGame(nextProp.speed.simSpeed);
    } else {
      console.log('game resumed');
      this.startGame(nextProp.speed.simSpeed);
    }
  }

  clearPanel(){
    const cells = document.querySelectorAll('.alive');
    for(var i = 0; i < cells.length; i++){
        cells[i].classList.remove('alive');
        cells[i].classList.add('dead');
    }
  }

  componentDidUpdate(nextProp){
      if (this.props.size.width != nextProp.size.width){
        let liveCells = document.querySelectorAll('.alive');
        let total = 0;
        for (let i=0; i<liveCells.length; i++){
          liveCells[i].classList.add('dead');
          liveCells[i].classList.remove('alive');
          total++;
        }
      }
  }

  toggleCell(e){
    if (e.target.classList.contains('dead')){
      e.target.classList.remove('dead');
      e.target.classList.add('alive');
      return;
    }
    e.target.classList.add('dead');
    e.target.classList.remove('alive');
  }

  renderGrid(){
    const {width, columns, height, rows} = this.props.size
    var colWidth = width / columns;
    var rowHeight = height / rows;
    var total = rows * columns;
    var cells = [];
    for (let i=0; i<total; i++){
      cells.push(<div id = {i} key={i + 1234} onClick={this.toggleCell} className='cell dead' style={{width:colWidth, height: rowHeight}}></div>)
    }
    return React.createElement('div', {className: 'panel', style:{width, height}}, cells);
  }

  render(){
    return this.renderGrid();
  }
}

function mapStateToProps(state){
  return{
    size: state.size,
    speed: state.speed
  };
}

function mapDispatchToProps(dispatch){
  return {
    pauseGame: () => {
      dispatch(actions.pauseGame());
    },
    incrementGeneration: () => {
      dispatch(incrementGeneration());
    },
    resetGeneration: () => {
      dispatch(resetGeneration());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
