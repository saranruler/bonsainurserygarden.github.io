/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Module/App: Main Js
*/


(function($){

  'use strict';

  function initNavbar () {
	  
	if($(window).width() < 992) {
		$("#profile_head").hide()
	}
	  
    $('.navbar-toggle').on('click', function(event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-1).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[href="#"]').on('click', function(e) { alert('Hi..');
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }

  function init () {
    initNavbar();
  }

  init();

})(jQuery)

