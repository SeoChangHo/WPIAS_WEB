var gender;
var email;
var nickname;
var count
var viewmoreclick
var ExistChat
var dateinsert;
var dateinsert2;
var dateinsert3;
var dateinsert4;
var datecount = 0;

$(document).on("pagebeforechange", function (e, data) {
    
	if (data.toPage[0].id == "ChatPage") {
	count=0;	
	viewmoreclick=0;
	ExistChat=true;
    	$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
    	const ChatDB = firebase.database().ref('Chat').limitToLast(10);	
    	$("#ChatText").textinput("option","autogrow", false);
    	
    	UserCheck(ChatDB);
    	LoadChatting(ChatDB);
    	PulltoViewMore()
    	
    	$("#ChatText").on('change keyup paste', function(){
    		if($("#ChatText").val()==""){
    			$("#btnChatTransfer").css({"background":"#d7d7d7"});
    		}else{
    			$("#btnChatTransfer").css({"background":"#69c9ef"});
    		}
    	})
    	
    	$("#ChatText").each(function(){
    		$(this).bind('focus', function(){
    			$("#titlebackground6").css("position","absolute");
    			$("#Chatfooter").css("position","absolute");
    		})
    		
    		$(this).bind('blur',function(){
    			$("#titlebackground6").css("position","fixed");
    			$("#Chatfooter").css("position","fixed");
    		})
    	})
    	
    	$("#ChatText").on('input', function() {
    		
    		var scroll_height = $("#ChatText").get(0).scrollHeight;
    		$("#ChatText").css('height', scroll_height + 'px');
    		
    	});
    	
    	var scrollicon = $(window).innerHeight()-90;
    	
    	window.onscroll = function(){
    		
    		var scrollHeight = document.getElementById("main").scrollHeight;
			var scrollBottom = scrollHeight - $(window).scrollTop();
			if(scrollBottom>2000){
				$("<img class='chat_toast_img' onclick='bottom_gogosing()' src='../img/down_arrow.png'>")
				.css({"display":"block",
						 "background":"white",
						 "position":"fixed",
						 "width":"6%",
						 "margin-left":"88%",
						 "top":scrollicon+"px",
						 "z-index":"5",
						 "box-shadow":"1px 1px 4px -1px #ececec",
						 "border-radius":"6px"
				}).appendTo($.mobile.pageContainer).delay(1500)
				.fadeOut(1500, function(){
					$(this).remove();
				})
			}
    	}
    	var now = new Date();
    	
    	var year = (now.getYear()+1900).toString(); 
		var month = (now.getMonth()+1).toString();
		var day = (now.getDate()).toString();

		dateinsert = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0]);
    	
    }

});

$(document).on("pageshow", "#ChatPage", function (e, data) {
	$("<img class='chat_notice' src='../img/chat_notice.gif' width='100%'>")
	.css({"display":"block",
			 "position":"fixed",
			 "width":"100%",
			 "top":"60px",
			 "z-index":"5",
			 "box-shadow":"1px 1px 4px -1px #ececec",
			 "border-radius":"4px",
			 "opacity":"0.9"
	}).appendTo($.mobile.pageContainer).delay(4000)
	.fadeOut(1000, function(){
		$(this).remove();
	})
	
});


function PulltoViewMore()
{
			PullToRefresh.init({
				mainElement: '#main',
				refreshTimeout: 500,
				onRefresh: function(){
					if(ExistChat)
					{
							ChatViewMore();					
					}
				}
			})
}

function UserCheck(ChatDB)
{
	var seq = $('#index_uid').html();
	
	var UserDB = firebase.database().ref('User/'+seq);
	
	UserDB.once('value', function(snap)
			{
				if(snap.child('isDoctor').val()=="true")
					{
						$('#topback').attr('onclick', 'GoMain("doctor")')
					}
				else
					{
						$('#topback').attr('onclick', 'GoMain("user")')
					}
				
				email = snap.child('email').val();
				gender = snap.child('gender').val();
				nickname = snap.child('nickname').val()
			})
}


