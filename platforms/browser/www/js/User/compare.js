var seq;

$(document).on('pagebeforechange', function(e, data){
	if (data.toPage[0].id == "comparepage") {
		
	}
});

$(document).on('pageshow', '#comparepage', function(event, data){
	$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
	
	$('.loop').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 5,
        autoHeight: true
    });
	
	var photoheight = (window.innerHeight*0.3).toFixed(0);
	var realheight = (window.innerHeight*0.3).toFixed(0);
	
	$("#compare_photo_div").css({"height":photoheight});
	$("#compare_photo_real").css({"height":photoheight});
	$(".compare_burn_kind").css({"height":realheight});
	
	$("#burnimg_body").show();
	$("#burnimg_body").css({"visibility":"inherit"});
	
})

function AutoSelect(getBurnStyle)
{
	if(getBurnStyle=="10")
	{
	  swal({
				type: 'warning',
				title: 'Sorry',
				text: '흡입화상은 비교하기를 제공하지 않습니다.'
			  })
	}
	else
	{
	$('#compare_MyQList').hide();
	$("#compare_picture_select ul").css({"padding":"0"});
	$("#compare_picture_select li").css({"width":"33.3%","margin":"0","padding":"0","box-shadow":"none","border-radius":"0px"});
	$(".compare_select_img").css({"padding-left":"10%"});
	$(".compare_select_sub").hide();
	if(window.innerWidth<361){
		$(".compare_select_text").css({"width":"63%","font-size":"0.9em","padding":"5% 0 0 0","font-weight":"light"});
	}else{
		$(".compare_select_text ").css({"width":"63%","font-size":"1em","padding":"5% 0 0 0","font-weight":"light"});
	}
	$("#compare_box").show();
	setTimeout(function(){
		$('.owl-carousel').trigger('next.owl.carousel');
	},100)
	setTimeout(function(){
		$('.owl-carousel').trigger('next.owl.carousel');
	},200)
	setTimeout(function(){
		$('.owl-carousel').trigger('next.owl.carousel');
	},300)
	
	var count=0;
	var CompareDB = firebase.database().ref('Compare/'+getBurnStyle);
	switch(getBurnStyle)
	{
	case "1": var burnstyle="열탕화상"; break;
	case "2": var burnstyle="화염화상"; break;
	case "3": var burnstyle="전기화상"; break;
	case "4": var burnstyle="접촉화상"; break;
	case "5": var burnstyle="저온화상"; break;
	case "6": var burnstyle="화학화상"; break;
	case "7": var burnstyle="증기화상"; break;
	case "8": var burnstyle="마찰화상"; break;
	case "9": var burnstyle="햇빛화상"; break;
	}
	
	
	CompareDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							
							count++;
							$("#BurnImg"+count+" .compare_burn_style").html(burnstyle);
							$("#BurnImg"+count+" img").attr('src', snapshot.child('url').val());
							$("#BurnImg"+count+" .CompareStatus").html(snapshot.child('status').val());
							$("#BurnImg"+count+" .CompareContents").html(snapshot.child('contents').val());
						})
			})
	}
}

