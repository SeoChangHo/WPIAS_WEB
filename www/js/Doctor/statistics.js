pageNum=1;
var Chart1Show=false;
var Chart2Show=false;
var Chart3Show=false;

$(document).on("pagebeforechange", function (e, data) {
		
	if (data.toPage[0].id == "statisticspage")
	{
		$('.owl-carousel').owlCarousel({
		    loop:false,
		    margin:10,
		    nav:true,
		    items:1
		});
		Chart1Show=false; 
		Chart2Show=false;
		Chart3Show=false;   

	}
})

$(document).on('pageshow', '#statisticspage', function(event, data){

	$('.owl-carousel').on('changed.owl.carousel', function(property){
		var current = property.item.index;
		console.log(current);
		if(current==0){
			$("#staticpage1").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			
			if (Chart1Show == false)
				{
				Chart1Show = true;
				ShowStatistics();
				}
			
			pageNum = 1;
		}else if(current==1){
			$("#staticpage2").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	

			if (Chart2Show == false)
			{
			Chart2Show = true;
			ShowPartStatistiscs();
			}
			
			pageNum = 2;
		}else if(current==2){
			$("#staticpage3").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			
			if (Chart3Show == false)
			{
			Chart3Show = true;
			var Year =new Date().getFullYear();
			SelectBoxSetting(Year)
			ShowDayStatistics(Year);
			}

			pageNum = 3;
		}
	})
});
function getFirebaseDB()
{
	FirebaseCall();
	
	//통계 총합
	var Totalcount=0;
	
	//화상 1차경로
	var burnstyle1count = 0;
	var burnstyle2count = 0;
	var burnstyle3count = 0;
	var burnstyle4count = 0;
	var burnstyle5count = 0;
	var burnstyle6count = 0;
	var burnstyle7count = 0;
	var burnstyle8count = 0;
	var burnstyle9count = 0;
	var burnstyle10count = 0;
	var burnstyle11count = 0;
	
	
	
	var StatisticsDB = firebase.database().ref().child('Question');
	
	StatisticsDB.once('value', function(snapshot)
			{
		  snapshot.forEach(function(snap) {
//			    console.log(snap.child('burnstyle').val());		    
//			    console.log(snap.child('burndetail').val());		

			    
			    
			    var i = snap.child('burnstyle').val();
			    
			    switch (i) {
			    case "1"    : burnstyle1count++
			    	break;
			    	
			    case "2"    : burnstyle2count++
                break;
                
			    case "3"    : burnstyle3count++
                break;
                
			    case "4"    : burnstyle4count++
                break;
                
			    case "5"    : burnstyle5count++
                break;
                
			    case "6"    : burnstyle6count++
                break;
                
			    case "7"    : burnstyle7count++
                break;
                
			    case "8"    : burnstyle8count++
                break;
                
			    case "9"    : burnstyle9count++
                break;
                
			    case "10"    : burnstyle10count++
                break;
			  }		    
			    Totalcount++;
			  });
		  		TransferCount(burnstyle1count, burnstyle2count, burnstyle3count, burnstyle4count, burnstyle5count, burnstyle6count, burnstyle7count, burnstyle8count, burnstyle9count, burnstyle10count, Totalcount)
			})
}

