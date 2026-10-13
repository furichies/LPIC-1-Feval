# 104.5 Permisos y propiedad de archivos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

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