function GoMain(Who)
{
	const ChatDB = firebase.database().ref('Chat');	
	ChatDB.off('child_added');
	window.onscroll = null;
	if(Who=="doctor")
		{
			$.mobile.changePage("../Doctor/MainPageDoc.html", {transition:"slide"});
		}
	else
		{
			$.mobile.changePage("../User/MainPage.html", {transition:"slide"});
		}
	
}


function btnChatTransferClick()
{
	var precontents =$('#ChatText').val().replace(/\n/g, '<br>');
	var contents = precontents.replace(/ /g, '&nbsp;');
	if(contents!="")
	{
		var uid = $("#index_uid").html();
		var now = new Date();
		
		var year = (now.getYear()+1900).toString(); 
		var month = (now.getMonth()+1).toString();
		var day = (now.getDate()).toString();
		var hour = now.getHours().toString();
		var min = now.getMinutes().toString();
		var sec = now.getSeconds().toString();
		var milsec = now.getMilliseconds().toString();

		var date = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0]);
		var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+"_"+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0])+"_"+milsec;

		console.log(date);
		console.log(Fulldate);
		console.log($('#ChatText').val());
		console.log(email);
		console.log(gender);
		console.log(nickname);
	
		ChatInsertDB = firebase.database().ref('Chat/'+Fulldate+"_"+uid).set({
			contents:contents,
			uid:uid,
			email:email,
			nickname:nickname,
			time: (hour[1]? hour:'0'+hour[0])+":"+(min[1]? min:'0'+min[0])
		})
		
		$('#ChatText').val("");
		$('#ChatText').css("height","35px");
		$('#ChatText').focus();
		$("#btnChatTransfer").css({"background":"#d7d7d7"});
	}
}


