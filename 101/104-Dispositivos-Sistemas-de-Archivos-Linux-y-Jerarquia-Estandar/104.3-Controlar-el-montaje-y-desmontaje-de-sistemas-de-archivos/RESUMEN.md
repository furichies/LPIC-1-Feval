# 104.3 Controlar el montaje y desmontaje — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.3 Montaje: fstab/mount/umount/blkid/lsblk (w=3)
- `mount /dev/sdb1 /mnt/datos`, `umount /mnt/datos` (o por dispositivo). `mount -a` monta todo fstab. `findmnt` verifica.
- `/etc/fstab`: `UUID=xxx /datos ext4 defaults 0 2` (campos: device, mountpoint, fstype, options, dump, pass). Usa UUID (estable), no `/dev/sdX`.
- `blkid` (UUID/TYPE), `lsblk -f` (árbol+FS), `/media/` montajes removibles usuario, systemd `.mount` units (awareness: `systemctl list-units --type=mount`).
- Opciones típicas: `defaults,user,noauto,ro,exec/noexec`.
**5 trampas:** 1) Orden fstab: `dump` (0 casi siempre) y `pass` (`/`=1, otros=2, resto=0). 2) `user` permite montar a no-root; `users` a cualquiera que desmonte otro. 3) Tras editar fstab, valida con `mount -a` o `findmnt --verify`. 4) `umount` busy → `lsof +f -- /mnt` o `fuser -m`, no `umount -f` a ciegas. 5) Etiqueta vs UUID: ambos estables, pero examen prefiere UUID.
