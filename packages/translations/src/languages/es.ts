import type { DefaultTranslationsObject, Language } from '../types.js'

export const esTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Cuenta',
    accountOfCurrentUser: 'Cuenta del usuario actual',
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
    emailSent: 'Correo Enviado',
    emailVerified: 'Correo electrónico verificado con éxito.',
    enableAPIKey: 'Habilitar Clave API',
    failedToUnlock: 'Desbloqueo Fallido',
    forceUnlock: 'Forzar Desbloqueo',
    forgotPassword: 'Olvidé mi contraseña',
    forgotPasswordEmailInstructions:
      'Por favor introduce tu correo electrónico. Recibirás un mensaje con las instrucciones para restablecer tu contraseña.',
    forgotPasswordQuestion: '¿Olvidaste tu contraseña?',
    generate: 'Generar',
    generateNewAPIKey: 'Generar Nueva Clave de API',
    generatingNewAPIKeyWillInvalidate:
      'Generar una nueva clave de API <1>invalidará</1> la clave anterior. ¿Deseas continuar?',
    lockUntil: 'Bloquear Hasta',
    logBackIn: 'Volver a iniciar sesión',
    logOut: 'Cerrar sesión',
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
    logout: 'Cerrar sesión',
    logoutSuccessful: 'Cierre de sesión exitoso.',
    logoutUser: 'Cerrar sesión de usuario',
    newAPIKeyGenerated: 'Nueva Clave de API Generada.',
    newAccountCreated:
      'Se ha creado una nueva cuenta para que puedas acceder a <a href="{{serverURL}}">{{serverURL}}</a>. Por favor, haz click o copia el siguiente enlace a tu navegador para verificar tu correo: <a href="{{verificationURL}}">{{verificationURL}}</a>.<br> Una vez hayas verificado tu correo, podrás iniciar sesión.',
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
    noUser: 'Sin usuario',
    notAllowedToAccessPage: 'No tienes permiso para acceder a esta página.',
    notAllowedToPerformAction: 'No tienes permiso para realizar esta acción.',
    notFound: 'No se encontró el recurso solicitado.',
    previewing: 'Ocurrió un problema al previsualizar este documento.',
    problemUploadingFile: 'Ocurrió un problema al subir el archivo.',
    tokenInvalidOrExpired: 'El token es inválido o ya expiró.',
    tokenNotProvided: 'Token no proporcionado.',
    unPublishingDocument: 'Ocurrió un error al despublicar este documento.',
    unableToDeleteCount: 'No se pudo eliminar {{count}} de {{total}} {{label}}.',
    unableToUpdateCount: 'No se puede actualizar {{count}} de {{total}} {{label}}.',
    unauthorized: 'No autorizado, debes iniciar sesión para realizar esta solicitud.',
    unknown: 'Ocurrió un error desconocido.',
    unspecific: 'Ocurrió un error.',
    userLocked:
      'Este usuario ha sido bloqueado debido a que tiene muchos intentos fallidos para iniciar sesión.',
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
    blockType: 'Tipo de bloque',
    blocks: 'bloques',
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
    linkType: 'Tipo de enlace',
    linkedTo: 'Enlazado a <0>{{label}}</0>',
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
    and: 'Y',
    applyChanges: 'Aplicar Cambios',
    ascending: 'Ascendente',
    automatic: 'Automático',
    backToDashboard: 'Volver al Tablero',
    cancel: 'Cancelar',
    changesNotSaved:
      'Tus cambios no han sido guardados. Si te sales ahora, se perderán tus cambios.',
    close: 'Cerrar',
    collapse: 'Colapsar',
    collections: 'Colecciones',
    columnToSort: 'Columna de ordenado',
    columns: 'Columnas',
    confirm: 'Confirmar',
    confirmDeletion: 'Confirmar eliminación',
    confirmDuplication: 'Confirmar duplicado',
    copied: 'Copiado',
    copy: 'Copiar',
    create: 'Crear',
    createNew: 'Crear nuevo',
    createNewLabel: 'Crear nuevo {{label}}',
    created: 'Creado',
    createdAt: 'Fecha de creación',
    creating: 'Creando',
    creatingNewLabel: 'Creando nuevo {{label}}',
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
    documents: 'Documentos',
    duplicate: 'Duplicar',
    duplicateWithoutSaving: 'Duplicar sin guardar cambios',
    edit: 'Editar',
    editLabel: 'Editar {{label}}',
    editing: 'Editando',
    editingLabel_many: 'Edición de {{count}} {{label}}',
    editingLabel_one: 'Editando {{count}} {{label}}',
    editingLabel_other: 'Edición de {{count}} {{label}}',
    email: 'Correo electrónico',
    emailAddress: 'Dirección de Correo Electrónico',
    enterAValue: 'Introduce un valor',
    error: 'Error',
    errors: 'Errores',
    fallbackToDefaultLocale: 'Volver a la configuración regional por defecto',
    false: 'Falso',
    filter: 'Filtro',
    filterWhere: 'Filtrar {{label}} donde',
    filters: 'Filtros',
    globals: 'Globales',
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
    noFiltersSet: 'No hay filtros establecidos',
    noLabel: '<Sin {{label}}>',
    noOptions: 'Sin opciones',
    noResults:
      'No encontramos {{label}}. Puede que no existan {{label}} todavía o no hay coincidencias con los filtros introducidos arriba.',
    noValue: 'Sin valor',
    none: 'Ninguna',
    notFound: 'No encontrado',
    nothingFound: 'No se encontró nada',
    of: 'de',
    open: 'Abrir',
    or: 'O',
    order: 'Orden',
    pageNotFound: 'Página no encontrada',
    password: 'Contraseña',
    payloadSettings: 'Configuración de la carga',
    perPage: 'Por página: {{limit}}',
    remove: 'Remover',
    reset: 'Reiniciar',
    row: 'Fila',
    rows: 'Filas',
    save: 'Guardar',
    saving: 'Guardando...',
    searchBy: 'Buscar por {{label}}',
    selectAll: 'Seleccionar todo {{count}} {{label}}',
    selectAllRows: 'Selecciona todas las filas',
    selectValue: 'Selecciona un valor',
    selectedCount: '{{count}} {{label}} seleccionado',
    showAllLabel: 'Muestra todas {{label}}',
    sorryNotFound: 'Lo sentimos. No hay nada que corresponda con tu solicitud.',
    sort: 'Ordenar',
    sortByLabelDirection: 'Ordenar por {{label}} {{direction}}',
    stayOnThisPage: 'Permanecer en esta página',
    submissionSuccessful: 'Envío realizado correctamente.',
    submit: 'Enviar',
    success: 'Éxito',
    successfullyCreated: '{{label}} creado correctamente.',
    successfullyDuplicated: '{{label}} duplicado correctamente.',
    thisLanguage: 'Español',
    titleDeleted: '{{label}} {{title}} eliminado correctamente.',
    true: 'Verdadero',
    unauthorized: 'No autorizado',
    unsavedChangesDuplicate: 'Tienes cambios sin guardar. ¿Deseas continuar para duplicar?',
    untitled: 'Sin título',
    updatedAt: 'Fecha de modificado',
    updatedCountSuccessfully: '{{count}} {{label}} actualizado con éxito.',
    updatedSuccessfully: 'Actualizado con éxito.',
    updating: 'Actualizando',
    uploading: 'Subiendo',
    user: 'Usuario',
    users: 'Usuarios',
    value: 'Valor',
    welcome: 'Bienvenido',
  },
  operators: {
    contains: 'contiene',
    equals: 'igual',
    exists: 'existe',
    isGreaterThan: 'es mayor que',
    isGreaterThanOrEqualTo: 'es mayor o igual que',
    isIn: 'está en',
    isLessThan: 'es menor que',
    isLessThanOrEqualTo: 'es menor o igual que',
    isLike: 'es como',
    isNotEqualTo: 'no es igual a',
    isNotIn: 'no está en',
    near: 'cerca',
  },
  upload: {
    crop: 'Cultivo',
    cropToolDescription:
      'Arrastra las esquinas del área seleccionada, dibuja un nuevo área o ajusta los valores a continuación.',
    dragAndDrop: 'Arrastra y suelta un archivo',
    dragAndDropHere: 'o arrastra un archivo aquí',
    editImage: 'Editar imagen',
    fileName: 'Nombre del archivo',
    fileSize: 'Tamaño del archivo',
    focalPoint: 'Punto Focal',
    focalPointDescription:
      'Arrastra el punto focal directamente en la vista previa o ajusta los valores a continuación.',
    height: 'Alto',
    lessInfo: 'Menos info',
    moreInfo: 'Más info',
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
    draft: 'Borrador',
    draftSavedSuccessfully: 'Borrador guardado con éxito.',
    lastSavedAgo: 'Guardado por última vez hace {{distance}}',
    noFurtherVersionsFound: 'No se encontraron más versiones',
    noRowsFound: 'No encontramos {{label}}',
    preview: 'Previsualizar',
    problemRestoringVersion: 'Ocurrió un problema al restaurar esta versión',
    publish: 'Publicar',
    publishChanges: 'Publicar cambios',
    published: 'Publicado',
    publishing: 'Publicación',
    restoreThisVersion: 'Restaurar esta versión',
    restoredSuccessfully: 'Restaurado éxito.',
    restoring: 'Restaurando...',
    revertToPublished: 'Revertir a publicado',
    reverting: 'Revirtiendo...',
    saveDraft: 'Guardar Borrador',
    selectLocales: 'Selecciona idiomas a mostrar',
    selectVersionToCompare: 'Selecciona versión a comparar',
    showLocales: 'Mostrar idiomas:',
    showingVersionsFor: 'Mostrando versiones para:',
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
