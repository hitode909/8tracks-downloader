exports.init = function init(window) {
    var EightTracks = {
        window: window,
        player: function() {
            return this.window.wrappedJSObject.player;
        },
	init: function(){
	    this.window.document.addEventListener('DOMNodeInserted',this,false);
	    this.window.document.addEventListener('click',this,true);
	},
	handleEvent: function(evt){
	    var target = evt.target;
	    switch(evt.type){
	    case 'DOMNodeInserted':
		if(/^now_playing/.test(target.className)){
		    require('timer').setTimeout(function(){
			EightTracks.downloadMp3(target);
		    },3000);
		}
		break;
		
	    case 'click':
		if(target.id === 'player_skip_button' && !evt.button){
		    this.skip();
		    evt.preventDefault();
		    evt.stopPropagation();
		}
		break;
	    }
	},
        downloadMp3: function(point) {
	    var artist = this.player().current_track_object.contributor;
	    var title = this.player().current_track_object.title;
	    var mp3 = this.player().current_track.url;
            var filename = artist + ' - ' + title + '.mp3';
            require("downloader").download(mp3, filename);
        },
	skip: function(){
	    W.JSONH.now('/sets/' + this.player().play_token + '/' + 'next', this.player().paramsHash(), function(json){
		if(json.success){
		    this.player().playTrack(json['track'],'play');
		}
	    });		
	}
    };
    
    EightTracks.init();
};