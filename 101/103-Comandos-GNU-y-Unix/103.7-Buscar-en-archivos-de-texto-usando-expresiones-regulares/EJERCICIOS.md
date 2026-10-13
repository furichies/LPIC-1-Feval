# 103.7 Búsquedas con expresiones regulares — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 11 – grep/sed regex (103.7)
- **Pasos:** 1. `grep -E "^root:" /etc/passwd; grep -c "/bin/bash" /etc/passwd` 2. `grep -r "localhost" /tmp/lpi103 2>/dev/null; echo hola | grep -F "o.a"` (no casa: F literal) 3. `echo "tel 600-123-456" | grep -E "[0-9]{3}-[0-9]{3}-[0-9]{3}"` 4. `sed 's/root/ROOT/g' /etc/passwd | head -2; sed -n '1,3p' /etc/passwd; sed -E 's/(.*):(.*):(.*)/\3:\1/' /etc/passwd | head -2`.
- **Comprobación:** BRE vs ERE, `-F` literal.
- **Solución:** `regex(7)` es el manual (`man 7 regex`).
