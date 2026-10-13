# 105.1 Personalizar y usar el entorno de shell — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 105.1 Entorno del shell (peso 4)

| Comando | Uso / opciones clave |
|---|---|
| `env` / `printenv [VAR]` | Listar entorno. Sin args vuelca todo. |
| `export VAR=val` / `export -p` | Exportar a hijos / listar exportadas. |
| `set` / `set -x` / `unset VAR` | Ver todo incl. locales y funciones / debug / borrar. |
| `alias ll='ls -l'` / `unalias ll` | Crear / borrar alias. Solo sesión si no se guarda. |
| `function f { ...; }` / `f() { ...; }` | Definir función. `declare -f`, `unset -f f`. |
| `source f` / `. f` | Ejecutar en shell actual (idénticos). |
| `echo $PATH` / `PATH=$PATH:$HOME/bin` | Inspeccionar/ampliar ruta de búsqueda. |
| `bash --login` / `su - user` | Forzar shell login para probar perfiles. |

Conceptos: login (`/etc/profile`, `~/.bash_profile` → `~/.bashrc`) vs no-login interactivo (`~/.bashrc`) vs no-interactivo (scripts, `$BASH_ENV`). Orden: `/etc/profile` → `~/.bash_profile` → `~/.bashrc` → `/etc/bashrc` (distros RH). `/etc/skel/` plantilla de nuevos homes. `~/.bash_logout`.
Variables: `HOME, USER, PATH, SHELL, PS1, EDITOR, HISTSIZE`.

Archivos: `~/.bashrc`, `~/.bash_profile`, `~/.profile`, `/etc/profile`, `/etc/bash.bashrc`, `/etc/skel/`, `/etc/environment`.

**5 trampas examen 105.1:**
1. `export` vs `VAR=`: sin export los hijos no la heredan.
2. `source` vs `./script`: el segundo corre en subshell, no cambia entorno actual.
3. `/etc/skel` no afecta a usuarios existentes, solo a `useradd -m` nuevos.
4. `set` muestra todo; `env` solo exportadas.
5. `~/.bash_profile` suele invocar a `~/.bashrc`, no al revés.
