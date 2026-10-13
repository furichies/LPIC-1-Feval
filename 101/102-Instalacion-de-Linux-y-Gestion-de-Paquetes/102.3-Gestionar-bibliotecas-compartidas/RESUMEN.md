# 102.3 Gestión de bibliotecas compartidas — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 102.3 Librerías compartidas (w=1)
### Tabla
| Comando / fichero | Uso |
|---|---|
| `ldd /bin/ls` | muestra librerías que necesita un binario (`not found` = falta) |
| `ldconfig` | regenera caché `/etc/ld.so.cache` (ejecutar tras añadir lib) |
| `/etc/ld.so.conf` + `/etc/ld.so.conf.d/*.conf` | rutas permanentes de librerías |
| `LD_LIBRARY_PATH` | ruta temporal por variable (precedencia alta, solo test, no permanente) |
| `ldconfig -p` | lista caché |
### 5 trampas
1. `ldd` es diagnóstico; `ldconfig` es acción (actualiza caché).
2. Editar `ld.so.conf` sin `ldconfig` no tiene efecto.
3. `LD_LIBRARY_PATH` no persiste: para permanente usa `ld.so.conf.d/`.
4. `ldd` sobre script muestra "not a dynamic executable".
5. La caché real es `/etc/ld.so.cache`, no el `.conf`.
