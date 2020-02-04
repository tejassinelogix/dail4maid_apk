$(window).load(function() {
    $(".loaderEffect").fadeOut("fast");
});
$(document).ready(function() {

    //introBg
    $(".introBg").delay(2500).fadeOut("slow");
    $(".landingPage").delay(2500).fadeIn("slow");

    $('.goBackLink').click(function(){
        history.back();
        return false;
    });

    //playBtnBlock
    $(".playBtnBlock").click(function() {
        $(".introVideo").fadeIn("fast");
    });

    //playBtn
    $(".playBtn").click(function(event) {
        event.preventDefault();
        $('.introVideo video').trigger('play');
    });
    $(".introVideoClose").click(function() {
        $('.introVideo video').trigger('pause');
        $(".introVideo").fadeOut("fast");
    });

    //menuMain
    $(".MenuBtnMain").click(function(event) {
        event.preventDefault();
        $(".menuMain").fadeIn("medium");
        $(".menuMain .menuMainInner").animate({left: "0%"}, "slow");
    });
    //menuMainClose
    $(".menuMainClose").click(function() {
        $(".menuMain").fadeOut("medium");
        $(".menuMain .menuMainInner").animate({left: "-100%"}, "slow");
    })
    $('body').click(function(e) {
      if ($(e.target).closest('.menuMain .menuMainInner,.menuSectionBottom').length === 0) {
        $(".menuMain").fadeOut("medium");
        $(".menuMain .menuMainInner").animate({left: "-100%"}, "slow");
      }
    });

    //view view-main navbar
    $(".view.view-main > .navbar").removeClass("navbarHome");

    //foodIconBlock open-panel
    $('body').click(function(e) {
      if ($(e.target).closest('.mainMenuLinkBtn,.menePanelBlock').length === 0) {
        $(".panelMenu").removeClass("panelMenuActive");
      }
    });
    $(".mainMenuLinkBtn").click(function(event) {
        event.preventDefault();
        $(".panel.panel-left").toggleClass("panelMenuActive");
    });    

    //bottomMainMenuSlider - owl2
    $('#bottomMainMenuSlider').owlCarousel({
        items:1,
        margin:0,
        autoplay:false,
        //autoplayTimeout:6000,
        slideSpeed: 2000,
        nav: false,
        loop: true,
        dots: false
    });

    //ripple effect
    var parent, ink, d, x, y;
    $("a,button").click(function(e){
        parent = $(this);
        //create .ink element if it doesn't exist
        if(parent.find(".ink").length == 0)
            parent.prepend("<section class='ink'></section>");
            
        ink = parent.find(".ink");
        //incase of quick double clicks stop the previous animation
        ink.removeClass("animate");
        
        //set size of .ink
        if(!ink.height() && !ink.width())
        {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({height: d, width: d});
        }
        
        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - parent.offset().left - ink.width()/2;
        y = e.pageY - parent.offset().top - ink.height()/2;
        
        //set the position and add class .animate
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");

        setTimeout(function(){ parent.children(".ink").remove();
        }, 400);
    }) //End of Ripple effect

    //icon-bars
    $('.icon-bars').addClass('fa fa-bars');
    $('.icon').removeClass('icon-bars');

    //back remove
    $(".back.link > span").each(function () {
        $(this).html($(this).html().replace('Back', ''));
    });
    //icon icon-back
    $('.icon-back').addClass('fa fa-angle-left');
    $('.icon').removeClass('icon-back');

    //Fancybox
    $('.fancybox').fancybox();

});



