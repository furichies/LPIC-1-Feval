# 104.1 Crear particiones y sistemas de archivos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 1 – Inspección no destructiva (104.1)
- **Pasos:** 1. `lsblk -f; sudo blkid; df -hT` 2. `sudo fdisk -l | head -40` 3. `sudo parted -l 2>/dev/null | head -40`.
- **Comprobación:** identificas DOS vs GPT sin modificar nada.
- **Solución:** `fdisk -l` de solo lectura es seguro; no entres al modo interactivo sin necesidad.

## Lab 2 – Crear FS en fichero-imagen (104.1, seguro)
- **Pasos:** 1. `dd if=/dev/zero of=/tmp/disco.img bs=1M count=64 status=none` 2. `mkfs.ext4 -L prueba /tmp/disco.img` 3. `mkdir -p /tmp/mnt-prueba && sudo mount -o loop /tmp/disco.img /tmp/mnt-prueba && df -hT /tmp/mnt-prueba` 4. `sudo umount /tmp/mnt-prueba; rm /tmp/disco.img`.
- **Comprobación:** practicas `mkfs+mount` sin particionar de verdad.
- **Solución:** `-o loop` para imagen; XFS/VFAT igual cambiando `mkfs.*`.

## Lab 3 – Tipos de FS (104.1)
- **Pasos:** 1. Repite Lab 2 con `mkfs.xfs -L prueba /tmp/disco.img` (necesita `xfsprogs`) 2. `file /tmp/disco.img` 3. Anota cuándo elegirías ext4 vs XFS vs VFAT/exFAT vs Btrfs.
- **Comprobación:** `file` y `blkid /tmp/disco.img` muestran el tipo.
- **Solución:** ext4 general, XFS ficheros grandes, VFAT/exFAT intercambio, Btrfs snapshots.
