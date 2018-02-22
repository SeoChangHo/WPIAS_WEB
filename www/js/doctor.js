var BoardCount;
var BoardMoreCount;
var BoardMoreProgressCount;
var DoctorInfo;
var FirstView=false;
var isLoading=false;

$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "doctor_webpage") {
		
		if(!FirstView)
			{
			menuselect('1');
			FirstView=true;
			}
	}
		
});


$(document).on('pageshow', '#doctor_webpage', function (event, data) {

});

function menuselect(number){
	
	if(!isLoading)
		{
		isLoading=true;
			CountReset();
			if(number=="1"){
				$("#doctor_notice_board_div").show();
				$("#doctor_notice_board_progress_div").hide();
				$("#doctor_notice_board_complete_div").hide();
				
				if($("#topmenu_all").hasClass("topmenu_on")==false){
					$("#topmenu_all").addClass("topmenu_on");
					$("#topmenu_Progress").removeClass("topmenu_on");
					$("#topmenu_complete").removeClass("topmenu_on");
				}
				
				DoctorBoard();
				
			}else if(number=="2"){
				$("#doctor_notice_board_div").hide();
				$("#doctor_notice_board_progress_div").show();
				$("#doctor_notice_board_complete_div").hide();
				$("#boradProgressMoreDIV").hide();
				$("#doctor_notext_now").hide();
				
				if($("#topmenu_Progress").hasClass("topmenu_on")==false){
					$("#topmenu_all").removeClass("topmenu_on");
					$("#topmenu_Progress").addClass("topmenu_on");
					$("#topmenu_complete").removeClass("topmenu_on");
				}
				
				DoctorBoardProgress('R');
				
			}else if(number=="3"){
				$("#doctor_notice_board_div").hide();
				$("#doctor_notice_board_progress_div").show();
				$("#doctor_notice_board_complete_div").hide();
				$("#doctor_notext_now").hide();
				
				if($("#topmenu_complete").hasClass("topmenu_on")==false){
					$("#topmenu_all").removeClass("topmenu_on");
					$("#topmenu_Progress").removeClass("topmenu_on");
					$("#topmenu_complete").addClass("topmenu_on");
				}
				
				DoctorBoardProgress('A');
			}
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
				
				if(TotalCount>6)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(6).once('value', function(snap)
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
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
																		+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																		+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+' class="show_off" style="display:none">'
																		+'</div>';

											document.getElementById('doctor_notice_board').insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==6)
												{
													$('#boradmoreDIV').show();
													$('#boradmoreBTN').attr('onclick', 'DoctorBoardMore(6)');
												}
										})
							})
					}
				else//총 갯수가 6개 이하임
					{
					$('#boradmoreDIV').hide();
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
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
																	+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																	+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+' class="show_off" style="display:none">'
																	+'</div>';

											document.getElementById('doctor_notice_board').insertAdjacentHTML('afterBegin', insertTXT);
										})
							})
					}
				isLoading=false;
			})
			
}

