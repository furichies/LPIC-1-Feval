# 101.3 Cambiar runlevels/targets y apagar o reiniciar — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 8 – Runlevels y targets (101.3)
- **Objetivo:** 101.3
- **Pasos:**
  1. `who -r; runlevel 2>/dev/null || true`
  2. `systemctl get-default`
  3. `ls -l /etc/systemd/system/default.target`
  4. `systemctl list-units --type=target --no-pager | head -15`
- **Comprobación:** el symlink de `default.target` apunta al target por defecto.
- **Solución esperada:** típico `graphical.target` en desktop, `multi-user.target` en server.

## Lab 9 – Cambiar target (simulado, sin romper nada) (101.3)
- **Objetivo:** 101.3
- **Pasos:**
  1. `systemctl isolate --help | head -5` (solo leer ayuda)
  2. En VM con snapshot: `sudo systemctl isolate multi-user.target` y luego `sudo systemctl isolate graphical.target` (si tienes GUI)
  3. Si es contenedor sin systemd: documenta la equivalencia `telinit 3` ↔ `isolate multi-user.target`
- **Comprobación:** sabes que `isolate` es inmediato y no persistente.
- **Solución esperada:** NO uses `isolate poweroff/reboot` como prueba. Solo en VM desechable.

## Lab 10 – shutdown con aviso + wall (101.3)
- **Objetivo:** 101.3
- **Pasos:**
  1. Abre dos terminales en la VM. En una: `who`
  2. En la otra: `echo "Prueba wall 101.3" | wall`
  3. Simula apagado sin ejecutar: `shutdown --help | grep -E "cancel|wall"`
  4. Planifica y cancela (solo VM): `sudo shutdown +10 "mantenimiento prueba" & sleep 2; sudo shutdown -c; echo cancelado`
- **Comprobación:** el mensaje wall aparece en todas las terminales logueadas.
- **Solución esperada:** `shutdown -c` cancela el temporizador. Nunca lo pruebes con `now` en host real.

## Lab 11 – Mini-simulacro estilo LPI (todos)
Responde sin mirar y luego comprueba en VM:
1. ¿Qué muestra `lspci -k` que no muestra `lspci` a secas?
2. ¿Dónde ves si la VM arrancó por UEFI sin reiniciar?
3. ¿Comando para ver solo errores de este arranque con journalctl?
4. ¿Diferencia `systemctl isolate` vs `set-default`?
5. ¿Qué hace `shutdown -k +5 "hola"`?
- **Solución esperada:** 1) driver kernel. 2) `ls /sys/firmware/efi`. 3) `journalctl -p err -b`. 4) temporal vs persistente. 5) solo avisa, no apaga.
