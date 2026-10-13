# Tema 102 – RESUMEN

Contenido original. Objetivos oficiales: https://learning.lpi.org/es/learning-materials/101-500/

## 102.1 Diseño de particionado (w=2)
### Conceptos
- `/` raíz obligatoria; `/boot` con kernel (respeta límites BIOS: ideal al inicio del disco, 500M-1G); `/home` datos usuario; `/var` logs/colas (crece, sepárala en servidores); `swap` (RAM≤2G: swap≈RAM; RAM grande: 2-4G o zram); ESP FAT32 `/boot/efi` (~100-512M, flag boot/esp) solo UEFI.
- Puntos de montaje + LVM básico: PV → VG → LV, permite redimensionar. No pide crear LVM en examen, solo conceptos.
### Ficheros: `/etc/fstab`, salida de `lsblk`, `blkid`.
### 5 trampas
1. `/boot` debe ser legible por el firmware: no la pongas en LVM/RAID exótico en BIOS.
2. ESP es FAT32 y va en GPT con flag esp, no ext4.
3. `/var` separada evita que logs llenen `/`.
4. swap no es un filesystem, es área de intercambio (`mkswap`+`swapon`, ver Tema 104).
5. LVM: el orden es disco→PV→VG→LV, no al revés.

## 102.2 Gestor de arranque GRUB (w=2)
### Conceptos
- GRUB Legacy (0.9x): `menu.lst` / `grub.conf`. GRUB2: `grub.cfg` (NO editar a mano, se genera).
- MBR: primeros 512B (446B código + tabla particiones). GPT+UEFI usa ESP.
### Tabla
| Comando / fichero | Uso |
|---|---|
| `grub-install /dev/sda` | instala en MBR o ESP (disco, no partición `sda1`) |
| `grub-mkconfig -o /boot/grub/grub.cfg` | regenera config (lee `/etc/default/grub` + `/etc/grub.d/`) |
| `/etc/default/grub` | `GRUB_TIMEOUT`, `GRUB_DEFAULT`, `GRUB_CMDLINE_LINUX` |
| `menu.lst`, `grub.conf`, `grub.cfg` | saber a qué versión pertenecen |
### 5 trampas
1. `grub-install` va al disco (`/dev/sda`), nunca a `/dev/sda1`.
2. No edites `grub.cfg` directamente: se sobrescribe; edita `/etc/default/grub` y regenera.
3. `menu.lst` = Legacy; `grub.cfg` = GRUB2.
4. Tras cambiar `/etc/default/grub` hay que ejecutar `grub-mkconfig`.
5. MBR ≠ partición boot: MBR es el sector 0 del disco.

## 102.3 Librerías compartidas (w=1)
### Tabla
| Comando / fichero | Uso |
|---|---|
| `ldd /bin/ls` | muestra librerías que necesita un binario (`not found` = falta) |
| `ldconfig` | regenera caché `/etc/ld.so.cache` (ejecutar tras añadir lib) |
| `/etc/ld.so.conf` + `/etc/ld.so.conf.d/*.conf` | rutas permanentes de librerías |
| `LD_LIBRARY_PATH` | ruta temporal por variable (precedencia alta, solo test, no permanente) |
| `ldconfig -p` | lista caché |
### 5 trampas
1. `ldd` es diagnóstico; `ldconfig` es acción (actualiza caché).
2. Editar `ld.so.conf` sin `ldconfig` no tiene efecto.
3. `LD_LIBRARY_PATH` no persiste: para permanente usa `ld.so.conf.d/`.
4. `ldd` sobre script muestra "not a dynamic executable".
5. La caché real es `/etc/ld.so.cache`, no el `.conf`.