function DoctorBoardMore(getCount)
{
	$('#boradmoreDIV').hide();
	BoardMoreCount++
	
	var DivFrame = '<div id=BoardMore'+BoardMoreCount+'></div>'
	document.getElementById('doctor_notice_board').insertAdjacentHTML('beforeEnd', DivFrame);	
	
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus').equalTo('Q')
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				
				if(TotalCount-getCount>6)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(6+getCount).once('value', function(snap)
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
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
																	+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																	+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+' class="show_off" style="display:none">'
																	+'</div>';
											document.getElementById('BoardMore'+BoardMoreCount).insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(ForCount==6)
												{
													$('#boradmoreDIV').show();
													$('#boradmoreBTN').attr('onclick', 'DoctorBoardMore('+BoardCount+')');
													return true;
												}
										})
							})
					}
				else//총 갯수가 6개 이하임
					{
						console.log('6개 미만 남았음')
						
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
												
												var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
												var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
												
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
																		+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																		+"		<div class='doctor_notice_detail_state'>답변대기중</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+' class="show_off" style="display:none">'
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
	if($("#Board_"+getId).hasClass("burncase_on")==false){
		$("#Board_"+getId).addClass("burncase_on");		
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
		                        var answerstate = "답변대기";
		                        var answerpage = "1";
		                     }else if(snapshot.child('status').val()=="P"){
		                        var currentstate = "답변미요청";
		                        var answerstate = "답변미요청";
		                        var answerpage = "2";
		                     }else{
		                    	 var currentstate = "답변확인";
			                     var answerstate = "답변완료";
			                     var answerpage = "3";
		                     }
		                     
		                     var BoardCaseFrame = "<div class='doctor_detail_background'>"
				                           				+"	<div class='doctor_detail_bar'></div>"
				                           				+"		<div class='doctor_detail_back1'>"
				                           				+"			<div>"+YearVal+"년 "+MonthVal+"월 "+DayVal+"일</div>"
				                           				+"		</div>"
				                           				+"		<div  id=back2_"+snap.key+"_"+snapshot.key+" class='doctor_detail_back2'>"
				                           				+"			 <div>"
				                           				+"			 	<div class='doctor_detail_date_state'>"
				                           		        +"                   <div class='doctor_detail_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일차</div>"
				                           		        +"                   <div class='doctor_notice_detail_state1'>"+answerstate+"</div>"
				                           	            +"            </div>"
				                           	            +"            <div class='doctor_detail_img1' onclick='image1_click(\""+snapshot.child('imgurl1').val()+"\")'><img src='"+snapshot.child('imgurl1').val()+"' width='100%'></div>"
				                           	            +"            <div class='doctor_detail_img2' onclick='image2_click(\""+snapshot.child('imgurl2').val()+"\")'><img src='"+snapshot.child('imgurl2').val()+"' width='100%'></div>"
				                           	            +"            <div class='doctor_detail_content'>"+snapshot.child('contents').val()+"</div>"
				                           	            +"         <div class='doctor_detail_back' onclick='write_text(\""+snap.key+"\",\""+snapshot.key+"\",\""+answerpage+"\")'><div class='doctor_detail_answer'>"+currentstate+"</div><div class='doctor_detail_answer_img'><img id='img_"+snap.key+"_"+snapshot.key+"' src='../img/detail_down.png' width='100%'></div></div>"
				                           	            +"         </div>"
				                           	            +"         <div class='doctor_detail_answer_back' id=write_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+"></textarea><button class='doctor_detail_button' id=btn_"+snap.key+"_"+snapshot.key+" onclick=BoardInsert('"+snap.key+"','"+snapshot.key+"')>확인</button></div>"
				                           	            +"         <div class='doctor_detail_answer_back' id=modify_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+" class='doctor_detail_answer_text'></textarea></div>"
				                           	            +"			<div class='doctor_detail_answer_back' id=norequest_"+snap.key+"_"+snapshot.key+" style='display:none'>사용자가 답변을 요청하지 않은 경과입니다.</div>"
				                                        +"    </div>"
				                           				+"</div>"
		                     
								document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
			                 	
							})
					
					$('#BoardCase'+getId).show(400);				
					$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_up.png");
				})
	
	}else{
		$("#Board_"+getId).removeClass("burncase_on");
		$('#BoardCase'+getId).hide(400);
		$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_down.png");
		setTimeout(function(){
			$('#BoardCase'+getId).html('');
		}, 400);
	}
	
}


