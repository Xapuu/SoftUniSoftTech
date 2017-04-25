/*-------------------------------------------------------------------------------
 PRE LOADER
 -------------------------------------------------------------------------------*/

$(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets
});


/*-------------------------------------------------------------------------------
 jQuery Parallax
 -------------------------------------------------------------------------------*/

function initParallax() {
    $('#home').parallax("50%", 0.3);

}
initParallax();


/* Back top
 -----------------------------------------------*/

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.go-top').fadeIn(200);
    } else {
        $('.go-top').fadeOut(200);
    }
});
// Animate the scroll to top
$('.go-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 300);
})


function goToFunc() {
    let page = document.getElementById('goToPage');

    return console.log(page);

    //return   window.location = "/news/multyNewsBrowser"+page;

}


function charVisual() {


    let another = document.getElementById('data').innerHTML;
    let data = JSON.parse(another);

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],//date
            datasets: [{
                label: 'answered',
                data: [],
                backgroundColor: "rgba(153,255,51,0.4)"
            }, {
                label: 'unanswered',
                data: [],
                backgroundColor: "rgba(255,153,0,0.4)"
            }]
        }
    });

    for (let i = 0; i < data.length; i++) {
        myChart.data.labels.push(data[i].date);
        myChart.data.datasets[0].data.push(data[i].answers);
        myChart.data.datasets[1].data.push(data[i].questions);
    }
    //document.getElementById('data').classList.add('hidden');
};

function charActivityVisual() {

    let another = document.getElementById('data2').innerHTML;
    let data = JSON.parse(another);


    let ctx = document.getElementById('myActivityChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'userLogs',
                data: [],
                backgroundColor: "rgba(153,255,51,0.6)"
            }]
        }
    });

    for (let i=0; i<data.length;i++){
        myChart.data.labels.push(data[i].date);
        myChart.data.datasets[0].data.push(data[i].logs);


    }

}

function charNewsVisual() {

    let another = document.getElementById('data3').innerHTML;
    let data = JSON.parse(another);
    console.log(data)


    let ctx = document.getElementById('myNewsChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'CreatedNews',
                data: [],
                backgroundColor: "rgba(153,255,51,0.6)"
            },{
                label: 'DeletedNews',
                data: [],
                backgroundColor: "rgba(255,153,0,0.4)"
            }]
        }
    });

    for (let i=0; i<data.length;i++){

        myChart.data.labels.push(data[i].date);
        myChart.data.datasets[0].data.push(data[i].create);
        myChart.data.datasets[1].data.push(data[i].delete);

    }

}