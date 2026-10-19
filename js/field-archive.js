document.addEventListener('DOMContentLoaded', () => {
  const cover = document.querySelector('[data-archive-cover]');
  const index = document.querySelector('[data-archive-index]');
  const files = [...document.querySelectorAll('[data-profile]')];
  const dossiers = [...document.querySelectorAll('[data-open-profile]')];
  const search = document.querySelector('#archive-search');
  const empty = document.querySelector('.archive-empty');
  if (!cover || !index || !files.length || !dossiers.length || !search || !empty) return;

  const profileIds = files.map((file) => file.dataset.profile);
  const fileById = new Map(files.map((file) => [file.dataset.profile, file]));
  const title = 'X-Men Field Archive';

  function renderRoute(moveFocus = false) {
    const profileId = window.location.hash.slice(1);
    const activeFile = fileById.get(profileId);
    cover.hidden = Boolean(activeFile);
    index.hidden = Boolean(activeFile);
    files.forEach((file) => { file.hidden = file !== activeFile; });
    document.title = activeFile
      ? `${activeFile.querySelector('.file-hero h2')?.textContent || 'Character file'} - X-Men Field Archive`
      : `${title} - MutantComms`;
    if (moveFocus && activeFile) {
      activeFile.querySelector('.file-hero h2')?.focus();
      activeFile.scrollIntoView({ block: 'start' });
    } else if (moveFocus) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function visit(profileId) {
    if (!fileById.has(profileId)) return;
    if (window.location.hash === `#${profileId}`) {
      renderRoute(true);
      return;
    }
    window.location.hash = profileId;
  }

  dossiers.forEach((button) => {
    button.addEventListener('click', () => visit(button.dataset.openProfile));
  });

  files.forEach((file, indexInList) => {
    file.dataset.mark = dossiers[indexInList]?.querySelector('.dossier-glyph')?.textContent.trim() || 'X';
    const header = file.querySelector('.file-header');
    const back = header?.querySelector('.back-to-index');
    if (back) back.addEventListener('click', () => {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`);
      renderRoute(true);
    });

    const pager = document.createElement('nav');
    pager.className = 'profile-pager';
    pager.setAttribute('aria-label', 'Character file navigation');
    [
      [profileIds[(indexInList - 1 + profileIds.length) % profileIds.length], '← Previous file'],
      [profileIds[(indexInList + 1) % profileIds.length], 'Next file →']
    ].forEach(([profileId, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => visit(profileId));
      pager.append(button);
    });
    file.append(pager);
  });

  document.querySelectorAll('.file-sources a[href^="http"], .archive-research-links a[href^="http"]')
    .forEach((link) => {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${link.textContent.trim()} (opens in a new tab)`);
    });

  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    dossiers.forEach((button) => {
      const searchableText = `${button.dataset.search || ''} ${button.textContent}`.toLocaleLowerCase();
      const visible = !query || searchableText.includes(query);
      button.hidden = !visible;
      if (visible) matches += 1;
    });
    empty.hidden = matches > 0;
  });

  window.addEventListener('hashchange', () => renderRoute(true));
  renderRoute();
});
