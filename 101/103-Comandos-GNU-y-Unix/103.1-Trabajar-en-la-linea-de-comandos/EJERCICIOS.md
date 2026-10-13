# 103.1 Trabajar en la línea de comandos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 1 – Entorno y quoting (103.1)
- **Pasos:** 1. `echo $HOME; echo '$HOME'; echo "$HOME"` 2. `MI=1; env | grep -c MI; export MI=1; env | grep MI` 3. `type ls; type -a ls; which -a ls` 4. `man -k passwd | head -5; uname -a` 5. `history | tail -5`.
- **Comprobación:** diferencias comilla simple/doble; `type` muestra alias.
- **Solución:** simple = literal; `export` publica a hijos; `type` > `which` para builtins.
