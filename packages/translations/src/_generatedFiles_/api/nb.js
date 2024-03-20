export default {
  authentication: {
    account: 'Konto',
    apiKey: 'API-nøkkel',
    enableAPIKey: 'Aktiver API-nøkkel',
    newAccountCreated:
      'En ny konto har blitt opprettet for deg på <a href="{{serverURL}}">{{serverURL}}</a> Klikk på lenken nedenfor eller lim inn URLen i nettleseren din for å bekrefte e-postadressen din: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Etter at du har bekreftet e-postadressen din, kan du logge inn.',
    resetYourPassword: 'Tilbakestill passordet ditt',
    verified: 'Bekreftet',
    verifyYourEmail: 'Bekreft e-postadressen din',
    youAreReceivingResetPassword:
      'Du mottar denne e-posten fordi du (eller noen andre) har bedt om tilbakestilling av passordet til kontoen din. Klikk på lenken nedenfor, eller lim den inn i nettleseren din for å fullføre prosessen:',
    youDidNotRequestPassword:
      'Hvis du ikke har bedt om dette, kan du ignorere denne e-posten, og passordet ditt vil forbli uendret.',
  },
  error: {
    deletingFile: 'Det oppstod en feil under sletting av filen.',
    emailOrPasswordIncorrect: 'E-postadressen eller passordet er feil.',
    followingFieldsInvalid_one: 'Følgende felt er ugyldig:',
    followingFieldsInvalid_other: 'Følgende felter er ugyldige:',
    noFilesUploaded: 'Ingen filer ble lastet opp.',
    notAllowedToPerformAction: 'Du har ikke tillatelse til å utføre denne handlingen.',
    problemUploadingFile: 'Det oppstod et problem under opplasting av filen.',
    unableToDeleteCount: 'Kan ikke slette {{count}} av {{total}} {{label}}.',
    unableToUpdateCount: 'Kan ikke oppdatere {{count}} av {{total}} {{label}}.',
    unauthorized: 'Uautorisert, du må være innlogget for å gjøre denne forespørselen.',
    userLocked: 'Denne brukeren er låst på grunn av for mange mislykkede innloggingsforsøk.',
    valueMustBeUnique: 'Verdien må være unik',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Velg mellom å skrive inn en egen tekst-URL eller å lenke til et annet dokument.',
    chooseDocumentToLink: 'Velg et dokument å lenke til',
    customURL: 'Egendefinert URL',
    enterURL: 'Skriv inn en URL',
    internalLink: 'Intern lenke',
    linkType: 'Lenketype',
    openInNewTab: 'Åpne i ny fane',
    textToDisplay: 'Tekst som skal vises',
  },
  general: {
    copy: 'Kopiér',
    createdAt: 'Opprettet',
    deletedCountSuccessfully: 'Slettet {{count}} {{label}}.',
    deletedSuccessfully: 'Slettet.',
    email: 'E-post',
    notFound: 'Ikke funnet',
    row: 'Rad',
    rows: 'Rader',
    successfullyCreated: '{{label}} ble opprettet.',
    successfullyDuplicated: '{{label}} ble duplisert.',
    thisLanguage: 'Norsk',
    updatedAt: 'Oppdatert',
    updatedCountSuccessfully: 'Oppdaterte {{count}} {{label}} vellykket.',
    updatedSuccessfully: 'Oppdatert.',
    user: 'Bruker',
    users: 'Brukere',
    value: 'Verdi',
  },
  upload: {
    fileName: 'Filnavn',
    fileSize: 'Filstørrelse',
    height: 'Høyde',
    sizes: 'Størrelser',
    width: 'Bredde',
  },
  validation: {
    emailAddress: 'Vennligst skriv inn en gyldig e-postadresse.',
    enterNumber: 'Vennligst skriv inn et gyldig tall.',
    greaterThanMax: '{{value}} er større enn den tillatte maksimale {{label}} på {{max}}.',
    invalidInput: 'Dette feltet har en ugyldig inndata.',
    invalidSelection: 'Dette feltet har en ugyldig utvalg.',
    invalidSelections: 'Dette feltet har følgende ugyldige utvalg:',
    lessThanMin: '{{value}} er mindre enn den tillatte minimale {{label}} på {{min}}.',
    longerThanMin: 'Denne verdien må være lengre enn minimumslengden på {{minLength}} tegn.',
    notValidDate: '"{{value}}" er ikke en gyldig dato.',
    required: 'Dette feltet er påkrevd.',
    requiresAtLeast: 'Dette feltet krever minst {{count}} {{label}}.',
    requiresNoMoreThan: 'Dette feltet krever maksimalt {{count}} {{label}}.',
    requiresTwoNumbers: 'Dette feltet krever to tall.',
    shorterThanMax: 'Denne verdien må være kortere enn maksimal lengde på {{maxLength}} tegn.',
    trueOrFalse: 'Dette feltet kan bare være likt true eller false.',
    validUploadID: 'Dette feltet er ikke en gyldig opplastings-ID.',
  },
  version: {
    autosavedSuccessfully: 'Lagret automatisk.',
    draft: 'Utkast',
    draftSavedSuccessfully: 'Utkast lagret.',
    published: 'Publisert',
    restoredSuccessfully: 'Gjenopprettet.',
    status: 'Status',
  },
}
