# 104.6 Enlaces duros y simbólicos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 104.6 Enlaces duros y simbólicos (w=2)
- `ln origen duro` (mismo inodo, mismo FS, no a dirs), `ln -s origen enlace` (ruta, cualquier FS, puede romperse).
- `ls -li` (col 1 = inodo; col 2 = nlinks), duros comparten inodo y `nlink>1`; symlinks tienen inodo propio y `l` en `ls -l`.
- Copiar vs enlazar: copia duplica bytes; enlace no. Backup con duros (`cp -al`) ahorra espacio.
**5 trampas:** 1) Duro no cruza filesystems; symlink sí. 2) Borrar origen rompe symlink, no al duro (vive mientras quede un link). 3) Duro a directorio prohibido (excepto `.`/`..`). 4) `ln -s` con ruta relativa se rompe al mover el enlace. 5) `ls` sin `-i` no distingue duros.
