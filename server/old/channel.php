<?php
require('cget.php');
$data = _cget('http://www.lavaradio.com/api/radio.listChannelPrograms.json?channel_id='.$_GET['channel_id'], true);
$result=json_decode($data, true);
function rp($ori) {
    return htmlspecialchars($ori,ENT_COMPAT);
}
?>
<?xml version="1.0" encoding="utf-8"?>
<document>
   <listTemplate>
      <banner>
         <title>频道<?php echo $_GET['channel_id'];?></title>
      </banner>
      <list>
         <header>
            <title>音乐主题</title>
         </header>
         <section>
             <?php foreach($result['data']['lists'] as $key=>$value) {
                $url = 'http://www.lavaradio.com/api/play.playProgramNew.json?program_id='.$value['program_id'];
             ?>
            <listItemLockup onselect="playMusicList('<?php echo $url;?>')">
               <title><?php
                    if(ord(substr($value['program_name'],0,1))<32)
                        echo substr($value['program_name'], 1);
                    else echo $value['program_name'];
                ?></title>
               <relatedContent>
                  <lockup>
                     <img src="<?php echo $value['pic_url'];?>" width="857" height="482" />
<!--                     <title>Movie 1</title>-->
<!--                     <description>A brief description for the first movie should go here.</description>-->
                  </lockup>
               </relatedContent>
            </listItemLockup>
            <?php
            }
            ?>
         </section>
      </list>
   </listTemplate>
</document>
