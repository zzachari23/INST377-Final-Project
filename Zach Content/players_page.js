var myChart;
var chartDefaultOption = "bar";
var chartDefaultOption2 = "Top NBA Players of 2023 [Total Career Points]";
var arrayofSeasonPoints = [];
var arrayOfPlayers = ['Stephen Curry', 'James Harden', 'Kevin Durant', 'Kyle Anderson', 'Kyrie Irving'];
var arrayOfFirstNames = [];
var arrayOfLastNames = [];
var arrayOfIDs = [];
var arrayOfWeights = [];
var seasonYear;
const options = [
  'Nikola Jokic',
  'Joel Embiid',
  'Giannis Antetokounmpo',
  'Luka Doncic',
  'LeBron James',
  'Dremound Green',
  'Michael Jordan',
  'Stephen Curry',
  'Kyrie Irving',
  'James Harden',
  'Kobe Bryant'
];




function createAutocompleteBox() {
  for (let i = 0; i < 5; i++) {
      accessibleAutocomplete({
          element: document.querySelector(`#autocomplete-container${i}`),
          id: 'autocomplete-input',
          source: options,
          onConfirm: function (result) {
              if (result != undefined){
              arrayOfPlayers[i] = result
              }
              console.log(arrayOfPlayers)
          }
      });
  }
}




$('#dropdown0').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});

$('#dropdown0').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});

$('#dropdown0 .dropdown-menu li').click(function () {
  chartDefaultOption  = $(this).attr('id');
  $(this).parents('#dropdown0').find('span').text($(this).text());
  $(this).parents('#dropdown0').find('input').attr('value', $(this).attr('id'));
  createChart();
});



$('#dropdown1').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});

$('#dropdown1').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});

$('#dropdown1 .dropdown-menu li').click(function () {
  chartDefaultOption2 = $(this).attr('id');
  $(this).parents('#dropdown1').find('span').text($(this).text());
  $(this).parents('#dropdown1').find('input').attr('value', $(this).attr('id'));
  console.log(arrayOfPlayers)
  if(chartDefaultOption2 != "Top NBA Players of 2023 [Total Career Points]" && chartDefaultOption2 != "Weight[Pounds]"){
         seasonYear = chartDefaultOption2.slice(7,11);
  }
  console.log(seasonYear)
  arrayOfFirstNames = [];
  arrayOfLastNames = []; 
  arrayOfIDs = [];
  arrayOfWeights = [];
  arrayofSeasonPoints = [];
  split();
});




async function split() {
  console.log(arrayOfPlayers)
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

        for (let i = 0; i < data.data.length; i++) {
            if (arrayOfFirstNames[j] == data.data[i].first_name && arrayOfLastNames[j] == data.data[i].last_name) {
                arrayOfIDs[j] = data.data[i].id;
                arrayOfWeights[j] = data.data[i].weight_pounds
            }
        }
    });

    await Promise.all(promises);

    if(chartDefaultOption2 != "Top NBA Players of 2023 [Total Career Points]" && chartDefaultOption2 != "Weight[Pounds]"){
        fetchAPIPoints();
      } else{
        createChart();
      }
}


function fetchData(){
  if(chartDefaultOption2 == "Top NBA Players of 2023 [Total Career Points]"){
    return [22235, 16884, 12633, 11230, 9665]
  }else if(chartDefaultOption2 == "Weight[Pounds]") {
    return arrayOfWeights;
  }else if(chartDefaultOption2 == "Season 2023 [Avg Points Scored Per Game]") {
    return arrayofSeasonPoints;
  }else if(chartDefaultOption2 == "Season 2022 [Avg Points Scored Per Game]") {
    return arrayofSeasonPoints;
  }else if(chartDefaultOption2 == "Season 2021 [Avg Points Scored Per Game]") {
    return arrayofSeasonPoints;
  }else if(chartDefaultOption2 == "Season 2020 [Avg Points Scored Per Game]") {
    return arrayofSeasonPoints;
  }
  else{
    return arrayOfIDs;
  }
}


function fetchAPIPoints(){
  fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${seasonYear}&player_ids[]=${arrayOfIDs[0]}&player_ids[]=${arrayOfIDs[1]}&player_ids[]=${arrayOfIDs[2]}&player_ids[]=${arrayOfIDs[3]}&player_ids[]=${arrayOfIDs[4]}`)
    .then(resp => resp.json())
    .then(data => {
      for(j=0; j <arrayOfIDs.length; j++){

          for(i = 0; i<data.data.length; i++){
              if (arrayOfIDs[j] == data.data[i].player_id){
                  arrayofSeasonPoints.push(data.data[i].pts)  
              }
          }
      }
      createChart();
  })
}
   
    


function createChart(){


const ctx = document.getElementById('myChart');

  if(myChart){
    myChart.destroy()
  }

myChart = new Chart(ctx, {
          type: chartDefaultOption,
          data: {
            labels: arrayOfPlayers,
            datasets: [{
              label: chartDefaultOption2,
              data: fetchData(),
              backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(255, 159, 64)',
              'rgba(255, 205, 86)',
              'rgba(75, 192, 192)',
              'rgba(54, 162, 235)',
              'rgba(153, 102, 255)',
              'rgba(201, 203, 207)'
            ],borderColor: [
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(255, 99, 132)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(255, 159, 64)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(255, 205, 86)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(75, 192, 192)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(54, 162, 235)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(153, 102, 255)',
            chartDefaultOption == 'bar' ? 'rgb(0, 0, 0)' : 'rgba(201, 203, 207)'
          ],
          borderWidth: chartDefaultOption == 'bar' ? 5 : 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

  }



window.onload = function () {
    createChart();
    createAutocompleteBox();
};






    
