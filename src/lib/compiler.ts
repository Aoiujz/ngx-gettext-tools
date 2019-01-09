/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */

import * as PO from 'pofile';
import * as glob from 'glob';
import * as fs from 'fs';
import { join } from 'path';
import { I18n, Gettext, DEFAULT_CTX } from '../helper';

export class Compiler {
    private options: Gettext.CompileOptions = {
        sourcePath: 'i18n',
        tragetPath: 'i18n',
    };

    constructor(options?: Gettext.CompileOptions) {
        if (options) {
            Object.assign(this.options, options);
        }
    }

    async run() {
        const cwd = this.options.sourcePath;

        if (!fs.existsSync(this.options.tragetPath)) {
            fs.mkdirSync(this.options.tragetPath);
        }

        for(const filename of glob.sync('*.po', { cwd })) {
            await this.loadPoFile(cwd, filename);
        }
    }

    private loadPoFile(filepath: string, filename: string) {
        return new Promise((resolve, reject) => {
            PO.load(join(filepath, filename), (error, po) => {
                if (error) {
                    throw error;
                }

                const data = new Package(po.headers.Language, {});

                for (const item of po.items) {
                    const id = item.msgid;
                    const ctx = item.msgctxt || DEFAULT_CTX;

                    if (item.msgstr[0].length > 0 && !item.flags.fuzzy) {
                        if (!data.contexts[ctx]) {
                            data.contexts[ctx] = {};
                        }

                        data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }

                fs.writeFileSync(join(this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
                resolve();
            });
        });
    }
}

class Package implements I18n.Package {
    constructor(
        public language: string,
        public contexts: I18n.Contexts,
    ) { }
}
