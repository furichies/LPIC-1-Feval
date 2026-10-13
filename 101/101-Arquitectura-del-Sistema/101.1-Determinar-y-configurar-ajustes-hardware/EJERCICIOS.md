# 101.1 Determinar y configurar ajustes de hardware — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

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
