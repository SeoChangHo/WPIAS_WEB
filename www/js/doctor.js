var BoardCount;
var BoardMoreCount;

$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "doctor_webpage") {

		
	}
		
});


$(document).on('pageshow', '#doctor_webpage', function (event, data) {
	
	BoardCount=0;
	BoardMoreCount=0;
});

function menuselect(number){
	
	if(number=="1"){
		$("#doctor_notice_board_div").show();
		$("#doctor_notice_board_div_progress_div").hide();
		$("#doctor_notice_board_div_complete").hide();
		$("#topmenu_all").css("font-weight","bold");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","inherit");
		
		DoctorBoard();
		
	}else if(number=="2"){
		$("#doctor_notice_board_div").hide();
		$("#doctor_notice_board_div_progress_div").show();
		$("#doctor_notice_board_div_complete").hide();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","bold");
		$("#topmenu_complete").css("font-weight","inherit");
		
	}else if(number=="3"){
		$("#doctor_notice_board_div").hide();
		$("#doctor_notice_board_div_progress_div").hide();
		$("#doctor_notice_board_div_complete").show();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","bold");
	}
	
}

function DoctorBoard()
{
	
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus').equalTo('Q')
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				
				if(TotalCount>4)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(4).once('value', function(snap)
							{
								snap.forEach(function(snapshot)
										{
											var burnstyle = burnstyle(snapshot.child('burnstyle').val());
											var burndetail = burndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
											var Fulldate = snapshot.child('date').val();
											var YearVal =  Fulldate.substr(0,4);
											var MonthVal = Fulldate.substr(4,2);
											var DayVal = Fulldate.substr(6,2);	
											var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
											
											if(snapshot.child("gender").val()=="male"){
												var genderimg = "<img src='../img/question/male.png' width='100%'>";
											}else{
												var genderimg = "<img src='../img/question/female.png' width='100%'>";
											}
											
											BoardCount++;
											ForCount++;
											var insertTXT = 	"<div id='Board_"+snapshot.key+"' onclick=BoardCaseOpen('"+snapshot.key+"')>"
																		+"	<div class='doctor_notice_contents'>"
																		+"		<ul>"
																		+"			<li><div class='doctor_notice_contents_burn'>"+burnstyle+"</div></li>"
																		+"			<li><div class='doctor_notice_contents_title'>"+snapshot.child('title').val()+"</div></li>"
																		+"			<li><div class='doctor_notice_contents_content'>작성자: "+snapshot.child('nickname').val()+" | "+DesignDate+"</div></li>"
																		+"		</ul>"
																		+"		<ul>"
																		+"			<li><div class='doctor_notice_contents_detail'><img src='../img/detail_down.png' width='100%'></div></li>"
																		+"		</ul>"
																		+"	</div>"
																		+"	<div class='doctor_notice_detail'>"
																		+"		<div class='doctor_notice_detail_img'>"+genderimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+snapshot.child('age').val()+"</div>"
																		+"		<div class='doctor_notice_detail_img'>"+burndetail+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+burnstyle+"</div>"
																		+"		<div class='doctor_notice_detail_img'><img src='../img/burnkind/junggi/junggi1.png' width='100%'></div>"
																		+"		<div class='doctor_notice_detail_text'>우측가슴</div>"
																		+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																		+'</div>';

											document.getElementById('doctor_notice_board').insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==4)
												{
													$('#boradMornDIV').show();
													$('#boradMornBTN').attr('onclick', 'DoctorBoardMore(4)');
												}
										})
							})
					}
				else//총 갯수가 4개 이하임
					{
					DoctorBoardDB.limitToLast(TotalCount).once('value', function(snap)
							{
								snap.forEach(function(snapshot)
										{
									
											var burnstyle = burnstyle(snapshot.child('burnstyle').val());
											var burndetail = burndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
											var Fulldate = snapshot.child('date').val();
											var YearVal =  Fulldate.substr(0,4);
											var MonthVal = Fulldate.substr(4,2);
											var DayVal = Fulldate.substr(6,2);	
											var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
											
											if(snapshot.child("gender").val()=="male"){
												var genderimg = "<img src='../img/question/male.png' width='100%'>";
											}else{
												var genderimg = "<img src='../img/question/female.png' width='100%'>";
											}
											
											BoardCount++;
											var insertTXT = "<div id='Board_"+snapshot.key+"' onclick=BoardCaseOpen('"+snapshot.key+"')>"
																	+"	<div class='doctor_notice_contents'>"
																	+"		<ul>"
																	+"			<li><div class='doctor_notice_contents_burn'>"+burnstyle+"</div></li>"
																	+"			<li><div class='doctor_notice_contents_title'>"+snapshot.child('title').val()+"</div></li>"
																	+"			<li><div class='doctor_notice_contents_content'>작성자: "+snapshot.child('nickname').val()+" | "+DesignDate+"</div></li>"
																	+"		</ul>"
																	+"		<ul>"
																	+"			<li><div class='doctor_notice_contents_detail'><img src='../img/detail_down.png' width='100%'></div></li>"
																	+"		</ul>"
																	+"	</div>"
																	+"	<div class='doctor_notice_detail'>"
																	+"		<div class='doctor_notice_detail_img'>"+genderimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+snapshot.child('age').val()+"</div>"
																	+"		<div class='doctor_notice_detail_img'>"+burndetail+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+burnstyle+"</div>"
																	+"		<div class='doctor_notice_detail_img'><img src='../img/burnkind/junggi/junggi1.png' width='100%'></div>"
																	+"		<div class='doctor_notice_detail_text'>우측가슴</div>"
																	+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																	+'</div>';

											document.getElementById('doctor_notice_board').insertAdjacentHTML('afterBegin', insertTXT);
										})
							})
					}
			})

}

