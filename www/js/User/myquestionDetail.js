var CasePictureCount=0;
var bool;
var CaseCurrentClick;
var CaseCameraOn1=false;
var CaseCameraOn2=false;
var casenum;
var myQuestionDoc;

$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "myquestionDetail") {
    	$("#header_detail").css("height", (window.innerHeight*0.074).toFixed(0));
        var num = data.options.num;
        bool = data.options.bool;
        $("#index_Anum").html(num);
        Detail_ArticleViewer(num, bool);
        getCasenum(num);
        getAnswerDoc(num);
    }
});

function getCasenum(num)
{
	var getCaseCountDB = firebase.database().ref('Case/'+num);
	
	getCaseCountDB.once('value', function(snap)
			{
				var childNum = snap.numChildren()+1
				casenum = PadLeft(childNum);
				console.log('childNum: '+ childNum);
				console.log('casenum: '+ casenum);
			})
}

function getAnswerDoc(num)
{
	if(bool!='Q')
		{
			var getAnswerDocDB = firebase.database().ref('Question/'+num);
			
			getAnswerDocDB.once('value', function(snap)
					{		
						var DoctorUID=snap.child('answerdoc').val();				
						console.log(DoctorUID);
						var getDocTokenDB = firebase.database().ref('User/'+DoctorUID);
						getDocTokenDB.once('value', function(tokensnap)
								{
									myQuestionDoc = tokensnap.child('Token').val();
									console.log(myQuestionDoc);
								})			
					})
		}
}



