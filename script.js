const button= document.querySelector('button')

const size=4316534 * 8
const testcase=50;
const progress= document.querySelector('.progress ')
const speedtext=document.querySelector('.speed-text')
let test_res=[]

function  loadImage(){
    return new Promise((resolve ,reject) =>{
    let image = new Image()
    image.src="./intspeed.jpg?" + parseInt(Math.random() * 10000)
    let startTime = Date.now()

 

    image.onload= function(){
        let endTime=Date.now()
        resolve (endTime - startTime)
    }
     
    image.onerror=function(err){
        reject(err)
    }

})
}

async function getLoadSpeed(){
    let loadTime=await loadImage()
    if(loadTime<1) loadTime=1
    let speed_bps = size/loadTime
    let speed_kbps= speed_bps/102400
    return  speed_kbps 
}

function getAvgSpeed(){
    let sum=test_res.reduce((a,b) => a+b, 0)

    return sum/ test_res.length
}

button.addEventListener('click' , async function(){
for(let i=0;i<testcase;i++){

 let speed = await getLoadSpeed()
 test_res.push(speed)

 progress.style.width=((i+1)/testcase * 100)+ '%'
 speedtext.innerText= getAvgSpeed().toFixed(2)+'Mbps'

}



})