function DoctorBoardMore(getCount)
{
	BoardMoreCount++
	
	var DivFrame = '<div id=BoardMore'+BoardMoreCount+'></div>'
	document.getElementById('doctor_notice_board').insertAdjacentHTML('beforeEnd', DivFrame);	
	
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus').equalTo('Q')
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				
				if(TotalCount-getCount>4)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(4+getCount).once('value', function(snap)
							{
								snap.forEach(function(snapshot)
										{
											var burnstyle = burnstyle(snapshot.child('burnstyle').val());
											var burndetail = burndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
											var Fulldate = snapshot.child('date').val();
											var YearVal =  Fulldate.substr(0,4);
											var MonthVal = Fulldate.substr(4,2);
											var DayVal = Fulldate.substr(6,2);	
											var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
											
											if(snapshot.child("gender").val()=="male"){
												var genderimg = "<img src='../img/question/male.png' width='100%'>";
											}else{
												var genderimg = "<img src='../img/question/female.png' width='100%'>";
											}
											
											BoardCount++;
											ForCount++;
											var insertTXT = "<div id='Board_"+snapshot.key+"' onclick=BoardCaseOpen('"+snapshot.key+"')>"
																	+"	<div class='doctor_notice_contents'>"
																	+"		<ul>"
																	+"			<li><div class='doctor_notice_contents_burn'>"+burnstyle+"</div></li>"
																	+"			<li><div class='doctor_notice_contents_title'>"+snapshot.child('title').val()+"</div></li>"
																	+"			<li><div class='doctor_notice_contents_content'>작성자: "+snapshot.child('nickname').val()+" | "+DesignDate+"</div></li>"
																	+"		</ul>"
																	+"		<ul>"
																	+"			<li><div class='doctor_notice_contents_detail'><img src='../img/detail_down.png' width='100%'></div></li>"
																	+"		</ul>"
																	+"	</div>"
																	+"	<div class='doctor_notice_detail'>"
																	+"		<div class='doctor_notice_detail_img'>"+genderimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+snapshot.child('age').val()+"</div>"
																	+"		<div class='doctor_notice_detail_img'>"+burndetail+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+burnstyle+"</div>"
																	+"		<div class='doctor_notice_detail_img'><img src='../img/burnkind/junggi/junggi1.png' width='100%'></div>"
																	+"		<div class='doctor_notice_detail_text'>우측가슴</div>"
																	+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																	+'</div>';
											document.getElementById('BoardMore'+BoardMoreCount).insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==4)
												{
													$('#boradMornDIV').show();
													$('#boradMornBTN').attr('onclick', 'DoctorBoardMore('+BoardCount+')');
													return true;
												}
										})
							})
					}
				else//총 갯수가 4개 이하임
					{
						console.log('4개 미만 남았음')
						
						$('#boradMornDIV').hide();
						var LastCount = TotalCount-getCount
						DoctorBoardDB.limitToFirst(LastCount).once('value', function(snap)
								{
									snap.forEach(function(snapshot)
											{
												var burnstyle = burnstyle(snapshot.child('burnstyle').val());
												var burndetail = burndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
												var Fulldate = snapshot.child('date').val();
												var YearVal =  Fulldate.substr(0,4);
												var MonthVal = Fulldate.substr(4,2);
												var DayVal = Fulldate.substr(6,2);	
												var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
												
												if(snapshot.child("gender").val()=="male"){
													var genderimg = "<img src='../img/question/male.png' width='100%'>";
												}else{
													var genderimg = "<img src='../img/question/female.png' width='100%'>";
												}
												
												BoardCount++;
												ForCount++;
												var insertTXT = "<div id='Board_"+snapshot.key+"' onclick=BoardCaseOpen('"+snapshot.key+"')>"
																		+"	<div class='doctor_notice_contents'>"
																		+"		<ul>"
																		+"			<li><div class='doctor_notice_contents_burn'>"+burnstyle+"</div></li>"
																		+"			<li><div class='doctor_notice_contents_title'>"+snapshot.child('title').val()+"</div></li>"
																		+"			<li><div class='doctor_notice_contents_content'>작성자: "+snapshot.child('nickname').val()+" | "+DesignDate+"</div></li>"
																		+"		</ul>"
																		+"		<ul>"
																		+"			<li><div class='doctor_notice_contents_detail'><img src='../img/detail_down.png' width='100%'></div></li>"
																		+"		</ul>"
																		+"	</div>"
																		+"	<div class='doctor_notice_detail'>"
																		+"		<div class='doctor_notice_detail_img'>"+genderimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+snapshot.child('age').val()+"</div>"
																		+"		<div class='doctor_notice_detail_img'>"+burndetail+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+burnstyle+"</div>"
																		+"		<div class='doctor_notice_detail_img'><img src='../img/burnkind/junggi/junggi1.png' width='100%'></div>"
																		+"		<div class='doctor_notice_detail_text'>우측가슴</div>"
																		+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																		+'</div>';
												document.getElementById('BoardMore'+BoardMoreCount).insertAdjacentHTML('afterBegin', insertTXT);	
												

											})
								})
						
					}
			})
}

