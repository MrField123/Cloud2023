# Cloud2023
 Der ortliche Sportverein verlost zu jeder Veranstaltung Wertkarten. Aktuell werden die Wertkarten den Gewinnern vor der Veranstaltung zugesendet. 
 Dieser Prozess soll wie folgt durch eine Cloud-Anwendung digitalisiert werden:
 ## Funktion 1 (Admin)
 - Upload der Gewinner in die Anwendung (einzeln und als Excel-Upload)
 - Generierung von QR-Codes (einer je Gewinner), welcher zur Verifikation des Gewinns dienen
 - Mit dem QR-Code sind sowohl Gewinnername als Gewinnsumme verknüpft
## Funktion 2 (Kassierer + Admin):
- Scan des QR-Codes an der Abendkasse
- Prüfung, ob dieser bereits eingelöst wurdesamt Anzeige von Name und Gewinnsumme
    - Falls ja, Fehlermeldung
    - Falls nein, Option diesen einzulösen und zu invalidieren 

