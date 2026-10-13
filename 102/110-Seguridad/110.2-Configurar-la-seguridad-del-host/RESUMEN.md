# 110.2 Seguridad del host — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
