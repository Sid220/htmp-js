import * as fs from "fs";
interface Htmp {
    getAll(file: string, callback): void,
    getHTML(file: string, callback): void,
    getCSS(file: string, callback): void,
    getJS(file: string, callback): void,
    validate(file: string, callback): void,
}
const htmp: Htmp = {
    getAll: function(file: string, callback) {
        this.validate(file, function (valid, message) {
            if(valid) {
                fs.readFile(file, 'utf8', (err, data) => {
                    let html = data.substring(
                        data.indexOf('[<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]') + 70,
                        data.lastIndexOf("[/<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]") - 1
                    );
                    let css = data.substring(
                        data.indexOf('[<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]') + 67,
                        data.lastIndexOf("[/<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]") - 1
                    );
                    let js = data.substring(
                        data.indexOf('[<!-----------------  ECMASCRIPT  -----------------!>]') + 55,
                        data.lastIndexOf("[/<!-----------------  ECMASCRIPT  -----------------!>/]") - 1
                    );
                    callback({"html": html, "css": css, "js": js}, false);
                });
            }
            else {
                callback(null, message)
            }
        })
    },
    getHTML: function(file: string, callback) {
        this.validate(file, function (valid, message) {
            if(valid) {
                fs.readFile(file, 'utf8', (err, data) => {
                    let html = data.substring(
                        data.indexOf('[<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]') + 70,
                        data.lastIndexOf("[/<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]") - 1
                    );
                    callback(html, false);
                });
            }
            else {
                callback(null, message)
            }
        })
    },
    getCSS: function(file: string, callback) {
        this.validate(file, function (valid, message) {
            if(valid) {
                fs.readFile(file, 'utf8', (err, data) => {
                    let css = data.substring(
                        data.indexOf('[<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]') + 67,
                        data.lastIndexOf("[/<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]") - 1
                    );
                    callback(css, false);
                });
            }
            else {
                callback(null, message)
            }
        })
    },
    getJS: function(file:string, callback) {
        this.validate(file, function (valid, message) {
            if(valid) {
                fs.readFile(file, 'utf8', (err, data) => {
                    let js = data.substring(
                        data.indexOf('[<!-----------------  ECMASCRIPT  -----------------!>]') + 55,
                        data.lastIndexOf("[/<!-----------------  ECMASCRIPT  -----------------!>/]") - 1
                    );
                    callback(js, false);
                });
            }
            else {
                callback(null, message)
            }
        })
    },
    validate: function(file: string, callback) {
        let errs = "";
        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                errs += err + "\n";
            }
            else {
                if (!data.includes("!:)![<!----------------- !DOCTYPE!_HYPERTEXT_MARKUP_LANGUAGE_PART_!VERSION1!  -----------------!>]!(:!")) {
                    errs += "HTMP File Missing Required DOCTYPE\n";
                }
                if (!data.includes("[<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>]")) {
                    errs += "HTMP File Missing Required HTML Opening Tag\n"
                }
                if (!data.includes("[/<!-----------------  HYPERTEXT_MARKUP_LANGUAGE  -----------------!>/]")) {
                    errs += "HTMP File Missing Required HTML Closing Tag\n"
                }
                if (!data.includes("[<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>]")) {
                    errs += "HTMP File Missing Required CSS Opening Tag\n"
                }
                if (!data.includes("[/<!-----------------  CASCADING_STYLE_SHEETS  -----------------!>/]")) {
                    errs += "HTMP File Missing Required CSS Closing Tag\n"
                }
                if (!data.includes("[<!-----------------  ECMASCRIPT  -----------------!>]")) {
                    errs += "HTMP File Missing Required JS Opening Tag\n"
                }
                if (!data.includes("[/<!-----------------  ECMASCRIPT  -----------------!>/]")) {
                    errs += "HTMP File Missing Required JS Closing Tag\n"
                }
            }
            if(errs === "") {
                callback(true, "Valid HTMP");
            }
            else {
                errs += "Invalid HTMP"
                callback(false, errs);
            }
        });
    }
}
module.exports = htmp;
