# 109.2 Configuración de red persistente — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 109.2 Red persistente (peso 4)

| Herramienta | Uso |
|---|---|
| `nmcli d status` / `c show` / `con add type ethernet ifname eth0 con-name casa ipv4.addresses 192.168.1.10/24 ipv4.gateway ... ipv4.dns ...` | NetworkManager CLI (RHEL/Ubuntu). `nmcli c up casa`. |
| `hostnamectl set-hostname srv1` | Host persistente (`/etc/hostname`). Transitorio: `hostname srv1`. |
| `/etc/hosts` (`127.0.0.1 localhost`, `192.168.1.10 srv1`) | Resolución local previa a DNS. |
| `/etc/resolv.conf` (`nameserver 1.1.1.1`, `search ej.com`) | Sobrescrito por NM/systemd-resolved (no editar a mano si es symlink). |
| `/etc/nsswitch.conf` (`hosts: files dns`) | Orden: files→`/etc/hosts` luego DNS. |

**5 trampas 109.2:**
1. `resolv.conf` autogenerado: editar conexión NM, no el fichero.
2. `nsswitch hosts: files dns` → hosts gana a DNS.
3. `hostnamectl` persistente vs `hostname` temporal.
4. NM necesita `autoconnect yes` o no levanta al boot.
5. `127.0.1.1` en Debian para hostname local (no borrar).
