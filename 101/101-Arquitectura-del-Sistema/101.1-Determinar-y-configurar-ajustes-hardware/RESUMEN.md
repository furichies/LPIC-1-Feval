# 101.1 Determinar y configurar ajustes de hardware — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

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
