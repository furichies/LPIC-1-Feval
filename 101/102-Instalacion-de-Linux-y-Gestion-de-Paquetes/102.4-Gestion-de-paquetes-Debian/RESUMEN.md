# 102.4 Gestión de paquetes Debian — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 102.4 Debian: dpkg / apt-get / apt-cache (w=3)
### Tabla
| Comando | Uso |
|---|---|
| `dpkg -i pkg.deb` | instala .deb local (no resuelve dependencias) |
| `dpkg -r pkg` / `-P` | elimina / purga (borra configs) |
| `dpkg -l [patrón]` / `-s pkg` / `-L pkg` / `-S /ruta/fich` | lista / estado / ficheros del paquete / qué paquete provee un fichero |
| `dpkg-reconfigure pkg` | reconfigura paquete instalado |
| `apt-get update` | refresca índices (siempre antes de install) |
| `apt-get install -y pkg` / `remove` / `purge` / `upgrade` / `dist-upgrade` / `autoremove` | gestión con dependencias |
| `apt-cache search|show|depends|policy pkg` | buscar / info / dependencias / versiones |
| `/etc/apt/sources.list` + `/etc/apt/sources.list.d/` | repos (`deb ... distribution component`) |
### 5 trampas
1. `dpkg -i` no resuelve dependencias → luego `apt-get install -f`.
2. `remove` conserva configs; `purge` las borra.
3. `apt-get update` ≠ `upgrade`: el primero actualiza listas.
4. `dpkg -S` (mayúscula) busca por fichero; `dpkg -s` (minúscula) estado del paquete.
5. `apt-cache` solo consulta, no instala.
