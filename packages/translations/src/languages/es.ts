import type { DefaultTranslationsObject, Language } from '../types.js'

export const esTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Cuenta',
    accountOfCurrentUser: 'Cuenta del usuario actual',
    accountVerified: 'Cuenta verificada con éxito.',
    alreadyActivated: 'Ya Activado',
    alreadyLoggedIn: 'Sesión iniciada',
    apiKey: 'Clave API',
    authenticated: 'Autenticado',
    backToLogin: 'Regresar al inicio de sesión',
    beginCreateFirstUser: 'Para empezar, crea tu primer usuario.',
    changePassword: 'Cambiar contraseña',
    checkYourEmailForPasswordReset:
      'Revisa tu correo con el enlace para restablecer tu contraseña de forma segura.',
    confirmGeneration: 'Confirmar Generación',
    confirmPassword: 'Confirmar Contraseña',
    createFirstUser: 'Crear al primer usuario',
    emailNotValid: 'El correo proporcionado es inválido',
    emailOrUsername: 'Correo electrónico o nombre de usuario',
    emailSent: 'Correo Enviado',
    emailVerified: 'Correo electrónico verificado con éxito.',
    enableAPIKey: 'Habilitar Clave API',
    failedToUnlock: 'Desbloqueo Fallido',
    forceUnlock: 'Forzar Desbloqueo',
    forgotPassword: 'Olvidé mi contraseña',
    forgotPasswordEmailInstructions:
      'Por favor introduce tu correo electrónico. Recibirás un mensaje con las instrucciones para restablecer tu contraseña.',
    forgotPasswordQuestion: '¿Olvidaste tu contraseña?',
    forgotPasswordUsernameInstructions:
      'Por favor, ingrese su nombre de usuario a continuación. Se enviarán instrucciones sobre cómo restablecer su contraseña a la dirección de correo electrónico asociada con su nombre de usuario.',
    generate: 'Generar',
    generateNewAPIKey: 'Generar Nueva Clave de API',
    generatingNewAPIKeyWillInvalidate:
      'Generar una nueva clave de API <1>invalidará</1> la clave anterior. ¿Deseas continuar?',
    lockUntil: 'Bloquear Hasta',
    logBackIn: 'Volver a iniciar sesión',
    loggedIn: 'Para iniciar sesión con otro usuario, primero <0>cierra tu sesión</0>.',
    loggedInChangePassword:
      'Para cambiar tu contraseña, entra a <0>tu cuenta</0> y edita la contraseña desde ahí.',
    loggedOutInactivity: 'Tú sesión se cerró debido a inactividad.',
    loggedOutSuccessfully: 'Tú sesión se cerró correctamente.',
    loggingOut: 'Cerrando sesión...',
    login: 'Iniciar sesión',
    loginAttempts: 'Login Attempts',
    loginUser: 'Iniciar sesión de usuario',
    loginWithAnotherUser: 'Para iniciar sesión con otro usuario, primero <0>cierra tu sesión</0>.',
    logOut: 'Cerrar sesión',
    logout: 'Cerrar sesión',
    logoutSuccessful: 'Cierre de sesión exitoso.',
    logoutUser: 'Cerrar sesión de usuario',
    newAccountCreated:
      'Se ha creado una nueva cuenta para que puedas acceder a <a href="{{serverURL}}">{{serverURL}}</a>. Por favor, haz click o copia el siguiente enlace a tu navegador para verificar tu correo: <a href="{{verificationURL}}">{{verificationURL}}</a>.<br> Una vez hayas verificado tu correo, podrás iniciar sesión.',
    newAPIKeyGenerated: 'Nueva Clave de API Generada.',
    newPassword: 'Nueva Contraseña',
    passed: 'Autenticación Aprobada',
    passwordResetSuccessfully: 'Contraseña restablecida con éxito.',
    resetPassword: 'Restablecer Contraseña',
    resetPasswordExpiration: 'Restablecer Caducidad de la Contraseña',
    resetPasswordToken: 'Restablecer Token de la Contraseña',
    resetYourPassword: 'Restablecer tu Contraseña',
    stayLoggedIn: 'Mantener sesión abierta',
    successfullyRegisteredFirstUser: 'Usuario registrado con éxito por primera vez.',
    successfullyUnlocked: 'Desbloqueado correctamente',
    tokenRefreshSuccessful: 'Actualización de token exitosa.',
    unableToVerify: 'No se pudo Verificar',
    username: 'Nombre de usuario',
    usernameNotValid: 'El nombre de usuario proporcionado no es válido.',
    verified: 'Verificado',
    verifiedSuccessfully: 'Verificación Correcta',
    verify: 'Verificar',
    verifyUser: 'Verificar Usuario',
    verifyYourEmail: 'Verifica tu correo',
    youAreInactive:
      'Has estado inactivo por un tiempo y por tu seguridad se cerrará tu sesión automáticamente. ¿Deseas mantener tu sesión activa?',
    youAreReceivingResetPassword:
      'Estás recibiendo esto porque tú (o alguien más) ha solicitado restablecer la contraseña de tu cuenta. Por favor haz click en el siguiente enlace o pégalo en tu navegador para completar el proceso:',
    youDidNotRequestPassword:
      'Si tú no solicitaste esto, por favor ignora este correo y tu contraseña no se cambiará.',
  },
  error: {
    accountAlreadyActivated: 'Esta cuenta ya fue activada.',
    autosaving: 'Ocurrió un problema al autoguardar este documento.',
    correctInvalidFields: 'Por favor corrige los campos inválidos.',
    deletingFile: 'Ocurrió un error al eliminar el archivo.',
    deletingTitle:
      'Ocurrió un error al eliminar {{title}}. Por favor revisa tu conexión y vuelve a intentarlo.',
    emailOrPasswordIncorrect: 'El correo o la contraseña introducida es incorrecta.',
    followingFieldsInvalid_one: 'El siguiente campo es inválido:',
    followingFieldsInvalid_other: 'Los siguientes campos son inválidos:',
    incorrectCollection: 'Colección Incorrecta',
    invalidFileType: 'Tipo de archivo inválido',
    invalidFileTypeValue: 'Tipo de archivo inválido: {{value}}',
    invalidRequestArgs: 'Argumentos no válidos en la solicitud: {{args}}',
    loadingDocument: 'Ocurrió un problema al cargar el documento con la ID {{id}}.',
    localesNotSaved_one: 'No se pudo guardar la siguiente configuración regional:',
    localesNotSaved_other: 'No se pudieron guardar las siguientes configuraciones regionales:',
    logoutFailed: 'El cierre de sesión falló.',
    missingEmail: 'Falta el correo.',
    missingIDOfDocument: 'Falta la ID del documento a actualizar.',
    missingIDOfVersion: 'Falta la ID de la versión.',
    missingRequiredData: 'Falta la información obligatoria.',
    noFilesUploaded: 'No se subieron archivos.',
    noMatchedField: 'No se encontró un campo para "{{label}}"',
    notAllowedToAccessPage: 'No tienes permiso para acceder a esta página.',
    notAllowedToPerformAction: 'No tienes permiso para realizar esta acción.',
    notFound: 'No se encontró el recurso solicitado.',
    noUser: 'Sin usuario',
    previewing: 'Ocurrió un problema al previsualizar este documento.',
    problemUploadingFile: 'Ocurrió un problema al subir el archivo.',
    tokenInvalidOrExpired: 'El token es inválido o ya expiró.',
    tokenNotProvided: 'Token no proporcionado.',
    unableToDeleteCount: 'No se pudo eliminar {{count}} de {{total}} {{label}}.',
    unableToReindexCollection:
      'Error al reindexar la colección {{collection}}. Operación abortada.',
    unableToUpdateCount: 'No se puede actualizar {{count}} de {{total}} {{label}}.',
    unauthorized: 'No autorizado, debes iniciar sesión para realizar esta solicitud.',
    unknown: 'Ocurrió un error desconocido.',
    unPublishingDocument: 'Ocurrió un error al despublicar este documento.',
    unspecific: 'Ocurrió un error.',
    userEmailAlreadyRegistered:
      'Ya hay un usuario registrado con el correo electrónico proporcionado.',
    userLocked:
      'Este usuario ha sido bloqueado debido a que tiene muchos intentos fallidos para iniciar sesión.',
    usernameAlreadyRegistered:
      'Un usuario con el nombre de usuario proporcionado ya está registrado.',
    usernameOrPasswordIncorrect:
      'El nombre de usuario o la contraseña proporcionados son incorrectos.',
    valueMustBeUnique: 'El valor debe ser único',
    verificationTokenInvalid: 'Token de verificación inválido.',
  },
  fields: {
    addLabel: 'Añadir {{label}}',
    addLink: 'Añadir Enlace',
    addNew: 'Añadir nuevo',
    addNewLabel: 'Añadir {{label}}',
    addRelationship: 'Añadir Relación',
    addUpload: 'Añadir Carga',
    block: 'bloque',
    blocks: 'bloques',
    blockType: 'Tipo de bloque',
    chooseBetweenCustomTextOrDocument:
      'Elige entre ingresar una URL personalizada o enlazar a otro documento.',
    chooseDocumentToLink: 'Elige un documento a enlazar',
    chooseFromExisting: 'Elegir existente',
    chooseLabel: 'Elegir {{label}}',
    collapseAll: 'Colapsar todo',
    customURL: 'URL Personalizado',
    editLabelData: 'Editar información de {{label}}',
    editLink: 'Editar Enlace',
    editRelationship: 'Editar Relación',
    enterURL: 'Ingresar URL',
    internalLink: 'Enlace Interno',
    itemsAndMore: '{{items}} y {{count}} más',
    labelRelationship: 'Relación de {{label}}',
    latitude: 'Latitud',
    linkedTo: 'Enlazado a <0>{{label}}</0>',
    linkType: 'Tipo de enlace',
    longitude: 'Longitud',
    newLabel: 'Nuevo {{label}}',
    openInNewTab: 'Abrir en nueva pestaña',
    passwordsDoNotMatch: 'Las contraseñas no coinciden.',
    relatedDocument: 'Documento Relacionado',
    relationTo: 'Relación con',
    removeRelationship: 'Eliminar relación',
    removeUpload: 'Quitar Carga',
    saveChanges: 'Guardar cambios',
    searchForBlock: 'Buscar bloque',
    selectExistingLabel: 'Seleccionar {{label}} existente',
    selectFieldsToEdit: 'Seleccionar campos para editar',
    showAll: 'Mostrar Todo',
    swapRelationship: 'Cambiar Relación',
    swapUpload: 'Cambiar carga',
    textToDisplay: 'Texto a mostrar',
    toggleBlock: 'Alternar bloque',
    uploadNewLabel: 'Subir nuevo {{label}}',
  },
  general: {
    aboutToDelete: 'Estás por eliminar el {{label}} <1>{{title}}</1>. ¿Estás seguro?',
    aboutToDeleteCount_many: 'Está a punto de eliminar {{count}} {{label}}',
    aboutToDeleteCount_one: 'Está a punto de eliminar {{count}} {{label}}',
    aboutToDeleteCount_other: 'Está a punto de eliminar {{count}} {{label}}',
    addBelow: 'Agrega abajo',
    addFilter: 'Añadir filtro',
    adminTheme: 'Tema del admin',
    allCollections: 'Todas las colecciones',
    and: 'Y',
    anotherUser: 'Otro usuario',
    anotherUserTakenOver: 'Otro usuario ha tomado el control de la edición de este documento.',
    applyChanges: 'Aplicar Cambios',
    ascending: 'Ascendente',
    automatic: 'Automático',
    backToDashboard: 'Volver al Tablero',
    cancel: 'Cancelar',
    changesNotSaved:
      'Tus cambios no han sido guardados. Si te sales ahora, se perderán tus cambios.',
    clearAll: 'Borrar todo',
    close: 'Cerrar',
    collapse: 'Colapsar',
    collections: 'Colecciones',
    columns: 'Columnas',
    columnToSort: 'Columna de ordenado',
    confirm: 'Confirmar',
    confirmCopy: 'Confirmar copia',
    confirmDeletion: 'Confirmar eliminación',
    confirmDuplication: 'Confirmar duplicado',
    confirmReindex: '¿Reindexar todas las {{collections}}?',
    confirmReindexAll: '¿Reindexar todas las colecciones?',
    confirmReindexDescription:
      'Esto eliminará los índices existentes y volverá a indexar los documentos en las colecciones {{collections}}.',
    confirmReindexDescriptionAll:
      'Esto eliminará los índices existentes y volverá a indexar los documentos en todas las colecciones.',
    copied: 'Copiado',
    copy: 'Copiar',
    copying: 'Copiando',
    copyWarning:
      'Estás a punto de sobrescribir {{to}} con {{from}} para {{label}} {{title}}. ¿Estás seguro?',
    create: 'Crear',
    created: 'Creado',
    createdAt: 'Fecha de creación',
    createNew: 'Crear nuevo',
    createNewLabel: 'Crear nuevo {{label}}',
    creating: 'Creando',
    creatingNewLabel: 'Creando nuevo {{label}}',
    currentlyEditing:
      'está editando este documento. Si tomas el control, se les bloqueará para que no continúen editando y podrían perder los cambios no guardados.',
    custom: 'Personalizado',
    dark: 'Oscuro',
    dashboard: 'Tablero',
    delete: 'Eliminar',
    deletedCountSuccessfully: 'Se eliminó {{count}} {{label}} con éxito.',
    deletedSuccessfully: 'Borrado exitosamente.',
    deleting: 'Eliminando...',
    depth: 'Profundidad',
    descending: 'Descendente',
    deselectAllRows: 'Deselecciona todas las filas',
    document: 'Documento',
    documentLocked: 'Documento bloqueado',
    documents: 'Documentos',
    duplicate: 'Duplicar',
    duplicateWithoutSaving: 'Duplicar sin guardar cambios',
    edit: 'Editar',
    editedSince: 'Editado desde',
    editing: 'Editando',
    editingLabel_many: 'Edición de {{count}} {{label}}',
    editingLabel_one: 'Editando {{count}} {{label}}',
    editingLabel_other: 'Edición de {{count}} {{label}}',
    editingTakenOver: 'Edición tomada',
    editLabel: 'Editar {{label}}',
    email: 'Correo electrónico',
    emailAddress: 'Dirección de Correo Electrónico',
    enterAValue: 'Introduce un valor',
    error: 'Error',
    errors: 'Errores',
    fallbackToDefaultLocale: 'Volver a la configuración regional por defecto',
    false: 'Falso',
    filter: 'Filtro',
    filters: 'Filtros',
    filterWhere: 'Filtrar {{label}} donde',
    globals: 'Globales',
    goBack: 'Volver',
    isEditing: 'está editando',
    language: 'Idioma',
    lastModified: 'Última modificación',
    leaveAnyway: 'Salir de todos modos',
    leaveWithoutSaving: 'Salir sin guardar',
    light: 'Claro',
    livePreview: 'Previsualizar',
    loading: 'Cargando',
    locale: 'Regional',
    locales: 'Locales',
    menu: 'Menú',
    moveDown: 'Mover abajo',
    moveUp: 'Mover arriba',
    newPassword: 'Nueva contraseña',
    next: 'Siguiente',
    noFiltersSet: 'No hay filtros establecidos',
    noLabel: '<Sin {{label}}>',
    none: 'Ninguna',
    noOptions: 'Sin opciones',
    noResults:
      'No encontramos {{label}}. Puede que no existan {{label}} todavía o no hay coincidencias con los filtros introducidos arriba.',
    notFound: 'No encontrado',
    nothingFound: 'No se encontró nada',
    noValue: 'Sin valor',
    of: 'de',
    only: 'Solo',
    open: 'Abrir',
    or: 'O',
    order: 'Orden',
    overwriteExistingData: 'Sobrescribir los datos del campo existente',
    pageNotFound: 'Página no encontrada',
    password: 'Contraseña',
    payloadSettings: 'Configuración de la carga',
    perPage: 'Por página: {{limit}}',
    previous: 'Anterior',
    reindex: 'Reindexar',
    reindexingAll: 'Reindexando todas las {{collections}}.',
    remove: 'Remover',
    reset: 'Reiniciar',
    row: 'Fila',
    rows: 'Filas',
    save: 'Guardar',
    saving: 'Guardando...',
    searchBy: 'Buscar por {{label}}',
    selectAll: 'Seleccionar todo {{count}} {{label}}',
    selectAllRows: 'Selecciona todas las filas',
    selectedCount: '{{count}} {{label}} seleccionado',
    selectValue: 'Selecciona un valor',
    showAllLabel: 'Muestra todas {{label}}',
    sorryNotFound: 'Lo sentimos. No hay nada que corresponda con tu solicitud.',
    sort: 'Ordenar',
    sortByLabelDirection: 'Ordenar por {{label}} {{direction}}',
    stayOnThisPage: 'Permanecer en esta página',
    submissionSuccessful: 'Envío realizado correctamente.',
    submit: 'Enviar',
    submitting: 'Enviando...',
    success: 'Éxito',
    successfullyCreated: '{{label}} creado correctamente.',
    successfullyDuplicated: '{{label}} duplicado correctamente.',
    successfullyReindexed:
      'Se reindexaron con éxito {{count}} de {{total}} documentos de {{collections}} colecciones.',
    takeOver: 'Tomar el control',
    thisLanguage: 'Español',
    titleDeleted: '{{label}} {{title}} eliminado correctamente.',
    true: 'Verdadero',
    unauthorized: 'No autorizado',
    unsavedChanges: 'Tiene cambios no guardados. Guarde o descarte antes de continuar.',
    unsavedChangesDuplicate: 'Tienes cambios sin guardar. ¿Deseas continuar para duplicar?',
    untitled: 'Sin título',
    updatedAt: 'Fecha de modificado',
    updatedCountSuccessfully: '{{count}} {{label}} actualizado con éxito.',
    updatedSuccessfully: 'Actualizado con éxito.',
    updating: 'Actualizando',
    uploading: 'Subiendo',
    uploadingBulk: 'Subiendo {{current}} de {{total}}',
    user: 'Usuario',
    username: 'Nombre de usuario',
    users: 'Usuarios',
    value: 'Valor',
    viewReadOnly: 'Ver solo lectura',
    welcome: 'Bienvenido',
  },
  localization: {
    cannotCopySameLocale: 'No se puede copiar al mismo lugar',
    copyFrom: 'Copiar de',
    copyFromTo: 'Copiando de {{from}} a {{to}}',
    copyTo: 'Copia a',
    copyToLocale: 'Copiar a localización',
    selectLocaleToCopy: 'Seleccione la ubicación para copiar',
  },
  operators: {
    contains: 'contiene',
    equals: 'igual',
    exists: 'existe',
    intersects: 'interseca',
    isGreaterThan: 'es mayor que',
    isGreaterThanOrEqualTo: 'es mayor o igual que',
    isIn: 'está en',
    isLessThan: 'es menor que',
    isLessThanOrEqualTo: 'es menor o igual que',
    isLike: 'es como',
    isNotEqualTo: 'no es igual a',
    isNotIn: 'no está en',
    near: 'cerca',
    within: 'dentro de',
  },
  upload: {
    addFile: 'Añadir archivo',
    addFiles: 'Añadir archivos',
    bulkUpload: 'Subida en Masa',
    crop: 'Cultivo',
    cropToolDescription:
      'Arrastra las esquinas del área seleccionada, dibuja un nuevo área o ajusta los valores a continuación.',
    dragAndDrop: 'Arrastra y suelta un archivo',
    dragAndDropHere: 'o arrastra un archivo aquí',
    editImage: 'Editar imagen',
    fileName: 'Nombre del archivo',
    fileSize: 'Tamaño del archivo',
    filesToUpload: 'Archivos para subir',
    fileToUpload: 'Archivo para subir',
    focalPoint: 'Punto Focal',
    focalPointDescription:
      'Arrastra el punto focal directamente en la vista previa o ajusta los valores a continuación.',
    height: 'Alto',
    lessInfo: 'Menos info',
    moreInfo: 'Más info',
    pasteURL: 'Pegar URL',
    previewSizes: 'Tamaños de Vista Previa',
    selectCollectionToBrowse: 'Selecciona una Colección',
    selectFile: 'Selecciona un archivo',
    setCropArea: 'Establecer área de cultivo',
    setFocalPoint: 'Establecer punto focal',
    sizes: 'Tamaños',
    sizesFor: 'Tamaños para {{label}}',
    width: 'Ancho',
  },
  validation: {
    emailAddress: 'Por favor introduce un correo electrónico válido.',
    enterNumber: 'Por favor introduce un número válido.',
    fieldHasNo: 'Este campo no tiene {{label}}',
    greaterThanMax: '{{value}} es mayor que el {{label}} máximo permitido de {{max}}.',
    invalidInput: 'La información en este campo es inválida.',
    invalidSelection: 'La selección en este campo es inválida.',
    invalidSelections: 'Este campo tiene las siguientes selecciones inválidas:',
    lessThanMin: '{{value}} es menor que el {{label}} mínimo permitido de {{min}}.',
    limitReached: 'Se ha alcanzado el límite, solo se pueden agregar {{max}} elementos.',
    longerThanMin: 'Este dato debe ser más largo que el mínimo de {{minLength}} caracteres.',
    notValidDate: '"{{value}}" es una fecha inválida.',
    required: 'Este campo es obligatorio.',
    requiresAtLeast: 'Este campo require al menos {{count}} {{label}}.',
    requiresNoMoreThan: 'Este campo require no más de {{count}} {{label}}',
    requiresTwoNumbers: 'Este campo requiere dos números.',
    shorterThanMax: 'Este dato debe ser más corto que el máximo de {{maxLength}} caracteres.',
    trueOrFalse: 'Este campo solamente puede ser verdadero o falso.',
    username:
      'Por favor, introduzca un nombre de usuario válido. Puede contener letras, números, guiones, puntos y guiones bajos.',
    validUploadID: "'Este campo no es una ID de subida válida.'",
  },
  version: {
    type: 'Tipo',
    aboutToPublishSelection:
      'Está a punto de publicar todas las {{etiquetas}} de la selección. ¿Está seguro?',
    aboutToRestore:
      'Estás a punto de restaurar este documento de {{label}} al estado en el que estaba en la fecha {{versionDate}}.',
    aboutToRestoreGlobal:
      'Estás a punto de restaurar el {{label}} global al estado en el que estaba en la fecha {{versionDate}}.',
    aboutToRevertToPublished:
      'Estás a punto de revertir los cambios de este documento a su estado publicado. ¿Estás seguro?',
    aboutToUnpublish: 'Estás a punto de despublicar este documento. ¿Estás seguro?',
    aboutToUnpublishSelection:
      'Está a punto de anular la publicación de todos los {{label}} de la selección. ¿Está seguro?',
    autosave: 'Autoguardar',
    autosavedSuccessfully: 'Guardado automáticamente con éxito.',
    autosavedVersion: 'Versión Autoguardada',
    changed: 'Modificado',
    compareVersion: 'Comparar versión con:',
    confirmPublish: 'Confirmar publicación',
    confirmRevertToSaved: 'Confirmar revertir a guardado',
    confirmUnpublish: 'Confirmar despublicado',
    confirmVersionRestoration: 'Confirmar restauración de versión',
    currentDocumentStatus: 'Documento {{docStatus}} actual',
    currentDraft: 'Borrador Actual',
    currentPublishedVersion: 'Versión Publicada Actual',
    draft: 'Borrador',
    draftSavedSuccessfully: 'Borrador guardado con éxito.',
    lastSavedAgo: 'Guardado por última vez hace {{distance}}',
    noFurtherVersionsFound: 'No se encontraron más versiones',
    noRowsFound: 'No encontramos {{label}}',
    noRowsSelected: 'No se ha seleccionado ninguna {{etiqueta}}',
    preview: 'Previsualizar',
    previouslyPublished: 'Publicado Anteriormente',
    problemRestoringVersion: 'Ocurrió un problema al restaurar esta versión',
    publish: 'Publicar',
    publishChanges: 'Publicar cambios',
    published: 'Publicado',
    publishIn: 'Publicar en {{locale}}',
    publishing: 'Publicación',
    restoreAsDraft: 'Restaurar como borrador',
    restoredSuccessfully: 'Restaurado éxito.',
    restoreThisVersion: 'Restaurar esta versión',
    restoring: 'Restaurando...',
    reverting: 'Revirtiendo...',
    revertToPublished: 'Revertir a publicado',
    saveDraft: 'Guardar Borrador',
    selectLocales: 'Selecciona idiomas a mostrar',
    selectVersionToCompare: 'Selecciona versión a comparar',
    showingVersionsFor: 'Mostrando versiones para:',
    showLocales: 'Mostrar idiomas:',
    status: 'Estado',
    unpublish: 'Despublicar',
    unpublishing: 'Despublicando...',
    version: 'Versión',
    versionCount_many: '{{count}} versiones encontradas',
    versionCount_none: 'No encontramos versiones',
    versionCount_one: '{{count}} versión encontrada',
    versionCount_other: '{{count}} versiones encontradas',
    versionCreatedOn: '{{version}} creada el:',
    versionID: 'ID de Versión',
    versions: 'Versiones',
    viewingVersion: 'Viendo versión para {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Viendo versión para el global {{entityLabel}}',
    viewingVersions: 'Viendo versiones para {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Viendo versiones para el global {{entityLabel}}',
  },
}

export const es: Language = {
  dateFNSKey: 'es',
  translations: esTranslations,
}
