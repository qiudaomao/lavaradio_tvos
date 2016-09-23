var baseURL;
var player;
var musicListURL;

function log(str) {
    console.log("js log:"+str);
}

function playMusicList(music_list_url) {
    console.log('play music url:'+music_list_url);
    if (musicListURL == music_list_url) {
        player.present();
    } else {
        musicListURL = music_list_url;
        console.log("new play list: "+music_list_url);
        player.stop();
        getHTTP(music_list_url, function(c){
            var videoList = new Playlist();
            var result = JSON.parse(c)['data']['songs'];
            for (var i=0; i<result.length; i++) {
                var item = new MediaItem('audio', result[i]['audio_url']);
                item.title = result[i]['song_name']+' - '+result[i]['artists_name'];
                item.artworkImageURL = result[i]['pic_url'];
                item.description = result[i]['artists_name']+"《"+result[i]['salbums_name']+"》";
                item.subtitle = result[i]['artists_name']+"《"+result[i]['salbums_name']+"》";
                videoList.push(item);
                console.log("add songs:"+result[i]['song_name']);
            }
            player.playlist = videoList;
            player.play();
            console.log("play finished");
        });
    }
}

function playVideo(url,title,img_url) {
    console.log("zfu audio url:"+url+",title:"+title+', img_url:'+img_url);
    var singleVideo = new MediaItem('audio', url);
    singleVideo.title = title;
    singleVideo.artworkImageURL = img_url;
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
    console.log("play finish");
}

function loadingDoc() {
    var template = '<document><loadingTemplate><activityIndicator><text>LavaRadio加载中</text></activityIndicator></loadingTemplate></document>'; 
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    return parsedTemplate;
}

function getHTTP(url, callback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
        callback(templateXHR.responseText);
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}

function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    var loadingScreen = loadingDoc();
    log("getDocument "+extension);
    
    navigationDocument.pushDocument(loadingScreen);
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
        pushDoc(templateXHR.responseXML, loadingScreen);
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}

function pushDoc(document, loading) {
    var currentDoc = getActiveDocument();
    navigationDocument.replaceDocument(document, currentDoc);
    //navigationDocument.pushDocument(document);
}

App.onLaunch = function(options) {
    //baseURL = "http://localhost/appletv/";//options.BASEURL;
	var l = options.location;
    baseURL = l.substr(0,l.lastIndexOf('/')+1);
    console.log("zfu base URL is " + baseURL);
    player = new Player();
    musicListURL = "";
    //loadingDoc();
    var templateURL = "home.php";
    getDocument(templateURL);
}