function Detail_ArticleViewer(num, bool)
{
	console.log("넘값 : " + num);
	console.log("불값 : " + bool);
	
	FirebaseCall();

	if(bool=="F")
		{		
			$('#btnAddCase_back').hide();
			$("#myquestionDetail_class").css({"margin-bottom":"0px"});
			$("#myquestionDetail_class").css({"height":"150px"});
		}
	if(bool=="Q"||bool=="F")
		{
			$('#btnFinishCaseArea').hide();
		}
	
	
	db=firebase.database().ref("Question/"+num)
	
	
	db.once('value', function(snap)
			{
				if(snap.child("burnstyle").val()=="1"){
					var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "열탕화상";
					var backgroundcolor = "style='background:rgba(255,115,115,1)'";
				}else if(snap.child("burnstyle").val()=="2"){
					var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "화염화상";
					var backgroundcolor = "style='background:rgba(255,184,115,1)'";
				}else if(snap.child("burnstyle").val()=="3"){
					var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "전기화상";
					var backgroundcolor = "style='background:rgba(29,29,192,1)'";
				}else if(snap.child("burnstyle").val()=="4"){
					var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "접촉화상";
					var backgroundcolor = "style='background:rgba(255,115,207,1)'";
				}else if(snap.child("burnstyle").val()=="5"){
					var nodeimg = "<img src='../img/burnkind/juon/juon"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "저온화상";
					var backgroundcolor = "style='background:rgba(115,210,255,1)'";
				}else if(snap.child("burnstyle").val()=="6"){
					var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "화학화상";
					var backgroundcolor = "style='background:rgba(123,77,255,1)'";
				}else if(snap.child("burnstyle").val()=="7"){
					var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "증기화상";
					var backgroundcolor = "style='background:rgba(0,231,141,1)'";
				}else if(snap.child("burnstyle").val()=="8"){
					var nodeimg = "<img src='../img/burnkind/machar/machar"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "마찰화상";
					var backgroundcolor = "style='background:rgba(197,115,255,1)'";
				}else if(snap.child("burnstyle").val()=="9"){
					var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "햇빛화상";
					var backgroundcolor = "style='background:rgba(210,233,17,1)'";
				}else if(snap.child("burnstyle").val()=="10"){
					var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "흡입화상";
					var backgroundcolor = "style='background:rgba(0,136,161,1)'";
				}
				
				if(snap.child("scarstyle").val()=="burn"){
					var scartext = "상처";
				}else{
					var scartext = "흉터";
				}
				  
				if(snap.child("gender").val()=="male"){
					var genderimg = "<img src='../img/question/male.png' width='100%'>";
				}else{
					var genderimg = "<img src='../img/question/female.png' width='100%'>";
				}
				
				const burndb = firebase.database().ref("Burnarea/"+snap.child("bodystyle").val());
				var bodyarea = "";
				var bodyimg = "<img src='../img/body/bodyicon/"+snap.child("bodystyle").val()+".jpg' width='100%'>";
				
				burndb.once('value', function(shotshot){
					
					bodyarea = shotshot.child(snap.child("bodydetail").val()).val();
					
					$("#myquestionDetailTitle").html(snap.child("title").val());
					$("#myquestionDetailDate").html(snap.child("timestyle").val());
					$("#myquestionDetailPhoto").attr("src", snap.child("imgurl").val());
					//성별, 나이
					$("#myquestionDetailAge_img").html(genderimg);
					$("#myquestionDetailAge").html(snap.child("age").val());
					//신체부위
					$("#myquestionDetailArea_img").html(bodyimg);
					$("#myquestionDetailArea").html(bodyarea);
					//화상부위
					$("#myquestionDetailburn_img").html(nodeimg);
					$("#myquestionDetailburn").html(nodetext+"("+scartext+")");
					//내용
					$("#myquestionDetailContents").html(snap.child("contents").val());
					
					 
					const casedb = firebase.database().ref("Case/"+num).orderByChild('visible').equalTo("true");
					casedb.once('value', function(casesnap)
							{
								casesnap.forEach(function(casesnapshot)
										{
									var SeqFulldate = snap.key.split("_")
									
									var SeqYearVal = SeqFulldate[0].substr(0,4);
									var SeqMonthVal = SeqFulldate[0].substr(4,2);
									var SeqDayVal = SeqFulldate[0].substr(6,2);
									
									var MathDate = SeqYearVal+"-"+SeqMonthVal+"-"+SeqDayVal;
									
									
									
									var Fulldate = casesnapshot.child('date').val();
									
									var YearVal =  Fulldate.substr(0,4);
									var MonthVal = Fulldate.substr(4,2);
									var DayVal = Fulldate.substr(6,2);	
									var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
									
									var CaseMathDate = YearVal+"-"+MonthVal+"-"+DayVal;

	

										if(casesnapshot.child('status').val()=="Q"){
								 			var complete = "<div class='question_case_complete' >&nbsp;</div>";
								 			var textdelete = "<div class='question_case_delete'><input type='image' src='../img/close.png' onclick=deletemyquestion('"+num+"','"+casesnapshot.key+"','"+2+"','"+casesnapshot.child('date').val()+"') width='100%'></div>"
									 	}else{
									 		var complete = "<div class='question_case_complete_text' >답변완료</div>";
									 		var textdelete = "";
									 	}
										
									    	var DivStruct = "<div class='question_case_design1'></div>"
									    	+"<div class='question_case_design2'><img src='../img/dot.png' width='100%'></div>"
									    	+"<div class='question_case_design3'>"+ DesignDate+"</div>"
									    	+textdelete
									    	+ "<div class='question_case_div' onclick=PageCaseDetail('"+num+"','"+casesnapshot.key+"')>"
											+"	<ul >"
											+"		<li>"
											+"			<div class='question_case_img'> <img  width='100%' src="+casesnapshot.child('imgurl1').val()+"></div>"
											+"		</li>"
											+"		<li>"
											+complete
											+"			<div class='question_case_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일 차</div>"
											+"			<div class='question_case_contents'>"+casesnapshot.child('contents').val()+"</div>"
											+"	 	</li>"
											+" </ul>"
										    +"</div>";
										document.getElementById('myquestionCase').insertAdjacentHTML('afterBegin', DivStruct);	
									    if(bool=="F"){
									    	$(".question_case_delete").hide();
									    }
									    
									////////////////////////////■/////////////////■///////////////////////■///////////////////////////❤❤❤❤////////////❤❤❤❤///////////
									/////////////////■■■■■■■■■■//■///////////■■■■■■■■■■/////❤❤❤❤❤❤////////❤❤❤❤❤❤❤///////
									/////////////////////////■////■/////////////■//////////////////////■■//////////////////❤❤❤❤❤❤❤❤///❤❤❤❤❤❤❤❤❤/////
									////////////////////////■//////■////////////■■■/////////////■/////■//////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤///
									//////////////////////■/////////■///////////■//////////////////■////////■////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤///
									/////////////////////■///////////■//////////■/////////////////////■■■///////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤////
									////////////////////////////////////////////////■//////////////////////////////////////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤//////
									///////////////////////////////////■■//////////////////////////////////■/////////////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤//////
									////////////////////////////////■//////■///////////////////////////////■//////////////////////❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤////////
									//////////////////////////////■//////////■/////////////////■■■■■■■■■■/////////❤❤❤❤❤❤❤❤❤❤❤❤❤/////////
									/////////////////////////////////■//////■////////////////////////////////////////////////////////////❤❤❤❤❤❤❤❤❤❤❤////////////
									/////////////////////////////////////■■/////////////////////////////////////////////////////////////////////❤❤❤❤❤❤❤//////////////
									//////////////////////////////////////////////////////////////////////////////////////////////////////////////////❤❤❤❤❤///////////////
									///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////❤❤///////////////////								
										})
							})			
				})
			})
}

