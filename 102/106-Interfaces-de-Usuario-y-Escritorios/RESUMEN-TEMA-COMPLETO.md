# RESUMEN Tema 106 – Interfaces y Escritorios

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

## 106.2 Escritorios (peso 1)

| Tecnología | Idea examen |
|---|---|
| KDE Plasma (Qt, `sddm`) | Configurable, `plasmashell`, wallet. |
| GNOME (GTK, `gdm`) | Por defecto en RHEL/Ubuntu, Wayland. |
| Xfce (GTK, `lightdm`) | Ligero, ideal VM/equipos viejos. |
| VNC (`vncserver :1`, `vncpasswd`) | Framebuffer remoto, puertos 5900+N. |
| RDP (`xrdp`, puerto 3389) | Nativo Windows, `rdesktop/remmina`. |
| Spice | Virtualización (virt-manager), mejor que VNC en KVM. |
| XDMCP (puerto UDP 177) | Login gráfico remoto antiguo, inseguro, desactivado por defecto. |

**5 trampas 106.2:**
1. VNC 5900+N: display `:1` = 5901.
2. RDP=3389 TCP, VNC=5900+, XDMCP=177 UDP.
3. `sddm→KDE, gdm→GNOME, lightdm→Xfce` (asociación típica).
4. Spice ≠ VNC aunque ambos virtualizan pantalla.
5. XDMCP va sin cifrado – no elegirlo como "seguro".

## 106.3 Accesibilidad (peso 1)

| Ayuda | Herramienta Linux |
|---|---|
| Lector de pantalla | Orca (GNOME, `orca -s`), espeak/festival TTS. |
| Braille | BRLTTY (`brltty`, líneas braille). |
| Lupa / alto contraste | GNOME Magnifier (`Super+Alt+8`), temas HighContrast. |
| Teclado en pantalla | Onboard, Caribou. |
| StickyKeys / SlowKeys / BounceKeys | AccessX en GNOME Tweaks / `gsettings`. |

**5 trampas 106.3:**
1. Orca = lector, BRLTTY = braille (no confundir).
2. Lupa es visual; lector es audio.
3. `espeak` sintetiza, no lee pantalla por sí solo.
4. Accesibilidad vive en ajustes de escritorio, no en xorg.conf.
5. Alto contraste ≠ lupa (tema vs zoom).
