var musicListURL;
var player = new Player();

function mydecode(string) {
    return string.replace(/&#039;/g, '\'');
}

function getChannelDoc(channel_id, channel_title, callback) {
    var url = `http://www.lavaradio.com/api/radio.listChannelPrograms.json?channel_id=${channel_id}`;
    getHTTP(url, function(content) {
        var channel_data = JSON.parse(content);
        var docText = `
        <document>
           <stackTemplate>
              <banner>
                 <title><![CDATA[${channel_title} 频道${channel_id}]]></title>
              </banner>
              <collectionList>
                 <grid>
                    <section>`;
        for (var value of channel_data['data']['lists']) {
            docText += `
                        <lockup onselect="lavaPlayMusicList('${value['program_id']}')">
                          <img src="${value['pic_url']}" width="250" height="376" />
                          <title><![CDATA[${mydecode(value['program_name'])}]]></title>
                        </lockup>`;
        }
        docText += `
                    </section>
                 </grid>
              </collectionList>
           </stackTemplate>
        </document>`;
        console.log("doc: "+docText);
        callback((new DOMParser).parseFromString(docText, "application/xml"));
    });
}

function showChannel(channel_id, channel_title) {
    const loadingDocument = createLoadingDocument();
    navigationDocument.pushDocument(loadingDocument);
    getChannelDoc(channel_id, channel_title, function(doc) {
        navigationDocument.replaceDocument(doc, getActiveDocument());
    });
}

function lavaPlayMusicList(program_id) {
    var music_list_url = `http://www.lavaradio.com/api/play.playProgramNew.json?program_id=${program_id}`;
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
