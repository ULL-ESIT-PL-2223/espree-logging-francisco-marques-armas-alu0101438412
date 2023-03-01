import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output);
}

function addLogging(code) {
  const ast = espree.parse(code, {ecmaVersion: 12, loc: true });
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression' ||
          node.type === 'ArrowFunctionExpression') {
          addBeforeCode(node);
      }
    }
  })
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name: '<anonymous function>';
  let paramNames = "";
  if (node.params.length) {
    paramNames = "${" + node.params.map(param => param.name).join("}, ${") + "}";
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(`Entering " + name + "(" + paramNames + ") at line " + lineN + "`);";
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 12 }).body;
  node.body.body = beforeNodes.concat(node.body.body);  
}

/*
console.log(addLogging(`
function foo(a, b) {
  var x = 'blah';
  var y = (function () {
    return 3;
  })();
}
foo(1, 'wut', 3);
`));
*/