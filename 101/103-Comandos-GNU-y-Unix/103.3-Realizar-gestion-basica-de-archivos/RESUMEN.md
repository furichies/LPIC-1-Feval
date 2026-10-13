# 103.3 Gestión básica de archivos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.3 Gestión de ficheros (w=4)
| Comando | Opciones examen |
|---|---|
| `cp` | `-r/-a` recursivo/archivo, `-i` interactivo, `-v`, `-p` preserva |
| `mv` | renombra/mueve (`-i`) |
| `rm` | `-r -f -i`; `rmdir` solo dirs vacíos |
| `mkdir -p a/b` / `touch f` | crea jerarquía / crea o actualiza mtime |
| `ls` | `-l -a -h -R -t -S -d`, colores con `--color` |
| `find /dir -name "*.log" -type f -size +1M -mtime -7 -exec rm {} \;` | `-name/-iname`, `-type f/d/l`, `-size`, `-mtime/-mmin`, `-user`, `-perm`, `-exec {} \;` vs `-exec {} +` |
| `tar` | `cf/czf/cJf/cjf` crea, `xf` extrae, `tf` lista, `-C dir`, `-v`, `-p` |
| `cpio -idmv < arch.cpio` / `dd if= of= bs= status=` | rescate / clonado bit a bit |
| `file f` | tipo real (magic) |
| `gzip/gunzip/bzip2/bunzip2/xz/unxz` | `.gz/.bz2/.xz` (`-k` keep, `-d`解 decompress) |
| Globs | `* ? [abc] [!a] {a,b} [0-9]`; `ls *.txt` expande el shell, no `ls` |

**5 trampas:** 1) `cp` sin `-r` no copia dirs. 2) `find -exec {} \;` (uno a uno) vs `+` (en lote, más rápido). 3) `tar xzf` orden de flags da igual pero `f` debe ir pegada al fichero. 4) `dd` con `of=` equivocado destruye datos: solo en VM. 5) `file` mira contenido, no extensión.