function BoardProgressCaseOpen(getId, prostatus)
{	
	
	if(prostatus=='R')//진행중인 질문일 때
		{
				if($("#Board_"+getId).hasClass("burncase_on")==false){
					$("#Board_"+getId).addClass("burncase_on");
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
					               
					                     	if(snapshot.child('status').val()=="R"){
						                        var currentstate = "답변달기";
						                        var answerstate = "답변대기";
						                        var answerpage = "1";
						                     }else if(snapshot.child('status').val()=="P"){
						                        var currentstate = "답변미요청";
						                        var answerstate = "답변미요청";
						                        var answerpage = "2";
						                     }else{
						                    	 var currentstate = "답변확인";
							                     var answerstate = "답변완료";
							                     var answerpage = "3";
						                     }
					                     	
					                     var BoardCaseFrame ="<div class='doctor_detail_background'>"
								                           				+"	<div class='doctor_detail_bar'></div>"
								                           				+"		<div class='doctor_detail_back1'>"
								                           				+"			<div>"+YearVal+"년 "+MonthVal+"월 "+DayVal+"일</div>"
								                           				+"		</div>"
								                           				+"		<div  id=back2_"+snap.key+"_"+snapshot.key+" class='doctor_detail_back2'>"
								                           				+"			 <div>"
								                           				+"			 	<div class='doctor_detail_date_state'>"
								                           		        +"                   <div class='doctor_detail_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일차</div>"
								                           		        +"                   <div class='doctor_notice_detail_state1'>"+answerstate+"</div>"
								                           	            +"            </div>"
								                           	            +"            <div class='doctor_detail_img1' onclick='image1_click(\""+snapshot.child('imgurl1').val()+"\")'><img src='"+snapshot.child('imgurl1').val()+"' width='100%'></div>"
								                           	            +"            <div class='doctor_detail_img2' onclick='image2_click(\""+snapshot.child('imgurl2').val()+"\")'><img src='"+snapshot.child('imgurl2').val()+"' width='100%'></div>"
								                           	            +"            <div class='doctor_detail_content'>"+snapshot.child('contents').val()+"</div>"
								                           	            +"         <div class='doctor_detail_back' onclick='write_text(\""+snap.key+"\",\""+snapshot.key+"\",\""+answerpage+"\")'><div class='doctor_detail_answer'>"+currentstate+"</div><div class='doctor_detail_answer_img'><img id='img_"+snap.key+"_"+snapshot.key+"' src='../img/detail_down.png' width='100%'></div></div>"
								                           	            +"         </div>"
								                           	            +"         <div class='doctor_detail_answer_back' id=write_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+"></textarea><button class='doctor_detail_button' id=btn_"+snap.key+"_"+snapshot.key+" onclick=BoardProgressInsert('"+snap.key+"','"+snapshot.key+"')>확인</button></div>"
								                           	            +"         <div class='doctor_detail_answer_back' id=modify_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+" class='doctor_detail_answer_text'></textarea></div>"
								                           	            +"			<div class='doctor_detail_answer_back' id=norequest_"+snap.key+"_"+snapshot.key+" style='display:none'>사용자가 답변을 요청하지 않은 경과입니다.</div>"
								                                        +"    </div>"
								                           				+"</div>"
					                     
											document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
										})
								
								$('#BoardCase'+getId).show(400);		
								$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_up.png");
								
							})
					
				}else{
					$("#Board_"+getId).removeClass("burncase_on");
					$('#BoardCase'+getId).hide(400);
					$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_down.png");
					setTimeout(function(){
						$('#BoardCase'+getId).html('');
					}, 400);
				}

		}
	else //마감된 질문일 때
		{
			if($("#Board_"+getId).hasClass("burncase_on")==false){
				$("#Board_"+getId).addClass("burncase_on");
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
					                        var answerstate = "답변대기";
					                        var answerpage = "1";
					                     }else if(snapshot.child('status').val()=="P"){
					                        var currentstate = "답변미요청";
					                        var answerstate = "답변미요청";
					                        var answerpage = "2";
					                     }else{
					                    	 var currentstate = "답변확인";
						                     var answerstate = "답변완료";
						                     var answerpage = "3";
					                     }
				                     var BoardCaseFrame ="<div class='doctor_detail_background'>"
							                           				+"	<div class='doctor_detail_bar'></div>"
							                           				+"		<div class='doctor_detail_back1'>"
							                           				+"			<div>"+YearVal+"년 "+MonthVal+"월 "+DayVal+"일</div>"
							                           				+"		</div>"
							                           				+"		<div  id=back2_"+snap.key+"_"+snapshot.key+" class='doctor_detail_back2'>"
							                           				+"			 <div>"
							                           				+"			 	<div class='doctor_detail_date_state'>"
							                           		        +"                   <div class='doctor_detail_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일차</div>"
							                           		        +"                   <div class='doctor_notice_detail_state1'>"+answerstate+"</div>"
							                           	            +"            </div>"
							                           	            +"            <div class='doctor_detail_img1' onclick='image1_click(\""+snapshot.child('imgurl1').val()+"\")'><img src='"+snapshot.child('imgurl1').val()+"' width='100%'></div>"
							                           	            +"            <div class='doctor_detail_img2' onclick='image2_click(\""+snapshot.child('imgurl2').val()+"\")'><img src='"+snapshot.child('imgurl2').val()+"' width='100%'></div>"
							                           	            +"            <div class='doctor_detail_content'>"+snapshot.child('contents').val()+"</div>"
							                           	            +"         <div class='doctor_detail_back' onclick='write_text(\""+snap.key+"\",\""+snapshot.key+"\",\""+answerpage+"\")'><div class='doctor_detail_answer'>"+currentstate+"</div><div class='doctor_detail_answer_img'><img id='img_"+snap.key+"_"+snapshot.key+"' src='../img/detail_down.png' width='100%'></div></div>"
							                           	            +"         </div>"
							                           	            +"         <div class='doctor_detail_answer_back' id=write_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+"></textarea><button class='doctor_detail_button' id=btn_"+snap.key+"_"+snapshot.key+" onclick=BoardProgressInsert('"+snap.key+"','"+snapshot.key+"')>확인</button></div>"
							                           	            +"         <div class='doctor_detail_answer_back' id=modify_"+snap.key+"_"+snapshot.key+" style='display:none'><textarea id=AnswerArea_"+snap.key+"_"+snapshot.key+" class='doctor_detail_answer_text'></textarea></div>"
							                           	            +"			<div class='doctor_detail_answer_back' id=norequest_"+snap.key+"_"+snapshot.key+" style='display:none'>사용자가 답변을 요청하지 않은 경과입니다.</div>"
							                                        +"    </div>"
							                           				+"</div>"
							                           				
										document.getElementById('BoardCase'+getId).insertAdjacentHTML('afterBegin', BoardCaseFrame);	
									})
							
							$('#BoardCase'+getId).show(400);
							$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_up.png");
							
						})
				
			}else{
				$('#BoardCase'+getId).hide(400);
				$("#Board_"+getId).removeClass("burncase_on");
				$("#Board_"+getId+" div.doctor_notice_contents_detail img").attr("src", "../img/detail_down.png");
				setTimeout(function(){
					$('#BoardCase'+getId).html('');
				}, 400);
			}

		}
	
	
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
				contents:$("#AnswerArea_"+key+'_'+casenum).val().replace(/\n/g, '<br>'),
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


