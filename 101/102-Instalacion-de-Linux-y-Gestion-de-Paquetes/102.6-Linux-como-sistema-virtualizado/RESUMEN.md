# 102.6 Linux como sistema virtualizado — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

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
