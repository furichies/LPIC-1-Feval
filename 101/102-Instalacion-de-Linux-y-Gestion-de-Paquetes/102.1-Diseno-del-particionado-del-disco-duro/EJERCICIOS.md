# 102.1 Diseño del particionado del disco — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 1 – Diseñar particionado (102.1)
- **Objetivo/Pasos:** dibuja en papel y verifica con `lsblk -f` y `df -h` tu VM. Anota `/`, `/boot` (o `/boot/efi`), `/home`, `/var`, swap (`swapon --show`).
- **Comprobación:** `lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT`.
- **Solución esperada:** identificas qué montaje llenaría `/` si `/var/log` crece.

## Lab 2 – ESP y UEFI (102.1)
- **Objetivo/Pasos:** 1. `ls /sys/firmware/efi && echo UEFI || echo BIOS` 2. `lsblk | grep -i efi; mount | grep efi` 3. `sudo parted -l 2>/dev/null | head -30 || sudo fdisk -l | head -30`.
- **Comprobación:** distingues tabla GPT vs MBR.
- **Solución esperada:** en UEFI verás partición vfat en `/boot/efi`.
