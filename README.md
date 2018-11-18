# Powiadomienia z Pasją

Rozszerzenie do przeglądarki Google Chrome, przygotowane z myslą o forum.pasja-informatyki.pl.

Dodatek znajduje się w [Chrome WebStore](https://chrome.google.com/webstore/detail/powiadomienia-z-pasją/dmmcokdhdhjkhifpdfbanobonhmacped), skąd też zachęcam do pobrania.

### CHANGELOG

Wersja 5.0
  - Dodano powiadomienia dźwiękowe i przez plakietkę o nowych tagach.
  - Naprawiono błąd przez, który trzeba było zamknąć i otworzyć okienko, aby tagi się zaaktualizowały (teraz okienko jest przeładowywane po przejściu do obserwowanych)
  - Kilka mniejszych poprawek

Wersja 4.0
  - Usunięto dublowanie się pytań, przy obserwowaniu kilku tagów, które zostały użyte w tym samym poście.
  - Zablokowano zakładkę "Pokaż" jeśli nie obserwuje się żadnych tagów.
  - Upiększenie jasnego motywu, głównie w zakładce "Obserwowane" i drobne poprawki w ciemnym motywie.
  - Kilka mniejszych poprawek i usprawnień.

Wersja 3.1
  - Usunięto błąd, przez który dodatek wpadał w 'bootloopa', jeśli użytkownik nie był zalogowany na forum.

Wersja 3.0
  - Dodano możliwość obserwowania wybranych tagów z forum.
  - Kilka mniejszych usprawnień.

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

Włączamy przeglądarkę Chrome i przechodzimy pod adres ```chrome://extensions```, uruchamiamy **tryb programisty** i naciskamy **załaduj rozpakowane**, po czym wskazujemy katalog ```Powiadomienia-z-Pasją```.

Debuggowanie skryptu w tle (**background.js**) moemy rozpącząc klikając **strona w tle** na karcie z rozszerzeniami Chrome.
Jeśli chcemy debugować okienko popup, po kliknięciu ikony dodatku na toolbarze Google Chrome, naciskamy prawy klawisz myszy i wybieramy **zbadaj**. Tym sposobem odpalimy Dev Toolsy.


### TODO

 - ~~Dodać możliwość obserwowania wybranych tagów z forum~~
 - ~~Informowanie o nowych tagach poprzez plakietkę.~~
 - ~~Naprawić błąd, przez który trzeba zamknąć i otworzyć okienko, aby tagi się pobrały.~~

### LICENSE
----

MIT
