import type { DefaultTranslationsObject, Language } from '../types.js'

export const zhTranslations: DefaultTranslationsObject = {
  authentication: {
    account: '帐户',
    accountOfCurrentUser: '当前用户的帐户',
    accountVerified: '帐户验证成功。',
    alreadyActivated: '已经激活了',
    alreadyLoggedIn: '已经登入了',
    apiKey: 'API密钥',
    authenticated: '已验证',
    backToLogin: '回到登录页面',
    beginCreateFirstUser: '首先，请创建您的第一个用户。',
    changePassword: '更改密码',
    checkYourEmailForPasswordReset: '请查看您的电子邮件，以取得安全重置密码的链接。',
    confirmGeneration: '确认生成',
    confirmPassword: '确认密码',
    createFirstUser: '创建第一个用户',
    emailNotValid: '所提供的电子邮件时无效的',
    emailOrUsername: '电子邮件或用户名',
    emailSent: '电子邮件已发送',
    emailVerified: '电子邮件验证成功。',
    enableAPIKey: '启用API密钥',
    failedToUnlock: '解锁失败',
    forceUnlock: '强制解锁',
    forgotPassword: '忘记密码',
    forgotPasswordEmailInstructions:
      '请在下方输入您的电子邮件。您将会收到一封有关如何重置密码说明的电子邮件。',
    forgotPasswordQuestion: '忘记密码？',
    forgotPasswordUsernameInstructions:
      '请在下方输入您的用户名。密码重置的说明将发送到与您的用户名相关联的电子邮箱。',
    generate: '生成',
    generateNewAPIKey: '生成新的API密钥',
    generatingNewAPIKeyWillInvalidate: '生成新的API密钥将使之前的密钥<1>失效</1>。您确定要继续吗？',
    lockUntil: '锁定至',
    logBackIn: '重新登入',
    loggedIn: '要使用另一个用户登录前，您需要先<0>登出</0>。',
    loggedInChangePassword: '要更改您的密码，请到您的<0>帐户</0>页面并在那里编辑您的密码。',
    loggedOutInactivity: '您由于不活跃而被登出了。',
    loggedOutSuccessfully: '您已成功登出。',
    loggingOut: '正在登出...',
    login: '登录',
    loginAttempts: '登录次数',
    loginUser: '登录用户',
    loginWithAnotherUser: '要使用另一个用户登录前，您需要先<0>登出</0>。',
    logOut: '登出',
    logout: '登出',
    logoutSuccessful: '成功注销。',
    logoutUser: '登出用户',
    newAccountCreated:
      '刚刚为您创建了一个可以访问 <a href="{{serverURL}}">{{serverURL}}</a> 的新帐户 请点击以下链接或在浏览器中粘贴以下网址，以验证您的电子邮件: <a href="{{verificationURL}}">{{verificationURL}}</a><br> 验证您的电子邮件后，您将能够成功登录。',
    newAPIKeyGenerated: '新的API密钥已经生成。',
    newPassword: '新的密码',
    passed: '身份验证通过',
    passwordResetSuccessfully: '密码重置成功。',
    resetPassword: '重置密码',
    resetPasswordExpiration: '重置密码的有效期',
    resetPasswordToken: '重置密码令牌',
    resetYourPassword: '重置您的密码',
    stayLoggedIn: '保持登录状态',
    successfullyRegisteredFirstUser: '成功注册了第一个用户。',
    successfullyUnlocked: '已成功解锁',
    tokenRefreshSuccessful: '令牌刷新成功。',
    unableToVerify: '无法验证',
    username: '用户名',
    usernameNotValid: '提供的用户名无效',
    verified: '已验证',
    verifiedSuccessfully: '成功验证',
    verify: '验证',
    verifyUser: '验证用户',
    verifyYourEmail: '验证您的电子邮件',
    youAreInactive:
      '您已经有一段时间没有活动了，为了您的安全，很快就会自动登出。您想保持登录状态吗？',
    youAreReceivingResetPassword:
      '您收到此邮件是因为您（或其他人）已请求重置您帐户的密码。请点击以下链接，或将其粘贴到您的浏览器中以完成该过程：',
    youDidNotRequestPassword: '如果您没有要求这样做，请忽略这封邮件，您的密码将保持不变。',
  },
  error: {
    accountAlreadyActivated: '该帐户已被激活。',
    autosaving: '自动保存该文件时出现了问题。',
    correctInvalidFields: '请更正无效字段。',
    deletingFile: '删除文件时出现了错误。',
    deletingTitle: '删除{{title}}时出现了错误。请检查您的连接并重试。',
    emailOrPasswordIncorrect: '提供的电子邮件或密码不正确。',
    followingFieldsInvalid_one: '下面的字段是无效的：',
    followingFieldsInvalid_other: '以下字段是无效的：',
    incorrectCollection: '不正确的集合',
    invalidFileType: '无效的文件类型',
    invalidFileTypeValue: '无效的文件类型： {{value}}',
    loadingDocument: '加载ID为{{id}}的文件时出现了问题。',
    localesNotSaved_one: '无法保存以下区域设置：',
    localesNotSaved_other: '无法保存以下区域设置：',
    logoutFailed: '注销失败。',
    missingEmail: '缺少电子邮件。',
    missingIDOfDocument: '缺少需要更新的文档的ID。',
    missingIDOfVersion: '缺少版本的ID。',
    missingRequiredData: '缺少必要的数据。',
    noFilesUploaded: '没有上传文件。',
    noMatchedField: '找不到与"{{label}}"匹配的字段',
    notAllowedToAccessPage: '您无权访问此页面。',
    notAllowedToPerformAction: '您不被允许执行此操作。',
    notFound: '没有找到请求的资源。',
    noUser: '没有该用户',
    previewing: '预览文件时出现了问题。',
    problemUploadingFile: '上传文件时出现了问题。',
    tokenInvalidOrExpired: '令牌无效或已过期。',
    tokenNotProvided: '未提供令牌。',
    unableToDeleteCount: '无法从 {{total}} {{label}} 中删除 {{count}}。',
    unableToUpdateCount: '无法更新 {{count}} 个，共 {{total}} 个 {{label}}。',
    unauthorized: '未经授权，您必须登录才能提出这个请求。',
    unknown: '发生了一个未知的错误。',
    unPublishingDocument: '取消发布此文件时出现了问题。',
    unspecific: '发生了一个错误。',
    userEmailAlreadyRegistered: '给定电子邮件的用户已经注册。',
    userLocked: '该用户由于有太多次失败的登录尝试而被锁定。',
    usernameAlreadyRegistered: '已有用户使用了该用户名进行注册。',
    usernameOrPasswordIncorrect: '提供的用户名或密码不正确。',
    valueMustBeUnique: '值必须是唯一的',
    verificationTokenInvalid: '验证令牌无效。',
  },
  fields: {
    addLabel: '添加{{label}}',
    addLink: '添加链接',
    addNew: '添加新的',
    addNewLabel: '添加新的{{label}}',
    addRelationship: '添加关系',
    addUpload: '添加上传',
    block: '区块',
    blocks: '区块',
    blockType: '区块类型',
    chooseBetweenCustomTextOrDocument: '选择输入一个自定义的文本URL或链接到另一个文档。',
    chooseDocumentToLink: '选择一个要链接的文档',
    chooseFromExisting: '从现有中选择',
    chooseLabel: '选择{{label}}',
    collapseAll: '全部折叠',
    customURL: '自定义URL',
    editLabelData: '编辑{{label}}数据',
    editLink: '编辑链接',
    editRelationship: '编辑关系',
    enterURL: '输入一个URL',
    internalLink: '内部链接',
    itemsAndMore: '{{items}}和{{count}}更多',
    labelRelationship: '{{label}}关系',
    latitude: '纬度',
    linkedTo: '链接到<0>{{label}}</0>',
    linkType: '链接类型',
    longitude: '经度',
    newLabel: '新的{{label}}',
    openInNewTab: '在新标签中打开',
    passwordsDoNotMatch: '密码不匹配。',
    relatedDocument: '相关文件',
    relationTo: '关系到',
    removeRelationship: '移除关系',
    removeUpload: '移除上传',
    saveChanges: '保存更改',
    searchForBlock: '搜索一个区块',
    selectExistingLabel: '选择现有的{{label}}',
    selectFieldsToEdit: '选择要编辑的字段',
    showAll: '显示全部',
    swapRelationship: '交换关系',
    swapUpload: '交换上传',
    textToDisplay: '要显示的文本',
    toggleBlock: '切换块',
    uploadNewLabel: '上传新的{{label}}',
  },
  general: {
    aboutToDelete: '您即将删除{{label}} <1>{{title}}</1>。您确定要继续吗？',
    aboutToDeleteCount_many: '您即将删除 {{count}} {{label}}',
    aboutToDeleteCount_one: '您即将删除 {{count}} {{label}}',
    aboutToDeleteCount_other: '您即将删除 {{count}} {{label}}',
    addBelow: '添加到下面',
    addFilter: '添加过滤器',
    adminTheme: '管理页面主题',
    and: '和',
    applyChanges: '应用更改',
    ascending: '升序',
    automatic: '自动',
    backToDashboard: '返回到仪表板',
    cancel: '取消',
    changesNotSaved: '您的更改尚未保存。您确定要离开吗？',
    clearAll: undefined,
    close: '关闭',
    collapse: '折叠',
    collections: '集合',
    columns: '列',
    columnToSort: '要排序的列',
    confirm: '确认',
    confirmDeletion: '确认删除',
    confirmDuplication: '确认重复',
    copied: '已复制',
    copy: '复制',
    create: '创建',
    created: '已创建',
    createdAt: '创建于',
    createNew: '创建新的',
    createNewLabel: '创建新的{{label}}',
    creating: '创建中',
    creatingNewLabel: '正在创建新的{{label}}',
    custom: '定制',
    dark: '深色',
    dashboard: '仪表板',
    delete: '删除',
    deletedCountSuccessfully: '已成功删除 {{count}} {{label}}。',
    deletedSuccessfully: '已成功删除。',
    deleting: '删除中...',
    depth: '深度',
    descending: '降序',
    deselectAllRows: '取消选择所有行',
    document: '文件',
    documents: '文件',
    duplicate: '重复',
    duplicateWithoutSaving: '重复而不保存更改。',
    edit: '编辑',
    editing: '编辑中',
    editingLabel_many: '编辑 {{count}} {{label}}',
    editingLabel_one: '编辑 {{count}} {{label}}',
    editingLabel_other: '编辑 {{count}} {{label}}',
    editLabel: '编辑{{label}}',
    email: '电子邮件',
    emailAddress: '电子邮件地址',
    enterAValue: '输入一个值',
    error: '错误',
    errors: '错误',
    fallbackToDefaultLocale: '回退到默认语言环境',
    false: '假的',
    filter: '过滤器',
    filters: '过滤器',
    filterWhere: '过滤{{label}}',
    globals: '全局',
    language: '语言',
    lastModified: '最后修改',
    leaveAnyway: '无论如何都要离开',
    leaveWithoutSaving: '离开而不保存',
    light: '亮色',
    livePreview: '预览',
    loading: '加载中...',
    locale: '语言环境',
    locales: '语言环境',
    menu: '菜单',
    moveDown: '向下移动',
    moveUp: '向上移动',
    newPassword: '新密码',
    next: '下一个',
    noFiltersSet: '没有设置过滤器',
    noLabel: '<没有{{label}}>',
    none: '无',
    noOptions: '没有选项',
    noResults: '没有找到{{label}}。{{label}}并不存在或没有符合您上面所指定的过滤器。',
    notFound: '未找到',
    nothingFound: '没有找到任何东西',
    noValue: '没有值',
    of: '的',
    open: '打开',
    or: '或',
    order: '排序',
    pageNotFound: '未找到页面',
    password: '密码',
    payloadSettings: 'Payload设置',
    perPage: '每一页: {{limit}}',
    previous: '前一个',
    remove: '移除',
    reset: '重置',
    row: '行',
    rows: '行',
    save: '保存',
    saving: '保存中...',
    searchBy: '搜索{{label}}',
    selectAll: '选择所有 {{count}} {{label}}',
    selectAllRows: '选择所有行',
    selectedCount: '已选择 {{count}} {{label}}',
    selectValue: '选择一个值',
    showAllLabel: '显示所有{{label}}',
    sorryNotFound: '对不起，没有与您的请求相对应的东西。',
    sort: '排序',
    sortByLabelDirection: '按{{label}} {{direction}}排序',
    stayOnThisPage: '停留在此页面',
    submissionSuccessful: '提交成功。',
    submit: '提交',
    submitting: '提交中...',
    success: '成功',
    successfullyCreated: '成功创建{{label}}',
    successfullyDuplicated: '成功复制{{label}}',
    thisLanguage: '中文 (简体)',
    titleDeleted: '{{label}} "{{title}}"已被成功删除。',
    true: '真实',
    unauthorized: '未经授权',
    unsavedChangesDuplicate: '您有未保存的修改。您确定要继续重复吗？',
    untitled: '无标题',
    updatedAt: '更新于',
    updatedCountSuccessfully: '已成功更新 {{count}} {{label}}。',
    updatedSuccessfully: '更新成功。',
    updating: '更新中',
    uploading: '上传中',
    user: '用户',
    username: '用户名',
    users: '用户',
    value: '值',
    welcome: '欢迎',
  },
  operators: {
    contains: '包含',
    equals: '等于',
    exists: '存在',
    intersects: '相交',
    isGreaterThan: '大于',
    isGreaterThanOrEqualTo: '大于等于',
    isIn: '在',
    isLessThan: '小于',
    isLessThanOrEqualTo: '小于或等于',
    isLike: '就像',
    isNotEqualTo: '不等于',
    isNotIn: '不在',
    near: '附近',
    within: '在...之内',
  },
  upload: {
    addFile: '添加文件',
    addFiles: '添加文件',
    bulkUpload: '批量上传',
    crop: '作物',
    cropToolDescription: '拖动所选区域的角落，绘制一个新区域或调整以下的值。',
    dragAndDrop: '拖放一个文件',
    dragAndDropHere: '或在这里拖放一个文件',
    editImage: '编辑图像',
    fileName: '文件名',
    fileSize: '文件大小',
    filesToUpload: '要上传的文件',
    fileToUpload: '上传文件',
    focalPoint: '焦点',
    focalPointDescription: '直接在预览中拖动焦点或调整下面的值。',
    height: '高度',
    lessInfo: '更少信息',
    moreInfo: '更多信息',
    pasteURL: '粘贴网址',
    previewSizes: '预览尺寸',
    selectCollectionToBrowse: '选择一个要浏览的集合',
    selectFile: '选择一个文件',
    setCropArea: '设置裁剪区域',
    setFocalPoint: '设置焦点',
    sizes: '尺寸',
    sizesFor: '{{label}}的尺寸',
    width: '宽度',
  },
  validation: {
    emailAddress: '请输入一个有效的电子邮件地址。',
    enterNumber: '请输入一个有效的号码。',
    fieldHasNo: '这个字段没有{{label}}',
    greaterThanMax: '{{value}}超过了允许的最大{{label}}，该最大值为{{max}}。',
    invalidInput: '这个字段有一个无效的输入。',
    invalidSelection: '这个字段有一个无效的选择。',
    invalidSelections: '这个字段有以下无效的选择：',
    lessThanMin: '{{value}}小于允许的最小{{label}}，该最小值为{{min}}。',
    limitReached: '已达限制，只能添加{{max}}个项目。',
    longerThanMin: '该值必须大于{{minLength}}字符的最小长度',
    notValidDate: '"{{value}}"不是一个有效的日期。',
    required: '该字段为必填项目。',
    requiresAtLeast: '该字段至少需要{{count}} {{label}}。',
    requiresNoMoreThan: '该字段要求不超过{{count}} {{label}。',
    requiresTwoNumbers: '该字段需要两个数字。',
    shorterThanMax: '该值必须小于{{maxLength}}字符的最大长度',
    trueOrFalse: '该字段只能等于真或伪。',
    username: '请输入一个有效的用户名。可包含字母，数字，连字符，句点和下划线。',
    validUploadID: '该字段不是有效的上传ID。',
  },
  version: {
    type: '类型',
    aboutToPublishSelection: '您即将发布所选内容中的所有 {{label}}。 你确定吗？',
    aboutToRestore: '您将把这个{{label}}文档恢复到{{versionDate}}时的状态',
    aboutToRestoreGlobal: '您要将全局的{{label}}恢复到{{versionDate}}时的状态',
    aboutToRevertToPublished: '您将要把这个文档的内容还原到它的发布状态。您确定吗？',
    aboutToUnpublish: '你即将取消发布这个文档。你确定吗？',
    aboutToUnpublishSelection: '您即将取消发布所选内容中的所有 {{label}}。 你确定吗？',
    autosave: '自动保存',
    autosavedSuccessfully: '自动保存成功。',
    autosavedVersion: '自动保存的版本',
    changed: '已更改',
    compareVersion: '对比版本：',
    confirmPublish: '确认发布',
    confirmRevertToSaved: '确认恢复到保存状态',
    confirmUnpublish: '确认取消发布',
    confirmVersionRestoration: '确认版本恢复',
    currentDocumentStatus: '当前{{docStatus}}文件',
    currentDraft: '当前草案',
    currentPublishedVersion: '当前发布的版本',
    draft: '草稿',
    draftSavedSuccessfully: '草稿成功保存。',
    lastSavedAgo: '上次保存{{distance}}之前',
    modifieldOnly: 'Modified only',
    noFurtherVersionsFound: '没有发现其他版本',
    noRowsFound: '没有发现{{label}}',
    noRowsSelected: undefined,
    preview: '预览',
    previouslyPublished: '先前发布过的',
    problemRestoringVersion: '恢复这个版本时发生了问题',
    publish: '发布',
    publishChanges: '发布修改',
    published: '已发布',
    publishing: '发布',
    restoreAsDraft: '恢复为草稿',
    restoredSuccessfully: '恢复成功。',
    restoreThisVersion: '恢复此版本',
    restoring: '恢复中...',
    reverting: '还原中...',
    revertToPublished: '还原到已发布的版本',
    saveDraft: '保存草稿',
    selectLocales: '选择要显示的语言',
    selectVersionToCompare: '选择要比较的版本',
    showingVersionsFor: '显示版本为：',
    showLocales: '显示语言：',
    status: '状态',
    unpublish: '取消发布',
    unpublishing: '取消发布中...',
    version: '版本',
    versionCount_many: '发现{{count}}版本',
    versionCount_none: '没有发现任何版本',
    versionCount_one: '找到{{count}}版本',
    versionCount_other: '找到{{count}}版本',
    versionCreatedOn: '{{version}}创建于：',
    versionID: '版本ID',
    versions: '版本',
    viewingVersion: '正在查看{{entityLabel}} {{documentTitle}}的版本',
    viewingVersionGlobal: '正在查看全局{{entityLabel}}的版本',
    viewingVersions: '正在查看{{entityLabel}} {{documentTitle}}的版本',
    viewingVersionsGlobal: '正在查看全局{{entityLabel}}的版本',
  },
}

export const zh: Language = {
  dateFNSKey: 'zh-CN',
  translations: zhTranslations,
}