function CompareGetMyPic()
{
	const getMyBurnInfoDB = firebase.database().ref('Question').orderByChild('uid').equalTo($('#index_uid').html());
	getMyBurnInfoDB.once('value', function(snap)
			{
				if(snap.numChildren()==0)
					{
						swal
						({
							type:'warning',
							title:'질문이 없습니다.',
							text:'새로운 질문을 등록해보세요!'
						})
					}
				else
					{
					
					$("#compare_picture_select ul").css({"padding":"0"});
					$("#compare_picture_select li").css({"width":"33.3%","margin":"0","padding":"0","box-shadow":"none","border-radius":"0px"});
					if(window.innerWidth<361){
						$(".compare_select_text").css({"width":"63%","font-size":"0.9em","padding":"5% 0 0 0","font-weight":"light"});
					}else{
						$(".compare_select_text ").css({"width":"63%","font-size":"1em","padding":"5% 0 0 0","font-weight":"light"});
					}
					$(".compare_select_img").css({"padding-left":"10%"});
					$(".compare_select_sub").hide();
					
					CompareQList()
					
					

					}

			})
				
}
function CompareQList()
{
	ShowGIF("../img/giphy.gif");
	$("#compare_MyQList").css("visibility","hidden");
	FirebaseCall();
	$('#compare_MyQList').html('');
	$('#compare_MyQList').show();
	$("#compare_box").hide();
	var uid = $('#index_uid').html();
	const MyAnswerDB = firebase.database().ref('Question').orderByChild('uid').equalTo(uid)
	
	if(window.innerWidth<361){
		
	}
	
	MyAnswerDB.once('value', function(snap)
			{								
					snap.forEach(function(snapshot)
								{
							if(snapshot.child('burnstyle').val()=="1"){
								var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "열탕화상";
								var backgroundcolor = "style='background:rgba(255,115,115,1)'";
							}else if(snapshot.child('burnstyle').val()=="2"){
								var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "화염화상";
								var backgroundcolor = "style='background:rgba(255,184,115,1)'";
							}else if(snapshot.child('burnstyle').val()=="3"){
								var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "전기화상";
								var backgroundcolor = "style='background:rgba(29,29,192,1)'";
							}else if(snapshot.child('burnstyle').val()=="4"){
								var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "접촉화상";
								var backgroundcolor = "style='background:rgba(255,115,207,1)'";
							}else if(snapshot.child('burnstyle').val()=="5"){
								var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "저온화상";
								var backgroundcolor = "style='background:rgba(115,210,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="6"){
								var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "화학화상";
								var backgroundcolor = "style='background:rgba(123,77,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="7"){
								var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "증기화상";
								var backgroundcolor = "style='background:rgba(0,231,141,1)'";
							}else if(snapshot.child('burnstyle').val()=="8"){
								var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "마찰화상";
								var backgroundcolor = "style='background:rgba(197,115,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="9"){
								var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "햇빛화상";
								var backgroundcolor = "style='background:rgba(210,233,17,1)'";
							}else if(snapshot.child('burnstyle').val()=="10"){
								var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "흡입화상";
								var backgroundcolor = "style='background:rgba(0,136,161,1)'";
							}
							
							
							var Fulldate = snapshot.child('date').val();
							var YearVal =  Fulldate.substr(0,4);
							var MonthVal = Fulldate.substr(4,2);
							var DayVal = Fulldate.substr(6,2);	
							var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
							
							const GetPicDB = firebase.database().ref('Case/'+snapshot.key).orderByChild('visible').equalTo("true")
							GetPicDB.limitToLast(1).once('value', function(casesnap)
									{
									casesnap.forEach(function(casesnapshot)
												{
													var PicListStruct ="<ul onclick='CompareQSelect(\""+snapshot.key+"\")'>"
													+"<li class='comparepage_li0'><div><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%' ></div></li>"
													+"	<li class='comparepage_li1'><div class='comparepage_main'>"+snapshot.child('title').val()+"</div>"
													+"		  <div class='comparepage_date'>"+DesignDate+"</div></li>"
													+"	<li class='comparepage_li2'><div class='comparepage_img'>"+nodeimg+"</div></li>"
													+"</ul>";
													
													document.getElementById('compare_MyQList').insertAdjacentHTML('afterBegin',PicListStruct)
												})
									})
					})
				})
				
		setTimeout(function(){
			HideGIF();
			$("#compare_MyQList").css("visibility","visible");
		}, 2000)
}


function CompareQSelect(getseq)
{
	console.log(getseq);
	
	swal({
		title:"사진선택",
		html:"<img id='DivPickImg'></div><div id='DivImgContainer'></div>",
		showCancelButton:true,
		allowOutsideClick:false
	}).then(function()
			{
				$("#compare_photo_back").attr('src', $('#DivPickImg').attr('src'));
				$("#compare_photo").attr('src', $('#DivPickImg').attr('src'));
				
				var getBurnInfoDB = firebase.database().ref('Question/'+getseq);
				getBurnInfoDB.once('value', function(snap)
						{
							console.log('burnstyle: '+snap.child('burnstyle').val());
							console.log('burndetail: '+snap.child('burndetail').val());
							console.log('bodystyle: '+snap.child('bodystyle').val());
							console.log('bodydetail: '+snap.child('bodydetail').val());
							$("#compare_MyQList").hide();
							AutoSelect(snap.child('burnstyle').val());
						})
			},
			 function (dismiss) {
				  if (dismiss === 'cancel') {
					 console.log('cancel');
				  }
				})
			
			
var uid = $("#index_uid").html();
var StorageRef = firebase.storage().ref();
var ImageContainer="";
var count=0;
var picnum=0;

const MyQuestionDB = firebase.database().ref('Question').orderByChild('uid').equalTo(uid);


	const MyPicDB = firebase.database().ref('Case/'+getseq).orderByChild('visible').equalTo("true")
	MyPicDB.once('value', function(childsnap)
			{
		picnum = picnum+(childsnap.numChildren()*2)
		console.log(picnum);
				childsnap.forEach(function(childsnapshot)
						{
								count++;	
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+getseq+" id='GetImg"+count+"' onclick='swalDivClick(this.id)'>"
															  +  "<img width='100%' src="+childsnapshot.child('imgurl1').val()+">")
															  +"</div>";

								count++;
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+getseq+" id='GetImg"+count+"' onclick='swalDivClick(this.id)'>"
								  								+  "<img width='100%' src="+childsnapshot.child('imgurl2').val()+">")
								  								+"</div>";
								if(count==picnum)
								{
									$("#DivPickImg").attr('src', childsnapshot.child('imgurl1').val());
									seq=getseq;
									src=childsnapshot.child('imgurl1').val();
								}
						})														
			})								

}


