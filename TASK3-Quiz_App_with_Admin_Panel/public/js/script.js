let Btns=document.querySelectorAll(".btn");

for(let btn of Btns)
{

    btn.addEventListener("mouseover",function(e)
    {
        let span=document.createElement("span");
        span.classList.add("ripple");
        let x=e.clientX-e.target.offsetLeft;
        let y=e.clientY-e.target.offsetTop;
        span.style.left=x+"px";
        span.style.top=y+"px";
        e.target.appendChild(span);
    })

    btn.addEventListener("mouseout",function(e)
    {
        let rippleSpan=document.querySelector(".ripple");
        rippleSpan.remove();
    })

}

const menu=document.querySelector(".menu nav:last-child .hammenu");
let mobileNavbar=document.querySelectorAll(".quizzesNavMobile");
let quizzesNavbar=document.querySelector(".quizzesNav");


window.onresize=(e)=>
{
    if(window.innerWidth<800)
    {
        quizzesNavbar.style.display="none";
    }
    else{
        quizzesNavbar.style.display="";
    }
}

try{
    if(window.innerWidth<800 && quizzesNavbar)
    {
        quizzesNavbar.style.display="none";
    }else{
        quizzesNavbar.style.display="";
    }
}catch(err){
    console.log(err);
}
    

menu.onclick=()=>
{
    if(mobileNavbar[0].style.height==="max-content")
        mobileNavbar[0].style.height="0";
    else
        mobileNavbar[0].style.height="max-content";
}

