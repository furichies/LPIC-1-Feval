# 103.4 Flujos, pipes y redirecciones — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 6 – Pipes y redirecciones (103.4)
- **Pasos:** 1. `ls /noexiste > out.txt 2> err.txt; cat out.txt err.txt` 2. `ls /noexiste > todo.txt 2>&1; cat todo.txt` 3. `seq 1 5 | tee nums2.txt | wc -l; cat nums2.txt` 4. `echo -e "a b\nc" | xargs -n1 echo "arg:"`.
- **Comprobación:** entiendes orden `>f 2>&1`.
- **Solución:** `2>`, `&>`, `tee -a` para append.

## Lab 7 – xargs con find (103.4)
- **Pasos:** 1. `find p -name "*.txt" | xargs ls -l` 2. `find p -name "*.txt" -print0 | xargs -0 ls -l` 3. `echo "" | xargs -r echo "no debería salir"` 4. `printf "f1\nf2\n" | xargs -I{} echo "tocar {}"`.
- **Comprobación:** `-0` aguanta espacios en nombres; `-r` evita ejecución vacía.
- **Solución:** patrón profesional: `find ... -print0 | xargs -0`.
