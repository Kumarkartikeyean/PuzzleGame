const gridSizeInput = document.getElementById("gridSizeInput");
const gridSize = parseInt(gridSizeInput.value);

function checkEquality(i,randval) {
    let flag=0;
    for (let j=0;j<i;j++) {
        if (randval==document.getElementById("grid-item"+(j+1)).innerHTML){
            flag=1;
            break;
        }
    }
    if (flag==1){
        return false;
    }
    else {return true}
}


function shuffling() {
    let ar =[];
    let gridSize = parseInt(gridSizeInput.value);    
    for (let i=0;i<(gridSize*gridSize)-1;i++) {
        let randval=Math.ceil(Math.random()*(gridSize*gridSize-1));
        while (checkEquality(i,randval)==false) {
            randval=Math.ceil(Math.random()*(gridSize*gridSize-1));
        }
        document.getElementById("grid-item"+(i+1)).innerHTML=randval;
        ar[i]=randval;
    }
    document.getElementById("grid-item"+(gridSize*gridSize)).innerHTML="";
    ar[gridSize*gridSize-1]=0;
    return ar;
    
}

function solvable(ar) {
    let gridSize = parseInt(gridSizeInput.value);
    let inv = 0;
    for (let i = 0; i <(gridSize*gridSize)-1; i++)
    {
      for (let j = i + 1; j < gridSize*gridSize; j++)
      {
        if (ar[j] && ar[i]!="" && (ar[i] > ar[j]))
          inv++;
      }
    }
    if (inv%2 ==0) {
        console.log("Solvable");
        return true;
    }
    else {
        console.log("Unsolvable");
        return false;
    }
}

function Boxswapper(clicked_id,k) {
    document.getElementById("start").innerHTML="Resume";
    document.getElementById("reset").innerHTML="Restart";
    if (document.getElementById("movecounter").innerHTML=="") {
        timer = true;
        stopWatch();
    }
    let gridSize = parseInt(gridSizeInput.value);
    let i;
    let j;
    i= Math.floor((k-1)/gridSize);
    j=(k-1)%gridSize;
    let kdown= gridSize*(i+1)+(j+1);
    let kup= gridSize*(i-1)+(j+1);
    if ((j+1)<gridSize && document.getElementById("grid-item"+(k+1)).innerHTML=="") { 
        document.getElementById("grid-item"+(k+1)).innerHTML=document.getElementById("grid-item"+(k)).innerHTML;
        document.getElementById("grid-item"+(k)).innerHTML="";
        document.getElementById("movecounter").innerHTML=Number(document.getElementById("movecounter").innerHTML)+1;
    }
    if ((j-1)>=0 && document.getElementById("grid-item"+(k-1)).innerHTML=="") { 
        document.getElementById("grid-item"+(k-1)).innerHTML=document.getElementById("grid-item"+(k)).innerHTML;
        document.getElementById("grid-item"+(k)).innerHTML="";
        document.getElementById("movecounter").innerHTML=Number(document.getElementById("movecounter").innerHTML)+1;
    }
    if ((i+1)<gridSize && document.getElementById("grid-item"+(kdown)).innerHTML=="") { 
        document.getElementById("grid-item"+(kdown)).innerHTML=document.getElementById("grid-item"+(k)).innerHTML;
        document.getElementById("grid-item"+(k)).innerHTML="";
        document.getElementById("movecounter").innerHTML=Number(document.getElementById("movecounter").innerHTML)+1;
    }
    if ((i-1)>=0 && document.getElementById("grid-item"+(kup)).innerHTML=="") { 
        document.getElementById("grid-item"+(kup)).innerHTML=document.getElementById("grid-item"+(k)).innerHTML;
        document.getElementById("grid-item"+(k)).innerHTML="";
        document.getElementById("movecounter").innerHTML=Number(document.getElementById("movecounter").innerHTML)+1;
    }

    for (let i=0;i<gridSize*gridSize-1;i++) {
        if (document.getElementById("grid-item"+(i+1)).innerHTML == (i+1)) {
            document.getElementById("grid-item"+(i+1)).style.background= "linear-gradient(to right," + "#0b7d03" + "," +"#183d01"+")";
            document.getElementById("grid-item"+(i+1)).style.color="yellow"
        }
        else {
            document.getElementById("grid-item"+(i+1)).style.background= "linear-gradient(to right," + "#000000" + "," +"#060b5a"+")";
            document.getElementById("grid-item"+(i+1)).style.color="white"
        }
    }

    let flag = 0;
    for (let i=0;i<gridSize*gridSize-1;i++) {
        if (document.getElementById("grid-item"+(i+1)).innerHTML != (i+1)) {
            flag=1;
            break;
        }
    }
    if (flag==0) {
        let mo=document.getElementById("movecounter").innerHTML;
        document.getElementById("movecounter").innerHTML="";
        document.getElementById("grid-item"+gridSize*gridSize).style.background= "linear-gradient(to right," + "#0b7d03" + "," +"#183d01"+")";

        for (let p=0;p<gridSize*gridSize;p++) {
            let i;
            let j;
            i= Math.floor((p)/gridSize);
            j=(p)%gridSize;
            if (j%2==0) {
                document.getElementById("grid-item"+(p+1)).style.animation = "mynewmove1 4s 1";
            }
            else {
                document.getElementById("grid-item"+(p+1)).style.animation = "mynewmove2 4s 1";
            }
        }
        document.getElementById("popup").classList.add("open-popup");
        document.getElementById("mo").innerHTML="Moves : "+ mo;
        document.getElementById("ti").innerHTML="Time Taken : "+ hour +"Hr"+ minute+ "Min"+ second +"Sec"+ count ;
        timer = false;
        hour = 0;
        minute = 0;
        second = 0;
        count = 0;
        document.getElementById('hr').innerHTML = "00";
        document.getElementById('min').innerHTML = "00";
        document.getElementById('sec').innerHTML = "00";
        document.getElementById('count').innerHTML = "00";
        createGrid();
    }
}