function LoadChatting(ChatDB)
{
	ChatDB.off('child_added');
	
	var uid = $("#index_uid").html();
	ChatDB.on('child_added', function(snap)
			{
				count++;
        			var email = snap.child('email').val()
        			var id = email.split('@');
        
        
        			var GetId = id[0];
        
        			for(var i=3; i<id[0].length; i++)
        			{
        			var GetId = GetId.replaceAt(i,"*");
        			}

        
        			var replaceEmail = GetId+"@"+id[1];
        			var SumID = snap.child('nickname').val()+"("+replaceEmail+")"
        			if(count==1){
        				dateinsert2=(snap.key).substring(0, 8);
        			}
        			if(dateinsert != (snap.key).substring(0, 8)){
        				if($("#ChatMoreDiv1").length==0){
        					dateinsert=(snap.key).substring(0, 8);
            				var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert+"'>"+(snap.key).substring(0, 4)+"년"+(snap.key).substring(4, 6)+"월"+(snap.key).substring(6, 8)+"일</div>";
            				document.getElementById('ChatArea').insertAdjacentHTML('beforeEnd', chatdate);
        				}
        			}
		
				if(snap.child('uid').val()==uid)//본인이 작성한 글일 때
				{
					var HTMLBubble ="<div class='author1'>"
							+SumID	
							+"</div>"
							+"<div class='bubble_pop1'>" 
						    +"<div class='time1'>"
                    		+snap.child('time').val()
                    	    +"</div>" 
						    +"<div class='bubble-speech-right bubble-right'>"
		                    +"<div class='message'>"
		                    +snap.child('contents').val()
		                    +"</div>"
		                    +"</div>"
		                    +"</div>";
		               document.getElementById('ChatArea').insertAdjacentHTML('beforeEnd', HTMLBubble)
				}
				else//타인이 작성한 글일 때
				{
					var HTMLBubble ="<div class='author2'>"
							+SumID
                    		+"</div>" 
							+"<div class='bubble_pop2'>" 
						    +"<div class='bubble-speech-left bubble-left'>"
		                    +"<div class='message'>"
		                    +snap.child('contents').val()
		                    +"</div>"
		                    +"</div>"
		                    +"<div class='time2'>"
		                    +snap.child('time').val()
		                    +"</div>"
		                    +"</div>";
		               document.getElementById('ChatArea').insertAdjacentHTML('beforeEnd', HTMLBubble)
				}       			
        			if(count>9)
    				{
    				var scrollTop = $(window).scrollTop();
    				var scrollHeight = document.getElementById("main").scrollHeight;
    				var scrollBottom = scrollHeight - $(window).scrollTop();
    				
        			
	    				if(count==10)
	    				{
	    					$("html, body").animate({ scrollTop: scrollHeight }, 1000);
	    				}
    				
	    				if(scrollBottom<1500){
	    				console.log("스크롤탑: " + scrollTop);
	    				console.log("스크롤 높이: " + scrollHeight);
	    				$("html, body").animate({ scrollTop: scrollHeight }, 0);
	    				}
	    				
	    				if(scrollBottom>1500&&snap.child('uid').val()!=uid&&count>10){
	    					console.log("어느지점인지 : " + ($(window).scrollTop()+$(window).innerHeight()) );
	    					var toast_top = $(window).innerHeight()-90;
	    					var toast_bottom = $(window).innerHeight()-70;
	    					var msg = snap.child('contents').val();
	    					
	    					$("<div class='chat_toast_message' onclick='bottom_gogosing()'>"+SumID+"</div>")
	    					.css({"display":"block",
	    							 "background":"white",
	    							 "position":"fixed",
	    							 "text-align":"left",
	    							 "width":"92%",
	    							 "padding-left":"8%",
	    							 "top":toast_bottom+"px",
	    							 "color":"gray",
	    							 "font-size":"0.8em",
	    							 "overflow":"hidden",
	    							 "height":"15px",
	    							 "line-height":"10px",
	    							 "text-overflow":"ellipsis",
	    							 "z-index":"6"
	    					}).appendTo($.mobile.pageContainer).delay(3000)
	    					.fadeOut(2000, function(){
	    						$(this).remove();
	    					})
	    					
	    					$("<div class='chat_toast_message' onclick='bottom_gogosing()'>"+msg+"</div>")
	    					.css({"display":"block",
	    							 "background":"white",
	    							 "position":"fixed",
	    							 "text-align":"left",
	    							 "width":"92%",
	    							 "padding-left":"8%",
	    							 "top":toast_top+"px",
	    							 "color":"#555555",
	    							 "font-size":"1em",
	    							 "overflow":"hidden",
	    							 "height":"20px",
	    							 "line-height":"20px",
	    							 "text-overflow":"ellipsis",
	    							 "z-index":"6"
	    					}).appendTo($.mobile.pageContainer).delay(3000)
	    					.fadeOut(2000, function(){
	    						$(this).remove();
	    					})
	    					
	    					$("<img class='chat_toast_img' onclick='bottom_gogosing()' src='../img/down_arrow.png'>")
	    					.css({"display":"block",
	    							 "background":"transparent",
	    							 "position":"fixed",
	    							 "width":"4%",
	    							 "margin-left":"90%",
	    							 "margin-top":"3%",
	    							 "top":toast_top+"px",
	    							 "z-index":"5"
	    					}).appendTo($.mobile.pageContainer).delay(3000)
	    					.fadeOut(2000, function(){
	    						$(this).remove();
	    					})
	    					
	    				}
    				
    				}
        			//$(document).scroll(handleHitTop);
			})

}


function bottom_gogosing(){
	var scrollTop = $(window).scrollTop();
	var scrollHeight = document.getElementById("main").scrollHeight;
	
	$("html, body").animate({ scrollTop: scrollHeight }, 0);
}

