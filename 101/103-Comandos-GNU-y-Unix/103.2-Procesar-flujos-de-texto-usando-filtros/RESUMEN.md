# 103.2 Procesar flujos de texto usando filtros — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 103.2 Filtros de texto (w=2)
| Comando | Uso |
|---|---|
| `cat` / `tac` | concatena (`-n` numera) |
| `cut -d: -f1 /etc/passwd` | campos por delimitador; `-c1-3` caracteres |
| `head -n 5` / `tail -n 5 -f` | inicio/fin; `-f` follow |
| `less` | paginador (`/patrón`, `q`) |
| `sort` | `-n` numérico, `-r` reverso, `-u` únicos, `-t: -k3` clave |
| `tr 'a-z' 'A-Z' < f` | traduce/borra (`-d`, `-s`) |
| `uniq` | `-c` cuenta, `-d`/`-u`; exige `sort` previo |
| `wc` | `-l -w -c` líneas/palabras/bytes |
| `sed 's/a/b/g'` | sustitución por defecto (ver 103.7) |
| `split -l 100 f parte_` / `paste f1 f2` / `od -c` | divide / pega columnas / dump octal |
| `zcat/xzcat/bzcat` | `cat` de `.gz/.xz/.bz2` sin descomprimir |
| `md5sum/sha256sum/sha512sum` | checksums (`-c archivo.suma` verifica) |

**5 trampas:** 1) `uniq` sin `sort` falla con duplicados no adyacentes. 2) `sort -n` vs lexicográfico (`10` < `2` sin `-n`). 3) `tr` no acepta fichero como arg, usa `<` o pipe. 4) `zcat` es para `.gz`, `xzcat` para `.xz`. 5) `nl` numera, `cat -n` también; `wc -l` cuenta líneas.
