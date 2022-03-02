/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections=document.querySelectorAll("section");
let nav=document.getElementById("navbar__list");
let links=[];
let oldlink,newlink;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function make_data_li(){
    for(let i=0;i< sections.length;i++) {
        sections[i].setAttribute("data-li",`sec${i}`);
    }    
}
function hieghlighte(sec){
    let link=document.getElementById(sec.getAttribute("data-li"));
    newlink=link;
    if(oldlink!==undefined && oldlink!==newlink){
        oldlink.style.backgroundColor="#fff";
        oldlink.style.color="black";
    }
    if(newlink!==undefined && oldlink!==newlink){
        oldlink=newlink;
        newlink.style.backgroundColor="#333";
        newlink.style.color="#fff";
    }
}
function at_begging(sec) {
    
    sec.scrollIntoView({behavior:"smooth",block:"center"});    
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function make_nav() {
    let freg=document.createDocumentFragment();
    for (let i=0;i<sections.length;i++) {
        links.push(document.createElement("li"));
        links[i].textContent=sections[i].getAttribute("data-nav");
        links[i].setAttribute('class','menu__link');
        links[i].setAttribute('id',`sec${i}`);
        links[i].setAttribute('data-link',sections[i].id);
        freg.appendChild(links[i]);

    }
    nav.appendChild(freg);
    make_data_li();
}

// Add class 'active' to section when near top of viewport
function active() {
    document.addEventListener("scroll",function(evt){
        for (const sec of sections) {
            let rec=sec.getBoundingClientRect(); 
            if (rec.top<=100 && rec.top>-200){
                sec.classList=["your-active-class"];
                let link=document.getElementById(sec.getAttribute("data-li"));
                link.classList=["menu__link","active"];
                hieghlighte(sec);  
                for (const item of sections) {
                    if(item != sec){
                        let link=document.getElementById(sec.getAttribute("data-li"));
                        link.classList=["menu__link"];
                        item.classList=[];
                    }
                    
                }
            }
        }
    })  
}

// Scroll to anchor by using scrollIntoView event
function viewPoint(links) {
    
    for(const item of links){

        let section=document.getElementById(item.getAttribute("data-link"));
        
        item.addEventListener("click",function () { 
            section.scrollIntoView({behavior:"smooth",block:"center"});      
        })
    }    
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// using at_begging function to start from section1 after the page loading 
at_begging(sections[0]);

// Build menu 
make_nav();
// Scroll to section on link click
viewPoint(links);
// Set sections as active
active()
