//글삭제 버튼 클릭
function deletemyquestion(seqnum, casenum, picturecount, fulldate)
{
	var StorageRef = firebase.storage().ref();
	var getSeq = seqnum.split("_");
	var Fulldate = getSeq[0]
	const db = firebase.database().ref();	
	const casedb = db.child("Case/"+getSeq[0]+"_"+getSeq[1]+"/"+casenum);
	var numpicturecount = Number(picturecount)
	

	var YearVal =  Fulldate.substr(0,4);
	var MonthVal = Fulldate.substr(4,2);
	var DayVal = Fulldate.substr(6,2);	
	var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";

		swal({
		  title: '삭제를 진행할까요?',
		  text: "삭제시 되돌릴 수 없습니다!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '삭제',
		  cancelButtonText: '취소',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  allowOutsideClick: false
		}).then(function () {
			
			casedb.update
			(
			{
				status: "A",
				visible: "false"
			}		
			).then(function()
					{
				
				for(var i =1; i<numpicturecount+1; i++)
				{
					var StorageRefChild = StorageRef.child("Question/"+getSeq[1]+"/"+fulldate+"_"+i+".png");
					StorageRefChild.delete();
				}
						const VisibleDB = firebase.database().ref().child("Case/"+seqnum).orderByChild('visible').equalTo("true");
						
						VisibleDB.once('value', function(snap)
								{
									console.log("true 갯수: "+snap.numChildren());
									if(snap.numChildren()==0)
										{
											var deleteMasterDB = firebase.database().ref().child("Question/"+seqnum);
											var deleteDetailDB = firebase.database().ref().child("Case/"+seqnum);
											
											deleteMasterDB.remove().then(function()
													{
												deleteDetailDB.remove().then(function()
														{
													swal({
														  title: '삭제완료',
														  text: '회원님의 글이 삭제되었습니다.',
														  type: 'success',
														  allowOutsideClick: false
														}).then(function()
																{
																	$.mobile.pageContainer.pagecontainer( "change", "myquestion.html", { transition:"slide", reverse:true} )
																})
														})
														})
													
										}
									else
										{
										swal({
											  title: '삭제완료',
											  text: DesignDate+" 글이 삭제되었습니다!",
											  type: 'success',
											  allowOutsideClick: false
										}).then(function()
												{
												document.getElementById('myquestionCase').innerHTML="";
												Detail_ArticleViewer(seqnum,bool);
												})
										}
								})
					})
		}, function (dismiss) {

		  if (dismiss === 'cancel') {		   
		  }

		})
}



function CaseQuestionPhotoDelete(TouchId)
{
	if(TouchId=="CasebtnDelete1")
	{
		$("#CaseIMG1").attr("src","../img/question/close.png");
		$("#CasebtnDelete1").hide();
		CaseCameraOn1=false;
		setTimeout(function(){
			$('#CasePicturebox1').attr("onClick", "Casepictureselect(this.id)");
		}, 300);
		
	}
	else if(TouchId=="CasebtnDelete2")
	{
		$("#CaseIMG2").attr("src","../img/question/over.png");
		$("#CasebtnDelete2").hide();
		CaseCameraOn2=false;
		setTimeout(function(){
			$('#CasePicturebox2').attr("onClick", "Casepictureselect(this.id)");
		}, 300);
	}
}

