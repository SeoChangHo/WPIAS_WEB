$(document).on("pagebeforechange", function (e, data) {
	
	if (data.toPage[0].id == "agreepage") {
		if(window.innerWidth<361){
			$("#agree_terms_box li").css("font-size","0.7em");
		}
	}
	
});


function agree_all_terms(){

	if($("input:checkbox[id='agreecheck']").is(":checked")){
		$("input:checkbox[id='agreecheck1']").prop("checked", true).checkboxradio("refresh")
		$("input:checkbox[id='agreecheck2']").prop("checked", true).checkboxradio("refresh")
		$("input:checkbox[id='agreecheck3']").prop("checked", true).checkboxradio("refresh")
	}else{
		$("input:checkbox[id='agreecheck1']").prop("checked", false).checkboxradio("refresh")
		$("input:checkbox[id='agreecheck2']").prop("checked", false).checkboxradio("refresh")
		$("input:checkbox[id='agreecheck3']").prop("checked", false).checkboxradio("refresh")
	}
	
}

function agree_terms(){
	if($("input:checkbox[id='agreecheck1']").is(":checked")){
		
	}else{
		$("input:checkbox[id='agreecheck']").prop("checked", false).checkboxradio("refresh");
	}
	
	if($("input:checkbox[id='agreecheck2']").is(":checked")){
		
	}else{
		$("input:checkbox[id='agreecheck']").prop("checked", false).checkboxradio("refresh");
	} 
	
	if($("input:checkbox[id='agreecheck3']").is(":checked")){
		
	}else{
		$("input:checkbox[id='agreecheck']").prop("checked", false).checkboxradio("refresh");
	}
	
	if($("input:checkbox[id='agreecheck1']").is(":checked") && $("input:checkbox[id='agreecheck2']").is(":checked") && $("input:checkbox[id='agreecheck3']").is(":checked")){
		$("input:checkbox[id='agreecheck']").prop("checked", true).checkboxradio("refresh");
	}
}

function Agree_OK()
{
	console.log($("input:checkbox[id='agreecheck']:checked").val())
	
	if($("input:checkbox[id='agreecheck']:checked").val()=="on")
		{
			$.mobile.changePage("../Join/Join.html",{transition:"slide"});
		}
	else
		{
			swal
			({
				title:"약관동의",
				text:"약관을 동의해주세요.",
				type:"error"
			})
		}
	
}

function terms1(){
	$.mobile.changePage("../Join/terms1.html",{transition:"slide"});
}

function terms2(){
	$.mobile.changePage("../Join/terms2.html",{transition:"slide"});
}

function terms3(){
	$.mobile.changePage("../Join/terms3.html",{transition:"slide"});
}