function BoardCaseOpen(getId)
{
	console.log(getId);
	$('#BoardCase'+getId).html('');
	$('#Board_'+getId).attr('onclick', 'BoardCaseClose("'+getId+'")');
	$('#BoardCase'+getId).show();
	
	const BoardCaseDB = firebase.database().ref('Case/'+getId).orderByChild('visible').equalTo('true')
	
	BoardCaseDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							var BoardCaseFrame = '================='+snapshot.key+'시작==================<br>'
																	+'contents: '+snapshot.child('contents').val()+'<br>'
																	+'date: '+snapshot.child('date').val()+'<br>'
																	+'imgurl1: '+snapshot.child('imgurl1').val()+'<br>'
																	+'imgurl2: '+snapshot.child('imgurl2').val()+'<br>'
																	+'status: '+snapshot.child('status').val()+'<br>'
																	+'<textarea id=txt_'+snap.key+'_'+snapshot.key+'></textarea>'
																	+'<button id=btn_'+snap.key+'_'+snapshot.key+' onclick=BoardInsert("'+snap.key+'","'+snapshot.key+'")>등록</button>'
																	+'<br>================='+snapshot.key+'끝====================<br>'
							document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
						})
			})
	
}

function BoardCaseClose(getId)
{
	$('#Board_'+getId).attr('onclick', 'BoardCaseOpen("'+getId+'")');
	$('#BoardCase'+getId).hide();
}


