# EJERCICIOS Tema 105 – Shells y Scripts (12 labs VM)

Formato: Objetivo / Pasos / Comprobación / Solución.

**1. Mapear ficheros de arranque**
Objetivo: distinguir login vs no-login.
Pasos: `grep -l bashrc ~/.bash_profile ~/.bashrc /etc/profile 2>/dev/null; echo $0; shopt -q login_shell && echo login || echo no-login`
Comprobación: identificar qué fichero se leyó.
Solución: `bash -l -c 'echo login-test'` vs `bash -c 'echo no-login-test'` + `strace -e openat bash -l -c true 2>&1 | grep profile`.

**2. PATH seguro**
Objetivo: ampliar PATH sin romperlo.
Pasos: `mkdir -p ~/bin; echo -e '#!/bin/bash\necho hola105' > ~/bin/hola105; chmod +x ~/bin/hola105; PATH="$PATH:$HOME/bin"; hola105`
Comprobación: `echo $PATH; which hola105`
Solución: añadir `export PATH="$PATH:$HOME/bin"` a `~/.bashrc` + `source ~/.bashrc`.

**3. Alias + función**
Objetivo: crear atajos persistentes.
Pasos: `alias lt='ls -ltrh'; lt | tail; mcd() { mkdir -p "$1" && cd "$1"; }; mcd /tmp/lab105; pwd`
Comprobación: `type lt; type mcd`
Solución: guardar en `~/.bashrc`.

**4. export vs local**
Objetivo: ver herencia.
Pasos: `VAR1=local; export VAR2=exportada; bash -c 'echo VAR1=$VAR1 VAR2=$VAR2'`
Comprobación: solo VAR2 visible en hijo.
Solución: `export VAR1` para propagar; `env | grep VAR`.

**5. source vs ./ **
Objetivo: entorno actual.
Pasos: `echo 'export DESDE=source' > /tmp/e.sh; chmod +x /tmp/e.sh; ./tmp/e.sh 2>/dev/null || /tmp/e.sh; echo $DESDE; source /tmp/e.sh; echo $DESDE`
Comprobación: vacío luego `source`.
Solución: usar `source` para cargar env.

**6. /etc/skel**
Objetivo: plantilla new users.
Pasos: `ls -la /etc/skel/; sudo useradd -m prueba105; ls -la /home/prueba105/; sudo userdel -r prueba105`
Comprobación: home nuevo replica skel.
Solución: `sudo cp mi_bashrc /etc/skel/.bashrc` afecta solo futuros.

**7. Script con args y test**
Objetivo: `[ ]` y `$#`.
Pasos: crear `~/bin/check.sh`: `#!/bin/bash; if [ $# -eq 0 ]; then echo "uso: $0 fich"; exit 1; fi; if [ -f "$1" ]; then echo "existe"; else echo "no"; fi`; `chmod +x`; probar con/sin arg.
Comprobación: `echo $?`
Solución: comillas en `"$1"`, `-f` fichero.

**8. for + seq**
Objetivo: bucles.
Pasos: `for i in $(seq 1 5); do echo "user$i"; done; for f in /etc/*.conf; do echo "$f"; done | head`
Comprobación: 5 líneas + lista.
Solución: `for i in {1..5}` alternativo bash.

**9. while read seguro**
Objetivo: leer fichero.
Pasos: `printf 'a b\nc d\n' > /tmp/in.txt; while IFS= read -r l; do echo "[$l]"; done < /tmp/in.txt`
Comprobación: preserva espacios.
Solución: `IFS= read -r` es patrón oro.

**10. && ||**
Objetivo: encadenar.
Pasos: `mkdir -p /tmp/o105 && echo ok || echo fail; false && echo no-sale; false || echo si-sale`
Comprobación: códigos `echo $?`.
Solución: `cmd && exito || fallo`.

**11. read interactivo**
Objetivo: entrada.
Pasos: crear `ask.sh`: `#!/bin/bash; read -p "Nombre: " n; read -s -p "Clave: " c; echo; echo "hola $n"`.
Comprobación: `-s` no muestra clave.
Solución: `-t 10` para timeout en examen.

**12. exec + debug**
Objetivo: `exec` y `set -x`.
Pasos: `bash -x ~/bin/check.sh /etc/hosts; echo 'exec ls' > /tmp/e2.sh; chmod +x /tmp/e2.sh; bash -c '/tmp/e2.sh; echo nunca'`
Comprobación: `nunca` no sale (exec reemplaza).
Solución: evitar `exec` salvo último comando o login.
