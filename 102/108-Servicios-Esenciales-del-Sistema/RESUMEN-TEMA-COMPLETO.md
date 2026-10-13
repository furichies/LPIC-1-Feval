# RESUMEN Tema 108 – Servicios del Sistema

## 108.1 Hora / NTP (peso 3)

| Comando | Uso |
|---|---|
| `timedatectl status` / `set-ntp true` | Ver sync, activar NTP systemd. |
| `chronyc sources -v` / `tracking` / `makestep` | Ver fuentes, deriva, forzar salto (chrony, RHEL/Ubuntu actual). |
| `chronyd` + `/etc/chrony.conf` (`server pool.ntp.org iburst`) | Servicio y config moderna. |
| `ntpd` + `/etc/ntp.conf` (clásico) | `ntpq -p` muestra peers. En desuso frente a chrony. |
| `hwclock -r` / `-w` / `-s` | Leer RTC / guardar sist→RTC / leer RTC→sist. |
| `date -u` / `date -s "2026-01-01 12:00"` | UTC / fijar (VM). |
| `timedatectl set-timezone` | Zona (ver 107.3). |

**5 trampas 108.1:**
1. chrony vs ntpd: no mezclar ficheros (`chrony.conf` ≠ `ntp.conf`).
2. `pool.ntp.org` necesita `iburst` para sync rápido.
3. `hwclock` = hardware (RTC), `date` = sistema (kernel).
4. Estratos: 0=atómico, 1=directo... mayor nº = peor.
5. VM: NTP + guest-tools pelean; dejar uno.

## 108.2 Logs (peso 4)

| Herramienta | Clave |
|---|---|
| `journalctl -b -p err -u sshd -f --since today` | Filtros journald. `-b` boot actual, `-p` prioridad, `-f` follow. Persistencia: `/etc/systemd/journald.conf` `Storage=persistent` → `/var/log/journal/`. |
| `logger -p authpriv.info -t MILAB "hola"` | Escribir a syslog a mano. |
| rsyslog `/etc/rsyslog.conf` + `/etc/rsyslog.d/*.conf` | Reglas `facility.priority destino`: `authpriv.* /var/log/secure`, `*.emerg :omusrmsg:*`. |
| `logrotate` `/etc/logrotate.conf` + `/etc/logrotate.d/` | `weekly rotate 4 compress create`. Forzar: `logrotate -d` (debug) / `-f` (forzar). |
| `/var/log/{messages,syslog,auth.log,secure,kern.log}` | RHEL=messages+secure, Debian=syslog+auth.log. |

**5 trampas 108.2:**
1. `journalctl` sin persistencia pierde logs al reiniciar.
2. Prioridades syslog: emerg alert crit err warning notice info debug.
3. `logger -p` requiere facility.priority válidos.
4. logrotate se ejecuta vía cron/systemd, no demonio propio.
5. `*.emerg` con `:omusrmsg:*` va a todos los logueados (wall).

## 108.3 MTA básico (peso 3)

| Comando | Uso |
|---|---|
| `postfix`: `postconf -n`, `postalias`, `newaliases` | Ver config no-defecto, regenerar alias. Config `/etc/postfix/main.cf`, `/etc/aliases`. |
| `sendmail`, `exim` | MTAs alternativos (sendmail clásico, exim en Debian). |
| `mail -s "T" ana@dominio < msg` / `mailq` / `sendmail -bv` | Enviar / ver cola / verificar entrega. |
| `~/.forward` | Reenvío personal (`ana@otro.com`, `\|/script`). |
| Puertos 25 (SMTP), 587 (submission), 465 (SMTPS) | Saber distinguir. |

**5 trampas 108.3:**
1. Tras editar `/etc/aliases` → `newaliases` obligatorio.
2. `~/.forward` con permisos laxos se ignora.
3. `mailq` = `sendmail -bp` = cola postfix (`postqueue -p`).
4. MTA ≠ MUA: postfix envía, `mail/mutt` leen.
5. Open relay = fallo típico; `mynetworks` restringe.

## 108.4 CUPS (peso 2)

| Comando | Uso |
|---|---|
| `lpadmin -p HP -E -v usb:/... -m everywhere` | Añadir cola. `-x` borra, `-d` defecto. |
| `lpr -P HP fich.pdf` / `lp -d HP fich` | Imprimir (lpr BSD, lp SystemV). |
| `lpq -a` / `lpstat -t` | Ver colas. |
| `lprm -P HP 123` / `cancel 123` | Borrar trabajo. |
| `cupsaccept/reject`, `cupsenable/disable` | Aceptar trabajos vs activar impresión. |
| `/etc/cups/{cupsd.conf,printers.conf}` + `localhost:631` | Config + web admin. |

**5 trampas 108.4:**
1. `reject` ≠ `disable`: uno rechaza cola, otro pausa impresora.
2. `lprm` necesita `-P` o `PRINTER` si no hay defecto.
3. CUPS escucha 631/tcp.
4. `lpadmin` requiere root o grupo `lpadmin`.
5. Driver `everywhere` = IPP sin driver (moderno).