function BoardInsert(key, casenum)
{
	console.log("key: "+key);
	console.log("casenum: "+casenum);
	
	
	
	var Seq = key
	var CaseNum =casenum;
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName
	

	var now = new Date();
	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();
	
	var Fulldate= year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0]);
	
	
	
	var AnswerInsertDB = firebase.database().ref().child("Answer/"+Seq+"/"+CaseNum);
	var ConfirmStatus = firebase.database().ref().child("Question/"+Seq);

	ConfirmStatus.once('value' , function(snapshot)
			{
		if(snapshot.numChildren()==0)
			{
			swal(
					  '실패',
					  '해당 질문이 삭제되었습니다!',
					  'error'
					).then(function()
							{
								$.mobile.pageContainer.pagecontainer( "change", "answer.html", { transition:"slideup", reverse:true } )
							})
			}
			

		else
		{
			if(snapshot.child('prostatus').val()=="Q")
			{
			AnswerInsertDB.set({
				date:Fulldate,
				uid:uid,
				contents:$("#txt_"+key+'_'+casenum).val().replace(/\n/g, '<br>'),
			}).then(function()
					{
						QuestionStatusUpdate(Seq, Fulldate, uid, doctorName, casenum)
					})
			}
		else if(snapshot.child('prostatus').val()=="A")
			{
			swal(
					  '실패',
					  '다른 답변이 먼저 등록되었습니다!',
					  'error'
					).then(function()
							{
								$.mobile.pageContainer.pagecontainer( "change", "answer.html", { transition:"slideup", reverse:true } )
							})
			}
		}
			});	
}

function QuestionStatusUpdate(Seq, Fulldate, uid, doctorName, casenum)
{
	var QuestionStatusDB = firebase.database().ref().child('Question/'+Seq);
	var CaseStatusDB = firebase.database().ref().child('Case/'+Seq+"/"+casenum)
	
	
	console.log(Seq)
	console.log(casenum)
	
	CaseStatusDB.update
	({
			status:"A"
	})
	QuestionStatusDB.update(
			{
				prostatus:"A",
				answerdoc: uid,
				prostatus_answerdoc:"A_"+uid
			}).then(function(){
				swal({
       			  title: '성공!',
       			  text: '해당 글은 나의 답변에서 확인 할 수 있습니다.',
       			  type: 'success',
       			  confirmButtonText: '확인'
       			})
       						
       						var splitqnum = Seq.split("_");
       						var splitedqnum = splitqnum[1];
       				
       				
       						var UserDetailDB = firebase.database().ref().child('User/'+splitedqnum);
       						
       						UserDetailDB.once('value', function(snap)
       								{
       									var OS = snap.child('OS').val();
       									var Token = snap.child('Token').val();
       									var switch2 = snap.child('switch2').val();
       									console.log("토큰: "+Token);
       									if(Token!=""&&switch2=="On")
       										{
       											var Msg = "회원님의 질문에 "+doctorName+" 님이 답변을 등록하였습니다.";
       											SendMessageToTarget(Token, Msg);
       										}
       									
       									$('#Board_'+Seq).hide();
       									$('#BoardCase'+Seq).hide();
       								})
       					
	})
}


function burnstyle(burn){
	
	if(burn=="1"){
		return "열탕화상";
	}else if(burn=="2"){
		return "화염화상";
	}else if(burn=="3"){
		return "전기화상";
	}else if(burn=="4"){
		return "접촉화상";
	}else if(burn=="5"){
		return "저온화상";
	}else if(burn=="6"){
		return "화학화상";
	}else if(burn=="7"){
		return "증기화상";
	}else if(burn=="8"){
		return "마찰화상";
	}else if(burn=="9"){
		return "햇빛화상";
	}else if(burn=="10"){
		return "흡입화상";
	}
	
}

function burndetail(burn, burn2){
	
	if(burn=="1"){
		return "<img src='../img/burnkind/yultang/yultang"+burn2+".png' width='100%'>";
	}else if(burn=="2"){
		return "<img src='../img/burnkind/hwayum/hwayum"+burn2+".png' width='100%'>";
	}else if(burn=="3"){
		return "<img src='../img/burnkind/jungi/jungi"+burn2+".png' width='100%'>";
	}else if(burn=="4"){
		return "<img src='../img/burnkind/jubchok/jubchok"+burn2+".png' width='100%'>";
	}else if(burn=="5"){
		return "<img src='../img/burnkind/juon/juon"+burn2+".png' width='100%'>";
	}else if(burn=="6"){
		return "<img src='../img/burnkind/hwahag/hwahag"+burn2+".png' width='100%'>";
	}else if(burn=="7"){
		return "<img src='../img/burnkind/junggi/junggi"+burn2+".png' width='100%'>";
	}else if(burn=="8"){
		return "<img src='../img/burnkind/machar/machar"+burn2+".png' width='100%'>";
	}else if(burn=="9"){
		return "<img src='../img/burnkind/hatbit/hatbit"+burn2+".png' width='100%'>";
	}else if(burn=="10"){
		return "<img src='../img/burnkind/heubib/heubib"+burn2+".png' width='100%'>";
	}
	
}
