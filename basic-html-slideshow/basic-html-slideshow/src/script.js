var slideshow = document.querySelector('[data-slideshow]')
    slides = slideshow.querySelectorAll('[data-slide]')
for (j=0;j<slides.length;j++){
  slides[j].setAttribute('data-slide',j)
}
var count = 0
function move(direction){
  if (direction == 'prev'){
    if (document.querySelector('[data-slideshow] [data-slide="'+(count-1)+'"]')){
      document.querySelector('[data-slideshow] [data-slide="'+(count-1)+'"]').style.left = '-100vw'
    }
    document.querySelector('[data-slideshow] [data-slide="'+count+'"]').style.left = '0'
    if (document.querySelector('[data-slideshow] [data-slide="'+(count+1)+'"]')){
      document.querySelector('[data-slideshow] [data-slide="'+(count+1)+'"]').style.left = '100vw'
    }
    if (count-1 >= 0){
      count--
    }
  }
  if (direction == 'next'){
    document.querySelector('[data-slideshow] [data-slide="'+count+'"]').style.left = '-100vw'
    if (document.querySelector('[data-slideshow] [data-slide="'+(count+1)+'"]')){
      document.querySelector('[data-slideshow] [data-slide="'+(count+1)+'"]').style.left = '0'
    }
    if (document.querySelector('[data-slideshow] [data-slide="'+(count+2)+'"]')){
      document.querySelector('[data-slideshow] [data-slide="'+(count+2)+'"]').style.left = '100vw'
      count++
    }
  }
}
// Arrow keys to navigate
document.onkeyup = function(e){
  e.preventDefault()
  var charCode = e.which;
  charCode==37 && move('prev')
  charCode==39 && move('next')
}
// Swipe to Navigate
var gesture = {
      x: [],
      y: [],
      match: ''
    },
    tolerance = 100;
window.addEventListener('touchstart',function(e){
  e.preventDefault()
  for (var i=0; i<e.touches.length; i++){
    var dot = document.createElement('div');
    dot.id = i
    dot.style.top = e.touches[i].clientY-25+'px'
    dot.style.left = e.touches[i].clientX-25+'px'
    document.body.appendChild(dot)
    gesture.x.push(e.touches[i].clientX)
    gesture.y.push(e.touches[i].clientY)
  }
});
window.addEventListener('touchmove',function(e){
  for (var i=0; i<e.touches.length; i++) {
    var dot = document.getElementById(i);
    dot.style.top = e.touches[i].clientY-25+'px'
    dot.style.left = e.touches[i].clientX-25+'px'
    gesture.x.push(e.touches[i].clientX)
    gesture.y.push(e.touches[i].clientY)
  }
});
window.addEventListener('touchend',function(e){
  var dots = document.querySelectorAll('div'),
      xTravel = gesture.x[gesture.x.length-1] - gesture.x[0],
      yTravel = gesture.y[gesture.y.length-1] - gesture.y[0];
  if (yTravel<tolerance && yTravel>-tolerance && xTravel<-tolerance){
    move('next')
  }
  if (yTravel<tolerance && yTravel>-tolerance && xTravel>tolerance){
    move('prev')
  }
  gesture.x = []
  gesture.y = []
  gesture.match = xTravel = yTravel = ''
  for (i=0;i<dots.length;i++){
    dots[i].id = ''
    dots[i].style.opacity = 0
    setTimeout(function(){
      document.body.removeChild(dots[i])
    },1000)
  }
})