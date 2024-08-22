import type { DefaultTranslationsObject, Language } from '../types.js'

export const daTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Konto',
    accountOfCurrentUser: 'Den nuværende brugers konto',
    accountVerified: 'Konto verifieret.',
    alreadyActivated: 'Allerede aktiveret',
    alreadyLoggedIn: 'Allerede logget ind',
    apiKey: 'API nøgle',
    authenticated: 'Godkendt',
    backToLogin: 'Tilbage til login',
    beginCreateFirstUser: 'For at starte, opret en bruger.',
    changePassword: 'Skift adgangskode',
    checkYourEmailForPasswordReset:
      'Tjek din email for at finde linket der vil give adgang til at ændre din adgangskode',
    confirmGeneration: 'Bekræft generering',
    confirmPassword: 'Bekræft adgangskode',
    createFirstUser: 'Opret bruger',
    emailNotValid: 'Ugyldig email',
    emailOrUsername: 'Email eller brugernavn',
    emailSent: 'Email sendt',
    emailVerified: 'Email verificeret.',
    enableAPIKey: 'Aktiver API nøgle',
    failedToUnlock: 'Kunne ikke låse op',
    forceUnlock: 'Tving oplåsning',
    forgotPassword: 'Glemt adgangskode',
    forgotPasswordEmailInstructions:
      'Indtast email nedenunder. Du vil modtage en email med instruktioner i hvordan du nulstiller din adgangskode.',
    forgotPasswordQuestion: 'Glemt adgangskode?',
    forgotPasswordUsernameInstructions:
      'Indtast brugernavn nedenunder. Instruktioner i hvordan du nulstiller din adgangskode vil blive sendt til den email der er tilknyttet brugeren.',
    generate: 'Generer',
    generateNewAPIKey: 'Generer ny API nøgle.',
    generatingNewAPIKeyWillInvalidate:
      'Generering af en ny API nøgle vil <1>ugyldiggøre</1> den tidligere nøgle. Vil du forsætte?',
    lockUntil: 'Lås indtil',
    logBackIn: 'Log på igen',
    logOut: 'Log ud',
    loggedIn: 'For at logge på med en anden bruger, skal du først <0>logge ud</0>.',
    loggedInChangePassword: 'For at ændre din adgangskode, gå til <0>konto</0> og ændr den der.',
    loggedOutInactivity: 'Du er blevet logget ud grundet inaktivitet.',
    loggedOutSuccessfully: 'Du er logget ud.',
    loggingOut: 'Logger ud...',
    login: 'Login',
    loginAttempts: 'Login forsøg',
    loginUser: 'Login bruger',
    loginWithAnotherUser: 'For at logge på med en anden bruger, skal du først <0>logge ud</0>.',
    logout: 'Log ud',
    logoutSuccessful: 'Log ud succesfuldt.',
    logoutUser: 'Log ud bruger',
    newAPIKeyGenerated: 'Ny API nøgle genereret.',
    newAccountCreated:
      'En ny bruger er blevet oprettet. <a href="{{serverURL}}">{{serverURL}}</a> Klik på linket eller kopier URL for at verificere din email: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Efter verificeringen af din email, kan du logge ind.',
    newPassword: 'Ny adgangskode',
    passed: 'Godkendt',
    passwordResetSuccessfully: 'Adgangskode nulstillet.',
    resetPassword: 'Nulstil adgangskode',
    resetPasswordExpiration: 'Nulstil udløbsdato for adgangskoden',
    resetPasswordToken: 'Nulstil adgangskode token',
    resetYourPassword: 'Nulstil din adgangskode',
    stayLoggedIn: 'Forbliv logget ind',
    successfullyRegisteredFirstUser: 'Bruger registreret.',
    successfullyUnlocked: 'Låst op',
    tokenRefreshSuccessful: 'Tokenopdatering blev gennemført med succes.',
    unableToVerify: 'Kan ikke verificere',
    username: 'Brugernavn',
    usernameNotValid: 'Brugernavnet er ugyldigt.',
    verified: 'Bekræftet',
    verifiedSuccessfully: 'Bekræftet succesfuldt',
    verify: 'Bekræft',
    verifyUser: 'Bekræft bruger',
    verifyYourEmail: 'Bekræft din email',
    youAreInactive:
      'Du har ikke været aktiv i et stykke tid og vil snart blive logget automatisk ud. Vil du forblive logget ind?',
    youAreReceivingResetPassword:
      'Du modtager dette, fordi du eller en anden har anmodet om at nulstille adgangskoden til din konto. Klik venligst på følgende link, eller indsæt det i din browser for at fuldføre processen:',
    youDidNotRequestPassword:
      'Hvis du ikke har anmodet om dette, skal du blot ignorere denne e-mail, og din adgangskode vil forblive uændret',
  },
  error: {
    accountAlreadyActivated: 'Denne konto er allerede blevet aktiveret.',
    autosaving: 'Der opstod et problem under autosaving af dette dokument.',
    correctInvalidFields: 'Venligst korriger ugyldige felter.',
    deletingFile: 'Der opstod en fejl under sletning af filen.',
    deletingTitle:
      'Der opstod en fejl under sletningen {{title}}. Tjek din forbindelse eller prøv igen.',
    emailOrPasswordIncorrect: 'Email eller brugernavn er forkert.',
    followingFieldsInvalid_one: 'Feltet er ugyldigt:',
    followingFieldsInvalid_other: 'Felterne er ugyldige:',
    incorrectCollection: 'Forkert samling',
    invalidFileType: 'Ugyldig filtype',
    invalidFileTypeValue: 'Ugyldig filtype: {{value}}',
    loadingDocument: 'Der opstod et problem med at loade dokumentet med ID {{id}}.',
    localesNotSaved_one: 'Følgende lokalitet kunne ikke gemmes:',
    localesNotSaved_other: 'Følgende lokaliteter kunne ikke gemmes:',
    logoutFailed: 'Log ud mislykket.',
    missingEmail: 'Mangler email.',
    missingIDOfDocument: 'Mangler ID af dokument til opdatering.',
    missingIDOfVersion: 'ID for version mangler.',
    missingRequiredData: 'Mangler påkrævet data.',
    noFilesUploaded: 'Ingen filer blev uploadet.',
    noMatchedField: 'Ingen matchende felt fundet for "{{label}}"',
    noUser: 'Ingen bruger',
    notAllowedToAccessPage: 'Du har ikke adgang til denne side.',
    notAllowedToPerformAction: 'Du har ikke adgang til denne handling.',
    notFound: 'Den anmodede ressource blev ikke fundet.',
    previewing: 'Der opstod et problem med at vise dokumentet.',
    problemUploadingFile: 'Der opstod et problem under uploadingen af filen.',
    tokenInvalidOrExpired: 'Token er enten ugyldig eller udløbet.',
    tokenNotProvided: 'Token ikke angivet.',
    unPublishingDocument: 'Der opstod et problem med at ophæve udgivelsen af dette dokument.',
    unableToDeleteCount: 'Kunne ikke slette {{count}} mangler {{total}} {{label}}.',
    unableToUpdateCount: 'Kunne ikke slette {{count}} mangler {{total}} {{label}}.',
    unauthorized: 'Uautoriseret, log in for at gennemføre handlingen.',
    unknown: 'En ukendt fejl er opstået.',
    unspecific: 'En fejl er opstået.',
    userEmailAlreadyRegistered: 'Email allerede registreret.',
    userLocked: 'Denne bruger er låst på grund af for mange fejlede loginforsøg',
    usernameAlreadyRegistered: 'Brugernavn allerede registeret.',
    usernameOrPasswordIncorrect: 'Bruger navn eller adgangskode er forkert.',
    valueMustBeUnique: 'Værdien skal være unik',
    verificationTokenInvalid: 'Verifikationstoken er ugyldigt.',
  },
  fields: {
    addLabel: 'Tilføj {{label}}',
    addLink: 'Tilføj Link',
    addNew: 'Tilføj ny',
    addNewLabel: 'Tilføj ny {{label}}',
    addRelationship: 'Tilføj forhold',
    addUpload: 'Tilføj upload',
    block: 'blok',
    blockType: 'Blok type',
    blocks: 'blokke',
    chooseBetweenCustomTextOrDocument:
      'Vælg mellem at indtaste en brugerdefineret tekst-URL eller linke til et andet dokument.',
    chooseDocumentToLink: 'Vælg et dokument at linke til',
    chooseFromExisting: 'Vælg fra eksiterende',
    chooseLabel: 'Vælg {{label}}',
    collapseAll: 'Skjul alt"',
    customURL: 'Brugerdefineret URL',
    editLabelData: 'Rediger {{label}} data',
    editLink: 'Rediger link',
    editRelationship: 'Rediger forhold',
    enterURL: 'Indtast URL',
    internalLink: 'Intern link',
    itemsAndMore: '{{items}} og {{count}} mere',
    labelRelationship: '{{label}} forhold',
    latitude: 'breddegrad',
    linkType: 'Link type',
    linkedTo: 'Linket til <0>{{label}}</0>',
    longitude: 'Længdegrad',
    newLabel: 'Ny {{label}}',
    openInNewTab: 'Åben i ny fane',
    passwordsDoNotMatch: 'Adgangskoder matcher ikke.',
    relatedDocument: 'Relateret dokument',
    relationTo: 'Relateret til',
    removeRelationship: 'Fjern forhold',
    removeUpload: 'Fjern upload',
    saveChanges: 'Gem ændringer',
    searchForBlock: 'Søg efter blok',
    selectExistingLabel: 'Vælg eksisterende {{label}}',
    selectFieldsToEdit: 'Vælg felter at redigere',
    showAll: 'Vis alle',
    swapRelationship: 'Byt forhold',
    swapUpload: 'Byt upload',
    textToDisplay: 'Tekst der skal vises',
    toggleBlock: 'Skift blok',
    uploadNewLabel: 'Upload ny {{label}}',
  },
  general: {
    aboutToDelete: 'Du er ved at slette {{label}} <1>{{title}}</1>. Er du sikker?',
    aboutToDeleteCount_many: 'Du er ved at slette {{count}} {{label}}',
    aboutToDeleteCount_one: 'Du er ved at slette {{count}} {{label}}',
    aboutToDeleteCount_other: 'Du er ved at slette {{count}} {{label}}',
    addBelow: 'Tilføj under',
    addFilter: 'Tilføj filter',
    adminTheme: 'Admin tema',
    and: 'Og',
    applyChanges: 'Tilføj ændringer',
    ascending: 'Stigende',
    automatic: 'Automatisk',
    backToDashboard: 'Tilbage til dashboard',
    cancel: 'Anuller',
    changesNotSaved:
      'Dine ændringer er ikke blevet gemt. Hvis du forlader siden, vil din ændringer gå tabt.',
    close: 'Luk',
    collapse: 'Skjul',
    collections: 'Samlinger',
    columnToSort: 'Kolonne at sortere',
    columns: 'Kolonner',
    confirm: 'Bekræft',
    confirmDeletion: 'Bekræft sletning',
    confirmDuplication: 'Bekræft duplikering',
    copied: 'Kopieret',
    copy: 'Kopier',
    create: 'Opret',
    createNew: 'Opret ny',
    createNewLabel: 'Opret ny {{label}}',
    created: 'Oprettet',
    createdAt: 'Oprettet til',
    creating: 'Opretter',
    creatingNewLabel: 'Opretter ny {{label}}',
    custom: 'Tilpasset',
    dark: 'Mørk',
    dashboard: 'Dashboard',
    delete: 'Slet',
    deletedCountSuccessfully: 'Slettet {{count}} {{label}}.',
    deletedSuccessfully: 'Slettet.',
    deleting: 'Sletter...',
    depth: 'Dybde',
    descending: 'Faldende',
    deselectAllRows: 'Fjern markering af alle rækker',
    document: 'Dokument',
    documents: 'Dokumenter',
    duplicate: 'Duplikér',
    duplicateWithoutSaving: 'Dupliker uden at gemme ændringer',
    edit: 'Redigere',
    editLabel: 'Redigere {{label}}',
    editing: 'Rediger',
    editingLabel_many: 'Rediger {{count}} {{label}}',
    editingLabel_one: 'Rediger {{count}} {{label}}',
    editingLabel_other: 'Rediger {{count}} {{label}}',
    email: 'Email',
    emailAddress: 'e-mailadresse',
    enterAValue: 'Indtast en værdi',
    error: 'Fejl',
    errors: 'Fejl',
    fallbackToDefaultLocale: 'Tilbagefald til standardlokalitet',
    false: 'Falsk',
    filter: 'Filter',
    filterWhere: 'Filter {{label}} hvor',
    filters: 'Filtre',
    globals: 'Globale',
    language: 'Sprog',
    lastModified: 'Sidst ændret',
    leaveAnyway: 'Forlad alligevel',
    leaveWithoutSaving: 'Forlad uden at gemme',
    light: 'Lys',
    livePreview: 'Live-forhåndsvisning',
    loading: 'Loader',
    locale: 'Lokalitet',
    locales: 'Lokaliteter',
    menu: 'Menu',
    moveDown: 'Ryk ned',
    moveUp: 'Ryk op',
    newPassword: 'Ny adgangskode',
    next: 'Næste',
    noFiltersSet: 'Ingen filtre angivet',
    noLabel: '<Ingen {{label}}>',
    noOptions: 'Ingen muligheder',
    noResults:
      'No {{label}} fundet. Enten findes der endnu ingen {{label}}, eller også matcher ingen af de filtre angivet ovenfor.',
    noValue: 'Ingen værdi',
    none: 'Ingen',
    notFound: 'Ikke fundet',
    nothingFound: 'Intet fundet',
    of: 'Af',
    open: 'Åben',
    or: 'Eller',
    order: 'Rækkefølge',
    pageNotFound: 'Siden blev ikke fundet',
    password: 'Adgangskode',
    payloadSettings: 'Payload-indstillinger',
    perPage: 'Per side: {{limit}}',
    previous: 'Tidligere',
    remove: 'Fjern',
    reset: 'Nulstil',
    row: 'Række',
    rows: 'Rækker',
    save: 'Gem',
    saving: 'Gemmer...',
    searchBy: 'Søg efter {{label}}',
    selectAll: 'Vælg alle {{count}} {{label}}',
    selectAllRows: 'Vælg alle rækker',
    selectValue: 'Vælg en værdi',
    selectedCount: '{{count}} {{label}} valgt',
    showAllLabel: 'Vis alle {{label}}',
    sorryNotFound: 'Beklager—der er intet, der svarer til din handling.',
    sort: 'Sorter',
    sortByLabelDirection: 'Sorter efter {{label}} {{direction}}',
    stayOnThisPage: 'Forbliv på siden',
    submissionSuccessful: 'Indsendt.',
    submit: 'Send',
    submitting: 'Sender...',
    success: 'Succes',
    successfullyCreated: '{{label}} oprettet.',
    successfullyDuplicated: '{{label}} duplikeret.',
    thisLanguage: 'Dansk',
    titleDeleted: '{{label}} "{{title}}" slettet.',
    true: 'Sandt',
    unauthorized: 'Uautoriseret',
    unsavedChangesDuplicate: 'Du har ikke-gemte ændringer. Vil du fortsætte med at duplikere?',
    untitled: 'Uden titel',
    updatedAt: 'Opdateret ved',
    updatedCountSuccessfully: 'Opdateret {{count}} {{label}} successfully.',
    updatedSuccessfully: 'Opdateret.',
    updating: 'Opdaterer',
    uploading: 'Uploader',
    user: 'Bruger',
    username: 'Brugernavn',
    users: 'Brugere',
    value: 'Værdi',
    welcome: 'Velkommen',
  },
  operators: {
    contains: 'Indeholder',
    equals: 'Lig med',
    exists: 'Eksisterer',
    intersects: 'Intersekterer',
    isGreaterThan: 'Er større end',
    isGreaterThanOrEqualTo: 'Er større end eller lig med',
    isIn: 'Er i',
    isLessThan: 'Er mindre end',
    isLessThanOrEqualTo: 'Er mindre end eller lig med',
    isLike: 'Ligner',
    isNotEqualTo: 'Er ikke lig med',
    isNotIn: 'Er ikke i',
    near: 'Tæt på',
    within: 'Inden for',
  },
  upload: {
    addFile: 'Tilføj fil',
    addFiles: 'Tilføj Filer',
    bulkUpload: 'Masseupload',
    crop: 'Beskær',
    cropToolDescription:
      'Træk i hjørnerne af det valgte område, tegn et nyt område eller juster værdierne nedenfor.',
    dragAndDrop: 'Træk og slip en fil',
    dragAndDropHere: 'Eller træk og slip en fil her',
    editImage: 'Rediger billede',
    fileName: 'Filnavn',
    fileSize: 'Filstørrelse',
    fileToUpload: 'Fil til upload',
    filesToUpload: 'Filer til upload',
    focalPoint: 'Fokuspunkt',
    focalPointDescription:
      'Træk fokuspunktet direkte på forhåndsvisningen eller juster værdierne nedenfor.',
    height: 'Højde',
    lessInfo: 'Mindre info',
    moreInfo: 'Mere info',
    pasteURL: 'Indsæt URL',
    previewSizes: 'Forhåndsvisningsstørrelser',
    selectCollectionToBrowse: 'Vælg en samling for at browse',
    selectFile: 'Vælg en fil',
    setCropArea: 'Indstil beskæringsområde',
    setFocalPoint: 'Indstil fokuspunkt',
    sizes: 'Størrelse',
    sizesFor: 'Størrelse for {{label}}',
    width: 'Bredde',
  },
  validation: {
    emailAddress: 'Indtast venligst en gyldig e-mailadresse.',
    enterNumber: 'Indtast venligst et gyldigt nummer.',
    fieldHasNo: 'Dette felt har ingen {{label}}',
    greaterThanMax: '{{value}} er større end det maksimalt tilladte {{label}} of {{max}}.',
    invalidInput: 'Dette felt har et ugyldigt indtastning.',
    invalidSelection: 'Dette felt har en ugyldig valg.',
    invalidSelections: 'Dette felt har følgende ugyldige valg:',
    lessThanMin: '{{value}} er mindre end den minimum tilladte {{label}} of {{min}}.',
    limitReached: 'Grænse nået, kun {{max}} elementer kan tilføjes.',
    longerThanMin: 'Denne værdi skal være længere end den minimale længde på {{minLength}} tegn.',
    notValidDate: '"{{value}}" er ikke en gyldig dato.',
    required: 'Dette felt er påkrævet.',
    requiresAtLeast: 'Dette felt kræver mindst {{count}} {{label}}.',
    requiresNoMoreThan: 'Dette felt kræver maks {{count}} {{label}}.',
    requiresTwoNumbers: 'Dette felt kræver to numre.',
    shorterThanMax: 'Denne værdi skal være kortere end den maksimale længde af {{maxLength}} tegn.',
    trueOrFalse: 'Denne værdi kan kun være lig med sandt eller falsk.',
    username:
      'Indtast et brugernavn. Kan indeholde bogstaver, tal, bindestreger, punktum og underscores.',
    validUploadID: 'Dette felt er ikke en gyldig upload-ID.',
  },
  version: {
    type: 'Type',
    aboutToPublishSelection:
      'Du er ved at offentliggøre alt {{label}} i denne sektion. Er du sikker?',
    aboutToRestore:
      'Du er ved at gendanne dette {{label}} dokument til den tilstand, det var i den {{versionDate}}.',
    aboutToRestoreGlobal:
      'Du er ved at gendanne den globale {{label}} til den tilstand, den var i den {{versionDate}}.',
    aboutToRevertToPublished:
      'Du er ved at tilbagerulle dette dokuments ændringer til dets offentliggjorte tilstand. Er du sikker?',
    aboutToUnpublish: 'Du er ved at afpublicere dette dokument. Er du sikker?',
    aboutToUnpublishSelection:
      'Du er ved at afpublicere alt {{label}} i denne sektion. Er du sikker?',
    autosave: 'Autosave',
    autosavedSuccessfully: 'Autosaved gennemført.',
    autosavedVersion: 'Autosaved version',
    changed: 'Ændret',
    compareVersion: 'Sammenlign version med:',
    confirmPublish: 'Bekræft offentliggørelse',
    confirmRevertToSaved: 'Bekræft tilbagerulning til gemt',
    confirmUnpublish: 'Bekræft afpublicering',
    confirmVersionRestoration: 'Bekræft versionens gendannelse',
    currentDocumentStatus: 'Nuværende {{docStatus}} dokument',
    currentDraft: 'Nuværende kladde',
    currentPublishedVersion: 'Nuværende offentliggjort version',
    draft: 'Kladde',
    draftSavedSuccessfully: 'Kladde gemt.',
    lastSavedAgo: 'Sidst gemt {{distance}}',
    noFurtherVersionsFound: 'Ingen yderligere versioner fundet',
    noRowsFound: 'Ingen {{label}} fundet',
    preview: 'Forhåndsvisning',
    previouslyPublished: 'Tidligere offentliggjort',
    problemRestoringVersion: 'Der opstod et problem med at gendanne denne version',
    publish: 'Offentliggør',
    publishChanges: 'Offentliggør ændringer',
    published: 'Offentliggjort',
    publishing: 'Offentliggør',
    restoreAsDraft: 'Gendan som kladde',
    restoreThisVersion: 'Gendan denne version',
    restoredSuccessfully: 'Gendannet.',
    restoring: 'Gendanner...',
    revertToPublished: 'Tilbagerul til offentliggjort',
    reverting: 'Tilbageruller...',
    saveDraft: 'Gem kladde',
    selectLocales: 'Vælg lokaliteter, der skal vises',
    selectVersionToCompare: 'Vælg en version til sammenligning',
    showLocales: 'Vis lokaliteter:',
    showingVersionsFor: 'Viser versioner for:',
    status: 'Status',
    unpublish: 'Afpublicer',
    unpublishing: 'Afpublicerer...',
    version: 'Version',
    versionCount_many: '{{count}} versioner fundet',
    versionCount_none: 'Ingen versioner fundet',
    versionCount_one: '{{count}} version fundet',
    versionCount_other: '{{count}} version fundet',
    versionCreatedOn: '{{version}} oprettet den:',
    versionID: 'Versions-ID',
    versions: 'Versioner',
    viewingVersion: 'Se versionen for {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Se version for det globale {{entityLabel}}',
    viewingVersions: 'Se versioner for {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Se versioner for det global {{entityLabel}}',
  },
}

export const da: Language = {
  dateFNSKey: 'da-DK',
  translations: daTranslations,
}
