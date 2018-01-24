$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "doctor_webpage") {

		
	}
		
});


$(document).on('pageshow', '#doctor_webpage', function (event, data) {
	
	
});

function menuselect(number){
	
	if(number=="1"){
		$("#doctor_notice_board").show();
		$("#doctor_notice_board_progress").hide();
		$("#doctor_notice_board_complete").hide();
		$("#topmenu_all").css("font-weight","bold");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","inherit");
		
	}else if(number=="2"){
		$("#doctor_notice_board").hide();
		$("#doctor_notice_board_progress").show();
		$("#doctor_notice_board_complete").hide();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","bold");
		$("#topmenu_complete").css("font-weight","inherit");
		
	}else if(number=="3"){
		$("#doctor_notice_board").hide();
		$("#doctor_notice_board_progress").hide();
		$("#doctor_notice_board_complete").show();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","bold");
	}
	
}


