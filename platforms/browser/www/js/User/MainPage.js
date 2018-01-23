window.onpagechange = function(event){
		var currentpage = $.mobile.activePage.attr('id');
		if(currentpage=="LoginPage"){
			document.addEventListener("backbutton", onBackKeyDown, false);
		}else if(currentpage=="homepage"){
			document.addEventListener("backbutton", onBackKeyDown, false);
		}else if(currentpage=="myquestionpage"||currentpage=="questionpage"||currentpage=="comparepage"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestion, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestiondetail, false);
			document.addEventListener("backbutton", backclick, false);
		}else if(currentpage=="myquestionDetail"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestiondetail, false);
			document.addEventListener("backbutton", btnTopBackToMyquestion, false);
		}else if(currentpage=="myquestionCaseDetail"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestion, false);
			document.addEventListener("backbutton", btnTopBackToMyquestiondetail, false);
		}else if(currentpage=="DocHomepage"){
			document.addEventListener("backbutton", onBackKeyDown, false);
		}else if(currentpage=="answerpage"||currentpage=="myanswerpage"||currentpage=="DocCommunityp age"||currentpage=="informationpage"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestion, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestiondetail, false);
			document.removeEventListener("backbutton", btnTopBackToAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswerDetail, false);
			document.addEventListener("backbutton", backclick, false);
		}else if(currentpage=="answerdetailpage"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswerDetail, false);
			document.addEventListener("backbutton", btnTopBackToAnswer, false);
		}else if(currentpage=="myanswerdetailpage"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswerDetail, false);
			document.addEventListener("backbutton", btnTopBackToMYAnswer, false);
		}else if(currentpage=="myanswercasedetailpage"){
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswer, false);
			document.addEventListener("backbutton", btnTopBackToMYAnswerDetail, false);
		}else{
			document.removeEventListener("backbutton", onBackKeyDown, false);
			document.removeEventListener("backbutton", backclick, false);
			document.removeEventListener("backbutton", btnTopBackToAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswer, false);
			document.removeEventListener("backbutton", btnTopBackToMYAnswerDetail, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestion, false);
			document.removeEventListener("backbutton", btnTopBackToMyquestiondetail, false);
		}
}

function onBackKeyDown(button){
	swal({
		  title: '종료',
		  text: "WPIAS를 종료하시겠습니까?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
		  cancelButtonColor: '#3085d6',
		  confirmButtonText: '종료하기',
		  cancelButtonText: '아니요',
		  allowOutsideClick: false
		}).then(function () {
			 navigator.app.exitApp();
		})
}

function onBackKeyDownMsg(button) {
    if(button == 2) {
        navigator.app.exitApp();
    }
}

$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "homepage") {
		var main = ((window.innerHeight).toFixed(0));
		var popup = ((window.innerWidth*0.94).toFixed(0));
		var popuph = ((window.innerHeight*0.30).toFixed(0));
		
		$("#mainpage").css("height", main);
		$("#mypagepop").css("width", popup);
		$("#mypagepop").css("height", popuph);
		
		$(".chat_notice").hide();
		
		if(window.innerHeight==768&&window.innerWidth==375){
			$("#mainpage_mainmenu2").css("height","50%");
			$("#mainpage_mainmenu1").css("margin-top","-70%");
		}else if(window.innerHeight==774&&window.innerWidth==412){
			$("#mainpage_mainmenu1").css("margin-top","-59%");
		}
		
	}
	
	
});


