type AdminSidebarState = 'collapsed' | 'expanded';

const STORAGE_KEY = 'astro-whono:admin-sidebar:state';
const COLLAPSED: AdminSidebarState = 'collapsed';
const EXPANDED: AdminSidebarState = 'expanded';

const isAdminSidebarState = (value: string | undefined): value is AdminSidebarState =>
  value === COLLAPSED || value === EXPANDED;

const readStoredState = (): AdminSidebarState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const state = stored ?? undefined;
    return isAdminSidebarState(state) ? state : null;
  } catch (_) {
    return null;
  }
};

const writeStoredState = (state: AdminSidebarState) => {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch (_) {}
};

export function initAdminSidebarToggle() {
  if (!document.body.classList.contains('admin-page')) return;

  const root = document.documentElement;
  const button = document.getElementById('admin-sidebar-toggle');
  if (!(button instanceof HTMLButtonElement)) return;

  const initialState = root.dataset.adminSidebar;
  let current: AdminSidebarState = isAdminSidebarState(initialState)
    ? initialState
    : (readStoredState() ?? EXPANDED);

  const applyState = (state: AdminSidebarState, persist: boolean) => {
    current = state;
    root.dataset.adminSidebar = state;

    const isCollapsed = state === COLLAPSED;
    const label = isCollapsed ? '展开侧栏' : '收起侧栏';
    button.setAttribute('aria-pressed', isCollapsed ? 'true' : 'false');
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);

    if (persist) writeStoredState(state);
  };

  applyState(current, false);

  button.addEventListener('click', () => {
    applyState(current === COLLAPSED ? EXPANDED : COLLAPSED, true);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminSidebarToggle, { once: true });
} else {
  initAdminSidebarToggle();
}
