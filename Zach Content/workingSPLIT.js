var arrayOfPlayers = ['Stephen Curry', 'James Harden', 'Kevin Durant', 'Kyle Anderson', 'Kyrie Irving'];
var arrayOfFirstNames = [];
var arrayOfLastNames = [];
var arrayOfIDs = [];

async function split() {
    for (let i = 0; i < arrayOfPlayers.length; i++) {
        let splitNames = arrayOfPlayers[i].split(' ');
        let firstName = splitNames[0];
        let lastName = splitNames[splitNames.length - 1];
        arrayOfFirstNames.push(firstName);
        arrayOfLastNames.push(lastName);
    }

    const promises = arrayOfFirstNames.map(async (firstName, j) => {
        const response = await fetch(`https://www.balldontlie.io/api/v1/players/?search=${firstName} ${arrayOfLastNames[j]}`);
        const data = await response.json();

        console.log(`Search for ${firstName} ${arrayOfLastNames[j]} returned:`, data);

        for (let i = 0; i < data.data.length; i++) {
            if (arrayOfFirstNames[j] == data.data[i].first_name && arrayOfLastNames[j] == data.data[i].last_name) {
                arrayOfIDs[j] = data.data[i].id;
            }
        }
    });

    await Promise.all(promises);

    document.getElementById("example").innerHTML = arrayOfIDs;
}

window.onload = split;
