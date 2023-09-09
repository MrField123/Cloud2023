# Cloud 2023
## Beschreibung der Anwendung
 Der ortliche Sportverein verlost zu jeder Veranstaltung Wertkarten. Aktuell werden die Wertkarten den Gewinnern vor der Veranstaltung zugesendet. 
 Dieser Prozess soll wie folgt durch eine Cloud-Anwendung digitalisiert werden:
 ## Funktion 1 (Admin)
 - Upload der Gewinner in die Anwendung 
 - Generierung von QR-Codes (einer je Gewinner), welcher zur Verifikation des Gewinns dienen
 - Mit dem QR-Code sind sowohl Gewinnername als Gewinnsumme verknüpft
## Funktion 2 (Kassierer + Admin):
- Scan des QR-Codes an der Abendkasse
- Prüfung, ob dieser bereits eingelöst wurdesamt Anzeige von Name und Gewinnsumme
    - Falls ja, Fehlermeldung
    - Falls nein, Option diesen einzulösen und zu invalidieren 
    
Skalierung der DB: Master Slave (lesend, da mehr lesende als schreibende Zugriffe)
Automatisches upscaling und downscaling, anhand welcher Metrik?
https://farberg.de/talks/cloud/?03d%20-%20Monitoring%20and%20Scalability.md#/21

Weshalb key value datenbank und keine relationale?

## Teil Prof. Sturm
Welche Vorteile und Nachteile ergeben sich für Ihre Anwendung aus der Realisierung als Cloud
Native? Zeigen Sie dabei auch alternative Realisierungsmöglichkeiten auf, stellen Sie diese der Cloud
Native Lösung gegenüber und erörtern Sie kritisch.
. Wie gewährleisten Sie die Datensicherheit? Bewerten Sie dabei auch die Relevanz der DSGVO für Ihre
Anwendung.