//function handleHitTop(event) {
//
//    var currentScrollTopValue = $(this).scrollTop();
//
//    if (handleHitTop.lastTop === undefined) {
//        handleHitTop.lastTop = currentScrollTopValue ;
//
//        return;
//    }
//
//    if (handleHitTop.lastTop == 0 && currentScrollTopValue == 0) {
//        return;
//    }
//
//    handleHitTop.lastTop = currentScrollTopValue;
//
//    if (handleHitTop.lastTop == 0) {
//    	if(ExistChat)
//    		{
//    		ChatViewMore();
//    		}
//    }
//}


function ChatViewMore()
{
	try{
	viewmoreclick++;
	var DivStructure ="<div id='ChatMoreDiv"+viewmoreclick+"'></div>";
	var CountCheckDB = firebase.database().ref('Chat');
	document.getElementById('ChatMoreArea').insertAdjacentHTML('afterBegin', DivStructure);	
	
	CountCheckDB.once('value', function(snapCheck)
			{
				var Totalcount = snapCheck.numChildren();
				console.log("count:"+ count);
				console.log("totalcount: "+Totalcount);
				if(Totalcount-count-5>=0)
					{
					var ViewCount=0;
					
					console.log(count);
					const ChatViewmoreDB = firebase.database().ref('Chat').limitToLast(5+count)
					count=count+5
					ChatViewmoreDB.once('value', function(snap)
							{		
								snap.forEach(function(snapshot)
										{							
									var uid = $("#index_uid").html();
									var email = snapshot.child('email').val()
									var id = email.split('@');
									var GetId = id[0];

									for(var i=3; i<id[0].length; i++)
									{
									var GetId = GetId.replaceAt(i,"*");
									}
									var replaceEmail = GetId+"@"+id[1];
									var SumID = snapshot.child('nickname').val()+"("+replaceEmail+")"
									
									console.log("데이트값: " + dateinsert);
									console.log("데이트값2: " + dateinsert2);
									
									if(dateinsert == (snapshot.key).substring(0, 8)){
										console.log("카운트를 세어보자 : " + dateinsert);
										if(datecount==0){
					        				$("div#dateclass_"+dateinsert).hide();
				        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
				        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
							                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
							                }
					        				datecount=1;
				        				}else if(datecount==2){
				        					
				        				}
				        			}else if(dateinsert2 == (snapshot.key).substring(0, 8)){
				        				console.log("카운트를 세어보자2 : " + dateinsert2);
				        				if(datecount==0){
					        				$("div#dateclass_"+dateinsert2).hide();
				        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert2+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
				        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
							                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
							                }
					        				datecount=1;
				        				}else if(datecount==2){
				        					$("div#dateclass_"+dateinsert2).hide();
				        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert2+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
				        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
							                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
							                }
					        				datecount=1;
				        				}else{
				        					
				        				}
				        				
				        			}else if(dateinsert3 == (snapshot.key).substring(0, 8)){
				        				console.log("카운트를 세어보자3 : " + dateinsert3);
				        				if(datecount==2){
				        					
				        				}
				        			}else{
				        				console.log("엘스 카운트를 세어보자 : " + datecount);
				        				if(datecount==0){
				        					dateinsert3 = (snapshot.key).substring(0, 8);
				        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert3+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
				        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
							                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
							                }
				        					datecount=2;
				        				}else if(datecount==2){
				        					dateinsert3 = (snapshot.key).substring(0, 8);
				        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert3+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
				        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
							                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
							                }
				        				}
				        			}
									
											ViewCount++
											if(snapshot.child('uid').val()==uid)//본인이 작성한 글일 때
											{
												var HTMLBubble ="<div class='author1'>"
													   +SumID
						                    		   +"</div>"  
													   +"<div class='bubble_pop1'>"
													   +"<div class='time1'>"
							                    	   +snapshot.child('time').val()
							                    	   +"</div>" 
													   +"<div class='bubble-speech-right bubble-right'>"
									                   +"<div class='message'>"
									                   +snapshot.child('contents').val()
									                   +"</div>"
									                   +"</div>"
									                   +"</div>";
												
									                  if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
									                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', HTMLBubble)
									                	}
												
									               

											}
											else//타인이 작성한 글일 때
											{
												var HTMLBubble = "<div class='author2'>"
							                    		+SumID
							                    		+"</div>"
														+"<div class='bubble_pop2'>"
													    +"<div class='bubble-speech-left bubble-left'>"
									                    +"<div class='message'>"
									                    +snapshot.child('contents').val()
									                    +"</div>"
									                    +"</div>"
									                    +"<div class='time2'>"
									                    +snapshot.child('time').val()
									                    +"</div>"
									                    +"</div>";
												
								                  if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
								                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', HTMLBubble)
								                	}
									               
											}
											
											if(ViewCount==1){
												dateinsert4 = (snapshot.key).substring(0, 8);
											}
												
											if(ViewCount==5)
												{
												datecount = 0;
												dateinsert2 = dateinsert4;
												return true;
												}
										})
							})
							
					}
				else //이거만 부르고 더이상 부를 것이 없을 때
					{
					document.getElementById('ChatMoreArea').insertAdjacentHTML('afterBegin', '<div id="chat_not_loading">더이상 불러올 채팅이 없습니다.</div>');	
					ExistChat=false;
					console.log(Totalcount-count-5);
					var PlusVal = 5+(Totalcount-count-5)
					console.log(PlusVal);
					
					if(PlusVal>0)
						{
						const ChatViewmoreLastDB = firebase.database().ref('Chat').limitToFirst(PlusVal);
						
						
						ChatViewmoreLastDB.once('value', function(snap)
								{
									snap.forEach(function(snapshot)
											{
										
										var uid = $("#index_uid").html();
										var email = snapshot.child('email').val()
										var id = email.split('@');


										var GetId = id[0];

										for(var i=3; i<id[0].length; i++)
										{
										var GetId = GetId.replaceAt(i,"*");
										}


										var replaceEmail = GetId+"@"+id[1];
										var SumID = snapshot.child('nickname').val()+"("+replaceEmail+")"
										
										if(dateinsert == (snapshot.key).substring(0, 8)){
											console.log("카운트를 세어보자 : " + datecount);
											if(datecount==0){
						        				$("div#dateclass_"+dateinsert).hide();
					        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
					        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
								                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
								                }
						        				datecount=1;
					        				}else if(datecount==2){
					        					
					        				}
					        			}else if(dateinsert2 == (snapshot.key).substring(0, 8)){
					        				if(datecount==0){
						        				$("div#dateclass_"+dateinsert2).hide();
					        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert2+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
					        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
								                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
								                }
						        				datecount=1;
					        				}else if(datecount==2){
					        					$("div#dateclass_"+dateinsert2).hide();
					        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert2+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
					        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
								                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
								                }
						        				datecount=1;
					        				}else{
					        					
					        				}
					        				
					        			}else if(dateinsert3 == (snapshot.key).substring(0, 8)){
					        				if(datecount==2){
					        					
					        				}
					        			}else{
					        				console.log("엘스 카운트를 세어보자 : " + datecount);
					        				if(datecount==0){
					        					dateinsert3 = (snapshot.key).substring(0, 8);
					        					var chatdate = "<div class='dateclass' id='dateclass_"+dateinsert3+"'>"+(snapshot.key).substring(0, 4)+"년"+(snapshot.key).substring(4, 6)+"월"+(snapshot.key).substring(6, 8)+"일</div>";
					        					if ($('#ChatMoreDiv'+viewmoreclick).length > 0) {
								                	  document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', chatdate)
								                }
					        					datecount=2;
					        				}else if(datecount==2){
					        					
					        				}
					        			}
										

												if(snapshot.child('uid').val()==uid)//본인이 작성한 글일 때
												{
													var HTMLBubble ="<div class='author1'>"
								                    		+SumID
								                    		+"</div>"
															+"<div class='bubble_pop1'>" 
														    +"<div class='time1'>"
								                            +snapshot.child('time').val()
								                    	    +"</div>"
														    +"<div class='bubble-speech-right bubble-right'>"
										                    +"<div class='message'>"
										                    +snapshot.child('contents').val()
										                    +"</div>"
										                   +"</div>"
										                   +"</div>";
										               document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', HTMLBubble)

												}
												else//타인이 작성한 글일 때
												{
													var HTMLBubble ="<div class='author2'>"
									                       +SumID
									                   	   +"</div>" 
														   +"<div class='bubble_pop2'>"
														   +"<div class='bubble-speech-left bubble-left'>"
										                   +"<div class='message'>"
										                   +snapshot.child('contents').val()
										                   +"</div>"
										                   +"</div>"
										                   +"<div class='time2'>"
										                   +snapshot.child('time').val()
										                   +"</div>"
										                   +"</div>";
										               document.getElementById('ChatMoreDiv'+viewmoreclick).insertAdjacentHTML('beforeEnd', HTMLBubble);

												}
											})
								})
						
						}
					HideGIF();
					}
			})
	}catch(e)
	{
		HideGIF();
	}
}

