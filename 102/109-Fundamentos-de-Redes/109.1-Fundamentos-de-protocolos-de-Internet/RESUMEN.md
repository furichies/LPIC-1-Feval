# 109.1 Fundamentos de protocolos de Internet — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
