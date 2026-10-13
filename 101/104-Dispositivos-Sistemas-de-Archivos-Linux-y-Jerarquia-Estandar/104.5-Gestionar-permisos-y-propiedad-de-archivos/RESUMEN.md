# 104.5 Permisos y propiedad de archivos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.5 Permisos: chmod/umask/chown/chgrp/suid/sgid/sticky (w=3)
- `rwx` = 421; `chmod 754 f`, `chmod u+x,g-w f`, `chmod -R`. Dirs necesitan `x` para entrar, `r` para listar.
- Especiales: suid 4 (`chmod u+s` / `4755`, ej: `/usr/bin/passwd`), sgid 2 (ficheros: hereda grupo; dirs: nuevos ficheros heredan grupo), sticky 1 (`1777` en `/tmp`: solo dueño borra).
- `chown user:grupo f` (`-R`, `--reference`), `chgrp grupo f`. `umask 022` → fich 644, dir 755. Cálculo: `666-mask` fich, `777-mask` dirs.
- Ver con `ls -l`: `-rwsr-xr-x` (suid), `-rwxr-sr-x` (sgid), `drwxrwxrwt` (sticky).
**5 trampas:** 1) `umask 022` no es "permiso 022", es máscara que resta. 2) `chmod 777` casi nunca es la respuesta. 3) Suid en script shell se ignora (solo binarios). 4) `chown user.grupo` (punto) obsoleto: usa `:`. 5) Sticky sin `o+w` no tiene sentido.
