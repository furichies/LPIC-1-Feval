# 103.8 Edición básica con vi — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.8 Edición vi (w=3)
- Modos: normal → `i/o/a` insert; `Esc` vuelve; `:w :q :q! :wq ZZ`.
- Movimiento: `h j k l`, `0 ^ $`, `w b`, `gg G`, `/patrón ?patrón n N`.
- Edición: `x dd yy p P d{mov} y{mov} u Ctrl-r`; `dw` borra palabra, `dd` línea, `yy` copia.
- Otros: awareness `emacs`, `nano`, `vim`; `EDITOR`/`VISUAL` (`export EDITOR=vi`, `visudo` la respeta).
**5 trampas:** 1) `:q!` descarta, `:wq` guarda; `ZZ` = `:x` (guarda si cambió). 2) `p` pega después, `P` antes. 3) `/` adelante, `?` atrás. 4) `i` inserta en cursor, `a` después, `o` nueva línea debajo. 5) `EDITOR` en minúsculas no vale: es mayúsculas y exportada.
