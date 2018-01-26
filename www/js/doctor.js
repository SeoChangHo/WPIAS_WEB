var BoardCount;
var BoardMoreCount;
var BoardMoreProgressCount;
var DoctorInfo;

$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "doctor_webpage") {
		menuselect("1");
		
	}
		
});


$(document).on('pageshow', '#doctor_webpage', function (event, data) {
	
	BoardCount=0;
	BoardMoreCount=0;
	DoctorInfo = firebase.auth().currentUser;
	
});

function menuselect(number){
	CountReset();
	if(number=="1"){
		$("#doctor_notice_board_div").show();
		$("#doctor_notice_board_progress_div").hide();
		$("#doctor_notice_board_complete_div").hide();
		$("#topmenu_all").css("font-weight","bold");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","inherit");
		
		DoctorBoard();
		
	}else if(number=="2"){
		$("#doctor_notice_board_div").hide();
		$("#doctor_notice_board_progress_div").show();
		$("#doctor_notice_board_complete_div").hide();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","bold");
		$("#topmenu_complete").css("font-weight","inherit");
		
		DoctorBoardProgress('A');
		
	}else if(number=="3"){
		$("#doctor_notice_board_div").hide();
		$("#doctor_notice_board_progress_div").hide();
		$("#doctor_notice_board_complete_div").show();
		
		$("#topmenu_all").css("font-weight","inherit");
		$("#topmenu_Progress").css("font-weight","inherit");
		$("#topmenu_complete").css("font-weight","bold");
		
		DoctorBoardProgress('F');
	}
	
}

function CountReset()
{
	 BoardCount=0;
	 BoardMoreCount=0;
	 BoardMoreProgressCount=0;
}

function DoctorBoard()
{
	$('#doctor_notice_board').html("");
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
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
													$('#boradmoreDIV').show();
													$('#boradmoreBTN').attr('onclick', 'DoctorBoardMore(4)');
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
									
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
													$('#boradmoreDIV').show();
													$('#boradmoreBTN').attr('onclick', 'DoctorBoardMore('+BoardCount+')');
													return true;
												}
										})
							})
					}
				else//총 갯수가 4개 이하임
					{
						console.log('4개 미만 남았음')
						
						$('#boradmoreDIV').hide();
						var LastCount = TotalCount-getCount
						DoctorBoardDB.limitToFirst(LastCount).once('value', function(snap)
								{
									snap.forEach(function(snapshot)
											{
												var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
												var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
	if($("#Board_"+getId).hasClass("burncase_on")==false){
		$('#BoardCase'+getId).show();
		$("#Board_"+getId).addClass("burncase_on");
		$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_up.png");
	}else{
		$('#BoardCase'+getId).hide();
		$("#Board_"+getId).removeClass("burncase_on");
		$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_down.png");
	}

	console.log(getId);
	$('#BoardCase'+getId).html('');
	
	
	const BoardCaseDB = firebase.database().ref('Case/'+getId).orderByChild('visible').equalTo('true')
	
	BoardCaseDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
					   var SeqFulldate = getId.split("_")
	                     
	                     var SeqYearVal = SeqFulldate[0].substr(0,4);
	                     var SeqMonthVal = SeqFulldate[0].substr(4,2);
	                     var SeqDayVal = SeqFulldate[0].substr(6,2);
	                     var MathDate = SeqYearVal+"-"+SeqMonthVal+"-"+SeqDayVal;

	                     var Fulldate = snapshot.child('date').val();
	                     var YearVal =  Fulldate.substr(0,4);
	                     var MonthVal = Fulldate.substr(4,2);
	                     var DayVal = Fulldate.substr(6,2);   
	                     var CaseMathDate = YearVal+"-"+MonthVal+"-"+DayVal;
	               
	                     if(snapshot.child('status').val()=="Q"){
	                        var currentstate = "답변달기";
	                        var answerpage = "1";
	                     }else{
	                        var currentstate = "수정하기";
	                        var answerpage = "2";
	                     }
	                     var BoardCaseFrame =   "<div>"
	                                                   + "<div class='doctor_detail_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일 차</div>"
	                                                   + "<div class='doctor_detail_img1'><img src='"+snapshot.child('imgurl1').val()+"' width='100%'></div>"
	                                                   + "<div class='doctor_detail_img2'><img src='"+snapshot.child('imgurl2').val()+"' width='100%'></div>"
	                                                   + "<div class='doctor_detail_content'>"+snapshot.child('contents').val()+"</div>"
	                                                   + "<div class='doctor_detail_back' onclick='write_text(\""+snap.key+"\",\""+snapshot.key+"\",\""+answerpage+"\")'><div class='doctor_detail_answer'>"+currentstate+"</div><div class='doctor_detail_answer_img'><img id='img_"+snap.key+"_"+snapshot.key+"' src='../img/detail_down.png' width='100%'></div></div>"
	                                                   +"</div>"
	                                                   +"<div class='doctor_detail_answer_back' id=write_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=txt_"+snap.key+"_"+snapshot.key+"></textarea><button class='doctor_detail_button'  id=btn_"+snap.key+"_"+snapshot.key+" onclick=BoardInsert('"+snap.key+"','"+snapshot.key+"')>확인</button></div>"
	                                                   +"<div class='doctor_detail_answer_back' id=modify_"+snap.key+"_"+snapshot.key+" style='display:none'><div class='doctor_detail_answer_text'>어쩌구 저쩌구 답변입니당.</div><button class='doctor_detail_button'>수정</button></div>"
	                                                   
	                     
							document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
						})
			})
	
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


function DoctorBoardProgress(prostatus)
{
	if(prostatus=="A")//진행중인상태
	{
		
	}	
	else //마감된상태
	{
		
	}
	$('#doctor_notice_board_progress').html("");
	
	var doctoruid = DoctorInfo.uid;
	
	console.log("prostatus = "+prostatus);
	console.log("doctoruid = "+doctoruid);
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus_answerdoc').equalTo(prostatus+'_'+doctoruid)
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				console.log('TotalCount = '+TotalCount);
				if(TotalCount>4)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(4).once('value', function(snap)
							{
								snap.forEach(function(snapshot)
										{
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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

											document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==4)
												{
													$('#boradProgressMoreDIV').show();
													$('#boradProgressMoreBTN').attr('onclick', 'DoctorProgressBoardMore(4, "'+prostatus+'")');
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
									
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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

											document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);
										})
							})
					}
			})

}


