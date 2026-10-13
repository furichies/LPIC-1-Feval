# 101.2 Arrancar el sistema — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 5 – dmesg: arranque del kernel (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `dmesg | head -30`
  2. `dmesg -T | grep -i -E "efi|bios" | head -5`
  3. `dmesg -l err,warn | head -10`
- **Comprobación:** distingues mensajes normales de errores reales.
- **Solución esperada:** verás DMI/QEMU, memoria detectada; errores ACPI en VM son normales.

## Lab 6 – journalctl: boot actual (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `journalctl -b --no-pager | head -30`
  2. `journalctl -k --no-pager | tail -20`
  3. `journalctl -p err -b --no-pager | head -10`
  4. `systemd-analyze blame 2>/dev/null | head -10 || echo "sin systemd-analyze en contenedor"`
- **Comprobación:** `journalctl -b` = este arranque; `-k` = solo kernel.
- **Solución esperada:** equivalencia `journalctl -k` ≈ `dmesg`.

## Lab 7 – BIOS vs UEFI en tu VM (101.2)
- **Objetivo:** 101.2
- **Pasos:**
  1. `ls /sys/firmware/efi 2>/dev/null && echo "UEFI" || echo "BIOS/Legacy"`
  2. `ls /boot/ | head -10`
  3. `ls /boot/efi 2>/dev/null || echo "sin ESP montada"`
- **Comprobación:** determinas firmware sin reiniciar.
- **Solución esperada:** si existe `/sys/firmware/efi`, arranque UEFI.
