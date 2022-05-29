var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var hist = [1,3,3,2,1,4,1,2,2,3,2]
var bound = 100;
var bounds = [];
while (bound>=50)
{
    bounds.push(bound);
    bound -=5;
}
bounds.push(0);

function onlyNumberKey(evt) {
   
    var ASCIICode = evt.which 
    if (ASCIICode != 46 && (ASCIICode < 48 || ASCIICode > 57)) {
        alert("Only digits 0-9 and dot are allowed!");
        return false;
    }
    return true;
}


function validGrade(grade){


}

function getLetter(i)
{
   
    var index = 1;
    while(index<12)
    {   
        if(i>=bounds[index]){
            return index-1;
        }
        else{
            index = index + 1;
        }
    }
    return 10;
}



function updateBounds(i){
    console.log(i)
    new_value = parseFloat(document.getElementsByName("bound")[i].value)
    
    if(new_value != bounds[i])
    {
        if(new_value<bounds[i+1] || new_value>bounds[i-1]){
            alert("The bound should not overlap the neighboring bounds!");
            document.getElementsByName("bound")[i].value = bounds[i].toFixed(2)
            return;
        }
        else{
            console.log(new_value)
            document.getElementsByName("bound")[i].value = new_value.toFixed(2)
            bounds[i] = new_value
            updateHist2(i)
        }

    }
}

function updateHist2(index){

    var lower = 0; var higher = 0;
    bound_higher = bounds[index-1];
    bound_middle = bounds[index];
    bound_lower = bounds[index+1];
    console.log(bound_higher,bound_middle, bound_lower)
    for (x in grades){
        if(grades[x]<bound_higher && grades[x]>=bound_middle){higher++;}
        if(grades[x]<bound_middle && grades[x]>=bound_lower){lower++;}
    }
    console.log(higher, lower)
    hist[index-1] = higher;
    hist[index] = lower;
    updateHistGrade(index);
    updateHistGrade(index-1);

}


function updateHistGrade(index)
{
    //var text = document.getElementsByClassName("cell")[index].innerHTML;
    text = '';
    for (let i=0; i<hist[index]; i++){
        text = text + 'O';
    }
    
    document.getElementsByClassName("cell")[index].innerHTML = text;
}

function asc(a,b){
    return a-b;
}
grades.sort(asc)



function runcommand(evt){
    var temp = document.getElementById("grade").value;
    document.getElementById("grade").value = "";
    console.log(temp);
    if(temp<=100 && temp>=0){
        grades.push(temp);
        var index = getLetter(temp);
        hist[index] += 1
        updateHistGrade(index)
    }
    else{
        alert("Add a grade between 0 and 100");
    }
    

    
}

document.getElementById("button").onclick = runcommand;

for (let i=1; i<11; i++)
{
    document.getElementsByName("bound")[i].addEventListener('blur', (event)=>updateBounds(i))
}

// document.getElementById("button").addEventListener('click', (evt)=>{console.log("world")})

// window.addEventListener('keypress', (evt)=>{console.log(evt.key)});