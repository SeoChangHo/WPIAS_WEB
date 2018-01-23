var myanswerCurrentCount;
var myanswerViewMoreClick;

$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "myanswerpage") {
    	myAnswerGetDoctorProfile()
    	LoadMyAnswer()
    	ConnectRadioEvent();
    	myanswerCurrentCount=0;
    	myanswerViewMoreClick=0;
    }
});

function ConnectRadioEvent()
{
	 $('input:radio[name=RadioCaseStatus]').change(function () {
		 console.log($("input[name='RadioCaseStatus']:checked").val())
		 LoadCaseEachStatus($("input[name='RadioCaseStatus']:checked").val());
	 })
}

function myAnswerGetDoctorProfile()
{
	
	FirebaseCall();
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const answerdb = dbRef.child('Question').orderByChild('answerdoc').equalTo(uid);
	
	$("#myanswer_doctor_name").html(doctorName);
	
	answerdb.once('value', function(snap){
		
		var AnswerCount = snap.numChildren();
	 	$("#myanswer_doctor_img img").attr("src","../img/profile/doctor_male.png");
		$("#myanswer_doctor_etc").html("화상외과 | 답변수 : " + AnswerCount);
	})

}

function LoadCaseEachStatus(status)
{
	$('#MyAnswerbtn').hide();
	$("#myanswerpage_box").html("");
	myanswerCurrentCount=0;
	myanswerViewMoreClick=0;
	
	if(status=="All")//All
	{
			LoadMyAnswer();
	}
	else//F이거나 A인 상태
	{
		LoadMyStatusAnswer(status);
	}
	
}


function LoadMyStatusAnswer(status)
{
	FirebaseCall();
	$('#MyAnswerbtn').hide();
	var uid = $('#index_uid').html();

	var dbRef = firebase.database().ref();

	const myQuestion = dbRef.child("Question").orderByChild('prostatus_answerdoc').equalTo(status+"_"+uid);
	
	myQuestion.once('value', function(totalsnap)
	{
		var totalcount = totalsnap.numChildren(); 
		console.log(totalcount);
		myQuestion.limitToLast(10).once('value', function(snap)
				{
					snap.forEach(function(snapshot)						
					{						
								myanswerCurrentCount++;
		
								if(snapshot.child('burnstyle').val()	=="1"){
									var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "열탕화상";
									var backgroundcolor = "style='background:rgba(255,115,115,1)'";
								}else if(snapshot.child('burnstyle').val()	=="2"){
									var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "화염화상";
									var backgroundcolor = "style='background:rgba(255,184,115,1)'";
								}else if(snapshot.child('burnstyle').val()	=="3"){
									var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "전기화상";
									var backgroundcolor = "style='background:rgba(29,29,192,1)'";
								}else if(snapshot.child('burnstyle').val()	=="4"){
									var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "접촉화상";
									var backgroundcolor = "style='background:rgba(255,115,207,1)'";
								}else if(snapshot.child('burnstyle').val()	=="5"){
									var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "저온화상";
									var backgroundcolor = "style='background:rgba(115,210,255,1)'";
								}else if(snapshot.child('burnstyle').val()	=="6"){
									var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "화학화상";
									var backgroundcolor = "style='background:rgba(123,77,255,1)'";
								}else if(snapshot.child('burnstyle').val()	=="7"){
									var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "증기화상";
									var backgroundcolor = "style='background:rgba(0,231,141,1)'";
								}else if(snapshot.child('burnstyle').val()	=="8"){
									var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "마찰화상";
									var backgroundcolor = "style='background:rgba(197,115,255,1)'";
								}else if(snapshot.child('burnstyle').val()	=="9"){
									var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "햇빛화상";
									var backgroundcolor = "style='background:rgba(210,233,17,1)'";
								}else if(snapshot.child('burnstyle').val()	=="10"){
									var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "흡입화상";
									var backgroundcolor = "style='background:rgba(0,136,161,1)'";
								}
							console.log(snapshot.key);
							console.log(snapshot.child('title').val());
							
							var Fulldate = snapshot.child('date').val()	;
							var YearVal =  Fulldate.substr(0,4);
							var MonthVal = Fulldate.substr(4,2);
							var DayVal = Fulldate.substr(6,2);	
							var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
							if(snapshot.child('prostatus').val()=="A"){
								var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
							}else if(snapshot.child('prostatus').val()=="F"){
								var pagecase = "<div class='myanswerpage_case2'>마감</div>"
							}
							
							var DivStruct=
								  "<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
								+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
								+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
								+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
								+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
								+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
								+"</ul>";
							
							document.getElementById('myanswerpage_box').insertAdjacentHTML('afterBegin',DivStruct);
							
							requestCountStatus(snapshot.key);	
							

					})
				}).then(function()
						{
					if(myanswerCurrentCount<totalcount)
					{
						console.log(myanswerCurrentCount+"<?"+totalcount);
						$('#MyAnswerbtn').show();
						$('#btnMyAnswer').attr("onclick", 'myanswerStatusViewmore(\''+status+'\','+myanswerCurrentCount+')')
					}
				})			

	})
}

