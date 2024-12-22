console.log("JavaScript file waiting!");
document.addEventListener('DOMContentLoaded',function(){ 

    console.log("JavaScript file loaded!");
    const volumeForm = document.getElementById("volumeForm")
    const orderedList = document.getElementById('responseMenu');
    if (!volumeForm ||!orderedList) {
        console.error("Required DOM elements not found");
    };
    volumeForm.onsubmit = async(event) => { 
        document.getElementById('responseMenu').textContent = "Form Triggered";
        event.preventDefault();
        let height = document.querySelector("input[name='shelfHeight']:checked").value;
        let width = document.querySelector("input[name='shelfWidth']:checked").value;
        let depth = document.querySelector("input[name='shelfDepth']:checked").value;
        let shelfVolume  = depth*width*2.5;
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        let volume = height*width*depth;
        try{
            console.log("await response");

                const response  = await fetch(`/api/checkInventory/${volume}&${height}&${shelfVolume}`);
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                data.forEach((item) => {
                    let lineItem = document.createElement('li');
                    console.log(lineItem);
                    let button = document.createElement("button");
                    console.log(button);
                    let newContent = document.createTextNode( `${item.name} Margin: ${USDollar.format(item.profit)}`)
                    console.log(newContent);
                    lineItem.appendChild( newContent);
                    console.log(lineItem);
                    orderedList.appendChild( lineItem );
                });
        }catch(err){
            console.error('Error', err);
        }
        }
})
//Display aworking clock
window.onload = displayClock();
function displayClock(){
    let time = new Date()
    let hours =time.getHours();
    let minutes =time.getMinutes().toString().padStart(2,"0");
    //correct the hours format.
    if (hours ===0){
        hours = 12;
    }
    if (hours >12){
        hours -= 12;
    }
    
    document.querySelector("time").innerHTML = `${hours}:${minutes}`;
    setTimeout(displayClock, 60000); 
}
function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  }
  goFullscreen()