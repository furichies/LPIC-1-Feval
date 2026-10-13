# 101.3 Cambiar runlevels/targets y apagar o reiniciar — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

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
