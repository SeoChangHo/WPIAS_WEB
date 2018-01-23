var Answerseq;
var Answercasenum;

$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "answerCaseDetail") {
    	$("#header_Casedetail").css("height", (window.innerHeight*0.074).toFixed(0));
    		Answerseq = data.options.seq;
    		Answercasenum = data.options.casenum
        LoadAnswerCaseDetail(Answerseq, Answercasenum)
        GetDoctorInfo();
    }
    

});


$(document).on('pageshow', '#answerCaseDetail', function(event, data){
	
	$('#answer_image1').imgViewer();
	
});

function GetDoctorInfo()
{
	var indexuid= $('#index_uid').html();
	const answerdb = firebase.database().ref('Question').orderByChild('answerdoc').equalTo(indexuid);
	var user = firebase.auth().currentUser;
	var doctoruid = user.uid;
	var doctorName = user.displayName;
	 	
	
	answerdb.once('value', function(snap){
			var count= snap.numChildren();
			$("#answercase_doctor_etc").html("화상외과 | 답변수 : " + count);
			$("#answercase_doctor_name").html("Dr."+doctorName);
		})
}


function btnInsertAnswer()
{
	FirebaseCall();

	
	var Seq = $('#index_Anum').html();
	var CaseNum =Answercasenum;
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
	var CaseStatusDB = firebase.database().ref().child('Case/'+Seq+"/"+Answercasenum)
	
	
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
       									$.mobile.pageContainer.pagecontainer( "change", "answer.html", { transition:"slideup", reverse:true } )
       								})
       					
	})
}


function LoadAnswerCaseDetail(seq, casenum)
{
	var CaseDB = firebase.database().ref('Case/'+seq+"/"+casenum)
	
	CaseDB.once('value', function(snap)
			{
						$("#answer_image1").attr("src",snap.child('imgurl1').val());
						$("#answer_image2").attr("src",snap.child('imgurl2').val());
						$("#answer_picimage1").html("<img src="+snap.child('imgurl1').val()+" width='100%'>");
						$("#answer_picimage2").html("<img src="+snap.child('imgurl2').val()+" width='100%'>");

				 		 document.getElementById('AnswerCaseDetail').innerHTML+=
				 			"	<div id='answercase_question'>"+snap.child('contents').val()+"</div>"
							  +"	<div id='answercase_doctor_back'>"
							  +"		<div id='answercase_doctor_img'><img src='../img/profile/doctor_male.png' width='100%'></div>"
							  +"		<div id='answercase_doctor_info'>"
							  +"			<div id='answercase_doctor_name'></div><div id='answercase_doctor_etc'></div>"
							  +"		</div>"
							  +"	</div>";
			
			})
}

function btnTopBackToAnswerDetail()
{
	$.mobile.pageContainer.pagecontainer( "change", "answerdetail.html", { transition:"slide", reverse: true, num:Answerseq} )
}


function answer_bigpicture(){
	$("#answercase_imgstyle2").hide();
	$("#answercase_imgstyle").show();
	$('#answer_image1').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"inherit"});
	$(".viewport").eq(1).css({"display":"none"});
}

function answer_bigpicture2(){
	$("#answercase_imgstyle2").show();
	$("#answercase_imgstyle").hide();
	$('#answer_image2').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"none"});
	$(".viewport").eq(1).css({"display":"inherit"});
}

