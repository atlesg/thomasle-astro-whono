import { describe, expect, it } from 'vitest';
import {
  ADMIN_CONTENT_BODY_IMAGE_UPLOAD_COLLECTION_KEYS,
  ADMIN_CONTENT_COLLECTION_KEYS,
  ADMIN_CONTENT_DELETABLE_COLLECTION_KEYS,
  ADMIN_CONTENT_EXPORTABLE_COLLECTION_KEYS,
  ADMIN_CONTENT_IMAGE_UPLOAD_COLLECTION_KEYS,
  ADMIN_CONTENT_WRITE_COLLECTION_KEYS,
  getAdminContentCollectionCapability,
  getAdminContentFixedPageCapability,
  isAdminContentBodyImageUploadCollectionKey,
  isAdminContentDeletableCollectionKey,
  isAdminContentExportableCollectionKey,
  isAdminContentImageUploadCollectionKey,
  isAdminContentWriteCollectionKey
} from '../src/lib/admin-console/content-shared';
import {
  ADMIN_CONTENT_COLLECTIONS,
  ADMIN_CONTENT_SCOPE_OPTIONS
} from '../src/lib/admin-console/content';

describe('admin content collection capabilities', () => {
  it('keeps about visible and exportable without entering write/delete/upload capabilities', () => {
    expect(ADMIN_CONTENT_COLLECTION_KEYS).toEqual(['essay', 'bits', 'memo', 'about']);
    expect(ADMIN_CONTENT_COLLECTIONS).toEqual(['essay', 'bits', 'memo', 'about']);
    expect(ADMIN_CONTENT_SCOPE_OPTIONS.map((option) => option.value)).toEqual(['all', 'essay', 'bits', 'memo', 'about']);

    expect(ADMIN_CONTENT_WRITE_COLLECTION_KEYS).toEqual(['essay', 'bits', 'memo']);
    expect(ADMIN_CONTENT_DELETABLE_COLLECTION_KEYS).toEqual(['essay', 'bits']);
    expect(ADMIN_CONTENT_IMAGE_UPLOAD_COLLECTION_KEYS).toEqual(['essay', 'bits', 'memo']);
    expect(ADMIN_CONTENT_BODY_IMAGE_UPLOAD_COLLECTION_KEYS).toEqual(['essay', 'memo']);
    expect(ADMIN_CONTENT_EXPORTABLE_COLLECTION_KEYS).toEqual(['essay', 'bits', 'memo', 'about']);

    expect(isAdminContentWriteCollectionKey('about')).toBe(false);
    expect(isAdminContentDeletableCollectionKey('about')).toBe(false);
    expect(isAdminContentImageUploadCollectionKey('about')).toBe(false);
    expect(isAdminContentBodyImageUploadCollectionKey('about')).toBe(false);
    expect(isAdminContentExportableCollectionKey('about')).toBe(true);

    expect(getAdminContentFixedPageCapability('about')).toEqual({
      entryId: 'index',
      sourcePath: 'src/content/about/index.md'
    });
    expect(getAdminContentCollectionCapability('about')).toMatchObject({
      label: '关于',
      visible: true,
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
      imagePicker: false
    });
  });
});
