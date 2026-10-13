# 102.2 Instalar un gestor de arranque — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 3 – GRUB2: inspección segura (102.2)
- **Objetivo/Pasos:** 1. `ls /boot/grub/grub.cfg /etc/default/grub /etc/grub.d/` 2. `grep -E "TIMEOUT|DEFAULT" /etc/default/grub` 3. `grub-mkconfig --help | head -5` (no regeneres aún).
- **Comprobación:** sabes qué fichero se edita y cuál se genera.
- **Solución esperada:** editar `/etc/default/grub`, generar con `grub-mkconfig -o /boot/grub/grub.cfg`.

## Lab 4 – GRUB2: cambiar timeout en VM con snapshot (102.2)
- **Objetivo/Pasos:** 1. Snapshot. 2. `sudo cp /etc/default/grub /etc/default/grub.bak` 3. Cambia `GRUB_TIMEOUT=5` a `10` 4. `sudo grub-mkconfig -o /boot/grub/grub.cfg` 5. `grep timeout /boot/grub/grub.cfg | head -3`.
- **Comprobación:** el cambio aparece en `grub.cfg`.
- **Solución esperada:** nunca edites `grub.cfg` a mano. Revierte con el `.bak` si hace falta.
