# 103.4 Flujos, pipes y redirecciones — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.4 Streams, pipes, redirecciones (w=4)
- FD: 0 stdin, 1 stdout, 2 stderr. `>` trunca, `>>` añade, `<` entra, `<<EOF` heredoc, `2>` stderr, `&>` ambos (bash), `2>&1` fusiona (orden importa: `>f 2>&1` sí, `2>&1 >f` no).
- Pipe `|` conecta stdout→stdin. `tee` duplica a fichero+stdout (`-a` append). `xargs` convierte stdin en args (`-n1`, `-I{}`, `-r` no correr si vacío, `-0` con `find -print0`).
- `ls noexiste 2>err.txt`, `cmd >out 2>&1`, `cat < in.txt > out.txt`, `echo hola | tee a.txt | wc -c`.
**5 trampas:** 1) `>` sobrescribe; `>>` añade. 2) `2>&1` debe ir después de `>f`. 3) `xargs` sin `-r` ejecuta el comando aunque no haya input. 4) `tee` sin `-a` trunca. 5) `|` pasa stdout, no stderr (salvo `|&` en bash).
