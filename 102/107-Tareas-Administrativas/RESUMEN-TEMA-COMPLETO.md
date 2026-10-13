# RESUMEN Tema 107 – Tareas Administrativas

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

## 107.2 Planificación (peso 4)

| Herramienta | Sintaxis |
|---|---|
| `crontab -e -l -r -u user` | `m h dom mon dow cmd` → `*/5 * * * * /opt/b.sh`. Sistema: `/etc/crontab` lleva usuario extra. |
| `/etc/cron.{hourly,daily,weekly,monthly}/`, `cron.allow/deny` | Jobs drop-in y control de acceso. |
| `at 14:30` / `atq` / `atrm N` / `batch` | Una vez. `Ctrl+D` para encolar. `batch` espera carga baja. |
| `systemd-run --on-calendar="*-*-* 02:00:00" --unit backup ...` | Transitorio. Timers persistentes: `foo.timer` + `foo.service`. |
| `systemctl list-timers --all` / `journalctl -u foo` | Ver timers y logs. |

**5 trampas 107.2:**
1. `crontab -r` borra ¡sin preguntar!
2. `%` en crontab = newline (escapar `\%`).
3. `atq` = `at -l`; `atrm` = `at -r`.
4. Timer necesita `WantedBy=timers.target` + `systemctl enable --now foo.timer`.
5. Entorno cron mínimo (PATH escueto, sin terminal) → usar rutas absolutas.

## 107.3 Locale y zona horaria (peso 3)

| Comando | Uso |
|---|---|
| `locale` / `locale -a` / `localectl status` | Ver / listar disponibles / ver systemd. |
| `localectl set-locale LANG=es_ES.UTF-8` | Persistente (`/etc/locale.conf`). |
| `LANG= LC_ALL= LC_TIME=` | `LC_ALL` sobrescribe todo (solo test, no permanente). |
| `timedatectl status` / `set-timezone Europe/Madrid` / `list-timezones` | Zona systemd (`/etc/localtime` symlink). |
| `TZ=America/Lima date` | Probar zona puntual. |
| `date -u` / `date -s` / `date +%F_%T` | UTC / fijar (¡VM!) / formato. |
| `iconv -f ISO-8859-1 -t UTF-8 f.txt -o out` / `iconv -l` | Convertir codificación / listar. |
| `file -i f.txt` | Detectar charset aproximado. |

**5 trampas 107.3:**
1. `LC_ALL` tiene prioridad máxima, enmascara `LANG`.
2. UTF-8 no es automático: necesita `LANG=*.UTF-8` + glibc-langpack.
3. `/etc/localtime` es enlace, no texto.
4. `iconv -f` = origen, `-t` = destino (orden importa).
5. `timedatectl set-timezone` requiere nombre exacto de `list-timezones`.
