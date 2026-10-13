# 109.4 DNS del lado del cliente — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 109.4 DNS cliente (peso 2)

| Comando | Uso |
|---|---|
| `dig @1.1.1.1 ej.com A +short` / `dig -x 8.8.8.8` | Consulta directa / inversa PTR. `+trace` delegación. |
| `host ej.com` / `host -t MX ej.com` | Simple. `-t` tipo. |
| `getent hosts ej.com` | Vía NSS (respeta nsswitch, ideal test real). |
| `systemd-resolve --status` / `resolvectl status/query` | systemd-resolved moderno. |
| `/etc/resolv.conf`, `/etc/hosts`, `/etc/nsswitch.conf` | Triada cliente (ver 109.2). |

**5 trampas 109.4:**
1. `dig` ignora nsswitch (va directo a DNS); `getent` no.
2. Sin `.` final en zona = relativo (BIND añade origen).
3. `resolv.conf` max 3 nameserver útiles.
4. `NXDOMAIN` = no existe; `SERVFAIL` = servidor roto; `NOERROR` vacío = existe pero sin ese tipo.
5. `systemd-resolved` stub `127.0.0.53` – no ponerlo como upstream real.
