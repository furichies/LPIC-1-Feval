# 102.4 Gestión de paquetes Debian — EJERCICIOS

> Labs seguros en VM/contenedor. Referencia de estilo: https://learning.lpi.org/es/learning-materials/101-500/

## Lab 6 – Debian: consulta (102.4)
- **Objetivo/Pasos:** 1. `cat /etc/apt/sources.list; ls /etc/apt/sources.list.d/` 2. `apt-cache policy bash` 3. `apt-cache depends bash | head` 4. `dpkg -s bash | grep -E "Status|Version"` 5. `dpkg -L bash | head` 6. `dpkg -S /bin/ls`.
- **Comprobación:** `policy` muestra instalado vs candidato.
- **Solución esperada:** `dpkg -S` resuelve fichero→paquete (`coreutils` para `/bin/ls`).

## Lab 7 – Debian: instalar y purgar (VM) (102.4)
- **Objetivo/Pasos:** 1. `sudo apt-get update` 2. `sudo apt-get install -y tree` 3. `tree --version; dpkg -l tree` 4. `sudo apt-get remove tree && dpkg -l tree` (verás `rc`) 5. `sudo apt-get purge tree || sudo dpkg -P tree`.
- **Comprobación:** `rc` = removed pero con configs.
- **Solución esperada:** `purge` deja estado `un`/`ii` limpio.
