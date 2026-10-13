# 102.3 Gestión de bibliotecas compartidas — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 5 – Librerías: ldd + ldconfig (102.3)
- **Objetivo/Pasos:** 1. `ldd /bin/ls | head` 2. `ldd /bin/ls | grep "not found" || echo OK` 3. `cat /etc/ld.so.conf; ls /etc/ld.so.conf.d/` 4. `ldconfig -p | head -10` 5. `LD_LIBRARY_PATH=/tmp ldd /bin/ls | head -3` (prueba inocua).
- **Comprobación:** diferencias diagnóstico (`ldd`) vs actualización (`ldconfig`).
- **Solución esperada:** tras añadir un `.conf` habría que correr `sudo ldconfig`.
