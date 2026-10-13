# RESUMEN Tema 109 – Redes

## 109.1 Protocolos (peso 4)

| Concepto | Examen |
|---|---|
| CIDR `/24`=256, `/16`=65536, `/8`=16M. Fórmula hosts=2^(32-prefijo)-2 | `/24`→254 útiles, `/25`→126, `/26`→62, `/30`→2 (enlaces). |
| Privadas RFC1918: `10/8, 172.16/12, 192.168/16`. Loopback `127/8`, link-local `169.254/16` | Públicas = resto enrutables. |
| TCP (20,22,25,53,80,110,143,443,3306) vs UDP (53,67/68,69,123,161) + ICMP (ping/traceroute) | `/etc/services` mapea nombre↔puerto. |
| IPv6: `::1` loopback, `fe80::/10` link-local, `::/0` defecto. Abreviar `::` una vez | `::ffff:192.0.2.1` mapeada. |
| Máscaras: `/24`=255.255.255.0, `/16`=255.255.0.0 | Broadcast = última dir red. |

**5 trampas 109.1:**
1. `192.168.1.0/24`: .0 red, .255 broadcast, no asignables.
2. TCP orientado (handshake), UDP no; DNS usa ambos (53/udp+tcp).
3. ICMP no tiene puertos (ping usa echo type 8/0).
4. `172.16.0.0/12` va hasta 172.31.255.255, no 172.32.
5. IPv6 `::` solo una vez por dirección.

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

## 109.3 Troubleshooting (peso 4)

| Comando | Ejemplo |
|---|---|
| `ip a` / `ip r` / `ip link set eth0 up` | Sustituto moderno de `ifconfig/route`. `ip -4 -br a`. |
| `ss -tulpn` | `netstat -tulpn` moderno: `-t`tcp `-u`udp `-l`listen `-p`proceso `-n`numérico. |
| `ping -c4 8.8.8.8` / `ping6 ::1` | `-c` contar, `-W` timeout. |
| `traceroute -n -T` / `tracepath` / `mtr` | Ruta. `-n` sin DNS más rápido. UDP por defecto, `-T` TCP, `-I` ICMP. |
| `nc -vz host 80` / `nc -l -p 8080` | Test puerto / escucha. `-u` UDP. |
| `ifconfig, netstat, route` | Obsoletos (net-tools) pero preguntados. |

**5 trampas 109.3:**
1. `ss -tulpn` sin `-n` resuelve lento y oculta puertos.
2. `ping` OK + `curl` KO = firewall/DNS de capa alta, no L3.
3. `ip r` sin default = sin gateway.
4. `nc -l` necesita `-p` en netcat-openbsd vs `-l 8080` en ncat.
5. `traceroute` bloqueado por firewall ≠ host caído (`* * *`).

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
