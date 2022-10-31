

document.addEventListener("DOMContentLoaded", ready);

function ready () {

        Draggable.create('.wrap', {
            inertia: true
        })

}


window.addEventListener('mousemove', ()=>{
    afte()
    tope()
    // redraw()

})

let loock = document.querySelector('.loock');
document.querySelectorAll('.colums__display').forEach((el)=>{
    el.addEventListener('click', ()=>{
        console.log(xy(el).l + 2050)
    })
})


function xy(x) {
    o = x;
    var l =o.offsetLeft; var t = o.offsetTop;
    while (o=o.offsetParent)
        l += o.offsetLeft;
    o = x;
    while (o=o.offsetParent)
        t += o.offsetTop;
    return {l,t};
}

function tope (){
    document.querySelectorAll('.wert').forEach((el)=>{
        if (el.getBoundingClientRect().y > window.innerHeight) {
            el.classList.add('bottom')
            el.classList.remove('top')
            el.classList.remove('topActive')
            el.style.top = xy(el).t - (1150 *3) + 'px';
        } else if((el.getBoundingClientRect().y + el.getBoundingClientRect().height) < 0) {
            el.classList.remove('bottom')
            el.classList.add('top')
            el.classList.remove('topActive')
            el.style.top = xy(el).t + (1150 *3) + 'px';
        } else if((el.getBoundingClientRect().y + el.getBoundingClientRect().height) > 0 || el.getBoundingClientRect().y < window.innerHeight + 0 ) {
            el.classList.remove('bottom')
            el.classList.remove('bottom')
            el.classList.add('topActive')
        }
    })
}

function afte (){
    document.querySelectorAll('.colums__display').forEach((el)=>{
        if (el.getBoundingClientRect().x > window.innerWidth) {
            el.classList.add('after')
            el.classList.remove('befor')
            el.classList.remove('active')
            el.style.left = xy(el).l - (2050 *3) + 'px';
        } else if((el.getBoundingClientRect().x + el.getBoundingClientRect().width) < 0) {
            el.classList.remove('after')
            el.classList.add('befor')
            el.classList.remove('active')
            el.style.left = xy(el).l + (2050 *3) + 'px';
        } else if((el.getBoundingClientRect().x + el.getBoundingClientRect().width) > 0 || el.getBoundingClientRect().x < window.innerWidth + 0 ) {
            el.classList.remove('after')
            el.classList.remove('befor')
            el.classList.add('active')
        }
    })
}

// function redraw () {
//     document.querySelectorAll('.colums__display').forEach((el)=>{
//         if(el.classList.contains('after')) {
//         }
//     })
// }




// изменение размера штуки

let headerHeight = document.querySelector('header').getBoundingClientRect().height;
let footerHeight = document.querySelector('footer').getBoundingClientRect().height;
let windowHeight = window.innerHeight;
let container = document.querySelector('.thing');
container.style.height = windowHeight - headerHeight - footerHeight + 'px';
window.onresize = resize();
function resize () {
    container.style.height = windowHeight - headerHeight - footerHeight + 'px';
}
