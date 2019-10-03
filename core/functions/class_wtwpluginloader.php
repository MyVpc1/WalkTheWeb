<?php
class wtwpluginloader {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function getAllPlugins($zcontentpath, $zload) {
		global $wtwdb;
		$zresponse = array();
		try {
			$i = 0;
			$zfilepath = $zcontentpath."\\plugins";
			if (file_exists($zfilepath)) {
				$zfolders = new DirectoryIterator($zfilepath);
				foreach ($zfolders as $zfileinfo) {
					if ($zfileinfo->isDir() && !$zfileinfo->isDot()) {
						$zfolder = $zfileinfo->getFilename();
						$zpluginphp = $zfilepath."\\".$zfolder."\\".$zfolder.".php";
						if (file_exists($zpluginphp)) {
							$zresponse[$i] = $this->getPluginPHP($zcontentpath, $zpluginphp, $zfolder, $zload);
							$i += 1;
						}
					}
				}
			} else {
				mkdir($zfilepath, 0777);
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getAllPlugins=".$e->getMessage());
		}
		return json_encode($zresponse);
	}
	
	public function getPluginPHP($zcontentpath, $zpluginphp, $zfolder, $zload) {
		global $wtwdb; 
		$zresponse = array(
			'pluginname' => '',
			'version' => '0.0.0',
			'latestversion' => '0.0.0',
			'title' => '',
			'author' => '',
			'description' => '',
			'foldername' => $zfolder,
			'filename' => $zpluginphp,
			'updatedate' => '',
			'updateurl' => '',
			'active' => ''
		);
		try {
			$i = 0;
			if (file_exists($zpluginphp)) {
				$zpluginname = "";
				$zlines = file($zpluginphp);
				foreach ($zlines as $zline) {
					$zline = str_replace("\n","",str_replace("\r","",$zline));
					if (strpos($zline,'=') !== false) {
						$zlineparts = explode("=",$zline);
						if ($zlineparts[0] != null && $zlineparts[1] != null) {
							$zpart = strtolower(trim(str_replace("#","",$zlineparts[0])));
							$zvalue = trim(str_replace("#","",$zlineparts[1]));
							switch ($zpart) {
								case "pluginname":
									$zpluginname = $zvalue;
									$zvalue = strtolower($zvalue);
								case "version":
									$zvalue = strtolower($zvalue);
									$zresponse["latestversion"] = $zvalue;
								case "title":
								case "description":
								case "author":
									$zresponse[$zpart] = $zvalue;
									$i += 1;
									break;
							}
						}
					}
				}
				if (!empty($zpluginname) && isset($zpluginname)) {
					$zresponse['active'] = $this->getPluginActive($zpluginname);
					if ($zresponse['active'] == "1" && $zload == 1) {
						require_once($zcontentpath."\\plugins\\".$zpluginname."\\".$zpluginname.".php");
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getPluginPHP=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function getPluginActive($zpluginname) {
		global $wtwdb;
		$zactive = "0";
		try {
			$zresponse = $wtwdb->query("
				select active
				from ".wtw_tableprefix."plugins
				where lower(pluginname)=lower('".$zpluginname."')
					and deleted=0;");
			foreach ($zresponse as $zrow) {
				if (!empty($zrow["active"]) & isset($zrow["active"])) {
					if ($zrow["active"] == "1") {
						$zactive = "1";
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getPluginActive=".$e->getMessage());
		}
		return $zactive;
	}
	
	public function setPluginActive($zpluginname, $zactive) {
		global $wtwdb;
		$zsuccess = false;
		try {
			if ($wtwdb->isUserInRole('admin') || $wtwdb->isUserInRole('developer')) {
				$zpluginid = "";
				$zactiveold = "0";
				$zdeletedold = "0";
				$zfound = "";
				if (!isset($zactive)) {
					$zactive = "0";
				} else if (!is_numeric($zactive)) {
					$zactive = "0";
				}
				$zresponse = $wtwdb->query("
					select pluginname, active, deleted
					from ".wtw_tableprefix."plugins
					where lower(pluginname)=lower('".$zpluginname."');");
				foreach ($zresponse as $zrow) {
					$zactiveold = $zrow["active"];
					$zdeletedold = $zrow["deleted"];
					$zfound = $zrow["pluginname"];
				}
				if (!empty($zpluginname) && isset($zpluginname)) {
					if (!empty($zfound)) {
						$wtwdb->query("
							update ".wtw_tableprefix."plugins
							set active=".$zactive.",
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where pluginname='".$zpluginname."'
							limit 1;");
					} else {
						$wtwdb->query("
							insert into ".wtw_tableprefix."plugins
							   (pluginname,
								active,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zpluginname."',
								".$zactive.",
								now(),
								'".$wtwdb->userid."',
								now(),
								'".$wtwdb->userid."');");
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-setPluginActive=".$e->getMessage());
		}
		return $zsuccess;
	}	

	public function updateWalkTheWeb($zpluginname, $zversion, $zupdateurl) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			$ztempfilename = $zpluginname.str_replace(".","-",$zversion).".zip";
			$ztempfilepath = $wtwiframes->contentpath."\\system\\updates\\".$zpluginname."\\";
			if (!file_exists($wtwiframes->contentpath."\\system")) {
				mkdir($wtwiframes->contentpath."\\system", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\system\\updates")) {
				mkdir($wtwiframes->contentpath."\\system\\updates", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\system\\updates\\".$zpluginname)) {
				mkdir($wtwiframes->contentpath."\\system\\updates\\".$zpluginname, 0777);
			}
			if(ini_get('allow_url_fopen') ) {
				$zdata1 = file_get_contents($zupdateurl);
				$zsuccessdownload = file_put_contents($ztempfilepath.$ztempfilename, $zdata1);			
			} else if (extension_loaded('curl')) {
				$getfile = curl_init($zupdateurl);
				$openfile = fopen($ztempfilepath.$ztempfilename, 'wb');
				curl_setopt($getfile, CURLOPT_FILE, $openfile);
				curl_setopt($getfile, CURLOPT_HEADER, 0);
				curl_exec($getfile);
				curl_close($getfile);
				fclose($openfile);
			}
			if (file_exists($ztempfilepath.$ztempfilename)) {
				$zip = new ZipArchive;
				$res = $zip->open($ztempfilepath.$ztempfilename);
				if ($res === true) {
					if ($zpluginname == "walktheweb") {
						$zip->extractTo($wtwiframes->rootpath);
					} else {
						$zip->extractTo($wtwiframes->contentpath."\\plugins");
					}
					$zip->close();
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwpluginloader.php-updateWalkTheWeb=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwpluginloader() {
		return wtwpluginloader::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwpluginloader'] = wtwpluginloader();	

?>