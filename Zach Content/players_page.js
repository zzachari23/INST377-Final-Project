var myChart;
var chartDefaultOption = "bar";


/*Dropdown Menu*/
$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
  

});
$('.dropdown .dropdown-menu li').click(function () {
  chartDefaultOption  = $(this).attr('id');
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  createChart()
});
/*End Dropdown Menu*/


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
              label: '2018 Season Points',
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
    
window.onload = createChart();







    
