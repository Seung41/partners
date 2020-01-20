$(function () {
    resposiveSize();
    useDatepicker();

    //모달창
    $(document).on("click", ".btn_modalOpen", function (e) {
        e.preventDefault();
        $("#overlay").show();
        var modalId = $(this).attr("href").replace("#", "");
        $("#modal_" + modalId).addClass("active");
    });
    $(document).on("click", "#overlay,.btn_modalClose", function (e) {
        e.preventDefault();
        $(".modalWrap").removeClass("active");
        $("#overlay").hide();
    });

    //파일첨부 버튼형태 변경
    $("input[type='file'].useBtnType").each(function () {
        var file_name = $(this).attr("id");
        $(this).after('<span id="for_' + file_name + '"><input type="text" value=""> <a href="#" class="btn_inline btn_fileAttach">파일선택</a></span>');
        $("#for_" + file_name + " input[type='text']").width($(this).width());
        $(this).hide();
        $(this).change(function () {
            $("#for_" + file_name + " input[type='text']").val($(this).val());
        });
    });
    $(".btn_fileAttach").click(function () {
        var id = $(this).parent().attr("id").replace("for_", "");
        $("#" + id).click();
    });

    //좌측 사이드창
    $(".btn_asideToggle").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().toggleClass("active");
    });

    //탭
    $(".tabBar").each(function () {
        if (!$(this).hasClass("notUsed")) {
            var tabBar = $(this);
            if (tabBar.find(".active").length == 0) {
                tabBar.find("li").eq(0).not(".notUsed").addClass("active");
                tabBar.siblings(".tabPage").eq(0).addClass("active");
            }
        }
    });
    $(".tabBar li a").on("click", function (e) {
        var tabBar = $(this).parent().parent();
        var tabLi = $(this).parent();
        var tabLiAll = $(this).parent().parent().children("li");
        var tabNo = tabLi.index();
        var tabPageAll = tabBar.parent().children(".tabPage");
        var tabPage = tabPageAll.eq(tabNo);
        if (!tabBar.hasClass("notUsed")) {
            e.preventDefault();
            if (!tabPage.hasClass("active")) {
                tabPageAll.removeClass("active");
                tabPage.addClass("active");
                tabLiAll.removeClass("active");
                tabLi.addClass("active");
            }
        }
    });
});

/*Resposive*/
function resposiveSize() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if (/*isMobile() && */windowWidth < 960) {
        if (windowWidth >= 640) {
            deviceType = "mobile tablet";
        } else {
            deviceType = "mobile phone";
        }
    } else {
        deviceType = "desktop";
    }
    $('body').removeAttr('class').addClass(deviceType);
}
function getBrowser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}
function isMobile() {
    if (window.navigator.userAgent.match(/Mobile/i)
        || window.navigator.userAgent.match(/iPhone/i)
        || window.navigator.userAgent.match(/iPod/i)
        || window.navigator.userAgent.match(/IEMobile/i)
        || window.navigator.userAgent.match(/Windows Phone/i)
        || window.navigator.userAgent.match(/Android/i)
        || window.navigator.userAgent.match(/BlackBerry/i)
        || window.navigator.userAgent.match(/webOS/i)) {
        //console.log("Maybe Phone!");
    }
    if (window.navigator.userAgent.match(/Tablet/i)
        || window.navigator.userAgent.match(/iPad/i)
        || window.navigator.userAgent.match(/Nexus 7/i)
        || window.navigator.userAgent.match(/Nexus 10/i)
        || window.navigator.userAgent.match(/KFAPWI/i)) {
        //console.log("Maybe Tablet!");
    }
    if (window.navigator.userAgent.match(/Mobile/i)
        || window.navigator.userAgent.match(/iPhone/i)
        || window.navigator.userAgent.match(/iPod/i)
        || window.navigator.userAgent.match(/IEMobile/i)
        || window.navigator.userAgent.match(/Windows Phone/i)
        || window.navigator.userAgent.match(/Android/i)
        || window.navigator.userAgent.match(/BlackBerry/i)
        || window.navigator.userAgent.match(/webOS/i)
        || window.navigator.userAgent.match(/Tablet/i)
        || window.navigator.userAgent.match(/iPad/i)
        || window.navigator.userAgent.match(/Nexus 7/i)
        || window.navigator.userAgent.match(/Nexus 10/i)
        || window.navigator.userAgent.match(/KFAPWI/i)) {
        //console.log("Maybe Mobile!");
        return true;
    } else {
        //console.log("Maybe Desktop!");
        return false;
    }
}