## 102.4 Debian: dpkg / apt-get / apt-cache (w=3)
### Tabla
| Comando | Uso |
|---|---|
| `dpkg -i pkg.deb` | instala .deb local (no resuelve dependencias) |
| `dpkg -r pkg` / `-P` | elimina / purga (borra configs) |
| `dpkg -l [patrón]` / `-s pkg` / `-L pkg` / `-S /ruta/fich` | lista / estado / ficheros del paquete / qué paquete provee un fichero |
| `dpkg-reconfigure pkg` | reconfigura paquete instalado |
| `apt-get update` | refresca índices (siempre antes de install) |
| `apt-get install -y pkg` / `remove` / `purge` / `upgrade` / `dist-upgrade` / `autoremove` | gestión con dependencias |
| `apt-cache search|show|depends|policy pkg` | buscar / info / dependencias / versiones |
| `/etc/apt/sources.list` + `/etc/apt/sources.list.d/` | repos (`deb ... distribution component`) |
### 5 trampas
1. `dpkg -i` no resuelve dependencias → luego `apt-get install -f`.
2. `remove` conserva configs; `purge` las borra.
3. `apt-get update` ≠ `upgrade`: el primero actualiza listas.
4. `dpkg -S` (mayúscula) busca por fichero; `dpkg -s` (minúscula) estado del paquete.
5. `apt-cache` solo consulta, no instala.

## 102.5 RPM / YUM / Zypper (w=3)
### Tabla
| Comando | Uso |
|---|---|
| `rpm -i pkg.rpm` / `-U` / `-F` / `-e` | instala / actualiza-instala / actualiza-solo-si-existe / borra |
| `rpm -q pkg` / `-qa` / `-qi` / `-ql` / `-qf /ruta` / `-qp pkg.rpm` / `-K` | consulta instalado / todos / info / ficheros / a quién pertenece un fichero / info de .rpm sin instalar / verifica firma |
| `rpm -V pkg` | verifica integridad |
| `rpm2cpio pkg.rpm \| cpio -idmv` | extrae .rpm sin instalar (rescate) |
| `yum install|remove|update|search|info|provides */fichero|repolist|check-update` | gestión con dependencias (RHEL/CentOS) |
| `zypper install|remove|update|search|info|refresh|repos` | equivalente openSUSE |
| `/etc/yum.conf`, `/etc/yum.repos.d/*.repo`, `/etc/zypp/` | configs y repos |
| `dnf` | sucesor de yum (solo awareness en v5.0) |
### 5 trampas
1. `rpm -U` vs `-F`: `-F` (freshen) solo actualiza si ya instalado.
2. `rpm -qf` (fichero→paquete) vs `-ql` (paquete→ficheros).
3. `rpm` no resuelve dependencias; `yum/zypper` sí.
4. `rpm2cpio` + `cpio -idmv`: ojo a la `d` (crea dirs) y ejecutar en dir temporal.
5. `yum provides` / `dnf provides` localiza qué paquete trae un fichero no instalado.

## 102.6 Linux como invitado virtual / contenedor (w=1)
### Conceptos
- VM = hardware virtual (KVM, VirtualBox); contenedor = kernel compartido (Docker/Podman: app container; LXC/systemd-nspawn: Linux container); IaaS: instancia + block storage + red virtual.
- Clonar/template: cambiar SSH host keys (`/etc/ssh/ssh_host_*`), machine-id D-Bus (`/etc/machine-id`, `/var/lib/dbus/machine-id`), hostname, IP, cloud-init limpia.
- `cloud-init`: configura instancia en primer arranque (usuario, claves, red). Guest drivers/agents (virtio, open-vm-tools, qemu-guest-agent).
### Tabla
| Término | Clave examen |
|---|---|
| SSH host keys | regenerar al clonar: `rm /etc/ssh/ssh_host_*; ssh-keygen -A` o `dpkg-reconfigure openssh-server` |
| D-Bus machine id | debe ser único: `truncate -s0 /etc/machine-id; systemd-machine-id-setup` |
| cloud-init | `cloud-init clean`, `/etc/cloud/` |
### 5 trampas
1. Clonar sin cambiar machine-id y SSH keys = hosts idénticos (fallo seguridad/red).
2. Contenedor app ≠ VM: comparten kernel, no llevan kernel propio.
3. `cloud-init` actúa en provisioning, no es un hipervisor.
4. Guest drivers son del invitado, no del host.
5. Block storage en cloud es persistente separado de la instancia efímera.
