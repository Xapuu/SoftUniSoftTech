

  /*-------------------------------------------------------------------------------
    PRE LOADER
  -------------------------------------------------------------------------------*/

  $(window).load(function(){
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
  
  $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
        $('.go-top').fadeIn(200);
        } else {
          $('.go-top').fadeOut(200);
        }
        });   
        // Animate the scroll to top
      $('.go-top').click(function(event) {
        event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
      })

  /* Chars visualisation and stuff
  -----------------------------------------
   */

  function test() {
      console.log("TestFunc");
  }

  function charVisual() {


      let ctx = document.getElementById('myChart').getContext('2d');
      let myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
              datasets: [{
                  label: 'apples',
                  data: [12, 19, 3, 17, 6, 3, 7],
                  backgroundColor: "rgba(153,255,51,0.4)"
              }, {
                  label: 'oranges',
                  data: [2, 29, 5, 5, 2, 3, 10],
                  backgroundColor: "rgba(255,153,0,0.4)"
              }]
          }
      });
  };