function TransferCount(case1, case2, case3, case4, case5 ,case6, case7, case8, case9, case10, total)
{

	
	
	var ctx = document.getElementById("myChart").getContext('2d');
	var ctxdiv=$("#myChart");
	ctxdiv.show()
	var myChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    data: {
	        labels: ["열탕화상", "화염화상", "전기화상", "접촉화상", "저온화상", "화학화상", "증기화상","마찰화상", "햇빛화상", "흡입화상"],
	        datasets: [{
	            label: '# 화상 경로 분포',
	            data: [case1, case2, case3, case4, case5, case6, case7, case8, case9, case10],
	            backgroundColor: [
	                'rgba(235, 115, 115, 0.8)',
	                'rgba(235, 184, 115, 0.8)',
	                'rgba(9, 29, 192, 0.8)',
	                'rgba(235, 115, 207, 0.8)',
	                'rgba(95, 210, 255, 0.8)',
	                'rgba(103, 77, 255, 0.8)',
	                'rgba(0, 231, 141, 0.8)',
	                'rgba(177, 115, 255, 0.8)',
	                'rgba(190, 233, 17, 0.8)',
	                'rgba(0, 136, 161, 0.8)'
	            ],
	            borderColor: [
	            	'rgba(235, 115, 115, 1)',
	                'rgba(235, 184, 115, 1)',
	                'rgba(9, 29, 192, 1)',
	                'rgba(235, 115, 207, 1)',
	                'rgba(95, 210, 255, 1)',
	                'rgba(103, 77, 255, 1)',
	                'rgba(0, 231, 141, 1)',
	                'rgba(177, 115, 255, 1)',
	                'rgba(190, 233, 17, 1)',
	                'rgba(0, 136, 161, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	legend: {
	    	    display: false,
	    	},
	    	scales: {
	            xAxes: [{
	                ticks: {
	                    beginAtZero:true,
	                },
	                display: true,
	                
	            }]
	        },
	        onClick : function(mouseEvent,chart){
	               
	        	
	        	if(chart.length!=0)
	        		{
	               var label=[];
	        		  console.log(chart[0]._index+1+" 번째 그래프 클릭");
	               var burnstyle = (chart[0]._index+1).toString();	               
	               const clickburnDB = firebase.database().ref().child("Question").orderByChild('burnstyle').equalTo(burnstyle);
	               
	               var burnDetailCountDB = firebase.database().ref().child("Burnlist/"+burnstyle);
	               
	               burnDetailCountDB.once('value', function(snapCount)
	            		   {
	            	   
	            	   			var Arrcount =0;
	            	   			var ListCount = snapCount.numChildren();
	            	   			
	            	   			var dataset=new Array(ListCount);
	            	   			
	            	   			for(var i=0; i<ListCount; i++)
	            	   				{
	            	   				 dataset[i] = 0;
	            	   				}
	            	   			
	            	   			console.log("ListCount: "+ListCount);
	            	   			
	            	   			
	            	   			snapCount.forEach(function(snap) 
	            	   					{
	            	   						label[Arrcount]= snap.val()
	            	   						Arrcount++
	            	   					})
	            	   				   console.log(label);
	            	   			
	            	   			//////////////
	         	               clickburnDB.once('value', function(snapshot)
	        	            		   {
	        	            	   			snapshot.forEach(function(snap) 
	        	            	   					{
	        	            	   							console.log(snap.child('burndetail').val());
	        	            	   							
	        	            	   							
	        	            	   							var detailvalue = Number(snap.child('burndetail').val())
	        	            	   							dataset[detailvalue-1]=dataset[detailvalue-1]+1;
	        	            	   					})
	        	            	   					
	               	   					swal
	               	   					({
	               	   							html:'<canvas id="pieChart" width=200 height=200></canvas>'
	               	   					})
	               	   			
	            	   						ShowStatisticsDetail(label, dataset);

	        	            		   })
	        	            		   
	        	            		   ///////////
	            		   })   
	        		}
	            },
	        tooltips: {
	                enabled: false
	            },
	            title: {
	  		      display: true,
	  		      text: 'Number of cases by burn type'
	  		    }
	    },

	});
}

function ShowStatistics()
{
	getFirebaseDB()
}

function ShowStatisticsDetail(label, dataset)
{

	var data = {
		    datasets: [{
		        data: dataset,
		        backgroundColor: [
		            "#FF6384",
		            "#4BC0C0",
		            "#FFCE56",
		            "#E7E9ED",
		            "#36A2EB",
		            "#AF6384",
		            "#4A14C0",
		            "#AA5156",
		            "#EEA114",
		            "#FC5513"
		        ],
		        label: 'My dataset' // for legend
		    }],
		    labels: label
		};

		var pieOptions = {
				
			legend: {
				position:'bottom',
				verticalAlign: "left",
				horizontalAlign:"bottom",
				generateLabels:  function (chart) {
				    chart.legend.afterFit = function () {
				      var width = this.width; // guess you can play with this value to achieve needed layout
				      this.lineWidths = this.lineWidths.map(function(){return width;});

				    };
				    // here goes original or customized code of your generateLabels callback
				}
			    },
		  events: false,
		  animation: {
		    duration: 500,
		    easing: "easeOutQuart",
		    onComplete: function () {
		      var ctx = this.chart.ctx;
		      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
		      ctx.textAlign = 'center';
		      ctx.textBaseline = 'bottom';

		      this.data.datasets.forEach(function (dataset) {

		        for (var i = 0; i < dataset.data.length; i++) {
		          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
		              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
		              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
		              start_angle = model.startAngle,
		              end_angle = model.endAngle,
		              mid_angle = start_angle + (end_angle - start_angle)/2;

		          var x = mid_radius * Math.cos(mid_angle);
		          var y = mid_radius * Math.sin(mid_angle);

		          ctx.fillStyle = '#fff';
		          if (i == 3){ // Darker text color for lighter background
		            ctx.fillStyle = '#444';
		          }
		          var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
		          
		          if(dataset.data[i]!=0)
		        	  {
		          ctx.fillText(label[i]+" ("+dataset.data[i]+"건)", model.x + x, model.y + y);
		          // Display percent in another line, line break doesn't work for fillText
		          ctx.fillText(percent, model.x + x, model.y + y + 15);
		        	  }
		        }
		      });               
		    }
		  }
		};

		var pieChartCanvas = $("#pieChart");
		var pieChart = new Chart(pieChartCanvas, {
		  type: 'pie', // or doughnut
		  data: data,
		  options: pieOptions
		});
}


