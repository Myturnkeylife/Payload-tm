import type { DefaultTranslationsObject, Language } from '../types.js'

export const faTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'نمایه',
    accountOfCurrentUser: 'نمایه کاربر فعلی',
    accountVerified: 'حساب با موفقیت تایید شد.',
    alreadyActivated: 'قبلاً فعال شده است',
    alreadyLoggedIn: 'قبلاً وارد شده‌اید',
    apiKey: 'کلید اِی‌پی‌آی',
    authenticated: 'احراز هویت شده',
    backToLogin: 'بازگشت به برگه ورود',
    beginCreateFirstUser: 'برای آغاز، نخستین کاربر خود را بسازید.',
    changePassword: 'تغییر گذرواژه',
    checkYourEmailForPasswordReset:
      'برای بازیابی ایمن گذرواژه خود، پیامی که به رایانامه شما فرستادیم و دارای پیوند بازنشانی گذرواژه است را بررسی نمایید.',
    confirmGeneration: 'تأیید ساخت',
    confirmPassword: 'تأیید گذرواژه',
    createFirstUser: 'ایجاد کاربر نخست',
    emailNotValid: 'رایانامه ارائه‌شده درست نیست',
    emailOrUsername: 'ایمیل یا نام کاربری',
    emailSent: 'رایانامه فرستاده شد',
    emailVerified: 'ایمیل با موفقیت تایید شد.',
    enableAPIKey: 'فعال‌سازی کلید اِی‌پی‌آی',
    failedToUnlock: 'باز کردن قفل ناموفق بود',
    forceUnlock: 'باز کردن قفل اجباری',
    forgotPassword: 'بازیابی گذرواژه',
    forgotPasswordEmailInstructions:
      'لطفا نام کاربری یا نشانی رایانامه خود را وارد نمایید. شما یک پیام با دستورالعمل راه‌اندازی مجدد گذرواژه خود دریافت خواهید کرد.',
    forgotPasswordQuestion: 'بازیابی گذرواژه؟',
    forgotPasswordUsernameInstructions:
      'لطفاً نام کاربری خود را در زیر وارد کنید. دستورالعمل هایی در خصوص تغییر رمز عبور به آدرس ایمیل مرتبط با نام کاربری شما ارسال خواهد شد.',
    generate: 'ساخت',
    generateNewAPIKey: 'ساخت کلید اِی‌پی‌آی تازه',
    generatingNewAPIKeyWillInvalidate:
      'ساخت کلید اِی‌پی‌آی تازه انجام خواهد شد، اما کلیدهای پیشین را <1>باطل</1>خواهد کرد، تمایل دارید ادامه دهید؟',
    lockUntil: 'قفل تا',
    logBackIn: 'دوباره وارد شوید',
    loggedIn: 'برای ورود با کاربر دیگر، باید اول <0>خارج</0> شوید.',
    loggedInChangePassword:
      'برای تغییر گذرواژه، به <0>نمایه</0> بروید تا گذرواژه خود را ویرایش کنید.',
    loggedOutInactivity: 'شما به دلیل عدم فعالیت از سیستم خارج شده اید.',
    loggedOutSuccessfully: 'شما با موفقیت از سیستم خارج شدید.',
    loggingOut: 'در حال خروج...',
    login: 'وارد شدن',
    loginAttempts: 'تلاش برای ورود',
    loginUser: 'ورود کاربر',
    loginWithAnotherUser: 'برای ورود با کاربر دیگر، باید اول<0>خارج</0> شوید.',
    logOut: 'خروج',
    logout: 'خروج',
    logoutSuccessful: 'خروج موفقیت آمیز بود.',
    logoutUser: 'خروج از کاربر',
    newAccountCreated:
      'یک نمایه کاربری تازه برای دسترسی شما ساخته شده است <a href="{{serverURL}}">{{serverURL}}</a> لطفاً روی پیوند زیر کلیک کنید یا آدرس زیر را در مرورگر خود قرار دهید تا رایانامه خود را تأیید کنید: <a href="{{verificationURL}}">{{verificationURL}}</a><br> پس از تایید رایانامه خود، می توانید وارد سیستم شوید.',
    newAPIKeyGenerated: 'کلید اِی‌پی‌آی تازه ساخته شد.',
    newPassword: 'گذرواژه تازه',
    passed: 'احراز هویت موفق',
    passwordResetSuccessfully: 'رمز عبور با موفقیت تنظیم مجدد شد.',
    resetPassword: 'بازنشانی گذرواژه',
    resetPasswordExpiration: 'زمان انقضاء بازنشانی گذرواژه',
    resetPasswordToken: 'ژتون بازیابی گذرواژه',
    resetYourPassword: 'گذرواژه خود را بازنشانی کنید',
    stayLoggedIn: 'وارد سیستم بمانید',
    successfullyRegisteredFirstUser: 'کاربر اول با موفقیت ثبت نام شد.',
    successfullyUnlocked: 'با موفقیت باز شد',
    tokenRefreshSuccessful: 'تازه سازی توکن موفق بود.',
    unableToVerify: 'امکان تأیید نیست',
    username: 'نام کاربری',
    usernameNotValid: 'نام کاربری ارائه شده معتبر نیست',
    verified: 'تأیید شده',
    verifiedSuccessfully: 'با موفقیت تأیید شد',
    verify: 'تأیید',
    verifyUser: 'تأیید کاربر',
    verifyYourEmail: 'رایانامه خود را تأیید کنید',
    youAreInactive:
      'مدتی است که فعال نبوده‌اید و به زودی جهت حفظ امنیت شما به صورت خودکار از سیستم خارج خواهید شد. ادامه می‌دهید؟',
    youAreReceivingResetPassword:
      'درخواست بازنشانی گذرواژه نمایه توسط شما یا فرد دیگری فرستاده شده است، اگر این درخواست از سمت شما بوده روی پیوند مقابل کلیک کنید یا در مرورگر وب خود پیوند را کپی کنید تا مراحل بازنشانی گذرواژه تکمیل شود، در غیر این صورت جای نگرانی نیست این پیام را نادیده بگیرید:',
    youDidNotRequestPassword:
      'اگر شما این درخواست را ندادید، لطفاً این رایانامه را نادیده بگیرید و گذرواژه شما تغییری نخواهد کرد.',
  },
  error: {
    accountAlreadyActivated: 'این حساب قبلاً فعال شده است.',
    autosaving: 'هنگام ذخیره خودکار این سند خطایی رخ داد.',
    correctInvalidFields: 'لطفا کادرهای نامعتبر را تصحیح کنید.',
    deletingFile: 'هنگام حذف فایل خطایی روی داد.',
    deletingTitle: 'هنگام حذف {{title}} خطایی رخ داد. لطفاً وضعیت اتصال اینترنت خود را بررسی کنید.',
    emailOrPasswordIncorrect: 'رایانامه یا گذرواژه ارائه شده نادرست است.',
    followingFieldsInvalid_one: 'کادر زیر نامعتبر است:',
    followingFieldsInvalid_other: 'کادرهای زیر نامعتبر هستند:',
    incorrectCollection: 'مجموعه نادرست',
    invalidFileType: 'نوع رسانه نامعتبر است',
    invalidFileTypeValue: 'نوع رسانه نامعتبر: {{value}}',
    loadingDocument: 'مشکلی در بارگیری رسانه با شناسه {{id}} پیش آمد.',
    localesNotSaved_one: 'امکان ذخیره‌سازی تنظیمات محلی زیر وجود ندارد:',
    localesNotSaved_other: 'امکان ذخیره‌سازی تنظیمات محلی زیر وجود ندارد:',
    logoutFailed: 'خروج ناموفق بود.',
    missingEmail: 'رایانامه وارد نشده.',
    missingIDOfDocument: 'شناسه سند جهت بروزرسانی نامعتبر است.',
    missingIDOfVersion: 'شناسه نگارش وارد نشده.',
    missingRequiredData: 'داده های مورد نیاز وجود ندارد.',
    noFilesUploaded: 'هیچ رسانه‌ای بارگذاری نشده.',
    noMatchedField: 'کادر منطبقی با"{{label}}" یافت نشد',
    notAllowedToAccessPage: 'شما اجازه دسترسی به این برگه را ندارید.',
    notAllowedToPerformAction: 'این عملیات برای شما مجاز نیست.',
    notFound: 'منبع درخواست شده یافت نشد.',
    noUser: 'بدون کاربر',
    previewing: 'مشکلی در پیش‌نمایش این رسانه رخ داد.',
    problemUploadingFile: 'هنگام بارگذاری سند خطایی رخ داد.',
    tokenInvalidOrExpired: 'ژتون شما نامعتبر یا منقضی شده است.',
    tokenNotProvided: 'توکن ارائه نشده است.',
    unableToDeleteCount: 'نمی‌توان {{count}} از {{total}} {{label}} را حذف کرد.',
    unableToUpdateCount: 'امکان به روز رسانی {{count}} خارج از {{total}} {{label}} وجود ندارد.',
    unauthorized: 'درخواست نامعتبر، جهت فرستادن این درخواست باید وارد شوید.',
    unknown: 'یک خطای ناشناخته رخ داد.',
    unPublishingDocument: 'هنگام لغو انتشار این سند خطایی رخ داد.',
    unspecific: 'خطایی رخ داد.',
    userEmailAlreadyRegistered: 'کاربری با ایمیل داده شده قبلاً ثبت نام کرده است.',
    userLocked: 'این کاربر به دلیل تلاش های زیاد برای ورود ناموفق قفل شده است.',
    usernameAlreadyRegistered: 'کاربری با نام کاربری داده شده قبلا ثبت نام کرده است.',
    usernameOrPasswordIncorrect: 'نام کاربری یا گذرواژه ارائه شده صحیح نیست.',
    valueMustBeUnique: 'مقدار باید منحصر به فرد باشد',
    verificationTokenInvalid: 'ژتون تأیید نامعتبر است.',
  },
  fields: {
    addLabel: 'افزودن {{label}}',
    addLink: 'افزودن پیوند',
    addNew: 'افزودن',
    addNewLabel: 'افزودن {{label}} تازه',
    addRelationship: 'افزودن پیوستگی',
    addUpload: 'افزودن بارگذار',
    block: 'بلوک',
    blocks: 'بلوک‌ها',
    blockType: 'نوع بلوک',
    chooseBetweenCustomTextOrDocument:
      'بین یک نشانی وب یا پیوند دادن به سندی دیگری یکی را انتخاب کنید.',
    chooseDocumentToLink: 'یک سند را برای پیوند دادن برگزینید',
    chooseFromExisting: 'برگزیدن از بین ورودی‌ها',
    chooseLabel: 'انتخاب {{label}}',
    collapseAll: 'بستن همه',
    customURL: 'URL سفارشی',
    editLabelData: 'ویرایش {{label}} داده',
    editLink: 'نگارش پیوند',
    editRelationship: 'نگارش پیوستگی',
    enterURL: 'یک نشانی وب وارد کنید',
    internalLink: 'پیوند درونی',
    itemsAndMore: '{{items}} و {{count}} بیش‌تر',
    labelRelationship: '{{label}} پیوستگی',
    latitude: 'عرض جغرافیایی',
    linkedTo: 'مرتبط با <0>{{label}}</0>',
    linkType: 'نوع پیوند',
    longitude: 'طول جغرافیایی',
    newLabel: 'تازه {{label}}',
    openInNewTab: 'بازکردن درزبانه تازه',
    passwordsDoNotMatch: 'گذرواژه‌های وارد شده مطابقت ندارند.',
    relatedDocument: 'اسناد مرتبط',
    relationTo: 'پیوست به',
    removeRelationship: 'حذف پیوستگی',
    removeUpload: 'حذف بارگذار',
    saveChanges: 'ذخیره تغییرات',
    searchForBlock: 'جست‌وجو برای بلوک',
    selectExistingLabel: 'انتخاب موارد {{label}}',
    selectFieldsToEdit: 'انتخاب کادرها برای نگارش',
    showAll: 'نمایش کل',
    swapRelationship: 'تبادل پیوستگی',
    swapUpload: 'تبادل بارگذار',
    textToDisplay: 'متن برای نمایش',
    toggleBlock: 'کارگذاری بلوک',
    uploadNewLabel: 'بارگذاری تازه {{label}}',
  },
  general: {
    aboutToDelete: 'شما در حال پاک کردن {{label}} <1>{{title}}</1> هستید. اطمینان دارید؟',
    aboutToDeleteCount_many: 'شما در حال پاک کردن {{count}} تعداد {{label}} هستید',
    aboutToDeleteCount_one: 'شما در حال پاک کردن {{count}} تعداد {{label}} هستید',
    aboutToDeleteCount_other: 'شما در شرف حذف هستید {{count}} {{label}}',
    addBelow: 'افزودن به زیر',
    addFilter: 'افزودن علامت',
    adminTheme: 'پوسته پیشخوان',
    and: 'و',
    applyChanges: 'اعمال تغییرات',
    ascending: 'صعودی',
    automatic: 'خودکار',
    backToDashboard: 'بازگشت به پیشخوان',
    cancel: 'لغو',
    changesNotSaved:
      'تغییرات شما ذخیره نشده، اگر این برگه را ترک کنید. تمام تغییرات از دست خواهد رفت.',
    clearAll: undefined,
    close: 'بستن',
    collapse: 'بستن',
    collections: 'مجموعه‌ها',
    columns: 'ستون‌ها',
    columnToSort: 'ستون برای مرتب‌سازی',
    confirm: 'تأیید',
    confirmDeletion: 'تأئید عملیات حذف',
    confirmDuplication: 'تأئید رونوشت',
    copied: 'رونوشت شده',
    copy: 'رونوشت',
    create: 'ساختن',
    created: 'ساخته شده',
    createdAt: 'ساخته شده در',
    createNew: 'ساختن تازه',
    createNewLabel: 'ساختن {{label}} تازه',
    creating: 'در حال ساخت',
    creatingNewLabel: 'در حال ساختن {{label}} تازه',
    custom: 'سفارشی',
    dark: 'تاریک',
    dashboard: 'پیشخوان',
    delete: 'حذف',
    deletedCountSuccessfully: 'تعداد {{count}} {{label}} با موفقیت پاک گردید.',
    deletedSuccessfully: 'با موفقیت حذف شد.',
    deleting: 'در حال حذف...',
    depth: 'عمق',
    descending: 'رو به پایین',
    deselectAllRows: 'تمام سطرها را از انتخاب خارج کنید',
    document: 'سند',
    documents: 'اسناد',
    duplicate: 'تکراری',
    duplicateWithoutSaving: 'رونوشت بدون ذخیره کردن تغییرات',
    edit: 'نگارش',
    editing: 'در حال نگارش',
    editingLabel_many: 'در حال نگارش {{count}} از {{label}}',
    editingLabel_one: 'در حال نگارش {{count}} از {{label}}',
    editingLabel_other: 'در حال نگارش {{count}} از {{label}}',
    editLabel: 'نگارش {{label}}',
    email: 'رایانامه',
    emailAddress: 'نشانی رایانامه',
    enterAValue: 'یک مقدار وارد کنید',
    error: 'خطا',
    errors: 'خطاها',
    fallbackToDefaultLocale: 'بازگردان پیشفرض زبان',
    false: 'غلط',
    filter: 'علامت‌گذاری',
    filters: 'علامت‌گذاری‌ها',
    filterWhere: 'علامت گذاری کردن {{label}} جایی که',
    globals: 'سراسری',
    language: 'زبان',
    lastModified: 'آخرین نگارش',
    leaveAnyway: 'به هر حال ترک کن',
    leaveWithoutSaving: 'ترک کردن بدون ذخیره',
    light: 'روشن',
    livePreview: 'پیش‌نمایش',
    loading: 'در حال بارگذاری',
    locale: 'زبان',
    locales: 'زبان‌ها',
    menu: 'منو',
    moveDown: 'حرکت به پایین',
    moveUp: 'حرکت به بالا',
    newPassword: 'گذرواژه تازه',
    next: 'بعدی',
    noFiltersSet: 'هیچ علامت‌گذاری تنظیم نشده',
    noLabel: '<No {{label}}>',
    none: 'هیچ یک',
    noOptions: 'بدون گزینه',
    noResults:
      'هیچ {{label}} یافت نشد. {{label}} یا هنوز وجود ندارد یا هیچ کدام با علامت‌گذاری‌هایی که در بالا مشخص کرده اید مطابقت ندارد.',
    notFound: 'یافت نشد',
    nothingFound: 'چیزی یافت نشد',
    noValue: 'بدون مقدار',
    of: 'از',
    open: 'باز کردن',
    or: 'یا',
    order: 'چیدمان',
    pageNotFound: 'برگه یافت نشد',
    password: 'گذرواژه',
    payloadSettings: 'تنظیمات پی‌لود',
    perPage: 'هر برگه: {{limit}}',
    previous: 'قبلی',
    remove: 'برداشتن',
    reset: 'بازنشانی',
    row: 'ردیف',
    rows: 'ردیف‌ها',
    save: 'ذخیره',
    saving: 'در حال ذخیره...',
    searchBy: 'جستجو بر اساس {{label}}',
    selectAll: 'انتخاب همه {{count}} {{label}}',
    selectAllRows: 'انتخاب تمام سطرها',
    selectedCount: '{{count}} {{label}} انتخاب شد',
    selectValue: 'یک مقدار را انتخاب کنید',
    showAllLabel: 'نمایش همه {{label}}',
    sorryNotFound: 'متأسفانه چیزی برای مطابقت با درخواست شما وجود ندارد.',
    sort: 'مرتب‌سازی',
    sortByLabelDirection: 'مرتب کردن بر اساس {{label}} {{direction}}',
    stayOnThisPage: 'ماندن در این برگه',
    submissionSuccessful: 'با موفقیت ثبت شد.',
    submit: 'فرستادن',
    submitting: 'در حال ارسال...',
    success: 'موفقیت',
    successfullyCreated: '{{label}} با موفقیت ساخته شد.',
    successfullyDuplicated: '{{label}} با موفقیت رونوشت شد.',
    thisLanguage: 'فارسی',
    titleDeleted: '{{label}} "{{title}}" با موفقیت پاک شد.',
    true: 'درست',
    unauthorized: 'غیرمجاز',
    unsavedChangesDuplicate: 'شما تغییرات ذخیره نشده دارید. مطمئنید میخواهید به رونوشت ادامه دهید؟',
    untitled: 'بدون عنوان',
    updatedAt: 'بروز شده در',
    updatedCountSuccessfully: 'تعداد {{count}} با عنوان {{label}} با موفقیت بروزرسانی شدند.',
    updatedSuccessfully: 'با موفقیت به‌روز شد.',
    updating: 'در حال به‌روزرسانی',
    uploading: 'در حال بارگذاری',
    user: 'کاربر',
    username: 'نام کاربری',
    users: 'کاربران',
    value: 'مقدار',
    welcome: 'خوش‌آمدید',
  },
  operators: {
    contains: 'شامل',
    equals: 'برابر با',
    exists: 'وجود دارد',
    intersects: 'تلاقی',
    isGreaterThan: 'بزرگتر است از',
    isGreaterThanOrEqualTo: 'بزرگتر یا مساوی است',
    isIn: 'هست در',
    isLessThan: 'کمتر است از',
    isLessThanOrEqualTo: 'کمتر یا مساوی است',
    isLike: 'مانند این است',
    isNotEqualTo: 'برابر نیست',
    isNotIn: 'در این نیست',
    near: 'نزدیک',
    within: 'در داخل',
  },
  upload: {
    addFile: 'اضافه کردن فایل',
    addFiles: 'اضافه کردن فایل‌ها',
    bulkUpload: 'بارگذاری انبوه',
    crop: 'محصول',
    cropToolDescription:
      'گوشه‌های منطقه انتخاب شده را بکشید، یک منطقه جدید رسم کنید یا مقادیر زیر را تنظیم کنید.',
    dragAndDrop: 'یک سند را بکشید و رها کنید',
    dragAndDropHere: 'یا یک سند را به اینجا بکشید و رها کنید',
    editImage: 'ویرایش تصویر',
    fileName: 'نام رسانه',
    fileSize: 'حجم رسانه',
    filesToUpload: 'فایل ها برای بارگذاری',
    fileToUpload: 'فایل برای بارگذاری',
    focalPoint: 'نقطه متمرکز',
    focalPointDescription:
      'نقطه کانونی را مستقیماً روی پیش نمایش بکشید یا مقادیر زیر را تنظیم کنید.',
    height: 'ارتفاع',
    lessInfo: 'اطلاعات کمتر',
    moreInfo: 'اطلاعات بیشتر',
    pasteURL: 'چسباندن آدرس اینترنتی',
    previewSizes: 'اندازه های پیش نمایش',
    selectCollectionToBrowse: 'یک مجموعه را برای مرور انتخاب کنید',
    selectFile: 'برگزیدن رسانه',
    setCropArea: 'تنظیم ناحیه برش',
    setFocalPoint: 'تنظیم نقطه کانونی',
    sizes: 'اندازه‌ها',
    sizesFor: 'اندازه‌ها برای {{label}}',
    width: 'پهنا',
  },
  validation: {
    emailAddress: 'لطفاً یک نشانی رایانامه معتبر وارد کنید.',
    enterNumber: 'لطفاً یک شماره درست وارد کنید.',
    fieldHasNo: 'این کادر شامل هیچ {{label}} نمی‌شود',
    greaterThanMax: '{{value}} بیشتر از حداکثر مجاز برای {{label}} است که {{max}} است.',
    invalidInput: 'این کادر دارای ورودی نامعتبر است.',
    invalidSelection: 'این کادر دارای یک انتخاب نامعتبر است.',
    invalidSelections: 'این کادر دارای انتخاب‌های نامعتبر زیر است:',
    lessThanMin: '{{value}} کمتر از حداقل مجاز برای {{label}} است که {{min}} است.',
    limitReached: 'محدودیت رسیده است، فقط {{max}} مورد می تواند اضافه شود.',
    longerThanMin: 'ورودی باید بیش از حداقل {{minLength}} واژه باشد.',
    notValidDate: '"{{value}}" یک تاریخ معتبر نیست.',
    required: 'این کادر اجباری است.',
    requiresAtLeast: 'این رشته حداقل نیازمند {{count}} {{label}}.',
    requiresNoMoreThan: 'این رشته به بیش از {{count}} {{label}} نیاز دارد.',
    requiresTwoNumbers: 'این کادر به دو عدد نیاز دارد.',
    shorterThanMax: 'ورودی باید کمتر از {{maxLength}} واژه باشد.',
    trueOrFalse: 'این کادر فقط می تواند به صورت true یا false باشد.',
    username:
      'لطفاً یک نام کاربری معتبر وارد کنید. می تواند شامل حروف، اعداد، خط فاصله، نقاط و خط زیر باشد.',
    validUploadID: 'این فیلد یک شناسه بارگذاری معتبر نیست.',
  },
  version: {
    type: 'تایپ کنید',
    aboutToPublishSelection:
      'شما در حال انتشار همه {{label}} برگزیده هستید از این کار اطمینان دارید؟',
    aboutToRestore:
      'شما در شرف بازیابی این هستید {{label}} سند به ایالتی که در آن بود {{versionDate}}.',
    aboutToRestoreGlobal: 'شما در حال بازگردانی کلی {{label}} در این {{versionDate}} هستید.',
    aboutToRevertToPublished:
      'شما در حال بازگردانی تغییرات این رسانه به وضعیت منتشر شده آن هستید. از این کار اطمینان دارید؟',
    aboutToUnpublish: 'شما در حال لغو انتشار این سند هستید، آیا از این کار اطمینان دارید؟',
    aboutToUnpublishSelection: 'شما در شرف لغو انتشار {{label}} برگزیده هستید. ایا اطمینان دارید؟',
    autosave: 'ذخیره خودکار',
    autosavedSuccessfully: 'با موفقیت ذخیره خودکار شد.',
    autosavedVersion: 'نگارش ذخیره شده خودکار',
    changed: 'تغییر کرد',
    compareVersion: 'مقایسه نگارش با:',
    confirmPublish: 'تأیید انتشار',
    confirmRevertToSaved: 'تأیید بازگردانی نگارش ذخیره شده',
    confirmUnpublish: 'تأیید لغو انتشار',
    confirmVersionRestoration: 'تأیید بازیابی نگارش',
    currentDocumentStatus: 'جاری {{docStatus}} سند',
    currentDraft: 'پیش نویس فعلی',
    currentPublishedVersion: 'نسخه منتشر شده فعلی',
    draft: 'پیش‌نویس',
    draftSavedSuccessfully: 'پیش‌نویس با موفقیت ذخیره شد.',
    lastSavedAgo: 'آخرین بار {{distance}} پیش ذخیره شد',
    modifieldOnly: 'Modified only',
    noFurtherVersionsFound: 'نگارش دیگری یافت نشد',
    noRowsFound: 'هیچ {{label}} یافت نشد',
    noRowsSelected: undefined,
    preview: 'پیش‌نمایش',
    previouslyPublished: 'قبلا منتشر شده',
    problemRestoringVersion: 'مشکلی در بازیابی این نگارش وجود دارد',
    publish: 'انتشار',
    publishChanges: 'انتشار تغییرات',
    published: 'انتشار یافته',
    publishing: 'انتشار',
    restoreAsDraft: 'بازیابی به عنوان پیش‌نویس',
    restoredSuccessfully: 'با موفقیت بازیابی شد.',
    restoreThisVersion: 'این نگارش را بازیابی کنید',
    restoring: 'در حال بازیابی...',
    reverting: 'در حال بازگردانی...',
    revertToPublished: 'بازگردانی به انتشار یافته',
    saveDraft: 'ذخیره پیش‌نویس',
    selectLocales: 'زبان‌ها را برای نمایش انتخاب کنید',
    selectVersionToCompare: 'نگارشی را برای مقایسه انتخاب کنید',
    showingVersionsFor: 'نمایش نگارش‌ها برای:',
    showLocales: 'نمایش زبان‌ها:',
    status: 'وضعیت',
    unpublish: 'لغو انتشار',
    unpublishing: 'در حال لغو انتشار...',
    version: 'نگارش',
    versionCount_many: '{{count}} نگارش‌ یافت شد',
    versionCount_none: 'هیچ نگارشی یافت نشد',
    versionCount_one: '{{count}} نگارش یافت شد',
    versionCount_other: '{{count}} نگارش یافت شد',
    versionCreatedOn: '{{version}} ساخته شده در:',
    versionID: 'شناسه نگارش',
    versions: 'نگارش‌ها',
    viewingVersion: 'در حال مشاهده نگارش برای {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'در حال مشاهده نگارش‌های کلی {{entityLabel}}',
    viewingVersions: 'مشاهده نگارش‌ها برای {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'مشاهده نگارش‌های کلی {{entityLabel}}',
  },
}

export const fa: Language = {
  dateFNSKey: 'fa-IR',
  translations: faTranslations,
}
