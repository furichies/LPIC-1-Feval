# EJERCICIOS Tema 110 (11 labs VM, solo localhost)

> Aviso: nmap/su/sudo solo contra tu VM y con permiso. No escanear redes ajenas.

**1. Buscar SUID/SGID**
Objetivo: auditoría. Pasos: `find /usr/bin -perm -4000 -type f 2>/dev/null | head -10; find / -perm /6000 -type f 2>/dev/null | head -10; ls -l /usr/bin/passwd /usr/bin/sudo`
Comprobación: `rws` en owner. Solución: `-perm -4000` exacto SUID.

**2. Sticky bit**
Objetivo: /tmp. Pasos: `ls -ld /tmp /var/tmp; find /tmp -maxdepth 0 -perm -1000 && echo "sticky ok"`
Comprobación: `drwxrwxrwt`. Solución: `chmod +t /dir`.

**3. passwd/shadow**
Objetivo: leer seguro. Pasos: `sudo grep $USER /etc/shadow | awk -F: '{print $1" "$2}' | cut -c1-30; sudo passwd -S $USER; ls -l /etc/shadow /etc/passwd`
Comprobación: 640 vs 644, `!`/`*` = bloqueado. Solución: `pwck -r` solo lectura.

**4. sudo**
Objetivo: privilegios. Pasos: `sudo -l; visudo -c; ls /etc/sudoers.d/; groups`
Comprobación: qué puedes correr sin pass. Solución: añadir `user ALL=(ALL) /usr/bin/systemctl status *` en `visudo`.

**5. su vs sudo**
Objetivo: entorno. Pasos: `echo $PATH; su -c 'echo $PATH' $USER 2>&1 | head -1; sudo -i env 2>&1 | grep PATH | head -1 || sudo env | grep PATH`
Comprobación: `su -` resetea, `su` hereda. Solución: `su -` para simular login.

**6. ulimit**
Objetivo: límites. Pasos: `ulimit -a | head -15; ulimit -Sn; ulimit -Hn; grep -v '^#' /etc/security/limits.conf | grep -v '^$' | head -5`
Comprobación: soft ≤ hard. Solución: persistente en limits.conf + re-login.

**7. who/w/last**
Objetivo: sesiones. Pasos: `who; w | head -10; last -5; lastb -5 2>&1 | head -5 || sudo lastb -5 | head -5`
Comprobación: wtmp vs btmp. Solución: `last -f /var/log/wtmp.1`.

**8. lsof/fuser**
Objetivo: quién usa. Pasos: `sudo lsof -i :22 2>&1 | head -10; sudo lsof -u $USER 2>&1 | head -5; fuser -v /tmp 2>&1 | head -5; ss -tulpn | grep :22`
Comprobación: PID sshd. Solución: `fuser -k` solo en lab (mata).

**9. nmap localhost**
Objetivo: escaneo local. Pasos: `sudo ss -tlnp | head; nmap -F 127.0.0.1 2>&1 | head -20 || echo "instala nmap en VM"`
Comprobación: correlacionar ss↔nmap. Solución: `-sV` versiones, `-O` OS (root).

**10. SSH keys**
Objetivo: llave ed25519. Pasos: `ssh-keygen -t ed25519 -f /tmp/lab110 -N "" -C "lab110"; ls -l /tmp/lab110*; cat /tmp/lab110.pub; ssh-copy-id -i /tmp/lab110.pub -o StrictHostKeyChecking=no $USER@localhost 2>&1 | head -3 || echo "sshd puede estar parado"; ssh -i /tmp/lab110 -o BatchMode=yes $USER@localhost true && echo "login con llave OK" || echo "revisar authorized_keys 600"; rm /tmp/lab110*`
Comprobación: 600 privada, 644 pública. Solución: `.ssh` 700, `authorized_keys` 600.

**11. GPG**
Objetivo: cifrar. Pasos: `gpg --gen-key --batch --passphrase '' --quick-gen-key lab110@local 2>&1 | tail -2 || gpg --gen-key; echo secreto110 > /tmp/s.txt; gpg --batch --yes -e -r lab110@local -o /tmp/s.gpg /tmp/s.txt; gpg -d /tmp/s.gpg; gpg --armor --export lab110@local | head -5; rm /tmp/s.txt /tmp/s.gpg`
Comprobación: descifra igual. Solución: `-c` simétrico con passphrase si no hay anillo.
