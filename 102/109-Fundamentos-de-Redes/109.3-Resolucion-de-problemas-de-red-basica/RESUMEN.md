# 109.3 Resolución de problemas de red — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
