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

Estos comandos son para ejecutar el proyecto, ya sea en la web, android, incluso de la ios.

# Configuración y Uso de Ngrok

Este documento explica cómo configurar la herramienta **ngrok** para exponer un servidor local (ejecutándose en un puerto específico) a una URL pública y segura en Internet. Esto es esencial para ejecutar la aplicacion móvil.

## Configuración Inicial (Solo una vez)

Estos pasos solo deben realizarse una vez por computadora para autenticar y hacer que el comando `ngrok` esté disponible globalmente.

### 1. Instalación y PATH

1.  **Descargar Ngrok:** Obtén el ejecutable desde la [página oficial de ngrok](https://ngrok.com/download).
2.  **Configuración Global:** Para poder ejecutar el comando `ngrok` desde cualquier terminal (Git Bash, CMD, etc.), debes mover el ejecutable a una carpeta que esté en la variable de entorno **$PATH** de tu sistema operativo (ej. `C:\Windows\ngrok`).
3. **Agregar la ruta a PATH**: En variables de entorno se debe agregar la ruta de `C:\Windows\ngrok` en el apartado de PATH.

### 2. Autenticación Global

Una vez que el comando `ngrok` es reconocido por tu terminal, debes autenticar tu cuenta.

* Consigue tu *authtoken* en el panel de control de tu cuenta de ngrok.
* Ejecuta el siguiente comando en tu terminal, reemplazando `<TU_TOKEN_OBTENIDO_DE_LA_WEB>` con tu token real.

    ```bash
    ngrok config add-authtoken <TU_TOKEN_OBTENIDO_DE_LA_WEB>
    ```

    Este comando guarda tu token en un archivo de configuración local (`ngrok.yml`), permitiendo el uso de tu cuenta sin volver a iniciar sesión.

---

## Flujo de Trabajo Diario

Debido a que ngrok genera una **URL pública diferente** cada vez que se reinicia el túnel (en la versión gratuita), el flujo de trabajo debe repetirse diariamente.

### 1. Iniciar el Túnel

1.  Asegúrate de que tu **servidor local** (tu backend de API o tu proyecto) esté en ejecución en un puerto específico (ej. el puerto `8000`).
2.  Abre una terminal separada e inicia el túnel de ngrok, apuntando al puerto de tu servidor local:

    ```bash
    ngrok http 8000
    ```

    > **Nota:** Mantén esta terminal abierta. Si la cierras, el túnel se detendrá y la URL dejará de funcionar.

### 2. Obtener y Aplicar la Nueva URL

Cada vez que inicias ngrok, se genera una URL temporal. Es **crucial** que uses esta nueva dirección en tu proyecto Frontend (móvil, web, etc.).

1.  **Identificar la URL:** Ngrok mostrará la información de `Forwarding` (Reenvío) en la terminal, incluyendo la URL **HTTPS** (ej.: `https://nuevo-dominio-temporal.ngrok-free.dev`).
2.  **Actualizar la Aplicación Cliente:** Copia la URL **HTTPS completa** y pégala en la configuración de tu aplicación Frontend (ej., como la `API_URL` en tu archivo de configuración de Axios o Fetch).

    ```javascript
    // Ejemplo de actualización en el código del Frontend
    export const API_URL = "[https://nuevo-dominio-temporal.ngrok-free.dev](https://nuevo-dominio-temporal.ngrok-free.dev)"; 
    ```

    > **Nota:** En e proyecto se encuentra en `app/services/api.ts`, y en `app/services/auth.ts` .

3.  **Ajustes de Seguridad del Backend (si aplica):** Si tu backend tiene protecciones de seguridad (como `ALLOWED_HOSTS` en Django), recuerda agregar el **dominio** de ngrok (sin el `https://`) a tu lista de hosts permitidos.

**¡Advertencia!** Si reinicias el túnel (`Ctrl+C` y vuelves a ejecutar `ngrok http 8000`), la URL cambiará y **deberás actualizar el código de tu aplicación cliente** con la nueva dirección.