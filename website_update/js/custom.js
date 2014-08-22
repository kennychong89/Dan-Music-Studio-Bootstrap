/* Ajax load request for videos*/
$(".load-video").click(function(e) {
	// where our xml file is located at, currently in 'data' directory
	url = "data/videos.xml";

	// retrieve 'name' attribute value from parent
	var video_name = $(this).attr("name");

	// perform ajax get request
	$.get(url, function(data) {				
			var items = $(data).find("VIDEO_ITEM");

			items.each(function() {
				if ($(this).attr('name') == video_name) {
					// embed data into html
					var videoURL = $(this).find("URL").text();
					var videoTitle = $(this).find("TITLE").text();
					var videoDescription = $(this).find("DESCRIPTION").text();
	
					// update content section
					// using video.js as player
					var video_section = "<video width='640' height='360' id='player' class='video-js vjs-default-skin' preload='auto'></video>";

					// empty content section
					$('.media-content').empty();
							
					// append data			
					$('.media-content').append("<h2 class='lead'>" + videoTitle + "</h2>");
					$('.media-content').append(video_section);
					$('.media-content').append("<p>" + videoDescription + "</p>");
										
					videojs(player, { "techOrder": ["youtube"], "src": videoURL, "ytcontrols": "true" });	
				} 
			});
		});

				e.preventDefault();
});

/* For navigation scrolling */
function scrollToSection(sectionid, e) {
	var divTag = $("section[id='"+ sectionid + "']");
	$('html,body').animate({scrollTop: divTag.offset().top}, 'slow');

	e.preventDefault();
}

$("#instrlink").click(function(e) {
	scrollToSection('instructors', e);
});

$('#missionlink').click(function(e) {
	scrollToSection('about', e);
});

$('#eventlink').click(function(e) {
	scrollToSection('events', e);
});

$('#contactlink').click(function(e) {
	scrollToSection('contact', e);
});

$('[data-toggle="popover"]').popover({
	container: 'body', 
	placement:'auto left', 
	content: function() {
		return $(this).next('.bio').html();
	},
	trigger: 'click',
	html:true,
});
			
/* Configure Bootstrap popover */
$('.popoverThis').click(function (e) {
    e.stopPropagation();
});

$(document).click(function (e) {
    if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
        $('.popoverThis').popover('hide');
        $('.popover').remove();
    }
});