function BoardProgressInsert(key, casenum)
{
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
								
							})
			}
		else
		{
			AnswerInsertDB.set({
				date:Fulldate,
				uid:uid,
				contents:$("#AnswerArea_"+key+'_'+casenum).val().replace(/\n/g, '<br>'),
			}).then(function()
					{
							var CaseStatusDB = firebase.database().ref().child('Case/'+key+"/"+casenum);
							var StatusDB = firebase.database().ref().child('Question/'+key);
							CaseStatusDB.update
							({
									status:"A"
							})
							StatusDB.update({
								prostatus:"A",
								prostatus_answerdoc:"A_"+uid
							}).then(function()
									{
										swal({
							       			  title: '성공!',
							       			  text: '답변이 등록되었습니다.',
							       			  type: 'success',
							       			  confirmButtonText: '확인'
							       			})
							       		$('#back2_'+key+'_'+casenum).find('.doctor_notice_detail_state1').html('답변완료');
										$('#back2_'+key+'_'+casenum).find('.doctor_detail_answer').html('답변보기');
										$('#back2_'+key+'_'+casenum).find('.doctor_detail_button').css({"display":"none"});
										getCountStatus(key, 'A')
										
										$('#Board_'+Seq).remove();
       									$('#BoardCase'+Seq).remove();
									})
					})
			

		}
		});	
}