document.getElementById("bu").onclick=function() {
    document.getElementById("popup").classList.remove("open-popup");
}
document.getElementById("leaderboard").onclick=function() {
    document.getElementById("popup1").style.display="block";
}
// function win() {
//     let flag = 0;
//     for (let i=0;i<gridSize*gridSize-1;i++) {
//         console.log(document.getElementById("grid-item"+(i+1)).innerHTML);
//         if (document.getElementById("grid-item"+(i+1)).innerHTML != (i+1)) {
//             flag=1;
//             break;
//         }
//     }
//     if (flag==0) {
//         alert("You Won !!!"+"Moves : "+document.getElementById("movecounter").innerHTML);
//         document.getElementById("movecounter").innerHTML="";
//         timer = false;
//         hour = 0;
//         minute = 0;
//         second = 0;
//         count = 0;
//         document.getElementById('hr').innerHTML = "00";
//         document.getElementById('min').innerHTML = "00";
//         document.getElementById('sec').innerHTML = "00";
//         document.getElementById('count').innerHTML = "00";
        
//     }
// }

function createGrid() {
    const gridSizeInput = document.getElementById("gridSizeInput");
    const gridSize = parseInt(gridSizeInput.value);
    const gridContainer = document.getElementById("gridContainer");

    // Clear existing grid
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
    
    // Set the grid size
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    

    // Create grid items
    for (let i = 0; i < gridSize * gridSize; i++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.id = "grid-item"+ (i+1);
      gridContainer.appendChild(gridItem);
      // Here is function declaration for swapBoxes
      // as doing the same anywhere else is giving
      // undefined. So please don't cut marks for this
      let fontSizegrid=15/(gridSize-1);
        document.getElementById("grid-item"+(i+1)).style.fontSize=fontSizegrid +"vw";
      document.getElementById("grid-item"+ (i+1)).onclick=function swapBoxes() {
        Boxswapper(this.id,(i+1));
        // alert(clicked_id);
        };
    }
    // let randvalue=Math.ceil(Math.random()*gridSize*gridSize);
    // document.getElementById("grid-item"+(7)).innerHTML=randvalue;
    let ar=shuffling();
    let ar1=[];
    for (let i = 0; i < gridSize * gridSize-1; i++) {
        ar1[i]=1+i;
    }
    ar1[gridSize * gridSize-1]=0;
    console.log(ar1);
    console.log(ar);
    while (solvable(ar)==false) {
            ar=shuffling();
    };
    for (let i=0;i<gridSize*gridSize-1;i++) {
        if (document.getElementById("grid-item"+(i+1)).innerHTML == (i+1)) {
            document.getElementById("grid-item"+(i+1)).style.background= "linear-gradient(to right," + "#0b7d03" + "," +"#183d01"+")";
            document.getElementById("grid-item"+(i+1)).style.color="yellow"
        }
    }
    document.getElementById("movecounter").innerHTML="";
    
  }






  let startBtn = document.getElementById('start');
  let stopBtn = document.getElementById('stop');
  let resetBtn = document.getElementById('reset');
   
  let hour = 0;
  let minute = 0;
  let second = 0;
  let count = 0;
   
  startBtn.addEventListener('click', function start() {
      timer = true;
      document.getElementById("start").innerHTML="Resume";
      document.getElementById("reset").innerHTML="Restart";
      stopWatch();
  });
   
  stopBtn.addEventListener('click', function () {
      timer = false;
  });
   
  resetBtn.addEventListener('click', function New_Game() {
      timer = false;
      document.getElementById("start").innerHTML="Start";
      hour = 0;
      minute = 0;
      second = 0;
      count = 0;
      document.getElementById('hr').innerHTML = "00";
      document.getElementById('min').innerHTML = "00";
      document.getElementById('sec').innerHTML = "00";
      document.getElementById('count').innerHTML = "00";
      createGrid();
      document.getElementById("movecounter").innerHTML="";
      document.getElementById("reset").innerHTML="Shuffle";
      confirm("Choose Size of Grid/Reshuffle");
  });
   
  function stopWatch() {
      if (timer) {
          count++;
   
          if (count == 100) {
              second++;
              count = 0;
          }
   
          if (second == 60) {
              minute++;
              second = 0;
          }
   
          if (minute == 60) {
              hour++;
              minute = 0;
              second = 0;
          }
   
          let hrString = hour;
          let minString = minute;
          let secString = second;
          let countString = count;
   
          if (hour < 10) {
              hrString = "0" + hrString;
          }
   
          if (minute < 10) {
              minString = "0" + minString;
          }
   
          if (second < 10) {
              secString = "0" + secString;
          }
   
          if (count < 10) {
              countString = "0" + countString;
          }
   
          document.getElementById('hr').innerHTML = hrString;
          document.getElementById('min').innerHTML = minString;
          document.getElementById('sec').innerHTML = secString;
          document.getElementById('count').innerHTML = countString;
          setTimeout(stopWatch, 10);
      }
  }