function Casepictureselect(BoxId){
	
	if(BoxId=="CasePicturebox1")//1번째 사진박스 선택
	{
		swal({
			title: 'Step1. Close-up',
			imageUrl: '../img/question/Question_Closeup.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="myquestion_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="myquestion_select_pic" onclick="CasegetPicture(1)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(1)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
	else//2번째 사진박스 선택
	{
		swal({
			title: 'Step2. OverView',
			imageUrl: '../img/question/Question_Overview.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="myquestion_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="myquestion_select_pic" onclick="CasegetPicture(2)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(2)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
}


//Case 직접활영 선택
function CasegetPicture(getId)
{
	
	if(getId==1)
		{
		CaseCurrentClick="1";
		}
	else
		{
		CaseCurrentClick="2";
		}
	var options = {
			quality:100,
			allowEdit: true,
		    targetWidth: 640,
		    targetHeight: 640,
			destinationType:Camera.DestinationType.DATA_URL,
		    correctOrientation: true
	}
	
	navigator.camera.getPicture(this.CaseonSuccess, this.CaseonError, options);
}


//직접촬영 성공시
var CaseonSuccess = function(imgData)
{
	try
	{
		if(CaseCurrentClick==1)
			{
			CaseCameraOn1=true;
			isCasePicture1Camera=true;
			$('#CasebtnDelete1').show();
			$('#CasePicturebox1').attr("onclick", "");
			
				if(!CaseCameraOn2)//2번째 사진이 아직선택되지 않았다면
				{
					swal({
						title: 'Step2. OverView',
						imageUrl: '../img/question/Question_Overview.jpg',
						confirmButtonColor: '#fff',
						confirmButtonClass:'stepstep',
						html: '<div class="myquestion_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
							+'<div class="myquestion_select_pic" onclick="CasegetPicture(2)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(2)">앨범선택</div>',
						allowOutsideClick: false,
						confirmButtonText:'취소'
					})
				}
				if(CaseCameraOn1&&CaseCameraOn2)
				{
					swal({
						title:"성공",
						text:"사진선택이 완료되었습니다.",
						type:"success"
					})
				}
			}
		else
			{
			CaseCameraOn2=true;
			isCasePicture2Camera=true;
			$('#CasebtnDelete2').show();
			$('#CasePicturebox2').attr("onclick", "");
			}	
		$("#CaseIMG"+CaseCurrentClick).attr("src", "data:image/jpeg;base64, "+imgData);
		
		if(!CaseCameraOn1)//1번째 사진이 아직선택되지 않았다면
		{
			swal({
				title: 'Step1. Close-up',
				imageUrl: '../img/question/Question_Closeup.jpg',
				confirmButtonColor: '#fff',
				confirmButtonClass:'stepstep',
				html: '<div class="myquestion_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
					+'<div class="myquestion_select_pic" onclick="CasegetPicture(1)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(1)">앨범선택</div>',
				allowOutsideClick: false,
				confirmButtonText:'취소'
			})
		}
		
		if(CaseCameraOn1&&CaseCameraOn2)
		{
			swal({
				title:"성공",
				text:"사진선택이 완료되었습니다.",
				type:"success"
			})
		}
	}
	
	catch(error)
	{ 
		swal(error.message);
	}
}

//촬영실패
var CaseonError = function(msg)
{

}



function CasealbumPic(getId){
	try{
		
		if(getId==1)
		{
		CaseCurrentClick="1";
		}
		else
		{
		CaseCurrentClick="2";
		}
		
		navigator.camera.getPicture(this.CaseonPhotoURI, this.CaseonError, {
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

//앨범에서 사진 선택하기 성공
function CaseonPhotoURI(imgURI){
	
try{
	if(CaseCurrentClick==1)
	{
	CaseCameraOn1=true;
	isCasePicture1Camera=false;
	$('#CasebtnDelete1').show();
	$('#CasePicturebox1').attr("onclick", "");
	
	
	if(!CaseCameraOn2)//2번째 사진이 아직선택되지 않았다면
	{
		swal({
			title: 'Step2. OverView',
			imageUrl: '../img/question/Question_Overview.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="myquestion_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="myquestion_select_pic" onclick="CasegetPicture(2)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(2)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
	if(CaseCameraOn1&&CaseCameraOn2)
	{
		swal({
			title:"성공",
			text:"사진선택이 완료되었습니다.",
			type:"success"
		})
	}
	}
else
	{
	CaseCameraOn2=true;
	isCasePicture2Camera=false;
	$('#CasebtnDelete2').show();
	$('#CasePicturebox1').attr("onclick", "");
	}	
	$("#CasePicturebox"+CaseCurrentClick+" img").attr("src", imgURI);
	
	if(!CaseCameraOn1)//1번째 사진이 아직선택되지 않았다면
	{
		swal({
			title: 'Step1. Close-up',
			imageUrl: '../img/question/Question_Closeup.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="myquestion_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="myquestion_select_pic" onclick="CasegetPicture(1)">사진촬영</div><div class="myquestion_select_pic" onclick="CasealbumPic(1)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
	
	if(CaseCameraOn1&&CaseCameraOn2)
	{
		swal({
			title:"성공",
			text:"사진선택이 완료되었습니다.",
			type:"success"
		})
	}
	
	}catch(e)
	{
		swal(e.message)
	}
}	


//직접촬영한 사진 스토리지에 올리기
function CasegoBlobStorage(PictureNum, seqnum, casenum, TextAreaVal, Now)
{
	try{

	var GetSeqnum = seqnum.split("_");	
	var Fulldate = GetSeqnum[0];
	var uid = GetSeqnum[1];
	
	var arr=[]
	var ImgSrc = document.getElementById("CaseIMG"+PictureNum).getAttribute('src');	
	arr = ImgSrc.split("base64, ");
	
	var contentType = 'image/png';
	var b64Data = arr[1];
	var blob = b64toBlob(b64Data, contentType);


	var StorageRef = firebase.storage().ref();
	var StorageRefChild = StorageRef.child("Question/"+uid+"/"+Now+"_"+PictureNum+".png");
	
	
	var task = StorageRefChild.put(blob);
		
	task.on('state_changed',
			function progress(snapshot)
	{
		
	},
	
	function error(err)
	{
		swal({
			  title: '실패!',
			  text: '질문이 등록에 실패했습니다. \n다시 시도해주세요.',
			  type: 'error',
			  confirmButtonText: '확인'
			})
	},
	function complete()
	{
		Caseburninformation(uid, Fulldate, PictureNum, seqnum, casenum, TextAreaVal, Now);
	})
	
	}
	catch(e)
	{
		swal(e.message);
	}
}


function CasegoAlbumStorage(PictureNum, seqnum, casenum, TextAreaVal, Now)
{
	try{
		
	var GetSeqnum = seqnum.split("_");	
	var Fulldate = GetSeqnum[0];
	var uid = GetSeqnum[1];
	var contentType = 'image/png';
	var ImgSrc = document.getElementById("CaseIMG"+PictureNum).getAttribute('src');	

	var StorageRef = firebase.storage().ref();
	var StorageRefChild = StorageRef.child("Question/"+uid+"/"+Now+"_"+PictureNum+".png");

	
	//앨범 File 경로를 Blob으로 바꾸기
    window.resolveLocalFileSystemURL(ImgSrc, function (fileEntry) {
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
                 			  text: '질문이 등록에 실패했습니다. \n다시 시도해주세요.',
                 			  type: 'error',
                 			  confirmButtonText: '확인'
                 			})
                 	},
                 	function complete()
                 	{                 			
                 		Caseburninformation(uid, Fulldate, PictureNum, seqnum, casenum, TextAreaVal, Now);
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

function casevalidation()
{
	if(!CaseCameraOn1)
		{
			swal({
				title:'실패',
				text:'Close-Up 사진을 등록해주세요.',
				type:'error'
			})
			
			return false;
		}
	
	if(!CaseCameraOn2)
	{
		swal({
			title:'실패',
			text:'Overview 사진을 등록해주세요.',
			type:'error'
		})
		
		return false;
	}
	
	if($('#AddCaseText').val()=="")
		{
		swal({
			title:'실패',
			text:'내용을 등록해주세요.',
			type:'error'
		})
		return false;
		}
	
	return true;
}

function BtnCaseCancel()
{
	caseminus();
}


//Swal Case등록버튼 클릭시
function BtnCaseInsertClick()
{
	try{
		
		var valibool = casevalidation();
		if(valibool)
			{
	ShowGIF("../img/giphy.gif");
	var TextAreaVal = $("#AddCaseText").val();
	var seqnum = $("#index_Anum").html();
	
	var now = new Date();
	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();

	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0]);


		for(var i =1; i<3; i++)
		{
			if(i==1)
			{
				if(isCasePicture1Camera)
					{
						this.CasegoBlobStorage(1, seqnum, casenum,TextAreaVal, Fulldate);
					}
				else
					{
						this.CasegoAlbumStorage(1, seqnum, casenum,TextAreaVal, Fulldate)
					}
			}
			else if(i==2)
			{
				if(isCasePicture2Camera)
				{
					this.CasegoBlobStorage(2, seqnum, casenum,TextAreaVal, Fulldate);
				}
			else
				{
					this.CasegoAlbumStorage(2, seqnum, casenum,TextAreaVal, Fulldate)
				}
			}
		}

			}
	
	
	
	}
	catch(error)
	{
		console.log(error.message);
	}
}



//직접촬영, 앨범선택 성공시 최종 도착 하는 곳
function Caseburninformation(uid, Fulldate, PictureNum, seqnum, casenum, TextAreaVal, Now){
	
	try{
		console.log(PictureNum+"번째 들어옴")

		const db = firebase.database().ref();	
				var StorageRef = firebase.storage().ref();
				StorageRef.child("Question/"+uid+"/"+Now+"_"+PictureNum+".png").getDownloadURL().then(function(url)
						{
					console.log("URL: "+url);
							if(PictureNum==1)
								{
								const casedb = db.child("Case/"+Fulldate+"_"+uid+"/case"+casenum);
								casedb.update
								(
								{
									imgurl1: url
								}		
								)
								}
							else
								{
								const casedb = db.child("Case/"+Fulldate+"_"+uid+"/case"+casenum);
								casedb.update
								(
								{
									imgurl2: url,
									contents: TextAreaVal.replace(/\n/g, '<br>'),
									picturecount: CasePictureCount,
									date:Now,
									status:"Q",
									visible:"true"
								}		
								)
								HideGIF();
								
								
								getCasenum(seqnum);

								if(bool!='Q')
								{
									console.log()
									SendMessageToTarget(myQuestionDoc, "진행중인 질문에 새로운 CASE가 등록되었습니다.");
								}
						       
								
								
								
								swal({
									  title: '등록',
									  text: "글이 성공적으로 등록되었습니다.",
									  type: 'success',
									  showCancelButton: false,
									  allowOutsideClick: false
									}).then(function () {
										document.getElementById('myquestionCase').innerHTML="";
										Detail_ArticleViewer(seqnum, bool);
										caseminus();
									})
					
								}
						});		
	}
	catch(error)
	{
		HideGIF();
		console.log(error.message);
	}
}

function PageCaseDetail(num, casenum)
{
		 $.mobile.pageContainer.pagecontainer( "change", "myquestionCaseDetail.html", { transition:"slide", num: num, casenum:casenum, bool:bool} )
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




function btnTopBackToMyquestion() 
{
$.mobile.pageContainer.pagecontainer( "change", "myquestion.html", { transition:"slide", reverse: true} )
}

function caseplus(){
	$("#newcase_back").css({"display":"inherit"});
	$("#newcase_back").animate({"margin-top":"0%"}, 300);
}

function casefinish()
{
	swal({
		  title: '질문을 마감하시겠습니까?',
		  text: "질문마감시 해당 건에 대하여 추가 질문을 할 수 없습니다.",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '마감하기',
		  cancelButtonText: '취소',
		  allowOutsideClick:false
		}).then(function () {
			var seq = $("#index_Anum").html();
			
			var ProstatusDB = firebase.database().ref('Question/'+seq);
			
			ProstatusDB.once('value' , function(updateSnap)
					{
				
				var answerdoc = updateSnap.child('answerdoc').val();
						ProstatusDB.update({
							prostatus:"F",
							prostatus_answerdoc:"F_"+answerdoc
						}).then(function()
								{
						    swal({
								      title: '질문마감완료!',
								      text:'해당 질문건이 마감처리 되었습니다.',
								      type:'success',
								      allowOutsideClick:false
						    }).then(function()
								    		{
								    			btnTopBackToMyquestion();
								    		})
								}) 
					})
			
			
					

		  
		}, function (dismiss) {
			  if (dismiss === 'cancel') {
					 console.log('cancel click');
				  }
				})
		
		
	
}

function caseminus(){
	$("#newcase_back").animate({"margin-top":"-170%"}, 300);
	setTimeout(function(){
		$("#newcase_back").css({"display":"none"});
		$('#CasePicturebox1').attr("onClick", "Casepictureselect(this.id)");
		$('#CasePicturebox2').attr("onClick", "Casepictureselect(this.id)");
	}, 400)
	
	$("#CaseIMG1").attr("src","../img/question/close.png");
	$("#CaseIMG2").attr("src","../img/question/over.png");
	$("#CasebtnDelete1").hide();
	$("#CasebtnDelete2").hide();
	CaseCameraOn1=false;
	CaseCameraOn2=false;
	
	$("#AddCaseText").val('');

}

