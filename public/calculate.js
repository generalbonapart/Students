var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var hist = [1,3,3,2,1,4,1,2,2,3,2]

function getLetter(i)
{
    var bound = 95;
    var index = 0;
    while(bound >= 50)
    {   
        if(i>=bound){
            return index;
        }
        else{
            bound = bound - 5;
            index = index + 1;
        }
    }

    return 10;
}

function updateHist(index)
{
    //var text = document.getElementsByClassName("cell")[index].innerHTML;
    text = 'O';
    for (let i=0; i<hist[index]; i++){
        text = text + 'O';
    }
    hist[index] += 1
    document.getElementsByClassName("cell")[index].innerHTML = text;
}

function asc(a,b){
    return a-b;
}
grades.sort(asc)



function runcommand(evt){
    var temp = document.getElementById("grade").value;
    document.getElementById("grade").value = "";
    grades.push(temp);
    var index = getLetter(temp);
    updateHist(index)
    

    console.log(index);
}

document.getElementById("button").onclick = runcommand;

// document.getElementById("button").addEventListener('click', (evt)=>{console.log("hello")})
// document.getElementById("button").addEventListener('click', (evt)=>{console.log("world")})

// window.addEventListener('keypress', (evt)=>{console.log(evt.key)});