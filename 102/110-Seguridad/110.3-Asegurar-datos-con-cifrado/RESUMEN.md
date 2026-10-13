# 110.3 Cifrado de datos — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 110.3 Cifrado OpenSSH/GPG (peso 4)

| Comando | Uso |
|---|---|
| `ssh -p 2222 -i ~/.ssh/id_ed25519 user@host` | Puerto, identidad. `-X` X11, `-L 8080:dest:80` túnel local, `-R` remoto, `-D 1080` SOCKS. |
| `ssh-keygen -t ed25519 -f ~/.ssh/lab -N ""` | Generar (ed25519 moderno, rsa 4096 compat). `.pub` se comparte, privada 600. |
| `ssh-copy-id -i key.pub user@host` | Instalar pub en `authorized_keys` (700 `.ssh`, 600 fichero). |
| `ssh-agent` + `ssh-add ~/.ssh/lab` | Agente en memoria. `ssh-add -l` listar. |
| `/etc/ssh/sshd_config` (`PermitRootLogin no`, `PasswordAuthentication no`, `Port 2222`) + `systemctl reload sshd` | Endurecer. ¡Mantener sesión abierta al probar! |
| `gpg --gen-key` / `--list-keys` / `-e -r ana -o f.gpg f` / `-d f.gpg` / `-c` | Crear, cifrar asimétrico, descifrar, simétrico (`-c` pide pass). |
| `gpg --armor --export ana > pub.asc` / `--import` | Compartir/importar. `--verify`, `--detach-sign`. |

**5 trampas 110.3:**
1. Privada 600, `authorized_keys` 600, `.ssh` 700 o falla silencioso.
2. `PermitRootLogin prohibit-password` ≠ `no` (uno permite con llave).
3. Túnel `-L local:dest` expone en cliente; `-R` en servidor.
4. GPG `-e` usa pública destino; `-d` usa privada propia.
5. `ssh-agent` necesita `eval $(ssh-agent)` + `ssh-add`, no basta con crear llave.