function ShowPartStatistiscs()
{
	
var WoundAreaDB = firebase.database().ref().child('Question');
	
	
	var bodylebelsArr = new Array(13);
	
	for(var i=0; i<13; i++)
	{
		bodylebelsArr[i] = 0;
	}
	WoundAreaDB.once('value', function(snapshot)
			{
		
		
		snapshot.forEach(function(snap) 
				{
					var Area = snap.child("bodystyle").val();
					bodylebelsArr[Area-1] = bodylebelsArr[Area-1]+1 
				})		
				

				console.log(bodylebelsArr);
				var ctx = document.getElementById("myBodyChart").getContext('2d');
				var ctxdiv=$("#myBodyChart");
				ctxdiv.show()
				var myChart = new Chart(ctx, {
				    type: 'horizontalBar',
				    data: {
				        labels: ["머리", "어깨", "가슴", "등", "배", "허리", "팔","손", "음부", "엉덩이", "다리", "발", "호흡기"],
				        datasets: [{
				            label: '# 화상 경로 분포',
				            data: bodylebelsArr,
				            backgroundColor: [
				                'rgba(224, 85, 92, 0.8)',
				                'rgba(251, 112, 85, 0.8)',
				                'rgba(214, 205, 106, 0.8)',
				                'rgba(168, 178, 104, 0.8)',
				                'rgba(104, 187, 161, 0.8)',
				                'rgba(112, 104, 195, 0.8)',
				                'rgba(156, 98, 174, 0.8)',
				                'rgba(191, 85, 206, 0.8)',
				                'rgba(254, 110, 226, 0.8)',
				                'rgba(211, 85, 132, 0.8)',
				                'rgba(213, 84, 99, 0.8)',
				                'rgba(244, 85, 92, 0.8)',
				                'rgba(160, 140, 140, 0.8)'
				            ],
				            borderColor: [
				            	'rgba(224, 85, 92, 1)',
				                'rgba(251, 112, 85, 1)',
				                'rgba(214, 205, 106, 1)',
				                'rgba(168, 178, 104, 1)',
				                'rgba(104, 187, 161, 1)',
				                'rgba(112, 104, 195, 1)',
				                'rgba(156, 98, 174, 1)',
				                'rgba(191, 85, 206, 1)',
				                'rgba(254, 110, 226, 1)',
				                'rgba(211, 85, 132, 1)',
				                'rgba(213, 84, 99, 1)',
				                'rgba(244, 85, 92, 1)',
				                'rgba(160, 140, 140, 1)'
				            ],
				            borderWidth: 1
				        }]
				    },
				    options: {
				    	legend: {
				    	    display: false,
				    	},
				    	scales: {
				            xAxes: [{
				                ticks: {
				                    beginAtZero:true,
				                },
				                display: true,
				                
				            }]
				        },
			 onClick : function(mouseEvent,chart){
				               
				        	
				        	if(chart.length!=0)
				        		{
				               var label=[];
				        		  console.log(chart[0]._index+1);
				               var bodystyle = (chart[0]._index+1).toString();	               
				               const clickburnDB = firebase.database().ref().child("Question").orderByChild('bodystyle').equalTo(bodystyle);
				               
				               var burnDetailCountDB = firebase.database().ref().child("Burnarea/"+bodystyle);
				               
				               burnDetailCountDB.once('value', function(snapCount)
				            		   {
				            	   
				            	   			var Arrcount =0;
				            	   			var ListCount = snapCount.numChildren();
				            	   			
				            	   			var dataset=new Array(ListCount);
				            	   			
				            	   			for(var i=0; i<ListCount; i++)
				            	   				{
				            	   				 dataset[i] = 0;
				            	   				}
				            	   			
				            	   			console.log("ListCount: "+ListCount);
				            	   			
				            	   			
				            	   			snapCount.forEach(function(snap) 
				            	   					{
				            	   						label[Arrcount]= snap.val()
				            	   						Arrcount++
				            	   					})
				            	   				   console.log(label);
				            	   			
				            	   			//////////////
				         	               clickburnDB.once('value', function(snapshot)
				        	            		   {
				        	            	   			snapshot.forEach(function(snap) 
				        	            	   					{
				        	            	   							console.log(snap.child('bodydetail').val());
				        	            	   							
				        	            	   							
				        	            	   							var detailvalue = Number(snap.child('bodydetail').val())
				        	            	   							dataset[detailvalue-1]=dataset[detailvalue-1]+1;
				        	            	   					})
				        	            	   					
				               	   					swal
				               	   					({
				               	   							html:'<canvas id="pieChart" width=200 height=200></canvas>'
				               	   					})
				               	   			
				            	   						ShowStatisticsDetail(label, dataset);

				        	            		   })
				        	            		   
				        	            		   ///////////
				            		   })   
				        		}
				            },
				        tooltips: {
				                enabled: false
				            },
				            title: {
				  		      display: true,
				  		      text: 'Number of burns by body part'
				  		    },
				  		    
				    },

				});
			})			
			
	
}


