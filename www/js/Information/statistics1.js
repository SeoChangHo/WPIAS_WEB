$(document).on("pagebeforechange", function (e, data) {
	if (data.toPage[0].id == "statistics1Page") {
		ShowStatistics()
	}
});