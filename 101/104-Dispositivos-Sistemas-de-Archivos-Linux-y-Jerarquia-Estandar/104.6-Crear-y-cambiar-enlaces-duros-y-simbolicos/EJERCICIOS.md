# 104.6 Enlaces duros y simbólicos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 11 – Duros vs simbólicos (104.6)
- **Pasos:** 1. `echo hola > orig.txt; ln orig.txt duro.txt; ln -s orig.txt blando.txt; ls -li` 2. `cat duro.txt blando.txt` 3. `rm orig.txt; ls -li; cat duro.txt; cat blando.txt || echo "symlink roto"` 4. Intenta `ln duro.txt /tmp/otro-fs 2>&1 | head -2` si cruza FS (verás error).
- **Comprobación:** duro sobrevive, symlink se rompe; mismo inodo en duro.
- **Solución:** duros = mismo FS + mismo inodo; symlinks = ruta.
