# Tema 103 – EJERCICIOS

> Trabaja en `/tmp/lpi103` de tu VM. Crea con `mkdir -p /tmp/lpi103 && cd /tmp/lpi103`. Todo reversible.

## Lab 1 – Entorno y quoting (103.1)
- **Pasos:** 1. `echo $HOME; echo '$HOME'; echo "$HOME"` 2. `MI=1; env | grep -c MI; export MI=1; env | grep MI` 3. `type ls; type -a ls; which -a ls` 4. `man -k passwd | head -5; uname -a` 5. `history | tail -5`.
- **Comprobación:** diferencias comilla simple/doble; `type` muestra alias.
- **Solución:** simple = literal; `export` publica a hijos; `type` > `which` para builtins.

## Lab 2 – Filtros básicos (103.2)
- **Pasos:** 1. `printf "b\nA\nb\na\n10\n2\n" > datos.txt; cat datos.txt` 2. `sort datos.txt; sort -u datos.txt; sort -n datos.txt` 3. `uniq -c <(sort datos.txt)` 4. `wc -lwc datos.txt; head -n2 datos.txt; tail -n2 datos.txt`.
- **Comprobación:** `uniq` solo tras `sort`.
- **Solución:** sin `-n`, `10`<`2` lexicográficamente.

## Lab 3 – cut/tr/split/paste (103.2)
- **Pasos:** 1. `cut -d: -f1,7 /etc/passwd | head -5` 2. `echo hola | tr 'a-z' 'A-Z'` 3. `seq 1 250 > nums.txt; split -l 100 nums.txt parte_; ls parte_*; wc -l parte_*` 4. `paste <(seq 1 3) <(seq 4 6)` 5. `echo test | sha256sum; sha256sum nums.txt | head -1`.
- **Comprobación:** `split` genera `xaa`-style con tu prefijo.
- **Solución:** `paste` une columnas con TAB por defecto.

## Lab 4 – Ficheros y globs (103.3)
- **Pasos:** 1. `mkdir -p p/a/b; touch p/a/b/f{1..3}.txt p/nota.md` 2. `ls -R p; ls p/a/b/*.txt` 3. `cp -r p p2; mv p2 p3; ls p3` 4. `rm -ri p3/a/b/f1.txt` (responde `y`) 5. `find p -type f -name "*.txt"`.
- **Comprobación:** `rmdir p/a` falla (no vacío).
- **Solución:** `mkdir -p`, `cp -r`, globs los expande bash.

## Lab 5 – find + tar + dd seguro (103.3)
- **Pasos:** 1. `find /tmp/lpi103 -type f -size +0c -exec ls -l {} +` 2. `tar czf backup.tgz p/ && tar tzf backup.tgz | head` 3. `mkdir restore && tar xzf backup.tgz -C restore && find restore` 4. `dd if=/dev/zero of=/tmp/lpi103/disco.img bs=1M count=5 status=progress; file disco.img; rm disco.img`.
- **Comprobación:** `tar tf` lista sin extraer.
- **Solución:** `dd` solo con `of=` en /tmp. Jamás a `/dev/sd*`.

## Lab 6 – Pipes y redirecciones (103.4)
- **Pasos:** 1. `ls /noexiste > out.txt 2> err.txt; cat out.txt err.txt` 2. `ls /noexiste > todo.txt 2>&1; cat todo.txt` 3. `seq 1 5 | tee nums2.txt | wc -l; cat nums2.txt` 4. `echo -e "a b\nc" | xargs -n1 echo "arg:"`.
- **Comprobación:** entiendes orden `>f 2>&1`.
- **Solución:** `2>`, `&>`, `tee -a` para append.

## Lab 7 – xargs con find (103.4)
- **Pasos:** 1. `find p -name "*.txt" | xargs ls -l` 2. `find p -name "*.txt" -print0 | xargs -0 ls -l` 3. `echo "" | xargs -r echo "no debería salir"` 4. `printf "f1\nf2\n" | xargs -I{} echo "tocar {}"`.
- **Comprobación:** `-0` aguanta espacios en nombres; `-r` evita ejecución vacía.
- **Solución:** patrón profesional: `find ... -print0 | xargs -0`.

## Lab 8 – Procesos y señales (103.5)
- **Pasos:** 1. `sleep 300 & jobs; ps aux | grep "[s]leep"` 2. `kill %1; jobs` 3. `sleep 300 & PID=$!; kill -TERM $PID; ps -p $PID || echo "terminado"` 4. `nohup sleep 5 & tail -3 nohup.out 2>/dev/null; wait` 5. `pgrep -a sleep || echo "ninguno"; uptime; free -h`.
- **Comprobación:** `%1` es jobspec, `$!` es PID.
- **Solución:** TERM=15 elegante; KILL=9 solo si TERM falla.

## Lab 9 – top/ps/watch/tmux (103.5)
- **Pasos:** 1. `ps -o pid,ni,stat,cmd | head` 2. `watch -n1 "ps -o pid,cmd | head -5"` (sal con Ctrl-C) 3. `tmux new -s lpi -d "sleep 60"; tmux ls; tmux kill-session -t lpi` (si no hay tmux, prueba `screen -dmS lpi sleep 60; screen -ls; screen -S lpi -X quit`).
- **Comprobación:** sesión persiste tras detach.
- **Solución:** `tmux attach -t lpi` para volver.

## Lab 10 – nice/renice (103.6)
- **Pasos:** 1. `nice -n 10 sleep 60 & ps -o pid,ni,cmd -p $!` 2. `renice -n 15 -p $!; ps -o pid,ni,cmd -p $!` 3. Intenta `nice -n -10 sleep 1` (fallará sin root: "Permission denied") 4. `kill %1 2>/dev/null; echo fin`.
- **Comprobación:** ves NI=10→15; negativo denegado.
- **Solución:** solo root baja el valor (más prioridad).

## Lab 11 – grep/sed regex (103.7)
- **Pasos:** 1. `grep -E "^root:" /etc/passwd; grep -c "/bin/bash" /etc/passwd` 2. `grep -r "localhost" /tmp/lpi103 2>/dev/null; echo hola | grep -F "o.a"` (no casa: F literal) 3. `echo "tel 600-123-456" | grep -E "[0-9]{3}-[0-9]{3}-[0-9]{3}"` 4. `sed 's/root/ROOT/g' /etc/passwd | head -2; sed -n '1,3p' /etc/passwd; sed -E 's/(.*):(.*):(.*)/\3:\1/' /etc/passwd | head -2`.
- **Comprobación:** BRE vs ERE, `-F` literal.
- **Solución:** `regex(7)` es el manual (`man 7 regex`).

## Lab 12 – vi + EDITOR (103.8)
- **Pasos:** 1. `echo $EDITOR; export EDITOR=vi` 2. `vi practica.txt` → pulsa `i`, escribe 3 líneas, `Esc`, `:w`, `/línea`, `n`, `yy`, `p`, `dd`, `u`, `:wq` 3. `cat practica.txt`.
- **Comprobación:** sales sin `:q!` forzoso salvo atasco.
- **Solución:** secuencia mínima examen: `i` → escribir → `Esc` → `:wq` / `ZZ`.
