# 104.1 Crear particiones y sistemas de archivos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.1 Particiones y filesystems (w=2)
| Herramienta | Uso |
|---|---|
| `fdisk` | MBR/DOS (y GPT básico). Comandos: `p` print, `n` new, `d` delete, `t` type, `w` write, `q` quit sin guardar |
| `gdisk` | GPT interactivo (equivalente a fdisk para GPT) |
| `parted` | MBR+GPT, scriptable: `parted /dev/sdb mklabel gpt mkpart primary ext4 1MiB 1GiB print` |
| `mkfs.ext4 /dev/sdb1`, `mkfs.xfs`, `mkfs.vfat -F32`, `mkfs.exfat` | crean FS (ext2/3/4 journal creciente; XFS alto rendimiento; VFAT/exFAT intercambio con Windows) |
| `mkswap /dev/sdb2` + `swapon` | swap (ver 102.1) |
| Btrfs (awareness) | multi-device, compresión, subvolúmenes/snapshots (`btrfs subvolume list`) |

**5 trampas:** 1) `w` en fdisk escribe de verdad: en examen elige `q` si solo inspeccionas. 2) Tras particionar, falta `mkfs`: partición ≠ filesystem. 3) VFAT para ESP/intercambio, no para `/`. 4) `parted` aplica al instante (sin `w`). 5) Btrfs: basta con rasgos (no comandos profundos).
