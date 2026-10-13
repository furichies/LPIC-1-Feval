# 107.1 Cuentas de usuario y grupo — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 107.1 Usuarios y grupos (peso 5)

| Comando | Opciones examen |
|---|---|
| `useradd -m -s /bin/bash -c "Nombre" -G wheel ana` | `-m` crea home, `-s` shell, `-G` suplem., `-u UID`, `-e YYYY-MM-DD` caducidad. |
| `usermod -aG grupo user` / `-L/-U` / `-s` | `-aG` añadir sin borrar (¡sin `-a` expulsas de otros!). Bloquear/desbloquear. |
| `userdel -r ana` | `-r` borra home+cola mail. Sin `-r` deja restos. |
| `groupadd -g 2000 dev` / `groupdel` / `gpasswd -a user grp` | Crear/borrar, añadir miembro. |
| `passwd ana` / `passwd -l -u -e -S` | Fijar, lock/unlock/expire/status. |
| `chage -l ana` / `-E -M -m -W -I` | Ver/envejecimiento: caducidad cuenta, max/min días, aviso, inactividad. |
| `getent passwd ana` / `group dev` | Consulta NSS (incluye LDAP), mejor que `cat /etc/passwd`. |
| `id ana` / `whoami` / `groups` | UID/GID/grupos efectivos. |

Archivos: `/etc/passwd` (7 campos `user:x:UID:GID:GECOS:home:shell`), `/etc/shadow` (9 campos `!:18000:0:99999:7:::`), `/etc/group`, `/etc/gshadow`, `/etc/skel/`, `/etc/login.defs`, `/etc/default/useradd`.

**5 trampas 107.1:**
1. `usermod -G` sin `-a` sustituye grupos.
2. `userdel` sin `-r` no borra home.
3. Shell `/usr/sbin/nologin` vs `/bin/false` (uno avisa, otro mudo).
4. UID 0 = root aunque se llame distinto.
5. `chage -E` es fecha cuenta, `-M` es caducidad password (distinto).
