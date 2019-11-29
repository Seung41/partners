$(document).ready(function () {
    $(".sideBar_menu li a").hover(function(){
        $(this).css('color', '#d64843');
    });

    $(".sideBar_menu li a").mouseleave(function(){
        $(this).css('color', '#66655f');
    });

    $("#menuItem_1").click(function(){
        $("#main_view").load("/html/partners_admin_board.html");
    });
    
    $("#bd_list_tbl_select tbody tr").hover(function(){

        $(this).css('background', '#d64843');
    });
    
    $("#bd_list_tbl_select tbody tr").mouseleave(function(){
        $(this).css('background', '#4a4742');
    });

    $("#bd_list_tbl_select tbody tr").click(function(){
        $("#main_view").load("/html/partners_admin_board_edit.html");
    });
    //$(".sideBar_menu li").each(function(){
    //    console.log($(this).text());
    //});

    //$(document).ready(function(){
    //   $("#div1").load("가져올페이지");
    //});
    
});

