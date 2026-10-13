# 103.5 Crear, monitorizar y terminar procesos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.5 Procesos (w=4)
| Comando | Uso |
|---|---|
| `&` / `bg` / `fg` / `jobs` | background, reanudar fondo/frente, listar (`jobs -l`) |
| `kill -TERM/-KILL/-HUP PID` / `killall/-pkill/pgrep` | señales: 15 TERM (elegante), 9 KILL (forzoso), 1 HUP (recargar); `pkill -f patrón`, `killall -u user proc` |
| `nohup cmd &` | inmune a SIGHUP (log en `nohup.out`) |
| `ps aux` / `ps ef` / `ps -o pid,stat,cmd` | snapshot; `STAT` (R/S/D/Z/T) |
| `top` (`M`/`P`/`k`) / `free -h` / `uptime` / `watch -n2 cmd` | interactivo / RAM / carga / repetición |
| `screen` / `tmux` | sesiones persistentes (`tmux new -s x`, `detach Ctrl-b d`, `attach -t x`) |

**5 trampas:** 1) `kill` por defecto es TERM (15), no KILL. 2) `kill %1` (job) vs `kill PID`. 3) Zombie (Z) no se mata con kill, lo recoge el padre. 4) `nohup` necesita `&` para seguir tras logout. 5) `pgrep` lista PIDs, `pkill` mata: no los confundas.