function btnPhotoTransferClick()
{
	ChatSelectPic()
}

function ChatSelectPic()
{
	try{
		navigator.camera.getPicture(onChatPhotoURI, onChatError, {
			quality: 100,
			allowEdit: true,
		    targetWidth: 640,
		    targetHeight: 640,
			destinationType: Camera.DestinationType.FILE_URI,
			correctOrientation: true,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
		});
	}catch(e){
		swal(e.message);
	}
	
}

function onChatPhotoURI(imgURI){
	
	try
	{	
		ChatUploadPhote(imgURI)	
	}
	catch(e)
	{
		HideGIF();
		swal(e.message);	
	}
}

function ChatUploadPhote(imgURI)
{
	try{
	ShowGIF("../img/giphy.gif");	
	var now = new Date();
	var uid = $("#index_uid").html();
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();
	var milsec = now.getMilliseconds().toString();

	var date = year+"-"+(month[1]? month:'0'+month[0])+"-"+(day[1]? day:'0'+day[0])
	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+"_"+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0])+"_"+milsec;
	var time=(hour[1]? hour:'0'+hour[0])+":"+(min[1]? min:'0'+min[0])
	
	
	var contentType = 'image/png';
	var StorageRef = firebase.storage().ref();
	var StorageRefChild = StorageRef.child("Chat/"+uid+"/"+Fulldate+".png");
	
	//앨범 File 경로를 Blob으로 바꾸기
    window.resolveLocalFileSystemURL(imgURI, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function () {
                     // This blob object can be saved to firebase
                     var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });                  

                     
                 	//파일등록하기
                     var task = StorageRefChild.put(blob);
             		
                 	task.on('state_changed',
                 			function progress(snapshot)
                 	{
                 		
                 	},
                 	
                 	function error(err)
                 	{
                 		swal({
                 			  title: '실패!',
                 			  text: '사진 등록에 실패했습니다. \n다시 시도해주세요.',
                 			  type: 'error',
                 			  confirmButtonText: '확인'
                 			})
                 	},
                 	function complete()
                 	{                 			
                 		ChatSendPhoto("Chat/"+uid+"/"+Fulldate+".png",uid,time,Fulldate);
                 	})

            };
            reader.readAsArrayBuffer(file);
        })
        })

	}
	catch(e)
	{
		throw e;
	}
}


function ChatSendPhoto(StoragePath, uid,time,Fulldate){
	
	try{
			var StorageRef = firebase.storage().ref();
			StorageRef.child(StoragePath).getDownloadURL().then(function(url)
					{
				var ChatInsertDB = firebase.database().ref('Chat/'+Fulldate+"_"+uid);
					ChatInsertDB.set({
					contents:"<img src='"+url+"'/>",
					uid:uid,
					email:email,
					nickname:nickname,
					time: time
				})
					})			
					HideGIF();
	}
	catch(error)
	{
		HideGIF();
		console.log(error.message);
	}
}



var onChatError = function(msg)
{
	//swal("실패");
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


