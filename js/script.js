$(document).ready(function() {
	var key = "AIzaSyDbUa-GHa-cE_uqvj86Z7RoH67fPsayP0o"; //Upload this key to Github
	var playlistId = "PLWKjhJtqVAbmDGFE_pZ-PDJ1GWe3KtT-M";
	var URL = "https://www.googleapis.com/youtube/v3/playlistItems";

	var playLists = [
		"UUfV36TX5AejfAGIbtwTc7Zw", //Chris Hawkes
		"UUyUBW72KU30dfAYWLVNZO8Q", //Stefan Mischook
		"UU8butISFwT-Wl7EV0hUK0BQ", //freeCodeVamp
		"UU29ju8bIPH5as8OGnQzwJyA", //Traversy Media
		"UUwRXb5dUK4cvsHbx-rGzSgw", //Derek Banas
		"UUyIe-61Y8C4_o-zZCtO4ETQ", //Dev Tips
		"UUO1cgjhGzsSYb1rsB4bFe4Q", //Fun Fun Function
		"UUvjgXvBlbQiydffZU7m1_aw", //Coding Train
		"UUu44AnfqsP-sRxmZHdnhblw", //Dave Xiang
	]

	var options = {
		part: 'snippet',
		key : key,
		maxResults: 5,
		playlistId: playlistId
	}

	loadAllPlaylists();

	function loadAllPlaylists() {
		playLists.forEach(function(playlistId, i){
		// $.each(playLists, function(i, playlistId){
			options.playlistId = playlistId
			loadPlaylist(i);
		})
	}

	//Call Youtube data API for playlist information
	function loadPlaylist(row) {
        $.getJSON(URL, options, function (data){
            console.log(data) //TEMPORARY. TO BE REMOVED.
            var id = data.items["0"].snippet.resourceId.videoId
			$(".container").append(`<div class="row row-${row}">`)
            resultsLoop(data.items, row);
        })
    }

	//Loop through all video's in the playlist
	function resultsLoop(data, row){
		// $.each(data.items, function(i, item){ //jQuer Ajax
		console.log(data);
		data.forEach(function(item, i){
			var id = item.snippet.resourceId.videoId
			getVid(id, item, row)
		});
	}

	var videoAPIurl = "https://www.googleapis.com/youtube/v3/videos"
	var videoOptions = {
		part: 'snippet,contentDetails,statistics',
		key : key,
		id: ''
	}

	function getVid(id, item, row) {
		videoOptions.id = id;
		$.getJSON(videoAPIurl, videoOptions, function (videoData){
			var title = item.snippet.title
			var date = new Date(item.snippet.publishedAt)
			var date = date.toDateString()
			var thumbnailUrl = item.snippet.thumbnails.medium.url
			var channelTitle = item.snippet.channelTitle
			var duration = videoData.items["0"].contentDetails.duration
			var formattedTime = formatTime(duration);
			var viewCount = videoData.items["0"].statistics.viewCount
			var videoUrl = "https://www.youtube.com/watch?v=" + id
			var channelUrl = "https://www.youtube.com/channel/" + item.snippet.channelId
			$(`.row-${row}`).append(
				`<article>
					<div class="thumb-container">
						<a href="${videoUrl}" target="_blank">
							<img src="${thumbnailUrl}" alt="" class="thumbnail">
						</a>
						<div class="duration">${formattedTime}</div>
					</div>
					<div class="details">
						<a href="${videoUrl}" target="_blank">
							<p class="title">${title}</p></a>
						<a href="${channelUrl}" target="_blank">
							<p class="channel">${channelTitle}</p></a>
						<p class="date">${viewCount} views • ${date}</p>
					</div>
				</article>`
			)
		})
	}

	function formatTime(timeString){
		var timeArray = timeString.replace(/[PTS]/g,"").split(/[\D]/g)
		timeArray.forEach(function(t, index){
			if (t.length < 2){
				timeArray[index] = "0" + t
			}
		})
		return timeArray.join(":")

	}

}) //document.ready
