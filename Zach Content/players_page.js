var myChart;
var chartDefaultOption = "bar";
var chartDefaultOption2 = "Top NBA Players Points";
const options = [
  'Lebron James',
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
              console.log('Selected value:', result);
          }
      });
  }
}




/*Dropdown Menu 0*/
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
  $(this).parents('#dropdown1').find('span').text($(this).text());
  $(this).parents('#dropdown1').find('input').attr('value', $(this).attr('id'));
  createChart();
});

/*End Dropdown Menu 0*/


/*Dropdown Menu 0*/
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
  createChart();
});

/*End Dropdown Menu 0*/




function createChart(){



const ctx = document.getElementById('myChart');

  if(myChart){
    myChart.destroy()
  }

myChart = new Chart(ctx, {
          type: chartDefaultOption,
          data: {
            labels: ['Kevin Durant', 'James Harden', 'Stephen Curry', 'Clay Thompson', 'Kyrie Irving'],
            datasets: [{
              label: chartDefaultOption2,
              data: [12, 19, 3, 5, 2, 3],
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






    
