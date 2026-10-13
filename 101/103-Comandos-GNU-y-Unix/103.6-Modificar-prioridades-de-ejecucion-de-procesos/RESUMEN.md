# 103.6 Modificar prioridades de ejecución — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.6 Prioridades nice/renice (w=2)
- Rango -20 (máx prioridad) a 19 (mínima). Default 0. Solo root puede bajar (más prioritario, valor negativo).
- `nice -n 10 cmd` / `nice -n -5 sudo cmd`; `renice -n 5 -p PID`; `renice -n 10 -u user`; ver con `ps -o pid,ni,comm` o `top` col NI.
**5 trampas:** 1) mayor número = menor prioridad (contraintuitivo). 2) usuario normal solo puede subir (ser más "nice"). 3) `nice` al lanzar, `renice` sobre proceso vivo. 4) `renice` necesita `-p`/`-u`/`-g`. 5) `top` muestra NI, no PRI para este objetivo.
