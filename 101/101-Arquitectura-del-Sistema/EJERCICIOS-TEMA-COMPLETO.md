# Tema 101 – EJERCICIOS (labs seguros en VM/contenedor)

> Usa una VM (Debian 12 o Fedora 40) o contenedor de prácticas. Nada aquí toca tu host.
> Si un lab pide root, usa `sudo` en la VM. No ejecutes `rm -rf`, `dd` destructivo ni `shutdown` en tu máquina real.

## Lab 1 – Explorar /proc y /sys (101.1)
- **Objetivo:** 101.1
- **Pasos:**
  1. `cat /proc/cpuinfo | grep -m1 "model name"`
  2. `cat /proc/meminfo | head -5`
  3. `ls /sys/block/ && cat /sys/block/sda/size 2>/dev/null || ls /sys/block/vda 2>/dev/null`
  4. `cat /proc/interrupts | head -10`
- **Comprobación:** identificas CPU, RAM total y disco virtual (sda/vda).
- **Solución esperada:** `size` en sectores de 512B → GB = size*512/1e9. `/proc` muestra datos vivos del kernel.

## Lab 2 – lspci / lsusb (101.1)
- **Objetivo:** 101.1
- **Pasos:**
  1. `lspci | head -20`
  2. `lspci -k | grep -A2 -i vga`
  3. `lsusb && lsusb -t`
- **Comprobación:** localizas driver en uso (`Kernel driver in use:`).
- **Solución esperada:** en VM verás dispositivos virtuales (Virtio, VMware SVGA, QEMU USB).

## Lab 3 – Módulos: lsmod / modinfo / modprobe (101.1)
- **Objetivo:** 101.1
- **Pasos:**
  1. `lsmod | head -15`
  2. `modinfo ext4 2>/dev/null | grep -E "filename|description" || modinfo virtio_net | head -10`
  3. `sudo modprobe -n -v loop` (dry-run, no carga nada)
  4. `ls /etc/modprobe.d/`
- **Comprobación:** entiendes `-n` como simulacro seguro.
- **Solución esperada:** `modprobe -n -v` muestra `insmod ...` sin ejecutarlo.

## Lab 4 – udev: identificar un disco (101.1)
- **Objetivo:** 101.1
- **Pasos:**
  1. `ls -l /dev/disk/by-uuid/`
  2. `udevadm info --query=all --name=/dev/sda 2>/dev/null | head -20 || udevadm info --query=all --name=/dev/vda | head -20`
  3. `udevadm monitor --help | head -5` (no lo dejes corriendo)
- **Comprobación:** relacionas UUID → dispositivo → driver.
- **Solución esperada:** `ID_BUS`, `ID_MODEL`, enlaces persistentes en `/dev/disk/by-*`.

## Lab 5 – dmesg: arranque del kernel (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `dmesg | head -30`
  2. `dmesg -T | grep -i -E "efi|bios" | head -5`
  3. `dmesg -l err,warn | head -10`
- **Comprobación:** distingues mensajes normales de errores reales.
- **Solución esperada:** verás DMI/QEMU, memoria detectada; errores ACPI en VM son normales.

## Lab 6 – journalctl: boot actual (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `journalctl -b --no-pager | head -30`
  2. `journalctl -k --no-pager | tail -20`
  3. `journalctl -p err -b --no-pager | head -10`
  4. `systemd-analyze blame 2>/dev/null | head -10 || echo "sin systemd-analyze en contenedor"`
- **Comprobación:** `journalctl -b` = este arranque; `-k` = solo kernel.
- **Solución esperada:** equivalencia `journalctl -k` ≈ `dmesg`.

## Lab 7 – BIOS vs UEFI en tu VM (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `ls /sys/firmware/efi 2>/dev/null && echo "UEFI" || echo "BIOS/Legacy"`
  2. `ls /boot/ | head -10`
  3. `ls /boot/efi 2>/dev/null || echo "sin ESP montada"`
- **Comprobación:** determinas firmware sin reiniciar.
- **Solución esperada:** si existe `/sys/firmware/efi`, arranque UEFI.

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
