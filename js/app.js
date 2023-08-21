
$(document).ready(function () {
   $('.reviews__slider').slick({
         arrows: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         speed: 500,
         easing: 'ease-in-out',
         infinite: false,
         autoplay: true,
         autoplaySpeed: 4000,
         touchTreshold: 5,
         centerMode: false,
         focusOnSelect:false,
         prevArrow:$('.reviews__prev'),
         nextArrow:$('.reviews__next'),
   });
})

import { smoothScroll } from "./module.js/smoothScroll.js";
import { spoilerFlex } from "./module.js/spoiler.js";


spoilerFlex()
window.addEventListener('resize',()=>{
   spoilerFlex()
})

const clickSmooths = [...document.querySelectorAll('[data-smooth]')];
clickSmooths.forEach(el=>{
   el.addEventListener('click',(e)=>{
      e.preventDefault
      if(document.body.classList.contains("_burgerOpen")){
         document.body.classList.remove('_burgerOpen')
         document.body.style.overflow=''
      }
      smoothScroll(el.dataset.smooth);
   })
})

const burger = document.querySelector('._burger');
if(burger){
   burger.addEventListener('click',(e)=>{
      if(document.body.classList.contains("_burgerOpen")){
         document.body.classList.remove('_burgerOpen')
         document.body.style.overflow=''
      }else{
         document.body.classList.add('_burgerOpen')
         document.body.style.overflow='hidden'
      }
   })
}


const headerPosition = (()=>{
   let prevY = null;
   const intro = document.querySelector('.intro');
   const header = document.querySelector('.header');
   let count = 0;

   function countAdd(){
      const memoryCount = ++count;
      if(count>10)return;
      setTimeout(()=>{
         if(memoryCount === count)count = 0;
      },1000)
   }

   return (e)=>{
      if(window.scrollY > intro.clientHeight){
         header.classList.add('_fixed')
         if(prevY && scrollY > prevY){
               header.style.cssText = `
               transition:.2s;
               transform:translateY(-120%);
               `
         }else if(prevY && scrollY < prevY){
            if(count < 10 && header.style.transform !== 'translateY(0px)'){ 
               countAdd()
            }else{
               header.style.cssText=`
               position:fixed;
               transition:.2s;
               transform:translateY(0);
               `
               count = 0;
            }
         }
      }else{
         header.classList.remove('_fixed')
         header.style.cssText=`
         position:absolute;
         transform:translateY(0);
         transition:.3s;
         `
      }
      prevY = scrollY
      console.log(count);
   }
})();

window.addEventListener('scroll',headerPosition)


let typed = new Typed('.intro__article', {
   strings: ['"Hi,my name is <span>Denis</span> <br>I am a <span>Front-End</span> web <span>Developer</span> with a lot of experience"'],
   typeSpeed: 30
 });



AOS.init();

