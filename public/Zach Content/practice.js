
var arrayOfPlayers =  ['Stephen Curry', 'James Harden', 'Kevin Durant', 'Dewayne Dedmon', 'Kyle Anderson'];
var dict = []
var arrayOfIDs = []
var arrayOfFirstNames = []

function split(){
    

    for (let i = 0; i < arrayOfPlayers.length; i++){
        let splitNames = arrayOfPlayers[i].split(' ');
        let firstName = splitNames[0];
        let lastName = splitNames[splitNames.length - 1];
        dict.push(firstName)
        arrayOfFirstNames.push(firstName)
        dict.push(lastName)
    }

   fetchAPI()

}


function fetchAPI(){

    const promises = [];


    for(let j = 0; j < arrayOfFirstNames.length; j++){


       const promise = fetch(`https://www.balldontlie.io/api/v1/players/?search=${arrayOfFirstNames[j]}`)
        .then(resp => resp.json())
        .then(data => {
 
             for (let i = 0; i < data.data.length; i++){
              if(dict[i] == data.data[i].first_name && dict[i+1] == data.data[i].last_name){
                arrayOfIDs.push(data.data[i].id)
                }
            }
        })

        promises.push(promise);

   }
    
       document.getElementById("example").innerHTML = arrayOfIDs;

 }
 

 window.onload = split;