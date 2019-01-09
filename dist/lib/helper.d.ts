export declare namespace I18n {
    interface Package {
        language: string;
        contexts: Contexts;
    }
    interface Contexts {
        [key: string]: Items;
    }
    interface Items {
        [key: string]: string | string[];
    }
}
export declare namespace Gettext {
    interface ExtractorOptions {
        attrs?: string[];
        cwd?: string;
        filename?: string;
        savePath?: string;
        htmlGlob?: string;
        tsGlob?: string;
    }
    interface CompileOptions {
        sourcePath?: string;
        tragetPath?: string;
    }
}
export declare const DEFAULT_CTX = "_@@DEFAULT_CTX@@_";
