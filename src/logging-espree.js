import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

/**
 * @brief Toma un fichero de entrada y opcionalmente
 * un fichero de salida. Produce el input
 * con los logs añadidos, que se imprime por consola
 * si no se ha proporcionado un fichero y se
 * vuelca a un fichero en caso contrario. 
 * @param inputFile fichero de entrada
 * @param outputFile fichero de salida
 */
export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output);
}

/**
 * @brief Añade console.logs a nodos del tipo function declaration,
 * function expression o arrow function expression al entrar en ellos
 * mientras se recorre el árbol usando la función addBeforeCode
 * @param code
 */
export function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 12, loc: true });
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

/**
 * @brief Añade información mediante console.logs a nodos
 * que sean funciones. Incluye el número de línea y argumentos.
 * @param node El nodo que se está visitando 
 */
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