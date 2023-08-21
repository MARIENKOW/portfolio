
function smoothScrollWrapper(){

   const step = 30;
   let previusPosition = null

   function toScroll(element,position){
      let elementPosition
      if(element === 'top'){
            elementPosition = 0
      }else if(element === 'bottom'){
            elementPosition = document.body.clientHeight  - window.innerHeight
      }else{
            const elementIn = document.querySelector(element);
            if(!elementIn) return
            const elementInfo = elementIn.getBoundingClientRect();
            if(position === 'top'){
                  elementPosition = window.scrollY + elementInfo.top
            }else if(position ==='bottom'){
                  elementPosition = window.scrollY + elementInfo.bottom - window.innerHeight;
            }else{
                  elementPosition = window.scrollY + elementInfo.top + elementInfo.height/2 -(window.innerHeight/2)
            }
      }
      return elementPosition;
   }

   return function (element,position,speed = 0){
      if (previusPosition != null)return
      function scrollBottom(){
         setTimeout(()=>{
            if(window.scrollY+step >= whereToScroll){
               window.scrollTo(0,whereToScroll);
               return previusPosition = null
            }
            if(window.scrollY+step > document.body.clientHeight  - window.innerHeight){
               window.scrollTo(0,document.body.clientHeight  - window.innerHeight);
               return previusPosition = null;
            }
            window.scrollTo(0,window.scrollY+step);
            previusPosition = window.scrollY;
            scrollBottom()
         },speed)
      }
      function scrollTop(){
         setTimeout(()=>{
            if(window.scrollY-step <= whereToScroll){
               window.scrollTo(0,whereToScroll);
               return previusPosition = null
            }
            if(window.scrollY-step < 0) {
               window.scrollTo(0,0);
               return previusPosition = null;
            }
            window.scrollTo(0,window.scrollY-step);
            previusPosition = window.scrollY;
            scrollTop()
         },speed)
      }
      const whereToScroll = toScroll(element,position);
      if(whereToScroll==='undefind')return;

      if(whereToScroll>window.scrollY)scrollBottom()
      if(whereToScroll<window.scrollY)scrollTop()
   }
   
}

export const smoothScroll = smoothScrollWrapper();