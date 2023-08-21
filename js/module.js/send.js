const send = document.querySelector('._ajaxFormSend');
if(!send) throw new Error('there is no btn "send"');
send.addEventListener('click',event=>{
   event.preventDefault();

   const block = document.querySelector('form');

   if(!validateForm(block) || send.classList.contains('_formSended')) return

   send.classList.add('_formSended');

   const img = document.createElement('img');
   img.src = 'img/contacts/load.gif';
   img.style.cssText = `
   width:30px;
   height:30px;
   margin: 0 0 0 10px;
   position:relative;
   z-index:2;
   `
   send.appendChild(img);
   console.log('drger');
   const formData  = new FormData();

   formData.append('name',block.querySelector('[data-type="name"]').value)
   formData.append('mail',block.querySelector('[data-type="mail"]').value)
   formData.append('question',block.querySelector('[data-type="question"]').value)

   const xhr = new XMLHttpRequest();
   xhr.open('POST', '../php/send.php');
   setTimeout(()=>xhr.send(formData),1000);
   xhr.onload = function() {
      if (xhr.status != 200) {
         send.removeChild(img);
         alert("something went wrong, please send a request later"); 
         send.classList.remove('_formSended');

      } else { 
         if(xhr.response === 'true'){
            send.innerHTML=`
            <svg class='_goodSend' style='width:30px;height:25px;fill:#000;position:relative;z-index:2'>
               <use xlink:href="#arrow2"></use>
            </svg>`;
         }else{
            send.removeChild(img);
            alert("something went wrong, please send a request later");
            send.classList.remove('_formSended');
         }
      }
   };
   xhr.onerror = function() {
      send.removeChild(img);
      alert("something went wrong, please send a request later");
      send.classList.remove('_formSended');
   };
})

function validateForm(form){
   const inputs = [...form.querySelectorAll('[data-input]')];
   const badInputs = inputs.filter(input=>checkInput(input))
   console.log(badInputs);
   if(badInputs.length > 0 ){
      badInputs.forEach(input=>{
         input.parentElement.classList.add('_badInput');
         input.addEventListener('input',deleteCheck)
      })
      return false
   }
   return true
}

function deleteCheck(event){
   event.target.parentElement.classList.remove('_badInput');
   event.target.removeEventListener('input',deleteCheck);
}

function checkInput(input){
   if(input.dataset.type === 'name'){
      if(input.value.length <= 2)return true
   }
   if(input.dataset.type === 'mail'){
      return !String(input.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
   }
   if(input.dataset.type === 'question'){
      if(input.value.length < 15)return true
   }
   return false
}