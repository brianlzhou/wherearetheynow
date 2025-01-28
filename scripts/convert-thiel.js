"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sync_1 = require("csv-parse/sync");
function extractDateFromLink(link) {
    var match = link.match(/(\d{8})/);
    if (match) {
        var dateStr = match[1];
        var year = dateStr.slice(0, 4);
        var month = dateStr.slice(4, 6);
        var day = dateStr.slice(6, 8);
        return "".concat(year, "-").concat(month, "-").concat(day);
    }
    return "";
}
function cleanProjectArea(type) {
    // Standardize project areas
    var areaMap = {
        'Biotech': 'Biotechnology',
        'Information Technology': 'Software & Technology',
        'Economics & Finance': 'Finance',
        'Career Development': 'Career Tech',
    };
    return areaMap[type] || type;
}
function convertThielData() {
    return __awaiter(this, void 0, void 0, function () {
        var csvData, records, fellows, projectAreas, companiesCount, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.readFile(path_1.default.resolve(process.cwd(), 'app/data/Thiel Fellowship Winners- Complete.csv'), 'utf-8')];
                case 1:
                    csvData = _a.sent();
                    records = (0, sync_1.parse)(csvData, {
                        columns: true,
                        skip_empty_lines: true
                    });
                    fellows = records.map(function (record) { return ({
                        id: parseInt(record.ID),
                        name: record.name,
                        batch: record.batch,
                        date_announced: record.link ? extractDateFromLink(record.link) : "",
                        description: record.description,
                        link: record.link || null,
                        school: null, // These fields aren't in the CSV yet
                        graduation_year: null,
                        project_area: record.type ? cleanProjectArea(record.type) : null,
                        company_name: record.company || null,
                        funding_raised: null,
                        linkedin: null,
                        twitter: null,
                        embedding_description: [] // We'll generate these later
                    }); });
                    // Write the JSON file
                    return [4 /*yield*/, fs_1.promises.writeFile(path_1.default.resolve(process.cwd(), 'app/data/thiel-fellows.json'), JSON.stringify(fellows, null, 2))];
                case 2:
                    // Write the JSON file
                    _a.sent();
                    projectAreas = new Set(fellows.map(function (f) { return f.project_area; }).filter(Boolean));
                    companiesCount = fellows.filter(function (f) { return f.company_name; }).length;
                    console.log("Converted ".concat(fellows.length, " Thiel Fellows to JSON format"));
                    console.log("Project Areas: ".concat(Array.from(projectAreas).join(', ')));
                    console.log("Fellows with companies: ".concat(companiesCount));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error converting data:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
convertThielData();
