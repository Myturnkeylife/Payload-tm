import type { DefaultTranslationsObject, Language } from '../types.js'

export const arTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'الحساب',
    accountOfCurrentUser: 'حساب المستخدم الحالي',
    accountVerified: 'تم التحقق من الحساب بنجاح.',
    alreadyActivated: 'تمّ التّفعيل بالفعل',
    alreadyLoggedIn: 'تمّ تسجيل الدّخول بالفعل',
    apiKey: 'مفتاح API',
    authenticated: 'مصادق عليه',
    backToLogin: 'العودة لتسجيل الدخول',
    beginCreateFirstUser: 'للبدء, قم بإنشاء المستخدم الأوّل.',
    changePassword: 'تغيير كلمة المرور',
    checkYourEmailForPasswordReset:
      'تحقّق من بريدك الإلكتروني بحثًا عن رابط يسمح لك بإعادة تعيين كلمة المرور الخاصّة بك بشكل آمن.',
    confirmGeneration: 'تأكيد التّوليد',
    confirmPassword: 'تأكيد كلمة المرور',
    createFirstUser: 'إنشاء المستخدم الأوّل',
    emailNotValid: 'البريد الإلكتروني غير صالح',
    emailSent: 'تمّ ارسال البريد الإلكتروني',
    emailVerified: 'تم التحقق من البريد الإلكتروني بنجاح.',
    enableAPIKey: 'تفعيل مفتاح API',
    failedToUnlock: 'فشل فتح القفل',
    forceUnlock: 'إجبار فتح القفل',
    forgotPassword: 'نسيت كلمة المرور',
    forgotPasswordEmailInstructions:
      'يرجى إدخال البريد الالكتروني أدناه. ستتلقّى رسالة بريد إلكتروني تحتوي على إرشادات حول كيفيّة إعادة تعيين كلمة المرور الخاصّة بك.',
    forgotPasswordQuestion: 'هل نسيت كلمة المرور؟',
    forgotPasswordUsernameInstructions:
      'يرجى إدخال اسم المستخدم الخاص بك أدناه. سيتم إرسال تعليمات حول كيفية إعادة تعيين كلمة المرور الخاصة بك إلى عنوان البريد الإلكتروني المرتبط باسم المستخدم الخاص بك.',
    generate: 'توليد',
    generateNewAPIKey: 'توليد مفتاح API جديد',
    generatingNewAPIKeyWillInvalidate:
      'سيؤدّي إنشاء مفتاح API جديد إلى <1> إبطال </ 1> المفتاح السّابق. هل أنت متأكّد أنّك تريد المتابعة؟',
    lockUntil: 'قفل حتى',
    logBackIn: 'تسجيل الدّخول من جديد',
    logOut: 'تسجيل الخروج',
    loggedIn: 'لتسجيل الدّخول مع مستخدم آخر ، يجب عليك <0> تسجيل الخروج </0> أوّلاً.',
    loggedInChangePassword:
      'لتغيير كلمة المرور الخاصّة بك ، انتقل إلى <0>حسابك</0> وقم بتعديل كلمة المرور هناك.',
    loggedOutInactivity: 'لقد تمّ تسجيل الخروج بسبب عدم النّشاط.',
    loggedOutSuccessfully: 'لقد تمّ تسجيل خروجك بنجاح.',
    loggingOut: 'تسجيل الخروج...',
    login: 'تسجيل الدخول',
    loginAttempts: 'محاولات تسجيل الدخول',
    loginUser: 'تسجيل دخول المستخدم',
    loginWithAnotherUser: 'لتسجيل الدخول مع مستخدم آخر ، يجب عليك <0> تسجيل الخروج </0> أوّلاً.',
    logout: 'تسجيل الخروج',
    logoutSuccessful: 'تم تسجيل الخروج بنجاح.',
    logoutUser: 'تسجيل خروج المستخدم',
    newAPIKeyGenerated: 'تمّ توليد مفتاح API جديد.',
    newAccountCreated:
      'تمّ إنشاء حساب جديد لتتمكّن من الوصول إلى <a href="{{serverURL}}"> {{serverURL}} </a> الرّجاء النّقر فوق الرّابط التّالي أو لصق عنوان URL أدناه في متصفّحّك لتأكيد بريدك الإلكتروني : <a href="{{verificationURL}}"> {{verificationURL}} </a> <br> بعد التّحقّق من بريدك الإلكتروني ، ستتمكّن من تسجيل الدّخول بنجاح.',
    newPassword: 'كلمة مرور جديدة',
    passed: 'تمت المصادقة',
    passwordResetSuccessfully: 'تمت إعادة تعيين كلمة المرور بنجاح.',
    resetPassword: 'إعادة تعيين كلمة المرور',
    resetPasswordExpiration: 'انتهاء صلاحيّة إعادة تعيين كلمة المرور',
    resetPasswordToken: 'رمز إعادة تعيين كلمة المرور',
    resetYourPassword: 'إعادة تعيين كلمة المرور الخاصّة بك',
    stayLoggedIn: 'ابق متّصلًا',
    successfullyRegisteredFirstUser: 'تم تسجيل العضو الأول بنجاح.',
    successfullyUnlocked: 'تمّ فتح القفل بنجاح',
    tokenRefreshSuccessful: 'تم تجديد الرمز بنجاح.',
    unableToVerify: 'غير قادر على التحقق من',
    username: 'اسم المستخدم',
    usernameNotValid: 'اسم المستخدم المقدم غير صالح',
    verified: 'تمّ التحقّق',
    verifiedSuccessfully: 'تمّ التحقّق بنجاح',
    verify: 'قم بالتّحقّق',
    verifyUser: 'قم بالتّحقّق من المستخدم',
    verifyYourEmail: 'قم بتأكيد بريدك الألكتروني',
    youAreInactive:
      'لم تكن نشطًا منذ فترة قصيرة وسيتمّ تسجيل خروجك قريبًا تلقائيًا من أجل أمنك. هل ترغب في البقاء مسجّلا؟',
    youAreReceivingResetPassword:
      'أنت تتلقّى هذا البريد الالكتروني لأنّك (أو لأنّ شخص آخر) طلبت إعادة تعيين كلمة المرور لحسابك. الرّجاء النّقر فوق الرّابط التّالي ، أو لصق هذا الرّابط في متصفّحك لإكمال العمليّة:',
    youDidNotRequestPassword:
      'إن لم تطلب هذا ، يرجى تجاهل هذا البريد الإلكتروني وستبقى كلمة مرورك ذاتها بدون تغيير.',
  },
  error: {
    accountAlreadyActivated: 'تم تفعيل هذا الحساب بالفعل.',
    autosaving: 'حدثت مشكلة أثناء حفظ هذا المستند تلقائيًا.',
    correctInvalidFields: 'يرجى تصحيح الحقول غير الصالحة.',
    deletingFile: 'حدث خطأ أثناء حذف الملف.',
    deletingTitle:
      'حدث خطأ أثناء حذف {{title}}. يرجى التحقق من الاتصال الخاص بك والمحاولة مرة أخرى.',
    emailOrPasswordIncorrect: 'البريد الإلكتروني أو كلمة المرور المقدمة غير صحيحة.',
    followingFieldsInvalid_one: 'الحقل التالي غير صالح:',
    followingFieldsInvalid_other: 'الحقول التالية غير صالحة:',
    incorrectCollection: 'مجموعة غير صحيحة',
    invalidFileType: 'نوع ملف غير صالح',
    invalidFileTypeValue: 'نوع ملف غير صالح: {{value}}',
    loadingDocument: 'حدثت مشكلة أثناء تحميل المستند برقم التعريف {{id}}.',
    localesNotSaved_one: 'لم يتم حفظ اللغة التالية:',
    localesNotSaved_other: 'لم يتم حفظ اللغات التالية:',
    logoutFailed: 'فشل في تسجيل الخروج.',
    missingEmail: 'البريد الإلكتروني مفقود.',
    missingIDOfDocument: 'معرّف المستند المراد تحديثه مفقود.',
    missingIDOfVersion: 'معرّف النسخة مفقود.',
    missingRequiredData: 'توجد بيانات مطلوبة مفقودة.',
    noFilesUploaded: 'لم يتمّ رفع أيّة ملفّات.',
    noMatchedField: 'لم يتمّ العثور على حقل مطابق لـ "{{label}}"',
    noUser: 'لا يوجد مستخدم',
    notAllowedToAccessPage: 'لا يسمح لك الوصول إلى هذه الصّفحة.',
    notAllowedToPerformAction: 'لا يسمح لك القيام بهذه العمليّة.',
    notFound: 'لم يتمّ العثور على المورد المطلوب.',
    previewing: 'حدث خطأ في اثناء معاينة هذا المستند.',
    problemUploadingFile: 'حدث خطأ اثناء رفع الملفّ.',
    tokenInvalidOrExpired: 'الرّمز إمّا غير صالح أو منتهي الصّلاحيّة.',
    tokenNotProvided: 'لم يتم تقديم الرمز.',
    unPublishingDocument: 'حدث خطأ أثناء إلغاء نشر هذا المستند.',
    unableToDeleteCount: 'يتعذّر حذف {{count}} من {{total}} {{label}}.',
    unableToUpdateCount: 'يتعذّر تحديث {{count}} من {{total}} {{label}}.',
    unauthorized: 'غير مصرّح لك ، عليك أن تقوم بتسجيل الدّخول لتتمكّن من تقديم هذا الطّلب.',
    unknown: 'حدث خطأ غير معروف.',
    unspecific: 'حدث خطأ.',
    userEmailAlreadyRegistered: 'يوجد مستخدم مسجل بالفعل بهذا البريد الإلكتروني.',
    userLocked: 'تمّ قفل هذا المستخدم نظرًا لوجود عدد كبير من محاولات تسجيل الدّخول الغير ناجحة.',
    usernameAlreadyRegistered: 'المستخدم بالاسم المعطى مسجل بالفعل.',
    usernameOrPasswordIncorrect: 'اسم المستخدم أو كلمة المرور التي تم تقديمها غير صحيحة.',
    valueMustBeUnique: 'على القيمة أن تكون فريدة',
    verificationTokenInvalid: 'رمز التحقّق غير صالح.',
  },
  fields: {
    addLabel: 'أضف {{label}}',
    addLink: 'أضف رابط',
    addNew: 'أضف جديد',
    addNewLabel: 'أضف {{label}} جديد',
    addRelationship: 'أضف علاقة',
    addUpload: 'أضف تحميل',
    block: 'وحدة محتوى',
    blockType: 'نوع وحدة المحتوى',
    blocks: 'وحدات المحتوى',
    chooseBetweenCustomTextOrDocument: 'اختر بين إدخال عنوان URL نصّي مخصّص أو الرّبط بمستند آخر.',
    chooseDocumentToLink: 'اختر مستندًا للربط',
    chooseFromExisting: 'اختر من القائمة',
    chooseLabel: 'اختر {{label}}',
    collapseAll: 'طيّ الكلّ',
    customURL: 'URL مخصّص',
    editLabelData: 'عدّل بيانات {{label}}',
    editLink: 'عدّل الرّابط',
    editRelationship: 'عدّل العلاقة',
    enterURL: 'ادخل عنوان URL',
    internalLink: 'رابط داخلي',
    itemsAndMore: '{{items}} و {{count}} أخرى',
    labelRelationship: '{{label}} علاقة',
    latitude: 'خطّ العرض',
    linkType: 'نوع الرّابط',
    linkedTo: 'تمّ الرّبط ل <0>{{label}}</0>',
    longitude: 'خطّ الطّول',
    newLabel: '{{label}} جديد',
    openInNewTab: 'الفتح في علامة تبويب جديدة',
    passwordsDoNotMatch: 'كلمة المرور غير مطابقة.',
    relatedDocument: 'مستند مربوط',
    relationTo: 'ربط ل',
    removeRelationship: 'حذف العلاقة',
    removeUpload: 'حذف المحتوى المرفوع',
    saveChanges: 'حفظ التّغييرات',
    searchForBlock: 'ابحث عن وحدة محتوى',
    selectExistingLabel: 'اختيار {{label}} من القائمة',
    selectFieldsToEdit: 'حدّد الحقول اللتي تريد تعديلها',
    showAll: 'إظهار الكلّ',
    swapRelationship: 'تبديل العلاقة',
    swapUpload: 'تبديل المحتوى المرفوع',
    textToDisplay: 'النصّ الذي تريد إظهاره',
    toggleBlock: 'Toggle block',
    uploadNewLabel: 'رفع {{label}} جديد',
  },
  general: {
    aboutToDelete: 'أنت على وشك حذف {{label}} <1>{{title}}</1>. هل أنت متأكّد؟',
    aboutToDeleteCount_many: 'أنت على وشك حذف {{count}} {{label}}',
    aboutToDeleteCount_one: 'أنت على وشك حذف {{count}} {{label}}',
    aboutToDeleteCount_other: 'أنت على وشك حذف {{count}} {{label}}',
    addBelow: 'أضف في الاسفل',
    addFilter: 'أضف فلتر',
    adminTheme: 'شكل واجهة المستخدم',
    and: 'و',
    applyChanges: 'طبق التغييرات',
    ascending: 'تصاعدي',
    automatic: 'تلقائي',
    backToDashboard: 'العودة للوحة التّحكّم',
    cancel: 'إلغاء',
    changesNotSaved: 'لم يتمّ حفظ التّغييرات. إن غادرت الآن ، ستفقد تغييراتك.',
    close: 'إغلاق',
    collapse: 'طيّ',
    collections: 'المجموعات',
    columnToSort: 'التّرتيب حسب العامود',
    columns: 'الأعمدة',
    confirm: 'تأكيد',
    confirmDeletion: 'تأكيد الحذف',
    confirmDuplication: 'تأكيد التّكرار',
    copied: 'تمّ النّسخ',
    copy: 'نسخ',
    create: 'إنشاء',
    createNew: 'أنشاء جديد',
    createNewLabel: 'إنشاء {{label}} جديد',
    created: 'تمّ الإنشاء',
    createdAt: 'تمّ الإنشاء في',
    creating: 'يتمّ الإنشاء',
    creatingNewLabel: 'جاري إنشاء {{label}} جديد',
    custom: 'مخصص',
    dark: 'غامق',
    dashboard: 'لوحة التّحكّم',
    delete: 'حذف',
    deletedCountSuccessfully: 'تمّ حذف {{count}} {{label}} بنجاح.',
    deletedSuccessfully: 'تمّ الحذف بنجاح.',
    deleting: 'يتمّ الحذف...',
    depth: 'عمق',
    descending: 'تنازلي',
    deselectAllRows: 'إلغاء تحديد جميع الصفوف',
    document: 'وثيقة',
    documents: 'وثائق',
    duplicate: 'استنساخ',
    duplicateWithoutSaving: 'استنساخ بدون حفظ التغييرات',
    edit: 'تعديل',
    editLabel: 'تعديل {{label}}',
    editing: 'جاري التعديل',
    editingLabel_many: 'تعديل {{count}} {{label}}',
    editingLabel_one: 'تعديل {{count}} {{label}}',
    editingLabel_other: 'تعديل {{count}} {{label}}',
    email: 'البريد الإلكتروني',
    emailAddress: 'عنوان البريد الإلكتروني',
    enterAValue: 'أدخل قيمة',
    error: 'خطأ',
    errors: 'أخطاء',
    fallbackToDefaultLocale: 'الرجوع إلى اللغة الافتراضية',
    false: 'كاذب',
    filter: 'تصفية',
    filterWhere: 'تصفية {{label}} حيث',
    filters: 'عوامل التصفية',
    globals: 'عامة',
    language: 'اللغة',
    lastModified: 'آخر تعديل',
    leaveAnyway: 'المغادرة على أي حال',
    leaveWithoutSaving: 'المغادرة بدون حفظ',
    light: 'فاتح',
    livePreview: 'معاينة مباشرة',
    loading: 'يتمّ التّحميل',
    locale: 'اللّغة',
    locales: 'اللّغات',
    menu: 'قائمة',
    moveDown: 'التّحريك إلى الأسفل',
    moveUp: 'التّحريك إلى الأعلى',
    newPassword: 'كلمة مرور جديدة',
    noFiltersSet: 'لم يتم تعيين أي عوامل تصفية',
    noLabel: '<لا {{label}}>',
    noOptions: 'لا خيارات',
    noResults:
      'لا يوجد {{label}}. إما أن لا {{label}} موجودة حتى الآن أو لا تتطابق مع عوامل التصفية التي حددتها أعلاه.',
    noValue: 'لا يوجد قيمة',
    none: 'لا شيء',
    notFound: 'غير موجود',
    nothingFound: 'لم يتم العثور على شيء',
    of: 'من',
    open: 'فتح',
    or: 'أو',
    order: 'التّرتيب',
    pageNotFound: 'الصّفحة غير موجودة',
    password: 'كلمة المرور',
    payloadSettings: 'الإعدادات',
    perPage: 'لكلّ صفحة: {{limit}}',
    remove: 'إزالة',
    reset: 'إعادة تعيين',
    row: 'سطر',
    rows: 'أسطُر',
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    searchBy: 'البحث عن طريق {{label}}',
    selectAll: 'تحديد كل {{count}} {{label}}',
    selectAllRows: 'حدد جميع الصفوف',
    selectValue: 'اختيار قيمة',
    selectedCount: 'تم تحديد {{count}} {{label}}',
    showAllLabel: 'عرض كل {{label}}',
    sorryNotFound: 'عذرًا - لا يوجد شيء يتوافق مع طلبك.',
    sort: 'ترتيب',
    sortByLabelDirection: 'رتّب حسب {{label}} {{direction}}',
    stayOnThisPage: 'البقاء على هذه الصفحة',
    submissionSuccessful: 'تمت الإرسال بنجاح.',
    submit: 'إرسال',
    submitting: 'جاري التقديم...',
    success: 'النجاح',
    successfullyCreated: '{{label}} تم إنشاؤها بنجاح.',
    successfullyDuplicated: '{{label}} تم استنساخها بنجاح.',
    thisLanguage: 'العربية',
    titleDeleted: 'تم حذف {{label}} "{{title}}" بنجاح.',
    true: 'صحيح',
    unauthorized: 'غير مصرح به',
    unsavedChangesDuplicate: 'لديك تغييرات لم يتم حفظها. هل تريد الاستمرار في الاستنساخ؟',
    untitled: 'بدون عنوان',
    updatedAt: 'تم التحديث في',
    updatedCountSuccessfully: 'تم تحديث {{count}} {{label}} بنجاح.',
    updatedSuccessfully: 'تم التحديث بنجاح.',
    updating: 'جار التحديث',
    uploading: 'جار الرفع',
    user: 'المستخدم',
    users: 'المستخدمين',
    value: 'القيمة',
    welcome: 'مرحبًا',
  },
  operators: {
    contains: 'يحتوي',
    equals: 'يساوي',
    exists: 'موجود',
    intersects: 'يتقاطع',
    isGreaterThan: 'أكبر من',
    isGreaterThanOrEqualTo: 'أكبر أو يساوي',
    isIn: 'موجود في',
    isLessThan: 'أصغر من',
    isLessThanOrEqualTo: 'أصغر أو يساوي',
    isLike: 'هو مثل',
    isNotEqualTo: 'لا يساوي',
    isNotIn: 'غير موجود في',
    near: 'قريب من',
    within: 'في غضون',
  },
  upload: {
    addImage: 'إضافة صورة',
    crop: 'محصول',
    cropToolDescription: 'اسحب الزوايا المحددة للمنطقة، رسم منطقة جديدة أو قم بضبط القيم أدناه.',
    dragAndDrop: 'قم بسحب وإسقاط ملفّ',
    dragAndDropHere: 'أو اسحب الملفّ وأفلته هنا',
    editImage: 'تعديل الصورة',
    fileName: 'اسم الملفّ',
    fileSize: 'حجم الملفّ',
    focalPoint: 'نقطة التركيز',
    focalPointDescription: 'اسحب النقطة المركزية مباشرة على المعاينة أو قم بضبط القيم أدناه.',
    height: 'الطّول',
    lessInfo: 'معلومات أقلّ',
    moreInfo: 'معلومات أكثر',
    pasteURL: 'لصق الرابط',
    previewSizes: 'أحجام المعاينة',
    selectCollectionToBrowse: 'حدّد مجموعة لاستعراضها',
    selectFile: 'اختر ملفّ',
    setCropArea: 'حدد منطقة القص',
    setFocalPoint: 'حدد النقطة البؤرية',
    sizes: 'الاحجام',
    sizesFor: 'أحجام لـ {{label}}',
    width: 'العرض',
  },
  validation: {
    emailAddress: 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
    enterNumber: 'يرجى إدخال رقم صحيح.',
    fieldHasNo: 'هذا الحقل ليس لديه {{label}}',
    greaterThanMax: '{{value}} أكبر من الحد الأقصى المسموح به {{label}} الذي يبلغ {{max}}.',
    invalidInput: 'هذا الحقل لديه إدخال غير صالح.',
    invalidSelection: 'هذا الحقل لديه اختيار غير صالح.',
    invalidSelections: 'هذا الحقل لديه الاختيارات الغير صالحة التالية:',
    lessThanMin: '{{value}} أقل من الحد الأدنى المسموح به {{label}} الذي يبلغ {{min}}.',
    limitReached: 'تم الوصول إلى الحد الأقصى، يمكن إضافة {{max}} عناصر فقط.',
    longerThanMin: 'يجب أن يكون هذا القيمة أطول من الحد الأدنى للطول الذي هو {{minLength}} أحرف.',
    notValidDate: '"{{value}}" ليس تاريخا صالحا.',
    required: 'هذا الحقل مطلوب.',
    requiresAtLeast: 'هذا الحقل يتطلب على الأقل {{count}} {{label}}.',
    requiresNoMoreThan: 'هذا الحقل يتطلب عدم تجاوز {{count}} {{label}}.',
    requiresTwoNumbers: 'هذا الحقل يتطلب رقمين.',
    shorterThanMax: 'يجب أن تكون هذه القيمة أقصر من الحد الأقصى للطول الذي هو {{maxLength}} أحرف.',
    trueOrFalse: 'يمكن أن يكون هذا الحقل مساويًا فقط للقيمتين صحيح أو خطأ.',
    validUploadID: 'هذا الحقل ليس معرّف تحميل صالح.',
  },
  version: {
    type: 'النّوع',
    aboutToPublishSelection: 'أنت على وشك نشر كلّ {{label}} في التّحديد. هل أنت متأكّد؟',
    aboutToRestore:
      'أنت على وشك استرجاع هذا المستند {{label}} إلى الحالة التّي كان عليها في {{versionDate}}.',
    aboutToRestoreGlobal:
      'أنت على وشك استرجاع الاعداد العامّ {{label}} إلى الحالة التي كان عليها في {{versionDate}}.',
    aboutToRevertToPublished: 'أنت على وشك إعادة هذا المستند إلى حالته المنشورة. هل أنت متأكّد؟',
    aboutToUnpublish: 'أنت على وشك إلغاء نشر هذا المستند. هل أنت متأكّد؟',
    aboutToUnpublishSelection: 'أنت على وشك إلغاء نشر كلّ {{label}} في التّحديد. هل أنت متأكّد؟',
    autosave: 'حفظ تلقائي',
    autosavedSuccessfully: 'تمّ الحفظ التّلقائي بنجاح.',
    autosavedVersion: 'النّسخة المحفوظة تلقائياً',
    changed: 'تمّ التّغيير',
    compareVersion: 'مقارنة النّسخة مع:',
    confirmPublish: 'تأكيد النّشر',
    confirmRevertToSaved: 'تأكيد الرّجوع للنسخة المنشورة',
    confirmUnpublish: 'تأكيد إلغاء النّشر',
    confirmVersionRestoration: 'تأكيد إستعادة النّسخة',
    currentDocumentStatus: 'المستند {{docStatus}} الحالي',
    currentDraft: 'المسودة الحالية',
    currentPublishedVersion: 'النسخة المنشورة الحالية',
    draft: 'مسودّة',
    draftSavedSuccessfully: 'تمّ حفظ المسودّة بنجاح.',
    lastSavedAgo: 'تم الحفظ آخر مرة قبل {{distance}}',
    noFurtherVersionsFound: 'لم يتمّ العثور على نسخات أخرى',
    noRowsFound: 'لم يتمّ العثور على {{label}}',
    preview: 'معاينة',
    previouslyPublished: 'نشر سابقا',
    problemRestoringVersion: 'حدث خطأ في استعادة هذه النّسخة',
    publish: 'نشر',
    publishChanges: 'نشر التّغييرات',
    published: 'تمّ النّشر',
    publishing: 'نشر',
    restoreAsDraft: 'استعادة كمسودة',
    restoreThisVersion: 'استعادة هذه النّسخة',
    restoredSuccessfully: 'تمّت الاستعادة بنحاح.',
    restoring: 'تتمّ الاستعادة...',
    revertToPublished: 'الرّجوع للنسخة المنشورة',
    reverting: 'يتمّ الاسترجاع...',
    saveDraft: 'حفظ المسودّة',
    selectLocales: 'حدّد اللّغات المراد عرضها',
    selectVersionToCompare: 'حدّد نسخة للمقارنة',
    showLocales: 'اظهر اللّغات:',
    showingVersionsFor: 'يتمّ عرض النًّسخ ل:',
    status: 'الحالة',
    unpublish: 'الغاء النّشر',
    unpublishing: 'يتمّ الغاء النّشر...',
    version: 'النّسخة',
    versionCount_many: 'تمّ العثور على {{count}} نُسخ',
    versionCount_none: 'لم يتمّ العثور على أيّ من النّسخ',
    versionCount_one: 'تمّ العثور على {{count}} من النّسخ',
    versionCount_other: 'تمّ العثور على {{count}} نُسخ',
    versionCreatedOn: 'تمّ ﻹنشاء النّسخة في {{version}}:',
    versionID: 'مُعرّف النّسخة',
    versions: 'النُّسَخ',
    viewingVersion: 'يتمّ استعراض نسخة ل {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'يتمّ استعراض نسخة للاعداد العامّ {{entityLabel}}',
    viewingVersions: 'يتمّ استعراض النُّسَخ ل {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'يتمّ استعراض النُّسَخ للاعداد العامّ {{entityLabel}}',
  },
}

export const ar: Language = {
  dateFNSKey: 'ar',
  translations: arTranslations,
}
