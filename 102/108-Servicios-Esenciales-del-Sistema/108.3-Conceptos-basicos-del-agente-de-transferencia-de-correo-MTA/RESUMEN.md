# 108.3 Conceptos básicos del MTA — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 108.3 MTA básico (peso 3)

| Comando | Uso |
|---|---|
| `postfix`: `postconf -n`, `postalias`, `newaliases` | Ver config no-defecto, regenerar alias. Config `/etc/postfix/main.cf`, `/etc/aliases`. |
| `sendmail`, `exim` | MTAs alternativos (sendmail clásico, exim en Debian). |
| `mail -s "T" ana@dominio < msg` / `mailq` / `sendmail -bv` | Enviar / ver cola / verificar entrega. |
| `~/.forward` | Reenvío personal (`ana@otro.com`, `\|/script`). |
| Puertos 25 (SMTP), 587 (submission), 465 (SMTPS) | Saber distinguir. |

**5 trampas 108.3:**
1. Tras editar `/etc/aliases` → `newaliases` obligatorio.
2. `~/.forward` con permisos laxos se ignora.
3. `mailq` = `sendmail -bp` = cola postfix (`postqueue -p`).
4. MTA ≠ MUA: postfix envía, `mail/mutt` leen.
5. Open relay = fallo típico; `mynetworks` restringe.
