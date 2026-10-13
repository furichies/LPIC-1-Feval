# 103.8 Edición básica con vi — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 12 – vi + EDITOR (103.8)
- **Pasos:** 1. `echo $EDITOR; export EDITOR=vi` 2. `vi practica.txt` → pulsa `i`, escribe 3 líneas, `Esc`, `:w`, `/línea`, `n`, `yy`, `p`, `dd`, `u`, `:wq` 3. `cat practica.txt`.
- **Comprobación:** sales sin `:q!` forzoso salvo atasco.
- **Solución:** secuencia mínima examen: `i` → escribir → `Esc` → `:wq` / `ZZ`.
