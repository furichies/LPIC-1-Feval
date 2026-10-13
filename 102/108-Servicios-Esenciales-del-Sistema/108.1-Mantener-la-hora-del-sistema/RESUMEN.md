# 108.1 Mantener la hora del sistema — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
