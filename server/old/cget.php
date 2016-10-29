<?php
    const USER_AGENT = 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36';
    const REFERER = 'http://www.lavaradio.com';
    const FORM_ENCODE = 'GBK';
    const TO_ENCODE = 'UTF-8';

    function _cget($url,$convert=false,$timeout=10){
        $ch=curl_init($url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_TIMEOUT,$timeout);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
        curl_setopt($ch,CURLOPT_USERAGENT,USER_AGENT);
        curl_setopt($ch,CURLOPT_REFERER,REFERER);
        curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1); //跟随301跳转
        curl_setopt($ch,CURLOPT_AUTOREFERER,1); //自动设置referer
        $res=curl_exec($ch);
        curl_close($ch);
        if($convert){
            $res=mb_convert_encoding($res,TO_ENCODE,FORM_ENCODE);
        }
        return $res;
    }
?>