let video = document.querySelector("video")  ; 
let recordBtnCont =  document.querySelector(".record-cont");
let recordBtn =  document.querySelector(".record-btn");

let captureBtnCont=  document.querySelector(".capture-cont");
let captureBtn=  document.querySelector(".capture-btn");


let recordFlag = false ; 
let recorder ;

let chunks = [] ; 

let constraints = {
    video: true ,
    audio : false
}

navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    video.srcObject = stream ; 
    recorder = new MediaRecorder(stream) ;

    recorder.addEventListener("start", (e)=> {
        chunks = [] ; 
    })
    recorder.addEventListener("dataavailable", (e)=> {
        chunks.push(e.data);
    })
    recorder.addEventListener("stop", (e)=> {
        //when the media stops simply convert it into mp4 video from the chunks
        let blob = new Blob(chunks , {type : "video/mp4"}) ;
        let videoURL = URL.createObjectURL(blob) ;

        let a = document.createElement("a") ; 
        a.href = videoURL ;
        a.download = "stream.mp4" ; 
        a.click() ; 
    })

})

recordBtnCont.addEventListener("click", (e)=>{

    if(!recorder)   return ;
    recordFlag = !recordFlag ; 

    if(recordFlag){//start the recording
        recorder.start() ;
        recordBtn.classList.add("scale-record"); 
        starttimer() ; 
    }else{// stop the recording in the else condition
        recorder.stop() ;
        recordBtn.classList.remove("scale-record"); 
        stoptimer() ; 
    }


})

let timerID ; 
let counter =0 ; //represents the total seconds 
let timer = document.querySelector(".timer") ;


function starttimer(){
    function displaytimer(){
    timer.style.display = "block" ; 

        let totalseconds = counter ; // considering everything in seconds take seconds and put all of that in the total seconds 

        let hour = Number.parseInt(totalseconds/3600) ;
        totalseconds = totalseconds%3600 ; // to convet in hout first divide by 3600 then remaining one would be min : seconds 

        let minutes = Number.parseInt(totalseconds / 60) ; 
        totalseconds = totalseconds % 60 ;  // to convet in hout first divide by 60 then remaining one would be  seconds 


        let seconds = totalseconds ; // put left time in the sense seconds to the seconds variable 

        hour = (hour < 10 ) ? `0${hour}` : hour ; 
        minutes = (minutes < 10 ) ? `0${minutes}` : minutes ; 
        seconds = (seconds < 10 ) ? `0${seconds}` : seconds ; 

        timer.innerText =` ${hour}:${minutes} : ${seconds}` ;

    counter ++ ;
    }
    timerID = setInterval(displaytimer, 1000) ; 
}

function stoptimer(){
    clearInterval(timerID) ; 
    timer.innerText = "00:00:00" ; 
    timer.style.display = "none" ; 
}