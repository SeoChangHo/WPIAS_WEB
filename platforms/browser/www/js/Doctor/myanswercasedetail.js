$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "myanswercasedetailpage") {
    	$("#header_Casedetail").css("height", (window.innerHeight*0.074).toFixed(0));
    		var casenum = data.options.casenum;
    		var num = data.options.num;
        LoadMYAnswerCaseDetail(num , casenum)
    		myAnswerCaseDetailGetDoctorProfile();
    }
});

$(document).on('pageshow', '#myanswercasedetailpage', function(event, data){
	
	$('#case_image1').imgViewer();
	
});

function myAnswerCaseDetailGetDoctorProfile()
{
	FirebaseCall();
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const answerdb = dbRef.child('Question').orderByChild('answerdoc').equalTo(uid);
	
	$("#myanswercase_doctor_name").html("Dr."+doctorName);
	answerdb.once('value', function(snap){
		
		var AnswerCount = snap.numChildren();
	 	$("#myanswer_doctor_img img").attr("src","../img/profile/doctor_male.png");
		$("#myanswercase_doctor_etc").html("화상외과 | 답변수 : " + AnswerCount);
	})
}

function btnInsertAnswer()
{
	FirebaseCall();

	
	var Seq = $('#index_Anum').html();
	var CaseNum =ALLARR[ARR][4];
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
				contents:$("#CaseAnswerTxt").val().replace(/\n/g, '<br>'),
			}).then(function()
					{
						QuestionStatusUpdate(Seq, Fulldate, uid, doctorName)
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
		console.log();

			});
	

	
}


function QuestionStatusUpdate(Seq, Fulldate, uid, doctorName)
{
	var QuestionStatusDB = firebase.database().ref().child('Question/'+Seq);
	var CaseStatusDB = firebase.database().ref().child('Case/'+Seq+"/"+ALLARR[ARR][4])
	
	
	CaseStatusDB.update
	({
			status:"A"
	})
	QuestionStatusDB.update(
			{
				prostatus:"A",
				answerdoc: uid
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
       									$.mobile.pageContainer.pagecontainer( "change", "answer.html", { transition:"slideup", reverse:true } )
       								})
       					
	})
}


function LoadMYAnswerCaseDetail(num, casenum)
{
	
	var CommonDB = firebase.database().ref('Question/'+num);
	const answerdb = firebase.database().ref('Answer');
	
	var caseDB = firebase.database().ref('Case/'+num+'/'+casenum);
	var user = firebase.auth().currentUser;
	var doctoruid = user.uid;
	var doctorName = user.displayName
	var count = 0;
	
	caseDB.once('value', function(snap)
			{
		
		var SeqFulldate = num.split("_")
		
		var SeqYearVal = SeqFulldate[0].substr(0,4);
		var SeqMonthVal = SeqFulldate[0].substr(4,2);
		var SeqDayVal = SeqFulldate[0].substr(6,2);									
		var MathDate = SeqYearVal+"-"+SeqMonthVal+"-"+SeqDayVal;
		var Fulldate = snap.child('date').val();									
		var YearVal =  Fulldate.substr(0,4);
		var MonthVal = Fulldate.substr(4,2);
		var DayVal = Fulldate.substr(6,2);	
		var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";							
		var CaseMathDate = YearVal+"-"+MonthVal+"-"+DayVal;		
		
		
						$("#case_image1").attr("src", snap.child('imgurl1').val());
						$("#case_image2").attr("src", snap.child('imgurl2').val());
						$("#case_picimage1").html("<img src="+snap.child('imgurl1').val()+" width='100%'>");
						$("#case_picimage2").html("<img src="+snap.child('imgurl2').val()+" width='100%'>");
						
					 		 document.getElementById('myanswerCaseDetailContents').innerHTML+=
					 	 		"	<div id='myanswercase_question'>"+snap.child('contents').val()+"</div>";
					 		 
					 		 
								CommonDB.once('value', function(commonsnap)
										{
							 			if(commonsnap.child('prostatus').val()!="F")//마감된 질문이 아니라면
							 				{
							 					$("#deadline").hide();
								 				if( snap.child('status').val()=="Q")//답변이 안달린 상태
								 				{
								 					$('#AnswerInsertBox').show();
								 					
								 					$('#Caseanswerdetail_btn').attr("onclick", "btnInsertMyAnswer('"+num+"','"+casenum+"','"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"')")
								 				}
								 				else//답변이 달린 상태
								 				{
								 					$('#AnswerCommentBox').show();
								 					getComment(num, casenum)
								 					$('#AnswerDetail_modify').attr('onclick', "BtnAnswerDetail_modify('"+num+"','"+casenum+"')")
								 				}
							 				}
							 			else // 마감된 질문이라면
							 				{
							 					$("#deadline").show();
							 					if(snap.child('status').val()=="A")//답변이 달린 상태
							 					{
							 						$('#AnswerCommentBox').show();
							 						getComment(num, casenum)
							 						$('#AnswerDetail_modify').hide();
							 					}else{//답변이 안달린 상태
							 						$("#myanswercase_doctor_back").hide();
							 						$('#AnswerDetail_modify').hide();
							 					}
							 				}
										})
			})
			

}

