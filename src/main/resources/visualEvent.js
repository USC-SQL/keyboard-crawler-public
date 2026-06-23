(function() {
	
	if( typeof VisualEvent!='undefined' ) {
		if ( VisualEvent.instance !== null ) {
			VisualEvent.close();
		}
		else {
			new VisualEvent();
		}
	}
	else {
		var n=document.createElement('script');
		n.setAttribute('language','JavaScript');
        //n.setAttribute('src','http://localhost/VisualEvent_Loader.js');
        //n.text = "console.log('kkkkk')";
        n.text =        "(function(window, document){\n" + 
        "\n" + 
        "/*global VisualEvent,VisualEvent_Loader*/\n" + 
        "\n" + 
        "if ( typeof VisualEvent_Loader == 'undefined' ) {\n" + 
        "\n" + 
        "/** \n" + 
        " * VisualEvent_Loader is a class which will provide pre-loading of Javascript and CSS files\n" + 
        " * for VisualEvent based on the environment the script is running in (for example if jQuery is\n" + 
        " * already available or not).\n" + 
        " * \n" + 
        " *  @class VisualEvent_Loader\n" + 
        " *  @constructor\n" + 
        " * \n" + 
        " *  @example\n" + 
        " *     new VisualEvent_Loader();\n" + 
        "*/\n" + 
        "window.VisualEvent_Loader = function ()\n" + 
        "{\n" + 
        "	/* Sanity check */\n" + 
        "	if ( ! this instanceof VisualEvent_Loader ) {\n" + 
        "		alert( \"VisualEvent loader warning: Must be initialised with the 'new' keyword.\" );\n" + 
        "		return;\n" + 
        "	}\n" + 
        "\n" + 
        "	/**\n" + 
        "	 * Settings object containing the settings information for the instance\n" + 
        "	 *  @namespace\n" + 
        "	 */\n" + 
        "	this.s = {\n" + 
        "		/** \n" + 
        "		 * Flag to indicate if loading has finished or not. False until the required JS classes are\n" + 
        "		 * found to be available.\n" + 
        "		 *  @type     boolean\n" + 
        "		 *  @default  false\n" + 
        "		 */\n" + 
        "		\"loadingComplete\": false\n" + 
        "	};\n" + 
        "\n" + 
        "	/**\n" + 
        "	 * DOM elements used by the instance\n" + 
        "	 *  @namespace\n" + 
        "	 */\n" + 
        "	this.dom = {\n" + 
        "		/** \n" + 
        "		 * Visual Label to show the end user that Visual Event is being loaded\n" + 
        "		 *  @type     element\n" + 
        "		 *  @default  div\n" + 
        "		 */\n" + 
        "		\"loading\": document.createElement('div')\n" + 
        "	};\n" + 
        "\n" + 
        "	this._construct();\n" + 
        "};\n" + 
        "\n" + 
        "\n" + 
        "VisualEvent_Loader.prototype = {\n" + 
        "	/**\n" + 
        "	 * Constrctor - show a loading element to the end user and then load up the various files\n" + 
        "	 * that are needed\n" + 
        "	 *  @returns {undefined}\n" + 
        "	 *  @private\n" + 
        "	 */\n" + 
        "	\"_construct\": function ()\n" + 
        "	{\n" + 
        "		var that = this,\n" + 
        "			loading,\n" + 
        "			style,\n" + 
        "			protocol = window.location.protocol === 'file:' ?\n" + 
        "				'http:' : '';\n" + 
        "\n" + 
        "		/* Check to see if already loaded */\n" + 
        "		if ( this.s.loadingComplete === true ) {\n" + 
        "			return 0;\n" + 
        "		}\n" + 
        "\n" + 
        "		/* Store a static flag to let the VisualEvent instance know if jQuery was already available on\n" + 
        "		 * the page or not - used in the \"close\" method\n" + 
        "		 */\n" + 
        "		VisualEvent_Loader.jQueryPreLoaded = (typeof jQuery == 'undefined') ? false : true;\n" + 
        "\n" + 
        "		/* Start the polling for ready */\n" + 
        "		if ( typeof VisualEvent == 'object' ) {\n" + 
        "			this._pollReady();\n" + 
        "			return; // Don't need to load any files if its already loaded\n" + 
        "		}\n" + 
        "		else {\n" + 
        "			setTimeout( function () {\n" + 
        "				that._pollReady();\n" + 
        "			}, 1000 );\n" + 
        "		}\n" + 
        "\n" + 
        "		/* Load the required files - note that the token //localhost/VisualEvent/builds/VisualEvent-1565252870 is replaced by the build\n" + 
        "		 * script with the location of the combined Visual Event file (i.e. with the parsers included\n" + 
        "		 */\n" + 
        "		this._loadFile( 'http://localhost/css/VisualEvent.css', 'css' );\n" + 
        "		if ( typeof jQuery == 'undefined' ) {\n" + 
        "			this._loadFile( '', 'vsjq' );\n" + 
        "		}\n" + 
        "		else {\n" + 
        "			this._loadFile( '', 'vs' );\n" + 
        "		}\n" + 
        "	},\n" + 
        "\n" + 
        "\n" + 
        "	/**\n" + 
        "	 * Load a new file into the DOM, and have it processed based on its type. This can be a\n" + 
        "	 * Javascript file, a CSS file or an image\n" + 
        "	 *  @param {string} file URL to the file to load\n" + 
        "	 *  @param {string} type The file type. Can be \"css\", \"js\" or \"image\"\n" + 
        "	 *  @returns {undefined}\n" + 
        "	 *  @private\n" + 
        "	 */\n" + 
        "	\"_loadFile\": function ( file, type )\n" + 
        "	{\n" + 
        "		var n, img;\n" + 
        "\n" + 
        "		if ( type == 'css' ) {\n" + 
        "			n = document.createElement('link');\n" + 
        "			n.type = 'text/css';\n" + 
        "			n.rel = 'stylesheet';\n" + 
        "			n.href = file;\n" + 
        "			n.media = 'screen';\n" + 
        "			document.getElementsByTagName('head')[0].appendChild( n );\n" + 
        "		}\n" + 
        "		else if ( type == 'image' ) {\n" + 
        "			img = new Image( 1, 1 );\n" + 
        "			img.src = file;\n" + 
        "		}\n" + 
        "		else if ( type == 'vs' ) {\n" + 
        "			n = document.createElement( 'script' );\n" + 
        "			n.setAttribute( 'language', 'JavaScript' );\n" + 
        "			n.text = \"(function () {\\n\" + \n" + 
        "			\"/*!\\n\" + \n" + 
        "			\" * XRegExp 2.0.0 <xregexp.com> MIT License\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"var XRegExp;XRegExp=XRegExp||function(n){\\\"use strict\\\";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?\\\"g\\\":\\\"\\\")+(n.ignoreCase?\\\"i\\\":\\\"\\\")+(n.multiline?\\\"m\\\":\\\"\\\")+(n.extended?\\\"x\\\":\\\"\\\")+(n.sticky?\\\"y\\\":\\\"\\\")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError(\\\"type RegExp expected\\\");var f=i.replace.call(g(n)+(r||\\\"\\\"),h,\\\"\\\");return u&&(f=i.replace.call(f,new RegExp(\\\"[\\\"+u+\\\"]+\\\",\\\"g\\\"),\\\"\\\")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()===\\\"[object \\\"+t+\\\"]\\\"}function d(n){return n=n||{},n===\\\"all\\\"||n.all?n={natives:!0,extensibility:!0}:s(n,\\\"string\\\")&&(n=t.forEach(n,/[^\\\\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope===\\\"all\\\"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?\\\"on\\\":\\\"off\\\"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e=\\\"default\\\",rt=\\\"class\\\",it={\\\"default\\\":/^(?:\\\\\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\\\d*|x[\\\\dA-Fa-f]{2}|u[\\\\dA-Fa-f]{4}|c[A-Za-z]|[\\\\s\\\\S])|\\\\(\\\\?[:=!]|[?*+]\\\\?|{\\\\d+(?:,\\\\d*)?}\\\\??)/,\\\"class\\\":/^(?:\\\\\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\\\dA-Fa-f]{2}|u[\\\\dA-Fa-f]{4}|c[A-Za-z]|[\\\\s\\\\S]))/},et=/\\\\$(?:{([\\\\w$]+)}|(\\\\d\\\\d?|[\\\\s\\\\S]))/g,h=/([\\\\s\\\\S])(?=[\\\\s\\\\S]*\\\\1)/g,nt=/^(?:[?*+]|{\\\\d+(?:,\\\\d*)?})\\\\??/,ft=i.exec.call(/()??/,\\\"\\\")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w=\\\"gim\\\"+(l?\\\"y\\\":\\\"\\\");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError(\\\"can't supply flags when constructing one RegExp from another\\\");return o(r)}if(y)throw new Error(\\\"can't call the XRegExp constructor within token definition functions\\\");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?\\\"\\\":String(r),u=u===n?\\\"\\\":String(u),i.match.call(u,h))throw new SyntaxError(\\\"invalid duplicate regular expression flag\\\");for(r=i.replace.call(r,/^\\\\(\\\\?([\\\\w$]+)\\\\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError(\\\"can't use flag g or y in mode modifier\\\");return u=i.replace.call(u+t,h,\\\"\\\"),\\\"\\\"}),t.forEach(u,/[\\\\s\\\\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError(\\\"invalid regular expression flag \\\"+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p===\\\"[\\\"?a=rt:p===\\\"]\\\"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(\\\"\\\"),i.replace.call(u,/[^gimy]+/g,\\\"\\\")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,\\\"g\\\"+(l?\\\"y\\\":\\\"\\\")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,\\\"\\\"))},off:function(){throw new Error(\\\"extensibility must be installed before using addToken\\\");}},t.addToken=c.off,t.cache=function(n,i){var r=n+\\\"/\\\"+(i||\\\"\\\");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\\\\]{}()*+?.,\\\\\\\\^$|#\\\\s]/g,\\\"\\\\\\\\$&\\\")},t.exec=function(n,t,i,u){var e=o(t,\\\"g\\\"+(u&&l?\\\"y\\\":\\\"\\\"),u===!1?\\\"y\\\":\\\"\\\"),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,\\\"g\\\")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,\\\"regexp\\\")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||\\\"\\\":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e=\\\"all\\\"),s=o(u,e===\\\"all\\\"?\\\"g\\\":\\\"\\\",e===\\\"all\\\"?\\\"\\\":\\\"g\\\")):e===\\\"all\\\"&&(s=new RegExp(t.escape(String(u)),\\\"g\\\")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\\\\()(?!\\\\?)|\\\\\\\\([1-9]\\\\d*)|\\\\\\\\[\\\\s\\\\S]|\\\\[(?:[^\\\\\\\\\\\\]]|\\\\\\\\[\\\\s\\\\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return\\\"(?<\\\"+r+\\\">\\\"}else if(i)return\\\"\\\\\\\\\\\"+(+i+f);return n},e=[],r,u;if(!(s(n,\\\"array\\\")&&n.length))throw new TypeError(\\\"patterns must be a nonempty array\\\");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join(\\\"|\\\"),i)},t.version=\\\"2.0.0\\\",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,\\\"\\\")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),\\\"g\\\",\\\"\\\")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+=\\\"\\\",s(r,\\\"function\\\")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||\\\"\\\";if(f=u?a(u,i):-1,f<0)throw new SyntaxError(\\\"backreference to undefined group \\\"+t);return n[f+1]||\\\"\\\"}if(r===\\\"$\\\")return\\\"$\\\";if(r===\\\"&\\\"||+r==0)return n[0];if(r===\\\"`\\\")return n[n.length-1].slice(0,n[n.length-2]);if(r===\\\"'\\\")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError(\\\"backreference to undefined group \\\"+t);return n[r]||\\\"\\\"}throw new SyntaxError(\\\"invalid token \\\"+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,\\\"\\\")||s)&&f.push(\\\"\\\"):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\\\\\\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\\\\dA-Fa-f]{4})|x(?![\\\\dA-Fa-f]{2}))/,function(n,t){if(n[1]===\\\"B\\\"&&t===e)return n[0];throw new SyntaxError(\\\"invalid escape \\\"+n[0]);},{scope:\\\"all\\\"}),u(/\\\\[(\\\\^?)]/,function(n){return n[1]?\\\"[\\\\\\\\s\\\\\\\\S]\\\":\\\"\\\\\\\\b\\\\\\\\B\\\"}),u(/(?:\\\\(\\\\?#[^)]*\\\\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?\\\"\\\":\\\"(?:)\\\"}),u(/\\\\\\\\k<([\\\\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError(\\\"backreference to undefined group \\\"+n[0]);return\\\"\\\\\\\\\\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?\\\"\\\":\\\"(?:)\\\")}),u(/(?:\\\\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?\\\"\\\":\\\"(?:)\\\"},{trigger:function(){return this.hasFlag(\\\"x\\\")},customFlags:\\\"x\\\"}),u(/\\\\./,function(){return\\\"[\\\\\\\\s\\\\\\\\S]\\\"},{trigger:function(){return this.hasFlag(\\\"s\\\")},customFlags:\\\"s\\\"}),u(/\\\\(\\\\?P?<([\\\\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError(\\\"can't use integer as capture name \\\"+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,\\\"(\\\"}),u(/\\\\\\\\(\\\\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!==\\\"0\\\")throw new SyntaxError(\\\"can't use octal escape or backreference to undefined group \\\"+n[0]);return n[0]},{scope:\\\"all\\\"}),u(/\\\\((?!\\\\?)/,function(){return this.hasFlag(\\\"n\\\")?\\\"(?:\\\":(this.captureNames.push(null),\\\"(\\\")},{customFlags:\\\"n\\\"}),typeof exports!=\\\"undefined\\\"&&(exports.XRegExp=t),t}()\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*!\\n\" + \n" + 
        "			\" * SyntaxHighlighter by Alex Gorbatchev\\n\" + \n" + 
        "			\" * https://github.com/alexgorbatchev/SyntaxHighlighter - MIT license\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"//\\n\" + \n" + 
        "			\"// Begin anonymous function. This is used to contain local scope variables without polutting global scope.\\n\" + \n" + 
        "			\"//\\n\" + \n" + 
        "			\"if (typeof(VisualEventSyntaxHighlighter) == 'undefined') var VisualEventSyntaxHighlighter = function() {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// CommonJS\\n\" + \n" + 
        "			\"if (typeof(require) != 'undefined' && typeof(XRegExp) == 'undefined')\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    XRegExp = require('xregexp').XRegExp;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Shortcut object which will be assigned to the SyntaxHighlighter variable.\\n\" + \n" + 
        "			\"// This is a shorthand for local reference in order to avoid long namespace\\n\" + \n" + 
        "			\"// references to SyntaxHighlighter.whatever...\\n\" + \n" + 
        "			\"var sh = {\\n\" + \n" + 
        "			\"    defaults : {\\n\" + \n" + 
        "			\"        /** Additional CSS class names to be added to highlighter elements. */\\n\" + \n" + 
        "			\"        'class-name' : '',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** First line number. */\\n\" + \n" + 
        "			\"        'first-line' : 1,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Pads line numbers. Possible values are:\\n\" + \n" + 
        "			\"         *\\n\" + \n" + 
        "			\"         *   false - don't pad line numbers.\\n\" + \n" + 
        "			\"         *   true  - automaticaly pad numbers with minimum required number of leading zeroes.\\n\" + \n" + 
        "			\"         *   [int] - length up to which pad line numbers.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        'pad-line-numbers' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Lines to highlight. */\\n\" + \n" + 
        "			\"        'highlight' : null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Title to be displayed above the code block. */\\n\" + \n" + 
        "			\"        'title' : null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables smart tabs. */\\n\" + \n" + 
        "			\"        'smart-tabs' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Gets or sets tab size. */\\n\" + \n" + 
        "			\"        'tab-size' : 4,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables gutter. */\\n\" + \n" + 
        "			\"        'gutter' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables toolbar. */\\n\" + \n" + 
        "			\"        'toolbar' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables quick code copy and paste from double click. */\\n\" + \n" + 
        "			\"        'quick-code' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Forces code view to be collapsed. */\\n\" + \n" + 
        "			\"        'collapse' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables automatic links. */\\n\" + \n" + 
        "			\"        'auto-links' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Gets or sets light mode. Equavalent to turning off gutter and toolbar. */\\n\" + \n" + 
        "			\"        'light' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        'unindent' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        'html-script' : false\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    config : {\\n\" + \n" + 
        "			\"        space : '&nbsp;',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables use of <SCRIPT type=\\\"syntaxhighlighter\\\" /> tags. */\\n\" + \n" + 
        "			\"        useScriptTags : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Blogger mode flag. */\\n\" + \n" + 
        "			\"        bloggerMode : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        stripBrs : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Name of the tag that SyntaxHighlighter will automatically look for. */\\n\" + \n" + 
        "			\"        tagName : 'pre',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        strings : {\\n\" + \n" + 
        "			\"            expandSource : 'expand source',\\n\" + \n" + 
        "			\"            help : '?',\\n\" + \n" + 
        "			\"            alert: 'VisualEventSyntaxHighlighter\\\\n\\\\n',\\n\" + \n" + 
        "			\"            noBrush : 'Can\\\\'t find brush for: ',\\n\" + \n" + 
        "			\"            brushNotHtmlScript : 'Brush wasn\\\\'t configured for html-script option: ',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // this is populated by the build script\\n\" + \n" + 
        "			\"            aboutDialog : '<%- about %>'\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** Internal 'global' variables. */\\n\" + \n" + 
        "			\"    vars : {\\n\" + \n" + 
        "			\"        discoveredBrushes : null,\\n\" + \n" + 
        "			\"        highlighters : {}\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** This object is populated by user included external brush files. */\\n\" + \n" + 
        "			\"    brushes : {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** Common regular expressions. */\\n\" + \n" + 
        "			\"    regexLib : {\\n\" + \n" + 
        "			\"        multiLineCComments          : XRegExp('/\\\\\\\\*.*?\\\\\\\\*/', 'gs'),\\n\" + \n" + 
        "			\"        singleLineCComments         : /\\\\/\\\\/.*$/gm,\\n\" + \n" + 
        "			\"        singleLinePerlComments      : /#.*$/gm,\\n\" + \n" + 
        "			\"        doubleQuotedString          : /\\\"([^\\\\\\\\\\\"\\\\n]|\\\\\\\\.)*\\\"/g,\\n\" + \n" + 
        "			\"        singleQuotedString          : /'([^\\\\\\\\'\\\\n]|\\\\\\\\.)*'/g,\\n\" + \n" + 
        "			\"        multiLineDoubleQuotedString : XRegExp('\\\"([^\\\\\\\\\\\\\\\\\\\"]|\\\\\\\\\\\\\\\\.)*\\\"', 'gs'),\\n\" + \n" + 
        "			\"        multiLineSingleQuotedString : XRegExp(\\\"'([^\\\\\\\\\\\\\\\\']|\\\\\\\\\\\\\\\\.)*'\\\", 'gs'),\\n\" + \n" + 
        "			\"        xmlComments                 : XRegExp('(&lt;|<)!--.*?--(&gt;|>)', 'gs'),\\n\" + \n" + 
        "			\"        url                         : /\\\\w+:\\\\/\\\\/[\\\\w-.\\\\/?%&=:@;#]*/g,\\n\" + \n" + 
        "			\"        phpScriptTags               : { left: /(&lt;|<)\\\\?(?:=|php)?/g, right: /\\\\?(&gt;|>)/g, 'eof' : true },\\n\" + \n" + 
        "			\"        aspScriptTags               : { left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g },\\n\" + \n" + 
        "			\"        scriptScriptTags            : { left: /(&lt;|<)\\\\s*script.*?(&gt;|>)/gi, right: /(&lt;|<)\\\\/\\\\s*script\\\\s*(&gt;|>)/gi }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    toolbar: {\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Generates HTML markup for the toolbar.\\n\" + \n" + 
        "			\"         * @param {Highlighter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\"         * @return {String} Returns HTML markup.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        getHtml: function(highlighter)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var html = '<div class=\\\"toolbar\\\">',\\n\" + \n" + 
        "			\"                items = sh.toolbar.items,\\n\" + \n" + 
        "			\"                list = items.list\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            function defaultGetHtml(highlighter, name)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                return sh.toolbar.getButtonHtml(highlighter, name, sh.config.strings[name]);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var i = 0, l = list.length; i < l; i++)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                html += (items[list[i]].getHtml || defaultGetHtml)(highlighter, list[i]);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += '</div>';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            return html;\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Generates HTML markup for a regular button in the toolbar.\\n\" + \n" + 
        "			\"         * @param {Highlighter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\"         * @param {String} commandName      Command name that would be executed.\\n\" + \n" + 
        "			\"         * @param {String} label            Label text to display.\\n\" + \n" + 
        "			\"         * @return {String}                 Returns HTML markup.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        getButtonHtml: function(highlighter, commandName, label)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            return '<span><a href=\\\"#\\\" class=\\\"toolbar_item'\\n\" + \n" + 
        "			\"                + ' command_' + commandName\\n\" + \n" + 
        "			\"                + ' ' + commandName\\n\" + \n" + 
        "			\"                + '\\\">' + label + '</a></span>'\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Event handler for a toolbar anchor.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        handler: function(e)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var target = e.target,\\n\" + \n" + 
        "			\"                className = target.className || ''\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            function getValue(name)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var r = new RegExp(name + '_(\\\\\\\\w+)'),\\n\" + \n" + 
        "			\"                    match = r.exec(className)\\n\" + \n" + 
        "			\"                    ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                return match ? match[1] : null;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var highlighter = getHighlighterById(findParentElement(target, '.Event_syntaxHighlighter').id),\\n\" + \n" + 
        "			\"                commandName = getValue('command')\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // execute the toolbar command\\n\" + \n" + 
        "			\"            if (highlighter && commandName)\\n\" + \n" + 
        "			\"                sh.toolbar.items[commandName].execute(highlighter);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // disable default A click behaviour\\n\" + \n" + 
        "			\"            e.preventDefault();\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Collection of toolbar items. */\\n\" + \n" + 
        "			\"        items : {\\n\" + \n" + 
        "			\"            // Ordered lis of items in the toolbar. Can't expect `for (var n in items)` to be consistent.\\n\" + \n" + 
        "			\"            list: ['expandSource', 'help'],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            expandSource: {\\n\" + \n" + 
        "			\"                getHtml: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    if (highlighter.getParam('collapse') != true)\\n\" + \n" + 
        "			\"                        return '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    var title = highlighter.getParam('title');\\n\" + \n" + 
        "			\"                    return sh.toolbar.getButtonHtml(highlighter, 'expandSource', title ? title : sh.config.strings.expandSource);\\n\" + \n" + 
        "			\"                },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                execute: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    var div = getHighlighterDivById(highlighter.id);\\n\" + \n" + 
        "			\"                    removeClass(div, 'collapsed');\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"            },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            /** Command to display the about dialog window. */\\n\" + \n" + 
        "			\"            help: {\\n\" + \n" + 
        "			\"                execute: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    var wnd = popup('', '_blank', 500, 250, 'scrollbars=0'),\\n\" + \n" + 
        "			\"                        doc = wnd.document\\n\" + \n" + 
        "			\"                        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    doc.write(sh.config.strings.aboutDialog);\\n\" + \n" + 
        "			\"                    doc.close();\\n\" + \n" + 
        "			\"                    wnd.focus();\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Finds all elements on the page which should be processes by SyntaxHighlighter.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} globalParams     Optional parameters which override element's\\n\" + \n" + 
        "			\"     *                                  parameters. Only used if element is specified.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} element  Optional element to highlight. If none is\\n\" + \n" + 
        "			\"     *                          provided, all elements in the current document\\n\" + \n" + 
        "			\"     *                          are returned which qualify.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @return {Array}  Returns list of <code>{ target: DOMElement, params: Object }</code> objects.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    findElements: function(globalParams, element)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var elements = element ? [element] : toArray(document.getElementsByTagName(sh.config.tagName)),\\n\" + \n" + 
        "			\"            conf = sh.config,\\n\" + \n" + 
        "			\"            result = []\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // support for <SCRIPT TYPE=\\\"syntaxhighlighter\\\" /> feature\\n\" + \n" + 
        "			\"        if (conf.useScriptTags)\\n\" + \n" + 
        "			\"            elements = elements.concat(getSyntaxHighlighterScriptTags());\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (elements.length === 0)\\n\" + \n" + 
        "			\"            return result;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = elements.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var item = {\\n\" + \n" + 
        "			\"                target: elements[i],\\n\" + \n" + 
        "			\"                // local params take precedence over globals\\n\" + \n" + 
        "			\"                params: merge(globalParams, parseParams(elements[i].className))\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (item.params['brush'] == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            result.push(item);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return result;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Shorthand to highlight all elements on the page that are marked as\\n\" + \n" + 
        "			\"     * SyntaxHighlighter source code.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} globalParams     Optional parameters which override element's\\n\" + \n" + 
        "			\"     *                                  parameters. Only used if element is specified.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} element  Optional element to highlight. If none is\\n\" + \n" + 
        "			\"     *                          provided, all elements in the current document\\n\" + \n" + 
        "			\"     *                          are highlighted.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    highlight: function(globalParams, element)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var elements = this.findElements(globalParams, element),\\n\" + \n" + 
        "			\"            propertyName = 'innerHTML',\\n\" + \n" + 
        "			\"            highlighter = null,\\n\" + \n" + 
        "			\"            conf = sh.config\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (elements.length === 0)\\n\" + \n" + 
        "			\"            return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = elements.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var element = elements[i],\\n\" + \n" + 
        "			\"                target = element.target,\\n\" + \n" + 
        "			\"                params = element.params,\\n\" + \n" + 
        "			\"                brushName = params.brush,\\n\" + \n" + 
        "			\"                code\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (brushName == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // Instantiate a brush\\n\" + \n" + 
        "			\"            if (params['html-script'] == 'true' || sh.defaults['html-script'] == true)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                highlighter = new sh.HtmlScript(brushName);\\n\" + \n" + 
        "			\"                brushName = 'htmlscript';\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"            else\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var brush = findBrush(brushName);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (brush)\\n\" + \n" + 
        "			\"                    highlighter = new brush();\\n\" + \n" + 
        "			\"                else\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            code = target[propertyName];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // remove CDATA from <SCRIPT/> tags if it's present\\n\" + \n" + 
        "			\"            if (conf.useScriptTags)\\n\" + \n" + 
        "			\"                code = stripCData(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // Inject title if the attribute is present\\n\" + \n" + 
        "			\"            if ((target.title || '') != '')\\n\" + \n" + 
        "			\"                params.title = target.title;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            params['brush'] = brushName;\\n\" + \n" + 
        "			\"            highlighter.init(params);\\n\" + \n" + 
        "			\"            element = highlighter.getDiv(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // carry over ID\\n\" + \n" + 
        "			\"            if ((target.id || '') != '')\\n\" + \n" + 
        "			\"                element.id = target.id;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            target.parentNode.replaceChild(element, target);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Main entry point for the SyntaxHighlighter.\\n\" + \n" + 
        "			\"     * @param {Object} params Optional params to apply to all highlighted elements.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    all: function(params)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        attachEvent(\\n\" + \n" + 
        "			\"            window,\\n\" + \n" + 
        "			\"            'load',\\n\" + \n" + 
        "			\"            function() { sh.highlight(params); }\\n\" + \n" + 
        "			\"        );\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}; // end of sh\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Checks if target DOM elements has specified CSS class.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element to check.\\n\" + \n" + 
        "			\" * @param {String} className Name of the CSS class to check for.\\n\" + \n" + 
        "			\" * @return {Boolean} Returns true if class name is present, false otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function hasClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return target.className.indexOf(className) != -1;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Adds CSS class name to the target DOM element.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element.\\n\" + \n" + 
        "			\" * @param {String} className New CSS class to add.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function addClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (!hasClass(target, className))\\n\" + \n" + 
        "			\"        target.className += ' ' + className;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Removes CSS class name from the target DOM element.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element.\\n\" + \n" + 
        "			\" * @param {String} className CSS class to remove.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function removeClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    target.className = target.className.replace(className, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Converts the source to array object. Mostly used for function arguments and\\n\" + \n" + 
        "			\" * lists returned by getElementsByTagName() which aren't Array objects.\\n\" + \n" + 
        "			\" * @param {List} source Source list.\\n\" + \n" + 
        "			\" * @return {Array} Returns array.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function toArray(source)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = source.length; i < l; i++)\\n\" + \n" + 
        "			\"        result.push(source[i]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Splits block of text into lines.\\n\" + \n" + 
        "			\" * @param {String} block Block of text.\\n\" + \n" + 
        "			\" * @return {Array} Returns array of lines.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function splitLines(block)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return block.split(/\\\\r?\\\\n/);\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Generates HTML ID for the highlighter.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {String} Returns HTML ID.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterId(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var prefix = 'highlighter_';\\n\" + \n" + 
        "			\"    return id.indexOf(prefix) == 0 ? id : prefix + id;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds Highlighter instance by ID.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {Highlighter} Returns instance of the highlighter.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterById(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return sh.vars.highlighters[getHighlighterId(id)];\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds highlighter's DIV container.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {Element} Returns highlighter's DIV element.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterDivById(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return document.getElementById(getHighlighterId(id));\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Stores highlighter so that getHighlighterById() can do its thing. Each\\n\" + \n" + 
        "			\" * highlighter must call this method to preserve itself.\\n\" + \n" + 
        "			\" * @param {Highilghter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function storeHighlighter(highlighter)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    sh.vars.highlighters[getHighlighterId(highlighter.id)] = highlighter;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Looks for a child or parent node which has specified classname.\\n\" + \n" + 
        "			\" * Equivalent to jQuery's $(container).find(\\\".className\\\")\\n\" + \n" + 
        "			\" * @param {Element} target Target element.\\n\" + \n" + 
        "			\" * @param {String} search Class name or node name to look for.\\n\" + \n" + 
        "			\" * @param {Boolean} reverse If set to true, will go up the node tree instead of down.\\n\" + \n" + 
        "			\" * @return {Element} Returns found child or parent element on null.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findElement(target, search, reverse /* optional */)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (target == null)\\n\" + \n" + 
        "			\"        return null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var nodes           = reverse != true ? target.childNodes : [ target.parentNode ],\\n\" + \n" + 
        "			\"        propertyToFind  = { '#' : 'id', '.' : 'className' }[search.substr(0, 1)] || 'nodeName',\\n\" + \n" + 
        "			\"        expectedValue,\\n\" + \n" + 
        "			\"        found\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    expectedValue = propertyToFind != 'nodeName'\\n\" + \n" + 
        "			\"        ? search.substr(1)\\n\" + \n" + 
        "			\"        : search.toUpperCase()\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // main return of the found node\\n\" + \n" + 
        "			\"    if ((target[propertyToFind] || '').indexOf(expectedValue) != -1)\\n\" + \n" + 
        "			\"        return target;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = nodes.length; nodes && i < l && found == null; i++)\\n\" + \n" + 
        "			\"        found = findElement(nodes[i], search, reverse);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return found;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Looks for a parent node which has specified classname.\\n\" + \n" + 
        "			\" * This is an alias to <code>findElement(container, className, true)</code>.\\n\" + \n" + 
        "			\" * @param {Element} target Target element.\\n\" + \n" + 
        "			\" * @param {String} className Class name to look for.\\n\" + \n" + 
        "			\" * @return {Element} Returns found parent element on null.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findParentElement(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return findElement(target, className, true);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds an index of element in the array.\\n\" + \n" + 
        "			\" * @ignore\\n\" + \n" + 
        "			\" * @param {Object} searchElement\\n\" + \n" + 
        "			\" * @param {Number} fromIndex\\n\" + \n" + 
        "			\" * @return {Number} Returns index of element if found; -1 otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function indexOf(array, searchElement, fromIndex)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    fromIndex = Math.max(fromIndex || 0, 0);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = fromIndex, l = array.length; i < l; i++)\\n\" + \n" + 
        "			\"        if(array[i] == searchElement)\\n\" + \n" + 
        "			\"            return i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return -1;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Generates a unique element ID.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function guid(prefix)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return (prefix || '') + Math.round(Math.random() * 1000000).toString();\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Merges two objects. Values from obj2 override values in obj1.\\n\" + \n" + 
        "			\" * Function is NOT recursive and works only for one dimensional objects.\\n\" + \n" + 
        "			\" * @param {Object} obj1 First object.\\n\" + \n" + 
        "			\" * @param {Object} obj2 Second object.\\n\" + \n" + 
        "			\" * @return {Object} Returns combination of both objects.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function merge(obj1, obj2)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = {}, name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (name in obj1)\\n\" + \n" + 
        "			\"        result[name] = obj1[name];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (name in obj2)\\n\" + \n" + 
        "			\"        result[name] = obj2[name];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Attempts to convert string to boolean.\\n\" + \n" + 
        "			\" * @param {String} value Input string.\\n\" + \n" + 
        "			\" * @return {Boolean} Returns true if input was \\\"true\\\", false if input was \\\"false\\\" and value otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function toBoolean(value)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = { \\\"true\\\" : true, \\\"false\\\" : false }[value];\\n\" + \n" + 
        "			\"    return result == null ? value : result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Opens up a centered popup window.\\n\" + \n" + 
        "			\" * @param {String} url      URL to open in the window.\\n\" + \n" + 
        "			\" * @param {String} name     Popup name.\\n\" + \n" + 
        "			\" * @param {int} width       Popup width.\\n\" + \n" + 
        "			\" * @param {int} height      Popup height.\\n\" + \n" + 
        "			\" * @param {String} options  window.open() options.\\n\" + \n" + 
        "			\" * @return {Window}         Returns window instance.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function popup(url, name, width, height, options)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var x = (screen.width - width) / 2,\\n\" + \n" + 
        "			\"        y = (screen.height - height) / 2\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    options +=  ', left=' + x +\\n\" + \n" + 
        "			\"                ', top=' + y +\\n\" + \n" + 
        "			\"                ', width=' + width +\\n\" + \n" + 
        "			\"                ', height=' + height\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"    options = options.replace(/^,/, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var win = window.open(url, name, options);\\n\" + \n" + 
        "			\"    win.focus();\\n\" + \n" + 
        "			\"    return win;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Adds event handler to the target object.\\n\" + \n" + 
        "			\" * @param {Object} obj      Target object.\\n\" + \n" + 
        "			\" * @param {String} type     Name of the event.\\n\" + \n" + 
        "			\" * @param {Function} func   Handling function.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function attachEvent(obj, type, func, scope)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    function handler(e)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        e = e || window.event;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (!e.target)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            e.target = e.srcElement;\\n\" + \n" + 
        "			\"            e.preventDefault = function()\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                this.returnValue = false;\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        func.call(scope || window, e);\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (obj.attachEvent)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        obj.attachEvent('on' + type, handler);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"    else\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        obj.addEventListener(type, handler, false);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Displays an alert.\\n\" + \n" + 
        "			\" * @param {String} str String to display.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function alert(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    window.alert(sh.config.strings.alert + str);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds a brush by its alias.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} alias        Brush alias.\\n\" + \n" + 
        "			\" * @param {Boolean} showAlert   Suppresses the alert if false.\\n\" + \n" + 
        "			\" * @return {Brush}              Returns bursh constructor if found, null otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findBrush(alias, showAlert)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var brushes = sh.vars.discoveredBrushes,\\n\" + \n" + 
        "			\"        result = null\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (brushes == null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        brushes = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // Find all brushes\\n\" + \n" + 
        "			\"        for (var brush in sh.brushes)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var info = sh.brushes[brush],\\n\" + \n" + 
        "			\"                aliases = info.aliases\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (aliases == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // keep the brush name\\n\" + \n" + 
        "			\"            info.brushName = brush.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var i = 0, l = aliases.length; i < l; i++)\\n\" + \n" + 
        "			\"                brushes[aliases[i]] = brush;\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        sh.vars.discoveredBrushes = brushes;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    result = sh.brushes[brushes[alias]];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (result == null && showAlert)\\n\" + \n" + 
        "			\"        alert(sh.config.strings.noBrush + alias);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Executes a callback on each line and replaces each line with result from the callback.\\n\" + \n" + 
        "			\" * @param {Object} str          Input string.\\n\" + \n" + 
        "			\" * @param {Object} callback     Callback function taking one string argument and returning a string.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function eachLine(str, callback)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(str);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        lines[i] = callback(lines[i], i);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // include \\\\r to enable copy-paste on windows (ie8) without getting everything on one line\\n\" + \n" + 
        "			\"    return lines.join('\\\\r\\\\n');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * This is a special trim which only removes first and last empty lines\\n\" + \n" + 
        "			\" * and doesn't affect valid leading space on the first line.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   Input string\\n\" + \n" + 
        "			\" * @return {String}      Returns string without empty first and last lines.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function trimFirstAndLastLines(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return str.replace(/^[ ]*[\\\\n]+|[\\\\n]*[ ]*$/g, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Parses key/value pairs into hash object.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * Understands the following formats:\\n\" + \n" + 
        "			\" * - name: word;\\n\" + \n" + 
        "			\" * - name: [word, word];\\n\" + \n" + 
        "			\" * - name: \\\"string\\\";\\n\" + \n" + 
        "			\" * - name: 'string';\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * For example:\\n\" + \n" + 
        "			\" *   name1: value; name2: [value, value]; name3: 'value'\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str    Input string.\\n\" + \n" + 
        "			\" * @return {Object}       Returns deserialized object.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function parseParams(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var match,\\n\" + \n" + 
        "			\"        result = {},\\n\" + \n" + 
        "			\"        arrayRegex = XRegExp(\\\"^\\\\\\\\[(?<values>(.*?))\\\\\\\\]$\\\"),\\n\" + \n" + 
        "			\"        pos = 0,\\n\" + \n" + 
        "			\"        regex = XRegExp(\\n\" + \n" + 
        "			\"            \\\"(?<name>[\\\\\\\\w-]+)\\\" +\\n\" + \n" + 
        "			\"            \\\"\\\\\\\\s*:\\\\\\\\s*\\\" +\\n\" + \n" + 
        "			\"            \\\"(?<value>\\\" +\\n\" + \n" + 
        "			\"                \\\"[\\\\\\\\w%#-]+|\\\" +      // word\\n\" + \n" + 
        "			\"                \\\"\\\\\\\\[.*?\\\\\\\\]|\\\" +      // [] array\\n\" + \n" + 
        "			\"                '\\\".*?\\\"|' +          // \\\"\\\" string\\n\" + \n" + 
        "			\"                \\\"'.*?'\\\" +           // '' string\\n\" + \n" + 
        "			\"            \\\")\\\\\\\\s*;?\\\",\\n\" + \n" + 
        "			\"            \\\"g\\\"\\n\" + \n" + 
        "			\"        )\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while ((match = XRegExp.exec(str, regex, pos)) != null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var value = match.value\\n\" + \n" + 
        "			\"            .replace(/^['\\\"]|['\\\"]$/g, '') // strip quotes from end of strings\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // try to parse array value\\n\" + \n" + 
        "			\"        if (value != null && arrayRegex.test(value))\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var m = XRegExp.exec(value, arrayRegex);\\n\" + \n" + 
        "			\"            value = m.values.length > 0 ? m.values.split(/\\\\s*,\\\\s*/) : [];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        result[match.name] = value;\\n\" + \n" + 
        "			\"        pos = match.index + match[0].length;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // AJJ - markdown style language option\\n\" + \n" + 
        "			\"    var a = str.match(/language-(.*)/);\\n\" + \n" + 
        "			\"    if ( a ) {\\n\" + \n" + 
        "			\"        result['brush'] = a[1];\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Wraps each line of the string into <code/> tag with given style applied to it.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   Input string.\\n\" + \n" + 
        "			\" * @param {String} css   Style name to apply to the string.\\n\" + \n" + 
        "			\" * @return {String}      Returns input string with each line surrounded by <span/> tag.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function wrapLinesWithCode(str, css)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (str == null || str.length == 0 || str == '\\\\n')\\n\" + \n" + 
        "			\"        return str;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    str = str.replace(/</g, '&lt;');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Replace two or more sequential spaces with &nbsp; leaving last space untouched.\\n\" + \n" + 
        "			\"    str = str.replace(/ {2,}/g, function(m)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var spaces = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = m.length; i < l - 1; i++)\\n\" + \n" + 
        "			\"            spaces += sh.config.space;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return spaces + ' ';\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Split each line and apply <span class=\\\"...\\\">...</span> to them so that\\n\" + \n" + 
        "			\"    // leading spaces aren't included.\\n\" + \n" + 
        "			\"    if (css != null)\\n\" + \n" + 
        "			\"        str = eachLine(str, function(line)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                return '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var spaces = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            line = line.replace(/^(&nbsp;| )+/, function(s)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                spaces = s;\\n\" + \n" + 
        "			\"                return '';\\n\" + \n" + 
        "			\"            });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                return spaces;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            return spaces + '<code class=\\\"' + css + '\\\">' + line + '</code>';\\n\" + \n" + 
        "			\"        });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return str;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Pads number with zeros until it's length is the same as given length.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {Number} number   Number to pad.\\n\" + \n" + 
        "			\" * @param {Number} length   Max string length with.\\n\" + \n" + 
        "			\" * @return {String}         Returns a string padded with proper amount of '0'.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function padNumber(number, length)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = number.toString();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while (result.length < length)\\n\" + \n" + 
        "			\"        result = '0' + result;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Replaces tabs with spaces.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code     Source code.\\n\" + \n" + 
        "			\" * @param {Number} tabSize  Size of the tab.\\n\" + \n" + 
        "			\" * @return {String}         Returns code with all tabs replaces by spaces.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processTabs(code, tabSize)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var tab = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0; i < tabSize; i++)\\n\" + \n" + 
        "			\"        tab += ' ';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code.replace(/\\\\t/g, tab);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Replaces tabs with smart spaces.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code    Code to fix the tabs in.\\n\" + \n" + 
        "			\" * @param {Number} tabSize Number of spaces in a column.\\n\" + \n" + 
        "			\" * @return {String}        Returns code with all tabs replaces with roper amount of spaces.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processSmartTabs(code, tabSize)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(code),\\n\" + \n" + 
        "			\"        tab = '\\\\t',\\n\" + \n" + 
        "			\"        spaces = ''\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Create a string with 1000 spaces to copy spaces from...\\n\" + \n" + 
        "			\"    // It's assumed that there would be no indentation longer than that.\\n\" + \n" + 
        "			\"    for (var i = 0; i < 50; i++)\\n\" + \n" + 
        "			\"        spaces += '                    '; // 20 spaces * 50\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // This function inserts specified amount of spaces in the string\\n\" + \n" + 
        "			\"    // where a tab is while removing that given tab.\\n\" + \n" + 
        "			\"    function insertSpaces(line, pos, count)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return line.substr(0, pos)\\n\" + \n" + 
        "			\"            + spaces.substr(0, count)\\n\" + \n" + 
        "			\"            + line.substr(pos + 1, line.length) // pos + 1 will get rid of the tab\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Go through all the lines and do the 'smart tabs' magic.\\n\" + \n" + 
        "			\"    code = eachLine(code, function(line)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        if (line.indexOf(tab) == -1)\\n\" + \n" + 
        "			\"            return line;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var pos = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        while ((pos = line.indexOf(tab)) != -1)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            // This is pretty much all there is to the 'smart tabs' logic.\\n\" + \n" + 
        "			\"            // Based on the position within the line and size of a tab,\\n\" + \n" + 
        "			\"            // calculate the amount of spaces we need to insert.\\n\" + \n" + 
        "			\"            var spaces = tabSize - pos % tabSize;\\n\" + \n" + 
        "			\"            line = insertSpaces(line, pos, spaces);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return line;\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Performs various string fixes based on configuration.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function fixInputString(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var br = /<br\\\\s*\\\\/?>|&lt;br\\\\s*\\\\/?&gt;/gi;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (sh.config.bloggerMode == true)\\n\" + \n" + 
        "			\"        str = str.replace(br, '\\\\n');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (sh.config.stripBrs == true)\\n\" + \n" + 
        "			\"        str = str.replace(br, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return str;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Removes all white space at the begining and end of a string.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   String to trim.\\n\" + \n" + 
        "			\" * @return {String}      Returns string without leading and following white space characters.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function trim(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return str.replace(/^\\\\s+|\\\\s+$/g, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Unindents a block of text by the lowest common indent amount.\\n\" + \n" + 
        "			\" * @param {String} str   Text to unindent.\\n\" + \n" + 
        "			\" * @return {String}      Returns unindented text block.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function unindent(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(fixInputString(str)),\\n\" + \n" + 
        "			\"        indents = new Array(),\\n\" + \n" + 
        "			\"        regex = /^\\\\s*/,\\n\" + \n" + 
        "			\"        min = 1000\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // go through every line and check for common number of indents\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l && min > 0; i++)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var line = lines[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (trim(line).length == 0)\\n\" + \n" + 
        "			\"            continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var matches = regex.exec(line);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // In the event that just one line doesn't have leading white space\\n\" + \n" + 
        "			\"        // we can't unindent anything, so bail completely.\\n\" + \n" + 
        "			\"        if (matches == null)\\n\" + \n" + 
        "			\"            return str;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        min = Math.min(matches[0].length, min);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // trim minimum common number of white space from the begining of every line\\n\" + \n" + 
        "			\"    if (min > 0)\\n\" + \n" + 
        "			\"        for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"            lines[i] = lines[i].substr(min);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return lines.join('\\\\n');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Callback method for Array.sort() which sorts matches by\\n\" + \n" + 
        "			\" * index position and then by length.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {Match} m1    Left object.\\n\" + \n" + 
        "			\" * @param {Match} m2    Right object.\\n\" + \n" + 
        "			\" * @return {Number}     Returns -1, 0 or -1 as a comparison result.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function matchesSortCallback(m1, m2)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // sort matches by index first\\n\" + \n" + 
        "			\"    if(m1.index < m2.index)\\n\" + \n" + 
        "			\"        return -1;\\n\" + \n" + 
        "			\"    else if(m1.index > m2.index)\\n\" + \n" + 
        "			\"        return 1;\\n\" + \n" + 
        "			\"    else\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        // if index is the same, sort by length\\n\" + \n" + 
        "			\"        if(m1.length < m2.length)\\n\" + \n" + 
        "			\"            return -1;\\n\" + \n" + 
        "			\"        else if(m1.length > m2.length)\\n\" + \n" + 
        "			\"            return 1;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return 0;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Executes given regular expression on provided code and returns all\\n\" + \n" + 
        "			\" * matches that are found.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code    Code to execute regular expression on.\\n\" + \n" + 
        "			\" * @param {Object} regex   Regular expression item info from <code>regexList</code> collection.\\n\" + \n" + 
        "			\" * @return {Array}         Returns a list of Match objects.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getMatches(code, regexInfo)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    function defaultAdd(match, regexInfo)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return match[0];\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var index = 0,\\n\" + \n" + 
        "			\"        match = null,\\n\" + \n" + 
        "			\"        matches = [],\\n\" + \n" + 
        "			\"        func = regexInfo.func ? regexInfo.func : defaultAdd\\n\" + \n" + 
        "			\"        pos = 0\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while((match = XRegExp.exec(code, regexInfo.regex, pos)) != null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var resultMatch = func(match, regexInfo);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(resultMatch) == 'string')\\n\" + \n" + 
        "			\"            resultMatch = [new sh.Match(resultMatch, match.index, regexInfo.css)];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        matches = matches.concat(resultMatch);\\n\" + \n" + 
        "			\"        pos = match.index + match[0].length;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return matches;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Turns all URLs in the code into <a/> tags.\\n\" + \n" + 
        "			\" * @param {String} code Input code.\\n\" + \n" + 
        "			\" * @return {String} Returns code with </a> tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processUrls(code)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var gt = /(.*)((&gt;|&lt;).*)/;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code.replace(sh.regexLib.url, function(m)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var suffix = '',\\n\" + \n" + 
        "			\"            match = null\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // We include &lt; and &gt; in the URL for the common cases like <http://google.com>\\n\" + \n" + 
        "			\"        // The problem is that they get transformed into &lt;http://google.com&gt;\\n\" + \n" + 
        "			\"        // Where as &gt; easily looks like part of the URL string.\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (match = gt.exec(m))\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            m = match[1];\\n\" + \n" + 
        "			\"            suffix = match[2];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '<a href=\\\"' + m + '\\\">' + m + '</a>' + suffix;\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds all <SCRIPT TYPE=\\\"syntaxhighlighter\\\" /> elementss.\\n\" + \n" + 
        "			\" * @return {Array} Returns array of all found SyntaxHighlighter tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getSyntaxHighlighterScriptTags()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var tags = document.getElementsByTagName('script'),\\n\" + \n" + 
        "			\"        result = []\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = tags.length; i < l; i++)\\n\" + \n" + 
        "			\"        if (tags[i].type == 'Event_syntaxHighlighter')\\n\" + \n" + 
        "			\"            result.push(tags[i]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Strips <![CDATA[]]> from <SCRIPT /> content because it should be used\\n\" + \n" + 
        "			\" * there in most cases for XHTML compliance.\\n\" + \n" + 
        "			\" * @param {String} original Input code.\\n\" + \n" + 
        "			\" * @return {String} Returns code without leading <![CDATA[]]> tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function stripCData(original)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var left = '<![CDATA[',\\n\" + \n" + 
        "			\"        right = ']]>',\\n\" + \n" + 
        "			\"        // for some reason IE inserts some leading blanks here\\n\" + \n" + 
        "			\"        copy = trim(original),\\n\" + \n" + 
        "			\"        changed = false,\\n\" + \n" + 
        "			\"        leftLength = left.length,\\n\" + \n" + 
        "			\"        rightLength = right.length\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (copy.indexOf(left) == 0)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        copy = copy.substring(leftLength);\\n\" + \n" + 
        "			\"        changed = true;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var copyLength = copy.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (copy.indexOf(right) == copyLength - rightLength)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        copy = copy.substring(0, copyLength - rightLength);\\n\" + \n" + 
        "			\"        changed = true;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return changed ? copy : original;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Quick code mouse double click handler.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function quickCodeHandler(e)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var target = e.target,\\n\" + \n" + 
        "			\"        highlighterDiv = findParentElement(target, '.Event_syntaxHighlighter'),\\n\" + \n" + 
        "			\"        container = findParentElement(target, '.container'),\\n\" + \n" + 
        "			\"        textarea = document.createElement('textarea'),\\n\" + \n" + 
        "			\"        highlighter\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (!container || !highlighterDiv || findElement(container, 'textarea'))\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    highlighter = getHighlighterById(highlighterDiv.id);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // add source class name\\n\" + \n" + 
        "			\"    addClass(highlighterDiv, 'source');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Have to go over each line and grab it's text, can't just do it on the\\n\" + \n" + 
        "			\"    // container because Firefox loses all \\\\n where as Webkit doesn't.\\n\" + \n" + 
        "			\"    var lines = container.childNodes,\\n\" + \n" + 
        "			\"        code = []\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        code.push(lines[i].innerText || lines[i].textContent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // using \\\\r instead of \\\\r or \\\\r\\\\n makes this work equally well on IE, FF and Webkit\\n\" + \n" + 
        "			\"    code = code.join('\\\\r');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // For Webkit browsers, replace nbsp with a breaking space\\n\" + \n" + 
        "			\"    code = code.replace(/\\\\u00a0/g, \\\" \\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // inject <textarea/> tag\\n\" + \n" + 
        "			\"    textarea.appendChild(document.createTextNode(code));\\n\" + \n" + 
        "			\"    container.appendChild(textarea);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // preselect all text\\n\" + \n" + 
        "			\"    textarea.focus();\\n\" + \n" + 
        "			\"    textarea.select();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // set up handler for lost focus\\n\" + \n" + 
        "			\"    attachEvent(textarea, 'blur', function(e)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        textarea.parentNode.removeChild(textarea);\\n\" + \n" + 
        "			\"        removeClass(highlighterDiv, 'source');\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Match object.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.Match = function(value, index, css)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    this.value = value;\\n\" + \n" + 
        "			\"    this.index = index;\\n\" + \n" + 
        "			\"    this.length = value.length;\\n\" + \n" + 
        "			\"    this.css = css;\\n\" + \n" + 
        "			\"    this.brushName = null;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"sh.Match.prototype.toString = function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return this.value;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Simulates HTML code with a scripting language embedded.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} scriptBrushName Brush name of the scripting language.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.HtmlScript = function(scriptBrushName)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var brushClass = findBrush(scriptBrushName),\\n\" + \n" + 
        "			\"        scriptBrush,\\n\" + \n" + 
        "			\"        xmlBrush = new sh.brushes.Xml(),\\n\" + \n" + 
        "			\"        bracketsRegex = null,\\n\" + \n" + 
        "			\"        ref = this,\\n\" + \n" + 
        "			\"        methodsToExpose = 'getDiv getHtml init'.split(' ')\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (brushClass == null)\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    scriptBrush = new brushClass();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for(var i = 0, l = methodsToExpose.length; i < l; i++)\\n\" + \n" + 
        "			\"        // make a closure so we don't lose the name after i changes\\n\" + \n" + 
        "			\"        (function() {\\n\" + \n" + 
        "			\"            var name = methodsToExpose[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            ref[name] = function()\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                return xmlBrush[name].apply(xmlBrush, arguments);\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"        })();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (scriptBrush.htmlScript == null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        alert(sh.config.strings.brushNotHtmlScript + scriptBrushName);\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    xmlBrush.regexList.push(\\n\" + \n" + 
        "			\"        { regex: scriptBrush.htmlScript.code, func: process }\\n\" + \n" + 
        "			\"    );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function offsetMatches(matches, offset)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        for (var j = 0, l = matches.length; j < l; j++)\\n\" + \n" + 
        "			\"            matches[j].index += offset;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function process(match, info)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var code = match.code,\\n\" + \n" + 
        "			\"            matches = [],\\n\" + \n" + 
        "			\"            regexList = scriptBrush.regexList,\\n\" + \n" + 
        "			\"            offset = match.index + match.left.length,\\n\" + \n" + 
        "			\"            htmlScript = scriptBrush.htmlScript,\\n\" + \n" + 
        "			\"            result\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add all matches from the code\\n\" + \n" + 
        "			\"        for (var i = 0, l = regexList.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(code, regexList[i]);\\n\" + \n" + 
        "			\"            offsetMatches(result, offset);\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add left script bracket\\n\" + \n" + 
        "			\"        if (htmlScript.left != null && match.left != null)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(match.left, htmlScript.left);\\n\" + \n" + 
        "			\"            offsetMatches(result, match.index);\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add right script bracket\\n\" + \n" + 
        "			\"        if (htmlScript.right != null && match.right != null)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(match.right, htmlScript.right);\\n\" + \n" + 
        "			\"            offsetMatches(result, match.index + match[0].lastIndexOf(match.right));\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var j = 0, l = matches.length; j < l; j++)\\n\" + \n" + 
        "			\"            matches[j].brushName = brushClass.brushName;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return matches;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Main Highlither class.\\n\" + \n" + 
        "			\" * @constructor\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.Highlighter = function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // not putting any code in here because of the prototype inheritance\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"sh.Highlighter.prototype = {\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Returns value of the parameter passed to the highlighter.\\n\" + \n" + 
        "			\"     * @param {String} name             Name of the parameter.\\n\" + \n" + 
        "			\"     * @param {Object} defaultValue     Default value.\\n\" + \n" + 
        "			\"     * @return {Object}                 Returns found value or default value otherwise.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getParam: function(name, defaultValue)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var result = this.params[name];\\n\" + \n" + 
        "			\"        return toBoolean(result == null ? defaultValue : result);\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Shortcut to document.createElement().\\n\" + \n" + 
        "			\"     * @param {String} name     Name of the element to create (DIV, A, etc).\\n\" + \n" + 
        "			\"     * @return {HTMLElement}    Returns new HTML element.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    create: function(name)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return document.createElement(name);\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Applies all regular expression to the code and stores all found\\n\" + \n" + 
        "			\"     * matches in the `this.matches` array.\\n\" + \n" + 
        "			\"     * @param {Array} regexList     List of regular expressions.\\n\" + \n" + 
        "			\"     * @param {String} code         Source code.\\n\" + \n" + 
        "			\"     * @return {Array}              Returns list of matches.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    findMatches: function(regexList, code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var result = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (regexList != null)\\n\" + \n" + 
        "			\"            for (var i = 0, l = regexList.length; i < l; i++)\\n\" + \n" + 
        "			\"                // BUG: length returns len+1 for array if methods added to prototype chain (oising@gmail.com)\\n\" + \n" + 
        "			\"                if (typeof (regexList[i]) == \\\"object\\\")\\n\" + \n" + 
        "			\"                    result = result.concat(getMatches(code, regexList[i]));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // sort and remove nested the matches\\n\" + \n" + 
        "			\"        return this.removeNestedMatches(result.sort(matchesSortCallback));\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Checks to see if any of the matches are inside of other matches.\\n\" + \n" + 
        "			\"     * This process would get rid of highligted strings inside comments,\\n\" + \n" + 
        "			\"     * keywords inside strings and so on.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    removeNestedMatches: function(matches)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        // Optimized by Jose Prado (http://joseprado.com)\\n\" + \n" + 
        "			\"        for (var i = 0, l = matches.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            if (matches[i] === null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var itemI = matches[i],\\n\" + \n" + 
        "			\"                itemIEndPos = itemI.index + itemI.length\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var j = i + 1, l = matches.length; j < l && matches[i] !== null; j++)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var itemJ = matches[j];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (itemJ === null)\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                else if (itemJ.index > itemIEndPos)\\n\" + \n" + 
        "			\"                    break;\\n\" + \n" + 
        "			\"                else if (itemJ.index == itemI.index && itemJ.length > itemI.length)\\n\" + \n" + 
        "			\"                    matches[i] = null;\\n\" + \n" + 
        "			\"                else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos)\\n\" + \n" + 
        "			\"                    matches[j] = null;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return matches;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Creates an array containing integer line numbers starting from the 'first-line' param.\\n\" + \n" + 
        "			\"     * @return {Array} Returns array of integers.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    figureOutLineNumbers: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var lines = [],\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line'))\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        eachLine(code, function(line, index)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            lines.push(index + firstLine);\\n\" + \n" + 
        "			\"        });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return lines;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Determines if specified line number is in the highlighted list.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    isLineHighlighted: function(lineNumber)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var list = this.getParam('highlight', []);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(list) != 'object' && list.push == null)\\n\" + \n" + 
        "			\"            list = [ list ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return indexOf(list, lineNumber.toString()) != -1;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for a single line of code while determining alternating line style.\\n\" + \n" + 
        "			\"     * @param {Integer} lineNumber  Line number.\\n\" + \n" + 
        "			\"     * @param {String} code Line    HTML markup.\\n\" + \n" + 
        "			\"     * @return {String}             Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getLineHtml: function(lineIndex, lineNumber, code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var classes = [\\n\" + \n" + 
        "			\"            'line',\\n\" + \n" + 
        "			\"            'number' + lineNumber,\\n\" + \n" + 
        "			\"            'index' + lineIndex,\\n\" + \n" + 
        "			\"            'alt' + (lineNumber % 2 == 0 ? 1 : 2).toString()\\n\" + \n" + 
        "			\"        ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.isLineHighlighted(lineNumber))\\n\" + \n" + 
        "			\"            classes.push('highlighted');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (lineNumber == 0)\\n\" + \n" + 
        "			\"            classes.push('break');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '<div class=\\\"' + classes.join(' ') + '\\\">' + code + '</div>';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for line number column.\\n\" + \n" + 
        "			\"     * @param {String} code         Complete code HTML markup.\\n\" + \n" + 
        "			\"     * @param {Array} lineNumbers   Calculated line numbers.\\n\" + \n" + 
        "			\"     * @return {String}             Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getLineNumbersHtml: function(code, lineNumbers)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var html = '',\\n\" + \n" + 
        "			\"            count = splitLines(code).length,\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line')),\\n\" + \n" + 
        "			\"            pad = this.getParam('pad-line-numbers')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (pad == true)\\n\" + \n" + 
        "			\"            pad = (firstLine + count - 1).toString().length;\\n\" + \n" + 
        "			\"        else if (isNaN(pad) == true)\\n\" + \n" + 
        "			\"            pad = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0; i < count; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i,\\n\" + \n" + 
        "			\"                code = lineNumber == 0 ? sh.config.space : padNumber(lineNumber, pad)\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += this.getLineHtml(i, lineNumber, code);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Splits block of text into individual DIV lines.\\n\" + \n" + 
        "			\"     * @param {String} code         Code to highlight.\\n\" + \n" + 
        "			\"     * @param {Array} lineNumbers   Calculated line numbers.\\n\" + \n" + 
        "			\"     * @return {String}             Returns highlighted code in HTML form.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getCodeLinesHtml: function(html, lineNumbers)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        html = trim(html);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var lines = splitLines(html),\\n\" + \n" + 
        "			\"            padLength = this.getParam('pad-line-numbers'),\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line')),\\n\" + \n" + 
        "			\"            html = '',\\n\" + \n" + 
        "			\"            brushName = this.getParam('brush')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var line = lines[i],\\n\" + \n" + 
        "			\"                indent = /^(&nbsp;|\\\\s)+/.exec(line),\\n\" + \n" + 
        "			\"                spaces = null,\\n\" + \n" + 
        "			\"                lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i;\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (indent != null)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                spaces = indent[0].toString();\\n\" + \n" + 
        "			\"                line = line.substr(spaces.length);\\n\" + \n" + 
        "			\"                spaces = spaces.replace(' ', sh.config.space);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            line = trim(line);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                line = sh.config.space;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += this.getLineHtml(\\n\" + \n" + 
        "			\"                i,\\n\" + \n" + 
        "			\"                lineNumber,\\n\" + \n" + 
        "			\"                (spaces != null ? '<code class=\\\"' + brushName + ' spaces\\\">' + spaces + '</code>' : '') + line\\n\" + \n" + 
        "			\"            );\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Returns HTML for the table title or empty string if title is null.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getTitleHtml: function(title)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return title ? '<caption>' + title + '</caption>' : '';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Finds all matches in the source code.\\n\" + \n" + 
        "			\"     * @param {String} code     Source code to process matches in.\\n\" + \n" + 
        "			\"     * @param {Array} matches   Discovered regex matches.\\n\" + \n" + 
        "			\"     * @return {String} Returns formatted HTML with processed mathes.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getMatchesHtml: function(code, matches)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var pos = 0,\\n\" + \n" + 
        "			\"            result = '',\\n\" + \n" + 
        "			\"            brushName = this.getParam('brush', '')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        function getBrushNameCss(match)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var result = match ? (match.brushName || brushName) : brushName;\\n\" + \n" + 
        "			\"            return result ? result + ' ' : '';\\n\" + \n" + 
        "			\"        };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // Finally, go through the final list of matches and pull the all\\n\" + \n" + 
        "			\"        // together adding everything in between that isn't a match.\\n\" + \n" + 
        "			\"        for (var i = 0, l = matches.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var match = matches[i],\\n\" + \n" + 
        "			\"                matchBrushName\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (match === null || match.length === 0)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            matchBrushName = getBrushNameCss(match);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            result += wrapLinesWithCode(code.substr(pos, match.index - pos), matchBrushName + 'plain')\\n\" + \n" + 
        "			\"                    + wrapLinesWithCode(match.value, matchBrushName + match.css)\\n\" + \n" + 
        "			\"                    ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            pos = match.index + match.length + (match.offset || 0);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // don't forget to add whatever's remaining in the string\\n\" + \n" + 
        "			\"        result += wrapLinesWithCode(code.substr(pos), getBrushNameCss() + 'plain');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return result;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for the whole syntax highlighter.\\n\" + \n" + 
        "			\"     * @param {String} code Source code.\\n\" + \n" + 
        "			\"     * @return {String} Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getHtml: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var html = '',\\n\" + \n" + 
        "			\"            classes = [ 'Event_syntaxHighlighter' ],\\n\" + \n" + 
        "			\"            tabSize,\\n\" + \n" + 
        "			\"            matches,\\n\" + \n" + 
        "			\"            lineNumbers\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // process light mode\\n\" + \n" + 
        "			\"        if (this.getParam('light') == true)\\n\" + \n" + 
        "			\"            this.params.toolbar = this.params.gutter = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        className = 'Event_syntaxHighlighter';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.getParam('collapse') == true)\\n\" + \n" + 
        "			\"            classes.push('collapsed');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if ((gutter = this.getParam('gutter')) == false)\\n\" + \n" + 
        "			\"            classes.push('nogutter');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add custom user style name\\n\" + \n" + 
        "			\"        classes.push(this.getParam('class-name'));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add brush alias to the class name for custom CSS\\n\" + \n" + 
        "			\"        classes.push(this.getParam('brush'));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        code = trimFirstAndLastLines(code)\\n\" + \n" + 
        "			\"            .replace(/\\\\r/g, ' ') // IE lets these buggers through\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        tabSize = this.getParam('tab-size');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // replace tabs with spaces\\n\" + \n" + 
        "			\"        code = this.getParam('smart-tabs') == true\\n\" + \n" + 
        "			\"            ? processSmartTabs(code, tabSize)\\n\" + \n" + 
        "			\"            : processTabs(code, tabSize)\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // unindent code by the common indentation\\n\" + \n" + 
        "			\"        if (this.getParam('unindent'))\\n\" + \n" + 
        "			\"            code = unindent(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (gutter)\\n\" + \n" + 
        "			\"            lineNumbers = this.figureOutLineNumbers(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // find matches in the code using brushes regex list\\n\" + \n" + 
        "			\"        matches = this.findMatches(this.regexList, code);\\n\" + \n" + 
        "			\"        // processes found matches into the html\\n\" + \n" + 
        "			\"        html = this.getMatchesHtml(code, matches);\\n\" + \n" + 
        "			\"        // finally, split all lines so that they wrap well\\n\" + \n" + 
        "			\"        html = this.getCodeLinesHtml(html, lineNumbers);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // finally, process the links\\n\" + \n" + 
        "			\"        if (this.getParam('auto-links'))\\n\" + \n" + 
        "			\"            html = processUrls(html);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(navigator) != 'undefined' && navigator.userAgent && navigator.userAgent.match(/MSIE/))\\n\" + \n" + 
        "			\"            classes.push('ie');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        html =\\n\" + \n" + 
        "			\"            '<div id=\\\"' + getHighlighterId(this.id) + '\\\" class=\\\"' + classes.join(' ') + '\\\">'\\n\" + \n" + 
        "			\"                + (this.getParam('toolbar') ? sh.toolbar.getHtml(this) : '')\\n\" + \n" + 
        "			\"                + '<table border=\\\"0\\\" cellpadding=\\\"0\\\" cellspacing=\\\"0\\\">'\\n\" + \n" + 
        "			\"                    + this.getTitleHtml(this.getParam('title'))\\n\" + \n" + 
        "			\"                    + '<tbody>'\\n\" + \n" + 
        "			\"                        + '<tr>'\\n\" + \n" + 
        "			\"                            + (gutter ? '<td class=\\\"gutter\\\">' + this.getLineNumbersHtml(code) + '</td>' : '')\\n\" + \n" + 
        "			\"                            + '<td class=\\\"code\\\">'\\n\" + \n" + 
        "			\"                                + '<div class=\\\"container\\\">'\\n\" + \n" + 
        "			\"                                    + html\\n\" + \n" + 
        "			\"                                + '</div>'\\n\" + \n" + 
        "			\"                            + '</td>'\\n\" + \n" + 
        "			\"                        + '</tr>'\\n\" + \n" + 
        "			\"                    + '</tbody>'\\n\" + \n" + 
        "			\"                + '</table>'\\n\" + \n" + 
        "			\"            + '</div>'\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Highlights the code and returns complete HTML.\\n\" + \n" + 
        "			\"     * @param {String} code     Code to highlight.\\n\" + \n" + 
        "			\"     * @return {Element}        Returns container DIV element with all markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getDiv: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        if (code === null)\\n\" + \n" + 
        "			\"            code = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        this.code = code;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var div = this.create('div');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // create main HTML\\n\" + \n" + 
        "			\"        div.innerHTML = this.getHtml(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // set up click handlers\\n\" + \n" + 
        "			\"        if (this.getParam('toolbar'))\\n\" + \n" + 
        "			\"            attachEvent(findElement(div, '.toolbar'), 'click', sh.toolbar.handler);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.getParam('quick-code'))\\n\" + \n" + 
        "			\"            attachEvent(findElement(div, '.code'), 'dblclick', quickCodeHandler);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return div;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Initializes the highlighter/brush.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * Constructor isn't used for initialization so that nothing executes during necessary\\n\" + \n" + 
        "			\"     * `new SyntaxHighlighter.Highlighter()` call when setting up brush inheritence.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Hash} params Highlighter parameters.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    init: function(params)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        this.id = guid();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // register this instance in the highlighters list\\n\" + \n" + 
        "			\"        storeHighlighter(this);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // local params take precedence over defaults\\n\" + \n" + 
        "			\"        this.params = merge(sh.defaults, params || {})\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // process light mode\\n\" + \n" + 
        "			\"        if (this.getParam('light') == true)\\n\" + \n" + 
        "			\"            this.params.toolbar = this.params.gutter = false;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Converts space separated list of keywords into a regular expression string.\\n\" + \n" + 
        "			\"     * @param {String} str    Space separated keywords.\\n\" + \n" + 
        "			\"     * @return {String}       Returns regular expression string.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getKeywords: function(str)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        str = str\\n\" + \n" + 
        "			\"            .replace(/^\\\\s+|\\\\s+$/g, '')\\n\" + \n" + 
        "			\"            .replace(/\\\\s+/g, '|')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '\\\\\\\\b(?:' + str + ')\\\\\\\\b';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Makes a brush compatible with the `html-script` functionality.\\n\" + \n" + 
        "			\"     * @param {Object} regexGroup Object containing `left` and `right` regular expressions.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    forHtmlScript: function(regexGroup)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var regex = { 'end' : regexGroup.right.source };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if(regexGroup.eof)\\n\" + \n" + 
        "			\"            regex.end = \\\"(?:(?:\\\" + regex.end + \\\")|$)\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        this.htmlScript = {\\n\" + \n" + 
        "			\"            left : { regex: regexGroup.left, css: 'script' },\\n\" + \n" + 
        "			\"            right : { regex: regexGroup.right, css: 'script' },\\n\" + \n" + 
        "			\"            code : XRegExp(\\n\" + \n" + 
        "			\"                \\\"(?<left>\\\" + regexGroup.left.source + \\\")\\\" +\\n\" + \n" + 
        "			\"                \\\"(?<code>.*?)\\\" +\\n\" + \n" + 
        "			\"                \\\"(?<right>\\\" + regex.end + \\\")\\\",\\n\" + \n" + 
        "			\"                \\\"sgi\\\"\\n\" + \n" + 
        "			\"                )\\n\" + \n" + 
        "			\"        };\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}; // end of Highlighter\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"return sh;\\n\" + \n" + 
        "			\"}(); // end of anonymous function\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// CommonJS\\n\" + \n" + 
        "			\"typeof(exports) != 'undefined' ? exports.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter : null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// JS brush\\n\" + \n" + 
        "			\";(function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // CommonJS\\n\" + \n" + 
        "			\"    VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').VisualEventSyntaxHighlighter : null);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function Brush()\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var keywords =  'break case catch class continue ' +\\n\" + \n" + 
        "			\"                'default delete do else enum export extends false  ' +\\n\" + \n" + 
        "			\"                'for function if implements import in instanceof ' +\\n\" + \n" + 
        "			\"                'interface let new null package private protected ' +\\n\" + \n" + 
        "			\"                'static return super switch ' +\\n\" + \n" + 
        "			\"                'this throw true try typeof var while with yield';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var r = VisualEventSyntaxHighlighter.regexLib;\\n\" + \n" + 
        "			\"        \\n\" + \n" + 
        "			\"        this.regexList = [\\n\" + \n" + 
        "			\"            { regex: r.multiLineDoubleQuotedString,                 css: 'string' },            // double quoted strings\\n\" + \n" + 
        "			\"            { regex: r.multiLineSingleQuotedString,                 css: 'string' },            // single quoted strings\\n\" + \n" + 
        "			\"            { regex: r.singleLineCComments,                         css: 'comments' },          // one line comments\\n\" + \n" + 
        "			\"            { regex: r.multiLineCComments,                          css: 'comments' },          // multiline comments\\n\" + \n" + 
        "			\"            { regex: /\\\\s*#.*/gm,                                    css: 'preprocessor' },      // preprocessor tags like #region and #endregion\\n\" + \n" + 
        "			\"            { regex: new RegExp(this.getKeywords(keywords), 'gm'),  css: 'keyword' }            // keywords\\n\" + \n" + 
        "			\"            ];\\n\" + \n" + 
        "			\"    \\n\" + \n" + 
        "			\"        this.forHtmlScript(r.scriptScriptTags);\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    Brush.prototype = new VisualEventSyntaxHighlighter.Highlighter();\\n\" + \n" + 
        "			\"    Brush.aliases   = ['js', 'jscript', 'javascript', 'json'];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    VisualEventSyntaxHighlighter.brushes.JScript = Brush;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // CommonJS\\n\" + \n" + 
        "			\"    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"window.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * @summary     Visual Event\\n\" + \n" + 
        "			\" * @description Visual Event - show Javascript events which have been attached to objects, and\\n\" + \n" + 
        "			\" *              the event's associated function code, visually.\\n\" + \n" + 
        "			\" * @file        VisualEvent_Loader.js\\n\" + \n" + 
        "			\" * @author      Allan Jardine (www.sprymedia.co.uk)\\n\" + \n" + 
        "			\" * @license     GPL v2\\n\" + \n" + 
        "			\" * @contact     www.sprymedia.co.uk/contact\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @copyright Copyright 2007-2013 Allan Jardine.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * This source file is free software, under the GPL v2 license:\\n\" + \n" + 
        "			\" *   http://www.gnu.org/licenses/gpl-2.0.html\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global VisualEvent,VisualEvent_Loader,VisualEvents,VisualEventSyntaxHighlighter*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/** \\n\" + \n" + 
        "			\" * Visual Event will show, visually, which DOM elements on a web-page have events attached to\\n\" + \n" + 
        "			\" * them, information about those events and the code accossiated with each handler for the \\n\" + \n" + 
        "			\" * event. It does this by parsing through the cache of Javascript libraries (as there is no DOM\\n\" + \n" + 
        "			\" * method to get the information required), thus a major part of Visual Event are the library\\n\" + \n" + 
        "			\" * parsers. A result of this is that universal display of events is not possible - there must\\n\" + \n" + 
        "			\" * be a parser available.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" * Visual Event's display is broken into four major areas:\\n\" + \n" + 
        "			\" *   - Label - The information toolbar at the bottom of the window (fixed) showing Visual Event\\n\" + \n" + 
        "			\" * controls (close and help), the name of the program and information about the events that have\\n\" + \n" + 
        "			\" * been found on the page.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Help - The help view is a completely blocking layer which shows information about Visual\\n\" + \n" + 
        "			\" * Event and how to use it. A single click will remove the help layer and restore the standard\\n\" + \n" + 
        "			\" * Visual Event view.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Display - A layer which provides a background to Visual Event (thus when Visual Event is \\n\" + \n" + 
        "			\" * active is it blocking to the web-page below it) and acts as a container for the boxes (DIVs)\\n\" + \n" + 
        "			\" * which serve as a visual indicator that there is an event attached to the element below it\\n\" + \n" + 
        "			\" * (sized to match the element with the event attached).\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Lightbox - The event information and code display of attached events.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" * Note that currently there can only be one instance of Visual Event at a time, due to \\n\" + \n" + 
        "			\" * practicality (no point in showing the same thing twice, at the same time) and the use of\\n\" + \n" + 
        "			\" * element IDs in the script.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *  @class VisualEvent\\n\" + \n" + 
        "			\" *  @constructor\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *  @example\\n\" + \n" + 
        "			\" *     new VisualEvent();\\n\" + \n" + 
        "			\"*/\\n\" + \n" + 
        "			\"window.VisualEvent = function ()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"	// Sanity check\\n\" + \n" + 
        "			\"	if ( ! this instanceof VisualEvent ) {\\n\" + \n" + 
        "			\"		alert( \\\"VisualEvent warning: Must be initialised with the 'new' keyword.\\\" );\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Only one instance of VisualEvent at a time, in the current running mode. So if there is a\\n\" + \n" + 
        "			\"	// current instance, shut it down first\\n\" + \n" + 
        "			\"	if ( VisualEvent.instance !== null ) {\\n\" + \n" + 
        "			\"		VisualEvent.instance.close();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	VisualEvent.instance = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Settings object containing customisable information for the class instance\\n\" + \n" + 
        "			\"	 * @namespace\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	this.s = {\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Array of objects containing information about the nodes which have been found to have\\n\" + \n" + 
        "			\"		 * events attached to them. Each object contains the following parameters:\\n\" + \n" + 
        "			\"		 *   {element} node The DOM element in question\\n\" + \n" + 
        "			\"		 *   {array} listeners Array of objects which with details about each of the events on this node\\n\" + \n" + 
        "			\"		 *     {string} func Source of the event handler (from Function.toString())\\n\" + \n" + 
        "			\"		 *     {string} source Library name / version\\n\" + \n" + 
        "			\"		 *     {string} type Type of event (click, change, keyup etc)\\n\" + \n" + 
        "			\"		 *     {boolean} removed Flag to indicate if the event has been removed (for API)\\n\" + \n" + 
        "			\"		 *  @type     array\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"elements\\\": null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * setTimeout reference for delayed hiding of the lightbox layer\\n\" + \n" + 
        "			\"		 *  @type     int\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"mouseTimer\\\": null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Counter for the number of events which have been found from a JS library's cache, but\\n\" + \n" + 
        "			\"		 * are not currently available in the document's DOM\\n\" + \n" + 
        "			\"		 *  @type     int\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"nonDomEvents\\\": 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Array of objects holding information about each SCRIPT tag that is found in the DOM. Each\\n\" + \n" + 
        "			\"		 * object contains the parameters:\\n\" + \n" + 
        "			\"		 *   {string} src The URL of the script source (or inline string if no src attribute)\\n\" + \n" + 
        "			\"		 *   {string} code The code (.text) from the script\\n\" + \n" + 
        "			\"		 *  @type     array\\n\" + \n" + 
        "			\"		 *  @default  []\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"scripts\\\": []\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * DOM elements used by the class instance\\n\" + \n" + 
        "			\"	 * @namespace\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	this.dom = {\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Label layer - for showing that Visual Event is currently running and information and\\n\" + \n" + 
        "			\"		 * controls, about and for this instance\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"label\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Label\\\">'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelClose\\\">x</span>'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelHelp\\\">?</span>'+\\n\" + \n" + 
        "			\"				'Visual Event <span class=\\\"Event_LabelBy\\\">by <a href=\\\"http://sprymedia.co.uk/\\\" target=\\\"_blank\\\">Allan Jardine</a>.</span>'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelEvents\\\"></span> events were found attached to '+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelNodes\\\"></span> nodes. '+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelNonDom\\\"></span> events were attached to elements not currently in the document.'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Display layer - background layer and container for Visual Event visual node indicators\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"display\\\": $('<div id=\\\"Event_Display\\\"></div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Lightbox layer - Template for information display about a given node, and the code for\\n\" + \n" + 
        "			\"		 * a given event handler\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"lightbox\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Lightbox\\\">'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_NodeName\\\">Node: <i></i>'+\\n\" + \n" + 
        "			\"					'<div class=\\\"Event_NodeRemove\\\">Remove from display</div>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"				'<div>'+\\n\" + \n" + 
        "			\"					'<div class=\\\"Event_Nav\\\">'+\\n\" + \n" + 
        "			\"						'<ul></ul>'+\\n\" + \n" + 
        "			\"					'</div>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_Code\\\"></div>'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Help layer - information about Visual Event and how to use it\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"help\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Help\\\">'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_HelpInner\\\">'+\\n\" + \n" + 
        "			\"					'<h1>Visual Event help</h1>'+\\n\" + \n" + 
        "			\"					'<p>Visual Event will show which elements on any given page have Javascript events attached '+\\n\" + \n" + 
        "			\"						'to them, what those events are and the code associated with the events. In Webkit '+\\n\" + \n" + 
        "			\"						'browsers and Opera, Visual Event will also indicate where the code in question was '+\\n\" + \n" + 
        "			\"						'defined.</p>'+\\n\" + \n" + 
        "			\"					'<p>Note that Visual Event is only able to show events for Javascript libraries for which '+\\n\" + \n" + 
        "			\"						'it has a parser. This is currently: DOM0 events, Glow, jQuery, MooTools, Prototype and YUI2.</p>'+\\n\" + \n" + 
        "			\"					'<p>Commands:</p>'+\\n\" + \n" + 
        "			\"					'<table cellpadding=\\\"0\\\" cellspacing=\\\"0\\\" border=\\\"0\\\">'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Double click element with event</td>'+\\n\" + \n" + 
        "			\"							'<td>Hide event indicator. Allows access to nodes underneath</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: space</td>'+\\n\" + \n" + 
        "			\"							'<td>Restore all events to be visible</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: esc</td>'+\\n\" + \n" + 
        "			\"							'<td>Quit out of Visual Event</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: h</td>'+\\n\" + \n" + 
        "			\"							'<td>Show / hide this help box</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: r</td>'+\\n\" + \n" + 
        "			\"							'<td>Reload and display events on page</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"					'</table>'+\\n\" + \n" + 
        "			\"					'<p>The colour of the elements that have been detected to have an event reflect the type of '+\\n\" + \n" + 
        "			\"					'events that are attached to the element:</p>'+\\n\" + \n" + 
        "			\"					'<table cellpadding=\\\"0\\\" cellspacing=\\\"0\\\" border=\\\"0\\\" class=\\\"Event_LabelColorInfo\\\">'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"15%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_blue\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_red\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_yellow\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_green\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_purple\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_orange\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"15%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_black\\\"></div></td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Mouse event</td>'+\\n\" + \n" + 
        "			\"							'<td>UI event</td>'+\\n\" + \n" + 
        "			\"							'<td>HTML event</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + HTML</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + UI</td>'+\\n\" + \n" + 
        "			\"							'<td>HTML + UI</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + HTML + UI</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"					'</table>'+\\n\" + \n" + 
        "			\"					'<p>Visual Event is open source software (GPLv2). If you would like to contribute an '+\\n\" + \n" + 
        "			\"						'enhancement, please fork the project on '+\\n\" + \n" + 
        "			\"						'<a href=\\\"https://github.com/DataTables/VisualEvent\\\" target=\\\"_blank\\\">Github</a>!</p>'+\\n\" + \n" + 
        "			\"					'<p class=\\\"Event_HelpClose\\\">Click anywhere to close this help box.</p>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Reference to the visual event node indicator - so we have a reference to what node we are\\n\" + \n" + 
        "			\"		 * showing the lightbox information about\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"activeEventNode\\\": null\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	this._construct();\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.prototype = {\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * API methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Shutdown Visual Event and return to the original page\\n\" + \n" + 
        "			\"	 * @param {event} e Event object\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"close\\\": function ( e )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		// Remove all events that we've added\\n\" + \n" + 
        "			\"		$('*').unbind('.VisualEvent');\\n\" + \n" + 
        "			\"		$(document).unbind( 'keydown.VisualEvent' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.display).remove();\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).remove();\\n\" + \n" + 
        "			\"		$(this.dom.label).remove();\\n\" + \n" + 
        "			\"		$(this.dom.help).remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof VisualEvent_Loader !== 'undefined' && !VisualEvent_Loader.jQueryPreLoaded ) {\\n\" + \n" + 
        "			\"			$.noConflict();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		VisualEvent.instance = null;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Reinitialise Visual Event (i.e. bring it up-to-date with any new events which might have\\n\" + \n" + 
        "			\"	 *   been added\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"reInit\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		$('*').unbind('.VisualEvent');\\n\" + \n" + 
        "			\"		$(document).unbind( 'keydown.VisualEvent' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.display).empty();\\n\" + \n" + 
        "			\"		$(this.dom.display).remove();\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).remove();\\n\" + \n" + 
        "			\"		$(this.dom.label).remove();\\n\" + \n" + 
        "			\"		$(this.dom.help).remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.s.elements.splice(0, this.s.elements.length);\\n\" + \n" + 
        "			\"		this.s.nonDomEvents = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._construct();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Private methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Visual Event constructor\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_construct\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var windowHeight = $(document).height();\\n\" + \n" + 
        "			\"		var windowWidth = $(document).width();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Prep the DOM */\\n\" + \n" + 
        "			\"		this.dom.display.style.width = windowWidth+'px';\\n\" + \n" + 
        "			\"		this.dom.display.style.height = windowHeight+'px';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.display );\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.lightbox );\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.label );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Event handlers */\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).bind('mouseover.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._timerClear( e );\\n\" + \n" + 
        "			\"		} ).bind( 'mousemove.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._timerClear( e );\\n\" + \n" + 
        "			\"		} ).bind( 'mouseout.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._lightboxHide();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('div.Event_NodeRemove', this.dom.lightbox).bind('click.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that.dom.activeEventNode.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"			that.dom.lightbox.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(document).bind( 'keydown.VisualEvent', function( e ) {\\n\" + \n" + 
        "			\"			if ( e.which === 0 || e.which === 27 ) { // esc\\n\" + \n" + 
        "			\"				that.close();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( e.which === 72 ) { // 'h'\\n\" + \n" + 
        "			\"				if ( $(that.dom.help).filter(':visible').length === 0 ) {\\n\" + \n" + 
        "			\"					that._help();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				else {\\n\" + \n" + 
        "			\"					that._hideHelp();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else if ( e.which === 32 ) { // space\\n\" + \n" + 
        "			\"				$('div.EventLabel').css('display', 'block');\\n\" + \n" + 
        "			\"				e.preventDefault();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else if ( e.which === 82 ) { // r\\n\" + \n" + 
        "			\"				that.reInit();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Build the events list and display */\\n\" + \n" + 
        "			\"		this.s.elements = this._eventsLoad();\\n\" + \n" + 
        "			\"		for ( i=0, iLen=this.s.elements.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			this._eventElement( this.s.elements[i] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._renderLabel();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Load the text of all the Javascript on the page so we can try to find source */\\n\" + \n" + 
        "			\"		this._scriptsLoad();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * User help\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show the help box\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_help\\\": function () {\\n\" + \n" + 
        "			\"		document.body.appendChild( this.dom.help );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Hide hte help box\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_hideHelp\\\": function () {\\n\" + \n" + 
        "			\"		document.body.removeChild( this.dom.help );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Javascript source handling\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Parse the DOM for script tags and store the Javascript that is found. For any scripts which\\n\" + \n" + 
        "			\"	 * have a 'src' attribute, add them to a queue for Ajax loading and then start the queue running\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptsLoad\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		// Don't load scripts again if they are already loaded\\n\" + \n" + 
        "			\"		if ( this.s.scripts.length > 0 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var loadQueue = [];\\n\" + \n" + 
        "			\"		var scripts = document.getElementsByTagName('script');\\n\" + \n" + 
        "			\"		for ( var i=0, iLen=scripts.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			if ( scripts[i].src  && scripts[i].src !== \\\"\\\" ) {\\n\" + \n" + 
        "			\"				if ( scripts[i].src.indexOf('VisualEvent') === -1 ) {\\n\" + \n" + 
        "			\"					loadQueue.push( scripts[i].src );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else {\\n\" + \n" + 
        "			\"				this.s.scripts.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": \\\"Inline script\\\",\\n\" + \n" + 
        "			\"					\\\"code\\\": scripts[i].text\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Pull an item off the script loading queue and load it up by an Ajax return. When done, loop\\n\" + \n" + 
        "			\"	 * back and load the next item off the queue, until all done.\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptLoadQueue\\\": function ( loadQueue )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		/* Check if we still have anything to do or not */\\n\" + \n" + 
        "			\"		if ( loadQueue.length === 0 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var url = loadQueue.shift();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$.ajax( {\\n\" + \n" + 
        "			\"			\\\"dataType\\\": 'text',\\n\" + \n" + 
        "			\"			\\\"type\\\": \\\"GET\\\",\\n\" + \n" + 
        "			\"			\\\"url\\\": url,\\n\" + \n" + 
        "			\"			\\\"success\\\": function (text) {\\n\" + \n" + 
        "			\"				that.s.scripts.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": url,\\n\" + \n" + 
        "			\"					\\\"code\\\": text\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"				that._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			\\\"error\\\": function () {\\n\" + \n" + 
        "			\"				that._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Attempt to find the source location (file and line number) for a given function and\\n\" + \n" + 
        "			\"	 * format a return string which is human readable explaining where the source might come from\\n\" + \n" + 
        "			\"	 *  @param {string} func The function string to search for\\n\" + \n" + 
        "			\"	 *  @returns {string} Formatted string with information about the source\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptSource\\\": function ( func )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var origin = \\\"\\\";\\n\" + \n" + 
        "			\"		var srcFiles = [];\\n\" + \n" + 
        "			\"		var i, iLen, a;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Webkit reformats the prototype for the function, so the whitespace might not match our\\n\" + \n" + 
        "			\"		// intended target. Remove the prototype - it means we are more likely to get a clash, but\\n\" + \n" + 
        "			\"		// don't see much choice if we want to do matching other than trying all variations\\n\" + \n" + 
        "			\"		func = $.trim( func.replace(/^(function.*?\\\\))/, '') );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0, iLen=this.s.scripts.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			if ( this.s.scripts[i].code.indexOf( func ) !== -1 ) {\\n\" + \n" + 
        "			\"				a = this.s.scripts[i].code.split( func );\\n\" + \n" + 
        "			\"				srcFiles.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": this.s.scripts[i].src,\\n\" + \n" + 
        "			\"					\\\"line\\\": a[0].split('\\\\n').length\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Firefox reformats the functions from toString() rather than keeping the original format\\n\" + \n" + 
        "			\"		// so we'll never be able to find the original. Should we just return an empty string\\n\" + \n" + 
        "			\"		// for Firefox?\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( srcFiles.length === 0 ) {\\n\" + \n" + 
        "			\"			origin = \\\"Function definition could not be found automatically<br/>\\\";\\n\" + \n" + 
        "			\"		} else if ( srcFiles.length === 1 ) {\\n\" + \n" + 
        "			\"			origin = 'Function defined in ';\\n\" + \n" + 
        "			\"			if (srcFiles[0].src != 'Inline script') {\\n\" + \n" + 
        "			\"				origin += '<a href=\\\"' + srcFiles[0].src + '\\\">'+this._scriptName(srcFiles[0].src)+'</a>:'+ srcFiles[0].line + \\\"<br/>\\\";\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				origin += srcFiles[0].src+\\\"<br />\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			origin = \\\"Function could originate in multiple locations:<br/>\\\";\\n\" + \n" + 
        "			\"			for ( i=0, iLen=srcFiles.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"				origin += (i+1)+'. '+\\n\" + \n" + 
        "			\"					' in <a href=\\\"'+srcFiles[i].src+'\\\" target=\\\"_blank\\\">'+this._scriptName(srcFiles[i].src)+'</a>:'+srcFiles[i].line+'<br/>';\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return origin;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Get the name of a file from a URL (i.e. the last part in a slash seperated string)\\n\" + \n" + 
        "			\"	 *  @param {string} src URL to get the file name from\\n\" + \n" + 
        "			\"	 *  @returns {string} File name\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptName\\\": function ( src )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var a = src.split('/');\\n\" + \n" + 
        "			\"		return a[ a.length-1 ];\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Display\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Build the list of nodes that have events attached to them by going through all installed\\n\" + \n" + 
        "			\"	 * parsers\\n\" + \n" + 
        "			\"	 *  @returns {array} List of nodes with their associated events\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventsLoad\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var elements=[], libraryListeners;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Gather the events from the supported libraries */\\n\" + \n" + 
        "			\"		for ( i=0, iLen=VisualEvent.parsers.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			// Given the millions of environments that the parsers will run in, it is quite possible one\\n\" + \n" + 
        "			\"			// will hit an error - if it does, just ignore it and pass on.\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				libraryListeners = VisualEvent.parsers[i]();\\n\" + \n" + 
        "			\"				elements.push.apply( elements, libraryListeners );\\n\" + \n" + 
        "			\"			} catch (e) {\\n\" + \n" + 
        "			\"				console.log( 'Visual Event parser error:', e );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Add the API array information - if it is available */\\n\" + \n" + 
        "			\"		if ( typeof VisualEvents == 'object' ) {\\n\" + \n" + 
        "			\"			if ( this._ceckIntegrity( VisualEvents ) ) {\\n\" + \n" + 
        "			\"				elements = this._combineEvents( elements, VisualEvents );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Group the events */\\n\" + \n" + 
        "			\"		return this._merge( elements );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * A node has at least one event subscribed to it - draw it visually\\n\" + \n" + 
        "			\"	 *  @param {object} eventNode Event information for this node in the same format as \\n\" + \n" + 
        "			\"	 *    VisualEvent.s.elements objects\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventElement\\\": function ( eventNode )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var pos;\\n\" + \n" + 
        "			\"		var label;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Element is hidden\\n\" + \n" + 
        "			\"		if ( $(eventNode.node).filter(':visible').length === 0 ) {\\n\" + \n" + 
        "			\"			this.s.nonDomEvents += 1;\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		pos = $(eventNode.node).offset();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		label = document.createElement( 'div' );\\n\" + \n" + 
        "			\"		label.style.position = \\\"absolute\\\";\\n\" + \n" + 
        "			\"		label.style.top = pos.top+\\\"px\\\";\\n\" + \n" + 
        "			\"		label.style.left = pos.left+\\\"px\\\";\\n\" + \n" + 
        "			\"		label.className = 'EventLabel Event_bg_'+this._getColorFromTypes( eventNode.listeners );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* If dealing with the html or body tags, don't paint over the whole screen */\\n\" + \n" + 
        "			\"		if ( eventNode.node != document.body && eventNode.node != document.documentElement ) {\\n\" + \n" + 
        "			\"			label.style.width = (eventNode.node.offsetWidth-4)+'px';\\n\" + \n" + 
        "			\"			label.style.height = (eventNode.node.offsetHeight-4)+'px';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Event listeners for showing the lightbox for this element */\\n\" + \n" + 
        "			\"		$(label).bind( 'dblclick.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			this.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		} ).bind( 'mouseover.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that.dom.activeEventNode = this;\\n\" + \n" + 
        "			\"			that._lightboxList( e, eventNode.node, eventNode.listeners );\\n\" + \n" + 
        "			\"		} ).bind( 'mouseout.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._lightboxHide();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Finally have the html engine render our output */\\n\" + \n" + 
        "			\"		this.dom.display.appendChild( label );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Lightbox\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show the list of event types which are attached to this node and add event listeners to show\\n\" + \n" + 
        "			\"	 * the code when required (mouseover on the list)\\n\" + \n" + 
        "			\"	 *  @param {event} e The mouse event that triggered this display\\n\" + \n" + 
        "			\"	 *  @param {element} node The node with the attached listeners\\n\" + \n" + 
        "			\"	 *  @param {array} listeners List of listeners attached to the element\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxList\\\": function ( e, node, listeners )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var ul;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._timerClear();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('i', this.dom.lightbox).html( this._renderNodeInfo(node) );\\n\" + \n" + 
        "			\"		$('div.Event_Code', this.dom.lightbox).empty();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ul = $('ul', this.dom.lightbox).empty();\\n\" + \n" + 
        "			\"		for ( i=0, iLen=listeners.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			ul.append( $('<li>'+listeners[i].type+'</li>').bind( 'mouseover.VisualEvent',\\n\" + \n" + 
        "			\"				this._lightboxCode(e, node, listeners[i]) )\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Show the code for the first event in the list */\\n\" + \n" + 
        "			\"		$('li:eq(0)', this.dom.lightbox).mouseover();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._lightboxPosition( this.dom.lightbox, node );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Create a function which will build the HTML needed for the display of the code for an\\n\" + \n" + 
        "			\"	 * event handler\\n\" + \n" + 
        "			\"	 *  @param {event} e Original mouse event that triggered the lightbox to be shown\\n\" + \n" + 
        "			\"	 *  @param {element} node The node with the attached listeners\\n\" + \n" + 
        "			\"	 *  @param {object} listener Listener attached to the element\\n\" + \n" + 
        "			\"	 *  @returns {function} Function which will display the code for the event when called\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxCode\\\": function ( e, node, listener )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return function () {\\n\" + \n" + 
        "			\"			$('li', this.parentNode).removeClass( 'Event_EventSelected' );\\n\" + \n" + 
        "			\"			$(this).addClass( 'Event_EventSelected' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var evt = that._createEvent( e, listener.type, e.target );\\n\" + \n" + 
        "			\"			that._renderCode( e, listener.func, listener.source, listener.type,\\n\" + \n" + 
        "			\"				evt===null ? null : function() {\\n\" + \n" + 
        "			\"					node.dispatchEvent(evt);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Might cause stuff to move around by the activation of the event, so re-init\\n\" + \n" + 
        "			\"					setTimeout( function () {\\n\" + \n" + 
        "			\"						that.reInit.call(that);\\n\" + \n" + 
        "			\"					}, 200 );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Position the lightbox relative to the element which has an event attached to it\\n\" + \n" + 
        "			\"	 *  @param {element} target The lightbox node to move (note there is only one this.dom.lightbox\\n\" + \n" + 
        "			\"	 *    but this keeps it nice and generic!)\\n\" + \n" + 
        "			\"	 *  @param {element} parent The element with the event attached to it\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxPosition\\\": function ( target, parent )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var offset = $(parent).offset();\\n\" + \n" + 
        "			\"		var targetT = offset.top + 15; // magic number - height of info button\\n\" + \n" + 
        "			\"		var targetL = offset.left;\\n\" + \n" + 
        "			\"		var viewportW = $(window).width() - 25; // use window rather than document, since the target could cause the document to resize\\n\" + \n" + 
        "			\"		var viewportH = $(document).height();\\n\" + \n" + 
        "			\"		var targetW = $(target).width();\\n\" + \n" + 
        "			\"		var targetH = $(target).height();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Correct for over-run\\n\" + \n" + 
        "			\"		if ( targetL + targetW > viewportW ) {\\n\" + \n" + 
        "			\"			targetL -= (targetL + targetW) - viewportW;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( targetT + targetH > viewportH ) {\\n\" + \n" + 
        "			\"			targetH -= (targetT + targetH) - viewportH;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Correct for under-run\\n\" + \n" + 
        "			\"		if ( targetT < 0 ) {\\n\" + \n" + 
        "			\"			targetT = 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( targetL < 0 ) {\\n\" + \n" + 
        "			\"			targetL = 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		target.style.top = targetT+'px';\\n\" + \n" + 
        "			\"		target.style.left = targetL+'px';\\n\" + \n" + 
        "			\"		target.style.display = 'block';\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Close the lightbox - use a cancellable timer for the hiding of the lightbox, so we can move \\n\" + \n" + 
        "			\"	 * the mouse from element to element without having it flicker.\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxHide\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		this.s.mouseTimer = setTimeout( function () {\\n\" + \n" + 
        "			\"				that.dom.lightbox.style.display = 'none';\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"		200 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Rendering methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Display a tooltip with event information for a particular event handler\\n\" + \n" + 
        "			\"	 *  @param {event} e Target node information\\n\" + \n" + 
        "			\"	 *  @param {function} func The function string\\n\" + \n" + 
        "			\"	 *  @param {string} type Event type\\n\" + \n" + 
        "			\"	 *  @param {function|null} trigger Function to trigger the event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderCode\\\": function( e, func, source, type, trigger )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var eventElement = e.target;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._timerClear( e );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( trigger === null ) {\\n\" + \n" + 
        "			\"			$('div.Event_Code', this.dom.lightbox).html( '<div id=\\\"Event_inner\\\"><p><i>'+type+\\n\" + \n" + 
        "			\"				'</i> event subscribed by '+source+'<br/>'+\\n\" + \n" + 
        "			\"				this._scriptSource( func )+\\n\" + \n" + 
        "			\"				'</p><pre id=\\\"Event_code\\\" class=\\\"brush: js\\\"></pre></div>' );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else {\\n\" + \n" + 
        "			\"			$('div.Event_Code', this.dom.lightbox).html( '<div id=\\\"Event_inner\\\"><p><i>'+type+\\n\" + \n" + 
        "			\"				'</i> event subscribed by '+source+' ('+\\n\" + \n" + 
        "			\"				'<span id=\\\"Event_Trigger\\\">trigger event</span>)<br/>'+\\n\" + \n" + 
        "			\"				this._scriptSource( func )+\\n\" + \n" + 
        "			\"				'</p><pre id=\\\"Event_code\\\" class=\\\"brush: js\\\"></pre></div>' );\\n\" + \n" + 
        "			\"			$('#Event_Trigger').bind( 'click.VisualEvent', trigger );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Modify the function slightly such that the white space that is found at the start of the\\n\" + \n" + 
        "			\"		 * last line in the function is also put at the start of the first line. This allows\\n\" + \n" + 
        "			\"		 * SyntaxHighlighter to be cunning and remove the block white space - otherwise it is all\\n\" + \n" + 
        "			\"		 * shifted to the left, other than the first line\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		var lines = func.split('\\\\n');\\n\" + \n" + 
        "			\"		if ( lines.length > 1 ) {\\n\" + \n" + 
        "			\"			var last = lines[lines.length-1].match(/^(\\\\s*)/g);\\n\" + \n" + 
        "			\"			lines[0] = last + lines[0];\\n\" + \n" + 
        "			\"			func = lines.join('\\\\n');\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Inject the function string here incase it includes a '</textarea>' string */\\n\" + \n" + 
        "			\"		$('pre', this.dom.lightbox).html(\\n\" + \n" + 
        "			\"			func.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')\\n\" + \n" + 
        "			\"		);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		VisualEventSyntaxHighlighter.highlight( null, document.getElementById('Event_code') );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show information about a particular node - the node name, ID and class (if it has either/both\\n\" + \n" + 
        "			\"	 * of the last two)\\n\" + \n" + 
        "			\"	 *  @param {element} node The element to inspect\\n\" + \n" + 
        "			\"	 *  @returns {string} Information about the element\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderNodeInfo\\\": function ( node )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var s = node.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var id = node.getAttribute('id');\\n\" + \n" + 
        "			\"		if ( id && id !== '' ) {\\n\" + \n" + 
        "			\"			s += '#'+id;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var className = node.className;\\n\" + \n" + 
        "			\"		if ( className !== '' ) {\\n\" + \n" + 
        "			\"			s += '.'+className;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return s;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Display the Visual Event toolbar, writing in the required information and adding the event\\n\" + \n" + 
        "			\"	 * handlers as needed\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderLabel\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this,\\n\" + \n" + 
        "			\"			events = 0, i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for (i=0, iLen=this.s.elements.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			events += this.s.elements[i].listeners.length;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('span.Event_LabelEvents', this.dom.label).html( events );\\n\" + \n" + 
        "			\"		$('span.Event_LabelNodes', this.dom.label).html( this.s.elements.length );\\n\" + \n" + 
        "			\"		$('span.Event_LabelNonDom', this.dom.label).html( this.s.nonDomEvents );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		//this.dom.label.innerHTML = \\\"Visual Event\\\";\\n\" + \n" + 
        "			\"		$('span.Event_LabelClose', this.dom.label).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that.close();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('span.Event_LabelHelp', this.dom.label).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that._help();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.help).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that._hideHelp();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Support methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Create an event oject based on the type to trigger an event - cross-platform\\n\" + \n" + 
        "			\"	 *  @param {event} originalEvt The original event (click) which caused this function to run\\n\" + \n" + 
        "			\"	 *  @param {string} type Type of event\\n\" + \n" + 
        "			\"	 *  @param {node} target Target node of the event\\n\" + \n" + 
        "			\"	 *  @returns {event} The constructed event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_createEvent\\\": function( originalEvt, type, target )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var evt = null;\\n\" + \n" + 
        "			\"		var offset = $(target).offset();\\n\" + \n" + 
        "			\"		var typeGroup = this._eventTypeGroup( type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( document.createEvent ) {\\n\" + \n" + 
        "			\"			switch ( typeGroup ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"MouseEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initMouseEvent( type, true, true, window, 0, offset.left, offset.top,\\n\" + \n" + 
        "			\"						offset.left, offset.top, originalEvt.ctrlKey, originalEvt.altKey, originalEvt.shiftKey,\\n\" + \n" + 
        "			\"						originalEvt.metaKey, originalEvt.button, null );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"HTMLEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initEvent( type, true, true );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"UIEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initUIEvent( type, true, true, window, 0 );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( document.createEventObject ) {\\n\" + \n" + 
        "			\"			switch ( typeGroup ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					evt = document.createEventObject();\\n\" + \n" + 
        "			\"					evt.screenX = offset.left;\\n\" + \n" + 
        "			\"					evt.screenX = offset.top;\\n\" + \n" + 
        "			\"					evt.clientX = offset.left;\\n\" + \n" + 
        "			\"					evt.clientY = offset.top;\\n\" + \n" + 
        "			\"					evt.ctrlKey = originalEvt.ctrlKey;\\n\" + \n" + 
        "			\"					evt.altKey = originalEvt.altKey;\\n\" + \n" + 
        "			\"					evt.metaKey = originalEvt.metaKey;\\n\" + \n" + 
        "			\"					evt.button = originalEvt.button;\\n\" + \n" + 
        "			\"					evt.relatedTarget = null;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					/* fall through to basic event object */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					evt = document.createEventObject();\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return evt;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Cancel tooltip mouse timer\\n\" + \n" + 
        "			\"	 *  @param {event} e Mouse event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_timerClear\\\": function ( e )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		if ( this.s.mouseTimer !== null ) {\\n\" + \n" + 
        "			\"			clearTimeout( this.s.mouseTimer );\\n\" + \n" + 
        "			\"			this.s.mouseTimer = null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Combine the main events array, so that each node only has one element\\n\" + \n" + 
        "			\"	 *  @param {array} main The main source array\\n\" + \n" + 
        "			\"	 *  @returns {array} Augmented internal representation\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_merge\\\": function ( main )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var ret = [];\\n\" + \n" + 
        "			\"		var found, i, iLen, j, jLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0, iLen=main.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			found = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( j=0, jLen=ret.length ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"				if ( ret[j].node == main[i].node ) {\\n\" + \n" + 
        "			\"					ret[j].listeners = ret[j].listeners.concat( main[i].listeners );\\n\" + \n" + 
        "			\"					found = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !found ) {\\n\" + \n" + 
        "			\"				ret.push( main[i] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Combine the API array into the internal representation.\\n\" + \n" + 
        "			\"	 * The input structure MUST be valid for this to work - two types of objects are allowed as \\n\" + \n" + 
        "			\"	 *   array entries:\\n\" + \n" + 
        "			\"	 *     { node: '', source: '', func: '', type: '', removed: bool }\\n\" + \n" + 
        "			\"	 *     { node: '', source: '', listeners: [ func: '', type: '', removed: bool, ... ] }\\n\" + \n" + 
        "			\"	 *  @param {array} main The main source array\\n\" + \n" + 
        "			\"	 *  @param {array} api The API array\\n\" + \n" + 
        "			\"	 *  @returns {array} Augmented internal representation\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_combineEvents\\\": function ( main, api )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var i, j,\\n\" + \n" + 
        "			\"			found, found2;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0 ; i<api.length ; i++ ) {\\n\" + \n" + 
        "			\"			if ( typeof api[i].listeners != 'undefined' ) {\\n\" + \n" + 
        "			\"				main.push( api[i] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else {\\n\" + \n" + 
        "			\"				found = -1;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* Want to combine single definitions into our single entry for each node array */\\n\" + \n" + 
        "			\"				for ( j=0 ; j<main.length ; j++ ) {\\n\" + \n" + 
        "			\"					if ( main[j].node == api[i].node ) {\\n\" + \n" + 
        "			\"						found = j;\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( found == -1 ) {\\n\" + \n" + 
        "			\"					main.push( {\\n\" + \n" + 
        "			\"						\\\"node\\\": api[i].node,\\n\" + \n" + 
        "			\"						\\\"source\\\": api[i].source,\\n\" + \n" + 
        "			\"						\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"							\\\"type\\\": api[i].type,\\n\" + \n" + 
        "			\"							\\\"func\\\": api[i].func,\\n\" + \n" + 
        "			\"							\\\"removed\\\": api[i].removed\\n\" + \n" + 
        "			\"						} ]\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				else {\\n\" + \n" + 
        "			\"					/* Check to see if this exact event has already been added at some point */\\n\" + \n" + 
        "			\"					found2 = -1;\\n\" + \n" + 
        "			\"					for ( j=0 ; j<main[ found ].listeners.length ; j++ ) {\\n\" + \n" + 
        "			\"						if ( main[ found ].listeners[j].type == api[i].type &&\\n\" + \n" + 
        "			\"								 main[ found ].listeners[j].func == api[i].func )\\n\" + \n" + 
        "			\"						{\\n\" + \n" + 
        "			\"							/* Update removed variable */\\n\" + \n" + 
        "			\"							main[ found ].listeners[j].removed = api[i].removed;\\n\" + \n" + 
        "			\"							found2 = j;\\n\" + \n" + 
        "			\"							break;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					/* If not found - then add it in */\\n\" + \n" + 
        "			\"					if ( found2 != -1 ) {\\n\" + \n" + 
        "			\"						main[ found ].listeners.push( {\\n\" + \n" + 
        "			\"							\\\"type\\\": api[i].type,\\n\" + \n" + 
        "			\"							\\\"func\\\": api[i].func,\\n\" + \n" + 
        "			\"							\\\"removed\\\": api[i].removed\\n\" + \n" + 
        "			\"						} );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return main;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Group the event types as per w3c groupings\\n\" + \n" + 
        "			\"	 *  @param {string} type Event type\\n\" + \n" + 
        "			\"	 *  @returns {string} Event grouping\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventTypeGroup\\\": function ( type )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		switch ( type ) {\\n\" + \n" + 
        "			\"			case 'click':\\n\" + \n" + 
        "			\"			case 'dblclick':\\n\" + \n" + 
        "			\"			case 'mousedown':\\n\" + \n" + 
        "			\"			case 'mousemove':\\n\" + \n" + 
        "			\"			case 'mouseout':\\n\" + \n" + 
        "			\"			case 'mouseover':\\n\" + \n" + 
        "			\"			case 'mouseup':\\n\" + \n" + 
        "			\"			case 'scroll':\\n\" + \n" + 
        "			\"				return 'mouse';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			case 'change':\\n\" + \n" + 
        "			\"			case 'focus':\\n\" + \n" + 
        "			\"			case 'blur':\\n\" + \n" + 
        "			\"			case 'select':\\n\" + \n" + 
        "			\"			case 'submit':\\n\" + \n" + 
        "			\"				return 'html';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			case 'keydown':\\n\" + \n" + 
        "			\"			case 'keypress':\\n\" + \n" + 
        "			\"			case 'keyup':\\n\" + \n" + 
        "			\"			case 'load':\\n\" + \n" + 
        "			\"			case 'unload':\\n\" + \n" + 
        "			\"				return 'ui';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			default:\\n\" + \n" + 
        "			\"				return 'custom';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Compute the background colour of the event indicator from the event types\\n\" + \n" + 
        "			\"	 *  @param {array} events Events information\\n\" + \n" + 
        "			\"	 *  @returns {string} Color\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_getColorFromTypes\\\": function ( events )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var hasMouse = false;\\n\" + \n" + 
        "			\"		var hasHtml = false;\\n\" + \n" + 
        "			\"		var hasUi = false;\\n\" + \n" + 
        "			\"		var group, i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0 ; i<events.length ; i++ ) {\\n\" + \n" + 
        "			\"			group = this._eventTypeGroup( events[i].type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			switch ( group ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					hasMouse = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					hasHtml = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					/* We call 'custom' and 'unknown' types UI as well */\\n\" + \n" + 
        "			\"					hasUi = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					hasUi = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/*\\n\" + \n" + 
        "			\"		 * Since we have three event groups which can be in any combination - then we can group the\\n\" + \n" + 
        "			\"		 * resultant colours via the colour wheel\\n\" + \n" + 
        "			\"		 *        \\n\" + \n" + 
        "			\"		 *                        Red (UI)\\n\" + \n" + 
        "			\"		 *                         +++++\\n\" + \n" + 
        "			\"		 *                       ++     ++\\n\" + \n" + 
        "			\"		 *                     ++         ++\\n\" + \n" + 
        "			\"		 *                     ++         ++\\n\" + \n" + 
        "			\"		 *       Yellow (Html)   ++     ++   Blue (mouse)\\n\" + \n" + 
        "			\"		 *                         +++++\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"	 if ( hasMouse && hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'black';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( !hasMouse && hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'orange';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse && !hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'purple';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse && hasHtml && !hasUi ) {\\n\" + \n" + 
        "			\"			return 'green';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse ) {\\n\" + \n" + 
        "			\"			return 'blue';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasHtml ) {\\n\" + \n" + 
        "			\"			return 'yellow';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasUi ) {\\n\" + \n" + 
        "			\"			return 'red';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\" * Statics\\n\" + \n" + 
        "			\" * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Javascript library parsers which will find information about the nodes and events which are\\n\" + \n" + 
        "			\" * used in the page. This is an array of functions which must return an array of objects with\\n\" + \n" + 
        "			\" * the following parameters\\n\" + \n" + 
        "			\" *   {element} node The DOM element in question\\n\" + \n" + 
        "			\" *   {array} listeners Array of objects which with details about each of the events on this node\\n\" + \n" + 
        "			\" *     {string} func Source of the event handler (from Function.toString())\\n\" + \n" + 
        "			\" *     {string} source Library name / version\\n\" + \n" + 
        "			\" *     {string} type Type of event (click, change, keyup etc)\\n\" + \n" + 
        "			\" *     {boolean} removed Flag to indicate if the event has been removed (for API)\\n\" + \n" + 
        "			\" *  @type array\\n\" + \n" + 
        "			\" *  @default []\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.parsers = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Reference to the currently running VisualEvent instance (one at a time only)\\n\" + \n" + 
        "			\" *  @type object\\n\" + \n" + 
        "			\" *  @default null\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" *  @private\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.instance = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Close Visual Event, removing all DOM elements and event handlers\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.close = function ()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"	VisualEvent.instance.close();\\n\" + \n" + 
        "			\"	VisualEvent.instance = null;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Compare two version strings\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" *  @param {string} v1 Version 1 string\\n\" + \n" + 
        "			\" *  @param {string} operator '<', '<=', '==', '>=' or '>' - logic operation to\\n\" + \n" + 
        "			\" *    perform\\n\" + \n" + 
        "			\" *  @param {string} v2 Version 2 string\\n\" + \n" + 
        "			\" *  @returns {boolean} true if condition is correct, false otherwise\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.versionCompare = function ( v1, operator, v2 ) {\\n\" + \n" + 
        "			\"	var a1 = v1.split('.');\\n\" + \n" + 
        "			\"	var a2 = v2.split('.');\\n\" + \n" + 
        "			\"	var i1, i2;\\n\" + \n" + 
        "			\"	var test = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i=0, iLen=a2.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		i1 = parseInt( a1[i], 10 ) || 0;\\n\" + \n" + 
        "			\"		i2 = parseInt( a2[i], 10 ) || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Parts are the same, keep comparing\\n\" + \n" + 
        "			\"		if ( i1 < i2 ) {\\n\" + \n" + 
        "			\"			test = -1;\\n\" + \n" + 
        "			\"			break;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( i1 > i2 ) {\\n\" + \n" + 
        "			\"			test = 1;\\n\" + \n" + 
        "			\"			break;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( operator === '<' ) {\\n\" + \n" + 
        "			\"		return test === -1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '<=' ) {\\n\" + \n" + 
        "			\"		return test === -1 || test === 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '==' ) {\\n\" + \n" + 
        "			\"		return test === 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '>=' ) {\\n\" + \n" + 
        "			\"		return test === 0 || test === 1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '>' ) {\\n\" + \n" + 
        "			\"		return test === 1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	throw 'Unknown operator: '+operator;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	var\\n\" + \n" + 
        "			\"		elements = [], n,\\n\" + \n" + 
        "			\"		all = document.getElementsByTagName('*'),\\n\" + \n" + 
        "			\"		types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover',\\n\" + \n" + 
        "			\"			'mouseup', 'change', 'focus', 'blur', 'scroll', 'select', 'submit', 'keydown', 'keypress',\\n\" + \n" + 
        "			\"			'keyup', 'load', 'unload' ],\\n\" + \n" + 
        "			\"		i, iLen, j, jLen = types.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		for ( j=0 ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"			if ( typeof all[i]['on'+types[j]] == 'function' ) {\\n\" + \n" + 
        "			\"				elements.push( {\\n\" + \n" + 
        "			\"					\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"					\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"						\\\"type\\\": types[j],\\n\" + \n" + 
        "			\"						\\\"func\\\": all[i]['on'+types[j]].toString(),\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": 'DOM 0 event'\\n\" + \n" + 
        "			\"					} ]\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Visual Event parser for jquery.entwine\\n\" + \n" + 
        "			\" * @author Luke Hudson <github@speak.geek.nz>\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"/* global jQuery, VisualEvent */\\n\" + \n" + 
        "			\"\\\"use strict\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function entwineParser() {\\n\" + \n" + 
        "			\"        if (!jQuery || !jQuery.fn.entwine) {\\n\" + \n" + 
        "			\"            return [];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var out = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for(var namespace in jQuery.entwine.namespaces) {\\n\" + \n" + 
        "			\"            if (!jQuery.entwine.namespaces.hasOwnProperty(namespace)) {\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var store = jQuery.entwine.namespaces[namespace].store;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for(var key in store) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (!store.hasOwnProperty(key)) {\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                // only look for events, entwine allows other functions too.\\n\" + \n" + 
        "			\"                if (!key.match(/^on/)) {\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                var eventName = key.replace(/^on/, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                for(var i=0; i < store[key].length; i++) {\\n\" + \n" + 
        "			\"                    var binding = store[key][i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    if (typeof binding !== 'object' || !binding.selector) {\\n\" + \n" + 
        "			\"                        continue;\\n\" + \n" + 
        "			\"                    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    var nodes = $(binding.selector.selector);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    for (var j = 0; j < nodes.length; j++) {\\n\" + \n" + 
        "			\"                        out.push({\\n\" + \n" + 
        "			\"                            node: nodes[j],\\n\" + \n" + 
        "			\"                            listeners: [{\\n\" + \n" + 
        "			\"                                type: eventName,\\n\" + \n" + 
        "			\"                                func: binding.func.toString(),\\n\" + \n" + 
        "			\"                                removed: false,\\n\" + \n" + 
        "			\"                                source: \\\"jquery.entwine\\\"\\n\" + \n" + 
        "			\"                            }]\\n\" + \n" + 
        "			\"                        });\\n\" + \n" + 
        "			\"                    } // end node loop\\n\" + \n" + 
        "			\"                } // end store[key] contents loop\\n\" + \n" + 
        "			\"            } // end store keys loop\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        return out;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    VE.parsers.push(entwineParser);\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"(function(window, document, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function eventsFor(node) {\\n\" + \n" + 
        "			\"    var listener = node[Eventi._._key];\\n\" + \n" + 
        "			\"    if (listener) {\\n\" + \n" + 
        "			\"        var record = {\\n\" + \n" + 
        "			\"            node: node,\\n\" + \n" + 
        "			\"            listeners: []\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"        cache = listener.s;\\n\" + \n" + 
        "			\"        for (var type in cache) {\\n\" + \n" + 
        "			\"            var handlers = cache[type];\\n\" + \n" + 
        "			\"            for (var i=0,m=handlers.length; i<m; i++) {\\n\" + \n" + 
        "			\"                var handler = handlers[i];\\n\" + \n" + 
        "			\"                record.listeners.push({\\n\" + \n" + 
        "			\"                    type: handler.text,\\n\" + \n" + 
        "			\"                    func: handler.fn.toString(),\\n\" + \n" + 
        "			\"                    removed: false,\\n\" + \n" + 
        "			\"                    source: 'Eventi'\\n\" + \n" + 
        "			\"                });\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        if (record.listeners.length) {\\n\" + \n" + 
        "			\"            return record;\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Eventi*/\\n\" + \n" + 
        "			\"VisualEvent.parsers.push(function() {\\n\" + \n" + 
        "			\"    var list = [];\\n\" + \n" + 
        "			\"    if (typeof Eventi !== 'undefined') {\\n\" + \n" + 
        "			\"        var key = Eventi._._key,\\n\" + \n" + 
        "			\"            nodes = document.getElementsByTagName('*'),\\n\" + \n" + 
        "			\"            record;\\n\" + \n" + 
        "			\"        if ((record = eventsFor(window))) {\\n\" + \n" + 
        "			\"            list.push(record);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        for (var i=0,m=nodes.length ; i<m ; i++ ) {\\n\" + \n" + 
        "			\"            if ((record = eventsFor(nodes[i]))) {\\n\" + \n" + 
        "			\"                list.push(record);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"    return list;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, VisualEvent);\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Ext*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof Ext == \\\"undefined\\\" || Ext.versions.core.version.indexOf('4.0') !== 0 ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var j in Ext.cache ) {\\n\" + \n" + 
        "			\"		var cache = Ext.cache[j];\\n\" + \n" + 
        "			\"		if ( typeof cache.events == 'object' ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var events = cache.events;\\n\" + \n" + 
        "			\"			if ( !$.isEmptyObject( events ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var listeners = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var event in events ) {\\n\" + \n" + 
        "			\"					// there is an array of handlers for each event\\n\" + \n" + 
        "			\"					if (events[event].length > 0) {\\n\" + \n" + 
        "			\"						for (var k=0; k<events[event].length; ++k) {\\n\" + \n" + 
        "			\"							listeners.push( {\\n\" + \n" + 
        "			\"								\\\"type\\\": event,\\n\" + \n" + 
        "			\"								\\\"func\\\": events[event][k].fn.toString(),\\n\" + \n" + 
        "			\"								\\\"removed\\\": false,\\n\" + \n" + 
        "			\"								\\\"source\\\": 'ExtJS '+Ext.versions.core.version\\n\" + \n" + 
        "			\"							} );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if (listeners.length > 0) {\\n\" + \n" + 
        "			\"					elements.push( {\\n\" + \n" + 
        "			\"						\\\"node\\\": cache.el.dom,\\n\" + \n" + 
        "			\"						\\\"listeners\\\": listeners\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global glow*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof glow == 'undefined' || typeof glow.events.listenersByObjId == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var listeners = glow.events.listenersByObjId;\\n\" + \n" + 
        "			\"	var globalGlow = \\\"__eventId\\\"+glow.UID;\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen, j, jLen;\\n\" + \n" + 
        "			\"	var eventIndex, eventType, typeEvents;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		/* If the element has a \\\"__eventId\\\"+glow.UID parameter, then it has glow events */\\n\" + \n" + 
        "			\"		if ( typeof all[i][globalGlow] != 'undefined' ) {\\n\" + \n" + 
        "			\"			eventIndex = all[i][globalGlow];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( eventType in listeners[eventIndex] ) {\\n\" + \n" + 
        "			\"				typeEvents = listeners[eventIndex][eventType];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* There is a sub array for each event type in Glow, so we loop over that */\\n\" + \n" + 
        "			\"				for ( j=0, jLen=typeEvents.length ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"					elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"						\\\"type\\\": eventType,\\n\" + \n" + 
        "			\"						\\\"func\\\": typeEvents[j][2].toString(),\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": \\\"Glow\\\"\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jQuery*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.5, 1.6\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery ||\\n\" + \n" + 
        "			\"		VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ||\\n\" + \n" + 
        "			\"		VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	for ( var j in jQuery.cache ) {\\n\" + \n" + 
        "			\"		jQueryGenericLoop( elements, jQuery.cache[j] );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.4, 1.7\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if (\\n\" + \n" + 
        "			\"		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.4' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ) ||\\n\" + \n" + 
        "			\"		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var elements = [];\\n\" + \n" + 
        "			\"		jQueryGenericLoop( elements, jQuery.cache );\\n\" + \n" + 
        "			\"		return elements;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return [];\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.8+\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery || VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get all 'live' (on) events\\n\" + \n" + 
        "			\"	$(document).each(function(index1, element) {\\n\" + \n" + 
        "			\"		jQueryGeneric(elements, element, element);\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get events on nodes\\n\" + \n" + 
        "			\"	$('*').each(function(index1, element) {\\n\" + \n" + 
        "			\"		jQueryGeneric(elements, element, element);\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function jQueryGenericLoop (elements, cache) {\\n\" + \n" + 
        "			\"	$.each( cache, function ( key, val ) {\\n\" + \n" + 
        "			\"		if ( val.handle ) {\\n\" + \n" + 
        "			\"			jQueryGeneric(elements, val, val.handle.elem);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	} );\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function jQueryGeneric (elements, eventsObject, node) {\\n\" + \n" + 
        "			\"	if ( typeof eventsObject == 'object' ) {\\n\" + \n" + 
        "			\"		var events;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if (typeof eventsObject.events == 'object') {\\n\" + \n" + 
        "			\"			events = eventsObject.events;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( ! events ) {\\n\" + \n" + 
        "			\"			events = $._data(eventsObject, 'events');\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var func;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var type in events ) {\\n\" + \n" + 
        "			\"			if ( events.hasOwnProperty( type ) ) {\\n\" + \n" + 
        "			\"				/* Ignore live event object - live events are listed as normal events as well */\\n\" + \n" + 
        "			\"				if ( type == 'live' ) {\\n\" + \n" + 
        "			\"					continue;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var oEvents = events[type];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var j in oEvents ) {\\n\" + \n" + 
        "			\"					if ( oEvents.hasOwnProperty( j ) ) {\\n\" + \n" + 
        "			\"						var aNodes = [];\\n\" + \n" + 
        "			\"						var sjQuery = \\\"jQuery \\\" + jQuery.fn.jquery;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( typeof oEvents[j].selector != 'undefined' && oEvents[j].selector !== null ) {\\n\" + \n" + 
        "			\"							aNodes = $(oEvents[j].selector, node);\\n\" + \n" + 
        "			\"							sjQuery += \\\" (live event)\\\";\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						else {\\n\" + \n" + 
        "			\"							aNodes.push( node );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						for ( var k=0, kLen=aNodes.length ; k<kLen ; k++ ) {\\n\" + \n" + 
        "			\"							elements.push( {\\n\" + \n" + 
        "			\"								\\\"node\\\": aNodes[k],\\n\" + \n" + 
        "			\"								\\\"listeners\\\": []\\n\" + \n" + 
        "			\"							} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							if ( typeof oEvents[j].origHandler != 'undefined' ) {\\n\" + \n" + 
        "			\"								func = oEvents[j].origHandler.toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							else if ( typeof oEvents[j].handler != 'undefined' ) {\\n\" + \n" + 
        "			\"								func = oEvents[j].handler.toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							else {\\n\" + \n" + 
        "			\"								func = oEvents[j].toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							/* We use jQuery for the Visual Event events... don't really want to display them */\\n\" + \n" + 
        "			\"							if ( oEvents[j] && oEvents[j].namespace != \\\"VisualEvent\\\" && func != \\\"0\\\" )\\n\" + \n" + 
        "			\"							{\\n\" + \n" + 
        "			\"								elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"									\\\"type\\\": type,\\n\" + \n" + 
        "			\"									\\\"func\\\": func,\\n\" + \n" + 
        "			\"									\\\"removed\\\": false,\\n\" + \n" + 
        "			\"									\\\"source\\\": sjQuery\\n\" + \n" + 
        "			\"								} );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Remove elements that didn't have any listeners (i.e. might be a Visual Event node)\\n\" + \n" + 
        "			\"					if ( elements.length && elements[ elements.length-1 ].listeners.length === 0 ) {\\n\" + \n" + 
        "			\"						elements.splice( elements.length-1, 1 );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jQuery*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.3\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( !jQuery || VE.versionCompare( jQuery.fn.jquery, '>', '1.3' ) ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var cache = jQuery.cache;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i in cache ) {\\n\" + \n" + 
        "			\"		if ( typeof cache[i].events == 'object' ) {\\n\" + \n" + 
        "			\"			var nEventNode = cache[i].handle.elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": nEventNode,\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var type in cache[i].events )\\n\" + \n" + 
        "			\"			{\\n\" + \n" + 
        "			\"				var oEvent = cache[i].events[type];\\n\" + \n" + 
        "			\"				var iFunctionIndex;\\n\" + \n" + 
        "			\"				for ( iFunctionIndex in oEvent) {\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* We use jQuery for the Visual Event events... don't really want to display them */\\n\" + \n" + 
        "			\"				var func = oEvent[ iFunctionIndex ].toString();\\n\" + \n" + 
        "			\"				if ( !func.match(/VisualEvent/) && !func.match(/EventLoader/) )\\n\" + \n" + 
        "			\"				{\\n\" + \n" + 
        "			\"					elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"						\\\"type\\\": type,\\n\" + \n" + 
        "			\"						\\\"func\\\": func,\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": 'jQuery'\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.3 live events\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( !jQuery || jQuery.fn.live != 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data == 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data(document, \\\"events\\\") == 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data(document, \\\"events\\\").live == 'undefined' )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var cache = jQuery.cache;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.each( jQuery.data(document, \\\"events\\\").live || [], function(i, fn) {\\n\" + \n" + 
        "			\"		var event = fn.type.split('.');\\n\" + \n" + 
        "			\"		event = event[0];\\n\" + \n" + 
        "			\"		var selector = fn.data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(selector).each( function(i) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				node: this,\\n\" + \n" + 
        "			\"				listeners: [],\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements[elements.length - 1].listeners.push({\\n\" + \n" + 
        "			\"				type: event,\\n\" + \n" + 
        "			\"				func: 'Unable to obtain function from live() bound event.',\\n\" + \n" + 
        "			\"				removed: false,\\n\" + \n" + 
        "			\"				source: \\\"jQuery 1.3 live\\\"\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jsBase*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof jsBase == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var a = jsBase.aEventCache;\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=a.length ; i<iLen ; i++ )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		elements.push( {\\n\" + \n" + 
        "			\"			\\\"node\\\": a[i].nElement,\\n\" + \n" + 
        "			\"			\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"				\\\"type\\\": a[i].type,\\n\" + \n" + 
        "			\"				\\\"func\\\": a[i].fn.toString(),\\n\" + \n" + 
        "			\"				\\\"removed\\\": false,\\n\" + \n" + 
        "			\"				\\\"source\\\": 'jsBase'\\n\" + \n" + 
        "			\"			} ]\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global MooTools*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof MooTools == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"	var events, mooEvent;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		events = all[i].retrieve('events', {});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !$.isEmptyObject( events ) ) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( mooEvent in events ) {\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": mooEvent,\\n\" + \n" + 
        "			\"					\\\"func\\\": events[mooEvent].keys.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'MooTools'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Prototype,Event*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof Prototype == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"	var eventType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		if ( typeof all[i]._prototypeEventID != 'undefined' ) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( eventType in Event.cache[ all[i]._prototypeEventID ] ) {\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": eventType,\\n\" + \n" + 
        "			\"					\\\"func\\\": Event.cache[ all[i]._prototypeEventID ][eventType][0].handler.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'Prototype'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global YAHOO*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof YAHOO == 'undefined' || typeof YAHOO.util == 'undefined' ||\\n\" + \n" + 
        "			\"		 typeof YAHOO.util.Event == 'undefined' )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/*\\n\" + \n" + 
        "			\"	 * Since the YUI cache is a private variable - we need to use the getListeners function on\\n\" + \n" + 
        "			\"	 * all nodes in the document\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen, j, jLen;\\n\" + \n" + 
        "			\"	var elements = [], events;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		events = YAHOO.util.Event.getListeners( all[i] );\\n\" + \n" + 
        "			\"		if ( events !== null && events.length !== 0 )\\n\" + \n" + 
        "			\"		{\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": events[0].scope,\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( j=0, jLen=events.length ; j<jLen ; j++ )\\n\" + \n" + 
        "			\"			{\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": events[j].type,\\n\" + \n" + 
        "			\"					\\\"func\\\": events[j].fn.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'YUI 2'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\";\n" + 
        "			document.body.appendChild( n );\n" + 
        "		}\n" + 
        "		else if ( type == 'vsjq' ) {\n" + 
        "			n = document.createElement( 'script' );\n" + 
        "			n.setAttribute( 'language', 'JavaScript' );\n" + 
        "			n.text = \"(function( window, undefined ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Use the correct document accordingly with window argument (sandbox)\\n\" + \n" + 
        "			\"var document = window.document,\\n\" + \n" + 
        "			\"	navigator = window.navigator,\\n\" + \n" + 
        "			\"	location = window.location;\\n\" + \n" + 
        "			\"var jQuery = (function() {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Define a local copy of jQuery\\n\" + \n" + 
        "			\"var jQuery = function( selector, context ) {\\n\" + \n" + 
        "			\"		// The jQuery object is actually just the init constructor 'enhanced'\\n\" + \n" + 
        "			\"		return new jQuery.fn.init( selector, context, rootjQuery );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Map over jQuery in case of overwrite\\n\" + \n" + 
        "			\"	_jQuery = window.jQuery,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Map over the $ in case of overwrite\\n\" + \n" + 
        "			\"	_$ = window.$,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A central reference to the root jQuery(document)\\n\" + \n" + 
        "			\"	rootjQuery,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A simple way to check for HTML strings or ID strings\\n\" + \n" + 
        "			\"	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\\n\" + \n" + 
        "			\"	quickExpr = /^(?:[^#<]*(<[\\\\w\\\\W]+>)[^>]*$|#([\\\\w\\\\-]*)$)/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if a string has a non-whitespace character in it\\n\" + \n" + 
        "			\"	rnotwhite = /\\\\S/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Used for trimming whitespace\\n\" + \n" + 
        "			\"	trimLeft = /^\\\\s+/,\\n\" + \n" + 
        "			\"	trimRight = /\\\\s+$/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check for digits\\n\" + \n" + 
        "			\"	rdigit = /\\\\d/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Match a standalone tag\\n\" + \n" + 
        "			\"	rsingleTag = /^<(\\\\w+)\\\\s*\\\\/?>(?:<\\\\/\\\\1>)?$/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// JSON RegExp\\n\" + \n" + 
        "			\"	rvalidchars = /^[\\\\],:{}\\\\s]*$/,\\n\" + \n" + 
        "			\"	rvalidescape = /\\\\\\\\(?:[\\\"\\\\\\\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g,\\n\" + \n" + 
        "			\"	rvalidtokens = /\\\"[^\\\"\\\\\\\\\\\\n\\\\r]*\\\"|true|false|null|-?\\\\d+(?:\\\\.\\\\d*)?(?:[eE][+\\\\-]?\\\\d+)?/g,\\n\" + \n" + 
        "			\"	rvalidbraces = /(?:^|:|,)(?:\\\\s*\\\\[)+/g,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Useragent RegExp\\n\" + \n" + 
        "			\"	rwebkit = /(webkit)[ \\\\/]([\\\\w.]+)/,\\n\" + \n" + 
        "			\"	ropera = /(opera)(?:.*version)?[ \\\\/]([\\\\w.]+)/,\\n\" + \n" + 
        "			\"	rmsie = /(msie) ([\\\\w.]+)/,\\n\" + \n" + 
        "			\"	rmozilla = /(mozilla)(?:.*? rv:([\\\\w.]+))?/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Matches dashed string for camelizing\\n\" + \n" + 
        "			\"	rdashAlpha = /-([a-z]|[0-9])/ig,\\n\" + \n" + 
        "			\"	rmsPrefix = /^-ms-/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Used by jQuery.camelCase as callback to replace()\\n\" + \n" + 
        "			\"	fcamelCase = function( all, letter ) {\\n\" + \n" + 
        "			\"		return ( letter + \\\"\\\" ).toUpperCase();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Keep a UserAgent string for use with jQuery.browser\\n\" + \n" + 
        "			\"	userAgent = navigator.userAgent,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// For matching the engine and version of the browser\\n\" + \n" + 
        "			\"	browserMatch,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The deferred used on DOM ready\\n\" + \n" + 
        "			\"	readyList,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The ready event handler\\n\" + \n" + 
        "			\"	DOMContentLoaded,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Save a reference to some core methods\\n\" + \n" + 
        "			\"	toString = Object.prototype.toString,\\n\" + \n" + 
        "			\"	hasOwn = Object.prototype.hasOwnProperty,\\n\" + \n" + 
        "			\"	push = Array.prototype.push,\\n\" + \n" + 
        "			\"	slice = Array.prototype.slice,\\n\" + \n" + 
        "			\"	trim = String.prototype.trim,\\n\" + \n" + 
        "			\"	indexOf = Array.prototype.indexOf,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// [[Class]] -> type pairs\\n\" + \n" + 
        "			\"	class2type = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn = jQuery.prototype = {\\n\" + \n" + 
        "			\"	constructor: jQuery,\\n\" + \n" + 
        "			\"	init: function( selector, context, rootjQuery ) {\\n\" + \n" + 
        "			\"		var match, elem, ret, doc;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle $(\\\"\\\"), $(null), or $(undefined)\\n\" + \n" + 
        "			\"		if ( !selector ) {\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle $(DOMElement)\\n\" + \n" + 
        "			\"		if ( selector.nodeType ) {\\n\" + \n" + 
        "			\"			this.context = this[0] = selector;\\n\" + \n" + 
        "			\"			this.length = 1;\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// The body element only exists once, optimize finding it\\n\" + \n" + 
        "			\"		if ( selector === \\\"body\\\" && !context && document.body ) {\\n\" + \n" + 
        "			\"			this.context = document;\\n\" + \n" + 
        "			\"			this[0] = document.body;\\n\" + \n" + 
        "			\"			this.selector = selector;\\n\" + \n" + 
        "			\"			this.length = 1;\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle HTML strings\\n\" + \n" + 
        "			\"		if ( typeof selector === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			// Are we dealing with HTML string or an ID?\\n\" + \n" + 
        "			\"			if ( selector.charAt(0) === \\\"<\\\" && selector.charAt( selector.length - 1 ) === \\\">\\\" && selector.length >= 3 ) {\\n\" + \n" + 
        "			\"				// Assume that strings that start and end with <> are HTML and skip the regex check\\n\" + \n" + 
        "			\"				match = [ null, selector, null ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				match = quickExpr.exec( selector );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Verify a match, and that no context was specified for #id\\n\" + \n" + 
        "			\"			if ( match && (match[1] || !context) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// HANDLE: $(html) -> $(array)\\n\" + \n" + 
        "			\"				if ( match[1] ) {\\n\" + \n" + 
        "			\"					context = context instanceof jQuery ? context[0] : context;\\n\" + \n" + 
        "			\"					doc = (context ? context.ownerDocument || context : document);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// If a single string is passed in and it's a single tag\\n\" + \n" + 
        "			\"					// just do a createElement and skip the rest\\n\" + \n" + 
        "			\"					ret = rsingleTag.exec( selector );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( ret ) {\\n\" + \n" + 
        "			\"						if ( jQuery.isPlainObject( context ) ) {\\n\" + \n" + 
        "			\"							selector = [ document.createElement( ret[1] ) ];\\n\" + \n" + 
        "			\"							jQuery.fn.attr.call( selector, context, true );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						} else {\\n\" + \n" + 
        "			\"							selector = [ doc.createElement( ret[1] ) ];\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );\\n\" + \n" + 
        "			\"						selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					return jQuery.merge( this, selector );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// HANDLE: $(\\\"#id\\\")\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					elem = document.getElementById( match[2] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Check parentNode to catch when Blackberry 4.6 returns\\n\" + \n" + 
        "			\"					// nodes that are no longer in the document #6963\\n\" + \n" + 
        "			\"					if ( elem && elem.parentNode ) {\\n\" + \n" + 
        "			\"						// Handle the case where IE and Opera return items\\n\" + \n" + 
        "			\"						// by name instead of ID\\n\" + \n" + 
        "			\"						if ( elem.id !== match[2] ) {\\n\" + \n" + 
        "			\"							return rootjQuery.find( selector );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Otherwise, we inject the element directly into the jQuery object\\n\" + \n" + 
        "			\"						this.length = 1;\\n\" + \n" + 
        "			\"						this[0] = elem;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					this.context = document;\\n\" + \n" + 
        "			\"					this.selector = selector;\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// HANDLE: $(expr, $(...))\\n\" + \n" + 
        "			\"			} else if ( !context || context.jquery ) {\\n\" + \n" + 
        "			\"				return (context || rootjQuery).find( selector );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// HANDLE: $(expr, context)\\n\" + \n" + 
        "			\"			// (which is just equivalent to: $(context).find(expr)\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				return this.constructor( context ).find( selector );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// HANDLE: $(function)\\n\" + \n" + 
        "			\"		// Shortcut for document ready\\n\" + \n" + 
        "			\"		} else if ( jQuery.isFunction( selector ) ) {\\n\" + \n" + 
        "			\"			return rootjQuery.ready( selector );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if (selector.selector !== undefined) {\\n\" + \n" + 
        "			\"			this.selector = selector.selector;\\n\" + \n" + 
        "			\"			this.context = selector.context;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return jQuery.makeArray( selector, this );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Start with an empty selector\\n\" + \n" + 
        "			\"	selector: \\\"\\\",\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The current version of jQuery being used\\n\" + \n" + 
        "			\"	jquery: \\\"1.6.4\\\",\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The default length of a jQuery object is 0\\n\" + \n" + 
        "			\"	length: 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The number of elements contained in the matched element set\\n\" + \n" + 
        "			\"	size: function() {\\n\" + \n" + 
        "			\"		return this.length;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	toArray: function() {\\n\" + \n" + 
        "			\"		return slice.call( this, 0 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get the Nth element in the matched element set OR\\n\" + \n" + 
        "			\"	// Get the whole matched element set as a clean array\\n\" + \n" + 
        "			\"	get: function( num ) {\\n\" + \n" + 
        "			\"		return num == null ?\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Return a 'clean' array\\n\" + \n" + 
        "			\"			this.toArray() :\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Return just the object\\n\" + \n" + 
        "			\"			( num < 0 ? this[ this.length + num ] : this[ num ] );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Take an array of elements and push it onto the stack\\n\" + \n" + 
        "			\"	// (returning the new matched element set)\\n\" + \n" + 
        "			\"	pushStack: function( elems, name, selector ) {\\n\" + \n" + 
        "			\"		// Build a new jQuery matched element set\\n\" + \n" + 
        "			\"		var ret = this.constructor();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isArray( elems ) ) {\\n\" + \n" + 
        "			\"			push.apply( ret, elems );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			jQuery.merge( ret, elems );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add the old object onto the stack (as a reference)\\n\" + \n" + 
        "			\"		ret.prevObject = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ret.context = this.context;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( name === \\\"find\\\" ) {\\n\" + \n" + 
        "			\"			ret.selector = this.selector + (this.selector ? \\\" \\\" : \\\"\\\") + selector;\\n\" + \n" + 
        "			\"		} else if ( name ) {\\n\" + \n" + 
        "			\"			ret.selector = this.selector + \\\".\\\" + name + \\\"(\\\" + selector + \\\")\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Return the newly-formed element set\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Execute a callback for every element in the matched set.\\n\" + \n" + 
        "			\"	// (You can seed the arguments with an array of args, but this is\\n\" + \n" + 
        "			\"	// only used internally.)\\n\" + \n" + 
        "			\"	each: function( callback, args ) {\\n\" + \n" + 
        "			\"		return jQuery.each( this, callback, args );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	ready: function( fn ) {\\n\" + \n" + 
        "			\"		// Attach the listeners\\n\" + \n" + 
        "			\"		jQuery.bindReady();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add the callback\\n\" + \n" + 
        "			\"		readyList.done( fn );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	eq: function( i ) {\\n\" + \n" + 
        "			\"		return i === -1 ?\\n\" + \n" + 
        "			\"			this.slice( i ) :\\n\" + \n" + 
        "			\"			this.slice( i, +i + 1 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	first: function() {\\n\" + \n" + 
        "			\"		return this.eq( 0 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	last: function() {\\n\" + \n" + 
        "			\"		return this.eq( -1 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	slice: function() {\\n\" + \n" + 
        "			\"		return this.pushStack( slice.apply( this, arguments ),\\n\" + \n" + 
        "			\"			\\\"slice\\\", slice.call(arguments).join(\\\",\\\") );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	map: function( callback ) {\\n\" + \n" + 
        "			\"		return this.pushStack( jQuery.map(this, function( elem, i ) {\\n\" + \n" + 
        "			\"			return callback.call( elem, i, elem );\\n\" + \n" + 
        "			\"		}));\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	end: function() {\\n\" + \n" + 
        "			\"		return this.prevObject || this.constructor(null);\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// For internal use only.\\n\" + \n" + 
        "			\"	// Behaves like an Array's method, not like a jQuery method.\\n\" + \n" + 
        "			\"	push: push,\\n\" + \n" + 
        "			\"	sort: [].sort,\\n\" + \n" + 
        "			\"	splice: [].splice\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Give the init function the jQuery prototype for later instantiation\\n\" + \n" + 
        "			\"jQuery.fn.init.prototype = jQuery.fn;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend = jQuery.fn.extend = function() {\\n\" + \n" + 
        "			\"	var options, name, src, copy, copyIsArray, clone,\\n\" + \n" + 
        "			\"		target = arguments[0] || {},\\n\" + \n" + 
        "			\"		i = 1,\\n\" + \n" + 
        "			\"		length = arguments.length,\\n\" + \n" + 
        "			\"		deep = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Handle a deep copy situation\\n\" + \n" + 
        "			\"	if ( typeof target === \\\"boolean\\\" ) {\\n\" + \n" + 
        "			\"		deep = target;\\n\" + \n" + 
        "			\"		target = arguments[1] || {};\\n\" + \n" + 
        "			\"		// skip the boolean and the target\\n\" + \n" + 
        "			\"		i = 2;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Handle case when target is a string or something (possible in deep copy)\\n\" + \n" + 
        "			\"	if ( typeof target !== \\\"object\\\" && !jQuery.isFunction(target) ) {\\n\" + \n" + 
        "			\"		target = {};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// extend jQuery itself if only one argument is passed\\n\" + \n" + 
        "			\"	if ( length === i ) {\\n\" + \n" + 
        "			\"		target = this;\\n\" + \n" + 
        "			\"		--i;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( ; i < length; i++ ) {\\n\" + \n" + 
        "			\"		// Only deal with non-null/undefined values\\n\" + \n" + 
        "			\"		if ( (options = arguments[ i ]) != null ) {\\n\" + \n" + 
        "			\"			// Extend the base object\\n\" + \n" + 
        "			\"			for ( name in options ) {\\n\" + \n" + 
        "			\"				src = target[ name ];\\n\" + \n" + 
        "			\"				copy = options[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Prevent never-ending loop\\n\" + \n" + 
        "			\"				if ( target === copy ) {\\n\" + \n" + 
        "			\"					continue;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Recurse if we're merging plain objects or arrays\\n\" + \n" + 
        "			\"				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {\\n\" + \n" + 
        "			\"					if ( copyIsArray ) {\\n\" + \n" + 
        "			\"						copyIsArray = false;\\n\" + \n" + 
        "			\"						clone = src && jQuery.isArray(src) ? src : [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						clone = src && jQuery.isPlainObject(src) ? src : {};\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Never move original objects, clone them\\n\" + \n" + 
        "			\"					target[ name ] = jQuery.extend( deep, clone, copy );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Don't bring in undefined values\\n\" + \n" + 
        "			\"				} else if ( copy !== undefined ) {\\n\" + \n" + 
        "			\"					target[ name ] = copy;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Return the modified object\\n\" + \n" + 
        "			\"	return target;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	noConflict: function( deep ) {\\n\" + \n" + 
        "			\"		if ( window.$ === jQuery ) {\\n\" + \n" + 
        "			\"			window.$ = _$;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( deep && window.jQuery === jQuery ) {\\n\" + \n" + 
        "			\"			window.jQuery = _jQuery;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return jQuery;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Is the DOM ready to be used? Set to true once it occurs.\\n\" + \n" + 
        "			\"	isReady: false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A counter to track how many items to wait for before\\n\" + \n" + 
        "			\"	// the ready event fires. See #6781\\n\" + \n" + 
        "			\"	readyWait: 1,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Hold (or release) the ready event\\n\" + \n" + 
        "			\"	holdReady: function( hold ) {\\n\" + \n" + 
        "			\"		if ( hold ) {\\n\" + \n" + 
        "			\"			jQuery.readyWait++;\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			jQuery.ready( true );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Handle when the DOM is ready\\n\" + \n" + 
        "			\"	ready: function( wait ) {\\n\" + \n" + 
        "			\"		// Either a released hold or an DOMready/load event and not yet ready\\n\" + \n" + 
        "			\"		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {\\n\" + \n" + 
        "			\"			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\\n\" + \n" + 
        "			\"			if ( !document.body ) {\\n\" + \n" + 
        "			\"				return setTimeout( jQuery.ready, 1 );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Remember that the DOM is ready\\n\" + \n" + 
        "			\"			jQuery.isReady = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If a normal DOM Ready event fired, decrement, and wait if need be\\n\" + \n" + 
        "			\"			if ( wait !== true && --jQuery.readyWait > 0 ) {\\n\" + \n" + 
        "			\"				return;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If there are functions bound, to execute\\n\" + \n" + 
        "			\"			readyList.resolveWith( document, [ jQuery ] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Trigger any bound ready events\\n\" + \n" + 
        "			\"			if ( jQuery.fn.trigger ) {\\n\" + \n" + 
        "			\"				jQuery( document ).trigger( \\\"ready\\\" ).unbind( \\\"ready\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	bindReady: function() {\\n\" + \n" + 
        "			\"		if ( readyList ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		readyList = jQuery._Deferred();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Catch cases where $(document).ready() is called after the\\n\" + \n" + 
        "			\"		// browser event has already occurred.\\n\" + \n" + 
        "			\"		if ( document.readyState === \\\"complete\\\" ) {\\n\" + \n" + 
        "			\"			// Handle it asynchronously to allow scripts the opportunity to delay ready\\n\" + \n" + 
        "			\"			return setTimeout( jQuery.ready, 1 );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Mozilla, Opera and webkit nightlies currently support this event\\n\" + \n" + 
        "			\"		if ( document.addEventListener ) {\\n\" + \n" + 
        "			\"			// Use the handy event callback\\n\" + \n" + 
        "			\"			document.addEventListener( \\\"DOMContentLoaded\\\", DOMContentLoaded, false );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// A fallback to window.onload, that will always work\\n\" + \n" + 
        "			\"			window.addEventListener( \\\"load\\\", jQuery.ready, false );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If IE event model is used\\n\" + \n" + 
        "			\"		} else if ( document.attachEvent ) {\\n\" + \n" + 
        "			\"			// ensure firing before onload,\\n\" + \n" + 
        "			\"			// maybe late but safe also for iframes\\n\" + \n" + 
        "			\"			document.attachEvent( \\\"onreadystatechange\\\", DOMContentLoaded );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// A fallback to window.onload, that will always work\\n\" + \n" + 
        "			\"			window.attachEvent( \\\"onload\\\", jQuery.ready );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If IE and not a frame\\n\" + \n" + 
        "			\"			// continually check to see if the document is ready\\n\" + \n" + 
        "			\"			var toplevel = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				toplevel = window.frameElement == null;\\n\" + \n" + 
        "			\"			} catch(e) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( document.documentElement.doScroll && toplevel ) {\\n\" + \n" + 
        "			\"				doScrollCheck();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// See test/unit/core.js for details concerning isFunction.\\n\" + \n" + 
        "			\"	// Since version 1.3, DOM methods and functions like alert\\n\" + \n" + 
        "			\"	// aren't supported. They return false on IE (#2968).\\n\" + \n" + 
        "			\"	isFunction: function( obj ) {\\n\" + \n" + 
        "			\"		return jQuery.type(obj) === \\\"function\\\";\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	isArray: Array.isArray || function( obj ) {\\n\" + \n" + 
        "			\"		return jQuery.type(obj) === \\\"array\\\";\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A crude way of determining if an object is a window\\n\" + \n" + 
        "			\"	isWindow: function( obj ) {\\n\" + \n" + 
        "			\"		return obj && typeof obj === \\\"object\\\" && \\\"setInterval\\\" in obj;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	isNaN: function( obj ) {\\n\" + \n" + 
        "			\"		return obj == null || !rdigit.test( obj ) || isNaN( obj );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	type: function( obj ) {\\n\" + \n" + 
        "			\"		return obj == null ?\\n\" + \n" + 
        "			\"			String( obj ) :\\n\" + \n" + 
        "			\"			class2type[ toString.call(obj) ] || \\\"object\\\";\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	isPlainObject: function( obj ) {\\n\" + \n" + 
        "			\"		// Must be an Object.\\n\" + \n" + 
        "			\"		// Because of IE, we also have to check the presence of the constructor property.\\n\" + \n" + 
        "			\"		// Make sure that DOM nodes and window objects don't pass through, as well\\n\" + \n" + 
        "			\"		if ( !obj || jQuery.type(obj) !== \\\"object\\\" || obj.nodeType || jQuery.isWindow( obj ) ) {\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		try {\\n\" + \n" + 
        "			\"			// Not own constructor property must be Object\\n\" + \n" + 
        "			\"			if ( obj.constructor &&\\n\" + \n" + 
        "			\"				!hasOwn.call(obj, \\\"constructor\\\") &&\\n\" + \n" + 
        "			\"				!hasOwn.call(obj.constructor.prototype, \\\"isPrototypeOf\\\") ) {\\n\" + \n" + 
        "			\"				return false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} catch ( e ) {\\n\" + \n" + 
        "			\"			// IE8,9 Will throw exceptions on certain host objects #9897\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Own properties are enumerated firstly, so to speed up,\\n\" + \n" + 
        "			\"		// if last one is own, then all properties are own.\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var key;\\n\" + \n" + 
        "			\"		for ( key in obj ) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return key === undefined || hasOwn.call( obj, key );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	isEmptyObject: function( obj ) {\\n\" + \n" + 
        "			\"		for ( var name in obj ) {\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return true;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	error: function( msg ) {\\n\" + \n" + 
        "			\"		throw msg;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	parseJSON: function( data ) {\\n\" + \n" + 
        "			\"		if ( typeof data !== \\\"string\\\" || !data ) {\\n\" + \n" + 
        "			\"			return null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure leading/trailing whitespace is removed (IE can't handle it)\\n\" + \n" + 
        "			\"		data = jQuery.trim( data );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Attempt to parse using the native JSON parser first\\n\" + \n" + 
        "			\"		if ( window.JSON && window.JSON.parse ) {\\n\" + \n" + 
        "			\"			return window.JSON.parse( data );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure the incoming data is actual JSON\\n\" + \n" + 
        "			\"		// Logic borrowed from http://json.org/json2.js\\n\" + \n" + 
        "			\"		if ( rvalidchars.test( data.replace( rvalidescape, \\\"@\\\" )\\n\" + \n" + 
        "			\"			.replace( rvalidtokens, \\\"]\\\" )\\n\" + \n" + 
        "			\"			.replace( rvalidbraces, \\\"\\\")) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return (new Function( \\\"return \\\" + data ))();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		jQuery.error( \\\"Invalid JSON: \\\" + data );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Cross-browser xml parsing\\n\" + \n" + 
        "			\"	parseXML: function( data ) {\\n\" + \n" + 
        "			\"		var xml, tmp;\\n\" + \n" + 
        "			\"		try {\\n\" + \n" + 
        "			\"			if ( window.DOMParser ) { // Standard\\n\" + \n" + 
        "			\"				tmp = new DOMParser();\\n\" + \n" + 
        "			\"				xml = tmp.parseFromString( data , \\\"text/xml\\\" );\\n\" + \n" + 
        "			\"			} else { // IE\\n\" + \n" + 
        "			\"				xml = new ActiveXObject( \\\"Microsoft.XMLDOM\\\" );\\n\" + \n" + 
        "			\"				xml.async = \\\"false\\\";\\n\" + \n" + 
        "			\"				xml.loadXML( data );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} catch( e ) {\\n\" + \n" + 
        "			\"			xml = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		if ( !xml || !xml.documentElement || xml.getElementsByTagName( \\\"parsererror\\\" ).length ) {\\n\" + \n" + 
        "			\"			jQuery.error( \\\"Invalid XML: \\\" + data );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return xml;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	noop: function() {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Evaluates a script in a global context\\n\" + \n" + 
        "			\"	// Workarounds based on findings by Jim Driscoll\\n\" + \n" + 
        "			\"	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context\\n\" + \n" + 
        "			\"	globalEval: function( data ) {\\n\" + \n" + 
        "			\"		if ( data && rnotwhite.test( data ) ) {\\n\" + \n" + 
        "			\"			// We use execScript on Internet Explorer\\n\" + \n" + 
        "			\"			// We use an anonymous function so that context is window\\n\" + \n" + 
        "			\"			// rather than jQuery in Firefox\\n\" + \n" + 
        "			\"			( window.execScript || function( data ) {\\n\" + \n" + 
        "			\"				window[ \\\"eval\\\" ].call( window, data );\\n\" + \n" + 
        "			\"			} )( data );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Convert dashed to camelCase; used by the css and data modules\\n\" + \n" + 
        "			\"	// Microsoft forgot to hump their vendor prefix (#9572)\\n\" + \n" + 
        "			\"	camelCase: function( string ) {\\n\" + \n" + 
        "			\"		return string.replace( rmsPrefix, \\\"ms-\\\" ).replace( rdashAlpha, fcamelCase );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	nodeName: function( elem, name ) {\\n\" + \n" + 
        "			\"		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// args is for internal usage only\\n\" + \n" + 
        "			\"	each: function( object, callback, args ) {\\n\" + \n" + 
        "			\"		var name, i = 0,\\n\" + \n" + 
        "			\"			length = object.length,\\n\" + \n" + 
        "			\"			isObj = length === undefined || jQuery.isFunction( object );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( args ) {\\n\" + \n" + 
        "			\"			if ( isObj ) {\\n\" + \n" + 
        "			\"				for ( name in object ) {\\n\" + \n" + 
        "			\"					if ( callback.apply( object[ name ], args ) === false ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				for ( ; i < length; ) {\\n\" + \n" + 
        "			\"					if ( callback.apply( object[ i++ ], args ) === false ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// A special, fast, case for the most common use of each\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			if ( isObj ) {\\n\" + \n" + 
        "			\"				for ( name in object ) {\\n\" + \n" + 
        "			\"					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				for ( ; i < length; ) {\\n\" + \n" + 
        "			\"					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return object;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Use native String.trim function wherever possible\\n\" + \n" + 
        "			\"	trim: trim ?\\n\" + \n" + 
        "			\"		function( text ) {\\n\" + \n" + 
        "			\"			return text == null ?\\n\" + \n" + 
        "			\"				\\\"\\\" :\\n\" + \n" + 
        "			\"				trim.call( text );\\n\" + \n" + 
        "			\"		} :\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Otherwise use our own trimming functionality\\n\" + \n" + 
        "			\"		function( text ) {\\n\" + \n" + 
        "			\"			return text == null ?\\n\" + \n" + 
        "			\"				\\\"\\\" :\\n\" + \n" + 
        "			\"				text.toString().replace( trimLeft, \\\"\\\" ).replace( trimRight, \\\"\\\" );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// results is for internal usage only\\n\" + \n" + 
        "			\"	makeArray: function( array, results ) {\\n\" + \n" + 
        "			\"		var ret = results || [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( array != null ) {\\n\" + \n" + 
        "			\"			// The window, strings (and functions) also have 'length'\\n\" + \n" + 
        "			\"			// The extra typeof function check is to prevent crashes\\n\" + \n" + 
        "			\"			// in Safari 2 (See: #3039)\\n\" + \n" + 
        "			\"			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930\\n\" + \n" + 
        "			\"			var type = jQuery.type( array );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( array.length == null || type === \\\"string\\\" || type === \\\"function\\\" || type === \\\"regexp\\\" || jQuery.isWindow( array ) ) {\\n\" + \n" + 
        "			\"				push.call( ret, array );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				jQuery.merge( ret, array );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	inArray: function( elem, array ) {\\n\" + \n" + 
        "			\"		if ( !array ) {\\n\" + \n" + 
        "			\"			return -1;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( indexOf ) {\\n\" + \n" + 
        "			\"			return indexOf.call( array, elem );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var i = 0, length = array.length; i < length; i++ ) {\\n\" + \n" + 
        "			\"			if ( array[ i ] === elem ) {\\n\" + \n" + 
        "			\"				return i;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return -1;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	merge: function( first, second ) {\\n\" + \n" + 
        "			\"		var i = first.length,\\n\" + \n" + 
        "			\"			j = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof second.length === \\\"number\\\" ) {\\n\" + \n" + 
        "			\"			for ( var l = second.length; j < l; j++ ) {\\n\" + \n" + 
        "			\"				first[ i++ ] = second[ j ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			while ( second[j] !== undefined ) {\\n\" + \n" + 
        "			\"				first[ i++ ] = second[ j++ ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		first.length = i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return first;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	grep: function( elems, callback, inv ) {\\n\" + \n" + 
        "			\"		var ret = [], retVal;\\n\" + \n" + 
        "			\"		inv = !!inv;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Go through the array, only saving the items\\n\" + \n" + 
        "			\"		// that pass the validator function\\n\" + \n" + 
        "			\"		for ( var i = 0, length = elems.length; i < length; i++ ) {\\n\" + \n" + 
        "			\"			retVal = !!callback( elems[ i ], i );\\n\" + \n" + 
        "			\"			if ( inv !== retVal ) {\\n\" + \n" + 
        "			\"				ret.push( elems[ i ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// arg is for internal usage only\\n\" + \n" + 
        "			\"	map: function( elems, callback, arg ) {\\n\" + \n" + 
        "			\"		var value, key, ret = [],\\n\" + \n" + 
        "			\"			i = 0,\\n\" + \n" + 
        "			\"			length = elems.length,\\n\" + \n" + 
        "			\"			// jquery objects are treated as arrays\\n\" + \n" + 
        "			\"			isArray = elems instanceof jQuery || length !== undefined && typeof length === \\\"number\\\" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Go through the array, translating each of the items to their\\n\" + \n" + 
        "			\"		if ( isArray ) {\\n\" + \n" + 
        "			\"			for ( ; i < length; i++ ) {\\n\" + \n" + 
        "			\"				value = callback( elems[ i ], i, arg );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( value != null ) {\\n\" + \n" + 
        "			\"					ret[ ret.length ] = value;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Go through every key on the object,\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( key in elems ) {\\n\" + \n" + 
        "			\"				value = callback( elems[ key ], key, arg );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( value != null ) {\\n\" + \n" + 
        "			\"					ret[ ret.length ] = value;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Flatten any nested arrays\\n\" + \n" + 
        "			\"		return ret.concat.apply( [], ret );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A global GUID counter for objects\\n\" + \n" + 
        "			\"	guid: 1,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Bind a function to a context, optionally partially applying any\\n\" + \n" + 
        "			\"	// arguments.\\n\" + \n" + 
        "			\"	proxy: function( fn, context ) {\\n\" + \n" + 
        "			\"		if ( typeof context === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			var tmp = fn[ context ];\\n\" + \n" + 
        "			\"			context = fn;\\n\" + \n" + 
        "			\"			fn = tmp;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Quick check to determine if target is callable, in the spec\\n\" + \n" + 
        "			\"		// this throws a TypeError, but we will just return undefined.\\n\" + \n" + 
        "			\"		if ( !jQuery.isFunction( fn ) ) {\\n\" + \n" + 
        "			\"			return undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Simulated bind\\n\" + \n" + 
        "			\"		var args = slice.call( arguments, 2 ),\\n\" + \n" + 
        "			\"			proxy = function() {\\n\" + \n" + 
        "			\"				return fn.apply( context, args.concat( slice.call( arguments ) ) );\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the guid of unique handler to the same of original handler, so it can be removed\\n\" + \n" + 
        "			\"		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return proxy;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Mutifunctional method to get and set values to a collection\\n\" + \n" + 
        "			\"	// The value/s can optionally be executed if it's a function\\n\" + \n" + 
        "			\"	access: function( elems, key, value, exec, fn, pass ) {\\n\" + \n" + 
        "			\"		var length = elems.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Setting many attributes\\n\" + \n" + 
        "			\"		if ( typeof key === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"			for ( var k in key ) {\\n\" + \n" + 
        "			\"				jQuery.access( elems, k, key[k], exec, fn, value );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return elems;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Setting one attribute\\n\" + \n" + 
        "			\"		if ( value !== undefined ) {\\n\" + \n" + 
        "			\"			// Optionally, function values get executed if exec is true\\n\" + \n" + 
        "			\"			exec = !pass && exec && jQuery.isFunction(value);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var i = 0; i < length; i++ ) {\\n\" + \n" + 
        "			\"				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return elems;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Getting an attribute\\n\" + \n" + 
        "			\"		return length ? fn( elems[0], key ) : undefined;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	now: function() {\\n\" + \n" + 
        "			\"		return (new Date()).getTime();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Use of jQuery.browser is frowned upon.\\n\" + \n" + 
        "			\"	// More details: http://docs.jquery.com/Utilities/jQuery.browser\\n\" + \n" + 
        "			\"	uaMatch: function( ua ) {\\n\" + \n" + 
        "			\"		ua = ua.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var match = rwebkit.exec( ua ) ||\\n\" + \n" + 
        "			\"			ropera.exec( ua ) ||\\n\" + \n" + 
        "			\"			rmsie.exec( ua ) ||\\n\" + \n" + 
        "			\"			ua.indexOf(\\\"compatible\\\") < 0 && rmozilla.exec( ua ) ||\\n\" + \n" + 
        "			\"			[];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return { browser: match[1] || \\\"\\\", version: match[2] || \\\"0\\\" };\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	sub: function() {\\n\" + \n" + 
        "			\"		function jQuerySub( selector, context ) {\\n\" + \n" + 
        "			\"			return new jQuerySub.fn.init( selector, context );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		jQuery.extend( true, jQuerySub, this );\\n\" + \n" + 
        "			\"		jQuerySub.superclass = this;\\n\" + \n" + 
        "			\"		jQuerySub.fn = jQuerySub.prototype = this();\\n\" + \n" + 
        "			\"		jQuerySub.fn.constructor = jQuerySub;\\n\" + \n" + 
        "			\"		jQuerySub.sub = this.sub;\\n\" + \n" + 
        "			\"		jQuerySub.fn.init = function init( selector, context ) {\\n\" + \n" + 
        "			\"			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {\\n\" + \n" + 
        "			\"				context = jQuerySub( context );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"		jQuerySub.fn.init.prototype = jQuerySub.fn;\\n\" + \n" + 
        "			\"		var rootjQuerySub = jQuerySub(document);\\n\" + \n" + 
        "			\"		return jQuerySub;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	browser: {}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Populate the class2type map\\n\" + \n" + 
        "			\"jQuery.each(\\\"Boolean Number String Function Array Date RegExp Object\\\".split(\\\" \\\"), function(i, name) {\\n\" + \n" + 
        "			\"	class2type[ \\\"[object \\\" + name + \\\"]\\\" ] = name.toLowerCase();\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"browserMatch = jQuery.uaMatch( userAgent );\\n\" + \n" + 
        "			\"if ( browserMatch.browser ) {\\n\" + \n" + 
        "			\"	jQuery.browser[ browserMatch.browser ] = true;\\n\" + \n" + 
        "			\"	jQuery.browser.version = browserMatch.version;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Deprecated, use jQuery.browser.webkit instead\\n\" + \n" + 
        "			\"if ( jQuery.browser.webkit ) {\\n\" + \n" + 
        "			\"	jQuery.browser.safari = true;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// IE doesn't match non-breaking spaces with \\\\s\\n\" + \n" + 
        "			\"if ( rnotwhite.test( \\\"\\\\xA0\\\" ) ) {\\n\" + \n" + 
        "			\"	trimLeft = /^[\\\\s\\\\xA0]+/;\\n\" + \n" + 
        "			\"	trimRight = /[\\\\s\\\\xA0]+$/;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// All jQuery objects should point back to these\\n\" + \n" + 
        "			\"rootjQuery = jQuery(document);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Cleanup functions for the document ready method\\n\" + \n" + 
        "			\"if ( document.addEventListener ) {\\n\" + \n" + 
        "			\"	DOMContentLoaded = function() {\\n\" + \n" + 
        "			\"		document.removeEventListener( \\\"DOMContentLoaded\\\", DOMContentLoaded, false );\\n\" + \n" + 
        "			\"		jQuery.ready();\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"} else if ( document.attachEvent ) {\\n\" + \n" + 
        "			\"	DOMContentLoaded = function() {\\n\" + \n" + 
        "			\"		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\\n\" + \n" + 
        "			\"		if ( document.readyState === \\\"complete\\\" ) {\\n\" + \n" + 
        "			\"			document.detachEvent( \\\"onreadystatechange\\\", DOMContentLoaded );\\n\" + \n" + 
        "			\"			jQuery.ready();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// The DOM ready check for Internet Explorer\\n\" + \n" + 
        "			\"function doScrollCheck() {\\n\" + \n" + 
        "			\"	if ( jQuery.isReady ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	try {\\n\" + \n" + 
        "			\"		// If IE is used, use the trick by Diego Perini\\n\" + \n" + 
        "			\"		// http://javascript.nwbox.com/IEContentLoaded/\\n\" + \n" + 
        "			\"		document.documentElement.doScroll(\\\"left\\\");\\n\" + \n" + 
        "			\"	} catch(e) {\\n\" + \n" + 
        "			\"		setTimeout( doScrollCheck, 1 );\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// and execute any waiting functions\\n\" + \n" + 
        "			\"	jQuery.ready();\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"return jQuery;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var // Promise methods\\n\" + \n" + 
        "			\"	promiseMethods = \\\"done fail isResolved isRejected promise then always pipe\\\".split( \\\" \\\" ),\\n\" + \n" + 
        "			\"	// Static reference to slice\\n\" + \n" + 
        "			\"	sliceDeferred = [].slice;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	// Create a simple deferred (one callbacks list)\\n\" + \n" + 
        "			\"	_Deferred: function() {\\n\" + \n" + 
        "			\"		var // callbacks list\\n\" + \n" + 
        "			\"			callbacks = [],\\n\" + \n" + 
        "			\"			// stored [ context , args ]\\n\" + \n" + 
        "			\"			fired,\\n\" + \n" + 
        "			\"			// to avoid firing when already doing so\\n\" + \n" + 
        "			\"			firing,\\n\" + \n" + 
        "			\"			// flag to know if the deferred has been cancelled\\n\" + \n" + 
        "			\"			cancelled,\\n\" + \n" + 
        "			\"			// the deferred itself\\n\" + \n" + 
        "			\"			deferred  = {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// done( f1, f2, ...)\\n\" + \n" + 
        "			\"				done: function() {\\n\" + \n" + 
        "			\"					if ( !cancelled ) {\\n\" + \n" + 
        "			\"						var args = arguments,\\n\" + \n" + 
        "			\"							i,\\n\" + \n" + 
        "			\"							length,\\n\" + \n" + 
        "			\"							elem,\\n\" + \n" + 
        "			\"							type,\\n\" + \n" + 
        "			\"							_fired;\\n\" + \n" + 
        "			\"						if ( fired ) {\\n\" + \n" + 
        "			\"							_fired = fired;\\n\" + \n" + 
        "			\"							fired = 0;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						for ( i = 0, length = args.length; i < length; i++ ) {\\n\" + \n" + 
        "			\"							elem = args[ i ];\\n\" + \n" + 
        "			\"							type = jQuery.type( elem );\\n\" + \n" + 
        "			\"							if ( type === \\\"array\\\" ) {\\n\" + \n" + 
        "			\"								deferred.done.apply( deferred, elem );\\n\" + \n" + 
        "			\"							} else if ( type === \\\"function\\\" ) {\\n\" + \n" + 
        "			\"								callbacks.push( elem );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						if ( _fired ) {\\n\" + \n" + 
        "			\"							deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// resolve with given context and args\\n\" + \n" + 
        "			\"				resolveWith: function( context, args ) {\\n\" + \n" + 
        "			\"					if ( !cancelled && !fired && !firing ) {\\n\" + \n" + 
        "			\"						// make sure args are available (#8421)\\n\" + \n" + 
        "			\"						args = args || [];\\n\" + \n" + 
        "			\"						firing = 1;\\n\" + \n" + 
        "			\"						try {\\n\" + \n" + 
        "			\"							while( callbacks[ 0 ] ) {\\n\" + \n" + 
        "			\"								callbacks.shift().apply( context, args );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						finally {\\n\" + \n" + 
        "			\"							fired = [ context, args ];\\n\" + \n" + 
        "			\"							firing = 0;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// resolve with this as context and given arguments\\n\" + \n" + 
        "			\"				resolve: function() {\\n\" + \n" + 
        "			\"					deferred.resolveWith( this, arguments );\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Has this deferred been resolved?\\n\" + \n" + 
        "			\"				isResolved: function() {\\n\" + \n" + 
        "			\"					return !!( firing || fired );\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Cancel\\n\" + \n" + 
        "			\"				cancel: function() {\\n\" + \n" + 
        "			\"					cancelled = 1;\\n\" + \n" + 
        "			\"					callbacks = [];\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return deferred;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Full fledged deferred (two callbacks list)\\n\" + \n" + 
        "			\"	Deferred: function( func ) {\\n\" + \n" + 
        "			\"		var deferred = jQuery._Deferred(),\\n\" + \n" + 
        "			\"			failDeferred = jQuery._Deferred(),\\n\" + \n" + 
        "			\"			promise;\\n\" + \n" + 
        "			\"		// Add errorDeferred methods, then and promise\\n\" + \n" + 
        "			\"		jQuery.extend( deferred, {\\n\" + \n" + 
        "			\"			then: function( doneCallbacks, failCallbacks ) {\\n\" + \n" + 
        "			\"				deferred.done( doneCallbacks ).fail( failCallbacks );\\n\" + \n" + 
        "			\"				return this;\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			always: function() {\\n\" + \n" + 
        "			\"				return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments );\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			fail: failDeferred.done,\\n\" + \n" + 
        "			\"			rejectWith: failDeferred.resolveWith,\\n\" + \n" + 
        "			\"			reject: failDeferred.resolve,\\n\" + \n" + 
        "			\"			isRejected: failDeferred.isResolved,\\n\" + \n" + 
        "			\"			pipe: function( fnDone, fnFail ) {\\n\" + \n" + 
        "			\"				return jQuery.Deferred(function( newDefer ) {\\n\" + \n" + 
        "			\"					jQuery.each( {\\n\" + \n" + 
        "			\"						done: [ fnDone, \\\"resolve\\\" ],\\n\" + \n" + 
        "			\"						fail: [ fnFail, \\\"reject\\\" ]\\n\" + \n" + 
        "			\"					}, function( handler, data ) {\\n\" + \n" + 
        "			\"						var fn = data[ 0 ],\\n\" + \n" + 
        "			\"							action = data[ 1 ],\\n\" + \n" + 
        "			\"							returned;\\n\" + \n" + 
        "			\"						if ( jQuery.isFunction( fn ) ) {\\n\" + \n" + 
        "			\"							deferred[ handler ](function() {\\n\" + \n" + 
        "			\"								returned = fn.apply( this, arguments );\\n\" + \n" + 
        "			\"								if ( returned && jQuery.isFunction( returned.promise ) ) {\\n\" + \n" + 
        "			\"									returned.promise().then( newDefer.resolve, newDefer.reject );\\n\" + \n" + 
        "			\"								} else {\\n\" + \n" + 
        "			\"									newDefer[ action + \\\"With\\\" ]( this === deferred ? newDefer : this, [ returned ] );\\n\" + \n" + 
        "			\"								}\\n\" + \n" + 
        "			\"							});\\n\" + \n" + 
        "			\"						} else {\\n\" + \n" + 
        "			\"							deferred[ handler ]( newDefer[ action ] );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					});\\n\" + \n" + 
        "			\"				}).promise();\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			// Get a promise for this deferred\\n\" + \n" + 
        "			\"			// If obj is provided, the promise aspect is added to the object\\n\" + \n" + 
        "			\"			promise: function( obj ) {\\n\" + \n" + 
        "			\"				if ( obj == null ) {\\n\" + \n" + 
        "			\"					if ( promise ) {\\n\" + \n" + 
        "			\"						return promise;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					promise = obj = {};\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				var i = promiseMethods.length;\\n\" + \n" + 
        "			\"				while( i-- ) {\\n\" + \n" + 
        "			\"					obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				return obj;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"		// Make sure only one callback list will be used\\n\" + \n" + 
        "			\"		deferred.done( failDeferred.cancel ).fail( deferred.cancel );\\n\" + \n" + 
        "			\"		// Unexpose cancel\\n\" + \n" + 
        "			\"		delete deferred.cancel;\\n\" + \n" + 
        "			\"		// Call given func if any\\n\" + \n" + 
        "			\"		if ( func ) {\\n\" + \n" + 
        "			\"			func.call( deferred, deferred );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return deferred;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Deferred helper\\n\" + \n" + 
        "			\"	when: function( firstParam ) {\\n\" + \n" + 
        "			\"		var args = arguments,\\n\" + \n" + 
        "			\"			i = 0,\\n\" + \n" + 
        "			\"			length = args.length,\\n\" + \n" + 
        "			\"			count = length,\\n\" + \n" + 
        "			\"			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?\\n\" + \n" + 
        "			\"				firstParam :\\n\" + \n" + 
        "			\"				jQuery.Deferred();\\n\" + \n" + 
        "			\"		function resolveFunc( i ) {\\n\" + \n" + 
        "			\"			return function( value ) {\\n\" + \n" + 
        "			\"				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;\\n\" + \n" + 
        "			\"				if ( !( --count ) ) {\\n\" + \n" + 
        "			\"					// Strange bug in FF4:\\n\" + \n" + 
        "			\"					// Values changed onto the arguments object sometimes end up as undefined values\\n\" + \n" + 
        "			\"					// outside the $.when method. Cloning the object into a fresh array solves the issue\\n\" + \n" + 
        "			\"					deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		if ( length > 1 ) {\\n\" + \n" + 
        "			\"			for( ; i < length; i++ ) {\\n\" + \n" + 
        "			\"				if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {\\n\" + \n" + 
        "			\"					args[ i ].promise().then( resolveFunc(i), deferred.reject );\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					--count;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( !count ) {\\n\" + \n" + 
        "			\"				deferred.resolveWith( deferred, args );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} else if ( deferred !== firstParam ) {\\n\" + \n" + 
        "			\"			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return deferred.promise();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.support = (function() {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var div = document.createElement( \\\"div\\\" ),\\n\" + \n" + 
        "			\"		documentElement = document.documentElement,\\n\" + \n" + 
        "			\"		all,\\n\" + \n" + 
        "			\"		a,\\n\" + \n" + 
        "			\"		select,\\n\" + \n" + 
        "			\"		opt,\\n\" + \n" + 
        "			\"		input,\\n\" + \n" + 
        "			\"		marginDiv,\\n\" + \n" + 
        "			\"		support,\\n\" + \n" + 
        "			\"		fragment,\\n\" + \n" + 
        "			\"		body,\\n\" + \n" + 
        "			\"		testElementParent,\\n\" + \n" + 
        "			\"		testElement,\\n\" + \n" + 
        "			\"		testElementStyle,\\n\" + \n" + 
        "			\"		tds,\\n\" + \n" + 
        "			\"		events,\\n\" + \n" + 
        "			\"		eventName,\\n\" + \n" + 
        "			\"		i,\\n\" + \n" + 
        "			\"		isSupported;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Preliminary tests\\n\" + \n" + 
        "			\"	div.setAttribute(\\\"className\\\", \\\"t\\\");\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	all = div.getElementsByTagName( \\\"*\\\" );\\n\" + \n" + 
        "			\"	a = div.getElementsByTagName( \\\"a\\\" )[ 0 ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Can't get basic test support\\n\" + \n" + 
        "			\"	if ( !all || !all.length || !a ) {\\n\" + \n" + 
        "			\"		return {};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// First batch of supports tests\\n\" + \n" + 
        "			\"	select = document.createElement( \\\"select\\\" );\\n\" + \n" + 
        "			\"	opt = select.appendChild( document.createElement(\\\"option\\\") );\\n\" + \n" + 
        "			\"	input = div.getElementsByTagName( \\\"input\\\" )[ 0 ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	support = {\\n\" + \n" + 
        "			\"		// IE strips leading whitespace when .innerHTML is used\\n\" + \n" + 
        "			\"		leadingWhitespace: ( div.firstChild.nodeType === 3 ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that tbody elements aren't automatically inserted\\n\" + \n" + 
        "			\"		// IE will insert them into empty tables\\n\" + \n" + 
        "			\"		tbody: !div.getElementsByTagName( \\\"tbody\\\" ).length,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that link elements get serialized correctly by innerHTML\\n\" + \n" + 
        "			\"		// This requires a wrapper element in IE\\n\" + \n" + 
        "			\"		htmlSerialize: !!div.getElementsByTagName( \\\"link\\\" ).length,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get the style information from getAttribute\\n\" + \n" + 
        "			\"		// (IE uses .cssText instead)\\n\" + \n" + 
        "			\"		style: /top/.test( a.getAttribute(\\\"style\\\") ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that URLs aren't manipulated\\n\" + \n" + 
        "			\"		// (IE normalizes it by default)\\n\" + \n" + 
        "			\"		hrefNormalized: ( a.getAttribute( \\\"href\\\" ) === \\\"/a\\\" ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that element opacity exists\\n\" + \n" + 
        "			\"		// (IE uses filter instead)\\n\" + \n" + 
        "			\"		// Use a regex to work around a WebKit issue. See #5145\\n\" + \n" + 
        "			\"		opacity: /^0.55$/.test( a.style.opacity ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Verify style float existence\\n\" + \n" + 
        "			\"		// (IE uses styleFloat instead of cssFloat)\\n\" + \n" + 
        "			\"		cssFloat: !!a.style.cssFloat,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that if no value is specified for a checkbox\\n\" + \n" + 
        "			\"		// that it defaults to \\\"on\\\".\\n\" + \n" + 
        "			\"		// (WebKit defaults to \\\"\\\" instead)\\n\" + \n" + 
        "			\"		checkOn: ( input.value === \\\"on\\\" ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that a selected-by-default option has a working selected property.\\n\" + \n" + 
        "			\"		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)\\n\" + \n" + 
        "			\"		optSelected: opt.selected,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)\\n\" + \n" + 
        "			\"		getSetAttribute: div.className !== \\\"t\\\",\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Will be defined later\\n\" + \n" + 
        "			\"		submitBubbles: true,\\n\" + \n" + 
        "			\"		changeBubbles: true,\\n\" + \n" + 
        "			\"		focusinBubbles: false,\\n\" + \n" + 
        "			\"		deleteExpando: true,\\n\" + \n" + 
        "			\"		noCloneEvent: true,\\n\" + \n" + 
        "			\"		inlineBlockNeedsLayout: false,\\n\" + \n" + 
        "			\"		shrinkWrapBlocks: false,\\n\" + \n" + 
        "			\"		reliableMarginRight: true\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Make sure checked status is properly cloned\\n\" + \n" + 
        "			\"	input.checked = true;\\n\" + \n" + 
        "			\"	support.noCloneChecked = input.cloneNode( true ).checked;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Make sure that the options inside disabled selects aren't marked as disabled\\n\" + \n" + 
        "			\"	// (WebKit marks them as disabled)\\n\" + \n" + 
        "			\"	select.disabled = true;\\n\" + \n" + 
        "			\"	support.optDisabled = !opt.disabled;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Test to see if it's possible to delete an expando from an element\\n\" + \n" + 
        "			\"	// Fails in Internet Explorer\\n\" + \n" + 
        "			\"	try {\\n\" + \n" + 
        "			\"		delete div.test;\\n\" + \n" + 
        "			\"	} catch( e ) {\\n\" + \n" + 
        "			\"		support.deleteExpando = false;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {\\n\" + \n" + 
        "			\"		div.attachEvent( \\\"onclick\\\", function() {\\n\" + \n" + 
        "			\"			// Cloning a node shouldn't copy over any\\n\" + \n" + 
        "			\"			// bound event handlers (IE does this)\\n\" + \n" + 
        "			\"			support.noCloneEvent = false;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"		div.cloneNode( true ).fireEvent( \\\"onclick\\\" );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if a radio maintains it's value\\n\" + \n" + 
        "			\"	// after being appended to the DOM\\n\" + \n" + 
        "			\"	input = document.createElement(\\\"input\\\");\\n\" + \n" + 
        "			\"	input.value = \\\"t\\\";\\n\" + \n" + 
        "			\"	input.setAttribute(\\\"type\\\", \\\"radio\\\");\\n\" + \n" + 
        "			\"	support.radioValue = input.value === \\\"t\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	input.setAttribute(\\\"checked\\\", \\\"checked\\\");\\n\" + \n" + 
        "			\"	div.appendChild( input );\\n\" + \n" + 
        "			\"	fragment = document.createDocumentFragment();\\n\" + \n" + 
        "			\"	fragment.appendChild( div.firstChild );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// WebKit doesn't clone checked state correctly in fragments\\n\" + \n" + 
        "			\"	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Figure out if the W3C box model works as expected\\n\" + \n" + 
        "			\"	div.style.width = div.style.paddingLeft = \\\"1px\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	body = document.getElementsByTagName( \\\"body\\\" )[ 0 ];\\n\" + \n" + 
        "			\"	// We use our own, invisible, body unless the body is already present\\n\" + \n" + 
        "			\"	// in which case we use a div (#9239)\\n\" + \n" + 
        "			\"	testElement = document.createElement( body ? \\\"div\\\" : \\\"body\\\" );\\n\" + \n" + 
        "			\"	testElementStyle = {\\n\" + \n" + 
        "			\"		visibility: \\\"hidden\\\",\\n\" + \n" + 
        "			\"		width: 0,\\n\" + \n" + 
        "			\"		height: 0,\\n\" + \n" + 
        "			\"		border: 0,\\n\" + \n" + 
        "			\"		margin: 0,\\n\" + \n" + 
        "			\"		background: \\\"none\\\"\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"	if ( body ) {\\n\" + \n" + 
        "			\"		jQuery.extend( testElementStyle, {\\n\" + \n" + 
        "			\"			position: \\\"absolute\\\",\\n\" + \n" + 
        "			\"			left: \\\"-1000px\\\",\\n\" + \n" + 
        "			\"			top: \\\"-1000px\\\"\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	for ( i in testElementStyle ) {\\n\" + \n" + 
        "			\"		testElement.style[ i ] = testElementStyle[ i ];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	testElement.appendChild( div );\\n\" + \n" + 
        "			\"	testElementParent = body || documentElement;\\n\" + \n" + 
        "			\"	testElementParent.insertBefore( testElement, testElementParent.firstChild );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if a disconnected checkbox will retain its checked\\n\" + \n" + 
        "			\"	// value of true after appended to the DOM (IE6/7)\\n\" + \n" + 
        "			\"	support.appendChecked = input.checked;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	support.boxModel = div.offsetWidth === 2;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( \\\"zoom\\\" in div.style ) {\\n\" + \n" + 
        "			\"		// Check if natively block-level elements act like inline-block\\n\" + \n" + 
        "			\"		// elements when setting their display to 'inline' and giving\\n\" + \n" + 
        "			\"		// them layout\\n\" + \n" + 
        "			\"		// (IE < 8 does this)\\n\" + \n" + 
        "			\"		div.style.display = \\\"inline\\\";\\n\" + \n" + 
        "			\"		div.style.zoom = 1;\\n\" + \n" + 
        "			\"		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Check if elements with layout shrink-wrap their children\\n\" + \n" + 
        "			\"		// (IE 6 does this)\\n\" + \n" + 
        "			\"		div.style.display = \\\"\\\";\\n\" + \n" + 
        "			\"		div.innerHTML = \\\"<div style='width:4px;'></div>\\\";\\n\" + \n" + 
        "			\"		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>\\\";\\n\" + \n" + 
        "			\"	tds = div.getElementsByTagName( \\\"td\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if table cells still have offsetWidth/Height when they are set\\n\" + \n" + 
        "			\"	// to display:none and there are still other visible table cells in a\\n\" + \n" + 
        "			\"	// table row; if so, offsetWidth/Height are not reliable for use when\\n\" + \n" + 
        "			\"	// determining if an element has been hidden directly using\\n\" + \n" + 
        "			\"	// display:none (it is still safe to use offsets if a parent element is\\n\" + \n" + 
        "			\"	// hidden; don safety goggles and see bug #4512 for more information).\\n\" + \n" + 
        "			\"	// (only IE 8 fails this test)\\n\" + \n" + 
        "			\"	isSupported = ( tds[ 0 ].offsetHeight === 0 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	tds[ 0 ].style.display = \\\"\\\";\\n\" + \n" + 
        "			\"	tds[ 1 ].style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if empty table cells still have offsetWidth/Height\\n\" + \n" + 
        "			\"	// (IE < 8 fail this test)\\n\" + \n" + 
        "			\"	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if div with explicit width and no margin-right incorrectly\\n\" + \n" + 
        "			\"	// gets computed margin-right based on width of container. For more\\n\" + \n" + 
        "			\"	// info see bug #3333\\n\" + \n" + 
        "			\"	// Fails in WebKit before Feb 2011 nightlies\\n\" + \n" + 
        "			\"	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\\n\" + \n" + 
        "			\"	if ( document.defaultView && document.defaultView.getComputedStyle ) {\\n\" + \n" + 
        "			\"		marginDiv = document.createElement( \\\"div\\\" );\\n\" + \n" + 
        "			\"		marginDiv.style.width = \\\"0\\\";\\n\" + \n" + 
        "			\"		marginDiv.style.marginRight = \\\"0\\\";\\n\" + \n" + 
        "			\"		div.appendChild( marginDiv );\\n\" + \n" + 
        "			\"		support.reliableMarginRight =\\n\" + \n" + 
        "			\"			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Remove the body element we added\\n\" + \n" + 
        "			\"	testElement.innerHTML = \\\"\\\";\\n\" + \n" + 
        "			\"	testElementParent.removeChild( testElement );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Technique from Juriy Zaytsev\\n\" + \n" + 
        "			\"	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/\\n\" + \n" + 
        "			\"	// We only care about the case where non-standard event systems\\n\" + \n" + 
        "			\"	// are used, namely in IE. Short-circuiting here helps us to\\n\" + \n" + 
        "			\"	// avoid an eval call (in setAttribute) which can cause CSP\\n\" + \n" + 
        "			\"	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP\\n\" + \n" + 
        "			\"	if ( div.attachEvent ) {\\n\" + \n" + 
        "			\"		for( i in {\\n\" + \n" + 
        "			\"			submit: 1,\\n\" + \n" + 
        "			\"			change: 1,\\n\" + \n" + 
        "			\"			focusin: 1\\n\" + \n" + 
        "			\"		} ) {\\n\" + \n" + 
        "			\"			eventName = \\\"on\\\" + i;\\n\" + \n" + 
        "			\"			isSupported = ( eventName in div );\\n\" + \n" + 
        "			\"			if ( !isSupported ) {\\n\" + \n" + 
        "			\"				div.setAttribute( eventName, \\\"return;\\\" );\\n\" + \n" + 
        "			\"				isSupported = ( typeof div[ eventName ] === \\\"function\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			support[ i + \\\"Bubbles\\\" ] = isSupported;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Null connected elements to avoid leaks in IE\\n\" + \n" + 
        "			\"	testElement = fragment = select = opt = body = marginDiv = div = input = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return support;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Keep track of boxModel\\n\" + \n" + 
        "			\"jQuery.boxModel = jQuery.support.boxModel;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var rbrace = /^(?:\\\\{.*\\\\}|\\\\[.*\\\\])$/,\\n\" + \n" + 
        "			\"	rmultiDash = /([A-Z])/g;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	cache: {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Please use with caution\\n\" + \n" + 
        "			\"	uuid: 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Unique for each copy of jQuery on the page\\n\" + \n" + 
        "			\"	// Non-digits removed to match rinlinejQuery\\n\" + \n" + 
        "			\"	expando: \\\"jQuery\\\" + ( jQuery.fn.jquery + Math.random() ).replace( /\\\\D/g, \\\"\\\" ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The following elements throw uncatchable exceptions if you\\n\" + \n" + 
        "			\"	// attempt to add expando properties to them.\\n\" + \n" + 
        "			\"	noData: {\\n\" + \n" + 
        "			\"		\\\"embed\\\": true,\\n\" + \n" + 
        "			\"		// Ban all objects except for Flash (which handle expandos)\\n\" + \n" + 
        "			\"		\\\"object\\\": \\\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\\\",\\n\" + \n" + 
        "			\"		\\\"applet\\\": true\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	hasData: function( elem ) {\\n\" + \n" + 
        "			\"		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return !!elem && !isEmptyDataObject( elem );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	data: function( elem, name, data, pvt /* Internal Use Only */ ) {\\n\" + \n" + 
        "			\"		if ( !jQuery.acceptData( elem ) ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var thisCache, ret,\\n\" + \n" + 
        "			\"			internalKey = jQuery.expando,\\n\" + \n" + 
        "			\"			getByName = typeof name === \\\"string\\\",\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// We have to handle DOM nodes and JS objects differently because IE6-7\\n\" + \n" + 
        "			\"			// can't GC object references properly across the DOM-JS boundary\\n\" + \n" + 
        "			\"			isNode = elem.nodeType,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Only DOM nodes need the global jQuery cache; JS object data is\\n\" + \n" + 
        "			\"			// attached directly to the object so GC can occur automatically\\n\" + \n" + 
        "			\"			cache = isNode ? jQuery.cache : elem,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Only defining an ID for JS objects if its cache already exists allows\\n\" + \n" + 
        "			\"			// the code to shortcut on the same path as a DOM node with no cache\\n\" + \n" + 
        "			\"			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Avoid doing any more work than we need to when trying to get data on an\\n\" + \n" + 
        "			\"		// object that has no data at all\\n\" + \n" + 
        "			\"		if ( (!id || (pvt && id && (cache[ id ] && !cache[ id ][ internalKey ]))) && getByName && data === undefined ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !id ) {\\n\" + \n" + 
        "			\"			// Only DOM nodes need a new unique ID for each element since their data\\n\" + \n" + 
        "			\"			// ends up in the global cache\\n\" + \n" + 
        "			\"			if ( isNode ) {\\n\" + \n" + 
        "			\"				elem[ jQuery.expando ] = id = ++jQuery.uuid;\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				id = jQuery.expando;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !cache[ id ] ) {\\n\" + \n" + 
        "			\"			cache[ id ] = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery\\n\" + \n" + 
        "			\"			// metadata on plain JS objects when the object is serialized using\\n\" + \n" + 
        "			\"			// JSON.stringify\\n\" + \n" + 
        "			\"			if ( !isNode ) {\\n\" + \n" + 
        "			\"				cache[ id ].toJSON = jQuery.noop;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// An object can be passed to jQuery.data instead of a key/value pair; this gets\\n\" + \n" + 
        "			\"		// shallow copied over onto the existing cache\\n\" + \n" + 
        "			\"		if ( typeof name === \\\"object\\\" || typeof name === \\\"function\\\" ) {\\n\" + \n" + 
        "			\"			if ( pvt ) {\\n\" + \n" + 
        "			\"				cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				cache[ id ] = jQuery.extend(cache[ id ], name);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		thisCache = cache[ id ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Internal jQuery data is stored in a separate object inside the object's data\\n\" + \n" + 
        "			\"		// cache in order to avoid key collisions between internal data and user-defined\\n\" + \n" + 
        "			\"		// data\\n\" + \n" + 
        "			\"		if ( pvt ) {\\n\" + \n" + 
        "			\"			if ( !thisCache[ internalKey ] ) {\\n\" + \n" + 
        "			\"				thisCache[ internalKey ] = {};\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			thisCache = thisCache[ internalKey ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( data !== undefined ) {\\n\" + \n" + 
        "			\"			thisCache[ jQuery.camelCase( name ) ] = data;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should\\n\" + \n" + 
        "			\"		// not attempt to inspect the internal events object using jQuery.data, as this\\n\" + \n" + 
        "			\"		// internal data object is undocumented and subject to change.\\n\" + \n" + 
        "			\"		if ( name === \\\"events\\\" && !thisCache[name] ) {\\n\" + \n" + 
        "			\"			return thisCache[ internalKey ] && thisCache[ internalKey ].events;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Check for both converted-to-camel and non-converted data property names\\n\" + \n" + 
        "			\"		// If a data property was specified\\n\" + \n" + 
        "			\"		if ( getByName ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// First Try to find as-is property data\\n\" + \n" + 
        "			\"			ret = thisCache[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Test for null|undefined property data\\n\" + \n" + 
        "			\"			if ( ret == null ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Try to find the camelCased property\\n\" + \n" + 
        "			\"				ret = thisCache[ jQuery.camelCase( name ) ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			ret = thisCache;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	removeData: function( elem, name, pvt /* Internal Use Only */ ) {\\n\" + \n" + 
        "			\"		if ( !jQuery.acceptData( elem ) ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var thisCache,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Reference to internal data cache key\\n\" + \n" + 
        "			\"			internalKey = jQuery.expando,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			isNode = elem.nodeType,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// See jQuery.data for more information\\n\" + \n" + 
        "			\"			cache = isNode ? jQuery.cache : elem,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// See jQuery.data for more information\\n\" + \n" + 
        "			\"			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If there is already no cache entry for this object, there is no\\n\" + \n" + 
        "			\"		// purpose in continuing\\n\" + \n" + 
        "			\"		if ( !cache[ id ] ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( name ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( thisCache ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Support interoperable removal of hyphenated or camelcased keys\\n\" + \n" + 
        "			\"				if ( !thisCache[ name ] ) {\\n\" + \n" + 
        "			\"					name = jQuery.camelCase( name );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				delete thisCache[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// If there is no data left in the cache, we want to continue\\n\" + \n" + 
        "			\"				// and let the cache object itself get destroyed\\n\" + \n" + 
        "			\"				if ( !isEmptyDataObject(thisCache) ) {\\n\" + \n" + 
        "			\"					return;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// See jQuery.data for more information\\n\" + \n" + 
        "			\"		if ( pvt ) {\\n\" + \n" + 
        "			\"			delete cache[ id ][ internalKey ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Don't destroy the parent cache unless the internal data object\\n\" + \n" + 
        "			\"			// had been the only thing left in it\\n\" + \n" + 
        "			\"			if ( !isEmptyDataObject(cache[ id ]) ) {\\n\" + \n" + 
        "			\"				return;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var internalCache = cache[ id ][ internalKey ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Browsers that fail expando deletion also refuse to delete expandos on\\n\" + \n" + 
        "			\"		// the window, but it will allow it on all other JS objects; other browsers\\n\" + \n" + 
        "			\"		// don't care\\n\" + \n" + 
        "			\"		// Ensure that `cache` is not a window object #10080\\n\" + \n" + 
        "			\"		if ( jQuery.support.deleteExpando || !cache.setInterval ) {\\n\" + \n" + 
        "			\"			delete cache[ id ];\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			cache[ id ] = null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// We destroyed the entire user cache at once because it's faster than\\n\" + \n" + 
        "			\"		// iterating through each key, but we need to continue to persist internal\\n\" + \n" + 
        "			\"		// data if it existed\\n\" + \n" + 
        "			\"		if ( internalCache ) {\\n\" + \n" + 
        "			\"			cache[ id ] = {};\\n\" + \n" + 
        "			\"			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery\\n\" + \n" + 
        "			\"			// metadata on plain JS objects when the object is serialized using\\n\" + \n" + 
        "			\"			// JSON.stringify\\n\" + \n" + 
        "			\"			if ( !isNode ) {\\n\" + \n" + 
        "			\"				cache[ id ].toJSON = jQuery.noop;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			cache[ id ][ internalKey ] = internalCache;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Otherwise, we need to eliminate the expando on the node to avoid\\n\" + \n" + 
        "			\"		// false lookups in the cache for entries that no longer exist\\n\" + \n" + 
        "			\"		} else if ( isNode ) {\\n\" + \n" + 
        "			\"			// IE does not allow us to delete expando properties from nodes,\\n\" + \n" + 
        "			\"			// nor does it have a removeAttribute function on Document nodes;\\n\" + \n" + 
        "			\"			// we must handle all of these cases\\n\" + \n" + 
        "			\"			if ( jQuery.support.deleteExpando ) {\\n\" + \n" + 
        "			\"				delete elem[ jQuery.expando ];\\n\" + \n" + 
        "			\"			} else if ( elem.removeAttribute ) {\\n\" + \n" + 
        "			\"				elem.removeAttribute( jQuery.expando );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				elem[ jQuery.expando ] = null;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// For internal use only.\\n\" + \n" + 
        "			\"	_data: function( elem, name, data ) {\\n\" + \n" + 
        "			\"		return jQuery.data( elem, name, data, true );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A method for determining if a DOM node can handle the data expando\\n\" + \n" + 
        "			\"	acceptData: function( elem ) {\\n\" + \n" + 
        "			\"		if ( elem.nodeName ) {\\n\" + \n" + 
        "			\"			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( match ) {\\n\" + \n" + 
        "			\"				return !(match === true || elem.getAttribute(\\\"classid\\\") !== match);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return true;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	data: function( key, value ) {\\n\" + \n" + 
        "			\"		var data = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof key === \\\"undefined\\\" ) {\\n\" + \n" + 
        "			\"			if ( this.length ) {\\n\" + \n" + 
        "			\"				data = jQuery.data( this[0] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( this[0].nodeType === 1 ) {\\n\" + \n" + 
        "			\"			    var attr = this[0].attributes, name;\\n\" + \n" + 
        "			\"					for ( var i = 0, l = attr.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"						name = attr[i].name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( name.indexOf( \\\"data-\\\" ) === 0 ) {\\n\" + \n" + 
        "			\"							name = jQuery.camelCase( name.substring(5) );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							dataAttr( this[0], name, data[ name ] );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( typeof key === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"			return this.each(function() {\\n\" + \n" + 
        "			\"				jQuery.data( this, key );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var parts = key.split(\\\".\\\");\\n\" + \n" + 
        "			\"		parts[1] = parts[1] ? \\\".\\\" + parts[1] : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( value === undefined ) {\\n\" + \n" + 
        "			\"			data = this.triggerHandler(\\\"getData\\\" + parts[1] + \\\"!\\\", [parts[0]]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Try to fetch any internally stored data first\\n\" + \n" + 
        "			\"			if ( data === undefined && this.length ) {\\n\" + \n" + 
        "			\"				data = jQuery.data( this[0], key );\\n\" + \n" + 
        "			\"				data = dataAttr( this[0], key, data );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return data === undefined && parts[1] ?\\n\" + \n" + 
        "			\"				this.data( parts[0] ) :\\n\" + \n" + 
        "			\"				data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			return this.each(function() {\\n\" + \n" + 
        "			\"				var $this = jQuery( this ),\\n\" + \n" + 
        "			\"					args = [ parts[0], value ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				$this.triggerHandler( \\\"setData\\\" + parts[1] + \\\"!\\\", args );\\n\" + \n" + 
        "			\"				jQuery.data( this, key, value );\\n\" + \n" + 
        "			\"				$this.triggerHandler( \\\"changeData\\\" + parts[1] + \\\"!\\\", args );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	removeData: function( key ) {\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			jQuery.removeData( this, key );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function dataAttr( elem, key, data ) {\\n\" + \n" + 
        "			\"	// If nothing was found internally, try to fetch any\\n\" + \n" + 
        "			\"	// data from the HTML5 data-* attribute\\n\" + \n" + 
        "			\"	if ( data === undefined && elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var name = \\\"data-\\\" + key.replace( rmultiDash, \\\"-$1\\\" ).toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		data = elem.getAttribute( name );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof data === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				data = data === \\\"true\\\" ? true :\\n\" + \n" + 
        "			\"				data === \\\"false\\\" ? false :\\n\" + \n" + 
        "			\"				data === \\\"null\\\" ? null :\\n\" + \n" + 
        "			\"				!jQuery.isNaN( data ) ? parseFloat( data ) :\\n\" + \n" + 
        "			\"					rbrace.test( data ) ? jQuery.parseJSON( data ) :\\n\" + \n" + 
        "			\"					data;\\n\" + \n" + 
        "			\"			} catch( e ) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Make sure we set the data so it isn't changed later\\n\" + \n" + 
        "			\"			jQuery.data( elem, key, data );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			data = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return data;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON\\n\" + \n" + 
        "			\"// property to be considered empty objects; this property always exists in\\n\" + \n" + 
        "			\"// order to make sure JSON.stringify does not expose internal metadata\\n\" + \n" + 
        "			\"function isEmptyDataObject( obj ) {\\n\" + \n" + 
        "			\"	for ( var name in obj ) {\\n\" + \n" + 
        "			\"		if ( name !== \\\"toJSON\\\" ) {\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return true;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function handleQueueMarkDefer( elem, type, src ) {\\n\" + \n" + 
        "			\"	var deferDataKey = type + \\\"defer\\\",\\n\" + \n" + 
        "			\"		queueDataKey = type + \\\"queue\\\",\\n\" + \n" + 
        "			\"		markDataKey = type + \\\"mark\\\",\\n\" + \n" + 
        "			\"		defer = jQuery.data( elem, deferDataKey, undefined, true );\\n\" + \n" + 
        "			\"	if ( defer &&\\n\" + \n" + 
        "			\"		( src === \\\"queue\\\" || !jQuery.data( elem, queueDataKey, undefined, true ) ) &&\\n\" + \n" + 
        "			\"		( src === \\\"mark\\\" || !jQuery.data( elem, markDataKey, undefined, true ) ) ) {\\n\" + \n" + 
        "			\"		// Give room for hard-coded callbacks to fire first\\n\" + \n" + 
        "			\"		// and eventually mark/queue something else on the element\\n\" + \n" + 
        "			\"		setTimeout( function() {\\n\" + \n" + 
        "			\"			if ( !jQuery.data( elem, queueDataKey, undefined, true ) &&\\n\" + \n" + 
        "			\"				!jQuery.data( elem, markDataKey, undefined, true ) ) {\\n\" + \n" + 
        "			\"				jQuery.removeData( elem, deferDataKey, true );\\n\" + \n" + 
        "			\"				defer.resolve();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}, 0 );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	_mark: function( elem, type ) {\\n\" + \n" + 
        "			\"		if ( elem ) {\\n\" + \n" + 
        "			\"			type = (type || \\\"fx\\\") + \\\"mark\\\";\\n\" + \n" + 
        "			\"			jQuery.data( elem, type, (jQuery.data(elem,type,undefined,true) || 0) + 1, true );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	_unmark: function( force, elem, type ) {\\n\" + \n" + 
        "			\"		if ( force !== true ) {\\n\" + \n" + 
        "			\"			type = elem;\\n\" + \n" + 
        "			\"			elem = force;\\n\" + \n" + 
        "			\"			force = false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		if ( elem ) {\\n\" + \n" + 
        "			\"			type = type || \\\"fx\\\";\\n\" + \n" + 
        "			\"			var key = type + \\\"mark\\\",\\n\" + \n" + 
        "			\"				count = force ? 0 : ( (jQuery.data( elem, key, undefined, true) || 1 ) - 1 );\\n\" + \n" + 
        "			\"			if ( count ) {\\n\" + \n" + 
        "			\"				jQuery.data( elem, key, count, true );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				jQuery.removeData( elem, key, true );\\n\" + \n" + 
        "			\"				handleQueueMarkDefer( elem, type, \\\"mark\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	queue: function( elem, type, data ) {\\n\" + \n" + 
        "			\"		if ( elem ) {\\n\" + \n" + 
        "			\"			type = (type || \\\"fx\\\") + \\\"queue\\\";\\n\" + \n" + 
        "			\"			var q = jQuery.data( elem, type, undefined, true );\\n\" + \n" + 
        "			\"			// Speed up dequeue by getting out quickly if this is just a lookup\\n\" + \n" + 
        "			\"			if ( data ) {\\n\" + \n" + 
        "			\"				if ( !q || jQuery.isArray(data) ) {\\n\" + \n" + 
        "			\"					q = jQuery.data( elem, type, jQuery.makeArray(data), true );\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					q.push( data );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return q || [];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	dequeue: function( elem, type ) {\\n\" + \n" + 
        "			\"		type = type || \\\"fx\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var queue = jQuery.queue( elem, type ),\\n\" + \n" + 
        "			\"			fn = queue.shift(),\\n\" + \n" + 
        "			\"			defer;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If the fx queue is dequeued, always remove the progress sentinel\\n\" + \n" + 
        "			\"		if ( fn === \\\"inprogress\\\" ) {\\n\" + \n" + 
        "			\"			fn = queue.shift();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( fn ) {\\n\" + \n" + 
        "			\"			// Add a progress sentinel to prevent the fx queue from being\\n\" + \n" + 
        "			\"			// automatically dequeued\\n\" + \n" + 
        "			\"			if ( type === \\\"fx\\\" ) {\\n\" + \n" + 
        "			\"				queue.unshift(\\\"inprogress\\\");\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			fn.call(elem, function() {\\n\" + \n" + 
        "			\"				jQuery.dequeue(elem, type);\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !queue.length ) {\\n\" + \n" + 
        "			\"			jQuery.removeData( elem, type + \\\"queue\\\", true );\\n\" + \n" + 
        "			\"			handleQueueMarkDefer( elem, type, \\\"queue\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	queue: function( type, data ) {\\n\" + \n" + 
        "			\"		if ( typeof type !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			data = type;\\n\" + \n" + 
        "			\"			type = \\\"fx\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( data === undefined ) {\\n\" + \n" + 
        "			\"			return jQuery.queue( this[0], type );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			var queue = jQuery.queue( this, type, data );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( type === \\\"fx\\\" && queue[0] !== \\\"inprogress\\\" ) {\\n\" + \n" + 
        "			\"				jQuery.dequeue( this, type );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	dequeue: function( type ) {\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			jQuery.dequeue( this, type );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	// Based off of the plugin by Clint Helfers, with permission.\\n\" + \n" + 
        "			\"	// http://blindsignals.com/index.php/2009/07/jquery-delay/\\n\" + \n" + 
        "			\"	delay: function( time, type ) {\\n\" + \n" + 
        "			\"		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;\\n\" + \n" + 
        "			\"		type = type || \\\"fx\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.queue( type, function() {\\n\" + \n" + 
        "			\"			var elem = this;\\n\" + \n" + 
        "			\"			setTimeout(function() {\\n\" + \n" + 
        "			\"				jQuery.dequeue( elem, type );\\n\" + \n" + 
        "			\"			}, time );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	clearQueue: function( type ) {\\n\" + \n" + 
        "			\"		return this.queue( type || \\\"fx\\\", [] );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	// Get a promise resolved when queues of a certain type\\n\" + \n" + 
        "			\"	// are emptied (fx is the type by default)\\n\" + \n" + 
        "			\"	promise: function( type, object ) {\\n\" + \n" + 
        "			\"		if ( typeof type !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			object = type;\\n\" + \n" + 
        "			\"			type = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		type = type || \\\"fx\\\";\\n\" + \n" + 
        "			\"		var defer = jQuery.Deferred(),\\n\" + \n" + 
        "			\"			elements = this,\\n\" + \n" + 
        "			\"			i = elements.length,\\n\" + \n" + 
        "			\"			count = 1,\\n\" + \n" + 
        "			\"			deferDataKey = type + \\\"defer\\\",\\n\" + \n" + 
        "			\"			queueDataKey = type + \\\"queue\\\",\\n\" + \n" + 
        "			\"			markDataKey = type + \\\"mark\\\",\\n\" + \n" + 
        "			\"			tmp;\\n\" + \n" + 
        "			\"		function resolve() {\\n\" + \n" + 
        "			\"			if ( !( --count ) ) {\\n\" + \n" + 
        "			\"				defer.resolveWith( elements, [ elements ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		while( i-- ) {\\n\" + \n" + 
        "			\"			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||\\n\" + \n" + 
        "			\"					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||\\n\" + \n" + 
        "			\"						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&\\n\" + \n" + 
        "			\"					jQuery.data( elements[ i ], deferDataKey, jQuery._Deferred(), true ) )) {\\n\" + \n" + 
        "			\"				count++;\\n\" + \n" + 
        "			\"				tmp.done( resolve );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		resolve();\\n\" + \n" + 
        "			\"		return defer.promise();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var rclass = /[\\\\n\\\\t\\\\r]/g,\\n\" + \n" + 
        "			\"	rspace = /\\\\s+/,\\n\" + \n" + 
        "			\"	rreturn = /\\\\r/g,\\n\" + \n" + 
        "			\"	rtype = /^(?:button|input)$/i,\\n\" + \n" + 
        "			\"	rfocusable = /^(?:button|input|object|select|textarea)$/i,\\n\" + \n" + 
        "			\"	rclickable = /^a(?:rea)?$/i,\\n\" + \n" + 
        "			\"	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,\\n\" + \n" + 
        "			\"	nodeHook, boolHook;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	attr: function( name, value ) {\\n\" + \n" + 
        "			\"		return jQuery.access( this, name, value, true, jQuery.attr );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	removeAttr: function( name ) {\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			jQuery.removeAttr( this, name );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	prop: function( name, value ) {\\n\" + \n" + 
        "			\"		return jQuery.access( this, name, value, true, jQuery.prop );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	removeProp: function( name ) {\\n\" + \n" + 
        "			\"		name = jQuery.propFix[ name ] || name;\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			// try/catch handles cases where IE balks (such as removing a property on window)\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				this[ name ] = undefined;\\n\" + \n" + 
        "			\"				delete this[ name ];\\n\" + \n" + 
        "			\"			} catch( e ) {}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	addClass: function( value ) {\\n\" + \n" + 
        "			\"		var classNames, i, l, elem,\\n\" + \n" + 
        "			\"			setClass, c, cl;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( value ) ) {\\n\" + \n" + 
        "			\"			return this.each(function( j ) {\\n\" + \n" + 
        "			\"				jQuery( this ).addClass( value.call(this, j, this.className) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( value && typeof value === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			classNames = value.split( rspace );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				elem = this[ i ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"					if ( !elem.className && classNames.length === 1 ) {\\n\" + \n" + 
        "			\"						elem.className = value;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						setClass = \\\" \\\" + elem.className + \\\" \\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						for ( c = 0, cl = classNames.length; c < cl; c++ ) {\\n\" + \n" + 
        "			\"							if ( !~setClass.indexOf( \\\" \\\" + classNames[ c ] + \\\" \\\" ) ) {\\n\" + \n" + 
        "			\"								setClass += classNames[ c ] + \\\" \\\";\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						elem.className = jQuery.trim( setClass );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	removeClass: function( value ) {\\n\" + \n" + 
        "			\"		var classNames, i, l, elem, className, c, cl;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( value ) ) {\\n\" + \n" + 
        "			\"			return this.each(function( j ) {\\n\" + \n" + 
        "			\"				jQuery( this ).removeClass( value.call(this, j, this.className) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( (value && typeof value === \\\"string\\\") || value === undefined ) {\\n\" + \n" + 
        "			\"			classNames = (value || \\\"\\\").split( rspace );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				elem = this[ i ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.nodeType === 1 && elem.className ) {\\n\" + \n" + 
        "			\"					if ( value ) {\\n\" + \n" + 
        "			\"						className = (\\\" \\\" + elem.className + \\\" \\\").replace( rclass, \\\" \\\" );\\n\" + \n" + 
        "			\"						for ( c = 0, cl = classNames.length; c < cl; c++ ) {\\n\" + \n" + 
        "			\"							className = className.replace(\\\" \\\" + classNames[ c ] + \\\" \\\", \\\" \\\");\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						elem.className = jQuery.trim( className );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						elem.className = \\\"\\\";\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	toggleClass: function( value, stateVal ) {\\n\" + \n" + 
        "			\"		var type = typeof value,\\n\" + \n" + 
        "			\"			isBool = typeof stateVal === \\\"boolean\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( value ) ) {\\n\" + \n" + 
        "			\"			return this.each(function( i ) {\\n\" + \n" + 
        "			\"				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			if ( type === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"				// toggle individual class names\\n\" + \n" + 
        "			\"				var className,\\n\" + \n" + 
        "			\"					i = 0,\\n\" + \n" + 
        "			\"					self = jQuery( this ),\\n\" + \n" + 
        "			\"					state = stateVal,\\n\" + \n" + 
        "			\"					classNames = value.split( rspace );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				while ( (className = classNames[ i++ ]) ) {\\n\" + \n" + 
        "			\"					// check each className given, space seperated list\\n\" + \n" + 
        "			\"					state = isBool ? state : !self.hasClass( className );\\n\" + \n" + 
        "			\"					self[ state ? \\\"addClass\\\" : \\\"removeClass\\\" ]( className );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else if ( type === \\\"undefined\\\" || type === \\\"boolean\\\" ) {\\n\" + \n" + 
        "			\"				if ( this.className ) {\\n\" + \n" + 
        "			\"					// store className if set\\n\" + \n" + 
        "			\"					jQuery._data( this, \\\"__className__\\\", this.className );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// toggle whole className\\n\" + \n" + 
        "			\"				this.className = this.className || value === false ? \\\"\\\" : jQuery._data( this, \\\"__className__\\\" ) || \\\"\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	hasClass: function( selector ) {\\n\" + \n" + 
        "			\"		var className = \\\" \\\" + selector + \\\" \\\";\\n\" + \n" + 
        "			\"		for ( var i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"			if ( this[i].nodeType === 1 && (\\\" \\\" + this[i].className + \\\" \\\").replace(rclass, \\\" \\\").indexOf( className ) > -1 ) {\\n\" + \n" + 
        "			\"				return true;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return false;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	val: function( value ) {\\n\" + \n" + 
        "			\"		var hooks, ret,\\n\" + \n" + 
        "			\"			elem = this[0];\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		if ( !arguments.length ) {\\n\" + \n" + 
        "			\"			if ( elem ) {\\n\" + \n" + 
        "			\"				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( hooks && \\\"get\\\" in hooks && (ret = hooks.get( elem, \\\"value\\\" )) !== undefined ) {\\n\" + \n" + 
        "			\"					return ret;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				ret = elem.value;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return typeof ret === \\\"string\\\" ? \\n\" + \n" + 
        "			\"					// handle most common string cases\\n\" + \n" + 
        "			\"					ret.replace(rreturn, \\\"\\\") : \\n\" + \n" + 
        "			\"					// handle cases where value is null/undef or number\\n\" + \n" + 
        "			\"					ret == null ? \\\"\\\" : ret;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var isFunction = jQuery.isFunction( value );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.each(function( i ) {\\n\" + \n" + 
        "			\"			var self = jQuery(this), val;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( this.nodeType !== 1 ) {\\n\" + \n" + 
        "			\"				return;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( isFunction ) {\\n\" + \n" + 
        "			\"				val = value.call( this, i, self.val() );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				val = value;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Treat null/undefined as \\\"\\\"; convert numbers to string\\n\" + \n" + 
        "			\"			if ( val == null ) {\\n\" + \n" + 
        "			\"				val = \\\"\\\";\\n\" + \n" + 
        "			\"			} else if ( typeof val === \\\"number\\\" ) {\\n\" + \n" + 
        "			\"				val += \\\"\\\";\\n\" + \n" + 
        "			\"			} else if ( jQuery.isArray( val ) ) {\\n\" + \n" + 
        "			\"				val = jQuery.map(val, function ( value ) {\\n\" + \n" + 
        "			\"					return value == null ? \\\"\\\" : value + \\\"\\\";\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If set returns undefined, fall back to normal setting\\n\" + \n" + 
        "			\"			if ( !hooks || !(\\\"set\\\" in hooks) || hooks.set( this, val, \\\"value\\\" ) === undefined ) {\\n\" + \n" + 
        "			\"				this.value = val;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	valHooks: {\\n\" + \n" + 
        "			\"		option: {\\n\" + \n" + 
        "			\"			get: function( elem ) {\\n\" + \n" + 
        "			\"				// attributes.value is undefined in Blackberry 4.7 but\\n\" + \n" + 
        "			\"				// uses .value. See #6932\\n\" + \n" + 
        "			\"				var val = elem.attributes.value;\\n\" + \n" + 
        "			\"				return !val || val.specified ? elem.value : elem.text;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		select: {\\n\" + \n" + 
        "			\"			get: function( elem ) {\\n\" + \n" + 
        "			\"				var value,\\n\" + \n" + 
        "			\"					index = elem.selectedIndex,\\n\" + \n" + 
        "			\"					values = [],\\n\" + \n" + 
        "			\"					options = elem.options,\\n\" + \n" + 
        "			\"					one = elem.type === \\\"select-one\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Nothing was selected\\n\" + \n" + 
        "			\"				if ( index < 0 ) {\\n\" + \n" + 
        "			\"					return null;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Loop through all the selected options\\n\" + \n" + 
        "			\"				for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {\\n\" + \n" + 
        "			\"					var option = options[ i ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Don't return options that are disabled or in a disabled optgroup\\n\" + \n" + 
        "			\"					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute(\\\"disabled\\\") === null) &&\\n\" + \n" + 
        "			\"							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \\\"optgroup\\\" )) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Get the specific value for the option\\n\" + \n" + 
        "			\"						value = jQuery( option ).val();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// We don't need an array for one selects\\n\" + \n" + 
        "			\"						if ( one ) {\\n\" + \n" + 
        "			\"							return value;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Multi-Selects return an array\\n\" + \n" + 
        "			\"						values.push( value );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()\\n\" + \n" + 
        "			\"				if ( one && !values.length && options.length ) {\\n\" + \n" + 
        "			\"					return jQuery( options[ index ] ).val();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return values;\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			set: function( elem, value ) {\\n\" + \n" + 
        "			\"				var values = jQuery.makeArray( value );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				jQuery(elem).find(\\\"option\\\").each(function() {\\n\" + \n" + 
        "			\"					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( !values.length ) {\\n\" + \n" + 
        "			\"					elem.selectedIndex = -1;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				return values;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	attrFn: {\\n\" + \n" + 
        "			\"		val: true,\\n\" + \n" + 
        "			\"		css: true,\\n\" + \n" + 
        "			\"		html: true,\\n\" + \n" + 
        "			\"		text: true,\\n\" + \n" + 
        "			\"		data: true,\\n\" + \n" + 
        "			\"		width: true,\\n\" + \n" + 
        "			\"		height: true,\\n\" + \n" + 
        "			\"		offset: true\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	attrFix: {\\n\" + \n" + 
        "			\"		// Always normalize to ensure hook usage\\n\" + \n" + 
        "			\"		tabindex: \\\"tabIndex\\\"\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	attr: function( elem, name, value, pass ) {\\n\" + \n" + 
        "			\"		var nType = elem.nodeType;\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		// don't get/set attributes on text, comment and attribute nodes\\n\" + \n" + 
        "			\"		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\\n\" + \n" + 
        "			\"			return undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( pass && name in jQuery.attrFn ) {\\n\" + \n" + 
        "			\"			return jQuery( elem )[ name ]( value );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Fallback to prop when attributes are not supported\\n\" + \n" + 
        "			\"		if ( !(\\\"getAttribute\\\" in elem) ) {\\n\" + \n" + 
        "			\"			return jQuery.prop( elem, name, value );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var ret, hooks,\\n\" + \n" + 
        "			\"			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Normalize the name if needed\\n\" + \n" + 
        "			\"		if ( notxml ) {\\n\" + \n" + 
        "			\"			name = jQuery.attrFix[ name ] || name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			hooks = jQuery.attrHooks[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !hooks ) {\\n\" + \n" + 
        "			\"				// Use boolHook for boolean attributes\\n\" + \n" + 
        "			\"				if ( rboolean.test( name ) ) {\\n\" + \n" + 
        "			\"					hooks = boolHook;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Use nodeHook if available( IE6/7 )\\n\" + \n" + 
        "			\"				} else if ( nodeHook ) {\\n\" + \n" + 
        "			\"					hooks = nodeHook;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( value !== undefined ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( value === null ) {\\n\" + \n" + 
        "			\"				jQuery.removeAttr( elem, name );\\n\" + \n" + 
        "			\"				return undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else if ( hooks && \\\"set\\\" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {\\n\" + \n" + 
        "			\"				return ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				elem.setAttribute( name, \\\"\\\" + value );\\n\" + \n" + 
        "			\"				return value;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( hooks && \\\"get\\\" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {\\n\" + \n" + 
        "			\"			return ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			ret = elem.getAttribute( name );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Non-existent attributes return null, we normalize to undefined\\n\" + \n" + 
        "			\"			return ret === null ?\\n\" + \n" + 
        "			\"				undefined :\\n\" + \n" + 
        "			\"				ret;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	removeAttr: function( elem, name ) {\\n\" + \n" + 
        "			\"		var propName;\\n\" + \n" + 
        "			\"		if ( elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"			name = jQuery.attrFix[ name ] || name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			jQuery.attr( elem, name, \\\"\\\" );\\n\" + \n" + 
        "			\"			elem.removeAttribute( name );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Set corresponding property to false for boolean attributes\\n\" + \n" + 
        "			\"			if ( rboolean.test( name ) && (propName = jQuery.propFix[ name ] || name) in elem ) {\\n\" + \n" + 
        "			\"				elem[ propName ] = false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	attrHooks: {\\n\" + \n" + 
        "			\"		type: {\\n\" + \n" + 
        "			\"			set: function( elem, value ) {\\n\" + \n" + 
        "			\"				// We can't allow the type property to be changed (since it causes problems in IE)\\n\" + \n" + 
        "			\"				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {\\n\" + \n" + 
        "			\"					jQuery.error( \\\"type property can't be changed\\\" );\\n\" + \n" + 
        "			\"				} else if ( !jQuery.support.radioValue && value === \\\"radio\\\" && jQuery.nodeName(elem, \\\"input\\\") ) {\\n\" + \n" + 
        "			\"					// Setting the type on a radio button after the value resets the value in IE6-9\\n\" + \n" + 
        "			\"					// Reset value to it's default in case type is set after value\\n\" + \n" + 
        "			\"					// This is for element creation\\n\" + \n" + 
        "			\"					var val = elem.value;\\n\" + \n" + 
        "			\"					elem.setAttribute( \\\"type\\\", value );\\n\" + \n" + 
        "			\"					if ( val ) {\\n\" + \n" + 
        "			\"						elem.value = val;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return value;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		// Use the value property for back compat\\n\" + \n" + 
        "			\"		// Use the nodeHook for button elements in IE6/7 (#1954)\\n\" + \n" + 
        "			\"		value: {\\n\" + \n" + 
        "			\"			get: function( elem, name ) {\\n\" + \n" + 
        "			\"				if ( nodeHook && jQuery.nodeName( elem, \\\"button\\\" ) ) {\\n\" + \n" + 
        "			\"					return nodeHook.get( elem, name );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				return name in elem ?\\n\" + \n" + 
        "			\"					elem.value :\\n\" + \n" + 
        "			\"					null;\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			set: function( elem, value, name ) {\\n\" + \n" + 
        "			\"				if ( nodeHook && jQuery.nodeName( elem, \\\"button\\\" ) ) {\\n\" + \n" + 
        "			\"					return nodeHook.set( elem, value, name );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				// Does not return so that setAttribute is also used\\n\" + \n" + 
        "			\"				elem.value = value;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	propFix: {\\n\" + \n" + 
        "			\"		tabindex: \\\"tabIndex\\\",\\n\" + \n" + 
        "			\"		readonly: \\\"readOnly\\\",\\n\" + \n" + 
        "			\"		\\\"for\\\": \\\"htmlFor\\\",\\n\" + \n" + 
        "			\"		\\\"class\\\": \\\"className\\\",\\n\" + \n" + 
        "			\"		maxlength: \\\"maxLength\\\",\\n\" + \n" + 
        "			\"		cellspacing: \\\"cellSpacing\\\",\\n\" + \n" + 
        "			\"		cellpadding: \\\"cellPadding\\\",\\n\" + \n" + 
        "			\"		rowspan: \\\"rowSpan\\\",\\n\" + \n" + 
        "			\"		colspan: \\\"colSpan\\\",\\n\" + \n" + 
        "			\"		usemap: \\\"useMap\\\",\\n\" + \n" + 
        "			\"		frameborder: \\\"frameBorder\\\",\\n\" + \n" + 
        "			\"		contenteditable: \\\"contentEditable\\\"\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	prop: function( elem, name, value ) {\\n\" + \n" + 
        "			\"		var nType = elem.nodeType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// don't get/set properties on text, comment and attribute nodes\\n\" + \n" + 
        "			\"		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\\n\" + \n" + 
        "			\"			return undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var ret, hooks,\\n\" + \n" + 
        "			\"			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( notxml ) {\\n\" + \n" + 
        "			\"			// Fix name and attach hooks\\n\" + \n" + 
        "			\"			name = jQuery.propFix[ name ] || name;\\n\" + \n" + 
        "			\"			hooks = jQuery.propHooks[ name ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( value !== undefined ) {\\n\" + \n" + 
        "			\"			if ( hooks && \\\"set\\\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {\\n\" + \n" + 
        "			\"				return ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				return (elem[ name ] = value);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			if ( hooks && \\\"get\\\" in hooks && (ret = hooks.get( elem, name )) !== null ) {\\n\" + \n" + 
        "			\"				return ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				return elem[ name ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	propHooks: {\\n\" + \n" + 
        "			\"		tabIndex: {\\n\" + \n" + 
        "			\"			get: function( elem ) {\\n\" + \n" + 
        "			\"				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set\\n\" + \n" + 
        "			\"				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\\n\" + \n" + 
        "			\"				var attributeNode = elem.getAttributeNode(\\\"tabindex\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return attributeNode && attributeNode.specified ?\\n\" + \n" + 
        "			\"					parseInt( attributeNode.value, 10 ) :\\n\" + \n" + 
        "			\"					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?\\n\" + \n" + 
        "			\"						0 :\\n\" + \n" + 
        "			\"						undefined;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Add the tabindex propHook to attrHooks for back-compat\\n\" + \n" + 
        "			\"jQuery.attrHooks.tabIndex = jQuery.propHooks.tabIndex;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Hook for boolean attributes\\n\" + \n" + 
        "			\"boolHook = {\\n\" + \n" + 
        "			\"	get: function( elem, name ) {\\n\" + \n" + 
        "			\"		// Align boolean attributes with corresponding properties\\n\" + \n" + 
        "			\"		// Fall back to attribute presence where some booleans are not supported\\n\" + \n" + 
        "			\"		var attrNode;\\n\" + \n" + 
        "			\"		return jQuery.prop( elem, name ) === true || ( attrNode = elem.getAttributeNode( name ) ) && attrNode.nodeValue !== false ?\\n\" + \n" + 
        "			\"			name.toLowerCase() :\\n\" + \n" + 
        "			\"			undefined;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	set: function( elem, value, name ) {\\n\" + \n" + 
        "			\"		var propName;\\n\" + \n" + 
        "			\"		if ( value === false ) {\\n\" + \n" + 
        "			\"			// Remove boolean attributes when set to false\\n\" + \n" + 
        "			\"			jQuery.removeAttr( elem, name );\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			// value is true since we know at this point it's type boolean and not false\\n\" + \n" + 
        "			\"			// Set boolean attributes to the same name and set the DOM property\\n\" + \n" + 
        "			\"			propName = jQuery.propFix[ name ] || name;\\n\" + \n" + 
        "			\"			if ( propName in elem ) {\\n\" + \n" + 
        "			\"				// Only set the IDL specifically if it already exists on the element\\n\" + \n" + 
        "			\"				elem[ propName ] = true;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elem.setAttribute( name, name.toLowerCase() );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return name;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// IE6/7 do not support getting/setting some attributes with get/setAttribute\\n\" + \n" + 
        "			\"if ( !jQuery.support.getSetAttribute ) {\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	// Use this for any attribute in IE6/7\\n\" + \n" + 
        "			\"	// This fixes almost every IE6/7 issue\\n\" + \n" + 
        "			\"	nodeHook = jQuery.valHooks.button = {\\n\" + \n" + 
        "			\"		get: function( elem, name ) {\\n\" + \n" + 
        "			\"			var ret;\\n\" + \n" + 
        "			\"			ret = elem.getAttributeNode( name );\\n\" + \n" + 
        "			\"			// Return undefined if nodeValue is empty string\\n\" + \n" + 
        "			\"			return ret && ret.nodeValue !== \\\"\\\" ?\\n\" + \n" + 
        "			\"				ret.nodeValue :\\n\" + \n" + 
        "			\"				undefined;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		set: function( elem, value, name ) {\\n\" + \n" + 
        "			\"			// Set the existing or create a new attribute node\\n\" + \n" + 
        "			\"			var ret = elem.getAttributeNode( name );\\n\" + \n" + 
        "			\"			if ( !ret ) {\\n\" + \n" + 
        "			\"				ret = document.createAttribute( name );\\n\" + \n" + 
        "			\"				elem.setAttributeNode( ret );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return (ret.nodeValue = value + \\\"\\\");\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Set width and height to auto instead of 0 on empty string( Bug #8150 )\\n\" + \n" + 
        "			\"	// This is for removals\\n\" + \n" + 
        "			\"	jQuery.each([ \\\"width\\\", \\\"height\\\" ], function( i, name ) {\\n\" + \n" + 
        "			\"		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {\\n\" + \n" + 
        "			\"			set: function( elem, value ) {\\n\" + \n" + 
        "			\"				if ( value === \\\"\\\" ) {\\n\" + \n" + 
        "			\"					elem.setAttribute( name, \\\"auto\\\" );\\n\" + \n" + 
        "			\"					return value;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Some attributes require a special call on IE\\n\" + \n" + 
        "			\"if ( !jQuery.support.hrefNormalized ) {\\n\" + \n" + 
        "			\"	jQuery.each([ \\\"href\\\", \\\"src\\\", \\\"width\\\", \\\"height\\\" ], function( i, name ) {\\n\" + \n" + 
        "			\"		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {\\n\" + \n" + 
        "			\"			get: function( elem ) {\\n\" + \n" + 
        "			\"				var ret = elem.getAttribute( name, 2 );\\n\" + \n" + 
        "			\"				return ret === null ? undefined : ret;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( !jQuery.support.style ) {\\n\" + \n" + 
        "			\"	jQuery.attrHooks.style = {\\n\" + \n" + 
        "			\"		get: function( elem ) {\\n\" + \n" + 
        "			\"			// Return undefined in the case of empty string\\n\" + \n" + 
        "			\"			// Normalize to lowercase since IE uppercases css property names\\n\" + \n" + 
        "			\"			return elem.style.cssText.toLowerCase() || undefined;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		set: function( elem, value ) {\\n\" + \n" + 
        "			\"			return (elem.style.cssText = \\\"\\\" + value);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Safari mis-reports the default selected property of an option\\n\" + \n" + 
        "			\"// Accessing the parent's selectedIndex property fixes it\\n\" + \n" + 
        "			\"if ( !jQuery.support.optSelected ) {\\n\" + \n" + 
        "			\"	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {\\n\" + \n" + 
        "			\"		get: function( elem ) {\\n\" + \n" + 
        "			\"			var parent = elem.parentNode;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( parent ) {\\n\" + \n" + 
        "			\"				parent.selectedIndex;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Make sure that it also works with optgroups, see #5701\\n\" + \n" + 
        "			\"				if ( parent.parentNode ) {\\n\" + \n" + 
        "			\"					parent.parentNode.selectedIndex;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Radios and checkboxes getter/setter\\n\" + \n" + 
        "			\"if ( !jQuery.support.checkOn ) {\\n\" + \n" + 
        "			\"	jQuery.each([ \\\"radio\\\", \\\"checkbox\\\" ], function() {\\n\" + \n" + 
        "			\"		jQuery.valHooks[ this ] = {\\n\" + \n" + 
        "			\"			get: function( elem ) {\\n\" + \n" + 
        "			\"				// Handle the case where in Webkit \\\"\\\" is returned instead of \\\"on\\\" if a value isn't specified\\n\" + \n" + 
        "			\"				return elem.getAttribute(\\\"value\\\") === null ? \\\"on\\\" : elem.value;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"jQuery.each([ \\\"radio\\\", \\\"checkbox\\\" ], function() {\\n\" + \n" + 
        "			\"	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {\\n\" + \n" + 
        "			\"		set: function( elem, value ) {\\n\" + \n" + 
        "			\"			if ( jQuery.isArray( value ) ) {\\n\" + \n" + 
        "			\"				return (elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var rnamespaces = /\\\\.(.*)$/,\\n\" + \n" + 
        "			\"	rformElems = /^(?:textarea|input|select)$/i,\\n\" + \n" + 
        "			\"	rperiod = /\\\\./g,\\n\" + \n" + 
        "			\"	rspaces = / /g,\\n\" + \n" + 
        "			\"	rescape = /[^\\\\w\\\\s.|`]/g,\\n\" + \n" + 
        "			\"	fcleanup = function( nm ) {\\n\" + \n" + 
        "			\"		return nm.replace(rescape, \\\"\\\\\\\\$&\\\");\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*\\n\" + \n" + 
        "			\" * A number of helper functions used for managing events.\\n\" + \n" + 
        "			\" * Many of the ideas behind this code originated from\\n\" + \n" + 
        "			\" * Dean Edwards' addEvent library.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"jQuery.event = {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Bind an event to an element\\n\" + \n" + 
        "			\"	// Original by Dean Edwards\\n\" + \n" + 
        "			\"	add: function( elem, types, handler, data ) {\\n\" + \n" + 
        "			\"		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( handler === false ) {\\n\" + \n" + 
        "			\"			handler = returnFalse;\\n\" + \n" + 
        "			\"		} else if ( !handler ) {\\n\" + \n" + 
        "			\"			// Fixes bug #7229. Fix recommended by jdalton\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var handleObjIn, handleObj;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( handler.handler ) {\\n\" + \n" + 
        "			\"			handleObjIn = handler;\\n\" + \n" + 
        "			\"			handler = handleObjIn.handler;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that the function being executed has a unique ID\\n\" + \n" + 
        "			\"		if ( !handler.guid ) {\\n\" + \n" + 
        "			\"			handler.guid = jQuery.guid++;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Init the element's event structure\\n\" + \n" + 
        "			\"		var elemData = jQuery._data( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If no elemData is found then we must be trying to bind to one of the\\n\" + \n" + 
        "			\"		// banned noData elements\\n\" + \n" + 
        "			\"		if ( !elemData ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var events = elemData.events,\\n\" + \n" + 
        "			\"			eventHandle = elemData.handle;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !events ) {\\n\" + \n" + 
        "			\"			elemData.events = events = {};\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !eventHandle ) {\\n\" + \n" + 
        "			\"			elemData.handle = eventHandle = function( e ) {\\n\" + \n" + 
        "			\"				// Discard the second event of a jQuery.event.trigger() and\\n\" + \n" + 
        "			\"				// when an event is called after a page has unloaded\\n\" + \n" + 
        "			\"				return typeof jQuery !== \\\"undefined\\\" && (!e || jQuery.event.triggered !== e.type) ?\\n\" + \n" + 
        "			\"					jQuery.event.handle.apply( eventHandle.elem, arguments ) :\\n\" + \n" + 
        "			\"					undefined;\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add elem as a property of the handle function\\n\" + \n" + 
        "			\"		// This is to prevent a memory leak with non-native events in IE.\\n\" + \n" + 
        "			\"		eventHandle.elem = elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle multiple events separated by a space\\n\" + \n" + 
        "			\"		// jQuery(...).bind(\\\"mouseover mouseout\\\", fn);\\n\" + \n" + 
        "			\"		types = types.split(\\\" \\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var type, i = 0, namespaces;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( (type = types[ i++ ]) ) {\\n\" + \n" + 
        "			\"			handleObj = handleObjIn ?\\n\" + \n" + 
        "			\"				jQuery.extend({}, handleObjIn) :\\n\" + \n" + 
        "			\"				{ handler: handler, data: data };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Namespaced event handlers\\n\" + \n" + 
        "			\"			if ( type.indexOf(\\\".\\\") > -1 ) {\\n\" + \n" + 
        "			\"				namespaces = type.split(\\\".\\\");\\n\" + \n" + 
        "			\"				type = namespaces.shift();\\n\" + \n" + 
        "			\"				handleObj.namespace = namespaces.slice(0).sort().join(\\\".\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				namespaces = [];\\n\" + \n" + 
        "			\"				handleObj.namespace = \\\"\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			handleObj.type = type;\\n\" + \n" + 
        "			\"			if ( !handleObj.guid ) {\\n\" + \n" + 
        "			\"				handleObj.guid = handler.guid;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Get the current list of functions bound to this event\\n\" + \n" + 
        "			\"			var handlers = events[ type ],\\n\" + \n" + 
        "			\"				special = jQuery.event.special[ type ] || {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Init the event handler queue\\n\" + \n" + 
        "			\"			if ( !handlers ) {\\n\" + \n" + 
        "			\"				handlers = events[ type ] = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Check for a special event handler\\n\" + \n" + 
        "			\"				// Only use addEventListener/attachEvent if the special\\n\" + \n" + 
        "			\"				// events handler returns false\\n\" + \n" + 
        "			\"				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {\\n\" + \n" + 
        "			\"					// Bind the global event handler to the element\\n\" + \n" + 
        "			\"					if ( elem.addEventListener ) {\\n\" + \n" + 
        "			\"						elem.addEventListener( type, eventHandle, false );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else if ( elem.attachEvent ) {\\n\" + \n" + 
        "			\"						elem.attachEvent( \\\"on\\\" + type, eventHandle );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( special.add ) {\\n\" + \n" + 
        "			\"				special.add.call( elem, handleObj );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( !handleObj.handler.guid ) {\\n\" + \n" + 
        "			\"					handleObj.handler.guid = handler.guid;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Add the function to the element's handler list\\n\" + \n" + 
        "			\"			handlers.push( handleObj );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Keep track of which events have been used, for event optimization\\n\" + \n" + 
        "			\"			jQuery.event.global[ type ] = true;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Nullify elem to prevent memory leaks in IE\\n\" + \n" + 
        "			\"		elem = null;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	global: {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Detach an event or set of events from an element\\n\" + \n" + 
        "			\"	remove: function( elem, types, handler, pos ) {\\n\" + \n" + 
        "			\"		// don't do events on text and comment nodes\\n\" + \n" + 
        "			\"		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( handler === false ) {\\n\" + \n" + 
        "			\"			handler = returnFalse;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,\\n\" + \n" + 
        "			\"			elemData = jQuery.hasData( elem ) && jQuery._data( elem ),\\n\" + \n" + 
        "			\"			events = elemData && elemData.events;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !elemData || !events ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// types is actually an event object here\\n\" + \n" + 
        "			\"		if ( types && types.type ) {\\n\" + \n" + 
        "			\"			handler = types.handler;\\n\" + \n" + 
        "			\"			types = types.type;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Unbind all events for the element\\n\" + \n" + 
        "			\"		if ( !types || typeof types === \\\"string\\\" && types.charAt(0) === \\\".\\\" ) {\\n\" + \n" + 
        "			\"			types = types || \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( type in events ) {\\n\" + \n" + 
        "			\"				jQuery.event.remove( elem, type + types );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle multiple events separated by a space\\n\" + \n" + 
        "			\"		// jQuery(...).unbind(\\\"mouseover mouseout\\\", fn);\\n\" + \n" + 
        "			\"		types = types.split(\\\" \\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( (type = types[ i++ ]) ) {\\n\" + \n" + 
        "			\"			origType = type;\\n\" + \n" + 
        "			\"			handleObj = null;\\n\" + \n" + 
        "			\"			all = type.indexOf(\\\".\\\") < 0;\\n\" + \n" + 
        "			\"			namespaces = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !all ) {\\n\" + \n" + 
        "			\"				// Namespaced event handlers\\n\" + \n" + 
        "			\"				namespaces = type.split(\\\".\\\");\\n\" + \n" + 
        "			\"				type = namespaces.shift();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				namespace = new RegExp(\\\"(^|\\\\\\\\.)\\\" +\\n\" + \n" + 
        "			\"					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join(\\\"\\\\\\\\.(?:.*\\\\\\\\.)?\\\") + \\\"(\\\\\\\\.|$)\\\");\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			eventType = events[ type ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !eventType ) {\\n\" + \n" + 
        "			\"				continue;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !handler ) {\\n\" + \n" + 
        "			\"				for ( j = 0; j < eventType.length; j++ ) {\\n\" + \n" + 
        "			\"					handleObj = eventType[ j ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( all || namespace.test( handleObj.namespace ) ) {\\n\" + \n" + 
        "			\"						jQuery.event.remove( elem, origType, handleObj.handler, j );\\n\" + \n" + 
        "			\"						eventType.splice( j--, 1 );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				continue;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			special = jQuery.event.special[ type ] || {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( j = pos || 0; j < eventType.length; j++ ) {\\n\" + \n" + 
        "			\"				handleObj = eventType[ j ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( handler.guid === handleObj.guid ) {\\n\" + \n" + 
        "			\"					// remove the given handler for the given type\\n\" + \n" + 
        "			\"					if ( all || namespace.test( handleObj.namespace ) ) {\\n\" + \n" + 
        "			\"						if ( pos == null ) {\\n\" + \n" + 
        "			\"							eventType.splice( j--, 1 );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( special.remove ) {\\n\" + \n" + 
        "			\"							special.remove.call( elem, handleObj );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( pos != null ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// remove generic event handler if no more handlers exist\\n\" + \n" + 
        "			\"			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {\\n\" + \n" + 
        "			\"				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {\\n\" + \n" + 
        "			\"					jQuery.removeEvent( elem, type, elemData.handle );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				ret = null;\\n\" + \n" + 
        "			\"				delete events[ type ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Remove the expando if it's no longer used\\n\" + \n" + 
        "			\"		if ( jQuery.isEmptyObject( events ) ) {\\n\" + \n" + 
        "			\"			var handle = elemData.handle;\\n\" + \n" + 
        "			\"			if ( handle ) {\\n\" + \n" + 
        "			\"				handle.elem = null;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			delete elemData.events;\\n\" + \n" + 
        "			\"			delete elemData.handle;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( jQuery.isEmptyObject( elemData ) ) {\\n\" + \n" + 
        "			\"				jQuery.removeData( elem, undefined, true );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	// Events that are safe to short-circuit if no handlers are attached.\\n\" + \n" + 
        "			\"	// Native DOM events should not be added, they may have inline handlers.\\n\" + \n" + 
        "			\"	customEvent: {\\n\" + \n" + 
        "			\"		\\\"getData\\\": true,\\n\" + \n" + 
        "			\"		\\\"setData\\\": true,\\n\" + \n" + 
        "			\"		\\\"changeData\\\": true\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	trigger: function( event, data, elem, onlyHandlers ) {\\n\" + \n" + 
        "			\"		// Event object or event type\\n\" + \n" + 
        "			\"		var type = event.type || event,\\n\" + \n" + 
        "			\"			namespaces = [],\\n\" + \n" + 
        "			\"			exclusive;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( type.indexOf(\\\"!\\\") >= 0 ) {\\n\" + \n" + 
        "			\"			// Exclusive events trigger only for the exact event (no namespaces)\\n\" + \n" + 
        "			\"			type = type.slice(0, -1);\\n\" + \n" + 
        "			\"			exclusive = true;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( type.indexOf(\\\".\\\") >= 0 ) {\\n\" + \n" + 
        "			\"			// Namespaced trigger; create a regexp to match event type in handle()\\n\" + \n" + 
        "			\"			namespaces = type.split(\\\".\\\");\\n\" + \n" + 
        "			\"			type = namespaces.shift();\\n\" + \n" + 
        "			\"			namespaces.sort();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {\\n\" + \n" + 
        "			\"			// No jQuery handlers for this event type, and it can't have inline handlers\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Caller can pass in an Event, Object, or just an event type string\\n\" + \n" + 
        "			\"		event = typeof event === \\\"object\\\" ?\\n\" + \n" + 
        "			\"			// jQuery.Event object\\n\" + \n" + 
        "			\"			event[ jQuery.expando ] ? event :\\n\" + \n" + 
        "			\"			// Object literal\\n\" + \n" + 
        "			\"			new jQuery.Event( type, event ) :\\n\" + \n" + 
        "			\"			// Just the event type (string)\\n\" + \n" + 
        "			\"			new jQuery.Event( type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		event.type = type;\\n\" + \n" + 
        "			\"		event.exclusive = exclusive;\\n\" + \n" + 
        "			\"		event.namespace = namespaces.join(\\\".\\\");\\n\" + \n" + 
        "			\"		event.namespace_re = new RegExp(\\\"(^|\\\\\\\\.)\\\" + namespaces.join(\\\"\\\\\\\\.(?:.*\\\\\\\\.)?\\\") + \\\"(\\\\\\\\.|$)\\\");\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		// triggerHandler() and global events don't bubble or run the default action\\n\" + \n" + 
        "			\"		if ( onlyHandlers || !elem ) {\\n\" + \n" + 
        "			\"			event.preventDefault();\\n\" + \n" + 
        "			\"			event.stopPropagation();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle a global trigger\\n\" + \n" + 
        "			\"		if ( !elem ) {\\n\" + \n" + 
        "			\"			// TODO: Stop taunting the data cache; remove global events and always attach to document\\n\" + \n" + 
        "			\"			jQuery.each( jQuery.cache, function() {\\n\" + \n" + 
        "			\"				// internalKey variable is just used to make it easier to find\\n\" + \n" + 
        "			\"				// and potentially change this stuff later; currently it just\\n\" + \n" + 
        "			\"				// points to jQuery.expando\\n\" + \n" + 
        "			\"				var internalKey = jQuery.expando,\\n\" + \n" + 
        "			\"					internalCache = this[ internalKey ];\\n\" + \n" + 
        "			\"				if ( internalCache && internalCache.events && internalCache.events[ type ] ) {\\n\" + \n" + 
        "			\"					jQuery.event.trigger( event, data, internalCache.handle.elem );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Don't do events on text and comment nodes\\n\" + \n" + 
        "			\"		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Clean up the event in case it is being reused\\n\" + \n" + 
        "			\"		event.result = undefined;\\n\" + \n" + 
        "			\"		event.target = elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Clone any incoming data and prepend the event, creating the handler arg list\\n\" + \n" + 
        "			\"		data = data != null ? jQuery.makeArray( data ) : [];\\n\" + \n" + 
        "			\"		data.unshift( event );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var cur = elem,\\n\" + \n" + 
        "			\"			// IE doesn't like method names with a colon (#3533, #8272)\\n\" + \n" + 
        "			\"			ontype = type.indexOf(\\\":\\\") < 0 ? \\\"on\\\" + type : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Fire event on the current element, then bubble up the DOM tree\\n\" + \n" + 
        "			\"		do {\\n\" + \n" + 
        "			\"			var handle = jQuery._data( cur, \\\"handle\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			event.currentTarget = cur;\\n\" + \n" + 
        "			\"			if ( handle ) {\\n\" + \n" + 
        "			\"				handle.apply( cur, data );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Trigger an inline bound script\\n\" + \n" + 
        "			\"			if ( ontype && jQuery.acceptData( cur ) && cur[ ontype ] && cur[ ontype ].apply( cur, data ) === false ) {\\n\" + \n" + 
        "			\"				event.result = false;\\n\" + \n" + 
        "			\"				event.preventDefault();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Bubble up to document, then to window\\n\" + \n" + 
        "			\"			cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;\\n\" + \n" + 
        "			\"		} while ( cur && !event.isPropagationStopped() );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If nobody prevented the default action, do it now\\n\" + \n" + 
        "			\"		if ( !event.isDefaultPrevented() ) {\\n\" + \n" + 
        "			\"			var old,\\n\" + \n" + 
        "			\"				special = jQuery.event.special[ type ] || {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( (!special._default || special._default.call( elem.ownerDocument, event ) === false) &&\\n\" + \n" + 
        "			\"				!(type === \\\"click\\\" && jQuery.nodeName( elem, \\\"a\\\" )) && jQuery.acceptData( elem ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Call a native DOM method on the target with the same name name as the event.\\n\" + \n" + 
        "			\"				// Can't use an .isFunction)() check here because IE6/7 fails that test.\\n\" + \n" + 
        "			\"				// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.\\n\" + \n" + 
        "			\"				try {\\n\" + \n" + 
        "			\"					if ( ontype && elem[ type ] ) {\\n\" + \n" + 
        "			\"						// Don't re-trigger an onFOO event when we call its FOO() method\\n\" + \n" + 
        "			\"						old = elem[ ontype ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( old ) {\\n\" + \n" + 
        "			\"							elem[ ontype ] = null;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						jQuery.event.triggered = type;\\n\" + \n" + 
        "			\"						elem[ type ]();\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				} catch ( ieError ) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( old ) {\\n\" + \n" + 
        "			\"					elem[ ontype ] = old;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				jQuery.event.triggered = undefined;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		return event.result;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	handle: function( event ) {\\n\" + \n" + 
        "			\"		event = jQuery.event.fix( event || window.event );\\n\" + \n" + 
        "			\"		// Snapshot the handlers list since a called handler may add/remove events.\\n\" + \n" + 
        "			\"		var handlers = ((jQuery._data( this, \\\"events\\\" ) || {})[ event.type ] || []).slice(0),\\n\" + \n" + 
        "			\"			run_all = !event.exclusive && !event.namespace,\\n\" + \n" + 
        "			\"			args = Array.prototype.slice.call( arguments, 0 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Use the fix-ed Event rather than the (read-only) native event\\n\" + \n" + 
        "			\"		args[0] = event;\\n\" + \n" + 
        "			\"		event.currentTarget = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var j = 0, l = handlers.length; j < l; j++ ) {\\n\" + \n" + 
        "			\"			var handleObj = handlers[ j ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Triggered event must 1) be non-exclusive and have no namespace, or\\n\" + \n" + 
        "			\"			// 2) have namespace(s) a subset or equal to those in the bound event.\\n\" + \n" + 
        "			\"			if ( run_all || event.namespace_re.test( handleObj.namespace ) ) {\\n\" + \n" + 
        "			\"				// Pass in a reference to the handler function itself\\n\" + \n" + 
        "			\"				// So that we can later remove it\\n\" + \n" + 
        "			\"				event.handler = handleObj.handler;\\n\" + \n" + 
        "			\"				event.data = handleObj.data;\\n\" + \n" + 
        "			\"				event.handleObj = handleObj;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var ret = handleObj.handler.apply( this, args );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( ret !== undefined ) {\\n\" + \n" + 
        "			\"					event.result = ret;\\n\" + \n" + 
        "			\"					if ( ret === false ) {\\n\" + \n" + 
        "			\"						event.preventDefault();\\n\" + \n" + 
        "			\"						event.stopPropagation();\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( event.isImmediatePropagationStopped() ) {\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return event.result;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	props: \\\"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which\\\".split(\\\" \\\"),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	fix: function( event ) {\\n\" + \n" + 
        "			\"		if ( event[ jQuery.expando ] ) {\\n\" + \n" + 
        "			\"			return event;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// store a copy of the original event object\\n\" + \n" + 
        "			\"		// and \\\"clone\\\" to set read-only properties\\n\" + \n" + 
        "			\"		var originalEvent = event;\\n\" + \n" + 
        "			\"		event = jQuery.Event( originalEvent );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var i = this.props.length, prop; i; ) {\\n\" + \n" + 
        "			\"			prop = this.props[ --i ];\\n\" + \n" + 
        "			\"			event[ prop ] = originalEvent[ prop ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Fix target property, if necessary\\n\" + \n" + 
        "			\"		if ( !event.target ) {\\n\" + \n" + 
        "			\"			// Fixes #1925 where srcElement might not be defined either\\n\" + \n" + 
        "			\"			event.target = event.srcElement || document;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// check if target is a textnode (safari)\\n\" + \n" + 
        "			\"		if ( event.target.nodeType === 3 ) {\\n\" + \n" + 
        "			\"			event.target = event.target.parentNode;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add relatedTarget, if necessary\\n\" + \n" + 
        "			\"		if ( !event.relatedTarget && event.fromElement ) {\\n\" + \n" + 
        "			\"			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Calculate pageX/Y if missing and clientX/Y available\\n\" + \n" + 
        "			\"		if ( event.pageX == null && event.clientX != null ) {\\n\" + \n" + 
        "			\"			var eventDocument = event.target.ownerDocument || document,\\n\" + \n" + 
        "			\"				doc = eventDocument.documentElement,\\n\" + \n" + 
        "			\"				body = eventDocument.body;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);\\n\" + \n" + 
        "			\"			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add which for key events\\n\" + \n" + 
        "			\"		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {\\n\" + \n" + 
        "			\"			event.which = event.charCode != null ? event.charCode : event.keyCode;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)\\n\" + \n" + 
        "			\"		if ( !event.metaKey && event.ctrlKey ) {\\n\" + \n" + 
        "			\"			event.metaKey = event.ctrlKey;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add which for click: 1 === left; 2 === middle; 3 === right\\n\" + \n" + 
        "			\"		// Note: button is not normalized, so don't use it\\n\" + \n" + 
        "			\"		if ( !event.which && event.button !== undefined ) {\\n\" + \n" + 
        "			\"			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return event;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Deprecated, use jQuery.guid instead\\n\" + \n" + 
        "			\"	guid: 1E8,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Deprecated, use jQuery.proxy instead\\n\" + \n" + 
        "			\"	proxy: jQuery.proxy,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	special: {\\n\" + \n" + 
        "			\"		ready: {\\n\" + \n" + 
        "			\"			// Make sure the ready event is setup\\n\" + \n" + 
        "			\"			setup: jQuery.bindReady,\\n\" + \n" + 
        "			\"			teardown: jQuery.noop\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		live: {\\n\" + \n" + 
        "			\"			add: function( handleObj ) {\\n\" + \n" + 
        "			\"				jQuery.event.add( this,\\n\" + \n" + 
        "			\"					liveConvert( handleObj.origType, handleObj.selector ),\\n\" + \n" + 
        "			\"					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			remove: function( handleObj ) {\\n\" + \n" + 
        "			\"				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		beforeunload: {\\n\" + \n" + 
        "			\"			setup: function( data, namespaces, eventHandle ) {\\n\" + \n" + 
        "			\"				// We only want to do this special case on windows\\n\" + \n" + 
        "			\"				if ( jQuery.isWindow( this ) ) {\\n\" + \n" + 
        "			\"					this.onbeforeunload = eventHandle;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			teardown: function( namespaces, eventHandle ) {\\n\" + \n" + 
        "			\"				if ( this.onbeforeunload === eventHandle ) {\\n\" + \n" + 
        "			\"					this.onbeforeunload = null;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.removeEvent = document.removeEventListener ?\\n\" + \n" + 
        "			\"	function( elem, type, handle ) {\\n\" + \n" + 
        "			\"		if ( elem.removeEventListener ) {\\n\" + \n" + 
        "			\"			elem.removeEventListener( type, handle, false );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	} :\\n\" + \n" + 
        "			\"	function( elem, type, handle ) {\\n\" + \n" + 
        "			\"		if ( elem.detachEvent ) {\\n\" + \n" + 
        "			\"			elem.detachEvent( \\\"on\\\" + type, handle );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.Event = function( src, props ) {\\n\" + \n" + 
        "			\"	// Allow instantiation without the 'new' keyword\\n\" + \n" + 
        "			\"	if ( !this.preventDefault ) {\\n\" + \n" + 
        "			\"		return new jQuery.Event( src, props );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Event object\\n\" + \n" + 
        "			\"	if ( src && src.type ) {\\n\" + \n" + 
        "			\"		this.originalEvent = src;\\n\" + \n" + 
        "			\"		this.type = src.type;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Events bubbling up the document may have been marked as prevented\\n\" + \n" + 
        "			\"		// by a handler lower down the tree; reflect the correct value.\\n\" + \n" + 
        "			\"		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||\\n\" + \n" + 
        "			\"			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Event type\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		this.type = src;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Put explicitly provided properties onto the event object\\n\" + \n" + 
        "			\"	if ( props ) {\\n\" + \n" + 
        "			\"		jQuery.extend( this, props );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// timeStamp is buggy for some events on Firefox(#3843)\\n\" + \n" + 
        "			\"	// So we won't rely on the native value\\n\" + \n" + 
        "			\"	this.timeStamp = jQuery.now();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Mark it as fixed\\n\" + \n" + 
        "			\"	this[ jQuery.expando ] = true;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function returnFalse() {\\n\" + \n" + 
        "			\"	return false;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"function returnTrue() {\\n\" + \n" + 
        "			\"	return true;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\\n\" + \n" + 
        "			\"// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\\n\" + \n" + 
        "			\"jQuery.Event.prototype = {\\n\" + \n" + 
        "			\"	preventDefault: function() {\\n\" + \n" + 
        "			\"		this.isDefaultPrevented = returnTrue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var e = this.originalEvent;\\n\" + \n" + 
        "			\"		if ( !e ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// if preventDefault exists run it on the original event\\n\" + \n" + 
        "			\"		if ( e.preventDefault ) {\\n\" + \n" + 
        "			\"			e.preventDefault();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// otherwise set the returnValue property of the original event to false (IE)\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			e.returnValue = false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	stopPropagation: function() {\\n\" + \n" + 
        "			\"		this.isPropagationStopped = returnTrue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var e = this.originalEvent;\\n\" + \n" + 
        "			\"		if ( !e ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		// if stopPropagation exists run it on the original event\\n\" + \n" + 
        "			\"		if ( e.stopPropagation ) {\\n\" + \n" + 
        "			\"			e.stopPropagation();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		// otherwise set the cancelBubble property of the original event to true (IE)\\n\" + \n" + 
        "			\"		e.cancelBubble = true;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	stopImmediatePropagation: function() {\\n\" + \n" + 
        "			\"		this.isImmediatePropagationStopped = returnTrue;\\n\" + \n" + 
        "			\"		this.stopPropagation();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	isDefaultPrevented: returnFalse,\\n\" + \n" + 
        "			\"	isPropagationStopped: returnFalse,\\n\" + \n" + 
        "			\"	isImmediatePropagationStopped: returnFalse\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Checks if an event happened on an element within another element\\n\" + \n" + 
        "			\"// Used in jQuery.event.special.mouseenter and mouseleave handlers\\n\" + \n" + 
        "			\"var withinElement = function( event ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if mouse(over|out) are still within the same parent element\\n\" + \n" + 
        "			\"	var related = event.relatedTarget,\\n\" + \n" + 
        "			\"		inside = false,\\n\" + \n" + 
        "			\"		eventType = event.type;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	event.type = event.data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( related !== this ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( related ) {\\n\" + \n" + 
        "			\"			inside = jQuery.contains( this, related );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !inside ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			jQuery.event.handle.apply( this, arguments );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			event.type = eventType;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// In case of event delegation, we only need to rename the event.type,\\n\" + \n" + 
        "			\"// liveHandler will take care of the rest.\\n\" + \n" + 
        "			\"delegate = function( event ) {\\n\" + \n" + 
        "			\"	event.type = event.data;\\n\" + \n" + 
        "			\"	jQuery.event.handle.apply( this, arguments );\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create mouseenter and mouseleave events\\n\" + \n" + 
        "			\"jQuery.each({\\n\" + \n" + 
        "			\"	mouseenter: \\\"mouseover\\\",\\n\" + \n" + 
        "			\"	mouseleave: \\\"mouseout\\\"\\n\" + \n" + 
        "			\"}, function( orig, fix ) {\\n\" + \n" + 
        "			\"	jQuery.event.special[ orig ] = {\\n\" + \n" + 
        "			\"		setup: function( data ) {\\n\" + \n" + 
        "			\"			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		teardown: function( data ) {\\n\" + \n" + 
        "			\"			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// submit delegation\\n\" + \n" + 
        "			\"if ( !jQuery.support.submitBubbles ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.event.special.submit = {\\n\" + \n" + 
        "			\"		setup: function( data, namespaces ) {\\n\" + \n" + 
        "			\"			if ( !jQuery.nodeName( this, \\\"form\\\" ) ) {\\n\" + \n" + 
        "			\"				jQuery.event.add(this, \\\"click.specialSubmit\\\", function( e ) {\\n\" + \n" + 
        "			\"					// Avoid triggering error on non-existent type attribute in IE VML (#7071)\\n\" + \n" + 
        "			\"					var elem = e.target,\\n\" + \n" + 
        "			\"						type = jQuery.nodeName( elem, \\\"input\\\" ) || jQuery.nodeName( elem, \\\"button\\\" ) ? elem.type : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( (type === \\\"submit\\\" || type === \\\"image\\\") && jQuery( elem ).closest(\\\"form\\\").length ) {\\n\" + \n" + 
        "			\"						trigger( \\\"submit\\\", this, arguments );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				jQuery.event.add(this, \\\"keypress.specialSubmit\\\", function( e ) {\\n\" + \n" + 
        "			\"					var elem = e.target,\\n\" + \n" + 
        "			\"						type = jQuery.nodeName( elem, \\\"input\\\" ) || jQuery.nodeName( elem, \\\"button\\\" ) ? elem.type : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( (type === \\\"text\\\" || type === \\\"password\\\") && jQuery( elem ).closest(\\\"form\\\").length && e.keyCode === 13 ) {\\n\" + \n" + 
        "			\"						trigger( \\\"submit\\\", this, arguments );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				return false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		teardown: function( namespaces ) {\\n\" + \n" + 
        "			\"			jQuery.event.remove( this, \\\".specialSubmit\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// change delegation, happens here so we have bind.\\n\" + \n" + 
        "			\"if ( !jQuery.support.changeBubbles ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var changeFilters,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	getVal = function( elem ) {\\n\" + \n" + 
        "			\"		var type = jQuery.nodeName( elem, \\\"input\\\" ) ? elem.type : \\\"\\\",\\n\" + \n" + 
        "			\"			val = elem.value;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( type === \\\"radio\\\" || type === \\\"checkbox\\\" ) {\\n\" + \n" + 
        "			\"			val = elem.checked;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( type === \\\"select-multiple\\\" ) {\\n\" + \n" + 
        "			\"			val = elem.selectedIndex > -1 ?\\n\" + \n" + 
        "			\"				jQuery.map( elem.options, function( elem ) {\\n\" + \n" + 
        "			\"					return elem.selected;\\n\" + \n" + 
        "			\"				}).join(\\\"-\\\") :\\n\" + \n" + 
        "			\"				\\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( jQuery.nodeName( elem, \\\"select\\\" ) ) {\\n\" + \n" + 
        "			\"			val = elem.selectedIndex;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return val;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	testChange = function testChange( e ) {\\n\" + \n" + 
        "			\"		var elem = e.target, data, val;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		data = jQuery._data( elem, \\\"_change_data\\\" );\\n\" + \n" + 
        "			\"		val = getVal(elem);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// the current data will be also retrieved by beforeactivate\\n\" + \n" + 
        "			\"		if ( e.type !== \\\"focusout\\\" || elem.type !== \\\"radio\\\" ) {\\n\" + \n" + 
        "			\"			jQuery._data( elem, \\\"_change_data\\\", val );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( data === undefined || val === data ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( data != null || val ) {\\n\" + \n" + 
        "			\"			e.type = \\\"change\\\";\\n\" + \n" + 
        "			\"			e.liveFired = undefined;\\n\" + \n" + 
        "			\"			jQuery.event.trigger( e, arguments[1], elem );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.event.special.change = {\\n\" + \n" + 
        "			\"		filters: {\\n\" + \n" + 
        "			\"			focusout: testChange,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			beforedeactivate: testChange,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			click: function( e ) {\\n\" + \n" + 
        "			\"				var elem = e.target, type = jQuery.nodeName( elem, \\\"input\\\" ) ? elem.type : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( type === \\\"radio\\\" || type === \\\"checkbox\\\" || jQuery.nodeName( elem, \\\"select\\\" ) ) {\\n\" + \n" + 
        "			\"					testChange.call( this, e );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Change has to be called before submit\\n\" + \n" + 
        "			\"			// Keydown will be called before keypress, which is used in submit-event delegation\\n\" + \n" + 
        "			\"			keydown: function( e ) {\\n\" + \n" + 
        "			\"				var elem = e.target, type = jQuery.nodeName( elem, \\\"input\\\" ) ? elem.type : \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( (e.keyCode === 13 && !jQuery.nodeName( elem, \\\"textarea\\\" ) ) ||\\n\" + \n" + 
        "			\"					(e.keyCode === 32 && (type === \\\"checkbox\\\" || type === \\\"radio\\\")) ||\\n\" + \n" + 
        "			\"					type === \\\"select-multiple\\\" ) {\\n\" + \n" + 
        "			\"					testChange.call( this, e );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Beforeactivate happens also before the previous element is blurred\\n\" + \n" + 
        "			\"			// with this event you can't trigger a change event, but you can store\\n\" + \n" + 
        "			\"			// information\\n\" + \n" + 
        "			\"			beforeactivate: function( e ) {\\n\" + \n" + 
        "			\"				var elem = e.target;\\n\" + \n" + 
        "			\"				jQuery._data( elem, \\\"_change_data\\\", getVal(elem) );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		setup: function( data, namespaces ) {\\n\" + \n" + 
        "			\"			if ( this.type === \\\"file\\\" ) {\\n\" + \n" + 
        "			\"				return false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var type in changeFilters ) {\\n\" + \n" + 
        "			\"				jQuery.event.add( this, type + \\\".specialChange\\\", changeFilters[type] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return rformElems.test( this.nodeName );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		teardown: function( namespaces ) {\\n\" + \n" + 
        "			\"			jQuery.event.remove( this, \\\".specialChange\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return rformElems.test( this.nodeName );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	changeFilters = jQuery.event.special.change.filters;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Handle when the input is .focus()'d\\n\" + \n" + 
        "			\"	changeFilters.focus = changeFilters.beforeactivate;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function trigger( type, elem, args ) {\\n\" + \n" + 
        "			\"	// Piggyback on a donor event to simulate a different one.\\n\" + \n" + 
        "			\"	// Fake originalEvent to avoid donor's stopPropagation, but if the\\n\" + \n" + 
        "			\"	// simulated event prevents default then we do the same on the donor.\\n\" + \n" + 
        "			\"	// Don't pass args or remember liveFired; they apply to the donor event.\\n\" + \n" + 
        "			\"	var event = jQuery.extend( {}, args[ 0 ] );\\n\" + \n" + 
        "			\"	event.type = type;\\n\" + \n" + 
        "			\"	event.originalEvent = {};\\n\" + \n" + 
        "			\"	event.liveFired = undefined;\\n\" + \n" + 
        "			\"	jQuery.event.handle.call( elem, event );\\n\" + \n" + 
        "			\"	if ( event.isDefaultPrevented() ) {\\n\" + \n" + 
        "			\"		args[ 0 ].preventDefault();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create \\\"bubbling\\\" focus and blur events\\n\" + \n" + 
        "			\"if ( !jQuery.support.focusinBubbles ) {\\n\" + \n" + 
        "			\"	jQuery.each({ focus: \\\"focusin\\\", blur: \\\"focusout\\\" }, function( orig, fix ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Attach a single capturing handler while someone wants focusin/focusout\\n\" + \n" + 
        "			\"		var attaches = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		jQuery.event.special[ fix ] = {\\n\" + \n" + 
        "			\"			setup: function() {\\n\" + \n" + 
        "			\"				if ( attaches++ === 0 ) {\\n\" + \n" + 
        "			\"					document.addEventListener( orig, handler, true );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			teardown: function() {\\n\" + \n" + 
        "			\"				if ( --attaches === 0 ) {\\n\" + \n" + 
        "			\"					document.removeEventListener( orig, handler, true );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		function handler( donor ) {\\n\" + \n" + 
        "			\"			// Donor event is always a native one; fix it and switch its type.\\n\" + \n" + 
        "			\"			// Let focusin/out handler cancel the donor focus/blur event.\\n\" + \n" + 
        "			\"			var e = jQuery.event.fix( donor );\\n\" + \n" + 
        "			\"			e.type = fix;\\n\" + \n" + 
        "			\"			e.originalEvent = {};\\n\" + \n" + 
        "			\"			jQuery.event.trigger( e, null, e.target );\\n\" + \n" + 
        "			\"			if ( e.isDefaultPrevented() ) {\\n\" + \n" + 
        "			\"				donor.preventDefault();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each([\\\"bind\\\", \\\"one\\\"], function( i, name ) {\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( type, data, fn ) {\\n\" + \n" + 
        "			\"		var handler;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Handle object literals\\n\" + \n" + 
        "			\"		if ( typeof type === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"			for ( var key in type ) {\\n\" + \n" + 
        "			\"				this[ name ](key, data, type[key], fn);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( arguments.length === 2 || data === false ) {\\n\" + \n" + 
        "			\"			fn = data;\\n\" + \n" + 
        "			\"			data = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( name === \\\"one\\\" ) {\\n\" + \n" + 
        "			\"			handler = function( event ) {\\n\" + \n" + 
        "			\"				jQuery( this ).unbind( event, handler );\\n\" + \n" + 
        "			\"				return fn.apply( this, arguments );\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"			handler.guid = fn.guid || jQuery.guid++;\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			handler = fn;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( type === \\\"unload\\\" && name !== \\\"one\\\" ) {\\n\" + \n" + 
        "			\"			this.one( type, data, fn );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( var i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				jQuery.event.add( this[i], type, handler, data );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	unbind: function( type, fn ) {\\n\" + \n" + 
        "			\"		// Handle object literals\\n\" + \n" + 
        "			\"		if ( typeof type === \\\"object\\\" && !type.preventDefault ) {\\n\" + \n" + 
        "			\"			for ( var key in type ) {\\n\" + \n" + 
        "			\"				this.unbind(key, type[key]);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( var i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				jQuery.event.remove( this[i], type, fn );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	delegate: function( selector, types, data, fn ) {\\n\" + \n" + 
        "			\"		return this.live( types, data, fn, selector );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	undelegate: function( selector, types, fn ) {\\n\" + \n" + 
        "			\"		if ( arguments.length === 0 ) {\\n\" + \n" + 
        "			\"			return this.unbind( \\\"live\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			return this.die( types, null, fn, selector );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	trigger: function( type, data ) {\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			jQuery.event.trigger( type, data, this );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	triggerHandler: function( type, data ) {\\n\" + \n" + 
        "			\"		if ( this[0] ) {\\n\" + \n" + 
        "			\"			return jQuery.event.trigger( type, data, this[0], true );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	toggle: function( fn ) {\\n\" + \n" + 
        "			\"		// Save reference to arguments for access in closure\\n\" + \n" + 
        "			\"		var args = arguments,\\n\" + \n" + 
        "			\"			guid = fn.guid || jQuery.guid++,\\n\" + \n" + 
        "			\"			i = 0,\\n\" + \n" + 
        "			\"			toggler = function( event ) {\\n\" + \n" + 
        "			\"				// Figure out which function to execute\\n\" + \n" + 
        "			\"				var lastToggle = ( jQuery.data( this, \\\"lastToggle\\\" + fn.guid ) || 0 ) % i;\\n\" + \n" + 
        "			\"				jQuery.data( this, \\\"lastToggle\\\" + fn.guid, lastToggle + 1 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Make sure that clicks stop\\n\" + \n" + 
        "			\"				event.preventDefault();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// and execute the function\\n\" + \n" + 
        "			\"				return args[ lastToggle ].apply( this, arguments ) || false;\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// link all the functions, so any of them can unbind this click handler\\n\" + \n" + 
        "			\"		toggler.guid = guid;\\n\" + \n" + 
        "			\"		while ( i < args.length ) {\\n\" + \n" + 
        "			\"			args[ i++ ].guid = guid;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.click( toggler );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	hover: function( fnOver, fnOut ) {\\n\" + \n" + 
        "			\"		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var liveMap = {\\n\" + \n" + 
        "			\"	focus: \\\"focusin\\\",\\n\" + \n" + 
        "			\"	blur: \\\"focusout\\\",\\n\" + \n" + 
        "			\"	mouseenter: \\\"mouseover\\\",\\n\" + \n" + 
        "			\"	mouseleave: \\\"mouseout\\\"\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each([\\\"live\\\", \\\"die\\\"], function( i, name ) {\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {\\n\" + \n" + 
        "			\"		var type, i = 0, match, namespaces, preType,\\n\" + \n" + 
        "			\"			selector = origSelector || this.selector,\\n\" + \n" + 
        "			\"			context = origSelector ? this : jQuery( this.context );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof types === \\\"object\\\" && !types.preventDefault ) {\\n\" + \n" + 
        "			\"			for ( var key in types ) {\\n\" + \n" + 
        "			\"				context[ name ]( key, data, types[key], selector );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( name === \\\"die\\\" && !types &&\\n\" + \n" + 
        "			\"					origSelector && origSelector.charAt(0) === \\\".\\\" ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			context.unbind( origSelector );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( data === false || jQuery.isFunction( data ) ) {\\n\" + \n" + 
        "			\"			fn = data || returnFalse;\\n\" + \n" + 
        "			\"			data = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		types = (types || \\\"\\\").split(\\\" \\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( (type = types[ i++ ]) != null ) {\\n\" + \n" + 
        "			\"			match = rnamespaces.exec( type );\\n\" + \n" + 
        "			\"			namespaces = \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( match )  {\\n\" + \n" + 
        "			\"				namespaces = match[0];\\n\" + \n" + 
        "			\"				type = type.replace( rnamespaces, \\\"\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( type === \\\"hover\\\" ) {\\n\" + \n" + 
        "			\"				types.push( \\\"mouseenter\\\" + namespaces, \\\"mouseleave\\\" + namespaces );\\n\" + \n" + 
        "			\"				continue;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			preType = type;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( liveMap[ type ] ) {\\n\" + \n" + 
        "			\"				types.push( liveMap[ type ] + namespaces );\\n\" + \n" + 
        "			\"				type = type + namespaces;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				type = (liveMap[ type ] || type) + namespaces;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( name === \\\"live\\\" ) {\\n\" + \n" + 
        "			\"				// bind live handler\\n\" + \n" + 
        "			\"				for ( var j = 0, l = context.length; j < l; j++ ) {\\n\" + \n" + 
        "			\"					jQuery.event.add( context[j], \\\"live.\\\" + liveConvert( type, selector ),\\n\" + \n" + 
        "			\"						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				// unbind live handler\\n\" + \n" + 
        "			\"				context.unbind( \\\"live.\\\" + liveConvert( type, selector ), fn );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function liveHandler( event ) {\\n\" + \n" + 
        "			\"	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,\\n\" + \n" + 
        "			\"		elems = [],\\n\" + \n" + 
        "			\"		selectors = [],\\n\" + \n" + 
        "			\"		events = jQuery._data( this, \\\"events\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)\\n\" + \n" + 
        "			\"	if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === \\\"click\\\" ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( event.namespace ) {\\n\" + \n" + 
        "			\"		namespace = new RegExp(\\\"(^|\\\\\\\\.)\\\" + event.namespace.split(\\\".\\\").join(\\\"\\\\\\\\.(?:.*\\\\\\\\.)?\\\") + \\\"(\\\\\\\\.|$)\\\");\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	event.liveFired = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var live = events.live.slice(0);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( j = 0; j < live.length; j++ ) {\\n\" + \n" + 
        "			\"		handleObj = live[j];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( handleObj.origType.replace( rnamespaces, \\\"\\\" ) === event.type ) {\\n\" + \n" + 
        "			\"			selectors.push( handleObj.selector );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			live.splice( j--, 1 );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	match = jQuery( event.target ).closest( selectors, event.currentTarget );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i = 0, l = match.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		close = match[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( j = 0; j < live.length; j++ ) {\\n\" + \n" + 
        "			\"			handleObj = live[j];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {\\n\" + \n" + 
        "			\"				elem = close.elem;\\n\" + \n" + 
        "			\"				related = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Those two events require additional checking\\n\" + \n" + 
        "			\"				if ( handleObj.preType === \\\"mouseenter\\\" || handleObj.preType === \\\"mouseleave\\\" ) {\\n\" + \n" + 
        "			\"					event.type = handleObj.preType;\\n\" + \n" + 
        "			\"					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Make sure not to accidentally match a child element with the same selector\\n\" + \n" + 
        "			\"					if ( related && jQuery.contains( elem, related ) ) {\\n\" + \n" + 
        "			\"						related = elem;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( !related || related !== elem ) {\\n\" + \n" + 
        "			\"					elems.push({ elem: elem, handleObj: handleObj, level: close.level });\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i = 0, l = elems.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		match = elems[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( maxLevel && match.level > maxLevel ) {\\n\" + \n" + 
        "			\"			break;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		event.currentTarget = match.elem;\\n\" + \n" + 
        "			\"		event.data = match.handleObj.data;\\n\" + \n" + 
        "			\"		event.handleObj = match.handleObj;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ret = match.handleObj.origHandler.apply( match.elem, arguments );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( ret === false || event.isPropagationStopped() ) {\\n\" + \n" + 
        "			\"			maxLevel = match.level;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( ret === false ) {\\n\" + \n" + 
        "			\"				stop = false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( event.isImmediatePropagationStopped() ) {\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return stop;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function liveConvert( type, selector ) {\\n\" + \n" + 
        "			\"	return (type && type !== \\\"*\\\" ? type + \\\".\\\" : \\\"\\\") + selector.replace(rperiod, \\\"`\\\").replace(rspaces, \\\"&\\\");\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each( (\\\"blur focus focusin focusout load resize scroll unload click dblclick \\\" +\\n\" + \n" + 
        "			\"	\\\"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \\\" +\\n\" + \n" + 
        "			\"	\\\"change select submit keydown keypress keyup error\\\").split(\\\" \\\"), function( i, name ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Handle event binding\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( data, fn ) {\\n\" + \n" + 
        "			\"		if ( fn == null ) {\\n\" + \n" + 
        "			\"			fn = data;\\n\" + \n" + 
        "			\"			data = null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return arguments.length > 0 ?\\n\" + \n" + 
        "			\"			this.bind( name, data, fn ) :\\n\" + \n" + 
        "			\"			this.trigger( name );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( jQuery.attrFn ) {\\n\" + \n" + 
        "			\"		jQuery.attrFn[ name ] = true;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*!\\n\" + \n" + 
        "			\" * Sizzle CSS Selector Engine\\n\" + \n" + 
        "			\" *  Copyright 2011, The Dojo Foundation\\n\" + \n" + 
        "			\" *  Released under the MIT, BSD, and GPL Licenses.\\n\" + \n" + 
        "			\" *  More information: http://sizzlejs.com/\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"(function(){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var chunker = /((?:\\\\((?:\\\\([^()]+\\\\)|[^()]+)+\\\\)|\\\\[(?:\\\\[[^\\\\[\\\\]]*\\\\]|['\\\"][^'\\\"]*['\\\"]|[^\\\\[\\\\]'\\\"]+)+\\\\]|\\\\\\\\.|[^ >+~,(\\\\[\\\\\\\\]+)+|[>+~])(\\\\s*,\\\\s*)?((?:.|\\\\r|\\\\n)*)/g,\\n\" + \n" + 
        "			\"	done = 0,\\n\" + \n" + 
        "			\"	toString = Object.prototype.toString,\\n\" + \n" + 
        "			\"	hasDuplicate = false,\\n\" + \n" + 
        "			\"	baseHasDuplicate = true,\\n\" + \n" + 
        "			\"	rBackslash = /\\\\\\\\/g,\\n\" + \n" + 
        "			\"	rNonWord = /\\\\W/;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Here we check if the JavaScript engine is using some sort of\\n\" + \n" + 
        "			\"// optimization where it does not always call our comparision\\n\" + \n" + 
        "			\"// function. If that is the case, discard the hasDuplicate value.\\n\" + \n" + 
        "			\"//   Thus far that includes Google Chrome.\\n\" + \n" + 
        "			\"[0, 0].sort(function() {\\n\" + \n" + 
        "			\"	baseHasDuplicate = false;\\n\" + \n" + 
        "			\"	return 0;\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var Sizzle = function( selector, context, results, seed ) {\\n\" + \n" + 
        "			\"	results = results || [];\\n\" + \n" + 
        "			\"	context = context || document;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var origContext = context;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	if ( !selector || typeof selector !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"		return results;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var m, set, checkSet, extra, ret, cur, pop, i,\\n\" + \n" + 
        "			\"		prune = true,\\n\" + \n" + 
        "			\"		contextXML = Sizzle.isXML( context ),\\n\" + \n" + 
        "			\"		parts = [],\\n\" + \n" + 
        "			\"		soFar = selector;\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	// Reset the position of the chunker regexp (start from head)\\n\" + \n" + 
        "			\"	do {\\n\" + \n" + 
        "			\"		chunker.exec( \\\"\\\" );\\n\" + \n" + 
        "			\"		m = chunker.exec( soFar );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( m ) {\\n\" + \n" + 
        "			\"			soFar = m[3];\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"			parts.push( m[1] );\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"			if ( m[2] ) {\\n\" + \n" + 
        "			\"				extra = m[3];\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	} while ( m );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( parts.length > 1 && origPOS.exec( selector ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {\\n\" + \n" + 
        "			\"			set = posProcess( parts[0] + parts[1], context );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			set = Expr.relative[ parts[0] ] ?\\n\" + \n" + 
        "			\"				[ context ] :\\n\" + \n" + 
        "			\"				Sizzle( parts.shift(), context );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			while ( parts.length ) {\\n\" + \n" + 
        "			\"				selector = parts.shift();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( Expr.relative[ selector ] ) {\\n\" + \n" + 
        "			\"					selector += parts.shift();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				\\n\" + \n" + 
        "			\"				set = posProcess( selector, set );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		// Take a shortcut and set the context if the root selector is an ID\\n\" + \n" + 
        "			\"		// (but not if it'll be faster if the inner selector is an ID)\\n\" + \n" + 
        "			\"		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&\\n\" + \n" + 
        "			\"				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			ret = Sizzle.find( parts.shift(), context, contextXML );\\n\" + \n" + 
        "			\"			context = ret.expr ?\\n\" + \n" + 
        "			\"				Sizzle.filter( ret.expr, ret.set )[0] :\\n\" + \n" + 
        "			\"				ret.set[0];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( context ) {\\n\" + \n" + 
        "			\"			ret = seed ?\\n\" + \n" + 
        "			\"				{ expr: parts.pop(), set: makeArray(seed) } :\\n\" + \n" + 
        "			\"				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === \\\"~\\\" || parts[0] === \\\"+\\\") && context.parentNode ? context.parentNode : context, contextXML );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			set = ret.expr ?\\n\" + \n" + 
        "			\"				Sizzle.filter( ret.expr, ret.set ) :\\n\" + \n" + 
        "			\"				ret.set;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( parts.length > 0 ) {\\n\" + \n" + 
        "			\"				checkSet = makeArray( set );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				prune = false;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			while ( parts.length ) {\\n\" + \n" + 
        "			\"				cur = parts.pop();\\n\" + \n" + 
        "			\"				pop = cur;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( !Expr.relative[ cur ] ) {\\n\" + \n" + 
        "			\"					cur = \\\"\\\";\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					pop = parts.pop();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( pop == null ) {\\n\" + \n" + 
        "			\"					pop = context;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				Expr.relative[ cur ]( checkSet, pop, contextXML );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			checkSet = parts = [];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !checkSet ) {\\n\" + \n" + 
        "			\"		checkSet = set;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !checkSet ) {\\n\" + \n" + 
        "			\"		Sizzle.error( cur || selector );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( toString.call(checkSet) === \\\"[object Array]\\\" ) {\\n\" + \n" + 
        "			\"		if ( !prune ) {\\n\" + \n" + 
        "			\"			results.push.apply( results, checkSet );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( context && context.nodeType === 1 ) {\\n\" + \n" + 
        "			\"			for ( i = 0; checkSet[i] != null; i++ ) {\\n\" + \n" + 
        "			\"				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {\\n\" + \n" + 
        "			\"					results.push( set[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( i = 0; checkSet[i] != null; i++ ) {\\n\" + \n" + 
        "			\"				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {\\n\" + \n" + 
        "			\"					results.push( set[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		makeArray( checkSet, results );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( extra ) {\\n\" + \n" + 
        "			\"		Sizzle( extra, origContext, results, seed );\\n\" + \n" + 
        "			\"		Sizzle.uniqueSort( results );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return results;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.uniqueSort = function( results ) {\\n\" + \n" + 
        "			\"	if ( sortOrder ) {\\n\" + \n" + 
        "			\"		hasDuplicate = baseHasDuplicate;\\n\" + \n" + 
        "			\"		results.sort( sortOrder );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( hasDuplicate ) {\\n\" + \n" + 
        "			\"			for ( var i = 1; i < results.length; i++ ) {\\n\" + \n" + 
        "			\"				if ( results[i] === results[ i - 1 ] ) {\\n\" + \n" + 
        "			\"					results.splice( i--, 1 );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return results;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.matches = function( expr, set ) {\\n\" + \n" + 
        "			\"	return Sizzle( expr, null, null, set );\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.matchesSelector = function( node, expr ) {\\n\" + \n" + 
        "			\"	return Sizzle( expr, null, null, [node] ).length > 0;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.find = function( expr, context, isXML ) {\\n\" + \n" + 
        "			\"	var set;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !expr ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		var match,\\n\" + \n" + 
        "			\"			type = Expr.order[i];\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {\\n\" + \n" + 
        "			\"			var left = match[1];\\n\" + \n" + 
        "			\"			match.splice( 1, 1 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( left.substr( left.length - 1 ) !== \\\"\\\\\\\\\\\" ) {\\n\" + \n" + 
        "			\"				match[1] = (match[1] || \\\"\\\").replace( rBackslash, \\\"\\\" );\\n\" + \n" + 
        "			\"				set = Expr.find[ type ]( match, context, isXML );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( set != null ) {\\n\" + \n" + 
        "			\"					expr = expr.replace( Expr.match[ type ], \\\"\\\" );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !set ) {\\n\" + \n" + 
        "			\"		set = typeof context.getElementsByTagName !== \\\"undefined\\\" ?\\n\" + \n" + 
        "			\"			context.getElementsByTagName( \\\"*\\\" ) :\\n\" + \n" + 
        "			\"			[];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return { set: set, expr: expr };\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.filter = function( expr, set, inplace, not ) {\\n\" + \n" + 
        "			\"	var match, anyFound,\\n\" + \n" + 
        "			\"		old = expr,\\n\" + \n" + 
        "			\"		result = [],\\n\" + \n" + 
        "			\"		curLoop = set,\\n\" + \n" + 
        "			\"		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	while ( expr && set.length ) {\\n\" + \n" + 
        "			\"		for ( var type in Expr.filter ) {\\n\" + \n" + 
        "			\"			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {\\n\" + \n" + 
        "			\"				var found, item,\\n\" + \n" + 
        "			\"					filter = Expr.filter[ type ],\\n\" + \n" + 
        "			\"					left = match[1];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				anyFound = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				match.splice(1,1);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( left.substr( left.length - 1 ) === \\\"\\\\\\\\\\\" ) {\\n\" + \n" + 
        "			\"					continue;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( curLoop === result ) {\\n\" + \n" + 
        "			\"					result = [];\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( Expr.preFilter[ type ] ) {\\n\" + \n" + 
        "			\"					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( !match ) {\\n\" + \n" + 
        "			\"						anyFound = found = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else if ( match === true ) {\\n\" + \n" + 
        "			\"						continue;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( match ) {\\n\" + \n" + 
        "			\"					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"						if ( item ) {\\n\" + \n" + 
        "			\"							found = filter( item, match, i, curLoop );\\n\" + \n" + 
        "			\"							var pass = not ^ !!found;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							if ( inplace && found != null ) {\\n\" + \n" + 
        "			\"								if ( pass ) {\\n\" + \n" + 
        "			\"									anyFound = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"								} else {\\n\" + \n" + 
        "			\"									curLoop[i] = false;\\n\" + \n" + 
        "			\"								}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							} else if ( pass ) {\\n\" + \n" + 
        "			\"								result.push( item );\\n\" + \n" + 
        "			\"								anyFound = true;\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( found !== undefined ) {\\n\" + \n" + 
        "			\"					if ( !inplace ) {\\n\" + \n" + 
        "			\"						curLoop = result;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					expr = expr.replace( Expr.match[ type ], \\\"\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( !anyFound ) {\\n\" + \n" + 
        "			\"						return [];\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Improper expression\\n\" + \n" + 
        "			\"		if ( expr === old ) {\\n\" + \n" + 
        "			\"			if ( anyFound == null ) {\\n\" + \n" + 
        "			\"				Sizzle.error( expr );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		old = expr;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return curLoop;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.error = function( msg ) {\\n\" + \n" + 
        "			\"	throw \\\"Syntax error, unrecognized expression: \\\" + msg;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var Expr = Sizzle.selectors = {\\n\" + \n" + 
        "			\"	order: [ \\\"ID\\\", \\\"NAME\\\", \\\"TAG\\\" ],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	match: {\\n\" + \n" + 
        "			\"		ID: /#((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)+)/,\\n\" + \n" + 
        "			\"		CLASS: /\\\\.((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)+)/,\\n\" + \n" + 
        "			\"		NAME: /\\\\[name=['\\\"]*((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)+)['\\\"]*\\\\]/,\\n\" + \n" + 
        "			\"		ATTR: /\\\\[\\\\s*((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)+)\\\\s*(?:(\\\\S?=)\\\\s*(?:(['\\\"])(.*?)\\\\3|(#?(?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)*)|)|)\\\\s*\\\\]/,\\n\" + \n" + 
        "			\"		TAG: /^((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\*\\\\-]|\\\\\\\\.)+)/,\\n\" + \n" + 
        "			\"		CHILD: /:(only|nth|last|first)-child(?:\\\\(\\\\s*(even|odd|(?:[+\\\\-]?\\\\d+|(?:[+\\\\-]?\\\\d*)?n\\\\s*(?:[+\\\\-]\\\\s*\\\\d+)?))\\\\s*\\\\))?/,\\n\" + \n" + 
        "			\"		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\\\\((\\\\d*)\\\\))?(?=[^\\\\-]|$)/,\\n\" + \n" + 
        "			\"		PSEUDO: /:((?:[\\\\w\\\\u00c0-\\\\uFFFF\\\\-]|\\\\\\\\.)+)(?:\\\\((['\\\"]?)((?:\\\\([^\\\\)]+\\\\)|[^\\\\(\\\\)]*)+)\\\\2\\\\))?/\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	leftMatch: {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	attrMap: {\\n\" + \n" + 
        "			\"		\\\"class\\\": \\\"className\\\",\\n\" + \n" + 
        "			\"		\\\"for\\\": \\\"htmlFor\\\"\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	attrHandle: {\\n\" + \n" + 
        "			\"		href: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.getAttribute( \\\"href\\\" );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		type: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.getAttribute( \\\"type\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	relative: {\\n\" + \n" + 
        "			\"		\\\"+\\\": function(checkSet, part){\\n\" + \n" + 
        "			\"			var isPartStr = typeof part === \\\"string\\\",\\n\" + \n" + 
        "			\"				isTag = isPartStr && !rNonWord.test( part ),\\n\" + \n" + 
        "			\"				isPartStrNotTag = isPartStr && !isTag;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( isTag ) {\\n\" + \n" + 
        "			\"				part = part.toLowerCase();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {\\n\" + \n" + 
        "			\"				if ( (elem = checkSet[i]) ) {\\n\" + \n" + 
        "			\"					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?\\n\" + \n" + 
        "			\"						elem || false :\\n\" + \n" + 
        "			\"						elem === part;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( isPartStrNotTag ) {\\n\" + \n" + 
        "			\"				Sizzle.filter( part, checkSet, true );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		\\\">\\\": function( checkSet, part ) {\\n\" + \n" + 
        "			\"			var elem,\\n\" + \n" + 
        "			\"				isPartStr = typeof part === \\\"string\\\",\\n\" + \n" + 
        "			\"				i = 0,\\n\" + \n" + 
        "			\"				l = checkSet.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( isPartStr && !rNonWord.test( part ) ) {\\n\" + \n" + 
        "			\"				part = part.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( ; i < l; i++ ) {\\n\" + \n" + 
        "			\"					elem = checkSet[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( elem ) {\\n\" + \n" + 
        "			\"						var parent = elem.parentNode;\\n\" + \n" + 
        "			\"						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				for ( ; i < l; i++ ) {\\n\" + \n" + 
        "			\"					elem = checkSet[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( elem ) {\\n\" + \n" + 
        "			\"						checkSet[i] = isPartStr ?\\n\" + \n" + 
        "			\"							elem.parentNode :\\n\" + \n" + 
        "			\"							elem.parentNode === part;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( isPartStr ) {\\n\" + \n" + 
        "			\"					Sizzle.filter( part, checkSet, true );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		\\\"\\\": function(checkSet, part, isXML){\\n\" + \n" + 
        "			\"			var nodeCheck,\\n\" + \n" + 
        "			\"				doneName = done++,\\n\" + \n" + 
        "			\"				checkFn = dirCheck;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( typeof part === \\\"string\\\" && !rNonWord.test( part ) ) {\\n\" + \n" + 
        "			\"				part = part.toLowerCase();\\n\" + \n" + 
        "			\"				nodeCheck = part;\\n\" + \n" + 
        "			\"				checkFn = dirNodeCheck;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			checkFn( \\\"parentNode\\\", part, doneName, checkSet, nodeCheck, isXML );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		\\\"~\\\": function( checkSet, part, isXML ) {\\n\" + \n" + 
        "			\"			var nodeCheck,\\n\" + \n" + 
        "			\"				doneName = done++,\\n\" + \n" + 
        "			\"				checkFn = dirCheck;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( typeof part === \\\"string\\\" && !rNonWord.test( part ) ) {\\n\" + \n" + 
        "			\"				part = part.toLowerCase();\\n\" + \n" + 
        "			\"				nodeCheck = part;\\n\" + \n" + 
        "			\"				checkFn = dirNodeCheck;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			checkFn( \\\"previousSibling\\\", part, doneName, checkSet, nodeCheck, isXML );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	find: {\\n\" + \n" + 
        "			\"		ID: function( match, context, isXML ) {\\n\" + \n" + 
        "			\"			if ( typeof context.getElementById !== \\\"undefined\\\" && !isXML ) {\\n\" + \n" + 
        "			\"				var m = context.getElementById(match[1]);\\n\" + \n" + 
        "			\"				// Check parentNode to catch when Blackberry 4.6 returns\\n\" + \n" + 
        "			\"				// nodes that are no longer in the document #6963\\n\" + \n" + 
        "			\"				return m && m.parentNode ? [m] : [];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		NAME: function( match, context ) {\\n\" + \n" + 
        "			\"			if ( typeof context.getElementsByName !== \\\"undefined\\\" ) {\\n\" + \n" + 
        "			\"				var ret = [],\\n\" + \n" + 
        "			\"					results = context.getElementsByName( match[1] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var i = 0, l = results.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					if ( results[i].getAttribute(\\\"name\\\") === match[1] ) {\\n\" + \n" + 
        "			\"						ret.push( results[i] );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return ret.length === 0 ? null : ret;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		TAG: function( match, context ) {\\n\" + \n" + 
        "			\"			if ( typeof context.getElementsByTagName !== \\\"undefined\\\" ) {\\n\" + \n" + 
        "			\"				return context.getElementsByTagName( match[1] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	preFilter: {\\n\" + \n" + 
        "			\"		CLASS: function( match, curLoop, inplace, result, not, isXML ) {\\n\" + \n" + 
        "			\"			match = \\\" \\\" + match[1].replace( rBackslash, \\\"\\\" ) + \\\" \\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( isXML ) {\\n\" + \n" + 
        "			\"				return match;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"				if ( elem ) {\\n\" + \n" + 
        "			\"					if ( not ^ (elem.className && (\\\" \\\" + elem.className + \\\" \\\").replace(/[\\\\t\\\\n\\\\r]/g, \\\" \\\").indexOf(match) >= 0) ) {\\n\" + \n" + 
        "			\"						if ( !inplace ) {\\n\" + \n" + 
        "			\"							result.push( elem );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else if ( inplace ) {\\n\" + \n" + 
        "			\"						curLoop[i] = false;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ID: function( match ) {\\n\" + \n" + 
        "			\"			return match[1].replace( rBackslash, \\\"\\\" );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		TAG: function( match, curLoop ) {\\n\" + \n" + 
        "			\"			return match[1].replace( rBackslash, \\\"\\\" ).toLowerCase();\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		CHILD: function( match ) {\\n\" + \n" + 
        "			\"			if ( match[1] === \\\"nth\\\" ) {\\n\" + \n" + 
        "			\"				if ( !match[2] ) {\\n\" + \n" + 
        "			\"					Sizzle.error( match[0] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				match[2] = match[2].replace(/^\\\\+|\\\\s*/g, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'\\n\" + \n" + 
        "			\"				var test = /(-?)(\\\\d*)(?:n([+\\\\-]?\\\\d*))?/.exec(\\n\" + \n" + 
        "			\"					match[2] === \\\"even\\\" && \\\"2n\\\" || match[2] === \\\"odd\\\" && \\\"2n+1\\\" ||\\n\" + \n" + 
        "			\"					!/\\\\D/.test( match[2] ) && \\\"0n+\\\" + match[2] || match[2]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// calculate the numbers (first)n+(last) including if they are negative\\n\" + \n" + 
        "			\"				match[2] = (test[1] + (test[2] || 1)) - 0;\\n\" + \n" + 
        "			\"				match[3] = test[3] - 0;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else if ( match[2] ) {\\n\" + \n" + 
        "			\"				Sizzle.error( match[0] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// TODO: Move to normal caching system\\n\" + \n" + 
        "			\"			match[0] = done++;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return match;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ATTR: function( match, curLoop, inplace, result, not, isXML ) {\\n\" + \n" + 
        "			\"			var name = match[1] = match[1].replace( rBackslash, \\\"\\\" );\\n\" + \n" + 
        "			\"			\\n\" + \n" + 
        "			\"			if ( !isXML && Expr.attrMap[name] ) {\\n\" + \n" + 
        "			\"				match[1] = Expr.attrMap[name];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Handle if an un-quoted value was used\\n\" + \n" + 
        "			\"			match[4] = ( match[4] || match[5] || \\\"\\\" ).replace( rBackslash, \\\"\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( match[2] === \\\"~=\\\" ) {\\n\" + \n" + 
        "			\"				match[4] = \\\" \\\" + match[4] + \\\" \\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return match;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		PSEUDO: function( match, curLoop, inplace, result, not ) {\\n\" + \n" + 
        "			\"			if ( match[1] === \\\"not\\\" ) {\\n\" + \n" + 
        "			\"				// If we're dealing with a complex expression, or a simple one\\n\" + \n" + 
        "			\"				if ( ( chunker.exec(match[3]) || \\\"\\\" ).length > 1 || /^\\\\w/.test(match[3]) ) {\\n\" + \n" + 
        "			\"					match[3] = Sizzle(match[3], null, null, curLoop);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( !inplace ) {\\n\" + \n" + 
        "			\"						result.push.apply( result, ret );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					return false;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {\\n\" + \n" + 
        "			\"				return true;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			\\n\" + \n" + 
        "			\"			return match;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		POS: function( match ) {\\n\" + \n" + 
        "			\"			match.unshift( true );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return match;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	filters: {\\n\" + \n" + 
        "			\"		enabled: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.disabled === false && elem.type !== \\\"hidden\\\";\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		disabled: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.disabled === true;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		checked: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.checked === true;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		selected: function( elem ) {\\n\" + \n" + 
        "			\"			// Accessing this property makes selected-by-default\\n\" + \n" + 
        "			\"			// options in Safari work properly\\n\" + \n" + 
        "			\"			if ( elem.parentNode ) {\\n\" + \n" + 
        "			\"				elem.parentNode.selectedIndex;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			\\n\" + \n" + 
        "			\"			return elem.selected === true;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		parent: function( elem ) {\\n\" + \n" + 
        "			\"			return !!elem.firstChild;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		empty: function( elem ) {\\n\" + \n" + 
        "			\"			return !elem.firstChild;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		has: function( elem, i, match ) {\\n\" + \n" + 
        "			\"			return !!Sizzle( match[3], elem ).length;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		header: function( elem ) {\\n\" + \n" + 
        "			\"			return (/h\\\\d/i).test( elem.nodeName );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		text: function( elem ) {\\n\" + \n" + 
        "			\"			var attr = elem.getAttribute( \\\"type\\\" ), type = elem.type;\\n\" + \n" + 
        "			\"			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) \\n\" + \n" + 
        "			\"			// use getAttribute instead to test this case\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"text\\\" === type && ( attr === type || attr === null );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		radio: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"radio\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		checkbox: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"checkbox\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		file: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"file\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		password: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"password\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		submit: function( elem ) {\\n\" + \n" + 
        "			\"			var name = elem.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"			return (name === \\\"input\\\" || name === \\\"button\\\") && \\\"submit\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		image: function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeName.toLowerCase() === \\\"input\\\" && \\\"image\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		reset: function( elem ) {\\n\" + \n" + 
        "			\"			var name = elem.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"			return (name === \\\"input\\\" || name === \\\"button\\\") && \\\"reset\\\" === elem.type;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		button: function( elem ) {\\n\" + \n" + 
        "			\"			var name = elem.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"			return name === \\\"input\\\" && \\\"button\\\" === elem.type || name === \\\"button\\\";\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		input: function( elem ) {\\n\" + \n" + 
        "			\"			return (/input|select|textarea|button/i).test( elem.nodeName );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		focus: function( elem ) {\\n\" + \n" + 
        "			\"			return elem === elem.ownerDocument.activeElement;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	setFilters: {\\n\" + \n" + 
        "			\"		first: function( elem, i ) {\\n\" + \n" + 
        "			\"			return i === 0;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		last: function( elem, i, match, array ) {\\n\" + \n" + 
        "			\"			return i === array.length - 1;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		even: function( elem, i ) {\\n\" + \n" + 
        "			\"			return i % 2 === 0;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		odd: function( elem, i ) {\\n\" + \n" + 
        "			\"			return i % 2 === 1;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		lt: function( elem, i, match ) {\\n\" + \n" + 
        "			\"			return i < match[3] - 0;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		gt: function( elem, i, match ) {\\n\" + \n" + 
        "			\"			return i > match[3] - 0;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		nth: function( elem, i, match ) {\\n\" + \n" + 
        "			\"			return match[3] - 0 === i;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		eq: function( elem, i, match ) {\\n\" + \n" + 
        "			\"			return match[3] - 0 === i;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	filter: {\\n\" + \n" + 
        "			\"		PSEUDO: function( elem, match, i, array ) {\\n\" + \n" + 
        "			\"			var name = match[1],\\n\" + \n" + 
        "			\"				filter = Expr.filters[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( filter ) {\\n\" + \n" + 
        "			\"				return filter( elem, i, match, array );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else if ( name === \\\"contains\\\" ) {\\n\" + \n" + 
        "			\"				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || \\\"\\\").indexOf(match[3]) >= 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else if ( name === \\\"not\\\" ) {\\n\" + \n" + 
        "			\"				var not = match[3];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var j = 0, l = not.length; j < l; j++ ) {\\n\" + \n" + 
        "			\"					if ( not[j] === elem ) {\\n\" + \n" + 
        "			\"						return false;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				Sizzle.error( name );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		CHILD: function( elem, match ) {\\n\" + \n" + 
        "			\"			var type = match[1],\\n\" + \n" + 
        "			\"				node = elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			switch ( type ) {\\n\" + \n" + 
        "			\"				case \\\"only\\\":\\n\" + \n" + 
        "			\"				case \\\"first\\\":\\n\" + \n" + 
        "			\"					while ( (node = node.previousSibling) )	 {\\n\" + \n" + 
        "			\"						if ( node.nodeType === 1 ) { \\n\" + \n" + 
        "			\"							return false; \\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( type === \\\"first\\\" ) { \\n\" + \n" + 
        "			\"						return true; \\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					node = elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case \\\"last\\\":\\n\" + \n" + 
        "			\"					while ( (node = node.nextSibling) )	 {\\n\" + \n" + 
        "			\"						if ( node.nodeType === 1 ) { \\n\" + \n" + 
        "			\"							return false; \\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					return true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case \\\"nth\\\":\\n\" + \n" + 
        "			\"					var first = match[2],\\n\" + \n" + 
        "			\"						last = match[3];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( first === 1 && last === 0 ) {\\n\" + \n" + 
        "			\"						return true;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					\\n\" + \n" + 
        "			\"					var doneName = match[0],\\n\" + \n" + 
        "			\"						parent = elem.parentNode;\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {\\n\" + \n" + 
        "			\"						var count = 0;\\n\" + \n" + 
        "			\"						\\n\" + \n" + 
        "			\"						for ( node = parent.firstChild; node; node = node.nextSibling ) {\\n\" + \n" + 
        "			\"							if ( node.nodeType === 1 ) {\\n\" + \n" + 
        "			\"								node.nodeIndex = ++count;\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						} \\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						parent.sizcache = doneName;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					\\n\" + \n" + 
        "			\"					var diff = elem.nodeIndex - last;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( first === 0 ) {\\n\" + \n" + 
        "			\"						return diff === 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						return ( diff % first === 0 && diff / first >= 0 );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ID: function( elem, match ) {\\n\" + \n" + 
        "			\"			return elem.nodeType === 1 && elem.getAttribute(\\\"id\\\") === match;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		TAG: function( elem, match ) {\\n\" + \n" + 
        "			\"			return (match === \\\"*\\\" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		CLASS: function( elem, match ) {\\n\" + \n" + 
        "			\"			return (\\\" \\\" + (elem.className || elem.getAttribute(\\\"class\\\")) + \\\" \\\")\\n\" + \n" + 
        "			\"				.indexOf( match ) > -1;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ATTR: function( elem, match ) {\\n\" + \n" + 
        "			\"			var name = match[1],\\n\" + \n" + 
        "			\"				result = Expr.attrHandle[ name ] ?\\n\" + \n" + 
        "			\"					Expr.attrHandle[ name ]( elem ) :\\n\" + \n" + 
        "			\"					elem[ name ] != null ?\\n\" + \n" + 
        "			\"						elem[ name ] :\\n\" + \n" + 
        "			\"						elem.getAttribute( name ),\\n\" + \n" + 
        "			\"				value = result + \\\"\\\",\\n\" + \n" + 
        "			\"				type = match[2],\\n\" + \n" + 
        "			\"				check = match[4];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return result == null ?\\n\" + \n" + 
        "			\"				type === \\\"!=\\\" :\\n\" + \n" + 
        "			\"				type === \\\"=\\\" ?\\n\" + \n" + 
        "			\"				value === check :\\n\" + \n" + 
        "			\"				type === \\\"*=\\\" ?\\n\" + \n" + 
        "			\"				value.indexOf(check) >= 0 :\\n\" + \n" + 
        "			\"				type === \\\"~=\\\" ?\\n\" + \n" + 
        "			\"				(\\\" \\\" + value + \\\" \\\").indexOf(check) >= 0 :\\n\" + \n" + 
        "			\"				!check ?\\n\" + \n" + 
        "			\"				value && result !== false :\\n\" + \n" + 
        "			\"				type === \\\"!=\\\" ?\\n\" + \n" + 
        "			\"				value !== check :\\n\" + \n" + 
        "			\"				type === \\\"^=\\\" ?\\n\" + \n" + 
        "			\"				value.indexOf(check) === 0 :\\n\" + \n" + 
        "			\"				type === \\\"$=\\\" ?\\n\" + \n" + 
        "			\"				value.substr(value.length - check.length) === check :\\n\" + \n" + 
        "			\"				type === \\\"|=\\\" ?\\n\" + \n" + 
        "			\"				value === check || value.substr(0, check.length + 1) === check + \\\"-\\\" :\\n\" + \n" + 
        "			\"				false;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		POS: function( elem, match, i, array ) {\\n\" + \n" + 
        "			\"			var name = match[2],\\n\" + \n" + 
        "			\"				filter = Expr.setFilters[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( filter ) {\\n\" + \n" + 
        "			\"				return filter( elem, i, match, array );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var origPOS = Expr.match.POS,\\n\" + \n" + 
        "			\"	fescape = function(all, num){\\n\" + \n" + 
        "			\"		return \\\"\\\\\\\\\\\" + (num - 0 + 1);\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"for ( var type in Expr.match ) {\\n\" + \n" + 
        "			\"	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\\\\[]*\\\\])(?![^\\\\(]*\\\\))/.source) );\\n\" + \n" + 
        "			\"	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\\\\r|\\\\n)*?)/.source + Expr.match[ type ].source.replace(/\\\\\\\\(\\\\d+)/g, fescape) );\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var makeArray = function( array, results ) {\\n\" + \n" + 
        "			\"	array = Array.prototype.slice.call( array, 0 );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( results ) {\\n\" + \n" + 
        "			\"		results.push.apply( results, array );\\n\" + \n" + 
        "			\"		return results;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	return array;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Perform a simple check to determine if the browser is capable of\\n\" + \n" + 
        "			\"// converting a NodeList to an array using builtin methods.\\n\" + \n" + 
        "			\"// Also verifies that the returned array holds DOM nodes\\n\" + \n" + 
        "			\"// (which is not the case in the Blackberry browser)\\n\" + \n" + 
        "			\"try {\\n\" + \n" + 
        "			\"	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Provide a fallback method if it does not work\\n\" + \n" + 
        "			\"} catch( e ) {\\n\" + \n" + 
        "			\"	makeArray = function( array, results ) {\\n\" + \n" + 
        "			\"		var i = 0,\\n\" + \n" + 
        "			\"			ret = results || [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( toString.call(array) === \\\"[object Array]\\\" ) {\\n\" + \n" + 
        "			\"			Array.prototype.push.apply( ret, array );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			if ( typeof array.length === \\\"number\\\" ) {\\n\" + \n" + 
        "			\"				for ( var l = array.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					ret.push( array[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				for ( ; array[i]; i++ ) {\\n\" + \n" + 
        "			\"					ret.push( array[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var sortOrder, siblingCheck;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( document.documentElement.compareDocumentPosition ) {\\n\" + \n" + 
        "			\"	sortOrder = function( a, b ) {\\n\" + \n" + 
        "			\"		if ( a === b ) {\\n\" + \n" + 
        "			\"			hasDuplicate = true;\\n\" + \n" + 
        "			\"			return 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {\\n\" + \n" + 
        "			\"			return a.compareDocumentPosition ? -1 : 1;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return a.compareDocumentPosition(b) & 4 ? -1 : 1;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"} else {\\n\" + \n" + 
        "			\"	sortOrder = function( a, b ) {\\n\" + \n" + 
        "			\"		// The nodes are identical, we can exit early\\n\" + \n" + 
        "			\"		if ( a === b ) {\\n\" + \n" + 
        "			\"			hasDuplicate = true;\\n\" + \n" + 
        "			\"			return 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Fallback to using sourceIndex (in IE) if it's available on both nodes\\n\" + \n" + 
        "			\"		} else if ( a.sourceIndex && b.sourceIndex ) {\\n\" + \n" + 
        "			\"			return a.sourceIndex - b.sourceIndex;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var al, bl,\\n\" + \n" + 
        "			\"			ap = [],\\n\" + \n" + 
        "			\"			bp = [],\\n\" + \n" + 
        "			\"			aup = a.parentNode,\\n\" + \n" + 
        "			\"			bup = b.parentNode,\\n\" + \n" + 
        "			\"			cur = aup;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If the nodes are siblings (or identical) we can do a quick check\\n\" + \n" + 
        "			\"		if ( aup === bup ) {\\n\" + \n" + 
        "			\"			return siblingCheck( a, b );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If no parents were found then the nodes are disconnected\\n\" + \n" + 
        "			\"		} else if ( !aup ) {\\n\" + \n" + 
        "			\"			return -1;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( !bup ) {\\n\" + \n" + 
        "			\"			return 1;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Otherwise they're somewhere else in the tree so we need\\n\" + \n" + 
        "			\"		// to build up a full list of the parentNodes for comparison\\n\" + \n" + 
        "			\"		while ( cur ) {\\n\" + \n" + 
        "			\"			ap.unshift( cur );\\n\" + \n" + 
        "			\"			cur = cur.parentNode;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		cur = bup;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( cur ) {\\n\" + \n" + 
        "			\"			bp.unshift( cur );\\n\" + \n" + 
        "			\"			cur = cur.parentNode;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		al = ap.length;\\n\" + \n" + 
        "			\"		bl = bp.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Start walking down the tree looking for a discrepancy\\n\" + \n" + 
        "			\"		for ( var i = 0; i < al && i < bl; i++ ) {\\n\" + \n" + 
        "			\"			if ( ap[i] !== bp[i] ) {\\n\" + \n" + 
        "			\"				return siblingCheck( ap[i], bp[i] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// We ended someplace up the tree so do a sibling check\\n\" + \n" + 
        "			\"		return i === al ?\\n\" + \n" + 
        "			\"			siblingCheck( a, bp[i], -1 ) :\\n\" + \n" + 
        "			\"			siblingCheck( ap[i], b, 1 );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	siblingCheck = function( a, b, ret ) {\\n\" + \n" + 
        "			\"		if ( a === b ) {\\n\" + \n" + 
        "			\"			return ret;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var cur = a.nextSibling;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( cur ) {\\n\" + \n" + 
        "			\"			if ( cur === b ) {\\n\" + \n" + 
        "			\"				return -1;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			cur = cur.nextSibling;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return 1;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Utility function for retreiving the text value of an array of DOM nodes\\n\" + \n" + 
        "			\"Sizzle.getText = function( elems ) {\\n\" + \n" + 
        "			\"	var ret = \\\"\\\", elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i = 0; elems[i]; i++ ) {\\n\" + \n" + 
        "			\"		elem = elems[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get the text from text nodes and CDATA nodes\\n\" + \n" + 
        "			\"		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {\\n\" + \n" + 
        "			\"			ret += elem.nodeValue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Traverse everything else, except comment nodes\\n\" + \n" + 
        "			\"		} else if ( elem.nodeType !== 8 ) {\\n\" + \n" + 
        "			\"			ret += Sizzle.getText( elem.childNodes );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return ret;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Check to see if the browser returns elements by name when\\n\" + \n" + 
        "			\"// querying by getElementById (and provide a workaround)\\n\" + \n" + 
        "			\"(function(){\\n\" + \n" + 
        "			\"	// We're going to inject a fake input element with a specified name\\n\" + \n" + 
        "			\"	var form = document.createElement(\\\"div\\\"),\\n\" + \n" + 
        "			\"		id = \\\"script\\\" + (new Date()).getTime(),\\n\" + \n" + 
        "			\"		root = document.documentElement;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	form.innerHTML = \\\"<a name='\\\" + id + \\\"'/>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Inject it into the root element, check its status, and remove it quickly\\n\" + \n" + 
        "			\"	root.insertBefore( form, root.firstChild );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// The workaround has to do additional checks after a getElementById\\n\" + \n" + 
        "			\"	// Which slows things down for other browsers (hence the branching)\\n\" + \n" + 
        "			\"	if ( document.getElementById( id ) ) {\\n\" + \n" + 
        "			\"		Expr.find.ID = function( match, context, isXML ) {\\n\" + \n" + 
        "			\"			if ( typeof context.getElementById !== \\\"undefined\\\" && !isXML ) {\\n\" + \n" + 
        "			\"				var m = context.getElementById(match[1]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return m ?\\n\" + \n" + 
        "			\"					m.id === match[1] || typeof m.getAttributeNode !== \\\"undefined\\\" && m.getAttributeNode(\\\"id\\\").nodeValue === match[1] ?\\n\" + \n" + 
        "			\"						[m] :\\n\" + \n" + 
        "			\"						undefined :\\n\" + \n" + 
        "			\"					[];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		Expr.filter.ID = function( elem, match ) {\\n\" + \n" + 
        "			\"			var node = typeof elem.getAttributeNode !== \\\"undefined\\\" && elem.getAttributeNode(\\\"id\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return elem.nodeType === 1 && node && node.nodeValue === match;\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	root.removeChild( form );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// release memory in IE\\n\" + \n" + 
        "			\"	root = form = null;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(){\\n\" + \n" + 
        "			\"	// Check to see if the browser returns only elements\\n\" + \n" + 
        "			\"	// when doing getElementsByTagName(\\\"*\\\")\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Create a fake element\\n\" + \n" + 
        "			\"	var div = document.createElement(\\\"div\\\");\\n\" + \n" + 
        "			\"	div.appendChild( document.createComment(\\\"\\\") );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Make sure no comments are found\\n\" + \n" + 
        "			\"	if ( div.getElementsByTagName(\\\"*\\\").length > 0 ) {\\n\" + \n" + 
        "			\"		Expr.find.TAG = function( match, context ) {\\n\" + \n" + 
        "			\"			var results = context.getElementsByTagName( match[1] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Filter out possible comments\\n\" + \n" + 
        "			\"			if ( match[1] === \\\"*\\\" ) {\\n\" + \n" + 
        "			\"				var tmp = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var i = 0; results[i]; i++ ) {\\n\" + \n" + 
        "			\"					if ( results[i].nodeType === 1 ) {\\n\" + \n" + 
        "			\"						tmp.push( results[i] );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				results = tmp;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return results;\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check to see if an attribute returns normalized href attributes\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"<a href='#'></a>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( div.firstChild && typeof div.firstChild.getAttribute !== \\\"undefined\\\" &&\\n\" + \n" + 
        "			\"			div.firstChild.getAttribute(\\\"href\\\") !== \\\"#\\\" ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		Expr.attrHandle.href = function( elem ) {\\n\" + \n" + 
        "			\"			return elem.getAttribute( \\\"href\\\", 2 );\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// release memory in IE\\n\" + \n" + 
        "			\"	div = null;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( document.querySelectorAll ) {\\n\" + \n" + 
        "			\"	(function(){\\n\" + \n" + 
        "			\"		var oldSizzle = Sizzle,\\n\" + \n" + 
        "			\"			div = document.createElement(\\\"div\\\"),\\n\" + \n" + 
        "			\"			id = \\\"__sizzle__\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		div.innerHTML = \\\"<p class='TEST'></p>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Safari can't handle uppercase or unicode characters when\\n\" + \n" + 
        "			\"		// in quirks mode.\\n\" + \n" + 
        "			\"		if ( div.querySelectorAll && div.querySelectorAll(\\\".TEST\\\").length === 0 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"		Sizzle = function( query, context, extra, seed ) {\\n\" + \n" + 
        "			\"			context = context || document;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Only use querySelectorAll on non-XML documents\\n\" + \n" + 
        "			\"			// (ID selectors don't work in non-HTML documents)\\n\" + \n" + 
        "			\"			if ( !seed && !Sizzle.isXML(context) ) {\\n\" + \n" + 
        "			\"				// See if we find a selector to speed up\\n\" + \n" + 
        "			\"				var match = /^(\\\\w+$)|^\\\\.([\\\\w\\\\-]+$)|^#([\\\\w\\\\-]+$)/.exec( query );\\n\" + \n" + 
        "			\"				\\n\" + \n" + 
        "			\"				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {\\n\" + \n" + 
        "			\"					// Speed-up: Sizzle(\\\"TAG\\\")\\n\" + \n" + 
        "			\"					if ( match[1] ) {\\n\" + \n" + 
        "			\"						return makeArray( context.getElementsByTagName( query ), extra );\\n\" + \n" + 
        "			\"					\\n\" + \n" + 
        "			\"					// Speed-up: Sizzle(\\\".CLASS\\\")\\n\" + \n" + 
        "			\"					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {\\n\" + \n" + 
        "			\"						return makeArray( context.getElementsByClassName( match[2] ), extra );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				\\n\" + \n" + 
        "			\"				if ( context.nodeType === 9 ) {\\n\" + \n" + 
        "			\"					// Speed-up: Sizzle(\\\"body\\\")\\n\" + \n" + 
        "			\"					// The body element only exists once, optimize finding it\\n\" + \n" + 
        "			\"					if ( query === \\\"body\\\" && context.body ) {\\n\" + \n" + 
        "			\"						return makeArray( [ context.body ], extra );\\n\" + \n" + 
        "			\"						\\n\" + \n" + 
        "			\"					// Speed-up: Sizzle(\\\"#ID\\\")\\n\" + \n" + 
        "			\"					} else if ( match && match[3] ) {\\n\" + \n" + 
        "			\"						var elem = context.getElementById( match[3] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Check parentNode to catch when Blackberry 4.6 returns\\n\" + \n" + 
        "			\"						// nodes that are no longer in the document #6963\\n\" + \n" + 
        "			\"						if ( elem && elem.parentNode ) {\\n\" + \n" + 
        "			\"							// Handle the case where IE and Opera return items\\n\" + \n" + 
        "			\"							// by name instead of ID\\n\" + \n" + 
        "			\"							if ( elem.id === match[3] ) {\\n\" + \n" + 
        "			\"								return makeArray( [ elem ], extra );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							\\n\" + \n" + 
        "			\"						} else {\\n\" + \n" + 
        "			\"							return makeArray( [], extra );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					\\n\" + \n" + 
        "			\"					try {\\n\" + \n" + 
        "			\"						return makeArray( context.querySelectorAll(query), extra );\\n\" + \n" + 
        "			\"					} catch(qsaError) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// qSA works strangely on Element-rooted queries\\n\" + \n" + 
        "			\"				// We can work around this by specifying an extra ID on the root\\n\" + \n" + 
        "			\"				// and working up from there (Thanks to Andrew Dupont for the technique)\\n\" + \n" + 
        "			\"				// IE 8 doesn't work on object elements\\n\" + \n" + 
        "			\"				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== \\\"object\\\" ) {\\n\" + \n" + 
        "			\"					var oldContext = context,\\n\" + \n" + 
        "			\"						old = context.getAttribute( \\\"id\\\" ),\\n\" + \n" + 
        "			\"						nid = old || id,\\n\" + \n" + 
        "			\"						hasParent = context.parentNode,\\n\" + \n" + 
        "			\"						relativeHierarchySelector = /^\\\\s*[+~]/.test( query );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( !old ) {\\n\" + \n" + 
        "			\"						context.setAttribute( \\\"id\\\", nid );\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						nid = nid.replace( /'/g, \\\"\\\\\\\\$&\\\" );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					if ( relativeHierarchySelector && hasParent ) {\\n\" + \n" + 
        "			\"						context = context.parentNode;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					try {\\n\" + \n" + 
        "			\"						if ( !relativeHierarchySelector || hasParent ) {\\n\" + \n" + 
        "			\"							return makeArray( context.querySelectorAll( \\\"[id='\\\" + nid + \\\"'] \\\" + query ), extra );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} catch(pseudoError) {\\n\" + \n" + 
        "			\"					} finally {\\n\" + \n" + 
        "			\"						if ( !old ) {\\n\" + \n" + 
        "			\"							oldContext.removeAttribute( \\\"id\\\" );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"			return oldSizzle(query, context, extra, seed);\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var prop in oldSizzle ) {\\n\" + \n" + 
        "			\"			Sizzle[ prop ] = oldSizzle[ prop ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// release memory in IE\\n\" + \n" + 
        "			\"		div = null;\\n\" + \n" + 
        "			\"	})();\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(){\\n\" + \n" + 
        "			\"	var html = document.documentElement,\\n\" + \n" + 
        "			\"		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( matches ) {\\n\" + \n" + 
        "			\"		// Check to see if it's possible to do matchesSelector\\n\" + \n" + 
        "			\"		// on a disconnected node (IE 9 fails this)\\n\" + \n" + 
        "			\"		var disconnectedMatch = !matches.call( document.createElement( \\\"div\\\" ), \\\"div\\\" ),\\n\" + \n" + 
        "			\"			pseudoWorks = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		try {\\n\" + \n" + 
        "			\"			// This should fail with an exception\\n\" + \n" + 
        "			\"			// Gecko does not error, returns false instead\\n\" + \n" + 
        "			\"			matches.call( document.documentElement, \\\"[test!='']:sizzle\\\" );\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"		} catch( pseudoError ) {\\n\" + \n" + 
        "			\"			pseudoWorks = true;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		Sizzle.matchesSelector = function( node, expr ) {\\n\" + \n" + 
        "			\"			// Make sure that attribute selectors are quoted\\n\" + \n" + 
        "			\"			expr = expr.replace(/\\\\=\\\\s*([^'\\\"\\\\]]*)\\\\s*\\\\]/g, \\\"='$1']\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !Sizzle.isXML( node ) ) {\\n\" + \n" + 
        "			\"				try { \\n\" + \n" + 
        "			\"					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {\\n\" + \n" + 
        "			\"						var ret = matches.call( node, expr );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// IE 9's matchesSelector returns false on disconnected nodes\\n\" + \n" + 
        "			\"						if ( ret || !disconnectedMatch ||\\n\" + \n" + 
        "			\"								// As well, disconnected nodes are said to be in a document\\n\" + \n" + 
        "			\"								// fragment in IE 9, so check for that\\n\" + \n" + 
        "			\"								node.document && node.document.nodeType !== 11 ) {\\n\" + \n" + 
        "			\"							return ret;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				} catch(e) {}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return Sizzle(expr, null, null, [node]).length > 0;\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(){\\n\" + \n" + 
        "			\"	var div = document.createElement(\\\"div\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	div.innerHTML = \\\"<div class='test e'></div><div class='test'></div>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Opera can't find a second classname (in 9.6)\\n\" + \n" + 
        "			\"	// Also, make sure that getElementsByClassName actually exists\\n\" + \n" + 
        "			\"	if ( !div.getElementsByClassName || div.getElementsByClassName(\\\"e\\\").length === 0 ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Safari caches class attributes, doesn't catch changes (in 3.2)\\n\" + \n" + 
        "			\"	div.lastChild.className = \\\"e\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( div.getElementsByClassName(\\\"e\\\").length === 1 ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	Expr.order.splice(1, 0, \\\"CLASS\\\");\\n\" + \n" + 
        "			\"	Expr.find.CLASS = function( match, context, isXML ) {\\n\" + \n" + 
        "			\"		if ( typeof context.getElementsByClassName !== \\\"undefined\\\" && !isXML ) {\\n\" + \n" + 
        "			\"			return context.getElementsByClassName(match[1]);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// release memory in IE\\n\" + \n" + 
        "			\"	div = null;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {\\n\" + \n" + 
        "			\"	for ( var i = 0, l = checkSet.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		var elem = checkSet[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( elem ) {\\n\" + \n" + 
        "			\"			var match = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elem = elem[dir];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			while ( elem ) {\\n\" + \n" + 
        "			\"				if ( elem.sizcache === doneName ) {\\n\" + \n" + 
        "			\"					match = checkSet[elem.sizset];\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.nodeType === 1 && !isXML ){\\n\" + \n" + 
        "			\"					elem.sizcache = doneName;\\n\" + \n" + 
        "			\"					elem.sizset = i;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.nodeName.toLowerCase() === cur ) {\\n\" + \n" + 
        "			\"					match = elem;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				elem = elem[dir];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			checkSet[i] = match;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {\\n\" + \n" + 
        "			\"	for ( var i = 0, l = checkSet.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		var elem = checkSet[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( elem ) {\\n\" + \n" + 
        "			\"			var match = false;\\n\" + \n" + 
        "			\"			\\n\" + \n" + 
        "			\"			elem = elem[dir];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			while ( elem ) {\\n\" + \n" + 
        "			\"				if ( elem.sizcache === doneName ) {\\n\" + \n" + 
        "			\"					match = checkSet[elem.sizset];\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"					if ( !isXML ) {\\n\" + \n" + 
        "			\"						elem.sizcache = doneName;\\n\" + \n" + 
        "			\"						elem.sizset = i;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( typeof cur !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"						if ( elem === cur ) {\\n\" + \n" + 
        "			\"							match = true;\\n\" + \n" + 
        "			\"							break;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {\\n\" + \n" + 
        "			\"						match = elem;\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				elem = elem[dir];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			checkSet[i] = match;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( document.documentElement.contains ) {\\n\" + \n" + 
        "			\"	Sizzle.contains = function( a, b ) {\\n\" + \n" + 
        "			\"		return a !== b && (a.contains ? a.contains(b) : true);\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"} else if ( document.documentElement.compareDocumentPosition ) {\\n\" + \n" + 
        "			\"	Sizzle.contains = function( a, b ) {\\n\" + \n" + 
        "			\"		return !!(a.compareDocumentPosition(b) & 16);\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"} else {\\n\" + \n" + 
        "			\"	Sizzle.contains = function() {\\n\" + \n" + 
        "			\"		return false;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"Sizzle.isXML = function( elem ) {\\n\" + \n" + 
        "			\"	// documentElement is verified for cases where it doesn't yet exist\\n\" + \n" + 
        "			\"	// (such as loading iframes in IE - #4833) \\n\" + \n" + 
        "			\"	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return documentElement ? documentElement.nodeName !== \\\"HTML\\\" : false;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var posProcess = function( selector, context ) {\\n\" + \n" + 
        "			\"	var match,\\n\" + \n" + 
        "			\"		tmpSet = [],\\n\" + \n" + 
        "			\"		later = \\\"\\\",\\n\" + \n" + 
        "			\"		root = context.nodeType ? [context] : context;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Position selectors must be done after the filter\\n\" + \n" + 
        "			\"	// And so must :not(positional) so we move all PSEUDOs to the end\\n\" + \n" + 
        "			\"	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {\\n\" + \n" + 
        "			\"		later += match[0];\\n\" + \n" + 
        "			\"		selector = selector.replace( Expr.match.PSEUDO, \\\"\\\" );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	selector = Expr.relative[selector] ? selector + \\\"*\\\" : selector;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i = 0, l = root.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"		Sizzle( selector, root[i], tmpSet );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return Sizzle.filter( later, tmpSet );\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// EXPOSE\\n\" + \n" + 
        "			\"jQuery.find = Sizzle;\\n\" + \n" + 
        "			\"jQuery.expr = Sizzle.selectors;\\n\" + \n" + 
        "			\"jQuery.expr[\\\":\\\"] = jQuery.expr.filters;\\n\" + \n" + 
        "			\"jQuery.unique = Sizzle.uniqueSort;\\n\" + \n" + 
        "			\"jQuery.text = Sizzle.getText;\\n\" + \n" + 
        "			\"jQuery.isXMLDoc = Sizzle.isXML;\\n\" + \n" + 
        "			\"jQuery.contains = Sizzle.contains;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var runtil = /Until$/,\\n\" + \n" + 
        "			\"	rparentsprev = /^(?:parents|prevUntil|prevAll)/,\\n\" + \n" + 
        "			\"	// Note: This RegExp should be improved, or likely pulled from Sizzle\\n\" + \n" + 
        "			\"	rmultiselector = /,/,\\n\" + \n" + 
        "			\"	isSimple = /^.[^:#\\\\[\\\\.,]*$/,\\n\" + \n" + 
        "			\"	slice = Array.prototype.slice,\\n\" + \n" + 
        "			\"	POS = jQuery.expr.match.POS,\\n\" + \n" + 
        "			\"	// methods guaranteed to produce a unique set when starting from a unique set\\n\" + \n" + 
        "			\"	guaranteedUnique = {\\n\" + \n" + 
        "			\"		children: true,\\n\" + \n" + 
        "			\"		contents: true,\\n\" + \n" + 
        "			\"		next: true,\\n\" + \n" + 
        "			\"		prev: true\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	find: function( selector ) {\\n\" + \n" + 
        "			\"		var self = this,\\n\" + \n" + 
        "			\"			i, l;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof selector !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			return jQuery( selector ).filter(function() {\\n\" + \n" + 
        "			\"				for ( i = 0, l = self.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					if ( jQuery.contains( self[ i ], this ) ) {\\n\" + \n" + 
        "			\"						return true;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var ret = this.pushStack( \\\"\\\", \\\"find\\\", selector ),\\n\" + \n" + 
        "			\"			length, n, r;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"			length = ret.length;\\n\" + \n" + 
        "			\"			jQuery.find( selector, this[i], ret );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( i > 0 ) {\\n\" + \n" + 
        "			\"				// Make sure that the results are unique\\n\" + \n" + 
        "			\"				for ( n = length; n < ret.length; n++ ) {\\n\" + \n" + 
        "			\"					for ( r = 0; r < length; r++ ) {\\n\" + \n" + 
        "			\"						if ( ret[r] === ret[n] ) {\\n\" + \n" + 
        "			\"							ret.splice(n--, 1);\\n\" + \n" + 
        "			\"							break;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	has: function( target ) {\\n\" + \n" + 
        "			\"		var targets = jQuery( target );\\n\" + \n" + 
        "			\"		return this.filter(function() {\\n\" + \n" + 
        "			\"			for ( var i = 0, l = targets.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				if ( jQuery.contains( this, targets[i] ) ) {\\n\" + \n" + 
        "			\"					return true;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	not: function( selector ) {\\n\" + \n" + 
        "			\"		return this.pushStack( winnow(this, selector, false), \\\"not\\\", selector);\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	filter: function( selector ) {\\n\" + \n" + 
        "			\"		return this.pushStack( winnow(this, selector, true), \\\"filter\\\", selector );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	is: function( selector ) {\\n\" + \n" + 
        "			\"		return !!selector && ( typeof selector === \\\"string\\\" ?\\n\" + \n" + 
        "			\"			jQuery.filter( selector, this ).length > 0 :\\n\" + \n" + 
        "			\"			this.filter( selector ).length > 0 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	closest: function( selectors, context ) {\\n\" + \n" + 
        "			\"		var ret = [], i, l, cur = this[0];\\n\" + \n" + 
        "			\"		\\n\" + \n" + 
        "			\"		// Array\\n\" + \n" + 
        "			\"		if ( jQuery.isArray( selectors ) ) {\\n\" + \n" + 
        "			\"			var match, selector,\\n\" + \n" + 
        "			\"				matches = {},\\n\" + \n" + 
        "			\"				level = 1;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( cur && selectors.length ) {\\n\" + \n" + 
        "			\"				for ( i = 0, l = selectors.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					selector = selectors[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( !matches[ selector ] ) {\\n\" + \n" + 
        "			\"						matches[ selector ] = POS.test( selector ) ?\\n\" + \n" + 
        "			\"							jQuery( selector, context || this.context ) :\\n\" + \n" + 
        "			\"							selector;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				while ( cur && cur.ownerDocument && cur !== context ) {\\n\" + \n" + 
        "			\"					for ( selector in matches ) {\\n\" + \n" + 
        "			\"						match = matches[ selector ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( match.jquery ? match.index( cur ) > -1 : jQuery( cur ).is( match ) ) {\\n\" + \n" + 
        "			\"							ret.push({ selector: selector, elem: cur, level: level });\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					cur = cur.parentNode;\\n\" + \n" + 
        "			\"					level++;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return ret;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// String\\n\" + \n" + 
        "			\"		var pos = POS.test( selectors ) || typeof selectors !== \\\"string\\\" ?\\n\" + \n" + 
        "			\"				jQuery( selectors, context || this.context ) :\\n\" + \n" + 
        "			\"				0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"			cur = this[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			while ( cur ) {\\n\" + \n" + 
        "			\"				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {\\n\" + \n" + 
        "			\"					ret.push( cur );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					cur = cur.parentNode;\\n\" + \n" + 
        "			\"					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.pushStack( ret, \\\"closest\\\", selectors );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Determine the position of an element within\\n\" + \n" + 
        "			\"	// the matched set of elements\\n\" + \n" + 
        "			\"	index: function( elem ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// No argument, return index in parent\\n\" + \n" + 
        "			\"		if ( !elem ) {\\n\" + \n" + 
        "			\"			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// index in selector\\n\" + \n" + 
        "			\"		if ( typeof elem === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			return jQuery.inArray( this[0], jQuery( elem ) );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Locate the position of the desired element\\n\" + \n" + 
        "			\"		return jQuery.inArray(\\n\" + \n" + 
        "			\"			// If it receives a jQuery object, the first element is used\\n\" + \n" + 
        "			\"			elem.jquery ? elem[0] : elem, this );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	add: function( selector, context ) {\\n\" + \n" + 
        "			\"		var set = typeof selector === \\\"string\\\" ?\\n\" + \n" + 
        "			\"				jQuery( selector, context ) :\\n\" + \n" + 
        "			\"				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),\\n\" + \n" + 
        "			\"			all = jQuery.merge( this.get(), set );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?\\n\" + \n" + 
        "			\"			all :\\n\" + \n" + 
        "			\"			jQuery.unique( all ) );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	andSelf: function() {\\n\" + \n" + 
        "			\"		return this.add( this.prevObject );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// A painfully simple check to see if an element is disconnected\\n\" + \n" + 
        "			\"// from a document (should be improved, where feasible).\\n\" + \n" + 
        "			\"function isDisconnected( node ) {\\n\" + \n" + 
        "			\"	return !node || !node.parentNode || node.parentNode.nodeType === 11;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each({\\n\" + \n" + 
        "			\"	parent: function( elem ) {\\n\" + \n" + 
        "			\"		var parent = elem.parentNode;\\n\" + \n" + 
        "			\"		return parent && parent.nodeType !== 11 ? parent : null;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	parents: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"parentNode\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	parentsUntil: function( elem, i, until ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"parentNode\\\", until );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	next: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.nth( elem, 2, \\\"nextSibling\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	prev: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.nth( elem, 2, \\\"previousSibling\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	nextAll: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"nextSibling\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	prevAll: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"previousSibling\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	nextUntil: function( elem, i, until ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"nextSibling\\\", until );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	prevUntil: function( elem, i, until ) {\\n\" + \n" + 
        "			\"		return jQuery.dir( elem, \\\"previousSibling\\\", until );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	siblings: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.sibling( elem.parentNode.firstChild, elem );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	children: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.sibling( elem.firstChild );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	contents: function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.nodeName( elem, \\\"iframe\\\" ) ?\\n\" + \n" + 
        "			\"			elem.contentDocument || elem.contentWindow.document :\\n\" + \n" + 
        "			\"			jQuery.makeArray( elem.childNodes );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}, function( name, fn ) {\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( until, selector ) {\\n\" + \n" + 
        "			\"		var ret = jQuery.map( this, fn, until ),\\n\" + \n" + 
        "			\"			// The variable 'args' was introduced in\\n\" + \n" + 
        "			\"			// https://github.com/jquery/jquery/commit/52a0238\\n\" + \n" + 
        "			\"			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.\\n\" + \n" + 
        "			\"			// http://code.google.com/p/v8/issues/detail?id=1050\\n\" + \n" + 
        "			\"			args = slice.call(arguments);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !runtil.test( name ) ) {\\n\" + \n" + 
        "			\"			selector = until;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( selector && typeof selector === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			ret = jQuery.filter( selector, ret );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {\\n\" + \n" + 
        "			\"			ret = ret.reverse();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.pushStack( ret, name, args.join(\\\",\\\") );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	filter: function( expr, elems, not ) {\\n\" + \n" + 
        "			\"		if ( not ) {\\n\" + \n" + 
        "			\"			expr = \\\":not(\\\" + expr + \\\")\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return elems.length === 1 ?\\n\" + \n" + 
        "			\"			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :\\n\" + \n" + 
        "			\"			jQuery.find.matches(expr, elems);\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	dir: function( elem, dir, until ) {\\n\" + \n" + 
        "			\"		var matched = [],\\n\" + \n" + 
        "			\"			cur = elem[ dir ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {\\n\" + \n" + 
        "			\"			if ( cur.nodeType === 1 ) {\\n\" + \n" + 
        "			\"				matched.push( cur );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			cur = cur[dir];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return matched;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	nth: function( cur, result, dir, elem ) {\\n\" + \n" + 
        "			\"		result = result || 1;\\n\" + \n" + 
        "			\"		var num = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( ; cur; cur = cur[dir] ) {\\n\" + \n" + 
        "			\"			if ( cur.nodeType === 1 && ++num === result ) {\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return cur;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	sibling: function( n, elem ) {\\n\" + \n" + 
        "			\"		var r = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( ; n; n = n.nextSibling ) {\\n\" + \n" + 
        "			\"			if ( n.nodeType === 1 && n !== elem ) {\\n\" + \n" + 
        "			\"				r.push( n );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return r;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Implement the identical functionality for filter and not\\n\" + \n" + 
        "			\"function winnow( elements, qualifier, keep ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Can't pass null or undefined to indexOf in Firefox 4\\n\" + \n" + 
        "			\"	// Set to 0 to skip string check\\n\" + \n" + 
        "			\"	qualifier = qualifier || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( jQuery.isFunction( qualifier ) ) {\\n\" + \n" + 
        "			\"		return jQuery.grep(elements, function( elem, i ) {\\n\" + \n" + 
        "			\"			var retVal = !!qualifier.call( elem, i, elem );\\n\" + \n" + 
        "			\"			return retVal === keep;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else if ( qualifier.nodeType ) {\\n\" + \n" + 
        "			\"		return jQuery.grep(elements, function( elem, i ) {\\n\" + \n" + 
        "			\"			return (elem === qualifier) === keep;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else if ( typeof qualifier === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"		var filtered = jQuery.grep(elements, function( elem ) {\\n\" + \n" + 
        "			\"			return elem.nodeType === 1;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( isSimple.test( qualifier ) ) {\\n\" + \n" + 
        "			\"			return jQuery.filter(qualifier, filtered, !keep);\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			qualifier = jQuery.filter( qualifier, filtered );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return jQuery.grep(elements, function( elem, i ) {\\n\" + \n" + 
        "			\"		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var rinlinejQuery = / jQuery\\\\d+=\\\"(?:\\\\d+|null)\\\"/g,\\n\" + \n" + 
        "			\"	rleadingWhitespace = /^\\\\s+/,\\n\" + \n" + 
        "			\"	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\\\w:]+)[^>]*)\\\\/>/ig,\\n\" + \n" + 
        "			\"	rtagName = /<([\\\\w:]+)/,\\n\" + \n" + 
        "			\"	rtbody = /<tbody/i,\\n\" + \n" + 
        "			\"	rhtml = /<|&#?\\\\w+;/,\\n\" + \n" + 
        "			\"	rnocache = /<(?:script|object|embed|option|style)/i,\\n\" + \n" + 
        "			\"	// checked=\\\"checked\\\" or checked\\n\" + \n" + 
        "			\"	rchecked = /checked\\\\s*(?:[^=]|=\\\\s*.checked.)/i,\\n\" + \n" + 
        "			\"	rscriptType = /\\\\/(java|ecma)script/i,\\n\" + \n" + 
        "			\"	rcleanScript = /^\\\\s*<!(?:\\\\[CDATA\\\\[|\\\\-\\\\-)/,\\n\" + \n" + 
        "			\"	wrapMap = {\\n\" + \n" + 
        "			\"		option: [ 1, \\\"<select multiple='multiple'>\\\", \\\"</select>\\\" ],\\n\" + \n" + 
        "			\"		legend: [ 1, \\\"<fieldset>\\\", \\\"</fieldset>\\\" ],\\n\" + \n" + 
        "			\"		thead: [ 1, \\\"<table>\\\", \\\"</table>\\\" ],\\n\" + \n" + 
        "			\"		tr: [ 2, \\\"<table><tbody>\\\", \\\"</tbody></table>\\\" ],\\n\" + \n" + 
        "			\"		td: [ 3, \\\"<table><tbody><tr>\\\", \\\"</tr></tbody></table>\\\" ],\\n\" + \n" + 
        "			\"		col: [ 2, \\\"<table><tbody></tbody><colgroup>\\\", \\\"</colgroup></table>\\\" ],\\n\" + \n" + 
        "			\"		area: [ 1, \\\"<map>\\\", \\\"</map>\\\" ],\\n\" + \n" + 
        "			\"		_default: [ 0, \\\"\\\", \\\"\\\" ]\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"wrapMap.optgroup = wrapMap.option;\\n\" + \n" + 
        "			\"wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\\n\" + \n" + 
        "			\"wrapMap.th = wrapMap.td;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// IE can't serialize <link> and <script> tags normally\\n\" + \n" + 
        "			\"if ( !jQuery.support.htmlSerialize ) {\\n\" + \n" + 
        "			\"	wrapMap._default = [ 1, \\\"div<div>\\\", \\\"</div>\\\" ];\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	text: function( text ) {\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction(text) ) {\\n\" + \n" + 
        "			\"			return this.each(function(i) {\\n\" + \n" + 
        "			\"				var self = jQuery( this );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				self.text( text.call(this, i, self.text()) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof text !== \\\"object\\\" && text !== undefined ) {\\n\" + \n" + 
        "			\"			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return jQuery.text( this );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	wrapAll: function( html ) {\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( html ) ) {\\n\" + \n" + 
        "			\"			return this.each(function(i) {\\n\" + \n" + 
        "			\"				jQuery(this).wrapAll( html.call(this, i) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( this[0] ) {\\n\" + \n" + 
        "			\"			// The elements to wrap the target around\\n\" + \n" + 
        "			\"			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( this[0].parentNode ) {\\n\" + \n" + 
        "			\"				wrap.insertBefore( this[0] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			wrap.map(function() {\\n\" + \n" + 
        "			\"				var elem = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {\\n\" + \n" + 
        "			\"					elem = elem.firstChild;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return elem;\\n\" + \n" + 
        "			\"			}).append( this );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	wrapInner: function( html ) {\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( html ) ) {\\n\" + \n" + 
        "			\"			return this.each(function(i) {\\n\" + \n" + 
        "			\"				jQuery(this).wrapInner( html.call(this, i) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			var self = jQuery( this ),\\n\" + \n" + 
        "			\"				contents = self.contents();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( contents.length ) {\\n\" + \n" + 
        "			\"				contents.wrapAll( html );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				self.append( html );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	wrap: function( html ) {\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			jQuery( this ).wrapAll( html );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	unwrap: function() {\\n\" + \n" + 
        "			\"		return this.parent().each(function() {\\n\" + \n" + 
        "			\"			if ( !jQuery.nodeName( this, \\\"body\\\" ) ) {\\n\" + \n" + 
        "			\"				jQuery( this ).replaceWith( this.childNodes );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}).end();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	append: function() {\\n\" + \n" + 
        "			\"		return this.domManip(arguments, true, function( elem ) {\\n\" + \n" + 
        "			\"			if ( this.nodeType === 1 ) {\\n\" + \n" + 
        "			\"				this.appendChild( elem );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	prepend: function() {\\n\" + \n" + 
        "			\"		return this.domManip(arguments, true, function( elem ) {\\n\" + \n" + 
        "			\"			if ( this.nodeType === 1 ) {\\n\" + \n" + 
        "			\"				this.insertBefore( elem, this.firstChild );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	before: function() {\\n\" + \n" + 
        "			\"		if ( this[0] && this[0].parentNode ) {\\n\" + \n" + 
        "			\"			return this.domManip(arguments, false, function( elem ) {\\n\" + \n" + 
        "			\"				this.parentNode.insertBefore( elem, this );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		} else if ( arguments.length ) {\\n\" + \n" + 
        "			\"			var set = jQuery(arguments[0]);\\n\" + \n" + 
        "			\"			set.push.apply( set, this.toArray() );\\n\" + \n" + 
        "			\"			return this.pushStack( set, \\\"before\\\", arguments );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	after: function() {\\n\" + \n" + 
        "			\"		if ( this[0] && this[0].parentNode ) {\\n\" + \n" + 
        "			\"			return this.domManip(arguments, false, function( elem ) {\\n\" + \n" + 
        "			\"				this.parentNode.insertBefore( elem, this.nextSibling );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		} else if ( arguments.length ) {\\n\" + \n" + 
        "			\"			var set = this.pushStack( this, \\\"after\\\", arguments );\\n\" + \n" + 
        "			\"			set.push.apply( set, jQuery(arguments[0]).toArray() );\\n\" + \n" + 
        "			\"			return set;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// keepData is for internal use only--do not document\\n\" + \n" + 
        "			\"	remove: function( selector, keepData ) {\\n\" + \n" + 
        "			\"		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {\\n\" + \n" + 
        "			\"				if ( !keepData && elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"					jQuery.cleanData( elem.getElementsByTagName(\\\"*\\\") );\\n\" + \n" + 
        "			\"					jQuery.cleanData( [ elem ] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.parentNode ) {\\n\" + \n" + 
        "			\"					elem.parentNode.removeChild( elem );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	empty: function() {\\n\" + \n" + 
        "			\"		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"			// Remove element nodes and prevent memory leaks\\n\" + \n" + 
        "			\"			if ( elem.nodeType === 1 ) {\\n\" + \n" + 
        "			\"				jQuery.cleanData( elem.getElementsByTagName(\\\"*\\\") );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Remove any remaining nodes\\n\" + \n" + 
        "			\"			while ( elem.firstChild ) {\\n\" + \n" + 
        "			\"				elem.removeChild( elem.firstChild );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	clone: function( dataAndEvents, deepDataAndEvents ) {\\n\" + \n" + 
        "			\"		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;\\n\" + \n" + 
        "			\"		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this.map( function () {\\n\" + \n" + 
        "			\"			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	html: function( value ) {\\n\" + \n" + 
        "			\"		if ( value === undefined ) {\\n\" + \n" + 
        "			\"			return this[0] && this[0].nodeType === 1 ?\\n\" + \n" + 
        "			\"				this[0].innerHTML.replace(rinlinejQuery, \\\"\\\") :\\n\" + \n" + 
        "			\"				null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// See if we can take a shortcut and just use innerHTML\\n\" + \n" + 
        "			\"		} else if ( typeof value === \\\"string\\\" && !rnocache.test( value ) &&\\n\" + \n" + 
        "			\"			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&\\n\" + \n" + 
        "			\"			!wrapMap[ (rtagName.exec( value ) || [\\\"\\\", \\\"\\\"])[1].toLowerCase() ] ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			value = value.replace(rxhtmlTag, \\\"<$1></$2>\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				for ( var i = 0, l = this.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					// Remove element nodes and prevent memory leaks\\n\" + \n" + 
        "			\"					if ( this[i].nodeType === 1 ) {\\n\" + \n" + 
        "			\"						jQuery.cleanData( this[i].getElementsByTagName(\\\"*\\\") );\\n\" + \n" + 
        "			\"						this[i].innerHTML = value;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If using innerHTML throws an exception, use the fallback method\\n\" + \n" + 
        "			\"			} catch(e) {\\n\" + \n" + 
        "			\"				this.empty().append( value );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( jQuery.isFunction( value ) ) {\\n\" + \n" + 
        "			\"			this.each(function(i){\\n\" + \n" + 
        "			\"				var self = jQuery( this );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				self.html( value.call(this, i, self.html()) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			this.empty().append( value );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	replaceWith: function( value ) {\\n\" + \n" + 
        "			\"		if ( this[0] && this[0].parentNode ) {\\n\" + \n" + 
        "			\"			// Make sure that the elements are removed from the DOM before they are inserted\\n\" + \n" + 
        "			\"			// this can help fix replacing a parent with child elements\\n\" + \n" + 
        "			\"			if ( jQuery.isFunction( value ) ) {\\n\" + \n" + 
        "			\"				return this.each(function(i) {\\n\" + \n" + 
        "			\"					var self = jQuery(this), old = self.html();\\n\" + \n" + 
        "			\"					self.replaceWith( value.call( this, i, old ) );\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( typeof value !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"				value = jQuery( value ).detach();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this.each(function() {\\n\" + \n" + 
        "			\"				var next = this.nextSibling,\\n\" + \n" + 
        "			\"					parent = this.parentNode;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				jQuery( this ).remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( next ) {\\n\" + \n" + 
        "			\"					jQuery(next).before( value );\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					jQuery(parent).append( value );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			return this.length ?\\n\" + \n" + 
        "			\"				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), \\\"replaceWith\\\", value ) :\\n\" + \n" + 
        "			\"				this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	detach: function( selector ) {\\n\" + \n" + 
        "			\"		return this.remove( selector, true );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	domManip: function( args, table, callback ) {\\n\" + \n" + 
        "			\"		var results, first, fragment, parent,\\n\" + \n" + 
        "			\"			value = args[0],\\n\" + \n" + 
        "			\"			scripts = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// We can't cloneNode fragments that contain checked, in WebKit\\n\" + \n" + 
        "			\"		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === \\\"string\\\" && rchecked.test( value ) ) {\\n\" + \n" + 
        "			\"			return this.each(function() {\\n\" + \n" + 
        "			\"				jQuery(this).domManip( args, table, callback, true );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction(value) ) {\\n\" + \n" + 
        "			\"			return this.each(function(i) {\\n\" + \n" + 
        "			\"				var self = jQuery(this);\\n\" + \n" + 
        "			\"				args[0] = value.call(this, i, table ? self.html() : undefined);\\n\" + \n" + 
        "			\"				self.domManip( args, table, callback );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( this[0] ) {\\n\" + \n" + 
        "			\"			parent = value && value.parentNode;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If we're in a fragment, just use that instead of building a new one\\n\" + \n" + 
        "			\"			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {\\n\" + \n" + 
        "			\"				results = { fragment: parent };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				results = jQuery.buildFragment( args, this, scripts );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			fragment = results.fragment;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( fragment.childNodes.length === 1 ) {\\n\" + \n" + 
        "			\"				first = fragment = fragment.firstChild;\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				first = fragment.firstChild;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( first ) {\\n\" + \n" + 
        "			\"				table = table && jQuery.nodeName( first, \\\"tr\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {\\n\" + \n" + 
        "			\"					callback.call(\\n\" + \n" + 
        "			\"						table ?\\n\" + \n" + 
        "			\"							root(this[i], first) :\\n\" + \n" + 
        "			\"							this[i],\\n\" + \n" + 
        "			\"						// Make sure that we do not leak memory by inadvertently discarding\\n\" + \n" + 
        "			\"						// the original fragment (which might have attached data) instead of\\n\" + \n" + 
        "			\"						// using it; in addition, use the original fragment object for the last\\n\" + \n" + 
        "			\"						// item instead of first because it can end up being emptied incorrectly\\n\" + \n" + 
        "			\"						// in certain situations (Bug #8070).\\n\" + \n" + 
        "			\"						// Fragments from the fragment cache must always be cloned and never used\\n\" + \n" + 
        "			\"						// in place.\\n\" + \n" + 
        "			\"						results.cacheable || (l > 1 && i < lastIndex) ?\\n\" + \n" + 
        "			\"							jQuery.clone( fragment, true, true ) :\\n\" + \n" + 
        "			\"							fragment\\n\" + \n" + 
        "			\"					);\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( scripts.length ) {\\n\" + \n" + 
        "			\"				jQuery.each( scripts, evalScript );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function root( elem, cur ) {\\n\" + \n" + 
        "			\"	return jQuery.nodeName(elem, \\\"table\\\") ?\\n\" + \n" + 
        "			\"		(elem.getElementsByTagName(\\\"tbody\\\")[0] ||\\n\" + \n" + 
        "			\"		elem.appendChild(elem.ownerDocument.createElement(\\\"tbody\\\"))) :\\n\" + \n" + 
        "			\"		elem;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function cloneCopyEvent( src, dest ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var internalKey = jQuery.expando,\\n\" + \n" + 
        "			\"		oldData = jQuery.data( src ),\\n\" + \n" + 
        "			\"		curData = jQuery.data( dest, oldData );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Switch to use the internal data object, if it exists, for the next\\n\" + \n" + 
        "			\"	// stage of data copying\\n\" + \n" + 
        "			\"	if ( (oldData = oldData[ internalKey ]) ) {\\n\" + \n" + 
        "			\"		var events = oldData.events;\\n\" + \n" + 
        "			\"				curData = curData[ internalKey ] = jQuery.extend({}, oldData);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( events ) {\\n\" + \n" + 
        "			\"			delete curData.handle;\\n\" + \n" + 
        "			\"			curData.events = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var type in events ) {\\n\" + \n" + 
        "			\"				for ( var i = 0, l = events[ type ].length; i < l; i++ ) {\\n\" + \n" + 
        "			\"					jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? \\\".\\\" : \\\"\\\" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function cloneFixAttributes( src, dest ) {\\n\" + \n" + 
        "			\"	var nodeName;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// We do not need to do anything for non-Elements\\n\" + \n" + 
        "			\"	if ( dest.nodeType !== 1 ) {\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// clearAttributes removes the attributes, which we don't want,\\n\" + \n" + 
        "			\"	// but also removes the attachEvent events, which we *do* want\\n\" + \n" + 
        "			\"	if ( dest.clearAttributes ) {\\n\" + \n" + 
        "			\"		dest.clearAttributes();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// mergeAttributes, in contrast, only merges back on the\\n\" + \n" + 
        "			\"	// original attributes, not the events\\n\" + \n" + 
        "			\"	if ( dest.mergeAttributes ) {\\n\" + \n" + 
        "			\"		dest.mergeAttributes( src );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	nodeName = dest.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// IE6-8 fail to clone children inside object elements that use\\n\" + \n" + 
        "			\"	// the proprietary classid attribute value (rather than the type\\n\" + \n" + 
        "			\"	// attribute) to identify the type of content to display\\n\" + \n" + 
        "			\"	if ( nodeName === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"		dest.outerHTML = src.outerHTML;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else if ( nodeName === \\\"input\\\" && (src.type === \\\"checkbox\\\" || src.type === \\\"radio\\\") ) {\\n\" + \n" + 
        "			\"		// IE6-8 fails to persist the checked state of a cloned checkbox\\n\" + \n" + 
        "			\"		// or radio button. Worse, IE6-7 fail to give the cloned element\\n\" + \n" + 
        "			\"		// a checked appearance if the defaultChecked value isn't also set\\n\" + \n" + 
        "			\"		if ( src.checked ) {\\n\" + \n" + 
        "			\"			dest.defaultChecked = dest.checked = src.checked;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// IE6-7 get confused and end up setting the value of a cloned\\n\" + \n" + 
        "			\"		// checkbox/radio button to an empty string instead of \\\"on\\\"\\n\" + \n" + 
        "			\"		if ( dest.value !== src.value ) {\\n\" + \n" + 
        "			\"			dest.value = src.value;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// IE6-8 fails to return the selected option to the default selected\\n\" + \n" + 
        "			\"	// state when cloning options\\n\" + \n" + 
        "			\"	} else if ( nodeName === \\\"option\\\" ) {\\n\" + \n" + 
        "			\"		dest.selected = src.defaultSelected;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// IE6-8 fails to set the defaultValue to the correct value when\\n\" + \n" + 
        "			\"	// cloning other types of input fields\\n\" + \n" + 
        "			\"	} else if ( nodeName === \\\"input\\\" || nodeName === \\\"textarea\\\" ) {\\n\" + \n" + 
        "			\"		dest.defaultValue = src.defaultValue;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Event data gets referenced instead of copied if the expando\\n\" + \n" + 
        "			\"	// gets copied too\\n\" + \n" + 
        "			\"	dest.removeAttribute( jQuery.expando );\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.buildFragment = function( args, nodes, scripts ) {\\n\" + \n" + 
        "			\"	var fragment, cacheable, cacheresults, doc;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"  // nodes may contain either an explicit document object,\\n\" + \n" + 
        "			\"  // a jQuery collection or context object.\\n\" + \n" + 
        "			\"  // If nodes[0] contains a valid object to assign to doc\\n\" + \n" + 
        "			\"  if ( nodes && nodes[0] ) {\\n\" + \n" + 
        "			\"    doc = nodes[0].ownerDocument || nodes[0];\\n\" + \n" + 
        "			\"  }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"  // Ensure that an attr object doesn't incorrectly stand in as a document object\\n\" + \n" + 
        "			\"	// Chrome and Firefox seem to allow this to occur and will throw exception\\n\" + \n" + 
        "			\"	// Fixes #8950\\n\" + \n" + 
        "			\"	if ( !doc.createDocumentFragment ) {\\n\" + \n" + 
        "			\"		doc = document;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Only cache \\\"small\\\" (1/2 KB) HTML strings that are associated with the main document\\n\" + \n" + 
        "			\"	// Cloning options loses the selected state, so don't cache them\\n\" + \n" + 
        "			\"	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment\\n\" + \n" + 
        "			\"	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache\\n\" + \n" + 
        "			\"	if ( args.length === 1 && typeof args[0] === \\\"string\\\" && args[0].length < 512 && doc === document &&\\n\" + \n" + 
        "			\"		args[0].charAt(0) === \\\"<\\\" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		cacheable = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		cacheresults = jQuery.fragments[ args[0] ];\\n\" + \n" + 
        "			\"		if ( cacheresults && cacheresults !== 1 ) {\\n\" + \n" + 
        "			\"			fragment = cacheresults;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !fragment ) {\\n\" + \n" + 
        "			\"		fragment = doc.createDocumentFragment();\\n\" + \n" + 
        "			\"		jQuery.clean( args, doc, fragment, scripts );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( cacheable ) {\\n\" + \n" + 
        "			\"		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return { fragment: fragment, cacheable: cacheable };\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fragments = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each({\\n\" + \n" + 
        "			\"	appendTo: \\\"append\\\",\\n\" + \n" + 
        "			\"	prependTo: \\\"prepend\\\",\\n\" + \n" + 
        "			\"	insertBefore: \\\"before\\\",\\n\" + \n" + 
        "			\"	insertAfter: \\\"after\\\",\\n\" + \n" + 
        "			\"	replaceAll: \\\"replaceWith\\\"\\n\" + \n" + 
        "			\"}, function( name, original ) {\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( selector ) {\\n\" + \n" + 
        "			\"		var ret = [],\\n\" + \n" + 
        "			\"			insert = jQuery( selector ),\\n\" + \n" + 
        "			\"			parent = this.length === 1 && this[0].parentNode;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {\\n\" + \n" + 
        "			\"			insert[ original ]( this[0] );\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( var i = 0, l = insert.length; i < l; i++ ) {\\n\" + \n" + 
        "			\"				var elems = (i > 0 ? this.clone(true) : this).get();\\n\" + \n" + 
        "			\"				jQuery( insert[i] )[ original ]( elems );\\n\" + \n" + 
        "			\"				ret = ret.concat( elems );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this.pushStack( ret, name, insert.selector );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function getAll( elem ) {\\n\" + \n" + 
        "			\"	if ( \\\"getElementsByTagName\\\" in elem ) {\\n\" + \n" + 
        "			\"		return elem.getElementsByTagName( \\\"*\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else if ( \\\"querySelectorAll\\\" in elem ) {\\n\" + \n" + 
        "			\"		return elem.querySelectorAll( \\\"*\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Used in clean, fixes the defaultChecked property\\n\" + \n" + 
        "			\"function fixDefaultChecked( elem ) {\\n\" + \n" + 
        "			\"	if ( elem.type === \\\"checkbox\\\" || elem.type === \\\"radio\\\" ) {\\n\" + \n" + 
        "			\"		elem.defaultChecked = elem.checked;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"// Finds all inputs and passes them to fixDefaultChecked\\n\" + \n" + 
        "			\"function findInputs( elem ) {\\n\" + \n" + 
        "			\"	if ( jQuery.nodeName( elem, \\\"input\\\" ) ) {\\n\" + \n" + 
        "			\"		fixDefaultChecked( elem );\\n\" + \n" + 
        "			\"	} else if ( \\\"getElementsByTagName\\\" in elem ) {\\n\" + \n" + 
        "			\"		jQuery.grep( elem.getElementsByTagName(\\\"input\\\"), fixDefaultChecked );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	clone: function( elem, dataAndEvents, deepDataAndEvents ) {\\n\" + \n" + 
        "			\"		var clone = elem.cloneNode(true),\\n\" + \n" + 
        "			\"				srcElements,\\n\" + \n" + 
        "			\"				destElements,\\n\" + \n" + 
        "			\"				i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&\\n\" + \n" + 
        "			\"				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {\\n\" + \n" + 
        "			\"			// IE copies events bound via attachEvent when using cloneNode.\\n\" + \n" + 
        "			\"			// Calling detachEvent on the clone will also remove the events\\n\" + \n" + 
        "			\"			// from the original. In order to get around this, we use some\\n\" + \n" + 
        "			\"			// proprietary methods to clear the events. Thanks to MooTools\\n\" + \n" + 
        "			\"			// guys for this hotness.\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			cloneFixAttributes( elem, clone );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Using Sizzle here is crazy slow, so we use getElementsByTagName\\n\" + \n" + 
        "			\"			// instead\\n\" + \n" + 
        "			\"			srcElements = getAll( elem );\\n\" + \n" + 
        "			\"			destElements = getAll( clone );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Weird iteration because IE will replace the length property\\n\" + \n" + 
        "			\"			// with an element if you are cloning the body and one of the\\n\" + \n" + 
        "			\"			// elements on the page has a name or id of \\\"length\\\"\\n\" + \n" + 
        "			\"			for ( i = 0; srcElements[i]; ++i ) {\\n\" + \n" + 
        "			\"				// Ensure that the destination node is not null; Fixes #9587\\n\" + \n" + 
        "			\"				if ( destElements[i] ) {\\n\" + \n" + 
        "			\"					cloneFixAttributes( srcElements[i], destElements[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Copy the events from the original to the clone\\n\" + \n" + 
        "			\"		if ( dataAndEvents ) {\\n\" + \n" + 
        "			\"			cloneCopyEvent( elem, clone );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( deepDataAndEvents ) {\\n\" + \n" + 
        "			\"				srcElements = getAll( elem );\\n\" + \n" + 
        "			\"				destElements = getAll( clone );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( i = 0; srcElements[i]; ++i ) {\\n\" + \n" + 
        "			\"					cloneCopyEvent( srcElements[i], destElements[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		srcElements = destElements = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Return the cloned set\\n\" + \n" + 
        "			\"		return clone;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	clean: function( elems, context, fragment, scripts ) {\\n\" + \n" + 
        "			\"		var checkScriptType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		context = context || document;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// !context.createElement fails in IE with an error but returns typeof 'object'\\n\" + \n" + 
        "			\"		if ( typeof context.createElement === \\\"undefined\\\" ) {\\n\" + \n" + 
        "			\"			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var ret = [], j;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"			if ( typeof elem === \\\"number\\\" ) {\\n\" + \n" + 
        "			\"				elem += \\\"\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !elem ) {\\n\" + \n" + 
        "			\"				continue;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Convert html string into DOM nodes\\n\" + \n" + 
        "			\"			if ( typeof elem === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"				if ( !rhtml.test( elem ) ) {\\n\" + \n" + 
        "			\"					elem = context.createTextNode( elem );\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					// Fix \\\"XHTML\\\"-style tags in all browsers\\n\" + \n" + 
        "			\"					elem = elem.replace(rxhtmlTag, \\\"<$1></$2>\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Trim whitespace, otherwise indexOf won't work as expected\\n\" + \n" + 
        "			\"					var tag = (rtagName.exec( elem ) || [\\\"\\\", \\\"\\\"])[1].toLowerCase(),\\n\" + \n" + 
        "			\"						wrap = wrapMap[ tag ] || wrapMap._default,\\n\" + \n" + 
        "			\"						depth = wrap[0],\\n\" + \n" + 
        "			\"						div = context.createElement(\\\"div\\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Go to html and back, then peel off extra wrappers\\n\" + \n" + 
        "			\"					div.innerHTML = wrap[1] + elem + wrap[2];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Move to the right depth\\n\" + \n" + 
        "			\"					while ( depth-- ) {\\n\" + \n" + 
        "			\"						div = div.lastChild;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Remove IE's autoinserted <tbody> from table fragments\\n\" + \n" + 
        "			\"					if ( !jQuery.support.tbody ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// String was a <table>, *may* have spurious <tbody>\\n\" + \n" + 
        "			\"						var hasBody = rtbody.test(elem),\\n\" + \n" + 
        "			\"							tbody = tag === \\\"table\\\" && !hasBody ?\\n\" + \n" + 
        "			\"								div.firstChild && div.firstChild.childNodes :\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"								// String was a bare <thead> or <tfoot>\\n\" + \n" + 
        "			\"								wrap[1] === \\\"<table>\\\" && !hasBody ?\\n\" + \n" + 
        "			\"									div.childNodes :\\n\" + \n" + 
        "			\"									[];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						for ( j = tbody.length - 1; j >= 0 ; --j ) {\\n\" + \n" + 
        "			\"							if ( jQuery.nodeName( tbody[ j ], \\\"tbody\\\" ) && !tbody[ j ].childNodes.length ) {\\n\" + \n" + 
        "			\"								tbody[ j ].parentNode.removeChild( tbody[ j ] );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// IE completely kills leading whitespace when innerHTML is used\\n\" + \n" + 
        "			\"					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {\\n\" + \n" + 
        "			\"						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					elem = div.childNodes;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Resets defaultChecked for any radios and checkboxes\\n\" + \n" + 
        "			\"			// about to be appended to the DOM in IE 6/7 (#8060)\\n\" + \n" + 
        "			\"			var len;\\n\" + \n" + 
        "			\"			if ( !jQuery.support.appendChecked ) {\\n\" + \n" + 
        "			\"				if ( elem[0] && typeof (len = elem.length) === \\\"number\\\" ) {\\n\" + \n" + 
        "			\"					for ( j = 0; j < len; j++ ) {\\n\" + \n" + 
        "			\"						findInputs( elem[j] );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					findInputs( elem );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( elem.nodeType ) {\\n\" + \n" + 
        "			\"				ret.push( elem );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				ret = jQuery.merge( ret, elem );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( fragment ) {\\n\" + \n" + 
        "			\"			checkScriptType = function( elem ) {\\n\" + \n" + 
        "			\"				return !elem.type || rscriptType.test( elem.type );\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"			for ( i = 0; ret[i]; i++ ) {\\n\" + \n" + 
        "			\"				if ( scripts && jQuery.nodeName( ret[i], \\\"script\\\" ) && (!ret[i].type || ret[i].type.toLowerCase() === \\\"text/javascript\\\") ) {\\n\" + \n" + 
        "			\"					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					if ( ret[i].nodeType === 1 ) {\\n\" + \n" + 
        "			\"						var jsTags = jQuery.grep( ret[i].getElementsByTagName( \\\"script\\\" ), checkScriptType );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					fragment.appendChild( ret[i] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	cleanData: function( elems ) {\\n\" + \n" + 
        "			\"		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,\\n\" + \n" + 
        "			\"			deleteExpando = jQuery.support.deleteExpando;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {\\n\" + \n" + 
        "			\"			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {\\n\" + \n" + 
        "			\"				continue;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			id = elem[ jQuery.expando ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( id ) {\\n\" + \n" + 
        "			\"				data = cache[ id ] && cache[ id ][ internalKey ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( data && data.events ) {\\n\" + \n" + 
        "			\"					for ( var type in data.events ) {\\n\" + \n" + 
        "			\"						if ( special[ type ] ) {\\n\" + \n" + 
        "			\"							jQuery.event.remove( elem, type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// This is a shortcut to avoid jQuery.event.remove's overhead\\n\" + \n" + 
        "			\"						} else {\\n\" + \n" + 
        "			\"							jQuery.removeEvent( elem, type, data.handle );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Null the DOM reference to avoid IE6/7/8 leak (#7054)\\n\" + \n" + 
        "			\"					if ( data.handle ) {\\n\" + \n" + 
        "			\"						data.handle.elem = null;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( deleteExpando ) {\\n\" + \n" + 
        "			\"					delete elem[ jQuery.expando ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else if ( elem.removeAttribute ) {\\n\" + \n" + 
        "			\"					elem.removeAttribute( jQuery.expando );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				delete cache[ id ];\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function evalScript( i, elem ) {\\n\" + \n" + 
        "			\"	if ( elem.src ) {\\n\" + \n" + 
        "			\"		jQuery.ajax({\\n\" + \n" + 
        "			\"			url: elem.src,\\n\" + \n" + 
        "			\"			async: false,\\n\" + \n" + 
        "			\"			dataType: \\\"script\\\"\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || \\\"\\\" ).replace( rcleanScript, \\\"/*$0*/\\\" ) );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( elem.parentNode ) {\\n\" + \n" + 
        "			\"		elem.parentNode.removeChild( elem );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var ralpha = /alpha\\\\([^)]*\\\\)/i,\\n\" + \n" + 
        "			\"	ropacity = /opacity=([^)]*)/,\\n\" + \n" + 
        "			\"	// fixed for IE9, see #8346\\n\" + \n" + 
        "			\"	rupper = /([A-Z]|^ms)/g,\\n\" + \n" + 
        "			\"	rnumpx = /^-?\\\\d+(?:px)?$/i,\\n\" + \n" + 
        "			\"	rnum = /^-?\\\\d/,\\n\" + \n" + 
        "			\"	rrelNum = /^([\\\\-+])=([\\\\-+.\\\\de]+)/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	cssShow = { position: \\\"absolute\\\", visibility: \\\"hidden\\\", display: \\\"block\\\" },\\n\" + \n" + 
        "			\"	cssWidth = [ \\\"Left\\\", \\\"Right\\\" ],\\n\" + \n" + 
        "			\"	cssHeight = [ \\\"Top\\\", \\\"Bottom\\\" ],\\n\" + \n" + 
        "			\"	curCSS,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	getComputedStyle,\\n\" + \n" + 
        "			\"	currentStyle;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.css = function( name, value ) {\\n\" + \n" + 
        "			\"	// Setting 'undefined' is a no-op\\n\" + \n" + 
        "			\"	if ( arguments.length === 2 && value === undefined ) {\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return jQuery.access( this, name, value, true, function( elem, name, value ) {\\n\" + \n" + 
        "			\"		return value !== undefined ?\\n\" + \n" + 
        "			\"			jQuery.style( elem, name, value ) :\\n\" + \n" + 
        "			\"			jQuery.css( elem, name );\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	// Add in style property hooks for overriding the default\\n\" + \n" + 
        "			\"	// behavior of getting and setting a style property\\n\" + \n" + 
        "			\"	cssHooks: {\\n\" + \n" + 
        "			\"		opacity: {\\n\" + \n" + 
        "			\"			get: function( elem, computed ) {\\n\" + \n" + 
        "			\"				if ( computed ) {\\n\" + \n" + 
        "			\"					// We should always get a number back from opacity\\n\" + \n" + 
        "			\"					var ret = curCSS( elem, \\\"opacity\\\", \\\"opacity\\\" );\\n\" + \n" + 
        "			\"					return ret === \\\"\\\" ? \\\"1\\\" : ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					return elem.style.opacity;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Exclude the following css properties to add px\\n\" + \n" + 
        "			\"	cssNumber: {\\n\" + \n" + 
        "			\"		\\\"fillOpacity\\\": true,\\n\" + \n" + 
        "			\"		\\\"fontWeight\\\": true,\\n\" + \n" + 
        "			\"		\\\"lineHeight\\\": true,\\n\" + \n" + 
        "			\"		\\\"opacity\\\": true,\\n\" + \n" + 
        "			\"		\\\"orphans\\\": true,\\n\" + \n" + 
        "			\"		\\\"widows\\\": true,\\n\" + \n" + 
        "			\"		\\\"zIndex\\\": true,\\n\" + \n" + 
        "			\"		\\\"zoom\\\": true\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Add in properties whose names you wish to fix before\\n\" + \n" + 
        "			\"	// setting or getting the value\\n\" + \n" + 
        "			\"	cssProps: {\\n\" + \n" + 
        "			\"		// normalize float css property\\n\" + \n" + 
        "			\"		\\\"float\\\": jQuery.support.cssFloat ? \\\"cssFloat\\\" : \\\"styleFloat\\\"\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get and set the style property on a DOM Node\\n\" + \n" + 
        "			\"	style: function( elem, name, value, extra ) {\\n\" + \n" + 
        "			\"		// Don't set styles on text and comment nodes\\n\" + \n" + 
        "			\"		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that we're working with the right name\\n\" + \n" + 
        "			\"		var ret, type, origName = jQuery.camelCase( name ),\\n\" + \n" + 
        "			\"			style = elem.style, hooks = jQuery.cssHooks[ origName ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		name = jQuery.cssProps[ origName ] || origName;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Check if we're setting a value\\n\" + \n" + 
        "			\"		if ( value !== undefined ) {\\n\" + \n" + 
        "			\"			type = typeof value;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// convert relative number strings (+= or -=) to relative numbers. #7345\\n\" + \n" + 
        "			\"			if ( type === \\\"string\\\" && (ret = rrelNum.exec( value )) ) {\\n\" + \n" + 
        "			\"				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );\\n\" + \n" + 
        "			\"				// Fixes bug #9237\\n\" + \n" + 
        "			\"				type = \\\"number\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Make sure that NaN and null values aren't set. See: #7116\\n\" + \n" + 
        "			\"			if ( value == null || type === \\\"number\\\" && isNaN( value ) ) {\\n\" + \n" + 
        "			\"				return;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If a number was passed in, add 'px' to the (except for certain CSS properties)\\n\" + \n" + 
        "			\"			if ( type === \\\"number\\\" && !jQuery.cssNumber[ origName ] ) {\\n\" + \n" + 
        "			\"				value += \\\"px\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If a hook was provided, use that value, otherwise just set the specified value\\n\" + \n" + 
        "			\"			if ( !hooks || !(\\\"set\\\" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {\\n\" + \n" + 
        "			\"				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided\\n\" + \n" + 
        "			\"				// Fixes bug #5509\\n\" + \n" + 
        "			\"				try {\\n\" + \n" + 
        "			\"					style[ name ] = value;\\n\" + \n" + 
        "			\"				} catch(e) {}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			// If a hook was provided get the non-computed value from there\\n\" + \n" + 
        "			\"			if ( hooks && \\\"get\\\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {\\n\" + \n" + 
        "			\"				return ret;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Otherwise just get the value from the style object\\n\" + \n" + 
        "			\"			return style[ name ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	css: function( elem, name, extra ) {\\n\" + \n" + 
        "			\"		var ret, hooks;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure that we're working with the right name\\n\" + \n" + 
        "			\"		name = jQuery.camelCase( name );\\n\" + \n" + 
        "			\"		hooks = jQuery.cssHooks[ name ];\\n\" + \n" + 
        "			\"		name = jQuery.cssProps[ name ] || name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// cssFloat needs a special treatment\\n\" + \n" + 
        "			\"		if ( name === \\\"cssFloat\\\" ) {\\n\" + \n" + 
        "			\"			name = \\\"float\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If a hook was provided get the computed value from there\\n\" + \n" + 
        "			\"		if ( hooks && \\\"get\\\" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {\\n\" + \n" + 
        "			\"			return ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Otherwise, if a way to get the computed value exists, use that\\n\" + \n" + 
        "			\"		} else if ( curCSS ) {\\n\" + \n" + 
        "			\"			return curCSS( elem, name );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// A method for quickly swapping in/out CSS properties to get correct calculations\\n\" + \n" + 
        "			\"	swap: function( elem, options, callback ) {\\n\" + \n" + 
        "			\"		var old = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Remember the old values, and insert the new ones\\n\" + \n" + 
        "			\"		for ( var name in options ) {\\n\" + \n" + 
        "			\"			old[ name ] = elem.style[ name ];\\n\" + \n" + 
        "			\"			elem.style[ name ] = options[ name ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		callback.call( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Revert the old values\\n\" + \n" + 
        "			\"		for ( name in options ) {\\n\" + \n" + 
        "			\"			elem.style[ name ] = old[ name ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// DEPRECATED, Use jQuery.css() instead\\n\" + \n" + 
        "			\"jQuery.curCSS = jQuery.css;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each([\\\"height\\\", \\\"width\\\"], function( i, name ) {\\n\" + \n" + 
        "			\"	jQuery.cssHooks[ name ] = {\\n\" + \n" + 
        "			\"		get: function( elem, computed, extra ) {\\n\" + \n" + 
        "			\"			var val;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( computed ) {\\n\" + \n" + 
        "			\"				if ( elem.offsetWidth !== 0 ) {\\n\" + \n" + 
        "			\"					return getWH( elem, name, extra );\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					jQuery.swap( elem, cssShow, function() {\\n\" + \n" + 
        "			\"						val = getWH( elem, name, extra );\\n\" + \n" + 
        "			\"					});\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				return val;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		set: function( elem, value ) {\\n\" + \n" + 
        "			\"			if ( rnumpx.test( value ) ) {\\n\" + \n" + 
        "			\"				// ignore negative width and height values #1599\\n\" + \n" + 
        "			\"				value = parseFloat( value );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( value >= 0 ) {\\n\" + \n" + 
        "			\"					return value + \\\"px\\\";\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				return value;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( !jQuery.support.opacity ) {\\n\" + \n" + 
        "			\"	jQuery.cssHooks.opacity = {\\n\" + \n" + 
        "			\"		get: function( elem, computed ) {\\n\" + \n" + 
        "			\"			// IE uses filters for opacity\\n\" + \n" + 
        "			\"			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || \\\"\\\" ) ?\\n\" + \n" + 
        "			\"				( parseFloat( RegExp.$1 ) / 100 ) + \\\"\\\" :\\n\" + \n" + 
        "			\"				computed ? \\\"1\\\" : \\\"\\\";\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		set: function( elem, value ) {\\n\" + \n" + 
        "			\"			var style = elem.style,\\n\" + \n" + 
        "			\"				currentStyle = elem.currentStyle,\\n\" + \n" + 
        "			\"				opacity = jQuery.isNaN( value ) ? \\\"\\\" : \\\"alpha(opacity=\\\" + value * 100 + \\\")\\\",\\n\" + \n" + 
        "			\"				filter = currentStyle && currentStyle.filter || style.filter || \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// IE has trouble with opacity if it does not have layout\\n\" + \n" + 
        "			\"			// Force it by setting the zoom level\\n\" + \n" + 
        "			\"			style.zoom = 1;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652\\n\" + \n" + 
        "			\"			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, \\\"\\\" ) ) === \\\"\\\" ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Setting style.filter to null, \\\"\\\" & \\\" \\\" still leave \\\"filter:\\\" in the cssText\\n\" + \n" + 
        "			\"				// if \\\"filter:\\\" is present at all, clearType is disabled, we want to avoid this\\n\" + \n" + 
        "			\"				// style.removeAttribute is IE Only, but so apparently is this code path...\\n\" + \n" + 
        "			\"				style.removeAttribute( \\\"filter\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// if there there is no filter style applied in a css rule, we are done\\n\" + \n" + 
        "			\"				if ( currentStyle && !currentStyle.filter ) {\\n\" + \n" + 
        "			\"					return;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// otherwise, set new filter values\\n\" + \n" + 
        "			\"			style.filter = ralpha.test( filter ) ?\\n\" + \n" + 
        "			\"				filter.replace( ralpha, opacity ) :\\n\" + \n" + 
        "			\"				filter + \\\" \\\" + opacity;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery(function() {\\n\" + \n" + 
        "			\"	// This hook cannot be added until DOM ready because the support test\\n\" + \n" + 
        "			\"	// for it is not run until after DOM ready\\n\" + \n" + 
        "			\"	if ( !jQuery.support.reliableMarginRight ) {\\n\" + \n" + 
        "			\"		jQuery.cssHooks.marginRight = {\\n\" + \n" + 
        "			\"			get: function( elem, computed ) {\\n\" + \n" + 
        "			\"				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\\n\" + \n" + 
        "			\"				// Work around by temporarily setting element display to inline-block\\n\" + \n" + 
        "			\"				var ret;\\n\" + \n" + 
        "			\"				jQuery.swap( elem, { \\\"display\\\": \\\"inline-block\\\" }, function() {\\n\" + \n" + 
        "			\"					if ( computed ) {\\n\" + \n" + 
        "			\"						ret = curCSS( elem, \\\"margin-right\\\", \\\"marginRight\\\" );\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						ret = elem.style.marginRight;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				});\\n\" + \n" + 
        "			\"				return ret;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( document.defaultView && document.defaultView.getComputedStyle ) {\\n\" + \n" + 
        "			\"	getComputedStyle = function( elem, name ) {\\n\" + \n" + 
        "			\"		var ret, defaultView, computedStyle;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		name = name.replace( rupper, \\\"-$1\\\" ).toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !(defaultView = elem.ownerDocument.defaultView) ) {\\n\" + \n" + 
        "			\"			return undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {\\n\" + \n" + 
        "			\"			ret = computedStyle.getPropertyValue( name );\\n\" + \n" + 
        "			\"			if ( ret === \\\"\\\" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {\\n\" + \n" + 
        "			\"				ret = jQuery.style( elem, name );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( document.documentElement.currentStyle ) {\\n\" + \n" + 
        "			\"	currentStyle = function( elem, name ) {\\n\" + \n" + 
        "			\"		var left,\\n\" + \n" + 
        "			\"			ret = elem.currentStyle && elem.currentStyle[ name ],\\n\" + \n" + 
        "			\"			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],\\n\" + \n" + 
        "			\"			style = elem.style;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// From the awesome hack by Dean Edwards\\n\" + \n" + 
        "			\"		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If we're not dealing with a regular pixel number\\n\" + \n" + 
        "			\"		// but a number that has a weird ending, we need to convert it to pixels\\n\" + \n" + 
        "			\"		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {\\n\" + \n" + 
        "			\"			// Remember the original values\\n\" + \n" + 
        "			\"			left = style.left;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Put in the new values to get a computed value out\\n\" + \n" + 
        "			\"			if ( rsLeft ) {\\n\" + \n" + 
        "			\"				elem.runtimeStyle.left = elem.currentStyle.left;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			style.left = name === \\\"fontSize\\\" ? \\\"1em\\\" : (ret || 0);\\n\" + \n" + 
        "			\"			ret = style.pixelLeft + \\\"px\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Revert the changed values\\n\" + \n" + 
        "			\"			style.left = left;\\n\" + \n" + 
        "			\"			if ( rsLeft ) {\\n\" + \n" + 
        "			\"				elem.runtimeStyle.left = rsLeft;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret === \\\"\\\" ? \\\"auto\\\" : ret;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"curCSS = getComputedStyle || currentStyle;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function getWH( elem, name, extra ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Start with offset property\\n\" + \n" + 
        "			\"	var val = name === \\\"width\\\" ? elem.offsetWidth : elem.offsetHeight,\\n\" + \n" + 
        "			\"		which = name === \\\"width\\\" ? cssWidth : cssHeight;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( val > 0 ) {\\n\" + \n" + 
        "			\"		if ( extra !== \\\"border\\\" ) {\\n\" + \n" + 
        "			\"			jQuery.each( which, function() {\\n\" + \n" + 
        "			\"				if ( !extra ) {\\n\" + \n" + 
        "			\"					val -= parseFloat( jQuery.css( elem, \\\"padding\\\" + this ) ) || 0;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				if ( extra === \\\"margin\\\" ) {\\n\" + \n" + 
        "			\"					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					val -= parseFloat( jQuery.css( elem, \\\"border\\\" + this + \\\"Width\\\" ) ) || 0;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return val + \\\"px\\\";\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Fall back to computed then uncomputed css if necessary\\n\" + \n" + 
        "			\"	val = curCSS( elem, name, name );\\n\" + \n" + 
        "			\"	if ( val < 0 || val == null ) {\\n\" + \n" + 
        "			\"		val = elem.style[ name ] || 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	// Normalize \\\"\\\", auto, and prepare for extra\\n\" + \n" + 
        "			\"	val = parseFloat( val ) || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Add padding, border, margin\\n\" + \n" + 
        "			\"	if ( extra ) {\\n\" + \n" + 
        "			\"		jQuery.each( which, function() {\\n\" + \n" + 
        "			\"			val += parseFloat( jQuery.css( elem, \\\"padding\\\" + this ) ) || 0;\\n\" + \n" + 
        "			\"			if ( extra !== \\\"padding\\\" ) {\\n\" + \n" + 
        "			\"				val += parseFloat( jQuery.css( elem, \\\"border\\\" + this + \\\"Width\\\" ) ) || 0;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( extra === \\\"margin\\\" ) {\\n\" + \n" + 
        "			\"				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return val + \\\"px\\\";\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( jQuery.expr && jQuery.expr.filters ) {\\n\" + \n" + 
        "			\"	jQuery.expr.filters.hidden = function( elem ) {\\n\" + \n" + 
        "			\"		var width = elem.offsetWidth,\\n\" + \n" + 
        "			\"			height = elem.offsetHeight;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, \\\"display\\\" )) === \\\"none\\\");\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.expr.filters.visible = function( elem ) {\\n\" + \n" + 
        "			\"		return !jQuery.expr.filters.hidden( elem );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var r20 = /%20/g,\\n\" + \n" + 
        "			\"	rbracket = /\\\\[\\\\]$/,\\n\" + \n" + 
        "			\"	rCRLF = /\\\\r?\\\\n/g,\\n\" + \n" + 
        "			\"	rhash = /#.*$/,\\n\" + \n" + 
        "			\"	rheaders = /^(.*?):[ \\\\t]*([^\\\\r\\\\n]*)\\\\r?$/mg, // IE leaves an \\\\r character at EOL\\n\" + \n" + 
        "			\"	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,\\n\" + \n" + 
        "			\"	// #7653, #8125, #8152: local protocol detection\\n\" + \n" + 
        "			\"	rlocalProtocol = /^(?:about|app|app\\\\-storage|.+\\\\-extension|file|res|widget):$/,\\n\" + \n" + 
        "			\"	rnoContent = /^(?:GET|HEAD)$/,\\n\" + \n" + 
        "			\"	rprotocol = /^\\\\/\\\\//,\\n\" + \n" + 
        "			\"	rquery = /\\\\?/,\\n\" + \n" + 
        "			\"	rscript = /<script\\\\b[^<]*(?:(?!<\\\\/script>)<[^<]*)*<\\\\/script>/gi,\\n\" + \n" + 
        "			\"	rselectTextarea = /^(?:select|textarea)/i,\\n\" + \n" + 
        "			\"	rspacesAjax = /\\\\s+/,\\n\" + \n" + 
        "			\"	rts = /([?&])_=[^&]*/,\\n\" + \n" + 
        "			\"	rurl = /^([\\\\w\\\\+\\\\.\\\\-]+:)(?:\\\\/\\\\/([^\\\\/?#:]*)(?::(\\\\d+))?)?/,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Keep a copy of the old load method\\n\" + \n" + 
        "			\"	_load = jQuery.fn.load,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* Prefilters\\n\" + \n" + 
        "			\"	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\\n\" + \n" + 
        "			\"	 * 2) These are called:\\n\" + \n" + 
        "			\"	 *    - BEFORE asking for a transport\\n\" + \n" + 
        "			\"	 *    - AFTER param serialization (s.data is a string if s.processData is true)\\n\" + \n" + 
        "			\"	 * 3) key is the dataType\\n\" + \n" + 
        "			\"	 * 4) the catchall symbol \\\"*\\\" can be used\\n\" + \n" + 
        "			\"	 * 5) execution will start with transport dataType and THEN continue down to \\\"*\\\" if needed\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	prefilters = {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* Transports bindings\\n\" + \n" + 
        "			\"	 * 1) key is the dataType\\n\" + \n" + 
        "			\"	 * 2) the catchall symbol \\\"*\\\" can be used\\n\" + \n" + 
        "			\"	 * 3) selection will start with transport dataType and THEN go to \\\"*\\\" if needed\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	transports = {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Document location\\n\" + \n" + 
        "			\"	ajaxLocation,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Document location segments\\n\" + \n" + 
        "			\"	ajaxLocParts,\\n\" + \n" + 
        "			\"	\\n\" + \n" + 
        "			\"	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\\n\" + \n" + 
        "			\"	allTypes = [\\\"*/\\\"] + [\\\"*\\\"];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// #8138, IE may throw an exception when accessing\\n\" + \n" + 
        "			\"// a field from window.location if document.domain has been set\\n\" + \n" + 
        "			\"try {\\n\" + \n" + 
        "			\"	ajaxLocation = location.href;\\n\" + \n" + 
        "			\"} catch( e ) {\\n\" + \n" + 
        "			\"	// Use the href attribute of an A element\\n\" + \n" + 
        "			\"	// since IE will modify it given document.location\\n\" + \n" + 
        "			\"	ajaxLocation = document.createElement( \\\"a\\\" );\\n\" + \n" + 
        "			\"	ajaxLocation.href = \\\"\\\";\\n\" + \n" + 
        "			\"	ajaxLocation = ajaxLocation.href;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Segment location into parts\\n\" + \n" + 
        "			\"ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Base \\\"constructor\\\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\\n\" + \n" + 
        "			\"function addToPrefiltersOrTransports( structure ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// dataTypeExpression is optional and defaults to \\\"*\\\"\\n\" + \n" + 
        "			\"	return function( dataTypeExpression, func ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof dataTypeExpression !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			func = dataTypeExpression;\\n\" + \n" + 
        "			\"			dataTypeExpression = \\\"*\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( func ) ) {\\n\" + \n" + 
        "			\"			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),\\n\" + \n" + 
        "			\"				i = 0,\\n\" + \n" + 
        "			\"				length = dataTypes.length,\\n\" + \n" + 
        "			\"				dataType,\\n\" + \n" + 
        "			\"				list,\\n\" + \n" + 
        "			\"				placeBefore;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// For each dataType in the dataTypeExpression\\n\" + \n" + 
        "			\"			for(; i < length; i++ ) {\\n\" + \n" + 
        "			\"				dataType = dataTypes[ i ];\\n\" + \n" + 
        "			\"				// We control if we're asked to add before\\n\" + \n" + 
        "			\"				// any existing element\\n\" + \n" + 
        "			\"				placeBefore = /^\\\\+/.test( dataType );\\n\" + \n" + 
        "			\"				if ( placeBefore ) {\\n\" + \n" + 
        "			\"					dataType = dataType.substr( 1 ) || \\\"*\\\";\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				list = structure[ dataType ] = structure[ dataType ] || [];\\n\" + \n" + 
        "			\"				// then we add to the structure accordingly\\n\" + \n" + 
        "			\"				list[ placeBefore ? \\\"unshift\\\" : \\\"push\\\" ]( func );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Base inspection function for prefilters and transports\\n\" + \n" + 
        "			\"function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,\\n\" + \n" + 
        "			\"		dataType /* internal */, inspected /* internal */ ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	dataType = dataType || options.dataTypes[ 0 ];\\n\" + \n" + 
        "			\"	inspected = inspected || {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	inspected[ dataType ] = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var list = structure[ dataType ],\\n\" + \n" + 
        "			\"		i = 0,\\n\" + \n" + 
        "			\"		length = list ? list.length : 0,\\n\" + \n" + 
        "			\"		executeOnly = ( structure === prefilters ),\\n\" + \n" + 
        "			\"		selection;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for(; i < length && ( executeOnly || !selection ); i++ ) {\\n\" + \n" + 
        "			\"		selection = list[ i ]( options, originalOptions, jqXHR );\\n\" + \n" + 
        "			\"		// If we got redirected to another dataType\\n\" + \n" + 
        "			\"		// we try there if executing only and not done already\\n\" + \n" + 
        "			\"		if ( typeof selection === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			if ( !executeOnly || inspected[ selection ] ) {\\n\" + \n" + 
        "			\"				selection = undefined;\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				options.dataTypes.unshift( selection );\\n\" + \n" + 
        "			\"				selection = inspectPrefiltersOrTransports(\\n\" + \n" + 
        "			\"						structure, options, originalOptions, jqXHR, selection, inspected );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	// If we're only executing or nothing was selected\\n\" + \n" + 
        "			\"	// we try the catchall dataType if not done already\\n\" + \n" + 
        "			\"	if ( ( executeOnly || !selection ) && !inspected[ \\\"*\\\" ] ) {\\n\" + \n" + 
        "			\"		selection = inspectPrefiltersOrTransports(\\n\" + \n" + 
        "			\"				structure, options, originalOptions, jqXHR, \\\"*\\\", inspected );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	// unnecessary when only executing (prefilters)\\n\" + \n" + 
        "			\"	// but it'll be ignored by the caller in that case\\n\" + \n" + 
        "			\"	return selection;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// A special extend for ajax options\\n\" + \n" + 
        "			\"// that takes \\\"flat\\\" options (not to be deep extended)\\n\" + \n" + 
        "			\"// Fixes #9887\\n\" + \n" + 
        "			\"function ajaxExtend( target, src ) {\\n\" + \n" + 
        "			\"	var key, deep,\\n\" + \n" + 
        "			\"		flatOptions = jQuery.ajaxSettings.flatOptions || {};\\n\" + \n" + 
        "			\"	for( key in src ) {\\n\" + \n" + 
        "			\"		if ( src[ key ] !== undefined ) {\\n\" + \n" + 
        "			\"			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	if ( deep ) {\\n\" + \n" + 
        "			\"		jQuery.extend( true, target, deep );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	load: function( url, params, callback ) {\\n\" + \n" + 
        "			\"		if ( typeof url !== \\\"string\\\" && _load ) {\\n\" + \n" + 
        "			\"			return _load.apply( this, arguments );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Don't do a request if no elements are being requested\\n\" + \n" + 
        "			\"		} else if ( !this.length ) {\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var off = url.indexOf( \\\" \\\" );\\n\" + \n" + 
        "			\"		if ( off >= 0 ) {\\n\" + \n" + 
        "			\"			var selector = url.slice( off, url.length );\\n\" + \n" + 
        "			\"			url = url.slice( 0, off );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Default to a GET request\\n\" + \n" + 
        "			\"		var type = \\\"GET\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If the second parameter was provided\\n\" + \n" + 
        "			\"		if ( params ) {\\n\" + \n" + 
        "			\"			// If it's a function\\n\" + \n" + 
        "			\"			if ( jQuery.isFunction( params ) ) {\\n\" + \n" + 
        "			\"				// We assume that it's the callback\\n\" + \n" + 
        "			\"				callback = params;\\n\" + \n" + 
        "			\"				params = undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Otherwise, build a param string\\n\" + \n" + 
        "			\"			} else if ( typeof params === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"				params = jQuery.param( params, jQuery.ajaxSettings.traditional );\\n\" + \n" + 
        "			\"				type = \\\"POST\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var self = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Request the remote document\\n\" + \n" + 
        "			\"		jQuery.ajax({\\n\" + \n" + 
        "			\"			url: url,\\n\" + \n" + 
        "			\"			type: type,\\n\" + \n" + 
        "			\"			dataType: \\\"html\\\",\\n\" + \n" + 
        "			\"			data: params,\\n\" + \n" + 
        "			\"			// Complete callback (responseText is used internally)\\n\" + \n" + 
        "			\"			complete: function( jqXHR, status, responseText ) {\\n\" + \n" + 
        "			\"				// Store the response as specified by the jqXHR object\\n\" + \n" + 
        "			\"				responseText = jqXHR.responseText;\\n\" + \n" + 
        "			\"				// If successful, inject the HTML into all the matched elements\\n\" + \n" + 
        "			\"				if ( jqXHR.isResolved() ) {\\n\" + \n" + 
        "			\"					// #4825: Get the actual response in case\\n\" + \n" + 
        "			\"					// a dataFilter is present in ajaxSettings\\n\" + \n" + 
        "			\"					jqXHR.done(function( r ) {\\n\" + \n" + 
        "			\"						responseText = r;\\n\" + \n" + 
        "			\"					});\\n\" + \n" + 
        "			\"					// See if a selector was specified\\n\" + \n" + 
        "			\"					self.html( selector ?\\n\" + \n" + 
        "			\"						// Create a dummy div to hold the results\\n\" + \n" + 
        "			\"						jQuery(\\\"<div>\\\")\\n\" + \n" + 
        "			\"							// inject the contents of the document in, removing the scripts\\n\" + \n" + 
        "			\"							// to avoid any 'Permission Denied' errors in IE\\n\" + \n" + 
        "			\"							.append(responseText.replace(rscript, \\\"\\\"))\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							// Locate the specified elements\\n\" + \n" + 
        "			\"							.find(selector) :\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// If not, just inject the full result\\n\" + \n" + 
        "			\"						responseText );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( callback ) {\\n\" + \n" + 
        "			\"					self.each( callback, [ responseText, status, jqXHR ] );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	serialize: function() {\\n\" + \n" + 
        "			\"		return jQuery.param( this.serializeArray() );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	serializeArray: function() {\\n\" + \n" + 
        "			\"		return this.map(function(){\\n\" + \n" + 
        "			\"			return this.elements ? jQuery.makeArray( this.elements ) : this;\\n\" + \n" + 
        "			\"		})\\n\" + \n" + 
        "			\"		.filter(function(){\\n\" + \n" + 
        "			\"			return this.name && !this.disabled &&\\n\" + \n" + 
        "			\"				( this.checked || rselectTextarea.test( this.nodeName ) ||\\n\" + \n" + 
        "			\"					rinput.test( this.type ) );\\n\" + \n" + 
        "			\"		})\\n\" + \n" + 
        "			\"		.map(function( i, elem ){\\n\" + \n" + 
        "			\"			var val = jQuery( this ).val();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return val == null ?\\n\" + \n" + 
        "			\"				null :\\n\" + \n" + 
        "			\"				jQuery.isArray( val ) ?\\n\" + \n" + 
        "			\"					jQuery.map( val, function( val, i ){\\n\" + \n" + 
        "			\"						return { name: elem.name, value: val.replace( rCRLF, \\\"\\\\r\\\\n\\\" ) };\\n\" + \n" + 
        "			\"					}) :\\n\" + \n" + 
        "			\"					{ name: elem.name, value: val.replace( rCRLF, \\\"\\\\r\\\\n\\\" ) };\\n\" + \n" + 
        "			\"		}).get();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Attach a bunch of functions for handling common AJAX events\\n\" + \n" + 
        "			\"jQuery.each( \\\"ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend\\\".split( \\\" \\\" ), function( i, o ){\\n\" + \n" + 
        "			\"	jQuery.fn[ o ] = function( f ){\\n\" + \n" + 
        "			\"		return this.bind( o, f );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.each( [ \\\"get\\\", \\\"post\\\" ], function( i, method ) {\\n\" + \n" + 
        "			\"	jQuery[ method ] = function( url, data, callback, type ) {\\n\" + \n" + 
        "			\"		// shift arguments if data argument was omitted\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( data ) ) {\\n\" + \n" + 
        "			\"			type = type || callback;\\n\" + \n" + 
        "			\"			callback = data;\\n\" + \n" + 
        "			\"			data = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return jQuery.ajax({\\n\" + \n" + 
        "			\"			type: method,\\n\" + \n" + 
        "			\"			url: url,\\n\" + \n" + 
        "			\"			data: data,\\n\" + \n" + 
        "			\"			success: callback,\\n\" + \n" + 
        "			\"			dataType: type\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	getScript: function( url, callback ) {\\n\" + \n" + 
        "			\"		return jQuery.get( url, undefined, callback, \\\"script\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	getJSON: function( url, data, callback ) {\\n\" + \n" + 
        "			\"		return jQuery.get( url, data, callback, \\\"json\\\" );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Creates a full fledged settings object into target\\n\" + \n" + 
        "			\"	// with both ajaxSettings and settings fields.\\n\" + \n" + 
        "			\"	// If target is omitted, writes into ajaxSettings.\\n\" + \n" + 
        "			\"	ajaxSetup: function( target, settings ) {\\n\" + \n" + 
        "			\"		if ( settings ) {\\n\" + \n" + 
        "			\"			// Building a settings object\\n\" + \n" + 
        "			\"			ajaxExtend( target, jQuery.ajaxSettings );\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			// Extending ajaxSettings\\n\" + \n" + 
        "			\"			settings = target;\\n\" + \n" + 
        "			\"			target = jQuery.ajaxSettings;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		ajaxExtend( target, settings );\\n\" + \n" + 
        "			\"		return target;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	ajaxSettings: {\\n\" + \n" + 
        "			\"		url: ajaxLocation,\\n\" + \n" + 
        "			\"		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),\\n\" + \n" + 
        "			\"		global: true,\\n\" + \n" + 
        "			\"		type: \\\"GET\\\",\\n\" + \n" + 
        "			\"		contentType: \\\"application/x-www-form-urlencoded\\\",\\n\" + \n" + 
        "			\"		processData: true,\\n\" + \n" + 
        "			\"		async: true,\\n\" + \n" + 
        "			\"		/*\\n\" + \n" + 
        "			\"		timeout: 0,\\n\" + \n" + 
        "			\"		data: null,\\n\" + \n" + 
        "			\"		dataType: null,\\n\" + \n" + 
        "			\"		username: null,\\n\" + \n" + 
        "			\"		password: null,\\n\" + \n" + 
        "			\"		cache: null,\\n\" + \n" + 
        "			\"		traditional: false,\\n\" + \n" + 
        "			\"		headers: {},\\n\" + \n" + 
        "			\"		*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		accepts: {\\n\" + \n" + 
        "			\"			xml: \\\"application/xml, text/xml\\\",\\n\" + \n" + 
        "			\"			html: \\\"text/html\\\",\\n\" + \n" + 
        "			\"			text: \\\"text/plain\\\",\\n\" + \n" + 
        "			\"			json: \\\"application/json, text/javascript\\\",\\n\" + \n" + 
        "			\"			\\\"*\\\": allTypes\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		contents: {\\n\" + \n" + 
        "			\"			xml: /xml/,\\n\" + \n" + 
        "			\"			html: /html/,\\n\" + \n" + 
        "			\"			json: /json/\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		responseFields: {\\n\" + \n" + 
        "			\"			xml: \\\"responseXML\\\",\\n\" + \n" + 
        "			\"			text: \\\"responseText\\\"\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// List of data converters\\n\" + \n" + 
        "			\"		// 1) key format is \\\"source_type destination_type\\\" (a single space in-between)\\n\" + \n" + 
        "			\"		// 2) the catchall symbol \\\"*\\\" can be used for source_type\\n\" + \n" + 
        "			\"		converters: {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Convert anything to text\\n\" + \n" + 
        "			\"			\\\"* text\\\": window.String,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Text to html (true = no transformation)\\n\" + \n" + 
        "			\"			\\\"text html\\\": true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Evaluate text as a json expression\\n\" + \n" + 
        "			\"			\\\"text json\\\": jQuery.parseJSON,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Parse text as xml\\n\" + \n" + 
        "			\"			\\\"text xml\\\": jQuery.parseXML\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// For options that shouldn't be deep extended:\\n\" + \n" + 
        "			\"		// you can add your own custom options here if\\n\" + \n" + 
        "			\"		// and when you create one that shouldn't be\\n\" + \n" + 
        "			\"		// deep extended (see ajaxExtend)\\n\" + \n" + 
        "			\"		flatOptions: {\\n\" + \n" + 
        "			\"			context: true,\\n\" + \n" + 
        "			\"			url: true\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\\n\" + \n" + 
        "			\"	ajaxTransport: addToPrefiltersOrTransports( transports ),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Main method\\n\" + \n" + 
        "			\"	ajax: function( url, options ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If url is an object, simulate pre-1.5 signature\\n\" + \n" + 
        "			\"		if ( typeof url === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"			options = url;\\n\" + \n" + 
        "			\"			url = undefined;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Force options to be an object\\n\" + \n" + 
        "			\"		options = options || {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var // Create the final options object\\n\" + \n" + 
        "			\"			s = jQuery.ajaxSetup( {}, options ),\\n\" + \n" + 
        "			\"			// Callbacks context\\n\" + \n" + 
        "			\"			callbackContext = s.context || s,\\n\" + \n" + 
        "			\"			// Context for global events\\n\" + \n" + 
        "			\"			// It's the callbackContext if one was provided in the options\\n\" + \n" + 
        "			\"			// and if it's a DOM node or a jQuery collection\\n\" + \n" + 
        "			\"			globalEventContext = callbackContext !== s &&\\n\" + \n" + 
        "			\"				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?\\n\" + \n" + 
        "			\"						jQuery( callbackContext ) : jQuery.event,\\n\" + \n" + 
        "			\"			// Deferreds\\n\" + \n" + 
        "			\"			deferred = jQuery.Deferred(),\\n\" + \n" + 
        "			\"			completeDeferred = jQuery._Deferred(),\\n\" + \n" + 
        "			\"			// Status-dependent callbacks\\n\" + \n" + 
        "			\"			statusCode = s.statusCode || {},\\n\" + \n" + 
        "			\"			// ifModified key\\n\" + \n" + 
        "			\"			ifModifiedKey,\\n\" + \n" + 
        "			\"			// Headers (they are sent all at once)\\n\" + \n" + 
        "			\"			requestHeaders = {},\\n\" + \n" + 
        "			\"			requestHeadersNames = {},\\n\" + \n" + 
        "			\"			// Response headers\\n\" + \n" + 
        "			\"			responseHeadersString,\\n\" + \n" + 
        "			\"			responseHeaders,\\n\" + \n" + 
        "			\"			// transport\\n\" + \n" + 
        "			\"			transport,\\n\" + \n" + 
        "			\"			// timeout handle\\n\" + \n" + 
        "			\"			timeoutTimer,\\n\" + \n" + 
        "			\"			// Cross-domain detection vars\\n\" + \n" + 
        "			\"			parts,\\n\" + \n" + 
        "			\"			// The jqXHR state\\n\" + \n" + 
        "			\"			state = 0,\\n\" + \n" + 
        "			\"			// To know if global events are to be dispatched\\n\" + \n" + 
        "			\"			fireGlobals,\\n\" + \n" + 
        "			\"			// Loop variable\\n\" + \n" + 
        "			\"			i,\\n\" + \n" + 
        "			\"			// Fake xhr\\n\" + \n" + 
        "			\"			jqXHR = {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				readyState: 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Caches the header\\n\" + \n" + 
        "			\"				setRequestHeader: function( name, value ) {\\n\" + \n" + 
        "			\"					if ( !state ) {\\n\" + \n" + 
        "			\"						var lname = name.toLowerCase();\\n\" + \n" + 
        "			\"						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\\n\" + \n" + 
        "			\"						requestHeaders[ name ] = value;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Raw string\\n\" + \n" + 
        "			\"				getAllResponseHeaders: function() {\\n\" + \n" + 
        "			\"					return state === 2 ? responseHeadersString : null;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Builds headers hashtable if needed\\n\" + \n" + 
        "			\"				getResponseHeader: function( key ) {\\n\" + \n" + 
        "			\"					var match;\\n\" + \n" + 
        "			\"					if ( state === 2 ) {\\n\" + \n" + 
        "			\"						if ( !responseHeaders ) {\\n\" + \n" + 
        "			\"							responseHeaders = {};\\n\" + \n" + 
        "			\"							while( ( match = rheaders.exec( responseHeadersString ) ) ) {\\n\" + \n" + 
        "			\"								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						match = responseHeaders[ key.toLowerCase() ];\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return match === undefined ? null : match;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Overrides response content-type header\\n\" + \n" + 
        "			\"				overrideMimeType: function( type ) {\\n\" + \n" + 
        "			\"					if ( !state ) {\\n\" + \n" + 
        "			\"						s.mimeType = type;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Cancel the request\\n\" + \n" + 
        "			\"				abort: function( statusText ) {\\n\" + \n" + 
        "			\"					statusText = statusText || \\\"abort\\\";\\n\" + \n" + 
        "			\"					if ( transport ) {\\n\" + \n" + 
        "			\"						transport.abort( statusText );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					done( 0, statusText );\\n\" + \n" + 
        "			\"					return this;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Callback for when everything is done\\n\" + \n" + 
        "			\"		// It is defined here because jslint complains if it is declared\\n\" + \n" + 
        "			\"		// at the end of the function (which would be more logical and readable)\\n\" + \n" + 
        "			\"		function done( status, nativeStatusText, responses, headers ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Called once\\n\" + \n" + 
        "			\"			if ( state === 2 ) {\\n\" + \n" + 
        "			\"				return;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// State is \\\"done\\\" now\\n\" + \n" + 
        "			\"			state = 2;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Clear timeout if it exists\\n\" + \n" + 
        "			\"			if ( timeoutTimer ) {\\n\" + \n" + 
        "			\"				clearTimeout( timeoutTimer );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Dereference transport for early garbage collection\\n\" + \n" + 
        "			\"			// (no matter how long the jqXHR object will be used)\\n\" + \n" + 
        "			\"			transport = undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Cache response headers\\n\" + \n" + 
        "			\"			responseHeadersString = headers || \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Set readyState\\n\" + \n" + 
        "			\"			jqXHR.readyState = status > 0 ? 4 : 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var isSuccess,\\n\" + \n" + 
        "			\"				success,\\n\" + \n" + 
        "			\"				error,\\n\" + \n" + 
        "			\"				statusText = nativeStatusText,\\n\" + \n" + 
        "			\"				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,\\n\" + \n" + 
        "			\"				lastModified,\\n\" + \n" + 
        "			\"				etag;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If successful, handle type chaining\\n\" + \n" + 
        "			\"			if ( status >= 200 && status < 300 || status === 304 ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\\n\" + \n" + 
        "			\"				if ( s.ifModified ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( ( lastModified = jqXHR.getResponseHeader( \\\"Last-Modified\\\" ) ) ) {\\n\" + \n" + 
        "			\"						jQuery.lastModified[ ifModifiedKey ] = lastModified;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"					if ( ( etag = jqXHR.getResponseHeader( \\\"Etag\\\" ) ) ) {\\n\" + \n" + 
        "			\"						jQuery.etag[ ifModifiedKey ] = etag;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// If not modified\\n\" + \n" + 
        "			\"				if ( status === 304 ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					statusText = \\\"notmodified\\\";\\n\" + \n" + 
        "			\"					isSuccess = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// If we have data\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					try {\\n\" + \n" + 
        "			\"						success = ajaxConvert( s, response );\\n\" + \n" + 
        "			\"						statusText = \\\"success\\\";\\n\" + \n" + 
        "			\"						isSuccess = true;\\n\" + \n" + 
        "			\"					} catch(e) {\\n\" + \n" + 
        "			\"						// We have a parsererror\\n\" + \n" + 
        "			\"						statusText = \\\"parsererror\\\";\\n\" + \n" + 
        "			\"						error = e;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				// We extract error from statusText\\n\" + \n" + 
        "			\"				// then normalize statusText and status for non-aborts\\n\" + \n" + 
        "			\"				error = statusText;\\n\" + \n" + 
        "			\"				if( !statusText || status ) {\\n\" + \n" + 
        "			\"					statusText = \\\"error\\\";\\n\" + \n" + 
        "			\"					if ( status < 0 ) {\\n\" + \n" + 
        "			\"						status = 0;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Set data for the fake xhr object\\n\" + \n" + 
        "			\"			jqXHR.status = status;\\n\" + \n" + 
        "			\"			jqXHR.statusText = \\\"\\\" + ( nativeStatusText || statusText );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Success/Error\\n\" + \n" + 
        "			\"			if ( isSuccess ) {\\n\" + \n" + 
        "			\"				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Status-dependent callbacks\\n\" + \n" + 
        "			\"			jqXHR.statusCode( statusCode );\\n\" + \n" + 
        "			\"			statusCode = undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( fireGlobals ) {\\n\" + \n" + 
        "			\"				globalEventContext.trigger( \\\"ajax\\\" + ( isSuccess ? \\\"Success\\\" : \\\"Error\\\" ),\\n\" + \n" + 
        "			\"						[ jqXHR, s, isSuccess ? success : error ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Complete\\n\" + \n" + 
        "			\"			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( fireGlobals ) {\\n\" + \n" + 
        "			\"				globalEventContext.trigger( \\\"ajaxComplete\\\", [ jqXHR, s ] );\\n\" + \n" + 
        "			\"				// Handle the global AJAX counter\\n\" + \n" + 
        "			\"				if ( !( --jQuery.active ) ) {\\n\" + \n" + 
        "			\"					jQuery.event.trigger( \\\"ajaxStop\\\" );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Attach deferreds\\n\" + \n" + 
        "			\"		deferred.promise( jqXHR );\\n\" + \n" + 
        "			\"		jqXHR.success = jqXHR.done;\\n\" + \n" + 
        "			\"		jqXHR.error = jqXHR.fail;\\n\" + \n" + 
        "			\"		jqXHR.complete = completeDeferred.done;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Status-dependent callbacks\\n\" + \n" + 
        "			\"		jqXHR.statusCode = function( map ) {\\n\" + \n" + 
        "			\"			if ( map ) {\\n\" + \n" + 
        "			\"				var tmp;\\n\" + \n" + 
        "			\"				if ( state < 2 ) {\\n\" + \n" + 
        "			\"					for( tmp in map ) {\\n\" + \n" + 
        "			\"						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					tmp = map[ jqXHR.status ];\\n\" + \n" + 
        "			\"					jqXHR.then( tmp, tmp );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Remove hash character (#7531: and string promotion)\\n\" + \n" + 
        "			\"		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)\\n\" + \n" + 
        "			\"		// We also use the url parameter if available\\n\" + \n" + 
        "			\"		s.url = ( ( url || s.url ) + \\\"\\\" ).replace( rhash, \\\"\\\" ).replace( rprotocol, ajaxLocParts[ 1 ] + \\\"//\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Extract dataTypes list\\n\" + \n" + 
        "			\"		s.dataTypes = jQuery.trim( s.dataType || \\\"*\\\" ).toLowerCase().split( rspacesAjax );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Determine if a cross-domain request is in order\\n\" + \n" + 
        "			\"		if ( s.crossDomain == null ) {\\n\" + \n" + 
        "			\"			parts = rurl.exec( s.url.toLowerCase() );\\n\" + \n" + 
        "			\"			s.crossDomain = !!( parts &&\\n\" + \n" + 
        "			\"				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||\\n\" + \n" + 
        "			\"					( parts[ 3 ] || ( parts[ 1 ] === \\\"http:\\\" ? 80 : 443 ) ) !=\\n\" + \n" + 
        "			\"						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === \\\"http:\\\" ? 80 : 443 ) ) )\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Convert data if not already a string\\n\" + \n" + 
        "			\"		if ( s.data && s.processData && typeof s.data !== \\\"string\\\" ) {\\n\" + \n" + 
        "			\"			s.data = jQuery.param( s.data, s.traditional );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Apply prefilters\\n\" + \n" + 
        "			\"		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If request was aborted inside a prefiler, stop there\\n\" + \n" + 
        "			\"		if ( state === 2 ) {\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// We can fire global events as of now if asked to\\n\" + \n" + 
        "			\"		fireGlobals = s.global;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Uppercase the type\\n\" + \n" + 
        "			\"		s.type = s.type.toUpperCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Determine if request has content\\n\" + \n" + 
        "			\"		s.hasContent = !rnoContent.test( s.type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Watch for a new set of requests\\n\" + \n" + 
        "			\"		if ( fireGlobals && jQuery.active++ === 0 ) {\\n\" + \n" + 
        "			\"			jQuery.event.trigger( \\\"ajaxStart\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// More options handling for requests with no content\\n\" + \n" + 
        "			\"		if ( !s.hasContent ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If data is available, append data to url\\n\" + \n" + 
        "			\"			if ( s.data ) {\\n\" + \n" + 
        "			\"				s.url += ( rquery.test( s.url ) ? \\\"&\\\" : \\\"?\\\" ) + s.data;\\n\" + \n" + 
        "			\"				// #9682: remove data so that it's not used in an eventual retry\\n\" + \n" + 
        "			\"				delete s.data;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Get ifModifiedKey before adding the anti-cache parameter\\n\" + \n" + 
        "			\"			ifModifiedKey = s.url;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Add anti-cache in url if needed\\n\" + \n" + 
        "			\"			if ( s.cache === false ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var ts = jQuery.now(),\\n\" + \n" + 
        "			\"					// try replacing _= if it is there\\n\" + \n" + 
        "			\"					ret = s.url.replace( rts, \\\"$1_=\\\" + ts );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// if nothing was replaced, add timestamp to the end\\n\" + \n" + 
        "			\"				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? \\\"&\\\" : \\\"?\\\" ) + \\\"_=\\\" + ts : \\\"\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the correct header, if data is being sent\\n\" + \n" + 
        "			\"		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\\n\" + \n" + 
        "			\"			jqXHR.setRequestHeader( \\\"Content-Type\\\", s.contentType );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\\n\" + \n" + 
        "			\"		if ( s.ifModified ) {\\n\" + \n" + 
        "			\"			ifModifiedKey = ifModifiedKey || s.url;\\n\" + \n" + 
        "			\"			if ( jQuery.lastModified[ ifModifiedKey ] ) {\\n\" + \n" + 
        "			\"				jqXHR.setRequestHeader( \\\"If-Modified-Since\\\", jQuery.lastModified[ ifModifiedKey ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( jQuery.etag[ ifModifiedKey ] ) {\\n\" + \n" + 
        "			\"				jqXHR.setRequestHeader( \\\"If-None-Match\\\", jQuery.etag[ ifModifiedKey ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the Accepts header for the server, depending on the dataType\\n\" + \n" + 
        "			\"		jqXHR.setRequestHeader(\\n\" + \n" + 
        "			\"			\\\"Accept\\\",\\n\" + \n" + 
        "			\"			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?\\n\" + \n" + 
        "			\"				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \\\"*\\\" ? \\\", \\\" + allTypes + \\\"; q=0.01\\\" : \\\"\\\" ) :\\n\" + \n" + 
        "			\"				s.accepts[ \\\"*\\\" ]\\n\" + \n" + 
        "			\"		);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Check for headers option\\n\" + \n" + 
        "			\"		for ( i in s.headers ) {\\n\" + \n" + 
        "			\"			jqXHR.setRequestHeader( i, s.headers[ i ] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Allow custom headers/mimetypes and early abort\\n\" + \n" + 
        "			\"		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\\n\" + \n" + 
        "			\"				// Abort if not done already\\n\" + \n" + 
        "			\"				jqXHR.abort();\\n\" + \n" + 
        "			\"				return false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Install callbacks on deferreds\\n\" + \n" + 
        "			\"		for ( i in { success: 1, error: 1, complete: 1 } ) {\\n\" + \n" + 
        "			\"			jqXHR[ i ]( s[ i ] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get transport\\n\" + \n" + 
        "			\"		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If no transport, we auto-abort\\n\" + \n" + 
        "			\"		if ( !transport ) {\\n\" + \n" + 
        "			\"			done( -1, \\\"No Transport\\\" );\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			jqXHR.readyState = 1;\\n\" + \n" + 
        "			\"			// Send global event\\n\" + \n" + 
        "			\"			if ( fireGlobals ) {\\n\" + \n" + 
        "			\"				globalEventContext.trigger( \\\"ajaxSend\\\", [ jqXHR, s ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			// Timeout\\n\" + \n" + 
        "			\"			if ( s.async && s.timeout > 0 ) {\\n\" + \n" + 
        "			\"				timeoutTimer = setTimeout( function(){\\n\" + \n" + 
        "			\"					jqXHR.abort( \\\"timeout\\\" );\\n\" + \n" + 
        "			\"				}, s.timeout );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				state = 1;\\n\" + \n" + 
        "			\"				transport.send( requestHeaders, done );\\n\" + \n" + 
        "			\"			} catch (e) {\\n\" + \n" + 
        "			\"				// Propagate exception as error if not done\\n\" + \n" + 
        "			\"				if ( state < 2 ) {\\n\" + \n" + 
        "			\"					done( -1, e );\\n\" + \n" + 
        "			\"				// Simply rethrow otherwise\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					jQuery.error( e );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return jqXHR;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Serialize an array of form elements or a set of\\n\" + \n" + 
        "			\"	// key/values into a query string\\n\" + \n" + 
        "			\"	param: function( a, traditional ) {\\n\" + \n" + 
        "			\"		var s = [],\\n\" + \n" + 
        "			\"			add = function( key, value ) {\\n\" + \n" + 
        "			\"				// If value is a function, invoke it and return its value\\n\" + \n" + 
        "			\"				value = jQuery.isFunction( value ) ? value() : value;\\n\" + \n" + 
        "			\"				s[ s.length ] = encodeURIComponent( key ) + \\\"=\\\" + encodeURIComponent( value );\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set traditional to true for jQuery <= 1.3.2 behavior.\\n\" + \n" + 
        "			\"		if ( traditional === undefined ) {\\n\" + \n" + 
        "			\"			traditional = jQuery.ajaxSettings.traditional;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If an array was passed in, assume that it is an array of form elements.\\n\" + \n" + 
        "			\"		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\\n\" + \n" + 
        "			\"			// Serialize the form elements\\n\" + \n" + 
        "			\"			jQuery.each( a, function() {\\n\" + \n" + 
        "			\"				add( this.name, this.value );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			// If traditional, encode the \\\"old\\\" way (the way 1.3.2 or older\\n\" + \n" + 
        "			\"			// did it), otherwise encode params recursively.\\n\" + \n" + 
        "			\"			for ( var prefix in a ) {\\n\" + \n" + 
        "			\"				buildParams( prefix, a[ prefix ], traditional, add );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Return the resulting serialization\\n\" + \n" + 
        "			\"		return s.join( \\\"&\\\" ).replace( r20, \\\"+\\\" );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function buildParams( prefix, obj, traditional, add ) {\\n\" + \n" + 
        "			\"	if ( jQuery.isArray( obj ) ) {\\n\" + \n" + 
        "			\"		// Serialize array item.\\n\" + \n" + 
        "			\"		jQuery.each( obj, function( i, v ) {\\n\" + \n" + 
        "			\"			if ( traditional || rbracket.test( prefix ) ) {\\n\" + \n" + 
        "			\"				// Treat each array item as a scalar.\\n\" + \n" + 
        "			\"				add( prefix, v );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				// If array item is non-scalar (array or object), encode its\\n\" + \n" + 
        "			\"				// numeric index to resolve deserialization ambiguity issues.\\n\" + \n" + 
        "			\"				// Note that rack (as of 1.0.0) can't currently deserialize\\n\" + \n" + 
        "			\"				// nested arrays properly, and attempting to do so may cause\\n\" + \n" + 
        "			\"				// a server error. Possible fixes are to modify rack's\\n\" + \n" + 
        "			\"				// deserialization algorithm or to provide an option or flag\\n\" + \n" + 
        "			\"				// to force array serialization to be shallow.\\n\" + \n" + 
        "			\"				buildParams( prefix + \\\"[\\\" + ( typeof v === \\\"object\\\" || jQuery.isArray(v) ? i : \\\"\\\" ) + \\\"]\\\", v, traditional, add );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else if ( !traditional && obj != null && typeof obj === \\\"object\\\" ) {\\n\" + \n" + 
        "			\"		// Serialize object item.\\n\" + \n" + 
        "			\"		for ( var name in obj ) {\\n\" + \n" + 
        "			\"			buildParams( prefix + \\\"[\\\" + name + \\\"]\\\", obj[ name ], traditional, add );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		// Serialize scalar item.\\n\" + \n" + 
        "			\"		add( prefix, obj );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// This is still on the jQuery object... for now\\n\" + \n" + 
        "			\"// Want to move this to jQuery.ajax some day\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Counter for holding the number of active queries\\n\" + \n" + 
        "			\"	active: 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Last-Modified header cache for next request\\n\" + \n" + 
        "			\"	lastModified: {},\\n\" + \n" + 
        "			\"	etag: {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/* Handles responses to an ajax request:\\n\" + \n" + 
        "			\" * - sets all responseXXX fields accordingly\\n\" + \n" + 
        "			\" * - finds the right dataType (mediates between content-type and expected dataType)\\n\" + \n" + 
        "			\" * - returns the corresponding response\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function ajaxHandleResponses( s, jqXHR, responses ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var contents = s.contents,\\n\" + \n" + 
        "			\"		dataTypes = s.dataTypes,\\n\" + \n" + 
        "			\"		responseFields = s.responseFields,\\n\" + \n" + 
        "			\"		ct,\\n\" + \n" + 
        "			\"		type,\\n\" + \n" + 
        "			\"		finalDataType,\\n\" + \n" + 
        "			\"		firstDataType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Fill responseXXX fields\\n\" + \n" + 
        "			\"	for( type in responseFields ) {\\n\" + \n" + 
        "			\"		if ( type in responses ) {\\n\" + \n" + 
        "			\"			jqXHR[ responseFields[type] ] = responses[ type ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Remove auto dataType and get content-type in the process\\n\" + \n" + 
        "			\"	while( dataTypes[ 0 ] === \\\"*\\\" ) {\\n\" + \n" + 
        "			\"		dataTypes.shift();\\n\" + \n" + 
        "			\"		if ( ct === undefined ) {\\n\" + \n" + 
        "			\"			ct = s.mimeType || jqXHR.getResponseHeader( \\\"content-type\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check if we're dealing with a known content-type\\n\" + \n" + 
        "			\"	if ( ct ) {\\n\" + \n" + 
        "			\"		for ( type in contents ) {\\n\" + \n" + 
        "			\"			if ( contents[ type ] && contents[ type ].test( ct ) ) {\\n\" + \n" + 
        "			\"				dataTypes.unshift( type );\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Check to see if we have a response for the expected dataType\\n\" + \n" + 
        "			\"	if ( dataTypes[ 0 ] in responses ) {\\n\" + \n" + 
        "			\"		finalDataType = dataTypes[ 0 ];\\n\" + \n" + 
        "			\"	} else {\\n\" + \n" + 
        "			\"		// Try convertible dataTypes\\n\" + \n" + 
        "			\"		for ( type in responses ) {\\n\" + \n" + 
        "			\"			if ( !dataTypes[ 0 ] || s.converters[ type + \\\" \\\" + dataTypes[0] ] ) {\\n\" + \n" + 
        "			\"				finalDataType = type;\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( !firstDataType ) {\\n\" + \n" + 
        "			\"				firstDataType = type;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		// Or just use first one\\n\" + \n" + 
        "			\"		finalDataType = finalDataType || firstDataType;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// If we found a dataType\\n\" + \n" + 
        "			\"	// We add the dataType to the list if needed\\n\" + \n" + 
        "			\"	// and return the corresponding response\\n\" + \n" + 
        "			\"	if ( finalDataType ) {\\n\" + \n" + 
        "			\"		if ( finalDataType !== dataTypes[ 0 ] ) {\\n\" + \n" + 
        "			\"			dataTypes.unshift( finalDataType );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		return responses[ finalDataType ];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Chain conversions given the request and the original response\\n\" + \n" + 
        "			\"function ajaxConvert( s, response ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Apply the dataFilter if provided\\n\" + \n" + 
        "			\"	if ( s.dataFilter ) {\\n\" + \n" + 
        "			\"		response = s.dataFilter( response, s.dataType );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var dataTypes = s.dataTypes,\\n\" + \n" + 
        "			\"		converters = {},\\n\" + \n" + 
        "			\"		i,\\n\" + \n" + 
        "			\"		key,\\n\" + \n" + 
        "			\"		length = dataTypes.length,\\n\" + \n" + 
        "			\"		tmp,\\n\" + \n" + 
        "			\"		// Current and previous dataTypes\\n\" + \n" + 
        "			\"		current = dataTypes[ 0 ],\\n\" + \n" + 
        "			\"		prev,\\n\" + \n" + 
        "			\"		// Conversion expression\\n\" + \n" + 
        "			\"		conversion,\\n\" + \n" + 
        "			\"		// Conversion function\\n\" + \n" + 
        "			\"		conv,\\n\" + \n" + 
        "			\"		// Conversion functions (transitive conversion)\\n\" + \n" + 
        "			\"		conv1,\\n\" + \n" + 
        "			\"		conv2;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// For each dataType in the chain\\n\" + \n" + 
        "			\"	for( i = 1; i < length; i++ ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Create converters map\\n\" + \n" + 
        "			\"		// with lowercased keys\\n\" + \n" + 
        "			\"		if ( i === 1 ) {\\n\" + \n" + 
        "			\"			for( key in s.converters ) {\\n\" + \n" + 
        "			\"				if( typeof key === \\\"string\\\" ) {\\n\" + \n" + 
        "			\"					converters[ key.toLowerCase() ] = s.converters[ key ];\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get the dataTypes\\n\" + \n" + 
        "			\"		prev = current;\\n\" + \n" + 
        "			\"		current = dataTypes[ i ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If current is auto dataType, update it to prev\\n\" + \n" + 
        "			\"		if( current === \\\"*\\\" ) {\\n\" + \n" + 
        "			\"			current = prev;\\n\" + \n" + 
        "			\"		// If no auto and dataTypes are actually different\\n\" + \n" + 
        "			\"		} else if ( prev !== \\\"*\\\" && prev !== current ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Get the converter\\n\" + \n" + 
        "			\"			conversion = prev + \\\" \\\" + current;\\n\" + \n" + 
        "			\"			conv = converters[ conversion ] || converters[ \\\"* \\\" + current ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// If there is no direct converter, search transitively\\n\" + \n" + 
        "			\"			if ( !conv ) {\\n\" + \n" + 
        "			\"				conv2 = undefined;\\n\" + \n" + 
        "			\"				for( conv1 in converters ) {\\n\" + \n" + 
        "			\"					tmp = conv1.split( \\\" \\\" );\\n\" + \n" + 
        "			\"					if ( tmp[ 0 ] === prev || tmp[ 0 ] === \\\"*\\\" ) {\\n\" + \n" + 
        "			\"						conv2 = converters[ tmp[1] + \\\" \\\" + current ];\\n\" + \n" + 
        "			\"						if ( conv2 ) {\\n\" + \n" + 
        "			\"							conv1 = converters[ conv1 ];\\n\" + \n" + 
        "			\"							if ( conv1 === true ) {\\n\" + \n" + 
        "			\"								conv = conv2;\\n\" + \n" + 
        "			\"							} else if ( conv2 === true ) {\\n\" + \n" + 
        "			\"								conv = conv1;\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							break;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			// If we found no converter, dispatch an error\\n\" + \n" + 
        "			\"			if ( !( conv || conv2 ) ) {\\n\" + \n" + 
        "			\"				jQuery.error( \\\"No conversion from \\\" + conversion.replace(\\\" \\\",\\\" to \\\") );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			// If found converter is not an equivalence\\n\" + \n" + 
        "			\"			if ( conv !== true ) {\\n\" + \n" + 
        "			\"				// Convert with 1 or 2 converters accordingly\\n\" + \n" + 
        "			\"				response = conv ? conv( response ) : conv2( conv1(response) );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	return response;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var jsc = jQuery.now(),\\n\" + \n" + 
        "			\"	jsre = /(\\\\=)\\\\?(&|$)|\\\\?\\\\?/i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Default jsonp settings\\n\" + \n" + 
        "			\"jQuery.ajaxSetup({\\n\" + \n" + 
        "			\"	jsonp: \\\"callback\\\",\\n\" + \n" + 
        "			\"	jsonpCallback: function() {\\n\" + \n" + 
        "			\"		return jQuery.expando + \\\"_\\\" + ( jsc++ );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Detect, normalize options and install callbacks for jsonp requests\\n\" + \n" + 
        "			\"jQuery.ajaxPrefilter( \\\"json jsonp\\\", function( s, originalSettings, jqXHR ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var inspectData = s.contentType === \\\"application/x-www-form-urlencoded\\\" &&\\n\" + \n" + 
        "			\"		( typeof s.data === \\\"string\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( s.dataTypes[ 0 ] === \\\"jsonp\\\" ||\\n\" + \n" + 
        "			\"		s.jsonp !== false && ( jsre.test( s.url ) ||\\n\" + \n" + 
        "			\"				inspectData && jsre.test( s.data ) ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var responseContainer,\\n\" + \n" + 
        "			\"			jsonpCallback = s.jsonpCallback =\\n\" + \n" + 
        "			\"				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,\\n\" + \n" + 
        "			\"			previous = window[ jsonpCallback ],\\n\" + \n" + 
        "			\"			url = s.url,\\n\" + \n" + 
        "			\"			data = s.data,\\n\" + \n" + 
        "			\"			replace = \\\"$1\\\" + jsonpCallback + \\\"$2\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( s.jsonp !== false ) {\\n\" + \n" + 
        "			\"			url = url.replace( jsre, replace );\\n\" + \n" + 
        "			\"			if ( s.url === url ) {\\n\" + \n" + 
        "			\"				if ( inspectData ) {\\n\" + \n" + 
        "			\"					data = data.replace( jsre, replace );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				if ( s.data === data ) {\\n\" + \n" + 
        "			\"					// Add callback manually\\n\" + \n" + 
        "			\"					url += (/\\\\?/.test( url ) ? \\\"&\\\" : \\\"?\\\") + s.jsonp + \\\"=\\\" + jsonpCallback;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		s.url = url;\\n\" + \n" + 
        "			\"		s.data = data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Install callback\\n\" + \n" + 
        "			\"		window[ jsonpCallback ] = function( response ) {\\n\" + \n" + 
        "			\"			responseContainer = [ response ];\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Clean-up function\\n\" + \n" + 
        "			\"		jqXHR.always(function() {\\n\" + \n" + 
        "			\"			// Set callback back to previous value\\n\" + \n" + 
        "			\"			window[ jsonpCallback ] = previous;\\n\" + \n" + 
        "			\"			// Call if it was a function and we have a response\\n\" + \n" + 
        "			\"			if ( responseContainer && jQuery.isFunction( previous ) ) {\\n\" + \n" + 
        "			\"				window[ jsonpCallback ]( responseContainer[ 0 ] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Use data converter to retrieve json after script execution\\n\" + \n" + 
        "			\"		s.converters[\\\"script json\\\"] = function() {\\n\" + \n" + 
        "			\"			if ( !responseContainer ) {\\n\" + \n" + 
        "			\"				jQuery.error( jsonpCallback + \\\" was not called\\\" );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return responseContainer[ 0 ];\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// force json dataType\\n\" + \n" + 
        "			\"		s.dataTypes[ 0 ] = \\\"json\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Delegate to script\\n\" + \n" + 
        "			\"		return \\\"script\\\";\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Install script dataType\\n\" + \n" + 
        "			\"jQuery.ajaxSetup({\\n\" + \n" + 
        "			\"	accepts: {\\n\" + \n" + 
        "			\"		script: \\\"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\\\"\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	contents: {\\n\" + \n" + 
        "			\"		script: /javascript|ecmascript/\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"	converters: {\\n\" + \n" + 
        "			\"		\\\"text script\\\": function( text ) {\\n\" + \n" + 
        "			\"			jQuery.globalEval( text );\\n\" + \n" + 
        "			\"			return text;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Handle cache's special case and global\\n\" + \n" + 
        "			\"jQuery.ajaxPrefilter( \\\"script\\\", function( s ) {\\n\" + \n" + 
        "			\"	if ( s.cache === undefined ) {\\n\" + \n" + 
        "			\"		s.cache = false;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	if ( s.crossDomain ) {\\n\" + \n" + 
        "			\"		s.type = \\\"GET\\\";\\n\" + \n" + 
        "			\"		s.global = false;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Bind script tag hack transport\\n\" + \n" + 
        "			\"jQuery.ajaxTransport( \\\"script\\\", function(s) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// This transport only deals with cross domain requests\\n\" + \n" + 
        "			\"	if ( s.crossDomain ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var script,\\n\" + \n" + 
        "			\"			head = document.head || document.getElementsByTagName( \\\"head\\\" )[0] || document.documentElement;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			send: function( _, callback ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				script = document.createElement( \\\"script\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				script.async = \\\"async\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( s.scriptCharset ) {\\n\" + \n" + 
        "			\"					script.charset = s.scriptCharset;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				script.src = s.url;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Attach handlers for all browsers\\n\" + \n" + 
        "			\"				script.onload = script.onreadystatechange = function( _, isAbort ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Handle memory leak in IE\\n\" + \n" + 
        "			\"						script.onload = script.onreadystatechange = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Remove the script\\n\" + \n" + 
        "			\"						if ( head && script.parentNode ) {\\n\" + \n" + 
        "			\"							head.removeChild( script );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Dereference the script\\n\" + \n" + 
        "			\"						script = undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Callback if not abort\\n\" + \n" + 
        "			\"						if ( !isAbort ) {\\n\" + \n" + 
        "			\"							callback( 200, \\\"success\\\" );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				};\\n\" + \n" + 
        "			\"				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.\\n\" + \n" + 
        "			\"				// This arises when a base node is used (#2709 and #4378).\\n\" + \n" + 
        "			\"				head.insertBefore( script, head.firstChild );\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			abort: function() {\\n\" + \n" + 
        "			\"				if ( script ) {\\n\" + \n" + 
        "			\"					script.onload( 0, 1 );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var // #5280: Internet Explorer will keep connections alive if we don't abort on unload\\n\" + \n" + 
        "			\"	xhrOnUnloadAbort = window.ActiveXObject ? function() {\\n\" + \n" + 
        "			\"		// Abort all pending requests\\n\" + \n" + 
        "			\"		for ( var key in xhrCallbacks ) {\\n\" + \n" + 
        "			\"			xhrCallbacks[ key ]( 0, 1 );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	} : false,\\n\" + \n" + 
        "			\"	xhrId = 0,\\n\" + \n" + 
        "			\"	xhrCallbacks;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Functions to create xhrs\\n\" + \n" + 
        "			\"function createStandardXHR() {\\n\" + \n" + 
        "			\"	try {\\n\" + \n" + 
        "			\"		return new window.XMLHttpRequest();\\n\" + \n" + 
        "			\"	} catch( e ) {}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function createActiveXHR() {\\n\" + \n" + 
        "			\"	try {\\n\" + \n" + 
        "			\"		return new window.ActiveXObject( \\\"Microsoft.XMLHTTP\\\" );\\n\" + \n" + 
        "			\"	} catch( e ) {}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create the request object\\n\" + \n" + 
        "			\"// (This is still attached to ajaxSettings for backward compatibility)\\n\" + \n" + 
        "			\"jQuery.ajaxSettings.xhr = window.ActiveXObject ?\\n\" + \n" + 
        "			\"	/* Microsoft failed to properly\\n\" + \n" + 
        "			\"	 * implement the XMLHttpRequest in IE7 (can't request local files),\\n\" + \n" + 
        "			\"	 * so we use the ActiveXObject when it is available\\n\" + \n" + 
        "			\"	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so\\n\" + \n" + 
        "			\"	 * we need a fallback.\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	function() {\\n\" + \n" + 
        "			\"		return !this.isLocal && createStandardXHR() || createActiveXHR();\\n\" + \n" + 
        "			\"	} :\\n\" + \n" + 
        "			\"	// For all other browsers, use the standard XMLHttpRequest object\\n\" + \n" + 
        "			\"	createStandardXHR;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Determine support properties\\n\" + \n" + 
        "			\"(function( xhr ) {\\n\" + \n" + 
        "			\"	jQuery.extend( jQuery.support, {\\n\" + \n" + 
        "			\"		ajax: !!xhr,\\n\" + \n" + 
        "			\"		cors: !!xhr && ( \\\"withCredentials\\\" in xhr )\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"})( jQuery.ajaxSettings.xhr() );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create transport if the browser can provide an xhr\\n\" + \n" + 
        "			\"if ( jQuery.support.ajax ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.ajaxTransport(function( s ) {\\n\" + \n" + 
        "			\"		// Cross domain only allowed if supported through XMLHttpRequest\\n\" + \n" + 
        "			\"		if ( !s.crossDomain || jQuery.support.cors ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var callback;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return {\\n\" + \n" + 
        "			\"				send: function( headers, complete ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Get a new xhr\\n\" + \n" + 
        "			\"					var xhr = s.xhr(),\\n\" + \n" + 
        "			\"						handle,\\n\" + \n" + 
        "			\"						i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Open the socket\\n\" + \n" + 
        "			\"					// Passing null username, generates a login popup on Opera (#2865)\\n\" + \n" + 
        "			\"					if ( s.username ) {\\n\" + \n" + 
        "			\"						xhr.open( s.type, s.url, s.async, s.username, s.password );\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						xhr.open( s.type, s.url, s.async );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Apply custom fields if provided\\n\" + \n" + 
        "			\"					if ( s.xhrFields ) {\\n\" + \n" + 
        "			\"						for ( i in s.xhrFields ) {\\n\" + \n" + 
        "			\"							xhr[ i ] = s.xhrFields[ i ];\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Override mime type if needed\\n\" + \n" + 
        "			\"					if ( s.mimeType && xhr.overrideMimeType ) {\\n\" + \n" + 
        "			\"						xhr.overrideMimeType( s.mimeType );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// X-Requested-With header\\n\" + \n" + 
        "			\"					// For cross-domain requests, seeing as conditions for a preflight are\\n\" + \n" + 
        "			\"					// akin to a jigsaw puzzle, we simply never set it to be sure.\\n\" + \n" + 
        "			\"					// (it can always be set on a per-request basis or even using ajaxSetup)\\n\" + \n" + 
        "			\"					// For same-domain requests, won't change header if already provided.\\n\" + \n" + 
        "			\"					if ( !s.crossDomain && !headers[\\\"X-Requested-With\\\"] ) {\\n\" + \n" + 
        "			\"						headers[ \\\"X-Requested-With\\\" ] = \\\"XMLHttpRequest\\\";\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Need an extra try/catch for cross domain requests in Firefox 3\\n\" + \n" + 
        "			\"					try {\\n\" + \n" + 
        "			\"						for ( i in headers ) {\\n\" + \n" + 
        "			\"							xhr.setRequestHeader( i, headers[ i ] );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					} catch( _ ) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Do send the request\\n\" + \n" + 
        "			\"					// This may raise an exception which is actually\\n\" + \n" + 
        "			\"					// handled in jQuery.ajax (so no try/catch here)\\n\" + \n" + 
        "			\"					xhr.send( ( s.hasContent && s.data ) || null );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Listener\\n\" + \n" + 
        "			\"					callback = function( _, isAbort ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						var status,\\n\" + \n" + 
        "			\"							statusText,\\n\" + \n" + 
        "			\"							responseHeaders,\\n\" + \n" + 
        "			\"							responses,\\n\" + \n" + 
        "			\"							xml;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Firefox throws exceptions when accessing properties\\n\" + \n" + 
        "			\"						// of an xhr when a network error occured\\n\" + \n" + 
        "			\"						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)\\n\" + \n" + 
        "			\"						try {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							// Was never called and is aborted or complete\\n\" + \n" + 
        "			\"							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"								// Only called once\\n\" + \n" + 
        "			\"								callback = undefined;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"								// Do not keep as active anymore\\n\" + \n" + 
        "			\"								if ( handle ) {\\n\" + \n" + 
        "			\"									xhr.onreadystatechange = jQuery.noop;\\n\" + \n" + 
        "			\"									if ( xhrOnUnloadAbort ) {\\n\" + \n" + 
        "			\"										delete xhrCallbacks[ handle ];\\n\" + \n" + 
        "			\"									}\\n\" + \n" + 
        "			\"								}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"								// If it's an abort\\n\" + \n" + 
        "			\"								if ( isAbort ) {\\n\" + \n" + 
        "			\"									// Abort it manually if needed\\n\" + \n" + 
        "			\"									if ( xhr.readyState !== 4 ) {\\n\" + \n" + 
        "			\"										xhr.abort();\\n\" + \n" + 
        "			\"									}\\n\" + \n" + 
        "			\"								} else {\\n\" + \n" + 
        "			\"									status = xhr.status;\\n\" + \n" + 
        "			\"									responseHeaders = xhr.getAllResponseHeaders();\\n\" + \n" + 
        "			\"									responses = {};\\n\" + \n" + 
        "			\"									xml = xhr.responseXML;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"									// Construct response list\\n\" + \n" + 
        "			\"									if ( xml && xml.documentElement /* #4958 */ ) {\\n\" + \n" + 
        "			\"										responses.xml = xml;\\n\" + \n" + 
        "			\"									}\\n\" + \n" + 
        "			\"									responses.text = xhr.responseText;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"									// Firefox throws an exception when accessing\\n\" + \n" + 
        "			\"									// statusText for faulty cross-domain requests\\n\" + \n" + 
        "			\"									try {\\n\" + \n" + 
        "			\"										statusText = xhr.statusText;\\n\" + \n" + 
        "			\"									} catch( e ) {\\n\" + \n" + 
        "			\"										// We normalize with Webkit giving an empty statusText\\n\" + \n" + 
        "			\"										statusText = \\\"\\\";\\n\" + \n" + 
        "			\"									}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"									// Filter status for non standard behaviors\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"									// If the request is local and we have data: assume a success\\n\" + \n" + 
        "			\"									// (success with no data won't get notified, that's the best we\\n\" + \n" + 
        "			\"									// can do given current implementations)\\n\" + \n" + 
        "			\"									if ( !status && s.isLocal && !s.crossDomain ) {\\n\" + \n" + 
        "			\"										status = responses.text ? 200 : 404;\\n\" + \n" + 
        "			\"									// IE - #1450: sometimes returns 1223 when it should be 204\\n\" + \n" + 
        "			\"									} else if ( status === 1223 ) {\\n\" + \n" + 
        "			\"										status = 204;\\n\" + \n" + 
        "			\"									}\\n\" + \n" + 
        "			\"								}\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						} catch( firefoxAccessException ) {\\n\" + \n" + 
        "			\"							if ( !isAbort ) {\\n\" + \n" + 
        "			\"								complete( -1, firefoxAccessException );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// Call complete if needed\\n\" + \n" + 
        "			\"						if ( responses ) {\\n\" + \n" + 
        "			\"							complete( status, statusText, responses, responseHeaders );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// if we're in sync mode or it's in cache\\n\" + \n" + 
        "			\"					// and has been retrieved directly (IE6 & IE7)\\n\" + \n" + 
        "			\"					// we need to manually fire the callback\\n\" + \n" + 
        "			\"					if ( !s.async || xhr.readyState === 4 ) {\\n\" + \n" + 
        "			\"						callback();\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						handle = ++xhrId;\\n\" + \n" + 
        "			\"						if ( xhrOnUnloadAbort ) {\\n\" + \n" + 
        "			\"							// Create the active xhrs callbacks list if needed\\n\" + \n" + 
        "			\"							// and attach the unload handler\\n\" + \n" + 
        "			\"							if ( !xhrCallbacks ) {\\n\" + \n" + 
        "			\"								xhrCallbacks = {};\\n\" + \n" + 
        "			\"								jQuery( window ).unload( xhrOnUnloadAbort );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							// Add to list of active xhrs callbacks\\n\" + \n" + 
        "			\"							xhrCallbacks[ handle ] = callback;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						xhr.onreadystatechange = callback;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				abort: function() {\\n\" + \n" + 
        "			\"					if ( callback ) {\\n\" + \n" + 
        "			\"						callback(0,1);\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			};\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var elemdisplay = {},\\n\" + \n" + 
        "			\"	iframe, iframeDoc,\\n\" + \n" + 
        "			\"	rfxtypes = /^(?:toggle|show|hide)$/,\\n\" + \n" + 
        "			\"	rfxnum = /^([+\\\\-]=)?([\\\\d+.\\\\-]+)([a-z%]*)$/i,\\n\" + \n" + 
        "			\"	timerId,\\n\" + \n" + 
        "			\"	fxAttrs = [\\n\" + \n" + 
        "			\"		// height animations\\n\" + \n" + 
        "			\"		[ \\\"height\\\", \\\"marginTop\\\", \\\"marginBottom\\\", \\\"paddingTop\\\", \\\"paddingBottom\\\" ],\\n\" + \n" + 
        "			\"		// width animations\\n\" + \n" + 
        "			\"		[ \\\"width\\\", \\\"marginLeft\\\", \\\"marginRight\\\", \\\"paddingLeft\\\", \\\"paddingRight\\\" ],\\n\" + \n" + 
        "			\"		// opacity animations\\n\" + \n" + 
        "			\"		[ \\\"opacity\\\" ]\\n\" + \n" + 
        "			\"	],\\n\" + \n" + 
        "			\"	fxNow;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	show: function( speed, easing, callback ) {\\n\" + \n" + 
        "			\"		var elem, display;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( speed || speed === 0 ) {\\n\" + \n" + 
        "			\"			return this.animate( genFx(\\\"show\\\", 3), speed, easing, callback);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( var i = 0, j = this.length; i < j; i++ ) {\\n\" + \n" + 
        "			\"				elem = this[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.style ) {\\n\" + \n" + 
        "			\"					display = elem.style.display;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Reset the inline display of this element to learn if it is\\n\" + \n" + 
        "			\"					// being hidden by cascaded rules or not\\n\" + \n" + 
        "			\"					if ( !jQuery._data(elem, \\\"olddisplay\\\") && display === \\\"none\\\" ) {\\n\" + \n" + 
        "			\"						display = elem.style.display = \\\"\\\";\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Set elements which have been overridden with display: none\\n\" + \n" + 
        "			\"					// in a stylesheet to whatever the default browser style is\\n\" + \n" + 
        "			\"					// for such an element\\n\" + \n" + 
        "			\"					if ( display === \\\"\\\" && jQuery.css( elem, \\\"display\\\" ) === \\\"none\\\" ) {\\n\" + \n" + 
        "			\"						jQuery._data(elem, \\\"olddisplay\\\", defaultDisplay(elem.nodeName));\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Set the display of most of the elements in a second loop\\n\" + \n" + 
        "			\"			// to avoid the constant reflow\\n\" + \n" + 
        "			\"			for ( i = 0; i < j; i++ ) {\\n\" + \n" + 
        "			\"				elem = this[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( elem.style ) {\\n\" + \n" + 
        "			\"					display = elem.style.display;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( display === \\\"\\\" || display === \\\"none\\\" ) {\\n\" + \n" + 
        "			\"						elem.style.display = jQuery._data(elem, \\\"olddisplay\\\") || \\\"\\\";\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	hide: function( speed, easing, callback ) {\\n\" + \n" + 
        "			\"		if ( speed || speed === 0 ) {\\n\" + \n" + 
        "			\"			return this.animate( genFx(\\\"hide\\\", 3), speed, easing, callback);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			for ( var i = 0, j = this.length; i < j; i++ ) {\\n\" + \n" + 
        "			\"				if ( this[i].style ) {\\n\" + \n" + 
        "			\"					var display = jQuery.css( this[i], \\\"display\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( display !== \\\"none\\\" && !jQuery._data( this[i], \\\"olddisplay\\\" ) ) {\\n\" + \n" + 
        "			\"						jQuery._data( this[i], \\\"olddisplay\\\", display );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Set the display of the elements in a second loop\\n\" + \n" + 
        "			\"			// to avoid the constant reflow\\n\" + \n" + 
        "			\"			for ( i = 0; i < j; i++ ) {\\n\" + \n" + 
        "			\"				if ( this[i].style ) {\\n\" + \n" + 
        "			\"					this[i].style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Save the old toggle function\\n\" + \n" + 
        "			\"	_toggle: jQuery.fn.toggle,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	toggle: function( fn, fn2, callback ) {\\n\" + \n" + 
        "			\"		var bool = typeof fn === \\\"boolean\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {\\n\" + \n" + 
        "			\"			this._toggle.apply( this, arguments );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else if ( fn == null || bool ) {\\n\" + \n" + 
        "			\"			this.each(function() {\\n\" + \n" + 
        "			\"				var state = bool ? fn : jQuery(this).is(\\\":hidden\\\");\\n\" + \n" + 
        "			\"				jQuery(this)[ state ? \\\"show\\\" : \\\"hide\\\" ]();\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			this.animate(genFx(\\\"toggle\\\", 3), fn, fn2, callback);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	fadeTo: function( speed, to, easing, callback ) {\\n\" + \n" + 
        "			\"		return this.filter(\\\":hidden\\\").css(\\\"opacity\\\", 0).show().end()\\n\" + \n" + 
        "			\"					.animate({opacity: to}, speed, easing, callback);\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	animate: function( prop, speed, easing, callback ) {\\n\" + \n" + 
        "			\"		var optall = jQuery.speed(speed, easing, callback);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isEmptyObject( prop ) ) {\\n\" + \n" + 
        "			\"			return this.each( optall.complete, [ false ] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Do not change referenced properties as per-property easing will be lost\\n\" + \n" + 
        "			\"		prop = jQuery.extend( {}, prop );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this[ optall.queue === false ? \\\"each\\\" : \\\"queue\\\" ](function() {\\n\" + \n" + 
        "			\"			// XXX 'this' does not always have a nodeName when running the\\n\" + \n" + 
        "			\"			// test suite\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( optall.queue === false ) {\\n\" + \n" + 
        "			\"				jQuery._mark( this );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var opt = jQuery.extend( {}, optall ),\\n\" + \n" + 
        "			\"				isElement = this.nodeType === 1,\\n\" + \n" + 
        "			\"				hidden = isElement && jQuery(this).is(\\\":hidden\\\"),\\n\" + \n" + 
        "			\"				name, val, p,\\n\" + \n" + 
        "			\"				display, e,\\n\" + \n" + 
        "			\"				parts, start, end, unit;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// will store per property easing and be used to determine when an animation is complete\\n\" + \n" + 
        "			\"			opt.animatedProperties = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( p in prop ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// property name normalization\\n\" + \n" + 
        "			\"				name = jQuery.camelCase( p );\\n\" + \n" + 
        "			\"				if ( p !== name ) {\\n\" + \n" + 
        "			\"					prop[ name ] = prop[ p ];\\n\" + \n" + 
        "			\"					delete prop[ p ];\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				val = prop[ name ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)\\n\" + \n" + 
        "			\"				if ( jQuery.isArray( val ) ) {\\n\" + \n" + 
        "			\"					opt.animatedProperties[ name ] = val[ 1 ];\\n\" + \n" + 
        "			\"					val = prop[ name ] = val[ 0 ];\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( val === \\\"hide\\\" && hidden || val === \\\"show\\\" && !hidden ) {\\n\" + \n" + 
        "			\"					return opt.complete.call( this );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( isElement && ( name === \\\"height\\\" || name === \\\"width\\\" ) ) {\\n\" + \n" + 
        "			\"					// Make sure that nothing sneaks out\\n\" + \n" + 
        "			\"					// Record all 3 overflow attributes because IE does not\\n\" + \n" + 
        "			\"					// change the overflow attribute when overflowX and\\n\" + \n" + 
        "			\"					// overflowY are set to the same value\\n\" + \n" + 
        "			\"					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Set display property to inline-block for height/width\\n\" + \n" + 
        "			\"					// animations on inline elements that are having width/height\\n\" + \n" + 
        "			\"					// animated\\n\" + \n" + 
        "			\"					if ( jQuery.css( this, \\\"display\\\" ) === \\\"inline\\\" &&\\n\" + \n" + 
        "			\"							jQuery.css( this, \\\"float\\\" ) === \\\"none\\\" ) {\\n\" + \n" + 
        "			\"						if ( !jQuery.support.inlineBlockNeedsLayout ) {\\n\" + \n" + 
        "			\"							this.style.display = \\\"inline-block\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						} else {\\n\" + \n" + 
        "			\"							display = defaultDisplay( this.nodeName );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							// inline-level elements accept inline-block;\\n\" + \n" + 
        "			\"							// block-level elements need to be inline with layout\\n\" + \n" + 
        "			\"							if ( display === \\\"inline\\\" ) {\\n\" + \n" + 
        "			\"								this.style.display = \\\"inline-block\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							} else {\\n\" + \n" + 
        "			\"								this.style.display = \\\"inline\\\";\\n\" + \n" + 
        "			\"								this.style.zoom = 1;\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( opt.overflow != null ) {\\n\" + \n" + 
        "			\"				this.style.overflow = \\\"hidden\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( p in prop ) {\\n\" + \n" + 
        "			\"				e = new jQuery.fx( this, opt, p );\\n\" + \n" + 
        "			\"				val = prop[ p ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( rfxtypes.test(val) ) {\\n\" + \n" + 
        "			\"					e[ val === \\\"toggle\\\" ? hidden ? \\\"show\\\" : \\\"hide\\\" : val ]();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				} else {\\n\" + \n" + 
        "			\"					parts = rfxnum.exec( val );\\n\" + \n" + 
        "			\"					start = e.cur();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					if ( parts ) {\\n\" + \n" + 
        "			\"						end = parseFloat( parts[2] );\\n\" + \n" + 
        "			\"						unit = parts[3] || ( jQuery.cssNumber[ p ] ? \\\"\\\" : \\\"px\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// We need to compute starting value\\n\" + \n" + 
        "			\"						if ( unit !== \\\"px\\\" ) {\\n\" + \n" + 
        "			\"							jQuery.style( this, p, (end || 1) + unit);\\n\" + \n" + 
        "			\"							start = ((end || 1) / e.cur()) * start;\\n\" + \n" + 
        "			\"							jQuery.style( this, p, start + unit);\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						// If a +=/-= token was provided, we're doing a relative animation\\n\" + \n" + 
        "			\"						if ( parts[1] ) {\\n\" + \n" + 
        "			\"							end = ( (parts[ 1 ] === \\\"-=\\\" ? -1 : 1) * end ) + start;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						e.custom( start, end, unit );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					} else {\\n\" + \n" + 
        "			\"						e.custom( start, val, \\\"\\\" );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// For JS strict compliance\\n\" + \n" + 
        "			\"			return true;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	stop: function( clearQueue, gotoEnd ) {\\n\" + \n" + 
        "			\"		if ( clearQueue ) {\\n\" + \n" + 
        "			\"			this.queue([]);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.each(function() {\\n\" + \n" + 
        "			\"			var timers = jQuery.timers,\\n\" + \n" + 
        "			\"				i = timers.length;\\n\" + \n" + 
        "			\"			// clear marker counters if we know they won't be\\n\" + \n" + 
        "			\"			if ( !gotoEnd ) {\\n\" + \n" + 
        "			\"				jQuery._unmark( true, this );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			while ( i-- ) {\\n\" + \n" + 
        "			\"				if ( timers[i].elem === this ) {\\n\" + \n" + 
        "			\"					if (gotoEnd) {\\n\" + \n" + 
        "			\"						// force the next step to be the last\\n\" + \n" + 
        "			\"						timers[i](true);\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					timers.splice(i, 1);\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// start the next in the queue if the last step wasn't forced\\n\" + \n" + 
        "			\"		if ( !gotoEnd ) {\\n\" + \n" + 
        "			\"			this.dequeue();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return this;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Animations created synchronously will run synchronously\\n\" + \n" + 
        "			\"function createFxNow() {\\n\" + \n" + 
        "			\"	setTimeout( clearFxNow, 0 );\\n\" + \n" + 
        "			\"	return ( fxNow = jQuery.now() );\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function clearFxNow() {\\n\" + \n" + 
        "			\"	fxNow = undefined;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Generate parameters to create a standard animation\\n\" + \n" + 
        "			\"function genFx( type, num ) {\\n\" + \n" + 
        "			\"	var obj = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {\\n\" + \n" + 
        "			\"		obj[ this ] = type;\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return obj;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Generate shortcuts for custom animations\\n\" + \n" + 
        "			\"jQuery.each({\\n\" + \n" + 
        "			\"	slideDown: genFx(\\\"show\\\", 1),\\n\" + \n" + 
        "			\"	slideUp: genFx(\\\"hide\\\", 1),\\n\" + \n" + 
        "			\"	slideToggle: genFx(\\\"toggle\\\", 1),\\n\" + \n" + 
        "			\"	fadeIn: { opacity: \\\"show\\\" },\\n\" + \n" + 
        "			\"	fadeOut: { opacity: \\\"hide\\\" },\\n\" + \n" + 
        "			\"	fadeToggle: { opacity: \\\"toggle\\\" }\\n\" + \n" + 
        "			\"}, function( name, props ) {\\n\" + \n" + 
        "			\"	jQuery.fn[ name ] = function( speed, easing, callback ) {\\n\" + \n" + 
        "			\"		return this.animate( props, speed, easing, callback );\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend({\\n\" + \n" + 
        "			\"	speed: function( speed, easing, fn ) {\\n\" + \n" + 
        "			\"		var opt = speed && typeof speed === \\\"object\\\" ? jQuery.extend({}, speed) : {\\n\" + \n" + 
        "			\"			complete: fn || !fn && easing ||\\n\" + \n" + 
        "			\"				jQuery.isFunction( speed ) && speed,\\n\" + \n" + 
        "			\"			duration: speed,\\n\" + \n" + 
        "			\"			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \\\"number\\\" ? opt.duration :\\n\" + \n" + 
        "			\"			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Queueing\\n\" + \n" + 
        "			\"		opt.old = opt.complete;\\n\" + \n" + 
        "			\"		opt.complete = function( noUnmark ) {\\n\" + \n" + 
        "			\"			if ( jQuery.isFunction( opt.old ) ) {\\n\" + \n" + 
        "			\"				opt.old.call( this );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( opt.queue !== false ) {\\n\" + \n" + 
        "			\"				jQuery.dequeue( this );\\n\" + \n" + 
        "			\"			} else if ( noUnmark !== false ) {\\n\" + \n" + 
        "			\"				jQuery._unmark( this );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return opt;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	easing: {\\n\" + \n" + 
        "			\"		linear: function( p, n, firstNum, diff ) {\\n\" + \n" + 
        "			\"			return firstNum + diff * p;\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"		swing: function( p, n, firstNum, diff ) {\\n\" + \n" + 
        "			\"			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	timers: [],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	fx: function( elem, options, prop ) {\\n\" + \n" + 
        "			\"		this.options = options;\\n\" + \n" + 
        "			\"		this.elem = elem;\\n\" + \n" + 
        "			\"		this.prop = prop;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		options.orig = options.orig || {};\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fx.prototype = {\\n\" + \n" + 
        "			\"	// Simple function for setting a style value\\n\" + \n" + 
        "			\"	update: function() {\\n\" + \n" + 
        "			\"		if ( this.options.step ) {\\n\" + \n" + 
        "			\"			this.options.step.call( this.elem, this.now, this );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get the current size\\n\" + \n" + 
        "			\"	cur: function() {\\n\" + \n" + 
        "			\"		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {\\n\" + \n" + 
        "			\"			return this.elem[ this.prop ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var parsed,\\n\" + \n" + 
        "			\"			r = jQuery.css( this.elem, this.prop );\\n\" + \n" + 
        "			\"		// Empty strings, null, undefined and \\\"auto\\\" are converted to 0,\\n\" + \n" + 
        "			\"		// complex values such as \\\"rotate(1rad)\\\" are returned as is,\\n\" + \n" + 
        "			\"		// simple values such as \\\"10px\\\" are parsed to Float.\\n\" + \n" + 
        "			\"		return isNaN( parsed = parseFloat( r ) ) ? !r || r === \\\"auto\\\" ? 0 : r : parsed;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Start an animation from one number to another\\n\" + \n" + 
        "			\"	custom: function( from, to, unit ) {\\n\" + \n" + 
        "			\"		var self = this,\\n\" + \n" + 
        "			\"			fx = jQuery.fx;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.startTime = fxNow || createFxNow();\\n\" + \n" + 
        "			\"		this.start = from;\\n\" + \n" + 
        "			\"		this.end = to;\\n\" + \n" + 
        "			\"		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? \\\"\\\" : \\\"px\\\" );\\n\" + \n" + 
        "			\"		this.now = this.start;\\n\" + \n" + 
        "			\"		this.pos = this.state = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		function t( gotoEnd ) {\\n\" + \n" + 
        "			\"			return self.step(gotoEnd);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		t.elem = this.elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( t() && jQuery.timers.push(t) && !timerId ) {\\n\" + \n" + 
        "			\"			timerId = setInterval( fx.tick, fx.interval );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Simple 'show' function\\n\" + \n" + 
        "			\"	show: function() {\\n\" + \n" + 
        "			\"		// Remember where we started, so that we can go back to it later\\n\" + \n" + 
        "			\"		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );\\n\" + \n" + 
        "			\"		this.options.show = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Begin the animation\\n\" + \n" + 
        "			\"		// Make sure that we start at a small width/height to avoid any\\n\" + \n" + 
        "			\"		// flash of content\\n\" + \n" + 
        "			\"		this.custom(this.prop === \\\"width\\\" || this.prop === \\\"height\\\" ? 1 : 0, this.cur());\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Start by showing the element\\n\" + \n" + 
        "			\"		jQuery( this.elem ).show();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Simple 'hide' function\\n\" + \n" + 
        "			\"	hide: function() {\\n\" + \n" + 
        "			\"		// Remember where we started, so that we can go back to it later\\n\" + \n" + 
        "			\"		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );\\n\" + \n" + 
        "			\"		this.options.hide = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Begin the animation\\n\" + \n" + 
        "			\"		this.custom(this.cur(), 0);\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Each step of an animation\\n\" + \n" + 
        "			\"	step: function( gotoEnd ) {\\n\" + \n" + 
        "			\"		var t = fxNow || createFxNow(),\\n\" + \n" + 
        "			\"			done = true,\\n\" + \n" + 
        "			\"			elem = this.elem,\\n\" + \n" + 
        "			\"			options = this.options,\\n\" + \n" + 
        "			\"			i, n;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( gotoEnd || t >= options.duration + this.startTime ) {\\n\" + \n" + 
        "			\"			this.now = this.end;\\n\" + \n" + 
        "			\"			this.pos = this.state = 1;\\n\" + \n" + 
        "			\"			this.update();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			options.animatedProperties[ this.prop ] = true;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( i in options.animatedProperties ) {\\n\" + \n" + 
        "			\"				if ( options.animatedProperties[i] !== true ) {\\n\" + \n" + 
        "			\"					done = false;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( done ) {\\n\" + \n" + 
        "			\"				// Reset the overflow\\n\" + \n" + 
        "			\"				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					jQuery.each( [ \\\"\\\", \\\"X\\\", \\\"Y\\\" ], function (index, value) {\\n\" + \n" + 
        "			\"						elem.style[ \\\"overflow\\\" + value ] = options.overflow[index];\\n\" + \n" + 
        "			\"					});\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Hide the element if the \\\"hide\\\" operation was done\\n\" + \n" + 
        "			\"				if ( options.hide ) {\\n\" + \n" + 
        "			\"					jQuery(elem).hide();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Reset the properties, if the item has been hidden or shown\\n\" + \n" + 
        "			\"				if ( options.hide || options.show ) {\\n\" + \n" + 
        "			\"					for ( var p in options.animatedProperties ) {\\n\" + \n" + 
        "			\"						jQuery.style( elem, p, options.orig[p] );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Execute the complete function\\n\" + \n" + 
        "			\"				options.complete.call( elem );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			// classical easing cannot be used with an Infinity duration\\n\" + \n" + 
        "			\"			if ( options.duration == Infinity ) {\\n\" + \n" + 
        "			\"				this.now = t;\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				n = t - this.startTime;\\n\" + \n" + 
        "			\"				this.state = n / options.duration;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				// Perform the easing function, defaults to swing\\n\" + \n" + 
        "			\"				this.pos = jQuery.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );\\n\" + \n" + 
        "			\"				this.now = this.start + ((this.end - this.start) * this.pos);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			// Perform the next step of the animation\\n\" + \n" + 
        "			\"			this.update();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return true;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.extend( jQuery.fx, {\\n\" + \n" + 
        "			\"	tick: function() {\\n\" + \n" + 
        "			\"		for ( var timers = jQuery.timers, i = 0 ; i < timers.length ; ++i ) {\\n\" + \n" + 
        "			\"			if ( !timers[i]() ) {\\n\" + \n" + 
        "			\"				timers.splice(i--, 1);\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !timers.length ) {\\n\" + \n" + 
        "			\"			jQuery.fx.stop();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	interval: 13,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	stop: function() {\\n\" + \n" + 
        "			\"		clearInterval( timerId );\\n\" + \n" + 
        "			\"		timerId = null;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	speeds: {\\n\" + \n" + 
        "			\"		slow: 600,\\n\" + \n" + 
        "			\"		fast: 200,\\n\" + \n" + 
        "			\"		// Default speed\\n\" + \n" + 
        "			\"		_default: 400\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	step: {\\n\" + \n" + 
        "			\"		opacity: function( fx ) {\\n\" + \n" + 
        "			\"			jQuery.style( fx.elem, \\\"opacity\\\", fx.now );\\n\" + \n" + 
        "			\"		},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		_default: function( fx ) {\\n\" + \n" + 
        "			\"			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {\\n\" + \n" + 
        "			\"				fx.elem.style[ fx.prop ] = (fx.prop === \\\"width\\\" || fx.prop === \\\"height\\\" ? Math.max(0, fx.now) : fx.now) + fx.unit;\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				fx.elem[ fx.prop ] = fx.now;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( jQuery.expr && jQuery.expr.filters ) {\\n\" + \n" + 
        "			\"	jQuery.expr.filters.animated = function( elem ) {\\n\" + \n" + 
        "			\"		return jQuery.grep(jQuery.timers, function( fn ) {\\n\" + \n" + 
        "			\"			return elem === fn.elem;\\n\" + \n" + 
        "			\"		}).length;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Try to restore the default display value of an element\\n\" + \n" + 
        "			\"function defaultDisplay( nodeName ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( !elemdisplay[ nodeName ] ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var body = document.body,\\n\" + \n" + 
        "			\"			elem = jQuery( \\\"<\\\" + nodeName + \\\">\\\" ).appendTo( body ),\\n\" + \n" + 
        "			\"			display = elem.css( \\\"display\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		elem.remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// If the simple way fails,\\n\" + \n" + 
        "			\"		// get element's real default display by attaching it to a temp iframe\\n\" + \n" + 
        "			\"		if ( display === \\\"none\\\" || display === \\\"\\\" ) {\\n\" + \n" + 
        "			\"			// No iframe to use yet, so create it\\n\" + \n" + 
        "			\"			if ( !iframe ) {\\n\" + \n" + 
        "			\"				iframe = document.createElement( \\\"iframe\\\" );\\n\" + \n" + 
        "			\"				iframe.frameBorder = iframe.width = iframe.height = 0;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			body.appendChild( iframe );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Create a cacheable copy of the iframe document on first call.\\n\" + \n" + 
        "			\"			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML\\n\" + \n" + 
        "			\"			// document to it; WebKit & Firefox won't allow reusing the iframe document.\\n\" + \n" + 
        "			\"			if ( !iframeDoc || !iframe.createElement ) {\\n\" + \n" + 
        "			\"				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;\\n\" + \n" + 
        "			\"				iframeDoc.write( ( document.compatMode === \\\"CSS1Compat\\\" ? \\\"<!doctype html>\\\" : \\\"\\\" ) + \\\"<html><body>\\\" );\\n\" + \n" + 
        "			\"				iframeDoc.close();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elem = iframeDoc.createElement( nodeName );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			iframeDoc.body.appendChild( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			display = jQuery.css( elem, \\\"display\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			body.removeChild( iframe );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Store the correct default display\\n\" + \n" + 
        "			\"		elemdisplay[ nodeName ] = display;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elemdisplay[ nodeName ];\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"var rtable = /^t(?:able|d|h)$/i,\\n\" + \n" + 
        "			\"	rroot = /^(?:body|html)$/i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"if ( \\\"getBoundingClientRect\\\" in document.documentElement ) {\\n\" + \n" + 
        "			\"	jQuery.fn.offset = function( options ) {\\n\" + \n" + 
        "			\"		var elem = this[0], box;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( options ) {\\n\" + \n" + 
        "			\"			return this.each(function( i ) {\\n\" + \n" + 
        "			\"				jQuery.offset.setOffset( this, options, i );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !elem || !elem.ownerDocument ) {\\n\" + \n" + 
        "			\"			return null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( elem === elem.ownerDocument.body ) {\\n\" + \n" + 
        "			\"			return jQuery.offset.bodyOffset( elem );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		try {\\n\" + \n" + 
        "			\"			box = elem.getBoundingClientRect();\\n\" + \n" + 
        "			\"		} catch(e) {}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var doc = elem.ownerDocument,\\n\" + \n" + 
        "			\"			docElem = doc.documentElement;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Make sure we're not dealing with a disconnected DOM node\\n\" + \n" + 
        "			\"		if ( !box || !jQuery.contains( docElem, elem ) ) {\\n\" + \n" + 
        "			\"			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var body = doc.body,\\n\" + \n" + 
        "			\"			win = getWindow(doc),\\n\" + \n" + 
        "			\"			clientTop  = docElem.clientTop  || body.clientTop  || 0,\\n\" + \n" + 
        "			\"			clientLeft = docElem.clientLeft || body.clientLeft || 0,\\n\" + \n" + 
        "			\"			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,\\n\" + \n" + 
        "			\"			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,\\n\" + \n" + 
        "			\"			top  = box.top  + scrollTop  - clientTop,\\n\" + \n" + 
        "			\"			left = box.left + scrollLeft - clientLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return { top: top, left: left };\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"} else {\\n\" + \n" + 
        "			\"	jQuery.fn.offset = function( options ) {\\n\" + \n" + 
        "			\"		var elem = this[0];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( options ) {\\n\" + \n" + 
        "			\"			return this.each(function( i ) {\\n\" + \n" + 
        "			\"				jQuery.offset.setOffset( this, options, i );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !elem || !elem.ownerDocument ) {\\n\" + \n" + 
        "			\"			return null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( elem === elem.ownerDocument.body ) {\\n\" + \n" + 
        "			\"			return jQuery.offset.bodyOffset( elem );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		jQuery.offset.initialize();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var computedStyle,\\n\" + \n" + 
        "			\"			offsetParent = elem.offsetParent,\\n\" + \n" + 
        "			\"			prevOffsetParent = elem,\\n\" + \n" + 
        "			\"			doc = elem.ownerDocument,\\n\" + \n" + 
        "			\"			docElem = doc.documentElement,\\n\" + \n" + 
        "			\"			body = doc.body,\\n\" + \n" + 
        "			\"			defaultView = doc.defaultView,\\n\" + \n" + 
        "			\"			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,\\n\" + \n" + 
        "			\"			top = elem.offsetTop,\\n\" + \n" + 
        "			\"			left = elem.offsetLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {\\n\" + \n" + 
        "			\"			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === \\\"fixed\\\" ) {\\n\" + \n" + 
        "			\"				break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;\\n\" + \n" + 
        "			\"			top  -= elem.scrollTop;\\n\" + \n" + 
        "			\"			left -= elem.scrollLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( elem === offsetParent ) {\\n\" + \n" + 
        "			\"				top  += elem.offsetTop;\\n\" + \n" + 
        "			\"				left += elem.offsetLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {\\n\" + \n" + 
        "			\"					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;\\n\" + \n" + 
        "			\"					left += parseFloat( computedStyle.borderLeftWidth ) || 0;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				prevOffsetParent = offsetParent;\\n\" + \n" + 
        "			\"				offsetParent = elem.offsetParent;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== \\\"visible\\\" ) {\\n\" + \n" + 
        "			\"				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;\\n\" + \n" + 
        "			\"				left += parseFloat( computedStyle.borderLeftWidth ) || 0;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			prevComputedStyle = computedStyle;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( prevComputedStyle.position === \\\"relative\\\" || prevComputedStyle.position === \\\"static\\\" ) {\\n\" + \n" + 
        "			\"			top  += body.offsetTop;\\n\" + \n" + 
        "			\"			left += body.offsetLeft;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === \\\"fixed\\\" ) {\\n\" + \n" + 
        "			\"			top  += Math.max( docElem.scrollTop, body.scrollTop );\\n\" + \n" + 
        "			\"			left += Math.max( docElem.scrollLeft, body.scrollLeft );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return { top: top, left: left };\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.offset = {\\n\" + \n" + 
        "			\"	initialize: function() {\\n\" + \n" + 
        "			\"		var body = document.body, container = document.createElement(\\\"div\\\"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, \\\"marginTop\\\") ) || 0,\\n\" + \n" + 
        "			\"			html = \\\"<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		jQuery.extend( container.style, { position: \\\"absolute\\\", top: 0, left: 0, margin: 0, border: 0, width: \\\"1px\\\", height: \\\"1px\\\", visibility: \\\"hidden\\\" } );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		container.innerHTML = html;\\n\" + \n" + 
        "			\"		body.insertBefore( container, body.firstChild );\\n\" + \n" + 
        "			\"		innerDiv = container.firstChild;\\n\" + \n" + 
        "			\"		checkDiv = innerDiv.firstChild;\\n\" + \n" + 
        "			\"		td = innerDiv.nextSibling.firstChild.firstChild;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);\\n\" + \n" + 
        "			\"		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		checkDiv.style.position = \\\"fixed\\\";\\n\" + \n" + 
        "			\"		checkDiv.style.top = \\\"20px\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// safari subtracts parent border width here which is 5px\\n\" + \n" + 
        "			\"		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);\\n\" + \n" + 
        "			\"		checkDiv.style.position = checkDiv.style.top = \\\"\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		innerDiv.style.overflow = \\\"hidden\\\";\\n\" + \n" + 
        "			\"		innerDiv.style.position = \\\"relative\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		body.removeChild( container );\\n\" + \n" + 
        "			\"		jQuery.offset.initialize = jQuery.noop;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	bodyOffset: function( body ) {\\n\" + \n" + 
        "			\"		var top = body.offsetTop,\\n\" + \n" + 
        "			\"			left = body.offsetLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		jQuery.offset.initialize();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {\\n\" + \n" + 
        "			\"			top  += parseFloat( jQuery.css(body, \\\"marginTop\\\") ) || 0;\\n\" + \n" + 
        "			\"			left += parseFloat( jQuery.css(body, \\\"marginLeft\\\") ) || 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return { top: top, left: left };\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	setOffset: function( elem, options, i ) {\\n\" + \n" + 
        "			\"		var position = jQuery.css( elem, \\\"position\\\" );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// set position first, in-case top/left are set even on static elem\\n\" + \n" + 
        "			\"		if ( position === \\\"static\\\" ) {\\n\" + \n" + 
        "			\"			elem.style.position = \\\"relative\\\";\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var curElem = jQuery( elem ),\\n\" + \n" + 
        "			\"			curOffset = curElem.offset(),\\n\" + \n" + 
        "			\"			curCSSTop = jQuery.css( elem, \\\"top\\\" ),\\n\" + \n" + 
        "			\"			curCSSLeft = jQuery.css( elem, \\\"left\\\" ),\\n\" + \n" + 
        "			\"			calculatePosition = (position === \\\"absolute\\\" || position === \\\"fixed\\\") && jQuery.inArray(\\\"auto\\\", [curCSSTop, curCSSLeft]) > -1,\\n\" + \n" + 
        "			\"			props = {}, curPosition = {}, curTop, curLeft;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed\\n\" + \n" + 
        "			\"		if ( calculatePosition ) {\\n\" + \n" + 
        "			\"			curPosition = curElem.position();\\n\" + \n" + 
        "			\"			curTop = curPosition.top;\\n\" + \n" + 
        "			\"			curLeft = curPosition.left;\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			curTop = parseFloat( curCSSTop ) || 0;\\n\" + \n" + 
        "			\"			curLeft = parseFloat( curCSSLeft ) || 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( options ) ) {\\n\" + \n" + 
        "			\"			options = options.call( elem, i, curOffset );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if (options.top != null) {\\n\" + \n" + 
        "			\"			props.top = (options.top - curOffset.top) + curTop;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		if (options.left != null) {\\n\" + \n" + 
        "			\"			props.left = (options.left - curOffset.left) + curLeft;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( \\\"using\\\" in options ) {\\n\" + \n" + 
        "			\"			options.using.call( elem, props );\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			curElem.css( props );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"jQuery.fn.extend({\\n\" + \n" + 
        "			\"	position: function() {\\n\" + \n" + 
        "			\"		if ( !this[0] ) {\\n\" + \n" + 
        "			\"			return null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var elem = this[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get *real* offsetParent\\n\" + \n" + 
        "			\"		offsetParent = this.offsetParent(),\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get correct offsets\\n\" + \n" + 
        "			\"		offset       = this.offset(),\\n\" + \n" + 
        "			\"		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Subtract element margins\\n\" + \n" + 
        "			\"		// note: when an element has margin: auto the offsetLeft and marginLeft\\n\" + \n" + 
        "			\"		// are the same in Safari causing offset.left to incorrectly be 0\\n\" + \n" + 
        "			\"		offset.top  -= parseFloat( jQuery.css(elem, \\\"marginTop\\\") ) || 0;\\n\" + \n" + 
        "			\"		offset.left -= parseFloat( jQuery.css(elem, \\\"marginLeft\\\") ) || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Add offsetParent borders\\n\" + \n" + 
        "			\"		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], \\\"borderTopWidth\\\") ) || 0;\\n\" + \n" + 
        "			\"		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], \\\"borderLeftWidth\\\") ) || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Subtract the two offsets\\n\" + \n" + 
        "			\"		return {\\n\" + \n" + 
        "			\"			top:  offset.top  - parentOffset.top,\\n\" + \n" + 
        "			\"			left: offset.left - parentOffset.left\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	offsetParent: function() {\\n\" + \n" + 
        "			\"		return this.map(function() {\\n\" + \n" + 
        "			\"			var offsetParent = this.offsetParent || document.body;\\n\" + \n" + 
        "			\"			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, \\\"position\\\") === \\\"static\\\") ) {\\n\" + \n" + 
        "			\"				offsetParent = offsetParent.offsetParent;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			return offsetParent;\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create scrollLeft and scrollTop methods\\n\" + \n" + 
        "			\"jQuery.each( [\\\"Left\\\", \\\"Top\\\"], function( i, name ) {\\n\" + \n" + 
        "			\"	var method = \\\"scroll\\\" + name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.fn[ method ] = function( val ) {\\n\" + \n" + 
        "			\"		var elem, win;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( val === undefined ) {\\n\" + \n" + 
        "			\"			elem = this[ 0 ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !elem ) {\\n\" + \n" + 
        "			\"				return null;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			win = getWindow( elem );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			// Return the scroll offset\\n\" + \n" + 
        "			\"			return win ? (\\\"pageXOffset\\\" in win) ? win[ i ? \\\"pageYOffset\\\" : \\\"pageXOffset\\\" ] :\\n\" + \n" + 
        "			\"				jQuery.support.boxModel && win.document.documentElement[ method ] ||\\n\" + \n" + 
        "			\"					win.document.body[ method ] :\\n\" + \n" + 
        "			\"				elem[ method ];\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the scroll offset\\n\" + \n" + 
        "			\"		return this.each(function() {\\n\" + \n" + 
        "			\"			win = getWindow( this );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( win ) {\\n\" + \n" + 
        "			\"				win.scrollTo(\\n\" + \n" + 
        "			\"					!i ? val : jQuery( win ).scrollLeft(),\\n\" + \n" + 
        "			\"					 i ? val : jQuery( win ).scrollTop()\\n\" + \n" + 
        "			\"				);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				this[ method ] = val;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		});\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function getWindow( elem ) {\\n\" + \n" + 
        "			\"	return jQuery.isWindow( elem ) ?\\n\" + \n" + 
        "			\"		elem :\\n\" + \n" + 
        "			\"		elem.nodeType === 9 ?\\n\" + \n" + 
        "			\"			elem.defaultView || elem.parentWindow :\\n\" + \n" + 
        "			\"			false;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods\\n\" + \n" + 
        "			\"jQuery.each([ \\\"Height\\\", \\\"Width\\\" ], function( i, name ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var type = name.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// innerHeight and innerWidth\\n\" + \n" + 
        "			\"	jQuery.fn[ \\\"inner\\\" + name ] = function() {\\n\" + \n" + 
        "			\"		var elem = this[0];\\n\" + \n" + 
        "			\"		return elem && elem.style ?\\n\" + \n" + 
        "			\"			parseFloat( jQuery.css( elem, type, \\\"padding\\\" ) ) :\\n\" + \n" + 
        "			\"			null;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// outerHeight and outerWidth\\n\" + \n" + 
        "			\"	jQuery.fn[ \\\"outer\\\" + name ] = function( margin ) {\\n\" + \n" + 
        "			\"		var elem = this[0];\\n\" + \n" + 
        "			\"		return elem && elem.style ?\\n\" + \n" + 
        "			\"			parseFloat( jQuery.css( elem, type, margin ? \\\"margin\\\" : \\\"border\\\" ) ) :\\n\" + \n" + 
        "			\"			null;\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.fn[ type ] = function( size ) {\\n\" + \n" + 
        "			\"		// Get window width or height\\n\" + \n" + 
        "			\"		var elem = this[0];\\n\" + \n" + 
        "			\"		if ( !elem ) {\\n\" + \n" + 
        "			\"			return size == null ? null : this;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isFunction( size ) ) {\\n\" + \n" + 
        "			\"			return this.each(function( i ) {\\n\" + \n" + 
        "			\"				var self = jQuery( this );\\n\" + \n" + 
        "			\"				self[ type ]( size.call( this, i, self[ type ]() ) );\\n\" + \n" + 
        "			\"			});\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( jQuery.isWindow( elem ) ) {\\n\" + \n" + 
        "			\"			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode\\n\" + \n" + 
        "			\"			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat\\n\" + \n" + 
        "			\"			var docElemProp = elem.document.documentElement[ \\\"client\\\" + name ],\\n\" + \n" + 
        "			\"				body = elem.document.body;\\n\" + \n" + 
        "			\"			return elem.document.compatMode === \\\"CSS1Compat\\\" && docElemProp ||\\n\" + \n" + 
        "			\"				body && body[ \\\"client\\\" + name ] || docElemProp;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get document width or height\\n\" + \n" + 
        "			\"		} else if ( elem.nodeType === 9 ) {\\n\" + \n" + 
        "			\"			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater\\n\" + \n" + 
        "			\"			return Math.max(\\n\" + \n" + 
        "			\"				elem.documentElement[\\\"client\\\" + name],\\n\" + \n" + 
        "			\"				elem.body[\\\"scroll\\\" + name], elem.documentElement[\\\"scroll\\\" + name],\\n\" + \n" + 
        "			\"				elem.body[\\\"offset\\\" + name], elem.documentElement[\\\"offset\\\" + name]\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Get or set width or height on the element\\n\" + \n" + 
        "			\"		} else if ( size === undefined ) {\\n\" + \n" + 
        "			\"			var orig = jQuery.css( elem, type ),\\n\" + \n" + 
        "			\"				ret = parseFloat( orig );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			return jQuery.isNaN( ret ) ? orig : ret;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Set the width or height on the element (default to pixels if value is unitless)\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			return this.css( type, typeof size === \\\"string\\\" ? size : size + \\\"px\\\" );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Expose jQuery to the global object\\n\" + \n" + 
        "			\"window.jQuery = window.$ = jQuery;\\n\" + \n" + 
        "			\"})(window);\\n\" + \n" + 
        "			\"(function () {\\n\" + \n" + 
        "			\"/*!\\n\" + \n" + 
        "			\" * XRegExp 2.0.0 <xregexp.com> MIT License\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"var XRegExp;XRegExp=XRegExp||function(n){\\\"use strict\\\";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?\\\"g\\\":\\\"\\\")+(n.ignoreCase?\\\"i\\\":\\\"\\\")+(n.multiline?\\\"m\\\":\\\"\\\")+(n.extended?\\\"x\\\":\\\"\\\")+(n.sticky?\\\"y\\\":\\\"\\\")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError(\\\"type RegExp expected\\\");var f=i.replace.call(g(n)+(r||\\\"\\\"),h,\\\"\\\");return u&&(f=i.replace.call(f,new RegExp(\\\"[\\\"+u+\\\"]+\\\",\\\"g\\\"),\\\"\\\")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()===\\\"[object \\\"+t+\\\"]\\\"}function d(n){return n=n||{},n===\\\"all\\\"||n.all?n={natives:!0,extensibility:!0}:s(n,\\\"string\\\")&&(n=t.forEach(n,/[^\\\\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope===\\\"all\\\"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?\\\"on\\\":\\\"off\\\"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e=\\\"default\\\",rt=\\\"class\\\",it={\\\"default\\\":/^(?:\\\\\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\\\d*|x[\\\\dA-Fa-f]{2}|u[\\\\dA-Fa-f]{4}|c[A-Za-z]|[\\\\s\\\\S])|\\\\(\\\\?[:=!]|[?*+]\\\\?|{\\\\d+(?:,\\\\d*)?}\\\\??)/,\\\"class\\\":/^(?:\\\\\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\\\dA-Fa-f]{2}|u[\\\\dA-Fa-f]{4}|c[A-Za-z]|[\\\\s\\\\S]))/},et=/\\\\$(?:{([\\\\w$]+)}|(\\\\d\\\\d?|[\\\\s\\\\S]))/g,h=/([\\\\s\\\\S])(?=[\\\\s\\\\S]*\\\\1)/g,nt=/^(?:[?*+]|{\\\\d+(?:,\\\\d*)?})\\\\??/,ft=i.exec.call(/()??/,\\\"\\\")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w=\\\"gim\\\"+(l?\\\"y\\\":\\\"\\\");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError(\\\"can't supply flags when constructing one RegExp from another\\\");return o(r)}if(y)throw new Error(\\\"can't call the XRegExp constructor within token definition functions\\\");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?\\\"\\\":String(r),u=u===n?\\\"\\\":String(u),i.match.call(u,h))throw new SyntaxError(\\\"invalid duplicate regular expression flag\\\");for(r=i.replace.call(r,/^\\\\(\\\\?([\\\\w$]+)\\\\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError(\\\"can't use flag g or y in mode modifier\\\");return u=i.replace.call(u+t,h,\\\"\\\"),\\\"\\\"}),t.forEach(u,/[\\\\s\\\\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError(\\\"invalid regular expression flag \\\"+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p===\\\"[\\\"?a=rt:p===\\\"]\\\"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(\\\"\\\"),i.replace.call(u,/[^gimy]+/g,\\\"\\\")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,\\\"g\\\"+(l?\\\"y\\\":\\\"\\\")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,\\\"\\\"))},off:function(){throw new Error(\\\"extensibility must be installed before using addToken\\\");}},t.addToken=c.off,t.cache=function(n,i){var r=n+\\\"/\\\"+(i||\\\"\\\");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\\\\]{}()*+?.,\\\\\\\\^$|#\\\\s]/g,\\\"\\\\\\\\$&\\\")},t.exec=function(n,t,i,u){var e=o(t,\\\"g\\\"+(u&&l?\\\"y\\\":\\\"\\\"),u===!1?\\\"y\\\":\\\"\\\"),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,\\\"g\\\")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,\\\"regexp\\\")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||\\\"\\\":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e=\\\"all\\\"),s=o(u,e===\\\"all\\\"?\\\"g\\\":\\\"\\\",e===\\\"all\\\"?\\\"\\\":\\\"g\\\")):e===\\\"all\\\"&&(s=new RegExp(t.escape(String(u)),\\\"g\\\")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\\\\()(?!\\\\?)|\\\\\\\\([1-9]\\\\d*)|\\\\\\\\[\\\\s\\\\S]|\\\\[(?:[^\\\\\\\\\\\\]]|\\\\\\\\[\\\\s\\\\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return\\\"(?<\\\"+r+\\\">\\\"}else if(i)return\\\"\\\\\\\\\\\"+(+i+f);return n},e=[],r,u;if(!(s(n,\\\"array\\\")&&n.length))throw new TypeError(\\\"patterns must be a nonempty array\\\");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join(\\\"|\\\"),i)},t.version=\\\"2.0.0\\\",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,\\\"\\\")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),\\\"g\\\",\\\"\\\")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+=\\\"\\\",s(r,\\\"function\\\")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||\\\"\\\";if(f=u?a(u,i):-1,f<0)throw new SyntaxError(\\\"backreference to undefined group \\\"+t);return n[f+1]||\\\"\\\"}if(r===\\\"$\\\")return\\\"$\\\";if(r===\\\"&\\\"||+r==0)return n[0];if(r===\\\"`\\\")return n[n.length-1].slice(0,n[n.length-2]);if(r===\\\"'\\\")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError(\\\"backreference to undefined group \\\"+t);return n[r]||\\\"\\\"}throw new SyntaxError(\\\"invalid token \\\"+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,\\\"\\\")||s)&&f.push(\\\"\\\"):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\\\\\\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\\\\dA-Fa-f]{4})|x(?![\\\\dA-Fa-f]{2}))/,function(n,t){if(n[1]===\\\"B\\\"&&t===e)return n[0];throw new SyntaxError(\\\"invalid escape \\\"+n[0]);},{scope:\\\"all\\\"}),u(/\\\\[(\\\\^?)]/,function(n){return n[1]?\\\"[\\\\\\\\s\\\\\\\\S]\\\":\\\"\\\\\\\\b\\\\\\\\B\\\"}),u(/(?:\\\\(\\\\?#[^)]*\\\\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?\\\"\\\":\\\"(?:)\\\"}),u(/\\\\\\\\k<([\\\\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError(\\\"backreference to undefined group \\\"+n[0]);return\\\"\\\\\\\\\\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?\\\"\\\":\\\"(?:)\\\")}),u(/(?:\\\\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?\\\"\\\":\\\"(?:)\\\"},{trigger:function(){return this.hasFlag(\\\"x\\\")},customFlags:\\\"x\\\"}),u(/\\\\./,function(){return\\\"[\\\\\\\\s\\\\\\\\S]\\\"},{trigger:function(){return this.hasFlag(\\\"s\\\")},customFlags:\\\"s\\\"}),u(/\\\\(\\\\?P?<([\\\\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError(\\\"can't use integer as capture name \\\"+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,\\\"(\\\"}),u(/\\\\\\\\(\\\\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!==\\\"0\\\")throw new SyntaxError(\\\"can't use octal escape or backreference to undefined group \\\"+n[0]);return n[0]},{scope:\\\"all\\\"}),u(/\\\\((?!\\\\?)/,function(){return this.hasFlag(\\\"n\\\")?\\\"(?:\\\":(this.captureNames.push(null),\\\"(\\\")},{customFlags:\\\"n\\\"}),typeof exports!=\\\"undefined\\\"&&(exports.XRegExp=t),t}()\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*!\\n\" + \n" + 
        "			\" * SyntaxHighlighter by Alex Gorbatchev\\n\" + \n" + 
        "			\" * https://github.com/alexgorbatchev/SyntaxHighlighter - MIT license\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"//\\n\" + \n" + 
        "			\"// Begin anonymous function. This is used to contain local scope variables without polutting global scope.\\n\" + \n" + 
        "			\"//\\n\" + \n" + 
        "			\"if (typeof(VisualEventSyntaxHighlighter) == 'undefined') var VisualEventSyntaxHighlighter = function() {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// CommonJS\\n\" + \n" + 
        "			\"if (typeof(require) != 'undefined' && typeof(XRegExp) == 'undefined')\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    XRegExp = require('xregexp').XRegExp;\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// Shortcut object which will be assigned to the SyntaxHighlighter variable.\\n\" + \n" + 
        "			\"// This is a shorthand for local reference in order to avoid long namespace\\n\" + \n" + 
        "			\"// references to SyntaxHighlighter.whatever...\\n\" + \n" + 
        "			\"var sh = {\\n\" + \n" + 
        "			\"    defaults : {\\n\" + \n" + 
        "			\"        /** Additional CSS class names to be added to highlighter elements. */\\n\" + \n" + 
        "			\"        'class-name' : '',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** First line number. */\\n\" + \n" + 
        "			\"        'first-line' : 1,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Pads line numbers. Possible values are:\\n\" + \n" + 
        "			\"         *\\n\" + \n" + 
        "			\"         *   false - don't pad line numbers.\\n\" + \n" + 
        "			\"         *   true  - automaticaly pad numbers with minimum required number of leading zeroes.\\n\" + \n" + 
        "			\"         *   [int] - length up to which pad line numbers.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        'pad-line-numbers' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Lines to highlight. */\\n\" + \n" + 
        "			\"        'highlight' : null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Title to be displayed above the code block. */\\n\" + \n" + 
        "			\"        'title' : null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables smart tabs. */\\n\" + \n" + 
        "			\"        'smart-tabs' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Gets or sets tab size. */\\n\" + \n" + 
        "			\"        'tab-size' : 4,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables gutter. */\\n\" + \n" + 
        "			\"        'gutter' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables toolbar. */\\n\" + \n" + 
        "			\"        'toolbar' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables quick code copy and paste from double click. */\\n\" + \n" + 
        "			\"        'quick-code' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Forces code view to be collapsed. */\\n\" + \n" + 
        "			\"        'collapse' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables or disables automatic links. */\\n\" + \n" + 
        "			\"        'auto-links' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Gets or sets light mode. Equavalent to turning off gutter and toolbar. */\\n\" + \n" + 
        "			\"        'light' : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        'unindent' : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        'html-script' : false\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    config : {\\n\" + \n" + 
        "			\"        space : '&nbsp;',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Enables use of <SCRIPT type=\\\"syntaxhighlighter\\\" /> tags. */\\n\" + \n" + 
        "			\"        useScriptTags : true,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Blogger mode flag. */\\n\" + \n" + 
        "			\"        bloggerMode : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        stripBrs : false,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Name of the tag that SyntaxHighlighter will automatically look for. */\\n\" + \n" + 
        "			\"        tagName : 'pre',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        strings : {\\n\" + \n" + 
        "			\"            expandSource : 'expand source',\\n\" + \n" + 
        "			\"            help : '?',\\n\" + \n" + 
        "			\"            alert: 'VisualEventSyntaxHighlighter\\\\n\\\\n',\\n\" + \n" + 
        "			\"            noBrush : 'Can\\\\'t find brush for: ',\\n\" + \n" + 
        "			\"            brushNotHtmlScript : 'Brush wasn\\\\'t configured for html-script option: ',\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // this is populated by the build script\\n\" + \n" + 
        "			\"            aboutDialog : '<%- about %>'\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** Internal 'global' variables. */\\n\" + \n" + 
        "			\"    vars : {\\n\" + \n" + 
        "			\"        discoveredBrushes : null,\\n\" + \n" + 
        "			\"        highlighters : {}\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** This object is populated by user included external brush files. */\\n\" + \n" + 
        "			\"    brushes : {},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /** Common regular expressions. */\\n\" + \n" + 
        "			\"    regexLib : {\\n\" + \n" + 
        "			\"        multiLineCComments          : XRegExp('/\\\\\\\\*.*?\\\\\\\\*/', 'gs'),\\n\" + \n" + 
        "			\"        singleLineCComments         : /\\\\/\\\\/.*$/gm,\\n\" + \n" + 
        "			\"        singleLinePerlComments      : /#.*$/gm,\\n\" + \n" + 
        "			\"        doubleQuotedString          : /\\\"([^\\\\\\\\\\\"\\\\n]|\\\\\\\\.)*\\\"/g,\\n\" + \n" + 
        "			\"        singleQuotedString          : /'([^\\\\\\\\'\\\\n]|\\\\\\\\.)*'/g,\\n\" + \n" + 
        "			\"        multiLineDoubleQuotedString : XRegExp('\\\"([^\\\\\\\\\\\\\\\\\\\"]|\\\\\\\\\\\\\\\\.)*\\\"', 'gs'),\\n\" + \n" + 
        "			\"        multiLineSingleQuotedString : XRegExp(\\\"'([^\\\\\\\\\\\\\\\\']|\\\\\\\\\\\\\\\\.)*'\\\", 'gs'),\\n\" + \n" + 
        "			\"        xmlComments                 : XRegExp('(&lt;|<)!--.*?--(&gt;|>)', 'gs'),\\n\" + \n" + 
        "			\"        url                         : /\\\\w+:\\\\/\\\\/[\\\\w-.\\\\/?%&=:@;#]*/g,\\n\" + \n" + 
        "			\"        phpScriptTags               : { left: /(&lt;|<)\\\\?(?:=|php)?/g, right: /\\\\?(&gt;|>)/g, 'eof' : true },\\n\" + \n" + 
        "			\"        aspScriptTags               : { left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g },\\n\" + \n" + 
        "			\"        scriptScriptTags            : { left: /(&lt;|<)\\\\s*script.*?(&gt;|>)/gi, right: /(&lt;|<)\\\\/\\\\s*script\\\\s*(&gt;|>)/gi }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    toolbar: {\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Generates HTML markup for the toolbar.\\n\" + \n" + 
        "			\"         * @param {Highlighter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\"         * @return {String} Returns HTML markup.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        getHtml: function(highlighter)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var html = '<div class=\\\"toolbar\\\">',\\n\" + \n" + 
        "			\"                items = sh.toolbar.items,\\n\" + \n" + 
        "			\"                list = items.list\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            function defaultGetHtml(highlighter, name)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                return sh.toolbar.getButtonHtml(highlighter, name, sh.config.strings[name]);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var i = 0, l = list.length; i < l; i++)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                html += (items[list[i]].getHtml || defaultGetHtml)(highlighter, list[i]);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += '</div>';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            return html;\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Generates HTML markup for a regular button in the toolbar.\\n\" + \n" + 
        "			\"         * @param {Highlighter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\"         * @param {String} commandName      Command name that would be executed.\\n\" + \n" + 
        "			\"         * @param {String} label            Label text to display.\\n\" + \n" + 
        "			\"         * @return {String}                 Returns HTML markup.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        getButtonHtml: function(highlighter, commandName, label)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            return '<span><a href=\\\"#\\\" class=\\\"toolbar_item'\\n\" + \n" + 
        "			\"                + ' command_' + commandName\\n\" + \n" + 
        "			\"                + ' ' + commandName\\n\" + \n" + 
        "			\"                + '\\\">' + label + '</a></span>'\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /**\\n\" + \n" + 
        "			\"         * Event handler for a toolbar anchor.\\n\" + \n" + 
        "			\"         */\\n\" + \n" + 
        "			\"        handler: function(e)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var target = e.target,\\n\" + \n" + 
        "			\"                className = target.className || ''\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            function getValue(name)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var r = new RegExp(name + '_(\\\\\\\\w+)'),\\n\" + \n" + 
        "			\"                    match = r.exec(className)\\n\" + \n" + 
        "			\"                    ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                return match ? match[1] : null;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var highlighter = getHighlighterById(findParentElement(target, '.Event_syntaxHighlighter').id),\\n\" + \n" + 
        "			\"                commandName = getValue('command')\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // execute the toolbar command\\n\" + \n" + 
        "			\"            if (highlighter && commandName)\\n\" + \n" + 
        "			\"                sh.toolbar.items[commandName].execute(highlighter);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // disable default A click behaviour\\n\" + \n" + 
        "			\"            e.preventDefault();\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        /** Collection of toolbar items. */\\n\" + \n" + 
        "			\"        items : {\\n\" + \n" + 
        "			\"            // Ordered lis of items in the toolbar. Can't expect `for (var n in items)` to be consistent.\\n\" + \n" + 
        "			\"            list: ['expandSource', 'help'],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            expandSource: {\\n\" + \n" + 
        "			\"                getHtml: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    if (highlighter.getParam('collapse') != true)\\n\" + \n" + 
        "			\"                        return '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    var title = highlighter.getParam('title');\\n\" + \n" + 
        "			\"                    return sh.toolbar.getButtonHtml(highlighter, 'expandSource', title ? title : sh.config.strings.expandSource);\\n\" + \n" + 
        "			\"                },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                execute: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    var div = getHighlighterDivById(highlighter.id);\\n\" + \n" + 
        "			\"                    removeClass(div, 'collapsed');\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"            },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            /** Command to display the about dialog window. */\\n\" + \n" + 
        "			\"            help: {\\n\" + \n" + 
        "			\"                execute: function(highlighter)\\n\" + \n" + 
        "			\"                {\\n\" + \n" + 
        "			\"                    var wnd = popup('', '_blank', 500, 250, 'scrollbars=0'),\\n\" + \n" + 
        "			\"                        doc = wnd.document\\n\" + \n" + 
        "			\"                        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    doc.write(sh.config.strings.aboutDialog);\\n\" + \n" + 
        "			\"                    doc.close();\\n\" + \n" + 
        "			\"                    wnd.focus();\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Finds all elements on the page which should be processes by SyntaxHighlighter.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} globalParams     Optional parameters which override element's\\n\" + \n" + 
        "			\"     *                                  parameters. Only used if element is specified.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} element  Optional element to highlight. If none is\\n\" + \n" + 
        "			\"     *                          provided, all elements in the current document\\n\" + \n" + 
        "			\"     *                          are returned which qualify.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @return {Array}  Returns list of <code>{ target: DOMElement, params: Object }</code> objects.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    findElements: function(globalParams, element)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var elements = element ? [element] : toArray(document.getElementsByTagName(sh.config.tagName)),\\n\" + \n" + 
        "			\"            conf = sh.config,\\n\" + \n" + 
        "			\"            result = []\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // support for <SCRIPT TYPE=\\\"syntaxhighlighter\\\" /> feature\\n\" + \n" + 
        "			\"        if (conf.useScriptTags)\\n\" + \n" + 
        "			\"            elements = elements.concat(getSyntaxHighlighterScriptTags());\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (elements.length === 0)\\n\" + \n" + 
        "			\"            return result;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = elements.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var item = {\\n\" + \n" + 
        "			\"                target: elements[i],\\n\" + \n" + 
        "			\"                // local params take precedence over globals\\n\" + \n" + 
        "			\"                params: merge(globalParams, parseParams(elements[i].className))\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (item.params['brush'] == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            result.push(item);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return result;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Shorthand to highlight all elements on the page that are marked as\\n\" + \n" + 
        "			\"     * SyntaxHighlighter source code.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} globalParams     Optional parameters which override element's\\n\" + \n" + 
        "			\"     *                                  parameters. Only used if element is specified.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Object} element  Optional element to highlight. If none is\\n\" + \n" + 
        "			\"     *                          provided, all elements in the current document\\n\" + \n" + 
        "			\"     *                          are highlighted.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    highlight: function(globalParams, element)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var elements = this.findElements(globalParams, element),\\n\" + \n" + 
        "			\"            propertyName = 'innerHTML',\\n\" + \n" + 
        "			\"            highlighter = null,\\n\" + \n" + 
        "			\"            conf = sh.config\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (elements.length === 0)\\n\" + \n" + 
        "			\"            return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = elements.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var element = elements[i],\\n\" + \n" + 
        "			\"                target = element.target,\\n\" + \n" + 
        "			\"                params = element.params,\\n\" + \n" + 
        "			\"                brushName = params.brush,\\n\" + \n" + 
        "			\"                code\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (brushName == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // Instantiate a brush\\n\" + \n" + 
        "			\"            if (params['html-script'] == 'true' || sh.defaults['html-script'] == true)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                highlighter = new sh.HtmlScript(brushName);\\n\" + \n" + 
        "			\"                brushName = 'htmlscript';\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"            else\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var brush = findBrush(brushName);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (brush)\\n\" + \n" + 
        "			\"                    highlighter = new brush();\\n\" + \n" + 
        "			\"                else\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            code = target[propertyName];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // remove CDATA from <SCRIPT/> tags if it's present\\n\" + \n" + 
        "			\"            if (conf.useScriptTags)\\n\" + \n" + 
        "			\"                code = stripCData(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // Inject title if the attribute is present\\n\" + \n" + 
        "			\"            if ((target.title || '') != '')\\n\" + \n" + 
        "			\"                params.title = target.title;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            params['brush'] = brushName;\\n\" + \n" + 
        "			\"            highlighter.init(params);\\n\" + \n" + 
        "			\"            element = highlighter.getDiv(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // carry over ID\\n\" + \n" + 
        "			\"            if ((target.id || '') != '')\\n\" + \n" + 
        "			\"                element.id = target.id;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            target.parentNode.replaceChild(element, target);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Main entry point for the SyntaxHighlighter.\\n\" + \n" + 
        "			\"     * @param {Object} params Optional params to apply to all highlighted elements.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    all: function(params)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        attachEvent(\\n\" + \n" + 
        "			\"            window,\\n\" + \n" + 
        "			\"            'load',\\n\" + \n" + 
        "			\"            function() { sh.highlight(params); }\\n\" + \n" + 
        "			\"        );\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}; // end of sh\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Checks if target DOM elements has specified CSS class.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element to check.\\n\" + \n" + 
        "			\" * @param {String} className Name of the CSS class to check for.\\n\" + \n" + 
        "			\" * @return {Boolean} Returns true if class name is present, false otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function hasClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return target.className.indexOf(className) != -1;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Adds CSS class name to the target DOM element.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element.\\n\" + \n" + 
        "			\" * @param {String} className New CSS class to add.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function addClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (!hasClass(target, className))\\n\" + \n" + 
        "			\"        target.className += ' ' + className;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Removes CSS class name from the target DOM element.\\n\" + \n" + 
        "			\" * @param {DOMElement} target Target DOM element.\\n\" + \n" + 
        "			\" * @param {String} className CSS class to remove.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function removeClass(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    target.className = target.className.replace(className, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Converts the source to array object. Mostly used for function arguments and\\n\" + \n" + 
        "			\" * lists returned by getElementsByTagName() which aren't Array objects.\\n\" + \n" + 
        "			\" * @param {List} source Source list.\\n\" + \n" + 
        "			\" * @return {Array} Returns array.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function toArray(source)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = source.length; i < l; i++)\\n\" + \n" + 
        "			\"        result.push(source[i]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Splits block of text into lines.\\n\" + \n" + 
        "			\" * @param {String} block Block of text.\\n\" + \n" + 
        "			\" * @return {Array} Returns array of lines.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function splitLines(block)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return block.split(/\\\\r?\\\\n/);\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Generates HTML ID for the highlighter.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {String} Returns HTML ID.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterId(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var prefix = 'highlighter_';\\n\" + \n" + 
        "			\"    return id.indexOf(prefix) == 0 ? id : prefix + id;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds Highlighter instance by ID.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {Highlighter} Returns instance of the highlighter.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterById(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return sh.vars.highlighters[getHighlighterId(id)];\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds highlighter's DIV container.\\n\" + \n" + 
        "			\" * @param {String} highlighterId Highlighter ID.\\n\" + \n" + 
        "			\" * @return {Element} Returns highlighter's DIV element.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getHighlighterDivById(id)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return document.getElementById(getHighlighterId(id));\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Stores highlighter so that getHighlighterById() can do its thing. Each\\n\" + \n" + 
        "			\" * highlighter must call this method to preserve itself.\\n\" + \n" + 
        "			\" * @param {Highilghter} highlighter Highlighter instance.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function storeHighlighter(highlighter)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    sh.vars.highlighters[getHighlighterId(highlighter.id)] = highlighter;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Looks for a child or parent node which has specified classname.\\n\" + \n" + 
        "			\" * Equivalent to jQuery's $(container).find(\\\".className\\\")\\n\" + \n" + 
        "			\" * @param {Element} target Target element.\\n\" + \n" + 
        "			\" * @param {String} search Class name or node name to look for.\\n\" + \n" + 
        "			\" * @param {Boolean} reverse If set to true, will go up the node tree instead of down.\\n\" + \n" + 
        "			\" * @return {Element} Returns found child or parent element on null.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findElement(target, search, reverse /* optional */)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (target == null)\\n\" + \n" + 
        "			\"        return null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var nodes           = reverse != true ? target.childNodes : [ target.parentNode ],\\n\" + \n" + 
        "			\"        propertyToFind  = { '#' : 'id', '.' : 'className' }[search.substr(0, 1)] || 'nodeName',\\n\" + \n" + 
        "			\"        expectedValue,\\n\" + \n" + 
        "			\"        found\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    expectedValue = propertyToFind != 'nodeName'\\n\" + \n" + 
        "			\"        ? search.substr(1)\\n\" + \n" + 
        "			\"        : search.toUpperCase()\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // main return of the found node\\n\" + \n" + 
        "			\"    if ((target[propertyToFind] || '').indexOf(expectedValue) != -1)\\n\" + \n" + 
        "			\"        return target;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = nodes.length; nodes && i < l && found == null; i++)\\n\" + \n" + 
        "			\"        found = findElement(nodes[i], search, reverse);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return found;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Looks for a parent node which has specified classname.\\n\" + \n" + 
        "			\" * This is an alias to <code>findElement(container, className, true)</code>.\\n\" + \n" + 
        "			\" * @param {Element} target Target element.\\n\" + \n" + 
        "			\" * @param {String} className Class name to look for.\\n\" + \n" + 
        "			\" * @return {Element} Returns found parent element on null.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findParentElement(target, className)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return findElement(target, className, true);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds an index of element in the array.\\n\" + \n" + 
        "			\" * @ignore\\n\" + \n" + 
        "			\" * @param {Object} searchElement\\n\" + \n" + 
        "			\" * @param {Number} fromIndex\\n\" + \n" + 
        "			\" * @return {Number} Returns index of element if found; -1 otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function indexOf(array, searchElement, fromIndex)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    fromIndex = Math.max(fromIndex || 0, 0);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = fromIndex, l = array.length; i < l; i++)\\n\" + \n" + 
        "			\"        if(array[i] == searchElement)\\n\" + \n" + 
        "			\"            return i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return -1;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Generates a unique element ID.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function guid(prefix)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return (prefix || '') + Math.round(Math.random() * 1000000).toString();\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Merges two objects. Values from obj2 override values in obj1.\\n\" + \n" + 
        "			\" * Function is NOT recursive and works only for one dimensional objects.\\n\" + \n" + 
        "			\" * @param {Object} obj1 First object.\\n\" + \n" + 
        "			\" * @param {Object} obj2 Second object.\\n\" + \n" + 
        "			\" * @return {Object} Returns combination of both objects.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function merge(obj1, obj2)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = {}, name;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (name in obj1)\\n\" + \n" + 
        "			\"        result[name] = obj1[name];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (name in obj2)\\n\" + \n" + 
        "			\"        result[name] = obj2[name];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Attempts to convert string to boolean.\\n\" + \n" + 
        "			\" * @param {String} value Input string.\\n\" + \n" + 
        "			\" * @return {Boolean} Returns true if input was \\\"true\\\", false if input was \\\"false\\\" and value otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function toBoolean(value)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = { \\\"true\\\" : true, \\\"false\\\" : false }[value];\\n\" + \n" + 
        "			\"    return result == null ? value : result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Opens up a centered popup window.\\n\" + \n" + 
        "			\" * @param {String} url      URL to open in the window.\\n\" + \n" + 
        "			\" * @param {String} name     Popup name.\\n\" + \n" + 
        "			\" * @param {int} width       Popup width.\\n\" + \n" + 
        "			\" * @param {int} height      Popup height.\\n\" + \n" + 
        "			\" * @param {String} options  window.open() options.\\n\" + \n" + 
        "			\" * @return {Window}         Returns window instance.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function popup(url, name, width, height, options)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var x = (screen.width - width) / 2,\\n\" + \n" + 
        "			\"        y = (screen.height - height) / 2\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    options +=  ', left=' + x +\\n\" + \n" + 
        "			\"                ', top=' + y +\\n\" + \n" + 
        "			\"                ', width=' + width +\\n\" + \n" + 
        "			\"                ', height=' + height\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"    options = options.replace(/^,/, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var win = window.open(url, name, options);\\n\" + \n" + 
        "			\"    win.focus();\\n\" + \n" + 
        "			\"    return win;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Adds event handler to the target object.\\n\" + \n" + 
        "			\" * @param {Object} obj      Target object.\\n\" + \n" + 
        "			\" * @param {String} type     Name of the event.\\n\" + \n" + 
        "			\" * @param {Function} func   Handling function.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function attachEvent(obj, type, func, scope)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    function handler(e)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        e = e || window.event;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (!e.target)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            e.target = e.srcElement;\\n\" + \n" + 
        "			\"            e.preventDefault = function()\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                this.returnValue = false;\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        func.call(scope || window, e);\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (obj.attachEvent)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        obj.attachEvent('on' + type, handler);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"    else\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        obj.addEventListener(type, handler, false);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Displays an alert.\\n\" + \n" + 
        "			\" * @param {String} str String to display.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function alert(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    window.alert(sh.config.strings.alert + str);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds a brush by its alias.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} alias        Brush alias.\\n\" + \n" + 
        "			\" * @param {Boolean} showAlert   Suppresses the alert if false.\\n\" + \n" + 
        "			\" * @return {Brush}              Returns bursh constructor if found, null otherwise.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function findBrush(alias, showAlert)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var brushes = sh.vars.discoveredBrushes,\\n\" + \n" + 
        "			\"        result = null\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (brushes == null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        brushes = {};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // Find all brushes\\n\" + \n" + 
        "			\"        for (var brush in sh.brushes)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var info = sh.brushes[brush],\\n\" + \n" + 
        "			\"                aliases = info.aliases\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (aliases == null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            // keep the brush name\\n\" + \n" + 
        "			\"            info.brushName = brush.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var i = 0, l = aliases.length; i < l; i++)\\n\" + \n" + 
        "			\"                brushes[aliases[i]] = brush;\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        sh.vars.discoveredBrushes = brushes;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    result = sh.brushes[brushes[alias]];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (result == null && showAlert)\\n\" + \n" + 
        "			\"        alert(sh.config.strings.noBrush + alias);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Executes a callback on each line and replaces each line with result from the callback.\\n\" + \n" + 
        "			\" * @param {Object} str          Input string.\\n\" + \n" + 
        "			\" * @param {Object} callback     Callback function taking one string argument and returning a string.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function eachLine(str, callback)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(str);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        lines[i] = callback(lines[i], i);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // include \\\\r to enable copy-paste on windows (ie8) without getting everything on one line\\n\" + \n" + 
        "			\"    return lines.join('\\\\r\\\\n');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * This is a special trim which only removes first and last empty lines\\n\" + \n" + 
        "			\" * and doesn't affect valid leading space on the first line.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   Input string\\n\" + \n" + 
        "			\" * @return {String}      Returns string without empty first and last lines.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function trimFirstAndLastLines(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return str.replace(/^[ ]*[\\\\n]+|[\\\\n]*[ ]*$/g, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Parses key/value pairs into hash object.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * Understands the following formats:\\n\" + \n" + 
        "			\" * - name: word;\\n\" + \n" + 
        "			\" * - name: [word, word];\\n\" + \n" + 
        "			\" * - name: \\\"string\\\";\\n\" + \n" + 
        "			\" * - name: 'string';\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * For example:\\n\" + \n" + 
        "			\" *   name1: value; name2: [value, value]; name3: 'value'\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str    Input string.\\n\" + \n" + 
        "			\" * @return {Object}       Returns deserialized object.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function parseParams(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var match,\\n\" + \n" + 
        "			\"        result = {},\\n\" + \n" + 
        "			\"        arrayRegex = XRegExp(\\\"^\\\\\\\\[(?<values>(.*?))\\\\\\\\]$\\\"),\\n\" + \n" + 
        "			\"        pos = 0,\\n\" + \n" + 
        "			\"        regex = XRegExp(\\n\" + \n" + 
        "			\"            \\\"(?<name>[\\\\\\\\w-]+)\\\" +\\n\" + \n" + 
        "			\"            \\\"\\\\\\\\s*:\\\\\\\\s*\\\" +\\n\" + \n" + 
        "			\"            \\\"(?<value>\\\" +\\n\" + \n" + 
        "			\"                \\\"[\\\\\\\\w%#-]+|\\\" +      // word\\n\" + \n" + 
        "			\"                \\\"\\\\\\\\[.*?\\\\\\\\]|\\\" +      // [] array\\n\" + \n" + 
        "			\"                '\\\".*?\\\"|' +          // \\\"\\\" string\\n\" + \n" + 
        "			\"                \\\"'.*?'\\\" +           // '' string\\n\" + \n" + 
        "			\"            \\\")\\\\\\\\s*;?\\\",\\n\" + \n" + 
        "			\"            \\\"g\\\"\\n\" + \n" + 
        "			\"        )\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while ((match = XRegExp.exec(str, regex, pos)) != null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var value = match.value\\n\" + \n" + 
        "			\"            .replace(/^['\\\"]|['\\\"]$/g, '') // strip quotes from end of strings\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // try to parse array value\\n\" + \n" + 
        "			\"        if (value != null && arrayRegex.test(value))\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var m = XRegExp.exec(value, arrayRegex);\\n\" + \n" + 
        "			\"            value = m.values.length > 0 ? m.values.split(/\\\\s*,\\\\s*/) : [];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        result[match.name] = value;\\n\" + \n" + 
        "			\"        pos = match.index + match[0].length;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // AJJ - markdown style language option\\n\" + \n" + 
        "			\"    var a = str.match(/language-(.*)/);\\n\" + \n" + 
        "			\"    if ( a ) {\\n\" + \n" + 
        "			\"        result['brush'] = a[1];\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Wraps each line of the string into <code/> tag with given style applied to it.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   Input string.\\n\" + \n" + 
        "			\" * @param {String} css   Style name to apply to the string.\\n\" + \n" + 
        "			\" * @return {String}      Returns input string with each line surrounded by <span/> tag.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function wrapLinesWithCode(str, css)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    if (str == null || str.length == 0 || str == '\\\\n')\\n\" + \n" + 
        "			\"        return str;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    str = str.replace(/</g, '&lt;');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Replace two or more sequential spaces with &nbsp; leaving last space untouched.\\n\" + \n" + 
        "			\"    str = str.replace(/ {2,}/g, function(m)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var spaces = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = m.length; i < l - 1; i++)\\n\" + \n" + 
        "			\"            spaces += sh.config.space;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return spaces + ' ';\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Split each line and apply <span class=\\\"...\\\">...</span> to them so that\\n\" + \n" + 
        "			\"    // leading spaces aren't included.\\n\" + \n" + 
        "			\"    if (css != null)\\n\" + \n" + 
        "			\"        str = eachLine(str, function(line)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                return '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var spaces = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            line = line.replace(/^(&nbsp;| )+/, function(s)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                spaces = s;\\n\" + \n" + 
        "			\"                return '';\\n\" + \n" + 
        "			\"            });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                return spaces;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            return spaces + '<code class=\\\"' + css + '\\\">' + line + '</code>';\\n\" + \n" + 
        "			\"        });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return str;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Pads number with zeros until it's length is the same as given length.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {Number} number   Number to pad.\\n\" + \n" + 
        "			\" * @param {Number} length   Max string length with.\\n\" + \n" + 
        "			\" * @return {String}         Returns a string padded with proper amount of '0'.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function padNumber(number, length)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var result = number.toString();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while (result.length < length)\\n\" + \n" + 
        "			\"        result = '0' + result;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Replaces tabs with spaces.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code     Source code.\\n\" + \n" + 
        "			\" * @param {Number} tabSize  Size of the tab.\\n\" + \n" + 
        "			\" * @return {String}         Returns code with all tabs replaces by spaces.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processTabs(code, tabSize)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var tab = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0; i < tabSize; i++)\\n\" + \n" + 
        "			\"        tab += ' ';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code.replace(/\\\\t/g, tab);\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Replaces tabs with smart spaces.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code    Code to fix the tabs in.\\n\" + \n" + 
        "			\" * @param {Number} tabSize Number of spaces in a column.\\n\" + \n" + 
        "			\" * @return {String}        Returns code with all tabs replaces with roper amount of spaces.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processSmartTabs(code, tabSize)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(code),\\n\" + \n" + 
        "			\"        tab = '\\\\t',\\n\" + \n" + 
        "			\"        spaces = ''\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Create a string with 1000 spaces to copy spaces from...\\n\" + \n" + 
        "			\"    // It's assumed that there would be no indentation longer than that.\\n\" + \n" + 
        "			\"    for (var i = 0; i < 50; i++)\\n\" + \n" + 
        "			\"        spaces += '                    '; // 20 spaces * 50\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // This function inserts specified amount of spaces in the string\\n\" + \n" + 
        "			\"    // where a tab is while removing that given tab.\\n\" + \n" + 
        "			\"    function insertSpaces(line, pos, count)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return line.substr(0, pos)\\n\" + \n" + 
        "			\"            + spaces.substr(0, count)\\n\" + \n" + 
        "			\"            + line.substr(pos + 1, line.length) // pos + 1 will get rid of the tab\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Go through all the lines and do the 'smart tabs' magic.\\n\" + \n" + 
        "			\"    code = eachLine(code, function(line)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        if (line.indexOf(tab) == -1)\\n\" + \n" + 
        "			\"            return line;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var pos = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        while ((pos = line.indexOf(tab)) != -1)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            // This is pretty much all there is to the 'smart tabs' logic.\\n\" + \n" + 
        "			\"            // Based on the position within the line and size of a tab,\\n\" + \n" + 
        "			\"            // calculate the amount of spaces we need to insert.\\n\" + \n" + 
        "			\"            var spaces = tabSize - pos % tabSize;\\n\" + \n" + 
        "			\"            line = insertSpaces(line, pos, spaces);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return line;\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Performs various string fixes based on configuration.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function fixInputString(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var br = /<br\\\\s*\\\\/?>|&lt;br\\\\s*\\\\/?&gt;/gi;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (sh.config.bloggerMode == true)\\n\" + \n" + 
        "			\"        str = str.replace(br, '\\\\n');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (sh.config.stripBrs == true)\\n\" + \n" + 
        "			\"        str = str.replace(br, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return str;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Removes all white space at the begining and end of a string.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} str   String to trim.\\n\" + \n" + 
        "			\" * @return {String}      Returns string without leading and following white space characters.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function trim(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return str.replace(/^\\\\s+|\\\\s+$/g, '');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Unindents a block of text by the lowest common indent amount.\\n\" + \n" + 
        "			\" * @param {String} str   Text to unindent.\\n\" + \n" + 
        "			\" * @return {String}      Returns unindented text block.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function unindent(str)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var lines = splitLines(fixInputString(str)),\\n\" + \n" + 
        "			\"        indents = new Array(),\\n\" + \n" + 
        "			\"        regex = /^\\\\s*/,\\n\" + \n" + 
        "			\"        min = 1000\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // go through every line and check for common number of indents\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l && min > 0; i++)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var line = lines[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (trim(line).length == 0)\\n\" + \n" + 
        "			\"            continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var matches = regex.exec(line);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // In the event that just one line doesn't have leading white space\\n\" + \n" + 
        "			\"        // we can't unindent anything, so bail completely.\\n\" + \n" + 
        "			\"        if (matches == null)\\n\" + \n" + 
        "			\"            return str;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        min = Math.min(matches[0].length, min);\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // trim minimum common number of white space from the begining of every line\\n\" + \n" + 
        "			\"    if (min > 0)\\n\" + \n" + 
        "			\"        for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"            lines[i] = lines[i].substr(min);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return lines.join('\\\\n');\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Callback method for Array.sort() which sorts matches by\\n\" + \n" + 
        "			\" * index position and then by length.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {Match} m1    Left object.\\n\" + \n" + 
        "			\" * @param {Match} m2    Right object.\\n\" + \n" + 
        "			\" * @return {Number}     Returns -1, 0 or -1 as a comparison result.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function matchesSortCallback(m1, m2)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // sort matches by index first\\n\" + \n" + 
        "			\"    if(m1.index < m2.index)\\n\" + \n" + 
        "			\"        return -1;\\n\" + \n" + 
        "			\"    else if(m1.index > m2.index)\\n\" + \n" + 
        "			\"        return 1;\\n\" + \n" + 
        "			\"    else\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        // if index is the same, sort by length\\n\" + \n" + 
        "			\"        if(m1.length < m2.length)\\n\" + \n" + 
        "			\"            return -1;\\n\" + \n" + 
        "			\"        else if(m1.length > m2.length)\\n\" + \n" + 
        "			\"            return 1;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return 0;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Executes given regular expression on provided code and returns all\\n\" + \n" + 
        "			\" * matches that are found.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} code    Code to execute regular expression on.\\n\" + \n" + 
        "			\" * @param {Object} regex   Regular expression item info from <code>regexList</code> collection.\\n\" + \n" + 
        "			\" * @return {Array}         Returns a list of Match objects.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getMatches(code, regexInfo)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    function defaultAdd(match, regexInfo)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return match[0];\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var index = 0,\\n\" + \n" + 
        "			\"        match = null,\\n\" + \n" + 
        "			\"        matches = [],\\n\" + \n" + 
        "			\"        func = regexInfo.func ? regexInfo.func : defaultAdd\\n\" + \n" + 
        "			\"        pos = 0\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    while((match = XRegExp.exec(code, regexInfo.regex, pos)) != null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var resultMatch = func(match, regexInfo);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(resultMatch) == 'string')\\n\" + \n" + 
        "			\"            resultMatch = [new sh.Match(resultMatch, match.index, regexInfo.css)];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        matches = matches.concat(resultMatch);\\n\" + \n" + 
        "			\"        pos = match.index + match[0].length;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return matches;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Turns all URLs in the code into <a/> tags.\\n\" + \n" + 
        "			\" * @param {String} code Input code.\\n\" + \n" + 
        "			\" * @return {String} Returns code with </a> tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function processUrls(code)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var gt = /(.*)((&gt;|&lt;).*)/;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return code.replace(sh.regexLib.url, function(m)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var suffix = '',\\n\" + \n" + 
        "			\"            match = null\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // We include &lt; and &gt; in the URL for the common cases like <http://google.com>\\n\" + \n" + 
        "			\"        // The problem is that they get transformed into &lt;http://google.com&gt;\\n\" + \n" + 
        "			\"        // Where as &gt; easily looks like part of the URL string.\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (match = gt.exec(m))\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            m = match[1];\\n\" + \n" + 
        "			\"            suffix = match[2];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '<a href=\\\"' + m + '\\\">' + m + '</a>' + suffix;\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Finds all <SCRIPT TYPE=\\\"syntaxhighlighter\\\" /> elementss.\\n\" + \n" + 
        "			\" * @return {Array} Returns array of all found SyntaxHighlighter tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function getSyntaxHighlighterScriptTags()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var tags = document.getElementsByTagName('script'),\\n\" + \n" + 
        "			\"        result = []\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = tags.length; i < l; i++)\\n\" + \n" + 
        "			\"        if (tags[i].type == 'Event_syntaxHighlighter')\\n\" + \n" + 
        "			\"            result.push(tags[i]);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return result;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Strips <![CDATA[]]> from <SCRIPT /> content because it should be used\\n\" + \n" + 
        "			\" * there in most cases for XHTML compliance.\\n\" + \n" + 
        "			\" * @param {String} original Input code.\\n\" + \n" + 
        "			\" * @return {String} Returns code without leading <![CDATA[]]> tags.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function stripCData(original)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var left = '<![CDATA[',\\n\" + \n" + 
        "			\"        right = ']]>',\\n\" + \n" + 
        "			\"        // for some reason IE inserts some leading blanks here\\n\" + \n" + 
        "			\"        copy = trim(original),\\n\" + \n" + 
        "			\"        changed = false,\\n\" + \n" + 
        "			\"        leftLength = left.length,\\n\" + \n" + 
        "			\"        rightLength = right.length\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (copy.indexOf(left) == 0)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        copy = copy.substring(leftLength);\\n\" + \n" + 
        "			\"        changed = true;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    var copyLength = copy.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (copy.indexOf(right) == copyLength - rightLength)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        copy = copy.substring(0, copyLength - rightLength);\\n\" + \n" + 
        "			\"        changed = true;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    return changed ? copy : original;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Quick code mouse double click handler.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"function quickCodeHandler(e)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var target = e.target,\\n\" + \n" + 
        "			\"        highlighterDiv = findParentElement(target, '.Event_syntaxHighlighter'),\\n\" + \n" + 
        "			\"        container = findParentElement(target, '.container'),\\n\" + \n" + 
        "			\"        textarea = document.createElement('textarea'),\\n\" + \n" + 
        "			\"        highlighter\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (!container || !highlighterDiv || findElement(container, 'textarea'))\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    highlighter = getHighlighterById(highlighterDiv.id);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // add source class name\\n\" + \n" + 
        "			\"    addClass(highlighterDiv, 'source');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // Have to go over each line and grab it's text, can't just do it on the\\n\" + \n" + 
        "			\"    // container because Firefox loses all \\\\n where as Webkit doesn't.\\n\" + \n" + 
        "			\"    var lines = container.childNodes,\\n\" + \n" + 
        "			\"        code = []\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        code.push(lines[i].innerText || lines[i].textContent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // using \\\\r instead of \\\\r or \\\\r\\\\n makes this work equally well on IE, FF and Webkit\\n\" + \n" + 
        "			\"    code = code.join('\\\\r');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // For Webkit browsers, replace nbsp with a breaking space\\n\" + \n" + 
        "			\"    code = code.replace(/\\\\u00a0/g, \\\" \\\");\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // inject <textarea/> tag\\n\" + \n" + 
        "			\"    textarea.appendChild(document.createTextNode(code));\\n\" + \n" + 
        "			\"    container.appendChild(textarea);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // preselect all text\\n\" + \n" + 
        "			\"    textarea.focus();\\n\" + \n" + 
        "			\"    textarea.select();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // set up handler for lost focus\\n\" + \n" + 
        "			\"    attachEvent(textarea, 'blur', function(e)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        textarea.parentNode.removeChild(textarea);\\n\" + \n" + 
        "			\"        removeClass(highlighterDiv, 'source');\\n\" + \n" + 
        "			\"    });\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Match object.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.Match = function(value, index, css)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    this.value = value;\\n\" + \n" + 
        "			\"    this.index = index;\\n\" + \n" + 
        "			\"    this.length = value.length;\\n\" + \n" + 
        "			\"    this.css = css;\\n\" + \n" + 
        "			\"    this.brushName = null;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"sh.Match.prototype.toString = function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    return this.value;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Simulates HTML code with a scripting language embedded.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @param {String} scriptBrushName Brush name of the scripting language.\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.HtmlScript = function(scriptBrushName)\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    var brushClass = findBrush(scriptBrushName),\\n\" + \n" + 
        "			\"        scriptBrush,\\n\" + \n" + 
        "			\"        xmlBrush = new sh.brushes.Xml(),\\n\" + \n" + 
        "			\"        bracketsRegex = null,\\n\" + \n" + 
        "			\"        ref = this,\\n\" + \n" + 
        "			\"        methodsToExpose = 'getDiv getHtml init'.split(' ')\\n\" + \n" + 
        "			\"        ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (brushClass == null)\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    scriptBrush = new brushClass();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    for(var i = 0, l = methodsToExpose.length; i < l; i++)\\n\" + \n" + 
        "			\"        // make a closure so we don't lose the name after i changes\\n\" + \n" + 
        "			\"        (function() {\\n\" + \n" + 
        "			\"            var name = methodsToExpose[i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            ref[name] = function()\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                return xmlBrush[name].apply(xmlBrush, arguments);\\n\" + \n" + 
        "			\"            };\\n\" + \n" + 
        "			\"        })();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    if (scriptBrush.htmlScript == null)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        alert(sh.config.strings.brushNotHtmlScript + scriptBrushName);\\n\" + \n" + 
        "			\"        return;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    xmlBrush.regexList.push(\\n\" + \n" + 
        "			\"        { regex: scriptBrush.htmlScript.code, func: process }\\n\" + \n" + 
        "			\"    );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function offsetMatches(matches, offset)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        for (var j = 0, l = matches.length; j < l; j++)\\n\" + \n" + 
        "			\"            matches[j].index += offset;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function process(match, info)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var code = match.code,\\n\" + \n" + 
        "			\"            matches = [],\\n\" + \n" + 
        "			\"            regexList = scriptBrush.regexList,\\n\" + \n" + 
        "			\"            offset = match.index + match.left.length,\\n\" + \n" + 
        "			\"            htmlScript = scriptBrush.htmlScript,\\n\" + \n" + 
        "			\"            result\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add all matches from the code\\n\" + \n" + 
        "			\"        for (var i = 0, l = regexList.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(code, regexList[i]);\\n\" + \n" + 
        "			\"            offsetMatches(result, offset);\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add left script bracket\\n\" + \n" + 
        "			\"        if (htmlScript.left != null && match.left != null)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(match.left, htmlScript.left);\\n\" + \n" + 
        "			\"            offsetMatches(result, match.index);\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add right script bracket\\n\" + \n" + 
        "			\"        if (htmlScript.right != null && match.right != null)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            result = getMatches(match.right, htmlScript.right);\\n\" + \n" + 
        "			\"            offsetMatches(result, match.index + match[0].lastIndexOf(match.right));\\n\" + \n" + 
        "			\"            matches = matches.concat(result);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var j = 0, l = matches.length; j < l; j++)\\n\" + \n" + 
        "			\"            matches[j].brushName = brushClass.brushName;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return matches;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Main Highlither class.\\n\" + \n" + 
        "			\" * @constructor\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"sh.Highlighter = function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // not putting any code in here because of the prototype inheritance\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"sh.Highlighter.prototype = {\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Returns value of the parameter passed to the highlighter.\\n\" + \n" + 
        "			\"     * @param {String} name             Name of the parameter.\\n\" + \n" + 
        "			\"     * @param {Object} defaultValue     Default value.\\n\" + \n" + 
        "			\"     * @return {Object}                 Returns found value or default value otherwise.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getParam: function(name, defaultValue)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var result = this.params[name];\\n\" + \n" + 
        "			\"        return toBoolean(result == null ? defaultValue : result);\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Shortcut to document.createElement().\\n\" + \n" + 
        "			\"     * @param {String} name     Name of the element to create (DIV, A, etc).\\n\" + \n" + 
        "			\"     * @return {HTMLElement}    Returns new HTML element.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    create: function(name)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return document.createElement(name);\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Applies all regular expression to the code and stores all found\\n\" + \n" + 
        "			\"     * matches in the `this.matches` array.\\n\" + \n" + 
        "			\"     * @param {Array} regexList     List of regular expressions.\\n\" + \n" + 
        "			\"     * @param {String} code         Source code.\\n\" + \n" + 
        "			\"     * @return {Array}              Returns list of matches.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    findMatches: function(regexList, code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var result = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (regexList != null)\\n\" + \n" + 
        "			\"            for (var i = 0, l = regexList.length; i < l; i++)\\n\" + \n" + 
        "			\"                // BUG: length returns len+1 for array if methods added to prototype chain (oising@gmail.com)\\n\" + \n" + 
        "			\"                if (typeof (regexList[i]) == \\\"object\\\")\\n\" + \n" + 
        "			\"                    result = result.concat(getMatches(code, regexList[i]));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // sort and remove nested the matches\\n\" + \n" + 
        "			\"        return this.removeNestedMatches(result.sort(matchesSortCallback));\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Checks to see if any of the matches are inside of other matches.\\n\" + \n" + 
        "			\"     * This process would get rid of highligted strings inside comments,\\n\" + \n" + 
        "			\"     * keywords inside strings and so on.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    removeNestedMatches: function(matches)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        // Optimized by Jose Prado (http://joseprado.com)\\n\" + \n" + 
        "			\"        for (var i = 0, l = matches.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            if (matches[i] === null)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var itemI = matches[i],\\n\" + \n" + 
        "			\"                itemIEndPos = itemI.index + itemI.length\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for (var j = i + 1, l = matches.length; j < l && matches[i] !== null; j++)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                var itemJ = matches[j];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (itemJ === null)\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                else if (itemJ.index > itemIEndPos)\\n\" + \n" + 
        "			\"                    break;\\n\" + \n" + 
        "			\"                else if (itemJ.index == itemI.index && itemJ.length > itemI.length)\\n\" + \n" + 
        "			\"                    matches[i] = null;\\n\" + \n" + 
        "			\"                else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos)\\n\" + \n" + 
        "			\"                    matches[j] = null;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return matches;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Creates an array containing integer line numbers starting from the 'first-line' param.\\n\" + \n" + 
        "			\"     * @return {Array} Returns array of integers.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    figureOutLineNumbers: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var lines = [],\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line'))\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        eachLine(code, function(line, index)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            lines.push(index + firstLine);\\n\" + \n" + 
        "			\"        });\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return lines;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Determines if specified line number is in the highlighted list.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    isLineHighlighted: function(lineNumber)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var list = this.getParam('highlight', []);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(list) != 'object' && list.push == null)\\n\" + \n" + 
        "			\"            list = [ list ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return indexOf(list, lineNumber.toString()) != -1;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for a single line of code while determining alternating line style.\\n\" + \n" + 
        "			\"     * @param {Integer} lineNumber  Line number.\\n\" + \n" + 
        "			\"     * @param {String} code Line    HTML markup.\\n\" + \n" + 
        "			\"     * @return {String}             Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getLineHtml: function(lineIndex, lineNumber, code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var classes = [\\n\" + \n" + 
        "			\"            'line',\\n\" + \n" + 
        "			\"            'number' + lineNumber,\\n\" + \n" + 
        "			\"            'index' + lineIndex,\\n\" + \n" + 
        "			\"            'alt' + (lineNumber % 2 == 0 ? 1 : 2).toString()\\n\" + \n" + 
        "			\"        ];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.isLineHighlighted(lineNumber))\\n\" + \n" + 
        "			\"            classes.push('highlighted');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (lineNumber == 0)\\n\" + \n" + 
        "			\"            classes.push('break');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '<div class=\\\"' + classes.join(' ') + '\\\">' + code + '</div>';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for line number column.\\n\" + \n" + 
        "			\"     * @param {String} code         Complete code HTML markup.\\n\" + \n" + 
        "			\"     * @param {Array} lineNumbers   Calculated line numbers.\\n\" + \n" + 
        "			\"     * @return {String}             Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getLineNumbersHtml: function(code, lineNumbers)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var html = '',\\n\" + \n" + 
        "			\"            count = splitLines(code).length,\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line')),\\n\" + \n" + 
        "			\"            pad = this.getParam('pad-line-numbers')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (pad == true)\\n\" + \n" + 
        "			\"            pad = (firstLine + count - 1).toString().length;\\n\" + \n" + 
        "			\"        else if (isNaN(pad) == true)\\n\" + \n" + 
        "			\"            pad = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0; i < count; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i,\\n\" + \n" + 
        "			\"                code = lineNumber == 0 ? sh.config.space : padNumber(lineNumber, pad)\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += this.getLineHtml(i, lineNumber, code);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Splits block of text into individual DIV lines.\\n\" + \n" + 
        "			\"     * @param {String} code         Code to highlight.\\n\" + \n" + 
        "			\"     * @param {Array} lineNumbers   Calculated line numbers.\\n\" + \n" + 
        "			\"     * @return {String}             Returns highlighted code in HTML form.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getCodeLinesHtml: function(html, lineNumbers)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        html = trim(html);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var lines = splitLines(html),\\n\" + \n" + 
        "			\"            padLength = this.getParam('pad-line-numbers'),\\n\" + \n" + 
        "			\"            firstLine = parseInt(this.getParam('first-line')),\\n\" + \n" + 
        "			\"            html = '',\\n\" + \n" + 
        "			\"            brushName = this.getParam('brush')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for (var i = 0, l = lines.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var line = lines[i],\\n\" + \n" + 
        "			\"                indent = /^(&nbsp;|\\\\s)+/.exec(line),\\n\" + \n" + 
        "			\"                spaces = null,\\n\" + \n" + 
        "			\"                lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i;\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (indent != null)\\n\" + \n" + 
        "			\"            {\\n\" + \n" + 
        "			\"                spaces = indent[0].toString();\\n\" + \n" + 
        "			\"                line = line.substr(spaces.length);\\n\" + \n" + 
        "			\"                spaces = spaces.replace(' ', sh.config.space);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            line = trim(line);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (line.length == 0)\\n\" + \n" + 
        "			\"                line = sh.config.space;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            html += this.getLineHtml(\\n\" + \n" + 
        "			\"                i,\\n\" + \n" + 
        "			\"                lineNumber,\\n\" + \n" + 
        "			\"                (spaces != null ? '<code class=\\\"' + brushName + ' spaces\\\">' + spaces + '</code>' : '') + line\\n\" + \n" + 
        "			\"            );\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Returns HTML for the table title or empty string if title is null.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getTitleHtml: function(title)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        return title ? '<caption>' + title + '</caption>' : '';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Finds all matches in the source code.\\n\" + \n" + 
        "			\"     * @param {String} code     Source code to process matches in.\\n\" + \n" + 
        "			\"     * @param {Array} matches   Discovered regex matches.\\n\" + \n" + 
        "			\"     * @return {String} Returns formatted HTML with processed mathes.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getMatchesHtml: function(code, matches)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var pos = 0,\\n\" + \n" + 
        "			\"            result = '',\\n\" + \n" + 
        "			\"            brushName = this.getParam('brush', '')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        function getBrushNameCss(match)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var result = match ? (match.brushName || brushName) : brushName;\\n\" + \n" + 
        "			\"            return result ? result + ' ' : '';\\n\" + \n" + 
        "			\"        };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // Finally, go through the final list of matches and pull the all\\n\" + \n" + 
        "			\"        // together adding everything in between that isn't a match.\\n\" + \n" + 
        "			\"        for (var i = 0, l = matches.length; i < l; i++)\\n\" + \n" + 
        "			\"        {\\n\" + \n" + 
        "			\"            var match = matches[i],\\n\" + \n" + 
        "			\"                matchBrushName\\n\" + \n" + 
        "			\"                ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            if (match === null || match.length === 0)\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            matchBrushName = getBrushNameCss(match);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            result += wrapLinesWithCode(code.substr(pos, match.index - pos), matchBrushName + 'plain')\\n\" + \n" + 
        "			\"                    + wrapLinesWithCode(match.value, matchBrushName + match.css)\\n\" + \n" + 
        "			\"                    ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            pos = match.index + match.length + (match.offset || 0);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // don't forget to add whatever's remaining in the string\\n\" + \n" + 
        "			\"        result += wrapLinesWithCode(code.substr(pos), getBrushNameCss() + 'plain');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return result;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Generates HTML markup for the whole syntax highlighter.\\n\" + \n" + 
        "			\"     * @param {String} code Source code.\\n\" + \n" + 
        "			\"     * @return {String} Returns HTML markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getHtml: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var html = '',\\n\" + \n" + 
        "			\"            classes = [ 'Event_syntaxHighlighter' ],\\n\" + \n" + 
        "			\"            tabSize,\\n\" + \n" + 
        "			\"            matches,\\n\" + \n" + 
        "			\"            lineNumbers\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // process light mode\\n\" + \n" + 
        "			\"        if (this.getParam('light') == true)\\n\" + \n" + 
        "			\"            this.params.toolbar = this.params.gutter = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        className = 'Event_syntaxHighlighter';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.getParam('collapse') == true)\\n\" + \n" + 
        "			\"            classes.push('collapsed');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if ((gutter = this.getParam('gutter')) == false)\\n\" + \n" + 
        "			\"            classes.push('nogutter');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add custom user style name\\n\" + \n" + 
        "			\"        classes.push(this.getParam('class-name'));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // add brush alias to the class name for custom CSS\\n\" + \n" + 
        "			\"        classes.push(this.getParam('brush'));\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        code = trimFirstAndLastLines(code)\\n\" + \n" + 
        "			\"            .replace(/\\\\r/g, ' ') // IE lets these buggers through\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        tabSize = this.getParam('tab-size');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // replace tabs with spaces\\n\" + \n" + 
        "			\"        code = this.getParam('smart-tabs') == true\\n\" + \n" + 
        "			\"            ? processSmartTabs(code, tabSize)\\n\" + \n" + 
        "			\"            : processTabs(code, tabSize)\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // unindent code by the common indentation\\n\" + \n" + 
        "			\"        if (this.getParam('unindent'))\\n\" + \n" + 
        "			\"            code = unindent(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (gutter)\\n\" + \n" + 
        "			\"            lineNumbers = this.figureOutLineNumbers(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // find matches in the code using brushes regex list\\n\" + \n" + 
        "			\"        matches = this.findMatches(this.regexList, code);\\n\" + \n" + 
        "			\"        // processes found matches into the html\\n\" + \n" + 
        "			\"        html = this.getMatchesHtml(code, matches);\\n\" + \n" + 
        "			\"        // finally, split all lines so that they wrap well\\n\" + \n" + 
        "			\"        html = this.getCodeLinesHtml(html, lineNumbers);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // finally, process the links\\n\" + \n" + 
        "			\"        if (this.getParam('auto-links'))\\n\" + \n" + 
        "			\"            html = processUrls(html);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (typeof(navigator) != 'undefined' && navigator.userAgent && navigator.userAgent.match(/MSIE/))\\n\" + \n" + 
        "			\"            classes.push('ie');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        html =\\n\" + \n" + 
        "			\"            '<div id=\\\"' + getHighlighterId(this.id) + '\\\" class=\\\"' + classes.join(' ') + '\\\">'\\n\" + \n" + 
        "			\"                + (this.getParam('toolbar') ? sh.toolbar.getHtml(this) : '')\\n\" + \n" + 
        "			\"                + '<table border=\\\"0\\\" cellpadding=\\\"0\\\" cellspacing=\\\"0\\\">'\\n\" + \n" + 
        "			\"                    + this.getTitleHtml(this.getParam('title'))\\n\" + \n" + 
        "			\"                    + '<tbody>'\\n\" + \n" + 
        "			\"                        + '<tr>'\\n\" + \n" + 
        "			\"                            + (gutter ? '<td class=\\\"gutter\\\">' + this.getLineNumbersHtml(code) + '</td>' : '')\\n\" + \n" + 
        "			\"                            + '<td class=\\\"code\\\">'\\n\" + \n" + 
        "			\"                                + '<div class=\\\"container\\\">'\\n\" + \n" + 
        "			\"                                    + html\\n\" + \n" + 
        "			\"                                + '</div>'\\n\" + \n" + 
        "			\"                            + '</td>'\\n\" + \n" + 
        "			\"                        + '</tr>'\\n\" + \n" + 
        "			\"                    + '</tbody>'\\n\" + \n" + 
        "			\"                + '</table>'\\n\" + \n" + 
        "			\"            + '</div>'\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return html;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Highlights the code and returns complete HTML.\\n\" + \n" + 
        "			\"     * @param {String} code     Code to highlight.\\n\" + \n" + 
        "			\"     * @return {Element}        Returns container DIV element with all markup.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getDiv: function(code)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        if (code === null)\\n\" + \n" + 
        "			\"            code = '';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        this.code = code;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var div = this.create('div');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // create main HTML\\n\" + \n" + 
        "			\"        div.innerHTML = this.getHtml(code);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // set up click handlers\\n\" + \n" + 
        "			\"        if (this.getParam('toolbar'))\\n\" + \n" + 
        "			\"            attachEvent(findElement(div, '.toolbar'), 'click', sh.toolbar.handler);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if (this.getParam('quick-code'))\\n\" + \n" + 
        "			\"            attachEvent(findElement(div, '.code'), 'dblclick', quickCodeHandler);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return div;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Initializes the highlighter/brush.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * Constructor isn't used for initialization so that nothing executes during necessary\\n\" + \n" + 
        "			\"     * `new SyntaxHighlighter.Highlighter()` call when setting up brush inheritence.\\n\" + \n" + 
        "			\"     *\\n\" + \n" + 
        "			\"     * @param {Hash} params Highlighter parameters.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    init: function(params)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        this.id = guid();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // register this instance in the highlighters list\\n\" + \n" + 
        "			\"        storeHighlighter(this);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // local params take precedence over defaults\\n\" + \n" + 
        "			\"        this.params = merge(sh.defaults, params || {})\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        // process light mode\\n\" + \n" + 
        "			\"        if (this.getParam('light') == true)\\n\" + \n" + 
        "			\"            this.params.toolbar = this.params.gutter = false;\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Converts space separated list of keywords into a regular expression string.\\n\" + \n" + 
        "			\"     * @param {String} str    Space separated keywords.\\n\" + \n" + 
        "			\"     * @return {String}       Returns regular expression string.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    getKeywords: function(str)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        str = str\\n\" + \n" + 
        "			\"            .replace(/^\\\\s+|\\\\s+$/g, '')\\n\" + \n" + 
        "			\"            .replace(/\\\\s+/g, '|')\\n\" + \n" + 
        "			\"            ;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        return '\\\\\\\\b(?:' + str + ')\\\\\\\\b';\\n\" + \n" + 
        "			\"    },\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    /**\\n\" + \n" + 
        "			\"     * Makes a brush compatible with the `html-script` functionality.\\n\" + \n" + 
        "			\"     * @param {Object} regexGroup Object containing `left` and `right` regular expressions.\\n\" + \n" + 
        "			\"     */\\n\" + \n" + 
        "			\"    forHtmlScript: function(regexGroup)\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var regex = { 'end' : regexGroup.right.source };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        if(regexGroup.eof)\\n\" + \n" + 
        "			\"            regex.end = \\\"(?:(?:\\\" + regex.end + \\\")|$)\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        this.htmlScript = {\\n\" + \n" + 
        "			\"            left : { regex: regexGroup.left, css: 'script' },\\n\" + \n" + 
        "			\"            right : { regex: regexGroup.right, css: 'script' },\\n\" + \n" + 
        "			\"            code : XRegExp(\\n\" + \n" + 
        "			\"                \\\"(?<left>\\\" + regexGroup.left.source + \\\")\\\" +\\n\" + \n" + 
        "			\"                \\\"(?<code>.*?)\\\" +\\n\" + \n" + 
        "			\"                \\\"(?<right>\\\" + regex.end + \\\")\\\",\\n\" + \n" + 
        "			\"                \\\"sgi\\\"\\n\" + \n" + 
        "			\"                )\\n\" + \n" + 
        "			\"        };\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}; // end of Highlighter\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"return sh;\\n\" + \n" + 
        "			\"}(); // end of anonymous function\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// CommonJS\\n\" + \n" + 
        "			\"typeof(exports) != 'undefined' ? exports.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter : null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// JS brush\\n\" + \n" + 
        "			\";(function()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"    // CommonJS\\n\" + \n" + 
        "			\"    VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').VisualEventSyntaxHighlighter : null);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function Brush()\\n\" + \n" + 
        "			\"    {\\n\" + \n" + 
        "			\"        var keywords =  'break case catch class continue ' +\\n\" + \n" + 
        "			\"                'default delete do else enum export extends false  ' +\\n\" + \n" + 
        "			\"                'for function if implements import in instanceof ' +\\n\" + \n" + 
        "			\"                'interface let new null package private protected ' +\\n\" + \n" + 
        "			\"                'static return super switch ' +\\n\" + \n" + 
        "			\"                'this throw true try typeof var while with yield';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var r = VisualEventSyntaxHighlighter.regexLib;\\n\" + \n" + 
        "			\"        \\n\" + \n" + 
        "			\"        this.regexList = [\\n\" + \n" + 
        "			\"            { regex: r.multiLineDoubleQuotedString,                 css: 'string' },            // double quoted strings\\n\" + \n" + 
        "			\"            { regex: r.multiLineSingleQuotedString,                 css: 'string' },            // single quoted strings\\n\" + \n" + 
        "			\"            { regex: r.singleLineCComments,                         css: 'comments' },          // one line comments\\n\" + \n" + 
        "			\"            { regex: r.multiLineCComments,                          css: 'comments' },          // multiline comments\\n\" + \n" + 
        "			\"            { regex: /\\\\s*#.*/gm,                                    css: 'preprocessor' },      // preprocessor tags like #region and #endregion\\n\" + \n" + 
        "			\"            { regex: new RegExp(this.getKeywords(keywords), 'gm'),  css: 'keyword' }            // keywords\\n\" + \n" + 
        "			\"            ];\\n\" + \n" + 
        "			\"    \\n\" + \n" + 
        "			\"        this.forHtmlScript(r.scriptScriptTags);\\n\" + \n" + 
        "			\"    };\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    Brush.prototype = new VisualEventSyntaxHighlighter.Highlighter();\\n\" + \n" + 
        "			\"    Brush.aliases   = ['js', 'jscript', 'javascript', 'json'];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    VisualEventSyntaxHighlighter.brushes.JScript = Brush;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    // CommonJS\\n\" + \n" + 
        "			\"    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"window.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})();\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * @summary     Visual Event\\n\" + \n" + 
        "			\" * @description Visual Event - show Javascript events which have been attached to objects, and\\n\" + \n" + 
        "			\" *              the event's associated function code, visually.\\n\" + \n" + 
        "			\" * @file        VisualEvent_Loader.js\\n\" + \n" + 
        "			\" * @author      Allan Jardine (www.sprymedia.co.uk)\\n\" + \n" + 
        "			\" * @license     GPL v2\\n\" + \n" + 
        "			\" * @contact     www.sprymedia.co.uk/contact\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * @copyright Copyright 2007-2013 Allan Jardine.\\n\" + \n" + 
        "			\" *\\n\" + \n" + 
        "			\" * This source file is free software, under the GPL v2 license:\\n\" + \n" + 
        "			\" *   http://www.gnu.org/licenses/gpl-2.0.html\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global VisualEvent,VisualEvent_Loader,VisualEvents,VisualEventSyntaxHighlighter*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/** \\n\" + \n" + 
        "			\" * Visual Event will show, visually, which DOM elements on a web-page have events attached to\\n\" + \n" + 
        "			\" * them, information about those events and the code accossiated with each handler for the \\n\" + \n" + 
        "			\" * event. It does this by parsing through the cache of Javascript libraries (as there is no DOM\\n\" + \n" + 
        "			\" * method to get the information required), thus a major part of Visual Event are the library\\n\" + \n" + 
        "			\" * parsers. A result of this is that universal display of events is not possible - there must\\n\" + \n" + 
        "			\" * be a parser available.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" * Visual Event's display is broken into four major areas:\\n\" + \n" + 
        "			\" *   - Label - The information toolbar at the bottom of the window (fixed) showing Visual Event\\n\" + \n" + 
        "			\" * controls (close and help), the name of the program and information about the events that have\\n\" + \n" + 
        "			\" * been found on the page.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Help - The help view is a completely blocking layer which shows information about Visual\\n\" + \n" + 
        "			\" * Event and how to use it. A single click will remove the help layer and restore the standard\\n\" + \n" + 
        "			\" * Visual Event view.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Display - A layer which provides a background to Visual Event (thus when Visual Event is \\n\" + \n" + 
        "			\" * active is it blocking to the web-page below it) and acts as a container for the boxes (DIVs)\\n\" + \n" + 
        "			\" * which serve as a visual indicator that there is an event attached to the element below it\\n\" + \n" + 
        "			\" * (sized to match the element with the event attached).\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *   - Lightbox - The event information and code display of attached events.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" * Note that currently there can only be one instance of Visual Event at a time, due to \\n\" + \n" + 
        "			\" * practicality (no point in showing the same thing twice, at the same time) and the use of\\n\" + \n" + 
        "			\" * element IDs in the script.\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *  @class VisualEvent\\n\" + \n" + 
        "			\" *  @constructor\\n\" + \n" + 
        "			\" * \\n\" + \n" + 
        "			\" *  @example\\n\" + \n" + 
        "			\" *     new VisualEvent();\\n\" + \n" + 
        "			\"*/\\n\" + \n" + 
        "			\"window.VisualEvent = function ()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"	// Sanity check\\n\" + \n" + 
        "			\"	if ( ! this instanceof VisualEvent ) {\\n\" + \n" + 
        "			\"		alert( \\\"VisualEvent warning: Must be initialised with the 'new' keyword.\\\" );\\n\" + \n" + 
        "			\"		return;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Only one instance of VisualEvent at a time, in the current running mode. So if there is a\\n\" + \n" + 
        "			\"	// current instance, shut it down first\\n\" + \n" + 
        "			\"	if ( VisualEvent.instance !== null ) {\\n\" + \n" + 
        "			\"		VisualEvent.instance.close();\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	VisualEvent.instance = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Settings object containing customisable information for the class instance\\n\" + \n" + 
        "			\"	 * @namespace\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	this.s = {\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Array of objects containing information about the nodes which have been found to have\\n\" + \n" + 
        "			\"		 * events attached to them. Each object contains the following parameters:\\n\" + \n" + 
        "			\"		 *   {element} node The DOM element in question\\n\" + \n" + 
        "			\"		 *   {array} listeners Array of objects which with details about each of the events on this node\\n\" + \n" + 
        "			\"		 *     {string} func Source of the event handler (from Function.toString())\\n\" + \n" + 
        "			\"		 *     {string} source Library name / version\\n\" + \n" + 
        "			\"		 *     {string} type Type of event (click, change, keyup etc)\\n\" + \n" + 
        "			\"		 *     {boolean} removed Flag to indicate if the event has been removed (for API)\\n\" + \n" + 
        "			\"		 *  @type     array\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"elements\\\": null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * setTimeout reference for delayed hiding of the lightbox layer\\n\" + \n" + 
        "			\"		 *  @type     int\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"mouseTimer\\\": null,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Counter for the number of events which have been found from a JS library's cache, but\\n\" + \n" + 
        "			\"		 * are not currently available in the document's DOM\\n\" + \n" + 
        "			\"		 *  @type     int\\n\" + \n" + 
        "			\"		 *  @default  null\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"nonDomEvents\\\": 0,\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/** \\n\" + \n" + 
        "			\"		 * Array of objects holding information about each SCRIPT tag that is found in the DOM. Each\\n\" + \n" + 
        "			\"		 * object contains the parameters:\\n\" + \n" + 
        "			\"		 *   {string} src The URL of the script source (or inline string if no src attribute)\\n\" + \n" + 
        "			\"		 *   {string} code The code (.text) from the script\\n\" + \n" + 
        "			\"		 *  @type     array\\n\" + \n" + 
        "			\"		 *  @default  []\\n\" + \n" + 
        "			\"		 *  @private\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"scripts\\\": []\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * DOM elements used by the class instance\\n\" + \n" + 
        "			\"	 * @namespace\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	this.dom = {\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Label layer - for showing that Visual Event is currently running and information and\\n\" + \n" + 
        "			\"		 * controls, about and for this instance\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"label\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Label\\\">'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelClose\\\">x</span>'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelHelp\\\">?</span>'+\\n\" + \n" + 
        "			\"				'Visual Event <span class=\\\"Event_LabelBy\\\">by <a href=\\\"http://sprymedia.co.uk/\\\" target=\\\"_blank\\\">Allan Jardine</a>.</span>'+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelEvents\\\"></span> events were found attached to '+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelNodes\\\"></span> nodes. '+\\n\" + \n" + 
        "			\"				'<span class=\\\"Event_LabelNonDom\\\"></span> events were attached to elements not currently in the document.'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Display layer - background layer and container for Visual Event visual node indicators\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"display\\\": $('<div id=\\\"Event_Display\\\"></div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Lightbox layer - Template for information display about a given node, and the code for\\n\" + \n" + 
        "			\"		 * a given event handler\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"lightbox\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Lightbox\\\">'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_NodeName\\\">Node: <i></i>'+\\n\" + \n" + 
        "			\"					'<div class=\\\"Event_NodeRemove\\\">Remove from display</div>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"				'<div>'+\\n\" + \n" + 
        "			\"					'<div class=\\\"Event_Nav\\\">'+\\n\" + \n" + 
        "			\"						'<ul></ul>'+\\n\" + \n" + 
        "			\"					'</div>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_Code\\\"></div>'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Help layer - information about Visual Event and how to use it\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"help\\\": $(\\n\" + \n" + 
        "			\"			'<div id=\\\"Event_Help\\\">'+\\n\" + \n" + 
        "			\"				'<div class=\\\"Event_HelpInner\\\">'+\\n\" + \n" + 
        "			\"					'<h1>Visual Event help</h1>'+\\n\" + \n" + 
        "			\"					'<p>Visual Event will show which elements on any given page have Javascript events attached '+\\n\" + \n" + 
        "			\"						'to them, what those events are and the code associated with the events. In Webkit '+\\n\" + \n" + 
        "			\"						'browsers and Opera, Visual Event will also indicate where the code in question was '+\\n\" + \n" + 
        "			\"						'defined.</p>'+\\n\" + \n" + 
        "			\"					'<p>Note that Visual Event is only able to show events for Javascript libraries for which '+\\n\" + \n" + 
        "			\"						'it has a parser. This is currently: DOM0 events, Glow, jQuery, MooTools, Prototype and YUI2.</p>'+\\n\" + \n" + 
        "			\"					'<p>Commands:</p>'+\\n\" + \n" + 
        "			\"					'<table cellpadding=\\\"0\\\" cellspacing=\\\"0\\\" border=\\\"0\\\">'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Double click element with event</td>'+\\n\" + \n" + 
        "			\"							'<td>Hide event indicator. Allows access to nodes underneath</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: space</td>'+\\n\" + \n" + 
        "			\"							'<td>Restore all events to be visible</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: esc</td>'+\\n\" + \n" + 
        "			\"							'<td>Quit out of Visual Event</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: h</td>'+\\n\" + \n" + 
        "			\"							'<td>Show / hide this help box</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Key: r</td>'+\\n\" + \n" + 
        "			\"							'<td>Reload and display events on page</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"					'</table>'+\\n\" + \n" + 
        "			\"					'<p>The colour of the elements that have been detected to have an event reflect the type of '+\\n\" + \n" + 
        "			\"					'events that are attached to the element:</p>'+\\n\" + \n" + 
        "			\"					'<table cellpadding=\\\"0\\\" cellspacing=\\\"0\\\" border=\\\"0\\\" class=\\\"Event_LabelColorInfo\\\">'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"15%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_blue\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_red\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_yellow\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_green\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_purple\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"14%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_orange\\\"></div></td>'+\\n\" + \n" + 
        "			\"							'<td width=\\\"15%\\\"><div class=\\\"EventLabel Event_LabelColour Event_bg_black\\\"></div></td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"						'<tr>'+\\n\" + \n" + 
        "			\"							'<td>Mouse event</td>'+\\n\" + \n" + 
        "			\"							'<td>UI event</td>'+\\n\" + \n" + 
        "			\"							'<td>HTML event</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + HTML</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + UI</td>'+\\n\" + \n" + 
        "			\"							'<td>HTML + UI</td>'+\\n\" + \n" + 
        "			\"							'<td>Mouse + HTML + UI</td>'+\\n\" + \n" + 
        "			\"						'</tr>'+\\n\" + \n" + 
        "			\"					'</table>'+\\n\" + \n" + 
        "			\"					'<p>Visual Event is open source software (GPLv2). If you would like to contribute an '+\\n\" + \n" + 
        "			\"						'enhancement, please fork the project on '+\\n\" + \n" + 
        "			\"						'<a href=\\\"https://github.com/DataTables/VisualEvent\\\" target=\\\"_blank\\\">Github</a>!</p>'+\\n\" + \n" + 
        "			\"					'<p class=\\\"Event_HelpClose\\\">Click anywhere to close this help box.</p>'+\\n\" + \n" + 
        "			\"				'</div>'+\\n\" + \n" + 
        "			\"			'</div>')[0],\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/**\\n\" + \n" + 
        "			\"		 * Reference to the visual event node indicator - so we have a reference to what node we are\\n\" + \n" + 
        "			\"		 * showing the lightbox information about\\n\" + \n" + 
        "			\"		 *  @type     element\\n\" + \n" + 
        "			\"		 *  @default  See code\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		\\\"activeEventNode\\\": null\\n\" + \n" + 
        "			\"	};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	this._construct();\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.prototype = {\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * API methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Shutdown Visual Event and return to the original page\\n\" + \n" + 
        "			\"	 * @param {event} e Event object\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"close\\\": function ( e )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		// Remove all events that we've added\\n\" + \n" + 
        "			\"		$('*').unbind('.VisualEvent');\\n\" + \n" + 
        "			\"		$(document).unbind( 'keydown.VisualEvent' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.display).remove();\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).remove();\\n\" + \n" + 
        "			\"		$(this.dom.label).remove();\\n\" + \n" + 
        "			\"		$(this.dom.help).remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( typeof VisualEvent_Loader !== 'undefined' && !VisualEvent_Loader.jQueryPreLoaded ) {\\n\" + \n" + 
        "			\"			$.noConflict();\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		VisualEvent.instance = null;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Reinitialise Visual Event (i.e. bring it up-to-date with any new events which might have\\n\" + \n" + 
        "			\"	 *   been added\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"reInit\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		$('*').unbind('.VisualEvent');\\n\" + \n" + 
        "			\"		$(document).unbind( 'keydown.VisualEvent' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.display).empty();\\n\" + \n" + 
        "			\"		$(this.dom.display).remove();\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).remove();\\n\" + \n" + 
        "			\"		$(this.dom.label).remove();\\n\" + \n" + 
        "			\"		$(this.dom.help).remove();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this.s.elements.splice(0, this.s.elements.length);\\n\" + \n" + 
        "			\"		this.s.nonDomEvents = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._construct();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Private methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Visual Event constructor\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_construct\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var windowHeight = $(document).height();\\n\" + \n" + 
        "			\"		var windowWidth = $(document).width();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Prep the DOM */\\n\" + \n" + 
        "			\"		this.dom.display.style.width = windowWidth+'px';\\n\" + \n" + 
        "			\"		this.dom.display.style.height = windowHeight+'px';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.display );\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.lightbox );\\n\" + \n" + 
        "			\"		//document.body.appendChild( this.dom.label );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Event handlers */\\n\" + \n" + 
        "			\"		$(this.dom.lightbox).bind('mouseover.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._timerClear( e );\\n\" + \n" + 
        "			\"		} ).bind( 'mousemove.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._timerClear( e );\\n\" + \n" + 
        "			\"		} ).bind( 'mouseout.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._lightboxHide();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('div.Event_NodeRemove', this.dom.lightbox).bind('click.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that.dom.activeEventNode.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"			that.dom.lightbox.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(document).bind( 'keydown.VisualEvent', function( e ) {\\n\" + \n" + 
        "			\"			if ( e.which === 0 || e.which === 27 ) { // esc\\n\" + \n" + 
        "			\"				that.close();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			if ( e.which === 72 ) { // 'h'\\n\" + \n" + 
        "			\"				if ( $(that.dom.help).filter(':visible').length === 0 ) {\\n\" + \n" + 
        "			\"					that._help();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				else {\\n\" + \n" + 
        "			\"					that._hideHelp();\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else if ( e.which === 32 ) { // space\\n\" + \n" + 
        "			\"				$('div.EventLabel').css('display', 'block');\\n\" + \n" + 
        "			\"				e.preventDefault();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else if ( e.which === 82 ) { // r\\n\" + \n" + 
        "			\"				that.reInit();\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Build the events list and display */\\n\" + \n" + 
        "			\"		this.s.elements = this._eventsLoad();\\n\" + \n" + 
        "			\"		for ( i=0, iLen=this.s.elements.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			this._eventElement( this.s.elements[i] );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._renderLabel();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Load the text of all the Javascript on the page so we can try to find source */\\n\" + \n" + 
        "			\"		this._scriptsLoad();\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * User help\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show the help box\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_help\\\": function () {\\n\" + \n" + 
        "			\"		document.body.appendChild( this.dom.help );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Hide hte help box\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_hideHelp\\\": function () {\\n\" + \n" + 
        "			\"		document.body.removeChild( this.dom.help );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Javascript source handling\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Parse the DOM for script tags and store the Javascript that is found. For any scripts which\\n\" + \n" + 
        "			\"	 * have a 'src' attribute, add them to a queue for Ajax loading and then start the queue running\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptsLoad\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		// Don't load scripts again if they are already loaded\\n\" + \n" + 
        "			\"		if ( this.s.scripts.length > 0 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var loadQueue = [];\\n\" + \n" + 
        "			\"		var scripts = document.getElementsByTagName('script');\\n\" + \n" + 
        "			\"		for ( var i=0, iLen=scripts.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			if ( scripts[i].src  && scripts[i].src !== \\\"\\\" ) {\\n\" + \n" + 
        "			\"				if ( scripts[i].src.indexOf('VisualEvent') === -1 ) {\\n\" + \n" + 
        "			\"					loadQueue.push( scripts[i].src );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else {\\n\" + \n" + 
        "			\"				this.s.scripts.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": \\\"Inline script\\\",\\n\" + \n" + 
        "			\"					\\\"code\\\": scripts[i].text\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Pull an item off the script loading queue and load it up by an Ajax return. When done, loop\\n\" + \n" + 
        "			\"	 * back and load the next item off the queue, until all done.\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptLoadQueue\\\": function ( loadQueue )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		/* Check if we still have anything to do or not */\\n\" + \n" + 
        "			\"		if ( loadQueue.length === 0 ) {\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var url = loadQueue.shift();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$.ajax( {\\n\" + \n" + 
        "			\"			\\\"dataType\\\": 'text',\\n\" + \n" + 
        "			\"			\\\"type\\\": \\\"GET\\\",\\n\" + \n" + 
        "			\"			\\\"url\\\": url,\\n\" + \n" + 
        "			\"			\\\"success\\\": function (text) {\\n\" + \n" + 
        "			\"				that.s.scripts.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": url,\\n\" + \n" + 
        "			\"					\\\"code\\\": text\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"				that._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"			\\\"error\\\": function () {\\n\" + \n" + 
        "			\"				that._scriptLoadQueue( loadQueue );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Attempt to find the source location (file and line number) for a given function and\\n\" + \n" + 
        "			\"	 * format a return string which is human readable explaining where the source might come from\\n\" + \n" + 
        "			\"	 *  @param {string} func The function string to search for\\n\" + \n" + 
        "			\"	 *  @returns {string} Formatted string with information about the source\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptSource\\\": function ( func )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var origin = \\\"\\\";\\n\" + \n" + 
        "			\"		var srcFiles = [];\\n\" + \n" + 
        "			\"		var i, iLen, a;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Webkit reformats the prototype for the function, so the whitespace might not match our\\n\" + \n" + 
        "			\"		// intended target. Remove the prototype - it means we are more likely to get a clash, but\\n\" + \n" + 
        "			\"		// don't see much choice if we want to do matching other than trying all variations\\n\" + \n" + 
        "			\"		func = $.trim( func.replace(/^(function.*?\\\\))/, '') );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0, iLen=this.s.scripts.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			if ( this.s.scripts[i].code.indexOf( func ) !== -1 ) {\\n\" + \n" + 
        "			\"				a = this.s.scripts[i].code.split( func );\\n\" + \n" + 
        "			\"				srcFiles.push( {\\n\" + \n" + 
        "			\"					\\\"src\\\": this.s.scripts[i].src,\\n\" + \n" + 
        "			\"					\\\"line\\\": a[0].split('\\\\n').length\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Firefox reformats the functions from toString() rather than keeping the original format\\n\" + \n" + 
        "			\"		// so we'll never be able to find the original. Should we just return an empty string\\n\" + \n" + 
        "			\"		// for Firefox?\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( srcFiles.length === 0 ) {\\n\" + \n" + 
        "			\"			origin = \\\"Function definition could not be found automatically<br/>\\\";\\n\" + \n" + 
        "			\"		} else if ( srcFiles.length === 1 ) {\\n\" + \n" + 
        "			\"			origin = 'Function defined in ';\\n\" + \n" + 
        "			\"			if (srcFiles[0].src != 'Inline script') {\\n\" + \n" + 
        "			\"				origin += '<a href=\\\"' + srcFiles[0].src + '\\\">'+this._scriptName(srcFiles[0].src)+'</a>:'+ srcFiles[0].line + \\\"<br/>\\\";\\n\" + \n" + 
        "			\"			} else {\\n\" + \n" + 
        "			\"				origin += srcFiles[0].src+\\\"<br />\\\";\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		} else {\\n\" + \n" + 
        "			\"			origin = \\\"Function could originate in multiple locations:<br/>\\\";\\n\" + \n" + 
        "			\"			for ( i=0, iLen=srcFiles.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"				origin += (i+1)+'. '+\\n\" + \n" + 
        "			\"					' in <a href=\\\"'+srcFiles[i].src+'\\\" target=\\\"_blank\\\">'+this._scriptName(srcFiles[i].src)+'</a>:'+srcFiles[i].line+'<br/>';\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return origin;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Get the name of a file from a URL (i.e. the last part in a slash seperated string)\\n\" + \n" + 
        "			\"	 *  @param {string} src URL to get the file name from\\n\" + \n" + 
        "			\"	 *  @returns {string} File name\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_scriptName\\\": function ( src )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var a = src.split('/');\\n\" + \n" + 
        "			\"		return a[ a.length-1 ];\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Display\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Build the list of nodes that have events attached to them by going through all installed\\n\" + \n" + 
        "			\"	 * parsers\\n\" + \n" + 
        "			\"	 *  @returns {array} List of nodes with their associated events\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventsLoad\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var elements=[], libraryListeners;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Gather the events from the supported libraries */\\n\" + \n" + 
        "			\"		for ( i=0, iLen=VisualEvent.parsers.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			// Given the millions of environments that the parsers will run in, it is quite possible one\\n\" + \n" + 
        "			\"			// will hit an error - if it does, just ignore it and pass on.\\n\" + \n" + 
        "			\"			try {\\n\" + \n" + 
        "			\"				libraryListeners = VisualEvent.parsers[i]();\\n\" + \n" + 
        "			\"				elements.push.apply( elements, libraryListeners );\\n\" + \n" + 
        "			\"			} catch (e) {\\n\" + \n" + 
        "			\"				console.log( 'Visual Event parser error:', e );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Add the API array information - if it is available */\\n\" + \n" + 
        "			\"		if ( typeof VisualEvents == 'object' ) {\\n\" + \n" + 
        "			\"			if ( this._ceckIntegrity( VisualEvents ) ) {\\n\" + \n" + 
        "			\"				elements = this._combineEvents( elements, VisualEvents );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Group the events */\\n\" + \n" + 
        "			\"		return this._merge( elements );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * A node has at least one event subscribed to it - draw it visually\\n\" + \n" + 
        "			\"	 *  @param {object} eventNode Event information for this node in the same format as \\n\" + \n" + 
        "			\"	 *    VisualEvent.s.elements objects\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventElement\\\": function ( eventNode )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var pos;\\n\" + \n" + 
        "			\"		var label;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Element is hidden\\n\" + \n" + 
        "			\"		if ( $(eventNode.node).filter(':visible').length === 0 ) {\\n\" + \n" + 
        "			\"			this.s.nonDomEvents += 1;\\n\" + \n" + 
        "			\"			return;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		pos = $(eventNode.node).offset();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		label = document.createElement( 'div' );\\n\" + \n" + 
        "			\"		label.style.position = \\\"absolute\\\";\\n\" + \n" + 
        "			\"		label.style.top = pos.top+\\\"px\\\";\\n\" + \n" + 
        "			\"		label.style.left = pos.left+\\\"px\\\";\\n\" + \n" + 
        "			\"		label.className = 'EventLabel Event_bg_'+this._getColorFromTypes( eventNode.listeners );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* If dealing with the html or body tags, don't paint over the whole screen */\\n\" + \n" + 
        "			\"		if ( eventNode.node != document.body && eventNode.node != document.documentElement ) {\\n\" + \n" + 
        "			\"			label.style.width = (eventNode.node.offsetWidth-4)+'px';\\n\" + \n" + 
        "			\"			label.style.height = (eventNode.node.offsetHeight-4)+'px';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Event listeners for showing the lightbox for this element */\\n\" + \n" + 
        "			\"		$(label).bind( 'dblclick.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			this.style.display = \\\"none\\\";\\n\" + \n" + 
        "			\"			return false;\\n\" + \n" + 
        "			\"		} ).bind( 'mouseover.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that.dom.activeEventNode = this;\\n\" + \n" + 
        "			\"			that._lightboxList( e, eventNode.node, eventNode.listeners );\\n\" + \n" + 
        "			\"		} ).bind( 'mouseout.VisualEvent', function (e) {\\n\" + \n" + 
        "			\"			that._lightboxHide();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Finally have the html engine render our output */\\n\" + \n" + 
        "			\"		this.dom.display.appendChild( label );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Lightbox\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show the list of event types which are attached to this node and add event listeners to show\\n\" + \n" + 
        "			\"	 * the code when required (mouseover on the list)\\n\" + \n" + 
        "			\"	 *  @param {event} e The mouse event that triggered this display\\n\" + \n" + 
        "			\"	 *  @param {element} node The node with the attached listeners\\n\" + \n" + 
        "			\"	 *  @param {array} listeners List of listeners attached to the element\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxList\\\": function ( e, node, listeners )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"		var ul;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._timerClear();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('i', this.dom.lightbox).html( this._renderNodeInfo(node) );\\n\" + \n" + 
        "			\"		$('div.Event_Code', this.dom.lightbox).empty();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		ul = $('ul', this.dom.lightbox).empty();\\n\" + \n" + 
        "			\"		for ( i=0, iLen=listeners.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			ul.append( $('<li>'+listeners[i].type+'</li>').bind( 'mouseover.VisualEvent',\\n\" + \n" + 
        "			\"				this._lightboxCode(e, node, listeners[i]) )\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Show the code for the first event in the list */\\n\" + \n" + 
        "			\"		$('li:eq(0)', this.dom.lightbox).mouseover();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._lightboxPosition( this.dom.lightbox, node );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Create a function which will build the HTML needed for the display of the code for an\\n\" + \n" + 
        "			\"	 * event handler\\n\" + \n" + 
        "			\"	 *  @param {event} e Original mouse event that triggered the lightbox to be shown\\n\" + \n" + 
        "			\"	 *  @param {element} node The node with the attached listeners\\n\" + \n" + 
        "			\"	 *  @param {object} listener Listener attached to the element\\n\" + \n" + 
        "			\"	 *  @returns {function} Function which will display the code for the event when called\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxCode\\\": function ( e, node, listener )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return function () {\\n\" + \n" + 
        "			\"			$('li', this.parentNode).removeClass( 'Event_EventSelected' );\\n\" + \n" + 
        "			\"			$(this).addClass( 'Event_EventSelected' );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var evt = that._createEvent( e, listener.type, e.target );\\n\" + \n" + 
        "			\"			that._renderCode( e, listener.func, listener.source, listener.type,\\n\" + \n" + 
        "			\"				evt===null ? null : function() {\\n\" + \n" + 
        "			\"					node.dispatchEvent(evt);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Might cause stuff to move around by the activation of the event, so re-init\\n\" + \n" + 
        "			\"					setTimeout( function () {\\n\" + \n" + 
        "			\"						that.reInit.call(that);\\n\" + \n" + 
        "			\"					}, 200 );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			);\\n\" + \n" + 
        "			\"		};\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Position the lightbox relative to the element which has an event attached to it\\n\" + \n" + 
        "			\"	 *  @param {element} target The lightbox node to move (note there is only one this.dom.lightbox\\n\" + \n" + 
        "			\"	 *    but this keeps it nice and generic!)\\n\" + \n" + 
        "			\"	 *  @param {element} parent The element with the event attached to it\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxPosition\\\": function ( target, parent )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var offset = $(parent).offset();\\n\" + \n" + 
        "			\"		var targetT = offset.top + 15; // magic number - height of info button\\n\" + \n" + 
        "			\"		var targetL = offset.left;\\n\" + \n" + 
        "			\"		var viewportW = $(window).width() - 25; // use window rather than document, since the target could cause the document to resize\\n\" + \n" + 
        "			\"		var viewportH = $(document).height();\\n\" + \n" + 
        "			\"		var targetW = $(target).width();\\n\" + \n" + 
        "			\"		var targetH = $(target).height();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Correct for over-run\\n\" + \n" + 
        "			\"		if ( targetL + targetW > viewportW ) {\\n\" + \n" + 
        "			\"			targetL -= (targetL + targetW) - viewportW;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( targetT + targetH > viewportH ) {\\n\" + \n" + 
        "			\"			targetH -= (targetT + targetH) - viewportH;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Correct for under-run\\n\" + \n" + 
        "			\"		if ( targetT < 0 ) {\\n\" + \n" + 
        "			\"			targetT = 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( targetL < 0 ) {\\n\" + \n" + 
        "			\"			targetL = 0;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		target.style.top = targetT+'px';\\n\" + \n" + 
        "			\"		target.style.left = targetL+'px';\\n\" + \n" + 
        "			\"		target.style.display = 'block';\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Close the lightbox - use a cancellable timer for the hiding of the lightbox, so we can move \\n\" + \n" + 
        "			\"	 * the mouse from element to element without having it flicker.\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_lightboxHide\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		this.s.mouseTimer = setTimeout( function () {\\n\" + \n" + 
        "			\"				that.dom.lightbox.style.display = 'none';\\n\" + \n" + 
        "			\"			},\\n\" + \n" + 
        "			\"		200 );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Rendering methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Display a tooltip with event information for a particular event handler\\n\" + \n" + 
        "			\"	 *  @param {event} e Target node information\\n\" + \n" + 
        "			\"	 *  @param {function} func The function string\\n\" + \n" + 
        "			\"	 *  @param {string} type Event type\\n\" + \n" + 
        "			\"	 *  @param {function|null} trigger Function to trigger the event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderCode\\\": function( e, func, source, type, trigger )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this;\\n\" + \n" + 
        "			\"		var eventElement = e.target;\\n\" + \n" + 
        "			\"		var i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		this._timerClear( e );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( trigger === null ) {\\n\" + \n" + 
        "			\"			$('div.Event_Code', this.dom.lightbox).html( '<div id=\\\"Event_inner\\\"><p><i>'+type+\\n\" + \n" + 
        "			\"				'</i> event subscribed by '+source+'<br/>'+\\n\" + \n" + 
        "			\"				this._scriptSource( func )+\\n\" + \n" + 
        "			\"				'</p><pre id=\\\"Event_code\\\" class=\\\"brush: js\\\"></pre></div>' );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else {\\n\" + \n" + 
        "			\"			$('div.Event_Code', this.dom.lightbox).html( '<div id=\\\"Event_inner\\\"><p><i>'+type+\\n\" + \n" + 
        "			\"				'</i> event subscribed by '+source+' ('+\\n\" + \n" + 
        "			\"				'<span id=\\\"Event_Trigger\\\">trigger event</span>)<br/>'+\\n\" + \n" + 
        "			\"				this._scriptSource( func )+\\n\" + \n" + 
        "			\"				'</p><pre id=\\\"Event_code\\\" class=\\\"brush: js\\\"></pre></div>' );\\n\" + \n" + 
        "			\"			$('#Event_Trigger').bind( 'click.VisualEvent', trigger );\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Modify the function slightly such that the white space that is found at the start of the\\n\" + \n" + 
        "			\"		 * last line in the function is also put at the start of the first line. This allows\\n\" + \n" + 
        "			\"		 * SyntaxHighlighter to be cunning and remove the block white space - otherwise it is all\\n\" + \n" + 
        "			\"		 * shifted to the left, other than the first line\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"		var lines = func.split('\\\\n');\\n\" + \n" + 
        "			\"		if ( lines.length > 1 ) {\\n\" + \n" + 
        "			\"			var last = lines[lines.length-1].match(/^(\\\\s*)/g);\\n\" + \n" + 
        "			\"			lines[0] = last + lines[0];\\n\" + \n" + 
        "			\"			func = lines.join('\\\\n');\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/* Inject the function string here incase it includes a '</textarea>' string */\\n\" + \n" + 
        "			\"		$('pre', this.dom.lightbox).html(\\n\" + \n" + 
        "			\"			func.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')\\n\" + \n" + 
        "			\"		);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		VisualEventSyntaxHighlighter.highlight( null, document.getElementById('Event_code') );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Show information about a particular node - the node name, ID and class (if it has either/both\\n\" + \n" + 
        "			\"	 * of the last two)\\n\" + \n" + 
        "			\"	 *  @param {element} node The element to inspect\\n\" + \n" + 
        "			\"	 *  @returns {string} Information about the element\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderNodeInfo\\\": function ( node )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var s = node.nodeName.toLowerCase();\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var id = node.getAttribute('id');\\n\" + \n" + 
        "			\"		if ( id && id !== '' ) {\\n\" + \n" + 
        "			\"			s += '#'+id;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var className = node.className;\\n\" + \n" + 
        "			\"		if ( className !== '' ) {\\n\" + \n" + 
        "			\"			s += '.'+className;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return s;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Display the Visual Event toolbar, writing in the required information and adding the event\\n\" + \n" + 
        "			\"	 * handlers as needed\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_renderLabel\\\": function ()\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var that = this,\\n\" + \n" + 
        "			\"			events = 0, i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for (i=0, iLen=this.s.elements.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			events += this.s.elements[i].listeners.length;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('span.Event_LabelEvents', this.dom.label).html( events );\\n\" + \n" + 
        "			\"		$('span.Event_LabelNodes', this.dom.label).html( this.s.elements.length );\\n\" + \n" + 
        "			\"		$('span.Event_LabelNonDom', this.dom.label).html( this.s.nonDomEvents );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		//this.dom.label.innerHTML = \\\"Visual Event\\\";\\n\" + \n" + 
        "			\"		$('span.Event_LabelClose', this.dom.label).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that.close();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$('span.Event_LabelHelp', this.dom.label).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that._help();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(this.dom.help).bind( 'click.VisualEvent', function () {\\n\" + \n" + 
        "			\"			that._hideHelp();\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\"	 * Support methods\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Create an event oject based on the type to trigger an event - cross-platform\\n\" + \n" + 
        "			\"	 *  @param {event} originalEvt The original event (click) which caused this function to run\\n\" + \n" + 
        "			\"	 *  @param {string} type Type of event\\n\" + \n" + 
        "			\"	 *  @param {node} target Target node of the event\\n\" + \n" + 
        "			\"	 *  @returns {event} The constructed event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_createEvent\\\": function( originalEvt, type, target )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var evt = null;\\n\" + \n" + 
        "			\"		var offset = $(target).offset();\\n\" + \n" + 
        "			\"		var typeGroup = this._eventTypeGroup( type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( document.createEvent ) {\\n\" + \n" + 
        "			\"			switch ( typeGroup ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"MouseEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initMouseEvent( type, true, true, window, 0, offset.left, offset.top,\\n\" + \n" + 
        "			\"						offset.left, offset.top, originalEvt.ctrlKey, originalEvt.altKey, originalEvt.shiftKey,\\n\" + \n" + 
        "			\"						originalEvt.metaKey, originalEvt.button, null );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"HTMLEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initEvent( type, true, true );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					evt = document.createEvent( \\\"UIEvents\\\" );\\n\" + \n" + 
        "			\"					evt.initUIEvent( type, true, true, window, 0 );\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( document.createEventObject ) {\\n\" + \n" + 
        "			\"			switch ( typeGroup ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					evt = document.createEventObject();\\n\" + \n" + 
        "			\"					evt.screenX = offset.left;\\n\" + \n" + 
        "			\"					evt.screenX = offset.top;\\n\" + \n" + 
        "			\"					evt.clientX = offset.left;\\n\" + \n" + 
        "			\"					evt.clientY = offset.top;\\n\" + \n" + 
        "			\"					evt.ctrlKey = originalEvt.ctrlKey;\\n\" + \n" + 
        "			\"					evt.altKey = originalEvt.altKey;\\n\" + \n" + 
        "			\"					evt.metaKey = originalEvt.metaKey;\\n\" + \n" + 
        "			\"					evt.button = originalEvt.button;\\n\" + \n" + 
        "			\"					evt.relatedTarget = null;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					/* fall through to basic event object */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					evt = document.createEventObject();\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return evt;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Cancel tooltip mouse timer\\n\" + \n" + 
        "			\"	 *  @param {event} e Mouse event\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_timerClear\\\": function ( e )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		if ( this.s.mouseTimer !== null ) {\\n\" + \n" + 
        "			\"			clearTimeout( this.s.mouseTimer );\\n\" + \n" + 
        "			\"			this.s.mouseTimer = null;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Combine the main events array, so that each node only has one element\\n\" + \n" + 
        "			\"	 *  @param {array} main The main source array\\n\" + \n" + 
        "			\"	 *  @returns {array} Augmented internal representation\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_merge\\\": function ( main )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var ret = [];\\n\" + \n" + 
        "			\"		var found, i, iLen, j, jLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0, iLen=main.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"			found = false;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( j=0, jLen=ret.length ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"				if ( ret[j].node == main[i].node ) {\\n\" + \n" + 
        "			\"					ret[j].listeners = ret[j].listeners.concat( main[i].listeners );\\n\" + \n" + 
        "			\"					found = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			if ( !found ) {\\n\" + \n" + 
        "			\"				ret.push( main[i] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return ret;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Combine the API array into the internal representation.\\n\" + \n" + 
        "			\"	 * The input structure MUST be valid for this to work - two types of objects are allowed as \\n\" + \n" + 
        "			\"	 *   array entries:\\n\" + \n" + 
        "			\"	 *     { node: '', source: '', func: '', type: '', removed: bool }\\n\" + \n" + 
        "			\"	 *     { node: '', source: '', listeners: [ func: '', type: '', removed: bool, ... ] }\\n\" + \n" + 
        "			\"	 *  @param {array} main The main source array\\n\" + \n" + 
        "			\"	 *  @param {array} api The API array\\n\" + \n" + 
        "			\"	 *  @returns {array} Augmented internal representation\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_combineEvents\\\": function ( main, api )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var i, j,\\n\" + \n" + 
        "			\"			found, found2;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0 ; i<api.length ; i++ ) {\\n\" + \n" + 
        "			\"			if ( typeof api[i].listeners != 'undefined' ) {\\n\" + \n" + 
        "			\"				main.push( api[i] );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"			else {\\n\" + \n" + 
        "			\"				found = -1;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* Want to combine single definitions into our single entry for each node array */\\n\" + \n" + 
        "			\"				for ( j=0 ; j<main.length ; j++ ) {\\n\" + \n" + 
        "			\"					if ( main[j].node == api[i].node ) {\\n\" + \n" + 
        "			\"						found = j;\\n\" + \n" + 
        "			\"						break;\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if ( found == -1 ) {\\n\" + \n" + 
        "			\"					main.push( {\\n\" + \n" + 
        "			\"						\\\"node\\\": api[i].node,\\n\" + \n" + 
        "			\"						\\\"source\\\": api[i].source,\\n\" + \n" + 
        "			\"						\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"							\\\"type\\\": api[i].type,\\n\" + \n" + 
        "			\"							\\\"func\\\": api[i].func,\\n\" + \n" + 
        "			\"							\\\"removed\\\": api[i].removed\\n\" + \n" + 
        "			\"						} ]\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"				else {\\n\" + \n" + 
        "			\"					/* Check to see if this exact event has already been added at some point */\\n\" + \n" + 
        "			\"					found2 = -1;\\n\" + \n" + 
        "			\"					for ( j=0 ; j<main[ found ].listeners.length ; j++ ) {\\n\" + \n" + 
        "			\"						if ( main[ found ].listeners[j].type == api[i].type &&\\n\" + \n" + 
        "			\"								 main[ found ].listeners[j].func == api[i].func )\\n\" + \n" + 
        "			\"						{\\n\" + \n" + 
        "			\"							/* Update removed variable */\\n\" + \n" + 
        "			\"							main[ found ].listeners[j].removed = api[i].removed;\\n\" + \n" + 
        "			\"							found2 = j;\\n\" + \n" + 
        "			\"							break;\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					/* If not found - then add it in */\\n\" + \n" + 
        "			\"					if ( found2 != -1 ) {\\n\" + \n" + 
        "			\"						main[ found ].listeners.push( {\\n\" + \n" + 
        "			\"							\\\"type\\\": api[i].type,\\n\" + \n" + 
        "			\"							\\\"func\\\": api[i].func,\\n\" + \n" + 
        "			\"							\\\"removed\\\": api[i].removed\\n\" + \n" + 
        "			\"						} );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		return main;\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Group the event types as per w3c groupings\\n\" + \n" + 
        "			\"	 *  @param {string} type Event type\\n\" + \n" + 
        "			\"	 *  @returns {string} Event grouping\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_eventTypeGroup\\\": function ( type )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		switch ( type ) {\\n\" + \n" + 
        "			\"			case 'click':\\n\" + \n" + 
        "			\"			case 'dblclick':\\n\" + \n" + 
        "			\"			case 'mousedown':\\n\" + \n" + 
        "			\"			case 'mousemove':\\n\" + \n" + 
        "			\"			case 'mouseout':\\n\" + \n" + 
        "			\"			case 'mouseover':\\n\" + \n" + 
        "			\"			case 'mouseup':\\n\" + \n" + 
        "			\"			case 'scroll':\\n\" + \n" + 
        "			\"				return 'mouse';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			case 'change':\\n\" + \n" + 
        "			\"			case 'focus':\\n\" + \n" + 
        "			\"			case 'blur':\\n\" + \n" + 
        "			\"			case 'select':\\n\" + \n" + 
        "			\"			case 'submit':\\n\" + \n" + 
        "			\"				return 'html';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			case 'keydown':\\n\" + \n" + 
        "			\"			case 'keypress':\\n\" + \n" + 
        "			\"			case 'keyup':\\n\" + \n" + 
        "			\"			case 'load':\\n\" + \n" + 
        "			\"			case 'unload':\\n\" + \n" + 
        "			\"				return 'ui';\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			default:\\n\" + \n" + 
        "			\"				return 'custom';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	},\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/**\\n\" + \n" + 
        "			\"	 * Compute the background colour of the event indicator from the event types\\n\" + \n" + 
        "			\"	 *  @param {array} events Events information\\n\" + \n" + 
        "			\"	 *  @returns {string} Color\\n\" + \n" + 
        "			\"	 *  @private\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	\\\"_getColorFromTypes\\\": function ( events )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var hasMouse = false;\\n\" + \n" + 
        "			\"		var hasHtml = false;\\n\" + \n" + 
        "			\"		var hasUi = false;\\n\" + \n" + 
        "			\"		var group, i;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( i=0 ; i<events.length ; i++ ) {\\n\" + \n" + 
        "			\"			group = this._eventTypeGroup( events[i].type );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			switch ( group ) {\\n\" + \n" + 
        "			\"				case 'mouse':\\n\" + \n" + 
        "			\"					hasMouse = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'html':\\n\" + \n" + 
        "			\"					hasHtml = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				case 'ui':\\n\" + \n" + 
        "			\"					/* We call 'custom' and 'unknown' types UI as well */\\n\" + \n" + 
        "			\"					hasUi = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				default:\\n\" + \n" + 
        "			\"					hasUi = true;\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		/*\\n\" + \n" + 
        "			\"		 * Since we have three event groups which can be in any combination - then we can group the\\n\" + \n" + 
        "			\"		 * resultant colours via the colour wheel\\n\" + \n" + 
        "			\"		 *        \\n\" + \n" + 
        "			\"		 *                        Red (UI)\\n\" + \n" + 
        "			\"		 *                         +++++\\n\" + \n" + 
        "			\"		 *                       ++     ++\\n\" + \n" + 
        "			\"		 *                     ++         ++\\n\" + \n" + 
        "			\"		 *                     ++         ++\\n\" + \n" + 
        "			\"		 *       Yellow (Html)   ++     ++   Blue (mouse)\\n\" + \n" + 
        "			\"		 *                         +++++\\n\" + \n" + 
        "			\"		 */\\n\" + \n" + 
        "			\"	 if ( hasMouse && hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'black';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( !hasMouse && hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'orange';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse && !hasHtml && hasUi ) {\\n\" + \n" + 
        "			\"			return 'purple';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse && hasHtml && !hasUi ) {\\n\" + \n" + 
        "			\"			return 'green';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasMouse ) {\\n\" + \n" + 
        "			\"			return 'blue';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasHtml ) {\\n\" + \n" + 
        "			\"			return 'yellow';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( hasUi ) {\\n\" + \n" + 
        "			\"			return 'red';\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\n\" + \n" + 
        "			\" * Statics\\n\" + \n" + 
        "			\" * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Javascript library parsers which will find information about the nodes and events which are\\n\" + \n" + 
        "			\" * used in the page. This is an array of functions which must return an array of objects with\\n\" + \n" + 
        "			\" * the following parameters\\n\" + \n" + 
        "			\" *   {element} node The DOM element in question\\n\" + \n" + 
        "			\" *   {array} listeners Array of objects which with details about each of the events on this node\\n\" + \n" + 
        "			\" *     {string} func Source of the event handler (from Function.toString())\\n\" + \n" + 
        "			\" *     {string} source Library name / version\\n\" + \n" + 
        "			\" *     {string} type Type of event (click, change, keyup etc)\\n\" + \n" + 
        "			\" *     {boolean} removed Flag to indicate if the event has been removed (for API)\\n\" + \n" + 
        "			\" *  @type array\\n\" + \n" + 
        "			\" *  @default []\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.parsers = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Reference to the currently running VisualEvent instance (one at a time only)\\n\" + \n" + 
        "			\" *  @type object\\n\" + \n" + 
        "			\" *  @default null\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" *  @private\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.instance = null;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Close Visual Event, removing all DOM elements and event handlers\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.close = function ()\\n\" + \n" + 
        "			\"{\\n\" + \n" + 
        "			\"	VisualEvent.instance.close();\\n\" + \n" + 
        "			\"	VisualEvent.instance = null;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Compare two version strings\\n\" + \n" + 
        "			\" *  @static\\n\" + \n" + 
        "			\" *  @param {string} v1 Version 1 string\\n\" + \n" + 
        "			\" *  @param {string} operator '<', '<=', '==', '>=' or '>' - logic operation to\\n\" + \n" + 
        "			\" *    perform\\n\" + \n" + 
        "			\" *  @param {string} v2 Version 2 string\\n\" + \n" + 
        "			\" *  @returns {boolean} true if condition is correct, false otherwise\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"VisualEvent.versionCompare = function ( v1, operator, v2 ) {\\n\" + \n" + 
        "			\"	var a1 = v1.split('.');\\n\" + \n" + 
        "			\"	var a2 = v2.split('.');\\n\" + \n" + 
        "			\"	var i1, i2;\\n\" + \n" + 
        "			\"	var test = 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i=0, iLen=a2.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		i1 = parseInt( a1[i], 10 ) || 0;\\n\" + \n" + 
        "			\"		i2 = parseInt( a2[i], 10 ) || 0;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		// Parts are the same, keep comparing\\n\" + \n" + 
        "			\"		if ( i1 < i2 ) {\\n\" + \n" + 
        "			\"			test = -1;\\n\" + \n" + 
        "			\"			break;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"		else if ( i1 > i2 ) {\\n\" + \n" + 
        "			\"			test = 1;\\n\" + \n" + 
        "			\"			break;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if ( operator === '<' ) {\\n\" + \n" + 
        "			\"		return test === -1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '<=' ) {\\n\" + \n" + 
        "			\"		return test === -1 || test === 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '==' ) {\\n\" + \n" + 
        "			\"		return test === 0;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '>=' ) {\\n\" + \n" + 
        "			\"		return test === 0 || test === 1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	else if ( operator === '>' ) {\\n\" + \n" + 
        "			\"		return test === 1;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"	throw 'Unknown operator: '+operator;\\n\" + \n" + 
        "			\"};\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	var\\n\" + \n" + 
        "			\"		elements = [], n,\\n\" + \n" + 
        "			\"		all = document.getElementsByTagName('*'),\\n\" + \n" + 
        "			\"		types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover',\\n\" + \n" + 
        "			\"			'mouseup', 'change', 'focus', 'blur', 'scroll', 'select', 'submit', 'keydown', 'keypress',\\n\" + \n" + 
        "			\"			'keyup', 'load', 'unload' ],\\n\" + \n" + 
        "			\"		i, iLen, j, jLen = types.length;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		for ( j=0 ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"			if ( typeof all[i]['on'+types[j]] == 'function' ) {\\n\" + \n" + 
        "			\"				elements.push( {\\n\" + \n" + 
        "			\"					\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"					\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"						\\\"type\\\": types[j],\\n\" + \n" + 
        "			\"						\\\"func\\\": all[i]['on'+types[j]].toString(),\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": 'DOM 0 event'\\n\" + \n" + 
        "			\"					} ]\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"/**\\n\" + \n" + 
        "			\" * Visual Event parser for jquery.entwine\\n\" + \n" + 
        "			\" * @author Luke Hudson <github@speak.geek.nz>\\n\" + \n" + 
        "			\" */\\n\" + \n" + 
        "			\"/* global jQuery, VisualEvent */\\n\" + \n" + 
        "			\"\\\"use strict\\\";\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    function entwineParser() {\\n\" + \n" + 
        "			\"        if (!jQuery || !jQuery.fn.entwine) {\\n\" + \n" + 
        "			\"            return [];\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        var out = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"        for(var namespace in jQuery.entwine.namespaces) {\\n\" + \n" + 
        "			\"            if (!jQuery.entwine.namespaces.hasOwnProperty(namespace)) {\\n\" + \n" + 
        "			\"                continue;\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            var store = jQuery.entwine.namespaces[namespace].store;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"            for(var key in store) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                if (!store.hasOwnProperty(key)) {\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                // only look for events, entwine allows other functions too.\\n\" + \n" + 
        "			\"                if (!key.match(/^on/)) {\\n\" + \n" + 
        "			\"                    continue;\\n\" + \n" + 
        "			\"                }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                var eventName = key.replace(/^on/, '');\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                for(var i=0; i < store[key].length; i++) {\\n\" + \n" + 
        "			\"                    var binding = store[key][i];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    if (typeof binding !== 'object' || !binding.selector) {\\n\" + \n" + 
        "			\"                        continue;\\n\" + \n" + 
        "			\"                    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    var nodes = $(binding.selector.selector);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"                    for (var j = 0; j < nodes.length; j++) {\\n\" + \n" + 
        "			\"                        out.push({\\n\" + \n" + 
        "			\"                            node: nodes[j],\\n\" + \n" + 
        "			\"                            listeners: [{\\n\" + \n" + 
        "			\"                                type: eventName,\\n\" + \n" + 
        "			\"                                func: binding.func.toString(),\\n\" + \n" + 
        "			\"                                removed: false,\\n\" + \n" + 
        "			\"                                source: \\\"jquery.entwine\\\"\\n\" + \n" + 
        "			\"                            }]\\n\" + \n" + 
        "			\"                        });\\n\" + \n" + 
        "			\"                    } // end node loop\\n\" + \n" + 
        "			\"                } // end store[key] contents loop\\n\" + \n" + 
        "			\"            } // end store keys loop\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        return out;\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"    VE.parsers.push(entwineParser);\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"(function(window, document, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function eventsFor(node) {\\n\" + \n" + 
        "			\"    var listener = node[Eventi._._key];\\n\" + \n" + 
        "			\"    if (listener) {\\n\" + \n" + 
        "			\"        var record = {\\n\" + \n" + 
        "			\"            node: node,\\n\" + \n" + 
        "			\"            listeners: []\\n\" + \n" + 
        "			\"        },\\n\" + \n" + 
        "			\"        cache = listener.s;\\n\" + \n" + 
        "			\"        for (var type in cache) {\\n\" + \n" + 
        "			\"            var handlers = cache[type];\\n\" + \n" + 
        "			\"            for (var i=0,m=handlers.length; i<m; i++) {\\n\" + \n" + 
        "			\"                var handler = handlers[i];\\n\" + \n" + 
        "			\"                record.listeners.push({\\n\" + \n" + 
        "			\"                    type: handler.text,\\n\" + \n" + 
        "			\"                    func: handler.fn.toString(),\\n\" + \n" + 
        "			\"                    removed: false,\\n\" + \n" + 
        "			\"                    source: 'Eventi'\\n\" + \n" + 
        "			\"                });\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        if (record.listeners.length) {\\n\" + \n" + 
        "			\"            return record;\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Eventi*/\\n\" + \n" + 
        "			\"VisualEvent.parsers.push(function() {\\n\" + \n" + 
        "			\"    var list = [];\\n\" + \n" + 
        "			\"    if (typeof Eventi !== 'undefined') {\\n\" + \n" + 
        "			\"        var key = Eventi._._key,\\n\" + \n" + 
        "			\"            nodes = document.getElementsByTagName('*'),\\n\" + \n" + 
        "			\"            record;\\n\" + \n" + 
        "			\"        if ((record = eventsFor(window))) {\\n\" + \n" + 
        "			\"            list.push(record);\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"        for (var i=0,m=nodes.length ; i<m ; i++ ) {\\n\" + \n" + 
        "			\"            if ((record = eventsFor(nodes[i]))) {\\n\" + \n" + 
        "			\"                list.push(record);\\n\" + \n" + 
        "			\"            }\\n\" + \n" + 
        "			\"        }\\n\" + \n" + 
        "			\"    }\\n\" + \n" + 
        "			\"    return list;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, VisualEvent);\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Ext*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof Ext == \\\"undefined\\\" || Ext.versions.core.version.indexOf('4.0') !== 0 ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var j in Ext.cache ) {\\n\" + \n" + 
        "			\"		var cache = Ext.cache[j];\\n\" + \n" + 
        "			\"		if ( typeof cache.events == 'object' ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			var events = cache.events;\\n\" + \n" + 
        "			\"			if ( !$.isEmptyObject( events ) ) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var listeners = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var event in events ) {\\n\" + \n" + 
        "			\"					// there is an array of handlers for each event\\n\" + \n" + 
        "			\"					if (events[event].length > 0) {\\n\" + \n" + 
        "			\"						for (var k=0; k<events[event].length; ++k) {\\n\" + \n" + 
        "			\"							listeners.push( {\\n\" + \n" + 
        "			\"								\\\"type\\\": event,\\n\" + \n" + 
        "			\"								\\\"func\\\": events[event][k].fn.toString(),\\n\" + \n" + 
        "			\"								\\\"removed\\\": false,\\n\" + \n" + 
        "			\"								\\\"source\\\": 'ExtJS '+Ext.versions.core.version\\n\" + \n" + 
        "			\"							} );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				if (listeners.length > 0) {\\n\" + \n" + 
        "			\"					elements.push( {\\n\" + \n" + 
        "			\"						\\\"node\\\": cache.el.dom,\\n\" + \n" + 
        "			\"						\\\"listeners\\\": listeners\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global glow*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof glow == 'undefined' || typeof glow.events.listenersByObjId == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var listeners = glow.events.listenersByObjId;\\n\" + \n" + 
        "			\"	var globalGlow = \\\"__eventId\\\"+glow.UID;\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen, j, jLen;\\n\" + \n" + 
        "			\"	var eventIndex, eventType, typeEvents;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		/* If the element has a \\\"__eventId\\\"+glow.UID parameter, then it has glow events */\\n\" + \n" + 
        "			\"		if ( typeof all[i][globalGlow] != 'undefined' ) {\\n\" + \n" + 
        "			\"			eventIndex = all[i][globalGlow];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( eventType in listeners[eventIndex] ) {\\n\" + \n" + 
        "			\"				typeEvents = listeners[eventIndex][eventType];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* There is a sub array for each event type in Glow, so we loop over that */\\n\" + \n" + 
        "			\"				for ( j=0, jLen=typeEvents.length ; j<jLen ; j++ ) {\\n\" + \n" + 
        "			\"					elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"						\\\"type\\\": eventType,\\n\" + \n" + 
        "			\"						\\\"func\\\": typeEvents[j][2].toString(),\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": \\\"Glow\\\"\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE) {\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jQuery*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.5, 1.6\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery ||\\n\" + \n" + 
        "			\"		VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ||\\n\" + \n" + 
        "			\"		VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	for ( var j in jQuery.cache ) {\\n\" + \n" + 
        "			\"		jQueryGenericLoop( elements, jQuery.cache[j] );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.4, 1.7\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	if (\\n\" + \n" + 
        "			\"		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.4' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.5' ) ) ||\\n\" + \n" + 
        "			\"		( VE.versionCompare( jQuery.fn.jquery, '>=', '1.7' ) && VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		var elements = [];\\n\" + \n" + 
        "			\"		jQueryGenericLoop( elements, jQuery.cache );\\n\" + \n" + 
        "			\"		return elements;\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return [];\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.8+\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( ! jQuery || VE.versionCompare( jQuery.fn.jquery, '<', '1.8' ) ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get all 'live' (on) events\\n\" + \n" + 
        "			\"	$(document).each(function(index1, element) {\\n\" + \n" + 
        "			\"		jQueryGeneric(elements, element, element);\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	// Get events on nodes\\n\" + \n" + 
        "			\"	$('*').each(function(index1, element) {\\n\" + \n" + 
        "			\"		jQueryGeneric(elements, element, element);\\n\" + \n" + 
        "			\"	});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function jQueryGenericLoop (elements, cache) {\\n\" + \n" + 
        "			\"	$.each( cache, function ( key, val ) {\\n\" + \n" + 
        "			\"		if ( val.handle ) {\\n\" + \n" + 
        "			\"			jQueryGeneric(elements, val, val.handle.elem);\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	} );\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"function jQueryGeneric (elements, eventsObject, node) {\\n\" + \n" + 
        "			\"	if ( typeof eventsObject == 'object' ) {\\n\" + \n" + 
        "			\"		var events;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if (typeof eventsObject.events == 'object') {\\n\" + \n" + 
        "			\"			events = eventsObject.events;\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( ! events ) {\\n\" + \n" + 
        "			\"			events = $._data(eventsObject, 'events');\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		var func;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		for ( var type in events ) {\\n\" + \n" + 
        "			\"			if ( events.hasOwnProperty( type ) ) {\\n\" + \n" + 
        "			\"				/* Ignore live event object - live events are listed as normal events as well */\\n\" + \n" + 
        "			\"				if ( type == 'live' ) {\\n\" + \n" + 
        "			\"					continue;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				var oEvents = events[type];\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				for ( var j in oEvents ) {\\n\" + \n" + 
        "			\"					if ( oEvents.hasOwnProperty( j ) ) {\\n\" + \n" + 
        "			\"						var aNodes = [];\\n\" + \n" + 
        "			\"						var sjQuery = \\\"jQuery \\\" + jQuery.fn.jquery;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						if ( typeof oEvents[j].selector != 'undefined' && oEvents[j].selector !== null ) {\\n\" + \n" + 
        "			\"							aNodes = $(oEvents[j].selector, node);\\n\" + \n" + 
        "			\"							sjQuery += \\\" (live event)\\\";\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"						else {\\n\" + \n" + 
        "			\"							aNodes.push( node );\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"						for ( var k=0, kLen=aNodes.length ; k<kLen ; k++ ) {\\n\" + \n" + 
        "			\"							elements.push( {\\n\" + \n" + 
        "			\"								\\\"node\\\": aNodes[k],\\n\" + \n" + 
        "			\"								\\\"listeners\\\": []\\n\" + \n" + 
        "			\"							} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							if ( typeof oEvents[j].origHandler != 'undefined' ) {\\n\" + \n" + 
        "			\"								func = oEvents[j].origHandler.toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							else if ( typeof oEvents[j].handler != 'undefined' ) {\\n\" + \n" + 
        "			\"								func = oEvents[j].handler.toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"							else {\\n\" + \n" + 
        "			\"								func = oEvents[j].toString();\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"							/* We use jQuery for the Visual Event events... don't really want to display them */\\n\" + \n" + 
        "			\"							if ( oEvents[j] && oEvents[j].namespace != \\\"VisualEvent\\\" && func != \\\"0\\\" )\\n\" + \n" + 
        "			\"							{\\n\" + \n" + 
        "			\"								elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"									\\\"type\\\": type,\\n\" + \n" + 
        "			\"									\\\"func\\\": func,\\n\" + \n" + 
        "			\"									\\\"removed\\\": false,\\n\" + \n" + 
        "			\"									\\\"source\\\": sjQuery\\n\" + \n" + 
        "			\"								} );\\n\" + \n" + 
        "			\"							}\\n\" + \n" + 
        "			\"						}\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"					// Remove elements that didn't have any listeners (i.e. might be a Visual Event node)\\n\" + \n" + 
        "			\"					if ( elements.length && elements[ elements.length-1 ].listeners.length === 0 ) {\\n\" + \n" + 
        "			\"						elements.splice( elements.length-1, 1 );\\n\" + \n" + 
        "			\"					}\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VE){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jQuery*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.3\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( !jQuery || VE.versionCompare( jQuery.fn.jquery, '>', '1.3' ) ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var cache = jQuery.cache;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( var i in cache ) {\\n\" + \n" + 
        "			\"		if ( typeof cache[i].events == 'object' ) {\\n\" + \n" + 
        "			\"			var nEventNode = cache[i].handle.elem;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": nEventNode,\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( var type in cache[i].events )\\n\" + \n" + 
        "			\"			{\\n\" + \n" + 
        "			\"				var oEvent = cache[i].events[type];\\n\" + \n" + 
        "			\"				var iFunctionIndex;\\n\" + \n" + 
        "			\"				for ( iFunctionIndex in oEvent) {\\n\" + \n" + 
        "			\"					break;\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"				/* We use jQuery for the Visual Event events... don't really want to display them */\\n\" + \n" + 
        "			\"				var func = oEvent[ iFunctionIndex ].toString();\\n\" + \n" + 
        "			\"				if ( !func.match(/VisualEvent/) && !func.match(/EventLoader/) )\\n\" + \n" + 
        "			\"				{\\n\" + \n" + 
        "			\"					elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"						\\\"type\\\": type,\\n\" + \n" + 
        "			\"						\\\"func\\\": func,\\n\" + \n" + 
        "			\"						\\\"removed\\\": false,\\n\" + \n" + 
        "			\"						\\\"source\\\": 'jQuery'\\n\" + \n" + 
        "			\"					} );\\n\" + \n" + 
        "			\"				}\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"// jQuery 1.3 live events\\n\" + \n" + 
        "			\"VE.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( !jQuery || jQuery.fn.live != 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data == 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data(document, \\\"events\\\") == 'undefined' ||\\n\" + \n" + 
        "			\"		typeof jQuery.data(document, \\\"events\\\").live == 'undefined' )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var cache = jQuery.cache;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	jQuery.each( jQuery.data(document, \\\"events\\\").live || [], function(i, fn) {\\n\" + \n" + 
        "			\"		var event = fn.type.split('.');\\n\" + \n" + 
        "			\"		event = event[0];\\n\" + \n" + 
        "			\"		var selector = fn.data;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		$(selector).each( function(i) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				node: this,\\n\" + \n" + 
        "			\"				listeners: [],\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			elements[elements.length - 1].listeners.push({\\n\" + \n" + 
        "			\"				type: event,\\n\" + \n" + 
        "			\"				func: 'Unable to obtain function from live() bound event.',\\n\" + \n" + 
        "			\"				removed: false,\\n\" + \n" + 
        "			\"				source: \\\"jQuery 1.3 live\\\"\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global jsBase*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof jsBase == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var a = jsBase.aEventCache;\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=a.length ; i<iLen ; i++ )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		elements.push( {\\n\" + \n" + 
        "			\"			\\\"node\\\": a[i].nElement,\\n\" + \n" + 
        "			\"			\\\"listeners\\\": [ {\\n\" + \n" + 
        "			\"				\\\"type\\\": a[i].type,\\n\" + \n" + 
        "			\"				\\\"func\\\": a[i].fn.toString(),\\n\" + \n" + 
        "			\"				\\\"removed\\\": false,\\n\" + \n" + 
        "			\"				\\\"source\\\": 'jsBase'\\n\" + \n" + 
        "			\"			} ]\\n\" + \n" + 
        "			\"		} );\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global MooTools*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof MooTools == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"	var events, mooEvent;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		events = all[i].retrieve('events', {});\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"		if ( !$.isEmptyObject( events ) ) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( mooEvent in events ) {\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": mooEvent,\\n\" + \n" + 
        "			\"					\\\"func\\\": events[mooEvent].keys.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'MooTools'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global Prototype,Event*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof Prototype == 'undefined' ) {\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	var elements = [];\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen;\\n\" + \n" + 
        "			\"	var eventType;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ ) {\\n\" + \n" + 
        "			\"		if ( typeof all[i]._prototypeEventID != 'undefined' ) {\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": all[i],\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( eventType in Event.cache[ all[i]._prototypeEventID ] ) {\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": eventType,\\n\" + \n" + 
        "			\"					\\\"func\\\": Event.cache[ all[i]._prototypeEventID ][eventType][0].handler.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'Prototype'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"(function(window, document, $, VisualEvent){\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"/*global YAHOO*/\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"VisualEvent.parsers.push( function () {\\n\" + \n" + 
        "			\"	if ( typeof YAHOO == 'undefined' || typeof YAHOO.util == 'undefined' ||\\n\" + \n" + 
        "			\"		 typeof YAHOO.util.Event == 'undefined' )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		return [];\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	/*\\n\" + \n" + 
        "			\"	 * Since the YUI cache is a private variable - we need to use the getListeners function on\\n\" + \n" + 
        "			\"	 * all nodes in the document\\n\" + \n" + 
        "			\"	 */\\n\" + \n" + 
        "			\"	var all = document.getElementsByTagName('*');\\n\" + \n" + 
        "			\"	var i, iLen, j, jLen;\\n\" + \n" + 
        "			\"	var elements = [], events;\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	for ( i=0, iLen=all.length ; i<iLen ; i++ )\\n\" + \n" + 
        "			\"	{\\n\" + \n" + 
        "			\"		events = YAHOO.util.Event.getListeners( all[i] );\\n\" + \n" + 
        "			\"		if ( events !== null && events.length !== 0 )\\n\" + \n" + 
        "			\"		{\\n\" + \n" + 
        "			\"			elements.push( {\\n\" + \n" + 
        "			\"				\\\"node\\\": events[0].scope,\\n\" + \n" + 
        "			\"				\\\"listeners\\\": []\\n\" + \n" + 
        "			\"			} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"			for ( j=0, jLen=events.length ; j<jLen ; j++ )\\n\" + \n" + 
        "			\"			{\\n\" + \n" + 
        "			\"				elements[ elements.length-1 ].listeners.push( {\\n\" + \n" + 
        "			\"					\\\"type\\\": events[j].type,\\n\" + \n" + 
        "			\"					\\\"func\\\": events[j].fn.toString(),\\n\" + \n" + 
        "			\"					\\\"removed\\\": false,\\n\" + \n" + 
        "			\"					\\\"source\\\": 'YUI 2'\\n\" + \n" + 
        "			\"				} );\\n\" + \n" + 
        "			\"			}\\n\" + \n" + 
        "			\"		}\\n\" + \n" + 
        "			\"	}\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"	return elements;\\n\" + \n" + 
        "			\"} );\\n\" + \n" + 
        "			\"\\n\" + \n" + 
        "			\"})(window, document, jQuery, VisualEvent);\\n\";\n" + 
        "			document.body.appendChild( n );\n" + 
        "		}\n" + 
        "	},\n" + 
        "\n" + 
        "\n" + 
        "	/**\n" + 
        "	 * Check if VisualEvent components (specifically VisualEvent itself and the SyntaxHighlighter)\n" + 
        "	 * have been loaded and are available. If not, wait a little while and try again.\n" + 
        "	 *  @returns {undefined}\n" + 
        "	 *  @private\n" + 
        "	 */\n" + 
        "	\"_pollReady\": function ()\n" + 
        "	{\n" + 
        "		var that = this,\n" + 
        "			tmp;\n" + 
        "\n" + 
        "		if ( typeof VisualEvent == 'function' &&\n" + 
        "			 typeof VisualEventSyntaxHighlighter == 'object' )\n" + 
        "		{\n" + 
        "			this._complete();\n" + 
        "		}\n" + 
        "		else {\n" + 
        "			setTimeout( function() {\n" + 
        "				that._pollReady();\n" + 
        "			}, 100 );\n" + 
        "		}\n" + 
        "	},\n" + 
        "\n" + 
        "\n" + 
        "	/**\n" + 
        "	 * Loading is complete, initialise VisualEvent\n" + 
        "	 *  @returns {undefined}\n" + 
        "	 *  @private\n" + 
        "	 */\n" + 
        "	\"_complete\": function ()\n" + 
        "	{\n" + 
        "		var that = this;\n" + 
        "\n" + 
        "		this.s.loadingComplete = true;\n" + 
        "\n" + 
        "		tmp = new VisualEvent(); // jsLint need to assign it to a var\n" + 
        "\n" + 
        "		/* Tidy up our display */\n" + 
        "		document.body.removeChild( this.dom.loading );\n" + 
        "	}\n" + 
        "};\n" + 
        "\n" + 
        "\n" + 
        "VisualEvent_Loader.jQueryPreLoaded = false;\n" + 
        "\n" + 
        "} /* /typeof VisualEvent_Loader */\n" + 
        "\n" + 
        "\n" + 
        "/*\n" + 
        " * If visual event is already defined then we can toggle the display - giving the effect of\n" + 
        " * starting it up and shutting it down when using the loader. Note it's preferable to do this in\n" + 
        " * the bookmarklet code (and is now - but is it for backwards compatability)\n" + 
        " */\n" + 
        "var tmp;\n" + 
        "if ( typeof VisualEvent != 'undefined' )\n" + 
        "{\n" + 
        "	if ( VisualEvent.instance !== null ) {\n" + 
        "		VisualEvent.close();\n" + 
        "	}\n" + 
        "	else {\n" + 
        "		tmp = new VisualEvent();\n" + 
        "	}\n" + 
        "}\n" + 
        "else {\n" + 
        "	tmp = new VisualEvent_Loader();\n" + 
        "}\n" + 
        "\n" + 
        "\n" + 
        "})(window, document);\n";
		document.body.appendChild(n);
	}
})();
