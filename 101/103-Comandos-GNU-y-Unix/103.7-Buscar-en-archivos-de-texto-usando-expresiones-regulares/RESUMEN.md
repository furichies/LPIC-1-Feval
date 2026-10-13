# 103.7 Búsquedas con expresiones regulares — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.7 Regex con grep/sed (w=3)
- BRE (grep/sed sin `-E`): `^ $ . * [] [^]`, `\{n,m\}`, `\(\)` grupos. ERE (`grep -E`/`egrep`): `+ ? {n,m} () |`.
- `grep -i -v -n -r -l -c -w -A/B/C contexto -E -F`; `egrep` = `grep -E`; `fgrep` = `grep -F` (fixed strings, sin regex).
- `sed 's/foo/bar/g;2d'`, `sed -n '/err/p'`, `sed -E`, `regex(7)` = manual de regex.
**5 trampas:** 1) `grep "a*"` casa vacío: usa `grep "aa*"` o ERE `+`. 2) `fgrep` no interpreta regex (punto literal). 3) Sin `-E`, `+`/`?`/`|` son literales. 4) `^` dentro de `[^a]` niega, fuera ancla inicio. 5) `grep -r` recursivo puede entrar en bucle con symlinks sin `-P`/`--exclude-dir`.
