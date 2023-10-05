'use strict'


document.addEventListener('DOMContentLoaded', function(){
    const spanChrono = document.querySelector('#timers_div #chron');
    console.log(spanChrono);

    const divContainSpan = document.querySelector('#timers_div');
    console.log(divContainSpan);

    const startButton = document.querySelector('#btn_div #btn_start');
    console.log(startButton);

    startButton.addEventListener('click', function(){
        quizzTimer(10);
        spanChrono.classList.add('timers_divClass'); 
    })

    //Mettre en place la fonction de décompte
    function quizzTimer(timer){
        let doubleN = String(timer).padStart(2, '0');
        spanChrono.innerText = doubleN;
    
        if(timer > 0){
            timer -= 1;
        }
    
        //répétition du comptage
        setTimeout(function (){
            quizzTimer(timer);
        }, 1000);
    }


})
