var getLavaHomeDoc = function(callback) {
    var url = 'http://www.lavaradio.com/api/radio.listAllChannels.json?';
    getHTTP(url, function(content) {
        //console.log("content="+content);
        var channel = JSON.parse(content);
        var docText = `<?xml version="1.0" encoding="utf-8"?>
            <document>
              <head>
                <style>
                .overlay_title {
                    background-color: rgba(0,0,0,0.6);
                    color: #FFFFFF;
                    text-align: center;
                }
                .overlay {
                    padding: 0;
                }
                </style>
              </head>
              <catalogTemplate>
                <banner>
                  <title>LavaRadio</title>
                </banner>
                <list>
                  <section>`;
        for (var value of channel['data']) {
            docText += `
                    <listItemLockup>
                      <title><![CDATA[${value['radio_name']}]]></title>
                      <decorationLabel>${value['channels'].length}</decorationLabel>
                      <relatedContent>
                         <grid>
                            <section>`;
            for (var channel_value of value['channels']) {
                docText += `
                               <lockup index="1" onselect="showChannel('${channel_value['channel_id']}', '${channel_value['channel_name']}')">
                                 <img src="${channel_value['pic_url']}" width="250" height="376" />
                                  <overlay class="overlay">
                                      <title class="overlay_title"><![CDATA[${channel_value['channel_name']}]]></title>
                                  </overlay>
                                 <!--title><![CDATA[${channel_value['channel_name']}]]></title-->
                               </lockup>`;
            }
            docText += `
                             </section>
                         </grid>
                      </relatedContent>
                    </listItemLockup>`;
        }
        docText += `
                  </section>
                </list>
              </catalogTemplate>
            </document>`;
        console.log("doc: "+docText);
        callback((new DOMParser).parseFromString(docText, "application/xml"));
    });
}

var showLavaHome = function() {
    getLavaHomeDoc(function(doc) {
        navigationDocument.replaceDocument(doc, getActiveDocument());
    });
}
