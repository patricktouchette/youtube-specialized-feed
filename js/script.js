var channelName = 'TechGuyWeb';
var vidWidth = 125;
var vidHeight = 100;
var vidResults = 20;

$(document).ready(function() {
	$.get(
		"https://www.googleapis.com/youtube/v3/channels", 
		{part: 'contentDetails',
		forUsername: channelName,
		key: 'AIzaSyDbUa-GHa-cE_uqvj86Z7RoH67fPsayP0o'},
		function(data) {
			$.each(data.items, function(i, item) {
					console.log(item);
					pid = item.contentDetails.relatedPlaylists.uploads;
					getVids(pid);
				})
		}
	);
	
	function getVids(pid){
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", 
			{part: 'snippet',
			maxResults: vidResults,
			playlistId : pid,
			key: 'AIzaSyDbUa-GHa-cE_uqvj86Z7RoH67fPsayP0o'},
			function(data) {
				var output;
				$.each(data.items, function(i, item) {
						console.log(item);
						videoTitle = item.snippet.title;
						videoId = item.snippet.resourceId.videoId;
						
						output='<li>'+videoTitle+'</li>';
						output='<li><iframe height="'+vidHeight+'" width="'+vidWidth+'" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
						
						//Append to results listStyleType
						$('#results').append(output);
					})
			}
		);	
	
	}	

	
});