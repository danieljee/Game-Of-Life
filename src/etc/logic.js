export default (columns, rows, speed, pause, incrementGeneration, resetGeneration) => {
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
    var neighbours = 0;
    const neighbourindex = [i-1, i-1+columns, i+columns, i+1+columns, i+1, i-1+(rows-1)*columns, i+(rows-1)*columns, i+1+(rows-1)*columns];
    for(let n=0; n<neighbourindex.length;n++){
      if (cells[neighbourindex[n]].classList.contains('alive')) neighbours++;
    }
    if (cells[i].classList.contains('alive')){
      if(neighbours < 2 || neighbours > 3){
        markDead(cells[i]);
      }
    } else {
      if(neighbours === 3){
        markLive(cells[i]);
      }
    }
  }

  function leftColumn(cells, i){
    var neighbours = 0;
    const neighbourindex = [i-columns, i+1-columns, i+1, i+1+columns, i+columns, i-1, i+(columns-1), i+(columns * 2 - 1)];
    for(let n=0; n<neighbourindex.length;n++){
      if (cells[neighbourindex[n]].classList.contains('alive')) neighbours++;
    }
    if (cells[i].classList.contains('alive')){
      if(neighbours < 2 || neighbours > 3){
        markDead(cells[i]);
      }
    } else {
      if(neighbours === 3){
        markLive(cells[i]);
      }
    }
  }

  function rightColumn(cells, i){
    var neighbours = 0;
    const neighbourindex = [i-columns, i-1-columns, i-1, i-1+columns, i+columns, i+1-(columns * 2), i+1-columns, i+1];
    for(let n=0; n<neighbourindex.length;n++){
      if (cells[neighbourindex[n]].classList.contains('alive')) neighbours++;
    }
    if (cells[i].classList.contains('alive')){
      if(neighbours < 2 || neighbours > 3){
        markDead(cells[i]);
      }
    } else {
      if(neighbours === 3){
        markLive(cells[i]);
      }
    }
  }

  function lastRow(cells, i){
    var neighbours = 0;
    const neighbourindex = [i-1, i-1-columns, i-columns, i+1-columns, i+1, i-1-(rows-1)*columns, i-(rows-1)*columns, i+1-(rows-1)*columns];
    for(let n=0; n<neighbourindex.length;n++){
      if (cells[neighbourindex[n]].classList.contains('alive')) neighbours++;
    }
    if (cells[i].classList.contains('alive')){
      if(neighbours < 2 || neighbours > 3){
        markDead(cells[i]);
      }
    } else {
      if(neighbours === 3){
        markLive(cells[i]);
      }
    }
  }

  function center(cells, i){
    var neighbours = 0;
    const neighbourindex = [i-1-columns, i-columns, i+1-columns, i+1, i+1+columns, i+columns, i-1+columns, i-1];
    for(let n=0; n<neighbourindex.length;n++){
      if (cells[neighbourindex[n]].classList.contains('alive')) neighbours++;
    }
    if (cells[i].classList.contains('alive')){
      if(neighbours < 2 || neighbours > 3){
        markDead(cells[i]);
      }
    } else {
      if(neighbours === 3){
        markLive(cells[i]);
      }
    }
  }

  var intervalId = setInterval(()=>{
    if (document.getElementsByClassName('alive').length === 0){
      console.log('bbbbbbbbbb');
      clearInterval(intervalId);
      pause();
      resetGeneration();
      return;
    }
    incrementGeneration();
    var cells = document.querySelectorAll('.cell');
    for (let i=0; i<cells.length; i++){
      if (cornerIndex.includes(i)){
        corners(cells, i);
      } else if (i > 0 && i < columns){ //first row
        firstRow(cells, i);
      } else if (i % columns == 0){ //left column
        leftColumn(cells, i);
      } else if ((i + 1) % columns == 0){ //right column
        rightColumn(cells, i);
      } else if (i > (rows-1) * columns && i < rows * columns - 1){ //bottom
        lastRow(cells, i);
      } else {
        center(cells, i);
      }
    }
    [...document.querySelectorAll('.markLive')].map((cell) => {
      regen(cell);
    });
    [...document.querySelectorAll('.markDead')].map((cell) => {
      kill(cell);
      console.log('awef00');
      if (document.getElementsByClassName('alive').length === 0){
        console.log('no cells alive!');
        clearInterval(intervalId);
        pause();
        resetGeneration();
      }
    });

  }, speed);
  return intervalId;
};
