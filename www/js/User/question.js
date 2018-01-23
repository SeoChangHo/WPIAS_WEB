var PictureCount=0;
var isPicture1Camera;
var isPicture2Camera;
var Picture1On;
var Picture2On;
var CurrentClick;

$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "questionpage") {
    	$("#header").css("height", (window.innerHeight*0.1).toFixed(0));
    	$("#questionmain").css("visibility","hidden");
    	
    	Picture1On=false;
    	Picture2On=false;
    	
    	if( (window.innerWidth).toFixed(0) <321){
    		$(".body_select_li2").css({"margin-top":"10%"});
    		$("#bodyradio label").css({"font-size":"0.8em"});
    		$("label.ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-left.ui-radio-on").css({"font-size":"0.7em"});
    		$(".ui-radio .ui-btn").css({"font-size":"0.7em"});
    		$("#ageradio label").css({"font-size":"0.7em"});
    		$(".ui-radio .ui-btn.ui-radio-on:after").css({"width":"16px","height":"16px"});
    		$(".ui-checkbox-off:after, .ui-btn.ui-radio-off:after").css({"width":"16px","height":"16px"});
    	}
    }
   
});

$(document).on('pageshow', '#questionpage', function (event, data) {
	setTimeout(function(){
		PictureCount=0;
		$("#questionmain").css("visibility","visible");
		$("label.ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-left.ui-radio-on img").css("-webkit-filter","grayscale(0%)");
		
	}, 300);
	
	$("input:radio[name=burnkind]").click(function(){
		console.log(this.id);
	});
	
	$(".burnkind_class_text").click(function(){
		console.log(this.id);
		var burnid = this.id;
		$('.burnkind_class_text').not('#'+burnid).css('color','#858585');
		$('#'+burnid).css("color","#0071bc");
	})
	
	myinfosame();
});

