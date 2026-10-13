# 102.5 Gestión de paquetes RPM y YUM — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/101-500/ (licencia CC BY-NC-ND: no se reproduce).

## 102.5 RPM / YUM / Zypper (w=3)
### Tabla
| Comando | Uso |
|---|---|
| `rpm -i pkg.rpm` / `-U` / `-F` / `-e` | instala / actualiza-instala / actualiza-solo-si-existe / borra |
| `rpm -q pkg` / `-qa` / `-qi` / `-ql` / `-qf /ruta` / `-qp pkg.rpm` / `-K` | consulta instalado / todos / info / ficheros / a quién pertenece un fichero / info de .rpm sin instalar / verifica firma |
| `rpm -V pkg` | verifica integridad |
| `rpm2cpio pkg.rpm \| cpio -idmv` | extrae .rpm sin instalar (rescate) |
| `yum install|remove|update|search|info|provides */fichero|repolist|check-update` | gestión con dependencias (RHEL/CentOS) |
| `zypper install|remove|update|search|info|refresh|repos` | equivalente openSUSE |
| `/etc/yum.conf`, `/etc/yum.repos.d/*.repo`, `/etc/zypp/` | configs y repos |
| `dnf` | sucesor de yum (solo awareness en v5.0) |
### 5 trampas
1. `rpm -U` vs `-F`: `-F` (freshen) solo actualiza si ya instalado.
2. `rpm -qf` (fichero→paquete) vs `-ql` (paquete→ficheros).
3. `rpm` no resuelve dependencias; `yum/zypper` sí.
4. `rpm2cpio` + `cpio -idmv`: ojo a la `d` (crea dirs) y ejecutar en dir temporal.
5. `yum provides` / `dnf provides` localiza qué paquete trae un fichero no instalado.
