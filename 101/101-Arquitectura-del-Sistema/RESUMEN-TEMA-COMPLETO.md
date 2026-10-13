# Tema 101 – RESUMEN (Arquitectura del Sistema)

Contenido original. Referencia de objetivos: https://learning.lpi.org/es/learning-materials/101-500/

## 101.1 Hardware: /sys /proc /dev, modprobe, lsmod, lspci, lsusb (w=2)

### Conceptos
- `/proc`: pseudo-FS del kernel, info en tiempo real (CPU, mem, interrupciones). Volátil.
- `/sys`: sysfs, visión estructurada del hardware/driver (udev la usa). Ej: `/sys/block/sda/size`.
- `/dev`: nodos de dispositivo gestionados por `udev`. Ej: `/dev/sda`, `/dev/tty0`.
- `udev` crea reglas dinámicas; `D-Bus` notifica eventos hardware.
- Almacenamiento: SATA/SAS/NVMe (PCIe, más rápido), USB, MMC. `lsblk` complementa pero no entra en este objetivo.

### Tabla comandos
| Comando | Uso clave | Opciones examen |
|---------|-----------|-----------------|
| `lspci` | lista PCI | `-k` (driver kernel), `-v`, `-nn` (IDs vendor:device) |
| `lsusb` | lista USB | `-v`, `-t` (árbol) |
| `lsmod` | módulos cargados | lee `/proc/modules` |
| `modprobe <mod>` | carga módulo + dependencias | `-r` elimina, `-v` verbose, `-n` dry-run |
| `modinfo <mod>` | info módulo | `-p` parámetros |
| `udevadm` | gestiona udev | `udevadm info --query=all --name=/dev/sda`, `monitor` |

### Ficheros importantes
`/sys/`, `/proc/`, `/dev/`, `/etc/modprobe.d/*.conf`, `/proc/modules`, `/proc/ioports`, `/proc/interrupts`, `/proc/cpuinfo`, `/proc/meminfo`.

### 5 trampas de examen 101.1
1. `lsmod` ≠ `lspci`: el primero muestra módulos kernel, el segundo hardware PCI.
2. `modprobe` resuelve dependencias; `insmod` no (y `insmod` no está en la lista oficial, no lo elijas).
3. `/proc` y `/sys` no son para almacenar datos: se pierden al reiniciar.
4. Deshabilitar periférico integrado se hace en BIOS/UEFI, no con `rm /dev/...`.
5. `lsusb -t` muestra árbol, no `lsusb -k` (ese es de `lspci`).

---

## 101.2 Arranque: BIOS/UEFI, bootloader, kernel, initramfs, systemd, SysVinit (w=3)

### Conceptos
Secuencia: Firmware (BIOS/UEFI) → Bootloader (GRUB2) → Kernel + initramfs → PID 1 (`systemd` o `init` SysVinit) → targets/runlevels → login.

- BIOS: MBR 512B, límite 2TB, un bootloader. UEFI: ESP (FAT32, `/boot/efi`), binarios `.efi`, Secure Boot, GPT.
- `initramfs`: FS temporal en RAM con drivers necesarios para montar `/` real.
- `systemd`: PID 1 moderno, unidades paralelas. SysVinit: secuencial con scripts `/etc/init.d/`. Upstart: solo conocer que existió (Ubuntu antiguo).

### Tabla comandos
| Comando | Uso clave | Opciones examen |
|---------|-----------|-----------------|
| `dmesg` | buffer anillo kernel | `-T` timestamps legibles, `-l err,warn`, `-k` |
| `journalctl` | logs systemd | `-k`/`-b` (mensajes kernel/boot actual), `-p err`, `--since`, `-f` |
| `systemctl` | (aquí solo arranque) | `get-default`, `analyze blame` (ver siguiente objetivo) |

### Ficheros importantes
`/boot/vmlinuz-*`, `/boot/initrd.img-*` o `initramfs-*`, configuración GRUB (ver Tema 102).

### 5 trampas de examen 101.2
1. `dmesg` muestra solo kernel, no servicios systemd completos → para eso `journalctl -b`.
2. UEFI necesita ESP; BIOS no.
3. `initramfs` se carga antes de montar `/`, no después.
4. SysVinit ≠ systemd: no confundas `/etc/inittab` con `systemd.target`.
5. Pasar parámetros al kernel se hace en el prompt del bootloader (ej: `single`, `systemd.unit=rescue.target`), no en `dmesg`.

---

## 101.3 Runlevels, targets, shutdown, init, telinit, systemctl, wall (w=3)

### Conceptos
Correspondencia SysVinit ↔ systemd:

| Runlevel | Target systemd |
|----------|----------------|
| 0 halt | `poweroff.target` |
| 1 / S single | `rescue.target` |
| 2,3,4 multiusuario texto | `multi-user.target` |
| 5 gráfico | `graphical.target` |
| 6 reboot | `reboot.target` |

- `telinit` / `init <n>`: cambian runlevel (compatibilidad).
- `systemctl isolate <target>`: cambio inmediato. `systemctl set-default`: persistente. `get-default`: consulta.
- `shutdown`: elegante, avisa y respeta `wall`. `systemctl poweroff/reboot` equivalentes modernos.
- `wall`: difunde mensaje a todos los TTY logueados. Requiere aviso antes de cambio mayor.

### Tabla comandos
| Comando | Uso clave | Opciones examen |
|---------|-----------|-----------------|
| `shutdown` | apagar/reiniciar programado | `-h now`, `-r +5 "msg"`, `-c` cancela, `--no-wall` |
| `systemctl` | targets/power | `isolate rescue.target`, `set-default multi-user.target`, `get-default`, `poweroff`, `reboot` |
| `telinit` / `init` | runlevel SysV | `telinit 1`, `telinit 3`, `telinit 5`, `telinit 0/6` |
| `wall` | avisar usuarios | `wall "mantenimiento 22:00"`, lee stdin si no hay fichero |
| `runlevel` / `who -r` | runlevel actual/anterior | útil para comprobar |
| `ls -l /etc/systemd/system/default.target` | ver default real | es symlink |

### Ficheros importantes
`/etc/inittab` (solo SysV, en systemd puede no existir), `/etc/init.d/`, `/etc/systemd/system/`, `/usr/lib/systemd/system/*.target`, `/run/nologin`.

### 5 trampas de examen 101.3
1. `systemctl isolate` = temporal; `set-default` = persistente. No los intercambies.
2. `shutdown -c` cancela, no `-k` (esta solo simula/avisa sin apagar).
3. `wall` ≠ `write`: `wall` es a todos, `write` a un usuario.
4. `init S` / `telinit 1` es modo single/rescue, no apagado.
5. Falta de `/etc/inittab` en systemd es normal: no indica error.
