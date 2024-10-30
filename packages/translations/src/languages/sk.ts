import type { DefaultTranslationsObject, Language } from '../types.js'

export const skTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Účet',
    accountOfCurrentUser: 'Aktuálny používateľský účet',
    accountVerified: 'Účet úspešne overený.',
    alreadyActivated: 'Už aktivované',
    alreadyLoggedIn: 'Už prihlásený',
    apiKey: 'API kľúč',
    authenticated: 'Overený',
    backToLogin: 'Späť na prihlásenie',
    beginCreateFirstUser: 'Začnite vytvorením prvého používateľa.',
    changePassword: 'Zmeniť heslo',
    checkYourEmailForPasswordReset:
      'Skontrolujte svoj e-mail a nájdite odkaz, ktorý vám umožní bezpečne obnoviť heslo.',
    confirmGeneration: 'Potvrdiť generovanie',
    confirmPassword: 'Potvrdiť heslo',
    createFirstUser: 'Vytvorenie prvého používateľa',
    emailNotValid: 'Zadaný e-mail nie je platný',
    emailOrUsername: 'E-mail alebo Užívateľské meno',
    emailSent: 'E-mail bol odoslaný',
    emailVerified: 'Email úspešne overený.',
    enableAPIKey: 'Povolenie API kľúča',
    failedToUnlock: 'Nepodarilo sa odomknúť',
    forceUnlock: 'Vynútené odomknutie',
    forgotPassword: 'Zabudli ste heslo?',
    forgotPasswordEmailInstructions:
      'Zadajte svoj e-mail nižšie. Dostanete e-mail s pokynmi na obnovenie hesla.',
    forgotPasswordQuestion: 'Zabudli ste heslo?',
    forgotPasswordUsernameInstructions:
      'Prosím, zadajte nižšie svoje používateľské meno. Inštrukcie na obnovenie vášho hesla budú odoslané na e-mailovú adresu spojenú s vaším používateľským menom.',
    generate: 'Generovať',
    generateNewAPIKey: 'Vygenerovať nový API kľúč',
    generatingNewAPIKeyWillInvalidate:
      'Vytvorenie nového API kľúča <1>zneplatní</1> predchádzajúci kľúč. Ste si istí, že chcete pokračovať?',
    lockUntil: 'Uzamknúť do',
    logBackIn: 'Znovu sa prihlásiť',
    loggedIn: 'Ak sa chcete prihlásiť pomocou iného používateľa, najprv sa <0>odhláste</0>.',
    loggedInChangePassword:
      'Ak chcete zmeniť heslo, prejdite na svoj <0>oúčet</0> a upravte heslo tam.',
    loggedOutInactivity: 'Boli ste odhlásení z dôvodu nečinnosti.',
    loggedOutSuccessfully: 'Boli ste úspešne odhlásení.',
    loggingOut: 'Odhlásenie...',
    login: 'Prihlásiť sa',
    loginAttempts: 'Pokusy o prihlásenie',
    loginUser: 'Prihlásenie používateľa',
    loginWithAnotherUser:
      'Ak sa chcete prihlásiť pomocou iného používateľa, najprv sa <0>odhláste</0>.',
    logOut: 'Odhlásiť sa',
    logout: 'Odhlásiť sa',
    logoutSuccessful: 'Odhlásenie bolo úspešné.',
    logoutUser: 'Odhlásiť používateľa',
    newAccountCreated:
      'Pre prístup k <a href="{{serverURL}}">{{serverURL}}</a> bol pre vás vytvorený nový účet. Kliknite na nasledujúci odkaz alebo skopírujte URL do svojho prehliadača na overenie vášho emailu: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Po overení vášho emailu sa budete môcť úspešne prihlásiť.',
    newAPIKeyGenerated: 'Bol vygenerovaný nový API kľúč.',
    newPassword: 'Nové heslo',
    passed: 'Overenie prešlo',
    passwordResetSuccessfully: 'Úspešne zmenené heslo.',
    resetPassword: 'Obnoviť heslo',
    resetPasswordExpiration: 'Vypršanie platnosti obnovenia hesla',
    resetPasswordToken: 'Token na resetovanie hesla',
    resetYourPassword: 'Obnovte svoje heslo',
    stayLoggedIn: 'Zostaňte prihlásení',
    successfullyRegisteredFirstUser: 'Úspešne zaregistrovaný prvý používateľ.',
    successfullyUnlocked: 'Úspešne odomknuté',
    tokenRefreshSuccessful: 'Obnovenie tokenu bolo úspešné.',
    unableToVerify: 'Nemožno overiť',
    username: 'Používateľské meno',
    usernameNotValid: 'Zadané užívateľské meno nie je platné.',
    verified: 'Overené',
    verifiedSuccessfully: 'Úspešne overené',
    verify: 'Overiť',
    verifyUser: 'Overiť používateľa',
    verifyYourEmail: 'Overiť e-mail',
    youAreInactive:
      'Už nejaký čas ste neaktívny a čoskoro budete z bezpečnostných dôvodov automaticky odhlásený. Chcete zostať prihlásený?',
    youAreReceivingResetPassword:
      'Tento email dostanete, pretože ste (alebo niekto iný) požiadali o resetovanie hesla pre váš účet.',
    youDidNotRequestPassword:
      'Ak ste o to nepožiadali, ignorujte prosím tento e-mail a vaše heslo zostane nezmenené.',
  },
  error: {
    accountAlreadyActivated: 'Tento účet už bol aktivovaný.',
    autosaving: 'Pri automatickom ukladaní tohto dokumentu došlo k chybe.',
    correctInvalidFields: 'Opravte neplatné polia.',
    deletingFile: 'Pri mazaní súboru došlo k chybe.',
    deletingTitle:
      'Pri mazaní {{title}} došlo k chybe. Skontrolujte svoje pripojenie a skúste to znova.',
    emailOrPasswordIncorrect: 'Zadaný email alebo heslo nie je správne.',
    followingFieldsInvalid_one: 'Nasledujúce pole je neplatné:',
    followingFieldsInvalid_other: 'Nasledujúce polia sú neplatné:',
    incorrectCollection: 'Nesprávna kolekcia',
    invalidFileType: 'Neplatný typ súboru',
    invalidFileTypeValue: 'Neplatný typ súboru: {{value}}',
    loadingDocument: 'Pri načítaní dokumentu s ID {{id}} došlo k chybe.',
    localesNotSaved_one: 'Nasledujúci jazyk sa nepodarilo uložiť:',
    localesNotSaved_other: 'Nasledujúce jazyky sa nepodarilo uložiť:',
    logoutFailed: 'Odhlásenie zlyhalo.',
    missingEmail: 'Chýba e-mail.',
    missingIDOfDocument: 'Chýba ID dokumentu na aktualizáciu.',
    missingIDOfVersion: 'Chýba ID verzie.',
    missingRequiredData: 'Chýbajú požadované údaje.',
    noFilesUploaded: 'Nenahrali sa žiadne súbory.',
    noMatchedField: 'Pre "{{label}}" nebolo nájdené žiadne zodpovedajúce pole',
    notAllowedToAccessPage: 'Nemáte povolenie pristupovať k tejto stránke.',
    notAllowedToPerformAction: 'Nemáte povolenie vykonávať túto akciu.',
    notFound: 'Požadovaný zdroj nebol nájdený.',
    noUser: 'Žiadny používateľ',
    previewing: 'Pri náhľade tohto dokumentu došlo k chybe.',
    problemUploadingFile: 'Pri nahrávaní súboru došlo k chybe.',
    tokenInvalidOrExpired: 'Token je neplatný alebo vypršal.',
    tokenNotProvided: 'Token nie je poskytnutý.',
    unableToDeleteCount: 'Nie je možné zmazať {{count}} z {{total}} {{label}}.',
    unableToUpdateCount: 'Nie je možné aktualizovať {{count}} z {{total}} {{label}}.',
    unauthorized: 'Neautorizováno, pro zadání tohoto požadavku musíte být přihlášeni.',
    unknown: 'Došlo k neznámej chybe.',
    unPublishingDocument: 'Pri zrušení publikovania tohto dokumentu došlo k chybe.',
    unspecific: 'Došlo k chybe.',
    userEmailAlreadyRegistered: 'Používateľ s daným e-mailom je už zaregistrovaný.',
    userLocked:
      'Tento používateľ je uzamknutý kvôli príliš mnohým neúspešným pokusom o prihlásenie.',
    usernameAlreadyRegistered: 'Používateľ s daným používateľským menom je už zaregistrovaný.',
    usernameOrPasswordIncorrect: 'Zadané meno alebo heslo je nesprávne.',
    valueMustBeUnique: 'Hodnota musí byť jedinečná',
    verificationTokenInvalid: 'Overovací token je neplatný.',
  },
  fields: {
    addLabel: 'Pridať {{label}}',
    addLink: 'Pridať odkaz',
    addNew: 'Pridať nový',
    addNewLabel: 'Pridať nový {{label}}',
    addRelationship: 'Pridať vzťah',
    addUpload: 'Pridať nahrávanie',
    block: 'blok',
    blocks: 'bloky',
    blockType: 'Typ bloku',
    chooseBetweenCustomTextOrDocument:
      'Vyberte medzi vložením vlastného textového URL alebo odkazovaním na iný dokument.',
    chooseDocumentToLink: 'Vyberte dokument, na ktorý sa chcete odkázať',
    chooseFromExisting: 'Vybrať z existujúcich',
    chooseLabel: 'Vybrať {{label}}',
    collapseAll: 'Zbaliť všetko',
    customURL: 'Vlastné URL',
    editLabelData: 'Upraviť dáta {{label}}',
    editLink: 'Upraviť odkaz',
    editRelationship: 'Upraviť vzťah',
    enterURL: 'Zadajte URL',
    internalLink: 'Interný odkaz',
    itemsAndMore: '{{items}} a {{count}} ďalších',
    labelRelationship: 'Vzťah {{label}}',
    latitude: 'Zemepisná šírka',
    linkedTo: 'Odkaz na <0>{{label}}</0>',
    linkType: 'Typ odkazu',
    longitude: 'Zemepisná dĺžka',
    newLabel: 'Nový {{label}}',
    openInNewTab: 'Otvoriť v novej záložke',
    passwordsDoNotMatch: 'Heslá sa nezhodujú.',
    relatedDocument: 'Súvisiaci dokument',
    relationTo: 'Vzťah k',
    removeRelationship: 'Odstrániť vzťah',
    removeUpload: 'Odstrániť nahranie',
    saveChanges: 'Uložiť zmeny',
    searchForBlock: 'Hľadať blok',
    selectExistingLabel: 'Vybrať existujúci {{label}}',
    selectFieldsToEdit: 'Vyberte polia, ktoré chcete upraviť',
    showAll: 'Zobraziť všetko',
    swapRelationship: 'Zameniť vzťah',
    swapUpload: 'Vymeniť nahranie',
    textToDisplay: 'Text na zobrazenie',
    toggleBlock: 'Prepnúť blok',
    uploadNewLabel: 'Nahrať nový {{label}}',
  },
  general: {
    aboutToDelete: 'Chystáte sa odstrániť {{label}} <1>{{title}}</1>. Ste si istí?',
    aboutToDeleteCount_many: 'Chystáte sa zmazať {{count}} {{label}}',
    aboutToDeleteCount_one: 'Chystáte sa zmazať {{count}} {{label}}',
    aboutToDeleteCount_other: 'Chystáte sa zmazať {{count}} {{label}}',
    addBelow: 'Pridať pod',
    addFilter: 'Pridať filter',
    adminTheme: 'Motív administračného rozhrania',
    and: 'a',
    anotherUser: 'Iný používateľ',
    anotherUserTakenOver: 'Iný používateľ prevzal úpravy tohto dokumentu.',
    applyChanges: 'Použiť zmeny',
    ascending: 'Vzostupne',
    automatic: 'Automatický',
    backToDashboard: 'Späť na nástenku',
    cancel: 'Zrušiť',
    changesNotSaved: 'Vaše zmeny neboli uložené. Ak teraz odídete, stratíte svoje zmeny.',
    clearAll: 'Vymazať všetko',
    close: 'Zavrieť',
    collapse: 'Zbaliť',
    collections: 'Kolekcia',
    columns: 'Stĺpce',
    columnToSort: 'Stĺpec na zoradenie',
    confirm: 'Potvrdiť',
    confirmDeletion: 'Potvrdiť odstránenie',
    confirmDuplication: 'Potvrdiť duplikáciu',
    copied: 'Skopírované',
    copy: 'Kopírovať',
    create: 'Vytvoriť',
    created: 'Vytvořeno',
    createdAt: 'Vytvorené v',
    createNew: 'Vytvoriť nové',
    createNewLabel: 'Vytvoriť nový {{label}}',
    creating: 'Vytváranie',
    creatingNewLabel: 'Vytváranie nového {{label}}',
    currentlyEditing:
      'práve upravuje tento dokument. Ak prevezmete kontrolu, budú zablokovaní z pokračovania v úpravách a môžu tiež stratiť neuložené zmeny.',
    custom: 'Vlastný',
    dark: 'Tmavý',
    dashboard: 'Nástenka',
    delete: 'Odstrániť',
    deletedCountSuccessfully: 'Úspešne zmazané {{count}} {{label}}.',
    deletedSuccessfully: 'Úspešne odstránené.',
    deleting: 'Odstraňovanie...',
    depth: 'Hĺbka',
    descending: 'Zostupne',
    deselectAllRows: 'Zrušiť výber všetkých riadkov',
    document: 'Dokument',
    documentLocked: 'Dokument je zamknutý',
    documents: 'Dokumenty',
    duplicate: 'Duplikovať',
    duplicateWithoutSaving: 'Duplikovať bez uloženia zmien',
    edit: 'Upraviť',
    editedSince: 'Upravené od',
    editing: 'Úpravy',
    editingLabel_many: 'Úprava {{count}} {{label}}',
    editingLabel_one: 'Úprava {{count}} {{label}}',
    editingLabel_other: 'Úprava {{count}} {{label}}',
    editingTakenOver: 'Úpravy prevzaté',
    editLabel: 'Upraviť {{label}}',
    email: 'E-mail',
    emailAddress: 'E-mailová adresa',
    enterAValue: 'Zadajte hodnotu',
    error: 'Chyba',
    errors: 'Chyby',
    fallbackToDefaultLocale: 'Zálohovať do predvoleného jazyka',
    false: 'Nepravdivé',
    filter: 'Filter',
    filters: 'Filtry',
    filterWhere: 'Filtrovat kde je {{label}}',
    globals: 'Globalné',
    goBack: 'Vrátiť sa',
    isEditing: 'upravuje',
    language: 'Jazyk',
    lastModified: 'Naposledy zmenené',
    leaveAnyway: 'Presto odísť',
    leaveWithoutSaving: 'Odísť bez uloženia',
    light: 'Svetlý',
    livePreview: 'Náhľad',
    loading: 'Načítavanie',
    locale: 'Jazyk',
    locales: 'Jazyky',
    menu: 'Menu',
    moveDown: 'Presunúť dolu',
    moveUp: 'Presunúť hore',
    newPassword: 'Nové heslo',
    next: 'Ďalej',
    noFiltersSet: 'Nie sú nastavené žiadne filtre',
    noLabel: '<Žiadny {{label}}>',
    none: 'Žiadny',
    noOptions: 'Žiadne možnosti',
    noResults:
      'Neboli nájdené žiadne {{label}}. Buď neexistujú žiadne {{label}}, alebo žiadne nespĺňajú filtre, ktoré ste zadali vyššie.',
    notFound: 'Nenájdené',
    nothingFound: 'Nič nenájdené',
    noValue: 'Žiadna hodnota',
    of: 'z',
    only: 'Iba',
    open: 'Otvoriť',
    or: 'Alebo',
    order: 'Poradie',
    pageNotFound: 'Stránka nenájdená',
    password: 'Heslo',
    payloadSettings: 'Nastavenia dátového záznamu',
    perPage: 'Na stránku: {{limit}}',
    previous: 'Predchádzajúci',
    remove: 'Odstrániť',
    reset: 'Resetovať',
    row: 'Riadok',
    rows: 'Riadky',
    save: 'Uložiť',
    saving: 'Ukladanie...',
    searchBy: 'Vyhľadať podľa {{label}}',
    selectAll: 'Vybrať všetko {{count}} {{label}}',
    selectAllRows: 'Vybrať všetky riadky',
    selectedCount: 'Vybrané {{count}} {{label}}',
    selectValue: 'Vybrať hodnotu',
    showAllLabel: 'Zobraziť všetky {{label}}',
    sorryNotFound: 'Je nám ľúto, ale neexistuje nič, čo by zodpovedalo vášmu požiadavku.',
    sort: 'Zoradiť',
    sortByLabelDirection: 'Zoradiť podľa {{label}} {{direction}}',
    stayOnThisPage: 'Zostať na tejto stránke',
    submissionSuccessful: 'Odoslanie úspešné.',
    submit: 'Odoslať',
    submitting: 'Odosielanie...',
    success: 'Úspech',
    successfullyCreated: '{{label}} úspešne vytvorené.',
    successfullyDuplicated: '{{label}} úspešne duplikované.',
    takeOver: 'Prevziať',
    thisLanguage: 'Slovenčina',
    titleDeleted: '{{label}} "{{title}}" úspešne zmazané.',
    true: 'Pravda',
    unauthorized: 'Neoprávnený prístup',
    unsavedChangesDuplicate: 'Máte neuložené zmeny. Chceli by ste pokračovať v duplikovaní?',
    untitled: 'Bez názvu',
    updatedAt: 'Aktualizované v',
    updatedCountSuccessfully: 'Úspešne aktualizované {{count}} {{label}}.',
    updatedSuccessfully: 'Úspešne aktualizované.',
    updating: 'Aktualizácia',
    uploading: 'Nahrávanie',
    user: 'Používateľ',
    username: 'Používateľské meno',
    users: 'Používatelia',
    value: 'Hodnota',
    viewReadOnly: 'Zobraziť iba na čítanie',
    welcome: 'Vitajte',
  },
  operators: {
    contains: 'obsahuje',
    equals: 'rovná sa',
    exists: 'existuje',
    intersects: 'pretína sa',
    isGreaterThan: 'je väčšie ako',
    isGreaterThanOrEqualTo: 'je väčšie alebo rovné',
    isIn: 'je v',
    isLessThan: 'je menšie ako',
    isLessThanOrEqualTo: 'je menšie alebo rovné',
    isLike: 'je ako',
    isNotEqualTo: 'nie je rovné',
    isNotIn: 'nie je v',
    near: 'blízko',
    within: 'vnútri',
  },
  upload: {
    addFile: 'Pridať súbor',
    addFiles: 'Pridať súbory',
    bulkUpload: 'Hromadné nahranie',
    crop: 'Orezať',
    cropToolDescription:
      'Potiahnite rohy vybranej oblasti, nakreslite novú oblasť alebo upravte hodnoty nižšie.',
    dragAndDrop: 'Potiahnite a pusťte súbor',
    dragAndDropHere: 'alebo sem potiahnite a pusťte súbor',
    editImage: 'Upraviť obrázok',
    fileName: 'Názov súboru',
    fileSize: 'Veľkosť súboru',
    filesToUpload: 'Súbory na nahranie',
    fileToUpload: 'Súbor na nahranie',
    focalPoint: 'Stredobod',
    focalPointDescription:
      'Potiahnite bod stredobodu priamo na náhľad alebo upravte hodnoty nižšie.',
    height: 'Výška',
    lessInfo: 'Menej informácií',
    moreInfo: 'Viac informácií',
    pasteURL: 'Vložiť URL',
    previewSizes: 'Náhľady veľkostí',
    selectCollectionToBrowse: 'Vyberte kolekciu na prezeranie',
    selectFile: 'Vyberte súbor',
    setCropArea: 'Nastaviť oblasť orezania',
    setFocalPoint: 'Nastaviť stredobod',
    sizes: 'Veľkosti',
    sizesFor: 'Veľkosti pre {{label}}',
    width: 'Šírka',
  },
  validation: {
    emailAddress: 'Zadajte prosím platnú e-mailovú adresu.',
    enterNumber: 'Zadajte prosím platné číslo.',
    fieldHasNo: 'Toto pole nemá {{label}}',
    greaterThanMax: '{{value}} je vyššie ako maximálne povolené {{label}} {{max}}.',
    invalidInput: 'Toto pole má neplatný vstup.',
    invalidSelection: 'Toto pole má neplatný výber.',
    invalidSelections: 'Toto pole má nasledujúce neplatné výbery:',
    lessThanMin: '{{value}} je nižšie ako minimálne povolené {{label}} {{min}}.',
    limitReached: 'Dosiahnutý limit, môžu byť pridané len {{max}} položky.',
    longerThanMin: 'Táto hodnota musí byť dlhšia ako minimálna dĺžka {{minLength}} znakov.',
    notValidDate: '"{{value}}" nie je platný dátum.',
    required: 'Toto pole je povinné.',
    requiresAtLeast: 'Toto pole vyžaduje aspoň {{count}} {{label}}.',
    requiresNoMoreThan: 'Toto pole vyžaduje nie viac ako {{count}} {{label}}.',
    requiresTwoNumbers: 'Toto pole vyžaduje dve čísla.',
    shorterThanMax: 'Táto hodnota musí byť kratšia ako maximálna dĺžka {{maxLength}} znakov.',
    trueOrFalse: 'Toto pole môže byť rovné iba true alebo false.',
    username:
      'Prosím, zadajte platné používateľské meno. Môže obsahovať písmená, čísla, pomlčky, bodky a podčiarknutia.',
    validUploadID: 'Toto pole nie je platné ID pre odoslanie.',
  },
  version: {
    type: 'Typ',
    aboutToPublishSelection: 'Chystáte sa publikovať všetky {{label}} vo výbere. Ste si istý?',
    aboutToRestore:
      'Chystáte sa obnoviť tento {{label}} dokument do stavu, v akom bol {{versionDate}}.',
    aboutToRestoreGlobal:
      'Chystáte sa obnoviť globálne {{label}} do stavu, v akom bol {{versionDate}}.',
    aboutToRevertToPublished:
      'Chystáte sa vrátiť zmeny tohto dokumentu do jeho publikovaného stavu. Ste si istý?',
    aboutToUnpublish: 'Chystáte sa zrušiť publikovanie tohto dokumentu. Ste si istý?',
    aboutToUnpublishSelection:
      'Chystáte sa zrušiť publikovanie všetkých {{label}} vo výbere. Ste si istý?',
    autosave: 'Automatické uloženie',
    autosavedSuccessfully: 'Úspešne uložené automaticky.',
    autosavedVersion: 'Verzia automatického uloženia',
    changed: 'Zmenené',
    compareVersion: 'Porovnať verziu s:',
    confirmPublish: 'Potvrdiť publikovanie',
    confirmRevertToSaved: 'Potvrdiť vrátenie k uloženému',
    confirmUnpublish: 'Potvrdiť zrušenie publikovania',
    confirmVersionRestoration: 'Potvrdiť obnovenie verzie',
    currentDocumentStatus: 'Súčasný {{docStatus}} dokument',
    currentDraft: 'Aktuálny koncept',
    currentPublishedVersion: 'Aktuálne publikovaná verzia',
    draft: 'Návrh',
    draftSavedSuccessfully: 'Návrh úspešne uložený.',
    lastSavedAgo: 'Naposledy uložené pred {{distance}}',
    noFurtherVersionsFound: 'Nenájdené ďalšie verzie',
    noRowsFound: 'Nenájdené {{label}}',
    noRowsSelected: 'Nie je vybraté žiadne {{označenie}}',
    preview: 'Náhľad',
    previouslyPublished: 'Predtým publikované',
    problemRestoringVersion: 'Pri obnovovaní tejto verzie došlo k problému',
    publish: 'Publikovať',
    publishChanges: 'Publikovať zmeny',
    published: 'Publikované',
    publishIn: 'Publikujte v {{locale}}',
    publishing: 'Publikovanie',
    restoreAsDraft: 'Obnoviť ako koncept',
    restoredSuccessfully: 'Úspešne obnovené.',
    restoreThisVersion: 'Obnoviť túto verziu',
    restoring: 'Obnovovanie...',
    reverting: 'Vracanie...',
    revertToPublished: 'Vrátiť sa k publikovanému',
    saveDraft: 'Uložiť návrh',
    selectLocales: 'Vybrať lokálne verzie na zobrazenie',
    selectVersionToCompare: 'Vybrať verziu na porovnanie',
    showingVersionsFor: 'Zobrazujú sa verzie pre:',
    showLocales: 'Zobraziť lokálne verzie:',
    status: 'Stav',
    unpublish: 'Zrušiť publikovanie',
    unpublishing: 'Zrušujem publikovanie...',
    version: 'Verzia',
    versionCount_many: '{{count}} verzií nájdených',
    versionCount_none: 'Žiadne verzie nenájdené',
    versionCount_one: '{{count}} verzia nájdená',
    versionCount_other: '{{count}} verzií nájdených',
    versionCreatedOn: '{{version}} vytvorená:',
    versionID: 'ID verzie',
    versions: 'Verzie',
    viewingVersion: 'Zobrazujem verziu pre {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Zobrazujem verziu pre globálne {{entityLabel}}',
    viewingVersions: 'Zobrazujem verzie pre {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Zobrazujem verzie pre globálne {{entityLabel}}',
  },
}

export const sk: Language = {
  dateFNSKey: 'sk',
  translations: skTranslations,
}
