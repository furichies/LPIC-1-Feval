# 104.7 FHS y localización de archivos — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 12 – FHS + find/locate (104.7)
- **Pasos:** 1. `ls -ld /bin /sbin 2>/dev/null; ls -l / | head -20` 2. `whereis bash; which -a bash; type -a bash` 3. `find /etc -maxdepth 1 -name "*.conf" 2>/dev/null | head` 4. `which locate && (locate passwd | head -3; cat /etc/updatedb.conf | grep -i prune) || echo "instala mlocate para probar locate/updatedb"`.
- **Comprobación:** diferencias which/whereis/type; sabes por qué locate puede mentir.
- **Solución:** locate→DB desactualizada; find→vivo pero lento.
