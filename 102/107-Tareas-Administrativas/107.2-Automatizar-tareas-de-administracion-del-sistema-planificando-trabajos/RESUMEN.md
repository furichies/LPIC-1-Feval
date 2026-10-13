# 107.2 Planificar trabajos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
