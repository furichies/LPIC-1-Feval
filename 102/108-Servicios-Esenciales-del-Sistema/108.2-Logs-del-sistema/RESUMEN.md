# 108.2 Registros del sistema — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
