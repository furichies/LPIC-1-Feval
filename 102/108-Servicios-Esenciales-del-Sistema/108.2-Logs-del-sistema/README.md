# 108.2 Registros del sistema

- Examen: 102-500 · Tema: Tema 108: Servicios esenciales del sistema · Peso (importancia): **4**
- Fuente canónica (no se copia, solo se referencia): https://learning.lpi.org/es/learning-materials/102-500/ y https://www.lpi.org/es/exam-101-102-objectives/

## Áreas de conocimiento (objetivo oficial, resumen propio)
rsyslog básico (facilidad.prioridad→acción); journald (consultar/filtrar/persistir/limpiar/rescatar); logrotate; syslog/ng

## Ficheros / comandos del objetivo
`/etc/rsyslog.conf /var/log logger logrotate /etc/logrotate.conf /etc/logrotate.d journalctl systemd-cat /etc/systemd/journald.conf /var/log/journal`

## Documentos de este capítulo
| Documento | Contenido |
|---|---|
| `RESUMEN.md` | Comandos con opciones, archivos, conceptos y 5 trampas de examen |
| `EJERCICIOS.md` | Labs paso a paso estilo LPI (Objetivo→Pasos→Comprobación→Solución) en VM |
| `tools/` | Apps HTML interactivas (ver `tools/README.md`) |
