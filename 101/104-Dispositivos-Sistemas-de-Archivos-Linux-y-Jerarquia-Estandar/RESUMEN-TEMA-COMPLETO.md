# Tema 104 – RESUMEN

Contenido original. Referencia: https://learning.lpi.org/es/learning-materials/101-500/

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

## 104.3 Montaje: fstab/mount/umount/blkid/lsblk (w=3)
- `mount /dev/sdb1 /mnt/datos`, `umount /mnt/datos` (o por dispositivo). `mount -a` monta todo fstab. `findmnt` verifica.
- `/etc/fstab`: `UUID=xxx /datos ext4 defaults 0 2` (campos: device, mountpoint, fstype, options, dump, pass). Usa UUID (estable), no `/dev/sdX`.
- `blkid` (UUID/TYPE), `lsblk -f` (árbol+FS), `/media/` montajes removibles usuario, systemd `.mount` units (awareness: `systemctl list-units --type=mount`).
- Opciones típicas: `defaults,user,noauto,ro,exec/noexec`.
**5 trampas:** 1) Orden fstab: `dump` (0 casi siempre) y `pass` (`/`=1, otros=2, resto=0). 2) `user` permite montar a no-root; `users` a cualquiera que desmonte otro. 3) Tras editar fstab, valida con `mount -a` o `findmnt --verify`. 4) `umount` busy → `lsof +f -- /mnt` o `fuser -m`, no `umount -f` a ciegas. 5) Etiqueta vs UUID: ambos estables, pero examen prefiere UUID.

## 104.5 Permisos: chmod/umask/chown/chgrp/suid/sgid/sticky (w=3)
- `rwx` = 421; `chmod 754 f`, `chmod u+x,g-w f`, `chmod -R`. Dirs necesitan `x` para entrar, `r` para listar.
- Especiales: suid 4 (`chmod u+s` / `4755`, ej: `/usr/bin/passwd`), sgid 2 (ficheros: hereda grupo; dirs: nuevos ficheros heredan grupo), sticky 1 (`1777` en `/tmp`: solo dueño borra).
- `chown user:grupo f` (`-R`, `--reference`), `chgrp grupo f`. `umask 022` → fich 644, dir 755. Cálculo: `666-mask` fich, `777-mask` dirs.
- Ver con `ls -l`: `-rwsr-xr-x` (suid), `-rwxr-sr-x` (sgid), `drwxrwxrwt` (sticky).
**5 trampas:** 1) `umask 022` no es "permiso 022", es máscara que resta. 2) `chmod 777` casi nunca es la respuesta. 3) Suid en script shell se ignora (solo binarios). 4) `chown user.grupo` (punto) obsoleto: usa `:`. 5) Sticky sin `o+w` no tiene sentido.

## 104.6 Enlaces duros y simbólicos (w=2)
- `ln origen duro` (mismo inodo, mismo FS, no a dirs), `ln -s origen enlace` (ruta, cualquier FS, puede romperse).
- `ls -li` (col 1 = inodo; col 2 = nlinks), duros comparten inodo y `nlink>1`; symlinks tienen inodo propio y `l` en `ls -l`.
- Copiar vs enlazar: copia duplica bytes; enlace no. Backup con duros (`cp -al`) ahorra espacio.
**5 trampas:** 1) Duro no cruza filesystems; symlink sí. 2) Borrar origen rompe symlink, no al duro (vive mientras quede un link). 3) Duro a directorio prohibido (excepto `.`/`..`). 4) `ln -s` con ruta relativa se rompe al mover el enlace. 5) `ls` sin `-i` no distingue duros.

## 104.7 FHS y búsqueda (w=2)
- FHS: `/bin /sbin /lib` (binarios esenciales, hoy symlink a `/usr`), `/etc` configs, `/var` datos variables, `/usr` jerarquía secundaria, `/opt` add-ons, `/srv` datos servidos, `/media /mnt` montajes, `/tmp` temporal, `/home` usuarios, `/root`, `/boot`, `/dev /proc /sys`, `/run`.
- `find / -name "*.conf" 2>/dev/null`, `locate foo` (DB `mlocate`, `updatedb`; rápida pero puede estar desactualizada), `whereis ls` (bin+man+src), `which -a`, `type -a`, `/etc/updatedb.conf` (`PRUNEPATHS`).
**5 trampas:** 1) `locate` usa DB: fichero recién creado puede no salir hasta `updatedb`. 2) `whereis` ≠ `which`: el primero busca en paths estándar+man, el segundo en PATH. 3) `/etc` solo configs, no binarios. 4) `/var` vs `/srv`: logs/colas vs datos servidos. 5) `find` sin `2>/dev/null` inunda de "Permission denied".
