"use strict";exports.__esModule=!0;var fs=require("fs"),htmp={getAll:function(file,callback){this.validate(file,(function(valid,message){valid?fs.readFile(file,"utf8",(function(err,data){var html=data.substring(data.indexOf("[\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]")+70,data.lastIndexOf("[/\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]")-1),css=data.substring(data.indexOf("[\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]")+67,data.lastIndexOf("[/\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]")-1),js=data.substring(data.indexOf("[\x3c!-----------------  ECMASCRIPT  -----------------!>]")+55,data.lastIndexOf("[/\x3c!-----------------  ECMASCRIPT  -----------------!>/]")-1);callback({html:html,css:css,js:js},!1)})):callback(null,message)}))},getHTML:function(file,callback){this.validate(file,(function(valid,message){valid?fs.readFile(file,"utf8",(function(err,data){var html=data.substring(data.indexOf("[\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]")+70,data.lastIndexOf("[/\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]")-1);callback(html,!1)})):callback(null,message)}))},getCSS:function(file,callback){this.validate(file,(function(valid,message){valid?fs.readFile(file,"utf8",(function(err,data){var css=data.substring(data.indexOf("[\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]")+67,data.lastIndexOf("[/\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]")-1);callback(css,!1)})):callback(null,message)}))},getJS:function(file,callback){this.validate(file,(function(valid,message){valid?fs.readFile(file,"utf8",(function(err,data){var js=data.substring(data.indexOf("[\x3c!-----------------  ECMASCRIPT  -----------------!>]")+55,data.lastIndexOf("[/\x3c!-----------------  ECMASCRIPT  -----------------!>/]")-1);callback(js,!1)})):callback(null,message)}))},validate:function(file,callback){var errs="";fs.readFile(file,"utf8",(function(err,data){err?errs+=err+"\n":(data.includes("!:)![\x3c!----------------- !DOCTYPE!_HYPERTEXT_MARKUP_LANGUAGE_PART_!VERSION1!  -----------------!>]!(:!")||(errs+="HTMP File Missing Required DOCTYPE\n"),data.includes("[\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]")||(errs+="HTMP File Missing Required HTML Opening Tag\n"),data.includes("[/\x3c!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]")||(errs+="HTMP File Missing Required HTML Closing Tag\n"),data.includes("[\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]")||(errs+="HTMP File Missing Required CSS Opening Tag\n"),data.includes("[/\x3c!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]")||(errs+="HTMP File Missing Required CSS Closing Tag\n"),data.includes("[\x3c!-----------------  ECMASCRIPT  -----------------!>]")||(errs+="HTMP File Missing Required JS Opening Tag\n"),data.includes("[/\x3c!-----------------  ECMASCRIPT  -----------------!>/]")||(errs+="HTMP File Missing Required JS Closing Tag\n")),""===errs?callback(!0,"Valid HTMP"):callback(!1,errs+="Invalid HTMP")}))}};