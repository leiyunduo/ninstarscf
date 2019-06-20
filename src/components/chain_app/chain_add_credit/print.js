// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------
import jQuery from "jquery"

(function ($) {
  var opt;

  $.fn.jqprint = function (options) {
    opt = $.extend({}, $.fn.jqprint.defaults, options);

    var $element = (this instanceof jQuery) ? this : $(this);

    if (opt.operaSupport) {
      var tab = window.open("", "jqPrint-preview");
      tab.document.open();

      var doc = tab.document;
    }
    else {
      var $iframe = $("<iframe  />");

      if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

      $iframe.appendTo("body");
      var doc = $iframe[0].contentWindow.document;
    }

    if (opt.importCSS) {
      if ($("link[media=print]").length > 0) {
        $("link[media=print]").each(function () {
          doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
        });
      }
      else {
        $("link").each(function () {
          doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
        });
        $("style").each(function (index, item) {
          doc.write("<style type='text/css'>" + $(item).html() + "</style>");
        })
      }
    }
    // if (getExplorer() == "IE") {//判断是否IE浏览器，是，调用去除页眉页脚的方法，否，直接输出即可
    //   pagesetup_null();
    // }
    if (opt.printContainer) { doc.write($element.outer()); }
    else { $element.each(function () { doc.write($(this).html()); }); }

    doc.close();

    (opt.operaSupport ? tab : $iframe[0].contentWindow).focus();
    setTimeout(function () { (opt.operaSupport ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    setTimeout(function () { $iframe[0].remove() }, 2000);
  }

  $.fn.jqprint.defaults = {
    debug: false,
    importCSS: true,
    printContainer: true,
    operaSupport: false
  };

  // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
  jQuery.fn.outer = function () {
    return $($('<div></div>').html(this.clone())).html();
  }
  
  // var beforePrint = function() {
  //   console.log('Functionality to run before printing.');
  // };

  // var afterPrint = function() {
  //   console.log('Functionality to run after printing');
  // };

  // if (window.matchMedia) {
  //   var mediaQueryList = window.matchMedia('print');
  //   mediaQueryList.addListener(function(mql) {
  //     if (mql.matches) {
  //       beforePrint();
  //     } else {
  //       afterPrint();
  //     }
  //   });
  // }

  // window.onbeforeprint = beforePrint;
  // window.onafterprint = afterPrint;
})(jQuery);

// function pagesetup_null() {
//   var hkey_root, hkey_path, hkey_key;
//   hkey_root = "HKEY_CURRENT_USER";
//   hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
//   try {
//     var RegWsh = new ActiveXObject("WScript.Shell");
//     hkey_key = "header";
//     RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
//     hkey_key = "footer";
//     RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
//   } catch (e) { }
// };

// function getExplorer() {
//   var explorer = window.navigator.userAgent;
//   // ie 
//   if (explorer.indexOf("MSIE") >= 0) {
//     return "IE";
//   }
//   // firefox 
//   else if (explorer.indexOf("Firefox") >= 0) {
//     return "Firefox";
//   }
//   // Chrome
//   else if (explorer.indexOf("Chrome") >= 0) {
//     return "Chrome";
//   }
//   // Opera
//   else if (explorer.indexOf("Opera") >= 0) {
//     return "Opera";
//   }
//   // Safari
//   else if (explorer.indexOf("Safari") >= 0) {
//     return "Safari";
//   }
// };

export default jQuery