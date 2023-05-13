const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerSet = "abcdefghijklmnopqrstuvwxyz"
const numberSet = "1234567890"
const symbolSet = "~!@#$%^&*()_+/"

const upperCase=document.getElementById("upper-case");
const lowerCase=document.getElementById("lower-case");
const number=document.getElementById("numbers");
const symbol=document.getElementById("special-char");
const passLen=document.getElementById("passLen");
const btn=document.querySelector(".btn");
const passBox=document.querySelector(".pass-box");



function passwordGenerator(password="")
    {  
     
       if(upperCase.checked)
          {
            password+=upperSet[Math.floor(Math.random()*upperSet.length)];
          }
      if(lowerCase.checked)
        {
        password+=lowerSet[Math.floor(Math.random()*lowerSet.length)];
        }   
      if(number.checked)
        {
            password+=numberSet[Math.floor(Math.random()*numberSet.length)];
        }  
      if(symbol.checked)
        {
          password+=symbolSet[Math.floor(Math.random()*symbolSet.length)];
        }  
      if(password.length==0)
        {
           return "please select atleast a type";
        }
      if(password.length<passLen.value) 
          {
            
            return passwordGenerator(password);
          } 
      else{
             return password;
          }    
    }
var password;
btn.addEventListener("click",()=>{
      if(passLen.value>0){
    password=passwordGenerator();
    passBox.textContent=turncatePassword(password);
  }
    else{
      passBox.textContent="please enter length >0";
      colorChange();
    }
})

 function turncatePassword(password)
        {
            if(passLen.value>35)
                {
                    passBox.style.fontSize="1.0rem";
                }
            else{
                   passBox.style.fontSize="1.2rem";
            }  
            if(password==="please select atleast a type")  
               {
                 return password;
               }
            else if(password.length>passLen.value)
               {
                 return password.substring(0,passLen.value);
               }
            return password;   
        }
function passwordCreation(){
  // if(passLen.value>0){
    password=passwordGenerator();
  passBox.textContent=turncatePassword(password);
// }
  // else{
  //   passBox.textContent="please enter length >0";
  // }
  // setTimeout(function() {
  //   btn.removeEventListener("click", passwordCreation);
  // }, 3000);
 
}  
function colorChange()
          {
            btn.style.background = 'rgb(2,0,36)';
            btn.style.background = 'linear-gradient(146deg, rgba(2,0,36,1) 0%, rgba(215,51,33,1) 27%, rgba(0,212,255,1) 100%)';
          }
  
/*by adding the attributes 'min' and 'max' to the input field controlling 
the maximum and minimum allowed characters makes a lot of these checks redundant as the user won't be able to exceed 55 chars or use negative values
it's better to disable the button rather than removing the entire event listener from it */
function passLenCheck(len)
   {
      if(len<=0)
         {
           passBox.textContent="Password length must be >0";
           colorChange();
         }
         else if(len == 54){
          passBox.textContent="Max supported password length reached";
         }
      else if(len>=55)
          {
            passBox.textContent="Password length must be <55";
           // btn.removeEventListener("click", passwordCreation);
           btn.disabled = true;
            colorChange();
          }   
      else{
           passBox.textContent="CREATE PASSWORD";
           btn.style.background = '#86fde6';
           btn.textContent="Generate Password";
          // btn.addEventListener("click",passwordCreation);
          btn.disabled = false;
           btn.addEventListener('mouseover', function() {
            btn.style.backgroundColor = 'white';
          });
          
          btn.addEventListener('mouseout', function() {
            btn.style.backgroundColor = '#86fde8';
          })
           
          }    

   }
function debouncePost(func)
       { let timeOutId;
            return function(e)
                       {
                            if(timeOutId)
                               {
                                 clearTimeout(timeOutId);
                               }
                            timeOutId=setTimeout(func(e.target.value),300);    
                       }
       }
// debounceSafety=debouncePost(passLenCheck);
// passLen.addEventListener("input", 
//   debounceSafety(passLen));
debounceSafety=debouncePost(passLenCheck);
passLen.addEventListener("input", function(e) {
  debounceSafety(e);
});

// debounceSafety=debouncePost(passLenCheck);
// passLen.addEventListener("input", debounceSafety);
        