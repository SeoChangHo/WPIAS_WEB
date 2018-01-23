$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "statistics3Page") {
		var Year =new Date().getFullYear();
		SelectBoxSetting(Year)
		ShowDayStatistics(Year);
	}
});