$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "DocHomepage") {
		var main = ((window.innerHeight).toFixed(0));
		var popup = ((window.innerWidth).toFixed(0));
		$("#mainpage").css("height", main);
		$("#mypagepop").css("width", popup);
		
		$(".chat_notice").hide();
		
		if(window.innerHeight==768&&window.innerWidth==375){
			$("#mainpage_mainmenu2").css("height","50%");
			$("#mainpage_mainmenu1").css("margin-top","-70%");
		}else if(window.innerHeight==774&&window.innerWidth==412){
			$("#mainpage_mainmenu1").css("margin-top","-59%");
		}
		
	}
});


$(document).on('pageshow', '#DocHomepage', function (event, data) {
	console.log("이전페이지: "+data.prevPage.attr('id'));
	console.log("현재페이지: "+$.mobile.pageContainer.pagecontainer('getActivePage').attr('id'));	
	var popup = ((window.innerWidth*0.94).toFixed(0));
	var popuph = ((window.innerHeight*0.30).toFixed(0));
	$("#doctorpagepop").css("width", popup);
	$("#doctorpagepop").css("height", popuph);

	docmypage_top();
	
	var prevPage = data.prevPage.attr('id');
	
	switch(prevPage)
	{
		case "LoginPage":
			$("#answer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myanswer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#docinformation").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#doccompare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			
			setTimeout(function(){
				$("#answer").css({"opacity":"1", "visibility":"visible"})
			}, 200);
			setTimeout(function(){
				$("#myanswer").css({"opacity":"1", "visibility":"visible"})
			}, 300);
			setTimeout(function(){
				$("#docinformation").css({"opacity":"1", "visibility":"visible"})
			}, 400);
			setTimeout(function(){
				$("#doccompare").css({"opacity":"1", "visibility":"visible"})
			}, 500);
		break;
		
		case "answerpage":
			$("#doctorpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#answer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myanswer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#docinformation").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#doccompare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#doctorpage").css({"opacity":"1", "visibility":"visible"})
			$("#answer").css({"opacity":"1", "visibility":"visible"})
			$("#myanswer").css({"opacity":"1", "visibility":"visible"})
			$("#docinformation").css({"opacity":"1", "visibility":"visible"})
			$("#doccompare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
		
		
		
		case "myanswerpage":
			$("#doctorpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#answer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myanswer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#docinformation").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#doccompare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#doctorpage").css({"opacity":"1", "visibility":"visible"})
			$("#answer").css({"opacity":"1", "visibility":"visible"})
			$("#myanswer").css({"opacity":"1", "visibility":"visible"})
			$("#docinformation").css({"opacity":"1", "visibility":"visible"})
			$("#doccompare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;
			
			
			
		case "informationpage":
			$("#doctorpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#answer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myanswer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#docinformation").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#doccompare").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#bestlogo").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
		
			$("#doctorpage").css({"opacity":"1", "visibility":"visible"})
			$("#answer").css({"opacity":"1", "visibility":"visible"})
			$("#myanswer").css({"opacity":"1", "visibility":"visible"})
			$("#docinformation").css({"opacity":"1", "visibility":"visible"})
			$("#doccompare").css({"opacity":"1", "visibility":"visible"})
			$("#bestlogo").css({"opacity":"1", "visibility":"visible"})
			break;		
		default: break;
	}
});

$(document).on('pageshow', '#answerpage', function(event, data){
	$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
})

$(document).on('pageshow', '#myanswerpage', function(event, data){
	$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
})


function answer()
{
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#doctorpage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#doctorpage").css({"background":"rgba(37, 176, 231, 1)"});
		$("#doctorpage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../Doctor/answer.html", {transition:"none"});
	}, 400);
	
}

function myanswer(){	
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#doctorpage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#doctorpage").css({"background":"rgba(37, 176, 231, 1)"});
		$("#doctorpage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../Doctor/myanswer.html", {transition:"none"});
	}, 400);
};

function docinformation(){
	
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#doctorpage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#doctorpage").css({"background":"rgba(37, 176, 231, 1)"});
		$("#doctorpage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../information/information.html", {transition:"none"});
	}, 400);
};

function statistics(){	
	$("#mainpage_mypage").hide();
	$("#mainpage_homebutton").hide();
	$("#mainpage_setting").hide();
	$("#doctorpage").animate({"height":"7.4%", "opacity":"0.2"}, 300);
	$("#mainpage_mainmenu1").animate({"margin-top":"140%"}, 400);
	
	setTimeout(function(){
		$("#doctorpage").css({"background":"rgba(37, 176, 231, 1)"});
		$("#doctorpage").animate({"opacity":"1"}, 200);			
	}, 300);
	setTimeout(function(){
		$.mobile.changePage("../Doctor/DocCommunity.html", {transition:"none"});
	}, 400);
};

function DocMypage_Logout()
{
	FirebaseCall();
	FCMPlugin.unsubscribeFromTopic('Doctor');
	firebase.auth().signOut();
}

function docmypage_top(){
	
	FirebaseCall();
	var currentuser = firebase.auth().currentUser;
	var dbRef = firebase.database().ref();
	var count = 0;
	var answercount = 0;
	
	const myQuestion = dbRef.child("Answer");
	
	myQuestion.off();
	myQuestion.once('value', function(snapshot)
	{
			if(snapshot.exists()){		        
				
				snapshot.forEach(function(snap) {
					 count++;
					 if(snap.child('uid').val()==currentuser.uid){
						 answercount++;
					 }else{
							
					 }
				  });		
				 
				$("#mypagepop_doc_question_text").html(count+"건");
				$("#mypagepop_doc_answer_text").html(answercount+"건");

		    }else{
		        $("#mypagepop_doc_question_text").html(count+"건");
				$("#mypagepop_doc_answer_text").html(answercount+"건");
		    }
			
			$("#mypagepop_sangdan").html("<div id='mypagepop_nick'>"+currentuser.displayName+"님의 답변</div><div id='mypagepop_img'><img src='../img/setting/update.png' width='100%'></div>");

	})
}