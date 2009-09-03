// ==UserScript==
// @name        Growl Notifications
// @namespace   http://fluidapp.com
// @description Now playing Growl notifications for Lala
// @include     *
// @author      Adam Nolley
// @version     1.1
// ==/UserScript==

if (Header && !Header.prototype.__lala_Growl_updatePlaybackNowPlaying) {
	Header.prototype.__lala_Growl_updatePlaybackNowPlaying = Header.updatePlaybackNowPlaying;
	
	Header.prototype.updatePlaybackNowPlaying = function(event) {
		if (event.status == "playing") {			
			window.fluid.showGrowlNotification({
				title: event.data.song.title, 
				description: event.data.song.artist + ((event.data.song.discTitle) ? "\n" + event.data.song.discTitle : ""),
				sticky: false,
				identifier: "Now Playing",
				icon: "http://album-images.lala.com/servlet/ArtWorkServlet/" + event.data.song.discLalaId
			});
		}
		Header.g.__lala_Growl_updatePlaybackNowPlaying(event);
	};
}
