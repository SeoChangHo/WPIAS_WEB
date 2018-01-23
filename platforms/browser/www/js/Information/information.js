pageNum;

$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "informationpage") {
		$("#informationmain").css({"visibility":"hidden"});
		$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
		$(".item").css("height", (window.innerHeight*0.85).toFixed(0));
		pageNum =0;
	}
	
	if(window.innerWidth>410 && window.innerHeight>770){
		$("#infoheader").css("height","80px");
	}
	
});

$(document).on('pageshow', '#informationpage', function(event, data){
	
	$("#burnpage1").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
	$("#burnpage2").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white","font-weight":"bold"});
	$("#burnpage3").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white","font-weight":"bold"});
	

	$('.owl-carousel').owlCarousel({
	    margin:10,
	    nav:true,
	    items:1,
	    autoHeight: true
	});
	
	
	$('.owl-carousel').on('changed.owl.carousel', function(property){
		var current = property.item.index;
		
		$(".item").css("height", "auto");
		
		console.log("현재위치 : " + current);
		if(current==0){
			$("#burnpage1").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
			$("#burnpage2").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#burnpage3").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#information_main_img").attr("src","../img/information/burnkind.png");
			pageNum = 0;
		}else if(current==1){
			$("#burnpage1").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#burnpage2").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
			$("#burnpage3").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#information_main_img").attr("src","../img/information/firstaid.png");
			pageNum = 1;
		}else if(current==2){
			$("#burnpage1").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#burnpage2").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
			$("#burnpage3").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
			$("#information_main_img").attr("src","../img/information/static.png");
			pageNum = 2;
		}
	})
	
	
	if(data.prevPage.attr('id').substr(0, 4)=="burn"){
		$("#burnselector").trigger("to.owl.carousel", [1, 1, true]);
		pageNum = 1;
	}else if(data.prevPage.attr('id').substr(0, 4)=="stat"){
		$("#burnselector").trigger("to.owl.carousel", [2, 1, true]);
		pageNum = 2;
	}else{
		setTimeout(function(){
			$('.owl-carousel').trigger('next.owl.carousel');
			$('.owl-carousel').trigger('prev.owl.carousel');
		}, 300);
	} 
	
	setTimeout(function(){
		$("#informationmain").css({"visibility":"visible"});
	}, 300);

})


function burnpage1(){
	$("#burnpage1").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
	$("#burnpage2").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	$("#burnpage3").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	if(pageNum==1){
		$('.owl-carousel').trigger('prev.owl.carousel');
		pageNum=0; 
	}else if(pageNum==2){
		$('.owl-carousel').trigger('prev.owl.carousel');
		$('.owl-carousel').trigger('prev.owl.carousel');
		pageNum=0; 
	}
}

function burnpage2(){
	$("#burnpage1").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	$("#burnpage2").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
	$("#burnpage3").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	if(pageNum==0){
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=1;
	}else if(pageNum==2){
		$('.owl-carousel').trigger('prev.owl.carousel');
	}
}

function burnpage3(){
	$("#burnpage1").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	$("#burnpage2").css({"color":"gray", "text-shadow":"none","background":"white","font-size":"1em","border-bottom":"4px solid white"});
	$("#burnpage3").css({"color":"#4193cb", "text-shadow":"none","background":"white","font-weight":"bold","font-size":"1em","border-bottom":"4px solid #2b75bc"});
	if(pageNum==0){
		$('.owl-carousel').trigger('next.owl.carousel');
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=2;
	}else if(pageNum==1){
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=2;
	}
}

function burninfo(burn){
		
		setTimeout(function(){
			$.mobile.changePage("../burninfo/"+burn+".html", {transition:"slide"});
		},200)
		
}

function burnback(){
	setTimeout(function(){
		$.mobile.changePage("../information/information.html", {transition:"slide", reverse: true});
	},200)
}

function GobackToInfo()
{

		$.mobile.changePage("../information/information.html", {transition:"slide", reverse: true});

}


function statics1click()  
{
	$.mobile.changePage("../information/statistics1.html", {transition:"slide"});
}

function statics2click()
{
	$.mobile.changePage("../information/statistics2.html", {transition:"slide"});
}

function statics3click()
{
	$.mobile.changePage("../information/statistics3.html", {transition:"slide"});
}
 