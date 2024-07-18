import type { DefaultTranslationsObject, Language } from '../types.js'

export const heTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'חשבון',
    accountOfCurrentUser: 'חשבון המשתמש הנוכחי',
    accountVerified: 'החשבון אומת בהצלחה.',
    alreadyActivated: 'כבר הופעל',
    alreadyLoggedIn: 'כבר מחובר',
    apiKey: 'מפתח API',
    authenticated: 'מאומת',
    backToLogin: 'חזרה להתחברות',
    beginCreateFirstUser: 'כדי להתחיל, יש ליצור את המשתמש הראשון שלך.',
    changePassword: 'שינוי סיסמה',
    checkYourEmailForPasswordReset: 'בדוק את תיבת הדוא"ל לאיתור קישור איפוס הסיסמה בצורה מאובטחת.',
    confirmGeneration: 'אישור יצירה',
    confirmPassword: 'אישור סיסמה',
    createFirstUser: 'יצירת משתמש ראשון',
    emailNotValid: 'הדוא"ל שסופק אינו תקין',
    emailOrUsername: 'דוא"ל או שם משתמש',
    emailSent: 'הודעת דואר נשלחה',
    emailVerified: 'דוא"ל אומת בהצלחה.',
    enableAPIKey: 'הפעלת מפתח API',
    failedToUnlock: 'ביטול נעילה נכשל',
    forceUnlock: 'אלץ ביטול נעילה',
    forgotPassword: 'שכחתי סיסמה',
    forgotPasswordEmailInstructions:
      'אנא הזן את כתובת הדוא"ל שלך למטה. תקבל הודעה עם הוראות לאיפוס הסיסמה שלך.',
    forgotPasswordQuestion: 'שכחת סיסמה?',
    forgotPasswordUsernameInstructions:
      'אנא הזן את שם המשתמש שלך למטה. הוראות על איך לאפס את הסיסמה שלך ישלחו לכתובת הדוא"ל המשויכת לשם המשתמש שלך.',
    generate: 'יצירה',
    generateNewAPIKey: 'יצירת מפתח API חדש',
    generatingNewAPIKeyWillInvalidate:
      'יצירת מפתח API חדש תבטל את המפתח הקודם. האם אתה בטוח שברצונך להמשיך?',
    lockUntil: 'נעילה עד',
    logBackIn: 'התחברות מחדש',
    logOut: 'התנתקות',
    loggedIn: 'כדי להתחבר עם משתמש אחר, יש להתנתק תחילה.',
    loggedInChangePassword:
      'כדי לשנות את הסיסמה שלך, יש לעבור ל<a href="{{serverURL}}">חשבון</a> שלך ולערוך את הסיסמה שם.',
    loggedOutInactivity: 'התנתקת בשל חוסר פעילות.',
    loggedOutSuccessfully: 'התנתקת בהצלחה.',
    loggingOut: 'מתנתק...',
    login: 'התחברות',
    loginAttempts: 'נסיונות התחברות',
    loginUser: 'התחברות משתמש',
    loginWithAnotherUser: 'כדי להתחבר עם משתמש אחר, עליך <0>להתנתק</0> תחילה.',
    logout: 'התנתקות',
    logoutSuccessful: 'התנתקות הצליחה.',
    logoutUser: 'התנתקות משתמש',
    newAPIKeyGenerated: 'נוצר מפתח API חדש.',
    newAccountCreated:
      'נוצר חשבון חדש עבורך כדי לגשת אל <a href="{{serverURL}}">{{serverURL}}</a>. אנא לחץ על הקישור הבא או הדבק את ה-URL בדפדפן שלך כדי לאמת את הדוא"ל שלך: <a href="{{verificationURL}}">{{verificationURL}}</a>.<br> לאחר אימות כתובת הדוא"ל, תוכל להתחבר בהצלחה.',
    newPassword: 'סיסמה חדשה',
    passed: 'אימות הצליח',
    passwordResetSuccessfully: 'איפוס הסיסמה הצליח.',
    resetPassword: 'איפוס סיסמה',
    resetPasswordExpiration: 'אפס את תוקף תפוגת הסיסמה',
    resetPasswordToken: 'אפס את טוקן הסיסמה',
    resetYourPassword: 'אפס את הסיסמה שלך',
    stayLoggedIn: 'הישאר מחובר',
    successfullyRegisteredFirstUser: 'נרשמת בהצלחה כמשתמש הראשון.',
    successfullyUnlocked: 'נעילה בוטלה בהצלחה.',
    tokenRefreshSuccessful: 'רענון הטוקן הצליח.',
    unableToVerify: 'לא ניתן לאמת',
    username: 'שם משתמש',
    usernameNotValid: 'שם המשתמש שסופק אינו חוקי',
    verified: 'אומת',
    verifiedSuccessfully: 'אומת בהצלחה',
    verify: 'אמת',
    verifyUser: 'אמת משתמש',
    verifyYourEmail: 'אמת את כתובת הדוא"ל שלך',
    youAreInactive:
      'לא היית פעיל לזמן קצר ובקרוב תתנתק אוטומטית כדי לשמור על האבטחה של חשבונך. האם ברצונך להישאר מחובר?',
    youAreReceivingResetPassword:
      'קיבלת הודעה זו מכיוון שאתה (או מישהו אחר) ביקשת לאפס את הסיסמה של החשבון שלך. אנא לחץ על הקישור הבא או הדבק אותו בשורת הכתובת בדפדפן שלך כדי להשלים את התהליך:',
    youDidNotRequestPassword: 'אם לא ביקשת זאת, אנא התעלם מההודעה והסיסמה שלך תישאר ללא שינוי.',
  },
  error: {
    accountAlreadyActivated: 'חשבון זה כבר הופעל.',
    autosaving: 'אירעה בעיה בזמן שמירה אוטומטית של מסמך זה.',
    correctInvalidFields: 'נא לתקן שדות לא תקינים.',
    deletingFile: 'אירעה שגיאה במחיקת הקובץ.',
    deletingTitle: 'אירעה שגיאה במחיקת {{title}}. נא בדוק את החיבור שלך ונסה שנית.',
    emailOrPasswordIncorrect: 'כתובת הדוא"ל או הסיסמה שסופקו אינם נכונים.',
    followingFieldsInvalid_one: 'השדה הבא אינו תקין:',
    followingFieldsInvalid_other: 'השדות הבאים אינם תקינים:',
    incorrectCollection: 'אוסף שגוי',
    invalidFileType: 'סוג קובץ לא תקין',
    invalidFileTypeValue: 'סוג קובץ לא תקין: {{value}}',
    loadingDocument: 'אירעה בעיה בטעינת המסמך עם מזהה {{id}}.',
    localesNotSaved_one: 'לא ניתן לשמור את השפה הבאה:',
    localesNotSaved_other: 'לא ניתן לשמור את השפות הבאות:',
    logoutFailed: 'התנתקות נכשלה.',
    missingEmail: 'חסרה כתובת דוא"ל.',
    missingIDOfDocument: 'חסר מזהה המסמך לעדכון.',
    missingIDOfVersion: 'חסר מזהה הגרסה.',
    missingRequiredData: 'חסרים נתונים חובה.',
    noFilesUploaded: 'לא הועלו קבצים.',
    noMatchedField: 'לא נמצא שדה מתאים עבור "{{label}}"',
    noUser: 'אין משתמש',
    notAllowedToAccessPage: 'אין לך הרשאה לגשת לדף זה.',
    notAllowedToPerformAction: 'אין לך הרשאה לבצע פעולה זו.',
    notFound: 'המשאב המבוקש לא נמצא.',
    previewing: 'אירעה בעיה בתצוגה מקדימה של מסמך זה.',
    problemUploadingFile: 'אירעה בעיה בזמן העלאת הקובץ.',
    tokenInvalidOrExpired: 'הטוקן אינו תקין או שפג תוקפו.',
    tokenNotProvided: 'טוקן לא סופק.',
    unPublishingDocument: 'אירעה בעיה בביטול הפרסום של מסמך זה.',
    unableToDeleteCount: 'לא ניתן למחוק {{count}} מתוך {{total}} {{label}}.',
    unableToUpdateCount: 'לא ניתן לעדכן {{count}} מתוך {{total}} {{label}}.',
    unauthorized: 'אין הרשאה, עליך להתחבר כדי לבצע בקשה זו.',
    unknown: 'אירעה שגיאה לא ידועה.',
    unspecific: 'אירעה שגיאה.',
    userEmailAlreadyRegistered: 'משתמש עם האימייל הנתון כבר רשום.',
    userLocked: 'המשתמש נעול עקב מספר נסיונות התחברות כושלים.',
    usernameAlreadyRegistered: 'משתמש עם שם המשתמש שניתן כבר רשום.',
    usernameOrPasswordIncorrect: 'שם המשתמש או הסיסמה שסופקו אינם נכונים.',
    valueMustBeUnique: 'הערך חייב להיות ייחודי',
    verificationTokenInvalid: 'טוקן אימות אינו תקין.',
  },
  fields: {
    addLabel: 'הוסף {{label}}',
    addLink: 'הוסף קישור',
    addNew: 'הוסף חדש',
    addNewLabel: 'הוסף {{label}} חדש',
    addRelationship: 'הוסף יחס',
    addUpload: 'הוסף העלאה',
    block: 'בלוק',
    blockType: 'סוג בלוק',
    blocks: 'בלוקים',
    chooseBetweenCustomTextOrDocument: 'בחר בין הזנת טקסט מותאם אישית או קישור למסמך אחר.',
    chooseDocumentToLink: 'בחר מסמך לקישור',
    chooseFromExisting: 'בחר מתוך הקיימים',
    chooseLabel: 'בחר {{label}}',
    collapseAll: 'כווץ הכל',
    customURL: 'כתובת URL מותאמת אישית',
    editLabelData: 'ערוך נתוני {{label}}',
    editLink: 'ערוך קישור',
    editRelationship: 'ערוך יחס',
    enterURL: 'הזן URL',
    internalLink: 'קישור פנימי',
    itemsAndMore: '{{items}} ועוד {{count}}',
    labelRelationship: '{{label}} יחס',
    latitude: 'קו רוחב',
    linkType: 'סוג קישור',
    linkedTo: 'מקושר ל<0>{{label}}</0>',
    longitude: 'קו אורך',
    newLabel: '{{label}} חדש',
    openInNewTab: 'פתח בכרטיסייה חדשה',
    passwordsDoNotMatch: 'הסיסמאות אינן תואמות.',
    relatedDocument: 'מסמך קשור',
    relationTo: 'יחס אל',
    removeRelationship: 'הסר יחס',
    removeUpload: 'הסר העלאה',
    saveChanges: 'שמור שינויים',
    searchForBlock: 'חפש בלוק',
    selectExistingLabel: 'בחר {{label}} קיים',
    selectFieldsToEdit: 'בחר שדות לעריכה',
    showAll: 'הצג הכל',
    swapRelationship: 'החלף יחס',
    swapUpload: 'החלף העלאה',
    textToDisplay: 'טקסט לתצוגה',
    toggleBlock: 'החלף בלוק',
    uploadNewLabel: 'העלאת {{label}} חדשה',
  },
  general: {
    aboutToDelete: 'אתה עומד למחוק את {{label}} <1>{{title}}</1>. האם אתה בטוח?',
    aboutToDeleteCount_many: 'אתה עומד למחוק {{count}} {{label}}',
    aboutToDeleteCount_one: 'אתה עומד למחוק {{label}} אחד',
    aboutToDeleteCount_other: 'אתה עומד למחוק {{count}} {{label}}',
    addBelow: 'הוסף מתחת',
    addFilter: 'הוסף מסנן',
    adminTheme: 'ערכת נושא ממשק הניהול',
    and: 'וגם',
    applyChanges: 'החל שינויים',
    ascending: 'בסדר עולה',
    automatic: 'אוטומטי',
    backToDashboard: 'חזרה ללוח המחוונים',
    cancel: 'ביטול',
    changesNotSaved: 'השינויים שלך לא נשמרו. אם תצא כעת, תאבד את השינויים שלך.',
    close: 'סגור',
    collapse: 'כווץ',
    collections: 'אוספים',
    columnToSort: 'עמודה למיון',
    columns: 'עמודות',
    confirm: 'אישור',
    confirmDeletion: 'אישור מחיקה',
    confirmDuplication: 'אישור שכפול',
    copied: 'הועתק',
    copy: 'העתק',
    create: 'יצירה',
    createNew: 'יצירת חדש',
    createNewLabel: 'יצירת {{label}} חדש',
    created: 'נוצר',
    createdAt: 'נוצר בתאריך',
    creating: 'יצירה',
    creatingNewLabel: 'יצירת {{label}} חדש',
    custom: 'מותאם אישית',
    dark: 'כהה',
    dashboard: 'לוח מחוונים',
    delete: 'מחיקה',
    deletedCountSuccessfully: 'נמחקו {{count}} {{label}} בהצלחה.',
    deletedSuccessfully: 'נמחק בהצלחה.',
    deleting: 'מוחק...',
    depth: 'עומק',
    descending: 'בסדר יורד',
    deselectAllRows: 'בטל בחירת כל השורות',
    document: 'מסמך',
    documents: 'מסמכים',
    duplicate: 'שכפול',
    duplicateWithoutSaving: 'שכפול ללא שמירת שינויים',
    edit: 'עריכה',
    editLabel: 'עריכת {{label}}',
    editing: 'עריכה',
    editingLabel_many: 'עריכת {{count}} {{label}}',
    editingLabel_one: 'עריכת {{label}} אחד',
    editingLabel_other: 'עריכת {{count}} {{label}}',
    email: 'דוא"ל',
    emailAddress: 'כתובת דוא"ל',
    enterAValue: 'הזן ערך',
    error: 'שגיאה',
    errors: 'שגיאות',
    fallbackToDefaultLocale: 'חזרה לשפת ברירת המחדל',
    false: 'False',
    filter: 'סינון',
    filterWhere: 'סנן {{label}} בהם',
    filters: 'מסננים',
    globals: 'גלובלים',
    language: 'שפה',
    lastModified: 'נערך לאחרונה',
    leaveAnyway: 'צא בכל זאת',
    leaveWithoutSaving: 'צא מבלי לשמור',
    light: 'בהיר',
    livePreview: 'תצוגה מקדימה חיה',
    loading: 'טוען',
    locale: 'שפה',
    locales: 'שפות',
    menu: 'תפריט',
    moveDown: 'הזז למטה',
    moveUp: 'הזז למעלה',
    newPassword: 'סיסמה חדשה',
    noFiltersSet: 'לא הוגדרו מסננים',
    noLabel: '<ללא {{label}}>',
    noOptions: 'אין אפשרויות',
    noResults: 'לא נמצאו {{label}}. אין עדיין {{label}}, או שאינם תואמים למסננים שנבחרו.',
    noValue: 'אין ערך',
    none: 'ללא',
    notFound: 'לא נמצא',
    nothingFound: 'לא נמצא כלום',
    of: 'מתוך',
    open: 'פתח',
    or: 'או',
    order: 'סדר',
    pageNotFound: 'הדף לא נמצא',
    password: 'סיסמה',
    payloadSettings: 'הגדרות מערכת Payload',
    perPage: '{{limit}} בכל עמוד',
    remove: 'הסר',
    reset: 'איפוס',
    row: 'שורה',
    rows: 'שורות',
    save: 'שמירה',
    saving: 'שומר...',
    searchBy: 'חיפוש לפי {{label}}',
    selectAll: 'בחר את כל {{count}} ה{{label}}',
    selectAllRows: 'בחר את כל השורות',
    selectValue: 'בחר ערך',
    selectedCount: '{{count}} {{label}} נבחרו',
    showAllLabel: 'הצג את כל ה{{label}}',
    sorryNotFound: 'מצטערים - אין תוצאות התואמות את הבקשה.',
    sort: 'מיין',
    sortByLabelDirection: 'מיין לפי {{label}} {{direction}}',
    stayOnThisPage: 'הישאר בדף זה',
    submissionSuccessful: 'נשלח בהצלחה.',
    submit: 'שלח',
    submitting: 'מגיש...',
    success: 'הצלחה',
    successfullyCreated: '{{label}} נוצר בהצלחה.',
    successfullyDuplicated: '{{label}} שוכפל בהצלחה.',
    thisLanguage: 'עברית',
    titleDeleted: '{{label}} "{{title}}" נמחק בהצלחה.',
    true: 'True',
    unauthorized: 'אין הרשאה',
    unsavedChangesDuplicate: 'יש לך שינויים שלא נשמרו. האם ברצונך להמשיך לשכפל?',
    untitled: 'ללא כותרת',
    updatedAt: 'עודכן בתאריך',
    updatedCountSuccessfully: 'עודכן {{count}} {{label}} בהצלחה.',
    updatedSuccessfully: 'עודכן בהצלחה.',
    updating: 'מעדכן',
    uploading: 'מעלה',
    user: 'משתמש',
    username: 'שם משתמש',
    users: 'משתמשים',
    value: 'ערך',
    welcome: 'ברוך הבא',
  },
  operators: {
    contains: 'מכיל',
    equals: 'שווה ל',
    exists: 'קיים',
    intersects: 'מצטלב',
    isGreaterThan: 'גדול מ',
    isGreaterThanOrEqualTo: 'גדול או שווה ל',
    isIn: 'נמצא ב',
    isLessThan: 'קטן מ',
    isLessThanOrEqualTo: 'קטן או שווה ל',
    isLike: 'דומה ל',
    isNotEqualTo: 'לא שווה ל',
    isNotIn: 'לא נמצא ב',
    near: 'קרוב ל',
    within: 'בתוך',
  },
  upload: {
    addImage: 'הוסף תמונה',
    crop: 'חתוך',
    cropToolDescription: 'גרור את הפינות של האזור שנבחר, צייר אזור חדש או התאם את הערכים למטה.',
    dragAndDrop: 'גרור ושחרר קובץ',
    dragAndDropHere: 'או גרור ושחרר קובץ לכאן',
    editImage: 'ערוך תמונה',
    fileName: 'שם קובץ',
    fileSize: 'גודל קובץ',
    focalPoint: 'נקודת מיקוד',
    focalPointDescription: 'גרור את נקודת המיקוד ישירות על התצוגה המקדימה או התאם את הערכים למטה.',
    height: 'גובה',
    lessInfo: 'פחות מידע',
    moreInfo: 'מידע נוסף',
    pasteURL: 'הדבק כתובת אתר',
    previewSizes: 'גדלי תצוגה מקדימה',
    selectCollectionToBrowse: 'בחר אוסף לצפייה',
    selectFile: 'בחר קובץ',
    setCropArea: 'הגדר אזור חיתוך',
    setFocalPoint: 'הגדר נקודת מיקוד',
    sizes: 'גדלים',
    sizesFor: 'גדלים עבור {{label}}',
    width: 'רוחב',
  },
  validation: {
    emailAddress: 'נא להזין כתובת דוא"ל תקנית.',
    enterNumber: 'נא להזין מספר תקני.',
    fieldHasNo: 'שדה זה אינו מכיל {{label}}',
    greaterThanMax: '{{value}} גדול מהערך המרבי המותר של {{label}} שהוא {{max}}.',
    invalidInput: 'שדה זה מכיל קלט לא תקני.',
    invalidSelection: 'שדה זה מכיל בחירה לא תקנית.',
    invalidSelections: 'שדה זה מכיל את הבחירות הבאות שאינן תקניות:',
    lessThanMin: '{{value}} קטן מהערך המינימלי המותר של {{label}} שהוא {{min}}.',
    limitReached: 'הגעת למגבלה, ניתן להוסיף רק {{max}} פריטים.',
    longerThanMin: 'ערך זה חייב להיות ארוך מאורך המינימום של {{minLength}} תווים.',
    notValidDate: '"{{value}}" אינו תאריך תקני.',
    required: 'שדה זה הוא שדה חובה.',
    requiresAtLeast: 'שדה זה דורש לפחות {{count}} {{label}}.',
    requiresNoMoreThan: 'שדה זה דורש לא יותר מ-{{count}} {{label}}.',
    requiresTwoNumbers: 'שדה זה דורש שני מספרים.',
    shorterThanMax: 'ערך זה חייב להיות קצר מ-{{maxLength}} תווים.',
    trueOrFalse: 'שדה זה יכול להיות רק true או false.',
    username: 'אנא הזן שם משתמש חוקי. יכול להכיל אותיות, מספרים, מקפים, נקודות וקווים תחתונים.',
    validUploadID: 'שדה זה אינו מזהה העלאה תקני.',
  },
  version: {
    type: 'סוג',
    aboutToPublishSelection: 'אתה עומד לפרסם את כל ה{{label}} שנבחרו. האם אתה בטוח?',
    aboutToRestore: 'אתה עומד לשחזר את מסמך {{label}} למצב שהיה בו בתאריך {{versionDate}}.',
    aboutToRestoreGlobal:
      'אתה עומד לשחזר את {{label}} הגלובלי למצב שהיה בו בתאריך {{versionDate}}.',
    aboutToRevertToPublished: 'אתה עומד להחזיר את השינויים במסמך הזה לגרסה שפורסמה. האם אתה בטוח?',
    aboutToUnpublish: 'אתה עומד לבטל את הפרסום של מסמך זה. האם אתה בטוח?',
    aboutToUnpublishSelection: 'אתה עומד לבטל את הפרסום של כל ה{{label}} שנבחרו. האם אתה בטוח?',
    autosave: 'שמירה אוטומטית',
    autosavedSuccessfully: 'נשמר בהצלחה.',
    autosavedVersion: 'גרסת שמירה אוטומטית',
    changed: 'שונה',
    compareVersion: 'השווה לגרסה:',
    confirmPublish: 'אישור פרסום',
    confirmRevertToSaved: 'אישור שחזור לגרסה שנשמרה',
    confirmUnpublish: 'אישור ביטול פרסום',
    confirmVersionRestoration: 'אישור שחזור גרסה',
    currentDocumentStatus: 'מסמך {{docStatus}} נוכחי',
    currentDraft: 'טיוטה נוכחית',
    currentPublishedVersion: 'הגרסה שפורסמה כעת',
    draft: 'טיוטה',
    draftSavedSuccessfully: 'טיוטה נשמרה בהצלחה.',
    lastSavedAgo: 'נשמר לאחרונה לפני {{distance}}',
    noFurtherVersionsFound: 'לא נמצאו עוד גרסאות',
    noRowsFound: 'לא נמצאו {{label}}',
    preview: 'תצוגה מקדימה',
    previouslyPublished: 'פורסם בעבר',
    problemRestoringVersion: 'הייתה בעיה בשחזור הגרסה הזו',
    publish: 'פרסם',
    publishChanges: 'פרסם שינויים',
    published: 'פורסם',
    publishing: 'מפרסם',
    restoreThisVersion: 'שחזר גרסה זו',
    restoredSuccessfully: 'שוחזר בהצלחה.',
    restoring: 'משחזר...',
    revertToPublished: 'שחזר לגרסה שפורסמה',
    reverting: 'משחזר...',
    saveDraft: 'שמור טיוטה',
    selectLocales: 'בחר שפות לתצוגה',
    selectVersionToCompare: 'בחר גרסה להשוואה',
    showLocales: 'הצג שפות:',
    showingVersionsFor: 'מציג גרסאות עבור:',
    status: 'סטטוס',
    unpublish: 'בטל פרסום',
    unpublishing: 'מבטל פרסום...',
    version: 'גרסה',
    versionCount_many: '{{count}} גרסאות נמצאו',
    versionCount_none: 'לא נמצאו גרסאות',
    versionCount_one: 'נמצאה גרסה אחת',
    versionCount_other: '{{count}} גרסאות נמצאו',
    versionCreatedOn: '{{version}} נוצר בתאריך:',
    versionID: 'מזהה גרסה',
    versions: 'גרסאות',
    viewingVersion: 'צופה בגרסה עבור {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'צופה בגרסה עבור {{entityLabel}} הגלובלי',
    viewingVersions: 'צופה בגרסאות עבור {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'צופה בגרסאות עבור {{entityLabel}} הגלובלי',
  },
}

export const he: Language = {
  dateFNSKey: 'he',
  translations: heTranslations,
}