function LoadMyAnswer()
{
	FirebaseCall();
	$('#MyAnswerbtn').hide();
	var uid = $('#index_uid').html();

	var dbRef = firebase.database().ref();

	const myQuestion = dbRef.child("Question").orderByChild('answerdoc').equalTo(uid);
	
	myQuestion.once('value', function(totalsnap)
	{
		var totalcount = totalsnap.numChildren(); 
		console.log(totalcount);
		
		myQuestion.limitToLast(10).once('value', function(snap)
				{
					snap.forEach(function(snapshot)						
					{						
						myanswerCurrentCount++;
						///
						if(snapshot.child('burnstyle').val()	=="1"){
							var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "열탕화상";
							var backgroundcolor = "style='background:rgba(255,115,115,1)'";
						}else if(snapshot.child('burnstyle').val()	=="2"){
							var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "화염화상";
							var backgroundcolor = "style='background:rgba(255,184,115,1)'";
						}else if(snapshot.child('burnstyle').val()	=="3"){
							var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "전기화상";
							var backgroundcolor = "style='background:rgba(29,29,192,1)'";
						}else if(snapshot.child('burnstyle').val()	=="4"){
							var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "접촉화상";
							var backgroundcolor = "style='background:rgba(255,115,207,1)'";
						}else if(snapshot.child('burnstyle').val()	=="5"){
							var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "저온화상";
							var backgroundcolor = "style='background:rgba(115,210,255,1)'";
						}else if(snapshot.child('burnstyle').val()	=="6"){
							var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "화학화상";
							var backgroundcolor = "style='background:rgba(123,77,255,1)'";
						}else if(snapshot.child('burnstyle').val()	=="7"){
							var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "증기화상";
							var backgroundcolor = "style='background:rgba(0,231,141,1)'";
						}else if(snapshot.child('burnstyle').val()	=="8"){
							var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "마찰화상";
							var backgroundcolor = "style='background:rgba(197,115,255,1)'";
						}else if(snapshot.child('burnstyle').val()	=="9"){
							var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "햇빛화상";
							var backgroundcolor = "style='background:rgba(210,233,17,1)'";
						}else if(snapshot.child('burnstyle').val()	=="10"){
							var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "흡입화상";
							var backgroundcolor = "style='background:rgba(0,136,161,1)'";
						}
					console.log(snapshot.key);
					console.log(snapshot.child('title').val());
					
					var Fulldate = snapshot.child('date').val()	;
					var YearVal =  Fulldate.substr(0,4);
					var MonthVal = Fulldate.substr(4,2);
					var DayVal = Fulldate.substr(6,2);	
					var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
					if(snapshot.child('prostatus').val()=="A"){
						var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
					}else if(snapshot.child('prostatus').val()=="F"){
						var pagecase = "<div class='myanswerpage_case2'>마감</div>"
					}
					
					
					var DivStruct=
						"<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
						+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
						+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
						+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
						+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
						+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
						+"</ul>";
					
					document.getElementById('myanswerpage_box').insertAdjacentHTML('afterBegin',DivStruct);
					
					requestCountStatus(snapshot.key);
						///
//						descArr[RowCount][ColCount]=snapshot.key;			
//						
//						descArr[RowCount][ColCount] = snapshot.child('title').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('date').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('burnstyle').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('burndetail').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('prostatus').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('bodystyle').val()		
//						
//						descArr[RowCount][ColCount] = snapshot.child('bodydetail').val()
//						
//						descArr[RowCount][ColCount] = snapshot.child('age').val()	
//			
//						descArr[RowCount][ColCount] = snapshot.child('nickname').val()	
					})
				}).then(function()
						{
							if(myanswerCurrentCount<totalcount)
							{
								console.log(myanswerCurrentCount+"<?"+totalcount);
								$('#MyAnswerbtn').show();
								$('#btnMyAnswer').attr("onclick", 'myanswerViewmore('+myanswerCurrentCount+')')
							}
						})

	})
}

