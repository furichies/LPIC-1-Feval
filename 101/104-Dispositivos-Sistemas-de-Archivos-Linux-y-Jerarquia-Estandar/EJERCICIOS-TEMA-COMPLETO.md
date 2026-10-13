# Tema 104 – EJERCICIOS

> VM con snapshot. Para 104.1 usa imagen-fichero o disco extra vacío, NUNCA tu disco del sistema. Si dudas, usa `losetup`/ficheros en /tmp.

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

## Lab 4 – du vs df + inodos (104.2)
- **Pasos:** 1. `df -h /tmp; df -i /tmp` 2. `du -sh /tmp/* 2>/dev/null | sort -h | tail -5` 3. `mkdir -p /tmp/muchos && seq 1 5000 | xargs -I{} touch /tmp/muchos/f{}; df -i /tmp | head -3; du -sh /tmp/muchos` 4. `rm -rf /tmp/muchos`.
- **Comprobación:** muchos ficheros pequeños consumen inodos aunque `du` marque poco.
- **Solución:** `df -i` al 100% = "No space" aunque haya bloques libres.

## Lab 5 – fsck/tune2fs solo lectura (104.2)
- **Pasos:** 1. `dd if=/dev/zero of=/tmp/fs.img bs=1M count=32 status=none; mkfs.ext4 -q /tmp/fs.img` 2. `fsck -N /tmp/fs.img` (solo muestra, no repara) 3. `tune2fs -l /tmp/fs.img | grep -E "Mount count|Check|Label"` 4. `rm /tmp/fs.img`.
- **Comprobación:** nunca haces fsck sobre FS montado rw.
- **Solución:** en examen: desmontar → `fsck/e2fsck/xfs_repair` → montar.

## Lab 6 – fstab con UUID (104.3)
- **Pasos:** 1. `lsblk -f; sudo blkid` 2. `cat /etc/fstab` 3. `findmnt --verify 2>&1 | head -10` (valida sin montar) 4. Simula línea (NO la añadas): `UUID=XXXX /datos ext4 defaults 0 2`.
- **Comprobación:** cuentas 6 campos y explicas `0 2`.
- **Solución:** `/`=1, otros FS=2, swap/removibles=0.

## Lab 7 – mount/umount loop + user (104.3)
- **Pasos:** 1. `dd if=/dev/zero of=/tmp/d.img bs=1M count=32 status=none; mkfs.ext4 -q /tmp/d.img` 2. `mkdir -p /tmp/loop && sudo mount -o loop /tmp/d.img /tmp/loop && mount | grep loop` 3. `sudo umount /tmp/loop` 4. Lee `man mount | grep -A2 "user"` y anota diferencia `user` vs `users`.
- **Comprobación:** `mount | grep` confirma; `umount` libera.
- **Solución:** si "target is busy": `lsof +f -- /tmp/loop`.

## Lab 8 – Permisos y umask (104.5)
- **Pasos:** 1. `umask; mkdir -p /tmp/perm && cd /tmp/perm` 2. `umask 022; touch f022; mkdir d022; ls -l` 3. `umask 027; touch f027; mkdir d027; ls -l` 4. `chmod 640 f027; chmod 750 d027; ls -l`.
- **Comprobación:** 022→644/755, 027→640/750.
- **Solución:** fórmula 666-mask (fich), 777-mask (dir).

## Lab 9 – suid/sgid/sticky (104.5)
- **Pasos:** 1. `ls -l /usr/bin/passwd /tmp; find /usr/bin -perm -4000 | head -3` 2. En /tmp/perm: `touch prog; chmod 4755 prog; ls -l prog` 3. `mkdir grupal; chmod 2775 grupal; ls -ld grupal` 4. `chmod +t grupal; ls -ld grupal; chmod -t grupal`.
- **Comprobación:** ves `s`/`t` en `ls -l`.
- **Solución:** suid=4, sgid=2, sticky=1; octal `4755/2755/1755`.

## Lab 10 – chown/chgrp (104.5)
- **Pasos:** 1. `touch mio.txt; ls -l mio.txt` 2. `sudo chown nobody:nogroup mio.txt; ls -l mio.txt` (en Debian; en Fedora usa `nobody:nobody`) 3. `sudo chown $USER:$USER mio.txt; ls -l` 4. `chgrp --help | head -3`.
- **Comprobación:** `user:grupo` con dos puntos.
- **Solución:** `-R` para recursivo; evita `chmod 777` como "arreglo".

## Lab 11 – Duros vs simbólicos (104.6)
- **Pasos:** 1. `echo hola > orig.txt; ln orig.txt duro.txt; ln -s orig.txt blando.txt; ls -li` 2. `cat duro.txt blando.txt` 3. `rm orig.txt; ls -li; cat duro.txt; cat blando.txt || echo "symlink roto"` 4. Intenta `ln duro.txt /tmp/otro-fs 2>&1 | head -2` si cruza FS (verás error).
- **Comprobación:** duro sobrevive, symlink se rompe; mismo inodo en duro.
- **Solución:** duros = mismo FS + mismo inodo; symlinks = ruta.

## Lab 12 – FHS + find/locate (104.7)
- **Pasos:** 1. `ls -ld /bin /sbin 2>/dev/null; ls -l / | head -20` 2. `whereis bash; which -a bash; type -a bash` 3. `find /etc -maxdepth 1 -name "*.conf" 2>/dev/null | head` 4. `which locate && (locate passwd | head -3; cat /etc/updatedb.conf | grep -i prune) || echo "instala mlocate para probar locate/updatedb"`.
- **Comprobación:** diferencias which/whereis/type; sabes por qué locate puede mentir.
- **Solución:** locate→DB desactualizada; find→vivo pero lento.