function DoctorBoardProgress(prostatus)
{

	var Status="";
	$('#doctor_notice_board_progress').html("");
	
	var doctoruid = DoctorInfo.uid;
	
	console.log("prostatus = "+prostatus);
	console.log("doctoruid = "+doctoruid);
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus_answerdoc').equalTo(prostatus+'_'+doctoruid)
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				console.log('TotalCount = '+TotalCount);
				if(TotalCount>6)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(6).once('value', function(snap)
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
											BoardCount++;
											ForCount++;
											var insertTXT = 	"<div id='Board_"+snapshot.key+"' onclick='BoardProgressCaseOpen(\""+snapshot.key+"\",\""+prostatus+"\")'>"
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
																		+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																		+"		<div class='doctor_notice_detail_state'>"+Status+"</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																		+'</div>';

											document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(prostatus=='A'||prostatus=='R')
											{
												getCountStatus(snapshot.key, prostatus)
											}
											if(ForCount==6)
												{

													$('#boradProgressMoreDIV').show();
													$('#boradProgressMoreBTN').attr('onclick', 'DoctorProgressBoardMore(6, "'+prostatus+'")');
												}
										})
							})
					}
				else//총 갯수가 6개 이하임
					{
					if(TotalCount>0){
					$('#boradProgressMoreDIV').hide();
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
											BoardCount++;
											var insertTXT = "<div id='Board_"+snapshot.key+"' onclick='BoardProgressCaseOpen(\""+snapshot.key+"\",\""+prostatus+"\")'>"
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
																	+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																	+"		<div class='doctor_notice_detail_state'>"+Status+"</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																	+'</div>';

											document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);
											
											if(prostatus=='A'||prostatus=='R')
											{
												getCountStatus(snapshot.key, prostatus)
											}
										})
							})
						}else{
							if(prostatus=="R"){
								var insertTXT = "<div id='doctor_notext_now'>현재 진행중인 질문이 없습니다.</div>";
								document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);
							}else{
								var insertTXT = "<div id='doctor_notext_now'>현재 완료된 질문이 없습니다.</div>";
								document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('afterBegin', insertTXT);
							}
							
						}
					}
				isLoading=false;
			})
}


