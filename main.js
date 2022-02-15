jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});



//NAVIGATION BAR
const hamburger=document.querySelector(".hamburger");
const navmenu=document.querySelector(".nav-menu");
const links=document.querySelectorAll(".nav-menu li");

hamburger.addEventListener('click',()=>{
    navmenu.classList.toggle("open");
    links.forEach(link=>{
        link.classList.toggle("fade");
    });

    hamburger.classList.toggle("toggle");
});


let email = sessionStorage.getItem("email"); 
if(email) {
   window.location.replace("https://crp.megalith.co.in/register/dashboard.html");
}


function wrapperFunction() {
 let code;
 let email, name;
 let bodyData;

 function checkEmail(xyz) {
  email = $("#su-email").val();
  name = $("#su-name").val();
  
  let bodyData1 = {
     email,
     purpose: "signup",
    name
  };

  let password = $("#su-password").val();
  let number = $("#su-number").val();
  let collegeName = $("#su-collegeName").val();
  let country = $("#su-country").val();
  let state = $("#su-state").val();
  let city = $("#su-city").val();
  let gender = $("input[type='radio'][name='gender']:checked").val();
  let year = $("input[type='radio'][name='year']:checked").val();
  let prev = $("input[type='radio'][name='megalith']:checked").val();

  bodyData = {name,email,password,number,collegeName,country,state,city,gender,year,prev};

  $.post( "./php/checkEmail.php", bodyData1, function( data ) {

   if(data === "false" ) {
     $("#error-msg").html("Email already there.");
     $("#success-msg").html("");
   } else {
     $("#error-msg2").html("");
     if(xyz) {
           $("#success-msg2").html("OTP sent successfully again.");

     } else {
           $("#success-msg2").html("OTP sent successfully.");  
     }
     code =  data;
     $("#first").css({"display" : "none"});
     $("#second").css({"display" : "flex"});
   }
 });
}
 
function verifyCode() {
 let otp = $("#otpVal").val();

 if(otp !== code) {
     $("#success-msg2").html("");
     $("#error-msg2").html("Incorrect OTP.");
 } else {
     $.post( "./php/signup.php", bodyData, function( data ) {
       
       if(data === "false" ) {
         $("#success-msg2").html("");
         $("#error-msg2").html("Someting went wrong. Try later.");
       } else {
         sessionStorage.setItem("email", email);
         window.location.replace("https://crp.megalith.co.in/register/dashboard.html");
//               $("#error-msg2").html("");
//               $("#error-msg").html("");
//               $("#success-msg").html("Successfully registered. Please log in to continue.");
//               document.getElementById("otpVal").value = "";
//               $("#first").css({"display" : "block"});
//               $("#second").css({"display" : "none"});
       }
     });
 }
}
return {
 checkEmail,
 verifyCode
}
}


 
let func = wrapperFunction();
$( "#formnumber1" ).submit(function( event ) {
   event.preventDefault(false);
   func.checkEmail(false);
});
$( "#resendOtp" ).click(function( event ) {
   event.preventDefault();
   func.checkEmail(true);
});
$( "#formnumber2" ).submit(function( event ) {
   event.preventDefault();
   func.verifyCode();
});



$(function () {
 $(".btn").click(function () {
   $(".form-signin").toggleClass("form-signin-left");
   $(".form-signup").toggleClass("form-signup-left");
   $(".frame").toggleClass("frame-long");
   $(".signup-inactive").toggleClass("signup-active");
   $(".signin-active").toggleClass("signin-inactive");
   $(".forgot").toggleClass("forgot-left");
   $(this).removeClass("idle").addClass("active");
 });
});

$(function () {
 $(".btn-signup").click(function () {
   $(".nav").toggleClass("nav-up");
   $(".form-signup-left").toggleClass("form-signup-down");
   $(".success").toggleClass("success-left");
   $(".frame").toggleClass("frame-short");
 });
});

$(function () {
 $(".btn-signin").click(function () {
   $(".btn-animate").toggleClass("btn-animate-grow");
   $(".welcome").toggleClass("welcome-left");
   $(".cover-photo").toggleClass("cover-photo-down");
   $(".frame").toggleClass("frame-short");
   $(".profile-photo").toggleClass("profile-photo-down");
   $(".btn-goback").toggleClass("btn-goback-up");
   $(".forgot").toggleClass("forgot-fade");
 });
});

function signin() {
let email = $("#email-signin").val();
let password = $("#password-signin").val();
let bodyData = {
email, 
password
};

$.post( "./php/signin.php", bodyData, function( data ) {
console.log(data);
if(data === "Success" ) {
 $("#error-msg").html("");
 $("#success-msg").html("Successfully logged in.");
 sessionStorage.setItem("email", email);
 window.location.replace("https://crp.megalith.co.in/register/dashboard.html");    
} else if(data === "Invalid Password!") {
 $("#success-msg").html("");
 $("#error-msg").html("Invalid Password!");
} else if(data === "Invalid Email!") {
 $("#success-msg").html("");
 $("#error-msg").html("Invalid Email!");
} else {
 $("#success-msg").html("");
 $("#error-msg").html("Internal server error. Please try later.");
}
});
}



