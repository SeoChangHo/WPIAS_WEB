function ShowGIF(IMGsrc)
{
	var scrollTop = $(window).scrollTop();
	var scrollHeight = document.getElementById($.mobile.activePage.attr('id')).scrollHeight;
	var scrollBottom = scrollHeight -$(window).scrollTop();
	
	
	if($("#LoadingGIF").length==0)
	{
	
		$("<img/>", { src: IMGsrc , id:"LoadingGIF"}).css({  
			position: "fixed",
			padding: "7px",
			"text-align": "center",
			width: "180px",
			position:"inherit",
			"z-index":"10",
			background: "transparent",
			left: ($(window).width() - 194)/2, //      (width + padding*2)/2 이여야 한다 창호님아
			top: (scrollHeight-scrollBottom)+window.innerHeight/2.5}).appendTo("#"+$.mobile.pageContainer.pagecontainer('getActivePage').attr('id'));
	
	}
	else
	{
		$("#LoadingGIF").show();
	}
}

function HideGIF()
{
	$("#LoadingGIF").hide();
}