function DoctorProgressBoardMore(getCount, prostatus)
{
	BoardMoreProgressCount++
	
	var uid = DoctorInfo.uid;
	var DivFrame = '<div id=BoardMoreProgress'+BoardMoreProgressCount+'></div>'
	document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('beforeEnd', DivFrame);	
	
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus_answerdoc').equalTo(prostatus+'_'+uid)
	
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
											var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
											var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
											document.getElementById('BoardMoreProgress'+BoardMoreProgressCount).insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==4)
												{
													$('#boradProgressMoreDIV').show();
													$('#boradProgressMoreBTN').attr('onclick', 'DoctorProgressBoardMore('+BoardCount+', "'+prostatus+'")');
													return true;
												}
										})
							})
					}
				else//총 갯수가 4개 이하임
					{
						console.log('4개 미만 남았음')
						
						$('#boradProgressMoreDIV').hide();
						var LastCount = TotalCount-getCount
						DoctorBoardDB.limitToFirst(LastCount).once('value', function(snap)
								{
									snap.forEach(function(snapshot)
											{
												var burnstyle = getburnstyle(snapshot.child('burnstyle').val());
												var burndetail = getburndetail(snapshot.child('burnstyle').val(),snapshot.child('burndetail').val());
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
												document.getElementById('BoardMoreProgress'+BoardMoreProgressCount).insertAdjacentHTML('afterBegin', insertTXT);	
												

											})
								})
						
					}
			})
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


function getburnstyle(burn){
	
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

function getburndetail(burn, burn2){
	
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


function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
 
    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
 
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
 
    return diff;
}

function write_text(key, key2, bool){
	if(bool=="1"){
		if($("#write_"+key+"_"+key2).hasClass("answer_on")==false){
			$("#write_"+key+"_"+key2).show(200);
			$("#write_"+key+"_"+key2).addClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_up.png");
		}else{
			$("#write_"+key+"_"+key2).hide(200);
			$("#write_"+key+"_"+key2).removeClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_down.png");
		}
		
	}else if(bool=="2"){
		
		if($("#modify_"+key+"_"+key2).hasClass("answer_on")==false){
			$("#modify_"+key+"_"+key2).show(200);
			$("#modify_"+key+"_"+key2).addClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_up.png");
		}else{
			$("#modify_"+key+"_"+key2).hide(200);
			$("#modify_"+key+"_"+key2).removeClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_down.png");
		}
	}
}

