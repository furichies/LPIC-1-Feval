# 106.1 Instalar y configurar X11 — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 106.1 X11 (peso 2)

| Comando / Archivo | Uso |
|---|---|
| `/etc/X11/xorg.conf`, `/etc/X11/xorg.conf.d/*.conf` | Config Xorg (Monitor/Device/Screen/InputClass). Hoy casi todo autodetectado. |
| `Xorg -configure` / `X -configure` | Generar plantilla (como root, sin X corriendo). |
| `xhost +host` / `xhost -` / `xhost` | Control de acceso por host (inseguro `xhost +`). Listar con `xhost` solo. |
| `xauth list` / `xauth add` / `xauth extract` | Cookies MIT-MAGIC-COOKIE-1 en `~/.Xauthority`. |
| `echo $DISPLAY` | `:0`, `host:0.0`. Formato `host:display.pantalla`. |
| `export DISPLAY=:0` / `ssh -X` | Redirigir clientes. `-X` (no confiable) / `-Y` (confiable). |
| Wayland | Sustituto: sin red nativa, `WAYLAND_DISPLAY=wayland-0`, XWayland para compat. |

Conceptos: arquitectura cliente/servidor invertida (app=cliente, pantalla=servidor). `Xorg` servidor.

**5 trampas 106.1:**
1. `xhost +` abre a todos – nunca en examen como respuesta segura.
2. `DISPLAY` incluye `:0`, olvidar `:` es error.
3. `xauth` es por usuario/cookie; `xhost` es por host (menos fino).
4. Wayland no usa `xorg.conf` ni `DISPLAY` igual.
5. `~/.Xauthority` permisos 600; si se borra hay que re-login.
