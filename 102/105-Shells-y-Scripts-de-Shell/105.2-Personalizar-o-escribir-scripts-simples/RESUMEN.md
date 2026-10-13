# 105.2 Escribir scripts sencillos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

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
