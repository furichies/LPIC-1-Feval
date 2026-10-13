# 102.5 Gestión de paquetes RPM y YUM — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

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
