export default (columns, rows, cornerIndex, speed) => {

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

  return intervalId;
};
