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
        $(this).css('background', '#57544f');
    });
    
    $("#bd_list_tbl_select tbody tr").mouseleave(function(){
        $(this).css('background', '#4a4742');
    });

    $("#bd_list_tbl_select tbody tr td").click(function(){
        $("#main_view").load("/html/partners_admin_board_edit.html");
    });

    $("#board_check_All").click(function(){
        var chk = $(this).is(":checked");
        if(chk) $(".board_check").prop('checked', true);
        else  $(".board_check").prop('checked', false);
    });


    //$(".sideBar_menu li").each(function(){
    //    console.log($(this).text());
    //});

    //$(document).ready(function(){
    //   $("#div1").load("가져올페이지");
    //});
    //pagination();
  
  //jQuery('.pagination li:first-child').addClass("disabled");

});

function pagination(){
    var req_num_row=5;
    var $tr=jQuery('tbody tr');
    var total_num_row=$tr.length;
    var num_pages=0;
    if(total_num_row % req_num_row ==0){
        num_pages=total_num_row / req_num_row;
    }
    if(total_num_row % req_num_row >=1){
        num_pages=total_num_row / req_num_row;
        num_pages++;
        num_pages=Math.floor(num_pages++);
    }

    jQuery('.pagination').append("<li><a class=\"prev\">Previous</a></li>");

    for(var i=1; i<=num_pages; i++){
        jQuery('.pagination').append("<li><a>"+i+"</a></li>");
        jQuery('.pagination li:nth-child(2)').addClass("active");
        jQuery('.pagination a').addClass("pagination-link");
    }

    jQuery('.pagination').append("<li><a class=\"next\">Next</a></li>");

    $tr.each(function(i){
    jQuery(this).hide();
    if(i+1 <= req_num_row){
            $tr.eq(i).show();
        }
    });

    jQuery('.pagination a').click('.pagination-link', function(e){
        e.preventDefault();
        $tr.hide();
        var page=jQuery(this).text();
        var temp=page-1;
        var start=temp*req_num_row;
        var current_link = temp;
  
        jQuery('.pagination li').removeClass("active");
        jQuery(this).parent().addClass("active");

        for(var i=0; i< req_num_row; i++){
            $tr.eq(start+i).show();
        }
  
        if(temp >= 1){
            jQuery('.pagination li:first-child').removeClass("disabled");
        }
        else {
            jQuery('.pagination li:first-child').addClass("disabled");
        }
            
    });

    jQuery('.prev').click(function(e){
        e.preventDefault();
        jQuery('.pagination li:first-child').removeClass("active");
    });

    jQuery('.next').click(function(e){
        e.preventDefault();
        jQuery('.pagination li:last-child').removeClass("active");
    });

    function useDatepicker(){
        var holidayData = [
            {'mmdd':'1-1','title':'신정'},
            {'mmdd':'3-1','title':'3.1절'},
            {'mmdd':'5-5','title':'어린이날'},
            {'mmdd':'6-6','title':'현충일'},
            {'mmdd':'8-15','title':'광복절'},
            {'mmdd':'10-3','title':'개천절'},
            {'mmdd':'10-9','title':'한글날'},
            {'mmdd':'12-25','title':'크리스마스'}
        ];
    
        $(".useDatepicker").each(function(){
            var minDate = $(this).attr("data-minDate");
            var maxDate = $(this).attr("data-maxDate");
            var dateFormat = "yy.mm.dd";
            if($(this).attr("data-format")) dateFormat = $(this).attr("data-format");
            $(this).datepicker({
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
                monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
                dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
                dayNamesShort: ['일','월','화','수','목','금','토'],
                dayNamesMin: ['일','월','화','수','목','금','토'],
                dateFormat: dateFormat,
                showMonthAfterYear: true,
                yearSuffix: '/',
                minDate: minDate,
                maxDate: maxDate,
                beforeShowDay: function(date){
                    var holidayCheck = false;
                    var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
                    for(var i=0; i<holidayData.length; i++){
                        if(holidayData[i].mmdd == mmdd){
                            holidayCheck = true;
                            return [true, "date-holiday", holidayData[i].title];
                            break;
                        }
                    }
                    if(holidayCheck == false){
                        return [true, ""];
                    }
                },
                onSelect: function(selectedDate){
                },
                onClose: function(selectedDate){
                    if(this.id == "dateFrom" ) {
                        if(selectedDate != "" && $("#dateTo").val() != ""){
                            if(selectedDate >= $("#dateTo").val()){
                                alert("시작날짜는 종료날짜보다 작아야 합니다.");
                                $("#dateFrom").val("");
                                return;
                            }
                        }
                    }else if(this.id == "dateTo" ) {
                        if(selectedDate != "" && $("#dataFrom").val() != ""){
                            if($("#dateFrom").val() >= selectedDate){
                                alert("종료날짜는 시작날짜보다 커야 합니다.");
                                $("#dateTo").val("");
                                return;
                            }
                        }
                    }
                }
            });
        });
    }
    
}