function DoctorProgressBoardMore(getCount, prostatus)
{
	BoardMoreProgressCount++
	$('#boradProgressMoreDIV').hide();
	var Status="";
	
	var uid = DoctorInfo.uid;
	var DivFrame = '<div id=BoardMoreProgress'+BoardMoreProgressCount+'></div>'
	document.getElementById('doctor_notice_board_progress').insertAdjacentHTML('beforeEnd', DivFrame);	
	
	const DoctorBoardDB = firebase.database().ref('Question').orderByChild('prostatus_answerdoc').equalTo(prostatus+'_'+uid)
	
	DoctorBoardDB.once('value', function(totalsnap)
			{
				var TotalCount = totalsnap.numChildren();
				
				if(TotalCount-getCount>6)//이거 부르고 부를게 더 있을 때
					{
					var ForCount=0;
					DoctorBoardDB.limitToLast(6+getCount).once('value', function(snap)
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
											
											var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
											var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
											
											BoardCount++;
											ForCount++;
											var insertTXT = "<div id='Board_"+snapshot.key+"' onclick='BoardProgressCaseOpen(\""+snapshot.key+"\",\""+prostatus+"\")'>"
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
																	+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																	+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																	+"		<div class='doctor_notice_detail_state'>"+Status+"</div>"
																	+"	</div>"
																	+"</div>"
																	+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																	+'</div>';
											document.getElementById('BoardMoreProgress'+BoardMoreProgressCount).insertAdjacentHTML('afterBegin', insertTXT);	
											
											if(prostatus=='A'||prostatus=='R')
												{
													getCountStatus(snapshot.key, prostatus)
												}

											if(ForCount==6)
												{
													$('#boradProgressMoreDIV').show();
													$('#boradProgressMoreBTN').attr('onclick', 'DoctorProgressBoardMore('+BoardCount+', "'+prostatus+'")');
													return true;
												}
										})
							})
					}
				else//총 갯수가 6개 이하임
					{
						console.log('6개 미만 남았음')
						
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
												
												var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
												var bodyarea = getbodyarea(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
												
												BoardCount++;
												ForCount++;
												var insertTXT = "<div id='Board_"+snapshot.key+"' onclick='BoardProgressCaseOpen(\""+snapshot.key+"\",\""+prostatus+"\")'>"
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
																		+"		<div class='doctor_notice_detail_img'>"+bodyimg+"</div>"
																		+"		<div class='doctor_notice_detail_text'>"+bodyarea+"</div>"
																		+"		<div class='doctor_notice_detail_state'>"+Status+"</div>"
																		+"	</div>"
																		+"</div>"
																		+'<div id=BoardCase'+snapshot.key+'  style="display:none">'
																		+'</div>';
												document.getElementById('BoardMoreProgress'+BoardMoreProgressCount).insertAdjacentHTML('afterBegin', insertTXT);	

												if(prostatus=='A'||prostatus=='R')
												{
													getCountStatus(snapshot.key, prostatus)
												}
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
       									
       									$('#Board_'+Seq).remove();
       									$('#BoardCase'+Seq).remove();
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
	if(bool=="1"){ //답변달기
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
		
		if($("#norequest_"+key+"_"+key2).hasClass("answer_on")==false){
			$("#norequest_"+key+"_"+key2).show(200);
			$("#norequest_"+key+"_"+key2).addClass("answer_on");
			$("#norequest_"+key+"_"+key2).attr("src","../img/detail_up.png");
		}else{
			$("#norequest_"+key+"_"+key2).hide(200);
			$("#norequest_"+key+"_"+key2).removeClass("answer_on");
			$("#norequest_"+key+"_"+key2).attr("src","../img/detail_down.png");
		}
		
		
	}else if(bool=="3"){ //수정하기
		
		if($("#modify_"+key+"_"+key2).hasClass("answer_on")==false){
			$("#modify_"+key+"_"+key2).show(200);
			$("#modify_"+key+"_"+key2).addClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_up.png");
			GetAnswerTxt(key, key2);
		}else{
			$("#modify_"+key+"_"+key2).hide(200);
			$("#modify_"+key+"_"+key2).removeClass("answer_on");
			$("#img_"+key+"_"+key2).attr("src","../img/detail_down.png");
		}
	}
}

function GetFinishAnswerTxt(seq, casenum)
{
	var AnswerTxtDB = firebase.database().ref('Answer/'+seq+"/"+casenum);
	
	console.log(AnswerTxtDB);
	AnswerTxtDB.once('value', function(snap)
			{
				console.log(snap.child('contents').val());
				$('#FinishArea_'+seq+"_"+casenum+'.doctor_detail_answer_text').html(snap.child('contents').val())
			})
}


function GetAnswerTxt(seq, casenum)
{
	var AnswerTxtDB = firebase.database().ref('Answer/'+seq+"/"+casenum);
	
	console.log(AnswerTxtDB);
	AnswerTxtDB.once('value', function(snap)
			{
				console.log(snap.child('contents').val());
				$('Textarea#AnswerArea_'+seq+"_"+casenum+'.doctor_detail_answer_text').val(snap.child('contents').val().replace(/<br *\/?>/gi, '\n').replace(/&nbsp;/g, ' '))
			})
	$('#btn_modify_'+seq+'_'+casenum).attr('onclick', 'Modify("'+seq+'", "'+casenum+'")')
}

function Modify(seq, casenum)
{
	var Contents = firebase.database().ref().child('Answer/'+seq+"/"+casenum)
	
	console.log('텍스트: '+ $('Textarea#AnswerArea_'+seq+'_'+casenum+'.doctor_detail_answer_text').val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'))
	Contents.update(
			{
				contents : $('Textarea#AnswerArea_'+seq+'_'+casenum+'.doctor_detail_answer_text').val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
			}).then(function() {
				  swal
				  ({
					  title:'성공',
					  text:'답변 수정이 완료되었습니다!',
					  type:'success',
					  allowOutsideClick: false
				  })
			})
	
	
//	swal({
//		  title: '답변 수정',
//		  text:'답변을 작성하신 후 수정버튼을 눌러주세요.',
//		  input: 'textarea',
//		  confirmButtonText :'수정',
//		  cancelButtonText: '취소',
//		  inputValue: $("#AnswerArea_"+seq+"_"+casenum).html().replace(/<br *\/?>/gi, '\n').replace(/&nbsp;/g, ' '),
//		  inputPlaceholder: 'Type your answer here',
//		  allowOutsideClick: false,
//		  showCancelButton: true,
//		  inputValidator: function (value) {
//		    return new Promise(function (resolve, reject) {
//		      if (value) {	    	  
//
//		        	resolve()
//		        	
//		      } else {//아무것도 적지 않았을 때
//		        reject('You need to write something!')
//		      }
//		    })
//		  }
//		}).then(function (answer) {
//			
//			
//			var Contents = firebase.database().ref().child('Answer/'+seq+"/"+casenum)
//			
//			Contents.update(
//					{
//						contents :answer.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
//					}).then(function() {
//			
//				  swal
//				  ({
//					  title:'성공',
//					  text:'답변 수정이 완료되었습니다!',
//					  type:'success',
//					  allowOutsideClick: false
//				  }).then(function()
//						  {
//					  			$("#AnswerArea_"+seq+"_"+casenum).html(answer.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'));
//						  })
//				}).catch(function(error) {
//					console.log(error)  
//					swal
//					  ({
//						  title:'실패',
//						  text:'답변 수정이 실패했습니다!',
//						  type:'error'
//					  })
//				});
//			
//		}, function (dismiss) {
//			  if (dismiss === 'cancel') {
//				 console.log('cancel click');
//			  }
//			})

}
function myAnswerGetDoctorProfile()
{
	
	FirebaseCall();
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const answerdb = dbRef.child('Question');
	
	$("#doctor_name").html(doctorName);
	
	answerdb.once('value', function(snap){
		
		var TotalQuestion = snap.numChildren();
		
		answerdb.orderByChild('answerdoc').equalTo(uid).once('value', function(snapshot)
				{		
					var TotalMyAnswer = snapshot.numChildren();
				 	$("#doctor_img img").attr("src","../img/profile/doctor_male.png");
					$("#doctor_question_all div.doctor_question_number_class").html(TotalQuestion);
					$("#doctor_question_me div.doctor_question_number_class").html(TotalMyAnswer);
				})
	})
}


function getCountStatus(key, prostatus)
{
	var completeCount=0;
	var TotalCount=0;
	
	if(prostatus=='A'||prostatus=='R')
		{
			var CaseCompleteDB  = firebase.database().ref('Case/'+key).orderByChild('visible').equalTo('true');
			CaseCompleteDB.once('value', function(snap)
					{			
							snap.forEach(function(snapshot)
							{
								TotalCount++;
								if(snapshot.child('status').val()=="A"||snapshot.child('status').val()=="P")
									{
									completeCount++;
									}
							})					
					}).then(function()
					{
							$('#Board_'+key).find('.doctor_notice_detail_state').html('('+completeCount+"/"+TotalCount+')')
						
					})
		}
	
}


function getbodyarea(bodystyle, bodydetail){
	
	if(bodystyle=="1"){
		switch(bodydetail){
		case "1" : return "이마"; break;
		case "2" : return "눈"; break;
		case "3" : return "코"; break;
		case "4" : return "입"; break;
		case "5" : return "귀"; break;
		case "6" : return "볼"; break;
		case "7" : return "목"; break;
		case "8" : return "뒤통수"; break;
		case "9" : return "목덜미"; break;
		case "10" : return "기타"; break;
		}
	}else if(bodystyle=="2"){
		switch(bodydetail){
		case "1" : return "좌측 어깨"; break;
		case "2" : return "우측 어깨"; break;
		case "3" : return "양쪽 어깨"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="3"){
		switch(bodydetail){
		case "1" : return "좌측 가슴"; break;
		case "2" : return "우측 가슴"; break;
		case "3" : return "가슴 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="4"){
		switch(bodydetail){
		case "1" : return "좌측 등"; break;
		case "2" : return "우측 등"; break;
		case "3" : return "등 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="5"){
		switch(bodydetail){
		case "1" : return "좌측 배"; break;
		case "2" : return "우측 배"; break;
		case "3" : return "배 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="6"){
		switch(bodydetail){
		case "1" : return "좌측 허리"; break;
		case "2" : return "우측 허리"; break;
		case "3" : return "허리 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="7"){
		switch(bodydetail){
		case "1" : return "좌측 팔뚝"; break;
		case "2" : return "우측 팔뚝"; break;
		case "3" : return "팔뚝 전체"; break;
		case "4" : return "좌측 하박"; break;
		case "5" : return "우측 하박"; break;
		case "6" : return "하박 전체"; break;
		case "7" : return "기타"; break;
		}
	}else if(bodystyle=="8"){
		switch(bodydetail){
		case "1" : return "좌측 손바닥"; break;
		case "2" : return "우측 손바닥"; break;
		case "3" : return "양쪽 손바닥"; break;
		case "4" : return "좌측 손등"; break;
		case "5" : return "우측 손등"; break;
		case "6" : return "양쪽 손등"; break;
		case "7" : return "좌측 손가락"; break;
		case "8" : return "우측 손가락"; break;
		case "9" : return "양쪽 손가락"; break;
		case "10" : return "기타"; break;
		}
	}else if(bodystyle=="9"){
		switch(bodydetail){
		case "1" : return "음부"; break;
		case "2" : return "기타"; break;
		}
	}else if(bodystyle=="10"){
		switch(bodydetail){
		case "1" : return "좌측 엉덩이"; break;
		case "2" : return "우측 엉덩이"; break;
		case "3" : return "엉덩이 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="11"){
		switch(bodydetail){
		case "1" : return "좌측 허벅지"; break;
		case "2" : return "우측 허벅지"; break;
		case "3" : return "양쪽 허벅지"; break;
		case "4" : return "좌측 종아리"; break;
		case "5" : return "우측 종아리"; break;
		case "6" : return "양쪽 종아리"; break;
		case "7" : return "기타"; break;
		}
	}else if(bodystyle=="12"){
		switch(bodydetail){
		case "1" : return "좌측 발등"; break;
		case "2" : return "우측 발등"; break;
		case "3" : return "양쪽 발등"; break;
		case "4" : return "좌측 발가락"; break;
		case "5" : return "우측 발가락"; break;
		case "6" : return "양쪽 발가락"; break;
		case "7" : return "좌측 발바닥"; break;
		case "8" : return "우측 발바닥"; break;
		case "9" : return "양쪽 발바닥"; break;
		case "10" : return "좌측 뒤끔치"; break;
		case "11" : return "우측 뒤끔치"; break;
		case "12" : return "양쪽 뒤끔치"; break;
		case "13" : return "기타"; break;
		}
	}else if(bodystyle=="13"){
		switch(bodydetail){
		case "1" : return "호흡기"; break;
		case "2" : return "기타"; break;
		}
	}
	
}

function Logout()
{
	firebase.auth().signOut();
}

function gomain(){
	window.location.href="https://wpias-94d18.firebaseapp.com";
}

function image1_click(imageurl){
		swal({
			  title: '',
			  text: '',
			  imageUrl: imageurl,
			  confirmButtonText: '확인'
			})
}

function image2_click(imageurl){
	swal({
		  title: '',
		  text: '',
		  imageUrl: imageurl,
		  confirmButtonText: '확인'
		})
}
