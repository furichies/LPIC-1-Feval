# 104.3 Controlar el montaje y desmontaje — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 6 – fstab con UUID (104.3)
- **Pasos:** 1. `lsblk -f; sudo blkid` 2. `cat /etc/fstab` 3. `findmnt --verify 2>&1 | head -10` (valida sin montar) 4. Simula línea (NO la añadas): `UUID=XXXX /datos ext4 defaults 0 2`.
- **Comprobación:** cuentas 6 campos y explicas `0 2`.
- **Solución:** `/`=1, otros FS=2, swap/removibles=0.

## Lab 7 – mount/umount loop + user (104.3)
- **Pasos:** 1. `dd if=/dev/zero of=/tmp/d.img bs=1M count=32 status=none; mkfs.ext4 -q /tmp/d.img` 2. `mkdir -p /tmp/loop && sudo mount -o loop /tmp/d.img /tmp/loop && mount | grep loop` 3. `sudo umount /tmp/loop` 4. Lee `man mount | grep -A2 "user"` y anota diferencia `user` vs `users`.
- **Comprobación:** `mount | grep` confirma; `umount` libera.
- **Solución:** si "target is busy": `lsof +f -- /tmp/loop`.
