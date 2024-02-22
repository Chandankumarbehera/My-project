let ct=document.getElementById("ct");
let c=document.getElementById('count');
let count=0;
function incr()
{
    if(count<20){
        count++;
        
        if( count%2 == 0){
            c.textContent=count;
            ct.textContent="even"; 
        }
        else{
            c.textContent=count;
            ct.textContent="odd"; 
        }
    }
    else{
        alert("You have reached the maximum of 20")
    }
}

function reset()
{
    count =0
    c.textContent=0;
    ct.textContent="even/odd"
}

function decre()
{
    if(count>0){
        count--
        if( count%2 == 0){
            c.textContent=count;
            ct.textContent="even"; 
        }
        else{
            c.textContent=count;
            ct.textContent="odd"; 
        }
    }
    else{
        alert("You have reached the minimum of 0")
    }
}
