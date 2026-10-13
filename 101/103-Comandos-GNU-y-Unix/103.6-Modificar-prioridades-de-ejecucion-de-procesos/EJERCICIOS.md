# 103.6 Modificar prioridades de ejecución — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 10 – nice/renice (103.6)
- **Pasos:** 1. `nice -n 10 sleep 60 & ps -o pid,ni,cmd -p $!` 2. `renice -n 15 -p $!; ps -o pid,ni,cmd -p $!` 3. Intenta `nice -n -10 sleep 1` (fallará sin root: "Permission denied") 4. `kill %1 2>/dev/null; echo fin`.
- **Comprobación:** ves NI=10→15; negativo denegado.
- **Solución:** solo root baja el valor (más prioridad).
