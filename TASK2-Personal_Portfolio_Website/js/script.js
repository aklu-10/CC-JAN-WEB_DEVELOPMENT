import projects from "./projects.js";
import skills from "./skills.js";

let titleHolder=document.querySelector("#profession");
let titles=["Akash Kumar.","a Student.","exploring Web Dev."];
let charIndex=0;
let titleIndex=0;

function writeTitle(title)
{
    let timer=setInterval(()=>
    {
        if(charIndex>title.length-2)
        {
            clearInterval(timer);
            setTimeout(()=>
            {
                removeTitle(title,charIndex);

            },1000)
        }
        titleHolder.innerHTML+=title[charIndex];
        charIndex++;
        
    },200)
}

function removeTitle(title,index)
{

    titleHolder.innerHTML=title.slice(0,index); 
    let timer=setInterval(()=>
    {
        index--;
        if(index===0)
        {
            charIndex=0;
            titleIndex++;
            if(titleIndex>titles.length-1)
                titleIndex=0;
            clearInterval(timer);
            writeTitle(titles[titleIndex]);
        }
        titleHolder.innerHTML=title.slice(0,index);
        
    },100)
}


writeTitle(titles[titleIndex]);

let hamMenu=document.querySelector("#hamMenu");
let navigationsContainer=document.querySelector(".menu").parentElement;
let navigations=document.querySelector(".menu");

navigationsContainer.addEventListener("click",function(e)
{
    if(window.innerWidth<=786)
        navigationsContainer.style.display="none";
})

hamMenu.addEventListener("click",()=>
{
    if(navigationsContainer.style.display==="flex")
        navigationsContainer.style.display="none";
    else
        navigationsContainer.style.display="flex";

    navigations.style.left="0%";
})

window.onresize=()=>
{
    if(window.innerWidth>=786)
    {
        navigationsContainer.style.display="flex";
        navigations.style.display="flex";
    }
    else
    {
        navigationsContainer.style.display="none";
    }
}


let moveToTop_icon=document.querySelector(".toTop");
let hero_section=document.querySelector(".hero");

window.onscroll=(e)=>
{
    if(window.scrollY>=hero_section.scrollHeight)
    {
        moveToTop_icon.style.display="block";
    }
    if(window.scrollY===0)
    {
        moveToTop_icon.style.display="none";
    }
}

moveToTop_icon.addEventListener("click",(e)=>
{
    document.documentElement.scrollTop=0;   
})




let inputs=document.querySelectorAll(".form_input");

let errMsgs={

    nameError:"Name should have atleast 3 characters.",
    emailError:"Enter a valid email.",
    msgError:"Message is too short.",

}

let handleLabel=(e)=>
{
    let errMessage=e.target.nextElementSibling.nextElementSibling.id;
    let errorContainer=document.querySelector(`#${errMessage}`);
    let label=e.target.nextElementSibling;

    

    if(e.target.value)
    {
        label.style.top="-15px";
        label.style.zIndex="1";
        
        if(e.target.validity.valid){
            label.style.top="-15px";
            label.style.zIndex="1";
            errorContainer.innerHTML="";
        }
        
        if(e.target.validity.valid)
        {
            e.target.style.border="none";
            e.target.style.boxShadow="0px 0px 3px black";
            errorContainer.innerHTML="";
            
        }
        else
        {
            errorContainer.innerHTML=errMsgs[`${errMessage}`];
            label.style.top="-15px";
            label.style.zIndex="1";
        }
    }
    else
    {
        e.target.style.border="1px solid rgba(255,255,255,.4)";
        e.target.style.boxShadow="none";
    }
    
    if(!e.target.validity.valid && e.target.value.length===0)
    {
        label.style.top="10px";
        label.style.zIndex="-1";
    }
    
    if(e.target.validity.valid && label.style.top==="10px")
    {
        label.style.top="-15px";        
        label.style.zIndex="1";        
    }

    if(!e.target.value.length)
    {
        label.style.top="-15px";
        label.style.zIndex="1";
    }
}

for(let input of inputs)
{
    input.onkeydown=handleLabel;
}

let projectContainer=document.querySelector(".projects_container");



projects.map((project)=>
{
    let content=`<div class="project_item ${project.type}"><img src=${project.image} alt=${project.name + project.type}> <div class="project_hover_effect"> <p>${project.type}</p> <h2>${project.name}</h2> <div style="width:100%;display:flex;justify-content:space-between; align-items: flex-end;"> <a href=${project.url}><button class="view">View</button></a><em style="font-weight:200; width: 50%;margin-left: 2px;text-align: right;" >${project.tools}</em></div></div></div>`;

    projectContainer.insertAdjacentHTML("beforeend",content);

})

function filterProjects(type)
{
    let project_items=document.querySelectorAll(".project_item");

    for(let p of project_items)
    {
        if(type=="all")
        {
            p.style.display="";
        }
        else
        {
            if(p.classList.contains(type))
            {
                p.style.display="flex";
            }
            else
            {
                p.style.display="none";
            }
        }
    }

}

let filterBtns=document.querySelectorAll(".filter .filter_btn");

for(let btn of filterBtns)
{
    btn.addEventListener("click",(e)=>
    {
        filterProjects(e.target.classList[1]);
        removeActiveclsBtn();
        e.target.classList.add("active");
    });
}


function removeActiveclsBtn()
{
    for(let btn of filterBtns)
    {
        btn.classList.remove("active");       
    }
}


let form = document.querySelector("form");

form.onsubmit=()=>
{
    sessionStorage.setItem("formSubmit",true);
}

let labels=document.querySelectorAll("label");

for(let l of labels)
{
    if(sessionStorage.getItem("formSubmit"))
    {
        l.style.top="-15px";
        l.style.zIndex="1";
    }
}



let skill_container=document.querySelector(".skill_set");

skills.map((skill)=>
{
    let content=skillContent(skill);
    skill.id%2===0 ? skill_container.insertAdjacentHTML("beforeend",content) : skill_container.insertAdjacentHTML("beforeend",content);
})

function skillContent(skill)
{

    let simage=skill.image
    let sname=skill.name;
    let sxp=skill.xp;

    let skill_item=`<div class="skill_item" title=${sname}>
                        <div class="skill_img">
                            <img src=${simage} alt=${sname}+"_image">
                        </div>

                        <div class="xp">
                            <span class="line"></span>
                            <button class="btn">${sxp}</button>
                        </div>
                    </div>`;

    let skill_item_rev=`<div class="skill_item rev_sk" title=${sname}>
                            <div class="xp">
                                <button class="btn">${sxp}</button>
                                <span class="line rev"></span>
                            </div>
                            <div class="skill_img">
                                <img src=${simage} alt=${sname}+"_image>
                            </div>
                    </div>`;

    return skill.id%2==0?skill_item_rev:skill_item;
}
