# 106.2 Escritorios gráficos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
