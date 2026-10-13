# EJERCICIOS Tema 109 (12 labs VM)

**1. CIDR mental + cálculo**
Objetivo: subredes. Pasos: `python3 -c "import ipaddress; n=ipaddress.ip_network('192.168.10.0/24'); print(n.network_address, n.broadcast_address, n.num_addresses-2)"; ipcalc 192.168.10.0/26 2>&1 | head -10 || python3 -c "import ipaddress; print(list(ipaddress.ip_network('192.168.10.0/26').hosts())[:3])"`
Comprobación: .0 red, .255 bcast, 254 hosts. Solución: /30=2, /29=6, /25=126.

**2. Clasificar IPs**
Objetivo: privadas. Pasos: `for ip in 10.1.2.3 172.20.5.4 172.32.0.1 192.168.0.5 8.8.8.8 127.0.0.1 169.254.10.20; do echo -n "$ip: "; python3 -c "import ipaddress; print(ipaddress.ip_address('$ip').is_private)"; done`
Comprobación: 172.32 NO es privada. Solución: 172.16-31 sí.

**3. Puertos y /etc/services**
Objetivo: mapear. Pasos: `grep -E '^(http|https|ssh|domain|ntp|smtp) ' /etc/services | head -10; getent services http https ssh domain`
Comprobación: 80/443/22/53. Solución: TCP vs UDP según servicio.

**4. nmcli**
Objetivo: ver conexiones. Pasos: `nmcli d status; nmcli c show | head -30; nmcli c show "Wired connection 1" 2>/dev/null | grep -E 'ipv4|DNS|GATEWAY' | head || nmcli -f NAME,UUID,TYPE c`
Comprobación: DEVICE+STATE. Solución: `nmcli c up <nombre>`.

**5. hostname**
Objetivo: persistente. Pasos: `hostnamectl status; cat /etc/hostname; cat /etc/hosts`
Comprobación: static+transient coinciden. Solución: `hostnamectl set-hostname lab109` (revertir después).

**6. nsswitch + resolv**
Objetivo: orden. Pasos: `grep hosts /etc/nsswitch.conf; cat /etc/resolv.conf; ls -l /etc/resolv.conf; resolvectl status 2>&1 | head -20 || systemd-resolve --status 2>&1 | head -20`
Comprobación: `files dns`, symlink a stub. Solución: no editar si es symlink NM.

**7. ip moderno**
Objetivo: ip. Pasos: `ip -br -4 a; ip r; ip -6 a 2>&1 | head -5; ip link show | head -10`
Comprobación: default via gateway. Solución: `ip r add default via X` (VM test, revertir).

**8. ss vs netstat**
Objetivo: escucha. Pasos: `ss -tulpn | head -20; netstat -tulpn 2>&1 | head -20 || echo "net-tools no instalado"; ss -tulpn | grep -E ':22|:80|:53'`
Comprobación: `-p` requiere sudo para todo. Solución: `sudo ss -tulpn`.

**9. ping + traceroute**
Objetivo: diagnóstico. Pasos: `ping -c3 127.0.0.1; ping -c3 8.8.8.8 2>&1 | tail -3 || ping -c3 $(ip r | awk '/default/ {print $3}' | head -1); traceroute -n 8.8.8.8 2>&1 | head -10 || tracepath 8.8.8.8 2>&1 | head -10`
Comprobación: 0% loss local. Solución: `* * *` = firewall, no caída.

**10. netcat**
Objetivo: test puerto. Pasos: `nc -vz 127.0.0.1 22 2>&1; (nc -l -p 18080 &>/tmp/nc.log & echo $! > /tmp/nc.pid; sleep 1; echo hola | nc -w2 127.0.0.1 18080 & sleep 1; kill $(cat /tmp/nc.pid) 2>/dev/null; cat /tmp/nc.log) || echo "variante ncat: ncat -l 18080"`
Comprobación: `succeeded` en 22. Solución: `-u` para UDP.

**11. dig/host**
Objetivo: DNS. Pasos: `dig +short ejemplo.com @1.1.1.1 2>&1 | head -5; dig -x 8.8.8.8 +short 2>&1 | head -2; host -t MX gmail.com 2>&1 | head -3; getent hosts localhost`
Comprobación: A + PTR + MX. Solución: `+trace` para delegación.

**12. Diagnóstico integral**
Objetivo: cadena completa. Pasos: `getent hosts google.com || echo "falla DNS"; ip r | grep default || echo "sin GW"; ping -c2 1.1.1.1 2>&1 | tail -2; resolvectl query google.com 2>&1 | head -5 || nslookup google.com 2>&1 | head -10`
Comprobación: aislar capa (GW→IP→DNS). Solución: orden `ip→ping IP→ping nombre→dig`.
