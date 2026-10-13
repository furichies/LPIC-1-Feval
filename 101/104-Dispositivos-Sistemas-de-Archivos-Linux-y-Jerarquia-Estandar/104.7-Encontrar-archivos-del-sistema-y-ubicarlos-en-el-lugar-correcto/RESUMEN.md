# 104.7 FHS y localización de archivos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.7 FHS y búsqueda (w=2)
- FHS: `/bin /sbin /lib` (binarios esenciales, hoy symlink a `/usr`), `/etc` configs, `/var` datos variables, `/usr` jerarquía secundaria, `/opt` add-ons, `/srv` datos servidos, `/media /mnt` montajes, `/tmp` temporal, `/home` usuarios, `/root`, `/boot`, `/dev /proc /sys`, `/run`.
- `find / -name "*.conf" 2>/dev/null`, `locate foo` (DB `mlocate`, `updatedb`; rápida pero puede estar desactualizada), `whereis ls` (bin+man+src), `which -a`, `type -a`, `/etc/updatedb.conf` (`PRUNEPATHS`).
**5 trampas:** 1) `locate` usa DB: fichero recién creado puede no salir hasta `updatedb`. 2) `whereis` ≠ `which`: el primero busca en paths estándar+man, el segundo en PATH. 3) `/etc` solo configs, no binarios. 4) `/var` vs `/srv`: logs/colas vs datos servidos. 5) `find` sin `2>/dev/null` inunda de "Permission denied".