function getComment(Seq, CaseNum)
{
	var CommentDB = firebase.database().ref('Answer/'+Seq+"/"+CaseNum);
	
	CommentDB.once('value', function(snap)
			{			
				$('#myanswercase_doctor_ment').html(snap.child('contents').val())
			})
}


//답변등록버튼
function btnInsertMyAnswer(Seq, CaseNum, Day)
{
	FirebaseCall();


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
	
	
	
	var CaseInsertDB = firebase.database().ref().child("Case/"+Seq+"/"+CaseNum);
	var AnswerInsertDB = firebase.database().ref().child("Answer/"+Seq+"/"+CaseNum);
	var ConfirmStatus = firebase.database().ref().child("Question/"+Seq);

	CaseInsertDB.once('value' , function(snapshot)
			{
		if(snapshot.child('visible').val()=="false")
			{
			swal({
					  title:'실패',
					  text:'해당 질문이 삭제되었습니다!',
					  type:'error',
					  allowOutsideClick: false
			}).then(function()
							{
								btnTopBackToMYAnswerDetail();
							})
			}
		else
		{

			AnswerInsertDB.set({
				date:Fulldate,
				uid:uid,
				contents:$("#CaseAnswerTxt").val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
			}).then(function()
					{
						var CaseStatusDB = firebase.database().ref().child('Case/'+Seq+"/"+CaseNum)
						CaseStatusDB.update
						({
							status:"A"
						}).then(function()
								{

							$("#AnswerInsertBox").hide();
							$('#AnswerCommentBox').show();
							$('#myanswercase_doctor_ment').html($("#CaseAnswerTxt").val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'));
				 			
				 			$('#AnswerDetail_modify').attr('onclick', "BtnAnswerDetail_modify('"+Seq+"','"+CaseNum+"')")
							swal({
			       			  title: '성공!',
			       			  text: Day+'일차 질문에 답변이 등록되었습니다.',
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
			       											var Msg = "회원님의 "+Day+"일차 질문에 "+doctorName+" 님이 답변을 등록하였습니다.";
			       											SendMessageToTarget(Token, Msg);
			       										}
			       									
			       								})
								})
					})
		}
			});
}



//답변수정버튼 클릭 
function BtnAnswerDetail_modify(Seq, Casenum)
{
	
	swal({
		  title: '답변 수정',
		  text:'답변을 작성하신 후 수정버튼을 눌러주세요.',
		  input: 'textarea',
		  confirmButtonText :'수정',
		  cancelButtonText: '취소',
		  inputValue: $("#myanswercase_doctor_ment").html().replace(/<br *\/?>/gi, '\n').replace(/&nbsp;/g, ' '),
		  inputPlaceholder: 'Type your answer here',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
		      if (value) {	    	  

		        	resolve()
		        	
		      } else {//아무것도 적지 않았을 때
		        reject('You need to write something!')
		      }
		    })
		  }
		}).then(function (answer) {
			
			
			var Contents = firebase.database().ref().child('Answer/'+ $('#index_Anum').html()+"/"+Casenum)
			
			Contents.update(
					{
						contents :answer.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
					}).then(function() {
			
				  swal
				  ({
					  title:'성공',
					  text:'답변 수정이 완료되었습니다!',
					  type:'success',
					  allowOutsideClick: false
				  }).then(function()
						  {
					  			$("#myanswercase_doctor_ment").html(answer.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'));
						  })
				}).catch(function(error) {
					console.log(error)  
					swal
					  ({
						  title:'실패',
						  text:'답변 수정이 실패했습니다!',
						  type:'error'
					  })
				});
			
		}, function (dismiss) {
			  if (dismiss === 'cancel') {
				 console.log('cancel click');
			  }
			})

}

function btnTopBackToMYAnswerDetail()
{
	$.mobile.pageContainer.pagecontainer( "change", "myanswerdetail.html", { transition:"slide", reverse: true, num:$("#index_Anum").html()} )
}


function case_bigpicture(){
	$("#myanswercase_imgstyle2").hide();
	$("#myanswercase_imgstyle").show();
	$('#case_image1').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"inherit"});
	$(".viewport").eq(1).css({"display":"none"});
}

function case_bigpicture2(){
	$("#myanswercase_imgstyle2").show();
	$("#myanswercase_imgstyle").hide();
	$('#case_image2').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"none"});
	$(".viewport").eq(1).css({"display":"inherit"});
}

