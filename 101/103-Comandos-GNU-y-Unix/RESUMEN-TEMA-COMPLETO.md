# Tema 103 – RESUMEN

Contenido original. Referencia: https://learning.lpi.org/es/learning-materials/101-500/

## 103.1 Línea de comandos bash (w=4)
| Comando | Uso / opción clave |
|---|---|
| `echo` | `echo $VAR`, `echo -e "a\tb"`, `echo -n` sin newline |
| `env` / `export` / `set` / `unset` | `env` lista entorno; `export V=1` exporta; `set` muestra shell+entorno (sin args); `unset V` borra; `VAR=1 cmd` temporal |
| `pwd` | ruta actual (`-P` física, resuelve symlinks) |
| `type` / `which` | `type -a ls` (alias/builtin/ruta); `which -a python3` (solo PATH) |
| `man` | `man 5 passwd`, `man -k tema` (≈`apropos`) |
| `uname` | `-a` todo, `-r` kernel-release, `-m` arch |
| `history` | `!n`, `!!`, `Ctrl+R`, `HISTFILE=~/.bash_history`, `history -c` limpia |
| Comillas | `'literal'` / `"expande $VAR"` / `` `cmd` `` o `$(cmd)`; `;` secuencia, `&&`/`\|\|` condicional |

Ficheros: `~/.bash_history`. Quoting cae siempre.
**5 trampas:** 1) `export` sin args lista exportadas, como `env` pero no igual a `set`. 2) `type` distingue builtin/alias; `which` no. 3) `VAR=1` sin export no la heredan hijos. 4) `man 1 passwd` (comando) vs `man 5 passwd` (fichero). 5) `echo $VAR` sin comillas sufre word-splitting/globbing.

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

## 103.4 Streams, pipes, redirecciones (w=4)
- FD: 0 stdin, 1 stdout, 2 stderr. `>` trunca, `>>` añade, `<` entra, `<<EOF` heredoc, `2>` stderr, `&>` ambos (bash), `2>&1` fusiona (orden importa: `>f 2>&1` sí, `2>&1 >f` no).
- Pipe `|` conecta stdout→stdin. `tee` duplica a fichero+stdout (`-a` append). `xargs` convierte stdin en args (`-n1`, `-I{}`, `-r` no correr si vacío, `-0` con `find -print0`).
- `ls noexiste 2>err.txt`, `cmd >out 2>&1`, `cat < in.txt > out.txt`, `echo hola | tee a.txt | wc -c`.
**5 trampas:** 1) `>` sobrescribe; `>>` añade. 2) `2>&1` debe ir después de `>f`. 3) `xargs` sin `-r` ejecuta el comando aunque no haya input. 4) `tee` sin `-a` trunca. 5) `|` pasa stdout, no stderr (salvo `|&` en bash).

## 103.5 Procesos (w=4)
| Comando | Uso |
|---|---|
| `&` / `bg` / `fg` / `jobs` | background, reanudar fondo/frente, listar (`jobs -l`) |
| `kill -TERM/-KILL/-HUP PID` / `killall/-pkill/pgrep` | señales: 15 TERM (elegante), 9 KILL (forzoso), 1 HUP (recargar); `pkill -f patrón`, `killall -u user proc` |
| `nohup cmd &` | inmune a SIGHUP (log en `nohup.out`) |
| `ps aux` / `ps ef` / `ps -o pid,stat,cmd` | snapshot; `STAT` (R/S/D/Z/T) |
| `top` (`M`/`P`/`k`) / `free -h` / `uptime` / `watch -n2 cmd` | interactivo / RAM / carga / repetición |
| `screen` / `tmux` | sesiones persistentes (`tmux new -s x`, `detach Ctrl-b d`, `attach -t x`) |

**5 trampas:** 1) `kill` por defecto es TERM (15), no KILL. 2) `kill %1` (job) vs `kill PID`. 3) Zombie (Z) no se mata con kill, lo recoge el padre. 4) `nohup` necesita `&` para seguir tras logout. 5) `pgrep` lista PIDs, `pkill` mata: no los confundas.

## 103.6 Prioridades nice/renice (w=2)
- Rango -20 (máx prioridad) a 19 (mínima). Default 0. Solo root puede bajar (más prioritario, valor negativo).
- `nice -n 10 cmd` / `nice -n -5 sudo cmd`; `renice -n 5 -p PID`; `renice -n 10 -u user`; ver con `ps -o pid,ni,comm` o `top` col NI.
**5 trampas:** 1) mayor número = menor prioridad (contraintuitivo). 2) usuario normal solo puede subir (ser más "nice"). 3) `nice` al lanzar, `renice` sobre proceso vivo. 4) `renice` necesita `-p`/`-u`/`-g`. 5) `top` muestra NI, no PRI para este objetivo.

## 103.7 Regex con grep/sed (w=3)
- BRE (grep/sed sin `-E`): `^ $ . * [] [^]`, `\{n,m\}`, `\(\)` grupos. ERE (`grep -E`/`egrep`): `+ ? {n,m} () |`.
- `grep -i -v -n -r -l -c -w -A/B/C contexto -E -F`; `egrep` = `grep -E`; `fgrep` = `grep -F` (fixed strings, sin regex).
- `sed 's/foo/bar/g;2d'`, `sed -n '/err/p'`, `sed -E`, `regex(7)` = manual de regex.
**5 trampas:** 1) `grep "a*"` casa vacío: usa `grep "aa*"` o ERE `+`. 2) `fgrep` no interpreta regex (punto literal). 3) Sin `-E`, `+`/`?`/`|` son literales. 4) `^` dentro de `[^a]` niega, fuera ancla inicio. 5) `grep -r` recursivo puede entrar en bucle con symlinks sin `-P`/`--exclude-dir`.

## 103.8 Edición vi (w=3)
- Modos: normal → `i/o/a` insert; `Esc` vuelve; `:w :q :q! :wq ZZ`.
- Movimiento: `h j k l`, `0 ^ $`, `w b`, `gg G`, `/patrón ?patrón n N`.
- Edición: `x dd yy p P d{mov} y{mov} u Ctrl-r`; `dw` borra palabra, `dd` línea, `yy` copia.
- Otros: awareness `emacs`, `nano`, `vim`; `EDITOR`/`VISUAL` (`export EDITOR=vi`, `visudo` la respeta).
**5 trampas:** 1) `:q!` descarta, `:wq` guarda; `ZZ` = `:x` (guarda si cambió). 2) `p` pega después, `P` antes. 3) `/` adelante, `?` atrás. 4) `i` inserta en cursor, `a` después, `o` nueva línea debajo. 5) `EDITOR` en minúsculas no vale: es mayúsculas y exportada.
