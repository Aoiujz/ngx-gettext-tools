"use strict";
/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PO = require("pofile");
var glob = require("glob");
var fs = require("fs");
var path_1 = require("path");
var helper_1 = require("./helper");
var Compiler = /** @class */ (function () {
    function Compiler(options) {
        this.options = {
            sourcePath: 'i18n',
            tragetPath: 'i18n',
        };
        if (options) {
            Object.assign(this.options, options);
        }
    }
    Compiler.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cwd, _i, _a, filename;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cwd = this.options.sourcePath;
                        if (!fs.existsSync(this.options.tragetPath)) {
                            fs.mkdirSync(this.options.tragetPath);
                        }
                        _i = 0, _a = glob.sync('*.po', { cwd: cwd });
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        filename = _a[_i];
                        return [4 /*yield*/, this.loadPoFile(cwd, filename)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Compiler.prototype.loadPoFile = function (filepath, filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            PO.load(path_1.join(filepath, filename), function (error, po) {
                if (error) {
                    throw error;
                }
                var data = new Package(po.headers.Language, {});
                for (var _i = 0, _a = po.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var id = item.msgid;
                    var ctx = item.msgctxt || helper_1.DEFAULT_CTX;
                    if (item.msgstr[0].length > 0 && !item.flags.fuzzy) {
                        if (!data.contexts[ctx]) {
                            data.contexts[ctx] = {};
                        }
                        data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }
                fs.writeFileSync(path_1.join(_this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
                resolve();
            });
        });
    };
    return Compiler;
}());
exports.Compiler = Compiler;
var Package = /** @class */ (function () {
    function Package(language, contexts) {
        this.language = language;
        this.contexts = contexts;
    }
    return Package;
}());