function requestCountStatus(key)
{
	var completeCount=0;
	var TotalCount=0;
	
	var CaseCompleteDB  = firebase.database().ref('Case/'+key).orderByChild('visible').equalTo('true');
	CaseCompleteDB.once('value', function(snap)
			{			
					snap.forEach(function(snapshot)
					{
						TotalCount++;
						if(snapshot.child('status').val()=="A")
							{
							completeCount++;
							}
					})					
			}).then(function()
			{
					$('#MyAnswerDivCount_'+key).html(completeCount+"/"+TotalCount)
			})
}


function myanswerViewmore(getCount)
{
	$('#MyAnswerbtn').hide();
	myanswerViewMoreClick++;
	var uid = $('#index_uid').html();
	var moreDivStruct = "<div id='myanswerpage_box_"+myanswerViewMoreClick+"'></div>"
	document.getElementById('myanswerpage_box').insertAdjacentHTML('beforeEnd',moreDivStruct)
	
	var resetcount=0;
	const myQuestion = firebase.database().ref("Question").orderByChild('answerdoc').equalTo(uid);
	myQuestion.once('value', function(totalsnap)
			{
				var totalcount = totalsnap.numChildren(); 
				console.log("토탈: "+totalcount);
				if(totalcount-myanswerCurrentCount>10)//이거 부르고 더있을 때
				{
				myQuestion.limitToLast(getCount+10).once('value', function(snap)
						{

								snap.forEach(function(snapshot)						
								{						
									resetcount++;
									myanswerCurrentCount++;
									///
									if(snapshot.child('burnstyle').val()	=="1"){
										var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "열탕화상";
										var backgroundcolor = "style='background:rgba(255,115,115,1)'";
									}else if(snapshot.child('burnstyle').val()	=="2"){
										var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "화염화상";
										var backgroundcolor = "style='background:rgba(255,184,115,1)'";
									}else if(snapshot.child('burnstyle').val()	=="3"){
										var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "전기화상";
										var backgroundcolor = "style='background:rgba(29,29,192,1)'";
									}else if(snapshot.child('burnstyle').val()	=="4"){
										var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "접촉화상";
										var backgroundcolor = "style='background:rgba(255,115,207,1)'";
									}else if(snapshot.child('burnstyle').val()	=="5"){
										var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "저온화상";
										var backgroundcolor = "style='background:rgba(115,210,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="6"){
										var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "화학화상";
										var backgroundcolor = "style='background:rgba(123,77,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="7"){
										var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "증기화상";
										var backgroundcolor = "style='background:rgba(0,231,141,1)'";
									}else if(snapshot.child('burnstyle').val()	=="8"){
										var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "마찰화상";
										var backgroundcolor = "style='background:rgba(197,115,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="9"){
										var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "햇빛화상";
										var backgroundcolor = "style='background:rgba(210,233,17,1)'";
									}else if(snapshot.child('burnstyle').val()	=="10"){
										var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "흡입화상";
										var backgroundcolor = "style='background:rgba(0,136,161,1)'";
									}
								console.log(snapshot.key);
								console.log(snapshot.child('title').val());
								
								var Fulldate = snapshot.child('date').val()	;
								var YearVal =  Fulldate.substr(0,4);
								var MonthVal = Fulldate.substr(4,2);
								var DayVal = Fulldate.substr(6,2);	
								var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
								if(snapshot.child('prostatus').val()=="A"){
									var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
								}else if(snapshot.child('prostatus').val()=="F"){
									var pagecase = "<div class='myanswerpage_case2'>마감</div>"
								}
								
								var DivStruct=
									  "<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
									+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
									+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
									+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
									+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
									+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
									+"</ul>";
								
								document.getElementById('myanswerpage_box_'+myanswerViewMoreClick).insertAdjacentHTML('afterBegin',DivStruct);
								
								requestCountStatus(snapshot.key);

								
								if(resetcount==10)
									{
									$('#MyAnswerbtn').show();
									$('#btnMyAnswer').attr("onclick", 'myanswerViewmore('+myanswerCurrentCount+')')
									return true;
									}
								
							})
						})

				}
				else//이거를 마지막으로 부를 것이 없을 때
				{
						console.log("10개 미만남음");
						var lastcount = totalcount-myanswerCurrentCount;
						console.log(lastcount);
						
						myQuestion.limitToFirst(lastcount).once('value', function(snap)
								{
										snap.forEach(function(snapshot)						
										{						
											myanswerCurrentCount++;
											///
											if(snapshot.child('burnstyle').val()	=="1"){
												var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "열탕화상";
												var backgroundcolor = "style='background:rgba(255,115,115,1)'";
											}else if(snapshot.child('burnstyle').val()	=="2"){
												var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "화염화상";
												var backgroundcolor = "style='background:rgba(255,184,115,1)'";
											}else if(snapshot.child('burnstyle').val()	=="3"){
												var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "전기화상";
												var backgroundcolor = "style='background:rgba(29,29,192,1)'";
											}else if(snapshot.child('burnstyle').val()	=="4"){
												var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "접촉화상";
												var backgroundcolor = "style='background:rgba(255,115,207,1)'";
											}else if(snapshot.child('burnstyle').val()	=="5"){
												var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "저온화상";
												var backgroundcolor = "style='background:rgba(115,210,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="6"){
												var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "화학화상";
												var backgroundcolor = "style='background:rgba(123,77,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="7"){
												var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "증기화상";
												var backgroundcolor = "style='background:rgba(0,231,141,1)'";
											}else if(snapshot.child('burnstyle').val()	=="8"){
												var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "마찰화상";
												var backgroundcolor = "style='background:rgba(197,115,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="9"){
												var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "햇빛화상";
												var backgroundcolor = "style='background:rgba(210,233,17,1)'";
											}else if(snapshot.child('burnstyle').val()	=="10"){
												var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "흡입화상";
												var backgroundcolor = "style='background:rgba(0,136,161,1)'";
											}
										console.log(snapshot.key);
										console.log(snapshot.child('title').val());
										
										var Fulldate = snapshot.child('date').val()	;
										var YearVal =  Fulldate.substr(0,4);
										var MonthVal = Fulldate.substr(4,2);
										var DayVal = Fulldate.substr(6,2);	
										var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
										if(snapshot.child('prostatus').val()=="A"){
											var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
										}else if(snapshot.child('prostatus').val()=="F"){
											var pagecase = "<div class='myanswerpage_case2'>마감</div>"
										}
										
										var DivStruct=
											  "<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
											+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
											+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
											+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
											+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
											+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
											+"</ul>";
										
										document.getElementById('myanswerpage_box_'+myanswerViewMoreClick).insertAdjacentHTML('afterBegin',DivStruct);
										
										requestCountStatus(snapshot.key);
										
									})
								})
				}
			})
			
			
}

