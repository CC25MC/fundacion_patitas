Fundacion Patitas

Creado por:

        Osdalys Gómez V-27.077.239
        Cesar Casadiego V-27.276.551

Instala dependencias usando 

        npm install

        yarn install


Luego de instalar las dependencias, buscar en la carpeta **node_modules** el archivo


        electron-updater/out/AppUpdater.js


En ella cambia la siguiente linea de codigo 


        const promises_1 = require("fs/promises");


Cambiala por la siguiente


        const promises_1 = require("fs").promises;


Ya hecho eso, ahora podras ejecutar la aplicación con la siguiente linea


        yarn electron:serve


Si quieres crear el build de la aplicacion tendras que correr la sigiente linea:


        yarn electron:build
