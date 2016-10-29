<?php
require('cget.php');
$data = _cget('http://www.lavaradio.com/api/radio.listAllChannels.json?');
$channel = json_decode($data, true);
function rp($ori) {
   return htmlspecialchars($ori,ENT_COMPAT);
}
?>
<?xml version="1.0" encoding="utf-8"?>
<document>
  <catalogTemplate>
    <banner>
      <title>LavaRadio</title>
    </banner>
    <list>
      <section>
<?php
foreach($channel['data'] as $key=>$value) {
?>
        <listItemLockup>
          <title><?php echo $value['radio_name'];?></title>
          <decorationLabel><?php echo count($value['channels']); ?></decorationLabel>
          <relatedContent>
             <grid>
                <section>
<?php
   foreach($value['channels'] as $channel_key=>$channel_value) {
?>
                   <lockup alwaysShowTitles="true" onselect="getDocument('channel.php?channel_id=<?php echo $channel_value['channel_id']?>')">
                     <img src="<?php echo $channel_value['pic_url'];?>" width="250" height="376" />
                     <overlay position="bottom" size="small" backgroundColor="rgba(0,0,0,0.6)">
                       <subtitle><?php echo rp($channel_value['channel_name']);?></subtitle>
                     </overlay>
                     <title><?php echo rp($channel_value['channel_name']);?></title>
                   </lockup>
<?php
   }
?>
                 </section>
             </grid>
          </relatedContent>
        </listItemLockup>
<?php
}
?>
      </section>
    </list>
  </catalogTemplate>
</document>
