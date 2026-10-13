# EJERCICIOS Tema 106 (10 labs VM, sin romper X)

**1. ¿X o Wayland?**
Objetivo: detectar sesión. Pasos: `echo $XDG_SESSION_TYPE; echo $DISPLAY; echo $WAYLAND_DISPLAY; loginctl show-session $(loginctl | grep $(whoami) | awk '{print $1}' | head -1) -p Type`
Comprobación: x11/wayland/tty. Solución: VM sin GUI → tty, normal.

**2. Inspeccionar xorg (lectura)**
Objetivo: ubicar config. Pasos: `ls -R /etc/X11/ 2>/dev/null; cat /etc/X11/xorg.conf 2>/dev/null || echo "no hay, autodetectado"; ls /usr/share/X11/xorg.conf.d/`
Comprobación: entender autodetección. Solución: no crear xorg.conf en moderno.

**3. DISPLAY**
Objetivo: formato. Pasos: `echo $DISPLAY; DISPLAY=:0 xterm 2>&1 | head -1 || true; man X 2>/dev/null | head`
Comprobación: `host:display.pantalla`. Solución: `:0` = primer display local.

**4. xhost (teoría segura)**
Objetivo: listar sin abrir. Pasos: `which xhost && xhost 2>&1 || echo "sin X, normal en server"`
Comprobación: nunca ejecutar `xhost +` en real. Solución: respuesta examen: `xhost -` revoca.

**5. xauth (teoría)**
Objetivo: cookies. Pasos: `ls -l ~/.Xauthority 2>/dev/null || echo "sin X"; xauth list 2>&1 | head`
Comprobación: 600. Solución: `xauth extract/add` migra sesión.

**6. ssh -X vs -Y**
Objetivo: forwarding. Pasos: `grep -i forward /etc/ssh/ssh_config 2>/dev/null | head; ssh -X -o BatchMode=yes localhost true 2>&1 | head -2 || true`
Comprobación: distinguir trusted/untrusted. Solución: `-Y` más permisivo.

**7. Escritorios: identificar DM**
Objetivo: mapear. Pasos: `cat /etc/os-release | head -3; systemctl get-default; ls /usr/bin/*dm* /usr/sbin/*dm* 2>/dev/null; which gdm sddm lightdm 2>/dev/null`
Comprobación: `graphical.target` vs `multi-user`. Solución: `systemctl set-default graphical/multi-user` (VM con cuidado).

**8. VNC teoría + puertos**
Objetivo: cálculo. Pasos: `echo "display :1 → puerto $?"; python3 -c "for d in [0,1,2]: print(f':{d} -> {5900+d}')"; ss -ltn | grep 590 || echo "sin VNC"`
Comprobación: 5900+N. Solución: firewall solo 5901 si display :1.

**9. RDP/Spice/XDMCP puertos**
Objetivo: memorizar. Pasos: `grep -E '^(rdp|vnc|spice|xdmcp)' /etc/services 2>/dev/null; getent services 3389 5900 177 2>/dev/null || grep -E '3389|5900|177' /etc/services`
Comprobación: 3389/5900+/177. Solución: tabla flash.

**10. Accesibilidad**
Objetivo: localizar ayudas. Pasos: `which orca espeak brltty onboard 2>/dev/null; gsettings list-recursively org.gnome.desktop.a11y 2>/dev/null | head -10 || echo "sin GNOME"`
Comprobación: Orca=lector, BRLTTY=braille. Solución: activar en Settings→Accessibility (VM desktop).