function pictureselect(BoxId){
	
	if(BoxId=="Picturebox1")//1번째 사진박스 선택
	{
		swal({
			title: 'Close-up',
			imageUrl: '../img/question/Question_Closeup.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="question_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="question_select_pic" onclick="getPicture(1)">사진촬영</div><div class="question_select_pic" onclick="albumPic(1)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
	else//2번째 사진박스 선택
	{
		swal({
			title: 'OverView',
			imageUrl: '../img/question/Question_Overview.jpg',
			confirmButtonColor: '#fff',
			confirmButtonClass:'stepstep',
			html: '<div class="question_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
				+'<div class="question_select_pic" onclick="getPicture(2)">사진촬영</div><div class="question_select_pic" onclick="albumPic(2)">앨범선택</div>',
			allowOutsideClick: false,
			confirmButtonText:'취소'
		})
	}
}

//직접활영 선택
function getPicture(BoxNum)
{
	var options = {
			quality:100,
			allowEdit: true,
		    targetWidth: 640,
		    targetHeight: 640,
			destinationType:Camera.DestinationType.DATA_URL,
		    correctOrientation: true
	}
	CurrentClick=BoxNum;
	navigator.camera.getPicture(this.onSuccess, this.onError, options);
}

//직접촬영 성공시
var onSuccess = function(imgData)
{
	try
	{
		if(CurrentClick==1)
			{
				isPicture1Camera=true;
				Picture1On=true;
				$('#btnDelete1').show();
				$('#Picturebox1').attr("onclick", "");
				if(!Picture2On)
					{
					swal({
						title: 'OverView',
						imageUrl: '../img/question/Question_Overview.jpg',
						confirmButtonColor: '#fff',
						confirmButtonClass:'stepstep',
						html: '<div class="question_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
							+'<div class="question_select_pic" onclick="getPicture(2)">사진촬영</div><div class="question_select_pic" onclick="albumPic(2)">앨범선택</div>',
						allowOutsideClick: false,
						confirmButtonText:'취소'
					})
					}
				if(Picture1On&&Picture2On)
				{
					swal({
						title:"성공",
						text:"사진선택이 완료되었습니다.",
						type:"success"
					})
				}
			}
		else if(CurrentClick==2)
		{
			isPicture2Camera=true;
			Picture2On=true;
			$('#btnDelete2').show();
			$('#Picturebox2').attr("onclick", "");
			if(!Picture1On)
			{
				swal({
					title: 'Close-up',
					imageUrl: '../img/question/Question_Closeup.jpg',
					confirmButtonColor: '#fff',
					confirmButtonClass:'stepstep',
					html: '<div class="question_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
						+'<div class="question_select_pic" onclick="getPicture(1)">사진촬영</div><div class="question_select_pic" onclick="albumPic(1)">앨범선택</div>',
					allowOutsideClick: false,
					confirmButtonText:'취소'
				})
			}
			if(Picture1On&&Picture2On)
				{
					swal({
						title:"성공",
						text:"사진선택이 완료되었습니다.",
						type:"success"
					})
				}
		}
		$("#pictureImg"+CurrentClick).attr("src", "data:image/jpeg;base64, "+imgData);
		
		$("#question_pic").hide();
		$("#question_album").hide();
		$("#questionpage").css("background","white");
		$("#question_box").show();
		
		swal();

	}catch(error){
		swal(error.message);
	}
}

//촬영실패
var onError = function(msg)
{
	swal("실패");
}

//직접촬영한 사진 스토리지에 올리기
function goBlobStorage(uid, Fulldate, nickname, PictureNum)
{
	try{

	var arr=[]
	var ImgSrc = document.getElementById("pictureImg"+PictureNum).getAttribute('src');	
	arr = ImgSrc.split("base64, ");
	
	var contentType = 'image/png';
	var b64Data = arr[1];
	var blob = b64toBlob(b64Data, contentType);


	var StorageRef = firebase.storage().ref();
	var StorageRefChild = StorageRef.child("Question/"+uid+"/"+Fulldate+"_"+PictureNum+".png");
	
	
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
		burninformation(uid, Fulldate, nickname, PictureNum);
	})
	
	}
	catch(e)
	{
		swal(e.message);
	}
}


//직접촬영한 base64사진 이미지 Blob으로 바꾸기
function b64toBlob(b64Data, contentType, sliceSize) {
	  contentType = contentType || '';
	  sliceSize = sliceSize || 512;

	  var byteCharacters = atob(b64Data);
	  var byteArrays = [];

	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    var slice = byteCharacters.slice(offset, offset + sliceSize);

	    var byteNumbers = new Array(slice.length);
	    for (var i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }

	    var byteArray = new Uint8Array(byteNumbers);

	    byteArrays.push(byteArray);
	  }
	    
	  var blob = new Blob(byteArrays, {type: contentType});
	  return blob;
	}



//앨범에서 사진 선택하기
function albumPic(BoxNum){
	try{
		navigator.camera.getPicture(onPhotoURI, onError, {
			quality: 100,
			allowEdit: true,
		    targetWidth: 640,
		    targetHeight: 640,
			destinationType: Camera.DestinationType.FILE_URI,
			correctOrientation: true,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
		});
		CurrentClick=BoxNum;
	}catch(e){
		swal(e.message);
	}
	
}


