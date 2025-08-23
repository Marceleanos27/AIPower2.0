// database.js
// Kompletná databáza informácií o spoločnosti GRANDEN s.r.o.

window.grandenData = {
  meno: "GRANDEN s.r.o.",
  zalozena: 2003,
  zakladatelia: ["Eva Gránska", "Jozef Kollár"],
  vykonnyriaditel: ["Ing. Miloš Lehocký"],
  sidlo: "Račianska 123, Bratislava, Slovensko",
  pobočky: [
    { mesto: "Bratislava", adresa: "Račianska 123" },
    { mesto: "Praha", adresa: "Vinohradská 45" },
    { mesto: "Nitra", adresa: "Mostná 60" }
  ],
  segmenty: ["Neživotné poistenie", "Firemné riziká", "Privátne poistenie"],
  popis: "Nezávislý poisťovací maklér pôsobiaci na trhu SR a ČR, špecializovaný na audit zmlúv, monitoring poistného trhu a likvidáciu poistných udalostí.",
  sluzby: [
    {
      nazov: "Audit poistných zmlúv",
      cena: "Zadarmo pri aktívnej spolupráci",
      popis: "Komplexná kontrola existujúcich poistných zmlúv pre optimalizáciu krytia a zníženie nákladov."
    },
    {
      nazov: "Monitoring poistného trhu",
      cena: "v cene servisu",
      popis: "Priebežné sledovanie nových poistných produktov a cien od rôznych poisťovní."
    },
    {
      nazov: "24/7 asistencia osobného makléra",
      cena: "Individuálne – podľa rozsahu zmluvy",
      popis: "Okamžitá telefonická aj online podpora pre klientov 24 hodín denne."
    },
    {
      nazov: "Likvidácia poistných udalostí",
      cena: "Zahŕňa sa v správe zmlúv",
      popis: "Kompletná asistencia pri nahlasovaní a vybavovaní poistných udalostí až po finálne vyplatenie."
    }
  ],
  kontakty: {
    web: "https://www.granden.sk",
    email: "info@granden.sk",
    telefon: "+421 2 4363 1234",
    facebook: "https://www.facebook.com/granden",
    linkedin: "https://www.linkedin.com/company/granden"
  
  },
  pracovne_hodiny: {
    pondelok: "8:00–17:00",
    utorok: "8:00–17:00",
    streda: "8:00–17:00",
    stvrtok: "8:00–17:00",
    piatok: "8:00–16:00",
    sobota: "zatvorené",
    nedela: "zatvorené"
  },

   booking: {
    calendly: "https://calendly.com/aipoweragency/new-meeting",
   
  },
  
  partnerstvá: [
    "Slovenský olympijský športový výbor",
    "Mestská športová akadémia Bratislava"
  ],
  filozofia: "Klient na prvom mieste – osobný prístup, transparentnosť a dlhodobá spolupráca.",
  udržateľnosť: {
    opatrenia: [
      "Zníženie papierovej dokumentácie procesmi digitalizácie",
      "Ekologická kancelárska prevádzka (recyklácia, LED osvetlenie)"
    ]
  },
  GDPR: true,
  pocet_zamestnancov: 15,
  r_and_d: false
};
