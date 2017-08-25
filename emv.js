var emvTagsConfig = require('./emv.tags');
var emvTagsMap = emvTagsConfig.map;
var emvLongTags = emvTagsConfig.longTags;
var emvDolNumericTypes = emvTagsConfig.dolNumericTypes;

function emvEncodeMapTags() {
    emvTagsConfig.map.encode = Object.keys(emvTagsConfig.map.decode)
        .map((e) => {
            let o = {};
            o[emvTagsConfig.map.decode[e]] = e;
            return o;
        })
        .reduce((accum, cur) => Object.assign(accum, cur), {});
}

function translateTagEncode(tag) {
    return emvTagsMap.encode[tag] || tag;
}

function translateTagDecode(tag) {
    return emvTagsMap.decode[tag.toUpperCase()] || tag;
}

function getNumVal(val, len, dolLenDiff, compressedNumeric) {
    if (dolLenDiff < 0) { // left truncated
        return val.slice(len * -2);
    } else {
        if (!compressedNumeric) {
            return ((new Array(len)).fill('00').join('') + val).slice(len * -2);
        }
        return (val + (new Array(dolLenDiff)).fill('FF').join(''));
    }
};
function getNonNumVal(val, len, dolLenDiff) {
    if (dolLenDiff < 0) { // right truncated
        return val.slice(len * 2);
    } else {
        return (val + (new Array(len)).fill('00').join('')).slice(len * 2);
    }
};

/**
 * @param {Object} tagObj decoded emv tag
 * @param {string} tagObj.val decoded emv tag value
 * @param {string} tagObj.len decoded emv tag value bytes length (/2)
 */
function getValueHexLength(tagObj) {
    let len;
    if (!tagObj || (!tagObj.len && !tagObj.val)) {
        len = 0;
    } else {
        if (!tagObj.val || !tagObj.val.length) {
            len = tagObj.len || 0;
        } else {
            len = (tagObj.val.length / 2);
        }
    }
    len = len.toString(16).toUpperCase();

    return (len.length % 2) ? `0${len}` : len;
}

/**
 * @param {string} emvString emv input string
 * @param {Object} result object to store results in
 * @param {number=} dolIdx value position in data object list
 */
function tagsDecode(emvString, result, dolIdx) {
    let tag;
    let len;
    let val;
    let isDol = false;
    if (emvLongTags.includes(emvString.substr(0, 2).toLowerCase())) { // 2 bytes tag
        tag = emvString.substr(0, 4);
        emvString = emvString.substr(4);
    } else {
        tag = emvString.substr(0, 2);
        emvString = emvString.substr(2);
    }
    let tagTranslated = translateTagDecode(tag);
    result[tagTranslated] = {tag};
    if (tagTranslated.includes('DOL')) {
        isDol = true;
    }
    if (dolIdx) {
        result[tagTranslated].idx = dolIdx - 1;
    }
    let lenStr = emvString.substr(0, 2);
    len = (lenStr === '') ? 0 : parseInt(emvString.substr(0, 2), 16);
    emvString = emvString.substr(2);
    if (len >= 128) { // size is big
        let byteNumSize = 0;
        let cur = 128;
        while (cur >= 1) { // calculate big size
            cur = cur >> 1;
            if ((len & cur) === cur) {
                byteNumSize = byteNumSize | cur;
            }
        }
        len = parseInt(emvString.substr(0, byteNumSize * 2), 16);
        emvString = emvString.substr(byteNumSize * 2);
    }
    if (!dolIdx && len > emvString.length / 2) {
        throw new Error('Data integrity error');
    }
    result[tagTranslated].len = len;
    if (!len) {
        len = 0;
        val = '';
    } else {
        if (dolIdx) {
            val = '';
        } else {
            val = emvString.substr(0, len * 2);
            emvString = emvString.substr(len * 2);
        }
    }
    let constructedTagByte = (new Buffer(tag, 'hex')).slice(0, 1)[0];
    if ((constructedTagByte & 32) === 32) {
        result[tagTranslated].val = (isDol ? tagsDecode(val, {}, 1) : tagsDecode(val, {}, (dolIdx ? dolIdx + 1 : dolIdx)));
    } else {
        result[tagTranslated].val = (isDol ? tagsDecode(val, {}, 1) : val);
    }
    if (emvString.length) {
        return tagsDecode(emvString, result, (dolIdx ? dolIdx + 1 : dolIdx));
    }
    return result;
};

