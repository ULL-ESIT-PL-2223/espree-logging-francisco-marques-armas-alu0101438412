[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10290111)
# Práctica Espree logging

## Guía de uso

Para instalar el paquete, ejecute:
```bash
npm install @francisco-marques-armas/constant-folding
```
Para utilizar el ejecutable, escriba el siguiente comando:
```bash
npx funlog <fichero con la función>
```
Para añadir la función addLogging a su programa, escriba:
```javascript
import { addLogging } from "@francisco-marques-armas/constant-folding";
```
## Resumen de lo aprendido

Se cuenta con scripts en el package.json (test y cov) para poner a prueba el funcionamiento del programa.

![imagen](https://user-images.githubusercontent.com/72305337/222534732-cb150d60-2946-4ae6-8036-b7ef4744214a.png)

Los tests se ejecutan al realizar integración continua con Github Actions.

![imagen](https://user-images.githubusercontent.com/72305337/222535495-b91572bb-a3a6-4ddb-bbeb-9072bb2018b4.png)

Se ha creado una cuenta npm

![imagen](https://user-images.githubusercontent.com/72305337/222533528-269baf81-4a3e-4287-a0c2-d32dcf31fdce.png)

El paquete ha sido publicado en npmjs con ámbito francisco-marques-armas.

![imagen](https://user-images.githubusercontent.com/72305337/222475522-199431aa-7a17-4728-9085-d8c133358fd0.png)

Se ha documentado con comentarios JSDoc y en el fichero README.md

![imagen](https://user-images.githubusercontent.com/72305337/222522975-3e96d43e-3ca0-4126-997c-59dc10588162.png)

Además, se realiza un estudio de cobertura y se ha aprendido el significado del versionado.

![imagen](https://user-images.githubusercontent.com/72305337/222534829-f0285cf4-3711-47c1-8da7-8a431928b69d.png)

## Indicar los valores de los argumentos

Se ha modificado el código de `logging-espree.js` para que el log también indique los valores de los argumentos que se pasaron a la función. 
Ejemplo:

```javascript
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```

```javascript
function foo(a, b) {
    console.log(`Entering foo(${ a }, ${ b })`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z })`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
```

## CLI con [Commander.js](https://www.npmjs.com/package/commander)

Se han añadido opciones -h y -V automáticamente con Commander, y una opción que permite especificar el fichero de salida.

![imagen](https://user-images.githubusercontent.com/72305337/222403634-2a7da76a-3a8c-45b2-a043-acd692be9fd5.png)

La opción -h nos permite mostrar una descripción del programa y sus opciones por la terminal.

![imagen](https://user-images.githubusercontent.com/72305337/222406707-46bdf033-6051-448d-8182-507495f36e04.png)

La opción -V muestra la versión del programa. En este caso es la versión 1.0.4, ya que se trata de la primera versión funcional, no han habido parches y se han arreglado cuatro fallos.

![imagen](https://user-images.githubusercontent.com/72305337/222408477-61541e45-18cb-4838-a451-783b152dce5c.png)

La opción -o <nombre-del-fichero> vuelca la salida en el archivo que especifiquemos.

![imagen](https://user-images.githubusercontent.com/72305337/222408895-c48d317a-d6c0-47e0-bb88-33f7f2322def.png)

## Reto 1: Soportar funciones flecha

Se ha añadido una condición a la entrada del traverse de espree para que también analice nodos ArrowFunctionExpression.

![imagen](https://user-images.githubusercontent.com/72305337/222412957-11e7044f-1a18-43ec-aa0d-e5d0ff90067c.png)

## Reto 2: Añadir el número de línea

Se cuenta con una variable lineN, que obtiene la propiedad del número de línea de la localización de comienzo del nodo, y se añade al mensaje que se implementa en el código.

![imagen](https://user-images.githubusercontent.com/72305337/222413312-7ca2b109-8696-4160-b970-7985ac65e67e.png)


## Tests and Covering

Se realiza un estudio de cobertura del programa, con el script cov. Se utiliza c8 en vez de nyc porque el segundo causa problemas.

![imagen](https://user-images.githubusercontent.com/72305337/222534829-f0285cf4-3711-47c1-8da7-8a431928b69d.png)

