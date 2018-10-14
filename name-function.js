module.exports = function({ types: t }, options) {
    return {
        visitor: {
            FunctionDeclaration(path) {
                const { node } = path;
                const varName = node.id.name;
                node.type = 'FunctionExpression';
                path.replaceWith(
                    t.variableDeclaration('var', [
                        t.variableDeclarator(t.identifier(varName), node)
                    ])
                );
            }
        }
    };
};