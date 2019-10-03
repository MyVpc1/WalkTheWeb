// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Patent fully incorporates the concepts for:
//      the use of three dimensional structures or buildings as websites, 
//      first person movement between websites (i.e. Pan and Walk), 
//      and connecting three dimensional websites on grids to make virtual communities.
// HTTP3D, http://3d, https://3d, and "Walk the Web" are USPTO Trademarks of Aaron Scott Dishno Ed.D. and HTTP3D Inc.
// All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D. (Author of the code) and HTTP3D Inc. 
// Use of the code, trademarks or Patent concepts without written authorization of Aaron Scott Dishno Ed.D. is strictly prohibited.
// Licensing, developer opportunities, and hosted solution options available, please contact adishno@walktheweb.com for details.

function dGet(k) {
	return document.getElementById(k);
}

WTWJS.prototype.dGet = function(k) {
	return document.getElementById(k);
}

WTWJS.prototype.log = function(txt,color) {
	if (wtw_devmode == '1') {
		if (color == undefined) {
			color = 'black';
		}
		if (color.toLowerCase() == 'black') {
			console.log('\r\n' + txt);
		} else {
			console.log('\r\n%c' + txt, 'color:' + color + ';font-weight:bold;');
		}
	}
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

WTWJS.prototype.getJSON = function(url, callback) {
	try {
		var Httpreq = new XMLHttpRequest();
		Httpreq.overrideMimeType("application/json");
		Httpreq.open('GET', url, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				callback(Httpreq.responseText);
			}
		};
		Httpreq.send(null);  
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getJSON=" + ex.message);
	}
}

WTWJS.prototype.redirectParent = function(url) {
	try {
		if (url.length > 0) {
			window.location.href = url;
		} else {
			window.location.href = 'index.php';
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-redirectParent=" + ex.message);
	}
}

WTWJS.prototype.refresh = function() {
	try {
		window.location.href = window.location.href;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-refresh=" + ex.message);
	}
}

WTWJS.prototype.checkLoadJSFile = function(filename, filetype) {
	try {
		if (WTW.loadedJSFiles.indexOf("[" + filename + "]") == -1) {
			WTW.loadJSFile(filename, filetype);
			WTW.loadedJSFiles += "[" + filename + "]";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkLoadJSFile=" + ex.message);
	}
}

WTWJS.prototype.checkUnloadJSFile = function(filename, filetype) {
	try {
		if (WTW.loadedJSFiles.indexOf("[" + filename + "]") != -1) {
			WTW.unloadJSFile(filename, filetype);
			WTW.loadedJSFiles = WTW.loadedJSFiles.replace(filename, "");
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkUnloadJSFile=" + ex.message);
	}
}

WTWJS.prototype.loadJSFile = function(filename, filetype) {
	try {
		if (filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		}
		else if (filetype == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loadJSFile=" + ex.message);
	}
}

WTWJS.prototype.unloadJSFile = function(filename, filetype) {
	try {
		var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
		var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
		var allsuspects = document.getElementsByTagName(targetelement);
		for (var i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-unloadJSFile=" + ex.message);
	}
}

WTWJS.prototype.resetActivityTimer = function() {
	try {
		if (WTW.activityTimer != null) {
			window.clearTimeout(WTW.activityTimer);
			WTW.activityTimer = null;
		}
		if (WTW.isMobile) {
			WTW.activityTimer = window.setTimeout(function () {WTW.noActivityPause();}, 120000);
		} else {
			WTW.activityTimer = window.setTimeout(function () {WTW.noActivityPause();}, 3600000);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetActivityTimer=" + ex.message);
	}
}

WTWJS.prototype.noActivityPause = function() {
	try {
		if (WTW.activityTimer != null) {
			window.clearTimeout(WTW.activityTimer);
			WTW.activityTimer = null;
		}
		WTW.stopRender();
		WTW.resetActivityTimer();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-noActivityPause=" + ex.message);
	}
}

WTWJS.prototype.hilightMoldFast = function(moldname, scolor) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var color = BABYLON.Color3.Yellow();
			switch (scolor.toLowerCase()) {
				case "green":
					color = BABYLON.Color3.Green();
					break;
				case "red":
					color = BABYLON.Color3.Red();
					break;
				case "blue":
					color = BABYLON.Color3.Blue();
					break;
			}
			WTW.unhilightMold(moldname);
			var hilight = new BABYLON.HighlightLayer(moldname + "-hilight", scene);
			hilight.addMesh(mold, color);
			window.setTimeout(function(){
				hilight.outerGlow = false;
				hilight.innerGlow = false;
				hilight.dispose();
			},500);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-hilightMoldFast=" + ex.message);
	}
}

WTWJS.prototype.hilightMold = function(moldname, scolor) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var color = BABYLON.Color3.Yellow();
			switch (scolor.toLowerCase()) {
				case "green":
					color = BABYLON.Color3.Green();
					break;
				case "red":
					color = BABYLON.Color3.Red();
					break;
				case "blue":
					color = BABYLON.Color3.Blue();
					break;
			}
			WTW.unhilightMold(moldname);
			var hilight = new BABYLON.HighlightLayer(moldname + "-hilight", scene);
			hilight.addMesh(mold, color);
			window.setTimeout(function(){
				hilight.outerGlow = false;
				//hilight.innerGlow = false;
			},500);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-hilightMold=" + ex.message);
	}
}

WTWJS.prototype.unhilightMold = function(moldname) {
	try {
		WTW.disposeClean(moldname + "-hilight");
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-unhilightMold=" + ex.message);
	}
}

WTWJS.prototype.cleanHTMLText = function(htmltext) {
	try {
		var div = document.createElement('div');
		div.innerHTML = htmltext;
		htmltext = (div.innerText || div.textContent);
		div.remove();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-cleanHTMLText=" + ex.message);
	}
	return htmltext;
}

WTWJS.prototype.encode = function(value) {
	try {
		if (value != null) {
			while (value.indexOf('"') > -1) {
				value = value.replace(/"/g, '&quot;');
			}
			while (value.indexOf("'") > -1) {
				value = value.replace(/'/g, '&#039;');
			}
			while (value.indexOf("'") > -1) {
				value = value.replace(/'/g, '&#39;');
			}
			while (value.indexOf("<") > -1) {
				value = value.replace(/</g, '&lt;');
			}
			while (value.indexOf(">") > -1) {
				value = value.replace(/>/g, '&gt;');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-encode=" + ex.message);
    }
    return String(value);
}

WTWJS.prototype.decode = function(value) {
	try {
		if (value != null) {
			while (value.indexOf('&amp;') > -1) {
				value = value.replace('&amp;', "&");
			}
			while (value.indexOf('&quot;') > -1) {
				value = value.replace('&quot;', '"');
			}
			while (value.indexOf("&#039;") > -1) {
				value = value.replace('&#039;', "'");
			}
			while (value.indexOf("&#39;") > -1) {
				value = value.replace('&#39;', "'");
			}
			while (value.indexOf("&lt;") > -1) {
				value = value.replace('&lt;', "<");
			}
			while (value.indexOf("&gt;") > -1) {
				value = value.replace('&gt;', ">");
			}
			while (value.indexOf("\\") > -1) {
				value = value.replace('\\', "");
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-decode=" + ex.message);
    }
    return String(value);
}

WTWJS.prototype.cleanInvalidCharacters = function(value) {
	try {
		if (value != null) {
			value = value.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
			// remove non-printable and other non-valid JSON chars
			value = value.replace(/[\u0000-\u0019]+/g,""); 
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-cleanInvalidCharacters=" + ex.message);
    }
    return value;
}

WTWJS.prototype.blockPassThrough = function(e) {
	try {
		if (e == undefined) {
			e = window.event;
		}
		if (e != undefined) {
			e.stopPropagation();
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-blockPassThrough=" + ex.message);
    }
}

WTWJS.prototype.setWindowSize = function() {
    try {
        if (typeof (window.innerWidth) == 'number') { /* Non-IE */
            WTW.sizeX = window.innerWidth;
            WTW.sizeY = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) { /* IE 6+ */
            WTW.sizeX = document.documentElement.clientWidth;
            WTW.sizeY = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) { /* older */
            WTW.sizeX = document.body.clientWidth;
            WTW.sizeY = document.body.clientHeight;
        }
		if (WTW.adminView == 1) {
			if (dGet('wtw_adminmenu') != null) {
				dGet('wtw_adminmenu').style.height = (WTW.sizeY-33) + "px";
				dGet('wtw_adminmenu3d').style.maxHeight = (WTW.sizeY - 34) + "px";
				dGet('wtw_adminmenuscroll').style.height = (WTW.sizeY - 95) + "px";
				var fullpages = document.getElementsByClassName('wtw-fullpage');
				for (var i=0;i<fullpages.length;i++) {
					if (fullpages[i] != null) {
						if (fullpages[i].id != undefined) {
							dGet(fullpages[i].id).style.height = (WTW.sizeY - 95) + "px";
						}
					}
				}
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace("px",""))).toString() + 'px';
			}
		}
		if (engine != undefined) {
			engine.resize();
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setWindowSize=" + ex.message);
    }
}

WTWJS.prototype.getWorldPosition = function(mold) {
	var abspos = {'x':0,'y':0,'z':0};
	try {
		mold.computeWorldMatrix(true);
		abspos = mold.getAbsolutePosition();
	} catch (ex){
	}
	return abspos;
}

WTWJS.prototype.getGPU = function() {
    var gpu = "high";
    try {
        var gpustring;
        var glinfo = canvas.getContext("experimental-webgl");
        var scwidth = screen.width;
        var scheight = screen.height;
        var screenres = (scwidth * scheight);

        var dbgrenderinfo = null;
		if (glinfo != null) {
			dbgrenderinfo = glinfo.getExtension("WEBGL_debug_renderer_info");
		}
        if (dbgrenderinfo != null) {
            gpustring = glinfo.getParameter(dbgrenderinfo.UNMASKED_RENDERER_WEBGL);
        } else if (WTW.getBrowser() == 'firefox') {
            if (screenres <= 2073600) {
                gpu = 'medium';
            } else {
                gpu = 'low';
            }
        }
        if (/Intel/i.test(gpustring)) {
            gpu = WTW.getIntel(gpustring, screenres);
        } else if (/Nvidia/i.test(gpustring)) {
            gpu = WTW.getNVidia(gpustring, screenres);
        } else if (/(AMD|ATI)/i.test(gpustring)) {
            gpu = WTW.getAMD(gpustring, screenres);
        } else if (/Adreno/i.test(gpustring)) {
            gpu = WTW.getQualComm(gpustring,screenres);
        } else if (/(PowerVR|POWERVR)/i.test(gpustring)) {
            gpu = WTW.getImagination(gpustring, screenres);
        } else if (/(Mali|MALI)/i.test(gpustring)) {
            gpu = WTW.getARM(gpustring, screenres);
        }
        //console.log(getunmaskedinfo(glinfo).renderer + "\n");
        //            function getunmaskedinfo(glinfo) {
        //                var unmaskedinfo = {
        //                    renderer: '',
        //                    vendor: ''
        //                };
        //                return unmaskedinfo;
        //            }
        // 		console.log("\n" + "\n"+"\n" );
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getGPU=" + ex.message);
    }
    return gpu;
}

WTWJS.prototype.getBrowser = function() {
    var browser = "unknown";
    try {
        var isopera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
        var isfirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
        var issafari = /constructor/i.test(window.HTMLElement) || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || safari.pushNotification); // Safari 3.0+ 

        var isie = /*@cc_on!@*/ false || !!document.documentMode; // Internet Explorer 6-11
        var isedge = !isie && !!window.StyleMedia; // Edge 20+
        var ischrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
        //var isblink = (ischrome || isopera) && !!window.CSS; // Blink engine detection
        browser = isopera ? 'opera' :
            isfirefox ? 'firefox' :
            issafari ? 'safari' :
            isie ? 'ie' :
            isedge ? 'edge' :
            ischrome ? 'chrome' :
            'unknown';
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getBrowser=" + ex.message);
    }
    return browser;
}

WTWJS.prototype.getNVidia = function(gpustr, res) {
    var resolution = "low";
    try {
        if (/GTX [5-9]\d{2}\s/i.test(gpustr) || /GTX [1]\d{3}\s/i.test(gpustr)) { // check this statement, maybe add one for gtx 5XX series breakdown 
            resolution = "high"; // most powerfull desktop gpus from Nvidia since 2011
        } else if (/GTX [4-5]\d{2}[M]/i.test(gpustr) && res <= 2073600) {
            resolution = "medium";
        } else if (/GTX [6-9]\d{2}[M]/i.test(gpustr)) {
            resolution = "high";
        } else if ((/GT [6-9]\d{2}\s/i.test(gpustr) || /GeForce [6-9]\d{2}\s/i.test(gpustr)) && res <= 2073600) {
            resolution = "medium";
        } else if ((/GT [6-9]\d{2}[M]/i.test(gpustr) || /GeForce [6-9]\d{2}[M]/i.test(gpustr)) && res <= 2073600) {
            resolution = "medium";
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getNVidia=" + ex.message);
    }
    return resolution;
}

WTWJS.prototype.getIntel = function(gpustr, res) {
    var intel = "low";
    try {
        if ((/HD Graphics \d{3}/i.test(gpustr) || /Iris Graphics \d{3}/i.test(gpustr)) && res <= 2073600) { // if the resolution if 1080p or less
            intel = 'medium';
        } else if ((/Iris Pro \d{3}/i.test(gpustr) || /Iris Pro \w{4}/i.test(gpustr) || /Iris Pro Graphics \w{4}/i.test(gpustr) || /Iris Graphics \w{4}/i.test(gpustr)) && res <= 2073600) { //Iris Pro 580
            intel = 'high'; // might want to switch this to "high" aka high shadows not ultimate shadows

        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getIntel=" + ex.message);
    }
    return intel;
}

WTWJS.prototype.getAMD = function(gpustr, res) {
    var amd = "low";
    /* the amd card with R5-R9 may not be differentiated */
    try {
        if (/Radeon HD [6-8][8-9]\d{2}\w?/i.test(gpustr)) {
            if (res > 3686400) {
                amd = "medium";
            } else {
                amd = 'high';
            }
        } else if (/Radeon R5/i.test(gpustr) && res <= 2073600) {
            amd = 'medium';
        } else if (/Radeon R[7-9]\s[2-4][6-9]\d/i.test(gpustr) || /Radeon RX/i.test(gpustr) || /Radeon R[7-9]\s(m|M)[2-4][8-9]\d/i.test(gpustr) ) {
            amd = 'high';
        } else if (/Radeon R[7-9]\s[2-4][1-5]\d/i.test(gpustr) || /Radeon R[7-9]\s(m|M)[2-4][1-5]\d/i.test(gpustr)) {
            amd = 'medium';

        }else if (/Radeon HD [4-5][8-9]\d{2}/i.test(gpustr) && res <= 2073600) {
            amd = 'medium'
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getAMD=" + ex.message);
    }
    return amd;
}

WTWJS.prototype.getQualComm = function(gpustr, res) {
    var qualcomm = 'low';
    try {
         if (/Adreno [4-5][3-9]\d/i.test(gpustr) && res <= 2073600) {
            qualcomm = "medium";
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getQualComm=" + ex.message);
    }
    return qualcomm;
}

WTWJS.prototype.getImagination = function(gpustr, res) {
    var imagination = 'low';
    try {
        if (/Series.?GT7800/i.test(gpustr) && res <= 2073600) {
            imagination = 'medium';
        } else if (/Series.?GT7600.?(plus|PLUS)/i.test(gpustr) && res <= 2073600 ) {
            imagination = 'medium';
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getImagination=" + ex.message);
    }
    return imagination;
}

WTWJS.prototype.getARM = function(gpustr, res) {
    var arm = 'low';
    try {
        if (/(Mali|MALI)-T[8-9][6-8]\d/i.test(gpustr) && res <= 2073600) {
            qualcomm = "medium";
        } else if (/(Mali|MALI)-G71\d/i.test(gpustr) && res <= 2073600) {
            qualcom = 'medium';
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getARM=" + ex.message);
    }
}

WTWJS.prototype.createJoint = function(imp1, imp2, distanceBetweenPoints) {
	try {
		var joint = new BABYLON.DistanceJoint({
			maxDistance: distanceBetweenPoints
		})
		imp1.addJoint(imp2, joint);
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-createJoint=" + ex.message);
    }
}
		
WTWJS.prototype.setOpacity = function(moldname, opacity) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			if (mold.material != undefined) {
				mold.material.alpha = opacity;
				if (moldname.indexOf('actionzone') == -1) {
					mold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				}
				if (opacity == 0) {
					mold.isVisible = false;				
				} else {
					mold.isVisible = true;				
				}
			} else {
				var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
				covering.alpha = opacity;
				mold.material = covering;
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setOpacity=" + ex.message);
    }
}

WTWJS.prototype.setDirectionalOpacity = function(moldname, opacity) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var found = false;
			if (mold.material.subMaterials != null) {
				for (var i=0;i<mold.material.subMaterials.length;i++) {
					if (mold.material.subMaterials[i] != null) {
						found = true;
						mold.material.subMaterials[i].alpha = opacity;
						mold.material.subMaterials[i].specularColor = new BABYLON.Color3(opacity, opacity, opacity);
						//mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(opacity, opacity, opacity);
						mold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
						mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					}
				}
			}
			if (found == false) {
				WTW.setOpacity(moldname, opacity);
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setDirectionalOpacity=" + ex.message);
    }
}

WTWJS.prototype.getQuerystring = function(key, default_) {
    var squery = "";
    try {
        if (default_ == null) default_ = "";
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null) {
            squery = default_;
        } else {
            squery = qs[1];
        }
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getQuerystring=" + ex.message);
    }
    return squery;
}

WTWJS.prototype.formatNumber = function(n, dp) {
	var numbertext = "";
	try {
		if (WTW.isNumeric(n)) {
			n = Number(n);
			var w = n.toFixed(dp), k = w|0, b = n < 0 ? 1 : 0,
			u = Math.abs(w-k), d = ('' + u.toFixed(dp)).substr(2, dp),
			s = '' + k, i = s.length, r = '';
			while ( (i-=3) > b ) { 
				r = ',' + s.substr(i, 3) + r; 
			}
			numbertext = s.substr(0, i + 3) + r + (d ? '.' + d: '');
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-formatNumber=" + ex.message);
    }  
	return numbertext;
}

WTWJS.prototype.isDate = function(val) {
	if (val != null) {
		var d = new Date(val);
		return !isNaN(d.valueOf());
	} else {
		return false;
	}
}

WTWJS.prototype.addDays = function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

WTWJS.prototype.formatDate = function(date) {
	if (date != "") {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [month,day,year].join('/');
	} else {
		return "";
	}
}

WTWJS.prototype.formatDateLong = function(date) {
	try {
		if (date != "") {
			var d = new Date(date);
			var month = (d.getMonth() + 1);
			var day = d.getDate() + ', ';
			var year = d.getFullYear();
			var smonth = '';
			switch (month) {
				case 1:
					smonth = "January ";
					break;
				case 2:
					smonth = "February ";
					break;
				case 3:
					smonth = "March ";
					break;
				case 4:
					smonth = "April ";
					break;
				case 5:
					smonth = "May ";
					break;
				case 6:
					smonth = "June ";
					break;
				case 7:
					smonth = "July ";
					break;
				case 8:
					smonth = "August ";
					break;
				case 9:
					smonth = "September ";
					break;
				case 10:
					smonth = "October ";
					break;
				case 11:
					smonth = "November ";
					break;
				case 12:
					smonth = "December ";
					break;
			}
			return smonth + day + year;
		} else {
			return "";
		}
	} catch (ex) {
		return "";
	}
}

WTWJS.prototype.formatDataSize = function(num) {
	var snum = '';
	try {
		if (WTW.isNumeric(num)) {
			num = Number(num);
			if (num > 999999) {
				num = (Math.round(num * 10000) / 10000) / 1000000;
				snum = WTW.formatNumber(num,2) + ' mb';
			} else if (num > 999) {
				num = (Math.round(num * 100) / 100) / 1000;
				snum = WTW.formatNumber(num,2) + ' kb';
			} else {
				num = num / 1000;
				snum = WTW.formatNumber(num,3) + ' kb';
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-formatDataSize=" + ex.message);
	}
	return snum;
}

WTWJS.prototype.setDDLValue = function(ddlname, value) {
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			ddl.selectedIndex = -1;
			for (var i = 0; i < ddl.options.length; i++){
				if (ddl.options[i].value != undefined && ddl.options[i].value != null) {
					if (WTW.isNumeric(ddl.options[i].value) && WTW.isNumeric(value)) {
						if (Number(ddl.options[i].value) == Number(value)) {
							ddl.selectedIndex = i;
						}
					} else {
						if (ddl.options[i].value.toLowerCase() == value.toLowerCase()){
							ddl.selectedIndex = i;
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setDDLValue=" + ex.message);
    }
}

WTWJS.prototype.setDDLText = function(ddlname, stext) {
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			ddl.selectedIndex = -1;
			for (var i = 0; i < ddl.options.length; i++){
				if (ddl.options[i].text != undefined && ddl.options[i].text != null) {
					if (ddl.options[i].text.toLowerCase() == stext.toLowerCase()){
						ddl.selectedIndex = i;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setDDLText=" + ex.message);
    }
}

WTWJS.prototype.getDDLValue = function(ddlname) {
	var ddlvalue = "";
	try {
		if (dGet(ddlname).options[dGet(ddlname).selectedIndex] != undefined) {
			ddlvalue = dGet(ddlname).options[dGet(ddlname).selectedIndex].value;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setDDLValue=" + ex.message);
    }
	return ddlvalue;
}

WTWJS.prototype.getDDLText = function(ddlname) {
	var ddltext = "";
	try {
		if (dGet(ddlname).options[dGet(ddlname).selectedIndex] != undefined) {
			ddltext = dGet(ddlname).options[dGet(ddlname).selectedIndex].text;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getDDLText=" + ex.message);
    }
	return ddltext;
}

WTWJS.prototype.clearDDL = function(ddlname) {
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			for (var i = ddl.options.length - 1 ; i >= 0 ; i--) {
				ddl.remove(i);
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-clearDDL=" + ex.message);
    }
}

WTWJS.prototype.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

WTWJS.prototype.isURL = function(url) {
	var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	return pattern.test(url);
}

WTWJS.prototype.isEmail = function(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

WTWJS.prototype.getScrollY = function() {
	var y = 0;
	try {
		var doc = document, w = window;
		var x, y, docEl;
		if (typeof w.pageYOffset === 'number') {
			x = w.pageXOffset;
			y = w.pageYOffset;
		} else {
			docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ?
					doc.documentElement : doc.body;
			x = docEl.scrollLeft;
			y = docEl.scrollTop;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getScrollY=" + ex.message);
    }
    return y;
}

WTWJS.prototype.getRadians = function(degrees) {
	var radians = 0;
	try {
		if (WTW.isNumeric(degrees)) {
			radians = degrees * Math.PI / 180;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getRadians=" + ex.message);
    }
	return radians;
}

WTWJS.prototype.getDegrees = function(radians) {
	var degrees = 0;
	try {
		if (WTW.isNumeric(radians)) {
			degrees = WTW.cleanDegrees(radians * 180 / Math.PI);
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getDegrees=" + ex.message);
    }
	return degrees;
}

WTWJS.prototype.cleanDegrees = function(degrees) {
	try {
		if (WTW.isNumeric(degrees)) {
			while (degrees < 0) {
				degrees += 360;
			}
			while (degrees > 360) {
				degrees -= 360;
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-cleanDegrees=" + ex.message);
    }
	return degrees;
}

WTWJS.prototype.isOdd = function(num) {
	return num % 2;
}

WTWJS.prototype.distance = function(sx0,sy0,sz0,sx1,sy1,sz1) {
	var distance = 0;
	try {
		var x0 = Number(sx0);
		var y0 = Number(sy0);
		var z0 = Number(sz0);
		var x1 = Number(sx1);
		var y1 = Number(sy1);
		var z1 = Number(sz1);
		deltaX = x1 - x0;
		deltaY = y1 - y0;
		deltaZ = z1 - z0;
		distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-distance=" + ex.message);
	}
	return distance;
}

WTWJS.prototype.getMyDistance = function(sx1,sy1,sz1) {
	var distance = 0;
	try {
		var x0 = WTW.camera.position.x;
		var y0 = WTW.camera.position.y;
		var z0 = WTW.camera.position.z;
		var x1 = Number(sx1);
		var y1 = Number(sy1);
		var z1 = Number(sz1);
		deltaX = x1 - x0;
		deltaY = y1 - y0;
		deltaZ = z1 - z0;
		distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getMyDistance=" + ex.message);
	}
	return distance;
}

WTWJS.prototype.getBuildingDistance = function(bx, by, bz, posx, posy, posz, brotx, broty, brotz) {
	var distance = 0;
	try {
		var x0 = WTW.camera.position.x;
		var y0 = WTW.camera.position.y;
		var z0 = WTW.camera.position.z;
		var deltax = (-Math.sin((Math.PI / 2 - WTW.getRadians(broty))) * posx + Math.cos((Math.PI / 2 - WTW.getRadians(broty))) * posz + bx - x0);
		var deltaz = (Math.sin((Math.PI / 2 - WTW.getRadians(broty))) * posz + -Math.cos((Math.PI / 2 - WTW.getRadians(broty))) * posx + bz - z0);
		var deltay = Number(posy) + by - y0;
		distance = Math.sqrt(deltax * deltax + deltaz * deltaz + deltay * deltay);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getBuildingDistance=" + ex.message);
	}
	return distance;
}

WTWJS.prototype.rotatePoint = function(cx, cz, px, pz, rad) {
	var nx = px;
	var nz = pz;
	try {
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
		nx = (cos * (px - cx)) + (sin * (pz - cz)) + cx;
		nz = (cos * (pz - cz)) - (sin * (px - cx)) + cz;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-rotatePoint=" + ex.message);
	}
    return {
		nx:nx,
		nz:nz
	};
}

WTWJS.prototype.getMyAngleToPoint = function(x,z) {
	var zangle = 0;
	try {
		var px = WTW.camera.position.x;
		var pz = WTW.camera.position.z;
		var camangle = WTW.getDegrees(WTW.camera.rotation.y);
		var r = WTW.getNewPoint(px, pz, camangle, 40);
		var rx = r.x;
		var rz = r.z;
		var buildingangle = WTW.getAngleToPoint(px, pz, x, z);
		zangle = WTW.cleanDegrees(camangle + 270 + buildingangle);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getMyAngleToPoint=" + ex.message);
	}
	return zangle;
}

WTWJS.prototype.getAngleToPoint = function(cx, cy, px, py) {
	var pointangle = 0;
	try {
		var dy = py - cy;
		var dx = px - cx;
		var pointangle = Math.atan2(dy, dx);
		pointangle *= 180 / Math.PI;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getAngleToPoint=" + ex.message);
	}
	return pointangle;
}

WTWJS.prototype.getNewPoint = function(x, z, angle, distance) {
    var result = {};
	try {
		result.x = Math.round(Math.cos((Math.PI / 2 - WTW.getRadians(angle))) * distance + x);
		result.z = Math.round(Math.sin((Math.PI / 2 - WTW.getRadians(angle))) * distance + z);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getNewPoint=" + ex.message);
	}
    return result;
}

WTWJS.prototype.getNewPointDecimal = function(x, z, angle, distance) {
    var result = {};
	try {
		result.x = Math.cos((Math.PI / 2 - WTW.getRadians(angle))) * distance + x;
		result.z = Math.sin((Math.PI / 2 - WTW.getRadians(angle))) * distance + z;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getNewPointDecimal=" + ex.message);
	}
    return result;
}

WTWJS.prototype.randomBetween = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

WTWJS.prototype.getRandomString = function(length) {
    var result = '';
	try {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = length; i > 0; --i) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-randomString=" + ex.message);
	}
    return result;
}

WTWJS.prototype.getNewCoordinates = function(dist) {
	var positionX = 0;
	var positionY = 0;
	var positionZ = 0;
	var rotationY = 0.00;
	try {
		rotationY = WTW.getDegrees(WTW.camera.rotation.y);
		positionY = Math.round(WTW.camera.position.y);
		positionX = Math.round((WTW.camera.position.x + dist * Math.sin(WTW.camera.rotation.y)));
		positionZ = Math.round((WTW.camera.position.z + dist * Math.cos(WTW.camera.rotation.y)));
		rotationY = WTW.cleanDegrees(rotationY);
		if (rotationY > 135 && rotationY < 225) {
			rotationY = 90.00;
		} else if (rotationY >= 225 && rotationY < 315) {
			rotationY = 180.00;
		} else if ((rotationY >= 315 && rotationY <= 360) || (rotationY >= 0 && rotationY < 45)) {
			rotationY = -90.00;
		} else {
			rotationY = 0.00;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getNewCoordinates=" + ex.message);
	}
	return {
		positionX : positionX.toFixed(2),
		positionY : positionY.toFixed(2),
		positionZ : positionZ.toFixed(2),
		rotationY : rotationY
	};
}

WTWJS.prototype.openWebpage = function(url, target) {
	try {
		if (target == undefined) {
			if (url.toLowerCase().indexOf("//" + wtw_domainname + "/") > -1) {
				target = '';
			} else {
				target = '_blank';
			}
		}
		if (target == '') {
			window.parent.parent.window.location = url;
		} else {
			window.open(url,target);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-openWebpage=" + ex.message);
	}
}

WTWJS.prototype.openIFrame = function(url, width, height) {
	try {
		WTW.setWindowSize();
		if (typeof width === "undefined" || width === null) {
			width = .9; 
		}
		if (typeof height === "undefined" || height === null) {
			height = .9; 
		}
		var iframe = dGet('wtw_ibrowseframe');
		iframe.onload = function() {
			WTW.iFrameOnLoad();
		};
		iframe.src = url;
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * width) + "px";
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * height) + "px";
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - width)) / 2) + "px";
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - height)) / 2) + "px";
		dGet('wtw_ibrowsediv').style.display = "inline-block";
		dGet('wtw_ibrowsediv').style.visibility = "visible";
		dGet('wtw_ibrowsediv').style.zIndex = 3000;
		if (url == '/core/pages/help.php') {
			iframe.onload = function() { WTW.setHelp();	};
			dGet('wtw_browsetitle').innerHTML = "WalkTheWeb - Help";
		} else {
			dGet('wtw_browsetitle').innerHTML = "";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-openIFrame=" + ex.message);
		WTW.closeIFrame();
		WTW.openWebpage(url, '_blank');
	}
}

WTWJS.prototype.iFrameOnLoad = function() {
	try {
		var iframe = dGet('wtw_ibrowseframe');
		var ipage = iframe.contentDocument || iframe.contentWindow.document;
		if (ipage.title.length > 0) {
			dGet('wtw_browsetitle').innerHTML = ipage.title;
		} else {
			dGet('wtw_browsetitle').innerHTML = iframe.src;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-iFrameOnLoad=" + ex.message);
	}
}

WTWJS.prototype.closeIFrame = function() {
	try {
		var iframe = dGet('wtw_ibrowseframe');
		iframe.onload = function() {};
		dGet('wtw_ibrowsediv').style.zIndex = 0;
		dGet('wtw_ibrowsediv').style.display = "none";
		dGet('wtw_ibrowsediv').style.visibility = "hidden";
		dGet('wtw_browsetitle').innerHTML = "";
		dGet('wtw_ibrowseframe').src = "/core/pages/loading.php";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-closeIFrame=" + ex.message);
	}
}

WTWJS.prototype.showHelp = function(helptab) {
	try {
		dGet('wtw_helptab').value = helptab;
		WTW.setHelp();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-showHelp=" + ex.message);
	}
}

WTWJS.prototype.setHelp = function() {
	try {
		var iframe = dGet('wtw_ibrowseframe');
		var iwindow = iframe.contentWindow || iframe;
		var ipage = iframe.contentDocument || iframe.contentWindow.document;
		if (typeof iwindow.WTW.showHelp == 'function') {
			iwindow.WTW.showHelp(dGet('wtw_helptab').value);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setHelp=" + ex.message);
	}
}

WTWJS.prototype.setFunction = function(functionname, parameters, moldname) {
	try {
		if (moldname != undefined) {
			parameters += "," + moldname;
		}
		if (parameters.indexOf(',') > -1) {
			var values = parameters.split(',');
			WTW.executeFunctionByName(functionname, window, values);
		} else if (parameters != null) {
			WTW.executeFunctionByName(functionname, window, parameters);
		} else {
			WTW.executeFunctionByName(functionname, window, null);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setFunction=" + ex.message);
	}
}

WTWJS.prototype.createFunctionName = function(moldname) {
	var functionname = "";
	try {
		functionname = "f" + moldname;
		while (functionname.indexOf(' ') > -1) {
			functionname = functionname.replace(' ','');
		}
		while (functionname.indexOf('-') > -1) {
			functionname = functionname.replace('-','');
		}
		if (typeof window[functionname] != "undefined") {
			var basename = functionname;
			var i = 0;
			while (typeof window[functionname] != "undefined") {
				i += 1;
				functionname = basename + i;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-createFunctionName=" + ex.message);
	}
	return functionname;
}

WTWJS.prototype.getRotateMoldName = function(moldname) {
	var rotatemoldname = "";
	try {
		var actionzoneid = "";
		if (moldname.indexOf("molds-") > -1) {
			var namepart = moldname.split('-');
			var moldind = -1;
			var molds = WTW.buildingMolds;
			if (namepart[0].indexOf("community") > -1) {
				molds = WTW.communitiesMolds;
			} else if (namepart[0].indexOf("thing") > -1) {
				molds = WTW.thingMolds;
			}
			moldind = Number(namepart[1]);
			if (molds[moldind] != null) {
				actionzoneid = molds[moldind].actionzoneid;
			}
			if (actionzoneid != "") {
				for (var i=0;i<WTW.actionZones.length;i++) {
					if (WTW.actionZones[i] != null) {
						if (actionzoneid == WTW.actionZones[i].actionzoneid) {
							rotatemoldname = "actionzoneaxle-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getRotateMoldName=" + ex.message);
	}
	return rotatemoldname;
}

WTWJS.prototype.deleteIdFromArray = function(array, stext) {
	try {
		if (array != null) {
			if (array.length > 0) {
				for (var i=array.length;0>array.length;i--) {
					if (array[i] != null) {
						if (array[i].id == stext) {
							array.splice(i,1);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-deleteIdFromArray=" + ex.message);
	}
}

WTWJS.prototype.isInArray = function(array, stext) {
	var inarray = false;
	try {
		if (array != null) {
			if (array.length > 0) {
				for (var i=0;i<array.length;i++) {
					if (array[i] != null) {
						if (array[i] == stext) {
							inarray = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isInArray=" + ex.message);
	}
	return inarray;
}

WTWJS.prototype.isItemInArray = function(sarray, checkid, connectinggridind, altconnectinggridind, moldgroup) {
	var found = false;
	try {
		if (sarray != null && checkid != "") {
			for (var i = 0; i < sarray.length; i++) {
				if (sarray[i] != null) {
					if (sarray[i] != undefined) {
						if (sarray[i].moldid != undefined) {
							if (sarray[i].moldid != undefined && moldgroup.indexOf("molds") > -1) {
								if (sarray[i].moldid == checkid && Number(sarray[i].connectinggridind) == Number(connectinggridind) && Number(sarray[i].altconnectinggridind) == Number(altconnectinggridind)) {
									found = true;
									i = sarray.length;
								}
							}
						}
						if (sarray[i].actionzoneid != undefined) {
							if (sarray[i].actionzoneid != undefined && moldgroup == "actionzones") {
								if (sarray[i].actionzoneid == checkid && Number(sarray[i].connectinggridind) == Number(connectinggridind)) {
									found = true;
									i = sarray.length;
								}
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isItemInArray=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isStepInAutomations = function(automationstepid, connectinggridind) {
	var found = false;
	try {
		if (WTW.automations != null && automationstepid != "") {
			for (var i = 0; i < WTW.automations.length; i++) {
				if (WTW.automations[i] != null) {
					if (WTW.automations[i].step.automationstepid == automationstepid && WTW.automations[i].connectinggridind == connectinggridind) {
						found = true;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isStepInAutomations=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isUploadReady = function(uploadid) {
	var ready = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid && wtw_uploads[i].queue == '0') {
						ready = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isUploadReady=" + ex.message);
	}
	return ready;
}

WTWJS.prototype.isUploadAdded = function(uploadid) {
	var found = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) { 
						found = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isUploadAdded=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isUploadInQueue = function(uploadid) {
	var found = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid && wtw_uploads[i].queue == "1") { 
						found = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isUploadInQueue=" + ex.message);
	}
	return found;
}

WTWJS.prototype.setUploadInQueue = function(uploadid, value) {
	try {
		var found = -1;
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) {
						wtw_uploads[i].queue = value;
						found = i;
					}
				}
			}
		}
		if (found == -1 && value == "1") {
			var uploadind = WTW.getNextCount(wtw_uploads);
			wtw_uploads[uploadind] = WTW.newUpload();
			wtw_uploads[uploadind].uploadid = uploadid;
			wtw_uploads[uploadind].queue = "1";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setUploadInQueue=" + ex.message);
	}
}

WTWJS.prototype.getNextCount = function(listarray) {
	var nextcount = -1;
	try {
		if (listarray != null) {
			for (var i = 0; i < listarray.length; i++) {
				if (listarray[i] == null && nextcount == -1) {
					nextcount = i;
				}
			}
			if (nextcount == -1) {
				nextcount = listarray.length;
			}
		} else {
			nextcount = 0;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getNextCount=" + ex.message);
	}
	return nextcount;
}

WTWJS.prototype.getParentName = function(connectinggridind) {
	var parentname = "";
	try {
		if (WTW.isNumeric(connectinggridind)) {
			if (WTW.connectingGrids[connectinggridind] != null) {
				parentname = WTW.connectingGrids[connectinggridind].moldname;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getParentName=" + ex.message);
	}
	return parentname;	
}

WTWJS.prototype.getParentActionZoneName = function(actionzoneind, connectinggridind) {
	var parentname = "";
	try {
		if (WTW.isNumeric(actionzoneind)) {
			if (WTW.actionZones[actionzoneind] != null) {
				parentname = WTW.actionZones[actionzoneind].moldname.replace("actionzone-", "actionzoneaxlebase2-");
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getParentActionZoneName=" + ex.message);
	}
	return parentname;
}

WTWJS.prototype.getMoldInd = function(molds, moldid, connectinggridind) {
	var moldind = -1;
	try {
		if (molds != null && moldid != "") {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					if (molds[i].moldid == moldid && connectinggridind == molds[i].connectinggridind) {
						moldind = i;
						i = molds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getMoldInd=" + ex.message);
	}
	return moldind;
}

WTWJS.prototype.getAltMoldInd = function(molds, moldid, altconnectinggridind) {
	var moldind = -1;
	try {
		if (molds != null && moldid != "") {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					if (molds[i].moldid == moldid && altconnectinggridind == molds[i].altconnectinggridind) {
						moldind = i;
						i = molds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getAltMoldInd=" + ex.message);
	}
	return moldind;
}

WTWJS.prototype.getUploadInd = function(uploadid) {
	var uploadind = -1;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) {
						uploadind = i;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getUploadInd=" + ex.message);
	}
	return uploadind;
}

WTWJS.prototype.getThingInd = function(zthingid) {
	var zthingind = -1;
	try {
		if (WTW.things != null) {
			for (var i = 0; i < WTW.things.length; i++) {
				if (WTW.things[i] != null) {
					if (WTW.things[i].thinginfo.thingid == zthingid) {
						zthingind = i;
						i = WTW.things.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getThingInd=" + ex.message);
	}
	return zthingind;
}

WTWJS.prototype.getBuildingInd = function(zbuildingid) {
	var zbuildingind = -1;
	try {
		if (WTW.buildings != null && zbuildingid !== "") {
			for (var i = 0; i < WTW.buildings.length; i++) {
				if (WTW.buildings[i] != null) {
					if (WTW.buildings[i].buildinginfo.buildingid == zbuildingid) {
						zbuildingind = i;
						i = WTW.buildings.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getBuildingInd=" + ex.message);
	}
	return zbuildingind;
}

WTWJS.prototype.getCommunityInd = function(zcommunityid) {
	var zcommunityind = -1;
	try {
		if (WTW.communities != null && zcommunityid != "") {
			for (var i = 0; i < WTW.communities.length; i++) {
				if (WTW.communities[i] != null) {
					if (WTW.communities[i].communityinfo != null) {
						if (WTW.communities[i].communityinfo.communityid == zcommunityid) {
							zcommunityind = i;
							i = WTW.communities.length;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getCommunityInd=" + ex.message);
	}
	return zcommunityind;
}

WTWJS.prototype.getConnectingGridInd = function(zconnectinggridid) {
	var zconnectinggridind = -1;
	try {
		if (WTW.connectingGrids != null && zconnectinggridid != "") {
			for (var i = 0; i < WTW.connectingGrids.length; i++) {
				if (WTW.connectingGrids[i] != null) {
					if (WTW.connectingGrids[i].connectinggridid == zconnectinggridid) {
						zconnectinggridind = i;
						i = WTW.connectingGrids.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getConnectingGridInd=" + ex.message);
	}
	return zconnectinggridind;
}

WTWJS.prototype.getActionZoneInd = function(zactionzoneid, connectinggridind) {
	var zactionzoneind = -1;
	try {
		if (WTW.actionZones != null && zactionzoneid != "") {
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == zactionzoneid && Number(WTW.actionZones[i].connectinggridind) == Number(connectinggridind)) {
						zactionzoneind = i;
						i = WTW.actionZones.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getActionZoneInd=" + ex.message);
	}
	return zactionzoneind;
}

WTWJS.prototype.getCommunityName = function(zcommunityid) {
	var zcommunityname = "";
	try {
		if (WTW.communities != null && zcommunityid !== "") {
			for (var i = 0; i < WTW.communities.length; i++) {
				if (WTW.communities[i] != null) {
					if (WTW.communities[i].communityinfo.communityid == zcommunityid) {
						zcommunityname = WTW.communities[i].communityinfo.communityname;
						i = WTW.communities.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getCommunityName=" + ex.message);
	}
	return zcommunityname;
}

WTWJS.prototype.getBuildingName = function(zbuildingid) {
	var zbuildingname = "";
	try {
		if (WTW.buildings != null && zbuildingid !== "") {
			for (var i = 0; i < WTW.buildings.length; i++) {
				if (WTW.buildings[i] != null) {
					if (WTW.buildings[i].buildinginfo.buildingid == zbuildingid) {
						zbuildingname = WTW.buildings[i].buildinginfo.buildingname;
						i = WTW.buildings.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getBuildingName=" + ex.message);
	}
	return zbuildingname;
}

WTWJS.prototype.getBuildingNameFromConnectingGrid = function(zbuildingid) {
	var zbuildingname = "";
	try {
		if (WTW.connectingGrids != null && zbuildingid !== "") {
			for (var i = 0; i < WTW.connectingGrids.length; i++) {
				if (WTW.connectingGrids[i] != null) {
					if (WTW.connectingGrids[i].buildinginfo.buildingid == zbuildingid) {
						zbuildingname = WTW.connectingGrids[i].buildinginfo.buildingname;
						i = WTW.connectingGrids.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getBuildingNameFromConnectingGrid=" + ex.message);
	}
	return zbuildingname;
}

WTWJS.prototype.getThingName = function(zthingid) {
	var zthingname = "";
	try {
		if (WTW.things != null && zthingid !== "") {
			for (var i = 0; i < WTW.things.length; i++) {
				if (WTW.things[i] != null) {
					if (WTW.things[i].thinginfo.thingid == zthingid) {
						zthingname = WTW.things[i].thinginfo.thingname;
						i = WTW.things.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getThingName=" + ex.message);
	}
	return zthingname;
}

WTWJS.prototype.getMainParent = function() {
	var mainparent = null;
	try {
		if (WTW.mainParent == "") {
			WTW.mainParent = "connectinggrids-0---";
		}
		mainparent = scene.getMeshByID(WTW.mainParent);
		if (mainparent == null) {
			mainparent = BABYLON.MeshBuilder.CreateBox(WTW.mainParent, {}, scene);
			mainparent.material = WTW.addCovering("hidden", WTW.mainParent, WTW.newMold(), 1, 1, 1, "0", "0");
			mainparent.material.alpha = 0;
		}
		if (WTW.mainParent != "connectinggrids-0---") {
			WTW.disposeClean("connectinggrids-0---");
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getMainParent=" + ex.message);
	}
	return mainparent;
}

WTWJS.prototype.disposeClean = function(moldname, check) {
	try {
		if (moldname != "") {
			scene.blockfreeActiveMeshesAndRenderingGroups = true;
			if (typeof check === "undefined") {
				check = true;
			}
            var namepart = moldname.split('-');
			WTW.disposeShadowFromMold(moldname);
			WTW.disposeReflectionFromMold(moldname);
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				try {
					if (moldname.indexOf("myavatar") > -1 || moldname.indexOf("selectavatar") > -1) {
						WTW.disposeAnimations(moldname);
					} else if (namepart[5] == 'video') {
						var strtemp = moldname;
						strtemp = strtemp.replace("-base","-mainvideo");
						var videomold = scene.getMeshByID(strtemp);
						if (videomold != null){
							if (videomold.material.diffuseTexture.video != undefined) {
								videomold.material.diffuseTexture.video.pause();
								videomold.material.diffuseTexture.video.src = "";
							}
							if (videomold.material.diffuseTexture.video != null) {
								videomold.material.diffuseTexture.video = null;
							}
					   }
					} else if (namepart[5].indexOf('water') > -1) {
						var strtemp = moldname;
						if (strtemp.indexOf('-base') > -1) {
							strtemp = strtemp.replace("-base","");
						}
						var watermat = scene.getMaterialByID(strtemp + "-watermat");
						if (watermat != null) {
							if (watermat.reflectionTexture.renderList != null) {
								if (watermat.reflectionTexture.renderList.length > 0) {
									watermat.reflectionTexture.renderList.splice(0, watermat.reflectionTexture.renderList.length);
								}
							}
							if (watermat.refractionTexture.renderList != null) {
								if (watermat.refractionTexture.renderList.length > 0) {
									watermat.refractionTexture.renderList.splice(0, watermat.refractionTexture.renderList.length);
								}
							}
						}
						try {
							if (watermat.reflectionTexture != null) {
								watermat.reflectionTexture.dispose();
								watermat.reflectionTexture = null;
							}
						} catch(ex) {}
						try {
							if (watermat.refractionTexture != null) {
								watermat.refractionTexture.dispose();
								watermat.refractionTexture = null;
							}
							watermat.dispose();
						} catch(ex) {}
						WTW.disposeClean(strtemp + "-water", false);
					} else if (namepart[5].indexOf('image') > -1) {
						var strtemp = moldname;
						if (strtemp.indexOf('-base') > -1) {
							strtemp = strtemp.replace("-base","-mainimage");
						} else {
							strtemp += "-mainimage";
						}
						WTW.disposeClean(strtemp, false);
						WTW.disposeClean(strtemp.replace("-mainimage","-hoverimage"), false);
						WTW.disposeClean(strtemp.replace("-mainimage","-clickimage"), false);
					} else if (namepart[5].indexOf('babylonfile') > -1 || namepart[0] == 'myavatar') {
						var childmeshes = mold.getChildren();
						if (childmeshes != null) {
							for (var i=0; i < childmeshes.length; i++) {
								if (childmeshes[i] != null) {
									childmeshes[i].dispose();
								}
							}
						}
					}
				} catch (ex) {}
				try {
					if (mold.actionManager != null) {
						mold.actionManager.dispose();
						mold.actionManager = null;
					}
				} catch(ex) {}
				try {
					if (mold.material.diffuseTexture != null) {
						mold.material.diffuseTexture.dispose();
						mold.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (mold.material != null) {
						mold.material.dispose();
						mold.material = null;
					}
				} catch(ex) {}
				mold.dispose();
				mold = null;
				WTW.disposeMoldEvent(moldname);
				if (moldname.indexOf("actionzone") > -1) {
					WTW.disposeClean(moldname.replace("actionzone","actionzoneaxle"),false);
					WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlepole"),false);
					WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlebase"),false);
					WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlebase2"),false);
				}
				var moldfar = scene.getMeshByID(moldname + "-far");
				if (moldfar != null) {
					WTW.disposeClean(moldname + "-far");
				}
				try {
				/* molds[moldind].sound.sound */
					var molds = null;
					switch (namepart[0]) {
						case "communitymolds":
							molds = WTW.communitiesMolds;
							break;
						case "buildingmolds":
							molds = WTW.buildingMolds;
							break;
						case "thingmolds":
							molds = WTW.thingMolds;
							break;
					}
					if (molds != null) {
						var moldind = Number(namepart[1]);
						if (molds[moldind] != null) {
							if (molds[moldind].sound.sound != '') {
								molds[moldind].sound.sound.stop(0);
								molds[moldind].sound.sound.detachFromMesh();
								molds[moldind].sound.sound.dispose();
								molds[moldind].sound.sound = null;
								molds[moldind].sound.sound = '';
							}
							if (molds[moldind].objects.light != '') {
								molds[moldind].objects.light.dispose();
								molds[moldind].objects.shadows.dispose();
								molds[moldind].objects.light = '';
								molds[moldind].objects.shadows = '';
							}
						}
					}
				} catch(ex) {}
			}
			scene.blockfreeActiveMeshesAndRenderingGroups = false;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeClean=" + ex.message);
		scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}
}

WTWJS.prototype.disposeMaterial = function(materialname) {
	try {
		var covering = scene.getMaterialByID(materialname);
		if (covering != null) {
			covering.dispose();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeMaterial=" + ex.message);
	}
}

WTWJS.prototype.clearOptions = function(selectname) {
	try {
		if (dGet(selectname) != null) {
			for(var i=dGet(selectname).options.length - 1; i >= 0 ; i--)
			{
				dGet(selectname).remove(i);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-clearOptions=" + ex.message);
	}
}

WTWJS.prototype.checkJSFunction = function(moldname) {
	try {
		if (moldname.indexOf('-') > -1) {
			var namepart = moldname.split('-');
			if (namepart[0] == "thingmolds" || namepart[0] == "buildingmolds" || namepart[0] == "communitymolds") {
				var moldind = Number(namepart[1]);
				var molds = null;
				if (namepart[0] == "thingmolds") {
					molds = WTW.thingMolds;
				} else if (namepart[0] == "buildingmolds") {
					molds = WTW.buildingMolds;
				} else if (namepart[0] == "communitymolds") {
					molds = WTW.communitiesMolds;
				}
				if (molds[moldind] != null) {
					WTW.setFunction(molds[moldind].jsfunction, molds[moldind].jsparameters);
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkJSFunction=" + ex.message);
    }
}

WTWJS.prototype.changeRotationSpeed = function() {
	try {
		WTW.rotationSpeed = Number(dGet('wtw_trotationspeed').value);
        WTW.camera.angularSensibility = WTW.rotationSpeed;
		WTW.setCookie("rotatespeed",WTW.rotationSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-changeRotationSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeWalkSpeed = function() {
	try {
		WTW.walkSpeed = Number(dGet('wtw_twalkspeed').value);
        WTW.setCookie("walkingspeed",WTW.walkSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-changeWalkSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeShadow = function(w) {
	try {
        if (typeof w == 'string') {
            WTW.shadowset = Number(w);
        } else {
            WTW.shadowset += w;
            if (WTW.shadowset > 3) {
                WTW.shadowset = 3;
            }
		    if (WTW.shadowset < 0) {
                WTW.shadowset = 3;
            }
		    if (WTW.adminView != 0) {
                WTW.shadowset = 3;
            }
        }
        if (( WTW.gpuSetting == 'medium') && WTW.shadowset == 3){
        } else if (( WTW.gpuSetting == 'low') && WTW.shadowset == 2){
        } else {
			WTW.setShadowSettings();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-changeShadow=" + ex.message);
	}
}

WTWJS.prototype.changeGraphic = function(w) {
	try {
        if (typeof w == 'string') {
            WTW.graphicSet = Number(w);
        } else {
            WTW.graphicSet += w;
		if (WTW.graphicSet > 2) {
			WTW.graphicSet = 2;
		}
		if (WTW.graphicSet < 0) {
			WTW.graphicSet = 0;
		}
        }
		switch (WTW.graphicSet) {
			case 0:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Low Resolution)";
				WTW.gpuSetting = 'low';
				break;
			case 1:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Optimum Balance)";
				WTW.gpuSetting = 'medium';
				break;
			case 2:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (High Resolution)";
				WTW.gpuSetting = 'high';
				break;
		}
		dGet('wtw_tgraphicsetting').value = WTW.graphicSet;
		WTW.setCookie("graphicsetting",WTW.graphicSet,365);
		WTW.setCookie("gpusetting", WTW.gpuSetting,30);
		document.location.reload(true);
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-changeGraphic=" + ex.message);
	}
}

WTWJS.prototype.setShadowSettings = function() {
    try {
        var shadowresolution = 1024;
		switch (WTW.shadowset) {
			case 0:
				shadowresolution = 512;
				if (WTW.gpuSetting == 'low') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)";
                }
				break;
			case 1:
				shadowresolution = 1024;
				if (WTW.gpuSetting == 'medium') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)";
                }
				break;
			case 2:
				shadowresolution = 1024;

				dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All) - High Resolution";
				break;
			case 3:
				shadowresolution = 4096;

				if (WTW.gpuSetting == 'high') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)";
                }
				break;
		}
		dGet('wtw_tshadowsetting').value = WTW.shadowset;
		
		WTW.setCookie("shadowsetting",WTW.shadowset,365);
        if(WTW.shadows != null) {
            WTW.shadows.dispose();
            WTW.shadows = null;
        }
		WTW.shadows = new BABYLON.ShadowGenerator(shadowresolution, WTW.sun);
		/* WTW.shadows.depthScale = 20000; */
		/* WTW.shadows.setDarkness(0.3); */
		/* WTW.shadows.bias = 0.01; */
		WTW.shadows.forceBackFacesOnly = true;
		if (WTW.shadowset < 2) {
			WTW.shadows.usePoissonSampling = true;
		} else if (WTW.shadowset < 3) {
            WTW.shadows.useExponentialShadowMap = true;
		} else {
			WTW.shadows.useBlurExponentialShadowMap = true;
		}
        if (WTW.shadowset > 0) {
			WTW.extraGround.receiveShadows = true;
		}
		if (WTW.thingMolds != null) {
			for (var i = 0; i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					var shape = "box"; 
					if (WTW.thingMolds[i].shape != "") {
						shape = WTW.thingMolds[i].shape;
					}
					var mold = scene.getMeshByID(WTW.thingMolds[i].moldname);
					if (mold != null && WTW.thingMolds[i].shown == "1") {
						if (WTW.shadowset == 3) {
							WTW.addShadowToShadowmaps(mold);
						} else if (WTW.shadowset == 2) {
							WTW.addShadowToShadowmaps(mold);
						}
					}
				}
			}
		}		
		if (WTW.buildingMolds != null) {
			for (var i = 0; i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					var shape = "box"; 
					if (WTW.buildingMolds[i].shape != "") {
						shape = WTW.buildingMolds[i].shape;
					}
					var mold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
					if (mold != null && WTW.buildingMolds[i].shown == "1") {
						if (WTW.shadowset == 3) {
							WTW.addShadowToShadowmaps(mold);
						} else if (WTW.shadowset == 2) {
							WTW.addShadowToShadowmaps(mold);
						}
					}
				}
			}
		}		
		if (WTW.communitiesMolds != null) {
			for (var i = 0; i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					var shape = "box"; 
					if (WTW.communitiesMolds[i].shape != "") {
						shape = WTW.communitiesMolds[i].shape;
					}
					var mold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
					if (mold != null && WTW.communitiesMolds[i].shown == "1") {
						if (WTW.shadowset == 3) {
							WTW.addShadowToShadowmaps(mold);
						} else if (WTW.shadowset > 0) {
							if (WTW.communitiesMolds[i].shape != "floor") {
								WTW.addShadowToShadowmaps(mold);
							}
						}
					}
				}
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-setShadowSettings=" +ex.message);
    }
}

WTWJS.prototype.setCookie = function(name,value,days) {
	try {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
		}
		if (wtw_protocol == "https://") {
			document.cookie = name + "=" + value + expires + "; domain=" + wtw_domainname + ";path=/;secure";
		} else {
			document.cookie = name + "non=" + value + expires + "; path=/";
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-setCookie=" +ex.message);
    }
}

WTWJS.prototype.getCookie = function(name) {
	var value = "";
	try {
		if (wtw_protocol != "https://") {
			name += "non=";
		}
		var cookies = document.cookie.split(';');
		for(var i=0;i < cookies.length;i++) {
			var cook = cookies[i];
			while (cook.charAt(0)==' ') {
				cook = cook.substring(1,cook.length);
			}
			if (cook.indexOf(name) == 0) {
				value = cook.substring(name.length,cook.length);
			}
		}
		if (value == "") {
			value = null;
		} else if (value.indexOf("non=") > -1) {
			value = value.replace("non=","");
		} else if (value.indexOf("=") > -1) {
			value = value.replace("=","");
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getCookie=" +ex.message);
    }
	return value;
}

WTWJS.prototype.deleteCookie = function(name) {
    WTW.setCookie(name,"",-1);
}

WTWJS.prototype.registerMouseOver = function(mold) {
	try {
		if (mold != null) {
			mold.actionManager = new BABYLON.ActionManager(scene);	
			mold.actionManager.registerAction(WTW.mouseOver);
			mold.actionManager.registerAction(WTW.mouseOut);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-registerMouseOver=" + ex.message);
	}
}

WTWJS.prototype.highlightMold = function(mold, color) {
	try {
		if (mold != null) {
			var opacity = .2;
			if (mold.material != undefined) {
				if (mold.material.subMaterials != undefined) {
					for (var i = 0; i < mold.material.subMaterials.length; i++) {
						mold.material.subMaterials[i].alpha = opacity;
						if (opacity == 1) {
							mold.material.subMaterials[i].specularColor = new BABYLON.Color3(opacity, opacity, opacity);
							mold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
							mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(.7, .7, .7);
						} else {
							mold.material.subMaterials[i].specularColor = new BABYLON.Color3(opacity, opacity, opacity);
							mold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
							if (color == "#008000") {
								mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(opacity, 1, opacity);
							} else if (color == "#800080") {
								mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(opacity, opacity, 1);
							} else {
								mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(1, opacity, opacity);
							}
						}
					}
				} else {
					mold.material.alpha = opacity;
					if (color == "#008000") {
						mold.material.specularColor = new BABYLON.Color3(opacity, 1, opacity);			
						mold.material.diffuseColor = new BABYLON.Color3(opacity, 1, opacity);	
						mold.material.emissiveColor = new BABYLON.Color3(opacity, 1, opacity);
					} else if (color == "#800080") {
						mold.material.specularColor = new BABYLON.Color3(opacity, opacity, 1);			
						mold.material.diffuseColor = new BABYLON.Color3(opacity, opacity, 1);	
						mold.material.emissiveColor = new BABYLON.Color3(opacity, opacity, 1);
					} else {
						mold.material.specularColor = new BABYLON.Color3(1, opacity, opacity);			
						mold.material.diffuseColor = new BABYLON.Color3(1, opacity, opacity);	
						mold.material.emissiveColor = new BABYLON.Color3(1, opacity, opacity);
					}
				}
				scene.render();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-highlightMold=" + ex.message);
	}
}

WTWJS.prototype.unhighlightMold = function(mold, opacity) {
	try {
		if (mold != null) {
			if (opacity == undefined) {
				opacity = 1;
			} 
			if (mold.material != undefined) {
				if (mold.material.subMaterials != undefined) {
					for (var i = 0; i < mold.material.subMaterials.length; i++) {
						mold.material.subMaterials[i].alpha = opacity;
						mold.material.subMaterials[i].specularColor = new BABYLON.Color3(opacity, opacity, opacity);
						mold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
						/* mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(opacity, opacity, opacity); */
						mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					}
				} else {
					mold.material.alpha = opacity;
					mold.material.specularColor = new BABYLON.Color3(opacity, opacity, opacity);			
					mold.material.diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);	
					/* mold.material.emissiveColor = new BABYLON.Color3(opacity, opacity, opacity); */
					mold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				}
				scene.render();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-unhighlightMold=" + ex.message);
	}
}

WTWJS.prototype.addMoldAnimation = function(moldname, childname, mold, objectanimations) {
	try {
		if (objectanimations != null && mold != null) {
			for (var i=0; i < objectanimations.length;i++) {
				if (objectanimations[i] != null) {
					if (objectanimations[i].animationname != undefined) {
						var moldnamepart = objectanimations[i].moldnamepart;
						var moldevent = objectanimations[i].moldevent;
						var startframe = Number(objectanimations[i].startframe);
						var endframe = Number(objectanimations[i].endframe);
						var parameters = startframe + "-" + endframe;
						var animationloop = false;
						var speedratio = Number(objectanimations[i].speedratio);
						var animationendscript = objectanimations[i].animationendscript;
						var animationendparameters = objectanimations[i].animationendparameters;
						var stopcurrentanimations = false;
						var additionalscript = objectanimations[i].additionalscript;
						var additionalparameters = objectanimations[i].additionalparameters;
						var soundid = objectanimations[i].soundid;
						var soundpath = objectanimations[i].soundpath;
						var soundmaxdistance = objectanimations[i].soundmaxdistance;
						var namepart = moldname.split('-');
						var submoldname = '';
						if (namepart[6] != null) {
							submoldname = namepart[6];
						} else if (namepart[2] != null) {
							submoldname = namepart[2];
						}
						if (moldnamepart == childname && submoldname != childname && childname != '') {
							moldname = moldname + "-" + childname;
						}
						var animationname = WTW.checkFunctionname(objectanimations[i].animationname, moldname);
						if (objectanimations[i].animationloop+'' == '1' || objectanimations[i].animationloop == true) {
							animationloop = true;
						}
						if (objectanimations[i].stopcurrentanimations+'' == '1' || objectanimations[i].stopcurrentanimations == true) {
							stopcurrentanimations = true;
						}
						
						var newanimation = true;
						var found = -1;
						for (var j=0;j<WTW.moldEvents.length;j++) {
							if (WTW.moldEvents[j] != null) {
								if (WTW.moldEvents[j].moldname == moldname && (moldnamepart == childname || moldnamepart == '') && WTW.moldEvents[j].moldevent == moldevent && WTW.moldEvents[j].parameters == parameters) {
									found = j;
									newanimation = false;
								}
							}
						}
						if (moldnamepart == childname || moldnamepart == '') {
							if (found == -1) {
								found = WTW.moldEvents.length;
								WTW.moldEvents[found] = WTW.newMoldEvent();
							}
							WTW.moldEvents[found].moldevent = moldevent;
							WTW.moldEvents[found].moldname = moldname;
							WTW.moldEvents[found].mold = mold;
							WTW.moldEvents[found].parameters = parameters;
							WTW.moldEvents[found].startframe = startframe;
							WTW.moldEvents[found].endframe = endframe;
							WTW.moldEvents[found].animationloop = animationloop;
							WTW.moldEvents[found].speedratio = speedratio;
							WTW.moldEvents[found].animationendscript = animationendscript;
							WTW.moldEvents[found].animationendparameters = animationendparameters;
							WTW.moldEvents[found].stopcurrentanimations = stopcurrentanimations;
							WTW.moldEvents[found].additionalscript = additionalscript;
							WTW.moldEvents[found].additionalparameters = additionalparameters;
							WTW.moldEvents[found].soundid = soundid;
							WTW.moldEvents[found].soundpath = soundpath;
							WTW.moldEvents[found].soundmaxdistance = soundmaxdistance;
							if (newanimation) {
								var moldfunction = null;
								window[animationname] = function(animationname) {
									WTW.runFunction(animationname);
								};
								WTW.moldEvents[found].animationname = animationname;
								WTW.moldEvents[found].moldfunction = window[animationname](animationname);
								if (WTW.moldEvents[found].soundid != '') {
									WTW.loadSoundToMold(mold, moldname, soundid, soundpath, animationloop, 'linear', soundmaxdistance, 1, 1, found);
								}
								if (moldevent == 'onload') {
									window[animationname](animationname);
								}
							}
						}
					}
				}
			}
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addMoldAnimation=" + ex.message);
	}
}

WTWJS.prototype.runFunction = function(animationname) {
	try {
		for (var i=0;i < WTW.moldEvents.length;i++) {
			if (WTW.moldEvents[i] != null) {
				if (WTW.moldEvents[i].animationname == animationname) {
					if (WTW.moldEvents[i].mold != null) {
						if (WTW.moldEvents[i].loaded) {
							var endscript = WTW.moldEvents[i].animationendscript;
							var startframe = Number(WTW.moldEvents[i].startframe);
							var endframe = Number(WTW.moldEvents[i].endframe);
							if (WTW.moldEvents[i].moldevent == 'onclicktoggle') {
								if (WTW.moldEvents[i].stage == '0') {
									WTW.moldEvents[i].stage = '1';
								} else {
									startframe = Number(WTW.moldEvents[i].endframe);
									endframe = Number(WTW.moldEvents[i].startframe);
									WTW.moldEvents[i].stage = '0';
								}
							}
							scene.beginAnimation(WTW.moldEvents[i].mold, startframe, endframe, WTW.moldEvents[i].animationloop, Number(WTW.moldEvents[i].speedratio), function() {if (typeof window[endscript] == "function") {window[endscript](endscript);}}, WTW.moldEvents[i].stopcurrentanimations);
							if (WTW.moldEvents[i].soundid != '' && WTW.soundMute == false) {
								if (typeof WTW.moldEvents[i].sound.play == 'function') {
									WTW.moldEvents[i].sound.play();
								}
							}
						} else {
							WTW.moldEvents[i].loaded = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-runFunction=" + ex.message);
	}
}

WTWJS.prototype.disposeMoldEvent = function(moldname) {
	try {
		for (var i=WTW.moldEvents.length;i>-1;i--) {
			if (WTW.moldEvents[i] != null) {
				if (WTW.moldEvents[i].moldname.indexOf(moldname) > -1) {
					if (typeof window[WTW.moldEvents[i].animationname] == 'function') {
						window[WTW.moldEvents[i].animationname] = null;
					}
					WTW.moldEvents.splice(i, 1);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeMoldEvent=" + ex.message);
	}
}

WTWJS.prototype.checkFunctionname = function(functionname, moldname) {
	var newfunctionname = "";
	try {
		var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var numbers = "01234567890_";
		var reservedwords = ["break","do","instanceof","typeof","case","else","new","var","catch","finally","return","void","continue","for","switch","while","debugger","function","this","with","default","if","throw","delete","in","try","abstract","export","interface","static","boolean","extends","long","super","byte","final","native","synchronized","char","float","package","throws","class","goto","private","transient","const","implements","protected","volatile","double","import","public","enum","int","short","null","let","true","false","alert","blur","closed","document","focus","frames","history","innerHeight","innerWidth","length","location","navigator","open","outerHeight","outerWidth","parent","screen","screenX","screenY","statusbar","window"];
		if (letters.indexOf(functionname.substr(0,1)) > -1) {
			newfunctionname = functionname.substr(0,1);
		}
		if (newfunctionname.length == 1) {
			for (var i=1;i<functionname.length;i++) {
				if (letters.indexOf(functionname.substr(i,1)) > -1 || numbers.indexOf(functionname.substr(i,1)) > -1) {
					newfunctionname += functionname.substr(i,1);
				}
			}
			for (var i=0;i<reservedwords.length;i++) {
				if (reservedwords[i] == newfunctionname) {
					newfunctionname = "";
				}
			}
		}
		if (typeof window[newfunctionname] == "object") {
			if (window[newfunctionname] != null) {
				newfunctionname = '';
			}
		} else if (typeof window[newfunctionname] != "undefined" || typeof window[newfunctionname] == "function") {
			newfunctionname = '';
		}
		if (newfunctionname == '') {
			newfunctionname = WTW.createFunctionName(moldname);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkFunctionname=" + ex.message);
	}
	return newfunctionname;
}

WTWJS.prototype.checkMoldEvent = function(moldevent, moldname) {
	try {
		for (var i=0;i<WTW.moldEvents.length;i++) {
			if (WTW.moldEvents[i] != null) {
				var checkmoldevent = WTW.moldEvents[i].moldevent;
				if (checkmoldevent == 'onclicktoggle') {
					checkmoldevent = 'onclick';
				}
				if (checkmoldevent == moldevent) {
					if (moldname == WTW.moldEvents[i].moldname) {
						if (typeof window[WTW.moldEvents[i].animationname] == 'function') {
							window[WTW.moldEvents[i].animationname](WTW.moldEvents[i].animationname);
						}
						var additionalscript = WTW.moldEvents[i].additionalscript;
						if (additionalscript != '') {
							if (additionalscript.indexOf("WTW.") > -1) {
								additionalscript = additionalscript.replace("WTW.","")
								if (typeof WTW[additionalscript] == 'function') {
									var parameters = WTW.moldEvents[i].additionalparameters;
									if (parameters.indexOf(',') > -1) {
										var values = parameters.split(',');
										WTW[additionalscript].apply(null, values);
									} else if (parameters != '') {
										WTW[additionalscript](parameters);
									} else {
										WTW[additionalscript]();
									}
								}
							} else if (typeof window[additionalscript] == 'function') {
								var parameters = WTW.moldEvents[i].additionalparameters;
								if (parameters.indexOf(',') > -1) {
									var values = parameters.split(',');
									window[additionalscript].apply(null, values);
								} else if (parameters != '') {
									window[additionalscript](parameters);
								} else {
									window[additionalscript]();
								}
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkMoldEvent=" + ex.message);
	}
}

WTWJS.prototype.checkHovers = function(mold) {
	try {
		var molds = null;
		var moldname = "";
		var moldind = -1;
		var shape = "";
		var namepart = null;
		if (WTW.currentID.indexOf("-") > -1) {
			namepart = WTW.currentID.split('-');
		}
		if (namepart[0] != null) {
			switch (namepart[0]) {
				case "thingmolds":
					molds = WTW.thingMolds;
					break;
				case "buildingmolds":
					molds = WTW.buildingMolds;
					break;
				case "communitymolds":
					molds = WTW.communitiesMolds;
					break;
			}
			if (molds != null) {
				if (namepart[1] != null) {
					moldind = Number(namepart[1]);
				}
				if (namepart[5] != null) {
					shape = namepart[5];
				}
				if (molds[moldind] != null) {
					moldname = molds[moldind].moldname;
				}
				if (typeof WTW.mouseOverMoldAdmin == 'function') {
					WTW.mouseOverMoldAdmin(mold, WTW.currentID);
				}
				if (namepart.length > 5) {
					WTW.checkToolTip(namepart, moldind);
					if (shape == 'image') {
						var hovermold = scene.getMeshByID(namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-" + namepart[4] + "-" + namepart[5] + "-hoverimage");
						var imagemold = scene.getMeshByID(namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-" + namepart[4] + "-" + namepart[5] + "-mainimage");
						if (hovermold != null && imagemold != null) {
							hovermold.position.x = -.25;
						}
					} else if (shape == 'storeproduct') {
						if (WTW.currentID.indexOf("descimage1") > -1) {
							var descimage1 = scene.getMeshByID(moldname + "-descimage1");
							if (descimage1 != null) {
								if (descimage1.material != undefined) {
									descimage1.material.alpha = .70;
								}
							}
						}
						if (WTW.currentID.indexOf("descimage2") > -1) {
							var descimage2 = scene.getMeshByID(moldname + "-descimage2");
							if (descimage2 != null) {
								if (descimage2.material != undefined) {
									descimage2.material.alpha = .70;
								}
							}
						}
						if (WTW.currentID.indexOf("addtocart1") > -1) {
							var addtocart1 = scene.getMeshByID(moldname + "-addtocart1");
							if (addtocart1 != null) {
								if (addtocart1.material != undefined) {
									addtocart1.material.alpha = 0;
								}
							}
						}
						if (WTW.currentID.indexOf("addtocart2") > -1) {
							var addtocart2 = scene.getMeshByID(moldname + "-addtocart2");
							if (addtocart2 != null) {
								if (addtocart2.material != undefined) {
									addtocart2.material.alpha = 0;
								}
							}
						}
						if (WTW.currentID.indexOf("readmore1") > -1) {
							var readmore1 = scene.getMeshByID(moldname + "-readmore1");
							if (readmore1 != null) {
								if (readmore1.material != undefined) {
									readmore1.material.alpha = 0;
								}
							}
						}
						if (WTW.currentID.indexOf("readmore2") > -1) {
							var readmore2 = scene.getMeshByID(moldname + "-readmore2");
							if (readmore2 != null) {
								if (readmore2.material != undefined) {
									readmore2.material.alpha = 0;
								}
							}
						}
					} else if (WTW.currentID.indexOf("carthover") > -1) {
						var carthover = scene.getMeshByID(moldname + "-carthover");
						if (carthover != null) {
							if (carthover.material != undefined) {
								carthover.material.alpha = 1;
							}
						}
					} else if (WTW.currentID.indexOf("storecategories") > -1) {
						if (WTW.currentID.indexOf("categorybuttonhover") > -1) {
							var categoryhover = scene.getMeshByID(WTW.currentID);
							if (categoryhover != null) {
								if (categoryhover.material != undefined) {
									categoryhover.material.alpha = 1;
								}
							}
						}
						if (WTW.currentID.indexOf("downbuttonhover") > -1) {
							var downbuttonhover = scene.getMeshByID(WTW.currentID);
							if (downbuttonhover != null) {
								if (downbuttonhover.material != undefined) {
									downbuttonhover.material.alpha = 1;
								}
							}
						}
						if (WTW.currentID.indexOf("upbuttonhover") > -1) {
							var upbuttonhover = scene.getMeshByID(WTW.currentID);
							if (upbuttonhover != null) {
								if (upbuttonhover.material != undefined) {
									upbuttonhover.material.alpha = 1;
								}
							}
						}
					} else {
						var hovermold = scene.getMeshByID(WTW.currentID + "hover");
						var imagemold = scene.getMeshByID(WTW.currentID);
						if (hovermold != null && imagemold != null) {
							WTW.setDirectionalOpacity(WTW.currentID,0);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkHovers=" + ex.message);
	}
}

WTWJS.prototype.resetHovers = function() {
	try {
		if (WTW.lastID.indexOf("-") > -1) {
			var molds = null;
			var moldname = "";
			var moldind = -1;
			var shape = "";
			var namepart = WTW.lastID.split('-');
			if (namepart[0] != null) {
				switch (namepart[0]) {
					case "thingmolds":
						molds = WTW.thingMolds;
						break;
					case "buildingmolds":
						molds = WTW.buildingMolds;
						break;
					case "communitymolds":
						molds = WTW.communitiesMolds;
						break;
				}
			}
			if (molds != null) {
				if (namepart[1] != null) {
					moldind = Number(namepart[1]);
				}
				if (namepart[5] != null) {
					shape = namepart[5];
				}
				if (molds[moldind] != null) {
					moldname = molds[moldind].moldname;
				}
				if (namepart.length > 5) {
					if (shape == 'image') {
						var hovermold = scene.getMeshByID(namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-" + namepart[4] + "-" + namepart[5] + "-hoverimage");
						var imagemold = scene.getMeshByID(namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-" + namepart[4] + "-" + namepart[5] + "-mainimage");
						if (hovermold != null && imagemold != null) {
							hovermold.position.x = 0;
						}
					} else if (WTW.lastID.indexOf("scrollboxbodytext") > -1) {
						WTW.resetScrollBox(moldname);
					} else if (shape == 'storeproduct') {
						if (WTW.lastID.indexOf("descimage1") > -1) {
							var descimage1 = scene.getMeshByID(moldname + "-descimage1");
							if (descimage1 != null) {
								if (descimage1.material != undefined) {
									descimage1.material.alpha = 0;
								}
							}
						}
						if (WTW.lastID.indexOf("descimage2") > -1) {
							var descimage2 = scene.getMeshByID(moldname + "-descimage2");
							if (descimage2 != null) {
								if (descimage2.material != undefined) {
									descimage2.material.alpha = 0;
								}
							}
						}
						if (WTW.lastID.indexOf("addtocart1") > -1) {
							var addtocart1 = scene.getMeshByID(moldname + "-addtocart1");
							if (addtocart1 != null) {
								if (addtocart1.material != undefined) {
									addtocart1.material.alpha = 1;
								}
							}
						}
						if (WTW.lastID.indexOf("addtocart2") > -1) {
							var addtocart2 = scene.getMeshByID(moldname + "-addtocart2");
							if (addtocart2 != null) {
								if (addtocart2.material != undefined) {
									addtocart2.material.alpha = 1;
								}
							}
						}
						if (WTW.lastID.indexOf("readmore1") > -1) {
							var readmore1 = scene.getMeshByID(moldname + "-readmore1");
							if (readmore1 != null) {
								if (readmore1.material != undefined) {
									readmore1.material.alpha = 1;
								}
							}
						}
						if (WTW.lastID.indexOf("readmore2") > -1) {
							var readmore2 = scene.getMeshByID(moldname + "-readmore2");
							if (readmore2 != null) {
								if (readmore2.material != undefined) {
									readmore2.material.alpha = 1;
								}
							}
						}
					} else if (WTW.lastID.indexOf("carthover") > -1) {
						var carthover = scene.getMeshByID(moldname + "-carthover");
						if (carthover != null) {
							if (carthover.material != undefined) {
								carthover.material.alpha = 0;
							}
						}
					} else if (WTW.lastID.indexOf("storecategories") > -1) {
						if (WTW.lastID.indexOf("categorybuttonhover") > -1) {
							var categoryhover = scene.getMeshByID(WTW.lastID);
							if (categoryhover != null) {
								if (categoryhover.material != undefined) {
									categoryhover.material.alpha = 0;
								}
							}
						}
						if (WTW.lastID.indexOf("downbuttonhover") > -1) {
							var downbuttonhover = scene.getMeshByID(WTW.lastID);
							if (downbuttonhover != null) {
								if (downbuttonhover.material != undefined) {
									downbuttonhover.material.alpha = 0;
								}
							}
						}
						if (WTW.lastID.indexOf("upbuttonhover") > -1) {
							var upbuttonhover = scene.getMeshByID(WTW.lastID);
							if (upbuttonhover != null) {
								if (upbuttonhover.material != undefined) {
									upbuttonhover.material.alpha = 0;
								}
							}
						}
					} else { 
						var hovermold = scene.getMeshByID(WTW.lastID + "hover");
						var imagemold = scene.getMeshByID(WTW.lastID);
						if (hovermold != null && imagemold != null) {
							WTW.setDirectionalOpacity(WTW.lastID,1);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetHovers=" + ex.message);
	}
}

WTWJS.prototype.checkToolTip = function(namepart, moldind) {
	try {
		var alttag = '';
		var moldgroup = namepart[0];
		var moldid = namepart[2];
		molds = null;
		switch (moldgroup) {
			case "thingmolds":
				molds = WTW.thingMolds;
				break;
			case "buildingmolds":
				molds = WTW.buildingMolds;
				break;
			case "communitymolds":
				molds = WTW.communitiesMolds;
				break;
			case "things":
				molds = WTW.things;
				break;
			case "buildings":
				molds = WTW.buildings;
				break;
			case "communities":
				molds = WTW.communities;
				break;
			case "connectinggrids":
				molds = WTW.connectingGrids;
				break;
		}
		if (molds != null) {
			if (molds[moldind] != null) {
				if (molds[moldind].alttag.name != undefined) {
					alttag = molds[moldind].alttag.name;
				}
			}
			if (alttag == "" && thingid == "" && moldgroup == "thingmolds") {
				namepart = WTW.thingMolds[moldind].parentname.split('-');
				moldind = Number(namepart[1]);
				while (namepart[0].indexOf("actionzone") > -1) {
					moldind = Number(namepart[1]);
					namepart = WTW.actionZones[moldind].parentname.split('-');
					moldind = Number(namepart[1]);
				}
				WTW.checkToolTip(namepart, moldind);
			} else {
				if (alttag != "") {
					WTW.showToolTip(alttag);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkToolTip=" + ex.message);
	}
}

WTWJS.prototype.showToolTip = function(tip) {
	try {
		if (tip != "") {
			dGet('wtw_itooltip').innerHTML = tip;
			WTW.show('wtw_itooltip');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-showtooltip=" + ex.message);
	}
}

WTWJS.prototype.setToolTipLocation = function() {
	try {
		var iwidth = WTW.mouseX - (dGet('wtw_itooltip').offsetWidth/2);
		var iheight = WTW.mouseY - dGet('wtw_itooltip').offsetHeight - 20;
		if (WTW.mouseX < WTW.sizeX / 5) {
			iwidth += (dGet('wtw_itooltip').offsetWidth/2);
		} else if (WTW.mouseX > WTW.sizeX - (WTW.sizeX / 5)) {
			iwidth -= (dGet('wtw_itooltip').offsetWidth/2);
		}
		if (WTW.mouseY < WTW.sizeY / 5) {
			iheight += (dGet('wtw_itooltip').offsetHeight + 30);
		}
		dGet('wtw_itooltip').style.left = iwidth + 'px';
		dGet('wtw_itooltip').style.top = iheight + 'px';
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setToolTipLocation=" + ex.message);
    }
}

WTWJS.prototype.refreshTextBox = function() {
	try {
		if (WTW.selectedMoldName.indexOf("-") > -1) {
			var namepart = WTW.selectedMoldName.split('-');
			if (WTW.selectedMoldName.indexOf("-scrollboxbodytext") > -1) {
				var scrollboxbodytext = scene.getMeshByID(WTW.selectedMoldName);
				if (scrollboxbodytext != null && scrollboxbodytext.WTW != undefined) {
					var webtext = scrollboxbodytext.WTW.webtext.webtext;
					var scrollpos = Number(scrollboxbodytext.WTW.webtext.scrollpos);
					WTW.scrollBoxRepaint(WTW.selectedMoldName.replace("-scrollboxbodytext",""), scrollpos);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-refreshTextBox=" + ex.message);
	}
}

WTWJS.prototype.resetScrollBox = function(moldname) {
	try {
		var groovetexture = "/content/stock/walls/lightgray.jpg";
		var buttontexture = "/content/stock/walls/blue.jpg";
		var scrollboxtab = scene.getMeshByID(moldname + "-scrollboxtab");
		if (scrollboxtab != null && scrollboxtab.WTW != undefined) {
			try {
				if (scrollboxtab.material != null) {
					scrollboxtab.material.dispose();
					scrollboxtab.material = null;
				}	
			} catch(ex) {}
			scrollboxtab.material = WTW.addCoveringTexture(moldname + "-scrollboxtab", scrollboxtab.WTW, scrollboxtab.scaling.x, scrollboxtab.scaling.y, scrollboxtab.scaling.z, scrollboxtab.WTW.scaling.special1, scrollboxtab.WTW.scaling.special1);
		}
		var scrollboxup = scene.getMeshByID(moldname + "-scrollboxup");
		if (scrollboxup != null && scrollboxup.WTW != undefined) {
			try {
				if (scrollboxup.material != null) {
					scrollboxup.material.dispose();
					scrollboxup.material = null;
				}	
			} catch(ex) {}
			scrollboxup.material = WTW.addCoveringTexture(moldname + "-scrollboxup", scrollboxup.WTW, scrollboxup.scaling.x, scrollboxup.scaling.y, scrollboxup.scaling.z, scrollboxup.WTW.scaling.special1, scrollboxup.WTW.scaling.special1);
		}
		var scrollboxuparrow = scene.getMeshByID(moldname + "-scrollboxuparrow");
		if (scrollboxuparrow != null && scrollboxuparrow.WTW != undefined) {
			try {
				if (scrollboxuparrow.material != null) {
					scrollboxuparrow.material.dispose();
					scrollboxuparrow.material = null;
				}	
			} catch(ex) {}
			scrollboxuparrow.material = WTW.addCoveringTexture(moldname + "-scrollboxuparrow", scrollboxuparrow.WTW, scrollboxuparrow.scaling.x, scrollboxuparrow.scaling.y, scrollboxuparrow.scaling.z, scrollboxuparrow.WTW.scaling.special1, scrollboxuparrow.WTW.scaling.special1);
		}
		var scrollboxdown = scene.getMeshByID(moldname + "-scrollboxdown");
		if (scrollboxdown != null && scrollboxdown.WTW != undefined) {
			try {
				if (scrollboxdown.material != null) {
					scrollboxdown.material.dispose();
					scrollboxdown.material = null;
				}	
			} catch(ex) {}
			scrollboxdown.material = WTW.addCoveringTexture(moldname + "-scrollboxdown", scrollboxdown.WTW, scrollboxdown.scaling.x, scrollboxdown.scaling.y, scrollboxdown.scaling.z, scrollboxdown.WTW.scaling.special1, scrollboxdown.WTW.scaling.special1);
		}
		var scrollboxdownarrow = scene.getMeshByID(moldname + "-scrollboxdownarrow");
		if (scrollboxdownarrow != null && scrollboxdownarrow.WTW != undefined) {
			try {
				if (scrollboxdownarrow.material != null) {
					scrollboxdownarrow.material.dispose();
					scrollboxdownarrow.material = null;
				}	
			} catch(ex) {}
			scrollboxdownarrow.material = WTW.addCoveringTexture(moldname + "-scrollboxdownarrow", scrollboxdownarrow.WTW, scrollboxdownarrow.scaling.x, scrollboxdownarrow.scaling.y, scrollboxdownarrow.scaling.z, scrollboxdownarrow.WTW.scaling.special1, scrollboxdownarrow.WTW.scaling.special1);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetScrollBox=" + ex.message);
	}
}

WTWJS.prototype.loadSoundToMold = function(mold, moldname, soundid, soundpath, soundloop, soundattenuation, soundmaxdistance, soundrollofffactor, soundrefdistance, eventind) {
	try {
		if (mold != null && soundid != '') {
			var soundurl = "/connect/sound.php?soundid=" + soundid;
			if (soundpath != "") {
				soundurl = soundpath;
			}
			var soundautoplay = false;
			if (WTW.soundMute == false && eventind == -1) {
				soundautoplay = true;
			}
			if (soundloop != '1') {
				soundloop = false;
			} else {
				soundloop = true;
			}
			if (soundmaxdistance != '') {
				if (WTW.isNumeric(soundmaxdistance)) {
					soundmaxdistance = Number(soundmaxdistance);
				} else {
					soundmaxdistance = 100;
				}
			} else {
				soundmaxdistance = 100;
			}
			if (soundrollofffactor != '') {
				if (WTW.isNumeric(soundrollofffactor)) {
					soundrollofffactor = Number(soundrollofffactor);
				} else {
					soundrollofffactor = 1;
				}
			} else {
				soundrollofffactor = 1;
			}
			if (soundrefdistance != '') {
				if (WTW.isNumeric(soundrefdistance)) {
					soundrefdistance = Number(soundrefdistance);
				} else {
					soundrefdistance = 1;
				}
			} else {
				soundrefdistance = 1;
			}
			if (soundattenuation != '' && soundattenuation != 'none') {
				var request = new XMLHttpRequest();
				request.open('GET', soundurl, true);
				request.responseType = "arraybuffer";
				request.onreadystatechange = function () {
					if (request.readyState == 4) {
						if (request.status == 200) {
							var sound = new BABYLON.Sound(moldname + "sound", request.response, scene, null, {
								loop: soundloop, 
								autoplay: soundautoplay, 
								spatialSound: true,
								distanceModel: soundattenuation, 
								maxDistance : soundmaxdistance,
								rolloffFactor: soundrollofffactor,
								refDistance : soundrefdistance
							});
							sound.attachToMesh(mold);
							if (WTW.soundMute == true) {
								sound.pause();
							}
							if (eventind == -1) {
								var namepart = moldname.split('-');
								var moldind = -1;
								var molds = null;
								if (namepart[0].indexOf("community") > -1) {
									molds = WTW.communitiesMolds;
								} else if (namepart[0].indexOf("thing") > -1) {
									molds = WTW.thingMolds;
								} else if (namepart[0].indexOf("building") > -1) {
									molds = WTW.buildingMolds;
								}
								if (WTW.isNumeric(namepart[1])) {
									moldind = Number(namepart[1]);
								}
								if (molds[moldind] != null) {
									molds[moldind].sound.sound = sound;
								}
							} else {
								if (WTW.moldEvents[eventind] != null) {
									WTW.moldEvents[eventind].sound = sound;
								}
							}
						}
					}
				};
				request.send(null);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loadSoundToMold=" + ex.message);
	}
}

WTWJS.prototype.disposeSound = function(moldname) {
	try {
		var namepart = moldname.split('-');
		var molds = null;
		switch (namepart[0]) {
			case "communitymolds":
				molds = WTW.communitiesMolds;
				break;
			case "buildingmolds":
				molds = WTW.buildingMolds;
				break;
			case "thingmolds":
				molds = WTW.thingMolds;
				break;
		}
		if (molds != null) {
			var moldind = -1;
			if (WTW.isNumeric(namepart[1])) {
				moldind = Number(namepart[1]);
			}
			if (molds[moldind] != null) {
				if (molds[moldind].sound.sound != '') {
					molds[moldind].sound.sound.stop(0);
					molds[moldind].sound.sound.detachFromMesh();
					molds[moldind].sound.sound.dispose();
					molds[moldind].sound.sound = null;
					molds[moldind].sound.sound = '';
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeSound=" + ex.message);
	}
}

WTWJS.prototype.soundVolumeLinear = function(moldname, maxdistance) {
	var volume = 0;
	try {
		if (WTW.soundMute == false) {
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				if (WTW.isNumeric(maxdistance)) {
					maxdistance = Number(maxdistance);
				} else {
					maxdistance = 100;
				}
				mold.computeWorldMatrix(true);
				var abspos = mold.getAbsolutePosition();
				var x = abspos.x;
				var y = abspos.y;
				var z = abspos.z;
				var dist = Math.round(Math.sqrt(Math.pow(x-WTW.camera.position.x, 2) + Math.pow(y-WTW.camera.position.y, 2) + Math.pow(z-WTW.camera.position.z, 2)));
				if (dist < maxdistance) {
					volume = 1-(1/maxdistance*dist);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-soundVolumeLinear=" + ex.message);
	}
	return volume;
}

WTWJS.prototype.toggleSoundMute = function() {
	try {
		if (WTW.soundMute == true) { 
			dGet('wtw_menumute').src = "/content/system/images/menumuteoff32.png";
			dGet('wtw_menumute').alt = "Turn Sound Off";
			dGet('wtw_menumute').title = "Turn Sound Off";
			dGet('wtw_submenumute').src = "/content/system/images/menumuteoff.png";
			dGet('wtw_submenumute').alt = "Turn Sound Off";
			dGet('wtw_submenumute').title = "Turn Sound Off";
			dGet('wtw_submenumutetext').innerHTML = "Sound is On";
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == false) {
									WTW.communitiesMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.communitiesMolds[i].shape == 'video') {
						var videomold = scene.getMeshByID(WTW.communitiesMolds[i].moldname + "-mainvideo");
						if (videomold != null) {
							if (typeof videomold.material.diffuseTexture.video.pause == 'function') {
								videomold.material.diffuseTexture.video.volume = WTW.soundVolumeLinear(WTW.communitiesMolds[i].moldname, WTW.communitiesMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == false) {
									WTW.buildingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.buildingMolds[i].shape == 'video') {
						var videomold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-mainvideo");
						if (videomold != null) {
							if (typeof videomold.material.diffuseTexture.video.pause == 'function') {
								videomold.material.diffuseTexture.video.volume = WTW.soundVolumeLinear(WTW.buildingMolds[i].moldname, WTW.buildingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == false) {
									WTW.thingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.thingMolds[i].shape == 'video') {
						var videomold = scene.getMeshByID(WTW.thingMolds[i].moldname + "-mainvideo");
						if (videomold != null) {
							if (typeof videomold.material.diffuseTexture.video.pause == 'function') {
								videomold.material.diffuseTexture.video.volume = WTW.soundVolumeLinear(WTW.thingMolds[i].moldname, WTW.thingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			WTW.soundMute = false;
		} else {
			dGet('wtw_menumute').src = "/content/system/images/menumuteon32.png";
			dGet('wtw_menumute').alt = "Turn Sound On";
			dGet('wtw_menumute').title = "Turn Sound On";
			dGet('wtw_submenumute').src = "/content/system/images/menumuteon.png";
			dGet('wtw_submenumute').alt = "Turn Sound On";
			dGet('wtw_submenumute').title = "Turn Sound On";
			dGet('wtw_submenumutetext').innerHTML = "Sound is Off";
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == true) {
									WTW.communitiesMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == true) {
									WTW.buildingMolds[i].sound.sound.pause();
								}
							}
						}
					} 
					if (WTW.buildingMolds[i].shape == 'video') {
						var videomold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-mainvideo");
						if (videomold != null) {
							if (typeof videomold.material.diffuseTexture.video.pause == 'function') {
								videomold.material.diffuseTexture.video.volume = 0;
							}
						}
					}
				}
			}
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == true) {
									WTW.thingMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			for (var i=0;i < WTW.moldEvents.length; i++) {
				if (WTW.moldEvents[i] != null) {
					if (WTW.moldEvents[i].soundid != undefined) {
						if (WTW.moldEvents[i].soundid != '') {
							if (typeof WTW.moldEvents[i].sound.pause == 'function') {
								if (WTW.moldEvents[i].sound.isPlaying == true) {
									WTW.moldEvents[i].sound.pause();
								}
							}
						}
					}
				}
			}
			WTW.soundMute = true;
		}
		WTW.setCookie("soundmute",WTW.soundMute,30);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleSoundMute=" + ex.message);
	}
}

WTWJS.prototype.toggleCameraTwo = function() {
	try {
		if (dGet('wtw_cameratwotext').innerHTML == "Second Camera Off") { 
			dGet('wtw_cameratwotext').innerHTML = "Second Camera On";
			dGet('wtw_cameratwoicon').src = "/content/system/images/menucamera.png";
			dGet('wtw_cameratwoicon').alt = "Hide Second Camera";
			dGet('wtw_cameratwoicon').title = "Hide Second Camera";
			WTW.show('wtw_cameratwoselect');
			WTW.setCookie("showcameratwo","1",30);
		} else {
			dGet('wtw_cameratwotext').innerHTML = "Second Camera Off";
			dGet('wtw_cameratwoicon').src = "/content/system/images/menucameraoff.png";
			dGet('wtw_cameratwoicon').alt = "Show Second Camera";
			dGet('wtw_cameratwoicon').title = "Show Second Camera";
			WTW.hide('wtw_cameratwoselect');
			WTW.setCookie("showcameratwo","0",30);
		}
		WTW.switchCamera(2);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleCameraTwo=" + ex.message);
	}
}

WTWJS.prototype.toggleCompass = function() {
	try {
		if (dGet('wtw_compassvisibility').innerHTML == "Compass is Visible") { 
			dGet('wtw_compassvisibility').innerHTML = "Compass is Hidden";
			dGet('wtw_compassicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_compassicon').alt = "Show Compass";
			dGet('wtw_compassicon').title = "Show Compass";
			WTW.setCookie("showcompass","0",30);
		} else {
			dGet('wtw_compassvisibility').innerHTML = "Compass is Visible";
			dGet('wtw_compassicon').src = "/content/system/images/menuon.png";
			dGet('wtw_compassicon').alt = "Hide Compass";
			dGet('wtw_compassicon').title = "Hide Compass";
			WTW.setCookie("showcompass","1",30);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleCompass=" + ex.message);
	}
}

WTWJS.prototype.toggleArrows = function() {
	try {
		if (dGet('wtw_arrowsvisibility').innerHTML == "Arrows are Visible") { 
			dGet('wtw_arrowsvisibility').innerHTML = "Arrows are Hidden";
			dGet('wtw_arrowsicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_arrowsicon').alt = "Show Arrows";
			dGet('wtw_arrowsicon').title = "Show Arrows";
			WTW.hide('wtw_iwalkarrow');
			WTW.hide('wtw_iwalkarrow2');
			WTW.setCookie("showarrows","0",30);
		} else {
			dGet('wtw_arrowsvisibility').innerHTML = "Arrows are Visible";
			dGet('wtw_arrowsicon').src = "/content/system/images/menuon.png";
			dGet('wtw_arrowsicon').alt = "Hide Arrows";
			dGet('wtw_arrowsicon').title = "Hide Arrows";
			WTW.show('wtw_iwalkarrow');
			WTW.show('wtw_iwalkarrow2');
			WTW.setCookie("showarrows","1",30);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleArrows=" + ex.message);
	}
}

WTWJS.prototype.toggleFPS = function() {
	try {
		if (dGet('wtw_fpsvisibility').innerHTML == "Mold Count/FPS are Visible") { 
			dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Hidden";
			dGet('wtw_fpsicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_fpsicon').alt = "Show Mold Count";
			dGet('wtw_fpsicon').title = "Show Mold Count";
			WTW.hide('wtw_showmeshfps');
			WTW.setCookie("showfps","0",30);
			WTW.showFPS = 0;
		} else {
			dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Visible";
			dGet('wtw_fpsicon').src = "/content/system/images/menuon.png";
			dGet('wtw_fpsicon').alt = "Hide Mold Count";
			dGet('wtw_fpsicon').title = "Hide Mold Count";
			WTW.show('wtw_showmeshfps');
			WTW.setCookie("showfps","1",30);
			WTW.showFPS = 1;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleFPS=" + ex.message);
	}
}

WTWJS.prototype.toggleAvatarIDs = function() {
	try {
		var setvisibility = false;
		if (dGet('wtw_submenuavataridstext').innerHTML == 'Avatar IDs are Off') {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are On';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridson.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs Off';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs Off';
			WTW.AvatarIDs = 1;
			WTW.setCookie("AvatarIDs",WTW.AvatarIDs,30);
			setvisibility = true;
		} else {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
			WTW.AvatarIDs = 0;
			WTW.setCookie("AvatarIDs",WTW.AvatarIDs,30);
		}
		var meshes = scene.meshes;
		if (meshes != null) {
			for (var i=0;i<meshes.length;i++) {
				if (meshes[i] != null) {
					if (meshes[i].name.indexOf("person-") > -1 && meshes[i].name.indexOf("-nameplate") > -1) {
						meshes[i].isVisible = setvisibility;
					}
				}
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-toggleAvatarIDs=" +ex.message);
    }
}

WTWJS.prototype.toggleMultiPlayer = function() {
	try {
		if (dGet('wtw_submenumultiplayertext').innerHTML == 'Multi-Player is Off') {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is On';
			dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayer.png';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayer.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player Off';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player Off';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '20';
			}
			WTW.multiPerson = dGet('wtw_tavatarcount').value;
			WTW.multipersonOn = 1;
			WTW.setCookie("multipersonon","1",30);
			WTW.setCookie("multiperson",WTW.multiPerson,30);
			if (WTW.setupMode == 0) {
				WTW.initMultiuser();
			}
		} else {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
			dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '0';
			}
			WTW.multiPerson = dGet('wtw_tavatarcount').value;
			WTW.multipersonOn = 0;
			WTW.setCookie("multipersonon","0",30);
			WTW.setCookie("multiperson",WTW.multiPerson,30);
			WTW.clearMultiuser(dGet('wtw_tinstanceid').value, dGet('wtw_tuserid').value);
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-toggleMultiPlayer=" +ex.message);
    }
}

WTWJS.prototype.getUploadFileData = function(imageid) {
	var filedata = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgARgBQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9DooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBaKKKACiiigAooooAKSiigAooooAWiiigApKKKACiiigD//Z';
	var title = 'default.jpg';
	var name = 'default.jpg';
	var extension = 'jpg';
	var type = 'image/jpeg';
	var size = '792.00';
	var width = '80';
	var height = '80';
	var originalid = 'wwq1yppbimir7tgv';
	var websizeid = 't1qlqxd6pzubzzzy';
	var thumbnailid = 't1qlqxd6pzubzzzy';
	var filepath = '/content/system/stock/lightgray-512x447.jpg';
	var newimage = new Image();
	try {
		if (wtw_uploads != null && imageid != '') {
			if (wtw_uploads.length > 0) {
				for (var i=0;i < wtw_uploads.length;i++) {
					if (wtw_uploads[i].uploadid == imageid) {
						filedata = wtw_uploads[i].data;
						if (wtw_uploads[i].uploadinfo != undefined) {
							title = wtw_uploads[i].uploadinfo.title;
							name = wtw_uploads[i].uploadinfo.name;
							extension = wtw_uploads[i].uploadinfo.extension;
							type = wtw_uploads[i].uploadinfo.type;
							size = wtw_uploads[i].uploadinfo.size;
							width = wtw_uploads[i].uploadinfo.width;
							height = wtw_uploads[i].uploadinfo.height;
						}
						originalid = wtw_uploads[i].originalid;
						websizeid = wtw_uploads[i].websizeid;
						thumbnailid = wtw_uploads[i].thumbnailid;
						filepath = wtw_uploads[i].filepath;
						newimage.id = imageid;
						newimage.src = filedata;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getUploadFileData=" + ex.message);
	}
	return {
		filedata:filedata,
		title:title,
		name:name,
		extension:extension,
		type:type,
		size:size,
		width:width,
		height:height,
		originalid:originalid,
		websizeid:websizeid,
		thumbnailid:thumbnailid,
		filepath:filepath,
		image:newimage
	}
}

WTWJS.prototype.checkImageClick = function(moldname) {
	try {
		if (moldname.indexOf("-") > -1) {
			var namepart = moldname.split('-');
			var i = -1;
			if (namepart[1] != null) {
				i = Number(namepart[1]);
				var molds = WTW.communitiesMolds;
				if (namepart[0] == "buildingmolds") {
					molds = WTW.buildingMolds;
				}
				if (namepart[0] == "thingmolds") {
					molds = WTW.thingMolds;
				} 
				if (moldname.indexOf("-thingmold-") > -1) {
					molds = WTW.thingMolds;
					i = Number(namepart[5]);
				}
				if (molds[i] != null) {
					if (molds[i].graphics.webimages[0] != null) {
						var parameters = "";
						if (molds[i].graphics.webimages[0].jsparameters != undefined) {
							parameters = molds[i].graphics.webimages[0].jsparameters;
						}
						if (molds[i].graphics.webimages[0].jsfunction != undefined) {
							var functionname = molds[i].graphics.webimages[0].jsfunction;
							if (functionname != "") {
								WTW.setFunction(functionname, parameters, moldname);
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkImageClick=" + ex.message);
	}
}

WTWJS.prototype.checkVideoClick = function(moldname, force) {
    try {
		if (force == undefined) {
			force = 3;
		}
		moldname = moldname.replace('-base','').replace('-mainvideo','');
        var videomold = scene.getMeshByID(moldname + "-mainvideo");
        var videoposter = scene.getMeshByID(moldname + "-videoposter");

        if (videomold != null) {
            if (!videomold.WTW.firstvideoclick) {
                videomold.material.diffuseTexture.video.src = videomold.WTW.videosrc;
                videomold.WTW.firstvideoclick = true;
                videomold.material.diffuseTexture.video.load();
                videomold.material.diffuseTexture.video.pause();
				videoposter.position.x = videomold.position.x -.1;
            }
			if ((videomold.material.diffuseTexture.video.paused && force == 3) || force == 1 || force == 2) {
				videoposter.position.x = videomold.position.x +.1;
				if (force == 2) { // start again
					videomold.material.diffuseTexture.video.load();
				} else if (force == 1) {
				} // force == 1 // play
                videomold.material.diffuseTexture.video.play();
            } else { // pause
				if (force == -1) { // pause at start
					videoposter.position.x = videomold.position.x -.1;
					videomold.material.diffuseTexture.video.load();
				} else {
					videoposter.position.x = videomold.position.x +.1;
				}
                videomold.material.diffuseTexture.video.pause();
            }
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-checkVideoClick=" + ex.message);
    }
}

WTWJS.prototype.loadFromLocalDB = function(storename, id) {
  return new Promise(
    function(resolve, reject) {
      var dbRequest = indexedDB.open(storename);
      dbRequest.onerror = function(event) {
		reject(Error('False'));
      };
      dbRequest.onupgradeneeded = function(event) {
        event.target.transaction.abort();
        reject(Error('False'));
      };
      dbRequest.onsuccess = function(event) {
        var database      = event.target.result;
        var transaction   = database.transaction([storename]);
        var objectStore   = transaction.objectStore(storename);
        var objectRequest = objectStore.get(id);
        objectRequest.onerror = function(event) {
          reject(Error('False'));
        };
        objectRequest.onsuccess = function(event) {
          if (objectRequest.result) {
			  resolve(objectRequest.result);
          } else {
			  reject(Error('False'));
		  }
        };
      };
    }
  );
}

WTWJS.prototype.saveToLocalDB = function(storename, object) {
  return new Promise(
    function(resolve, reject) {
      if (object.id === undefined) reject(Error(''));
      var dbRequest = indexedDB.open(storename);
      dbRequest.onerror = function(event) {
        reject(Error(''));
      };
      dbRequest.onupgradeneeded = function(event) {
        var database    = event.target.result;
        var objectStore = database.createObjectStore(storename, {keyPath: "id"});
      };
      dbRequest.onsuccess = function(event) {
        var database      = event.target.result;
        var transaction   = database.transaction([storename], 'readwrite');
        var objectStore   = transaction.objectStore(storename);
        var objectRequest = objectStore.put(object); // Overwrite if exists
        objectRequest.onerror = function(event) {
          reject(Error(''));
        };
        objectRequest.onsuccess = function(event) {
          /* resolve('Data saved OK'); */
        };
      };
    }
  );
}

/* need -getCountDB- tool currently not in use */
WTWJS.prototype.getCountDB = function(storename) {
  return new Promise(
    function(resolve, reject) {
      var dbRequest = indexedDB.open(storename);
      dbRequest.onerror = function(event) {
        reject(Error(''));
      };
      dbRequest.onupgradeneeded = function(event) {
        var database    = event.target.result;
        var objectStore = database.createObjectStore(storename, {keyPath: "id"});
      };
      dbRequest.onsuccess = function(event) {
        var database      = event.target.result;
        var transaction   = database.transaction([storename], 'readonly');
        var objectStore   = transaction.objectStore(storename);
        var count = objectStore.count();
		count.onsuccess = function() {
			console.log("db count=" + count.result);
		};
      };
    }
  );
}

WTWJS.prototype.isUploadReadyOrAdd = function(uploadid) {
	var ready = false;
	try {
		if (uploadid != '') {
			/* var localdbname = wtw_domainname.replace(".",""); */
			var queue = null;
			var found = false;
			if (wtw_uploads != null && uploadid != "") {
				for (var i = 0; i < wtw_uploads.length; i++) {
					if (wtw_uploads[i] != null) {
						if (wtw_uploads[i].uploadid == uploadid) {
							queue = wtw_uploads[i].queue;
							i = wtw_uploads.length;
							found = true;
						}
					}
				}
			}
			if (found) {
				if (queue != null) {
					if (queue == '0') {
						ready = true;
					}
				}
			} else {
				var uploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[uploadind] = WTW.newUpload();
				wtw_uploads[uploadind].uploadid = uploadid;
				wtw_uploads[uploadind].queue = "1";
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
						function(response) {
							WTW.loadFileUpload(JSON.parse(response), uploadid);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, uploadid).then(function (response1) {
						var adduploads = [];
						adduploads[0] = response1; 
						WTW.loadFileUpload(adduploads, adduploads[0].uploadid);
					}).catch(function (error) {
						WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
							function(response) {
								WTW.loadFileUpload(JSON.parse(response), uploadid);
							}
						);
					}); 
				} */
			}
		} else {
			ready = true;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isUploadReadyOrAdd=" + ex.message);
	}
	return ready;
}

WTWJS.prototype.loadFileUpload = function(adduploads, uploadid, savelocal) {
	try {
		/* if (savelocal == undefined) {
			savelocal = true;
		}
		var localdbname = wtw_domainname.replace(".",""); */
		var h3duploadind = WTW.getUploadInd(uploadid);
		if (adduploads != null) {
			for (var i=0;i < adduploads.length;i++) {
				if (adduploads[i].uploadid != "") {
					if (WTW.isUploadAdded(adduploads[i].uploadid) == false) {
						var uploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[uploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[uploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[uploadind]);
							}
						} */
					} else if (adduploads[i].uploadid == uploadid && wtw_uploads[h3duploadind] != null) {
						wtw_uploads[h3duploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[h3duploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[h3duploadind]);
							}
						} */
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loadFileUpload=" + ex.message);
	}
}

WTWJS.prototype.initLoadUpload = function(uploadid, tempid, refreshoption, moldname, molddef, parentname) {
	try {
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		/* var localdbname = wtw_domainname.replace(".",""); */
		if (uploadid != "") {
			if (WTW.isUploadReady(uploadid)) {
				WTW.setUploadCovering(uploadid, refreshoption, moldname, molddef, parentname);
			} else if (WTW.isUploadInQueue(uploadid)) {
			} else {
				var uploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[uploadind] = uploadid;
				wtw_uploads[uploadind].queue = "1";
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
						function(response) {
							WTW.loadUpload(JSON.parse(response), uploadid, refreshoption, false, moldname, molddef, parentname);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, uploadid).then(function (response1) {
						var adduploads = [];
						adduploads[0] = response1; 
						WTW.loadUpload(adduploads, adduploads[0].uploadid, refreshoption, false, moldname, molddef, parentname);
					}).catch(function (error) {
						WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
							function(response) {
								WTW.loadUpload(JSON.parse(response), uploadid, refreshoption, false, moldname, molddef, parentname);
							}
						);
					}); 
				} */
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-initLoadUpload=" + ex.message);
	}
}

WTWJS.prototype.loadUpload = function(adduploads, uploadid, refreshoption, savelocal, moldname, molddef, parentname) {
	try {
		if (savelocal == undefined) {
			savelocal = true;
		}
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		/* var localdbname = wtw_domainname.replace(".",""); */
		var h3duploadind = WTW.getUploadInd(uploadid);
		if (adduploads != null) {
			for (var i=0;i < adduploads.length;i++) {
				if (adduploads[i].uploadid != "") {
					if (WTW.isUploadReady(adduploads[i].uploadid) == false) {
						var uploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[uploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[uploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[uploadind]);
							}
						} */
					} else if (adduploads[i].uploadid == uploadid && wtw_uploads[uploadind] != null) {
						wtw_uploads[h3duploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[h3duploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[h3duploadind]);
							}
						} */
					}
				}
			}
		}
		WTW.setUploadCovering(uploadid, refreshoption, moldname, molddef, parentname);
		WTW.setShownMolds();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loadUpload=" + ex.message);
	}
}

WTWJS.prototype.setUploadCovering = function(uploadid, refreshoption, moldname, molddef, parentname) {
	try {
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		switch (refreshoption) {
			case 1:
				if (WTW.adminView == 1) {
					WTW.setNewMold(1);
				}
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				if (WTW.extraGround.material != undefined) {
					if (WTW.extraGround.material.diffuseTexture != null) {
						WTW.extraGround.material.diffuseTexture.dispose();
						WTW.extraGround.material.diffuseTexture = null;
					}
				}
				if (WTW.extraGround.material != null) {
					WTW.extraGround.material.dispose();
					WTW.extraGround.material = null;
				}
				var extraGroundMaterial = new BABYLON.StandardMaterial("egmat", scene);
				WTW.extraGround.material = extraGroundMaterial;
				extraGroundMaterial.specularColor = new BABYLON.Color3(.7, .7, .7);
				extraGroundMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				var imageinfo = WTW.getUploadFileData(uploadid);
				extraGroundMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, "egmattexture", scene);
				var eguscale = 500;
				var egvscale = 500;
				extraGroundMaterial.diffuseTexture.uScale = eguscale;
				extraGroundMaterial.diffuseTexture.vScale = egvscale;
				break;
			case 5:
				/* WTW.resetMoldCoverings(); */
				break;
			case 6:
				break;
			case 7:
				break;
			case 8: /* advanced terrain material */
				var posx = Number(molddef.position.x);
				var posy = Number(molddef.position.y);
				var posz = Number(molddef.position.z);
				var scalingx = Number(molddef.scaling.x);
				var scalingy = Number(molddef.scaling.y);
				var scalingz = Number(molddef.scaling.z);
				var rotx = Number(molddef.rotation.x);
				var roty = Number(molddef.rotation.y);
				var rotz = Number(molddef.rotation.z);
				var subdivisions = 12;
				var minheight = 0;
				var maxheight = 0;
				try {
					if (WTW.isNumeric(molddef.subdivisions)) {
						subdivisions = Number(molddef.subdivisions);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(molddef.graphics.heightmap.minheight)) {
						minheight = Number(molddef.graphics.heightmap.minheight);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(molddef.graphics.heightmap.maxheight)) {
						maxheight = Number(molddef.graphics.heightmap.maxheight);
					}
				} catch(ex) {}
				var transformposition = WTW.transformPosition(molddef, posx, posy, posz);
				posx = transformposition.posx;
				posy = transformposition.posy;
				posz = transformposition.posz;
				WTW.loadTerrainAdvancedImages(moldname, scalingx, scalingy, scalingz, subdivisions, '', molddef.graphics.heightmap.id, minheight, maxheight, parentname, molddef, "terrainadvanced", posx, posy, posz, molddef.graphics.heightmap.mixmapid, molddef.graphics.heightmap.texturerid, molddef.graphics.heightmap.texturegid, molddef.graphics.heightmap.texturebid, molddef.graphics.heightmap.texturebumprid, molddef.graphics.heightmap.texturebumpgid, molddef.graphics.heightmap.texturebumpbid);
				break;
			default:

				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setUploadCovering=" + ex.message);
	}
}

WTWJS.prototype.transformPosition = function(molddef, posx, posy, posz) {
	try {
		if (molddef.actionzoneid != "") {
			for (var j = 0; j < WTW.actionZones.length; j++) {
				if (WTW.actionZones[j] != null) {
					if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && (WTW.actionZones[j].actionzonetype == "door" || WTW.actionZones[j].actionzonetype == "slidingdoor" || WTW.actionZones[j].actionzonetype == "clickactivatedslidingdoor" || WTW.actionZones[j].actionzonetype == "swingingdoor" || WTW.actionZones[j].actionzonetype == "rotate" || WTW.actionZones[j].actionzonetype == "elevator" || WTW.actionZones[j].actionzonetype == "driverturnangle" || WTW.actionZones[j].actionzonetype == "driverturningwheel" || WTW.actionZones[j].actionzonetype == "driverwheel")) {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
							//rotx -= WTW.getDegrees(actionzoneaxlebase.rotation.x);
							//roty -= WTW.getDegrees(actionzoneaxlebase.rotation.y);
							//rotz -= WTW.getDegrees(actionzoneaxlebase.rotation.z);
						}
						if (WTW.actionZones[j].parentactionzoneid != "") {
							var parentactionzoneind = WTW.getActionZoneInd(WTW.actionZones[j].parentactionzoneid, WTW.actionZones[j].connectinggridind);
							var parentactionzoneaxlebasename = "actionzoneaxlebase-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
							var parentactionzoneaxlebase = scene.getMeshByID(parentactionzoneaxlebasename);
							if (parentactionzoneaxlebase == null) {
								WTW.addActionZone(parentactionzoneaxlebasename.replace("actionzoneaxlebase-","actionzone-"), WTW.actionZones[parentactionzoneind]);
								parentactionzoneaxlebase = scene.getMeshByID(parentactionzoneaxlebasename);
							}
							if (parentactionzoneaxlebase != null) {
								posx -= parentactionzoneaxlebase.position.x;
								posy -= parentactionzoneaxlebase.position.y;
								posz -= parentactionzoneaxlebase.position.z;
								//rotx -= WTW.getDegrees(parentactionzoneaxlebase.rotation.x);
								//roty -= WTW.getDegrees(parentactionzoneaxlebase.rotation.y);
								//rotz -= WTW.getDegrees(parentactionzoneaxlebase.rotation.z);
							}
						}
					} else if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && WTW.actionZones[j].actionzonetype == "peoplemover") {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
						}
					} else if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && (WTW.actionZones[j].actionzonetype == "passengerseat" || WTW.actionZones[j].actionzonetype == "driverseat")) {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {

						}
					}
				}
			}	
		}					
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-transformPosition=" + ex.message);
	} 
	return {
		posx: posx,
		posy: posy,
		posz: posz
	}
}

WTWJS.prototype.setShownMolds = function() {
	try {
		WTW.checkShownMolds = 1;
		WTW.setShownConnectingGrids();
		WTW.setShownActionZones();
		WTW.setShownMoldsByWeb("community");
		WTW.setShownMoldsByWeb("building");
		WTW.setShownMoldsByWeb("thing");
		WTW.checkShownMolds = 0;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setShownMolds=" + ex.message);
	} 
}

WTWJS.prototype.listConnectingGrids = function() {
	var color = "black";
	WTW.log("---connecting grids--------------------------------------");
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown == "2") {
				if (WTW.connectingGrids[i].childwebtype=="community") {
					color = "red";
				} else if (WTW.connectingGrids[i].childwebtype=="building") {
					color = "blue";
				} else if (WTW.connectingGrids[i].childwebtype=="thing") {
					color = "green";
				} else {
					color = "black";
				}
				WTW.log(i + "==" + WTW.connectingGrids[i].moldname + "=(shown)=" + WTW.connectingGrids[i].shown + "=(status)=" + WTW.connectingGrids[i].status, color);		
			}
		}
	}
	WTW.log("-----------------------------------------");
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown != "2") {
				if (WTW.connectingGrids[i].childwebtype=="community") {
					color = "brown";
				} else if (WTW.connectingGrids[i].childwebtype=="building") {
					color = "blue";
				} else if (WTW.connectingGrids[i].childwebtype=="thing") {
					color = "green";
				} else {
					color = "black";
				}
				WTW.log(i + "==" + WTW.connectingGrids[i].moldname + "=(shown)=" + WTW.connectingGrids[i].shown + "=(status)=" + WTW.connectingGrids[i].status, color);		
			}
		}
	}
}

WTWJS.prototype.listActionZones = function() {
	var color = "black";
	WTW.log("---action zones--------------------------------------");
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1) {
				color = "green";
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("high") > -1) {
				color = "blue";
			} else {
				color = "black";
			}
			if (WTW.actionZones[i].shown == "2") {
				WTW.log(i + "==" + WTW.actionZones[i].moldname + "=(shown)=" + WTW.actionZones[i].shown + "=(status)=" + WTW.actionZones[i].status + "=(name)=" + WTW.actionZones[i].actionzonename + "=(cgind)=" + WTW.actionZones[i].connectinggridind, color);		
				WTW.log(i + "==parent=" + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
	WTW.log("-----------------------------------------");
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1) {
				color = "green";
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("high") > -1) {
				color = "blue";
			} else {
				color = "black";
			}
			if (WTW.actionZones[i].shown != "2") {
				WTW.log(i + "==" + WTW.actionZones[i].moldname + "=(shown)=" + WTW.actionZones[i].shown + "=(status)=" + WTW.actionZones[i].status + "=(name)=" + WTW.actionZones[i].actionzonename + "=(cgind)=" + WTW.actionZones[i].connectinggridind, color);		
				WTW.log(i + "==parent=" + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
}

WTWJS.prototype.listCommunityMolds = function() {
	for (var i = 0; i < WTW.communitiesMolds.length; i++) {
		if (WTW.communitiesMolds[i] != null) {
			var mold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
			var shadow = "false";
			if (mold.receiveShadows == true) {
				shadow = "true";
			}
			WTW.log(i + "==" + WTW.communitiesMolds[i].moldname + "=(shown)=" + WTW.communitiesMolds[i].shown + "=(shadows)=" + shadow);		
		}
	}
}

WTWJS.prototype.listBuildingMolds = function() {
	for (var i = 0; i < WTW.buildingMolds.length; i++) {
		if (WTW.buildingMolds[i] != null) {
			var mold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
			var visible = 'no';
			if (mold != null) {
				visible = mold.isVisible;
			} else {
				visible = 'null';
			}
			WTW.log(i + "==" + WTW.buildingMolds[i].moldname + "=(shown)=" + WTW.buildingMolds[i].shown + "=(visible)=" + visible);
		}
	}
}

WTWJS.prototype.listThingMolds = function() {
	for (var i = 0; i < WTW.thingMolds.length; i++) {
		if (WTW.thingMolds[i] != null) {
			var color = "black";
			WTW.log(i + "==" + WTW.thingMolds[i].moldname + "=(shown)=" + WTW.thingMolds[i].shown + "=(parent)=" + WTW.thingMolds[i].parentname, color);		
		}
	}
}

WTWJS.prototype.listAutomations = function() {
	var color = "black";
	for (var i = 0; i < WTW.automations.length; i++) {
		if (WTW.automations[i] != null) {
			color = "black";
			WTW.log(i + "==" + WTW.automations[i].moldname + "=(step.step)=" + WTW.automations[i].step.step + "=" + WTW.automations[i].running, color);		
		}
	}
}

WTWJS.prototype.listUploads = function() {
	if (wtw_uploads != null) {
		for (var i = 0; i < wtw_uploads.length; i++) {
			if (wtw_uploads[i] != null && wtw_uploads[i] != undefined) {
				if (wtw_uploads[i].uploadinfo != undefined) {
					WTW.log(i + "==" + wtw_uploads[i].uploadid + "=(queue)=" + wtw_uploads[i].queue + "=(title)=" + wtw_uploads[i].uploadinfo.title);
				} else {
					WTW.log(i + "==" + wtw_uploads[i].uploadid + "=(queue)=" + wtw_uploads[i].queue + "=(title)=undefined");
				}
			}
		}
	}		
WTW.log("----------------------");
WTW.log("len=" + wtw_uploads.length);
WTW.log("----------------------");
}



WTWJS.prototype.listMeshes = function() {
	try {
		var color = "black";
		WTW.log("---loaded meshes--------count=" + scene.meshes.length + "------------------------------");
		for (var i=0; i < scene.meshes.length; i++) {
			var parentname = "";
			var moldname = scene.meshes[i].name;
			var visible = scene.meshes[i].isVisible;
			if (moldname.toLowerCase().indexOf('selectavatar') > -1) {
				color = "red";
			} else if (moldname.toLowerCase().indexOf("connectinggrid") > -1) {
				color = "green";
				var mold = scene.getMeshByID(moldname);
				if (mold != null && mold.parent != null) {
					parentname = mold.parent.name;
				}
			} else if (moldname.toLowerCase().indexOf("actionzone") > -1) {
				color = "blue";
				var mold = scene.getMeshByID(moldname);
				if (mold != null && mold.parent != null) {
					parentname = mold.parent.name;
				}
			} else if (moldname.toLowerCase().indexOf("person") > -1) {
				color = "red";
				var mold = scene.getMeshByID(moldname);
				if (mold != null && mold.parent != null) {
					parentname = mold.parent.name;
				}
			} else {
				color = "black";
			}
			var inmesh = "NO";
			if (moldname.toLowerCase().indexOf("mold") > -1) {
				var mold = scene.getMeshByID(moldname);
				if (mold != null && WTW.myAvatar != null) {
					if (WTW.myAvatar.intersectsMesh(mold, false)) {
						inmesh = "YES";
					}
					parentname = mold.parent.name;
				}
			}
			if (color == 'red') {
				WTW.log(i + "==" + moldname + " in=" + inmesh + " parent=" + parentname + " visible=" + visible, color);
			} else {
				WTW.log(i + "==" + moldname + " in=" + inmesh + " parent=" + parentname + " visible=" + visible, color);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-listMeshes=" + ex.message);
	}
}

WTWJS.prototype.setShownConnectingGrids = function() {
	try {
		for (var i = 0; i < WTW.connectingGrids.length; i++) {
			if (WTW.connectingGrids[i] != null) {
				var shown = "0";
				var parentshown = "0";
				var parentwebid = "";
				var childwebid = "";
				var attachactionzoneind = -1;
				var loadlevel = "2";
				var loadactionzoneid = "";
				var loadactionzoneind = -1;
				var altloadactionzoneid = "";
				var altloadactionzoneind = -1;
				var loadazshown = "0";
				var loadazstatus = 0;
				var parentconnectinggridind = -1;
				var mydist = 5000;
				var lenmax = 1000;
				if (WTW.connectingGrids[i].shown != undefined) {
					shown = WTW.connectingGrids[i].shown;
				}
				if (WTW.connectingGrids[i].parentwebid != undefined) {
					parentwebid = WTW.connectingGrids[i].parentwebid;
				}
				if (WTW.connectingGrids[i].childwebid != undefined) {
					childwebid = WTW.connectingGrids[i].childwebid;
				}
				if (WTW.connectingGrids[i].parentconnectinggridind != undefined) {
					parentconnectinggridind = WTW.connectingGrids[i].parentconnectinggridind;
				}
				if (WTW.connectingGrids[i].loadactionzoneind != undefined) {
					loadactionzoneind = Number(WTW.connectingGrids[i].loadactionzoneind);
				}
				if (WTW.connectingGrids[i].altloadactionzoneid != undefined) {
					altloadactionzoneid = WTW.connectingGrids[i].altloadactionzoneid;
				}
				if (loadactionzoneind == -1) {
					if (altloadactionzoneid != "") {
						if (altloadactionzoneid != "") {
							loadactionzoneind = WTW.getActionZoneInd(altloadactionzoneid, parentconnectinggridind);
							WTW.connectingGrids[i].loadactionzoneind = loadactionzoneind;
						}
					} else if (WTW.connectingGrids[i].loadactionzoneid != undefined) {
						loadactionzoneid = WTW.connectingGrids[i].loadactionzoneid;
						if (loadactionzoneid != "") {
							loadactionzoneind = WTW.getActionZoneInd(loadactionzoneid, i);
							WTW.connectingGrids[i].loadactionzoneind = loadactionzoneind;
						}
					}
				}
				if (WTW.connectingGrids[i].loadlevel != undefined) {
					loadlevel = WTW.connectingGrids[i].loadlevel;
				}
				if (WTW.actionZones[loadactionzoneind] != null) {
					var loadazlenx = 0;
					var loadazleny = 0;
					var loadazlenz = 0;
					if (WTW.isNumeric(WTW.actionZones[loadactionzoneind].scaling.x)) {
						loadazlenx = Number(WTW.actionZones[loadactionzoneind].scaling.x);
					}
					if (WTW.isNumeric(WTW.actionZones[loadactionzoneind].scaling.y)) {
						loadazleny = Number(WTW.actionZones[loadactionzoneind].scaling.y);
					}
					if (WTW.isNumeric(WTW.actionZones[loadactionzoneind].scaling.z)) {
						loadazlenz = Number(WTW.actionZones[loadactionzoneind].scaling.z);
					}
					if (WTW.actionZones[loadactionzoneind].shown != undefined) {
						loadazshown = WTW.actionZones[loadactionzoneind].shown;
					}
					if (WTW.actionZones[loadactionzoneind].status != undefined) {
						loadazstatus = Number(WTW.actionZones[loadactionzoneind].status);
					}
					lenmax = Math.max(loadazlenx, loadazleny, loadazlenz) * 1.1;
				}
				if (WTW.connectingGrids[i].attachactionzoneind != undefined) {
					attachactionzoneind = Number(WTW.connectingGrids[i].attachactionzoneind);
				}
				
				if (WTW.connectingGrids[parentconnectinggridind] != null) {
					if (WTW.connectingGrids[parentconnectinggridind].shown != undefined) {
						parentshown = WTW.connectingGrids[parentconnectinggridind].shown;
					}
				}
				if (attachactionzoneind > -1) {
					if (WTW.connectingGrids[i].parentname.indexOf("actionzone") > -1) {
						parentshown = WTW.actionZones[attachactionzoneind].shown;
					} else {
						parentshown = "0";
					}
				} else if (WTW.connectingGrids[i].parentname == "") {
					parentshown = "2";
					if (loadlevel == "1") {
						lenmax = 5000;
					}
					if (WTW.drive != null) {
						lenmax = 99999999;
					}
				} 
				if (loadlevel == "1") {
					mydist = WTW.getMyDistance(Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z));
				} else {
					try {
						mydist = WTW.getBuildingDistance(Number(WTW.connectingGrids[parentconnectinggridind].position.x), Number(WTW.connectingGrids[parentconnectinggridind].position.y), Number(WTW.connectingGrids[parentconnectinggridind].position.z), Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z), Number(WTW.connectingGrids[parentconnectinggridind].rotation.x), Number(WTW.connectingGrids[parentconnectinggridind].rotation.y), Number(WTW.connectingGrids[parentconnectinggridind].rotation.z));
					} catch(ex) {
						mydist = WTW.getMyDistance(Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z));
					}
				}
				var mold = scene.getMeshByID(WTW.connectingGrids[i].moldname);
				if (loadlevel == "1" || altloadactionzoneid == "") {
					if (mydist < lenmax && shown == "0") {
						WTW.connectingGrids[i].status = 2;
						WTW.connectingGrids[i].shown = "1";
						WTW.addMoldToQueue(WTW.connectingGrids[i].moldname, WTW.connectingGrids[i], WTW.connectingGrids[i].parentname, "hidden",null);
						WTW.getActionZones(i);
					} else if (mydist < lenmax && shown == "2") {
						if (WTW.actionZones[loadactionzoneind] != null) {
							if (WTW.actionZones[loadactionzoneind].shown == "0" && loadazstatus > 1) {
								WTW.actionZones[loadactionzoneind].shown = "1";
								WTW.addActionZoneToQueue(WTW.actionZones[loadactionzoneind].moldname, WTW.actionZones[loadactionzoneind]);
							}
						}
					} else if (mydist > lenmax && shown == "2") {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = "0";
						if (mold != null) {
							WTW.productClearForSearchResults(WTW.connectingGrids[i].connectinggridid, WTW.connectingGrids[i].connectinggridind);
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				} else if (loadlevel == "2") {
					if (shown == "0" && loadazstatus == 2) {
						WTW.connectingGrids[i].status = 2;
						WTW.connectingGrids[i].shown = "1";
						WTW.addMoldToQueue(WTW.connectingGrids[i].moldname, WTW.connectingGrids[i], WTW.connectingGrids[i].parentname, "hidden",null);
						WTW.getActionZones(i);
					} else if (shown == "2" && loadazstatus == 0) {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = "0";
						if (mold != null) {
							WTW.productClearForSearchResults(WTW.connectingGrids[i].connectinggridid, WTW.connectingGrids[i].connectinggridind);
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				} else {
					if (shown == "2") {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = "0";
						if (mold != null) {
							WTW.productClearForSearchResults(WTW.connectingGrids[i].connectinggridid, WTW.connectingGrids[i].connectinggridind);
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setShownConnectingGrids=" + ex.message);
	} 	
}

WTWJS.prototype.setShownActionZones = function() {
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var shown = "0";
				var loadazshown = "0";
				var loadazstatus = 0;
				var connectinggridind = Number(WTW.actionZones[i].connectinggridind);
				var loadazind = -1;
				var isazextreme = false;
				if (WTW.actionZones[i].loadactionzoneind != undefined) {
					loadazind = WTW.actionZones[i].loadactionzoneind;
				}
				if (loadazind == -1) {
					loadazind = WTW.getActionZoneInd(WTW.actionZones[i].loadactionzoneid, connectinggridind);
					WTW.actionZones[i].loadactionzoneind = loadazind;
				}
				if (WTW.actionZones[loadazind] != null) {
					loadazstatus = Number(WTW.actionZones[loadazind].status);
					if (WTW.actionZones[loadazind].shown != undefined) {
						loadazshown = WTW.actionZones[loadazind].shown;
					}
				} else {
					if (WTW.isNumeric(WTW.connectingGrids[connectinggridind].status)) {
						loadazstatus = Number(WTW.connectingGrids[connectinggridind].status);
					}
				}
				if (WTW.actionZones[i].actionzonetype == "loadzone" && WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf("custom") == -1) {
					isazextreme = true;
				}
				if (WTW.actionZones[i].shown != undefined) {
					shown = WTW.actionZones[i].shown;
				}
				if (WTW.actionZones[i].loadactionzoneid == "") {
					loadazshown = "2";
				}
				var mold = scene.getMeshByID(WTW.actionZones[i].moldname);
				if (WTW.actionZones[i].parentname != "") {
					if (loadazstatus > 1) {
						if (shown == "0") {
							WTW.actionZones[i].shown = "1";
							WTW.addActionZoneToQueue(WTW.actionZones[i].moldname, WTW.actionZones[i]);
						}
					} else if (shown == "2") {
						if (isazextreme) {
							WTW.addUnloadZoneToQueue(i);
						}
						WTW.actionZones[i].shown = "0";
						if (mold != null) {
							WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname);
						}
					}
				} else {
					WTW.actionZones[i].shown = "0";
					if (mold != null) {
						WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname);
					}
				}
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setShownActionZones=" + ex.message);
	} 	
}

WTWJS.prototype.setShownMoldsByWeb = function(moldgroup) {
	try {
		var webid = communityid;
		var molds = WTW.communitiesMolds
		if (buildingid != "") {
			webid = buildingid;
		} else if (thingid != "") {
			webid = thingid;
		}
		switch (moldgroup) {
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds
				break;
		}
		if (molds != null) {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					var shown = "0";
					if (molds[i].shown != undefined) {
						shown = molds[i].shown;
					}
					var parentmold = scene.getMeshByID(molds[i].parentname);
					if (parentmold != null) {
						var loadazind = -1;
						var loadazstatus = 0;
						var connectinggridind = Number(molds[i].connectinggridind);
						var csgmoldid = molds[i].csg.moldid;
						if (molds[i].loadactionzoneind != undefined) {
							loadazind = molds[i].loadactionzoneind;
						}
						if (loadazind == -1) {
							loadazind = WTW.getActionZoneInd(molds[i].loadactionzoneid, connectinggridind);
							molds[i].loadactionzoneind = loadazind;
						}
						if (WTW.actionZones[loadazind] != null) {
							if (WTW.actionZones[loadazind] != null) {
								loadazstatus = WTW.actionZones[loadazind].status;
							}
						}
						var mold = scene.getMeshByID(molds[i].moldname);
						if (loadazstatus == 0) {
							if (shown != "0") {
								molds[i].shown = "0";
								WTW.addDisposeMoldToQueue(molds[i].moldname);
							}
						} else if (loadazstatus == 2 && shown == "0" && mold == null) {
							WTW.setMoldActionZoneParent(molds, i);
							if (csgmoldid == "") {
								molds[i].shown = "1";
								WTW.addMoldToQueue(molds[i].moldname, molds[i], molds[i].parentname, molds[i].covering,null);
							}
						}
						if (WTW.adminView == 1) {
							if (dGet('wtw_bmerged') != null && csgmoldid != "") {
								mold = scene.getMeshByID(molds[i].moldname);
								if (webid != "" && dGet('wtw_bmerged').alt == "Merged Shapes are Shown" && mold == null) {
									molds[i].checkcollisions = "0";
									WTW.addMold(molds[i].moldname, molds[i], molds[i].parentname, molds[i].covering);
								} else if (dGet('wtw_bmerged').alt == "Merged Shapes are Hidden" && mold != null) {
									WTW.addDisposeMoldToQueue(molds[i].moldname);
								}
							}
						}
					} else {
						var mold = scene.getMeshByID(molds[i].moldname);
						if (mold != null) {
							WTW.addDisposeMoldToQueue(molds[i].moldname);
						}
						if (shown == "2") {
							molds[i].shown = "0";
						}
					}
					if (shown == "2" && molds[i].shape == 'video') {
						var videomold = scene.getMeshByID(molds[i].moldname + "-mainvideo");
						if (videomold != null) {
							if (typeof videomold.material.diffuseTexture.video.pause == 'function') {
								videomold.material.diffuseTexture.video.volume = WTW.soundVolumeLinear(molds[i].moldname, molds[i].sound.maxdistance);
							}
						}
					}
				}
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setShownMoldsByWeb=" + ex.message);
	} 
}

WTWJS.prototype.setShownMoldsByGroup = function(moldgroup) {
	try {
		var webid = communityid;
		var molds = WTW.communitiesMolds
		if (buildingid != "") {
			webid = buildingid;
		} else if (thingid != "") {
			webid = thingid;
		}
		switch (moldgroup) {
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds
				break;
		}
		if (molds != null) {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					var shown = "0";
					if (molds[i].shown != undefined) {
						shown = molds[i].shown;
					}
					var parentmold = scene.getMeshByID(molds[i].parentname);
					if (parentmold != null) {
						var loadazind = -1;
						var csgshown = "0";
						var loadazstatus = 0;
						var connectinggridind = Number(molds[i].connectinggridind);
						var csgmoldid = molds[i].csg.moldid;
						var csgmoldind = -1;
						var csgaction = molds[i].csg.action;
						var csgmold = null;
						var texturefound = false;
						var textureloaded = "0";
						if (molds[i].loadactionzoneind != undefined) {
							loadazind = molds[i].loadactionzoneind;
						}
						if (loadazind == -1) {
							loadazind = WTW.getActionZoneInd(molds[i].loadactionzoneid, connectinggridind);
							molds[i].loadactionzoneind = loadazind;
						}
						if (WTW.actionZones[loadazind] != null) {
							if (WTW.actionZones[loadazind] != null) {
								loadazstatus = WTW.actionZones[loadazind].status;
							}
						}
						if (csgmoldid != "") {
							if (molds[i].csg.moldind != undefined) {
								if (Number(molds[i].csg.moldind)) {
									csgmoldind = Number(molds[i].csg.moldind);
								} 
							}
							if (csgmoldind == -1) {
								if (molds[i].altconnectinggridind != undefined) {
									if (molds[i].altconnectinggridind != -1) {
										csgmoldind = WTW.getAltMoldInd(molds,csgmoldid, Number(molds[i].altconnectinggridind));
									} else {
										csgmoldind = WTW.getMoldInd(molds,csgmoldid, connectinggridind);
									}
								} else {
									csgmoldind = WTW.getMoldInd(molds,csgmoldid, connectinggridind);
								}
								molds[i].csg.moldind = csgmoldind;
							}
							if (molds[csgmoldind] != null) {
								csgmold = scene.getMeshByID(molds[csgmoldind].moldname);
								if (molds[csgmoldind].shown != undefined) {
									csgshown = molds[csgmoldind].shown;
								}
							}
						} else {
							csgshown = "2";
						}
						var mold = scene.getMeshByID(molds[i].moldname);
						if (loadazstatus == 0 || csgshown != "2") {
							if (shown != "0") {
								molds[i].shown = "0";
								WTW.addDisposeMoldToQueue(molds[i].moldname);
							}
						} else if (loadazstatus == 2 && shown == "0" && csgshown == "2" && mold == null) {
							var texturesready = true;
							var textureid = "t1qlqxd6pzubzzzy";
							var texturepath = "";
							var texturebumpid = "";
							var texturebumppath = "";
							var heightmapid = "";
							var heightmappath = "";
							var mixmapid = "";
							var mixmappath = "";
							var texturerid = "";
							var texturerpath = "";
							var texturegid = "";
							var texturegpath = "";
							var texturebid = "";
							var texturebpage = "";
							var texturebumprid = "";
							var texturebumprpath = "";
							var texturebumpgid = "";
							var texturebumpgpage = "";
							var texturebumpbid = "";
							var texturebumpbpath = "";
							var imageid = "";
							var imagehoverid = "";
							var imageclickid = "";
							if (molds[i].graphics.texture.id != undefined) {
								textureid = molds[i].graphics.texture.id;
							}
							if (molds[i].graphics.texture.path != undefined) {
								texturepath = molds[i].graphics.texture.path;
							}
							if (molds[i].graphics.texture.bumpid != undefined) {
								texturebumpid = molds[i].graphics.texture.bumpid;
							}
							if (molds[i].graphics.texture.bumppath != undefined) {
								texturebumppath = molds[i].graphics.texture.bumppath;
							}
							if (molds[i].graphics.heightmap.id != undefined) {
								heightmapid = molds[i].graphics.heightmap.id;
							}
							if (molds[i].graphics.heightmap.path != undefined) {
								heightmappath = molds[i].graphics.heightmap.path;
							}
							if (molds[i].graphics.heightmap.mixmapid != undefined) {
								mixmapid = molds[i].graphics.heightmap.mixmapid;
							}
							if (molds[i].graphics.heightmap.mixmappath != undefined) {
								mixmappath = molds[i].graphics.heightmap.mixmappath;
							}
							if (molds[i].graphics.heightmap.texturerid != undefined) {
								texturerid = molds[i].graphics.heightmap.texturerid;
							}
							if (molds[i].graphics.heightmap.texturerpath != undefined) {
								texturerpath = molds[i].graphics.heightmap.texturerpath;
							}
							if (molds[i].graphics.heightmap.texturegid != undefined) {
								texturegid = molds[i].graphics.heightmap.texturegid;
							}
							if (molds[i].graphics.heightmap.texturegpath != undefined) {
								texturegpath = molds[i].graphics.heightmap.texturegpath;
							}
							if (molds[i].graphics.heightmap.texturebid != undefined) {
								texturebid = molds[i].graphics.heightmap.texturebid;
							}
							if (molds[i].graphics.heightmap.texturebpath != undefined) {
								texturebpath = molds[i].graphics.heightmap.texturebpath;
							}
							if (molds[i].graphics.heightmap.texturebumprid != undefined) {
								texturebumprid = molds[i].graphics.heightmap.texturebumprid;
							}
							if (molds[i].graphics.heightmap.texturebumprpath != undefined) {
								texturebumprpath = molds[i].graphics.heightmap.texturebumprpath;
							}
							if (molds[i].graphics.heightmap.texturebumpgid != undefined) {
								texturebumpgid = molds[i].graphics.heightmap.texturebumpgid;
							}
							if (molds[i].graphics.heightmap.texturebumpgpath != undefined) {
								texturebumpgpath = molds[i].graphics.heightmap.texturebumpgpath;
							}
							if (molds[i].graphics.heightmap.texturebumpbid != undefined) {
								texturebumpbid = molds[i].graphics.heightmap.texturebumpbid;
							}
							if (molds[i].graphics.heightmap.texturebumpbpath != undefined) {
								texturebumpbpath = molds[i].graphics.heightmap.texturebumpbpath;
							}
							if (molds[i].graphics.webimages[0] != null) {
								if (molds[i].graphics.webimages[0].imageid != undefined) {
									if (molds[i].graphics.webimages[0].imageid != "") {
										imageid = molds[i].graphics.webimages[0].imageid;
									}
								}
								if (molds[i].graphics.webimages[0].imagehoverid != undefined) {
									if (molds[i].graphics.webimages[0].imagehoverid != "") {
										imagehoverid = molds[i].graphics.webimages[0].imagehoverid;
									}
								}
								if (molds[i].graphics.webimages[0].imageclickid != undefined) {
									if (molds[i].graphics.webimages[0].imageclickid != "") {
										imageclickid = molds[i].graphics.webimages[0].imageclickid;
									}
								}
							}
							if (texturepath == '') {
								if (WTW.isUploadReadyOrAdd(textureid) == false) {
									texturesready = false;
								}
							}
							if (texturebumppath == '') {
								if (WTW.isUploadReadyOrAdd(texturebumpid) == false) {
									texturesready = false;
								}
							}
							if (heightmappath == '') {
								if (WTW.isUploadReadyOrAdd(heightmapid) == false) {
									texturesready = false;
								}
							}
							if (mixmappath == '') {
								if (WTW.isUploadReadyOrAdd(mixmapid) == false) {
									texturesready = false;
								}
							}
							if (texturerpath == '') {
								if (WTW.isUploadReadyOrAdd(texturerid) == false) {
									texturesready = false;
								}
							}
							if (texturegpath == '') {
								if (WTW.isUploadReadyOrAdd(texturegid) == false) {
									texturesready = false;
								}
							}
							if (texturebpath == '') {
								if (WTW.isUploadReadyOrAdd(texturebid) == false) {
									texturesready = false;
								}
							}
							if (texturebumprpath == '') {
								if (WTW.isUploadReadyOrAdd(texturebumprid) == false) {
									texturesready = false;
								}
							}
							if (texturebumpgpath == '') {
								if (WTW.isUploadReadyOrAdd(texturebumpgid) == false) {
									texturesready = false;
								}
							}
							if (texturebumpbpath == '') {
								if (WTW.isUploadReadyOrAdd(texturebumpbid) == false) {
									texturesready = false;
								}							
							}
							if (WTW.isUploadReadyOrAdd(imageid) == false) {
								texturesready = false;
							}
							if (WTW.isUploadReadyOrAdd(imagehoverid) == false) {
								texturesready = false;
							}
							if (WTW.isUploadReadyOrAdd(imageclickid) == false) {
								texturesready = false;
							}
							WTW.setMoldActionZoneParent(molds, i);
							if (texturesready) {
								if (csgmold != null) {
									molds[i].shown = "1";
									WTW.addMoldToQueue(molds[i].moldname, molds[i], molds[i].parentname, molds[i].covering, molds[csgmoldind]);
								} else if (csgmoldid == "") {
									molds[i].shown = "1";
									WTW.addMoldToQueue(molds[i].moldname, molds[i], molds[i].parentname, molds[i].covering,null);
								}
							}
						}
						if (WTW.adminView == 1) {
							if (dGet('wtw_bmerged') != null && csgmoldid != "" && csgaction != "union") {
								mold = scene.getMeshByID(molds[i].moldname);
								if (webid != "" && dGet('wtw_bmerged').alt == "Merged Shapes are Shown") {
									if (mold == null && molds[csgmoldind] != null) {
										molds[i].checkcollisions = "0";
										WTW.addMold(molds[i].moldname, molds[i], molds[i].parentname, molds[i].covering);
									}
								} else if (dGet('wtw_bmerged').alt == "Merged Shapes are Hidden" && mold != null) {
									WTW.addDisposeMoldToQueue(molds[i].moldname);
								}
							}
						}
					} else {
						var mold = scene.getMeshByID(molds[i].moldname);
						if (mold != null || shown == "2") {
							molds[i].shown = "0";
							WTW.addDisposeMoldToQueue(molds[i].moldname);
						}
					}
				}
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setShownMoldsByGroup=" + ex.message);
	} 
}

WTWJS.prototype.setMoldActionZoneParent = function(molds, moldind) {
	try {
		if (molds[moldind].moldid != "") {
			var parentname = "";
			var attachmoldind = "-1";
			for (var j = 0; j < WTW.actionZones.length; j++) {
				if (WTW.actionZones[j] != null) {
					if (WTW.actionZones[j].parentname == molds[moldind].parentname) {
						if (WTW.actionZones[j].actionzoneid == molds[moldind].actionzoneid && (WTW.actionZones[j].actionzonetype == "door" || WTW.actionZones[j].actionzonetype == "swingingdoor" || WTW.actionZones[j].actionzonetype == "slidingdoor" || WTW.actionZones[j].actionzonetype == "clickactivatedslidingdoor" || WTW.actionZones[j].actionzonetype == "peoplemover" || WTW.actionZones[j].actionzonetype == "rotate" || WTW.actionZones[j].actionzonetype == "elevator" || WTW.actionZones[j].actionzonetype == "driverturnangle" || WTW.actionZones[j].actionzonetype == "driverwheel")) {
							parentname = WTW.actionZones[j].moldname.replace("actionzone-", "actionzoneaxlebase2-");
						} else if (WTW.actionZones[j].actionzoneid == molds[moldind].actionzoneid && (WTW.actionZones[j].actionzonetype == "driverseat" || WTW.actionZones[j].actionzonetype == "passengerseat")) {
							parentname = WTW.actionZones[j].moldname.replace("actionzone-", "actionzoneaxlebase-");
						} else if (WTW.actionZones[j].actionzoneid == molds[moldind].actionzoneid && WTW.actionZones[j].actionzonetype == "driverturningwheel") {
							parentname = WTW.actionZones[j].moldname.replace("actionzone-", "actionzoneaxle2-");
						}
						if (WTW.actionZones[j].attachmoldid == molds[moldind].moldid) {
							attachmoldind = j;
						}
					}
				}
			}	
			if (parentname != "") {
				molds[moldind].parentname = parentname;
			}
			molds[moldind].attachmoldind = attachmoldind;
			if (attachmoldind > -1) {
				if (WTW.actionZones[attachmoldind] != null) {
					WTW.actionZones[attachmoldind].parentname = molds[moldind].moldname;
				}
			}		
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setMoldActionZoneParent=" + ex.message);
	} 
}

WTWJS.prototype.processCSGAction = function(mold, moldgroup, molddef) {
	try {
		var molds = null;
		if (molddef.moldname.indexOf("communitymolds-") > -1) {
			moldgroup = "community";
			molds = WTW.communitiesMolds;
		} else if (molddef.moldname.indexOf("buildingmolds-") > -1) {
			moldgroup = "building";
			molds = WTW.buildingMolds;
		} else if (molddef.moldname.indexOf("thingmolds-") > -1) {
			moldgroup = "thing";
			molds = WTW.thingMolds;
		}		
		if (molds != null) {
			for (var i=0;i < molds.length;i++) {
				if (molds[i] != null) {
					if (molddef.moldid == molds[i].csg.moldid) {
						var csgmold = scene.getMeshByID(molds[i].moldname);
						if (csgmold == null) {
							csgmold = WTW.addMold(molds[i].moldname, molds[i], molds[i].parentname, 'hidden');
						}
						molds[i].shown = '2';
						mold = WTW.setCSGAction(molddef.moldname, mold, csgmold, molds[i].csg.action, molddef);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-processCSGAction=" + ex.message);
	} 
	return mold;
}

WTWJS.prototype.setCSGAction = function(csgshapename, csgshape, mold, csgaction, molddef) {
	try {
		var parentobj = csgshape.parent;
		var csgmaterial = csgshape.material;
		var csgmain = BABYLON.CSG.FromMesh(csgshape);
		var csgsub = BABYLON.CSG.FromMesh(mold);
		var csgmerge;
		switch (csgaction.toLowerCase()) {
			case "subtract":
				csgmerge = csgmain.subtract(csgsub);
				break;
			case "intersect":
				csgmerge = csgmain.intersect(csgsub);
				break;
			case "union":
				csgmerge = csgmain.union(csgsub);
				break;
			default:
				csgmerge = csgmain.subtract(csgsub);
				break;
		}
		csgshape.dispose();
		mold.dispose();
		var newmold = csgmerge.toMesh(csgshapename, csgmaterial, scene, false);
		newmold.parent = parentobj;
		var lenx = Number(molddef.scaling.x);
		var leny = Number(molddef.scaling.y);
		var lenz = Number(molddef.scaling.z);
		var special1 = 0;
		var special2 = 0;
		try {
			if (WTW.isNumeric(molddef.scaling.special1)) {
				special1 = Number(molddef.scaling.special1)
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(molddef.scaling.special2)) {
				special2 = Number(molddef.scaling.special2)
			}
		} catch(ex) {}
		var moldind = -1;
		if (csgshapename.indexOf("-") > -1) {
			var namepart = csgshapename.split('-');
			if (namepart[1] != null) {
				if (WTW.isNumeric(namepart[1])) {
					moldind = Number(namepart[1]);
				}
			}
		}		

		var alttag = "";
		if (molddef.alttag.name != undefined) {
			alttag = molddef.alttag.name;
		}
		if (WTW.adminView == 1 || alttag != "") {
			WTW.registerMouseOver(newmold);
		}
		newmold.checkCollisions = true;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setCSGAction=" + ex.message);
	} 
	return newmold;
}

WTWJS.prototype.resetMoldCovering = function(moldgroup, moldind) {					
	try {
		var molds = WTW.buildingMolds;
		var shape = "box";
		switch (moldgroup) {
			case "building":
				break;
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (molds[moldind].shape != "") {
			shape = molds[moldind].shape;
		}
		var moldname = molds[moldind].moldname;
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {			
			var lenx = Number(molds[moldind].scaling.x);
			var leny = Number(molds[moldind].scaling.y);
			var lenz = Number(molds[moldind].scaling.z);
			var special1 = 0;
			var special2 = 0;
			try {
				if (WTW.isNumeric(molds[moldind].scaling.special1)) {
					special1 = Number(molds[moldind].scaling.special1)
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(molds[moldind].scaling.special2)) {
					special2 = Number(molds[moldind].scaling.special2)
				}
			} catch(ex) {}
			if ((molds[moldind].shape == "box" || molds[moldind].shape == "wall" || molds[moldind].shape == "floor") && molds[moldind].covering == "directional texture") {
				molds[moldind].covering = "directional texture";
			} else if (molds[moldind].shape != "box" && molds[moldind].shape != "wall" && molds[moldind].shape != "floor" && molds[moldind].covering == "directional texture") {
				molds[moldind].covering = "texture";
			}
			if (molds[moldind].covering != "none") {
				if (molds[moldind].covering != "directional texture") {					
					if (mold.material != undefined) {
						if (mold.material.diffuseTexture != undefined) {
							if (mold.material.diffuseTexture != null) {
								mold.material.diffuseTexture.dispose();
								mold.material.diffuseTexture = null;
							}
						}
						mold.material.dispose();
						mold.material = null;
					}
					mold.material = WTW.addCovering(molds[moldind].covering, moldname, molds[moldind], lenx, leny, lenz, special1, special2);
				} else {
					if (mold.material != null) {
						if (mold.material.subMaterials != undefined) {
							for (var i=0;i < mold.material.subMaterials.length;i++) {
								if (mold.material.subMaterials[i].diffuseTexture != undefined) {
									if (mold.material.subMaterials[i].diffuseTexture != null) {
										mold.material.subMaterials[i].diffuseTexture.dispose();
										mold.material.subMaterials[i].diffuseTexture = null;
									}
								}
							}
						}
					}			
					mold.subMeshes = [];
					WTW.addCovering(molds[moldind].covering, moldname, molds[moldind], lenx, leny, lenz, special1, special2);
				}
			} else {
				if (mold.material != undefined) {
					if (mold.material.diffuseTexture != undefined) {
						if (mold.material.diffuseTexture != null) {
							mold.material.diffuseTexture.dispose();
							mold.material.diffuseTexture = null;
						}
					}
					mold.material.dispose();
					mold.material = null;
				}
				mold.material = WTW.addCovering("hidden", moldname, molds[moldind], lenx, leny, lenz, special1, special2);
			}
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetMoldCovering=" + ex.message);
	} 
}

WTWJS.prototype.clearDirectionalTexture = function(mold) {
	try {
		if (mold != null) {
			if (mold.material != undefined) {
				if (mold.material.subMaterials != undefined) {
					for (var i=0;i < mold.material.subMaterials.length;i++) {
						if (mold.material.subMaterials[i].diffuseTexture != undefined) {
							if (mold.material.subMaterials[i].diffuseTexture != null) {
								mold.material.subMaterials[i].diffuseTexture.dispose();
								mold.material.subMaterials[i].diffuseTexture = null;
							}
						}
					}
					mold.material.dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-clearDirectionalTexture=" + ex.message);
	} 
}

WTWJS.prototype.resetMoldsOpacity = function() {
	try {
		if (WTW.adminView == 1) {
			if (WTW.buildingMolds != null) {
				for (var i = 0; i < WTW.buildingMolds.length; i++) {
					if (WTW.buildingMolds[i] != null) {
						WTW.resetMoldOpacity('building', i);
					}
				}
			}
			if (WTW.communitiesMolds != null) {
				for (var i = 0; i < WTW.communitiesMolds.length; i++) {
					if (WTW.communitiesMolds[i] != null) {
						WTW.resetMoldOpacity('community', i);
					}
				}
			}
			if (WTW.thingMolds != null) {
				for (var i = 0; i < WTW.thingMolds.length; i++) {
					if (WTW.thingMolds[i] != null) {
						WTW.resetMoldOpacity('thing', i);
					}
				}
			}		
			if (dGet('wtw_tmoldname').value.indexOf('molds') > -1) {
				WTW.setNewMold();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetMoldsOpacity=" + ex.message);
	}
}

WTWJS.prototype.resetMoldOpacity = function(moldgroup, moldind) {
	try {
		var molds = WTW.buildingMolds;
		var shape = "box";
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (molds[moldind].shape != "") {
			shape = molds[moldind].shape;
		}
		var moldname = molds[moldind].moldname;
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {	
			var lenx = Number(molds[moldind].scaling.x);
			var leny = Number(molds[moldind].scaling.y);
			var lenz = Number(molds[moldind].scaling.z);
			var special1 = 0;
			var special2 = 0;
			var opacity = 1;
			if (molds[moldind].opacity != undefined) {
				if (WTW.isNumeric(molds[moldind].opacity)) {
					opacity = Number(molds[moldind].opacity) / 100;
					if (opacity > 1) {
						opacity = 1;
					} else if (opacity < 0) {
						opacity = 0;
					}
				}
			}
			try {
				if (WTW.isNumeric(molds[moldind].scaling.special1)) {
					special1 = Number(molds[moldind].scaling.special1)
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(molds[moldind].scaling.special2)) {
					special2 = Number(molds[moldind].scaling.special2)
				}
			} catch(ex) {}
			if ((molds[moldind].shape == "box" || molds[moldind].shape == "wall" || molds[moldind].shape == "floor") && molds[moldind].covering == "directional texture") {
				molds[moldind].covering = "directional texture";
			} else if (molds[moldind].shape != "box" && molds[moldind].shape != "wall" && molds[moldind].shape != "floor" && molds[moldind].covering == "directional texture") {
				molds[moldind].covering = "texture";
			}
			if (mold.material != undefined) {
				if (molds[moldind].covering != "none" && molds[moldind].covering != "hidden" && molds[moldind].moldname.indexOf('video') == -1 && molds[moldind].moldname.indexOf('store') == -1) {
					mold.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
					mold.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
					if (mold.receiveShadows == false) {
						mold.material.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
					} else {
						mold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					}
				} else {
					opacity = 0;
					mold.material.specularColor = new BABYLON.Color3(opacity, opacity, opacity);			
					mold.material.diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);	
					mold.material.emissiveColor = new BABYLON.Color3(opacity, opacity, opacity);
				}
				if (molds[moldind].covering == "glass") {
					opacity = .2;
				}
				if (molds[moldind].shape != "image") {
					mold.material.alpha = opacity;
				}
				if (mold.material.subMaterials != undefined) {
					for (var i = 0; i < mold.material.subMaterials.length; i++) {
						mold.material.subMaterials[i].alpha = opacity;
						mold.material.subMaterials[i].specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
						mold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
						if (mold.receiveShadows == false) {
							mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
						} else {
							mold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
						}
					}
				}
			}
			var moldimageframename = moldname + "-imageframe";
			var moldimageframe = scene.getMeshByID(moldimageframename);
			if (moldimageframe != null) {	
				if (moldimageframe.material != undefined) {
					moldimageframe.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
					moldimageframe.material.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
					moldimageframe.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
					/* moldimageframe.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity); */
				}
			}
/*			var parts = mold.getChildren();
			if (parts != null) {
				for (var i=0; i < parts.length;i++) {
					if (parts[i].name.indexOf("actionzone") == -1) {
						if (parts[i].name.indexOf("-image-base") > -1 || parts[i].name.indexOf("-video-base") > -1) {
							WTW.unhighlightMold(parts[i], 0);
						} else {
							WTW.unhighlightMold(parts[i], opacity);
						}
						var subparts = parts[i].getChildren();
						if (subparts != null) {
							for (var j=0; j < subparts.length;j++) {
								if (subparts[j].name.indexOf("actionzone") == -1) {
									if (subparts[j].name.indexOf("-image-base") > -1 || subparts[j].name.indexOf("-video-base") > -1) {
										WTW.unhighlightMold(subparts[j], 0);
									} else {
										WTW.unhighlightMold(subparts[j], opacity);
									}
									var subsubparts = subparts[j].getChildren();
									if (subsubparts != null) {
										for (var k=0; k < subsubparts.length;k++) {
											if (subsubparts[k].name.indexOf("actionzone") == -1) {
												if (subsubparts[k].name.indexOf("-image-base") > -1 || subsubparts[k].name.indexOf("-video-base") > -1) {
													WTW.unhighlightMold(subsubparts[k], 0);
												} else {
													WTW.unhighlightMold(subsubparts[k], opacity);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			} */
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetMoldOpacity=" + ex.message);
	} 
}

WTWJS.prototype.resetMoldCoverings = function() {
	try {
		if (WTW.buildingMolds != null) {
			for (var i = 0; i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					var shape = "wall";
					var coveringname = "texture";
					var texturebackupid = "";
					if (WTW.buildingMolds[i].shape != undefined) {
						shape = WTW.buildingMolds[i].shape;
					}
					if (WTW.buildingMolds[i].covering != undefined) {
						coveringname = WTW.buildingMolds[i].covering;
					}
					if (WTW.buildingMolds[i].graphics.texture.backupid != undefined) {
						texturebackupid = WTW.buildingMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || texturebackupid != "") {
						var mold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
						if (mold != null) {
							var molddef = WTW.buildingMolds[i];
							if ((shape == "box" || shape == "wall" || shape == "floor") && coveringname == "directional texture") {
								if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
									WTW.clearDirectionalTexture(mold);
								}
							}
							var lenx = mold.scaling.x;
							var leny = mold.scaling.y;
							var lenz = mold.scaling.z;
							var special1 = 0;
							var special2 = 0;
							if (molddef.scaling.special1 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special1)) {
									special1 = Number(molddef.scaling.special1)
								}
							}
							if (molddef.scaling.special2 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special2)) {
									special2 = Number(molddef.scaling.special2)
								}
							}
							if (shape != "image") {
								WTW.resetMoldOpacity('building', i);
								if (shape != "viewblog" && shape != "blogposting" && shape != "image") {
									if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('building', i);
											}
										} else {
											WTW.resetMoldCovering('building', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		if (WTW.communitiesMolds != null) {
			for (var i = 0; i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					var shape = "wall";
					var coveringname = "texture";
					var texturebackupid = "";
					if (WTW.communitiesMolds[i].shape != undefined) {
						shape = WTW.communitiesMolds[i].shape;
					}
					if (WTW.communitiesMolds[i].covering != undefined) {
						coveringname = WTW.communitiesMolds[i].covering;
					}
					if (WTW.communitiesMolds[i].graphics.texture.backupid != undefined) {
						texturebackupid = WTW.communitiesMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || texturebackupid != "") {
						var mold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
						if (mold != null) {
							var molddef = WTW.communitiesMolds[i];
							if ((shape == "box" || shape == "wall" || shape == "floor") && coveringname == "directional texture") {
								if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
									WTW.clearDirectionalTexture(mold);
								}
							}
							var lenx = mold.scaling.x;
							var leny = mold.scaling.y;
							var lenz = mold.scaling.z;
							var special1 = 0;
							var special2 = 0;
							if (molddef.scaling.special1 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special1)) {
									special1 = Number(molddef.scaling.special1)
								}
							}
							if (molddef.scaling.special2 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special2)) {
									special2 = Number(molddef.scaling.special2)
								}
							}
							if (shape != "image") {
								WTW.resetMoldOpacity('community', i);
								if (shape != "viewblog" && shape != "blogposting") {
									if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('community', i);
											}
										} else {
											WTW.resetMoldCovering('community', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		if (WTW.thingMolds != null) {
			for (var i = 0; i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					var shape = "wall";
					var coveringname = "texture";
					var texturebackupid = "";
					if (WTW.thingMolds[i].shape != undefined) {
						shape = WTW.thingMolds[i].shape;
					}
					if (WTW.thingMolds[i].covering != undefined) {
						coveringname = WTW.thingMolds[i].covering;
					}
					if (WTW.thingMolds[i].graphics.texture.backupid != undefined) {
						texturebackupid = WTW.thingMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || texturebackupid != "") {
						var mold = scene.getMeshByID(WTW.thingMolds[i].moldname);
						if (mold != null) {
							var molddef = WTW.thingMolds[i];
							if ((shape == "box" || shape == "wall" || shape == "floor") && coveringname == "directional texture") {
								if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
									WTW.clearDirectionalTexture(mold);
								}
							}
							var lenx = mold.scaling.x;
							var leny = mold.scaling.y;
							var lenz = mold.scaling.z;
							var special1 = 0;
							var special2 = 0;
							if (molddef.scaling.special1 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special1)) {
									special1 = Number(molddef.scaling.special1)
								}
							}
							if (molddef.scaling.special2 != undefined) {
								if (WTW.isNumeric(molddef.scaling.special2)) {
									special2 = Number(molddef.scaling.special2)
								}
							}
							if (shape != "image") {
								WTW.resetMoldOpacity('thing', i);
								if (shape != "viewblog" && shape != "blogposting" && shape != "image") {
									if (molddef.graphics.texture.id != molddef.graphics.texture.backupid && molddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('thing', i);
											}
										} else {
											WTW.resetMoldCovering('thing', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}		
		if (WTW.adminView == 1) {
			if (dGet('wtw_tmoldname').value.indexOf('molds') > -1) {
				WTW.setNewMold();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-resetMoldCoverings=" + ex.message);
	}
}

WTWJS.prototype.addShadowToShadowmaps = function(mold) {
	try {
		WTW.addShadowToMold(mold, WTW.shadows);
		for (var i=0; i < WTW.communitiesMolds.length;i++) {
			if (WTW.communitiesMolds[i] != null) {
				if (WTW.communitiesMolds[i].moldname != undefined) {
					if (WTW.communitiesMolds[i].objects.light != '') {
						WTW.addShadowToMold(mold, WTW.communitiesMolds[i].objects.shadows);
					} 
					if (WTW.communitiesMolds[i].shape == 'floor' || WTW.communitiesMolds[i].shape == 'terrain') {
						if (WTW.communitiesMolds[i].covering != "none" && WTW.communitiesMolds[i].covering != "hidden" && WTW.communitiesMolds[i].covering != "directional texture") {
							var smold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
							if (smold != null) {
								if (smold.material != undefined) {
									smold.material.specularColor = new BABYLON.Color3(Number(WTW.communitiesMolds[i].color.specular.r), Number(WTW.communitiesMolds[i].color.specular.g), Number(WTW.communitiesMolds[i].color.specular.b));
									smold.material.diffuseColor = new BABYLON.Color3(Number(WTW.communitiesMolds[i].color.diffuse.r), Number(WTW.communitiesMolds[i].color.diffuse.g), Number(WTW.communitiesMolds[i].color.diffuse.b));	
									if (smold.receiveShadows == false) {
										smold.material.emissiveColor = new BABYLON.Color3(Number(WTW.communitiesMolds[i].color.emissive.r), Number(WTW.communitiesMolds[i].color.emissive.g), Number(WTW.communitiesMolds[i].color.emissive.b));
									} else {
										smold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
									}
								}
							}
						}
					}
				}
			}
		}
		for (var i=0; i < WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				if (WTW.buildingMolds[i].moldname != undefined) {

				}
			}
		}
		for (var i=0; i < WTW.thingMolds.length;i++) {
			if (WTW.thingMolds[i] != null) {
				if (WTW.thingMolds[i].moldname != undefined) {

				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addShadowToShadowmaps=" + ex.message);
	}
}

WTWJS.prototype.addShadowToMold = function(mold, shadowmap) {
	try {
		window.setTimeout(function(){
			var found = false;
			var foundind = -1;
			var nextind = -1;
			if (shadowmap != null) {
				if (shadowmap.getShadowMap() != null) {
					nextind = shadowmap.getShadowMap().renderList.length;
					for (var i=0; i < shadowmap.getShadowMap().renderList.length; i++) {
						if (shadowmap.getShadowMap().renderList[i] == null) {
							if (i < nextind) {
								nextind = i;
							}
						} else {
							if (mold != null) {
								if (mold.name != undefined) {
									if (shadowmap.getShadowMap().renderList[i].name == mold.name) {
										found = true;
										foundind = i;
									}
								}
							}
						}
					}
					if (found == false) {
						if (mold != null) {
							var opacity = 1;
							if (mold.material != null) {
								if (mold.material.alpha != undefined) {
									opacity = mold.material.alpha;
								}
							}
							if (mold.receiveShadows == false && opacity > .41) {
								shadowmap.addShadowCaster(mold, true);
							}
						}
					}
				}
			}
		},100); 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addShadowToMold=" + ex.message);
	} 
}

WTWJS.prototype.disposeShadowFromMold = function(moldname) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null && WTW.shadows != null) {
			WTW.shadows.removeShadowCaster(mold, true);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeShadowFromMold=" + ex.message);
	} 
}

WTWJS.prototype.disposeReflectionFromMold = function(moldname) {
	try {
		if (WTW.waterMat != null) {
			if (WTW.waterMat.reflectionTexture != null) {
				for (var i=WTW.waterMat.reflectionTexture.renderList.length; i > -1 ; i--) {
					if (WTW.waterMat.reflectionTexture.renderList[i] != null) {
						if (WTW.waterMat.reflectionTexture.renderList[i].name == moldname) {
							WTW.waterMat.reflectionTexture.renderList[i] = null;
							WTW.waterMat.reflectionTexture.renderList.splice(i,1);
						}
					}
				}
			}
			if (WTW.waterMat.refractionTexture != null) {
				for (var i=WTW.waterMat.refractionTexture.renderList.length; i > -1 ; i--) {
					if (WTW.waterMat.refractionTexture.renderList[i] != null) {
						if (WTW.waterMat.refractionTexture.renderList[i].name == moldname) {
							WTW.waterMat.refractionTexture.renderList[i] = null;
							WTW.waterMat.refractionTexture.renderList.splice(i,1);
						}
					}
				}
			}
		}
		for (var j=0; j < WTW.communitiesMolds.length;j++) {
			if (WTW.communitiesMolds[j] != null) {
				if (WTW.communitiesMolds[j].shape == "waterplane" || WTW.communitiesMolds[j].shape == "waterdisc") {
					var watermat = scene.getMaterialByID(WTW.communitiesMolds[j].moldname + "-watermat");
					if (watermat != null) {
						if (watermat.reflectionTexture != null) {
							for (var i=watermat.reflectionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.reflectionTexture.renderList[i] != null) {
									if (watermat.reflectionTexture.renderList[i].name == moldname) {
										watermat.reflectionTexture.renderList[i] = null;
										watermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (watermat.refractionTexture != null) {
							for (var i=watermat.refractionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.refractionTexture.renderList[i] != null) {
									if (watermat.refractionTexture.renderList[i].name == moldname) {
										watermat.refractionTexture.renderList[i] = null;
										watermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		}
		for (var j=0; j < WTW.buildingMolds.length;j++) {
			if (WTW.buildingMolds[j] != null) {
				if (WTW.buildingMolds[j].shape == "waterplane" || WTW.buildingMolds[j].shape == "waterdisc") {
					var watermat = scene.getMaterialByID(WTW.buildingMolds[j].moldname + "-watermat");
					if (watermat != null) {
						if (watermat.reflectionTexture != null) {
							for (var i=watermat.reflectionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.reflectionTexture.renderList[i] != null) {
									if (watermat.reflectionTexture.renderList[i].name == moldname) {
										watermat.reflectionTexture.renderList[i] = null;
										watermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (watermat.refractionTexture != null) {
							for (var i=watermat.refractionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.refractionTexture.renderList[i] != null) {
									if (watermat.refractionTexture.renderList[i].name == moldname) {
										watermat.refractionTexture.renderList[i] = null;
										watermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
					var waterundermaterial = scene.getMaterialByID(WTW.buildingMolds[j].moldname + "-waterundermaterial");
				}
			}
		}
		for (var j=0; j < WTW.thingMolds.length;j++) {
			if (WTW.thingMolds[j] != null) {
				if (WTW.thingMolds[j].shape == "waterplane" || WTW.thingMolds[j].shape == "waterdisc") {
					var watermat = scene.getMaterialByID(WTW.thingMolds[j].moldname + "-watermat");
					if (watermat != null) {
						if (watermat.reflectionTexture != null) {
							for (var i=watermat.reflectionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.reflectionTexture.renderList[i] != null) {
									if (watermat.reflectionTexture.renderList[i].name == moldname) {
										watermat.reflectionTexture.renderList[i] = null;
										watermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (watermat.refractionTexture != null) {
							for (var i=watermat.refractionTexture.renderList.length; i > -1 ; i--) {
								if (watermat.refractionTexture.renderList[i] != null) {
									if (watermat.refractionTexture.renderList[i].name == moldname) {
										watermat.refractionTexture.renderList[i] = null;
										watermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeReflectionFromMold=" + ex.message);
	} 
}

WTWJS.prototype.addReflection = function(watermat) {
	try {
		if (watermat != null) {
			for (var i=0; i < WTW.communitiesMolds.length;i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].graphics.waterreflection == "1" || WTW.communitiesMolds[i].moldname.indexOf("terrain") > -1 || WTW.communitiesMolds[i].shape == "floor" ) {
						var mold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
						if (mold != null) {
							watermat.addToRenderList(mold);
						}
					}
				}
			}
			for (var i=0; i < WTW.buildingMolds.length;i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].graphics.waterreflection == "1") {
						var mold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
						if (mold != null) {
							watermat.addToRenderList(mold);
							if (WTW.buildingMolds[i].shape == "image") {
								var imagemold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-mainimage");
								if (imagemold != null) {
									watermat.addToRenderList(imagemold);
								}
								var imagehovermold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-hoverimage");
								if (imagehovermold != null) {
									watermat.addToRenderList(imageovermold);
								}
								var imageclickmold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-clickimage");
								if (imageclickmold != null) {
									watermat.addToRenderList(imageclickmold);
								}
							}
						}
					}
				}
			}
			for (var i=0; i < WTW.thingMolds.length;i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].graphics.waterreflection == "1") {
						var mold = scene.getMeshByID(WTW.thingMolds[i].moldname);
						if (mold != null) {
							watermat.addToRenderList(mold);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addReflection=" + ex.message);
	} 
}

WTWJS.prototype.moldHasReflection = function(moldname, watermat) {
	var found = false;
	try {
		if (watermat != null) {
			if (watermat.reflectionTexture != null) {
				for (var i=0; i < watermat.reflectionTexture.renderList.length; i++) {
					if (watermat.reflectionTexture.renderList[i] != null) {
						if (watermat.reflectionTexture.renderList[i].name == moldname) {
							found = true;
						}
					}
				}
			}
			if (watermat.refractionTexture != null) {
				for (var i=0; i < watermat.refractionTexture.renderList.length; i++) {
					if (watermat.refractionTexture.renderList[i] != null) {
						if (watermat.refractionTexture.renderList[i].name == moldname) {
							found = true;
						}
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-moldHasReflection=" + ex.message);
	} 
	return found;
}

WTWJS.prototype.addReflectionRefraction = function(mold) {
	try {
/*		if (WTW.moldHasReflection(mold.name, WTW.waterMat) == false) {
			if (WTW.waterMat != null) {
				WTW.addReflectionToMold(WTW.waterMat, mold);
				WTW.addRefractionToMold(WTW.waterMat, mold);
			}
		}
		for (var i=0; i < WTW.communitiesMolds.length;i++) {
			if (WTW.communitiesMolds[i] != null) {
				if (WTW.communitiesMolds[i].shape == "waterplane" || WTW.communitiesMolds[i].shape == "waterdisc") {
					var refmold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
					if (refmold != null) {
						var watermat = scene.getMaterialByID(WTW.communitiesMolds[i].moldname + "-watermat");
						if (WTW.moldHasReflection(WTW.communitiesMolds[i].moldname, watermat) == false) {
							WTW.addReflectionToMold(watermat, mold);
							WTW.addRefractionToMold(watermat, mold);
						}
					}
				}
			}
		}
		for (var i=0; i < WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				if (WTW.buildingMolds[i].shape == "waterplane" || WTW.buildingMolds[i].shape == "waterdisc") {
					var refmold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
					if (refmold != null) {
						var watermat = scene.getMaterialByID(WTW.buildingMolds[i].moldname + "-watermat");
						if (WTW.moldHasReflection(WTW.buildingMolds[i].moldname, watermat) == false) {
							WTW.addReflectionToMold(watermat, mold);
							WTW.addRefractionToMold(watermat, mold);
						}
					}
				}
			}
		}
		for (var i=0; i < WTW.thingMolds.length;i++) {
			if (WTW.thingMolds[i] != null) {
				if (WTW.thingMolds[i].shape == "waterplane" || WTW.thingMolds[i].shape == "waterdisc") {
					var refmold = scene.getMeshByID(WTW.thingMolds[i].moldname);
					if (refmold != null) {
						var watermat = scene.getMaterialByID(WTW.thingMolds[i].moldname + "-watermat");
						if (WTW.moldHasReflection(WTW.thingMolds[i].moldname, watermat) == false) {
							WTW.addReflectionToMold(watermat, mold);
							WTW.addRefractionToMold(watermat, mold);
						}
					}
				}
			}
		}
		var imagemold = scene.getMeshByID(mold.name + "-mainimage");
		if (imagemold != null) {
			WTW.addReflectionRefraction(imagemold);
		}
		var imagehovermold = scene.getMeshByID(mold.name + "-hoverimage");
		if (imagehovermold != null) {
			WTW.addReflectionRefraction(imagehovermold);
		}
		var imageclickmold = scene.getMeshByID(mold.name + "-clickimage");
		if (imageclickmold != null) {
			WTW.addReflectionRefraction(imageclickmold);
		} */
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addReflectionRefraction=" + ex.message);
	} 
}

WTWJS.prototype.addReflectionToMold = function(watermat, mold) {
	try {
/*		if (watermat != null && mold != null) {
			var found = false;
			var foundind = -1;
			var nextind = 0;
			if (watermat.reflectionTexture != null) {
				nextind = watermat.reflectionTexture.renderList.length;
				for (var i=0; i < watermat.reflectionTexture.renderList.length; i++) {
					if (watermat.reflectionTexture.renderList[i] == null) {
						if (i < nextind) {
							nextind = i;
						}
					} else {
						if (mold.name != undefined) {
							if (watermat.reflectionTexture.renderList[i].name == mold.name) {
								found = true;
								foundind = i;
							}
						}
					}
				}
				window.setTimeout(function() {
					if (found == false) {
						if (watermat.reflectionTexture != null) {
							watermat.reflectionTexture.renderList[nextind] = mold;
						}
					} else if (foundind > -1) {
						if (watermat.reflectionTexture != null) {
							watermat.reflectionTexture.renderList[foundind] = mold;
						}
					}
				},2000);
			}
		} */
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addReflectionToMold=" + ex.message);
	} 
}

WTWJS.prototype.addRefractionToMold = function(watermat, mold) {
	try {
/*		var found = false;
		var nextind = 0;
		if (watermat != null && mold != null) {
			if (watermat.refractionTexture != null) {
				nextind = watermat.refractionTexture.renderList.length;
				for (var i=0; i < watermat.refractionTexture.renderList.length; i++) {
					if (watermat.refractionTexture.renderList[i] == null) {
						if (i < nextind) {
							nextind = i;
						}
					} else {
						if (mold.name != undefined) {
							if (watermat.refractionTexture.renderList[i].name == mold.name) {
								found = true;
							}
						}
					}
				}
				if (found == false) {
					if (mold != null) {
						watermat.refractionTexture.renderList[nextind] = mold;
					}
				}
			} 
		} */
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addRefractionToMold=" + ex.message);
	} 
}

WTWJS.prototype.addHtmlHR = function(content, color, halign, tlinesize, twidth, scrollpos, indent) {
	var minx = 0;
	var pwidth = 0;
	var pheight = 0;
	var maxwidth = 0;
	var maxheight = 0;
	var linewidth = 0;
	try {
		var width = 0;
		if (scrollpos == undefined) {
			scrollpos = 0;
		}
		if (indent == undefined) {
			indent = 0;
		} else if (WTW.isNumeric(indent)) {
			indent = Number(indent);
		} else {
			indent = 0;
		}
		var textureContext = content.material.diffuseTexture.getContext();
		var size = content.material.diffuseTexture.getSize();
		maxwidth = size.width - indent;
		maxheight = size.height;
		minx = maxwidth;
		if (tlinesize != undefined) {
			var tsiz = tlinesize.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tsiz)) {
				linesize = tsiz;
			} else {
				linesize = "1";
			}
		} else {
			linesize = "1";
		}
		if (twidth != undefined) {
			var twid = twidth.replace("%","").replace(" ","");
			if (twidth.indexOf("%") > -1) {
				if (WTW.isNumeric(twid)) {
					width = maxwidth * (Number(twid) / 100);
				} else {
					width = maxwidth;
				}
			} else {
				width = maxwidth;
			}
		} else {
			width = maxwidth;
		}
		var x = 1;
		var y = 25;
		switch (halign) {
			case "center":
				x = indent + (maxwidth - width) / 2;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
			case "right":
				x = indent + maxwidth - width;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
			default:
				x = indent;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
		}
		pheight = y;
		y += scrollpos;
		textureContext.save();
		textureContext.strokeStyle = color;
		textureContext.lineWidth = linesize;
		linewidth = maxwidth;
		textureContext.beginPath();
		textureContext.moveTo(x,y);
		textureContext.lineTo(x + width,y);
		textureContext.stroke();
		textureContext.restore();
		content.material.diffuseTexture.update();
		pwidth = maxwidth;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addHtmlHR=" + ex.message);
	} 
	return {
		minx:minx,
		width:pwidth,
		height:pheight,
		maxwidth:maxwidth,
		maxheight:maxheight,
		linewidth:linewidth
	};
} 

WTWJS.prototype.addHtmlBorder = function(content, tx, ty, twidth, theight, color, ttype, tborderwidth, scrollpos) {
	var maxwidth = 0;
	var maxheight = 0;
	var linewidth = 0;
	try {
		var width = 0;
		var height = 0;
		var x = 1;
		var y = 1;
		if (tborderwidth == undefined) {
			tborderwidth = "0px";
		}
		if (scrollpos == undefined) {
			scrollpos = 0;
		}
		var textureContext = content.material.diffuseTexture.getContext();
		var size = content.material.diffuseTexture.getSize();
		maxwidth = size.width;
		maxheight = size.height;
		tborderwidth = tborderwidth.replace("px","").replace("em","").replace("pt","").replace(" ","");
		if (WTW.isNumeric(tborderwidth)) {
			linesize = tborderwidth;
		} else {
			linesize = "1";
		}
		if (WTW.isNumeric(twidth)) {
			width = Number(twidth);
		} else {
			width = maxwidth;
		}
		if (WTW.isNumeric(theight)) {
			height = Number(theight);
		} else {
			height = maxheight;
		}
		if (WTW.isNumeric(tx)) {
			x = Number(tx);
		} else {
			x = maxwidth;
		}
		if (WTW.isNumeric(ty)) {
			y = Number(ty);
		} else {
			y = maxheight;
		}
		y += scrollpos;
		textureContext.save();
		textureContext.strokeStyle = color;
		textureContext.lineWidth = linesize;
		linewidth = maxwidth;
		textureContext.strokeRect(x,y,width,height);
		textureContext.restore();
		content.material.diffuseTexture.update();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addHtmlBorder=" + ex.message);
	} 
} 

WTWJS.prototype.wrapText = function(content, text, tlineheight, tfontsize, halign, valign, color, scrollpos, indent, tmaxwidth, tmarginleft, tmarginright, tfloat, tfloatwidth, tfloatheight) {
	var minx = 0;
	var pwidth = 0;
	var pheight = 0;
	var maxwidth = 0;
	var maxheight = 0;
	var linewidth = 0;
	var marginleft = 0;
	var marginright = 0;
	var floatheight = 0;
	var floatwidth = 0;
	try {
		if (tfloat == undefined) {
			tfloat = "";
		}
		if (tfloatwidth == undefined) {
			tfloatwidth = "0px";
		}
		if (tfloatheight == undefined) {
			tfloatheight = "0px";
		}
		if (tmaxwidth == undefined) {
			tmaxwidth = "100%";
		}
		if (scrollpos == undefined) {
			scrollpos = 0;
		}
		if (indent == undefined) {
			indent = 5;
		} else if (WTW.isNumeric(indent)) {
			indent = Number(indent);
		} else {
			indent = 5;
		}
		if (tmarginleft == undefined) {
			tmarginleft = "0px";
		}
		if (tmarginright == undefined) {
			tmarginright = "0px";
		}
		if (WTW.isNumeric(tfloatwidth)) {
			floatwidth = Number(tfloatwidth);
		}
		if (WTW.isNumeric(tfloatheight)) {
			floatheight = Number(tfloatheight);
		}
		if (tmarginleft.indexOf("%") > -1) {
			tmarginleft = tmarginleft.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmarginleft)) {
				marginleft = size.width * Number(tmarginleft)/100;
			}
		} else {
			tmarginleft = tmarginleft.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmarginleft)) {
				marginleft = Number(tmarginleft);
			}
		}
		if (tmarginright.indexOf("%") > -1) {
			tmarginright = tmarginright.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmarginright)) {
				marginright = size.width * Number(tmarginright)/100;
			}
		} else if (tmarginright.indexOf("em") > -1) {
			tmarginright = tmarginright.replace("em","").replace(" ","");
			if (WTW.isNumeric(tmarginright)) {
				marginright = Number(tmarginright) * 12;
				
			}
		} else {
			tmarginright = tmarginright.replace("px","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmarginright)) {
				marginright = Number(tmarginright);
				
			}
		}
		if (marginright < 10) {
			marginright = 10;
		}
		var fontsize = 20;
		if (tfontsize.indexOf("em") > -1 && WTW.isNumeric(tfontsize.replace("em","").replace(" ",""))) {
			fontsize = Number(tfontsize.replace("px","").replace("em","").replace("pt","").replace(" ","")) * 12;
		} else if (WTW.isNumeric(tfontsize.replace("px","").replace("pt","").replace(" ",""))) {
			fontsize = Number(tfontsize.replace("px","").replace("pt","").replace(" ",""));
		}
		var lineheight = 30;
		if (tlineheight.indexOf("em") > -1 && WTW.isNumeric(tlineheight.replace("em","").replace(" ",""))) {
			lineheight = Number(tlineheight.replace("px","").replace("em","").replace("pt","").replace(" ","")) * 12;
		} else if (WTW.isNumeric(tlineheight.replace("px","").replace("pt","").replace(" ",""))) {
			lineheight = Number(tlineheight.replace("px","").replace("pt","").replace(" ",""));
		}
		text = text.replace(/(?:\r\n|\r|\n)/g," ¶ ");
		var words = text.split(' ');
		var line = '';
		var textureContext = content.material.diffuseTexture.getContext();
		var size = content.material.diffuseTexture.getSize();
		maxwidth = size.width - 5;
		maxheight = size.height;
		maxwidth -= indent;
		minx = maxwidth;
		if (tmaxwidth.indexOf("%") > -1) {
			tmaxwidth = tmaxwidth.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmaxwidth)) {
				maxwidth = maxwidth * Number(tmaxwidth)/100;
			}
		} else if (tmaxwidth.indexOf("em") > -1 && WTW.isNumeric(tfontsize.replace("em","").replace(" ",""))) {
			maxwidth = Number(tmaxwidth.replace("px","").replace("em","").replace("pt","").replace(" ","")) * 12;
		} else if (WTW.isNumeric(tmaxwidth.replace("px","").replace("pt","").replace(" ",""))) {
			maxwidth = Number(tmaxwidth.replace("px","").replace("pt","").replace(" ",""));
		}
		if (halign == "right") {
			marginleft = size.width - maxwidth - marginright;
			if (marginleft < 0) {
				marginleft = 0;
			}
		}

		var x = 1;
		var y = 25;
		var ylineheight = 25;
		var testWidth = 0;
		var testWidthlast = 0;
		var textsizelast;
		if (WTW.isNumeric(lineheight)) {
			y = Number(lineheight);
			ylineheight = y;
		} else if (WTW.isNumeric(fontsize)) {
			y = Number(fontsize);
			ylineheight = y;
		}
		y += scrollpos;
		floatheight += ylineheight;
		textureContext.save();
		textureContext.font = fontsize + "px Arial";
		textureContext.fillStyle = color;
		var testmaxwidth = maxwidth;
		for(var n = 0; n < words.length; n++) {
			if (y > scrollpos && y < (scrollpos + floatheight)) {
				testmaxwidth = maxwidth - floatwidth;
			} else {
				testmaxwidth = maxwidth;
			}
			var testLine = line + words[n] + ' ';
			var textsize =  textureContext.measureText(testLine.replace("¶ ","").trim());
			textsizelast =  textureContext.measureText(line.replace("¶ ","").trim());
			testWidth = textsize.width;
			testWidthlast = textsizelast.width;
			if (pwidth < testWidthlast) {
				pwidth = testWidthlast;
			}
			if ((testWidth > testmaxwidth && n > 0) || words[n].indexOf("¶") > -1) {
				switch (halign) {
					case "center":
						if (y > scrollpos && y < (scrollpos + floatheight)) {
							x = floatwidth + indent + (testmaxwidth - testWidthlast) / 2;
						} else {
							x = indent + (testmaxwidth - testWidthlast) / 2;
						}
						if (minx > x) {
							minx = x;
						}
						indent = 5;
						break;
					case "right":
						if (y > scrollpos && y < (scrollpos + floatheight)) {
							x = floatwidth + marginleft + indent + testmaxwidth - testWidthlast;
						} else {
							x = marginleft + indent + testmaxwidth - testWidthlast;
						}
						if (minx > x) {
							minx = x;
						}
						indent = 5;
						break;
					default:
						if (y > scrollpos && y < (scrollpos + floatheight)) {
							x = floatwidth + marginleft + indent;
						} else {
							x = marginleft + indent;
						}
						if (minx > x) {
							minx = x;
						}
						indent = 5;
						break;
				}
				textureContext.fillText(line.replace("¶","").trim(), x, y);
				if (words[n].indexOf("¶") > -1) {
					line = "";
				} else {
					line = words[n] + ' ';
				}
				
				y += ylineheight;
			}
			else {
				line = testLine.replace("¶ ","");
			}
		}
		textsizelast =  textureContext.measureText(line.replace("¶ ","").trim());
		testWidthlast = textsizelast.width;
		if (pwidth < testWidthlast) {
			pwidth = testWidthlast;
		}
		if (y > scrollpos && y < (scrollpos + floatheight)) {
			testmaxwidth = maxwidth - floatwidth;
		} else {
			testmaxwidth = maxwidth;
		}
		switch (halign) {
			case "center":
				if (y > scrollpos && y < (scrollpos + floatheight)) {
					x = floatwidth + indent + (testmaxwidth - testWidthlast) / 2;
				} else {
					x = indent + (testmaxwidth - testWidthlast) / 2;
				}
				if (minx > x) {
					minx = x;
				}
				indent = 5;
				break;
			case "right":
				if (y > scrollpos && y < (scrollpos + floatheight)) {
					x = floatwidth + marginleft + indent + testmaxwidth - testWidthlast;
				} else {
					x = marginleft + indent + testmaxwidth - testWidthlast;
				}
				if (minx > x) {
					minx = x;
				}
				indent = 5;
				break;
			default:
				if (y > scrollpos && y < (scrollpos + floatheight)) {
					x = floatwidth + marginleft + indent;
				} else {
					x = marginleft + indent;
				}
				if (minx > x) {
					minx = x;
				}
				indent = 5;
				break;
		}
		linewidth = testWidthlast;
		textureContext.fillText(line.replace("¶","").trim(), x, y);
		textureContext.restore();
		switch (valign) {
			case "middle":
				content.material.diffuseTexture.vOffset -= (1 - (1 / maxheight * y)) / 2;
				break;
			case "center":
				content.material.diffuseTexture.vOffset -= (1 - (1 / maxheight * y)) / 2;
				break;
			case "bottom":
				content.material.diffuseTexture.vOffset -= (1 - (1 / (maxheight - 1) * y));
				break;
		}
		content.material.diffuseTexture.update();
		pheight = y - scrollpos;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-wrapText=" + ex.message);
	} 
	return {
		minx:minx,
		width:pwidth,
		height:pheight,
		maxwidth:maxwidth,
		maxheight:maxheight,
		linewidth:linewidth
	};
} 

WTWJS.prototype.addHtmlImg = function(content, src, halign, twidth, theight, tborderwidth, tbordercolor, scrollpos, indent, tmarginleft, tmarginright, tmargintop, tmarginbottom) {
	var minx = 0;
	var pwidth = 0;
	var pheight = 0;
	var maxwidth = 0;
	var maxheight = 0;
	var linewidth = 0;
	var marginleft = 5;
	var marginright = 5;
	var margintop = 5;
	var marginbottom = 5;
	try {
		var width = 0;
		var height = 0;
		var borderwidth = "0";
		if (tborderwidth == undefined) {
			tborderwidth = "0px";
		}
		if (tbordercolor == undefined) {
			tbordercolor = "transparent";
		}
		if (scrollpos == undefined) {
			scrollpos = 0;
		}
		if (indent == undefined) {
			indent = 0;
		} else if (WTW.isNumeric(indent)) {
			indent = Number(indent);
		} else {
			indent = 0;
		}
		tborderwidth = tborderwidth.replace("px","").replace("em","").replace("pt","").replace(" ","");
		if (WTW.isNumeric(tborderwidth)) {
			borderwidth = tborderwidth;
		} else {
			borderwidth = "0";
		}
		if (tmarginleft == undefined) {
			tmarginleft = "0px";
		}
		if (tmarginright == undefined) {
			tmarginright = "0px";
		}
		if (tmargintop == undefined) {
			tmargintop = "0px";
		}
		if (tmarginbottom == undefined) {
			tmarginbottom = "0px";
		}
		if (tmarginleft.indexOf("%") > -1) {
			tmarginleft = tmarginleft.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmarginleft)) {
				marginleft = size.width * Number(tmarginleft)/100;
			}
		} else {
			tmarginleft = tmarginleft.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmarginleft)) {
				marginleft = Number(tmarginleft);
			}
		}
		if (tmarginright.indexOf("%") > -1) {
			tmarginright = tmarginright.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmarginright)) {
				marginright = size.width * Number(tmarginright)/100;
			}
		} else {
			tmarginright = tmarginright.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmarginright)) {
				marginright = Number(tmarginright);
			}
		}
		if (marginright < 10) {
			marginright = 10;
		}
		if (tmargintop.indexOf("%") > -1) {
			tmargintop = tmargintop.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmargintop)) {
				margintop = size.height * Number(tmargintop)/100;
			}
		} else {
			tmargintop = tmargintop.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmargintop)) {
				margintop = Number(tmargintop);
			}
		}
		if (tmarginbottom.indexOf("%") > -1) {
			tmarginbottom = tmarginbottom.replace("%","").replace(" ","");
			if (WTW.isNumeric(tmarginbottom)) {
				marginbottom = size.height * Number(tmarginbottom)/100;
			}
		} else {
			tmarginbottom = tmarginbottom.replace("px","").replace("em","").replace("pt","").replace(" ","");
			if (WTW.isNumeric(tmarginbottom)) {
				marginbottom = Number(tmarginbottom);
			}
		}
		var textureContext = content.material.diffuseTexture.getContext();
		var size = content.material.diffuseTexture.getSize();
		maxwidth = size.width - indent;
		maxheight = size.height;
		minx = maxwidth;
		if (halign == "right") {
			marginleft = size.width - maxwidth - marginright;
			if (marginleft < 0) {
				marginleft = 0;
			}
		}
		if (twidth != undefined) {
			if (twidth.indexOf("%") > -1) {
				twidth = twidth.replace("%","").replace(" ","");
				if (WTW.isNumeric(twidth)) {
					width = maxwidth * (Number(twidth) / 100);
				} else {
					width = maxwidth;
				}
			} else {
				twidth = twidth.replace("px","").replace("pt","").replace(" ","");
				if (WTW.isNumeric(twidth)) {
					width = Number(twidth);
				} else {
					width = maxwidth;
				}
			}
		} else {
			width = maxwidth;
		}
		if (theight != undefined) {
			if (theight.indexOf("%") > -1) {
				theight = theight.replace("%","").replace(" ","");
				if (WTW.isNumeric(theight)) {
					height = maxheight * (Number(theight) / 100);
				} else {
					height = maxheight;
				}
			} else {
				theight = theight.replace("px","").replace("pt","").replace(" ","");
				if (WTW.isNumeric(theight)) {
					height = Number(theight);
				} else {
					height = maxheight;
				}
			}
		} else {
			height = maxheight;
		}
		var x = 1;
		var y = margintop;
		switch (halign) {
			case "center":
				x = indent + (maxwidth - width) / 2;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
			case "right":
				x = marginleft + indent + maxwidth - width;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
			default:
				x = marginleft + indent;
				if (minx > x) {
					minx = x;
				}
				indent = 0;
				break;
		}
		y += scrollpos;
		var tempimage = new Image();
		if (src != "") {
			tempimage.src = src;
			tempimage.onload = function(){
				textureContext.save();
				textureContext.drawImage(tempimage, x, y, width, height);
				if (Number(borderwidth) > 0) {
					textureContext.strokeStyle = tbordercolor;
					textureContext.lineWidth = borderwidth;
					textureContext.strokeRect(x,y,width,height);
				}
				textureContext.restore();
				if (typeof content.material.diffuseTexture.update == "function") {
					content.material.diffuseTexture.update();
				} else {
					window.setTimeout(function() {
						if (typeof content.material.diffuseTexture.update == "function") {
							content.material.diffuseTexture.update();
						}
					},1000);
				}
			}
		}
		pheight = margintop + height + marginbottom;
		pwidth = marginleft + width + marginright;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addHtmlImg=" + ex.message);
	} 
	return {
		minx:minx,
		width:pwidth,
		height:pheight,
		maxwidth:maxwidth,
		maxheight:maxheight,
		linewidth:linewidth
	};
} 

WTWJS.prototype.wrapHtml = function(content, html, scrollpos) {
	var htmlwidth = 0;
	var htmlheight = 0;
	var maxwidth = 0;
	var maxheight = 0;
	try {
		var moldname = "";
		var namepart = [];
		if (content.name.indexOf("-") > -1) {
			namepart = content.name.split('-');
			moldname = namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-"  + namepart[3] + "-"  + namepart[4] + "-"  + namepart[5];
		}
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var lineheight = 30;
			var fontsize = 20;
			var halign = "left";
			var valign = "top";
			var color = "";
			var htmlsegments = [];
			var htmlnest = 0;
			var hrind = 0;
			htmlsegments[0] = WTW.newHTMLSegment();
			htmlsegments[0].tagname = 'root';
			if (scrollpos == undefined) {
				scrollpos = 0;
			}
			var liney = scrollpos;
			html = html.replace(/(?:\r\n|\r|\n)/g," ¶ ");
			html = WTW.decode(html);
			html = "<div>" + html + "</div>";
			htmlpart = html.split('<');
			for (var i=0;i < htmlpart.length;i++) {
				if (htmlpart[i].length > 0) {
					if (htmlpart[i].substr(0,1) == "/") {
						var tag = htmlpart[i].substr(1,htmlpart[i].length - 2);
						if (htmlsegments[htmlnest].style.borderwidth != "0px") {
							WTW.addHtmlBorder(content, htmlsegments[htmlnest].system.x, htmlsegments[htmlnest].system.y, htmlsegments[htmlnest].system.width, htmlsegments[htmlnest].system.height, htmlsegments[htmlnest].style.bordercolor, 'solid', htmlsegments[htmlnest].style.borderwidth, scrollpos);
						}
						htmlnest -= 1;
					} else {
						paragraph = 
						{
							minx:0,
							width:0,
							height:0,
							maxwidth:0,
							maxheight:0,
							linewidth:0
						};
						var tag = htmlpart[i];
						var tagpart = [];
						var words = "";
						var morewords = "";
						if (tag.indexOf(">") > -1) {
							var tagpart = tag.split('>');
							tag = tagpart[0];
							words = tagpart[1];
						} else {
							words = tag;
						}
						var tagname = "";
						var attributes = "";
						if (tag.indexOf(" ") > -1) {
							tagname = tag.substr(0,tag.indexOf(" "));
							attributes = tag.substr(tag.indexOf(" "),tag.length - tag.indexOf(" "));
						} else {
							tagname = tag.substr(0,tag.length);
						}
						while (attributes.indexOf(" = ") > -1 || attributes.indexOf("= ") > -1 || attributes.indexOf(" =") > -1 || attributes.indexOf(" : ") > -1 || attributes.indexOf(": ") > -1 || attributes.indexOf(" :") > -1 || attributes.indexOf(" ; ") > -1 || attributes.indexOf("; ") > -1 || attributes.indexOf(" ;") > -1) {
							attributes = attributes.replace(" = ","=").replace("= ","=").replace(" =","=").replace(" : ",":").replace(": ",":").replace(" :",":").replace(" ; ",";").replace("; ",";").replace(" ;",";").toLowerCase();
						}
						htmlnest += 1;
						if (htmlsegments[htmlnest] == null) {
							htmlsegments[htmlnest] = WTW.newHTMLSegment();
						}
						htmlsegments[htmlnest].tagname = tagname;
						htmlsegments[htmlnest].style.color = htmlsegments[htmlnest-1].style.color;
						htmlsegments[htmlnest].style.float = htmlsegments[htmlnest-1].style.float;
						htmlsegments[htmlnest].style.textalign = htmlsegments[htmlnest-1].style.textalign;
						htmlsegments[htmlnest].style.display = htmlsegments[htmlnest-1].style.display;
						htmlsegments[htmlnest].style.width = htmlsegments[htmlnest-1].style.width;
						htmlsegments[htmlnest].style.height = htmlsegments[htmlnest-1].style.height;
						htmlsegments[htmlnest].style.size = htmlsegments[htmlnest-1].style.size;
						htmlsegments[htmlnest].style.lineheight = htmlsegments[htmlnest-1].style.lineheight;
						htmlsegments[htmlnest].style.fontsize = htmlsegments[htmlnest-1].style.fontsize;
						htmlsegments[htmlnest].style.borderwidth = htmlsegments[htmlnest-1].style.borderwidth;
						htmlsegments[htmlnest].style.bordercolor = htmlsegments[htmlnest-1].style.bordercolor;
						htmlsegments[htmlnest].style.maxwidth = htmlsegments[htmlnest-1].style.maxwidth;
						htmlsegments[htmlnest].style.marginleft = htmlsegments[htmlnest-1].style.marginleft;
						htmlsegments[htmlnest].style.marginright = htmlsegments[htmlnest-1].style.marginright;
						htmlsegments[htmlnest].style.margintop = htmlsegments[htmlnest-1].style.margintop;
						htmlsegments[htmlnest].style.marginbottom = htmlsegments[htmlnest-1].style.marginbottom;
						var attrib = [];
						if (attributes.indexOf(" ") > -1) {
							attrib = attributes.split(' ');
						} else {
							attrib[0] = attributes;
						}
						for (var a=0;a < attrib.length;a++) {
							var attribute = "";
							var properties = "";
							if (attrib[a].indexOf("=") > -1) {
								var attributeparts = attrib[a].split('=');
								attribute = attributeparts[0];
								while (attribute.indexOf('"') > -1 || attribute.indexOf(/'/g) > -1) {
									attribute = attribute.replace(/'/g, '').replace('"','');
								}
								properties = attributeparts[1];
								while (properties.indexOf('"') > -1 || properties.indexOf(/'/g) > -1) {
									properties = properties.replace(/'/g, '').replace('"','');
								}
							} else {
								attribute = attrib[a];
								while (attribute.indexOf('"') > -1 || attribute.indexOf(/'/g) > -1) {
									attribute = attribute.replace(/'/g, '').replace('"','');
								}
							}
							if (attribute.length > 0) {
								if (attribute == "style") {
									var props = [];
									if (properties.indexOf(";") > -1) {
										props = properties.split(';');
									} else {
										props[0] = properties;
									}
									for (var p=0;p < props.length;p++) {
										if (props[p].length > 0) {
											if (props[p].indexOf(":") > -1) {
												var proppart = props[p].split(':');
												var prop = proppart[0];
												while(prop.indexOf("-") > -1) {
													prop = prop.replace("-","");
												}
												var value = proppart[1];
												switch (prop) {
													case "color":
														htmlsegments[htmlnest].style.color = value;
														break;
													case "float":
														htmlsegments[htmlnest].style.float = value;
														break;
													case "textalign":
														htmlsegments[htmlnest].style.textalign = value;
														break;
													case "display":
														htmlsegments[htmlnest].style.display = value;
														break;
													case "width":
														htmlsegments[htmlnest].style.width = value;
														break;
													case "height":
														htmlsegments[htmlnest].style.height = value;
														break;
													case "size":
														htmlsegments[htmlnest].style.size = value;
														break;
													case "lineheight":
														htmlsegments[htmlnest].style.lineheight = value;
														break;
													case "fontsize":
														htmlsegments[htmlnest].style.fontsize = value;
														break;
													case "borderwidth":
														htmlsegments[htmlnest].style.borderwidth = value;
														break;
													case "bordercolor":
														htmlsegments[htmlnest].style.bordercolor = value;
														break;
													case "maxwidth":
														htmlsegments[htmlnest].style.maxwidth = value;
														break;
													case "marginleft":
														htmlsegments[htmlnest].style.marginleft = value;
														break;
													case "marginright":
														htmlsegments[htmlnest].style.marginright = value;
														break;
													case "margintop":
														htmlsegments[htmlnest].style.margintop = value;
														break;
													case "marginbottom":
														htmlsegments[htmlnest].style.marginbottom = value;
														break;
												}
											}
										}
									}
								} else if (attribute == "src") {
									htmlsegments[htmlnest].src = properties;
								}
							}
						}
						var minx = 0;
						var paragraph;
						var lineheight = 30;
						if (htmlsegments[htmlnest].style.lineheight.indexOf("em") > -1 && WTW.isNumeric(htmlsegments[htmlnest].style.lineheight.replace("px","").replace("em","").replace("pt","").replace(" ",""))) {
							lineheight = Number(htmlsegments[htmlnest].style.lineheight.replace("em","").replace(" ","")) * 12;
						} else if (WTW.isNumeric(htmlsegments[htmlnest].style.lineheight.replace("px","").replace("em","").replace("pt","").replace(" ",""))) {
							lineheight = Number(htmlsegments[htmlnest].style.lineheight.replace("px","").replace("pt","").replace(" ",""));
						}
						var fontsize = 20;
						if (htmlsegments[htmlnest].style.fontsize.indexOf("em") > -1 && WTW.isNumeric(htmlsegments[htmlnest].style.fontsize.replace("px","").replace("em","").replace("pt","").replace(" ",""))) {
							fontsize = Number(htmlsegments[htmlnest].style.fontsize.replace("em","").replace(" ","")) * 12;
						} else if (WTW.isNumeric(htmlsegments[htmlnest].style.fontsize.replace("px","").replace("em","").replace("pt","").replace(" ",""))) {
							fontsize = Number(htmlsegments[htmlnest].style.fontsize.replace("px","").replace("pt","").replace(" ",""));
						}
						if (attributes.indexOf("/") > -1) {
							switch (tagname) {
								case "br":
									paragraph = WTW.wrapText(content, " ", htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
									liney += paragraph.height;
									htmlsegments[0].system.indent = 0;
									maxwidth = paragraph.maxwidth;
									maxheight = paragraph.maxheight;
									minx = paragraph.minx;
									break;
								case "hr":
									var hrname = moldname + "-posttexthr" + hrind;
									var hrbox = scene.getMeshByID(hrname);
									if (liney < -10 || liney > 490) {
										if (hrbox != null) {
											hrbox.dispose();
										}
									} else {
										var hry = .95 * ((-liney/512 * mold.scaling.y) + 6.8);
										if (hrbox == null) {
											var hrtexture = "/content/stock/walls/blue.jpg";
											var hrtextureid = "vvpzrv2pae3bbkwv";
											switch (htmlsegments[htmlnest].style.color) {
												case "red":
													hrtexture = "/content/stock/walls/red.jpg";
													hrtextureid = "sjbxon868lcuaub5";
													break;
												case "green":
													hrtexture = "/content/stock/walls/green.jpg";
													hrtextureid = "ngb72qh6hvy3ms5c";
													break;
												case "gray":
													hrtexture = "/content/stock/walls/gray.jpg";
													hrtextureid = "ksa2h7mf909cvech";
													break;
												case "lightgray":
													hrtexture = "/content/stock/walls/lightgray.jpg";
													hrtextureid = "t1qlqxd6pzubzzzy";
													break;
											}
											var basicmold = WTW.newMold();
											basicmold.shape = "box";
											basicmold.position.x = .5;
											basicmold.position.y = hry;
											basicmold.position.z = -.5;
											basicmold.scaling.x = 1;
											basicmold.scaling.y = .15;
											basicmold.scaling.z = mold.scaling.z - 2;
											basicmold.subdivisions = 12;
											basicmold.graphics.texture.id = hrtextureid;
											basicmold.parentname = moldname + "-scale";
											basicmold.checkcollisions = "1";
											var posttexthr = WTW.addMold(hrname, basicmold, basicmold.parentname, basicmold.covering);
										} else {
											hrbox.position.y = hry;
										}
									}
									hrind += 1;
									paragraph = WTW.wrapText(content, " ", htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
									/* paragraph = WTW.addHtmlHR(content, htmlsegments[htmlnest].style.color, htmlsegments[htmlnest].style.textalign, htmlsegments[htmlnest].style.size, htmlsegments[htmlnest].style.width, liney); */
									liney += paragraph.height;
									htmlsegments[0].system.indent = 0;
									maxwidth = paragraph.maxwidth;
									maxheight = paragraph.maxheight;
									minx = paragraph.minx;
									break;
								case "img":
									paragraph = WTW.addHtmlImg(content, htmlsegments[htmlnest].src, htmlsegments[htmlnest].style.textalign, htmlsegments[htmlnest].style.width, htmlsegments[htmlnest].style.height, htmlsegments[htmlnest].style.borderwidth, htmlsegments[htmlnest].style.bordercolor, liney, 0, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].style.margintop, htmlsegments[htmlnest].style.marginbottom);
									htmlsegments[0].system.indent = 0;
									maxwidth = paragraph.maxwidth;
									maxheight = paragraph.maxheight;
									minx = paragraph.minx;
									if (htmlsegments[htmlnest].style.float != "") {
										htmlsegments[htmlnest].system.float = htmlsegments[htmlnest].style.float;
										htmlsegments[htmlnest].system.floatwidth = paragraph.width;
										htmlsegments[htmlnest].system.floatheight = paragraph.height;
									} else {
										liney += paragraph.height;
									}
									break;
								default:
									
									break;
							}
							if (htmlwidth < paragraph.width) {
								htmlwidth = paragraph.width;
							}
							if (words.length > 0) {
								if (htmlsegments[htmlnest].style.display == "inline") {
									liney -= lineheight;
									paragraph = WTW.wrapText(content, words, htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, htmlsegments[0].system.indent, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
									liney += paragraph.height;
								} else {
									if (htmlsegments[htmlnest].system.floatheight > 0) {
										/* liney -= htmlsegments[htmlnest].system.floatheight; */
									}
									paragraph = WTW.wrapText(content, words, htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, 5, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
									liney += paragraph.height;
									htmlsegments[0].system.indent = 0;
								}
								if (htmlwidth < paragraph.width) {
									htmlwidth = paragraph.width;
								}
								maxwidth = paragraph.maxwidth;
								maxheight = paragraph.maxheight;
								minx = paragraph.minx;
								htmlsegments[0].system.indent += paragraph.linewidth + fontsize/2;
								if (htmlsegments[htmlnest].system.floatheight > paragraph.height) {

									liney += (htmlsegments[htmlnest].system.floatheight - paragraph.height);
								}
								htmlsegments[htmlnest].system.float = "";
								htmlsegments[htmlnest].system.floatwidth = 0;
								htmlsegments[htmlnest].system.floatheight = 0;
							}
							htmlnest -= 1;
						} else if (words.length > 0) {
							if (htmlsegments[htmlnest].style.display == "inline") {
								liney -= lineheight;
								paragraph = WTW.wrapText(content, words, htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, htmlsegments[0].system.indent, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
								liney += paragraph.height;
							} else {
								if (htmlsegments[htmlnest].system.floatheight > 0) {
									/* liney -= htmlsegments[htmlnest].system.floatheight; */
								}
								paragraph = WTW.wrapText(content, words, htmlsegments[htmlnest].style.lineheight, htmlsegments[htmlnest].style.fontsize, htmlsegments[htmlnest].style.textalign, "top", htmlsegments[htmlnest].style.color, liney, 5, htmlsegments[htmlnest].style.maxwidth, htmlsegments[htmlnest].style.marginleft, htmlsegments[htmlnest].style.marginright, htmlsegments[htmlnest].system.float, htmlsegments[htmlnest].system.floatwidth, htmlsegments[htmlnest].system.floatheight);
								liney += paragraph.height;
								htmlsegments[0].system.indent = 0;
							}
							if (htmlwidth < paragraph.width) {
								htmlwidth = paragraph.width;
							}
							maxwidth = paragraph.maxwidth;
							maxheight = paragraph.maxheight;
							minx = paragraph.minx;
							htmlsegments[0].system.indent += paragraph.linewidth + fontsize/2;
							if (htmlsegments[htmlnest].system.floatheight > paragraph.height) {

								liney += (htmlsegments[htmlnest].system.floatheight - paragraph.height);
							}
							htmlsegments[htmlnest].system.float = "";
							htmlsegments[htmlnest].system.floatwidth = 0;
							htmlsegments[htmlnest].system.floatheight = 0;
						}
						
						htmlsegments[htmlnest].system.x = minx - fontsize/16;
						htmlsegments[htmlnest].system.y = (liney - paragraph.height) - scrollpos + fontsize/4;
						htmlsegments[htmlnest].system.width = paragraph.width + fontsize/8;
						htmlsegments[htmlnest].system.height = paragraph.height;
						htmlsegments[htmlnest].system.maxwidth = maxwidth;
						htmlsegments[htmlnest].system.maxheight = maxheight;
						htmlheight += paragraph.height;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-wrapHtml=" + ex.message);
	} 
	return {
		width:htmlwidth,
		height:htmlheight,
		maxwidth:maxwidth,
		maxheight:maxheight
	};
} 

WTWJS.prototype.scrollBoxMove = function(moldname, scrollmove) {
	try {
		if (WTW.mouseTimer != null) {
			window.clearInterval(WTW.mouseTimer);
			WTW.mouseTimer = null;
		}
		WTW.scrollBoxRepaint(moldname, scrollmove);
		WTW.mouseTimer = window.setInterval(function () {
			WTW.scrollBoxRepaint(moldname, scrollmove);
		}, 100);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-scrollBoxMove=" + ex.message);
	} 
}

WTWJS.prototype.scrollBoxRepaint = function(moldname, scrollmove) {
	try {
		if (moldname.indexOf("-") > -1) {
			var namepart = moldname.split('-');
			if (namepart.length > 3) {
				var molds = WTW.buildingMolds;
				var moldgroup = "building";
				var moldind = Number(namepart[1]);
				if (namepart[0] == "communitymolds") {
					molds = WTW.communitiesMolds;
					moldgroup = "community";
				}
				if (molds[moldind] != null) {
					var scrollpos = 0;
					if (molds[moldind].position.scroll != undefined) {
						if (WTW.isNumeric(molds[moldind].position.scroll)) {
							scrollpos = Number(molds[moldind].position.scroll);
						}
					}
					scrollpos += scrollmove;
					if (scrollpos > 0) {
						scrollpos = 0;
					}
					var webtext = "";
					moldname = namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-" + namepart[4] + "-" + namepart[5];
					var scrollboxbodytext = scene.getMeshByID(moldname + "-scrollboxbodytext");
					if (scrollboxbodytext != null) {
						scrollboxbodytext.WTW.webtext.scrollpos = scrollpos;
						if (molds[moldind].webtext.webtext != undefined) {
							webtext = molds[moldind].webtext.webtext;
						}
						
						if (scrollboxbodytext.WTW.webtext.webtext != webtext) {
							webtext = scrollboxbodytext.WTW.webtext.webtext;
						}
						if (moldname.indexOf("-blogposting") > -1 && webtext == "") {
							webtext = "<div style=\"color:green;\">Click Here to Post</div>";
						}
						var contentTexture = new BABYLON.DynamicTexture(moldname + "-scrollboxbodytexture", 512, scene, true);
						contentTexture.name = moldname + "-scrollboxbodytexture";
						contentTexture.hasAlpha = true;
						scrollboxbodytext.material.diffuseTexture = contentTexture;
						var paragraph = WTW.wrapHtml(scrollboxbodytext, webtext, scrollpos);
						if (paragraph.height < paragraph.maxheight) {
							scrollpos -= scrollmove;
						}
						molds[moldind].webtext.fullheight = paragraph.height;
						var scrollboxtab = scene.getMeshByID(moldname + "-scrollboxtab");
						if (paragraph.height > paragraph.maxheight) {
							if (scrollboxtab == null) {
								var groovetexture = "/content/stock/walls/lightgray.jpg";
								var buttontexture = "/content/stock/walls/blue.jpg";
								var groovetextureid = "t1qlqxd6pzubzzzy";
								var buttontextureid = "vvpzrv2pae3bbkwv";
								var buttontexturehoverid = "yxs6lcxokr6lhll3";
								var arrowdownid = "hj9oly198c17x086";
								var arrowdownhoverid = "q3bajsb9brye6q3c";
								var arrowupid = "xghzjpxk2lqv9l9k";
								var arrowuphoverid = "jgmqro16rbainojm";
								var lenx = Number(molds[moldind].scaling.x);
								var leny = Number(molds[moldind].scaling.y);
								var lenz = Number(molds[moldind].scaling.z);
								var tabheight = 1;
								if (paragraph.maxheight < paragraph.height) {
									tabheight = (leny - 2) * paragraph.maxheight / paragraph.height;
								}
								if ((leny - 2) * paragraph.maxheight / paragraph.height > (leny - 2)) {
									tabheight = (leny - 2);
								}
								var tabpos = tabpos = (leny - 2) / 2 - tabheight / 2;
								
								var basicmold9 = WTW.newMold();
								basicmold9.shape = "box";
								basicmold9.position.x = 1/4 + .2;
								basicmold9.position.y = tabpos;
								basicmold9.position.z = 15/2 - .75;
								basicmold9.scaling.x = .5;
								basicmold9.scaling.y = tabheight;
								basicmold9.scaling.z = .65;
								basicmold9.subdivisions = 12;
								basicmold9.graphics.texture.id = buttontextureid;
								basicmold9.parentname = moldname + "-scale";
								basicmold9.checkcollisions = "1";
								basicmold9.ispickable = "1";
								scrollboxtab = WTW.addMold(moldname + "-scrollboxtab", basicmold9, basicmold9.parentname, basicmold9.covering);
								WTW.registerMouseOver(scrollboxtab);
								scrollboxtab.WTW = basicmold9;

								var basicmold9b = WTW.newMold();
								basicmold9b.shape = "box";
								basicmold9b.position.x = 0;
								basicmold9b.position.y = 0;
								basicmold9b.position.z = 0;
								basicmold9b.scaling.x = .8;
								basicmold9b.scaling.y = .99;
								basicmold9b.scaling.z = .8;
								basicmold9b.subdivisions = 12;
								basicmold9b.graphics.texture.id = buttontexturehoverid;
								basicmold9b.parentname = moldname + "-scrollboxtab";
								basicmold9b.checkcollisions = "1";
								var scrollboxtabhover = WTW.addMold(moldname + "-scrollboxtabhover", basicmold9b, basicmold9b.parentname, basicmold9b.covering);
								
								var basicmold5 = WTW.newMold();
								basicmold5.shape = "box";
								basicmold5.covering = "directional texture";
								basicmold5.position.x = 1/4 + .2;
								basicmold5.position.y = 15/2 - .6;
								basicmold5.position.z = 15/2 - .75;
								basicmold5.scaling.x = .5;
								basicmold5.scaling.y = .65;
								basicmold5.scaling.z = .65;
								basicmold5.graphics.uscale = 15;
								basicmold5.graphics.vscale = 17;
								basicmold5.subdivisions = 12;
								basicmold5.graphics.texture.id = arrowupid;
								basicmold5.parentname = moldname + "-scale";
								basicmold5.checkcollisions = "1";
								basicmold5.ispickable = "1";
								var scrollboxup = WTW.addMold(moldname + "-scrollboxup", basicmold5, basicmold5.parentname, basicmold5.covering);
								WTW.registerMouseOver(scrollboxup);
								scrollboxup.WTW = basicmold5;

								var basicmold5b = WTW.newMold();
								basicmold5b.shape = "box";
								basicmold5b.covering = "directional texture";
								basicmold5b.position.x = 0;
								basicmold5b.position.y = 0;
								basicmold5b.position.z = 0;
								basicmold5b.scaling.x = .8;
								basicmold5b.scaling.y = .8;
								basicmold5b.scaling.z = .8;
								basicmold5b.graphics.uscale = 13;
								basicmold5b.graphics.vscale = 13;
								basicmold5b.subdivisions = 12;
								basicmold5b.graphics.texture.id = arrowuphoverid;
								basicmold5b.parentname = moldname + "-scrollboxup";
								basicmold5b.checkcollisions = "1";
								var scrollboxuphover = WTW.addMold(moldname + "-scrollboxuphover", basicmold5b, basicmold5b.parentname, basicmold5b.covering);

								var basicmold7 = WTW.newMold();
								basicmold7.shape = "box";
								basicmold7.covering = "directional texture";
								basicmold7.position.x = 1/4 + .2;
								basicmold7.position.y = -15/2 + .6;
								basicmold7.position.z = 15/2 - .75;
								basicmold7.scaling.x = .5;
								basicmold7.scaling.y = .65;
								basicmold7.scaling.z = .65;
								basicmold7.rotation.z = 90;
								basicmold7.rotation.y = 180;
								basicmold7.graphics.uscale = 15;
								basicmold7.graphics.vscale = 17;
								basicmold7.subdivisions = 12;
								basicmold7.graphics.texture.id = arrowdownid;
								basicmold7.parentname = moldname + "-scale";
								basicmold7.checkcollisions = "1";
								basicmold7.ispickable = "1";
								var scrollboxdown = WTW.addMold(moldname + "-scrollboxdown", basicmold7, basicmold7.parentname, basicmold7.covering);
								WTW.registerMouseOver(scrollboxdown);
								scrollboxdown.WTW = basicmold7;

								var basicmold7b = WTW.newMold();
								basicmold7b.shape = "box";
								basicmold7b.covering = "directional texture";
								basicmold7b.position.x = 0;
								basicmold7b.position.y = 0;
								basicmold7b.position.z = 0;
								basicmold7b.scaling.x = .8;
								basicmold7b.scaling.y = .8;
								basicmold7b.scaling.z = .8;
								basicmold7b.graphics.uscale = 13;
								basicmold7b.graphics.vscale = 13;
								basicmold7b.subdivisions = 12;
								basicmold7b.graphics.texture.id = arrowdownhoverid;
								basicmold7b.parentname = moldname + "-scrollboxdown";
								basicmold7b.checkcollisions = "1";
								var scrollboxdownhover = WTW.addMold(moldname + "-scrollboxdownhover", basicmold7b, basicmold7b.parentname, basicmold7b.covering);

								scrollboxtab.position.y = (scrollboxbodytext.parent.scaling.y - 1) / 2 - scrollboxtab.scaling.y / 2 + (scrollpos / (paragraph.height - paragraph.maxheight) * ((scrollboxbodytext.parent.scaling.y - 1) - scrollboxtab.scaling.y));
							} else {
								if (scrollpos < paragraph.maxheight - paragraph.height) {
									scrollpos = paragraph.maxheight - paragraph.height;
								}
								scrollboxtab.position.y = (scrollboxbodytext.parent.scaling.y - 1) / 2 - scrollboxtab.scaling.y / 2 + (scrollpos / (paragraph.height - paragraph.maxheight) * ((scrollboxbodytext.parent.scaling.y - 1) - scrollboxtab.scaling.y));
							}								
						}
						if (molds[moldind].position.scroll != undefined) {
							molds[moldind].position.scroll = scrollpos;
						}
					}
				}
			}
		}
		if (WTW.drive == null && scene.activeCameras[0] != null) {
			scene.activeCameras[0].attachControl(canvas, true); // true allows canvas default event actions
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-scrollBoxRepaint=" + ex.message);
	} 
}

WTWJS.prototype.processKey = function(stext, e) {
    try {
        stext = stext.replace(String.fromCharCode(16), "");
        var found = 0;
        var icursor = 0;
        if (stext.indexOf('|') == -1) {
            stext += "|";
        }
        icursor = stext.indexOf('|');
        switch (e.keyCode) {
            case 8:
                if (stext.length > 1) {
                    if (stext.length > 1 && icursor > 0) {
                        stext = stext.replace("|", "");
                        stext = stext.substr(0, icursor - 1) + "|" + stext.substr(icursor, stext.length - (icursor));
                    }
                }
                found = 1;
                break;
            case 9: // tab
                stext = stext.replace("|", "     |");
                found = 1;
                break;
            case 13:
                stext = stext.replace("|", String.fromCharCode(182).toLowerCase() + " |");
                found = 1;
                break;
            case 27: // esc
                found = 1;
                break;
            case 32:
                stext = stext.replace("|", " |");
                found = 1;
                break;
            case 35: // end
                stext = stext.replace("|", "");
                found = 1;
                break;
            case 36: // home
                stext = "|" + stext.replace("|", "");
                found = 1;
                break;
            case 37: // left
                if (stext.length > 1 && icursor > 0) {
                    stext = stext.replace("|", "");
                    stext = stext.substr(0, icursor - 1) + "|" + stext.substr(icursor - 1, stext.length - (icursor - 1));
                }
                found = 1;
                break;
            case 38: // up
                found = 1;
                break;
            case 39: // right
                stext = stext.replace("|", "");
                stext = stext.substr(0, icursor + 1) + "|" + stext.substr(icursor + 1, stext.length - (icursor + 1));
                found = 1;
                break;
            case 40: // down
                found = 1;
                break;
            case 45: // insert
                found = 1;
                break;
            case 46: // delete
                if (stext.length > icursor + 1) {
                    stext = stext.replace("|", "");
                    stext = stext.substr(0, icursor) + "|" + stext.substr(icursor + 1, stext.length - (icursor + 1));
                }
                found = 1;
                break;
        }
        if (found == 0) {
            if (e.shiftKey) {
                switch (e.keyCode) {
                    case 48:
                        stext = stext.replace("|", ")|");
                        break;
                    case 49:
                        stext = stext.replace("|", "!|");
                        break;
                    case 50:
                        stext = stext.replace("|", "@|");
                        break;
                    case 51:
                        stext = stext.replace("|", "#|");
                        break;
                    case 52:
                        stext = stext.replace("|", "$|");
                        break;
                    case 53:
                        stext = stext.replace("|", "%|");
                        break;
                    case 54:
                        stext = stext.replace("|", "^|");
                        break;
                    case 55:
                        stext = stext.replace("|", "&|");
                        break;
                    case 56:
                        stext = stext.replace("|", "*|");
                        break;
                    case 57:
                        stext = stext.replace("|", "(|");
                        break;
                    case 186:
                        stext = stext.replace("|", ":|");
                        break;
                    case 187:
                        stext = stext.replace("|", "+|");
                        break;
                    case 188:
                        stext = stext.replace("|", "<|");
                        break;
                    case 189:
                        stext = stext.replace("|", "_|");
                        break;
                    case 190:
                        stext = stext.replace("|", ">|");
                        break;
                    case 191:
                        stext = stext.replace("|", "?|");
                        break;
                    case 192:
                        stext = stext.replace("|", "~|");
                        break;
                    case 219:
                        stext = stext.replace("|", "{|");
                        break;
                    case 220: //  |
                        break;
                    case 221:
                        stext = stext.replace("|", "}|");
                        break;
                    case 222:
                        stext = stext.replace("|", "\"|");
                        break;
                    default:
                        stext = stext.replace("|", String.fromCharCode(e.keyCode).toUpperCase() + "|");
                        break;
                }
            } else {
                switch (e.keyCode) {
                    case 96:
                        stext = stext.replace("|", "0|");
                        break;
                    case 97:
                        stext = stext.replace("|", "1|");
                        break;
                    case 98:
                        stext = stext.replace("|", "2|");
                        break;
                    case 99:
                        stext = stext.replace("|", "3|");
                        break;
                    case 100:
                        stext = stext.replace("|", "4|");
                        break;
                    case 101:
                        stext = stext.replace("|", "5|");
                        break;
                    case 102:
                        stext = stext.replace("|", "6|");
                        break;
                    case 103:
                        stext = stext.replace("|", "7|");
                        break;
                    case 104:
                        stext = stext.replace("|", "8|");
                        break;
                    case 105:
                        stext = stext.replace("|", "9|");
                        break;
                    case 106:
                        stext = stext.replace("|", "*|");
                        break;
                    case 107:
                        stext = stext.replace("|", "+|");
                        break;
                    case 109:
                        stext = stext.replace("|", "-|");
                        break;
                    case 110:
                        stext = stext.replace("|", ".|");
                        break;
                    case 111:
                        stext = stext.replace("|", "/|");
                        break;
                    case 186:
                        stext = stext.replace("|", ";|");
                        break;
                    case 187:
                        stext = stext.replace("|", "=|");
                        break;
                    case 188:
                        stext = stext.replace("|", ",|");
                        break;
                    case 189:
                        stext = stext.replace("|", "-|");
                        break;
                    case 190:
                        stext = stext.replace("|", ".|");
                        break;
                    case 191:
                        stext = stext.replace("|", "/|");
                        break;
                    case 192:
                        stext = stext.replace("|", "`|");
                        break;
                    case 219:
                        stext = stext.replace("|", "[|");
                        break;
                    case 220:
                        stext = stext.replace("|", "\\|");
                        break;
                    case 221:
                        stext = stext.replace("|", "]|");
                        break;
                    case 222:
                        stext = stext.replace("|", "'|");
                        break;
                    default:
                        stext = stext.replace("|", String.fromCharCode(e.keyCode).toLowerCase() + "|");
                        break;
                }
            }
        }
        if (stext.indexOf('|') == -1) {
            stext += "|";
        }
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-processKey=" + ex.message);
	} 
    return stext;
}

WTWJS.prototype.checkKey = function(textinput, validtype, allowblank, complete) {
	try {
		e = window.event;
		var stext = textinput.value;
		var caretstart = textinput.length - 1;
		var caretend = textinput.length - 1;
		if (WTW.getBrowser() != "safari") {
			caretstart = textinput.selectionStart;
			caretend = textinput.selectionEnd;
		}
		var snewtext = "";
		var possible = "";
		switch (validtype) {
			case "username":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz-_.";
				break;
			case "number":
				possible = "1234567890.-";
				break;
			case "phonenumber":
				possible = "1234567890";
				break;
			case "text":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_-+={[}]\\:;\"'<,>.?/ ";
				break;
			case "password":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_-+={[}]:;<,>.? ";
				break;
			case "email":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz@.!#$%&'*+-/=?^_`{|}~";
				break;
			case "webname":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz-_.";
				break;
			case "displayname":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz-_. ',";
				break;
			case "web":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_-+={[}]\\:;\"'<,>.?/ ";
				break;
			case "usernameoremail":
				possible = "1234567890abcdefghijklmnopqrstuvwxyz@.!#$%&'*+-/=?^_`{|}~";
				break;
			case "displaynameoremail":
				possible = "1234567890 abcdefghijklmnopqrstuvwxyz@.!#$%&'*+-/=?^_`{|}~";
				break;
		}
		if (stext.length > 0 && possible != "") {
			for (var i = 0, len = stext.length; i < len; i++) {
				if (possible.indexOf(stext[i].toLowerCase()) > -1) {
					snewtext += stext[i];
				} else {
					caretstart -= 1;
					caretend -= 1;
				}
			}
		}
		if (e != undefined) {
			switch (e.keyCode) {
				case 8: // backspace?
					//caretstart -= 1;
					//caretend -= 1;
					break;
				case 9: // tab
					break;
				case 13: //String.fromCharCode(182).toLowerCase()
					break;
				case 27: // esc
					break;
				case 32: // space
					break;
				case 35: // end
					break;
				case 36: // home
					break;
				case 37: // left
					break;
				case 38: // up
					break;
				case 39: // right
					break;
				case 40: // down
					break;
				case 45: // insert
					break;
				case 46: // delete
					break;
			}
		}
		textinput.style.backgroundColor = "#ffffff";
		textinput.style.color = "#000000";
		switch (validtype) {
			case "username":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("--") > -1) {
						snewtext = snewtext.replace("--","-");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "-") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("__") > -1) {
						snewtext = snewtext.replace("__","_");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "_") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "-") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "_") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
				}
				break;
			case "number":
				if (snewtext.indexOf(".") > -1) {
					var parts = snewtext.split('.');
					if (parts.length > 1) {
						snewtext = parts[0] + "." + parts[1];
						for (i = 2;i < parts.length;i++) {
							snewtext += parts[i];
						}
					}
				}
				if (snewtext.indexOf("-") > -1) {
					var parts = snewtext.split('-');
					if (parts.length > 1) {
						if (parts[0].length == 0) {
							snewtext = "-" + parts[1];
							for (i = 2;i < parts.length;i++) {
								snewtext += parts[i];
							}
						} else {
							snewtext = parts[0];
							for (i = 1;i < parts.length;i++) {
								snewtext += parts[i];
							}
						}
					}
				}
				break;
			case "phonenumber":
				var leading = "";
				if (snewtext.length > 0) {
					if (snewtext.substr(0,1) == "1") {
						leading = "1 ";
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart += 2;
						caretend += 2;
					}
				}
				if (snewtext.length > 10) {
					snewtext = "(" + snewtext.substr(0,3) + ") " + snewtext.substr(3,3) + "-" + snewtext.substr(6,4) + " " + snewtext.substr(10,snewtext.length - 10);
					caretstart += 5;
					caretend += 5;
				} else if (snewtext.length > 6) {
					snewtext = "(" + snewtext.substr(0,3) + ") " + snewtext.substr(3,3) + "-" + snewtext.substr(6,snewtext.length - 6);
					caretstart += 4;
					caretend += 4;
				} else if (snewtext.length > 3) {
					snewtext = "(" + snewtext.substr(0,3) + ") " + snewtext.substr(3,snewtext.length - 3);
					caretstart += 3;
					caretend += 3;
				} else if (snewtext.length > 0) {
					snewtext = "(" + snewtext;
					caretstart += 1;
					caretend += 1;
				}
				if (snewtext.length > 0) {
					snewtext = leading + snewtext;
				} else {
					snewtext = leading.replace(" ","");
				}
				break;
			case "text":
				break;
			case "password":
				break;
			case "email":
				var serverpossible = "abcdefghijklmnopqrstuvwxyz0123456789-.";
				if (snewtext.indexOf("@") > -1) {
					var parts = snewtext.split('@');
					if (parts.length > 1) {
						snewtext = parts[0] + "@" + parts[1];
						for (i = 2;i < parts.length;i++) {
							snewtext += parts[i];
						}
					}
					parts = snewtext.split('@');
					snewtext = parts[0] + "@";
					stext = parts[1];
					if (stext.length > 0 && possible != "") {
						for (var i = 0, len = stext.length; i < len; i++) {
							if (possible.indexOf(stext[i].toLowerCase()) > -1) {
								snewtext += stext[i];
							}
						}
					}
				}
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (WTW.isEmail(snewtext) == false && snewtext.length > 0) {
						textinput.style.backgroundColor = "#ff0000";
						textinput.style.color = "#ffffff";
					}
				}
				break;
			case "webname":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("--") > -1) {
						snewtext = snewtext.replace("--","-");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "-") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("__") > -1) {
						snewtext = snewtext.replace("__","_");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "_") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "-") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "_") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
				}
				break;
			case "displayname":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("''") > -1) {
						snewtext = snewtext.replace("''","'");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "'") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("  ") > -1) {
						snewtext = snewtext.replace("  "," ");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == " ") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf(",,") > -1) {
						snewtext = snewtext.replace(",,",",");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ",") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("--") > -1) {
						snewtext = snewtext.replace("--","-");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "-") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("__") > -1) {
						snewtext = snewtext.replace("__","_");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "_") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "-") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "_") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == " ") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ",") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == "'") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
				}
				break;
			case "web":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (WTW.isURL(snewtext) == false && snewtext.length > 0) {
						textinput.style.backgroundColor = "#ff0000";
						textinput.style.color = "#ffffff";
					}
				}
				break;
			case "usernameoremail":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("@@") > -1) {
						snewtext = snewtext.replace("@@","@");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "@") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				var serverpossible = "abcdefghijklmnopqrstuvwxyz0123456789-.";
				if (snewtext.indexOf("@") > -1) {
					var parts = snewtext.split('@');
					if (parts.length > 1) {
						snewtext = parts[0] + "@" + parts[1];
						for (i = 2;i < parts.length;i++) {
							snewtext += parts[i];
						}
					}
					parts = snewtext.split('@');
					snewtext = parts[0] + "@";
					stext = parts[1];
					if (stext.length > 0 && possible != "") {
						for (var i = 0, len = stext.length; i < len; i++) {
							if (possible.indexOf(stext[i].toLowerCase()) > -1) {
								snewtext += stext[i];
							}
						}
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (WTW.isEmail(snewtext) == false) {
						if (snewtext.length > 0) {
							while (snewtext.indexOf("..") > -1) {
								snewtext = snewtext.replace("..",".");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == ".") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
							while (snewtext.indexOf("--") > -1) {
								snewtext = snewtext.replace("--","-");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == "-") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
							while (snewtext.indexOf("__") > -1) {
								snewtext = snewtext.replace("__","_");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == "_") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
						}
						while (snewtext.indexOf("!") > -1) {
							snewtext = snewtext.replace("!","");
						}
						while (snewtext.indexOf("#") > -1) {
							snewtext = snewtext.replace("#","");
						}
						while (snewtext.indexOf("$") > -1) {
							snewtext = snewtext.replace("$","");
						}
						while (snewtext.indexOf("%") > -1) {
							snewtext = snewtext.replace("%","");
						}
						while (snewtext.indexOf("&") > -1) {
							snewtext = snewtext.replace("&","");
						}
						while (snewtext.indexOf("'") > -1) {
							snewtext = snewtext.replace("'","");
						}
						while (snewtext.indexOf("*") > -1) {
							snewtext = snewtext.replace("*","");
						}
						while (snewtext.indexOf("+") > -1) {
							snewtext = snewtext.replace("+","");
						}
						while (snewtext.indexOf("/") > -1) {
							snewtext = snewtext.replace("/","");
						}
						while (snewtext.indexOf("=") > -1) {
							snewtext = snewtext.replace("=","");
						}
						while (snewtext.indexOf("?") > -1) {
							snewtext = snewtext.replace("?","");
						}
						while (snewtext.indexOf("^") > -1) {
							snewtext = snewtext.replace("^","");
						}
						while (snewtext.indexOf("`") > -1) {
							snewtext = snewtext.replace("`","");
						}
						while (snewtext.indexOf("{") > -1) {
							snewtext = snewtext.replace("{","");
						}
						while (snewtext.indexOf("}") > -1) {
							snewtext = snewtext.replace("}","");
						}
						while (snewtext.indexOf("|") > -1) {
							snewtext = snewtext.replace("|","");
						}
						while (snewtext.indexOf("~") > -1) {
							snewtext = snewtext.replace("~","");
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == ".") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == "-") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == "_") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
					}
				}
				break;
			case "displaynameoremail":
				if (snewtext.length > 0) {
					while (snewtext.indexOf("..") > -1) {
						snewtext = snewtext.replace("..",".");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == ".") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
					while (snewtext.indexOf("@@") > -1) {
						snewtext = snewtext.replace("@@","@");
						caretstart -= 1;
						caretend -= 1;
					}
					if (snewtext.substr(0,1) == "@") {
						snewtext = snewtext.substr(1,snewtext.length - 1);
						caretstart -= 1;
						caretend -= 1;
					}
				}
				var serverpossible = "abcdefghijklmnopqrstuvwxyz0123456789-.";
				if (snewtext.indexOf("@") > -1) {
					var parts = snewtext.split('@');
					if (parts.length > 1) {
						snewtext = parts[0] + "@" + parts[1];
						for (i = 2;i < parts.length;i++) {
							snewtext += parts[i];
						}
					}
					parts = snewtext.split('@');
					snewtext = parts[0] + "@";
					stext = parts[1];
					if (stext.length > 0 && possible != "") {
						for (var i = 0, len = stext.length; i < len; i++) {
							if (possible.indexOf(stext[i].toLowerCase()) > -1) {
								snewtext += stext[i];
							}
						}
					}
				}
				if (complete == 1) {
					if (snewtext.length > 0) {
						if (snewtext.substr(snewtext.length - 1,1) == ".") {
							snewtext = snewtext.substr(0,snewtext.length - 1)
						}
					}
					if (WTW.isEmail(snewtext) == false) {
						if (snewtext.length > 0) {
							while (snewtext.indexOf("..") > -1) {
								snewtext = snewtext.replace("..",".");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == ".") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
							while (snewtext.indexOf("--") > -1) {
								snewtext = snewtext.replace("--","-");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == "-") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
							while (snewtext.indexOf("__") > -1) {
								snewtext = snewtext.replace("__","_");
								caretstart -= 1;
								caretend -= 1;
							}
							if (snewtext.substr(0,1) == "_") {
								snewtext = snewtext.substr(1,snewtext.length - 1);
								caretstart -= 1;
								caretend -= 1;
							}
						}
						while (snewtext.indexOf("!") > -1) {
							snewtext = snewtext.replace("!","");
						}
						while (snewtext.indexOf("#") > -1) {
							snewtext = snewtext.replace("#","");
						}
						while (snewtext.indexOf("$") > -1) {
							snewtext = snewtext.replace("$","");
						}
						while (snewtext.indexOf("%") > -1) {
							snewtext = snewtext.replace("%","");
						}
						while (snewtext.indexOf("&") > -1) {
							snewtext = snewtext.replace("&","");
						}
						while (snewtext.indexOf("'") > -1) {
							snewtext = snewtext.replace("'","");
						}
						while (snewtext.indexOf("*") > -1) {
							snewtext = snewtext.replace("*","");
						}
						while (snewtext.indexOf("+") > -1) {
							snewtext = snewtext.replace("+","");
						}
						while (snewtext.indexOf("/") > -1) {
							snewtext = snewtext.replace("/","");
						}
						while (snewtext.indexOf("=") > -1) {
							snewtext = snewtext.replace("=","");
						}
						while (snewtext.indexOf("?") > -1) {
							snewtext = snewtext.replace("?","");
						}
						while (snewtext.indexOf("^") > -1) {
							snewtext = snewtext.replace("^","");
						}
						while (snewtext.indexOf("`") > -1) {
							snewtext = snewtext.replace("`","");
						}
						while (snewtext.indexOf("{") > -1) {
							snewtext = snewtext.replace("{","");
						}
						while (snewtext.indexOf("}") > -1) {
							snewtext = snewtext.replace("}","");
						}
						while (snewtext.indexOf("|") > -1) {
							snewtext = snewtext.replace("|","");
						}
						while (snewtext.indexOf("~") > -1) {
							snewtext = snewtext.replace("~","");
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == ".") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == "-") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
						if (snewtext.length > 0) {
							if (snewtext.substr(snewtext.length - 1,1) == "_") {
								snewtext = snewtext.substr(0,snewtext.length - 1)
							}
						}
					}
				}
				break;
		}
		if (complete == 1 && snewtext.length == 0 && allowblank == 0) {
			textinput.style.backgroundColor = "#ff0000";
			textinput.style.color = "#ffffff";
		}
		textinput.value = snewtext;
		if (WTW.getBrowser() != "safari") {
			textinput.selectionStart = caretstart;
			textinput.selectionEnd = caretend;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-WTW.checkKey=" + ex.message);
	} 
}

WTWJS.prototype.snapshot3D = function(zfilepath, zfilename) {
	try {
		dGet('wtw_bupdatesnapshot').onclick = "";
		dGet('wtw_bupdatesnapshot').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotthing').onclick = "";
		dGet('wtw_bsnapshotthing').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotbuilding').onclick = "";
		dGet('wtw_bsnapshotbuilding').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotcommunity').onclick = "";
		dGet('wtw_bsnapshotcommunity').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_tfilename').value = zfilename;
		dGet('wtw_tfilepath').value = zfilepath;
		WTW.context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
		scene.render();
		var myimage = canvas.toDataURL("image/png");
		WTW.context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: false});
		var request = {
			'filename':dGet('wtw_tfilename').value,
			'filepath':dGet('wtw_tfilepath').value,
			'myimage':myimage
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tfile1').value = request.filename;
			ipage.getElementById('wtw_tfilepath1').value = request.filepath;
			ipage.getElementById('wtw_tfiledata1').value = request.myimage;
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_bsaveimagefilepng').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-snapshot3D=" + ex.message);
	} 
}

WTWJS.prototype.updateSnapshot3D = function(zthingid, zbuildingid, zcommunityid, zsnapshotid, zsnapshotpath, zfiledata) {
	try {
		if (WTW.adminView == 1) {
			if (zthingid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultthingsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultthingsnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultthingsnapshot');
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										WTW.things[i].thinginfo.snapshotid = zsnapshotid;
										WTW.things[i].thinginfo.snapshotpath = zsnapshotpath;
										WTW.things[i].thinginfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
			if (zbuildingid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultbuildingsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultbuildingsnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultbuildingsnapshot');
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (zbuildingid == WTW.buildings[i].buildinginfo.buildingid) {
										WTW.buildings[i].buildinginfo.snapshotid = zsnapshotid;
										WTW.buildings[i].buildinginfo.snapshotpath = zsnapshotpath;
										WTW.buildings[i].buildinginfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
			if (zcommunityid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultcommunitysnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultcommunitysnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultcommunitysnapshot');
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (WTW.communities[i].communityinfo.communityid != null) {
									if (zcommunityid == WTW.communities[i].communityinfo.communityid) {
										WTW.communities[i].communityinfo.snapshotid = zsnapshotid;
										WTW.communities[i].communityinfo.snapshotpath = zsnapshotpath;
										WTW.communities[i].communityinfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
		}
		if (zsnapshotpath != "") {
			dGet('wtw_defaultsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
		} else {
			dGet('wtw_defaultsnapshot').src = zfiledata;
		}
		dGet('wtw_defaultsnapshot').style.display = "block";
		dGet('wtw_defaultsnapshot').style.visibility = "visible";
		dGet('wtw_bupdatesnapshot').onclick = function(){
			if (WTW.adminView == 1) {
				WTW.adminMenuItemSelected(this);
			}
		};
		dGet('wtw_bupdatesnapshot').innerHTML = "Set Default Snapshot";

		dGet('wtw_bsnapshotthing').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\things\\' + dGet('wtw_tthingid').value + '\\snapshots\\', 'defaultthing.png');
		};
		dGet('wtw_bsnapshotthing').innerHTML = "Set Default Snapshot";
		dGet('wtw_bsnapshotbuilding').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\buildings\\' + dGet('wtw_tbuildingid').value + '\\snapshots\\', 'defaultbuilding.png');
		};
		dGet('wtw_bsnapshotbuilding').innerHTML = "Set Default Snapshot";
		dGet('wtw_bsnapshotcommunity').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\communities\\' + dGet('wtw_tcommunityid').value + '\\snapshots\\', 'defaultcommunity.png');
		};
		dGet('wtw_bsnapshotcommunity').innerHTML = "Set Default Snapshot";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-updateSnapshot3D=" + ex.message);
	} 
}

WTWJS.prototype.show = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'block';
			dGet(item).style.visibility = 'visible';
			if (item.indexOf("wtw_adminmenu") > -1 && WTW.adminView == 1) {
				var menu = item.replace("wtw_adminmenu","");
				if (WTW.isNumeric(menu)) {
					WTW.adminMenu = Number(menu);
				}
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-show=" + ex.message);
	}
}

WTWJS.prototype.showInline = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'inline-block';
			dGet(item).style.visibility = 'visible';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-showInline=" + ex.message);
	}
}

WTWJS.prototype.hide = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'none';
			dGet(item).style.visibility = 'hidden';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-hide=" + ex.message);
	}
}

WTWJS.prototype.toggle = function(item) {
	try {
		if (dGet(item) != null) {
			if (dGet(item).style.visibility == 'visible') {
				WTW.hide(item);
			} else {
				WTW.show(item);
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-toggle=" + ex.message);
	}
}

WTWJS.prototype.showSettingsMenu = function(menuitem) {
	try {
		WTW.show(menuitem);

		if (dGet(menuitem + 'scroll') != null) {
			dGet(menuitem + 'scroll').style.height = 'auto';
			if (dGet(menuitem + 'scroll').clientHeight < (WTW.sizeY - 95)) {
				dGet(menuitem + 'scroll').style.height = dGet(menuitem + 'scroll').scrollHeight + "px";
			}
			if (menuitem == 'wtw_menuavatar') {
				if (dGet(menuitem + 'scroll').clientHeight > (WTW.sizeY - 355)) {
					dGet(menuitem + 'scroll').style.height = (WTW.sizeY - 355) + "px";
				}
			} else {
				if (dGet(menuitem + 'scroll').clientHeight > (WTW.sizeY - 95)) {
					dGet(menuitem + 'scroll').style.height = (WTW.sizeY - 95) + "px";
				}
			}
		} 
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-showSettingsMenu=" + ex.message);
	}
}

WTWJS.prototype.getSunIntensity = function (inclination, azimuth) {
	var intensity = .3;
	try {
		if (inclination < .3 && inclination > -.3 && azimuth > .2) {
			intensity = 0.8;
		} else if ((inclination >= .3 || inclination <= -.3) && azimuth > .2) {
			intensity = 0.5;
		} else if (azimuth < .2) {
			intensity = 0.3;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getSunIntensity=" + ex.message);
	}
	return intensity;
}

WTWJS.prototype.loadSkyScene = function (inclination, luminance, azimuth, rayleigh, turbidity, miedirectionalg, miecoefficient, speedratio) {
	try {
/*		var sunspot = BABYLON.MeshBuilder.CreateSphere("sunspot", {segments: 12, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		sunspot.position = new BABYLON.Vector3(0, WTW.sunPositionY + 2, 0);
		scene.stopAnimation(WTW.sky);
*/		
		var framescount = 100;
		var intensity = WTW.getSunIntensity(inclination, azimuth);
		if (inclination < .3 && inclination > -.3 && azimuth > .2) {
			WTW.sun.position = new BABYLON.Vector3(0, WTW.sunPositionY, 0);
		} else if ((inclination >= .3 || inclination <= -.3) && azimuth > .2) {
		} else if (azimuth < .2) {
		}
		
		var conditionsun = new BABYLON.PredicateCondition(scene.actionManager, function () {
			var test = false;
			if (WTW.sun.intensity != intensity) {
				test = true;
			}
			return test;
		});
		var animationsun = BABYLON.PlayAnimationAction(BABYLON.ActionManager.OnEveryFrameTrigger, WTW.sun.intensity, WTW.sun.intensity, intensity, false, conditionsun);

		var animationinclination = new BABYLON.Animation("animationinclination", "material.inclination", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.inclination },
			{ frame: framescount, value: inclination }
        ];
		animationinclination.setKeys(inclinationkeys);
		WTW.sky.animations.push(animationinclination);
		
		var animationluminance = new BABYLON.Animation("animationluminance", "material.luminance", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.luminance },
			{ frame: framescount, value: luminance }
        ];
		animationluminance.setKeys(inclinationkeys);
		animationluminance.enableBlending = true;
		animationluminance.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationluminance);

		var animationazimuth = new BABYLON.Animation("animationazimuth", "material.azimuth", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.azimuth },
			{ frame: framescount, value: azimuth }
        ];
		animationazimuth.setKeys(inclinationkeys);
		animationazimuth.enableBlending = true;
		animationazimuth.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationazimuth);
		
		var animationrayleigh = new BABYLON.Animation("animationrayleigh", "material.rayleigh", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.rayleigh },
			{ frame: framescount, value: rayleigh }
        ];
		animationrayleigh.setKeys(inclinationkeys);
		animationrayleigh.enableBlending = true;
		animationrayleigh.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationrayleigh);

		var animationturbidity = new BABYLON.Animation("animationturbidity", "material.turbidity", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.turbidity },
			{ frame: framescount, value: turbidity }
        ];
		animationturbidity.setKeys(inclinationkeys);
		animationturbidity.enableBlending = true;
		animationturbidity.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationturbidity);

		var animationmieDirectionalG = new BABYLON.Animation("animationmieDirectionalG", "material.mieDirectionalG", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.mieDirectionalG },
			{ frame: framescount, value: miedirectionalg }
        ];
		animationmieDirectionalG.setKeys(inclinationkeys);
		animationmieDirectionalG.enableBlending = true;
		animationmieDirectionalG.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationmieDirectionalG);

		var animationmieCoefficient = new BABYLON.Animation("animationmieCoefficient", "material.mieCoefficient", framescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var inclinationkeys = [
            { frame: 0, value: WTW.sky.material.mieCoefficient },
			{ frame: framescount, value: miecoefficient }
        ];
		animationmieCoefficient.setKeys(inclinationkeys);
		animationmieCoefficient.enableBlending = true;
		animationmieCoefficient.blendingSpeed = 0.01;
		WTW.sky.animations.push(animationmieCoefficient);

		var movesky = scene.beginAnimation(WTW.sky, 0, framescount, true);
		movesky.speedRatio = speedratio;
		
		if (WTW.adminView == 1) {
			dGet('wtw_tskyinclination').value = Number(inclination) + .6;
			dGet('wtw_skyinclination').innerHTML = inclination;
			dGet('wtw_tskyluminance').value = luminance;
			dGet('wtw_skyluminance').innerHTML = luminance;
			dGet('wtw_tskyazimuth').value = azimuth;
			dGet('wtw_skyazimuth').innerHTML = azimuth;
			dGet('wtw_tskyrayleigh').value = rayleigh;
			dGet('wtw_skyrayleigh').innerHTML = rayleigh;
			dGet('wtw_tskyturbidity').value = turbidity;
			dGet('wtw_skyturbidity').innerHTML = turbidity;
			dGet('wtw_tskymiedirectionalg').value = miedirectionalg;
			dGet('wtw_skymiedirectionalg').innerHTML = miedirectionalg;
			dGet('wtw_tskymiecoefficient').value = miecoefficient;
			dGet('wtw_skymiecoefficient').innerHTML = miecoefficient;
		}
		WTW.init.skyInclination = inclination;
		WTW.init.skyLuminance = luminance;
		WTW.init.skyAzimuth = azimuth;
		WTW.init.skyRayleigh = rayleigh;
		WTW.init.skyTurbidity = turbidity;
		WTW.init.skyMieDirectionalG = miedirectionalg;
		WTW.init.skyMieCoefficient = miecoefficient;
		WTW.sun.intensity = intensity;
		if (WTW.extraGround.material != undefined) {
			WTW.extraGround.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loadSkyScene=" + ex.message);
	}  
}

WTWJS.prototype.initMirrorLoadZone = function(moldname, molddef) {
	try {
/*		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var namepart;
			if (moldname.indexOf("-") > -1) {
				namepart = moldname.split('-');
				var moldgroup = namepart[0];
				var moldind = Number(namepart[1]);
				var molds = null;
				switch (moldgroup) {
					case "thingmolds":
						molds = WTW.thingMolds;
						break;
					case "buildingmolds":
						molds = WTW.buildingMolds;
						break;
					case "communitymolds":
						molds = WTW.communitiesMolds;
						break;
				}
				if (molds != null) {
					if (molds[moldind] != null) {
						if (molds[moldind].mirroractionzoneid == "") {
							var actionzoneid = WTW.getRandomString(16);
							molds[moldind].mirroractionzoneid = actionzoneid;
							var actionzoneind = WTW.getNextCount(WTW.actionZones);
							WTW.actionZones[actionzoneind] = WTW.newActionZone();
							WTW.actionZones[actionzoneind].actionzoneid = actionzoneid;
							WTW.actionZones[actionzoneind].actionzonetype = "mirror";
							WTW.actionZones[actionzoneind].actionzoneshape = "box";
							WTW.actionZones[actionzoneind].status = 0;
							WTW.actionZones[actionzoneind].shown = "0";
							WTW.actionZones[actionzoneind].parentname = moldname;
							if (communityid != "") {
								var zbuildingid = "";
								if (communityid != "" && moldgroup == "buildingmolds" && molds[moldind].buildinginfo.buildingid != undefined) {
									zbuildingid = molds[moldind].buildinginfo.buildingid;
								}
								WTW.actionZones[actionzoneind].communityinfo.communityid = communityid;
								WTW.actionZones[actionzoneind].buildinginfo.buildingid = zbuildingid;
							} else if (buildingid != "") {
								WTW.actionZones[actionzoneind].buildinginfo.buildingid = buildingid;
							} else if (thingid != "") {
								WTW.actionZones[actionzoneind].thinginfo.thingid = thingid;
							}
							var scalingx = mold.scaling.x * 2;
							var scalingy = mold.scaling.y * 2;
							var scalingz = mold.scaling.z * 2;
							if (scalingx < 60) {
								scalingx = 60;
							}
							if (scalingy < 60) {
								scalingy = 60;
							}
							if (scalingz < 60) {
								scalingz = 60;
							}
							WTW.actionZones[actionzoneind].scaling.x = scalingx;
							WTW.actionZones[actionzoneind].scaling.y = scalingy;
							WTW.actionZones[actionzoneind].scaling.z = scalingz;
							WTW.setShownMolds();
						}
					}
				}
			}
		}*/
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-initMirrorLoadZone=" + ex.message);
	}
}

WTWJS.prototype.checkMirrorReflectionList = function(actionzoneind) {
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			if (WTW.actionZones[actionzoneind].actionzonetype == "mirror") {
				var actionzone = scene.getMeshByID("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				if (actionzone != null) {
					var mold = actionzone.parent;
					if (mold != null) {
						if (mold.material.reflectionTexture != null) {
							var reflectionlist = []
							if (mold.material.reflectionTexture.renderList != undefined) {
								reflectionlist = mold.material.reflectionTexture.renderList;
								WTW.addMirrorReflectionList(WTW.sky, reflectionlist);
								WTW.addMirrorReflectionList(WTW.extraGround, reflectionlist);
							}
							if (WTW.water != null) {
								WTW.addMirrorReflectionList(WTW.water, reflectionlist);
							}
							if (scene.meshes != null) {
								for (var i=0;i < scene.meshes.length;i++) {
									var moldname = scene.meshes[i].name;
									if (moldname.indexOf("myavatar") > -1 || moldname.indexOf("thingmolds") > -1 || moldname.indexOf("buildingmolds") > -1 || moldname.indexOf("communitymolds") > -1) {
										
										WTW.addMirrorReflectionList(scene.meshes[i], reflectionlist);
										
									}
								}
							}
						}
					}
				}
				window.setTimeout(function(){WTW.actionZones[actionzoneind].status = 0;},1000);
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-checkMirrorReflectionList=" + ex.message);
	}
}

WTWJS.prototype.addMirrorReflectionList = function(mold, reflectionlist) {
	try {
		var found = false;
		for (var i=0;i < reflectionlist.length;i++) {
			if (reflectionlist[i].name == mold.name) {
				found = true;
			}
		}
		if (found == false) {
			reflectionlist.push(mold);
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-addMirrorReflectionList=" + ex.message);
	}
}

WTWJS.prototype.addLoadZoneToQueue = function(actionzoneind) {
	try {
		var loadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[loadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[loadmoldqueind].actionzoneind = actionzoneind;
		WTW.loadMoldQueue[loadmoldqueind].queprocess = "loadextreme";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addLoadZoneToQueue=" + ex.message);
	}
}

WTWJS.prototype.addUnloadZoneToQueue = function(actionzoneind) {
	try {
		var loadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[loadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[loadmoldqueind].actionzoneind = actionzoneind;
		WTW.loadMoldQueue[loadmoldqueind].queprocess = "unloadextreme";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addUnloadZoneToQueue=" + ex.message);
	}
}

WTWJS.prototype.addMoldToQueue = function(moldname, molddef, parentname, coveringname, csgmolddef) {
	try {
		var loadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[loadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[loadmoldqueind].moldname = moldname;
		WTW.loadMoldQueue[loadmoldqueind].queprocess = "add";
		WTW.loadMoldQueue[loadmoldqueind].molddef = molddef;
		WTW.loadMoldQueue[loadmoldqueind].parentname = parentname;
		WTW.loadMoldQueue[loadmoldqueind].coveringname = coveringname;
		WTW.loadMoldQueue[loadmoldqueind].csgmolddef = csgmolddef;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addMoldToQueue=" + ex.message);
	}
}

WTWJS.prototype.addDisposeMoldToQueue = function(moldname, check) {
	try {
		if (WTW.isMoldInQueue(moldname, true) == false) {
			var loadmoldqueind = WTW.loadMoldQueue.length;
			WTW.loadMoldQueue[loadmoldqueind] = WTW.newMoldQueue();
			WTW.loadMoldQueue[loadmoldqueind].moldname = moldname;
			WTW.loadMoldQueue[loadmoldqueind].queprocess = "dispose";
			WTW.loadMoldQueue[loadmoldqueind].check = check;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addDisposeMoldToQueue=" + ex.message);
	}
}

WTWJS.prototype.isMoldInQueue = function(moldname, remove) {
	var isinque = false;
	try {
		for (var i=0; i < WTW.loadMoldQueue.length; i++) {
			if (WTW.loadMoldQueue[i] != null) {
				if (WTW.loadMoldQueue[i].moldname == moldname && WTW.loadMoldQueue[i].queprocess == "add") {
					isinque = true;
					if (remove) {
						WTW.loadMoldQueue[i] = null;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-isMoldInQueue=" + ex.message);
	}
	return isinque;
}

WTWJS.prototype.addActionZoneToQueue = function(moldname, molddef) {
	try {
		var loadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[loadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[loadmoldqueind].moldname = moldname;
		WTW.loadMoldQueue[loadmoldqueind].molddef = molddef;
		WTW.loadMoldQueue[loadmoldqueind].queprocess = "addactionzone";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addActionZoneToQueue=" + ex.message);
	}
}

WTWJS.prototype.processMoldQueue = function() {
	WTW.checkLoadQueue = 1;
	try {
		var found = 0;
		var count = 0;
		for (var i=0;i<WTW.loadMoldQueue.length;i++) {
			if (WTW.loadMoldQueue[i] != null) {
				try {
					var moldname = WTW.loadMoldQueue[i].moldname;
					switch (WTW.loadMoldQueue[i].queprocess) {
						case "loadextreme":
							WTW.getMoldsByWebID(WTW.loadMoldQueue[i].actionzoneind);
							break;
						case "unloadextreme":
							WTW.unloadMoldsByWebID(WTW.loadMoldQueue[i].actionzoneind);
							break;
						case "addactionzone":
							WTW.addActionZone(moldname, WTW.loadMoldQueue[i].molddef);
							break;
						case "dispose":
							WTW.disposeClean(moldname, WTW.loadMoldQueue[i].check);
							break;
						case "add":
							if (WTW.loadMoldQueue[i].molddef != null && WTW.loadMoldQueue[i].molddef != undefined) {
								var molddef = WTW.loadMoldQueue[i].molddef;
								var csgmolddef = WTW.loadMoldQueue[i].csgmolddef;
								var csgshapename = "";
								var attachmoldind = molddef.attachmoldind;
								var mold = scene.getMeshByID(moldname);
								if (mold == null) {
									var parentmold = null;
									if (WTW.loadMoldQueue[i].parentname != "") {
										parentmold = scene.getMeshByID(WTW.loadMoldQueue[i].parentname);
									}
									if (WTW.loadMoldQueue[i].parentname == "" || parentmold != null) {
										mold = WTW.addMold(moldname, molddef, WTW.loadMoldQueue[i].parentname, WTW.loadMoldQueue[i].coveringname);
									}
									var moldgroup = "";
									var molds = null;
									var moldind = -1; 
									if (moldname.indexOf("communitymolds-") > -1) {
										moldgroup = "community";
										molds = WTW.communitiesMolds;
										moldind = Number(molddef.moldind);
									} else if (moldname.indexOf("buildingmolds-") > -1) {
										moldgroup = "building";
										molds = WTW.buildingMolds;
										moldind = Number(molddef.moldind);
									} else if (moldname.indexOf("thingmolds-") > -1) {
										moldgroup = "thing";
										molds = WTW.thingMolds;
										moldind = Number(molddef.moldind);
									} else if (moldname.indexOf("connectinggrids-") > -1) {
										moldgroup = "connectinggrid";
										molds = WTW.connectingGrids;
										moldind = Number(molddef.connectinggridind);
									} else if (moldname.indexOf("actionzone-") > -1) {
										moldgroup = "actionzone";
										molds = WTW.actionZones;
										moldind = Number(molddef.actionzoneind);
									}
									if (molds != null) {
										if (molds[moldind] != null) {
											molds[moldind].shown = "2";
											if (moldgroup != "connectinggrid" && moldgroup != "actionzone" && moldgroup != "") {
												if (attachmoldind > -1) {
													if (WTW.actionZones[attachmoldind] != null) {
														WTW.addActionZone(molddef.moldname, WTW.actionZones[attachmoldind]);
													}
												}
												if (WTW.adminView == 1) {
													var namepart = moldname.split('-');
													if (namepart[6] == null && moldname.indexOf("storeproduct") > -1) {
													} else {									
														WTW.registerMouseOver(mold);
													}
												}
											}
											if (moldname.indexOf("molds-") > -1) {
												var csgcount = 0;
												var receiveshadows = '0';
												var waterreflection = '0';
												if (molddef.csg.count != undefined) {
													if (WTW.isNumeric(molddef.csg.count)) {
														csgcount = Number(molddef.csg.count);
													}
												}
												if (molddef.graphics.receiveshadows != undefined) {
													if (molddef.graphics.receiveshadows == '1') {
														receiveshadows = '1';
													}
												}
												if (molddef.graphics.waterreflection != undefined) {
													if (molddef.graphics.waterreflection == '1') {
														waterreflection = '1';
													}
												}
												if (csgcount > 0) {
													mold = WTW.processCSGAction(mold, moldgroup, molddef);
												}
												if (receiveshadows == '1') {
													mold.receiveShadows = true;
												} else if (WTW.shadowset > 0) {
													WTW.addShadowToShadowmaps(mold);
												}
												if (waterreflection == '1' && WTW.waterMat != null) {
													WTW.waterMat.addToRenderList(mold);
												}
											}
											if (mold != null) {
												mold.checkCollisions = false;
												mold.isPickable = false;
												if (molddef.checkcollisions != undefined) {
													if (molddef.checkcollisions == "1") {
														mold.checkCollisions = true;
													}
												}
												if (molddef.ispickable != undefined) {
													if (molddef.ispickable == "1") {
														mold.isPickable = true;
													}
												}
											}
										}
									}
									if (moldname == WTW.mainParent) {
										WTW.transferMainParent(mold);
									}
								}
							}
							count += 1;
							break;
					}
				} catch (ex) {
					WTW.log("core-scripts-prime-wtw_common.js-processMoldQueue2=" + ex.message);
				}
				WTW.loadMoldQueue[i] = null;
				found = 1;
				if (count > 2) {
					i = WTW.loadMoldQueue.length;
					count = 0;
				}
			}
		}
		if (found == 0) {
			WTW.loadMoldQueue = [];
			WTW.setShownMolds();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-processMoldQueue=" + ex.message);
	}
	WTW.checkLoadQueue = 0;
}

WTWJS.prototype.changeNumberValue = function(item, dn, refresh) {
	try {
		if (refresh == undefined) {
			refresh = 0;
		}
		WTW.changeStop();
		var vali = dGet(item).value;
		var nvali = 0;
		var ndn = 0;
		if (WTW.isNumeric(dn)) {
			ndni = parseFloat(dn);
		}
		if (WTW.isNumeric(vali)) {
			nvali = parseFloat(Math.round(Number(vali) * 100) / 100) + ndni;
			if (WTW.adminView == 1) {
				dGet(item).value = (nvali.toFixed(2));
				if (item == "wtw_tgroundpositiony") {
					WTW.setGroundWater();
				} else if (item.indexOf("axis") > -1 || item.indexOf("actionzone") > -1) {
					WTW.setNewActionZone();
				} else if (item.indexOf("tconngrid") > -1) {
					WTW.setNewConnectingGrid();
				} else {
					WTW.setNewMold(refresh);
				}
			} else {
				dGet(item).value = (nvali.toFixed(0));
			}
		}
		WTW.mouseTimer = window.setInterval(function () {
			var val = dGet(item).value;
			var nval = 0;
			var ndn = 0;
			if (WTW.isNumeric(dn)) {
				ndn = parseFloat(dn);
			}
			if (WTW.isNumeric(val)) {
				nval = parseFloat(Math.round(Number(val) * 100) / 100) + ndn;
				if (WTW.adminView == 1) {
					dGet(item).value = (nval.toFixed(2));
					if (item == "wtw_tgroundpositiony") {
						WTW.setGroundWater();
					} else if (item.indexOf("axis") > -1 || item.indexOf("actionzone") > -1) {
						WTW.setNewActionZone();
					} else if (item.indexOf("tconngrid") > -1) {
						WTW.setNewConnectingGrid();
					} else {
						WTW.setNewMold(refresh);
					}
				} else {
					dGet(item).value = (nval.toFixed(0));
				}
			}
		}, 100);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-changeNumberValue=" + ex.message);
	}
}

WTWJS.prototype.changeStop = function() {
	try {
		if (WTW.mouseTimer != null) {
			window.clearInterval(WTW.mouseTimer);
			WTW.mouseTimer = null;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-changeStop=" + ex.message);
	}
}

WTWJS.prototype.loadUserSettings = function() {
	try {
		var rotationspeed = WTW.getCookie("rotatespeed");
		if (rotationspeed != null) {
			if (WTW.isNumeric(rotationspeed)) {
				WTW.rotationSpeed = Number(rotationspeed);
			}
		}
		var walkspeed = WTW.getCookie("walkingspeed");
		if (walkspeed != null) {
			if (WTW.isNumeric(walkspeed)) {
				WTW.walkSpeed = Number(walkspeed);
			}
		}
		var shadowsetting = WTW.getCookie("shadowsetting");
		if (shadowsetting != null) {
			if (WTW.isNumeric(shadowsetting)) {
				WTW.shadowset = Number(shadowsetting);
			}
		}	
		var graphicsetting = WTW.getCookie("graphicsetting");
		if (graphicsetting != null) {
			if (WTW.isNumeric(graphicsetting)) {
				WTW.graphicSet = Number(graphicsetting);
			}
		}		
		var soundmute = WTW.getCookie("soundmute");
		if (soundmute != null) {
			WTW.toggleSoundMute();
		}
		var myavatarid = WTW.getCookie("myavatarid");
		if (myavatarid != null) {
			dGet("wtw_tmyavatarid").value = myavatarid;
		} else {
			dGet("wtw_tmyavatarid").value = "";
		}
		var myavataridanon = WTW.getCookie("myavataridanon");
		if (myavataridanon != null) {
			dGet("wtw_tmyavataridanon").value = myavataridanon;
		} else {
			dGet("wtw_tmyavataridanon").value = "";
		}
		var multipersonon = WTW.getCookie("multipersonon");
		if (multipersonon != null) {
			if (multipersonon == "0") {
				WTW.multipersonOn = 0;
				dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
				dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
				dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			}
		}
		var multiperson = WTW.getCookie("multiperson");
		if (multiperson != null) {
			if (WTW.isNumeric(multiperson)) {
				WTW.multiPerson = Number(multiperson);
			} else {
				WTW.multiPerson = 20;
			}
		} else {
			WTW.multiPerson = 20;
		}
		dGet('wtw_tavatarcount').value = WTW.multiPerson;
		var AvatarIDs = WTW.getCookie("AvatarIDs");
		if (AvatarIDs != null) {
			if (WTW.isNumeric(AvatarIDs)) {
				WTW.AvatarIDs = Number(AvatarIDs);
			}
		}
		if (WTW.AvatarIDs == 0) {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
		}
		var showcompass = WTW.getCookie("showcompass");
		if (showcompass != null) {
			if (showcompass == "0") {
				dGet('wtw_compassvisibility').innerHTML = "Compass Hidden";
				dGet('wtw_compassicon').src = "/content/system/images/menuoff.png";
				dGet('wtw_compassicon').alt = "Show Compass";
				dGet('wtw_compassicon').title = "Show Compass";
			}
		}
		var showarrows = WTW.getCookie("showarrows");
		if (showarrows != null) {
			if (showarrows == "0") {
				dGet('wtw_arrowsvisibility').innerHTML = "Arrows are Hidden";
				dGet('wtw_arrowsicon').src = "/content/system/images/menuoff.png";
				dGet('wtw_arrowsicon').alt = "Show Arrows";
				dGet('wtw_arrowsicon').title = "Show Arrows";
				WTW.hide('wtw_iwalkarrow');
				WTW.hide('wtw_iwalkarrow2');
			}
		}
		var showfps = WTW.getCookie("showfps");
		WTW.showFPS = 0;
		if (showfps != null) {
			if (showfps == "1") {
				dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Visible";
				dGet('wtw_fpsicon').src = "/content/system/images/menuon.png";
				dGet('wtw_fpsicon').alt = "Hide Mold Count";
				dGet('wtw_fpsicon').title = "Hide Mold Count";
				WTW.show('wtw_showmeshfps');
				WTW.showFPS = 1;
			}
		}
		if (dGet('wtw_trotationspeed') != null) {
			dGet('wtw_trotationspeed').value = WTW.rotationSpeed;
		}
		if (dGet('wtw_twalkspeed') != null) {
			dGet('wtw_twalkspeed').value = WTW.walkSpeed;
		}
		if (dGet('wtw_tshadowsetting') != null) {
			dGet('wtw_tshadowsetting').value = WTW.shadowset;
			WTW.setCookie("shadowsetting",WTW.shadowset,365);
		}
		if (dGet('wtw_tgraphicsetting') != null) {
			dGet('wtw_tgraphicsetting').value = WTW.graphicSet;
			WTW.setCookie("graphicsetting",WTW.graphicSet,365);
		}
		switch (WTW.shadowset) {
			case 0:
                if (WTW.gpuSetting == 'low') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)";
                }
				break;
			case 1:
                if (WTW.gpuSetting == 'medium') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)";
                }
				break;
			case 2:
                dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Most - High Resolution)";
				break;
			case 3:
                if (WTW.gpuSetting == 'high') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)";
                }
				break;
		}
		switch (WTW.graphicSet) {
			case 0:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Low Resolution)";
				break;
			case 1:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Optimum Balance)";
				break;
			case 2:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (High Resolution)";
				break;
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-loadUserSettings=" + ex.message);
	}
}

WTWJS.prototype.loadCameraSettings = function() {
	try {
		var dimensions = WTW.getCookie("dimensions");
		if (dimensions == null) {
			dimensions = "";
		} else if (dimensions == '') {
			dimensions = "";
		}
		WTW.setDDLValue('wtw_cameradimensions',dimensions);
		var firstcamera = WTW.getCookie("firstcamera");
		if (firstcamera == null) {
			firstcamera = "Follow Camera";
		} else if (firstcamera == '') {
			firstcamera = "Follow Camera";
		}
		WTW.setDDLValue('wtw_firstcamera',firstcamera);
		WTW.switchCamera(1);
		var showcameratwo = WTW.getCookie("showcameratwo");
		if (showcameratwo != null) {
			if (showcameratwo == "1") {
				dGet('wtw_cameratwotext').innerHTML = "Second Camera On";
				dGet('wtw_cameratwoicon').src = "/content/system/images/menucamera.png";
				dGet('wtw_cameratwoicon').alt = "Hide Second Camera";
				dGet('wtw_cameratwoicon').title = "Hide Second Camera";
				WTW.show('wtw_cameratwoselect');
				var secondcamera = WTW.getCookie("secondcamera");
				if (secondcamera == null) {
					secondcamera = "Scene Camera";
				} else if (secondcamera == "") {
					secondcamera = "Scene Camera";
				}
				WTW.setDDLValue('wtw_secondcamera',secondcamera);
				WTW.switchCamera(2);
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-loadCameraSettings=" + ex.message);
	}
}

WTWJS.prototype.loadUserSettingsAfterEngine = function() {
	try {
		var gpusetting = WTW.getCookie("gpusetting");
		if (gpusetting != null) {
			WTW.gpuSetting = gpusetting;
			if (WTW.gpuSetting != "high" && WTW.gpuSetting != "medium" && WTW.gpuSetting != "low") {
				WTW.gpuSetting = "low";
			}
		} else {
			WTW.gpuSetting = WTW.getGPU();
		}
		WTW.setCookie("gpusetting", WTW.gpuSetting, 30);
		window.setTimeout(function() {
			WTW.isInitCycle = 0;
			/* BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed() ,	function(){	
				console.log("Optimization successful");
			}, function(){ 
				console.log("Optimization failed");
			});*/
		}, 8000);
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-loadUserSettingsAfterEngine=" + ex.message);
	}
}

WTWJS.prototype.closeMenus = function() {
	try {
		if (dGet('wtw_menuavatar').style.display != 'none') {
			WTW.closeSetupMode();
		}
		if (dGet('wtw_menuregister').style.display != 'none') {
			WTW.show('wtw_menulogin');
			WTW.hide('wtw_menupasswordrecovery');
			WTW.hide('wtw_menuregister');
		}
		var menuforms = document.getElementsByClassName('wtw-slideupmenuright');
		for (var i=0;i<menuforms.length;i++) {
			if (menuforms[i] != null) {
				if (menuforms[i].id != undefined) {
					WTW.hide(menuforms[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-closeMenus=" + ex.message);
	}
}

WTWJS.prototype.openRegisterForm = function() {
	try {
		WTW.closeMenus();
		WTW.hide('wtw_menulogin');
		WTW.hide('wtw_menupasswordrecovery');
		WTW.hide('wtw_menuloggedin');
		WTW.show('wtw_menuregister');
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-openRegisterForm=" + ex.message);
	}
}

WTWJS.prototype.openRecoveryForm = function() {
	try {
		WTW.closeMenus();
		WTW.hide('wtw_menulogin');
		WTW.hide('wtw_menuloggedin');
		WTW.hide('wtw_menuregister');
		WTW.show('wtw_menupasswordrecovery');
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-openRegisterForm=" + ex.message);
	}
}

WTWJS.prototype.openLoginForm = function() {
	try {
		WTW.closeMenus();
		WTW.hide('wtw_menuregister');
		WTW.hide('wtw_menuloggedin');
		WTW.hide('wtw_menupasswordrecovery');
		WTW.show('wtw_menulogin');
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-openLoginForm=" + ex.message);
	}
}

WTWJS.prototype.toggleHelpOnStart = function() {
	try {
		if (dGet('wtw_tshowhelponstart').checked) {
			WTW.deleteCookie("movecontrols");
		} else {
			WTW.setCookie("movecontrols","1",365);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-toggleHelpOnStart=" + ex.message);
	}
}

WTWJS.prototype.switchAvatarMenu = function(w) {
	try {
		if (w != 2 && dGet('wtw_menuavatarcolordiv').style.display != 'none') {
			WTW.saveAvatarColor(dGet('wtw_tmoldname').value);
			if (WTW.guiAdminColors != null) {
				WTW.guiAdminColors.dispose();
				WTW.guiAdminColors = null;
			}
		}
		var selavatar = scene.getMeshByID("selectavatar-1-preview");
		switch (w) {
			case 1:
				WTW.hide('wtw_menuavatarcolordiv');
				WTW.hide('wtw_menuavataranimationsdiv');
				WTW.hide('wtw_menuavatarchangediv');
				if (selavatar != null) {
					WTW.closeSelectAvatar();
				}
				WTW.showAvatarDisplayName();
				break;
			case 2:
				WTW.hide('wtw_menuavatardisplaynamediv');
				WTW.hide('wtw_menuavataranimationsdiv');
				WTW.hide('wtw_menuavatarchangediv');
				if (selavatar != null) {
					WTW.closeSelectAvatar();
				}
				WTW.toggleAvatarColor();
				break;
			case 3:
				WTW.hide('wtw_menuavatardisplaynamediv');
				WTW.hide('wtw_menuavatarcolordiv');
				WTW.hide('wtw_menuavatarchangediv');
				if (selavatar != null) {
					WTW.closeSelectAvatar();
				}
				if (dGet('wtw_menuavataranimationsdiv').style.display == 'none') {
					WTW.getAvatarAnimationsAll();
					WTW.show('wtw_menuavataranimationsdiv');
				} else {
					WTW.hide('wtw_menuavataranimationsdiv');
				}
				break;
			case 4:
				WTW.hide('wtw_menuavatardisplaynamediv');
				WTW.hide('wtw_menuavatarcolordiv');
				WTW.hide('wtw_menuavataranimationsdiv');
				if (dGet('wtw_menuavatarchangediv').style.display == 'none') {
					WTW.openChangeAvatar();
					WTW.show('wtw_menuavatarchangediv');
				} else {
					WTW.closeSelectAvatar();
					WTW.hide('wtw_menuavatarchangediv');
				}
				break;
		}
		WTW.showSettingsMenu('wtw_menuavatar');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-switchAvatarMenu=" + ex.message);
	}
}

WTWJS.prototype.recoverLogin = function() {
	try {
		if (dGet('wtw_trecoverbyemail').value.length > 7 && dGet('wtw_trecoverbyemail').value.indexOf('@') > -1 && dGet('wtw_trecoverbyemail').value.indexOf('.') > -1) {
			var request = {
				'email':dGet('wtw_trecoverbyemail').value
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuseremail').value = request.email;
				ipage.getElementById('wtw_brecoverloginbyemail').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);		
		} else {
			dGet('wtw_recovererrortext').innerHTML = "Not a valid Email Address";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-recoverLogin=" + ex.message);
	}
}

WTWJS.prototype.recoverLoginComplete = function(response) {
	try {
		dGet('wtw_recovererrortext').innerHTML = response;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-recoverLoginComplete=" + ex.message);
	}
}

WTWJS.prototype.setProduct = function(product, moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var found = false;
		var productid = "";
		var slug = "";
		if (product.indexOf("|") > -1) {
			var productinfo = product.split('|');
			productid = productinfo[0];
			slug = productinfo[1];
		} else {
			productid = product;
		}
		if (WTW.adminView == 1) {
			dGet('wtw_tmoldproductid').value = productid;
			dGet('wtw_tmoldslug').value = slug;
		}
		if (WTW.buildingMolds[moldnameparts.moldind] != null) {
			if (WTW.buildingMolds[moldnameparts.moldind].store.name != undefined) {
				if (WTW.buildingMolds[moldnameparts.moldind].store.name != '') {
					WTW.loadProductDisplay(moldname, WTW.buildingMolds[moldnameparts.moldind].store.name, WTW.buildingMolds[moldnameparts.moldind].store.price, WTW.buildingMolds[moldnameparts.moldind].store.productid, WTW.buildingMolds[moldnameparts.moldind].store.slug, WTW.buildingMolds[moldnameparts.moldind].store.imageurl, WTW.buildingMolds[moldnameparts.moldind].store.shortdescription, WTW.buildingMolds[moldnameparts.moldind].store.description);
					found = true;
				}
			}
		}
		if (moldnameparts.storewoocommerceapiurl != "" && found == false) {
			WTW.getJSON(moldnameparts.storewoocommerceapiurl + "products/" + productid + "/?consumer_key=" + moldnameparts.woocommercekey + "&consumer_secret=" + moldnameparts.woocommercesecret, 
				function(response) {
					response = JSON.parse(response);
					var imageurl = '';
					if (response.images[0] != null) {
						if (imageurl = response.images[0].src != undefined) {
							imageurl = response.images[0].src;
						}
					}
					WTW.loadProductDisplay(moldname, response.name, response.price, productid, slug, imageurl, response.short_description, response.description);
				}
			);
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-setProduct=" + ex.message);
	}
}

WTWJS.prototype.loadProductDisplay = function(moldname, productname, price, productid, slug, imageurl, shortdescription, description) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (imageurl != '' && moldnameparts.storeurl != "" && moldnameparts.wpplugin != "") {
			var pimage = scene.getMeshByID(moldname + "-clickimage");
			if (pimage != null) {
				try {
					if (pimage.material.diffuseTexture != null) {
						pimage.material.diffuseTexture.dispose();
						pimage.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (pimage.material != null) {
						pimage.material.dispose();
						pimage.material = null;
					}
				} catch(ex) {}
			}
			var pimage2 = scene.getMeshByID(moldname + "-clickimage2");
			if (pimage2 != null) {
				try {
					if (pimage2.material.diffuseTexture != null) {
						pimage2.material.diffuseTexture.dispose();
						pimage2.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (pimage2.material != null) {
						pimage2.material.dispose();
						pimage2.material = null;
					}
				} catch(ex) {}
			}
			WTW.getJSON(moldnameparts.storeurl + "/" + moldnameparts.wpplugin + "/image.php?walktheweb_image_url=" + imageurl, 
				function(response2) {
				if (response2 != null) {
						var imagedata = JSON.parse(response2);
						var newimage = new Image();
						newimage.src = imagedata[0].url;  
						newimage.onload = function() {
							var opacity = 1;
							var covering = new BABYLON.StandardMaterial("cubemat" + moldname + "-clickimage", scene);
							covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imagedata[0].data, "cubemat" + moldname + "-clickimagemat", scene);
							covering.alpha = opacity;
							covering.specularColor = new BABYLON.Color3(opacity, opacity, opacity);
							/* covering.emissiveColor = new BABYLON.Color3(opacity, opacity, opacity); */
							covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							covering.diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
							var pimage = scene.getMeshByID(moldname + "-clickimage");
							if (pimage != null) {
								pimage.isVisible = true;
								pimage.material = covering;
							}
							var pimage2 = scene.getMeshByID(moldname + "-clickimage2");
							if (pimage2 != null) {
								pimage2.isVisible = true;
								pimage2.material = covering;
							}
						}
						var lineheigth = "34px";
						var fontheight = "40px";
						var titleimage = scene.getMeshByID(moldname + "-titleimage");
						if (titleimage == null) {
							titleimage = scene.getMeshByID(moldname + "-titleimagesm");
						}
						if (titleimage != null) {
							try {
								if (titleimage.material.diffuseTexture != null) {
									titleimage.material.diffuseTexture.dispose();
									titleimage.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (titleimage.material != null) {
									titleimage.material.dispose();
									titleimage.material = null;
								}
							} catch(ex) {}
							var coveringtitle = new BABYLON.StandardMaterial("mat" + moldname + "-titleimagetexture", scene);
							coveringtitle.alpha = 1;
							coveringtitle.specularColor = new BABYLON.Color3(.7, .7, .7);
							/* coveringtitle.emissiveColor = new BABYLON.Color3(.7, .7, .7); */
							coveringtitle.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringtitle.diffuseColor = new BABYLON.Color3(.7, .7, .7);
							var contentTexture = new BABYLON.DynamicTexture(moldname + "-titleimagetexture", {width: 512,height: 512}, scene, true);
							contentTexture.name = moldname + "-titleimagetexture";
							coveringtitle.diffuseTexture = contentTexture;
							titleimage.material = coveringtitle;
							var namelength = WTW.cleanHTMLText(productname).length;
							
							if (namelength > 224) {
								lineheigth = "10px";
								fontheight = "12px";
							} else if (namelength > 120) {
								lineheigth = "14px";
								fontheight = "16px";
							} else if (namelength > 50) {
								lineheigth = "18px";
								fontheight = "20px";
							} else if (namelength > 32) {
								lineheigth = "20px";
								fontheight = "24px";
							} else if (namelength > 27) {
								lineheigth = "24px";
								fontheight = "30px";
							} else if (namelength > 22) {
								lineheigth = "30px";
								fontheight = "36px";
							}
							WTW.wrapText(titleimage, WTW.cleanHTMLText(productname), lineheigth, fontheight, "center", "top", "white", 5, 0);
							if (titleimage.name.indexOf("-titleimagesm") > -1) {
								coveringtitle.diffuseTexture.vScale = .1;
								coveringtitle.diffuseTexture.vOffset = .9;
							}
						}
						var titleimage2 = scene.getMeshByID(moldname + "-titleimage2");
						if (titleimage2 == null) {
							titleimage2 = scene.getMeshByID(moldname + "-titleimage2sm");
						}
						if (titleimage2 != null) {
							try {
								if (titleimage2.material.diffuseTexture != null) {
									titleimage2.material.diffuseTexture.dispose();
									titleimage2.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (titleimage2.material != null) {
									titleimage2.material.dispose();
									titleimage2.material = null;
								}
							} catch(ex) {}
							var coveringtitle2 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage2texture", scene);
							coveringtitle2.alpha = 1;
							coveringtitle2.specularColor = new BABYLON.Color3(.7, .7, .7);
							/* coveringtitle2.emissiveColor = new BABYLON.Color3(.7, .7, .7); */
							coveringtitle2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringtitle2.diffuseColor = new BABYLON.Color3(.7, .7, .7);
							var contentTexture2 = new BABYLON.DynamicTexture(moldname + "-titleimage2texture", {width: 512,height: 512}, scene, true);
							contentTexture2.name = moldname + "-titleimage2texture";
							coveringtitle2.diffuseTexture = contentTexture2;
							titleimage2.material = coveringtitle2;
							WTW.wrapText(titleimage2, WTW.cleanHTMLText(productname), lineheigth, fontheight, "center", "top", "white", 0, 0);
							if (titleimage2.name.indexOf("-titleimage2sm") > -1) {
								coveringtitle2.diffuseTexture.vScale = .1;
								coveringtitle2.diffuseTexture.vOffset = .9;
							}
						}
						var desctext = "";
						if (shortdescription != null) {
							if (shortdescription != undefined) {
								if (shortdescription.length > 0) {
									desctext = shortdescription;
								}
							}
						}
						if (desctext == "") {
							if (description != null) {
								if (description != undefined) {
									if (description.length > 0) {
										desctext = description;
									}
								}
							}
						}
						var descimage1 = scene.getMeshByID(moldname + "-descimage1");
						if (descimage1 != null) {
							try {
								if (descimage1.material.diffuseTexture != null) {
									descimage1.material.diffuseTexture.dispose();
									descimage1.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (descimage1.material != null) {
									descimage1.material.dispose();
									descimage1.material = null;
								}
							} catch(ex) {}
							var coveringdesc1 = new BABYLON.StandardMaterial("mat" + moldname + "-descimage1texture", scene);
							coveringdesc1.alpha = 0;
							coveringdesc1.specularColor = new BABYLON.Color3(.7, .7, .7);
							/* coveringdesc1.emissiveColor = new BABYLON.Color3(.7, .7, .7); */
							coveringdesc1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringdesc1.diffuseColor = new BABYLON.Color3(.7, .7, .7);
							var contentTexture3 = new BABYLON.DynamicTexture(moldname + "-descimage1texture", {width: 512,height: 512}, scene, true);
							contentTexture3.name = moldname + "-descimage1texture";
							coveringdesc1.diffuseTexture = contentTexture3;
							descimage1.material = coveringdesc1;
							WTW.wrapText(descimage1, WTW.cleanHTMLText(desctext), "30px", "30px", "left", "top", "white", 0, 0, "90%", "20px", "10px"); // , tmaxwidth, tmarginleft, tmarginright, tfloat, tfloatwidth, tfloatheight
						}

						var descimage2 = scene.getMeshByID(moldname + "-descimage2");
						if (descimage2 != null) {
							try {
								if (descimage2.material.diffuseTexture != null) {
									descimage2.material.diffuseTexture.dispose();
									descimage2.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (descimage2.material != null) {
									descimage2.material.dispose();
									descimage2.material = null;
								}
							} catch(ex) {}
							var coveringdesc2 = new BABYLON.StandardMaterial("mat" + moldname + "-descimage2texture", scene);
							coveringdesc2.alpha = 0;
							coveringdesc2.specularColor = new BABYLON.Color3(.7, .7, .7);
							/* coveringdesc2.emissiveColor = new BABYLON.Color3(.7, .7, .7); */
							coveringdesc2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringdesc2.diffuseColor = new BABYLON.Color3(.7, .7, .7);
							var contentTexture4 = new BABYLON.DynamicTexture(moldname + "-descimage2texture", {width: 512,height: 512}, scene, true);
							contentTexture4.name = moldname + "-descimage2texture";
							coveringdesc2.diffuseTexture = contentTexture4;
							descimage2.material = coveringdesc2;
							WTW.wrapText(descimage2, WTW.cleanHTMLText(desctext), "30px", "30px", "left", "top", "white", 0, 0, "90%", "20px", "10px");
						}

						var readmore1 = scene.getMeshByID(moldname + "-readmore1");
						if (readmore1 != null) {
							try {
								if (readmore1.material.diffuseTexture != null) {
									readmore1.material.diffuseTexture.dispose();
									readmore1.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (readmore1.material != null) {
									readmore1.material.dispose();
									readmore1.material = null;
								}
							} catch(ex) {}
							var coveringread1 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage1texture", scene);
							coveringread1.alpha = 1;
							coveringread1.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* coveringread1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							coveringread1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringread1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var readTexture1 = new BABYLON.DynamicTexture(moldname + "-readimage1texture", {width: 512,height: 512}, scene, true);
							readTexture1.name = moldname + "-readimage1texture";
							/* readTexture1.hasAlpha = true; */
							coveringread1.diffuseTexture = readTexture1;
							coveringread1.diffuseTexture.vScale = .2;
							coveringread1.diffuseTexture.uScale = 1;
							coveringread1.diffuseTexture.vOffset = .85;
							readmore1.material = coveringread1;
							WTW.wrapText(readmore1, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
						}							
						
						var readmore2 = scene.getMeshByID(moldname + "-readmore2");
						if (readmore2 != null) {
							try {
								if (readmore2.material.diffuseTexture != null) {
									readmore2.material.diffuseTexture.dispose();
									readmore2.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (readmore2.material != null) {
									readmore2.material.dispose();
									readmore2.material = null;
								}
							} catch(ex) {}
							var coveringread2 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage2texture", scene);
							coveringread2.alpha = 1;
							coveringread2.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* coveringread2.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							coveringread2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringread2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var readTexture2 = new BABYLON.DynamicTexture(moldname + "-readimage2texture", {width: 512,height: 512}, scene, true);
							readTexture2.name = moldname + "-readimage2texture";
							/* readTexture2.hasAlpha = true; */
							coveringread2.diffuseTexture = readTexture2;
							coveringread2.diffuseTexture.vScale = .2;
							coveringread2.diffuseTexture.uScale = 1;
							coveringread2.diffuseTexture.vOffset = .85;
							readmore2.material = coveringread2;
							WTW.wrapText(readmore2, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
						}
						var price1 = scene.getMeshByID(moldname + "-price1");
						if (price1 != null) {
							try {
								if (price1.material.diffuseTexture != null) {
									price1.material.diffuseTexture.dispose();
									price1.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (price1.material != null) {
									price1.material.dispose();
									price1.material = null;
								}
							} catch(ex) {}
							var coveringprice1 = new BABYLON.StandardMaterial("mat" + moldname + "-coveringprice1texture", scene);
							coveringprice1.alpha = 1;
							coveringprice1.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* coveringprice1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							coveringprice1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringprice1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var priceTexture1 = new BABYLON.DynamicTexture(moldname + "-coveringprice1texture", {width: 512,height: 512}, scene, true);
							priceTexture1.name = moldname + "-coveringprice1texture";
							/* priceTexture1.hasAlpha = true; */
							coveringprice1.diffuseTexture = priceTexture1;
							coveringprice1.diffuseTexture.uScale = 1;
							coveringprice1.diffuseTexture.vScale = .08;
							coveringprice1.diffuseTexture.vOffset = .92;
							price1.material = coveringprice1;
							WTW.wrapText(price1, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
						}
						var price2 = scene.getMeshByID(moldname + "-price2");
						if (price2 != null) {
							try {
								if (price2.material.diffuseTexture != null) {
									price2.material.diffuseTexture.dispose();
									price2.material.diffuseTexture = null;
								}
							} catch(ex) {}
							try {
								if (price2.material != null) {
									price2.material.dispose();
									price2.material = null;
								}
							} catch(ex) {}
							var coveringprice1 = new BABYLON.StandardMaterial("mat" + moldname + "-coveringprice1texture", scene);
							coveringprice1.alpha = 1;
							coveringprice1.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* coveringprice1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							coveringprice1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							coveringprice1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var priceTexture1 = new BABYLON.DynamicTexture(moldname + "-coveringprice1texture", {width: 512,height: 512}, scene, true);
							priceTexture1.name = moldname + "-coveringprice1texture";
							/* priceTexture1.hasAlpha = true; */
							coveringprice1.diffuseTexture = priceTexture1;
							coveringprice1.diffuseTexture.uScale = 1;
							coveringprice1.diffuseTexture.vScale = .08;
							coveringprice1.diffuseTexture.vOffset = .92;
							price2.material = coveringprice1;
							WTW.wrapText(price2, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
						}
					} 
				}
			);
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_common.js-loadProductDisplay=" + ex.message);
	}
}

WTWJS.prototype.productReadMore = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.moldind > -1 && moldnameparts.storeproducturl != "") {
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				if (moldnameparts.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openIFrame(moldnameparts.storeproducturl + moldnameparts.molds[moldnameparts.moldind].store.slug + "/", .8, .8);
					},500);
				} else {
					WTW.openWebpage(moldnameparts.storeproducturl + moldnameparts.molds[moldnameparts.moldind].store.slug + "/", '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productReadMore=" + ex.message);
	}  
}

WTWJS.prototype.productAddToCart = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.moldind > -1 && moldnameparts.storecarturl != "") {
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				if (moldnameparts.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openIFrame(moldnameparts.storecarturl + "?add-to-cart=" + moldnameparts.molds[moldnameparts.moldind].store.productid, .8, .8);
					},500);
				} else {
					WTW.openWebpage(moldnameparts.storecarturl + "?add-to-cart=" + moldnameparts.molds[moldnameparts.moldind].store.productid, '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productAddToCart=" + ex.message);
	}  
}

WTWJS.prototype.productShowCart = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.storecarturl != "") {
			if (moldnameparts.storeiframes == '1') {
				WTW.openIFrame(moldnameparts.storecarturl, .8, .8);
			} else {
				WTW.openWebpage(moldnameparts.storecarturl, '_blank');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productShowCart=" + ex.message);
	}  
}

WTWJS.prototype.productGetProduct = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.shape == "storeproduct") {
			var found = false;
			var fetch = false;
			if (moldnameparts.molds[moldnameparts.moldind] != null && moldnameparts.cgid != '' && moldnameparts.cgind > -1) {
				if (WTW.products != null) {
					for (var i=WTW.products.length;i > -1 ;i--) {
						if (WTW.products[i] != null) {
							if (WTW.products[i].fetching == "0" && WTW.products[i].connectinggridind.toString() == moldnameparts.cgind.toString() && WTW.products[i].connectinggridid == moldnameparts.cgid) {
								moldnameparts.molds[moldnameparts.moldind].store.storeurl = WTW.products[i].storeurl;
								moldnameparts.molds[moldnameparts.moldind].store.wpplugin = WTW.products[i].wpplugin;
								moldnameparts.molds[moldnameparts.moldind].store.productid = WTW.products[i].productid;
								moldnameparts.molds[moldnameparts.moldind].store.name = WTW.products[i].name;
								moldnameparts.molds[moldnameparts.moldind].store.slug = WTW.products[i].slug;
								moldnameparts.molds[moldnameparts.moldind].store.price = WTW.products[i].price;
								moldnameparts.molds[moldnameparts.moldind].store.imageid = WTW.products[i].imageid;
								moldnameparts.molds[moldnameparts.moldind].store.imageurl = WTW.products[i].imageurl;
								moldnameparts.molds[moldnameparts.moldind].store.categoryid = WTW.products[i].categoryid;
								moldnameparts.molds[moldnameparts.moldind].store.description = WTW.products[i].description;
								moldnameparts.molds[moldnameparts.moldind].store.shortdescription = WTW.products[i].shortdescription;
								WTW.products.splice(i,1);
								found = true;
								i = WTW.products.length;
							} else if (WTW.products[i].fetching == "1" && WTW.products[i].connectinggridind.toString() == moldnameparts.cgind.toString() && WTW.products[i].connectinggridid == moldnameparts.cgid) {
								fetch = true;
								/* i = WTW.products.length; */
							}
						}
					}
				}
				if (found == false) {
					if (fetch == false) {
						var newproductind = WTW.products.length;
						WTW.products[newproductind] = WTW.newProduct();
						WTW.products[newproductind].connectinggridind = moldnameparts.cgind.toString();
						WTW.products[newproductind].connectinggridid = moldnameparts.cgid;
						WTW.products[newproductind].search = "";
						WTW.products[newproductind].fetching = "1";
						WTW.productFetchProducts(moldname,'');
					}
					window.setTimeout(function() {
						WTW.productGetProduct(moldname);
					}, 100);
				} else {
					WTW.setProduct(moldnameparts.molds[moldnameparts.moldind].store.productid + "|" + moldnameparts.molds[moldnameparts.moldind].store.slug, moldname);
				} 
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productGetProduct=" + ex.message);
	}  
}

WTWJS.prototype.productSelectCategory = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		WTW.productClearForSearchResults(moldnameparts.cgid, moldnameparts.cgind);
		WTW.products = [];
		if (moldnameparts.namepart[7] != null) {
			WTW.productFetchProducts(moldname,moldnameparts.namepart[7]);
		} else {
			WTW.productFetchProducts(moldname,'');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productSelectCategory=" + ex.message);
	}  
}

WTWJS.prototype.productFetchProducts = function(moldname, categoryid) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.storewoocommerceapiurl != "") {
			var url = moldnameparts.storewoocommerceapiurl + "products/?per_page=50&consumer_key=" + moldnameparts.woocommercekey + "&consumer_secret=" + moldnameparts.woocommercesecret;
			if (categoryid != "") {
				url = moldnameparts.storewoocommerceapiurl + "products/?per_page=50&category=" + categoryid + "&consumer_key=" + moldnameparts.woocommercekey + "&consumer_secret=" + moldnameparts.woocommercesecret;
			}
			WTW.getJSON(url, 
				function(response) {
					WTW.productLoadProducts(moldname, JSON.parse(response), moldnameparts.storeurl, moldnameparts.wpplugin);
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productFetchProducts=" + ex.message);
	}  
}

WTWJS.prototype.productLoadProducts = function(moldname, response, storeurl, wpplugin) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		for (var i=0;i<response.length;i++) {
			if (response[i] != null) {
				var categoryid = "";
				if (response[i].categories != null) {
					if (response[i].categories[0] != null) {
						categoryid = response[i].categories[0].id;
					}
				}
				var newproductind = WTW.products.length;
				WTW.products[newproductind] = WTW.newProduct();
				WTW.products[newproductind].storeurl = storeurl;
				WTW.products[newproductind].wpplugin = wpplugin;
				WTW.products[newproductind].connectinggridind = moldnameparts.cgind.toString();
				WTW.products[newproductind].connectinggridid = moldnameparts.cgid;
				WTW.products[newproductind].search = '';
				WTW.products[newproductind].productid = response[i].id;
				WTW.products[newproductind].name = WTW.encode(WTW.cleanHTMLText(response[i].name));
				WTW.products[newproductind].slug = response[i].slug;
				WTW.products[newproductind].price = response[i].price;
				WTW.products[newproductind].categoryid = categoryid;
				WTW.products[newproductind].description = WTW.encode(WTW.cleanHTMLText(response[i].description));
				WTW.products[newproductind].shortdescription = WTW.encode(WTW.cleanHTMLText(response[i].short_description));
				WTW.products[newproductind].fetching = '0';
				if (response[i].images[0] != null) {
					WTW.products[newproductind].imageid = response[i].images[0].id;
					WTW.products[newproductind].imageurl = response[i].images[0].src;
				}
			}
		}
		if (moldname.indexOf("storecategories") > -1) {
			WTW.productLoadSearchResults(moldname, moldnameparts.cgid, moldnameparts.cgind);
		} else {
			WTW.productClearFetchProducts(moldname);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productLoadProducts=" + ex.message);
	}  
}


WTWJS.prototype.productClearFetchProducts = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (WTW.products != null) {
			for (var i=WTW.products.length;i > -1 ;i--) {
				if (WTW.products[i] != null) {
					if (WTW.products[i].fetching == "1" && WTW.products[i].connectinggridind.toString() == moldnameparts.cgind.toString() && WTW.products[i].connectinggridid == moldnameparts.cgid) {
						WTW.products.splice(i,1);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productClearFetchProducts=" + ex.message);
	}  
}

WTWJS.prototype.productFetchCategories = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.storewoocommerceapiurl != "") {
			var url = moldnameparts.storewoocommerceapiurl + "products/categories/?per_page=50&orderby=slug&consumer_key=" + moldnameparts.woocommercekey + "&consumer_secret=" + moldnameparts.woocommercesecret;
			WTW.getJSON(url, 
				function(response) {
					WTW.productLoadCategories(moldname, JSON.parse(response));
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productFetchCategories=" + ex.message);
	}  
}

WTWJS.prototype.productLoadCategories = function(moldname, response) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var molddef = moldnameparts.molds[moldnameparts.moldind];
		var lenx = 1;
		var leny = 1;
		var lenz = 1;
		var firsty = 0;
		var incy = 0;
		var lasty = -5;
		var once = 0;
		var basemold = scene.getMeshByID(moldname + "-base");
		if (molddef != null) {
			if (molddef.scaling != undefined) {
				if (molddef.scaling.x != undefined) {
					lenx = Number(molddef.scaling.x);
				}
				if (molddef.scaling.y != undefined) {
					leny = Number(molddef.scaling.y);
				}
				if (molddef.scaling.z != undefined) {
					lenz = Number(molddef.scaling.z);
				}
			}
		}
		firsty = leny/2 -2.1;
		lasty = -leny/2 + 1;
		var categorybuttonall = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybutton-", {}, scene);
		categorybuttonall.scaling = new BABYLON.Vector3(.2, lenz - 1, .9);
		categorybuttonall.position = new BABYLON.Vector3(-lenx/2 + .25, firsty, 0);
		categorybuttonall.rotation.x = WTW.getRadians(-90);
		categorybuttonall.parent = basemold;

		var categorybuttontextureall = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexture-", scene);
		categorybuttontextureall.alpha = 1;
		categorybuttontextureall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* categorybuttontextureall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		categorybuttontextureall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		categorybuttontextureall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var categoryTextureall = new BABYLON.DynamicTexture(moldname + "-categorybuttontexture-", {width: 512,height: 512}, scene, true);
		categoryTextureall.name = moldname + "-categorybuttontexture-";
		/* categoryTextureall.hasAlpha = true; */
		categorybuttontextureall.diffuseTexture = categoryTextureall;
		categorybuttontextureall.diffuseTexture.vScale = .11;
		categorybuttontextureall.diffuseTexture.uScale = 1;
		categorybuttontextureall.diffuseTexture.vOffset = .88;
		categorybuttonall.material = categorybuttontextureall;
		WTW.wrapText(categorybuttonall, "All", "45px", "40px", "center", "top", "white", 0, 0);
		
		var categorybuttonhoverall = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybuttonhover-", {}, scene);
		categorybuttonhoverall.scaling = new BABYLON.Vector3(.2, lenz - .99, .91);
		categorybuttonhoverall.position = new BABYLON.Vector3(-lenx/2 + .15, firsty, 0);
		categorybuttonhoverall.rotation.x = WTW.getRadians(-90);
		categorybuttonhoverall.parent = basemold;
		
		var categorybuttontexturehoverall = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexturehover-", scene);
		categorybuttontexturehoverall.alpha = 0;
		categorybuttontexturehoverall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* categorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		categorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		categorybuttontexturehoverall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var categorytexturehoverall = new BABYLON.DynamicTexture(moldname + "-categorytexturehover-", {width: 512,height: 512}, scene, true);
		categorytexturehoverall.name = moldname + "-categorytexturehover-";
		/* categorytexturehoverall.hasAlpha = true; */
		categorybuttontexturehoverall.diffuseTexture = categorytexturehoverall;
		categorybuttontexturehoverall.diffuseTexture.vScale = .11;
		categorybuttontexturehoverall.diffuseTexture.uScale = 1;
		categorybuttontexturehoverall.diffuseTexture.vOffset = .88;
		categorybuttonhoverall.material = categorybuttontexturehoverall;
		WTW.wrapText(categorybuttonhoverall, "All", "45px", "40px", "center", "top", "yellow", 0, 0);
		WTW.registerMouseOver(categorybuttonhoverall);
		incy -= 1;
		if (response != null) {
			for (var i=0;i<response.length;i++) {
				if (response[i] != null) {
					var categoryid = response[i].id;
					var categoryname = response[i].name;
					var categoryslug = response[i].slug;
					if (categoryname != "") {
						var categorybutton = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybutton-" + categoryid, {}, scene);
						categorybutton.scaling = new BABYLON.Vector3(.2, lenz - 1, .9);
						categorybutton.position = new BABYLON.Vector3(-lenx/2 + .25, firsty + incy, 0);
						categorybutton.rotation.x = WTW.getRadians(-90);
						categorybutton.parent = basemold;

						var categorybuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexture-" + categoryid, scene);
						categorybuttontexture.alpha = 1;
						categorybuttontexture.specularColor = new BABYLON.Color3(.2, .2, .2);
						/* categorybuttontexture.emissiveColor = new BABYLON.Color3(1, 1, 1); */
						categorybuttontexture.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
						categorybuttontexture.diffuseColor = new BABYLON.Color3(.9, .9, .9);
						var categoryTexture = new BABYLON.DynamicTexture(moldname + "-categorybuttontexture-" + categoryid, {width: 512,height: 512}, scene, true);
						categoryTexture.name = moldname + "-categorybuttontexture-" + categoryid;
						/* categoryTexture.hasAlpha = true; */
						categorybuttontexture.diffuseTexture = categoryTexture;
						categorybuttontexture.diffuseTexture.vScale = .11;
						categorybuttontexture.diffuseTexture.uScale = 1;
						categorybuttontexture.diffuseTexture.vOffset = .88;
						categorybutton.material = categorybuttontexture;
						WTW.wrapText(categorybutton, categoryname, "45px", "40px", "center", "top", "white", 0, 0);
						
						var categorybuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybuttonhover-" + categoryid, {}, scene);
						categorybuttonhover.scaling = new BABYLON.Vector3(.2, lenz - .99, .91);
						categorybuttonhover.position = new BABYLON.Vector3(-lenx/2 + .15, firsty + incy, 0);
						categorybuttonhover.rotation.x = WTW.getRadians(-90);
						categorybuttonhover.parent = basemold;
						
						var categorybuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexturehover-" + categoryid, scene);
						categorybuttontexturehover.alpha = 0;
						categorybuttontexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
						/* categorybuttontexturehover.emissiveColor = new BABYLON.Color3(1, 1, 1); */
						categorybuttontexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
						categorybuttontexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
						var categorytexturehover = new BABYLON.DynamicTexture(moldname + "-categorytexturehover-" + categoryid, {width: 512,height: 512}, scene, true);
						categorytexturehover.name = moldname + "-categorytexturehover-" + categoryid;
						/* categorytexturehover.hasAlpha = true; */
						categorybuttontexturehover.diffuseTexture = categorytexturehover;
						categorybuttontexturehover.diffuseTexture.vScale = .11;
						categorybuttontexturehover.diffuseTexture.uScale = 1;
						categorybuttontexturehover.diffuseTexture.vOffset = .88;
						categorybuttonhover.material = categorybuttontexturehover;
						WTW.wrapText(categorybuttonhover, categoryname, "45px", "40px", "center", "top", "yellow", 0, 0);
						WTW.registerMouseOver(categorybuttonhover);

						if (lasty > firsty + incy) {
							categorybutton.visibility = 0;
							categorybuttonhover.visibility = 0;
							
							if (once == 0) {
								var upbutton = BABYLON.MeshBuilder.CreateBox(moldname + "-upbutton", {}, scene);
								upbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
								upbutton.position = new BABYLON.Vector3(-lenx/2 + .4, firsty + 1.1, -lenz/2 + .75);
								upbutton.rotation.x = WTW.getRadians(-90);
								upbutton.parent = basemold;
								
								var upbuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-upbutton", scene);
								upbuttontexture.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrollup.jpg", scene);
								upbutton.material = upbuttontexture;
								upbutton.visibility = 0;

								var upbuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-upbuttonhover", {}, scene);
								upbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
								upbuttonhover.position = new BABYLON.Vector3(-lenx/2 + .4, firsty + 1.1, -lenz/2 + .75);
								upbuttonhover.rotation.x = WTW.getRadians(-90);
								upbuttonhover.parent = basemold;
								
								var upbuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-upbuttonhover", scene);
								upbuttontexturehover.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrollup2.jpg", scene);
								upbuttonhover.material = upbuttontexturehover;
								upbuttonhover.material.alpha = 0;
								WTW.registerMouseOver(upbuttonhover);
								upbuttonhover.visibility = 0;

								var downbutton = BABYLON.MeshBuilder.CreateBox(moldname + "-downbutton", {}, scene);
								downbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
								downbutton.position = new BABYLON.Vector3(-lenx/2 + .4, lasty, -lenz/2 + .75);
								downbutton.rotation.x = WTW.getRadians(-90);
								downbutton.parent = basemold;
								
								var downbuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-downbutton", scene);
								downbuttontexture.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrolldown.jpg", scene);
								downbutton.material = downbuttontexture;

								var downbuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-downbuttonhover", {}, scene);
								downbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
								downbuttonhover.position = new BABYLON.Vector3(-lenx/2 + .4, lasty, -lenz/2 + .75);
								downbuttonhover.rotation.x = WTW.getRadians(-90);
								downbuttonhover.parent = basemold;
								
								var downbuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-downbuttonhover", scene);
								downbuttontexturehover.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrolldown2.jpg", scene);
								downbuttonhover.material = downbuttontexturehover;
								downbuttonhover.material.alpha = 0;
								WTW.registerMouseOver(downbuttonhover);
								once = 1;
							}
						}
						incy -= 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productLoadCategories=" + ex.message);
	}  
}

WTWJS.prototype.productSelectCategoryScroll = function(moldname, increment) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var catbuttonname = moldname.replace("downbuttonhover","categorybutton").replace("upbuttonhover","categorybutton");
		var storecategories = scene.getMeshByID(catbuttonname.replace("-categorybutton",""));
		var upbutton = scene.getMeshByID(catbuttonname.replace("categorybutton","upbutton"));
		var upbuttonhover = scene.getMeshByID(catbuttonname.replace("categorybutton","upbuttonhover"));
		var downbutton = scene.getMeshByID(catbuttonname.replace("categorybutton","downbutton"));
		var downbuttonhover = scene.getMeshByID(catbuttonname.replace("categorybutton","downbuttonhover"));
		var move = 0;
		if (upbutton != null && upbuttonhover != null) {
			if (increment < 0 && upbutton.visibility == 1) {
				move = 1;
			}
		}
		if (downbutton != null && downbuttonhover != null) {
			if (increment > 0 && downbutton.visibility == 1) {
				move = 1;
			}
		}
		if (storecategories != null && move == 1) {
			var leny = storecategories.scaling.y;
			var firsty = leny * .42;
			var lasty = -leny * .42;
			var showup = 0;
			var showdown = 0;
			for (var i=0;i<scene.meshes.length;i++) {
				if (scene.meshes[i] != null) {
					if (scene.meshes[i].id != undefined) {
						if (scene.meshes[i].id.indexOf(catbuttonname) > -1) {
							var catbutton = scene.getMeshByID(scene.meshes[i].id);
							if (catbutton != null) {
								catbutton.position.y += increment;
								if (catbutton.position.y > firsty) {
									catbutton.visibility = 0;
									showup = 1;
								} else if (catbutton.position.y < lasty) {
									catbutton.visibility = 0;
									showdown = 1;
								} else {
									catbutton.visibility = 1;
								}
							}
						}
					}
				}
			}
			if (upbutton != null && upbuttonhover != null) {
				if (showup == 1) {
					upbutton.visibility = 1;
					upbuttonhover.visibility = 1;
				} else {
					upbutton.visibility = 0;
					upbuttonhover.visibility = 0;
				}
			}
			if (downbutton != null && downbuttonhover != null) {
				if (showdown == 1) {
					downbutton.visibility = 1;
					downbuttonhover.visibility = 1;
				} else {
					downbutton.visibility = 0;
					downbuttonhover.visibility = 0;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productSelectCategoryScroll=" + ex.message);
	}  
}

WTWJS.prototype.productClearForSearchResults = function(connectinggridid, connectinggridind) {
	try {
		for (var i=0;i<WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				if (WTW.buildingMolds[i].store.allowsearch != undefined) {
					if (WTW.buildingMolds[i].store.allowsearch == '1' && WTW.buildingMolds[i].connectinggridid == connectinggridid && WTW.buildingMolds[i].connectinggridind.toString() == connectinggridind.toString()) {
						WTW.buildingMolds[i].store.productid = "";
						WTW.buildingMolds[i].store.name = "";
						WTW.buildingMolds[i].store.slug = "";
						WTW.buildingMolds[i].store.price = "";
						WTW.buildingMolds[i].store.categoryid = "";
						WTW.buildingMolds[i].store.description = "";
						WTW.buildingMolds[i].store.shortdescription = "";
						WTW.buildingMolds[i].store.imageid = "";
						WTW.buildingMolds[i].store.imageurl = "";
					}	
				}
			}
		}
		for (var i=WTW.products.length;i > -1;i--) {
			if (WTW.products[i] != null) {
				if (WTW.products[i].connectinggridid == connectinggridid && WTW.products[i].connectinggridind.toString() == connectinggridind.toString()) {
					WTW.products.splice(i,1);
					i -= 1;
				}	
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productClearForSearchResults=" + ex.message);
	}  
}

WTWJS.prototype.productLoadSearchResults = function(moldname, connectinggridid, connectinggridind) {
	try {
		var pi = 0;
		for (var i=0;i<WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				if (WTW.buildingMolds[i].shape == 'storeproduct' && WTW.buildingMolds[i].store.allowsearch != undefined && WTW.buildingMolds[i].connectinggridid == connectinggridid && WTW.buildingMolds[i].connectinggridind.toString() == connectinggridind.toString()) {
					if (WTW.buildingMolds[i].store.allowsearch == '1' && WTW.products[pi] != null) {
						WTW.buildingMolds[i].store.storeurl = WTW.products[pi].storeurl;
						WTW.buildingMolds[i].store.wpplugin = WTW.products[pi].wpplugin;
						WTW.buildingMolds[i].store.productid = WTW.products[pi].productid;
						WTW.buildingMolds[i].store.name = WTW.products[pi].name;
						WTW.buildingMolds[i].store.slug = WTW.products[pi].slug;
						WTW.buildingMolds[i].store.price = WTW.products[pi].price;
						WTW.buildingMolds[i].store.imageid = WTW.products[pi].imageid;
						WTW.buildingMolds[i].store.imageurl = WTW.products[pi].imageurl;
						WTW.buildingMolds[i].store.categoryid = WTW.products[pi].categoryid;
						WTW.buildingMolds[i].store.description = WTW.products[pi].description;
						WTW.buildingMolds[i].store.shortdescription = WTW.products[pi].shortdescription;
						if (pi < WTW.products.length - 1) {
							pi += 1;
						} else {
							pi = 0;
						}
						WTW.setProduct(WTW.buildingMolds[i].store.productid + "|" + WTW.buildingMolds[i].store.slug, WTW.buildingMolds[i].moldname);
					}	
				}
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-productLoadSearchResults=" + ex.message);
	}  
}

WTWJS.prototype.getStoreInfo = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var buildingname = WTW.getBuildingName(moldnameparts.buildingid);
		if (moldnameparts.storewoocommerceapiurl != "" && buildingname == '') {
			var url = moldnameparts.storeurl + "/" + moldnameparts.wpplugin + "/storeinfo.php?walktheweb_store_info=1";
			WTW.getJSON(url, 
				function(response) {
					WTW.setStoreInfo(moldname, JSON.parse(response));
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getStoreInfo=" + ex.message);
	}  
}

WTWJS.prototype.setStoreInfo = function(moldname, response) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		for (var i=0;i<response.length;i++) {
			if (response[i] != null) {
				var storename = "";
				if (response[i].storename != undefined) {
					storename = WTW.decode(response[i].storename);
				}
				var titlemold2 = scene.getMeshByID(moldname + "-titleimage2");
				if (titlemold2 != null) {
					try {
						if (titlemold2.material.diffuseTexture != null) {
							titlemold2.material.diffuseTexture.dispose();
							titlemold2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (titlemold2.material != null) {
							titlemold2.material.dispose();
							titlemold2.material = null;
						}
					} catch(ex) {}
					var coveringtitle1 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage1texture", scene);
					coveringtitle1.alpha = 1;
					coveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
					/* coveringtitle1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
					coveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					coveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
					var contentTexture1 = new BABYLON.DynamicTexture(moldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
					contentTexture1.name = moldname + "-titleimage1texture";
					/* contentTexture1.hasAlpha = true; */
					coveringtitle1.diffuseTexture = contentTexture1;
					coveringtitle1.diffuseTexture.vScale = .5;
					coveringtitle1.diffuseTexture.uScale = 1;
					coveringtitle1.diffuseTexture.vOffset = .55;
					titlemold2.material = coveringtitle1;

					var namelength = WTW.decode(storename).length;
					var lineheigth = "140px";
					var fontheight = "140px";
					if (namelength > 238) {
						lineheigth = "20px";
						fontheight = "20px";
					} else if (namelength > 150) {
						lineheigth = "30px";
						fontheight = "30px";
					} else if (namelength > 70) {
						lineheigth = "40px";
						fontheight = "40px";
					} else if (namelength > 46) {
						lineheigth = "50px";
						fontheight = "42px";
					} else if (namelength > 21) {
						lineheigth = "80px";
						fontheight = "48px";
					} else if (namelength > 18) {
						lineheigth = "120px";
						fontheight = "50px";
					} else if (namelength > 14) {
						lineheigth = "130px";
						fontheight = "60px";
					} else if (namelength > 10) {
						lineheigth = "130px";
						fontheight = "70px";
					} else if (namelength > 6) {
						lineheigth = "120px";
						fontheight = "90px";
					}

					WTW.wrapText(titlemold2, WTW.decode(storename), lineheigth, fontheight, "center", "top", "white", 0, 0);
					i = response.length;
				}
			}
		}
		WTW.productClearFetchProducts(moldname);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setStoreInfo=" + ex.message);
	}  
}

WTWJS.prototype.getMoldnameParts = function(moldname) {
	var moldind = -1;
	var moldid = "";
	var cgind = -1;
	var cgid = "";
	var zcommunityid = "";
	var zbuildingid = "";
	var zthingid = "";
	var moldgroup = "building";
	var molds = WTW.buildingMolds;
	var namepart = [];
	var shape = "";
	var storeiframes = "";
	var storeurl = "";
	var wpplugin = "";
	var storecarturl = "";
	var storeproducturl = "";
	var storewoocommerceapiurl = "";
	var woocommercekey = "";
	var woocommercesecret = "";
	try {
		if (moldname == undefined) {
			moldname = dGet('wtw_tmoldname').value;
		}
		if (moldname.indexOf("-") > -1) {
			namepart = moldname.split('-');
			if (namepart[0] != null) {
				moldgroup = namepart[0].replace("molds","");
			}
			if (namepart[1] != null) {
				if (WTW.isNumeric(namepart[1])) {
					moldind = Number(namepart[1]);
				}
			}
			if (namepart[2] != null) {
				moldid = namepart[2];
			}
			if (namepart[3] != null) {
				if (WTW.isNumeric(namepart[3])) {
					cgind = Number(namepart[3]);
				}
			}
			if (namepart[4] != null) {
				cgid = namepart[4];
			}
			if (namepart[5] != null) {
				shape = namepart[5];
			}
			switch (moldgroup) {
				case "community":
					molds = WTW.communitiesMolds;
					break;
				case "thing":
					molds = WTW.thingMolds;
					break;
			}
			if (molds[moldind] != null) {
				if (molds[moldind].communityinfo.communityid != undefined) {
					zcommunityid = molds[moldind].communityinfo.communityid;
				}
				if (molds[moldind].buildinginfo.buildingid != undefined) {
					zbuildingid = molds[moldind].buildinginfo.buildingid;
				}
				if (molds[moldind].thinginfo.thingid != undefined) {
					zthingid = molds[moldind].thinginfo.thingid;
				}
			}
			if (WTW.connectingGrids[cgind] != null) {
				storeiframes = WTW.connectingGrids[cgind].buildinginfo.storeiframes.toString();
				storeurl = WTW.connectingGrids[cgind].buildinginfo.storeurl;
				wpplugin = WTW.connectingGrids[cgind].buildinginfo.wpplugin;
				storeproducturl = WTW.connectingGrids[cgind].buildinginfo.storeproducturl;
				storecarturl = WTW.connectingGrids[cgind].buildinginfo.storecarturl;
				storewoocommerceapiurl = WTW.connectingGrids[cgind].buildinginfo.storewoocommerceapiurl;
				woocommercekey = WTW.connectingGrids[cgind].buildinginfo.woocommercekey;
				woocommercesecret = WTW.connectingGrids[cgind].buildinginfo.woocommercesecret;
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getMoldnameParts=" + ex.message);
	}  
	return {
		moldname:moldname,
		moldind:moldind,
		moldid:moldid,
		cgind:cgind,
		cgid:cgid,
		communityid:zcommunityid,
		buildingid:zbuildingid,
		thingid:zthingid,
		moldgroup:moldgroup,
		molds:molds,
		shape:shape,
		namepart:namepart,
		storeiframes:storeiframes,
		storeurl:storeurl,
		wpplugin:wpplugin,
		storecarturl:storecarturl,
		storeproducturl:storeproducturl,
		storewoocommerceapiurl:storewoocommerceapiurl,
		woocommercekey:woocommercekey,
		woocommercesecret:woocommercesecret
	}
}

WTWJS.prototype.checkAnalytics = function(actionzoneind) {
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			var moldname = WTW.actionZones[actionzoneind].moldname;
			var actionzonename = WTW.actionZones[actionzoneind].actionzonename;
			var zcommunityid = WTW.actionZones[actionzoneind].communityinfo.communityid;
			var zbuildingid = WTW.actionZones[actionzoneind].buildinginfo.buildingid;
			var zthingid = WTW.actionZones[actionzoneind].thinginfo.thingid;
			if (moldname.indexOf("loadzone") > -1 && WTW.actionZones[actionzoneind].status == 0 && WTW.actionZones[actionzoneind].actionzonename.toLowerCase().indexOf("custom") == -1 && (zcommunityid != '' || zbuildingid != '' || zthingid != '')) {
				if (actionzonename == 'Extreme Load Zone') {
					WTW.trackPageView(actionzoneind, 'extreme');
				} else if (actionzonename == 'High - Load when far') {
					WTW.trackPageView(actionzoneind, 'high');
				} else if (actionzonename == 'Normal - Load when near') {
					WTW.trackPageView(actionzoneind, 'near');
				}
				/* alternative is to add to que then process */
				/* WTW.queueAnalytics(actionzoneind, 'extreme'); */
			}
		}
	} catch (ex) {
		WTW.log("core-checkAnalytics=" + ex.message);
	}
}

WTWJS.prototype.queueAnalytics = function(actionzoneind, distancename) {
	try {
		var analyticsqueueind = WTW.getNextCount(WTW.analyticsQueue);
		WTW.analyticsQueue[analyticsqueueind] = WTW.newAnalyticsQueue();
		WTW.analyticsQueue[analyticsqueueind].actionzoneind = actionzoneind;
		WTW.analyticsQueue[analyticsqueueind].distancename = distancename;
	} catch (ex) {
		WTW.log("core-queueAnalytics=" + ex.message);
	}
}

WTWJS.prototype.checkAnalyticsQueue = function() {
	try {
		if (WTW.analyticsQueue != null) {
			if (WTW.analyticsQueue.length > 0) {
				if (WTW.analyticsQueue[0] != null) {
					WTW.trackPageView(WTW.analyticsQueue[0].actionzoneind, WTW.analyticsQueue[0].distancename);
					WTW.analyticsQueue.splice(0, 1);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-checkAnalyticsQueue=" + ex.message);
	}
}

WTWJS.prototype.trackPageView = function(actionzoneind, distancename) {
	try {
		var zcommunityid = WTW.actionZones[Number(actionzoneind)].communityinfo.communityid;
		var zbuildingid = WTW.actionZones[Number(actionzoneind)].buildinginfo.buildingid;
		var zthingid = WTW.actionZones[Number(actionzoneind)].thinginfo.thingid;
		var analyticsid = "";
		var item = "";
		if (zcommunityid != "") {
			analyticsid = WTW.actionZones[Number(actionzoneind)].communityinfo.analyticsid;
			item = "community";
		}
		if (zbuildingid != "") {
			analyticsid = WTW.actionZones[Number(actionzoneind)].buildinginfo.analyticsid;
			item = "building";
		}
		if (zthingid != "") {
			analyticsid = WTW.actionZones[Number(actionzoneind)].thinginfo.analyticsid;
			item = "thing";
		}
		if (analyticsid != "" && analyticsid != undefined) {
			var zsrc = "";
			switch (item) {
				case "community":
					if (distancename == 'extreme') {
						zsrc = "/core/iframes/community-loaded-extreme.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else if (distancename == 'high') {
						zsrc = "/core/iframes/community-loaded-high.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else {
						zsrc = "/core/iframes/community-loaded-near.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					}
					break;
				case "building":
					if (distancename == 'extreme') {
						zsrc = "/core/iframes/building-loaded-extreme.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else if (distancename == 'high') {
						zsrc = "/core/iframes/building-loaded-high.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else {
						zsrc = "/core/iframes/building-loaded-near.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					}
					break;
				case "thing":
					if (distancename == 'extreme') {
						zsrc = "/core/iframes/thing-loaded-extreme.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else if (distancename == 'high') {
						zsrc = "/core/iframes/thing-loaded-high.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					} else {
						zsrc = "/core/iframes/thing-loaded-near.php?analyticsid=" + analyticsid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid;
					}
					break;
			} 
			if (zsrc != "") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					WTW.removeIFrame(ipage.getElementById('wtw_iframename').value);
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame(zsrc, onload);
			}
		} 
		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-trackPageView=" + ex.message);
	}
}

WTWJS.prototype.logOut = function() {
	try {
		WTW.hide('wtw_mainadminmode');
		WTW.hide('wtw_menuloggedin');
		WTW.hide('wtw_menuregister');
		WTW.hide('wtw_menupasswordrecovery');
		WTW.show('wtw_menulogin');
		WTW.show('wtw_loginnote');
		dGet('wtw_tuserid').value = "";
		dGet('wtw_tusername').value = "";
		dGet('wtw_tuploadpathid').value = "";
		dGet('wtw_loginerrortext').innerHTML = "";
		dGet('wtw_mainmenudisplayname').innerHTML = "Login";
		dGet('wtw_menudisplayname').innerHTML = '';
		dGet('wtw_tuseremail').value = "";
		dGet('wtw_menuusername').innerHTML = "";
		dGet('wtw_profileimagelg').src = "/content/system/images/menuprofilebig.png";
		dGet('wtw_profileimagesm').src = "/content/system/images/menuprofile32.png";
		if (window.location.href.indexOf("admin.php") > -1) {
			window.location.href = "//" + wtw_domainname + "/";
		} else {
			WTW.closeSetupMode();
			WTW.logoutMyAvatar();
		}
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_bendsession').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-logOut=" + ex.message);
	}
}

WTWJS.prototype.createIFrame = function(zsrc, zonloadfunction) {
	var iframe = null;
	try {
		if (dGet('wtw_iframesdiv') != null) {
			iframe = document.createElement('iframe');
			iframe.id = "iframe-" + WTW.getRandomString(16);
			iframe.submitted = "0";
			dGet('wtw_iframesdiv').appendChild(iframe);
			iframe.onload = function() {
				if (iframe.submitted == "0") {
					var ipage = iframe.contentDocument || iframe.contentWindow.document;
					ipage.getElementById('wtw_iframename').value = iframe.id;
					zonloadfunction(ipage);
					iframe.submitted = "1";
				}
			}
			iframe.src = zsrc;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-createIframe=" + ex.message);
	}
	return iframe;
}

WTWJS.prototype.removeIFrame = function(wtw_iframename) {
	try {
		if (dGet(wtw_iframename) != null) {
			if (dGet(wtw_iframename).submitted == "1") {
				dGet(wtw_iframename).parentNode.removeChild(dGet(wtw_iframename));
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-removeIFrame=" + ex.message);
	}
}

WTWJS.prototype.createAccount = function() {
	try {
		/* NEEDED add validation */
		var request = {
			'newlogin':btoa(dGet('wtw_tnewlogin').value),
			'newemail':btoa(dGet('wtw_tnewemail').value),
			'newpassword':btoa(dGet('wtw_tnewpassword').value)
		};
		var onload = function(ipage) {
			ipage.getElementById('wtw_tusername').value = request.newlogin;
			ipage.getElementById('wtw_tuseremail').value = request.newemail;
			ipage.getElementById('wtw_tpassword').value = request.newpassword;
			ipage.getElementById('wtw_bregister').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-createAccount=" + ex.message);
	}
}

WTWJS.prototype.createAccountComplete = function() {
	try {

	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-createAccountComplete=" + ex.message);
	}
}

WTWJS.prototype.loginAttempt = function() {
	try {
		if (dGet('wtw_trememberlogin').checked == true) {
			WTW.setCookie("rememberlogin", dGet('wtw_tlogin').value, 365);
		} else {
			WTW.deleteCookie("rememberlogin");
		}
		dGet('wtw_loginerrortext').innerHTML = "";
		var email = "";
		var username = "";
		if (dGet('wtw_tlogin').value.indexOf('@') > -1) {
			email = dGet('wtw_tlogin').value;
		} else {
			username = dGet('wtw_tlogin').value;
		}
		var request = {
			'username':btoa(username),
			'email':btoa(email),
			'password':btoa(dGet('wtw_tpassword').value)
		}
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tusername').value = request.username;
			ipage.getElementById('wtw_tuseremail').value = request.email;
			ipage.getElementById('wtw_tpassword').value = request.password;
			ipage.getElementById('wtw_blogin').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loginAttempt=" + ex.message);
	}
}
	
WTWJS.prototype.loginAttemptResponse = function(results) {
	try {
		var serror = "";
		if (results != null) {
			if (results.serror != undefined) {
				if (results.serror != '') {
					serror = results.serror;
					dGet('wtw_tuserid').value = '';
					dGet('wtw_tusername').value = '';
					dGet('wtw_tuseremail').value = '';
					dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
					dGet('wtw_menudisplayname').innerHTML = 'Login';
					dGet('wtw_tuserimageurl').value = "";
					dGet('wtw_menuusername').innerHTML = 'Login';
					dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
					dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';
				}
				if (results.userid != '') {
					WTW.setLoginValues(results.userid, results.username, results.displayname, results.email, results.userimageurl);
					WTW.disposeClean("myavatar-" + dGet("wtw_tinstanceid").value);
				}
			}
		}
		if (serror != "") {
			dGet('wtw_loginerrortext').innerHTML = serror;
			WTW.show('wtw_loginerrortext');
		} else {
			dGet('wtw_loginerrortext').innerHTML = "";
			WTW.hide('wtw_loginerrortext');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-loginAttemptResponse=" + ex.message);
	}
}

WTWJS.prototype.setLoginValues = function(zuserid, zusername, zdisplayname, zemail, zuserimageurl) {
	try {
		if (zuserid == undefined) {
			zuserid = dGet('wtw_tuserid').value;
		} else {
			dGet('wtw_tuserid').value = zuserid;
		}
		if (zusername == undefined) {
			zusername = dGet('wtw_tusername').value;
		} else {
			dGet('wtw_tusername').value = zusername;
		}
		if (zdisplayname == undefined) {
			zdisplayname = dGet('wtw_tavatardisplayname').value;
		} else {
			dGet('wtw_tavatardisplayname').value = zdisplayname;
		}
		if (zemail == undefined) {
			zemail = dGet('wtw_tuseremail').value;
		} else {
			dGet('wtw_tuseremail').value = zemail;
		}
		if (zuserimageurl == undefined) {
			zuserimageurl = dGet('wtw_tuserimageurl').value;
		} else {
			dGet('wtw_tuserimageurl').value = zuserimageurl;
		}
		if (zdisplayname != '' && zdisplayname != undefined && zdisplayname != 'undefined') {
			dGet('wtw_mainmenudisplayname').innerHTML = zdisplayname;
			dGet('wtw_menudisplayname').innerHTML = zdisplayname;
		} else if (zusername != '' && zusername != undefined && zusername != 'undefined') {
			dGet('wtw_mainmenudisplayname').innerHTML = zusername;
			dGet('wtw_menudisplayname').innerHTML = zusername;
			zdisplayname = zusername;
		}
		dGet('wtw_teditdisplayname').value = zdisplayname;
		dGet('wtw_teditusername').value = zusername;
		dGet('wtw_menuusername').innerHTML = zusername;
		dGet('wtw_teditemail').value = zemail;
		dGet('wtw_menuemail').innerHTML = zemail;
		if (zuserimageurl != '' && zuserimageurl != undefined) {	
			dGet('wtw_profileimagelg').src = zuserimageurl;
			dGet('wtw_profileimagesm').src = zuserimageurl;
		}
		WTW.hide('wtw_menulogin');
		WTW.hide('wtw_menupasswordrecovery');
		WTW.hide('wtw_menuregister');
		WTW.hide('wtw_loginnote');
		WTW.show('wtw_mainadminmode');
		WTW.show('wtw_menuloggedin');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-setLoginValues=" + ex.message);
	}
}

WTWJS.prototype.editProfile = function() {
	try {
		WTW.hide('wtw_menudisplayname');
		WTW.hide('wtw_menuusername');
		WTW.hide('wtw_menuemail');
		WTW.showInline('wtw_teditdisplayname');
		WTW.showInline('wtw_teditusername');
		WTW.showInline('wtw_teditemail');
		WTW.show('wtw_menusaveprofile');
		WTW.show('wtw_menucancelsaveprofile');
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-editProfile=" + ex.message);
	}
}

WTWJS.prototype.saveProfile = function() {
	try {
		/* validate entries... */
		var request = {
			'myavatarid':dGet('wtw_tmyavatarid').value,
			'instanceid':dGet('wtw_tinstanceid').value,
			'username':dGet('wtw_teditusername').value,
			'useremail':dGet('wtw_teditemail').value,
			'displayname':dGet('wtw_teditdisplayname').value
		}
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
			ipage.getElementById('wtw_tinstanceid').value = request.instanceid;
			ipage.getElementById('wtw_tusername').value = request.username;
			ipage.getElementById('wtw_tuseremail').value = request.useremail;
			ipage.getElementById('wtw_tdisplayname').value = request.displayname;
			ipage.getElementById('wtw_bsaveprofile').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);		

		WTW.hide('wtw_teditdisplayname');
		WTW.hide('wtw_teditusername');
		WTW.hide('wtw_teditemail');
		WTW.hide('wtw_menusaveprofile');
		WTW.hide('wtw_menucancelsaveprofile');
		dGet('wtw_menudisplayname').innerHTML = dGet('wtw_teditdisplayname').value;
		dGet('wtw_tavatardisplayname').value = dGet('wtw_teditdisplayname').value;
		dGet('wtw_menuusername').innerHTML = dGet('wtw_teditusername').value;
		dGet('wtw_menuemail').innerHTML = dGet('wtw_teditemail').value;
		WTW.showInline('wtw_menudisplayname');
		WTW.showInline('wtw_menuusername');
		WTW.showInline('wtw_menuemail');
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-saveProfile=" + ex.message);
	}
}

WTWJS.prototype.saveProfileComplete = function(response) {
	try {
		dGet('wtw_profileerrortext').innerHTML = response;
		WTW.showSettingsMenu('wtw_menuprofile');
		window.setTimeout(function() {
			dGet('wtw_profileerrortext').innerHTML = '';
			WTW.showSettingsMenu('wtw_menuprofile');
		},5000);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-saveProfileComplete=" + ex.message);
	}
}

WTWJS.prototype.cancelEditProfile = function() {
	try {
		WTW.hide('wtw_teditdisplayname');
		WTW.hide('wtw_teditusername');
		WTW.hide('wtw_teditemail');
		WTW.hide('wtw_menusaveprofile');
		WTW.hide('wtw_menucancelsaveprofile');
		WTW.showInline('wtw_menudisplayname');
		WTW.showInline('wtw_menuusername');
		WTW.showInline('wtw_menuemail');
		dGet('wtw_teditdisplayname').value = dGet('wtw_menudisplayname').innerHTML;
		dGet('wtw_teditusername').value = dGet('wtw_menuusername').innerHTML;
		dGet('wtw_teditemail').value = dGet('wtw_menuemail').innerHTML;
		WTW.showSettingsMenu('wtw_menuprofile');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-cancelEditProfile=" + ex.message);
	}
}

WTWJS.prototype.scorePassword = function(zpassword) {
	var score = 0;
	try {
		if (zpassword != undefined) {
			/* points for every unique letter until 5 repetitions */
			var letters = new Object();
			for (var i=0; i<zpassword.length; i++) {
				letters[zpassword[i]] = (letters[zpassword[i]] || 0) + 1;
				score += 5.0 / letters[zpassword[i]];
			}
			/* bonus points for complexity */
			var variations = {
				digits: /\d/.test(zpassword),
				lower: /[a-z]/.test(zpassword),
				upper: /[A-Z]/.test(zpassword),
				nonWords: /\W/.test(zpassword),
			}
			variationCount = 0;
			for (var check in variations) {
				variationCount += (variations[check] == true) ? 1 : 0;
			}
			score += (variationCount - 1) * 10;
			score = parseInt(score);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-scorePassword=" + ex.message);
	}
    return score;
}

WTWJS.prototype.checkPasswordStrength = function(zpassword) {
	score = 0;
	zvalue = "Poor Password";
	zcolor = "#F87777";
	try {
		var score = WTW.scorePassword(zpassword);
		if (score > 80) {
			zvalue = "Strong Password";
			zcolor = "#77F893";
		} else if (score > 60) {
			zvalue = "Good Password";
			zcolor = "#DEF877";
		} else if (score >= 30) {
			zvalue = "Weak Password";
			zcolor = "#F8DB77";
		} else {
			zvalue = "Poor Password";
			zcolor = "#F87777";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkPasswordStrength=" + ex.message);
	}
    return {
		'score': score,
		'value': zvalue,
		'color': zcolor };
}

WTWJS.prototype.checkPassword = function(zpasswordtextbox, metername) {
	try {
		var check = WTW.checkPasswordStrength(zpasswordtextbox.value);
		if (zpasswordtextbox.value.length > 0) {
			WTW.show(metername);
		} else {
			WTW.hide(metername);
		}
		if (dGet(metername) != null) {
			dGet(metername).value = check.value;
			dGet(metername).style.textAlign = 'center';
			dGet(metername).style.backgroundColor = check.color;
			if (check.score > 80) {
				dGet(metername).style.borderColor = 'green';
			} else {
				dGet(metername).style.borderColor = 'gray';
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkPassword=" + ex.message);
	}
}

WTWJS.prototype.checkPasswordConfirm = function(zpassword, zpassword2, zerrortext) {
	try {
		if (dGet(zpassword) != null && dGet(zpassword2) != null && dGet(zerrortext) != null) {
			dGet(zerrortext).innerHTML = "";
			if (dGet(zpassword).value != dGet(zpassword2).value) {
				dGet(zerrortext).innerHTML = "Passwords do not match.";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-checkPasswordConfirm=" + ex.message);
	}
}

WTWJS.prototype.getSetting = function(zsetting, zjsfunction, zjsparameters) {
	try {
		WTW.getSettings(zsetting, zjsfunction, zjsparameters);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getSetting=" + ex.message);
	}
}

WTWJS.prototype.getSettings = function(zsettings, zjsfunction, zjsparameters) {
	try {
		if (zjsparameters == undefined) {
			zjsparameters = "";
		}
		var zrequest = {
			'settings':zsettings,
			'jsfunction':zjsfunction,
			'jsparameters':zjsparameters
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tsettings').value = zrequest.settings;
			ipage.getElementById('wtw_tjsfunction').value = zrequest.jsfunction;
			ipage.getElementById('wtw_tjsparameters').value = zrequest.jsparameters;
			ipage.getElementById('wtw_bgetsettings').click(); 
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getSettings=" + ex.message);
	}
}

WTWJS.prototype.returnSettings = function(zsettings, zjsfunction, zjsparameters) {
	try {
		WTW.executeFunctionByName(zjsfunction, window, zsettings, zjsparameters);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-returnSettings=" + ex.message);
	}
}

WTWJS.prototype.saveSetting = function(zsetting, zvalue, zjsfunction, zjsparameters) {
	try {
		if (zjsparameters == undefined) {
			zjsparameters = "";
		}
		var zrequest = {
			'setting':zsetting,
			'value':zvalue,
			'jsfunction':zjsfunction,
			'jsparameters':zjsparameters
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tsetting').value = zrequest.setting;
			ipage.getElementById('wtw_tvalue').value = zrequest.value;
			ipage.getElementById('wtw_tjsfunction').value = zrequest.jsfunction;
			ipage.getElementById('wtw_tjsparameters').value = zrequest.jsparameters;
			ipage.getElementById('wtw_bsavesetting').click(); 
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-saveSetting=" + ex.message);
	}
}

WTWJS.prototype.saveSettings = function(zsettings, zjsfunction, zjsparameters) {
	try {
		if (zjsparameters == undefined) {
			zjsparameters = "";
		}
		var zrequest = {
			'settings':zsettings,
			'jsfunction':zjsfunction,
			'jsparameters':zjsparameters
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tsettings').value = JSON.stringify(zrequest.settings);
			ipage.getElementById('wtw_tjsfunction').value = zrequest.jsfunction;
			ipage.getElementById('wtw_tjsparameters').value = zrequest.jsparameters;
			ipage.getElementById('wtw_bsavesettings').click(); 
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-saveSettings=" + ex.message);
	}
}

WTWJS.prototype.executeFunctionByName = function(zjsfunction, context /*, args */) {
	var func = null;
	var args = null;
	var zfunction = null;
	try {
		args = Array.prototype.slice.call(arguments, 2);
		var namespaces = zjsfunction.split(".");
		func = namespaces.pop();
		for(var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		if (typeof context[func] == 'function') {
			zfunction = context[func].apply(context, args);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-executeFunctionByName=" + ex.message);
	}
	return zfunction;
}

WTWJS.prototype.getUserAccessList = function() {
	try {
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_bgetuseraccesslist').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getUserAccessList=" + ex.message);
	}
}

WTWJS.prototype.updateUserAccessList = function(permissionslist, inviteeresponse) {
	try {
		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-updateUserAccessList=" + ex.message);
	}
}