//앨범에서 사진 선택하기 성공
function onPhotoURI(imgURI){
	
try{
	
	if(CurrentClick==1)
	{
		isPicture1Camera=false;
		Picture1On=true;
		$('#btnDelete1').show();
		$('#Picturebox1').attr("onclick", "");
		
		if(!Picture2On)
		{
			swal({
				title: 'OverView',
				imageUrl: '../img/question/Question_Overview.jpg',
				confirmButtonColor: '#fff',
				confirmButtonClass:'stepstep',
				html: '<div class="question_picture_message">상처 부위로 부터 약 20cm 가량 위에서 촬영해주세요.</div>'
					+'<div class="question_select_pic" onclick="getPicture(2)">사진촬영</div><div class="question_select_pic" onclick="albumPic(2)">앨범선택</div>',
				allowOutsideClick: false,
				confirmButtonText:'취소'
			})
		}
		
		if(Picture1On&&Picture2On)
		{
			swal({
				title:"성공",
				text:"사진선택이 완료되었습니다.",
				type:"success"
			})
		}
	}
	else if(CurrentClick==2)
	{
		isPicture2Camera=false;
		Picture2On=true;
		$('#btnDelete2').show();
		$('#Picturebox2').attr("onclick", "");
		
		if(!Picture1On)
		{
			swal({
				title: 'Close-up',
				imageUrl: '../img/question/Question_Closeup.jpg',
				confirmButtonColor: '#fff',
				confirmButtonClass:'stepstep',
				html: '<div class="question_picture_message">상처 부위로 부터 약 10cm 가량 위에서 촬영해주세요.</div>'
					+'<div class="question_select_pic" onclick="getPicture(1)">사진촬영</div><div class="question_select_pic" onclick="albumPic(1)">앨범선택</div>',
				allowOutsideClick: false,
				confirmButtonText:'취소'
			})
		}
		
		if(Picture1On&&Picture2On)
		{
			swal({
				title:"성공",
				text:"사진선택이 완료되었습니다.",
				type:"success"
			})
		}
	}
	$("#pictureImg"+CurrentClick).attr("src", imgURI);
	
	$("#question_pic").hide();
	$("#question_album").hide();
	$("#question_box").show();
	$("#questionpage").css("background","white");

	}catch(e)
	{
		swal(e.message)
	}
}	
//앨범 사진 등록하기  클릭
function albuminsert()
{
	try{
		ShowGIF("../img/giphy.gif");

	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var nickname = user.displayName;
	
	console.log(uid);
	var now = new Date();
	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();

	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0]);

	goAlbumStorage(uid, Fulldate, nickname)
	}
	catch(e)
	{
		HideGIF();
		swal(e.message);
	}
}

//앨범사진 스토리지에 올리기
function goAlbumStorage(uid, Fulldate, nickname, PictureNum)
{
	try{
	var contentType = 'image/png';
	var ImgSrc = document.getElementById("pictureImg"+PictureNum).getAttribute('src');	

	var StorageRef = firebase.storage().ref();
	var StorageRefChild = StorageRef.child("Question/"+uid+"/"+Fulldate+"_"+PictureNum+".png");

	
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
                 		burninformation(uid, Fulldate, nickname, PictureNum);
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


//질문등록하기 버튼 클릭
function BtnInsertClick()
{
	if(validation()==true){
		try{
			ShowGIF("../img/giphy.gif");
			
			var user = firebase.auth().currentUser;
			var uid = user.uid;
			var nickname = user.displayName
			
			console.log(uid);
			var now = new Date();
			
			var year = (now.getYear()+1900).toString(); 
			var month = (now.getMonth()+1).toString();
			var day = (now.getDate()).toString();
			var hour = now.getHours().toString();
			var min = now.getMinutes().toString();
			var sec = now.getSeconds().toString();
			var Fulldate= year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0]);

			var title = $("#Title").val();
			var contents = $("#Contents").val().replace(/\n/g, '<br>');
			var burnstyle = $("input:radio[name=burnstyle]:checked").val();
			var burndetail = $("input:radio[name=burnkind]:checked").val();
			var timestyle = $("#question_time").val();
			var bodystyle = $("input:radio[name=bodystyle]:checked").val();
			var bodydetail = $("input:radio[name=bodystyle_detail]:checked").val();
			var gender = $("input:radio[name=genderstyle]:checked").val();
			var age = $("#agestyle option:checked").val();
			var scar = $("input:radio[name=scarstyle]:checked").val();
			const db = firebase.database().ref();	
		    const basedb = db.child("Question/"+Fulldate+"_"+uid);
			basedb.set({
				date:Fulldate,
				uid:uid,
				title:title,
				burnstyle:burnstyle,
				bodydetail:bodydetail,
				burndetail:burndetail,
				timestyle:timestyle,
				bodystyle:bodystyle,
				gender: gender,
				scarstyle: scar,
				age:age,
				nickname: nickname,
				prostatus:"Q"
			}).then(function()
					{
				for(var i =1; i<3; i++)
				{
					if(i==1)
					{
						if(isPicture1Camera)
							{
								goBlobStorage(uid, Fulldate, nickname, 1);
							}
						else
							{
								goAlbumStorage(uid, Fulldate, nickname, 1)
							}
					}
					else if(i==2)
					{
						if(isPicture2Camera)
						{
							goBlobStorage(uid, Fulldate, nickname, 2);
						}
					else
						{
							goAlbumStorage(uid, Fulldate, nickname, 2)
						}
					}
				}
					})
			
			
			
			
			}
			catch(error)
			{
				console.log(error.message);
			}
	}
	
}