function myanswerStatusViewmore(status, getCount)
{
	$('#MyAnswerbtn').hide();
	myanswerViewMoreClick++;
	var uid = $('#index_uid').html();
	var moreDivStruct = "<div id='myanswerpage_box_"+myanswerViewMoreClick+"'></div>"
	document.getElementById('myanswerpage_box').insertAdjacentHTML('beforeEnd',moreDivStruct)
	
	var resetcount=0;
	const myQuestion = firebase.database().ref("Question").orderByChild('prostatus_answerdoc').equalTo(status+"_"+uid);
	myQuestion.once('value', function(totalsnap)
			{
				var totalcount = totalsnap.numChildren(); 
				console.log("토탈: "+totalcount);
				if(totalcount-myanswerCurrentCount>10)//이거 부르고 더있을 때
				{
				myQuestion.limitToLast(getCount+10).once('value', function(snap)
						{

								snap.forEach(function(snapshot)						
								{						
									resetcount++;
									myanswerCurrentCount++;
									///
									if(snapshot.child('burnstyle').val()	=="1"){
										var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "열탕화상";
										var backgroundcolor = "style='background:rgba(255,115,115,1)'";
									}else if(snapshot.child('burnstyle').val()	=="2"){
										var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "화염화상";
										var backgroundcolor = "style='background:rgba(255,184,115,1)'";
									}else if(snapshot.child('burnstyle').val()	=="3"){
										var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "전기화상";
										var backgroundcolor = "style='background:rgba(29,29,192,1)'";
									}else if(snapshot.child('burnstyle').val()	=="4"){
										var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "접촉화상";
										var backgroundcolor = "style='background:rgba(255,115,207,1)'";
									}else if(snapshot.child('burnstyle').val()	=="5"){
										var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "저온화상";
										var backgroundcolor = "style='background:rgba(115,210,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="6"){
										var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "화학화상";
										var backgroundcolor = "style='background:rgba(123,77,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="7"){
										var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "증기화상";
										var backgroundcolor = "style='background:rgba(0,231,141,1)'";
									}else if(snapshot.child('burnstyle').val()	=="8"){
										var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "마찰화상";
										var backgroundcolor = "style='background:rgba(197,115,255,1)'";
									}else if(snapshot.child('burnstyle').val()	=="9"){
										var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "햇빛화상";
										var backgroundcolor = "style='background:rgba(210,233,17,1)'";
									}else if(snapshot.child('burnstyle').val()	=="10"){
										var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
										var nodetext = "흡입화상";
										var backgroundcolor = "style='background:rgba(0,136,161,1)'";
									}
								console.log(snapshot.key);
								console.log(snapshot.child('title').val());
								
								var Fulldate = snapshot.child('date').val()	;
								var YearVal =  Fulldate.substr(0,4);
								var MonthVal = Fulldate.substr(4,2);
								var DayVal = Fulldate.substr(6,2);	
								var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
								if(snapshot.child('prostatus').val()=="A"){
									var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
								}else if(snapshot.child('prostatus').val()=="F"){
									var pagecase = "<div class='myanswerpage_case2'>마감</div>"
								}
								
								var DivStruct=
									  "<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
									+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
									+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
									+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
									+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
									+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
									+"</ul>";
								
								document.getElementById('myanswerpage_box_'+myanswerViewMoreClick).insertAdjacentHTML('afterBegin',DivStruct);
								
								requestCountStatus(snapshot.key);

								
								if(resetcount==10)
									{
									$('#MyAnswerbtn').show();
									$('#btnMyAnswer').attr("onclick", 'myanswerViewmore('+myanswerCurrentCount+')')
									return true;
									}
								
							})
						})

				}
				else//이거를 마지막으로 부를 것이 없을 때
				{
						console.log("10개 미만남음");
						var lastcount = totalcount-myanswerCurrentCount;
						console.log(lastcount);
						
						myQuestion.limitToFirst(lastcount).once('value', function(snap)
								{
										snap.forEach(function(snapshot)						
										{						
											myanswerCurrentCount++;
											///
											if(snapshot.child('burnstyle').val()	=="1"){
												var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "열탕화상";
												var backgroundcolor = "style='background:rgba(255,115,115,1)'";
											}else if(snapshot.child('burnstyle').val()	=="2"){
												var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "화염화상";
												var backgroundcolor = "style='background:rgba(255,184,115,1)'";
											}else if(snapshot.child('burnstyle').val()	=="3"){
												var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "전기화상";
												var backgroundcolor = "style='background:rgba(29,29,192,1)'";
											}else if(snapshot.child('burnstyle').val()	=="4"){
												var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "접촉화상";
												var backgroundcolor = "style='background:rgba(255,115,207,1)'";
											}else if(snapshot.child('burnstyle').val()	=="5"){
												var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "저온화상";
												var backgroundcolor = "style='background:rgba(115,210,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="6"){
												var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "화학화상";
												var backgroundcolor = "style='background:rgba(123,77,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="7"){
												var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "증기화상";
												var backgroundcolor = "style='background:rgba(0,231,141,1)'";
											}else if(snapshot.child('burnstyle').val()	=="8"){
												var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "마찰화상";
												var backgroundcolor = "style='background:rgba(197,115,255,1)'";
											}else if(snapshot.child('burnstyle').val()	=="9"){
												var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "햇빛화상";
												var backgroundcolor = "style='background:rgba(210,233,17,1)'";
											}else if(snapshot.child('burnstyle').val()	=="10"){
												var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
												var nodetext = "흡입화상";
												var backgroundcolor = "style='background:rgba(0,136,161,1)'";
											}
										console.log(snapshot.key);
										console.log(snapshot.child('title').val());
										
										var Fulldate = snapshot.child('date').val()	;
										var YearVal =  Fulldate.substr(0,4);
										var MonthVal = Fulldate.substr(4,2);
										var DayVal = Fulldate.substr(6,2);	
										var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
										if(snapshot.child('prostatus').val()=="A"){
											var pagecase = "<div class='myanswerpage_case1'>진행중<br><div id =MyAnswerDivCount_"+snapshot.key+">()</div></div>";
										}else if(snapshot.child('prostatus').val()=="F"){
											var pagecase = "<div class='myanswerpage_case2'>마감</div>"
										}
										
										var DivStruct=
											  "<ul onclick='MyAnswerDetail(\""+snapshot.key+"\")'>"
											+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
											+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
											+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()		+"</div></li>"
											+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
											+"	<li class='myanswerpage_li4'>"+pagecase+"</li>"
											+"</ul>";
										
										document.getElementById('myanswerpage_box_'+myanswerViewMoreClick).insertAdjacentHTML('afterBegin',DivStruct);
										
										requestCountStatus(snapshot.key);
										
									})
								})
				}
			})
			
			
}

function MyAnswerDetail(qnum)
{
	$.mobile.pageContainer.pagecontainer( "change", "myanswerdetail.html", { transition:"slide", num:qnum } )
}