# 101.2 Arrancar el sistema — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

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