$(document).on('pageshow', '#homepage', function (event, data) {
	
	console.log("이전페이지: "+data.prevPage.attr('id'));
	console.log("현재페이지: "+$.mobile.pageContainer.pagecontainer('getActivePage').attr('id'));	
	mypage_top();
	
	var prevPage = data.prevPage.attr('id');
	
	switch(prevPage)
	{
		case "LoginPage":
			$("#question").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestion").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#information").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#compare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			
			setTimeout(function(){
				$("#question").css({"opacity":"1", "visibility":"visible"})
			}, 200);
			setTimeout(function(){
				$("#myquestion").css({"opacity":"1", "visibility":"visible"})
			}, 300);
			setTimeout(function(){
				$("#information").css({"opacity":"1", "visibility":"visible"})
			}, 400);
			setTimeout(function(){
				$("#compare").css({"opacity":"1", "visibility":"visible"})
			}, 500);
		break;
		
		case "questionpage":
			$("#mypage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#question").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestion").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#information").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#compare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#mypage").css({"opacity":"1", "visibility":"visible"})
			$("#question").css({"opacity":"1", "visibility":"visible"})
			$("#myquestion").css({"opacity":"1", "visibility":"visible"})
			$("#information").css({"opacity":"1", "visibility":"visible"})
			$("#compare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
		
		
		
		case "myquestionpage":
			$("#mypage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#question").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestion").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#information").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#compare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#mypage").css({"opacity":"1", "visibility":"visible"})
			$("#question").css({"opacity":"1", "visibility":"visible"})
			$("#myquestion").css({"opacity":"1", "visibility":"visible"})
			$("#information").css({"opacity":"1", "visibility":"visible"})
			$("#compare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
			
			
			
		case "informationpage":		
			$("#mypage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#question").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestion").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#information").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#compare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#mypage").css({"opacity":"1", "visibility":"visible"})
			$("#question").css({"opacity":"1", "visibility":"visible"})
			$("#myquestion").css({"opacity":"1", "visibility":"visible"})
			$("#information").css({"opacity":"1", "visibility":"visible"})
			$("#compare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
			
			
			
		case "comparepage":
			$("#mypage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#question").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestion").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#information").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#compare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#mypage").css({"opacity":"1", "visibility":"visible"})
			$("#question").css({"opacity":"1", "visibility":"visible"})
			$("#myquestion").css({"opacity":"1", "visibility":"visible"})
			$("#information").css({"opacity":"1", "visibility":"visible"})
			$("#compare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
		
		default: break;
	}
});


