// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log=function(){log.history=log.history||[],log.history.push(arguments),this.console&&(arguments.callee=arguments.callee.caller,console.log(Array.prototype.slice.call(arguments)))},function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;d=c.pop();)a[d]=a[d]||b}(window.console=window.console||{}),function(a,b){var c;a.rails=c={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(b){var c=a('meta[name="csrf-token"]').attr("content");c&&b.setRequestHeader("X-CSRF-Token",c)},fire:function(b,c,d){var e=a.Event(c);return b.trigger(e,d),e.result!==!1},confirm:function(a){return confirm(a)},ajax:function(b){return a.ajax(b)},handleRemote:function(d){var e,f,g,h=d.data("cross-domain")||null,i=d.data("type")||a.ajaxSettings&&a.ajaxSettings.dataType,j;if(c.fire(d,"ajax:before")){if(d.is("form")){e=d.attr("method"),f=d.attr("action"),g=d.serializeArray();var k=d.data("ujs:submit-button");k&&(g.push(k),d.data("ujs:submit-button",null))}else d.is(c.inputChangeSelector)?(e=d.data("method"),f=d.data("url"),g=d.serialize(),d.data("params")&&(g=g+"&"+d.data("params"))):(e=d.data("method"),f=d.attr("href"),g=d.data("params")||null);return j={type:e||"GET",data:g,dataType:i,crossDomain:h,beforeSend:function(a,e){return e.dataType===b&&a.setRequestHeader("accept","*/*;q=0.5, "+e.accepts.script),c.fire(d,"ajax:beforeSend",[a,e])},success:function(a,b,c){d.trigger("ajax:success",[a,b,c])},complete:function(a,b){d.trigger("ajax:complete",[a,b])},error:function(a,b,c){d.trigger("ajax:error",[a,b,c])}},f&&(j.url=f),c.ajax(j)}return!1},handleMethod:function(c){var d=c.attr("href"),e=c.data("method"),f=c.attr("target"),g=a("meta[name=csrf-token]").attr("content"),h=a("meta[name=csrf-param]").attr("content"),i=a('<form method="post" action="'+d+'"></form>'),j='<input name="_method" value="'+e+'" type="hidden" />';h!==b&&g!==b&&(j+='<input name="'+h+'" value="'+g+'" type="hidden" />'),f&&i.attr("target",f),i.hide().append(j).appendTo("body"),i.submit()},disableFormElements:function(b){b.find(c.disableSelector).each(function(){var b=a(this),c=b.is("button")?"html":"val";b.data("ujs:enable-with",b[c]()),b[c](b.data("disable-with")),b.prop("disabled",!0)})},enableFormElements:function(b){b.find(c.enableSelector).each(function(){var b=a(this),c=b.is("button")?"html":"val";b.data("ujs:enable-with")&&b[c](b.data("ujs:enable-with")),b.prop("disabled",!1)})},allowAction:function(a){var b=a.data("confirm"),d=!1,e;return b?(c.fire(a,"confirm")&&(d=c.confirm(b),e=c.fire(a,"confirm:complete",[d])),d&&e):!0},blankInputs:function(b,c,d){var e=a(),f,g=c||"input,textarea";return b.find(g).each(function(){f=a(this);if(d?f.val():!f.val())e=e.add(f)}),e.length?e:!1},nonBlankInputs:function(a,b){return c.blankInputs(a,b,!0)},stopEverything:function(b){return a(b.target).trigger("ujs:everythingStopped"),b.stopImmediatePropagation(),!1},callFormSubmitBindings:function(c,d){var e=c.data("events"),f=!0;return e!==b&&e.submit!==b&&a.each(e.submit,function(a,b){if(typeof b.handler=="function")return f=b.handler(d)}),f},disableElement:function(a){a.data("ujs:enable-with",a.html()),a.html(a.data("disable-with")),a.bind("click.railsDisable",function(a){return c.stopEverything(a)})},enableElement:function(a){a.data("ujs:enable-with")!==b&&(a.html(a.data("ujs:enable-with")),a.data("ujs:enable-with",!1)),a.unbind("click.railsDisable")}},a.ajaxPrefilter(function(a,b,d){a.crossDomain||c.CSRFProtection(d)}),a(document).delegate(c.linkDisableSelector,"ajax:complete",function(){c.enableElement(a(this))}),a(document).delegate(c.linkClickSelector,"click.rails",function(d){var e=a(this),f=e.data("method"),g=e.data("params");if(!c.allowAction(e))return c.stopEverything(d);e.is(c.linkDisableSelector)&&c.disableElement(e);if(e.data("remote")!==b)return(d.metaKey||d.ctrlKey)&&(!f||f==="GET")&&!g?!0:(c.handleRemote(e)===!1&&c.enableElement(e),!1);if(e.data("method"))return c.handleMethod(e),!1}),a(document).delegate(c.inputChangeSelector,"change.rails",function(b){var d=a(this);return c.allowAction(d)?(c.handleRemote(d),!1):c.stopEverything(b)}),a(document).delegate(c.formSubmitSelector,"submit.rails",function(d){var e=a(this),f=e.data("remote")!==b,g=c.blankInputs(e,c.requiredInputSelector),h=c.nonBlankInputs(e,c.fileInputSelector);if(!c.allowAction(e))return c.stopEverything(d);if(g&&e.attr("novalidate")==b&&c.fire(e,"ajax:aborted:required",[g]))return c.stopEverything(d);if(f)return h?c.fire(e,"ajax:aborted:file",[h]):!a.support.submitBubbles&&a().jquery<"1.7"&&c.callFormSubmitBindings(e,d)===!1?c.stopEverything(d):(c.handleRemote(e),!1);setTimeout(function(){c.disableFormElements(e)},13)}),a(document).delegate(c.formInputClickSelector,"click.rails",function(b){var d=a(this);if(!c.allowAction(d))return c.stopEverything(b);var e=d.attr("name"),f=e?{name:e,value:d.val()}:null;d.closest("form").data("ujs:submit-button",f)}),a(document).delegate(c.formSubmitSelector,"ajax:beforeSend.rails",function(b){this==b.target&&c.disableFormElements(a(this))}),a(document).delegate(c.formSubmitSelector,"ajax:complete.rails",function(b){this==b.target&&c.enableFormElements(a(this))})}(jQuery),function(){var a;$(function(){return $(".default_text").focus(function(){return $(this).hasClass("default_text")&&$(this).val(""),$(this).removeClass("default_text")}),$(".default_text").blur(function(){if(!$(this).val())return $(this).addClass("default_text").val($(this).data("default-text"))}),$(".default_text").trigger("blur"),$(".social").hover(function(){return a($(this),"in")},function(){return a($(this),"out")}),$(".social").fadeTo(400,.33)}),a=function(a,b){var c;return b==="in"?c=1:c=.33,a.clearQueue(),a.fadeTo(400,c)}}.call(this)