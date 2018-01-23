picturecount1 = 0;
picturecount2 = 0;

$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "myquestionCaseDetail") {
    	$("#header_Casedetail").css("height", (window.innerHeight*0.074).toFixed(0));
        var num = data.options.num;
        var casenum =data.options.casenum;
        var bool = data.options.bool;
        LoadCaseDetail(num, casenum)
    }
    

});

$(document).on('pageshow', '#myquestionCaseDetail', function(event, data){
	
	$('#image1').imgViewer();
	
});

function LoadCaseDetail(num, casenum)
{
	
	var CommonDB = firebase.database().ref('Question/'+num);
	var CaseDB = firebase.database().ref('Case/'+num+"/"+casenum);
	var doctorDB = firebase.database().ref('Answer/'+num+"/"+casenum);
	const answerdb = firebase.database().ref('Answer');
	var count = 0;
	var doctoruid = "";
	
	CaseDB.once('value', function(snap)
			{
	
					$("#image1").attr("src",snap.child('imgurl1').val());
					$("#image2").attr("src",snap.child('imgurl2').val());
							
				 	document.getElementById('myquestioncase_detail').innerHTML+=
				 		"	<div id='myquestioncase_question'>"+snap.child('contents').val()+"</div>"
					  +"	<div id='myquestioncase_doctor_back'>"
					  +"		<div id='myquestioncase_doctor_img'><img src='../img/profile/doctor_male.png' width='100%'></div>"
					  +"		<div id='myquestioncase_doctor_info'>"
					  +"			<div id='myquestioncase_doctor_name'></div><div id='myquestioncase_doctor_etc'></div>"
					  +"		</div>"
					  +"	</div>"
					  +"	<div id='myquestioncase_doctor_ment'></div>";
				 	
				 			 if(snap.child('status').val()=="Q")
				 				 {
				 				 		$("#myquestioncase_doctor_ment").html("답변을 기다리는 중입니다.");
				 				 		$("#myquestioncase_doctor_back").hide();
				 				 }
				 			 else//답변불러오기
				 				 {
					 				doctorDB.once('value', function(docsnap){
										$("#myquestioncase_doctor_ment").html(docsnap.child('contents').val());
										var doctorinfoDB = firebase.database().ref('User/'+docsnap.child('uid').val());
										doctoruid=docsnap.child('uid').val();
										doctorinfoDB.once('value', function(doctorsnap){
											$("#myquestioncase_doctor_name").html("Dr."+doctorsnap.child('nickname').val());
										})
									console.log("doctoruid: "+doctoruid)
									const answerdb = firebase.database().ref('Question').orderByChild('answerdoc').equalTo(doctoruid);
									answerdb.once('value', function(doccountsnap){
										count = doccountsnap.numChildren();
										$("#myquestioncase_doctor_etc").html("화상외과 | 답변수 : " + count);
						 			})
									})

				 				 }
			})
}

function btnTopBackToMyquestiondetail()
{
	$.mobile.pageContainer.pagecontainer( "change", "myquestionDetail.html", { transition:"slide", reverse: true, num:$("#index_Anum").html(),bool:bool} )
}

function bigpicture(){
	$("#myquestioncase_imgstyle2").hide();
	$("#myquestioncase_imgstyle").show();
	$('#image1').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"inherit"});
	$(".viewport").eq(1).css({"display":"none"});
}

function bigpicture2(){
	$("#myquestioncase_imgstyle2").show();
	$("#myquestioncase_imgstyle").hide();
	$('#image2').imgViewer();
	$(".viewport img").css({"transform":"translate(0px, 0px) scale(1, 1)"});
	$(".viewport").eq(0).css({"display":"none"});
	$(".viewport").eq(1).css({"display":"inherit"});
}

