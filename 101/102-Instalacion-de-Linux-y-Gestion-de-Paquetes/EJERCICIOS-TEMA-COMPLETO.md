# Tema 102 – EJERCICIOS

> Solo VM/contenedor desechable. Nada destructivo en host. Usa snapshot antes de tocar GRUB o paquetes.

## Lab 1 – Diseñar particionado (102.1)
- **Objetivo/Pasos:** dibuja en papel y verifica con `lsblk -f` y `df -h` tu VM. Anota `/`, `/boot` (o `/boot/efi`), `/home`, `/var`, swap (`swapon --show`).
- **Comprobación:** `lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT`.
- **Solución esperada:** identificas qué montaje llenaría `/` si `/var/log` crece.

## Lab 2 – ESP y UEFI (102.1)
- **Objetivo/Pasos:** 1. `ls /sys/firmware/efi && echo UEFI || echo BIOS` 2. `lsblk | grep -i efi; mount | grep efi` 3. `sudo parted -l 2>/dev/null | head -30 || sudo fdisk -l | head -30`.
- **Comprobación:** distingues tabla GPT vs MBR.
- **Solución esperada:** en UEFI verás partición vfat en `/boot/efi`.

## Lab 3 – GRUB2: inspección segura (102.2)
- **Objetivo/Pasos:** 1. `ls /boot/grub/grub.cfg /etc/default/grub /etc/grub.d/` 2. `grep -E "TIMEOUT|DEFAULT" /etc/default/grub` 3. `grub-mkconfig --help | head -5` (no regeneres aún).
- **Comprobación:** sabes qué fichero se edita y cuál se genera.
- **Solución esperada:** editar `/etc/default/grub`, generar con `grub-mkconfig -o /boot/grub/grub.cfg`.

## Lab 4 – GRUB2: cambiar timeout en VM con snapshot (102.2)
- **Objetivo/Pasos:** 1. Snapshot. 2. `sudo cp /etc/default/grub /etc/default/grub.bak` 3. Cambia `GRUB_TIMEOUT=5` a `10` 4. `sudo grub-mkconfig -o /boot/grub/grub.cfg` 5. `grep timeout /boot/grub/grub.cfg | head -3`.
- **Comprobación:** el cambio aparece en `grub.cfg`.
- **Solución esperada:** nunca edites `grub.cfg` a mano. Revierte con el `.bak` si hace falta.

## Lab 5 – Librerías: ldd + ldconfig (102.3)
- **Objetivo/Pasos:** 1. `ldd /bin/ls | head` 2. `ldd /bin/ls | grep "not found" || echo OK` 3. `cat /etc/ld.so.conf; ls /etc/ld.so.conf.d/` 4. `ldconfig -p | head -10` 5. `LD_LIBRARY_PATH=/tmp ldd /bin/ls | head -3` (prueba inocua).
- **Comprobación:** diferencias diagnóstico (`ldd`) vs actualización (`ldconfig`).
- **Solución esperada:** tras añadir un `.conf` habría que correr `sudo ldconfig`.

## Lab 6 – Debian: consulta (102.4)
- **Objetivo/Pasos:** 1. `cat /etc/apt/sources.list; ls /etc/apt/sources.list.d/` 2. `apt-cache policy bash` 3. `apt-cache depends bash | head` 4. `dpkg -s bash | grep -E "Status|Version"` 5. `dpkg -L bash | head` 6. `dpkg -S /bin/ls`.
- **Comprobación:** `policy` muestra instalado vs candidato.
- **Solución esperada:** `dpkg -S` resuelve fichero→paquete (`coreutils` para `/bin/ls`).

## Lab 7 – Debian: instalar y purgar (VM) (102.4)
- **Objetivo/Pasos:** 1. `sudo apt-get update` 2. `sudo apt-get install -y tree` 3. `tree --version; dpkg -l tree` 4. `sudo apt-get remove tree && dpkg -l tree` (verás `rc`) 5. `sudo apt-get purge tree || sudo dpkg -P tree`.
- **Comprobación:** `rc` = removed pero con configs.
- **Solución esperada:** `purge` deja estado `un`/`ii` limpio.

## Lab 8 – RPM: consulta sin root (102.5)
- **Objetivo/Pasos (en contenedor Fedora/Rocky o VM):** 1. `rpm -qa | head` 2. `rpm -qi bash | head -15` 3. `rpm -ql bash | head` 4. `rpm -qf /bin/ls` 5. `rpm -K --help | head -5`.
- **Comprobación:** dominas `-q*` sin instalar nada.
- **Solución esperada:** `-qf` inverso a `-ql`.

## Lab 9 – rpm2cpio rescate (102.5)
- **Objetivo/Pasos:** 1. `mkdir -p /tmp/rpmtest && cd /tmp/rpmtest` 2. Descarga un rpm pequeño (en Fedora: `dnf download --downloaddir=/tmp/rpmtest hello 2>/dev/null || yumdownloader hello 2>/dev/null || echo "usa cualquier .rpm local"`) 3. `rpm2cpio *.rpm | cpio -idmv 2>&1 | head` 4. `find . -type f | head`.
- **Comprobación:** extraes sin instalar.
- **Solución esperada:** árbol `./usr/...` bajo `/tmp/rpmtest`. Borra el dir al terminar.

## Lab 10 – yum/zypper/dnf (102.5)
- **Objetivo/Pasos:** 1. `yum --help | head -5 || dnf --help | head -5` 2. `yum repolist 2>/dev/null || dnf repolist` 3. `yum search tree 2>/dev/null | head || dnf search tree | head` 4. `yum provides "*/tree" 2>/dev/null | head` 5. En openSUSE si disponible: `zypper repos; zypper search -s tree | head`.
- **Comprobación:** sabes qué comando lista repos y cuál busca por fichero.
- **Solución esperada:** `provides` para ficheros; `repolist`/`repos` para repos.

## Lab 11 – Invitado virtual: machine-id y SSH keys (102.6, solo lectura)
- **Objetivo/Pasos:** 1. `cat /etc/machine-id; cat /var/lib/dbus/machine-id 2>/dev/null` 2. `ls -l /etc/ssh/ssh_host_*` 3. `cat /etc/cloud/cloud.cfg 2>/dev/null | head || echo "sin cloud-init"` 4. Documenta (sin ejecutar) el procedimiento de clonado: `cloud-init clean`, regenerar machine-id y `ssh-keygen -A`.
- **Comprobación:** entiendes qué debe ser único por instancia.
- **Solución esperada:** NO borres `machine-id` ni keys en tu VM de estudio; solo anota el procedimiento.

## Lab 12 – Mini-test estilo LPI
1. ¿`grub-install` a disco o partición? 2. ¿Edito `grub.cfg` o `/etc/default/grub`? 3. Tras añadir ruta en `/etc/ld.so.conf.d/`, ¿qué comando? 4. `dpkg -r` vs `dpkg -P`? 5. `rpm -U` vs `rpm -F`? 6. Al clonar, ¿qué dos IDs regeneras?
- **Solución:** 1) disco. 2) default+mkconfig. 3) `ldconfig`. 4) remove vs purge. 5) -U instala/actualiza, -F solo si existe. 6) machine-id + SSH host keys.
