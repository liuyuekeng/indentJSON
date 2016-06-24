window.indentJSON = (function () {
    function process (item, currentIndent, indentItem) {
        var ret = '';
        var prefix = '';
        var content = '';
        var suffix = '';
        switch (Object.prototype.toString.call(item)) {
            case '[object Object]' :
                prefix += '{\n';
                suffix += currentIndent + '}\n';
                for (key in item) {
                    if (item.hasOwnProperty(key)) {
                        content += (currentIndent + indentItem + key + ': ' + process(item[key], currentIndent + indentItem, indentItem));
                    }
                }           
                break;
            case '[object Array]' :
                prefix += '[\n';
                suffix += currentIndent + ']\n';
                for (var i = 0; i < item.length; i ++) {
                    content += (currentIndent + indentItem + i + ': ' + process(item[i], currentIndent + indentItem, indentItem));
                }
                break;
            case '[object Number]' :
                content += item + '\n';
                break;
            case '[object String]' :
                content += '"' + item + '"\n'
                break;
            case '[object Boolean]' :
                content += (item ? 'true' : 'false') + '\n';
                break;
            case '[object Null]' :
                content += 'null\n';
                break;
            case '[object Undefined]' :
                content += 'undefined\n';
                break;
        }
        ret = prefix + content + suffix;
        return ret;
    }

    function indentJSON (jsonInput, indentLen = 4, initIndentLen = 0) {
        var indentItem = '';
        for (var i = 0; i < indentLen; i ++) {
            indentItem += ' ';
        }
        var initIndent = '';
        for (var i = 0; i < initIndentLen; i ++) {
            initIndent += indentItem;
        }
        return process(jsonInput, initIndent, indentItem);
    }
    return indentJSON;
})();
