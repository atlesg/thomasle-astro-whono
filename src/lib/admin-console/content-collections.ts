export type AdminContentCollectionKey = 'essay' | 'bits' | 'memo' | 'about';

export type AdminContentFixedPageCapability = {
  entryId: 'index';
  sourcePath: string;
};

export type AdminContentCollectionCapability = {
  collection: AdminContentCollectionKey;
  label: string;
  consoleSectionHref: string;
  fixedPage: AdminContentFixedPageCapability | null;
  visible: boolean;
  writable: boolean;
  exportable: boolean;
  deletable: boolean;
  create: boolean;
  multiEntry: boolean;
  articleFilters: boolean;
  pagination: boolean;
  bodySearch: boolean;
  bodyImageUpload: boolean;
  imageUpload: boolean;
  imagePicker: boolean;
  readonlyReason: string | null;
  deleteUnsupportedReason: string | null;
};

export const ADMIN_CONTENT_COLLECTION_KEYS = ['essay', 'bits', 'memo', 'about'] as const satisfies readonly AdminContentCollectionKey[];

export const ADMIN_CONTENT_COLLECTION_CAPABILITIES = {
  essay: {
    collection: 'essay',
    label: '随笔',
    consoleSectionHref: '/essay/',
    fixedPage: null,
    visible: true,
    writable: true,
    exportable: true,
    deletable: true,
    create: false,
    multiEntry: true,
    articleFilters: true,
    pagination: true,
    bodySearch: true,
    bodyImageUpload: true,
    imageUpload: true,
    imagePicker: false,
    readonlyReason: null,
    deleteUnsupportedReason: null
  },
  bits: {
    collection: 'bits',
    label: '絮语',
    consoleSectionHref: '/bits/',
    fixedPage: null,
    visible: true,
    writable: true,
    exportable: true,
    deletable: true,
    create: false,
    multiEntry: true,
    articleFilters: true,
    pagination: true,
    bodySearch: true,
    bodyImageUpload: false,
    imageUpload: true,
    imagePicker: true,
    readonlyReason: null,
    deleteUnsupportedReason: null
  },
  memo: {
    collection: 'memo',
    label: '小记',
    consoleSectionHref: '/memo/',
    fixedPage: {
      entryId: 'index',
      sourcePath: 'src/content/memo/index.md'
    },
    visible: true,
    writable: true,
    exportable: true,
    deletable: false,
    create: false,
    multiEntry: false,
    articleFilters: false,
    pagination: false,
    bodySearch: true,
    bodyImageUpload: true,
    imageUpload: true,
    imagePicker: false,
    readonlyReason: null,
    deleteUnsupportedReason: 'memo 是固定单页内容，不支持从 Content Console 删除'
  },
  about: {
    collection: 'about',
    label: '关于',
    consoleSectionHref: '/about/',
    fixedPage: {
      entryId: 'index',
      sourcePath: 'src/content/about/index.md'
    },
    visible: true,
    // PR1 only prepares the fixed-page capability and list/source contract.
    // The structured about write plan and editor workspace are enabled in the next PR.
    writable: false,
    exportable: true,
    deletable: false,
    create: false,
    multiEntry: false,
    articleFilters: false,
    pagination: false,
    bodySearch: true,
    bodyImageUpload: false,
    imageUpload: false,
    imagePicker: false,
    readonlyReason: 'about 固定页编辑器尚未接入；当前仅支持从 Content Console 查看与导出源文件',
    deleteUnsupportedReason: 'about 是固定单页内容，不支持从 Content Console 删除'
  }
} as const satisfies Record<AdminContentCollectionKey, AdminContentCollectionCapability>;

type CollectionKeysWithCapability<Capability extends keyof AdminContentCollectionCapability> = {
  [Collection in AdminContentCollectionKey]:
    (typeof ADMIN_CONTENT_COLLECTION_CAPABILITIES)[Collection][Capability] extends true
      ? Collection
      : never;
}[AdminContentCollectionKey];

export type AdminContentWriteCollectionKey = CollectionKeysWithCapability<'writable'>;
export type AdminContentBodyImageUploadCollectionKey = CollectionKeysWithCapability<'bodyImageUpload'>;
export type AdminContentImageUploadCollectionKey = CollectionKeysWithCapability<'imageUpload'>;
export type AdminContentDeletableCollectionKey = CollectionKeysWithCapability<'deletable'>;
export type AdminContentExportableCollectionKey = CollectionKeysWithCapability<'exportable'>;

export const ADMIN_CONTENT_WRITE_COLLECTION_KEYS = ADMIN_CONTENT_COLLECTION_KEYS
  .filter((collection): collection is AdminContentWriteCollectionKey =>
    ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection].writable);

export const ADMIN_CONTENT_BODY_IMAGE_UPLOAD_COLLECTION_KEYS = ADMIN_CONTENT_COLLECTION_KEYS
  .filter((collection): collection is AdminContentBodyImageUploadCollectionKey =>
    ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection].bodyImageUpload);

export const ADMIN_CONTENT_IMAGE_UPLOAD_COLLECTION_KEYS = ADMIN_CONTENT_COLLECTION_KEYS
  .filter((collection): collection is AdminContentImageUploadCollectionKey =>
    ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection].imageUpload);

export const ADMIN_CONTENT_DELETABLE_COLLECTION_KEYS = ADMIN_CONTENT_COLLECTION_KEYS
  .filter((collection): collection is AdminContentDeletableCollectionKey =>
    ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection].deletable);

export const ADMIN_CONTENT_EXPORTABLE_COLLECTION_KEYS = ADMIN_CONTENT_COLLECTION_KEYS
  .filter((collection): collection is AdminContentExportableCollectionKey =>
    ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection].exportable);

export const getAdminContentCollectionCapability = (
  collection: AdminContentCollectionKey
): AdminContentCollectionCapability =>
  ADMIN_CONTENT_COLLECTION_CAPABILITIES[collection];

export const getAdminContentFixedPageCapability = (
  collection: AdminContentCollectionKey
): AdminContentFixedPageCapability | null =>
  getAdminContentCollectionCapability(collection).fixedPage;

export const isAdminContentCollectionKey = (value: string): value is AdminContentCollectionKey =>
  (ADMIN_CONTENT_COLLECTION_KEYS as readonly string[]).includes(value);

export const isAdminContentWriteCollectionKey = (value: string): value is AdminContentWriteCollectionKey =>
  isAdminContentCollectionKey(value) && getAdminContentCollectionCapability(value).writable;

export const isAdminContentBodyImageUploadCollectionKey = (value: string): value is AdminContentBodyImageUploadCollectionKey =>
  isAdminContentCollectionKey(value) && getAdminContentCollectionCapability(value).bodyImageUpload;

export const isAdminContentImageUploadCollectionKey = (value: string): value is AdminContentImageUploadCollectionKey =>
  isAdminContentCollectionKey(value) && getAdminContentCollectionCapability(value).imageUpload;

export const isAdminContentDeletableCollectionKey = (value: string): value is AdminContentDeletableCollectionKey =>
  isAdminContentCollectionKey(value) && getAdminContentCollectionCapability(value).deletable;

export const isAdminContentExportableCollectionKey = (value: string): value is AdminContentExportableCollectionKey =>
  isAdminContentCollectionKey(value) && getAdminContentCollectionCapability(value).exportable;