function ShowDayStatistics(SelectYear)
{
	
	var DateDB = firebase.database().ref().child('Question');
	
	DateDB.once('value', function(snapshot)
			{
				var monthsArr = new Array(12);
				
				for(var i=0; i<12; i++)
					{
					monthsArr[i]=0;
					}
	
				snapshot.forEach(function(snap) 
						{
							if(SelectYear==snap.child('date').val().substring(0, 4))
								{
									var month = snap.child('date').val().substring(4, 6);
									var numericmonth=Number(month)-1;
									monthsArr[numericmonth] = monthsArr[numericmonth]+1;
								}
						})
						
				var ctx = $("#line-chart");
				var ctxdiv=$("#line-chart");
				ctxdiv.show()
				var linechart = new Chart(document.getElementById("line-chart"), {
					  type: 'line',
					  data: {
					    labels: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
					    datasets: [{ 
					        data: monthsArr,
					        label: "Number of Questions",
					        lineTension: 0.2, //걲은선 각도 0~1 사잇값 넣으세요
					        borderColor: "#3e95cd",
					        fill: false
					      }
					    ]
					  },
					  options: {
					    	legend: {
					    	    display: false,
					    	},
					    	scales: {
					            yAxes: [{
					                ticks: {
					                    // 수수점 없애기
					                    callback: function(value, index, values) {
					                    	if (Math.floor(value) === value) {
					                            return value;
					                        }
					                    },
					                    beginAtZero:true
					                }
					            }]
					        },
					    	title: {
					      display: true,
					      text: SelectYear+' Monthly Number of Questions'
					    },
					    tooltips: {
			                enabled: true
			            }
			            
					  }
					});		
			})
}

function SelectYearChange()
{
	ShowDayStatistics($('#SelectYear').val());
}

function SelectBoxSetting(Year)
{
	 var SelectBox = document.getElementById('SelectYear');
	 var count = 0;
	 var NumericYear = Number(Year)
	 for(var i = NumericYear; i>NumericYear-5; i--)
		 {
		 	SelectBox.options[count] = new Option(i+'년',i);
		 	
			
			 
		 	count++
		 }
	 $('#SelectYear option:eq(0)').attr("selected", "selected");
	 $('#SelectYear').selectmenu().selectmenu('refresh', true);

}







function staticpage1(){
	$("#staticpage1").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
	$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	if(pageNum==2){
		$('.owl-carousel').trigger('prev.owl.carousel');
		pageNum=1; 
	}else if(pageNum==3){
		$('.owl-carousel').trigger('prev.owl.carousel');
		$('.owl-carousel').trigger('prev.owl.carousel');
		pageNum=1; 
	}
}

function staticpage2(){
	$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	$("#staticpage2").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
	$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	if(pageNum==1){
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=2;
	}else if(pageNum==3){
		$('.owl-carousel').trigger('prev.owl.carousel');
		pageNum=2;
	}
}

function staticpage3(){
	$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
	$("#staticpage3").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
	if(pageNum==1){
		$('.owl-carousel').trigger('next.owl.carousel');
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=3;
	}else if(pageNum==2){
		$('.owl-carousel').trigger('next.owl.carousel');
		pageNum=3;
	}
}

