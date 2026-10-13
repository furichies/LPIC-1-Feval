# 103.5 Crear, monitorizar y terminar procesos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 8 – Procesos y señales (103.5)
- **Pasos:** 1. `sleep 300 & jobs; ps aux | grep "[s]leep"` 2. `kill %1; jobs` 3. `sleep 300 & PID=$!; kill -TERM $PID; ps -p $PID || echo "terminado"` 4. `nohup sleep 5 & tail -3 nohup.out 2>/dev/null; wait` 5. `pgrep -a sleep || echo "ninguno"; uptime; free -h`.
- **Comprobación:** `%1` es jobspec, `$!` es PID.
- **Solución:** TERM=15 elegante; KILL=9 solo si TERM falla.

## Lab 9 – top/ps/watch/tmux (103.5)
- **Pasos:** 1. `ps -o pid,ni,stat,cmd | head` 2. `watch -n1 "ps -o pid,cmd | head -5"` (sal con Ctrl-C) 3. `tmux new -s lpi -d "sleep 60"; tmux ls; tmux kill-session -t lpi` (si no hay tmux, prueba `screen -dmS lpi sleep 60; screen -ls; screen -S lpi -X quit`).
- **Comprobación:** sesión persiste tras detach.
- **Solución:** `tmux attach -t lpi` para volver.
