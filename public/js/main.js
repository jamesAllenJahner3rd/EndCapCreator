console.log("JavaScript file loaded!");
let orderedList = document.getElementById('responseMenu')
document.getElementById("volumeForm").onsubmit = async(event) => { 
    document.getElementById('responseMenu').textContent = "Form Triggered";
    event.preventDefault();
    let endcapHeight = document.getElementById("heightSelect").value;
    let height = document.getElementById("heightSelect").value;
    let width = document.getElementById("shelfWidthSelect").value;
    let depth = document.getElementById("shelfDepthSelect").value;
    let shelfVolume  = depth*width*2.5;
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let volume = height*width*depth;
    try{
        console.log("await response");
        
            let response  = await fetch(`/api/checkInventory/${volume}&${endcapHeight}&${shelfVolume}`);
            let data = await response.json();
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
