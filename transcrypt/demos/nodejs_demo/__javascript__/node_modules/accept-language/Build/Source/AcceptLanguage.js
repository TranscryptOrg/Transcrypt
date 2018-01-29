"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcp47 = require("bcp47");
var stable = require("stable");
var AcceptLanguage = /** @class */ (function () {
    function AcceptLanguage() {
        this.languageTagsWithValues = {};
        this.defaultLanguageTag = null;
    }
    AcceptLanguage.prototype.languages = function (definedLanguages) {
        var _this = this;
        if (definedLanguages.length < 1) {
            throw new Error('The number of defined languages cannot be smaller than one.');
        }
        this.languageTagsWithValues = {};
        definedLanguages.forEach(function (languageTagString) {
            var languageTag = bcp47.parse(languageTagString);
            if (!languageTag) {
                throw new TypeError('Language tag ' + languageTagString + ' is not bcp47 compliant. For more info https://tools.ietf.org/html/bcp47.');
            }
            var language = languageTag.langtag.language.language;
            if (!language) {
                throw new TypeError('Language tag ' + languageTagString + ' is not supported.');
            }
            var langtag = languageTag.langtag;
            var languageTagWithValues = langtag;
            languageTagWithValues.value = languageTagString;
            var lowerCasedLanguageTagWithValues = {
                language: {
                    language: langtag.language.language.toLowerCase(),
                    extlang: langtag.language.extlang.map(function (e) { return e.toLowerCase(); }),
                },
                region: langtag.region && langtag.region.toLowerCase(),
                script: langtag.script && langtag.script.toLowerCase(),
                variant: langtag.variant.map(function (v) { return v.toLowerCase(); }),
                privateuse: langtag.privateuse.map(function (p) { return p.toLowerCase(); }),
                extension: langtag.extension.map(function (e) {
                    return {
                        extension: e.extension && e.extension.map(function (e) { return e.toLowerCase(); }),
                        singleton: e.singleton.toLowerCase(),
                    };
                }),
                value: languageTagString,
            };
            if (!_this.languageTagsWithValues[language]) {
                _this.languageTagsWithValues[language] = [lowerCasedLanguageTagWithValues];
            }
            else {
                _this.languageTagsWithValues[language].push(lowerCasedLanguageTagWithValues);
            }
        });
        this.defaultLanguageTag = definedLanguages[0];
    };
    AcceptLanguage.prototype.get = function (languagePriorityList) {
        return this.parse(languagePriorityList)[0];
    };
    AcceptLanguage.prototype.create = function () {
        return null;
    };
    AcceptLanguage.prototype.parse = function (languagePriorityList) {
        if (!languagePriorityList) {
            return [this.defaultLanguageTag];
        }
        var parsedAndSortedLanguageTags = parseAndSortLanguageTags(languagePriorityList);
        var result = [];
        for (var _i = 0, parsedAndSortedLanguageTags_1 = parsedAndSortedLanguageTags; _i < parsedAndSortedLanguageTags_1.length; _i++) {
            var languageTag = parsedAndSortedLanguageTags_1[_i];
            var requestedLang = bcp47.parse(languageTag.tag);
            if (!requestedLang) {
                continue;
            }
            var requestedLangTag = requestedLang.langtag;
            if (!this.languageTagsWithValues[requestedLangTag.language.language]) {
                continue;
            }
            middle: for (var _a = 0, _b = this.languageTagsWithValues[requestedLangTag.language.language]; _a < _b.length; _a++) {
                var definedLangTag = _b[_a];
                var unmatchedRequestedSubTag = 0;
                for (var _c = 0, _d = ['privateuse', 'extension', 'variant', 'region', 'script']; _c < _d.length; _c++) {
                    var prop = _d[_c];
                    var definedLanguagePropertValue = definedLangTag[prop];
                    if (!definedLanguagePropertValue) {
                        var requestedLanguagePropertyValue_1 = requestedLangTag[prop];
                        if (requestedLanguagePropertyValue_1) {
                            unmatchedRequestedSubTag++;
                        }
                        switch (prop) {
                            case 'privateuse':
                            case 'variant':
                                for (var i = 0; i < requestedLanguagePropertyValue_1.length; i++) {
                                    if (requestedLanguagePropertyValue_1[i]) {
                                        unmatchedRequestedSubTag++;
                                    }
                                }
                                break;
                            case 'extension':
                                for (var i = 0; i < requestedLanguagePropertyValue_1.length; i++) {
                                    var extension = requestedLanguagePropertyValue_1[i].extension;
                                    for (var ei = 0; ei < extension.length; ei++) {
                                        if (!requestedLanguagePropertyValue_1[i].extension[ei]) {
                                            unmatchedRequestedSubTag++;
                                        }
                                    }
                                }
                                break;
                        }
                        continue;
                    }
                    // Filter out wider requested languages first. If someone requests 'zh'
                    // and my defined language is 'zh-Hant'. I cannot match 'zh-Hant', because
                    // 'zh' is wider than 'zh-Hant'.
                    var requestedLanguagePropertyValue = requestedLangTag[prop];
                    if (!requestedLanguagePropertyValue) {
                        continue middle;
                    }
                    switch (prop) {
                        case 'privateuse':
                        case 'variant':
                            for (var i = 0; i < definedLanguagePropertValue.length; i++) {
                                if (!requestedLanguagePropertyValue[i] || definedLanguagePropertValue[i] !== requestedLanguagePropertyValue[i].toLowerCase()) {
                                    continue middle;
                                }
                            }
                            break;
                        case 'extension':
                            for (var i = 0; i < definedLanguagePropertValue.length; i++) {
                                var extension = definedLanguagePropertValue[i].extension;
                                for (var ei = 0; ei < extension.length; ei++) {
                                    if (!requestedLanguagePropertyValue[i]) {
                                        continue middle;
                                    }
                                    if (!requestedLanguagePropertyValue[i].extension[ei]) {
                                        continue middle;
                                    }
                                    if (extension[ei] !== requestedLanguagePropertyValue[i].extension[ei].toLowerCase()) {
                                        continue middle;
                                    }
                                }
                            }
                            break;
                        default:
                            if (definedLanguagePropertValue !== requestedLanguagePropertyValue.toLowerCase()) {
                                continue middle;
                            }
                    }
                }
                result.push({
                    unmatchedRequestedSubTag: unmatchedRequestedSubTag,
                    quality: languageTag.quality,
                    languageTag: definedLangTag.value
                });
            }
        }
        return result.length > 0 ? stable(result, function (a, b) {
            var quality = b.quality - a.quality;
            if (quality != 0) {
                return quality;
            }
            return a.unmatchedRequestedSubTag - b.unmatchedRequestedSubTag;
        }).map(function (l) { return l.languageTag; }) : [this.defaultLanguageTag];
        function parseAndSortLanguageTags(languagePriorityList) {
            return languagePriorityList.split(',').map(function (weightedLanguageRange) {
                var components = weightedLanguageRange.replace(/\s+/, '').split(';');
                return {
                    tag: components[0],
                    quality: components[1] ? parseFloat(components[1].split('=')[1]) : 1.0
                };
            })
                .filter(function (languageTag) {
                if (!languageTag) {
                    return false;
                }
                if (!languageTag.tag) {
                    return false;
                }
                return languageTag;
            });
        }
    };
    return AcceptLanguage;
}());
function create() {
    var al = new AcceptLanguage();
    al.create = function () {
        return new AcceptLanguage();
    };
    return al;
}
module.exports = create();
module.exports.default = create();
exports.default = create();
//# sourceMappingURL=AcceptLanguage.js.map