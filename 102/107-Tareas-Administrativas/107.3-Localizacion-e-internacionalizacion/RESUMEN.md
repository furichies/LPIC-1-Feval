# 107.3 Localización e internacionalización — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 107.3 Locale y zona horaria (peso 3)

| Comando | Uso |
|---|---|
| `locale` / `locale -a` / `localectl status` | Ver / listar disponibles / ver systemd. |
| `localectl set-locale LANG=es_ES.UTF-8` | Persistente (`/etc/locale.conf`). |
| `LANG= LC_ALL= LC_TIME=` | `LC_ALL` sobrescribe todo (solo test, no permanente). |
| `timedatectl status` / `set-timezone Europe/Madrid` / `list-timezones` | Zona systemd (`/etc/localtime` symlink). |
| `TZ=America/Lima date` | Probar zona puntual. |
| `date -u` / `date -s` / `date +%F_%T` | UTC / fijar (¡VM!) / formato. |
| `iconv -f ISO-8859-1 -t UTF-8 f.txt -o out` / `iconv -l` | Convertir codificación / listar. |
| `file -i f.txt` | Detectar charset aproximado. |

**5 trampas 107.3:**
1. `LC_ALL` tiene prioridad máxima, enmascara `LANG`.
2. UTF-8 no es automático: necesita `LANG=*.UTF-8` + glibc-langpack.
3. `/etc/localtime` es enlace, no texto.
4. `iconv -f` = origen, `-t` = destino (orden importa).
5. `timedatectl set-timezone` requiere nombre exacto de `list-timezones`.
