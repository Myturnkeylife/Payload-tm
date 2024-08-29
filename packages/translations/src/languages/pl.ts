import type { DefaultTranslationsObject, Language } from '../types.js'

export const plTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Konto',
    accountOfCurrentUser: 'Konto bieżącego użytkownika',
    accountVerified: 'Konto zweryfikowane pomyślnie.',
    alreadyActivated: 'Już aktywowano',
    alreadyLoggedIn: 'Już zalogowano',
    apiKey: 'Klucz API',
    authenticated: 'Uwierzytelniony',
    backToLogin: 'Powrót do logowania',
    beginCreateFirstUser: 'Aby rozpocząć, utwórz pierwszego użytkownika',
    changePassword: 'Zmień hasło',
    checkYourEmailForPasswordReset:
      'Sprawdź email, na który wysłano link, który pozwoli Ci bezpiecznie zresetować hasło.',
    confirmGeneration: 'Potwierdź wygenerowanie',
    confirmPassword: 'Potwierdź hasło',
    createFirstUser: 'Utwórz pierwszego użytkownika',
    emailNotValid: 'Podany email jest nieprawidłowy',
    emailOrUsername: 'Email lub Nazwa użytkownika',
    emailSent: 'Wysłano email',
    emailVerified: 'Email zweryfikowany pomyślnie.',
    enableAPIKey: 'Aktywuj klucz API',
    failedToUnlock: 'Nie udało się odblokować',
    forceUnlock: 'Wymuś odblokowanie',
    forgotPassword: 'Zresetuj hasło',
    forgotPasswordEmailInstructions:
      'Proszę podaj swój email. Otrzymasz wiadomość z instrukcjami, jak zresetować hasło.',
    forgotPasswordQuestion: 'Nie pamiętasz hasła?',
    forgotPasswordUsernameInstructions:
      'Proszę wpisać poniżej swoją nazwę użytkownika. Instrukcje dotyczące resetowania hasła zostaną wysłane na adres e-mail powiązany z Twoją nazwą użytkownika.',
    generate: 'Wygeneruj',
    generateNewAPIKey: 'Wygeneruj nowy klucz API',
    generatingNewAPIKeyWillInvalidate:
      'Wygenerowanie nowego klucza API <1>unieważni</1> poprzedni klucz. Czy na pewno chcesz kontynuować?',
    lockUntil: 'Zablokuj do',
    logBackIn: 'Zaloguj się ponownie',
    logOut: 'Wyloguj',
    loggedIn: 'Aby zalogować się na inne konto, najpierw się <0>wyloguj</0>.',
    loggedInChangePassword:
      'Aby zmienić hasło, przejdź do swojego <0>konta</0> i tam edytuj swoje hasło.',
    loggedOutInactivity: 'Zostałeś wylogowany z powodu braku aktywności.',
    loggedOutSuccessfully: 'Zostałeś pomyślnie wylogowany.',
    loggingOut: 'Wylogowywanie...',
    login: 'Zaloguj',
    loginAttempts: 'Próby logowania',
    loginUser: 'Zaloguj użytkownika',
    loginWithAnotherUser: 'Aby zalogować się na inne konto, najpierw się <0>wyloguj</0>.',
    logout: 'Wyloguj',
    logoutSuccessful: 'Wylogowanie powiodło się.',
    logoutUser: 'Wyloguj użytkownika',
    newAPIKeyGenerated: 'Wygenerowano nowy klucz API.',
    newAccountCreated:
      'Właśnie utworzono nowe konto, w celu uzyskania dostępu do <a href="{{serverURL}}">{{serverURL}}</a>. Kliknij poniższy link lub wklej go do przeglądarki, aby zweryfikować swój adres email: <a href="{{verificationURL}}">{{verificationURL}}</a>.<br> Po zweryfikowaniu adresu email będziesz mógł się pomyślnie zalogować.',
    newPassword: 'Nowe hasło',
    passed: 'Uwierzytelnienie zakończone sukcesem',
    passwordResetSuccessfully: 'Hasło zostało pomyślnie zresetowane.',
    resetPassword: 'Zresetuj hasło',
    resetPasswordExpiration: 'Zresetuj czas wygaśnięcia hasła',
    resetPasswordToken: 'Zresetuj token hasła',
    resetYourPassword: 'Zresetuj swoje hasło',
    stayLoggedIn: 'Pozostań zalogowany',
    successfullyRegisteredFirstUser: 'Pomyślnie zarejestrowano pierwszego użytkownika.',
    successfullyUnlocked: 'Pomyślnie odblokowano',
    tokenRefreshSuccessful: 'Odświeżenie tokenu powiodło się.',
    unableToVerify: 'Nie można zweryfikować',
    username: 'Nazwa użytkownika',
    usernameNotValid: 'Podana nazwa użytkownika nie jest prawidłowa.',
    verified: 'Zweryfikowano',
    verifiedSuccessfully: 'Pomyślnie zweryfikowany',
    verify: 'Zweryfikuj',
    verifyUser: 'Zweryfikuj użytkownika',
    verifyYourEmail: 'Zweryfikuj swój email',
    youAreInactive:
      'Nie byłeś aktywny od dłuższego czasu i wkrótce zostaniesz automatycznie wylogowany dla własnego bezpieczeństwa. Czy chcesz pozostać zalogowany?',
    youAreReceivingResetPassword:
      'Otrzymałeś tę wiadomość, ponieważ Ty (lub ktoś inny) poprosiłeś o zresetowanie hasła do Twojego konta. Kliknij poniższy link lub wklej go w przeglądarce, aby zakończyć proces:',
    youDidNotRequestPassword:
      'Jeśli nie prosiłeś o zmianę hasła, zignoruj tę wiadomość, a Twoje hasło pozostanie niezmienione.',
  },
  error: {
    accountAlreadyActivated: 'To konto zostało już aktywowane.',
    autosaving: 'Wystąpił problem podczas automatycznego zapisywania tego dokumentu.',
    correctInvalidFields: 'Popraw nieprawidłowe pola.',
    deletingFile: '',
    deletingTitle:
      'Wystąpił błąd podczas usuwania {{title}}. Proszę, sprawdź swoje połączenie i spróbuj ponownie.',
    emailOrPasswordIncorrect: 'Podany adres e-mail lub hasło jest nieprawidłowe.',
    followingFieldsInvalid_one: 'To pole jest nieprawidłowe:',
    followingFieldsInvalid_other: 'Następujące pola są nieprawidłowe:',
    incorrectCollection: 'Nieprawidłowa kolekcja',
    invalidFileType: 'Nieprawidłowy typ pliku',
    invalidFileTypeValue: 'Nieprawidłowy typ pliku: {{value}}',
    loadingDocument: 'Wystapił problem podczas ładowania dokumentu o ID {{id}}.',
    localesNotSaved_one: 'Następującej lokalizacji nie można było zapisać:',
    localesNotSaved_other: 'Następujących lokalizacji nie można było zapisać:',
    logoutFailed: 'Wylogowanie nie powiodło się.',
    missingEmail: 'Brak adresu email.',
    missingIDOfDocument: 'Brak ID dokumentu do aktualizacji.',
    missingIDOfVersion: 'Brak ID wersji',
    missingRequiredData: 'Brak wymaganych danych.',
    noFilesUploaded: 'Nie przesłano żadnych plików.',
    noMatchedField: 'Nie znaleziono pasującego pola dla "{{label}}"',
    noUser: 'Brak użytkownika',
    notAllowedToAccessPage: 'Nie masz dostępu do tej strony.',
    notAllowedToPerformAction: 'Nie możesz wykonać tej akcji.',
    notFound: 'Żądany zasób nie został znaleziony.',
    previewing: 'Wystąpił problem podczas podglądu tego dokumentu.',
    problemUploadingFile: 'Wystąpił problem podczas przesyłania pliku.',
    tokenInvalidOrExpired: 'Token jest nieprawidłowy lub wygasł.',
    tokenNotProvided: 'Token nie został dostarczony.',
    unPublishingDocument: 'Wystąpił problem podczas cofania publikacji tego dokumentu.',
    unableToDeleteCount: 'Nie można usunąć {{count}} z {{total}} {{label}}.',
    unableToUpdateCount: 'Nie można zaktualizować {{count}} z {{total}} {{label}}.',
    unauthorized: 'Brak dostępu, musisz być zalogowany.',
    unknown: 'Wystąpił nieznany błąd.',
    unspecific: 'Wystąpił błąd',
    userEmailAlreadyRegistered: 'Użytkownik o podanym adresie e-mail jest już zarejestrowany.',
    userLocked: 'Ten użytkownik został zablokowany z powodu zbyt wielu nieudanych prób logowania.',
    usernameAlreadyRegistered: 'Użytkownik o podanej nazwie użytkownika jest już zarejestrowany.',
    usernameOrPasswordIncorrect: 'Podana nazwa użytkownika lub hasło jest nieprawidłowe.',
    valueMustBeUnique: 'Wartość musi być unikalna',
    verificationTokenInvalid: 'Token weryfikacyjny jest nieprawidłowy.',
  },
  fields: {
    addLabel: 'Dodaj {{label}}',
    addLink: 'Dodaj Link',
    addNew: 'Dodaj nowy',
    addNewLabel: 'Dodaj nowy {{label}}',
    addRelationship: 'Dodaj Relację',
    addUpload: 'Dodaj ładowanie',
    block: 'Blok',
    blockType: 'Typ Bloku',
    blocks: 'Bloki',
    chooseBetweenCustomTextOrDocument:
      'Wybierz między wprowadzeniem niestandardowego tekstowego adresu URL a linkiem do innego dokumentu.',
    chooseDocumentToLink: 'Wybierz dokument, do którego chcesz utworzyć łącze',
    chooseFromExisting: 'Wybierz z istniejących',
    chooseLabel: 'Wybierz {{label}}',
    collapseAll: 'Zwiń wszystko',
    customURL: 'Niestandardowy adres URL',
    editLabelData: 'Edytuj dane {{label}}',
    editLink: 'Edytuj Link',
    editRelationship: 'Edytuj Relację',
    enterURL: 'Wpisz adres URL',
    internalLink: 'Link wewnętrzny',
    itemsAndMore: '{{items}} i {{count}} więcej',
    labelRelationship: 'Relacja {{label}}',
    latitude: 'Szerokość',
    linkType: 'Typ łącza',
    linkedTo: 'Połączony z <0>{{label}}</0>',
    longitude: 'Długość geograficzna',
    newLabel: 'Nowy {{label}}',
    openInNewTab: 'Otwórz w nowej karcie',
    passwordsDoNotMatch: 'Hasła nie pasują',
    relatedDocument: 'Powiązany dokument',
    relationTo: 'Powiązany z',
    removeRelationship: 'Usuń Relację',
    removeUpload: 'Usuń Wrzucone',
    saveChanges: 'Zapisz zmiany',
    searchForBlock: 'Szukaj bloku',
    selectExistingLabel: 'Wybierz istniejący {{label}}',
    selectFieldsToEdit: 'Wybierz pola do edycji',
    showAll: 'Pokaż wszystkie',
    swapRelationship: 'Zamiana Relacji',
    swapUpload: 'Zamień Wrzucone',
    textToDisplay: 'Tekst do wyświetlenia',
    toggleBlock: 'Przełącz blok',
    uploadNewLabel: 'Wrzuć nowy {{label}}',
  },
  general: {
    aboutToDelete: 'Zamierzasz usunąć {{label}} <1>{{title}}</1>. Jesteś pewien?',
    aboutToDeleteCount_many: 'Zamierzasz usunąć {{count}} {{label}}',
    aboutToDeleteCount_one: 'Zamierzasz usunąć {{count}} {{label}}',
    aboutToDeleteCount_other: 'Zamierzasz usunąć {{count}} {{label}}',
    addBelow: 'Dodaj poniżej',
    addFilter: 'Dodaj filtr',
    adminTheme: 'Motyw administratora',
    and: 'i',
    applyChanges: 'Zastosuj zmiany',
    ascending: 'Rosnąco',
    automatic: 'Automatyczny',
    backToDashboard: 'Powrót do panelu',
    cancel: 'Anuluj',
    changesNotSaved:
      'Twoje zmiany nie zostały zapisane. Jeśli teraz wyjdziesz, stracisz swoje zmiany.',
    clearAll: undefined,
    close: 'Zamknij',
    collapse: 'Zwiń',
    collections: 'Kolekcje',
    columnToSort: 'Kolumna sortowania',
    columns: 'Kolumny',
    confirm: 'Potwierdź',
    confirmDeletion: 'Potwierdź usunięcie',
    confirmDuplication: 'Potwierdź duplikację',
    copied: 'Skopiowano',
    copy: 'Skopiuj',
    create: 'Stwórz',
    createNew: 'Stwórz nowy',
    createNewLabel: 'Stwórz nowy {{label}}',
    created: 'Utworzono',
    createdAt: 'Data utworzenia',
    creating: 'Tworzenie',
    creatingNewLabel: 'Tworzenie nowego {{label}}',
    custom: 'Niestandardowy',
    dark: 'Ciemny',
    dashboard: 'Panel',
    delete: 'Usuń',
    deletedCountSuccessfully: 'Pomyślnie usunięto {{count}} {{label}}.',
    deletedSuccessfully: 'Pomyślnie usunięto.',
    deleting: 'Usuwanie...',
    depth: 'Głębokość',
    descending: 'Malejąco',
    deselectAllRows: 'Odznacz wszystkie wiersze',
    document: 'Dokument',
    documents: 'Dokumenty',
    duplicate: 'Zduplikuj',
    duplicateWithoutSaving: 'Zduplikuj bez zapisywania zmian',
    edit: 'Edytuj',
    editLabel: 'Edytuj {{label}}',
    editing: 'Edycja',
    editingLabel_many: 'Edytowanie {{count}} {{label}}',
    editingLabel_one: 'Edytowanie {{count}} {{label}}',
    editingLabel_other: 'Edytowanie {{count}} {{label}}',
    email: 'Email',
    emailAddress: 'Adres email',
    enterAValue: 'Wpisz wartość',
    error: 'Błąd',
    errors: 'Błędy',
    fallbackToDefaultLocale: 'Powrót do domyślnych ustawień regionalnych',
    false: 'Fałszywe',
    filter: 'Filtr',
    filterWhere: 'Filtruj gdzie',
    filters: 'Filtry',
    globals: 'Globalne',
    language: 'Język',
    lastModified: 'Ostatnio zmodyfikowany',
    leaveAnyway: 'Wyjdź mimo to',
    leaveWithoutSaving: 'Wyjdź bez zapisywania',
    light: 'Jasny',
    livePreview: 'Podgląd',
    loading: 'Ładowanie',
    locale: 'Ustawienia regionalne',
    locales: 'Ustawienia regionalne',
    menu: 'Menu',
    moveDown: 'Przesuń niżej',
    moveUp: 'Przesuń wyżej',
    newPassword: 'Nowe hasło',
    next: 'Następny',
    noFiltersSet: 'Brak ustawionych filtrów',
    noLabel: '<Bez {{label}}>',
    noOptions: 'Brak opcji',
    noResults:
      'Nie znaleziono {{label}}. Być może {{label}} jeszcze nie istnieje, albo żaden nie pasuje do filtrów określonych powyżej.',
    noValue: 'Brak wartości',
    none: 'Nic',
    notFound: 'Nie znaleziono',
    nothingFound: 'Nic nie znaleziono',
    of: 'z',
    open: 'Otwórz',
    or: 'lub',
    order: 'Kolejność',
    pageNotFound: 'Strona nie znaleziona',
    password: 'Hasło',
    payloadSettings: 'Ustawienia Payload',
    perPage: 'Na stronę: {{limit}}',
    previous: 'Poprzedni',
    remove: 'Usuń',
    reset: 'Zresetuj',
    row: 'Wiersz',
    rows: 'Wiersze',
    save: 'Zapisz',
    saving: 'Zapisywanie...',
    searchBy: 'Szukaj według',
    selectAll: 'Wybierz wszystkie {{count}} {{label}}',
    selectAllRows: 'Wybierz wszystkie wiersze',
    selectValue: 'Wybierz wartość',
    selectedCount: 'Wybrano {{count}} {{label}}',
    showAllLabel: 'Pokaż wszystkie {{label}}',
    sorryNotFound: 'Przepraszamy — nie ma nic, co odpowiadałoby twojemu zapytaniu.',
    sort: 'Sortuj',
    sortByLabelDirection: 'Sortuj według {{label}} {{direction}}',
    stayOnThisPage: 'Pozostań na stronie',
    submissionSuccessful: 'Zgłoszenie zakończone powodzeniem.',
    submit: 'Zatwierdź',
    submitting: 'Przesyłanie...',
    success: 'Sukces',
    successfullyCreated: 'Pomyślnie utworzono {{label}}.',
    successfullyDuplicated: 'Pomyślnie zduplikowano {{label}}',
    thisLanguage: 'Polski',
    titleDeleted: 'Pomyślnie usunięto {{label}} {{title}}',
    true: 'Prawda',
    unauthorized: 'Brak autoryzacji',
    unsavedChangesDuplicate: 'Masz niezapisane zmiany. Czy chcesz kontynuować duplikowanie?',
    untitled: 'Bez nazwy',
    updatedAt: 'Data edycji',
    updatedCountSuccessfully: 'Pomyślnie zaktualizowano {{count}} {{label}}.',
    updatedSuccessfully: 'Aktualizacja zakończona sukcesem.',
    updating: 'Aktualizacja',
    uploading: 'Przesyłanie',
    user: 'użytkownik',
    username: 'Nazwa użytkownika',
    users: 'użytkownicy',
    value: 'Wartość',
    welcome: 'Witaj',
  },
  operators: {
    contains: 'zawiera',
    equals: 'równe',
    exists: 'istnieje',
    intersects: 'przecina się',
    isGreaterThan: 'jest większy niż',
    isGreaterThanOrEqualTo: 'jest większe lub równe',
    isIn: 'jest w',
    isLessThan: 'jest mniejsze niż',
    isLessThanOrEqualTo: 'jest mniejsze lub równe',
    isLike: 'jest jak',
    isNotEqualTo: 'nie jest równe',
    isNotIn: 'nie ma go w',
    near: 'blisko',
    within: 'w ciągu',
  },
  upload: {
    addFile: 'Dodaj plik',
    addFiles: 'Dodaj pliki',
    bulkUpload: 'Załaduj masowo',
    crop: 'Przytnij',
    cropToolDescription:
      'Przeciągnij narożniki wybranego obszaru, narysuj nowy obszar lub dostosuj poniższe wartości.',
    dragAndDrop: 'Przeciągnij i upuść plik',
    dragAndDropHere: 'lub złap i upuść plik tutaj',
    editImage: 'Edytuj obraz',
    fileName: 'Nazwa pliku',
    fileSize: 'Rozmiar pliku',
    fileToUpload: 'Plik do przesłania',
    filesToUpload: 'Pliki do przesłania',
    focalPoint: 'Punkt centralny',
    focalPointDescription:
      'Przeciągnij punkt centralny bezpośrednio na podglądzie lub dostosuj wartości poniżej.',
    height: 'Wysokość',
    lessInfo: 'Mniej informacji',
    moreInfo: 'Więcej informacji',
    pasteURL: 'Wklej URL',
    previewSizes: 'Rozmiary podglądu',
    selectCollectionToBrowse: 'Wybierz kolekcję aby przejrzeć',
    selectFile: 'Wybierz plik',
    setCropArea: 'Ustaw obszar kadrowania',
    setFocalPoint: 'Ustawić punkt ogniskowy',
    sizes: 'Rozmiary',
    sizesFor: 'Rozmiary dla {{label}}',
    width: 'Szerokość',
  },
  validation: {
    emailAddress: 'Wprowadź poprawny adres email.',
    enterNumber: 'Wprowadź poprawny numer telefonu.',
    fieldHasNo: 'To pole nie posiada {{label}}',
    greaterThanMax: '{{value}} jest większe niż maksymalnie dozwolony {{label}} wynoszący {{max}}.',
    invalidInput: 'To pole zawiera nieprawidłowe dane.',
    invalidSelection: 'To pole ma nieprawidłowy wybór.',
    invalidSelections: 'To pole zawiera następujące, nieprawidłowe wybory:',
    lessThanMin: '{{value}} jest mniejsze niż minimalnie dozwolony {{label}} wynoszący {{min}}.',
    limitReached: 'Osiągnięto limit, można dodać tylko {{max}} elementów.',
    longerThanMin: 'Ta wartość musi być dłuższa niż minimalna długość znaków: {{minLength}}.',
    notValidDate: '"{{value}}" nie jest prawidłową datą.',
    required: 'To pole jest wymagane.',
    requiresAtLeast: 'To pole wymaga co najmniej {{count}} {{label}}.',
    requiresNoMoreThan: 'To pole może posiadać co najmniej {{count}} {{label}}.',
    requiresTwoNumbers: 'To pole wymaga dwóch liczb.',
    shorterThanMax: 'Ta wartość musi być krótsza niż maksymalna długość znaków: {{maxLength}}.',
    trueOrFalse: "To pole może mieć wartość tylko 'true' lub 'false'.",
    username:
      'Proszę wprowadzić prawidłową nazwę użytkownika. Może zawierać litery, cyfry, myślniki, kropki i podkreślniki.',
    validUploadID: 'To pole nie jest prawidłowym identyfikatorem przesyłania.',
  },
  version: {
    type: 'Typ',
    aboutToPublishSelection:
      'Za chwilę opublikujesz wszystkie {{label}} w zaznaczeniu. Jesteś pewny?',
    aboutToRestore:
      'Zamierzasz przywrócić dokument {{label}} do stanu, w jakim znajdował się w dniu {{versionDate}}.',
    aboutToRestoreGlobal:
      'Zamierzasz przywrócić globalny rekord {{label}} do stanu, w którym znajdował się w dniu {{versionDate}}.',
    aboutToRevertToPublished:
      'Zamierzasz przywrócić zmiany w tym dokumencie do stanu opublikowanego. Jesteś pewien?',
    aboutToUnpublish: 'Zamierzasz cofnąć publikację tego dokumentu. Jesteś pewien?',
    aboutToUnpublishSelection:
      'Zamierzasz cofnąć publikację wszystkich {{label}} w zaznaczeniu. Jesteś pewny?',
    autosave: 'Autozapis',
    autosavedSuccessfully: 'Pomyślnie zapisano automatycznie.',
    autosavedVersion: 'Wersja zapisana automatycznie',
    changed: 'Zmieniono',
    compareVersion: 'Porównaj wersję z:',
    confirmPublish: 'Potwierdź publikację',
    confirmRevertToSaved: 'Potwierdź powrót do zapisanego',
    confirmUnpublish: 'Potwierdź cofnięcie publikacji',
    confirmVersionRestoration: 'Potwierdź przywrócenie wersji',
    currentDocumentStatus: 'Bieżący status {{docStatus}} dokumentu',
    currentDraft: 'Aktualna wersja robocza',
    currentPublishedVersion: 'Aktualna Opublikowana Wersja',
    draft: 'Szkic',
    draftSavedSuccessfully: 'Wersja robocza została pomyślnie zapisana.',
    lastSavedAgo: 'Ostatnio zapisane {{distance}} temu',
    noFurtherVersionsFound: 'Nie znaleziono dalszych wersji',
    noRowsFound: 'Nie znaleziono {{label}}',
    noRowsSelected: undefined,
    preview: 'Podgląd',
    previouslyPublished: 'Wcześniej opublikowane',
    problemRestoringVersion: 'Wystąpił problem podczas przywracania tej wersji',
    publish: 'Publikuj',
    publishChanges: 'Opublikuj zmiany',
    published: 'Opublikowano',
    publishing: 'Publikacja',
    restoreAsDraft: 'Przywróć jako szkic',
    restoreThisVersion: 'Przywróć tę wersję',
    restoredSuccessfully: 'Przywrócono pomyślnie.',
    restoring: 'Przywracanie...',
    revertToPublished: 'Przywróć do opublikowanego',
    reverting: 'Cofanie...',
    saveDraft: 'Zapisz szkic',
    selectLocales: 'Wybierz ustawienia regionalne do wyświetlenia',
    selectVersionToCompare: 'Wybierz wersję do porównania',
    showLocales: 'Pokaż ustawienia regionalne:',
    showingVersionsFor: 'Wyświetlanie wersji dla:',
    status: 'Status',
    unpublish: 'Cofnij publikację',
    unpublishing: 'Cofanie publikacji...',
    version: 'Wersja',
    versionCount_many: 'Znalezionych wersji: {{count}}',
    versionCount_none: 'Nie znaleziono wersji',
    versionCount_one: 'Znaleziono {{count}} wersję',
    versionCount_other: 'Znaleziono {{count}} wersji',
    versionCreatedOn: 'Wersja {{version}} utworzona:',
    versionID: 'ID wersji',
    versions: 'Wersje',
    viewingVersion: 'Przeglądanie wersji dla {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Przeglądanie wersji dla globalnej kolekcji {{entityLabel}}',
    viewingVersions: 'Przeglądanie wersji {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Przeglądanie wersji dla globalnej kolekcji {{entityLabel}}',
  },
}

export const pl: Language = {
  dateFNSKey: 'pl',
  translations: plTranslations,
}
