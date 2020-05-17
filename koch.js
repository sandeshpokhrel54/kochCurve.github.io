//setup canvas
const canvas = document.querySelector('canvas');
const  ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let btn = document.querySelector('button');

let check;

function kochline(startp,endp)
{
    this.startp = startp;
    this.endp = endp;
    this.len = Math.sqrt(Math.pow((endp[0] - startp[0]),2) + Math.pow(endp[1]-startp[1],2));

}

kochline.prototype.draw = function()
{

    ctx.beginPath();
    ctx.strokeStyle = 'green'; 
    ctx.moveTo(this.startp[0],this.startp[1]);
    ctx.lineTo(this.endp[0],this.endp[1]);
    ctx.stroke();



}

kochline.prototype.update = function(next)
{
    //create an array of five points which
    

    let a = [];
    let b = [];
    let c = [];
    let d = [];
    let e = [];

    a = this.startp;
    e = this.endp;

    b = [(this.startp[0]*2/3 + this.endp[0]*1/3) , this.startp[1]*2/3 + this.endp[1]*1/3];

    // c = [(this.startp[0]+this.endp[0])/2 , (this.startp[1]+this.endp[1])/2 - Math.sin(Math.PI/3) * this.len/3] ;

    d = [(this.startp[0]*1/3 + this.endp[0]*2/3) , this.startp[1]*1/3 + this.endp[1]*2/3];

    //tweeking the value of c gives weird shapes

    c = [( b[0] + d[0] + 1.732 * (-b[1] + d[1]))/2  , (b[1] + d[1] + 1.732 * (b[0] - d[0]))/2];

        
    next.push(new kochline(a,b));
    next.push(new kochline(b,c));
    next.push(new kochline(c,d));
    next.push(new kochline(d,e));  

    console.log(b);
    console.log(c);

}

// evnt =  document.addEventListener('keydown',function(event){
//     if (event.keyCode === 32)
//         check = true;
// });

btn.onclick = function()
{
    check = true;
}


let k = new kochline([width/4,height/2],[3*width/4,height/2]);
let arr = [];
arr.push(k);


function loop()
{

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,width,height);
    let next = [];

    for(let j = 0; j<arr.length;j++)
        {
            // alert('draw');
            arr[j].draw();

        }
    if (check)
    {

        for (let i=0;i<arr.length;i++)
        {
            // alert('update');

            if (arr[i].len > 0.05)
                { 
                    arr[i].update(next);

                }
               
        }

    arr = next;
    check = false;
    }

    requestAnimationFrame(loop);
}

loop();
