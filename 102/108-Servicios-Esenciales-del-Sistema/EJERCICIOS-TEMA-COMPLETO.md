# EJERCICIOS Tema 108 (12 labs VM)

**1. timedatectl**
Objetivo: estado. Pasos: `timedatectl status; timedatectl show | grep -i ntp`
Comprobación: `System clock synchronized: yes`. Solución: `timedatectl set-ntp true` (requiere systemd-timesyncd/chrony).

**2. chrony**
Objetivo: fuentes. Pasos: `chronyc sources -v 2>&1 | head -20; chronyc tracking 2>&1 | head -10; cat /etc/chrony.conf | grep -v '^#' | grep -v '^$' | head`
Comprobación: `^*` fuente elegida. Solución: `server pool.ntp.org iburst`.

**3. hwclock vs date**
Objetivo: RTC. Pasos: `date; date -u; sudo hwclock -r; sudo hwclock --verbose 2>&1 | head -5 || true`
Comprobación: difieren en segundos/zona. Solución: `hwclock -w` tras sync NTP.

**4. journalctl filtros**
Objetivo: journal. Pasos: `journalctl -b -p err --no-pager | head -20; journalctl -u sshd --no-pager --since "1 hour ago" | head -20; journalctl -f --no-pager & sleep 2; kill %1; journalctl --disk-usage`
Comprobación: filtra por boot/prioridad/unidad. Solución: `--since today -p warning`.

**5. Persistencia journal**
Objetivo: Storage. Pasos: `grep -i storage /etc/systemd/journald.conf; ls -ld /var/log/journal/ 2>/dev/null || echo "volátil"; sudo journalctl --flush 2>&1 | head -2`
Comprobación: `Storage=persistent` + dir existe. Solución: crear dir + `systemd-tmpfiles --create`.

**6. logger**
Objetivo: escribir log. Pasos: `logger -p user.info -t LAB108 "prueba108 $$"; journalctl --no-pager --since "2 min ago" -t LAB108; grep LAB108 /var/log/messages /var/log/syslog 2>/dev/null | tail -2 || true`
Comprobación: mensaje visible. Solución: facility.priority válidos.

**7. rsyslog reglas**
Objetivo: leer conf. Pasos: `grep -v '^#' /etc/rsyslog.conf | grep -v '^$' | head -20; ls /etc/rsyslog.d/; ls -lh /var/log/{messages,syslog,secure,auth.log} 2>/dev/null`
Comprobación: `authpriv.* /var/log/secure`. Solución: tras cambio `systemctl restart rsyslog`.

**8. logrotate**
Objetivo: rotación. Pasos: `cat /etc/logrotate.conf; cat /etc/logrotate.d/rsyslog 2>/dev/null | head -20; sudo logrotate -d /etc/logrotate.conf 2>&1 | head -30`
Comprobación: `-d` debug sin rotar. Solución: `-f` fuerza (cuidado disco).

**9. MTA: postfix base**
Objetivo: inspeccionar. Pasos: `which postfix sendmail exim 2>/dev/null; postconf -n 2>/dev/null | head -20 || echo "sin postfix"; cat /etc/aliases 2>/dev/null | head -10; mailq 2>&1 | head -5 || postqueue -p 2>&1 | head -5`
Comprobación: `myhostname, mydomain, relayhost`. Solución: tras editar aliases → `newaliases`.

**10. mail + forward**
Objetivo: enviar local. Pasos: `echo "cuerpo" | mail -s "test108" $USER 2>&1; mailq; echo "$USER@ejemplo.com" > /tmp/fwd-test; cat /tmp/fwd-test; rm /tmp/fwd-test`
Comprobación: cola vacía = entregado. Solución: `~/.forward` real solo en home propio, perms 644.

**11. CUPS listar**
Objetivo: impresión. Pasos: `lpstat -t 2>&1 | head -20; lpq -a 2>&1 | head; cat /etc/cups/cupsd.conf 2>/dev/null | grep -i listen | head; ss -ltn | grep 631 || echo "cups parado"`
Comprobación: `localhost:631`. Solución: `systemctl start cups`.

**12. Simular cola (sin impresora)**
Objetivo: PDF virtual. Pasos: `which lp lpr lpq; sudo lpadmin -p PDF108 -E -v file:///tmp/ -m everywhere 2>&1 | head -3 || echo "ok teoría"; lpstat -v 2>&1 | head`
Comprobación: entender `-p -E -v -m`. Solución: borrar con `lpadmin -x PDF108`.
