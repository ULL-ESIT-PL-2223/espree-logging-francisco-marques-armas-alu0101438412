[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10290111)
# Práctica Espree logging

## Resumen de lo aprendido

Se han añadido opciones en la línea de comandos y mensajes en la entrada de funciones, anotando también el número de línea. Se cuenta con scripts en el package.json (test y cov) para poner a prueba el funcionamiento del programa y estos se ejecutan al realizar integración continua con Github Actions. El paquete ha sido publicado en npmjs con ámbito francisco-marques-armas. Se ha documentado y se ha probado que está accesible. Además, se realiza un estudio de cobertura y se ha aprendido el significado del versionado.
![imagen](https://user-images.githubusercontent.com/72305337/222406507-bb862755-8872-4d09-85bc-f19f259cc069.png)

...

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

La opción -o <nombre-del-fichero> vuelva la salida en el archivo que especifiquemos.

![imagen](https://user-images.githubusercontent.com/72305337/222408895-c48d317a-d6c0-47e0-bb88-33f7f2322def.png)


## Reto 1: Soportar funciones flecha

...

## Reto 2: Añadir el número de línea

...

## Tests and Covering

...
