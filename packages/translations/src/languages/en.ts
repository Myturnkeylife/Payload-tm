import type { Language } from '../types.js'

export const enTranslations = {
  authentication: {
    account: 'Account',
    accountOfCurrentUser: 'Account of current user',
    accountVerified: 'Account verified successfully.',
    alreadyActivated: 'Already Activated',
    alreadyLoggedIn: 'Already logged in',
    apiKey: 'API Key',
    authenticated: 'Authenticated',
    backToLogin: 'Back to login',
    beginCreateFirstUser: 'To begin, create your first user.',
    changePassword: 'Change Password',
    checkYourEmailForPasswordReset:
      'Check your email for a link that will allow you to securely reset your password.',
    confirmGeneration: 'Confirm Generation',
    confirmPassword: 'Confirm Password',
    createFirstUser: 'Create first user',
    emailNotValid: 'The email provided is not valid',
    emailOrUsername: 'Email or Username',
    emailSent: 'Email Sent',
    emailVerified: 'Email verified successfully.',
    enableAPIKey: 'Enable API Key',
    failedToUnlock: 'Failed to unlock',
    forceUnlock: 'Force Unlock',
    forgotPassword: 'Forgot Password',
    forgotPasswordEmailInstructions:
      'Please enter your email below. You will receive an email message with instructions on how to reset your password.',
    forgotPasswordUsernameInstructions:
      'Please enter your username below. Instructions on how to reset your password will be sent to email address associated with your username.',
    usernameNotValid: 'The username provided is not valid',

    forgotPasswordQuestion: 'Forgot password?',
    generate: 'Generate',
    generateNewAPIKey: 'Generate new API key',
    generatingNewAPIKeyWillInvalidate:
      'Generating a new API key will <1>invalidate</1> the previous key. Are you sure you wish to continue?',
    lockUntil: 'Lock Until',
    logBackIn: 'Log back in',
    loggedIn: 'To log in with another user, you should <0>log out</0> first.',
    loggedInChangePassword:
      'To change your password, go to your <0>account</0> and edit your password there.',
    loggedOutInactivity: 'You have been logged out due to inactivity.',
    loggedOutSuccessfully: 'You have been logged out successfully.',
    loggingOut: 'Logging out...',
    login: 'Login',
    loginAttempts: 'Login Attempts',
    loginUser: 'Login user',
    loginWithAnotherUser: 'To log in with another user, you should <0>log out</0> first.',
    logOut: 'Log out',
    logout: 'Logout',
    logoutSuccessful: 'Logout successful.',
    logoutUser: 'Logout user',
    newAccountCreated:
      'A new account has just been created for you to access <a href="{{serverURL}}">{{serverURL}}</a> Please click on the following link or paste the URL below into your browser to verify your email: <a href="{{verificationURL}}">{{verificationURL}}</a><br> After verifying your email, you will be able to log in successfully.',
    newAPIKeyGenerated: 'New API Key Generated.',
    newPassword: 'New Password',
    passed: 'Authentication Passed',
    passwordResetSuccessfully: 'Password reset successfully.',
    resetPassword: 'Reset Password',
    resetPasswordExpiration: 'Reset Password Expiration',
    resetPasswordToken: 'Reset Password Token',
    resetYourPassword: 'Reset Your Password',
    stayLoggedIn: 'Stay logged in',
    successfullyRegisteredFirstUser: 'Successfully registered first user.',
    successfullyUnlocked: 'Successfully unlocked',
    tokenRefreshSuccessful: 'Token refresh successful.',
    unableToVerify: 'Unable to Verify',
    username: 'Username',
    verified: 'Verified',
    verifiedSuccessfully: 'Verified Successfully',
    verify: 'Verify',
    verifyUser: 'Verify User',
    verifyYourEmail: 'Verify your email',
    youAreInactive:
      "You haven't been active in a little while and will shortly be automatically logged out for your own security. Would you like to stay logged in?",
    youAreReceivingResetPassword:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:',
    youDidNotRequestPassword:
      'If you did not request this, please ignore this email and your password will remain unchanged.',
  },
  error: {
    accountAlreadyActivated: 'This account has already been activated.',
    autosaving: 'There was a problem while autosaving this document.',
    correctInvalidFields: 'Please correct invalid fields.',
    deletingFile: 'There was an error deleting file.',
    deletingTitle:
      'There was an error while deleting {{title}}. Please check your connection and try again.',
    emailOrPasswordIncorrect: 'The email or password provided is incorrect.',
    followingFieldsInvalid_one: 'The following field is invalid:',
    followingFieldsInvalid_other: 'The following fields are invalid:',
    incorrectCollection: 'Incorrect Collection',
    invalidFileType: 'Invalid file type',
    invalidFileTypeValue: 'Invalid file type: {{value}}',
    loadingDocument: 'There was a problem loading the document with ID of {{id}}.',
    localesNotSaved_one: 'The following locale could not be saved:',
    localesNotSaved_other: 'The following locales could not be saved:',
    logoutFailed: 'Logout failed.',
    missingEmail: 'Missing email.',
    missingIDOfDocument: 'Missing ID of document to update.',
    missingIDOfVersion: 'Missing ID of version.',
    missingRequiredData: 'Missing required data.',
    noFilesUploaded: 'No files were uploaded.',
    noMatchedField: 'No matched field found for "{{label}}"',
    notAllowedToAccessPage: 'You are not allowed to access this page.',
    notAllowedToPerformAction: 'You are not allowed to perform this action.',
    notFound: 'The requested resource was not found.',
    noUser: 'No User',
    previewing: 'There was a problem previewing this document.',
    problemUploadingFile: 'There was a problem while uploading the file.',
    tokenInvalidOrExpired: 'Token is either invalid or has expired.',
    tokenNotProvided: 'Token not provided.',
    unableToDeleteCount: 'Unable to delete {{count}} out of {{total}} {{label}}.',
    unableToUpdateCount: 'Unable to update {{count}} out of {{total}} {{label}}.',
    unauthorized: 'Unauthorized, you must be logged in to make this request.',
    unknown: 'An unknown error has occurred.',
    unPublishingDocument: 'There was a problem while un-publishing this document.',
    unspecific: 'An error has occurred.',
    userEmailAlreadyRegistered: 'A user with the given email is already registered.',
    userLocked: 'This user is locked due to having too many failed login attempts.',
    usernameAlreadyRegistered: 'A user with the given username is already registered.',
    usernameOrPasswordIncorrect: 'The username or password provided is incorrect.',
    valueMustBeUnique: 'Value must be unique',
    verificationTokenInvalid: 'Verification token is invalid.',
  },
  fields: {
    addLabel: 'Add {{label}}',
    addLink: 'Add Link',
    addNew: 'Add new',
    addNewLabel: 'Add new {{label}}',
    addRelationship: 'Add Relationship',
    addUpload: 'Add Upload',
    block: 'block',
    blocks: 'blocks',
    blockType: 'Block Type',
    chooseBetweenCustomTextOrDocument:
      'Choose between entering a custom text URL or linking to another document.',
    chooseDocumentToLink: 'Choose a document to link to',
    chooseFromExisting: 'Choose from existing',
    chooseLabel: 'Choose {{label}}',
    collapseAll: 'Collapse All',
    customURL: 'Custom URL',
    editLabelData: 'Edit {{label}} data',
    editLink: 'Edit Link',
    editRelationship: 'Edit Relationship',
    enterURL: 'Enter a URL',
    internalLink: 'Internal Link',
    itemsAndMore: '{{items}} and {{count}} more',
    labelRelationship: '{{label}} Relationship',
    latitude: 'Latitude',
    linkedTo: 'Linked to <0>{{label}}</0>',
    linkType: 'Link Type',
    longitude: 'Longitude',
    newLabel: 'New {{label}}',
    openInNewTab: 'Open in new tab',
    passwordsDoNotMatch: 'Passwords do not match.',
    relatedDocument: 'Related Document',
    relationTo: 'Relation To',
    removeRelationship: 'Remove Relationship',
    removeUpload: 'Remove Upload',
    saveChanges: 'Save changes',
    searchForBlock: 'Search for a block',
    selectExistingLabel: 'Select existing {{label}}',
    selectFieldsToEdit: 'Select fields to edit',
    showAll: 'Show All',
    swapRelationship: 'Swap Relationship',
    swapUpload: 'Swap Upload',
    textToDisplay: 'Text to display',
    toggleBlock: 'Toggle block',
    uploadNewLabel: 'Upload new {{label}}',
  },
  general: {
    aboutToDelete: 'You are about to delete the {{label}} <1>{{title}}</1>. Are you sure?',
    aboutToDeleteCount_many: 'You are about to delete {{count}} {{label}}',
    aboutToDeleteCount_one: 'You are about to delete {{count}} {{label}}',
    aboutToDeleteCount_other: 'You are about to delete {{count}} {{label}}',
    addBelow: 'Add Below',
    addFilter: 'Add Filter',
    adminTheme: 'Admin Theme',
    and: 'And',
    anotherUserTakenOver: 'Another user has taken over editing this document.',
    applyChanges: 'Apply Changes',
    ascending: 'Ascending',
    automatic: 'Automatic',
    backToDashboard: 'Back to Dashboard',
    cancel: 'Cancel',
    changesNotSaved:
      'Your changes have not been saved. If you leave now, you will lose your changes.',
    clearAll: 'Clear All',
    close: 'Close',
    collapse: 'Collapse',
    collections: 'Collections',
    columns: 'Columns',
    columnToSort: 'Column to Sort',
    confirm: 'Confirm',
    confirmDeletion: 'Confirm deletion',
    confirmDuplication: 'Confirm duplication',
    copied: 'Copied',
    copy: 'Copy',
    create: 'Create',
    created: 'Created',
    createdAt: 'Created At',
    createNew: 'Create New',
    createNewLabel: 'Create new {{label}}',
    creating: 'Creating',
    creatingNewLabel: 'Creating new {{label}}',
    currentlyEditing:
      'is currently editing this document. If you take over, they will be blocked from continuing to edit, and may also lose unsaved changes.',
    custom: 'Custom',
    dark: 'Dark',
    dashboard: 'Dashboard',
    delete: 'Delete',
    deletedCountSuccessfully: 'Deleted {{count}} {{label}} successfully.',
    deletedSuccessfully: 'Deleted successfully.',
    deleting: 'Deleting...',
    depth: 'Depth',
    descending: 'Descending',
    deselectAllRows: 'Deselect all rows',
    document: 'Document',
    documentLocked: 'Document locked',
    documents: 'Documents',
    duplicate: 'Duplicate',
    duplicateWithoutSaving: 'Duplicate without saving changes',
    edit: 'Edit',
    editedSince: 'Edited since',
    editing: 'Editing',
    editingLabel_many: 'Editing {{count}} {{label}}',
    editingLabel_one: 'Editing {{count}} {{label}}',
    editingLabel_other: 'Editing {{count}} {{label}}',
    editingTakenOver: 'Editing taken over',
    editLabel: 'Edit {{label}}',
    email: 'Email',
    emailAddress: 'Email Address',
    enterAValue: 'Enter a value',
    error: 'Error',
    errors: 'Errors',
    fallbackToDefaultLocale: 'Fallback to default locale',
    false: 'False',
    filter: 'Filter',
    filters: 'Filters',
    filterWhere: 'Filter {{label}} where',
    globals: 'Globals',
    goBack: 'Go back',
    isEditing: 'is editing',
    language: 'Language',
    lastModified: 'Last Modified',
    leaveAnyway: 'Leave anyway',
    leaveWithoutSaving: 'Leave without saving',
    light: 'Light',
    livePreview: 'Live Preview',
    loading: 'Loading',
    locale: 'Locale',
    locales: 'Locales',
    menu: 'Menu',
    moveDown: 'Move Down',
    moveUp: 'Move Up',
    newPassword: 'New Password',
    next: 'Next',
    noFiltersSet: 'No filters set',
    noLabel: '<No {{label}}>',
    none: 'None',
    noOptions: 'No options',
    noResults:
      "No {{label}} found. Either no {{label}} exist yet or none match the filters you've specified above.",
    notFound: 'Not Found',
    nothingFound: 'Nothing found',
    noValue: 'No value',
    of: 'of',
    only: 'Only',
    open: 'Open',
    or: 'Or',
    order: 'Order',
    pageNotFound: 'Page not found',
    password: 'Password',
    payloadSettings: 'Payload Settings',
    perPage: 'Per Page: {{limit}}',
    previous: 'Previous',
    remove: 'Remove',
    reset: 'Reset',
    row: 'Row',
    rows: 'Rows',
    save: 'Save',
    saving: 'Saving...',
    searchBy: 'Search by {{label}}',
    selectAll: 'Select all {{count}} {{label}}',
    selectAllRows: 'Select all rows',
    selectedCount: '{{count}} {{label}} selected',
    selectValue: 'Select a value',
    showAllLabel: 'Show all {{label}}',
    sorryNotFound: 'Sorry—there is nothing to correspond with your request.',
    sort: 'Sort',
    sortByLabelDirection: 'Sort by {{label}} {{direction}}',
    stayOnThisPage: 'Stay on this page',
    submissionSuccessful: 'Submission Successful.',
    submit: 'Submit',
    submitting: 'Submitting...',
    success: 'Success',
    successfullyCreated: '{{label}} successfully created.',
    successfullyDuplicated: '{{label}} successfully duplicated.',
    takeOver: 'Take over',
    thisLanguage: 'English',
    titleDeleted: '{{label}} "{{title}}" successfully deleted.',
    true: 'True',
    unauthorized: 'Unauthorized',
    unsavedChangesDuplicate: 'You have unsaved changes. Would you like to continue to duplicate?',
    untitled: 'Untitled',
    updatedAt: 'Updated At',
    updatedCountSuccessfully: 'Updated {{count}} {{label}} successfully.',
    updatedSuccessfully: 'Updated successfully.',
    updating: 'Updating',
    uploading: 'Uploading',
    user: 'User',
    username: 'Username',
    users: 'Users',
    value: 'Value',
    viewReadOnly: 'View read-only',
    welcome: 'Welcome',
  },
  operators: {
    contains: 'contains',
    equals: 'equals',
    exists: 'exists',
    intersects: 'intersects',
    isGreaterThan: 'is greater than',
    isGreaterThanOrEqualTo: 'is greater than or equal to',
    isIn: 'is in',
    isLessThan: 'is less than',
    isLessThanOrEqualTo: 'is less than or equal to',
    isLike: 'is like',
    isNotEqualTo: 'is not equal to',
    isNotIn: 'is not in',
    near: 'near',
    within: 'within',
  },
  upload: {
    addFile: 'Add File',
    addFiles: 'Add Files',
    bulkUpload: 'Bulk Upload',
    crop: 'Crop',
    cropToolDescription:
      'Drag the corners of the selected area, draw a new area or adjust the values below.',
    dragAndDrop: 'Drag and drop a file',
    dragAndDropHere: 'or drag and drop a file here',
    editImage: 'Edit Image',
    fileName: 'File Name',
    fileSize: 'File Size',
    filesToUpload: 'Files to Upload',
    fileToUpload: 'File to Upload',
    focalPoint: 'Focal Point',
    focalPointDescription:
      'Drag the focal point directly on the preview or adjust the values below.',
    height: 'Height',
    lessInfo: 'Less info',
    moreInfo: 'More info',
    pasteURL: 'Paste URL',
    previewSizes: 'Preview Sizes',
    selectCollectionToBrowse: 'Select a Collection to Browse',
    selectFile: 'Select a file',
    setCropArea: 'Set crop area',
    setFocalPoint: 'Set focal point',
    sizes: 'Sizes',
    sizesFor: 'Sizes for {{label}}',
    width: 'Width',
  },
  validation: {
    emailAddress: 'Please enter a valid email address.',
    enterNumber: 'Please enter a valid number.',
    fieldHasNo: 'This field has no {{label}}',
    greaterThanMax: '{{value}} is greater than the max allowed {{label}} of {{max}}.',
    invalidInput: 'This field has an invalid input.',
    invalidSelection: 'This field has an invalid selection.',
    invalidSelections: 'This field has the following invalid selections:',
    lessThanMin: '{{value}} is less than the min allowed {{label}} of {{min}}.',
    limitReached: 'Limit reached, only {{max}} items can be added.',
    longerThanMin: 'This value must be longer than the minimum length of {{minLength}} characters.',
    notValidDate: '"{{value}}" is not a valid date.',
    required: 'This field is required.',
    requiresAtLeast: 'This field requires at least {{count}} {{label}}.',
    requiresNoMoreThan: 'This field requires no more than {{count}} {{label}}.',
    requiresTwoNumbers: 'This field requires two numbers.',
    shorterThanMax: 'This value must be shorter than the max length of {{maxLength}} characters.',
    trueOrFalse: 'This field can only be equal to true or false.',
    username:
      'Please enter a valid username. Can contain letters, numbers, hyphens, periods and underscores.',
    validUploadID: 'This field is not a valid upload ID.',
  },
  version: {
    type: 'Type',
    aboutToPublishSelection:
      'You are about to publish all {{label}} in the selection. Are you sure?',
    aboutToRestore:
      'You are about to restore this {{label}} document to the state that it was in on {{versionDate}}.',
    aboutToRestoreGlobal:
      'You are about to restore the global {{label}} to the state that it was in on {{versionDate}}.',
    aboutToRevertToPublished:
      "You are about to revert this document's changes to its published state. Are you sure?",
    aboutToUnpublish: 'You are about to unpublish this document. Are you sure?',
    aboutToUnpublishSelection:
      'You are about to unpublish all {{label}} in the selection. Are you sure?',
    autosave: 'Autosave',
    autosavedSuccessfully: 'Autosaved successfully.',
    autosavedVersion: 'Autosaved version',
    changed: 'Changed',
    compareVersion: 'Compare version against:',
    confirmPublish: 'Confirm publish',
    confirmRevertToSaved: 'Confirm revert to saved',
    confirmUnpublish: 'Confirm unpublish',
    confirmVersionRestoration: 'Confirm version Restoration',
    currentDocumentStatus: 'Current {{docStatus}} document',
    currentDraft: 'Current Draft',
    currentPublishedVersion: 'Current Published Version',
    draft: 'Draft',
    draftSavedSuccessfully: 'Draft saved successfully.',
    lastSavedAgo: 'Last saved {{distance}} ago',
    noFurtherVersionsFound: 'No further versions found',
    noRowsFound: 'No {{label}} found',
    noRowsSelected: 'No {{label}} selected',
    preview: 'Preview',
    previouslyPublished: 'Previously Published',
    problemRestoringVersion: 'There was a problem restoring this version',
    publish: 'Publish',
    publishChanges: 'Publish changes',
    published: 'Published',
    publishIn: 'Publish in {{locale}}',
    publishing: 'Publishing',
    restoreAsDraft: 'Restore as draft',
    restoredSuccessfully: 'Restored Successfully.',
    restoreThisVersion: 'Restore this version',
    restoring: 'Restoring...',
    reverting: 'Reverting...',
    revertToPublished: 'Revert to published',
    saveDraft: 'Save Draft',
    selectLocales: 'Select locales to display',
    selectVersionToCompare: 'Select a version to compare',
    showingVersionsFor: 'Showing versions for:',
    showLocales: 'Show locales:',
    status: 'Status',
    unpublish: 'Unpublish',
    unpublishing: 'Unpublishing...',
    version: 'Version',
    versionCount_many: '{{count}} versions found',
    versionCount_none: 'No versions found',
    versionCount_one: '{{count}} version found',
    versionCount_other: '{{count}} versions found',
    versionCreatedOn: '{{version}} created on:',
    versionID: 'Version ID',
    versions: 'Versions',
    viewingVersion: 'Viewing version for the {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Viewing version for the global {{entityLabel}}',
    viewingVersions: 'Viewing versions for the {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Viewing versions for the global {{entityLabel}}',
  },
}

export const en: Language = {
  dateFNSKey: 'en-US',
  translations: enTranslations,
}
