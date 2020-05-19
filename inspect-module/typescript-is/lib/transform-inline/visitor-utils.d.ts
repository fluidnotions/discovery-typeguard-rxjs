import * as ts from 'typescript';
import { VisitorContext } from './visitor-context';
import { Reason } from '../../index';
export declare const objectIdentifier: ts.Identifier;
export declare const pathIdentifier: ts.Identifier;
export declare function checkIsClass(type: ts.ObjectType, visitorContext: VisitorContext): boolean;
export declare function checkIsDateClass(type: ts.ObjectType): true | undefined;
export declare function setFunctionIfNotExists(name: string, visitorContext: VisitorContext, factory: () => ts.FunctionDeclaration): string;
export declare function getPropertyInfo(symbol: ts.Symbol, visitorContext: VisitorContext): {
    name: string;
    type: ts.Type | undefined;
    isMethod: boolean;
    isSymbol: boolean;
    optional: boolean;
};
export declare function getTypeReferenceMapping(type: ts.TypeReference, visitorContext: VisitorContext): Map<ts.Type, ts.Type>;
export declare function getResolvedTypeParameter(type: ts.Type, visitorContext: VisitorContext): ts.Type | undefined;
export declare function getStringFunction(visitorContext: VisitorContext): string;
export declare function getBooleanFunction(visitorContext: VisitorContext): string;
export declare function getBigIntFunction(visitorContext: VisitorContext): string;
export declare function getNumberFunction(visitorContext: VisitorContext): string;
export declare function getUndefinedFunction(visitorContext: VisitorContext): string;
export declare function getNullFunction(visitorContext: VisitorContext): string;
export declare function getNeverFunction(visitorContext: VisitorContext): string;
export declare function getUnknownFunction(visitorContext: VisitorContext): string;
export declare function getAnyFunction(visitorContext: VisitorContext): string;
export declare function getIgnoredTypeFunction(visitorContext: VisitorContext): string;
export declare function createBinaries(expressions: ts.Expression[], operator: ts.BinaryOperator, baseExpression?: ts.Expression): ts.Expression;
export declare function createAcceptingFunction(functionName: string): ts.FunctionDeclaration;
export declare function createConjunctionFunction(functionNames: string[], functionName: string, extraStatements?: ts.Statement[]): ts.FunctionDeclaration;
export declare function createDisjunctionFunction(functionNames: string[], functionName: string): ts.FunctionDeclaration;
export declare function createStrictNullCheckStatement(identifier: ts.Identifier, visitorContext: VisitorContext): ts.EmptyStatement | ts.IfStatement;
export declare function createAssertionFunction(failureCondition: ts.Expression, expected: Reason, functionName: string, ...otherStatements: ts.Statement[]): ts.FunctionDeclaration;
export declare function createSuperfluousPropertiesLoop(propertyNames: string[]): ts.ForOfStatement;
export declare function isBigIntType(type: ts.Type): number | false;
export declare function createErrorObject(reason: Reason): ts.Expression;