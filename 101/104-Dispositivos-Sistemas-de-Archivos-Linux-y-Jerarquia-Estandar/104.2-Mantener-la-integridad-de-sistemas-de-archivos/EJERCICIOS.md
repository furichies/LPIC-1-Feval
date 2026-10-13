# 104.2 Mantener la integridad de los sistemas de archivos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 4 – du vs df + inodos (104.2)
- **Pasos:** 1. `df -h /tmp; df -i /tmp` 2. `du -sh /tmp/* 2>/dev/null | sort -h | tail -5` 3. `mkdir -p /tmp/muchos && seq 1 5000 | xargs -I{} touch /tmp/muchos/f{}; df -i /tmp | head -3; du -sh /tmp/muchos` 4. `rm -rf /tmp/muchos`.
- **Comprobación:** muchos ficheros pequeños consumen inodos aunque `du` marque poco.
- **Solución:** `df -i` al 100% = "No space" aunque haya bloques libres.

## Lab 5 – fsck/tune2fs solo lectura (104.2)
- **Pasos:** 1. `dd if=/dev/zero of=/tmp/fs.img bs=1M count=32 status=none; mkfs.ext4 -q /tmp/fs.img` 2. `fsck -N /tmp/fs.img` (solo muestra, no repara) 3. `tune2fs -l /tmp/fs.img | grep -E "Mount count|Check|Label"` 4. `rm /tmp/fs.img`.
- **Comprobación:** nunca haces fsck sobre FS montado rw.
- **Solución:** en examen: desmontar → `fsck/e2fsck/xfs_repair` → montar.
