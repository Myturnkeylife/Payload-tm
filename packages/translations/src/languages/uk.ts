import type { DefaultTranslationsObject, Language } from '../types.js'

export const ukTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Обліковий запис',
    accountOfCurrentUser: 'Обліковий запис поточного користувача',
    accountVerified: 'Рахунок успішно перевірено.',
    alreadyActivated: 'Вже активований',
    alreadyLoggedIn: 'Вже увійшли в систему',
    apiKey: 'API ключ',
    authenticated: 'Автентифікований',
    backToLogin: 'Повернутися до входу',
    beginCreateFirstUser: 'Щоб розпочати — створість першого користувача',
    changePassword: 'Змінити пароль',
    checkYourEmailForPasswordReset:
      'Перевірте вашу електронну пошту на наявність посилання, що дозволить вам безпечно скинути пароль',
    confirmGeneration: 'Підтвердити генерацію',
    confirmPassword: 'Підтвердження паролю',
    createFirstUser: 'Створення першого користувача',
    emailNotValid: 'Вказана адреса електронної пошти недійсна',
    emailOrUsername: "Електронна пошта або Ім'я користувача",
    emailSent: 'Лист відправлено',
    emailVerified: 'Електронну пошту успішно підтверджено.',
    enableAPIKey: 'Активувати API ключ',
    failedToUnlock: 'Не вдалось розблокувати',
    forceUnlock: 'Примусове розблокування',
    forgotPassword: 'Забули пароль?',
    forgotPasswordEmailInstructions:
      'Будь ласка, вкажіть адресу вашої електронної пошти нижче. Ви отримаєте лист на вашу електронну пошту з інструкціями щодо скидання пароля.',
    forgotPasswordQuestion: 'Забули пароль?',
    forgotPasswordUsernameInstructions:
      "Будь ласка, введіть нижче своє ім'я користувача. Інструкції щодо скидання пароля буде відправлено на адресу електронної пошти, пов'язану з вашим ім'ям користувача.",
    generate: 'Згенерувати',
    generateNewAPIKey: 'Згенерувати новий API ключ',
    generatingNewAPIKeyWillInvalidate:
      'Генерація нового API ключа зробить попередній <1>недійсним</1>. Ви впевнені, що бажаєте продовжити?',
    lockUntil: 'Заблокувати до',
    logBackIn: 'Увійти знову',
    loggedIn: 'Щоб увйти в систему з іншого облікового запису, спочатку <0>вийдіть з системи</0>.',
    loggedInChangePassword:
      'Щоб змінити ваш пароль, перейдіть до <0>сторінки облікового запису</0> і змініть ваш пароль.',
    loggedOutInactivity: 'Ви вийшли з системи через бездіяльність.',
    loggedOutSuccessfully: 'Ви успішно вийшли з системи.',
    loggingOut: 'Вихід...',
    login: 'Увійти',
    loginAttempts: 'Спроби входу',
    loginUser: 'Вхід користувача в систему',
    loginWithAnotherUser:
      'Щоб увйти в систему з іншого облікового запису, спочатку <0>вийдіть з системи</0>.',
    logOut: 'Вийти',
    logout: 'Вийти',
    logoutSuccessful: 'Вихід успішний.',
    logoutUser: 'Вийти з системи',
    newAccountCreated:
      'Новий обліковий запис було створено, щоб отримати доступ до <a href="{{serverURL}}">{{serverURL}}</a>, будь ласка, натисніть на наступне посилання, або вставте його в адресний рядок браузера, щоб підтвердити вашу електронну пошту: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Після підтвердження вашої електронно пошти, ви зможете увійти в систему.',
    newAPIKeyGenerated: 'Новий API ключ згенеровано.',
    newPassword: 'Новий пароль',
    passed: 'Аутентифікація пройшла успішно',
    passwordResetSuccessfully: 'Пароль успішно скинуто.',
    resetPassword: 'Скинути пароль',
    resetPasswordExpiration: 'Скинути пароль після закінчення строку дії',
    resetPasswordToken: 'Токет для скидання пароля',
    resetYourPassword: 'Скинути ваш пароль',
    stayLoggedIn: 'Залишитись в системі',
    successfullyRegisteredFirstUser: 'Успішно зареєстровано першого користувача.',
    successfullyUnlocked: 'Успішно розблоковано',
    tokenRefreshSuccessful: 'Оновлення токену успішне.',
    unableToVerify: 'Неможливо підтвердити',
    username: "Ім'я користувача",
    usernameNotValid: "Вказане ім'я користувача недійсне",
    verified: 'Підтверджено',
    verifiedSuccessfully: 'Успішно підтверджено',
    verify: 'Підтвердити',
    verifyUser: 'Підтвердити користувача',
    verifyYourEmail: 'Підтвердити пошту',
    youAreInactive:
      'Ви були неактивні певний час і скоро, в цілях вашої безпеки, вас буде розлогінено. Чи бажаєте ви залишитись в системі?',
    youAreReceivingResetPassword:
      'Ви отримали це повідомлення, бо ви (або хтось інший) створив запит на скидання пароля до вашого облікового запису. Будь ласка, натисніть на наступне посилання, або вставте посилання в адресний рядок браузера, щоб завершити процес:',
    youDidNotRequestPassword:
      'Якщо ви не сторювали цей запит, будь ласка, проігноруйте це повідомлення',
  },
  error: {
    accountAlreadyActivated: 'Цей обліковий запис вже активований',
    autosaving: 'Виникла проблема під час автозбереження цього документа.',
    correctInvalidFields: 'Будь ласка, виправте невірні поля.',
    deletingFile: 'Виникла помилка під час видалення файлу',
    deletingTitle:
      "Виникла помилка під час видалення {{title}}. Будь ласка, перевірте ваше з'єднання та спробуйте ще раз.",
    emailOrPasswordIncorrect: 'Вказана адреса електронної пошти або пароль є невірними',
    followingFieldsInvalid_one: 'Наступне поле невірне:',
    followingFieldsInvalid_other: 'Наступні поля невірні',
    incorrectCollection: 'Неправильна колекція',
    invalidFileType: 'Невірний тип файлу',
    invalidFileTypeValue: 'Невірний тип файлу: {{value}}',
    loadingDocument: 'Виникла помилка під час завантаження документа з ID {{id}}.',
    localesNotSaved_one: 'Не вдалося зберегти наступну мову:',
    localesNotSaved_other: 'Не вдалося зберегти такі мови:',
    logoutFailed: 'Вихід не вдався.',
    missingEmail: 'Відсутній email.',
    missingIDOfDocument: 'Відсутній ID документа для оновлення.',
    missingIDOfVersion: 'Відсутній ID версії.',
    missingRequiredData: "Відсусті обов'язкові дані.",
    noFilesUploaded: 'Жодного файлу не було завантажено.',
    noMatchedField: 'Не знайдено відповідного поля для "{{label}}"',
    notAllowedToAccessPage: 'Ви не маєте доступу до цієї сторінки.',
    notAllowedToPerformAction: 'Ви не маєте дозволу виконувати цю дію.',
    notFound: 'Запитуваний ресурс не знайдено.',
    noUser: 'Немає користувача',
    previewing: 'Виникла помилка під час попереднього перегляду цього документа.',
    problemUploadingFile: 'Виникла помилка під час завантаження файлу.',
    tokenInvalidOrExpired: 'Токен недійсний, або його строк дії закінчився.',
    tokenNotProvided: 'Токен не надано.',
    unableToDeleteCount: 'Не вдалося видалити {{count}} із {{total}} {{label}}.',
    unableToUpdateCount: 'Не вдалося оновити {{count}} із {{total}} {{label}}.',
    unauthorized: 'Немає доступу, ви повинні увійти, щоб виконати цей запит.',
    unknown: 'Виникла невідома помилка.',
    unPublishingDocument: 'Під час скасування публікації даного документа виникла помилка.',
    unspecific: 'Виникла помилка.',
    userEmailAlreadyRegistered: 'Користувач із вказаною електронною поштою вже зареєстрований.',
    userLocked: 'Цей користувач заблокований через велику кількість невдалих спроб входу.',
    usernameAlreadyRegistered: 'Користувач з вказаним іменем користувача вже зареєстрований.',
    usernameOrPasswordIncorrect: "Введене ім'я користувача або пароль неправильні.",
    valueMustBeUnique: 'Значення має бути унікальним.',
    verificationTokenInvalid: 'Токен верифікації недійсний.',
  },
  fields: {
    addLabel: 'Додати {{label}}',
    addLink: 'Додати посилання',
    addNew: 'Додати новий',
    addNewLabel: 'Створити {{label}}',
    addRelationship: "Додати взаємозв'язок",
    addUpload: 'Додати завантаження',
    block: 'блок',
    blocks: 'блоки',
    blockType: 'Тип блока',
    chooseBetweenCustomTextOrDocument:
      'Виберіть між введенням власної URL-адреси та посиланням на інший документ.',
    chooseDocumentToLink: 'Оберіть документ, на який потрібно зробити посилання',
    chooseFromExisting: 'Обрати з існуючих',
    chooseLabel: 'Обрати {{label}}',
    collapseAll: 'Згорнути все',
    customURL: 'Власний URL',
    editLabelData: 'Редагувати дані {{label}}',
    editLink: 'Редагувати посилання',
    editRelationship: "Редагувати взаємозв'язок",
    enterURL: 'Введіть URL',
    internalLink: 'Внутрішнє посилання',
    itemsAndMore: '{{items}} і ще {{count}}',
    labelRelationship: "{{label}} взаємов'язок",
    latitude: 'Широта',
    linkedTo: "Зв'язано з <0>{{label}}</0>",
    linkType: 'Тип посилання',
    longitude: 'Довгота',
    newLabel: 'Новий {{label}}',
    openInNewTab: 'Відкривати в новій вкладці',
    passwordsDoNotMatch: 'Паролі не співпадають.',
    relatedDocument: "Пов'язаний документ",
    relationTo: "Пов'язано з",
    removeRelationship: "Видалити взаємозв'язок",
    removeUpload: 'Видалити завантаження',
    saveChanges: 'Зберегти зміни',
    searchForBlock: 'Знайти блок',
    selectExistingLabel: 'Вибрати існуючий {{label}}',
    selectFieldsToEdit: 'Виберіть поля для редагування',
    showAll: 'Показати все',
    swapRelationship: "Замінити зв'язок",
    swapUpload: 'Замінити завантаження',
    textToDisplay: 'Текст для відображення',
    toggleBlock: 'Перемкнути блок',
    uploadNewLabel: 'Завантажити новий {{label}}',
  },
  general: {
    aboutToDelete: 'Ви бажаєте видалити {{label}} <1>{{title}}</1>. Ви впевнені?',
    aboutToDeleteCount_many: 'Ви бажаєте видалити {{count}} {{label}}',
    aboutToDeleteCount_one: 'Ви бажаєте видалити {{count}} {{label}}',
    aboutToDeleteCount_other: 'Ви бажаєте видалити {{count}} {{label}}',
    addBelow: 'Додати нижче',
    addFilter: 'Додати фільтр',
    adminTheme: 'Тема адмін панелі',
    and: 'і',
    anotherUser: 'Інший користувач',
    anotherUserTakenOver: 'Інший користувач взяв на себе редагування цього документа.',
    applyChanges: 'Застосувати зміни',
    ascending: 'В порядку зростання',
    automatic: 'Автоматично',
    backToDashboard: 'Повернутись до головної сторінки',
    cancel: 'Скасувати',
    changesNotSaved: 'Ваши зміни не були збережені. Якщо ви вийдете зараз, то втратите свої зміни.',
    clearAll: 'Очистити все',
    close: 'Закрити',
    collapse: 'Згорнути',
    collections: 'Колекції',
    columns: 'Колонки',
    columnToSort: 'Колонка для сортування',
    confirm: 'Підтвердити',
    confirmDeletion: 'Підтвердити видалення',
    confirmDuplication: 'Підтвердити копіювання',
    copied: 'Скопійовано',
    copy: 'Скопіювати',
    create: 'Створити',
    created: 'Створено',
    createdAt: 'Дата створення',
    createNew: 'Створити',
    createNewLabel: 'Створити новий {{label}}',
    creating: 'Створення',
    creatingNewLabel: 'Створення нового {{label}}',
    currentlyEditing:
      'зараз редагує цей документ. Якщо ви переберете контроль, їм буде заблоковано продовження редагування, і вони також можуть втратити незбережені зміни.',
    custom: 'Спеціальне замовлення',
    dark: 'Темна',
    dashboard: 'Головна',
    delete: 'Видалити',
    deletedCountSuccessfully: 'Успішно видалено {{count}} {{label}}.',
    deletedSuccessfully: 'Успішно видалено.',
    deleting: 'Видалення...',
    depth: 'Глибина',
    descending: 'В порядку спадання',
    deselectAllRows: 'Скасувати вибір всіх рядків',
    document: 'Документ',
    documentLocked: 'Документ заблоковано',
    documents: 'Документи',
    duplicate: 'Дублювати',
    duplicateWithoutSaving: 'Дублювання без збереження змін',
    edit: 'Редагувати',
    editedSince: 'Відредаговано з',
    editing: 'Редагування',
    editingLabel_many: 'Редагування {{count}} {{label}}',
    editingLabel_one: 'Редагування {{count}} {{label}}',
    editingLabel_other: 'Редагування {{count}} {{label}}',
    editingTakenOver: 'Редагування взято на себе',
    editLabel: 'Редагувати {{label}}',
    email: 'Електронна пошта',
    emailAddress: 'Адреса електронної пошти',
    enterAValue: 'Введіть значення',
    error: 'Помилка',
    errors: 'Помилки',
    fallbackToDefaultLocale: 'Відновлення локалі за замовчуванням',
    false: 'Неправда',
    filter: 'Фільтрувати',
    filters: 'Фільтри',
    filterWhere: 'Де фільтрувати {{label}}',
    globals: 'Глобальні',
    goBack: 'Повернутися',
    isEditing: 'редагує',
    language: 'Мова',
    lastModified: 'Останні зміни',
    leaveAnyway: 'Все одно вийти',
    leaveWithoutSaving: 'Вийти без збереження',
    light: 'Світла',
    livePreview: 'Попередній перегляд',
    loading: 'Завантаження',
    locale: 'Локаль',
    locales: 'Локалі',
    menu: 'Меню',
    moveDown: 'Перемістити нижче',
    moveUp: 'Перемістити вище',
    newPassword: 'Новий пароль',
    next: 'Наступний',
    noFiltersSet: 'Відсусті фільтри',
    noLabel: '<без {{label}}>',
    none: 'Ніхто',
    noOptions: 'Немає варіантів',
    noResults:
      'Жодного {{label}} не знайдено. Або {{label}} ще не існує, або жодна з них не відповідає фільтрам, що ви задали више.',
    notFound: 'Не знайдено',
    nothingFound: 'Нічого не знайдено',
    noValue: 'Немає значення',
    of: 'з',
    only: 'Лише',
    open: 'Відкрити',
    or: 'або',
    order: 'Порядок',
    pageNotFound: 'Сторінка не знайдена',
    password: 'Пароль',
    payloadSettings: 'Налаштування Payload',
    perPage: 'На сторінці: {{limit}}',
    previous: 'Попередній',
    remove: 'Видалити',
    reset: 'Скидання',
    row: 'Рядок',
    rows: 'Рядки',
    save: 'Зберегти',
    saving: 'Збереження...',
    searchBy: 'Шукати по {{label}}',
    selectAll: 'Вибрати всі {{count}} {{label}}',
    selectAllRows: 'Обрати всі рядки',
    selectedCount: 'Обрано {{count}} {{label}}',
    selectValue: 'Обрати значення',
    showAllLabel: 'Показати всі {{label}}',
    sorryNotFound: 'Вибачте, немає нічого, що відповідало б Вашому запиту.',
    sort: 'Сортувати',
    sortByLabelDirection: 'Сортувати за {{label}} {{direction}}',
    stayOnThisPage: 'Залишитись на цій сторінці',
    submissionSuccessful: 'Успішно відправлено.',
    submit: 'Відправити',
    submitting: 'Надсилаємо...',
    success: 'Успіх',
    successfullyCreated: '{{label}} успішно створено.',
    successfullyDuplicated: '{{label}} успішно продубльовано.',
    takeOver: 'Перейняти',
    thisLanguage: 'Українська',
    titleDeleted: '{{label}} "{{title}}" успішно видалено.',
    true: 'Правда',
    unauthorized: 'Немає доступу',
    unsavedChangesDuplicate: 'Ви маєте незбережені зміни. Чи бажаєте ви продовжити дублювання?',
    untitled: 'Без назви',
    updatedAt: 'Змінено',
    updatedCountSuccessfully: 'Успішно оновлено {{count}} {{label}}.',
    updatedSuccessfully: 'Успішно відредаговано.',
    updating: 'оновлення',
    uploading: 'завантаження',
    uploadingBulk: 'Завантаження {{current}} з {{total}}',
    user: 'Користувач',
    username: "Ім'я користувача",
    users: 'Користувачі',
    value: 'Значення',
    viewReadOnly: 'Перегляд тільки для читання',
    welcome: 'Вітаю',
  },
  operators: {
    contains: 'містить',
    equals: 'дорівнює',
    exists: 'існує',
    intersects: 'перетинається',
    isGreaterThan: 'більше ніж',
    isGreaterThanOrEqualTo: 'більше або дорівнює',
    isIn: 'є в',
    isLessThan: 'менше ніж',
    isLessThanOrEqualTo: 'менше або дорівнює',
    isLike: 'схоже',
    isNotEqualTo: 'не дорівнює',
    isNotIn: 'не в',
    near: 'поруч',
    within: 'в межах',
  },
  upload: {
    addFile: 'Додати файл',
    addFiles: 'Додати файли',
    bulkUpload: 'Масове завантаження',
    crop: 'Обрізати',
    cropToolDescription:
      'Перетягніть кути обраної області, намалюйте нову область або скоригуйте значення нижче.',
    dragAndDrop: 'Перемістіть файл',
    dragAndDropHere: 'або перемістіть сюди файл',
    editImage: 'Редагувати зображення',
    fileName: 'Назва файлу',
    fileSize: 'Розмір файлу',
    filesToUpload: 'Файли для завантаження',
    fileToUpload: 'Файл для завантаження',
    focalPoint: 'Точка фокусу',
    focalPointDescription:
      'Перетягніть точку фокусу безпосередньо на попередньому перегляді або налаштуйте значення нижче.',
    height: 'Висота',
    lessInfo: 'Менше інформації',
    moreInfo: 'Більше інформації',
    pasteURL: 'Вставити URL',
    previewSizes: 'Попередній перегляд розмірів',
    selectCollectionToBrowse: 'Оберіть колекцію для перегляду',
    selectFile: 'Оберіть файл',
    setCropArea: 'Встановити область обрізки',
    setFocalPoint: 'Встановити точку фокусу',
    sizes: 'Розміри',
    sizesFor: 'Розміри для {{label}}',
    width: 'Ширина',
  },
  validation: {
    emailAddress: 'Будь ласка, введіть валідну адресу електронної пошти.',
    enterNumber: 'Будь ласка, введіть валідне число.',
    fieldHasNo: 'В цього полі немає {{label}}',
    greaterThanMax: '{{value}} більше, ніж припустиме максимальне значення {{label}} в {{max}}.',
    invalidInput: 'У цьому полі введено некоректне значення.',
    invalidSelection: 'Це поле має некоректний вибір.',
    invalidSelections: 'Це поле має наступні невірні варіанти вибору:',
    lessThanMin: '{{value}} менше, ніж мінімальне припустиме значення {{label}} в {{min}}.',
    limitReached: 'Досягнуто межі, можна додати лише {{max}} елементів.',
    longerThanMin: 'Це значення має дорівнювати або бути довшим, ніж {{minLength}} символів.',
    notValidDate: '"{{value}}" - некоректна дата.',
    required: "Це поле є обов'язковим.",
    requiresAtLeast: 'Це поле потребує не менше {{count}} {{label}}.',
    requiresNoMoreThan: 'Це поле потребує не більше {{count}} {{label}}.',
    requiresTwoNumbers: 'У цьому полі потрібно ввести два числа.',
    shorterThanMax: 'Це значення має дорівнювати або бути коротшим, ніж {{maxLength}} символів.',
    trueOrFalse: 'Це поле може мати значення тільки true або false.',
    username:
      "Будь ласка, введіть дійсне ім'я користувача. Може містити літери, цифри, дефіси, крапки та підкреслення.",
    validUploadID: 'Це поле не є дійсним ID завантаження.',
  },
  version: {
    type: 'Тип',
    aboutToPublishSelection: 'Ви бажаєте опублікувати всі {{label}} у вибірці. Ви впевнені?',
    aboutToRestore:
      'Ви бажаєте відновити цей документ {{label}} до стану, в якому він знаходився {{versionDate}}. Ви впевнені?',
    aboutToRestoreGlobal:
      'Ви бажаєте відновити глобальний запис {{label}} до стану, в якому він знаходився {{versionDate}}. Ви впевнені?',
    aboutToRevertToPublished:
      'Ви бажаєте повернути зміни цього документа до його опублікованого стану. Ви впевнені?',
    aboutToUnpublish: 'Ви бажаєте скасувати публікацю цього документа. Ви впевнені?',
    aboutToUnpublishSelection:
      'Ви бажаєте скасувати публікацію всіх {{label}} у вибірці. Ви впевнені?',
    autosave: 'Автозбереження',
    autosavedSuccessfully: 'Автозбереження успішно виконано.',
    autosavedVersion: 'Автозбереження',
    changed: 'Змінено',
    compareVersion: 'Порівняти версію з:',
    confirmPublish: 'Підтвердити публікацію',
    confirmRevertToSaved: 'Підтвердити повернення до збереженого стану',
    confirmUnpublish: 'Підвтердити скасування публікації',
    confirmVersionRestoration: 'Підтвердити відновлення версії',
    currentDocumentStatus: 'Поточний статус {{docStatus}} документа',
    currentDraft: 'Поточний проект',
    currentPublishedVersion: 'Поточна опублікована версія',
    draft: 'Чернетка',
    draftSavedSuccessfully: 'Чернетку успішно збережено.',
    lastSavedAgo: 'Востаннє збережено {{distance}} тому',
    noFurtherVersionsFound: 'Інших версій не знайдено',
    noRowsFound: 'Не знайдено {{label}}',
    noRowsSelected: 'Не вибрано {{label}}',
    preview: 'Попередній перегляд',
    previouslyPublished: 'Раніше опубліковано',
    problemRestoringVersion: 'Виникла проблема з відновленням цієї версії',
    publish: 'Опублікувати',
    publishChanges: 'Опублікувати зміни',
    published: 'Опубліковано',
    publishIn: 'Опублікувати в {{locale}}',
    publishing: 'Публікація',
    restoreAsDraft: 'Відновити як чернетку',
    restoredSuccessfully: 'Відновлено успішно.',
    restoreThisVersion: 'Відновити цю версію',
    restoring: 'Відновлення...',
    reverting: 'Повернення до опублікованого стану...',
    revertToPublished: 'Повернутися до опублікованого стану',
    saveDraft: 'Зберегти чернетку',
    selectLocales: 'Оберіть локаль для відображення',
    selectVersionToCompare: 'Оберіть версію для порівняння',
    showingVersionsFor: 'Показані версії для:',
    showLocales: 'Показати локалі:',
    status: 'Статус',
    unpublish: 'Скасувати публікацію',
    unpublishing: 'Скасування публікації...',
    version: 'Версія',
    versionCount_many: '{{count}} версій знайдено',
    versionCount_none: 'Версій не знайдено',
    versionCount_one: '{{count}} версія знайдена',
    versionCount_other: '{{count}} версій знайдено',
    versionCreatedOn: '{{version}} створена:',
    versionID: 'ID версії',
    versions: 'Версії',
    viewingVersion: 'Перенляд версії для {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Перегляд версій для глобальної колекції {{entityLabel}}',
    viewingVersions: 'Перегляд версій для {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Перегляд версій для глобальної колекції {{entityLabel}}',
  },
}

export const uk: Language = {
  dateFNSKey: 'uk',
  translations: ukTranslations,
}
