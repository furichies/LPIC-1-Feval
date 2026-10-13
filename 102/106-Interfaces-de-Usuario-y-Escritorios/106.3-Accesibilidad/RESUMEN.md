# 106.3 Accesibilidad — RESUMEN

> Contenido propio. Referencia: https://learning.lpi.org/es/learning-materials/102-500/ (licencia CC BY-NC-ND: no se reproduce).

## 106.3 Accesibilidad (peso 1)

| Ayuda | Herramienta Linux |
|---|---|
| Lector de pantalla | Orca (GNOME, `orca -s`), espeak/festival TTS. |
| Braille | BRLTTY (`brltty`, líneas braille). |
| Lupa / alto contraste | GNOME Magnifier (`Super+Alt+8`), temas HighContrast. |
| Teclado en pantalla | Onboard, Caribou. |
| StickyKeys / SlowKeys / BounceKeys | AccessX en GNOME Tweaks / `gsettings`. |

**5 trampas 106.3:**
1. Orca = lector, BRLTTY = braille (no confundir).
2. Lupa es visual; lector es audio.
3. `espeak` sintetiza, no lee pantalla por sí solo.
4. Accesibilidad vive en ajustes de escritorio, no en xorg.conf.
5. Alto contraste ≠ lupa (tema vs zoom).
