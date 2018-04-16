# Calculator The Game - ReactJS

Inspirado en el popular juego [Calculator The Game], se ha buscado afianzar los conocimientos adquiridos en ReactJS realizando este juego, el cual presenta un reto interesante debido a la dinámica del mismo Juego.

# [DEMO]

# El juego.

## Objetivo.

El objetivo del juego es la obtención de un valor, el cual deberá conseguirse haciendo uso los botones dados en el teclado, además de tener un número fijo de movimientos.

![image](https://github.com/Jorger/Calculator_The_Game_ReactJS/blob/master/images/resolve_level.gif?raw=true)

## Niveles

Existen 130 niveles los cuales están compuestos con 15 diferentes tipos de botones.

![levels](https://github.com/Jorger/Calculator_The_Game_ReactJS/blob/master/images/select_level.gif?raw=true)

## Solución guiada de niveles.

En algunas situaciones el nivel resulta "difícil" por lo que existe el botón **"Resolve"** el cual permitirá resolver el mundo de forma guiada.

![resolve](https://github.com/Jorger/Calculator_The_Game_ReactJS/blob/master/images/btn_resolve.gif?raw=true)

# Ejecución.

## Instalación de dependencias.

```
npm install
```

## Ejecución Modo de desarrollo.

```
npm start
```

## Ejecución producción.

```
npm run build
```

## Despliegue

Se ha deplegado la aplicación en el servicio conocido como [now], comando que se ejecuta en la carpeta build de la aplicación, la cual es generada al realizar el ```npm run build```

```
now
```

# Tecnología.

Se ha hecho uso de [create-react-app] el cual provee una forma rápida de iniciar con React, sin la necesidad de establecer algún tipo de configuración, por defecto las aplicaciones desarrolladas con [create-react-app] ofrece la posibilidad de hacer uso de [service-workers], lo que a la postre ofrece la posibilidad de funcionamiento offline.


### Autor
* Jorge Rubaino [@ostjh]

License
----
MIT

[@ostjh]:https://twitter.com/ostjh
[Calculator The Game]:https://play.google.com/store/apps/details?id=com.sm.calculateme
[DEMO]:https://calculator-game-reactjs.now.sh/
[create-react-app]:https://github.com/facebook/create-react-app
[service-workers]:https://developers.google.com/web/fundamentals/primers/service-workers/?hl=es
[now]:https://zeit.co/now
