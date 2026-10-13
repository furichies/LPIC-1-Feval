# RESUMEN Tema 110 – Seguridad

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

## 110.2 Seguridad del host (peso 3)

| Elemento | Clave |
|---|---|
| `/etc/shadow` 640 root:shadow, `/etc/passwd` 644 | Segundo campo `!` bloqueado, `*` sin login, `x` → shadow. |
| `pwck` / `grpck` | Chequear integridad passwd/group. |
| `xinetd` `/etc/xinetd.d/*` (`disable=yes/no`) | Superservidor clásico. Moderno: `systemd.socket` (`foo.socket` + `foo.service`, `Accept=yes`). |
| `hosts.allow` / `hosts.deny` (TCP Wrappers) | `sshd: 192.168.1.0/24` vs `ALL: ALL`. Allow se evalúa primero. |
| `sysctl net.ipv4.ip_forward=0` | Endurecer kernel. Persistente `/etc/sysctl.conf`. |

**5 trampas 110.2:**
1. Orden TCP Wrappers: allow → deny (si no match, permite).
2. `disable=yes` en xinetd = servicio apagado (doble negación).
3. `systemd.socket` no sustituye firewall, solo activación.
4. Shadow 640, no 644 ni 600 en examen (grupo shadow necesita leer).
5. Desactivar servicios ≠ desinstalar: `systemctl disable --now`.

## 110.3 Cifrado OpenSSH/GPG (peso 4)

| Comando | Uso |
|---|---|
| `ssh -p 2222 -i ~/.ssh/id_ed25519 user@host` | Puerto, identidad. `-X` X11, `-L 8080:dest:80` túnel local, `-R` remoto, `-D 1080` SOCKS. |
| `ssh-keygen -t ed25519 -f ~/.ssh/lab -N ""` | Generar (ed25519 moderno, rsa 4096 compat). `.pub` se comparte, privada 600. |
| `ssh-copy-id -i key.pub user@host` | Instalar pub en `authorized_keys` (700 `.ssh`, 600 fichero). |
| `ssh-agent` + `ssh-add ~/.ssh/lab` | Agente en memoria. `ssh-add -l` listar. |
| `/etc/ssh/sshd_config` (`PermitRootLogin no`, `PasswordAuthentication no`, `Port 2222`) + `systemctl reload sshd` | Endurecer. ¡Mantener sesión abierta al probar! |
| `gpg --gen-key` / `--list-keys` / `-e -r ana -o f.gpg f` / `-d f.gpg` / `-c` | Crear, cifrar asimétrico, descifrar, simétrico (`-c` pide pass). |
| `gpg --armor --export ana > pub.asc` / `--import` | Compartir/importar. `--verify`, `--detach-sign`. |

**5 trampas 110.3:**
1. Privada 600, `authorized_keys` 600, `.ssh` 700 o falla silencioso.
2. `PermitRootLogin prohibit-password` ≠ `no` (uno permite con llave).
3. Túnel `-L local:dest` expone en cliente; `-R` en servidor.
4. GPG `-e` usa pública destino; `-d` usa privada propia.
5. `ssh-agent` necesita `eval $(ssh-agent)` + `ssh-add`, no basta con crear llave.
