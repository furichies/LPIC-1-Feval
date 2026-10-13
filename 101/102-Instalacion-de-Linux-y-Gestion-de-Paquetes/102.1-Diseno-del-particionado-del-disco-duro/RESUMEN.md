# 102.1 Diseño del particionado del disco — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 102.1 Diseño de particionado (w=2)
### Conceptos
- `/` raíz obligatoria; `/boot` con kernel (respeta límites BIOS: ideal al inicio del disco, 500M-1G); `/home` datos usuario; `/var` logs/colas (crece, sepárala en servidores); `swap` (RAM≤2G: swap≈RAM; RAM grande: 2-4G o zram); ESP FAT32 `/boot/efi` (~100-512M, flag boot/esp) solo UEFI.
- Puntos de montaje + LVM básico: PV → VG → LV, permite redimensionar. No pide crear LVM en examen, solo conceptos.
### Ficheros: `/etc/fstab`, salida de `lsblk`, `blkid`.
### 5 trampas
1. `/boot` debe ser legible por el firmware: no la pongas en LVM/RAID exótico en BIOS.
2. ESP es FAT32 y va en GPT con flag esp, no ext4.
3. `/var` separada evita que logs llenen `/`.
4. swap no es un filesystem, es área de intercambio (`mkswap`+`swapon`, ver Tema 104).
5. LVM: el orden es disco→PV→VG→LV, no al revés.
