# Bitácora de Proceso y Uso de Inteligencia Artificial

Este documento registra de forma transparente la bitácora de asistencia virtual, las herramientas utilizadas, las decisiones técnicas de corrección tomadas durante el desarrollo del laboratorio y una reflexión final sobre el uso de la IA en la educación técnica.

---

## 1. Herramientas y Fuentes Utilizadas
Durante el desarrollo de la infraestructura y la posterior documentación, se utilizaron las siguientes herramientas de apoyo:

* **Google Gemini (IA):** Utilizada como copiloto para la resolución de errores de configuración, depuración sintáctica de Nginx y estructuración de la documentación técnica.
* **Documentación Oficial de Ubuntu & Nginx:** Consultada para validar los estándares de seguridad en la asignación de permisos.
* **Guía del Estudiante (INACAP):** Utilizada como base para el orden de los comandos y la topología requerida.

---

## 2. Registro de Prompts Clave Seleccionados
A continuación, se presentan algunos de los prompts más relevantes utilizados en el proceso de asistencia para resolver problemas específicos:

### Prompt de Depuración de Nginx (Resolución de Error Sintáctico)
* **Propósito:** Identificar el fallo en el archivo de configuración cuando el test sintáctico de Nginx arrojó un error.
* **Prompt enviado:** 
  > *"Tengo un error al ejecutar `sudo nginx -t` en mi máquina virtual. El mensaje es: `unknown directive "nginx" in /etc/nginx/sites-enabled/wiki:3`. Este es mi archivo: [código del archivo]. ¿Cómo lo soluciono?"*
* **Respuesta/Corrección adoptada:** La IA identificó que se había ingresado una palabra suelta o una directiva errónea en la línea 3 del archivo. Se procedió a limpiar el archivo con `nano` y transcribir el bloque de configuración estándar de forma completamente limpia en minúsculas.

### Prompt de Solución para Error 403 Forbidden
* **Propósito:** Resolver la restricción de permisos del navegador al intentar acceder al puerto 8080 del anfitrión.
* **Prompt enviado:**
  > *"Ya corregí el archivo de Nginx y el test es exitoso, pero al entrar a `http://localhost:8080` desde mi PC me sale un error '403 Forbidden'. ¿Qué permisos me faltan en el servidor?"*
* **Respuesta/Corrección adoptada:** Se detectó que el usuario `www-data` no tenía permisos de ejecución (`x`) para descender y leer los subdirectorios dentro de `/var/www`. Se aplicó `sudo chmod -R 755 /var/www` y se reasignó el propietario con `chown` para corregir la lectura de forma definitiva.

---

## 3. Decisiones y Correcciones Técnicas del Proceso
Durante la ejecución del laboratorio, se registraron tres momentos clave de corrección técnica autónoma:

1. **Momento 1 - Corrección de la Guía Oficial (`ln -s`):**
   * *Problema:* La guía del estudiante sugería el comando `sudo lns ...` para activar el sitio de Nginx, el cual no existe en los sistemas operativos Linux y generaba un fallo de "command not found" en la terminal.
   * *Decisión:* Se identificó que se trataba de un error de imprenta y se aplicó la sintaxis correcta del comando de enlace simbólico: `sudo ln -s [origen] [destino]`.
2. **Momento 2 - Resolución del bloqueo por sintaxis:**
   * *Problema:* Un error de ortografía al tipear la directiva `index` en el archivo de configuración impedía que Nginx iniciara o recargara correctamente.
   * *Decisión:* Se editó el archivo con `sudo nano`, se depuró el archivo de configuración a su forma más minimalista y funcional, y se validó con `sudo nginx -t` antes de reiniciar el servicio.
3. **Momento 3 - Desbloqueo de accesos de carpeta (`403 Forbidden`):**
   * *Problema:* Nginx arrojaba un código de estado HTTP 403 al intentar acceder al sitio web recién configurado.
   * *Decisión:* Se auditaron los permisos de la ruta jerárquica y se determinó que la carpeta `/var/www` y el archivo `index.html` carecían de los privilegios necesarios. Se corrigió de manera permanente utilizando `chmod -R 755` y `chown` hacia el usuario de servicio `www-data`.

---

## 4. Reflexión Final
El uso de herramientas de Inteligencia Artificial en este laboratorio sirvió como un verdadero copiloto de aprendizaje, marcando una clara diferencia entre usar la tecnología como un simple "chatbot de respuestas rápidas" y usarla como un "agente de asistencia técnica". Un chatbot convencional se limita a entregar respuestas teóricas o copiar bloques de código completos sin entender el entorno de ejecución. En contraste, utilizar la IA como un agente interactivo implicó proporcionarle los errores específicos de mi consola, guiarla en mi pauta de evaluación y trabajar en conjunto paso a paso para depurar los permisos del servidor y la lógica de redirección de puertos. Esta experiencia no solo me permitió resolver obstáculos técnicos comunes de la administración de servidores como los permisos de usuario y la configuración web, sino que también reforzó de manera crítica mi capacidad de diagnosticar fallas en entornos industriales CLI.