//Datepicker
function useDatepicker() {
    var holidayData = [
        { 'mmdd': '1-1', 'title': '신정' },
        { 'mmdd': '3-1', 'title': '3.1절' },
        { 'mmdd': '5-5', 'title': '어린이날' },
        { 'mmdd': '6-6', 'title': '현충일' },
        { 'mmdd': '8-15', 'title': '광복절' },
        { 'mmdd': '10-3', 'title': '개천절' },
        { 'mmdd': '10-9', 'title': '한글날' },
        { 'mmdd': '12-25', 'title': '크리스마스' }
    ];

    $(".useDatepicker").each(function () {
        var minDate = $(this).attr("data-minDate");
        var maxDate = $(this).attr("data-maxDate");
        var dateFormat = "yy.mm.dd";
        if ($(this).attr("data-format")) dateFormat = $(this).attr("data-format");
        $(this).datepicker({
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            dateFormat: dateFormat,
            showMonthAfterYear: true,
            yearSuffix: '/',
            minDate: minDate,
            maxDate: maxDate,
            beforeShowDay: function (date) {
                var holidayCheck = false;
                var mmdd = (date.getMonth() + 1) + "-" + date.getDate();
                for (var i = 0; i < holidayData.length; i++) {
                    if (holidayData[i].mmdd == mmdd) {
                        holidayCheck = true;
                        return [true, "date-holiday", holidayData[i].title];
                        break;
                    }
                }
                if (holidayCheck == false) {
                    return [true, ""];
                }
            },
            onSelect: function (selectedDate) {
            },
            onClose: function (selectedDate) {
                if (this.id == "dateFrom") {
                    if (selectedDate != "" && $("#dateTo").val() != "") {
                        if (selectedDate >= $("#dateTo").val()) {
                            alert("시작날짜는 종료날짜보다 작아야 합니다.");
                            $("#dateFrom").val("");
                            return;
                        }
                    }
                } else if (this.id == "dateTo") {
                    if (selectedDate != "" && $("#dataFrom").val() != "") {
                        if ($("#dateFrom").val() >= selectedDate) {
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

/* Zoom */
var zoomFunc = {
    "init": function (targetImgs) {
        $(document).bind('mousemove', function (e) {
            var targetTop = e.pageY - 85;
            if (targetTop < 0) targetTop = 0;
            else if (targetTop > 450) targetTop = 450;
            var targetLeft = e.pageX - ($(window).width() / 2 - 440) - 25;
            if (targetLeft < 0) targetLeft = 0;
            else if (targetLeft > 830) targetLeft = 830;
            $('.btn_zoomPosition').css({
                top: targetTop,
                left: targetLeft
            });
        });
        window.addEventListener('pointermove', function (e) {
            var targetTop = e.pageY - 85;
            if (targetTop < 0) targetTop = 0;
            else if (targetTop > 450) targetTop = 450;
            var targetLeft = e.pageX - ($(window).width() / 2 - 440) - 25;
            if (targetLeft < 0) targetLeft = 0;
            else if (targetLeft > 830) targetLeft = 830;
            $('.btn_zoomPosition').css({
                "top": targetTop + "px",
                "left": targetLeft + "px"
            });
        });
        $(document).on("click", ".btn_zoomBoxIn", function (e) {
            e.preventDefault();
            $(this).addClass("active");
            $(".btn_zoomBoxOut").removeClass("active");
            $(this).parent().attr("data-zoomType", "in");
            $(this).parent().removeClass("out").addClass("in");
        });
        $(document).on("click", ".btn_zoomBoxOut", function (e) {
            e.preventDefault();
            $(this).addClass("active");
            $(".btn_zoomBoxIn").removeClass("active");
            $(this).parent().attr("data-zoomType", "out");
            $(this).parent().removeClass("in").addClass("out");
        });
        $(document).on("click", ".btn_zoomPosition", function (e) {
            e.preventDefault();
            var imgItem = $(this).parent().children("img");
            var zoomCount = parseFloat($(this).parent().attr("data-zoomCount"));
            var zoomType = $(this).parent().attr("data-zoomType");

            if (zoomType == 'in') {
                zoomCount += 0.3;
                if (zoomCount > 3) {
                    alert("더이상 확대할 수 없습니다.");
                    return;
                }
            } else if (zoomType == 'out') {
                zoomCount -= 0.3;
                if (zoomCount < 1) {
                    alert("더이상 축소할 수 없습니다.");
                    return;
                }
            } else {
                return;
            }
            $(this).parent().attr("data-zoomCount", zoomCount);

            var nextTop = ((parseInt($(this).css("top")) + 25) - 250) * zoomCount;
            var nextLeft = ((parseInt($(this).css("left")) + 25) - 440) * zoomCount;
            var imgMarginTop = parseInt(imgItem.css("margin-top")) - nextTop;
            var imgMarginLeft = parseInt(imgItem.css("margin-left")) - nextLeft;
            //console.log(imgMarginTop+","+imgMarginLeft);
            var imgMarginTopMax = $(this).parent().height() / 2 * zoomCount - $(this).parent().height();
            var imgMarginTopMin = $(this).parent().height() / 2 * zoomCount * -1;
            if (imgMarginTop > imgMarginTopMax) {
                imgMarginTop = imgMarginTopMax;
            } else if (imgMarginTop < imgMarginTopMin) {
                imgMarginTop = imgMarginTopMin;
            }
            var imgMarginLeftMax = $(this).parent().width() / 2 * zoomCount - $(this).parent().width();
            var imgMarginLeftMin = $(this).parent().width() / 2 * zoomCount * -1;
            if (imgMarginLeft > imgMarginLeftMax) {
                imgMarginLeft = imgMarginLeftMax;
            } else if (imgMarginLeft < imgMarginLeftMin) {
                imgMarginLeft = imgMarginLeftMin;
            }

            if (zoomCount == 1) {
                imgItem.css({
                    "transform": "scale(1)"
                });
                zoomFunc.center(imgItem);
            } else {
                imgItem.css({
                    "margin-top": imgMarginTop + "px",
                    "margin-left": imgMarginLeft + "px",
                    "transform": "scale(" + zoomCount + ")"
                });
            }
        });
        targetImgs.each(function () {
            var imgHolder = '<div class="zoomBox" data-zoomCount="1" data-zoomType=""><a href="#" class="btn_zoomBoxIn">확대</a><a href="#" class="btn_zoomBoxOut">축소</a><a href="#" class="btn_zoomPosition">좌표</a></div>';
            $(this).parent().append(imgHolder);
            $(this).parent().children(".zoomBox").prepend($(this));
            zoomFunc.center($(this));
        });
    },
    "center": function (targetImg) {
        var imgWidth = targetImg.width();
        if (imgWidth > targetImg.parent().width()) imgWidth = targetImg.parent().width();
        var imgHeight = targetImg.height();
        if (imgHeight > 500) imgHeight = 500;
        var imgMarginTop = imgHeight / 2 * -1;
        var imgMarginLeft = imgWidth / 2 * -1;
        targetImg.css({
            "width": imgWidth + "px",
            "height": imgHeight + "px",
            "margin-top": imgMarginTop + "px",
            "margin-left": imgMarginLeft + "px"
        });
    }
}
var zoomDragFunc = {
    "init": function (targetImgs) {
        $(document).on("click", ".btn_zoomBoxIn", function (e) {
            e.preventDefault();
            var imgItem = $(this).parent().children("img");
            var zoomCount = parseFloat($(this).parent().attr("data-zoomCount"));
            zoomCount += 0.3;
            if (zoomCount > 3) {
                alert("더이상 확대할 수 없습니다.");
                return;
            }
            $(this).parent().attr("data-zoomCount", zoomCount);
            var newWidth = parseInt(imgItem.attr("oldWidth")) * zoomCount;
            var newHeight = parseInt(imgItem.attr("oldHeight")) * zoomCount;
            imgItem.css({
                "width": newWidth + "px",
                "height": newHeight + "px"
            });
            zoomDragFunc.center(imgItem);
        });
        $(document).on("click", ".btn_zoomBoxOut", function (e) {
            e.preventDefault();
            var imgItem = $(this).parent().children("img");
            var zoomCount = parseFloat($(this).parent().attr("data-zoomCount"));
            zoomCount -= 0.3;
            if (zoomCount < 1) {
                alert("더이상 축소할 수 없습니다.");
                return;
            }
            $(this).parent().attr("data-zoomCount", zoomCount);
            var newWidth = parseInt(imgItem.attr("oldWidth")) * zoomCount;
            var newHeight = parseInt(imgItem.attr("oldHeight")) * zoomCount;
            imgItem.css({
                "width": newWidth + "px",
                "height": newHeight + "px"
            });
            zoomDragFunc.center(imgItem);
        });
        var oldWidth;
        targetImgs.each(function () {
            var imgHolder = '<div class="zoomBox drag" data-zoomCount="1"><a href="#" class="btn_zoomBoxIn">확대</a><a href="#" class="btn_zoomBoxOut">축소</a></div>';
            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            if (imgWidth > 0) {
                oldWidth = imgWidth;
            } else {
                imgWidth = oldWidth;
            }
            $(this).css({
                "cursor": "move",
                "width": imgWidth + "px"
            }).attr("oldWidth", imgWidth).attr("oldHeight", imgHeight);
            zoomDragFunc.center($(this));
            $(this).parent().append(imgHolder);
            $(this).parent().children(".zoomBox").prepend($(this));
            $(this).draggable({
                scroll: false
            });
        });
    },
    "center": function (targetImg) {
        var imgWidth = targetImg.width();
        var imgHeight = targetImg.height();
        var imgMarginTop = imgHeight / 2 * -1;
        var imgMarginLeft = imgWidth / 2 * -1;
        targetImg.css({
            "width": imgWidth + "px",
            "height": imgHeight + "px",
            "margin-top": imgMarginTop + "px",
            "margin-left": imgMarginLeft + "px",
            "top": "50%",
            "left": "50%"
        });
    }
}