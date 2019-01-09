"use strict";
/**
 * Extract multilingual strings
 * @author zuojiazi@vip.qq.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var gettext_extractor_1 = require("gettext-extractor");
var path_1 = require("path");
var Extractor = /** @class */ (function () {
    function Extractor(options) {
        this.options = {
            attrs: [],
            cwd: null,
            filename: 'messages.pot',
            savePath: 'i18n',
            htmlGlob: '**/*.html',
            tsGlob: '**/*.ts',
        };
        if (options) {
            Object.assign(this.options, options);
        }
    }
    Extractor.prototype.run = function () {
        var cwd = process.cwd();
        var extractor = new gettext_extractor_1.GettextExtractor();
        var attributes = {
            textPlural: 'translate-plural',
            context: 'translate-context',
        };
        if (this.options.cwd) {
            process.chdir(this.options.cwd);
        }
        var htmlextractors = [gettext_extractor_1.HtmlExtractors.elementContent('[translate]', { attributes: attributes })];
        for (var _i = 0, _a = this.options.attrs; _i < _a.length; _i++) {
            var attr = _a[_i];
            htmlextractors.push(gettext_extractor_1.HtmlExtractors.elementAttribute("[translate-attr=\"" + attr + "\"]", attr, { attributes: attributes }));
        }
        var tsextractors = [
            gettext_extractor_1.JsExtractors.callExpression('[this].I18n.get', {
                arguments: {
                    text: 0,
                    context: 2,
                }
            }),
            gettext_extractor_1.JsExtractors.callExpression('[this].I18n.plural', {
                arguments: {
                    text: 1,
                    textPlural: 2,
                    context: 4,
                }
            }),
        ];
        extractor.createHtmlParser(htmlextractors).parseFilesGlob(this.options.htmlGlob);
        extractor.createJsParser(tsextractors).parseFilesGlob(this.options.tsGlob);
        extractor.savePotFile(path_1.join(this.options.savePath, this.options.filename));
        if (this.options.cwd) {
            process.chdir(cwd);
        }
        return extractor;
    };
    return Extractor;
}());
exports.Extractor = Extractor;
