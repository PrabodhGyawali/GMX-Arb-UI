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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs_1 = require("fs");
function mapToTypeScriptType(type, nullable) {
    var tsType;
    switch (type) {
        case 'TEXT':
        case 'VARCHAR':
        case 'CHAR':
            tsType = 'string';
            break;
        case 'INTEGER':
        case 'REAL':
        case 'NUMERIC':
            tsType = 'number';
            break;
        case 'BOOLEAN':
            tsType = 'boolean';
            break;
        case 'BLOB':
            tsType = 'Buffer';
            break;
        case 'DATE':
        case 'DATETIME':
        case 'TIMESTAMP':
            tsType = 'Date';
            break;
        default:
            tsType = 'any';
    }
    return nullable ? "".concat(tsType, " | null") : tsType;
}
// Get the trades Schema
function fetchSchema() {
    return __awaiter(this, void 0, void 0, function () {
        var response, schemaString, schemaFields, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://127.0.0.1:5000/trades/schema')];
                case 1:
                    response = _a.sent();
                    schemaString = response.data[0][0];
                    schemaFields = parseSchema(schemaString);
                    console.log(schemaFields);
                    return [2 /*return*/, schemaFields];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching schema: ', error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Takes a SQL Schema and converts each field line definitions into a String Array
 * Check whether the String Array includes 'NOT NULL' and replace with '!NULL'
 * First Two elements of String Array is the fieldName and fieldType
 *
 * @param schemaString
 * @returns SchemaField[]
 */
function parseSchema(schemaString) {
    var schemaFields = [];
    var field_lines = schemaString.split('\n').slice(1, -1)
        .map(function (line) { return line.trim()
        .slice(0, -1)
        .replace("NOT NULL", "!NULL")
        .split(' '); }); // get rid of comma at end
    field_lines.forEach(function (fieldDefinition) {
        var schemaField = {
            name: fieldDefinition[0],
            type: fieldDefinition[1],
            nullable: !fieldDefinition.includes('!NULL'),
        };
        schemaFields.push(schemaField);
    });
    return schemaFields;
}
function generateInterface(schema) {
    var fields = schema.map(function (field) {
        var tsType = mapToTypeScriptType(field.type, field.nullable);
        return "  ".concat(field.name, ": ").concat(tsType, ";");
    }).join('\n');
    return "export default interface PositionSchemaType {\n".concat(fields, "\n}");
}
function generateSchemaInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var schema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchSchema()];
                case 1:
                    schema = _a.sent();
                    return [2 /*return*/, generateInterface(schema)];
            }
        });
    });
}
/**
 * Write the output of `generateScehemaInterface()` to a ts file.
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var interfaceDefinition, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateSchemaInterface()];
                case 1:
                    interfaceDefinition = _a.sent();
                    console.log(interfaceDefinition);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs_1.promises.writeFile("./TradeMonitorInterface.ts", interfaceDefinition)];
                case 3:
                    _a.sent();
                    console.log("Schema Interface written in build/");
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error writing interface to file: ");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
