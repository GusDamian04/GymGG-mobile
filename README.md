# GymsGG
## Descripción
Este proyecto es la version mobile del proyecto de GymsGG.

## Cómo funciona
Esta parte del proyecto esta contruido a base de React Native, y como base de datos esta utilizando SQLite, lo cual viene propio de proyecto de Backend contruido con Django. Se requiere
instalar lo siguiente
   - [NodeJs](https://nodejs.org/es).

Cuando se clone este proyecto y deseas colaborar, cuando con este proyecto se debe realizar los siguientes, pasos:

1. *Al clonar repositorio:*
   - Realizar ```npm install```

2. *Al ejecutar el proyecto:*
   - cd gymgg-mobile
   - ```npm run android``` => Ejecutarlo con el celular conectado por celular
   - ```npm run web``` => Ejecutarlo en la web
   - ```npm run ios``` => Ejecutarlo solamente si tienes mac

Estos comandos son para ejecutar el proyecto.

## Configuración personal(Cada que se cambia de red)
El proyecto se esta conectado mediante una API del proyecto backend de Django, por ende no se puede conectar por localhost. Es por ello que en el archivo con la ruta ```app/services/api.ts```, se debe modificar dependiendo de la Red. A continuación los pasos para realizar la configuración.

1. *Obtener dirección IPv4:*
   - En el cmd preferido se debe colocar el comando ```ipconfig```.
   - Despues se debe se asegurar que el este conectado a la red inalambrica(No debe ser de Ethernet, debe de ser por Wi-Fi).
   - Busca el siguiente apartado:
```           Adaptador de LAN inalámbrica Wi-Fi:
                  Sufijo DNS específico para la conexión. . :
                  Vínculo: dirección IPv6 local. . . : xx00::000x:0x00:0000:00000
                  Dirección IPv4. . . . . . . . . . . . . . : 0.0.0.0
                  Máscara de subred . . . . . . . . . . . . : 0.0.0.0
                  Puerta de enlace predeterminada . . . . . : 0.0.0.0
```
   - Guarda la direccion de ```Dirección IPv4```.

2. *Modificar el archivo api.ts*
   - En el proyecto busca el archivo con la ruta ```app/services/api.ts```.
   - Dentro del archivo encontras ```API_URL = "http://0.0.0.0:8000";```.
   - Solament deberas agregar la direccion IPv4 que obtuviste en el paso 1.
   - No quitar el ```:8000``` al final de la dirección.
  
3. *Ejecución del Backend(Django)*
   - En el backend de django se ejecuta casi de la misma manera, agregando solamente un argumento más.
   - Dentro del directorio correcto ejecutar ```$ py manage.py runserver 0.0.0.0:8000```.
   - Lo que se ejecuta es que el servidor escuche peticiones fuera del localhost.
  
De esta manera la aplicaión mobile se conecta al backend
