/**
 * Extract multilingual strings
 * @author zuojiazi@vip.qq.com
 */

import { GettextExtractor, JsExtractors, HtmlExtractors } from 'gettext-extractor';
import { join } from 'path';
import { Gettext } from './helper';

export class Extractor {
    private options: Gettext.ExtractorOptions = {
        attrs: [],
        cwd: null,
        filename: 'messages.pot',
        savePath: 'i18n',
        htmlGlob: '**/*.html',
        tsGlob: '**/*.ts',
    };

    constructor(options?: Gettext.ExtractorOptions) {
        if (options) {
            Object.assign(this.options, options);
        }
    }

    run() {
        const cwd = process.cwd();
        const extractor = new GettextExtractor();
        const attributes = {
            textPlural: 'translate-plural',
            context: 'translate-context',
        };

        if (this.options.cwd) {
            process.chdir(this.options.cwd);
        }

        const htmlextractors = [HtmlExtractors.elementContent('[translate]', { attributes })];

        for (const attr of this.options.attrs) {
            htmlextractors.push(HtmlExtractors.elementAttribute(`[translate-attr="${attr}"]`, attr, { attributes }));
        }

        const tsextractors = [
            JsExtractors.callExpression('[this].I18n.get', {
                arguments: {
                    text: 0,
                    context: 2,
                }
            }),
            JsExtractors.callExpression('[this].I18n.plural', {
                arguments: {
                    text: 1,
                    textPlural: 2,
                    context: 4,
                }
            }),
        ];

        extractor.createHtmlParser(htmlextractors).parseFilesGlob(this.options.htmlGlob);
        extractor.createJsParser(tsextractors).parseFilesGlob(this.options.tsGlob);
        extractor.savePotFile(join(this.options.savePath, this.options.filename));

        if (this.options.cwd) {
            process.chdir(cwd);
        }

        return extractor;
    }
}
