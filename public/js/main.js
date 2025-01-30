console.log("JavaScript file waiting!");
function submitForm(formId, event) {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById(formId).submit(); // Submit the specified form
}
document.addEventListener('DOMContentLoaded',async function(){ 

    console.log("JavaScript file loaded!");
    const volumeForm = document.getElementById("volumeForm")
    const orderedList = document.getElementById('responseMenu');
    if (!volumeForm ||!orderedList) {
        console.error("Required DOM elements not found");
    };
    volumeForm.onsubmit = async(event) => { 
        let responseMenu = document.getElementById('responseMenu')

        console.log("Form Triggered")
        //event.preventDefault();
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
console.log(responseMenu.parentNode)
            while (responseMenu.hasChildNodes()){
                responseMenu.removeChild(responseMenu.firstChild

                )
            }
            console.log(data);
            data.forEach((item) => {
                let lineItem = document.createElement('li');
                
                let itemImage = document.createElement('img');
                let nameItem = document.createElement('th');
                let newItem = document.createTextNode( `${item.name} `);
                lineItem.appendChild( newItem);
                let marginRow = document.createElement("tr");
                let marginWord = document.createElement('th');
                let marginItem = document.createElement('td');
                let margin = document.createTextNode(`Margin ${USDollar.format(item.profit)}`)
                marginItem.appendChild( margin);

                let priceRow = document.createElement("tr");
                let priceWord = document.createElement('th');
                let priceItem = document.createElement('td');
                let price = document.createTextNode(`Price ${USDollar.format(item.price)}`)
                priceItem.appendChild( price );
                lineItem.appendChild( priceItem);
 
                let onHandRow = document.createElement("tr");
                let onHandWord = document.createElement('th');
                let onHandItem = document.createElement('td');
                let onHands = document.createTextNode(`On hand ${USDollar.format(item.onHand)}`)
                onHandItem.appendChild( onHands );
                lineItem.appendChild( onHandItem);

                let upcRow = document.createElement("tr");
                let upcWord = document.createElement('th');
                let upcItem = document.createElement('td');
                let upc = document.createTextNode(`UPC ${item.UPC}`)
                upcItem.appendChild( upc );
                lineItem.appendChild( upcItem);

                let itemRow = document.createElement("tr");
                let itemWord = document.createElement("th");
                let itemInfo = document.createElement("td");
                lineItem.appendChild( itemInfo);

                console.log(lineItem);
                let button = document.createElement("button");
                console.log(button);
                
                orderedList.appendChild( lineItem );
                


                

                console.log(newItem);
                //itemInfo.appendChild(nameItem);
                
                //itemInfo.appendChild(marginItem);







                // console.log(lineItem);

            });
        }catch(err){
            console.error('Error', err);
        }
    }
    try {
        console.log("Battery Module  loaded!");
        const battery = await navigator.getBattery();
        function updateAllBatteryInfo() {
              updateChargeInfo();
              updateLevelInfo();
              updateChargingInfo();
              updateDischargingInfo();
        }
        updateAllBatteryInfo();
        battery.addEventListener("chargingchange", updateChargeInfo);
        battery.addEventListener("levelchange", updateLevelInfo);
        battery.addEventListener("chargingtimechange", updateChargingInfo);
        battery.addEventListener("dischargingtimechange", updateDischargingInfo);
        function updateChargeInfo() {
            console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
        }
        function updateLevelInfo() {
            console.log(`Battery level: ${battery.level * 100}%`);
            document.getElementById("batteryPercentage").innerText = `${battery.level*100}%`;
        }
        function updateChargingInfo() {
            console.log(`Battery charging time: ${battery.chargingTime} seconds`);
            
        }
        function updateDischargingInfo() {
            console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
        }
        // Use setInterval to periodically update the battery info
        setInterval(updateAllBatteryInfo, 60000);
        } catch (error) {
            console.error('Error fetching battery information', error);
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
  //goFullscreen()
      
  
