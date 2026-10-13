# 103.2 Procesar flujos de texto usando filtros — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 2 – Filtros básicos (103.2)
- **Pasos:** 1. `printf "b\nA\nb\na\n10\n2\n" > datos.txt; cat datos.txt` 2. `sort datos.txt; sort -u datos.txt; sort -n datos.txt` 3. `uniq -c <(sort datos.txt)` 4. `wc -lwc datos.txt; head -n2 datos.txt; tail -n2 datos.txt`.
- **Comprobación:** `uniq` solo tras `sort`.
- **Solución:** sin `-n`, `10`<`2` lexicográficamente.

## Lab 3 – cut/tr/split/paste (103.2)
- **Pasos:** 1. `cut -d: -f1,7 /etc/passwd | head -5` 2. `echo hola | tr 'a-z' 'A-Z'` 3. `seq 1 250 > nums.txt; split -l 100 nums.txt parte_; ls parte_*; wc -l parte_*` 4. `paste <(seq 1 3) <(seq 4 6)` 5. `echo test | sha256sum; sha256sum nums.txt | head -1`.
- **Comprobación:** `split` genera `xaa`-style con tu prefijo.
- **Solución:** `paste` une columnas con TAB por defecto.
