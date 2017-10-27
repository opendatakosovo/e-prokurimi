$(document).ready(function () {
    if ($('.ul-active-li').length == 2) {
        $( ".dropdown-menu li" ).first().removeClass("ul-active-li");
    }
});
$(".red-flags-tb select").addClass("form-control");