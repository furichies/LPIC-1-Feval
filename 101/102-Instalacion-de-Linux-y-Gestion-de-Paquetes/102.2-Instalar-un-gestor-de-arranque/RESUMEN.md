# 102.2 Instalar un gestor de arranque — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

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
