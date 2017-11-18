$(document).ready(function(){
    $("#stadistics .buttons a").tooltip();

    $(".btn-group > .btn").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });

    /*$(".button-card-view").click(function(){
        if()
    });

    $(".button-table-view").click(function(){
        
    });*/

});