/**
 * EMV 4.3 Book 3                              5 Data Elements and Files
 * Application Specification                   5.4 Rules for Using a Data Object List (DOL)
 * @param {Object} emvTags decoded emv tags map
 */
function dolDecode(emvTags) {
    let data = Object.assign({}, emvTags);
    let mainTags = Object.keys(data);
    let dolTags = mainTags.filter((t) => (t.includes('DOL')));
    if (dolTags.length) {
        data = dolTags
            .map((t) => ({tag: t, data: data[t].val, internalTags: Object.keys(data[t].val)}))
            .reduce((allTags, dol) => {
                allTags[dol.tag].val = dol.internalTags.reduce((dolTags, dolInt) => {
                    let extTag = allTags[dolInt];
                    let dolTag = dolTags[dolInt];
                    if (!extTag) { // no tag found in root tags list
                        dolTags[dolInt].val = (new Array(dolTags[dolInt].len)).fill('00').join('');
                    } else if (extTag.len === dolTag.len) {
                        dolTags[dolInt].val = extTag.val;
                    } else {
                        let extNumType = emvDolNumericTypes[dolTag.tag];
                        if (extNumType === 'n') { // non numeric value
                            dolTags[dolInt].val = getNonNumVal(extTag.val, dolTag.len, dolTag.len - extTag.len, false);
                        } else if (extNumType === 'nc') { // non numeric value
                            dolTags[dolInt].val = getNonNumVal(extTag.val, dolTag.len, dolTag.len - extTag.len, true);
                        } else { // numeric value
                            dolTags[dolInt].val = getNumVal(extTag.val, dolTag.len, dolTag.len - extTag.len);
                        }
                    }
                    return dolTags;
                }, dol.data);
                return allTags;
            }, data);
    }
    return data;
};

/**
 * @param {Object} emvTags decoded emv tags map
 */
function tagsEncode(emvTags) {
    let data = Object.assign({}, emvTags);
    let dolOrder = ['CDOL1', 'CDOL2', 'TDOL', 'PDOL', 'DDOL'];
    let result = '';
    // transform data in dols
    data = Object.keys(data)
        .filter((k) => (k.includes('DOL')))
        .map((k) => {
            let dol = data[k];
            return {
                tag: dol.tag,
                data: Object.keys(dol.val)
                    .sort((a, b) => {
                        return dol.val[a].idx > dol.val[b].idx;
                    })
                    .map((k) => {
                        let tagObj = dol.val[k];
                        let tagTranslated = translateTagEncode(k);
                        let tagLength = getValueHexLength(tagObj);

                        return [tagTranslated, tagLength].join('');
                    })
            };
        })
        .reduce((data, dol) => {
            data[dol.tag] = dol.data.join('');
            return data;
        }, data);

    let allTags = Object.keys(data);
    // make sure that dols are constructed in order
    let allDols = dolOrder
        .map((dol) => (allTags.includes(dol) ? dol : 0))
        .filter((e) => e);
    // append dols to result
    result = allDols
        .reduce((r, dol) => {
            let tagTranslated = translateTagEncode(dol);
            let d = Object.assign({}, data[dol], {val: data[tagTranslated]});
            let tagLength = getValueHexLength(d);

            return `${r}${tagTranslated}${tagLength}${d.val}`;
        }, '');
    // cleanup dols
    data = allDols
        .reduce((r, dol) => {
            let tagTranslated = translateTagEncode(dol);
            delete r[dol];
            delete r[tagTranslated];
            return r;
        }, data);
    // append all fields left to result
    return result + Object.keys(data).map((e) => {
        let tagTranslated = translateTagEncode(e);
        let tagObj = data[e];
        let tagLength = getValueHexLength(tagObj);
        let tagValue = tagObj.val;

        let constructedTagByte = (new Buffer(tagTranslated, 'hex')).slice(0, 1)[0];
        if ((constructedTagByte & 32) === 32) {
            tagValue = tagsEncode(tagObj.val);
        }

        return `${tagTranslated}${tagLength}${tagValue}`;
    }).join('');
}

module.exports = (function emv() {
    if (!emvTagsConfig.map.encode) {
        emvEncodeMapTags();
    }

    return {
        tagsDecode,
        dolDecode,
        tagsEncode
    };
})();
