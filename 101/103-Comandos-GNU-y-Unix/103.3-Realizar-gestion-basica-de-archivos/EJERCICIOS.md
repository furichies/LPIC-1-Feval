# 103.3 Gestión básica de archivos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 4 – Ficheros y globs (103.3)
- **Pasos:** 1. `mkdir -p p/a/b; touch p/a/b/f{1..3}.txt p/nota.md` 2. `ls -R p; ls p/a/b/*.txt` 3. `cp -r p p2; mv p2 p3; ls p3` 4. `rm -ri p3/a/b/f1.txt` (responde `y`) 5. `find p -type f -name "*.txt"`.
- **Comprobación:** `rmdir p/a` falla (no vacío).
- **Solución:** `mkdir -p`, `cp -r`, globs los expande bash.

## Lab 5 – find + tar + dd seguro (103.3)
- **Pasos:** 1. `find /tmp/lpi103 -type f -size +0c -exec ls -l {} +` 2. `tar czf backup.tgz p/ && tar tzf backup.tgz | head` 3. `mkdir restore && tar xzf backup.tgz -C restore && find restore` 4. `dd if=/dev/zero of=/tmp/lpi103/disco.img bs=1M count=5 status=progress; file disco.img; rm disco.img`.
- **Comprobación:** `tar tf` lista sin extraer.
- **Solución:** `dd` solo con `of=` en /tmp. Jamás a `/dev/sd*`.
