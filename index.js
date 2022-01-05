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
var _this = this;
var cheerio = require('cheerio');
var axios = require('axios')["default"];
var express = require('express');
var fs = require('fs');
var app = express();
;
var urls = [
    'https://www.reddit.com/r/Bitcoin/',
    'https://www.reddit.com/r/cryptocurrency/',
    'https://www.reddit.com/r/btc/',
    "https://www.reddit.com/r/Bitcoin/",
    "https://www.reddit.com/r/cryptocurrency/",
    "https://www.reddit.com/r/btc/",
    "https://www.reddit.com/r/CryptoMarkets/",
    "https://www.reddit.com/r/BitcoinBeginners/",
    "https://www.reddit.com/r/CryptoCurrencies/",
    "https://www.reddit.com/r/altcoin/",
    "https://www.reddit.com/r/icocrypto/",
    "https://www.reddit.com/r/CryptoCurrencyTrading/",
    "https://www.reddit.com/r/Crypto_General/",
    "https://www.reddit.com/r/ico/",
    "https://www.reddit.com/r/blockchain",
];
var scrapper = function (item) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var response, html, $, online, members, timestamp, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get(item)];
                case 1:
                    response = _a.sent();
                    html = response.data;
                    $ = cheerio.load(html);
                    online = $('p:contains("Online")').siblings('div').text();
                    members = $('p:contains("Members")').siblings('div').text();
                    timestamp = Date.now();
                    console.log('before resolve');
                    data = { online: online, members: members, timestamp: timestamp };
                    resolve(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log('before reject');
                    reject(error_1);
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        try {
            urls.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, scrapper(item)];
                        case 1:
                            data = _a.sent();
                            fs.appendFile('data.json', "".concat(JSON.stringify(data), " \n"), function (err) {
                                if (err)
                                    return console.log(err);
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); })();
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8;');
    var readable = fs.createReadStream('data.json');
    readable.on('open', function () {
        readable.pipe(res);
    });
    readable.on('error', function () {
        res.end('[]');
    });
});
app.listen(8000, function () { console.log('app running at 8000 port'); });
