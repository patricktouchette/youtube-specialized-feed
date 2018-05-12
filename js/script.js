var channelName = 'TechGuyWeb';

$(document).ready(function() {
	$.get(
		"https://www.googleapis.com/youtube/v3/channels", 
		{part: 'contentDetails',
		forUsername: channelName,
		key: 'AIzaSyC4rlwESm2_nfsf4J6hmLwO-PV-UcA34t4'},
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
			maxResults: 10,
			playlistId : pid,
			key: 'AIzaSyC4rlwESm2_nfsf4J6hmLwO-PV-UcA34t4'},
			function(data) {
				var output;
				$.each(data.items, function(i, item) {
						console.log(item);
						videoTitle = item.snippet.title;
						videoId = item.snippet.resourceId.videoId;
						
						output='<li>'+videoTitle+'</li>';
						output='<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
						
						//Append to results listStyleType
						$('#results').append(output);
					})
			}
		);	
	
	}	

	
});