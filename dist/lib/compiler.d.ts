/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */
import { Gettext } from './helper';
export declare class Compiler {
    private options;
    constructor(options?: Gettext.CompileOptions);
    run(): Promise<void>;
    private loadPoFile;
}
