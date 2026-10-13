# EJERCICIOS Tema 107 (12 labs VM)

**1. Crear usuario completo**
Objetivo: useradd. Pasos: `sudo useradd -m -s /bin/bash -c "Ana Lab" -G users ana107; sudo passwd ana107; id ana107; getent passwd ana107`
Comprobación: home existe, shell bash. Solución: `-m` clave; verificar `/etc/passwd`.

**2. Grupos sin expulsar**
Objetivo: -aG. Pasos: `sudo groupadd dev107; sudo usermod -aG dev107 ana107; id ana107; groups ana107`
Comprobación: conserva grupos previos. Solución: sin `-a` los pierde.

**3. Bloquear/desbloquear**
Objetivo: passwd/usermod. Pasos: `sudo passwd -l ana107; sudo passwd -S ana107; sudo passwd -u ana107; sudo chage -l ana107`
Comprobación: `L` luego `P`. Solución: `-e` fuerza cambio.

**4. Envejecimiento**
Objetivo: chage. Pasos: `sudo chage -M 90 -m 1 -W 7 ana107; sudo chage -l ana107; sudo chage -E 2027-12-31 ana107`
Comprobación: Max 90, warn 7. Solución: `-E -1` quita caducidad.

**5. getent vs cat**
Objetivo: NSS. Pasos: `getent passwd ana107; getent group dev107; grep ana107 /etc/passwd`
Comprobación: misma info + LDAP-ready. Solución: preferir getent en scripts.

**6. Limpieza**
Objetivo: userdel. Pasos: `sudo userdel -r ana107; sudo groupdel dev107; ls /home/ | grep ana107 || echo "borrado ok"`
Comprobación: no restos. Solución: sin `-r` deja home.

**7. Cron usuario**
Objetivo: crontab. Pasos: `crontab -l; (crontab -l 2>/dev/null; echo "*/5 * * * * echo \$(date) >> /tmp/cron107.log") | crontab -; crontab -l; sleep 5; cat /tmp/cron107.log 2>/dev/null || echo "espera al min 5"; crontab -r; crontab -l || echo "limpio"`
Comprobación: línea instalada luego borrada. Solución: usar rutas absolutas `/usr/bin/date`.

**8. Cron sistema + allow/deny**
Objetivo: control. Pasos: `ls /etc/cron.* /etc/crontab; cat /etc/crontab; ls /etc/cron.allow /etc/cron.deny 2>/dev/null || echo "sin restricciones"`
Comprobación: formato sistema con usuario. Solución: allow gana a deny.

**9. at una vez**
Objetivo: at. Pasos: `systemctl is-active atd cron 2>/dev/null; echo 'echo hola-at >> /tmp/at107.log' | at now + 1 minute; atq; sleep 65; cat /tmp/at107.log; atrm $(atq | awk '{print $1}' | head -1) 2>/dev/null || true`
Comprobación: log aparece. Solución: `batch` si carga alta.

**10. systemd timer**
Objetivo: timer. Pasos: `systemctl list-timers --all | head -10; cat /lib/systemd/system/logrotate.timer 2>/dev/null | head -20 || cat /usr/lib/systemd/system/*.timer 2>/dev/null | head -20`
Comprobación: `OnCalendar`. Solución: crear `.timer+.service` propio en `/etc/systemd/system/`, `daemon-reload + enable --now *.timer`.

**11. Locale**
Objetivo: i18n. Pasos: `locale; locale -a | grep -i es | head; localectl status; LANG=C date; LC_ALL=es_ES.UTF-8 date 2>&1 | head -1 || true`
Comprobación: LC_ALL sobrescribe. Solución: persistente `localectl set-locale LANG=es_ES.UTF-8`.

**12. Timezone + iconv**
Objetivo: TZ. Pasos: `timedatectl list-timezones | grep -E 'Madrid|Mexico|Lima'; TZ=America/Lima date; TZ=Europe/Madrid date; printf 'caf\xe9\n' > /tmp/latin.txt; iconv -f ISO-8859-1 -t UTF-8 /tmp/latin.txt; file -i /tmp/latin.txt`
Comprobación: horas difieren, conversión ok. Solución: `timedatectl set-timezone Europe/Madrid` persistente.
