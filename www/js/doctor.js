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
											BoardCount++;
											ForCount++;
											var insertTXT = '<div class="doctor_notice_contents" id="Board_'+snapshot.key+'" onclick=BoardCaseOpen("'+snapshot.key+'")>'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_img"><img src="../img/burnkind/junggi/junggi1.png" width="100%"></div></li>'
																			+'</ul>'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_burn">전기화상</div></li>'
																				+'<li><div class="doctor_notice_contents_title">'+snapshot.child('title').val()+'</div></li>'
																				+'<li><div class="doctor_notice_contents_content">'+BoardCount+'</div></li>'
																			+'</ul>'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_detail"><img src="../img/detail_down.png" width="100%"></div></li>'
																			+'</ul>'
																		+'</div>'
																		+'<div class="doctor_notice_date">'
																			+'<div class="doctor_notice_bool">답변대기중</div><div class="doctor_notice_detail">2018년 1월 11일</div>'
																		+'</div>'
																		+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																		+'</div>'
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
											BoardCount++;
											ForCount++;
											var insertTXT = '<div class="doctor_notice_contents">'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_img"><img src="../img/burnkind/junggi/junggi1.png" width="100%"></div></li>'
																			+'</ul>'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_burn">전기화상</div></li>'
																				+'<li><div class="doctor_notice_contents_title">'+snapshot.child('title').val()+'</div></li>'
																				+'<li><div class="doctor_notice_contents_content">'+BoardCount+'</div></li>'
																			+'</ul>'
																			+'<ul>'
																				+'<li><div class="doctor_notice_contents_detail"><img src="../img/detail_down.png" width="100%"></div></li>'
																			+'</ul>'
																		+'</div>'
																		+'<div class="doctor_notice_date">'
																			+'<div class="doctor_notice_bool">답변대기중</div><div class="doctor_notice_detail">2018년 1월 11일</div>'
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
												BoardCount++;
												ForCount++;
												var insertTXT = '<div class="doctor_notice_contents">'
																				+'<ul>'
																					+'<li><div class="doctor_notice_contents_img"><img src="../img/burnkind/junggi/junggi1.png" width="100%"></div></li>'
																				+'</ul>'
																				+'<ul>'
																					+'<li><div class="doctor_notice_contents_burn">전기화상</div></li>'
																					+'<li><div class="doctor_notice_contents_title">'+snapshot.child('title').val()+'</div></li>'
																					+'<li><div class="doctor_notice_contents_content">'+BoardCount+'</div></li>'
																				+'</ul>'
																				+'<ul>'
																					+'<li><div class="doctor_notice_contents_detail"><img src="../img/detail_down.png" width="100%"></div></li>'
																				+'</ul>'
																			+'</div>'
																			+'<div class="doctor_notice_date">'
																				+'<div class="doctor_notice_bool">답변대기중</div><div class="doctor_notice_detail">2018년 1월 11일</div>'
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
																	+'<textarea id=txt_'+snapshot.key+'></textarea>'
																	+'<button id=btn_'+snapshot.key+'>등록</button>'
																	+'================='+snapshot.key+'끝====================<br>'
							document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
						})
			})
	
}

function BoardCaseClose(getId)
{
	$('#Board_'+getId).attr('onclick', 'BoardCaseOpen("'+getId+'")');
	$('#BoardCase'+getId).hide();
}

