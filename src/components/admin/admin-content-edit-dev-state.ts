import type {
  AdminContentCollectionKey
} from '../../lib/admin-console/content';
import {
  readAdminContentEntryEditorPayload,
  type AdminContentEditorPayload
} from '../../lib/admin-console/content-shared';
import {
  createEmptyAdminContentEditorOutlines,
  getAdminContentEditorPageRegistration,
  loadAdminContentEditorBaseStyleHrefs,
  loadAdminContentEditorOutlines,
  loadAdminContentEditorStyleHrefs,
  type AdminContentEditorOutlines,
  type AdminContentEditorOutlineRegistration,
  type AdminContentEditorStyleSlot
} from './admin-content-editor-registry';

type WithBase = (path: string) => string;
type ReadEditorPayload = (
  collection: AdminContentCollectionKey,
  entryId: string
) => Promise<AdminContentEditorPayload>;
type LoadStyleSlot = (slot: AdminContentEditorStyleSlot) => Promise<string>;
type LoadOutlines = (
  registration: AdminContentEditorOutlineRegistration,
  withBase: WithBase
) => Promise<AdminContentEditorOutlines>;

type LoadAdminContentEditDevStateInput = {
  collection: AdminContentCollectionKey;
  entryId: string;
  adminShellStylesHref: string;
  withBase: WithBase;
  readPayload?: ReadEditorPayload;
  loadStyleSlot?: LoadStyleSlot;
  loadOutlines?: LoadOutlines;
};

export type AdminContentEditDevState = {
  payload: AdminContentEditorPayload;
  outlines: AdminContentEditorOutlines;
  stylesHref: string[];
};

export const loadAdminContentEditDevState = async ({
  collection,
  entryId,
  adminShellStylesHref,
  withBase,
  readPayload = readAdminContentEntryEditorPayload,
  loadStyleSlot,
  loadOutlines = loadAdminContentEditorOutlines
}: LoadAdminContentEditDevStateInput): Promise<AdminContentEditDevState> => {
  const payload = await readPayload(collection, entryId);

  if (!payload.writable) {
    const baseStylesHref = await loadAdminContentEditorBaseStyleHrefs(loadStyleSlot);
    return {
      payload,
      outlines: createEmptyAdminContentEditorOutlines(),
      stylesHref: [adminShellStylesHref, ...baseStylesHref]
    };
  }

  const registration = getAdminContentEditorPageRegistration(payload.collection);
  const [editorStylesHref, outlines] = await Promise.all([
    loadAdminContentEditorStyleHrefs(registration.styleSlots, loadStyleSlot),
    loadOutlines(registration, withBase)
  ]);

  return {
    payload,
    outlines,
    stylesHref: [adminShellStylesHref, ...editorStylesHref]
  };
};
