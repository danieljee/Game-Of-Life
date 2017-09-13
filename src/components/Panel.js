import React, {Component} from 'react';
import {connect} from 'react-redux';
import start from '../etc/logic';

class Panel extends Component{
  constructor(){
    super();
    this.state = {
      intervalId: null
    };
  }
  componentDidMount(){
    // if (this.props.firstLoaded){
    //   let total = 0;
    //   const cells = document.getElementsByClassName('cell');
    //   for(var i = 0; i < cells.length; i++){
    //     let rand = Math.random();
    //     if (rand< 0.5){
    //       cells[i].classList.remove('dead');
    //       cells[i].classList.add('alive');
    //       total++;
    //     }
    //   }
    //   this.props.changeFirstLoaded();
    // }
    const cells = document.getElementsByClassName('cell');
    cells[0].classList.add('alive');
    cells[0].classList.remove('dead');
    this.resumeGame();
  }

  resumeGame(){
    if (this.props.speed.paused){
      console.log('game paused');
      if (this.state.intervalId) clearInterval(this.state.intervalId);
      console.log('interval cleared');
      return;
    }
    const columns = this.props.size.columns;
    const rows = this.props.size.rows;
    const cornerIndex = [0, columns - 1, (rows-1) * columns, rows * columns - 1];
    function kill(obj){
      obj.classList.remove('markDead');
      obj.classList.remove('alive');
      obj.classList.add('dead');
    }

    function regen(obj){
      obj.classList.remove('markLive');
      obj.classList.remove('dead');
      obj.classList.add('alive');
    }

    function markDead(obj){
      obj.classList.add('markDead');
    }

    function markLive(obj){
      obj.classList.add('markLive');
    }

    function corners(cells, i){
      if (cells[i].classList.contains('alive')){
        if (i == 0){
          if (cells[i+1+columns].classList.contains('alive')){
            if (!cells[i+1].classList.contains('alive') && !cells[i+columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          } else {
            if (!cells[i+1].classList.contains('alive') || !cells[i+columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          }
        } else if (i == columns - 1){
          if (cells[i-1+columns].classList.contains('alive')){
            if (!cells[i-1].classList.contains('alive') && !cells[i+columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          } else {
            if (!cells[i-1].classList.contains('alive') || !cells[i+columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          }
        } else if (i == (rows-1) * columns){
          if (cells[i+1-columns].classList.contains('alive')){
            if (!cells[i+1].classList.contains('alive') && !cells[i-columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          } else {
            if (!cells[i+1].classList.contains('alive') || !cells[i-columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          }
        } else {
          if (cells[i-1-columns].classList.contains('alive')){
            if (!cells[i-1].classList.contains('alive') && !cells[i-columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          } else {
            if (!cells[i-1].classList.contains('alive') || !cells[i-columns].classList.contains('alive')){
              markDead(cells[i]);
            }
          }
        }
      } else {
        if (i == 0){
          if (cells[i+1].classList.contains('alive') && cells[i+columns].classList.contains('alive')&& cells[i+1+columns].classList.contains('alive')){
            markLive(cells[i]);
          }
        } else if (i == columns - 1){
          if (cells[i-1].classList.contains('alive') && cells[i+columns].classList.contains('alive')&& cells[i-1+columns].classList.contains('alive')){
            markLive(cells[i]);
          }
        } else if (i == (rows-1) * columns){
          if (cells[i+1].classList.contains('alive') && cells[i-columns].classList.contains('alive')&& cells[i+1-columns].classList.contains('alive')){
            markLive(cells[i]);
          }
        } else {
          if (cells[i-1].classList.contains('alive') && cells[i-columns].classList.contains('alive')&& cells[i-1-columns].classList.contains('alive')){
            markLive(cells[i]);
          }
        }
      }
    }

    function firstRow(cells, i){
      if (cells[i].classList.contains('alive')){

      } else {

      }
    }

    var intervalId = setInterval(() => {
      if (document.getElementsByClassName('alive').length == 0){
        console.log('interval is cleared');
        return clearInterval(intervalId);
      }
      var cells = document.querySelectorAll('.cell');
      for (let i=0; i<cells.length; i++){
        if (cornerIndex.includes(i)){
          corners(cells, i);
        } else if (i > 0 && i < columns){ //first row
          firstRow(cells, i);
        } else if (i % columns == 0){ //left column

        } else if ((i + 1) % columns == 0){ //right column

        } else if (i > (rows-1) * columns && i < rows * columns - 1){ //bottom

        } else {

        }

        //if first row don't check its top row
        //if last row don't check its bottom row
        //if left column , don't check its topleft, left, bottomleft
        //if right column, don't check its top right, right, bottomright
        //top-left = i - 1 - this.props.size.columns
        //top = i - this.props.size.columns
        //top-right i + 1 - this.props.size.columns
        //bottom-left = i - 1 + columns
        //bottom = i + columns
        //bottom right = i + columns + 1

      }

      [...document.querySelectorAll('.markDead')].map((cell) => {
        console.log(cell);
        kill(cell);
      });
      [...document.querySelectorAll('.markLive')].map((cell) => {
        regen(cell);
      });
    }, 2000);
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
      this.resumeGame();
  }

  generateCell(e){
    e.target.classList.remove('dead');
    e.target.classList.add('alive');
  }

  renderGrid(){
    const {width, columns, height, rows} = this.props.size
    var colWidth = width / columns;
    var rowHeight = height / rows;
    var total = rows * columns;
    var cells = [];
    for (let i=0; i<total; i++){
      cells.push(<div id = {i} key={i + 1234} onClick={this.generateCell} className='cell dead' style={{width:colWidth, height: rowHeight}}></div>)
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

export default connect(mapStateToProps)(Panel);