function swalDivClick(getDivId)
{
	var src = $('#'+getDivId).find('img').attr('src');
	seq = $('#'+getDivId).data('seq')
	$('#DivPickImg').attr('src', src);
	
	console.log(seq);
}


//직접활영
function compare_shot()
{
	
	var options = {
			quality:100,
			allowEdit: true,
		    targetWidth: 640,
		    targetHeight: 640,
			destinationType: Camera.DestinationType.DATA_URL,
		    correctOrientation: true
	}
	
	navigator.camera.getPicture(this.CompareonSuccess, this.onError, options);
}





//직접촬영 성공시
var CompareonSuccess = function(imgData)
{
	try
	{
		$("#compare_photo").attr("src", "data:image/jpeg;base64, "+imgData);
		$("#compare_photo_back").attr("src","data:image/jpeg;base64, "+imgData);
		
		
		swal({
			  title: '화상 원인',
			  input: 'select',
			  inputOptions: {
			    '1': '열탕화상',
			    '2': '화염화상',
			    '3': '전기화상',
			    '4': '접촉화상',
			    '5': '저온화상',
			    '6': '화학화상',
			    '7': '증기화상',
			    '8': '마찰화상',
			    '9': '햇빛화상',
			    '10': '흡입화상'
			  },
			  inputPlaceholder: '화상원인을 선택해주세요.',
			  showCancelButton: false,
			  allowOutsideClick:false,
			  inputValidator: function (value) {
			    return new Promise(function (resolve, reject) {
				      if (value) {	    	  
				    	  resolve()
				      } else {
				        reject('화상원인을 선택해주셔야 합니다')
				      }
				    })
				  }
			}).then(function (result)  
			{
				AutoSelect(result);
			})
		

	}
	catch(error)
	{
		alert(error.message);
	}
}

//촬영실패
var onError = function(msg)
{
	alert(msg);
}

//앨범에서 사진 선택하기
function compare_picture(){
	navigator.camera.getPicture(comparephotoURI, onError, {
		quality: 100,
		allowEdit: true,
	    targetWidth: 640,
	    targetHeight: 640,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY
	});
}


//앨범에서 사진 선택하기 성공
function comparephotoURI(imgURI){
	$("#compare_photo").attr("src", imgURI);
	$("#compare_photo_back").attr("src",imgURI);
	
	swal({
		  title: '화상 원인',
		  input: 'select',
		  inputOptions: {
		    '1': '열탕화상',
		    '2': '화염화상',
		    '3': '전기화상',
		    '4': '접촉화상',
		    '5': '저온화상',
		    '6': '화학화상',
		    '7': '증기화상',
		    '8': '마찰화상',
		    '9': '햇빛화상',
		    '10': '흡입화상'
		  },
		  inputPlaceholder: '화상원인을 선택해주세요.',
		  showCancelButton: false,
		  allowOutsideClick:false,
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
			      if (value) {	    	  
			    	  resolve()
			      } else {
			        reject('화상원인을 선택해주셔야 합니다')
			      }
			    })
			  }
		}).then(function (result)  
		{
			AutoSelect(result);
		})
}

//부위별로 선택하기
function compare_select_face(){
	$("#burnimg_face").show();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_face").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_body(){
	$("#burnimg_face").hide();
	$("#burnimg_body").show();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_body").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_pelvis(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").show();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_pelvis").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_hip(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").show();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_hip").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_arm(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").show();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_arm").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_hand(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").show();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_hand").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_leg(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").show();
	$("#burnimg_foot").hide();
	setTimeout(function(){
		$("#burnimg_leg").css({"visibility":"inherit"});
	}, 700)
}

function compare_select_foot(){
	$("#burnimg_face").hide();
	$("#burnimg_body").hide();
	$("#burnimg_pelvis").hide();
	$("#burnimg_hip").hide();
	$("#burnimg_arm").hide();
	$("#burnimg_hand").hide();
	$("#burnimg_leg").hide();
	$("#burnimg_foot").show();
	setTimeout(function(){
		$("#burnimg_foot").css({"visibility":"inherit"});
	}, 700)
}


function compare_left(){
	$('.loop2').trigger('next.owl.carousel');	
}

function img_slide(slide){
	if(slide=="left"){
		$('.loop').trigger('prev.owl.carousel');
	}else{
		$('.loop').trigger('next.owl.carousel');
	}
}