//직접촬영, 앨범선택 성공시 최종 도착 하는 곳
function burninformation(uid, Fulldate, nickname, PictureNum){
	
	try{
		
		var title = $("#Title").val();
		var contents = $("#Contents").val().replace(/\n/g, '<br>');
		var burnstyle = $("input:radio[name=burnstyle]:checked").val();
		var burndetail = $("input:radio[name=burnkind]:checked").val();
		var timestyle = $("#question_time").val();
		var bodystyle = $("input:radio[name=bodystyle]:checked").val();
		var bodydetail = $("input:radio[name=bodystyle_detail]:checked").val();
		var gender = $("input:radio[name=genderstyle]:checked").val();
		var age = $("#agestyle option:checked").val();
		const db = firebase.database().ref();	
		


				var StorageRef = firebase.storage().ref();
				StorageRef.child("Question/"+uid+"/"+Fulldate+"_"+PictureNum+".png").getDownloadURL().then(function(url)
						{
					console.log("URL: "+url);
							if(PictureNum==1)
								{
								const casedb = db.child("Case/"+Fulldate+"_"+uid+"/case0001");
								casedb.update
								(
								{
									imgurl1: url
								}		
								)
								}
							else
								{
								const casedb = db.child("Case/"+Fulldate+"_"+uid+"/case0001");
								casedb.update
								(
								{
									contents: contents,
									picturecount: PictureCount,
									date:Fulldate,
									status:"Q",
									visible:"true",
									imgurl2: url
								}		
								)
								HideGIF();
								SendMessageToTopic("Doctor", "새로운 질문이 등록되었습니다.");
								swal({
									  title: '등록',
									  text: "글이 성공적으로 등록되었습니다.",
									  type: 'success',
									  showCancelButton: true,
									  confirmButtonColor: '#3085d6',
									  cancelButtonColor: '#A566FF',
									  confirmButtonText: '확인',
									  cancelButtonText: '내 글 보기',
									  allowOutsideClick: false
									}).then(function () {

										$.mobile.changePage("MainPage.html", {transition:"none"});	
									}, function (dismiss) {
									  if (dismiss === 'cancel') {
										  $.mobile.changePage("myquestion.html", {transition:"none"});	
									  }
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

function burnradio(type){
	
	$("#burnburn1").hide();
	$("#burnburn2").hide();
	$("#burnburn3").hide();
	$("#burnburn4").hide();
	$("#burnburn5").hide();
	$("#burnburn6").hide();
	$("#burnburn7").hide();
	$("#burnburn8").hide();
	$("#burnburn9").hide();
	$("#burnburn10").hide();
	$('#'+type).show();
	
	
	$("input:radio[name=burnkind]:checked").prop("checked",false).checkboxradio("refresh");
		
	if(type=="burnburn1"){
		$("#yultang1").prop("checked",true)
	}else if(type=="burnburn2"){
		$("#hwayum1").prop("checked",true)
	}else if(type=="burnburn3"){
		$("#jungi1").prop("checked",true)
	}else if(type=="burnburn4"){
		$("#jubchok1").prop("checked",true)
	}else if(type=="burnburn5"){
		$("#juon1").prop("checked",true)
	}else if(type=="burnburn6"){
		$("#hwahag1").prop("checked",true)
	}else if(type=="burnburn7"){
		$("#junggi1").prop("checked",true)
	}else if(type=="burnburn8"){
		$("#machar1").prop("checked",true)
	}else if(type=="burnburn9"){
		$("#hatbit1").prop("checked",true)
	}else if(type=="burnburn10"){
		$("#heubib1").prop("checked",true)
	}
	
	$("input:radio[name=burnkind]:checked").checkboxradio("refresh");

}

function bodyradio(type){
	
	bodyradio_start();
	
	if(type=="front"){
		$("#body_select_li1").show();
		$("#body_select_li2").hide();
		
		$("#body_front_img").attr("src", "../img/body/fronthead.png");
		$("#body1").prop("checked", true).checkboxradio("refresh");
	}else if(type=="end"){
		$("#body_select_li2").show();
		$("#body_select_li1").hide();
		
		$("#body_front_img").attr("src", "../img/body/backhead.png");
		$("#body11").prop("checked", true).checkboxradio("refresh");
	}
	
	question_bodyselect();
}

function question_bodyselect(){
	
	bodybody();
	
	if($("input:radio[name=bodystyle]:checked").val()=="1"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/fronthead.png");
			$("#bodybody1").show();
			$("#body_detail1").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backhead.png");
			$("#bodybody2").show();
			$("#body_detail7").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="2"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/frontshoulder.png");
			$("#bodybody3").show();
			$("#body_detail10").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backshoulder.png");
			$("#bodybody3").show();
			$("#body_detail10").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="3"){
		$("#body_front_img").attr("src", "../img/body/frontchest.png");
		$("#bodybody4").show();
		$("#body_detail13").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="4"){
		$("#body_front_img").attr("src", "../img/body/backback.png");
		$("#bodybody5").show();
		$("#body_detail16").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="5"){
		$("#body_front_img").attr("src", "../img/body/frontstomach.png");
		$("#bodybody6").show();
		$("#body_detail19").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="6"){
		$("#body_front_img").attr("src", "../img/body/backloins.png");
		$("#bodybody7").show();
		$("#body_detail22").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="7"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/frontarm.png");
			$("#bodybody8").show();
			$("#body_detail25").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backarm.png");
			$("#bodybody8").show();
			$("#body_detail25").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="8"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/fronthand.png");
			$("#bodybody9").show();
			$("#body_detail31").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backhand.png");
			$("#bodybody10").show();
			$("#body_detail37").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="9"){
		$("#body_front_img").attr("src", "../img/body/frontgenitals.png");
		$("#bodybody11").show();
		$("#body_detail49").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="10"){
		$("#body_front_img").attr("src", "../img/body/backhip.png");
		$("#bodybody12").show();
		$("#body_detail50").prop("checked",true).checkboxradio("refresh");
	}else if($("input:radio[name=bodystyle]:checked").val()=="11"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/frontleg.png");
			$("#bodybody13").show();
			$("#body_detail53").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backleg.png");
			$("#bodybody13").show();
			$("#body_detail53").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="12"){
		if($("input:radio[name=bodyfe]:checked").val()=="1"){
			$("#body_front_img").attr("src", "../img/body/frontfoot.png");
			$("#bodybody14").show();
			$("#body_detail59").prop("checked",true).checkboxradio("refresh");
		}else{
			$("#body_front_img").attr("src", "../img/body/backfoot.png");
			$("#bodybody15").show();
			$("#body_detail65").prop("checked",true).checkboxradio("refresh");
		}
	}else if($("input:radio[name=bodystyle]:checked").val()=="13"){
		$("#body_front_img").attr("src", "../img/body/Respiratory.png");
		$("#bodybody16").show();
		$("#body_detail71").prop("checked",true).checkboxradio("refresh");
	}
	
}

function bodybody(){
	$("#bodybody1").css("display","none");
	$("#bodybody2").css("display","none");
	$("#bodybody3").css("display","none");
	$("#bodybody4").css("display","none");
	$("#bodybody5").css("display","none");
	$("#bodybody6").css("display","none");
	$("#bodybody7").css("display","none");
	$("#bodybody8").css("display","none");
	$("#bodybody9").css("display","none");
	$("#bodybody10").css("display","none");
	$("#bodybody11").css("display","none");
	$("#bodybody12").css("display","none");
	$("#bodybody13").css("display","none");
	$("#bodybody14").css("display","none");
	$("#bodybody15").css("display","none");
	$("#bodybody16").css("display","none");
	$("#bodybody17").css("display","none");
}

function bodyradio_start(){
	
	$("#body2").prop("checked", false).checkboxradio("refresh");
	$("#body3").prop("checked", false).checkboxradio("refresh");
	$("#body4").prop("checked", false).checkboxradio("refresh");
	$("#body5").prop("checked", false).checkboxradio("refresh");
	$("#body6").prop("checked", false).checkboxradio("refresh");
	$("#body7").prop("checked", false).checkboxradio("refresh");
	$("#body8").prop("checked", false).checkboxradio("refresh");
	$("#body9").prop("checked", false).checkboxradio("refresh");
	$("#body10").prop("checked", false).checkboxradio("refresh");

	$("#body12").prop("checked", false).checkboxradio("refresh");
	$("#body13").prop("checked", false).checkboxradio("refresh");
	$("#body14").prop("checked", false).checkboxradio("refresh");
	$("#body15").prop("checked", false).checkboxradio("refresh");
	$("#body16").prop("checked", false).checkboxradio("refresh");
	$("#body17").prop("checked", false).checkboxradio("refresh");
	$("#body18").prop("checked", false).checkboxradio("refresh");
	$("#body19").prop("checked", false).checkboxradio("refresh");
}

function myinfosame(){
	var d = new Date();
	var n = d.getFullYear();
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	
	$("#male").prop("checked", false).checkboxradio("refresh");
	$("#female").prop("checked", false).checkboxradio("refresh");
	$("#agestyle option").remove();
	
	
	if($("#information_same").is(":checked")){
		const db = firebase.database().ref();
		const dbuser = db.child('User').child(uid);
		dbuser.once('value', snap =>{
				
			    var age = parseInt(n)-parseInt(snap.child('birthday').val())+1;
			    console.log(age);
			    
				if(snap.child('gender').val()=="male"){
					console.log("남자");
					$("#male").prop("checked", true).checkboxradio("refresh");
					$("#female").attr('disabled', true).checkboxradio("refresh");
				}else if(snap.child('gender').val()=="female"){
					console.log("여자");
					$("#female").prop("checked", true).checkboxradio("refresh");
					$("#male").attr('disabled', true).checkboxradio("refresh");
				}
				
				if(age<4){
					$("#agestyle").append("<option value='0~3세'>0~3세</option>");
				}else if(age<7){
					$("#agestyle").append("<option value='4~6세'>4~6세</option>");
				}else if(age<16){
					$("#agestyle").append("<option value='7~15세'>7~15세</option>");
				}else if(age<21){
					$("#agestyle").append("<option value='16~20세'>16~20세</option>");
				}else if(age<31){
					$("#agestyle").append("<option value='21~30세'>21~30세</option>");
				}else if(age<41){
					$("#agestyle").append("<option value='31~40세'>31~40세</option>");
				}else if(age<51){
					$("#agestyle").append("<option value='41~50세'>41~50세</option>");
				}else if(age<61){
					$("#agestyle").append("<option value='51~60세'>51~60세</option>");
				}else{
					$("#agestyle").append("<option value='61세 이상'>61세 이상</option>");
				}
				
				$("#agestyle option:eq(0)").attr("selected", "selected");
				$("#agestyle").selectmenu("refresh", true);
		})	
	}else{
		$("#male").prop("checked", false).checkboxradio("refresh");
		$("#female").prop("checked", false).checkboxradio("refresh");
		$("#male").attr('disabled', false).checkboxradio("refresh");
		$("#female").attr('disabled', false).checkboxradio("refresh");
		
		$("#agestyle").append("<option value=''></option>");
		$("#agestyle").append("<option value='0~3세'>0~3세</option>");
		$("#agestyle").append("<option value='4~6세'>4~6세</option>");
		$("#agestyle").append("<option value='7~15세'>7~15세</option>");
		$("#agestyle").append("<option value='16~20세'>16~20세</option>");
		$("#agestyle").append("<option value='21~30세'>21~30세</option>");
		$("#agestyle").append("<option value='31~40세'>31~40세</option>");
		$("#agestyle").append("<option value='41~50세'>41~50세</option>");
		$("#agestyle").append("<option value='51~60세'>51~60세</option>");
		$("#agestyle").append("<option value='61세 이상'>61세 이상</option>");
		$("#agestyle option:eq(0)").attr("selected", "selected");
		$("#agestyle").selectmenu("refresh", true);
	}
	
}



function QuestionPhotoDelete(TouchId)
{
	if(TouchId=="btnDelete1")
	{
		$("#pictureImg1").attr("src","../img/question/close.png");
		$("#btnDelete1").hide();
		Picture1On=false;
		setTimeout(function(){
			$('#Picturebox1').attr("onClick", "pictureselect(this.id)");
		}, 300);
		
	}
	else if(TouchId=="btnDelete2")
	{
		$("#pictureImg2").attr("src","../img/question/over.png");
		$("#btnDelete2").hide();
		Picture2On=false;
		setTimeout(function(){
			$('#Picturebox2').attr("onClick", "pictureselect(this.id)");
		}, 300);
	}
}


function validation(){

	if(!Picture1On)
	{
		swal({
			title:"실패",
			text:"사진을 첨부해주세요.",
			type:"error"
		})
		return false;
	}
	
	if(!Picture2On)
	{
		swal({
			title:"실패",
			text:"사진을 첨부해주세요.",
			type:"error"
		})
		return false;
	}
	
	if($("#question_time").val()==""){
		swal({
			title:"실패",
			text:"날짜를 입력해 주세요.",
			type:"error"
		})
		$(document).scrollTop($("#question_time").offset().top);
		return false;
	}else if($("input:radio[name=genderstyle]:checked").val()==null){
		swal({
			title:"실패",
			text:"성별을 선택해 주세요.",
			type:"error"
		})
		return false;
	}else if($("#agestyle option:checked").val()==""){ 
		swal({
			title:"실패",
			text:"연령을 선택해 주세요.",
			type:"error"
		})
		return false;
	}else if($("#Title").val()==""){
		swal({
			title:"실패",
			text:"제목을 입력해 주세요.",
			type:"error"
		})
		return false;
	}else if($("#Contents").val()==""){
		swal({
			title:"실패",
			text:"내용을 입력해 주세요.",
			type:"error"
		})
		return false;
	}
	
	return true;
}

function dropdownfunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function dropdownbackfunction(){
	document.getElementById("mybackDropdown").classList.toggle("show");
}

window.onclick = function(event) {
	  if (!event.target.matches('.dropbtn')) {
		 
	    var dropdowns = document.getElementsByClassName("dropdown-content");
	    var i;
	    for (i = 0; i < dropdowns.length; i++) {
	      var openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('show')) {
	        openDropdown.classList.remove('show');
	      }
	    }
	  }
}

function date_validation(){
	var d = new Date();
	
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var startDate = $("#question_time").val();
	var startDateArr = startDate.split('-');
	console.log("선택 : " + startDateArr);
	
	var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
	var endDateCompare = new Date( d.getFullYear(), ((month<10 ? '0':'')+month)-1, (day<10 ? '0':'')+day);
	console.log("선택날짜 : " + startDateCompare );
	console.log("현재날짜: " + endDateCompare );
	
	if(startDateCompare.getTime() > endDateCompare.getTime()){
		swal({
			title:"실패",
			text:"날짜 선택을 다시해주세요.",
			type:"error"
		})
		return;
	}
}




