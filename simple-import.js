const assert = require('assert');
// const t = require("babel-core").types;
const { addSideEffect, addDefault } = require('@babel/helper-module-imports/lib');

// TODO:
// import dp from 'dianping'; dianping.attr
module.exports = function({ types: t }, options) {
// module.exports = function(api, options) {
    const items2Import = {};
    const itemsImported = {};
    const { libName } = options;

    assert(libName, 'libName should not be empty');

    function importMethod(path) {
        const importeAsName = path.node.name;
        const localName = items2Import[path.node.name];

        // 如果还没有引入对应的 item
        if (!itemsImported[importeAsName]) {
            // 引入 style
            addSideEffect(path, `${libName}/lib/${localName.toLowerCase()}/style`);
            // 引入 js
            const identifier = addDefault(path, `${libName}/lib/${localName.toLowerCase()}/dist`, { nameHint: importeAsName });
            // 记录新的名称
            itemsImported[importeAsName] = identifier.name;
        }
        return itemsImported[importeAsName];
    }

    return {
        visitor: {
            ImportDeclaration(path) {
                const { node } = path;
                const { source, specifiers } = node;
                if (source.value === libName && specifiers.length) {
                    specifiers.forEach(item => {
                        if (t.isImportSpecifier(item)) {
                            const { imported, local } = item;
                            // when ` import { aa as bb } from 'cc' `
                            // items2Import.bb << aa
                            items2Import[imported.name] = local.name;
                        }
                    });
                    path.remove();
                }
            },
            Identifier(path) {
                // 匹配到了 import 的变量
                // 1. 如果未引入，引入文件并记录新的名称
                // 2. 用新的名称替换
                const parentNode = path.parent;
                if (
                    !t.isMemberExpression(parentNode) &&
                    !t.isClassMethod(parentNode) &&
                    !t.isClassProperty(parentNode) &&
                    items2Import[path.node.name]
                ) {
                    path.node.name = importMethod(path);
                }
            }
        }
    };
};
