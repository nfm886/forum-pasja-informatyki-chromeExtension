# Powiadomienia z Pasją

Rozszerzenie do przeglądarki Google Chrome, przygotowane z myslą o forum.pasja-informatyki.pl.

Dodatek znajduje się w [Chrome WebStore](https://chrome.google.com/webstore/detail/powiadomienia-z-pasją/dmmcokdhdhjkhifpdfbanobonhmacped), skąd też zachęcam do pobrania.

# CHANGELOG

Wersja 2.1
  - Dodano możliwość ustawienia jednego z dwóch motywów: Jasny (domyślny) i Ciemny.
  - Dodano możliwość włączenia dźwięków dla powiadomień: wszystkich, tylko wiadomości prywatnych lub wyłączenia (domyślnie).

Wersja 2.0
 - Asynchroniczne generowanie powiadomień z odpowiedzi na zapytanie wysyłane na */eventnotify* end-point.
 - Asynchroniczne sprawdzanie (co 60 sekund) liczby nowych powiadomień z odpowiedzi na zapytanie wysłane na */async-notifications* end-point.
 
Wersja 1.0
 - Generowanie powiadomień na podstawie podstrony /updates.
 - Sprawdzanie powiadomień (co 60 sekund) scrapując stronę główną i wyciągając informację o liczbie nowych powiadomień.

### Instalacja z repozytorium

Aby zainstalować dodatek z repozytorium, wystarczy sklonować repo, a następnie w przeglądarce załadować rozpakowany pakiet w trybie programisty

Tworzyny katalog dla rozszerzenia i klonujemy repozytorium

```sh
$ mkdir Powiadomienia-z-Pasją && cd Powiadomienia-z-Pasją
$ git clone https://github.com/nfm886/forum-pasja-informatyki-chromeExtension.git .
```

Włączamy przeglądarkę Chrome i przechodzimy pod adres **chrome://extensions**, uruchamiamy *tryb programisty* i naciskamy **załaduj rozpakowane**, po czym wskazujemy katalog Powiadomienia-z-Pasją.

Debuggowanie skryptu w tle (**background.js**) moemy rozpącząc klikając *strona w tle* na karcie z rozszerzeniami Chrome.
Jeśli chcemy debugować okienko popup, po kliknięciu ikony dodatku na toolbarze Google Chrome, naciskamy prawy klawisz myszy i wybieramy **zbadaj**. Tym sposobem odpalimy Dev Toolsy.


### TODO

 - Dodać możliwość obserwowania wybranych tagów z forum

LICENSE
----

MIT
