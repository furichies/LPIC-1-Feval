# RESUMEN Tema 105 – Shells y Scripts

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

## 105.2 Scripts simples (peso 4)

| Construcción | Ejemplo |
|---|---|
| Shebang | `#!/bin/bash` primera línea, luego `chmod +x`. |
| `chmod 755 script.sh` | Dar ejecución. Sin +x → `bash script.sh` como apaño. |
| `test EXPR` / `[ ]` / `[[ ]]` | `-f -d -e -z -n -eq -ne -lt -gt = !=`. `[[` más seguro (sin word-splitting). |
| `if ...; then ...; fi` | `if [ $# -eq 0 ]; then echo uso; exit 1; fi` |
| `for i in ...; do ...; done` | `for f in *.log; do echo "$f"; done` + `seq 1 5` |
| `while read -r l; do ...; done < f` | Leer líneas seguro (`-r` evita escapes). |
| `read -p "Nombre: " n` | Pedir entrada. `-s` silencioso, `-t 5` timeout. |
| `cmd1 && cmd2` / `cmd1 \|\| cmd2` | AND / OR por código de salida. |
| `exec cmd` | Reemplaza proceso actual, no retorna. |
| `$0 $1 $# $@ $* $? $$` | Nombre, args, nº args, todos, salida anterior, PID. |

Permisos y PATH: script sin ruta absoluta requiere `./` si `.` no está en PATH (lógico por seguridad).

**5 trampas examen 105.2:**
1. Espacios en `[`: `[ -f $f]` falla sin espacios y sin comillas → `[ -f "$f" ]`.
2. `=` en `[ ]` es string; `-eq` es numérico.
3. `#!/bin/sh` en Debian = dash, no bash (evitar `[[ ]]`, arrays).
4. `exec` termina el script/shell actual, no es `system()`.
5. `"$@"` preserva args con espacios; `$*` los aplana.
