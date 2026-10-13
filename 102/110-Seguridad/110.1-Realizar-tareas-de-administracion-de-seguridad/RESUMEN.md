# 110.1 Tareas de administración de seguridad — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 110.1 Auditoría y administración (peso 3)

| Comando | Uso examen |
|---|---|
| `find / -perm -4000 -type f 2>/dev/null` | SUID. `-perm -4000` (al menos), `-perm /6000` (cualquiera SUID/SGID). SGID 2000, sticky 1000 (`/tmp`). |
| `passwd -S` / `chage -l user` | Estado/caducidad. Bloqueo `!`/`*` en shadow. |
| `sudo -l` / `visudo` / `/etc/sudoers.d/` | Ver privilegios / editar seguro. `user ALL=(ALL) NOPASSWD: /usr/bin/apt`. |
| `su -` vs `su` vs `sudo -i` | Login completo vs hereda entorno vs sudo interactivo. |
| `ulimit -a` / `-n 4096` / `-Hn` | Límites shell. Persistente: `/etc/security/limits.conf`. |
| `who` / `w` / `last` / `lastb` | Logueados / actividad+load / logins ok (`/var/log/wtmp`) / fallidos (`/var/log/btmp`). |
| `lsof -i :22` / `-u ana` / `fuser -v /mnt` | Ficheros/puertos abiertos, quién usa montaje. `fuser -k` mata (¡peligro!). |
| `nmap -sS -sV -O localhost` / `ss -tulpn` | Escaneo externo vs escucha local. Solo contra tu VM con permiso. |
| `netstat -tulpn` | Clásico aún preguntado. |

**5 trampas 110.1:**
1. SUID en script shell se ignora (solo binarios).
2. `sudo` loguea en auth/secure; `su` pide pass del destino.
3. `ulimit -Hn` hard no se sube sin root.
4. `last` lee wtmp rotado (`last -f /var/log/wtmp.1`).
5. `nmap` sin permiso = ilegal; en examen solo localhost/lab.
