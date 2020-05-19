"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const NestedError = require("nested-error-stacks");
const transform_node_1 = require("./transform-node");
function transformer(program, options) {
    if (options && options.verbose) {
        console.log(`typescript-is: transforming program with ${program.getSourceFiles().length} source files; using TypeScript ${ts.version}.`);
    }
    const visitorContext = {
        program,
        checker: program.getTypeChecker(),
        compilerOptions: program.getCompilerOptions(),
        options: {
            shortCircuit: !!(options && options.shortCircuit),
            ignoreClasses: !!(options && options.ignoreClasses),
            ignoreMethods: !!(options && options.ignoreMethods),
            ignoreFunctions: !!(options && options.ignoreFunctions),
            disallowSuperfluousObjectProperties: !!(options && options.disallowSuperfluousObjectProperties)
        },
        typeMapperStack: [],
        previousTypeReference: null
    };
    return (context) => (file) => transformNodeAndChildren(file, program, context, visitorContext);
}
exports.default = transformer;
function transformNodeAndChildren(node, program, context, visitorContext) {
    debugger
    let transformedNode;
    try {
        transformedNode = transform_node_1.transformNode(node, visitorContext);
    }
    catch (error) {
        const sourceFile = node.getSourceFile();
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.pos);
        throw new NestedError(`Failed to transform node at: ${sourceFile.fileName}:${line + 1}:${character + 1}`, error);
    }
    return ts.visitEachChild(transformedNode, (childNode) => transformNodeAndChildren(childNode, program, context, visitorContext), context);
}
//# sourceMappingURL=transformer.js.map