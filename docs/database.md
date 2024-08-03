# Database

Ein Kunde wird durch einen Eintrag in der Customer Tabelle repsäsentiert. Details zu Login(sign in with apple/google/fb)/Zahlungsinformationen/wiederkehrenden Kunden unbekannt. Evtl: Wenn ein Kunde zwei Trails macht, gibt es zwei Einträge in der Kundentabelle

Ein Kunde sucht über die Webseite einen Trail aus. Dieser liegt in einer Stadt/in einem Land.

Ein Kunde kauft einen Trail. Sobald der Kunde den trail startet, wird die aktuelle TrailVersion vermerkt. Dies soll dafür sorgen, dass ein Kunde immer die selbe Trailversion macht, auch wenn er die webseite ein paar Wochen später nochmal macht. Eine Trailversion ist so gedacht, dass sie keine breaking changes enthält. Also zB Rechtschreibfehler korrigieren, okay. Den Sinn von Nachrichten/Rätseln ändern, nicht okay. Das sorgt für Konsistenz bei Usern und sichert ab, dass der Trail unterbrochen und später weiter gemacht werden kann. Wenn solche breaking Changes gemacht werden sollen, dann muss eine neue TrailVersion angelegt werden.

In einer TrailVersion sind immer die Personen und Orte hinterlegt. Diese beiden werden in der ActorPlaces Tabelle vereint. Dort steht der eigentliche Inhalt der Rätsel drin.

Die Trails verfügen über einen Softdelete, indem sie über ein flag auf deleted gesetzt werden können. So kann man sie sich später nocheinmal ansehen oder ggf. auch wieder freischalten. Ausserdem verfügen sie über ein publish-feld, mit welchem sie vor dem freischalten für kunden schon in der Datenbank angelegt werden und getestet werden können. Zu delete und publish wird immer der Änderungszeitpunkt gespeichert.

:::mermaid
erDiagram

  Customer }|--|| Trails : bucht
  Trails ||--|{ TrailVersions : hat
  Trails }o--|| City : findet_statt_in
  City }o--|| Country : liegt_in
  Customer }|..|| TrailVersions : bekommt_zum_Startzeitpunkt_aktuellste_Version
  TrailVersions ||--|{ Actors : gehoert_zu
  TrailVersions ||--|{ Places : gehoert_zu
  Actors ||--|{ ActorPlaces : jede_Person_hat_an_jedem_Ort_eine_Story
  Places ||--|{ ActorPlaces : jeder_Ort_wird_zu_jeder_Person_zugeordnet

  Customer {
    Guid Id PK
    Guid TrailId FK
    Guid TrailVersionId FK
    DateTime StartDate
    DateTime EndDate
    idk VerificationCode
  }

  Trails {
    Guid Id PK
    Guid CityId PK
    String Name
    String Description
    boolean Published
    DateTime PublishDate
    boolean Deleted
    DateTime DeleteDate
  }

  City {
    Guid Id PK
    Guid CountryId PK
    String Name
    String Description
    boolean Published
    DateTime PublishDate
    boolean Deleted
    DateTime DeleteDate
  }

  Country {
    Guid Id PK
    String Name
    String Description
    boolean Published
    DateTime PublishDate
    boolean Deleted
    DateTime DeleteDate
  }

  TrailVersions {
    Guid Id PK
    Guid TrailId FK
    int VersionNumber
  }

  Actors {
    Guid Id PK
    Guid TrailVersionId FK
    String Name
    byte[] Image
  }

  Places {
    Guid Id PK
    Guid TrailVersionId FK
    String Name
  }

  ActorPlaces {
    Guid PlaceId PK, FK
    Guid ActorId PK, FK
    X Coordinates
    String Message
    String_JsonArray Hints
    String_JsonArray Solutions
    String SolutionMessage
    byte[] SolutionFile
  }

:::