function backclick(){
	FirebaseCall();
	var useruid = firebase.auth().currentUser.uid;
	
	const db = firebase.database().ref();
	const user = db.child('User').child(useruid);
	user.once('value', snap =>{
		if(snap.child('isDoctor').val()=="false"){
			
			$("#titlebackground1").css({"opacity":"0"});
			$("#titlebackground2").css({"opacity":"0"});
			$("#titlebackground3").css({"opacity":"0"});
			$("#titlebackground4").css({"opacity":"0"});
			
			$("#questionmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestionmain").css({"display":"none"});
			$("#informationmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#comparemain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			
			$("#topback").css("display","none");
			$("#toptitle").css("display","none");
			$(".displaynone").css({"visibility":"visible"});
			$(".displaynone2").css({"visibility":"visible"});
			$(".displaynone").animate({"margin-top":"18%"}, 400);
			$(".displaynone2").animate({"margin-top":"0%"}, 400);
			
			setTimeout(function(){
				$.mobile.changePage("../User/MainPage.html", {transition:"none"});
			}, 400);
			 
		}else{
			
			$("#titlebackground1").css({"opacity":"0"});
			$("#titlebackground2").css({"opacity":"0"});
			$("#titlebackground3").css({"opacity":"0"});
			$("#titlebackground4").css({"opacity":"0"});
			
			$("#answermain").css({"display":"none"});
			$("#myanswermain").css({"display":"none"});
			$("#informationmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#statisticsmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#communitymain").css({"visibility":"hidden"});
			
			$("#topback").css("display","none");
			$("#toptitle").css("display","none");
			$(".displaynone").css({"visibility":"visible"});
			$(".displaynone2").css({"visibility":"visible"});
			$(".displaynone").animate({"margin-top":"18%"}, 400);
			$(".displaynone2").animate({"margin-top":"0%"}, 400);
			
			setTimeout(function(){
				$.mobile.changePage("../Doctor/MainPageDoc.html", {transition:"none"});
			}, 400)
		}
	})	
}

function question()
{
	var bool = false;
	var uid = $('#index_uid').html();
	var FinishCheckDB = firebase.database().ref('Question').orderByChild('uid').equalTo(uid);
	
	FinishCheckDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							if(snapshot.child('prostatus').val()!='F')
								{
								bool=true;
								return true;
								}
						})
				if(bool)//마감되지 않은 질문이 있을 때
					{
					swal({
						  title: '잠깐!',
						  text: "마감되지 않은 질문이 있습니다.",
						  type: 'info',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#A566FF',
						  confirmButtonText: '새 질문',
						  cancelButtonText: '내 글 보기',
						  allowOutsideClick: false
						}).then(function () {
							//새 질문하기!
							$("#mainpage_mypage").hide();
							$("#mainpage_homebutton").hide();
							$("#mainpage_setting").hide();
							$("#mypagepop").hide();
							$("#mypage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
							$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
							
							setTimeout(function(){
								$("#mypage").css({"background":"rgba(37, 176, 231, 1)"});
								$("#mypage").animate({"opacity":"1"}, 200);			
							}, 300);
							setTimeout(function(){
								$.mobile.changePage("../User/question.html", {transition:"none"});
							}, 400);
							
						}, function (dismiss) {
						  if (dismiss === 'cancel') {
							  myquestion();
						  }
						})
					}
				else//마감되지 않은 질문이 없을 때
					{
							$("#mainpage_mypage").hide();
							$("#mainpage_homebutton").hide();
							$("#mainpage_setting").hide();
							$("#mypagepop").hide();
							$("#mypage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
							$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
							
							setTimeout(function(){
								$("#mypage").css({"background":"rgba(37, 176, 231, 1)"});
								$("#mypage").animate({"opacity":"1"}, 200);			
							}, 300);
							setTimeout(function(){
								$.mobile.changePage("../User/question.html", {transition:"none"});
							}, 400);
					}
			})

}

function myquestion(){
	
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#mypage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#mypage").css({"background":"rgba(59, 151, 210, 1)"});
		$("#mypage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../User/myquestion.html", {transition:"none"});
	}, 400);
	
};

function information(){
	
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#mypage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#mypage").css({"background":"rgba(43, 117, 188, 1)"});
		$("#mypage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../information/information.html", {transition:"none"});
	}, 400);

};

function compare(){
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#mypage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#mypage").css({"background":"rgba(47, 69, 154, 1)"});
		$("#mypage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../User/compare.html", {transition:"none"});
	}, 400);
};

function settingpage(){
	$.mobile.changePage("../setting/setting.html", {transition:"slide"});
};

function GoChatPage()
{
	$.mobile.changePage("../Chat/Chat.html", {transition:"slide", reverse:true});
}

function mypage_top(){
	
	FirebaseCall();
	var currentuser = firebase.auth().currentUser;
	var dbRef = firebase.database().ref();
	var count = 0;
	var answercount = 0;
	
	const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(currentuser.uid);
	
	myQuestion.off();
	myQuestion.once('value', function(snapshot)
	{
			if(snapshot.exists()){		        
				
				snapshot.forEach(function(snap) {
					 count++;
					 if(snap.child('status').val()=="Q"){
							
					 }else if(snap.child('status').val()=="A"){
							answercount++;
					 }
				  });		
				 
				$("#mypagepop_question_text").html(count+"건");
				$("#mypagepop_answer_text").html(answercount+"건");

		    }else{
		    	
		        $("#mypagepop_question_text").html(count+"건");
				$("#mypagepop_answer_text").html(answercount+"건");
		    }
			
			$("#mypagepop_sangdan").html("<div id='mypagepop_nick'>"+currentuser.displayName+"님의 질문</div><div id='mypagepop_img' onclick='question()'><img src='../img/setting/update.png' width='100%'></div>");
	})
}
