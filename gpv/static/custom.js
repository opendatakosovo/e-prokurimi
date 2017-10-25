$(document).ready(function () {
    if ($('.ul-active-li').length == 2) {
        $( ".dropdown-menu li" ).first().removeClass("ul-active-li");
    }
    $(".dataTables_wrapper select").addClass("form-control");
});
