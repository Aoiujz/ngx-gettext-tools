/**
 * Extract multilingual strings
 * @author zuojiazi@vip.qq.com
 */
import { GettextExtractor } from 'gettext-extractor';
import { Gettext } from '../helper';
export declare class Extractor {
    private options;
    constructor(options?: Gettext.ExtractorOptions);
    run(): GettextExtractor;
}
