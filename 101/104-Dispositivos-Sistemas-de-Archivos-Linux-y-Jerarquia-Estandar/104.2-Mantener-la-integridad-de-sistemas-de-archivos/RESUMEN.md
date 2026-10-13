# 104.2 Mantener la integridad de los sistemas de archivos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.2 Integridad: du/df/fsck (w=2)
| Comando | Uso |
|---|---|
| `df -hT` | espacio por FS montado (`-i` inodos: "disco lleno" puede ser falta de inodos) |
| `du -sh dir/*` / `du -sh --threshold=100M` | tamaño real de ficheros (`-s` summary, `-h` human) |
| `fsck /dev/sdX` | chequeo genérico (¡desmontado o `ro`!) |
| `e2fsck -p /dev/sdX` | ext2/3/4; `-f` force, `-y` auto-yes |
| `tune2fs -l` / `-c` / `-i` / `-L` | ver/ajustar superbloque ext (max mounts, interval, label) |
| `xfs_repair /dev/sdX` (+ `xfs_fsr`, `xfs_db` awareness) | XFS siempre desmontado |

**5 trampas:** 1) `df` = libre en FS; `du` = uso en dirs (difieren por ficheros borrados aún abiertos). 2) Nunca `fsck` sobre FS montado rw (corrupción). 3) `df -i` explica "no space" con espacio libre. 4) `tune2fs` solo ext, no XFS. 5) `xfs_repair` con FS montado = error grave.
