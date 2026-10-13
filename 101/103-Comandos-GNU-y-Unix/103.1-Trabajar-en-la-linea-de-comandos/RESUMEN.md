# 103.1 Trabajar en la línea de comandos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.1 Línea de comandos bash (w=4)
| Comando | Uso / opción clave |
|---|---|
| `echo` | `echo $VAR`, `echo -e "a\tb"`, `echo -n` sin newline |
| `env` / `export` / `set` / `unset` | `env` lista entorno; `export V=1` exporta; `set` muestra shell+entorno (sin args); `unset V` borra; `VAR=1 cmd` temporal |
| `pwd` | ruta actual (`-P` física, resuelve symlinks) |
| `type` / `which` | `type -a ls` (alias/builtin/ruta); `which -a python3` (solo PATH) |
| `man` | `man 5 passwd`, `man -k tema` (≈`apropos`) |
| `uname` | `-a` todo, `-r` kernel-release, `-m` arch |
| `history` | `!n`, `!!`, `Ctrl+R`, `HISTFILE=~/.bash_history`, `history -c` limpia |
| Comillas | `'literal'` / `"expande $VAR"` / `` `cmd` `` o `$(cmd)`; `;` secuencia, `&&`/`\|\|` condicional |

Ficheros: `~/.bash_history`. Quoting cae siempre.
**5 trampas:** 1) `export` sin args lista exportadas, como `env` pero no igual a `set`. 2) `type` distingue builtin/alias; `which` no. 3) `VAR=1` sin export no la heredan hijos. 4) `man 1 passwd` (comando) vs `man 5 passwd` (fichero). 5) `echo $VAR` sin comillas sufre word-splitting/globbing.
