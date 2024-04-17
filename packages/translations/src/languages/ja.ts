import type { Language } from '../types.js'

export const ja: Language = {
  dateFNSKey: 'ja',
  translations: {
    authentication: {
      account: 'アカウント',
      accountOfCurrentUser: '現在のユーザーアカウント',
      alreadyActivated: 'すでに有効です',
      alreadyLoggedIn: 'すでにログインしています',
      apiKey: 'API Key',
      backToLogin: 'ログイン画面へ戻る',
      beginCreateFirstUser: 'まずは、最初のユーザーを作成します。',
      changePassword: 'パスワードを変更',
      checkYourEmailForPasswordReset:
        'パスワードを安全に再設定するためのリンクがメールで送られてくるので、確認してください。',
      confirmGeneration: '生成の確認',
      confirmPassword: 'パスワードの確認',
      createFirstUser: '最初のユーザーを作成',
      emailNotValid: '入力されたメールアドレスは無効です。',
      emailSent: 'Emailが送信されました。',
      enableAPIKey: 'API Keyを許可',
      failedToUnlock: 'ロックの解除に失敗しました。',
      forceUnlock: '強制的にロックを解除',
      forgotPassword: 'パスワード再設定',
      forgotPasswordEmailInstructions:
        'アカウントのメールアドレスを以下に入力してください。パスワードの再設定方法が記載されたメールが届きます。',
      forgotPasswordQuestion: 'パスワードをお忘れですか？',
      generate: '生成',
      generateNewAPIKey: '新しいAPI Keyを生成',
      generatingNewAPIKeyWillInvalidate:
        '新しいAPI Keyを生成すると、以前のAPI Keyは<1>無効</1>になります。よろしいですか？',
      lockUntil: 'ロック期限',
      logBackIn: '改めてログイン',
      logOut: 'ログアウト',
      loggedIn: '他のユーザーでログインするには、まず<0>ログアウト</0>する必要があります。',
      loggedInChangePassword:
        'パスワードを変更するには、<0>アカウント</0>にアクセスしてパスワードを編集してください。',
      loggedOutInactivity: 'しばらく操作を行わなかったため、管理画面からログアウトしました。',
      loggedOutSuccessfully: '管理画面からログアウトしました。',
      login: 'ログイン',
      loginAttempts: 'ログイン試行回数',
      loginUser: 'ログインユーザー',
      loginWithAnotherUser:
        '他のユーザーでログインするには、まず<0>ログアウト</0>する必要があります。',
      logout: 'ログアウト',
      logoutUser: 'ログアウトユーザー',
      newAPIKeyGenerated: '新しいAPI Keyを生成しました。',
      newAccountCreated:
        '<a href="{{serverURL}}">{{serverURL}}</a>にアクセスするための新しいアカウントが作成されました。以下のリンクをクリックするか、ブラウザに以下のURLを貼り付けて、メールアドレスの確認を行ってください。<a href="{{verificationURL}}">{{verificationURL}}</a><br>メールアドレスの確認後に、正常にログインできるようになります。',
      newPassword: '新しいパスワード',
      resetPassword: 'パスワード再発行',
      resetPasswordExpiration: 'パスワードの有効期限をリセット',
      resetPasswordToken: 'パスワードのトークンをリセット',
      resetYourPassword: 'パスワードの再設定',
      stayLoggedIn: 'ログイン状態を維持',
      successfullyUnlocked: 'ロックの解除に成功しました。',
      unableToVerify: '検証ができません',
      verified: '検証済み',
      verifiedSuccessfully: '検証が成功しました',
      verify: '検証',
      verifyUser: 'ユーザーの確認',
      verifyYourEmail: 'メールアドレスの確認',
      youAreInactive:
        'しばらく操作を行わなかったため、セキュリティのために自動的にログアウトします。ログイン状態を維持しますか？',
      youAreReceivingResetPassword:
        'アカウントのパスワードリセットがリクエストされました。次のリンクをクリックする、または、ブラウザにリンクを貼り付けて、手続きを行ってください:',
      youDidNotRequestPassword:
        'もし望まない場合は、このメールを無視してください。パスワードは変更されません。',
    },
    error: {
      accountAlreadyActivated: 'このアカウントはすでに有効です。',
      autosaving: 'このデータを自動保存する際に問題が発生しました。',
      correctInvalidFields: '無効なフィールドを修正してください。',
      deletingFile: 'ファイルの削除中にエラーが発生しました。',
      deletingTitle:
        '{{title}} を削除する際にエラーが発生しました。接続を確認してからもう一度お試しください。',
      emailOrPasswordIncorrect: 'メールアドレス、または、パスワードが正しくありません。',
      followingFieldsInvalid_one: '次のフィールドは無効です:',
      followingFieldsInvalid_other: '次のフィールドは無効です:',
      incorrectCollection: '不正なコレクション',
      invalidFileType: '無効なファイル形式',
      invalidFileTypeValue: '無効なファイル形式: {{value}}',
      loadingDocument: 'IDが {{id}} のデータを読み込む際に問題が発生しました。',
      localesNotSaved_one: '次のロケールを保存できませんでした：',
      localesNotSaved_other: '次のロケールを保存できませんでした：',
      missingEmail: 'メールアドレスが不足しています。',
      missingIDOfDocument: '更新するデータのIDが不足しています。',
      missingIDOfVersion: 'バージョンIDが不足しています。',
      missingRequiredData: '必須データが不足しています。',
      noFilesUploaded: 'ファイルがアップロードされていません。',
      noMatchedField: '"{{label}}" に該当するフィールドがありません。',
      noUser: 'ユーザーなし',
      notAllowedToAccessPage: 'この画面へのアクセスは許可されていません。',
      notAllowedToPerformAction: 'このアクションは許可されていません。',
      notFound: 'リクエストされたリソースは見つかりませんでした。',
      previewing: 'このデータをプレビューする際に問題が発生しました。',
      problemUploadingFile: 'ファイルのアップロード中に問題が発生しました。',
      tokenInvalidOrExpired: 'トークンが無効、または、有効期限が切れています。',
      unPublishingDocument: 'このデータを非公開する際に問題が発生しました。',
      unableToDeleteCount: '{{total}} {{label}} から {{count}} を削除できません。',
      unableToUpdateCount: '{{total}} {{label}} のうち {{count}} 個を更新できません。',
      unauthorized: '認証されていません。このリクエストを行うにはログインが必要です。',
      unknown: '不明なエラーが発生しました。',
      unspecific: 'エラーが発生しました。',
      userLocked: 'このユーザーは、ログイン試行回数が多すぎるため、ロックされています。',
      valueMustBeUnique: 'ユニークな値である必要があります。',
      verificationTokenInvalid: '認証トークンが無効です。',
    },
    fields: {
      addLabel: '{{label}} を追加',
      addLink: 'リンクを追加',
      addNew: '新規追加',
      addNewLabel: '{{label}} を新規追加',
      addRelationship: 'リレーションシップを追加',
      addUpload: 'アップロードを追加',
      block: 'ブロック',
      blockType: 'ブロックタイプ',
      blocks: 'ブロック',
      chooseBetweenCustomTextOrDocument:
        'カスタムテキストのURLを入力するか、他のドキュメントにリンクするかを選択してください。',
      chooseDocumentToLink: 'リンクするドキュメントを選択してください。',
      chooseFromExisting: '既存から選択',
      chooseLabel: '{{label}} を選択',
      collapseAll: 'すべて閉じる',
      customURL: 'カスタムURL',
      editLabelData: '{{label}} データを編集',
      editLink: 'リンクを編集',
      editRelationship: 'リレーションシップを編集',
      enterURL: 'URL を入力してください',
      internalLink: '内部リンク',
      itemsAndMore: '{{items}} 他{{count}}件',
      labelRelationship: '{{label}} リレーションシップ',
      latitude: '緯度',
      linkType: 'リンクタイプ',
      linkedTo: '<0>{{label}}</0> にリンク',
      longitude: '経度',
      newLabel: '新規 {{label}}',
      openInNewTab: '新しいタブで開く',
      passwordsDoNotMatch: 'パスワードが一致しません',
      relatedDocument: 'リレーションデータ',
      relationTo: 'リレーション',
      removeRelationship: '関係を削除',
      removeUpload: '削除',
      saveChanges: '変更を保存',
      searchForBlock: 'ブロックを検索',
      selectExistingLabel: '既存 {{label}} を選択',
      selectFieldsToEdit: '編集するフィールドを選択',
      showAll: 'すべて開く',
      swapRelationship: 'スワップ関係',
      swapUpload: '差し替え',
      textToDisplay: '表示するテキスト',
      toggleBlock: 'ブロックを切り替え',
      uploadNewLabel: '新規 {{label}} アップロード',
    },
    general: {
      aboutToDelete: '{{label}} <1>{{title}}</1> を削除します。よろしいですか？',
      aboutToDeleteCount_many: '{{label}}を{{count}}つ削除しようとしています',
      aboutToDeleteCount_one: '{{label}}を{{count}}つ削除しようとしています',
      aboutToDeleteCount_other: '{{label}}を{{count}}つ削除しようとしています',
      addBelow: '下に追加',
      addFilter: '絞り込みを追加',
      adminTheme: '管理画面のテーマ',
      and: 'かつ',
      applyChanges: '変更を適用する',
      ascending: '昇順',
      automatic: '自動設定',
      backToDashboard: 'ダッシュボードに戻る',
      cancel: 'キャンセル',
      changesNotSaved: '未保存の変更があります。このまま画面を離れると内容が失われます。',
      close: '閉じる',
      collapse: '閉じる',
      collections: 'コレクション',
      columnToSort: '並び替え対象の行',
      columns: '行の表示',
      confirm: '実行',
      confirmDeletion: '削除の確認',
      confirmDuplication: '複製の確認',
      copied: 'コピーしました',
      copy: 'コピー',
      create: '作成',
      createNew: '新規作成',
      createNewLabel: '{{label}} を新規作成',
      created: '作成',
      createdAt: '作成日',
      creating: '作成中',
      creatingNewLabel: '{{label}} を新規作成しています',
      dark: 'ダークモード',
      dashboard: 'ダッシュボード',
      delete: '削除',
      deletedCountSuccessfully: '{{count}}つの{{label}}を正常に削除しました。',
      deletedSuccessfully: '正常に削除されました。',
      deleting: '削除しています...',
      descending: '降順',
      deselectAllRows: 'すべての行の選択を解除します',
      duplicate: '複製',
      duplicateWithoutSaving: '変更を保存せずに複製',
      edit: '編集',
      editLabel: '{{label}} を編集',
      editing: '編集',
      editingLabel_many: '{{count}}つの{{label}}を編集しています',
      editingLabel_one: '{{count}}つの{{label}}を編集しています',
      editingLabel_other: '{{count}}つの{{label}}を編集しています',
      email: 'メールアドレス',
      emailAddress: 'メールアドレス',
      enterAValue: '値を入力',
      error: 'エラー',
      errors: 'エラー',
      fallbackToDefaultLocale: 'デフォルトロケールへのフォールバック',
      filter: '絞り込み',
      filterWhere: '{{label}} の絞り込み',
      filters: '絞り込み',
      globals: 'グローバル',
      language: '言語',
      lastModified: '最終更新',
      leaveAnyway: 'すぐに画面を離れる',
      leaveWithoutSaving: '内容が保存されていません',
      light: 'ライトモード',
      livePreview: 'プレビュー',
      loading: 'ローディング中',
      locale: 'ロケール',
      locales: 'ロケール',
      menu: 'メニュー',
      moveDown: '下へ移動',
      moveUp: '上へ移動',
      newPassword: '新しいパスワード',
      noFiltersSet: '絞り込みが未設定です。',
      noLabel: '<No {{label}}>',
      noOptions: '選択肢なし',
      noResults:
        '{{label}} データが見つかりませんでした。データが存在しない、または、絞り込みに一致するものがありません。',
      noValue: '未設定',
      none: 'なし',
      notFound: 'Not Found',
      nothingFound: 'Nothing found',
      of: '/',
      open: '開く',
      or: 'または',
      order: '表示順',
      pageNotFound: 'ページが見つかりません',
      password: 'パスワード',
      payloadSettings: 'Payload 設定',
      perPage: '表示件数: {{limit}}',
      remove: '削除',
      reset: 'リセット',
      row: '列',
      rows: '列',
      save: '保存',
      saving: '保存しています...',
      searchBy: '{{label}} で検索',
      selectAll: 'すべての{{count}}つの{{label}}を選択',
      selectAllRows: 'すべての行を選択します',
      selectValue: '値を選択',
      selectedCount: '{{count}}つの{{label}}を選択中',
      showAllLabel: 'すべての{{label}}を表示する',
      sorryNotFound: '申し訳ありません。リクエストに対応する内容が見つかりませんでした。',
      sort: '並び替え',
      sortByLabelDirection: '{{label}}により並べ替え {{direction}}',
      stayOnThisPage: 'この画面にとどまる',
      submissionSuccessful: '送信が成功しました。',
      submit: '送信',
      successfullyCreated: '{{label}} が作成されました。',
      successfullyDuplicated: '{{label}} が複製されました。',
      thisLanguage: 'Japanese',
      titleDeleted: '{{label}} "{{title}}" が削除されました。',
      unauthorized: '未認証',
      unsavedChangesDuplicate: '未保存の変更があります。複製を続けますか？',
      untitled: 'Untitled',
      updatedAt: '更新日',
      updatedCountSuccessfully: '{{count}}つの{{label}}を正常に更新しました。',
      updatedSuccessfully: '更新成功。',
      updating: '更新中',
      uploading: 'アップロード中',
      user: 'ユーザー',
      users: 'ユーザー',
      value: '値',
      welcome: 'ようこそ',
    },
    operators: {
      contains: '含む',
      equals: '等しい',
      exists: '存在す',
      isGreaterThan: 'より大きい',
      isGreaterThanOrEqualTo: '以上',
      isIn: 'あります',
      isLessThan: 'より小さい',
      isLessThanOrEqualTo: '以下',
      isLike: 'のような',
      isNotEqualTo: '等しくない',
      isNotIn: '入っていません',
      near: '近く',
    },
    upload: {
      crop: 'クロップ',
      cropToolDescription:
        '選択したエリアのコーナーをドラッグしたり、新たなエリアを描画したり、下記の値を調整してください。',
      dragAndDrop: 'ファイルをドラッグ アンド ドロップする',
      dragAndDropHere: 'または、このエリアにファイルをドラッグ & ドロップ',
      editImage: '画像を編集する',
      fileName: 'ファイル名',
      fileSize: 'ファイル容量',
      focalPoint: '焦点',
      focalPointDescription: 'プレビュー上で焦点を直接ドラッグするか、下の値を調整してください。',
      height: '高さ',
      lessInfo: '詳細を隠す',
      moreInfo: '詳細を表示',
      previewSizes: 'プレビューサイズ',
      selectCollectionToBrowse: '閲覧するコレクションを選択',
      selectFile: 'ファイルを選択',
      setCropArea: 'クロップエリアを設定する',
      setFocalPoint: '焦点を設定する',
      sizes: '容量',
      sizesFor: '{{label}}のサイズ',
      width: '横幅',
    },
    validation: {
      emailAddress: '有効なメールアドレスを入力してください。',
      enterNumber: '有効な数値を入力してください。',
      fieldHasNo: '{{label}} が必要です。',
      greaterThanMax: '{{value}}は許容最大{{label}}の{{max}}を超えています。',
      invalidInput: '無効な入力値です。',
      invalidSelection: '無効な選択です。',
      invalidSelections: '次の無効な選択があります: ',
      lessThanMin: '{{value}}は許容最小{{label}}の{{min}}未満です。',
      limitReached: '制限に達しました、{{max}}個以上のアイテムを追加することはできません。',
      longerThanMin: '{{minLength}} 文字以上にする必要があります。',
      notValidDate: '"{{value}}" は有効な日付ではありません。',
      required: '必須フィールドです。',
      requiresAtLeast: '少なくとも {{count}} {{label}} 以上が必要です。',
      requiresNoMoreThan: '最大で {{count}} {{label}} 以下にする必要があります。',
      requiresTwoNumbers: '2つの数値が必要です。',
      shorterThanMax: '{{maxLength}} 文字以下にする必要があります。',
      trueOrFalse: '"true" または "false" の値にする必要があります。',
      validUploadID: '有効なアップロードIDではありません。',
    },
    version: {
      type: 'タイプ',
      aboutToPublishSelection:
        '選択中のすべての{{label}}を公開しようとしています。よろしいですか？',
      aboutToRestore:
        'この {{label}} データを {{versionDate}} 時点のバージョンに復元しようとしています。',
      aboutToRestoreGlobal:
        'グローバルな {{label}} データを {{versionDate}} 時点のバージョンに復元しようとしています。',
      aboutToRevertToPublished:
        'このデータの変更を公開時の状態に戻そうとしています。よろしいですか？',
      aboutToUnpublish: 'このデータを非公開にしようとしています。よろしいですか？',
      aboutToUnpublishSelection:
        '選択したすべての{{label}}の公開を取り消そうとしています。よろしいですか？',
      autosave: '自動保存',
      autosavedSuccessfully: '自動保存に成功しました。',
      autosavedVersion: '自動保存されたバージョン',
      changed: '変更済み',
      compareVersion: 'バージョンを比較:',
      confirmPublish: '公開を確認する',
      confirmRevertToSaved: '保存された状態に戻す確認',
      confirmUnpublish: '非公開の確認',
      confirmVersionRestoration: 'バージョン復元の確認',
      currentDocumentStatus: '現在の {{docStatus}} データ',
      draft: 'ドラフト',
      draftSavedSuccessfully: '下書きは正常に保存されました。',
      lastSavedAgo: '{{distance}}前に最後に保存されました',
      noFurtherVersionsFound: 'その他のバージョンは見つかりませんでした。',
      noRowsFound: '{{label}} は未設定です',
      preview: 'プレビュー',
      problemRestoringVersion: 'このバージョンの復元に問題がありました。',
      publish: '公開する',
      publishChanges: '変更内容を公開',
      published: '公開済み',
      publishing: '公開',
      restoreThisVersion: 'このバージョンを復元',
      restoredSuccessfully: '正常に復元されました。',
      restoring: '復元しています...',
      revertToPublished: '公開時の内容に戻す',
      reverting: '内容を戻しています...',
      saveDraft: 'ドラフトを保存',
      selectLocales: '表示するロケールを選択',
      selectVersionToCompare: '比較するバージョンを選択',
      showLocales: 'ロケールを表示:',
      showingVersionsFor: '次のバージョンを表示します：',
      status: 'ステータス',
      unpublish: '非公開',
      unpublishing: '非公開中...',
      version: 'バージョン',
      versionCount_many: '{{count}} バージョンがあります',
      versionCount_none: 'バージョンがありません',
      versionCount_one: '{{count}} バージョンがあります',
      versionCount_other: '{{count}}バージョンが見つかりました',
      versionCreatedOn: '{{version}} 作成日時:',
      versionID: 'バージョンID',
      versions: 'バージョン',
      viewingVersion: '表示バージョン: {{entityLabel}} {{documentTitle}}',
      viewingVersionGlobal: '表示バージョン: グローバルな {{entityLabel}}',
      viewingVersions: '表示バージョン: {{entityLabel}} {{documentTitle}}',
      viewingVersionsGlobal: '表示バージョン: グローバルな {{entityLabel}}',
    },
  },
}
