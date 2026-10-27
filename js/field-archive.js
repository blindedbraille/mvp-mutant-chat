document.addEventListener('DOMContentLoaded', () => {
  const cover = document.querySelector('[data-archive-cover]');
  const index = document.querySelector('[data-archive-index]');
  const files = [...document.querySelectorAll('[data-profile]')];
  const dossiers = [...document.querySelectorAll('[data-open-profile]')];
  const search = document.querySelector('#archive-search');
  const empty = document.querySelector('.archive-empty');
  if (!cover || !index || !files.length || !dossiers.length || !search || !empty) return;

  const artwork = {
    wolverine: ['wolverine-pfp.webp', 'center 24%'],
    storm: ['storm-pfp.jpg', 'center 27%'],
    deadpool: ['deadpool-pfp.jpg', 'center 35%'],
    'jean-grey': ['marvel-girl-pfp.jpeg', 'center 24%'],
    beast: ['beast-pfp.webp', 'center 25%'],
    cable: ['cable-pfp.jpg', 'center 38%'],
    cyclops: ['cyclops-pfp.webp', 'center 48%'],
    'professor-x': ['prof-x-pfp.avif', 'center 18%'],
    magneto: ['magneto-pfp.webp', 'center 34%'],
    nightcrawler: ['nightcrawler-pfp.webp', 'center 35%'],
    rogue: ['rogue-pfp.webp', 'center 48%']
  };
  const profileIds = files.map((file) => file.dataset.profile);
  const fileById = new Map(files.map((file) => [file.dataset.profile, file]));
  const title = 'X-Men Field Archive';

  dossiers.forEach((card) => {
    const profileId = card.dataset.openProfile;
    const imageData = artwork[profileId];
    if (!imageData) {
      console.error(`MutantComms has no archive artwork for "${profileId}".`);
      return;
    }
    const image = document.createElement('img');
    image.className = 'dossier-art';
    image.src = `images/${imageData[0]}`;
    image.alt = '';
    image.loading = 'lazy';
    image.style.objectPosition = imageData[1];
    card.prepend(image);
  });

  files.forEach((file) => {
    const profileId = file.dataset.profile;
    const imageData = artwork[profileId];
    const hero = file.querySelector('.file-hero');
    const name = hero?.querySelector('h2')?.textContent.trim();
    if (!imageData || !hero || !name) {
      console.error(`MutantComms could not create the archive portrait for "${profileId}".`);
      return;
    }
    const image = document.createElement('img');
    image.className = 'file-portrait';
    image.src = `images/${imageData[0]}`;
    image.alt = `${name} comic artwork`;
    image.loading = 'lazy';
    image.style.objectPosition = imageData[1];
    hero.prepend(image);
  });

  function renderRoute(moveFocus = false) {
    const profileId = window.location.hash.slice(1);
    const activeFile = fileById.get(profileId);
    cover.hidden = Boolean(activeFile);
    index.hidden = Boolean(activeFile);
    files.forEach((file) => { file.hidden = file !== activeFile; });
    const portrait = activeFile?.querySelector('.file-portrait');
    if (portrait) portrait.loading = 'eager';
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
      [profileIds[(indexInList - 1 + profileIds.length) % profileIds.length], 'Previous file', 'fa-arrow-left'],
      [profileIds[(indexInList + 1) % profileIds.length], 'Next file', 'fa-arrow-right']
    ].forEach(([profileId, label, iconName], index) => {
      const button = document.createElement('button');
      button.type = 'button';
      const icon = document.createElement('i');
      icon.className = `fa-solid ${iconName}`;
      icon.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      text.textContent = label;
      if (index === 0) button.append(icon, text);
      else button.append(text, icon);
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
