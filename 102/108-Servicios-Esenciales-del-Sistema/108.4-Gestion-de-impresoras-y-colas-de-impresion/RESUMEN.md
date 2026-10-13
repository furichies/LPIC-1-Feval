# 108.4 Impresión y colas — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 108.4 CUPS (peso 2)

| Comando | Uso |
|---|---|
| `lpadmin -p HP -E -v usb:/... -m everywhere` | Añadir cola. `-x` borra, `-d` defecto. |
| `lpr -P HP fich.pdf` / `lp -d HP fich` | Imprimir (lpr BSD, lp SystemV). |
| `lpq -a` / `lpstat -t` | Ver colas. |
| `lprm -P HP 123` / `cancel 123` | Borrar trabajo. |
| `cupsaccept/reject`, `cupsenable/disable` | Aceptar trabajos vs activar impresión. |
| `/etc/cups/{cupsd.conf,printers.conf}` + `localhost:631` | Config + web admin. |

**5 trampas 108.4:**
1. `reject` ≠ `disable`: uno rechaza cola, otro pausa impresora.
2. `lprm` necesita `-P` o `PRINTER` si no hay defecto.
3. CUPS escucha 631/tcp.
4. `lpadmin` requiere root o grupo `lpadmin`.
5. Driver `everywhere` = IPP sin driver (moderno).
