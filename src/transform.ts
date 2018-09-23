import * as ts from "typescript";

export interface TransformerOptions {
  env: { [key: string]: string; }
}

export const getTransformer = (options: TransformerOptions) => {
  function visitor(ctx: ts.TransformationContext, _) {
    const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
      if (ts.isPropertyAccessExpression(node) && node.expression.getFullText() === "process.env") {
        const key = node.name.getFullText();
        if (options.env.hasOwnProperty(key)) {
          return ts.createLiteral(options.env[key]);
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    };
    return visitor;
  }
  return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (
    sf: ts.SourceFile
  ) => ts.visitNode(sf, visitor(ctx, sf));
};
