document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_PREFIX = 'mutant-comms:';
  const PROFILE_META_KEY = `${STORAGE_PREFIX}profile:metadata`;
  const SPICY_MODE_KEY = `${STORAGE_PREFIX}settings:spicy`;
  const DOOM_COOLDOWN_KEY = `${STORAGE_PREFIX}easter-egg:doom`;
  const CHATS_RESET_KEY = `${STORAGE_PREFIX}chats:reset`;
  const ACTIVE_CONVERSATION_PREFIX = `${STORAGE_PREFIX}active:`;
  const DOOM_COOLDOWN_MS = 5 * 60 * 1000;
  const AVATAR_DB_NAME = 'mutant-comms-profile';
  const REACTIONS = ['❤️', '😂', '👍', '😮', '😢', '❗'];
  const REACTION_ICONS = {
    '❤️': 'fa-heart',
    '😂': 'fa-face-laugh',
    '👍': 'fa-thumbs-up',
    '😮': 'fa-face-surprise',
    '😢': 'fa-face-sad-tear',
    '❗': 'fa-circle-exclamation'
  };
  const REACTION_LABELS = {
    '❤️': 'love',
    '😂': 'laugh',
    '👍': 'like',
    '😮': 'surprise',
    '😢': 'sad',
    '❗': 'important'
  };
  const MAX_MESSAGE_LENGTH = 1200;
  const MAX_AVATAR_FILE_SIZE = 8 * 1024 * 1024;
  const AVATAR_SIZE = 512;
  const CHARACTER_AVATARS = {
    'Gold Squad': 'images/gold-squad-pfp.jpeg',
    Deadpool: 'images/deadpool-pfp.jpg',
    Cable: 'images/cable-pfp.jpg',
    Wolverine: 'images/wolverine-pfp.webp',
    Storm: 'images/storm-pfp.jpg',
    Beast: 'images/beast-pfp.webp',
    'Marvel Girl': 'images/marvel-girl-pfp.jpeg',
    'Professor X': 'images/prof-x-pfp.avif'
  };
  const AVATAR_POSITIONS = {
    'Gold Squad': '50% 50%',
    Deadpool: '50% 42%',
    Cable: '50% 42%',
    Wolverine: '50% 28%',
    Storm: '50% 27%',
    Beast: '50% 43%',
    'Marvel Girl': '50% 29%',
    'Professor X': '50% 32%'
  };
  const CHARACTER_PROFILES = {
    'Gold Squad': {
      fullName: 'X-Men Gold Squad',
      codename: 'Gold Squad',
      channel: 'X-616-GOLD',
      biography: 'A close-knit field team coordinating missions and looking out for one another.',
      powers: 'A team of specialists with a wide range of mutant abilities.',
      team: 'X-Men',
      status: '8 members on comms',
      avatar: CHARACTER_AVATARS['Gold Squad']
    },
    Wolverine: {
      fullName: 'James Howlett (Logan)',
      codename: 'Wolverine',
      channel: 'X-616-LOGAN',
      biography: 'A veteran X-Man whose long life has taught him to trust actions over promises.',
      powers: 'Accelerated healing, heightened senses, and retractable claws.',
      team: 'X-Men',
      status: 'Online',
      avatar: CHARACTER_AVATARS.Wolverine
    },
    Deadpool: {
      fullName: 'Wade Wilson',
      codename: 'Deadpool',
      channel: 'X-616-WADE',
      biography: 'A mercenary with a sharp tongue, an unpredictable sense of humor, and a soft spot for his friends.',
      powers: 'Accelerated healing and exceptional combat skills.',
      team: 'Independent ally',
      status: 'Online',
      avatar: CHARACTER_AVATARS.Deadpool
    },
    Cable: {
      fullName: 'Nathan Summers',
      codename: 'Cable',
      channel: 'X-616-NATHAN',
      biography: 'A soldier from a possible future who plans carefully and protects his family.',
      powers: 'Telepathy, telekinesis, and extensive tactical training.',
      team: 'X-Men',
      status: 'Online',
      avatar: CHARACTER_AVATARS.Cable
    },
    Storm: {
      fullName: 'Ororo Munroe',
      codename: 'Storm',
      channel: 'X-616-ORORO',
      biography: 'A compassionate leader whose strength is matched by her care for others.',
      powers: 'Weather manipulation, including wind, rain, and lightning.',
      team: 'X-Men',
      status: 'Online',
      avatar: CHARACTER_AVATARS.Storm
    },
    Beast: {
      fullName: 'Dr. Henry "Hank" McCoy',
      codename: 'Beast',
      channel: 'X-616-HANK',
      biography: 'A brilliant scientist, teacher, and longtime member of the X-Men.',
      powers: 'Enhanced strength, agility, and a remarkable intellect.',
      team: 'X-Men',
      status: 'On campus',
      avatar: CHARACTER_AVATARS.Beast
    },
    'Marvel Girl': {
      fullName: 'Jean Grey',
      codename: 'Marvel Girl / Phoenix',
      channel: 'X-616-JEAN',
      biography: 'A thoughtful hero and devoted friend who continues to define herself on her own terms.',
      powers: 'Telepathy and telekinesis.',
      team: 'X-Men',
      status: 'Online',
      avatar: CHARACTER_AVATARS['Marvel Girl']
    },
    Cyclops: {
      fullName: 'Scott Summers',
      codename: 'Cyclops',
      channel: 'X-616-SCOTT',
      biography: 'A disciplined field leader who keeps the team focused under pressure.',
      powers: 'Optic energy blasts, controlled by his ruby-quartz visor.',
      team: 'X-Men',
      status: 'On mission',
      avatar: ''
    },
    'Professor X': {
      fullName: 'Charles Xavier',
      codename: 'Professor X',
      channel: 'X-616-XAVIER',
      biography: 'Founder of the X-Men and head of a school built to help young mutants thrive.',
      powers: 'Powerful telepathy and the Cerebro detection system.',
      team: 'X-Men / Xavier Institute',
      status: 'Available',
      avatar: CHARACTER_AVATARS['Professor X']
    }
  };
  const CHARACTER_COLORS = {
    'Professor X': '#445478',
    Beast: '#315f54',
    Cyclops: '#3158bf',
    'Marvel Girl': '#963a57'
  };
  const PROFILE_VIBES = ['', 'Funny', 'Serious', 'Mysterious', 'Stylish', 'Chaotic'];
  const LEGACY_AUTHOR_NAMES = {
    Oriana: 'Storm',
    Loren: 'Wolverine',
    Wes: 'Deadpool',
    Nolan: 'Cable',
    Harlan: 'Beast',
    Jenna: 'Marvel Girl',
    Simon: 'Cyclops',
    Calvin: 'Professor X'
  };
  const phone = document.querySelector('.phone-shell');
  const pageTitle = document.querySelector('.chat-title h1')?.textContent.trim() || '';
  const conversation = phone?.dataset.conversationId ||
    pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const isChatPage = Boolean(document.querySelector('.chat-messages'));
  const pageInstanceId = window.crypto?.randomUUID?.() ||
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  let profileImageUrl = '';
  let conversationIsLeaving = false;
  let currentProfileMeta = normalizeProfileMeta(readStorage(PROFILE_META_KEY, {
    revision: 0,
    acknowledgedRevision: 0,
    lastReactionAt: 0,
    hasPicture: false,
    vibe: ''
  }));
  let spicyMode = readStorage(SPICY_MODE_KEY, false) === true;
  let doomCooldownUntil = 0;

  function readStorage(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? fallback : JSON.parse(stored);
    } catch (error) {
      console.error(`MutantComms could not read localStorage key "${key}".`, error);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`MutantComms could not save localStorage key "${key}".`, error);
      return false;
    }

  }

  function normalizeProfileMeta(value, fallback = null) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      console.error('MutantComms found invalid saved profile metadata.');
      return fallback || { revision: 0, acknowledgedRevision: 0, lastReactionAt: 0, hasPicture: false, vibe: '' };
    }
    const vibe = PROFILE_VIBES.includes(value.vibe) ? value.vibe : '';
    if (value.vibe && !PROFILE_VIBES.includes(value.vibe)) {
      console.error('MutantComms found an unsupported saved avatar vibe.');
    }
    return {
      ...value,
      revision: Math.max(0, Number(value.revision) || 0),
      acknowledgedRevision: Math.max(0, Number(value.acknowledgedRevision) || 0),
      lastReactionAt: Math.max(0, Number(value.lastReactionAt) || 0),
      hasPicture: value.hasPicture === true,
      vibe
    };
  }

  function hash(value) {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return (result >>> 0).toString(36);
  }

  function formatTime(date = new Date()) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function messageStorageKey(name = conversation) {
    return `${STORAGE_PREFIX}messages:${name}`;
  }

  function reactionStorageKey() {
    return `${STORAGE_PREFIX}reactions:${conversation}`;
  }

  function activeConversationKey(name = conversation) {
    return `${ACTIVE_CONVERSATION_PREFIX}${name}:${pageInstanceId}`;
  }

  function hasActiveConversation(name) {
    const prefix = `${ACTIVE_CONVERSATION_PREFIX}${name}:`;
    const now = Date.now();
    let active = false;
    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith(prefix)) continue;
        const lastSeen = Number(JSON.parse(localStorage.getItem(key) || '0'));
        if (Number.isFinite(lastSeen) && now - lastSeen < 15_000) {
          active = true;
        } else {
          localStorage.removeItem(key);
          index -= 1;
        }
      }
    } catch (error) {
      console.error(`MutantComms could not check active conversation "${name}".`, error);
    }
    return active;
  }

  function displayAuthor(name) {
    return LEGACY_AUTHOR_NAMES[name] || name;
  }

  function avatarInitials(name) {
    if (name === 'You') return 'YOU';
    if (name === 'Gold Squad') return 'GS';
    return String(name || '?').split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase();
  }

  function decorateAvatar(element, name, isUser = false) {
    if (!element) return;
    element.dataset.avatarFor = isUser ? 'You' : name;
    const avatarColors = {
      You: '#3158bf',
      Wolverine: '#806020',
      Deadpool: '#9a2933',
      Storm: '#5661a7',
      Cable: '#53606d',
      'Gold Squad': '#786631',
      ...CHARACTER_COLORS
    };
    element.style.setProperty('--avatar-bg', avatarColors[isUser ? 'You' : name] || '#596579');
    element.style.setProperty('--avatar-position', isUser ? '50% 50%' : AVATAR_POSITIONS[name] || '50% 50%');
    element.textContent = isUser ? 'YOU' : avatarInitials(name);
    element.style.backgroundImage = '';
    if (isUser && profileImageUrl) {
      element.textContent = '';
      element.style.backgroundImage = `url("${profileImageUrl}")`;
    } else if (!isUser && CHARACTER_AVATARS[name]) {
      element.textContent = '';
      element.style.backgroundImage = `url("${CHARACTER_AVATARS[name]}")`;
    }
  }

  function decorateVisibleAvatars() {
    document.querySelectorAll('.message-avatar').forEach((avatar) => {
      const isUser = avatar.dataset.avatarFor === 'You';
      decorateAvatar(avatar, avatar.dataset.avatarFor, isUser);
    });
    document.querySelectorAll('.conversation-item').forEach((item) => {
      const avatar = item.querySelector('.avatar');
      const title = item.querySelector('.conversation-top h3')?.textContent.trim() || '';
      decorateAvatar(avatar, title, false);
    });
    const headingAvatar = document.querySelector('.chat-user .group-avatar');
    if (headingAvatar) {
      const heading = pageTitle || 'Gold Squad';
      decorateAvatar(headingAvatar, heading, false);
    }
  }

  function openAvatarDatabase() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject(new Error('This browser does not support local profile-picture storage.'));
        return;
      }
      const request = indexedDB.open(AVATAR_DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('avatars')) {
          request.result.createObjectStore('avatars');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open local profile-picture storage.'));
      request.onblocked = () => reject(new Error('Profile-picture storage is blocked by another open tab.'));
    });
  }

  async function readProfilePicture() {
    const database = await openAvatarDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('avatars', 'readonly');
      const request = transaction.objectStore('avatars').get('profile');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Could not load the saved profile picture.'));
      transaction.oncomplete = () => database.close();
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error('Could not read profile-picture storage.'));
      };
    });
  }

  async function writeProfilePicture(blob) {
    const database = await openAvatarDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('avatars', 'readwrite');
      transaction.objectStore('avatars').put(blob, 'profile');
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error('Could not save the profile picture.'));
      };
      transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error('Saving the profile picture was interrupted.'));
      };
    });
  }

  async function deleteProfilePicture() {
    const database = await openAvatarDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('avatars', 'readwrite');
      transaction.objectStore('avatars').delete('profile');
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error('Could not remove the profile picture.'));
      };
      transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error('Removing the profile picture was interrupted.'));
      };
    });
  }

  function useProfilePicture(blob) {
    if (profileImageUrl) URL.revokeObjectURL(profileImageUrl);
    profileImageUrl = blob instanceof Blob ? URL.createObjectURL(blob) : '';
    decorateVisibleAvatars();
    const preview = document.querySelector('.profile-picture-preview');
    if (preview) {
      if (profileImageUrl) {
        preview.src = profileImageUrl;
        preview.hidden = false;
        document.querySelector('.profile-picture-placeholder').hidden = true;
      } else {
        preview.removeAttribute('src');
        preview.hidden = true;
        const placeholder = document.querySelector('.profile-picture-placeholder');
        if (placeholder) placeholder.hidden = false;
      }
    }
  }

  function conversationItemId(item) {
    const explicitId = item.dataset.conversationId;
    if (explicitId) return explicitId;
    const href = item.querySelector('a')?.getAttribute('href') || '';
    return href.replace(/\.html$/, '').split('/').pop() || '';
  }

  function formatPreviewTime(record) {
    const timestamp = Number(record.timestamp);
    if (!Number.isFinite(timestamp) || timestamp <= 0) return record.time || '';

    const elapsed = Math.max(0, Date.now() - timestamp);
    if (elapsed < 60_000) return 'Now';
    if (elapsed < 3_600_000) return `${Math.floor(elapsed / 60_000)}m ago`;
    if (elapsed < 86_400_000) return `${Math.floor(elapsed / 3_600_000)}h ago`;
    return new Date(timestamp).toLocaleDateString([], { month: 'numeric', day: 'numeric' });
  }

  function updateConversationPreview(item, record) {
    if (!record || typeof record.text !== 'string') return;
    const preview = item.querySelector('.conversation-bottom p');
    const time = item.querySelector('.conversation-top time');
    if (!preview || !time) return;

    const author = item.dataset.conversationId === 'gold-squad'
      ? `${displayAuthor(record.author || 'You')}: `
      : '';
    preview.textContent = `${author}${record.text}`;
    time.textContent = formatPreviewTime(record);

    const timestamp = Number(record.timestamp);
    if (Number.isFinite(timestamp) && timestamp > 0) {
      time.dateTime = new Date(timestamp).toISOString();
      item.dataset.lastActivity = String(timestamp);
    } else {
      time.removeAttribute('datetime');
      delete item.dataset.lastActivity;
    }
  }

  function updateHomeConversationPreviews() {
    const list = document.querySelector('.conversation-list');
    if (!list) return;

    const items = [...list.querySelectorAll('.conversation-item')];
    const originalOrder = new Map(items.map((item, index) => [item, index]));
    items.forEach((item) => {
      const history = readStorage(messageStorageKey(conversationItemId(item)), []);
      if (!Array.isArray(history)) {
        console.error(`MutantComms found invalid saved message history for "${conversationItemId(item)}".`);
        return;
      }
      const latest = [...history].reverse().find((record) =>
        record && typeof record.text === 'string' && typeof record.time === 'string');
      if (latest) updateConversationPreview(item, latest);
    });

    items.sort((left, right) => {
      const leftActivity = Number(left.dataset.lastActivity) || 0;
      const rightActivity = Number(right.dataset.lastActivity) || 0;
      return rightActivity - leftActivity || originalOrder.get(left) - originalOrder.get(right);
    });
    list.append(...items);
  }

  function createSettingsElement(tag, className = '', text = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function initializeWelcomeExperience() {
    const completedKey = `${STORAGE_PREFIX}onboarding:complete`;
    const overlay = createSettingsElement('div', 'welcome-overlay');
    overlay.hidden = true;
    const dialog = createSettingsElement('section', 'welcome-dialog');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'welcome-dialog-title');
    dialog.setAttribute('aria-describedby', 'welcome-dialog-copy welcome-fan-note');

    const eyebrow = createSettingsElement('p', 'welcome-eyebrow');
    const secureIcon = createSettingsElement('i', 'fa-solid fa-lock');
    secureIcon.setAttribute('aria-hidden', 'true');
    eyebrow.append(secureIcon, createSettingsElement('span', '', 'Cerebro // Secure channel established'));
    const title = createSettingsElement('h1', '', 'Welcome to MutantComms');
    title.id = 'welcome-dialog-title';
    const copy = createSettingsElement('p', 'welcome-dialog-copy',
      'Your signal just reached the X-Men. Drop into simulated conversations with mutant characters and see how they answer back.');
    copy.id = 'welcome-dialog-copy';
    const featureList = createSettingsElement('ul', 'welcome-feature-list');
    [
      ['01', 'Character chats', 'Message the mutants already on this network.'],
      ['02', 'Emoji reactions', 'Tap a bubble to leave your mark.'],
      ['03', 'Make it yours', 'Set a profile picture and choose your avatar vibe.'],
      ['04', 'Keep exploring', 'Look out for hidden interactions as you chat.']
    ].forEach(([number, heading, description]) => {
      const item = createSettingsElement('li');
      item.append(
        createSettingsElement('span', 'welcome-feature-number', number),
        createSettingsElement('span', 'welcome-feature-text')
      );
      const text = item.querySelector('.welcome-feature-text');
      text.append(createSettingsElement('strong', '', heading), createSettingsElement('span', '', description));
      featureList.append(item);
    });
    const fanNote = createSettingsElement('p', 'welcome-fan-note',
      'Fan-made interactive experience. Conversations are simulated; this is not a real messaging service or an official Marvel product.');
    fanNote.id = 'welcome-fan-note';
    const actions = createSettingsElement('div', 'welcome-actions');
    const enter = createSettingsElement('button', 'welcome-enter', 'Enter MutantComms');
    enter.type = 'button';
    const close = createSettingsElement('button', 'welcome-close', 'Close');
    close.type = 'button';
    const status = createSettingsElement('p', 'welcome-status');
    status.setAttribute('role', 'status');
    actions.append(enter, close);
    dialog.append(eyebrow, title, copy, featureList, fanNote, actions, status);
    overlay.append(dialog);
    document.body.append(overlay);

    let returning = readStorage(completedKey, false) === true;
    let previousFocus = null;
    const hide = () => {
      overlay.hidden = true;
      document.body.classList.remove('welcome-open');
      previousFocus?.focus();
    };
    const open = () => {
      returning = readStorage(completedKey, false) === true;
      close.hidden = !returning;
      status.textContent = '';
      previousFocus = document.activeElement;
      overlay.hidden = false;
      document.body.classList.add('welcome-open');
      enter.focus();
    };
    enter.addEventListener('click', () => {
      const saved = writeStorage(completedKey, true);
      returning = true;
      close.hidden = false;
      if (!saved) {
        status.textContent = 'Your browser could not save this choice, so the welcome message may appear again next visit.';
      }
      hide();
    });
    close.addEventListener('click', hide);
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (returning) hide();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button:not([hidden])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay && returning) hide();
    });

    if (!returning) open();
    return open;
  }

  function createSettingsPanel() {
    const shell = document.querySelector('.phone-shell');
    if (!shell) return null;
    let trigger = document.querySelector('.settings-button');
    if (!trigger) {
      trigger = createSettingsElement('button', 'settings-button chat-settings-button');
      trigger.type = 'button';
      trigger.setAttribute('aria-label', 'Settings');
      const icon = createSettingsElement('i', 'fa-solid fa-gear');
      icon.setAttribute('aria-hidden', 'true');
      trigger.append(icon);
      const info = shell.querySelector('.info-button');
      if (info) info.before(trigger);
      else shell.querySelector('.chat-header-row')?.append(trigger);
    }

    const panel = createSettingsElement('aside', 'settings-panel');
    panel.id = 'mutant-comms-settings';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Settings');
    panel.setAttribute('aria-live', 'polite');

    const heading = createSettingsElement('h2', '', 'Settings');
    const close = createSettingsElement('button', 'settings-close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close settings');
    const closeIcon = createSettingsElement('i', 'fa-solid fa-xmark');
    closeIcon.setAttribute('aria-hidden', 'true');
    close.append(closeIcon);
    const about = createSettingsElement('button', 'settings-about', 'About MutantComms');
    about.type = 'button';
    const titleRow = createSettingsElement('div', 'settings-title-row');
    titleRow.append(heading, about, close);

    const profileHeading = createSettingsElement('h3', '', 'Your profile picture');
    const profileRow = createSettingsElement('div', 'profile-picture-row');
    const previewWrap = createSettingsElement('div', 'profile-picture-wrap');
    const placeholder = createSettingsElement('span', 'profile-picture-placeholder', 'YOU');
    const preview = createSettingsElement('img', 'profile-picture-preview');
    preview.alt = 'Preview of your profile picture';
    preview.hidden = true;
    previewWrap.append(placeholder, preview);
    const fileLabel = createSettingsElement('label', 'profile-upload-label', 'Choose JPG, PNG or WebP');
    const fileInput = createSettingsElement('input', 'profile-upload');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg,image/png,image/webp';
    fileInput.setAttribute('aria-label', 'Choose a profile picture');
    fileLabel.append(fileInput);
    profileRow.append(previewWrap, fileLabel);

    const cropEditor = createSettingsElement('div', 'avatar-crop-editor');
    cropEditor.hidden = true;
    const cropViewport = createSettingsElement('div', 'avatar-crop-viewport');
    const cropPreview = createSettingsElement('img', 'avatar-crop-preview');
    cropPreview.alt = 'Drag to reposition your profile picture';
    cropViewport.append(cropPreview);
    const cropControls = createSettingsElement('label', 'avatar-crop-control', 'Zoom');
    const cropZoom = createSettingsElement('input', 'avatar-crop-zoom');
    cropZoom.type = 'range';
    cropZoom.min = '1';
    cropZoom.max = '3';
    cropZoom.step = '0.05';
    cropZoom.value = '1';
    cropZoom.setAttribute('aria-label', 'Zoom profile picture');
    cropControls.append(cropZoom);
    cropEditor.append(cropViewport, cropControls);

    const vibeLabel = createSettingsElement('label', 'settings-field', 'Avatar vibe (optional)');
    const vibe = createSettingsElement('select', 'profile-vibe');
    vibe.setAttribute('aria-label', 'Avatar vibe');
    [['', 'Choose a vibe'], ['Funny', 'Funny'], ['Serious', 'Serious'], ['Mysterious', 'Mysterious'],
      ['Stylish', 'Stylish'], ['Chaotic', 'Chaotic']].forEach(([value, label]) => {
      const option = createSettingsElement('option', '', label);
      option.value = value;
      vibe.append(option);
    });
    vibeLabel.append(vibe);

    const spicyLabel = createSettingsElement('label', 'settings-toggle-label');
    const spicy = createSettingsElement('input', 'spicy-mode-toggle');
    spicy.type = 'checkbox';
    spicyLabel.append(spicy, createSettingsElement('span', '', '🌶️ Spicy Mode'));

    const actions = createSettingsElement('div', 'settings-actions');
    const save = createSettingsElement('button', 'settings-save', 'Save profile');
    save.type = 'button';
    const remove = createSettingsElement('button', 'settings-remove', 'Remove picture');
    remove.type = 'button';
    actions.append(save, remove);
    const resetChats = createSettingsElement('button', 'settings-reset-chats');
    resetChats.type = 'button';
    const resetIcon = createSettingsElement('i', 'fa-solid fa-rotate');
    resetIcon.setAttribute('aria-hidden', 'true');
    resetChats.append(resetIcon, document.createTextNode('Restart all chats'));
    const status = createSettingsElement('p', 'settings-status');
    status.setAttribute('role', 'status');
    panel.append(titleRow, profileHeading, profileRow, cropEditor, vibeLabel, spicyLabel, actions, resetChats, status);
    shell.append(panel);
    trigger.setAttribute('aria-controls', panel.id);
    trigger.setAttribute('aria-expanded', 'false');

    let pendingAvatarBlob = null;
    let stagedPreviewUrl = '';
    let avatarLoadRevision = 0;
    let cropZoomLevel = 1;
    let cropOffsetX = 0;
    let cropOffsetY = 0;
    const setStatus = (message) => { status.textContent = message; };
    resetChats.addEventListener('click', () => {
      if (!window.confirm('Restart all chats? This clears saved messages, drafts, reactions, and chat memory on this device.')) return;
      try {
        const chatDataPrefixes = [
          `${STORAGE_PREFIX}messages:`,
          `${STORAGE_PREFIX}reactions:`,
          `${STORAGE_PREFIX}draft:`,
          'mutant-comms:memory:'
        ];
        const keysToRemove = [];
        for (let index = 0; index < localStorage.length; index += 1) {
          const key = localStorage.key(index);
          if (key && (key === `${STORAGE_PREFIX}unread` ||
              chatDataPrefixes.some((prefix) => key.startsWith(prefix)))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        localStorage.setItem(CHATS_RESET_KEY, `${Date.now()}-${Math.random()}`);
        window.location.assign('index.html');
      } catch (error) {
        console.error('MutantComms could not restart all chats.', error);
        setStatus(error.message || 'Could not restart all chats. Check this browser’s storage settings.');
      }
    });
    const updateCropPreview = () => {
      const size = cropViewport.clientWidth;
      const imageWidth = cropPreview.naturalWidth || size;
      const imageHeight = cropPreview.naturalHeight || size;
      const renderedWidth = Math.max(size, size * imageWidth / imageHeight);
      const renderedHeight = Math.max(size, size * imageHeight / imageWidth);
      cropOffsetX = Math.max(-(renderedWidth * cropZoomLevel - size) / 2,
        Math.min((renderedWidth * cropZoomLevel - size) / 2, cropOffsetX));
      cropOffsetY = Math.max(-(renderedHeight * cropZoomLevel - size) / 2,
        Math.min((renderedHeight * cropZoomLevel - size) / 2, cropOffsetY));
      cropPreview.style.transform = `translate(${cropOffsetX}px, ${cropOffsetY}px) scale(${cropZoomLevel})`;
      const previewScale = previewWrap.clientWidth / size;
      preview.style.transform = `translate(${cropOffsetX * previewScale}px, ${cropOffsetY * previewScale}px) scale(${cropZoomLevel})`;
    };
    const refreshProfilePicture = () => {
      const loadRevision = ++avatarLoadRevision;
      readProfilePicture().then((blob) => {
        if (loadRevision !== avatarLoadRevision) return;
        useProfilePicture(blob);
        remove.disabled = !blob;
      }).catch((error) => {
        if (loadRevision !== avatarLoadRevision) return;
        console.error('MutantComms could not load the local profile picture.', error);
        setStatus(error.message || 'Could not load the saved profile picture.');
      });
    };
    const setMeta = (hasPicture, nextVibe, avatarChanged) => {
      const meta = {
        ...currentProfileMeta,
        revision: (Number(currentProfileMeta.revision) || 0) + (avatarChanged ? 1 : 0),
        hasPicture,
        vibe: nextVibe,
        updatedAt: Date.now()
      };
      if (!writeStorage(PROFILE_META_KEY, meta)) {
        setStatus('Could not save profile settings. Check this browser’s storage space and privacy settings.');
        return false;
      }
      currentProfileMeta = meta;
      window.setTimeout(maybePublishAvatarReaction, 500);
      return true;
    };
    const saveSpicyMode = (enabled) => {
      if (writeStorage(SPICY_MODE_KEY, enabled)) {
        spicyMode = enabled;
        setStatus(enabled ? 'Spicy Mode is on.' : 'Spicy Mode is off.');
      } else {
        spicy.checked = spicyMode;
        setStatus('Could not save Spicy Mode. Check this browser’s storage settings.');
      }
    };
    const makeCompressedAvatar = async (file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        throw new Error('Choose a JPG, PNG or WebP image.');
      }
      if (file.size > MAX_AVATAR_FILE_SIZE) {
        throw new Error('Choose an image smaller than 8 MB.');
      }
      if (typeof createImageBitmap !== 'function') {
        throw new Error('This browser cannot resize images locally. Try a newer browser.');
      }
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = AVATAR_SIZE;
      canvas.height = AVATAR_SIZE;
      const context = canvas.getContext('2d');
      if (!context) {
        bitmap.close();
        throw new Error('Could not prepare the profile picture locally.');
      }
      context.fillStyle = '#121721';
      context.fillRect(0, 0, canvas.width, canvas.height);
      const coverScale = Math.max(AVATAR_SIZE / bitmap.width, AVATAR_SIZE / bitmap.height);
      const cropSize = AVATAR_SIZE / (coverScale * cropZoomLevel);
      const previewSize = cropViewport.clientWidth;
      const screenScale = previewSize * coverScale / AVATAR_SIZE * cropZoomLevel;
      const sourceX = Math.max(0, Math.min(
        bitmap.width - cropSize,
        (bitmap.width - cropSize) / 2 - cropOffsetX / screenScale
      ));
      const sourceY = Math.max(0, Math.min(
        bitmap.height - cropSize,
        (bitmap.height - cropSize) / 2 - cropOffsetY / screenScale
      ));
      context.drawImage(bitmap, sourceX, sourceY, cropSize, cropSize, 0, 0, AVATAR_SIZE, AVATAR_SIZE);
      bitmap.close();
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Could not compress the profile picture.'));
        }, 'image/jpeg', 0.82);
      });
    };

    trigger.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (open) fileInput.focus();
    });
    close.addEventListener('click', () => {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    });
    about.addEventListener('click', () => {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      openWelcomeExperience();
    });
    document.addEventListener('click', (event) => {
      if (!panel.hidden && !panel.contains(event.target) && !trigger.contains(event.target)) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        fileInput.value = '';
        setStatus('Choose a JPG, PNG or WebP image.');
        return;
      }
      if (file.size > MAX_AVATAR_FILE_SIZE) {
        fileInput.value = '';
        setStatus('Choose an image smaller than 8 MB.');
        return;
      }
      pendingAvatarBlob = file;
      if (stagedPreviewUrl) URL.revokeObjectURL(stagedPreviewUrl);
      stagedPreviewUrl = URL.createObjectURL(file);
      preview.src = stagedPreviewUrl;
      preview.hidden = false;
      placeholder.hidden = true;
      cropPreview.src = stagedPreviewUrl;
      cropEditor.hidden = false;
      cropZoomLevel = 1;
      cropOffsetX = 0;
      cropOffsetY = 0;
      cropZoom.value = '1';
      cropPreview.onload = updateCropPreview;
      updateCropPreview();
      setStatus('Drag the preview to reposition it, adjust zoom, then save.');
    });
    cropZoom.addEventListener('input', () => {
      cropZoomLevel = Number(cropZoom.value);
      updateCropPreview();
    });
    let dragStart = null;
    cropViewport.addEventListener('pointerdown', (event) => {
      dragStart = { x: event.clientX, y: event.clientY, offsetX: cropOffsetX, offsetY: cropOffsetY };
      cropViewport.setPointerCapture(event.pointerId);
    });
    cropViewport.addEventListener('pointermove', (event) => {
      if (!dragStart) return;
      cropOffsetX = dragStart.offsetX + event.clientX - dragStart.x;
      cropOffsetY = dragStart.offsetY + event.clientY - dragStart.y;
      updateCropPreview();
    });
    ['pointerup', 'pointercancel'].forEach((type) => {
      cropViewport.addEventListener(type, () => { dragStart = null; });
    });
    spicy.checked = spicyMode;
    spicy.addEventListener('change', () => saveSpicyMode(spicy.checked));
    vibe.value = typeof currentProfileMeta.vibe === 'string' ? currentProfileMeta.vibe : '';
    save.addEventListener('click', async () => {
      save.disabled = true;
      try {
        const chosenVibe = vibe.value;
        if (pendingAvatarBlob) {
          const compressed = await makeCompressedAvatar(pendingAvatarBlob);
          await writeProfilePicture(compressed);
          avatarLoadRevision += 1;
          useProfilePicture(compressed);
          if (!setMeta(true, chosenVibe, true)) return;
          remove.disabled = false;
          pendingAvatarBlob = null;
          fileInput.value = '';
          cropEditor.hidden = true;
          preview.style.transform = '';
          if (stagedPreviewUrl) URL.revokeObjectURL(stagedPreviewUrl);
          stagedPreviewUrl = '';
          setStatus('Profile picture saved on this device.');
          return;
        }
        const changedVibe = chosenVibe !== (currentProfileMeta.vibe || '');
        if (changedVibe) {
          if (!setMeta(Boolean(currentProfileMeta.hasPicture), chosenVibe, Boolean(currentProfileMeta.hasPicture))) return;
          setStatus(chosenVibe
            ? `Vibe saved as ${chosenVibe}. Characters will only use this selected category.`
            : 'Avatar vibe cleared.');
        } else {
          setStatus('Your profile is up to date.');
        }
      } catch (error) {
        console.error('MutantComms could not save the local profile picture.', error);
        setStatus(error.message || 'Could not save the profile picture locally.');
      } finally {
        save.disabled = false;
      }
    });
    remove.addEventListener('click', async () => {
      remove.disabled = true;
      avatarLoadRevision += 1;
      try {
        await deleteProfilePicture();
        useProfilePicture(null);
        remove.disabled = true;
        pendingAvatarBlob = null;
        fileInput.value = '';
        cropEditor.hidden = true;
        preview.style.transform = '';
        if (stagedPreviewUrl) URL.revokeObjectURL(stagedPreviewUrl);
        stagedPreviewUrl = '';
        if (setMeta(false, vibe.value, Boolean(currentProfileMeta.hasPicture))) {
          setStatus('Profile picture removed from this device.');
        }
      } catch (error) {
        console.error('MutantComms could not remove the local profile picture.', error);
        setStatus(error.message || 'Could not remove the profile picture locally.');
        refreshProfilePicture();
      } finally {
        remove.disabled = !currentProfileMeta.hasPicture;
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === SPICY_MODE_KEY) {
        spicyMode = event.newValue === 'true';
        spicy.checked = spicyMode;
      }
      if (event.key === PROFILE_META_KEY) {
        currentProfileMeta = normalizeProfileMeta(readStorage(PROFILE_META_KEY, currentProfileMeta), currentProfileMeta);
        vibe.value = currentProfileMeta.vibe || '';
        refreshProfilePicture();
        window.setTimeout(maybePublishAvatarReaction, 500);
      }
    });

    refreshProfilePicture();
    return panel;
  }

  function getUnreadStates() {
    const value = readStorage(`${STORAGE_PREFIX}unread`, {});
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
    console.error('MutantComms found invalid saved unread notification states.');
    return {};
  }

  function initializeInfoPanel() {
    const button = document.querySelector('.info-button');
    const panel = document.querySelector('.info-panel');
    if (!button || !panel) return;

    const members = [...panel.querySelectorAll('li')]
      .map((member) => member.textContent.trim())
      .filter(Boolean);
    const profile = CHARACTER_PROFILES[pageTitle] || CHARACTER_PROFILES['Gold Squad'];
    const headingId = 'character-info-heading';
    const closeButton = createSettingsElement('button', 'info-panel-close');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close character information');
    const closeIcon = createSettingsElement('i', 'fa-solid fa-xmark');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeButton.append(closeIcon);

    const titleRow = createSettingsElement('div', 'info-panel-title-row');
    const title = createSettingsElement('h2', '', 'Comms Profile');
    title.id = headingId;
    titleRow.append(title, closeButton);

    const identity = createSettingsElement('div', 'info-profile-identity');
    const portrait = createSettingsElement('img', 'info-profile-avatar');
    portrait.src = profile.avatar;
    portrait.alt = `${profile.codename} profile picture`;
    portrait.addEventListener('error', () => portrait.remove(), { once: true });
    const codename = createSettingsElement('p', 'info-profile-codename', profile.codename);
    const fullName = createSettingsElement('h3', 'info-profile-name', profile.fullName);
    identity.append(portrait, codename, fullName);

    const details = createSettingsElement('dl', 'info-profile-details');
    [
      ['Fictional comms line', profile.channel],
      ['Status', profile.status],
      ['Team', profile.team],
      ['Abilities', profile.powers]
    ].forEach(([label, value]) => {
      details.append(
        createSettingsElement('dt', '', label),
        createSettingsElement('dd', '', value)
      );
    });
    const biography = createSettingsElement('p', 'info-profile-biography', profile.biography);
    panel.replaceChildren(titleRow, identity, details, biography);
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', headingId);
    panel.setAttribute('aria-hidden', 'true');

    if (conversation === 'gold-squad') {
      const memberList = createSettingsElement('ul', 'info-profile-members');
      members.forEach((member) => memberList.append(createSettingsElement('li', '', member)));
      const memberSection = createSettingsElement('section', 'info-profile-member-section');
      memberSection.append(createSettingsElement('h3', '', 'Team roster'), memberList);
      panel.append(memberSection);
    }

    button.setAttribute('aria-expanded', 'false');
    const close = (restoreFocus = false) => {
      panel.classList.remove('visible');
      panel.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      if (restoreFocus) button.focus();
    };

    button.addEventListener('click', () => {
      const isVisible = panel.classList.toggle('visible');
      panel.setAttribute('aria-hidden', String(!isVisible));
      button.setAttribute('aria-expanded', String(isVisible));
      if (isVisible) closeButton.focus();
    });
    closeButton.addEventListener('click', () => close(true));

    document.addEventListener('click', (event) => {
      if (panel.classList.contains('visible') &&
          !panel.contains(event.target) && !button.contains(event.target)) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel.classList.contains('visible')) close(true);
    });
  }

  function initializeSearch() {
    const input = document.querySelector('.search-field');
    const list = document.querySelector('.conversation-list');
    if (!input || !list) return;

    const items = [...list.querySelectorAll('.conversation-item')];
    const noResults = document.createElement('p');
    noResults.className = 'search-empty';
    noResults.setAttribute('aria-live', 'polite');
    noResults.hidden = true;
    list.after(noResults);

    input.addEventListener('input', () => {
      const query = input.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      items.forEach((item) => {
        const matches = item.textContent.toLocaleLowerCase().includes(query);
        item.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      noResults.textContent = query
        ? `No matches for “${input.value.trim()}”. Try a character name such as Storm, Cable or Wolverine.`
        : '';
      noResults.hidden = visibleCount !== 0;
    });
  }

  function initializeArchiveAccess() {
    const anchor = createSettingsElement('a', 'archive-quick-link');
    anchor.href = 'field-archive.html';
    anchor.setAttribute('aria-label', 'Open the X-Men Field Archive');
    const icon = createSettingsElement('i', 'archive-quick-icon fa-solid fa-book-open');
    icon.setAttribute('aria-hidden', 'true');
    const label = createSettingsElement('span', 'visually-hidden', 'Archive');
    anchor.append(icon, label);

    const messengerHeader = document.querySelector('.messenger-header');
    const settings = document.querySelector('.messenger-header .settings-button');
    if (messengerHeader && settings) {
      const actions = createSettingsElement('div', 'messenger-actions');
      messengerHeader.insertBefore(actions, settings);
      actions.append(anchor, settings);
      return;
    }

    const chatHeader = document.querySelector('.chat-header-row');
    const chatSettings = chatHeader?.querySelector('.settings-button');
    const info = chatHeader?.querySelector('.info-button');
    if (chatHeader && chatSettings && info) {
      const actions = createSettingsElement('div', 'chat-header-actions');
      chatHeader.insertBefore(actions, chatSettings);
      actions.append(anchor, chatSettings, info);
    }
  }

  function initializeTipsPanel() {
    const shell = document.querySelector('.phone-shell');
    const actions = document.querySelector('.messenger-actions, .chat-header-actions');
    if (!shell || !actions) return;

    const trigger = createSettingsElement('button', 'tips-button');
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Tips & Tricks');
    trigger.title = 'Tips & Tricks';
    trigger.setAttribute('aria-expanded', 'false');
    const icon = createSettingsElement('i', 'fa-solid fa-lightbulb');
    icon.setAttribute('aria-hidden', 'true');
    trigger.append(icon);
    trigger.setAttribute('aria-controls', 'mutant-comms-tips');
    actions.insertBefore(trigger, actions.querySelector('.archive-quick-link') ||
      actions.querySelector('.settings-button'));

    const panel = createSettingsElement('aside', 'tips-panel');
    panel.id = 'mutant-comms-tips';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'mutant-comms-tips-heading');
    panel.setAttribute('aria-hidden', 'true');

    const close = createSettingsElement('button', 'tips-close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close Tips & Tricks');
    const closeIcon = createSettingsElement('i', 'fa-solid fa-xmark');
    closeIcon.setAttribute('aria-hidden', 'true');
    close.append(closeIcon);

    const heading = createSettingsElement('h2', '', 'Tips & Tricks');
    heading.id = 'mutant-comms-tips-heading';
    const titleRow = createSettingsElement('div', 'tips-title-row');
    titleRow.append(heading, close);
    const description = createSettingsElement('p', 'tips-description',
      'Tap a prompt to fill the message composer. Press Send when you are ready.');
    panel.append(titleRow, description);

    const categories = [
      ['Getting to Know the X-Men', [
        "What's your favourite food?",
        'What do you do for fun?',
        "Who's your favourite X-Man?",
        "What's your biggest fear?"
      ]],
      ['Marvel Universe', [
        'What do you think of Spider-Man?',
        'Do you know Captain America?',
        'What do you think of the Avengers?',
        'What do you think of Doctor Doom?',
        'Who would win, Hulk or Wolverine?'
      ]],
      ['Funny and Personal Questions', [
        'Do you have a crush on anyone?',
        "What's your most embarrassing moment?",
        'Can you tell me a joke?',
        'What do you think of Deadpool?',
        'Can I join the X-Men?'
      ]]
    ];

    categories.forEach(([category, prompts]) => {
      const section = createSettingsElement('section', 'tips-category');
      const categoryHeading = createSettingsElement('h3', '', category);
      const list = createSettingsElement('div', 'tips-prompt-list');
      prompts.forEach((prompt) => {
        const suggestion = createSettingsElement('button', 'tips-prompt', prompt);
        suggestion.type = 'button';
        suggestion.addEventListener('click', () => {
          const input = shell.querySelector('.message-composer input');
          if (!input) {
            window.location.href = `group-chat.html?prompt=${encodeURIComponent(prompt)}`;
            return;
          }
          input.value = prompt;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          closePanel(true);
          input.focus();
        });
        list.append(suggestion);
      });
      section.append(categoryHeading, list);
      panel.append(section);
    });

    const secrets = createSettingsElement('section', 'tips-category');
    secrets.append(
      createSettingsElement('h3', '', 'Secrets and Easter Eggs'),
      createSettingsElement('p', 'tips-hint',
        'Try an unusual question, then follow up with “Why?” A small detail in one reply may lead somewhere unexpected.')
    );
    panel.append(secrets);

    shell.append(panel);
    const closePanel = (restoreFocus = false) => {
      panel.hidden = true;
      panel.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    };

    trigger.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      panel.setAttribute('aria-hidden', String(panel.hidden));
      trigger.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) close.focus();
    });
    close.addEventListener('click', () => closePanel(true));
    document.addEventListener('click', (event) => {
      if (!panel.hidden && !panel.contains(event.target) && !trigger.contains(event.target)) {
        closePanel();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) closePanel(true);
    });
  }

  function initializeConversationPreviews() {
    updateHomeConversationPreviews();
    window.addEventListener('pageshow', updateHomeConversationPreviews);
    window.addEventListener('storage', (event) => {
      if (event.key?.startsWith(`${STORAGE_PREFIX}messages:`)) {
        updateHomeConversationPreviews();
      }
    });
    window.setInterval(updateHomeConversationPreviews, 60_000);
  }

  function initializeChatResetListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === CHATS_RESET_KEY && event.newValue) window.location.reload();
    });
  }

  function applyUnreadState(item, count, animate = false) {
    let badge = item.querySelector('.unread-count');

    if (count > 0) {
      item.classList.add('unread');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'unread-count';
        item.querySelector('.conversation-bottom')?.append(badge);
      }
      window.clearTimeout(badge.removalTimer);
      badge.textContent = String(count);
      badge.classList.remove('notification-cleared');
      if (animate) {
        badge.classList.remove('notification-pop');
        requestAnimationFrame(() => badge.classList.add('notification-pop'));
      }
      return;
    }

    item.classList.remove('unread');
    if (badge) {
      window.clearTimeout(badge.removalTimer);
      badge.classList.add('notification-cleared');
      badge.removalTimer = window.setTimeout(() => {
        if (!item.classList.contains('unread') && badge.isConnected) badge.remove();
      }, 200);
    }
  }

  function updateHomeUnreadStates() {
    const items = [...document.querySelectorAll('.conversation-item')];
    if (!items.length) return;

    const storedStates = getUnreadStates();
    items.forEach((item) => {
      const key = conversationItemId(item);
      const badge = item.querySelector('.unread-count');
      const originalCount = Number.parseInt(badge?.textContent || '0', 10) || 0;
      const count = Object.hasOwn(storedStates, key)
        ? Number(storedStates[key]) || 0
        : originalCount;
      applyUnreadState(item, count);
    });
  }

  function setUnreadCount(name, count, animate = false) {
    const key = name;
    const states = getUnreadStates();
    states[key] = Math.max(0, Number(count) || 0);
    writeStorage(`${STORAGE_PREFIX}unread`, states);

    document.querySelectorAll('.conversation-item').forEach((item) => {
      if (conversationItemId(item) === key) {
        applyUnreadState(item, states[key], animate);
      }
    });
  }

  function initializeNotifications() {
    updateHomeUnreadStates();

    const activeKey = isChatPage && conversation ? activeConversationKey() : '';
    const syncActiveConversation = () => {
      if (!activeKey) return;
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        writeStorage(activeKey, Date.now());
        setUnreadCount(conversation, 0);
      } else {
        try {
          localStorage.removeItem(activeKey);
        } catch (error) {
          console.error(`MutantComms could not mark conversation "${conversation}" inactive.`, error);
        }
      }
    };
    if (activeKey) {
      syncActiveConversation();
      document.addEventListener('visibilitychange', syncActiveConversation);
      window.addEventListener('focus', syncActiveConversation);
      window.addEventListener('blur', syncActiveConversation);
      window.setInterval(() => {
        if (document.visibilityState === 'visible' && document.hasFocus()) {
          writeStorage(activeKey, Date.now());
        } else {
          syncActiveConversation();
        }
      }, 5_000);
      window.addEventListener('pagehide', () => {
        conversationIsLeaving = true;
        try {
          localStorage.removeItem(activeKey);
        } catch (error) {
          console.error(`MutantComms could not clear active conversation "${conversation}".`, error);
        }
      });
    }

    window.mutantCommsNotify = (name, count = 1) => {
      const key = name;
      const current = getUnreadStates();
      if ((isChatPage && conversation === key && !conversationIsLeaving &&
          document.visibilityState === 'visible' && document.hasFocus()) || hasActiveConversation(key)) {
        setUnreadCount(name, 0);
        return;
      }
      const item = [...document.querySelectorAll('.conversation-item')].find((candidate) => {
        return conversationItemId(candidate) === key;
      });
      const displayedCount = Number.parseInt(item?.querySelector('.unread-count')?.textContent || '0', 10) || 0;
      const currentCount = Object.hasOwn(current, key) ? Number(current[key]) || 0 : displayedCount;
      setUnreadCount(name, currentCount + Math.max(1, Number(count) || 1), true);
    };

    window.addEventListener('pageshow', () => {
      updateHomeUnreadStates();
      syncActiveConversation();
    });
    window.addEventListener('storage', (event) => {
      if (event.key === `${STORAGE_PREFIX}unread`) updateHomeUnreadStates();
    });
  }

  function initializeConversationMessages() {
    const messages = document.querySelector('.chat-messages');
    if (!messages || !conversation) return;

    const initialGroups = [...messages.querySelectorAll('.message-group')];
    const occurrences = new Map();
    let historyChanged = false;
    initialGroups.forEach((group) => {
      const bubble = group.querySelector('.message-bubble');
      if (!bubble) return;
      const author = group.querySelector('.message-author')?.textContent.trim() || 'You';
      const text = bubble.querySelector('p')?.textContent || '';
      const time = bubble.querySelector('time')?.textContent.trim() || '';
      const fingerprint = `${author}\n${text}\n${time}`;
      const occurrence = occurrences.get(fingerprint) || 0;
      occurrences.set(fingerprint, occurrence + 1);
      group.dataset.messageId ||= `seed-${hash(`${conversation}\n${fingerprint}\n${occurrence}`)}`;
    });
    initialGroups.forEach(upgradeMessageGroup);

    const storedMessages = readStorage(messageStorageKey(), []);
    if (!Array.isArray(storedMessages)) {
      console.error(`MutantComms found invalid saved message history for "${conversation}".`);
      return;
    }

    storedMessages.forEach((record) => {
      if (record && typeof record.author === 'string' && LEGACY_AUTHOR_NAMES[record.author]) {
        record.author = displayAuthor(record.author);
        historyChanged = true;
      }
    });

    const seedRecords = initialGroups.flatMap((group) => {
      const bubble = group.querySelector('.message-bubble');
      if (!bubble) return [];
      const author = group.querySelector('.message-author')?.textContent.trim() || '';
      const record = {
        id: group.dataset.messageId,
        text: bubble.querySelector('p')?.textContent || '',
        time: bubble.querySelector('time')?.textContent.trim() || ''
      };
      if (author) record.author = displayAuthor(author);
      return [record];
    });
    const seedIds = new Set(seedRecords.map((record) => record.id));
    const storedSeedRecords = new Map(storedMessages
      .filter((record) => record && seedIds.has(record.id))
      .map((record) => [record.id, record]));
    const messageHistory = [
      ...seedRecords.map((record) => storedSeedRecords.get(record.id) || record),
      ...storedMessages.filter((record) => !record || !seedIds.has(record.id))
    ];
    if (messageHistory.length !== storedMessages.length ||
        messageHistory.some((record, index) => record?.id !== storedMessages[index]?.id)) {
      historyChanged = true;
    }
    if (historyChanged) writeStorage(messageStorageKey(), messageHistory);

    const existingIds = new Set(initialGroups.map((group) => group.dataset.messageId));
    messageHistory.forEach((record) => {
      if (!record || typeof record.id !== 'string' || existingIds.has(record.id) ||
          typeof record.text !== 'string' || typeof record.time !== 'string') return;
      messages.insertBefore(createMessageGroup(record), messages.querySelector('.typing-row'));
      existingIds.add(record.id);
    });
    refreshMessageGrouping(messages);

    messages.scrollTop = messages.scrollHeight;
    updateHomeConversationPreviews();

    window.addEventListener('storage', (event) => {
      if (event.key !== messageStorageKey() || !event.newValue) return;
      let history;
      try {
        history = JSON.parse(event.newValue);
      } catch (error) {
        console.error(`MutantComms could not parse updated message history for "${conversation}".`, error);
        return;
      }
      if (!Array.isArray(history)) {
        console.error(`MutantComms found invalid updated message history for "${conversation}".`);
        return;
      }

      const existingIds = new Set([...messages.querySelectorAll('.message-group')]
        .map((group) => group.dataset.messageId));
      let receivedCount = 0;
      history.forEach((record) => {
        if (!record || typeof record.id !== 'string' || existingIds.has(record.id) ||
            typeof record.text !== 'string' || typeof record.time !== 'string') return;
        messages.insertBefore(createMessageGroup(record), messages.querySelector('.typing-row'));
        existingIds.add(record.id);
        if (record.author && record.author !== 'You') receivedCount += 1;
      });
      refreshMessageGrouping(messages);
      updateHomeConversationPreviews();
      if (receivedCount && document.visibilityState === 'visible') setUnreadCount(conversation, 0);
    });
  }

  function upgradeMessageGroup(article) {
    if (article.querySelector(':scope > .message-content')) return;
    const isUser = article.classList.contains('message-you');
    const authorName = displayAuthor(article.querySelector('.message-author')?.textContent.trim() || '');
    const author = isUser ? '' : authorName || 'Gold Squad';
    article.dataset.author = isUser ? 'You' : author;
    const authorLabel = article.querySelector('.message-author');
    const bubble = article.querySelector('.message-bubble');
    const receipt = article.querySelector('.message-receipt');
    const reactions = [...article.querySelectorAll(':scope > .reaction-badge')];
    const avatar = createSettingsElement('span', 'message-avatar');
    avatar.setAttribute('aria-hidden', 'true');
    decorateAvatar(avatar, author, isUser);
    const content = createSettingsElement('div', 'message-content');
    if (authorLabel) content.append(authorLabel);
    if (bubble) content.append(bubble);
    if (receipt) content.append(receipt);
    article.replaceChildren(avatar, content, ...reactions);
  }

  function refreshMessageGrouping(messages) {
    const groups = [...messages.querySelectorAll('.message-group')];
    let previousAuthor = '';
    groups.forEach((group) => {
      const author = group.dataset.author ||
        (group.classList.contains('message-you') ? 'You' : group.querySelector('.message-author')?.textContent.trim()) || '';
      group.dataset.author = author;
      group.classList.toggle('message-group--continuation', Boolean(author && author === previousAuthor));
      previousAuthor = author;
    });
  }

  function createMessageGroup(record) {
    const article = document.createElement('article');
    const authorName = record.author ? displayAuthor(record.author) : '';
    article.className = authorName
      ? 'message-group'
      : 'message-group message-you';
    article.dataset.messageId = record.id;
    article.dataset.author = authorName || 'You';

    const avatar = document.createElement('span');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    decorateAvatar(avatar, authorName, !authorName);
    article.append(avatar);

    const content = document.createElement('div');
    content.className = 'message-content';

    if (authorName) {
      const author = document.createElement('h2');
      author.className = 'message-author';
      author.textContent = authorName;
      content.append(author);
    }

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    const text = document.createElement('p');
    text.textContent = record.text;
    const time = document.createElement('time');
    time.textContent = record.time;
    if (Number.isFinite(Number(record.timestamp)) && Number(record.timestamp) > 0) {
      time.dateTime = new Date(Number(record.timestamp)).toISOString();
    }
    bubble.append(text, time);
    content.append(bubble);
    if (!record.author && record.receipt) {
      const receipt = document.createElement('span');
      receipt.className = 'message-receipt';
      receipt.textContent = record.receipt;
      content.append(receipt);
    }
    article.append(content);
    return article;
  }

  function updateMessageReceipt(messageId, status) {
    const group = [...document.querySelectorAll('.message-group')]
      .find((message) => message.dataset.messageId === messageId);
    if (!group || group.classList.contains('message-you') === false) return;

    let receipt = group.querySelector('.message-receipt');
    if (!receipt) {
      receipt = document.createElement('span');
      receipt.className = 'message-receipt';
      group.querySelector('.message-content')?.append(receipt);
    }
    receipt.textContent = status;

    const history = readStorage(messageStorageKey(), []);
    if (!Array.isArray(history)) return;
    const record = history.find((message) => message?.id === messageId);
    if (record) {
      record.receipt = status;
      writeStorage(messageStorageKey(), history);
    }
  }

  function maybePublishAvatarReaction() {
    if (!isChatPage || !conversation || !currentProfileMeta.revision ||
        currentProfileMeta.acknowledgedRevision === currentProfileMeta.revision) return;
    const lastReactionAt = Number(currentProfileMeta.lastReactionAt) || 0;
    if (Date.now() - lastReactionAt < 30 * 60 * 1000) return;
    const engine = window.MutantCommsConversationEngine;
    if (!engine || typeof engine.avatarReaction !== 'function') {
      console.error('MutantComms could not find the profile-picture reaction handler.');
      return;
    }
    const participants = [...document.querySelectorAll('.info-panel li')]
      .map((member) => member.textContent.trim())
      .filter(Boolean);
    const reply = engine.avatarReaction({
      conversationId: conversation,
      character: pageTitle,
      participants,
      vibe: currentProfileMeta.vibe,
      spicyMode,
      hasPicture: Boolean(currentProfileMeta.hasPicture)
    });
    currentProfileMeta = {
      ...currentProfileMeta,
      acknowledgedRevision: currentProfileMeta.revision,
      lastReactionAt: reply ? Date.now() : lastReactionAt
    };
    if (!writeStorage(PROFILE_META_KEY, currentProfileMeta)) return;
    if (!reply) return;
    window.setTimeout(() => {
      const messages = document.querySelector('.chat-messages');
      const typing = messages?.querySelector('.typing-row');
      if (!messages || !typing) return;
      const timestamp = Date.now();
      const record = {
        id: `avatar-${window.crypto?.randomUUID?.() || `${timestamp.toString(36)}-${Math.random().toString(36).slice(2)}`}`,
        author: reply.author,
        text: reply.text,
        time: formatTime(new Date(timestamp)),
        timestamp
      };
      const article = createMessageGroup(record);
      article.classList.add('message-enter');
      messages.insertBefore(article, typing);
      persistMessage(record);
      messages.scrollTop = messages.scrollHeight;
    }, 500);
  }

  function persistMessage(record) {
    const history = readStorage(messageStorageKey(), []);
    if (!Array.isArray(history)) {
      console.error(`MutantComms cannot append to invalid message history for "${conversation}".`);
      return;
    }
    const isNewMessage = !history.some((message) => message.id === record.id);
    let messageSaved = true;
    if (isNewMessage) {
      history.push(record);
      messageSaved = writeStorage(messageStorageKey(), history);
    }
    refreshMessageGrouping(document.querySelector('.chat-messages'));
    updateHomeConversationPreviews();
    if (isNewMessage && messageSaved && record.author && record.author !== 'You') {
      window.mutantCommsNotify?.(conversation);
    }
  }

  function initializeTypingIndicator() {
    const typing = document.querySelector('.typing-row');
    if (!typing) return null;

    const label = [...typing.children].find((child) => !child.classList.contains('typing-dot'));
    const dots = typing.querySelectorAll('.typing-dot');
    for (let index = dots.length; index < 3; index += 1) {
      const dot = document.createElement('span');
      dot.className = 'typing-dot';
      dot.setAttribute('aria-hidden', 'true');
      typing.insertBefore(dot, label || null);
    }
    const labelText = [...typing.children].find((child) => !child.classList.contains('typing-dot'));
    if (labelText) {
      const typingLabel = conversation === 'gold-squad'
        ? 'A Gold Squad member is typing...'
        : `${pageTitle} is typing...`;
      labelText.textContent = typingLabel;
      typing.setAttribute('aria-label', typingLabel.replace('...', ''));
    }
    typing.classList.remove('typing-visible', 'typing-hiding');
    return typing;
  }

  function setTypingVisible(typing, visible) {
    if (!typing) return;
    window.clearTimeout(typing.hideTimer);
    if (visible) {
      typing.classList.remove('typing-hiding');
      typing.classList.add('typing-visible');
    } else if (typing.classList.contains('typing-visible')) {
      typing.classList.add('typing-hiding');
      typing.classList.remove('typing-visible');
      typing.hideTimer = window.setTimeout(() => {
        typing.classList.remove('typing-hiding');
      }, 180);
    }
  }

  function maybeTriggerDoctorDoom(text, messages, nearBottom) {
    if (!/\b(?:doctor\s+doom|dr\.?\s+doom|victor\s+von\s+doom|doom)\b/i.test(text)) return;
    const now = Date.now();
    const savedTrigger = readStorage(DOOM_COOLDOWN_KEY, 0);
    if (typeof savedTrigger !== 'number' || !Number.isFinite(savedTrigger) || savedTrigger < 0) {
      console.error('MutantComms found an invalid Doctor Doom event cooldown.');
    } else if (now - savedTrigger < DOOM_COOLDOWN_MS || now < doomCooldownUntil) {
      return;
    }
    if (Math.random() >= 0.18) return;

    doomCooldownUntil = now + DOOM_COOLDOWN_MS;
    writeStorage(DOOM_COOLDOWN_KEY, now);
    const notice = createSettingsElement('div', 'doom-notice', 'DOOM HAS ENTERED THE CHAT');
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    phone.append(notice);
    phone.classList.add('doom-glitch');
    window.setTimeout(() => {
      phone.classList.remove('doom-glitch');
      notice.remove();
    }, 2800);

    const responses = [
      'Doom does not require your approval.',
      'Your conversation has been deemed unworthy of Doom’s attention.'
    ];
    const timestamp = Date.now();
    const record = {
      id: `doom-${window.crypto?.randomUUID?.() || `${timestamp.toString(36)}-${Math.random().toString(36).slice(2)}`}`,
      author: 'Doctor Doom',
      text: responses[Math.floor(Math.random() * responses.length)],
      time: formatTime(new Date(timestamp)),
      timestamp
    };
    messages.insertBefore(createMessageGroup(record), messages.querySelector('.typing-row'));
    persistMessage(record);
    if (nearBottom) messages.scrollTop = messages.scrollHeight;
  }

  function initializeMessageComposer(typing) {
    const form = document.querySelector('.message-composer');
    const input = form?.querySelector('input');
    const messages = document.querySelector('.chat-messages');
    const sendButton = form?.querySelector('.send-button');
    if (!form || !input || !messages || !sendButton) return;

    const draftKey = `${STORAGE_PREFIX}draft:${conversation}`;
    const prompt = new URLSearchParams(window.location.search).get('prompt');
    if (prompt !== null) {
      if (prompt.length <= MAX_MESSAGE_LENGTH) {
        input.value = prompt;
        const url = new URL(window.location.href);
        url.searchParams.delete('prompt');
        window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
      } else {
        console.error('MutantComms ignored a suggested prompt that exceeds the message limit.');
      }
    } else {
      const savedDraft = readStorage(draftKey, '');
      if (typeof savedDraft === 'string') input.value = savedDraft;
    }

    let pendingResponse = false;
    let pendingTurn = null;
    const updateComposer = () => {
      sendButton.disabled = input.value.trim().length === 0 || pendingResponse;
      writeStorage(draftKey, input.value);
    };
    updateComposer();
    input.addEventListener('input', updateComposer);

    const submitMessage = async (event) => {
      event.preventDefault();
      if (pendingResponse) return;
      const text = input.value.trim();
      if (!text) return;
      if (text.length > MAX_MESSAGE_LENGTH) {
        input.setCustomValidity(`Messages can be up to ${MAX_MESSAGE_LENGTH} characters.`);
        input.reportValidity();
        input.setCustomValidity('');
        return;
      }

      const nearBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 60;
      const timestamp = Date.now();
      const record = {
        id: `user-${window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`,
        text,
        time: formatTime(new Date(timestamp)),
        timestamp,
        receipt: 'Delivered'
      };
      const article = createMessageGroup(record);
      article.classList.add('message-enter');
      messages.insertBefore(article, typing);
      persistMessage(record);
      input.value = '';
      updateComposer();
      writeStorage(draftKey, '');
      sendButton.classList.remove('send-press');
      requestAnimationFrame(() => sendButton.classList.add('send-press'));
      if (nearBottom) messages.scrollTop = messages.scrollHeight;
      pendingResponse = true;
      updateComposer();
      setTypingVisible(typing, true);
      try {
        const responseResult = requestCharacterResponse(text);
        const response = responseResult && typeof responseResult.then === 'function'
          ? await responseResult
          : responseResult;
        const replies = Array.isArray(response?.messages)
          ? response.messages
          : typeof response === 'string'
            ? [{ text: response }]
            : typeof response?.text === 'string' ? [response] : [];
        const turn = { replies, nextReplyIndex: 0, deliveredCount: 0, nearBottom, record };
        pendingTurn = turn;
        await waitFor(400 + Math.random() * 700);
        while (pendingTurn === turn && turn.nextReplyIndex < replies.length) {
          if (turn.deliveredCount) await waitFor(450 + Math.random() * 850);
          if (pendingTurn !== turn) break;
          persistNextReply(turn, true);
        }
        if (pendingTurn === turn) pendingTurn = null;
        if (turn.deliveredCount) updateMessageReceipt(record.id, 'Seen');
        if (response?.reaction && typeof window.mutantCommsAddCharacterReaction === 'function') {
          window.mutantCommsAddCharacterReaction(record.id, response.reaction);
        }
        maybePublishAvatarReaction();
        maybeTriggerDoctorDoom(text, messages, nearBottom);
      } catch (error) {
        console.error('MutantComms local response handler failed.', error);
      } finally {
        if (pendingTurn?.record.id === record.id) pendingTurn = null;
        pendingResponse = false;
        updateComposer();
        setTypingVisible(typing, false);
      }
    };

    form.addEventListener('submit', submitMessage);

    window.addEventListener('pagehide', () => {
      if (!pendingTurn) return;
      const turn = pendingTurn;
      pendingTurn = null;
      while (turn.nextReplyIndex < turn.replies.length) persistNextReply(turn, false);
    });

    function persistNextReply(turn, render) {
      const reply = turn.replies[turn.nextReplyIndex];
      turn.nextReplyIndex += 1;
      const responseText = typeof reply?.text === 'string' ? reply.text.trim() : '';
      if (!responseText) return;
      const receivedAt = Date.now();
      const receivedRecord = {
        id: `received-${window.crypto?.randomUUID?.() || `${receivedAt.toString(36)}-${Math.random().toString(36).slice(2)}`}`,
        author: typeof reply.author === 'string' && reply.author.trim()
          ? displayAuthor(reply.author.trim())
          : conversation === 'gold-squad' ? 'Gold Squad' : pageTitle,
        text: responseText,
        time: formatTime(new Date(receivedAt)),
        timestamp: receivedAt
      };
      if (render) {
        messages.insertBefore(createMessageGroup(receivedRecord), typing);
        if (turn.nearBottom) messages.scrollTop = messages.scrollHeight;
      }
      persistMessage(receivedRecord);
      turn.deliveredCount += 1;
    }
  }

  function requestCharacterResponse(text) {
    try {
      const handler = window.mutantCommsResponseHandler;
      if (typeof handler === 'function') return handler(text);
      const engine = window.MutantCommsConversationEngine;
      if (!engine) {
        console.error('MutantComms could not find its local conversation engine.');
        return null;
      }
      const participants = [...document.querySelectorAll('.info-panel li')]
        .map((member) => member.textContent.trim())
        .filter(Boolean);
      return engine.respond({
        conversationId: conversation,
        character: pageTitle,
        text,
        participants,
        spicyMode
      });
    } catch (error) {
      console.error('MutantComms local response handler failed.', error);
      return null;
    }
  }

  function waitFor(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }

  function initializeCustomKeyboard() {
    const form = document.querySelector('.message-composer');
    const input = form?.querySelector('input');
    const shell = document.querySelector('.phone-shell');
    const sendButton = form?.querySelector('.send-button');
    if (!form || !input || !shell || !sendButton) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'keyboard-toggle';
    toggle.setAttribute('aria-label', 'Toggle on-screen keyboard');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '⌨';
    form.insertBefore(toggle, sendButton);

    const keyboard = document.createElement('div');
    keyboard.className = 'custom-keyboard';
    keyboard.setAttribute('aria-label', 'On-screen keyboard');
    keyboard.setAttribute('aria-hidden', 'true');

    const makeKey = (label, key, className = '', action = 'insert') => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `keyboard-key ${className}`.trim();
      button.dataset.key = key;
      button.dataset.action = action;
      if (action === 'letter') button.dataset.letter = key;
      button.textContent = label;
      return button;
    };

    const addRow = (keys, rowClass = '', action = 'insert') => {
      const row = document.createElement('div');
      row.className = `keyboard-row ${rowClass}`.trim();
      keys.forEach(([label, value]) => {
        row.append(makeKey(label, value, '', action));
      });
      keyboard.append(row);
    };

    const makeCharacterKeys = (characters) => [...characters].map((character) => [character, character]);
    const addActionRow = (keys) => {
      const row = document.createElement('div');
      row.className = 'keyboard-row';
      keys.forEach(([label, key, className, action]) => {
        row.append(makeKey(label, key, className, action));
      });
      keyboard.append(row);
    };

    const renderKeyboard = (layout) => {
      keyboard.replaceChildren();
      const isSymbolLayout = layout === 'symbols';

      if (isSymbolLayout) {
        addRow(makeCharacterKeys('1234567890'));
        addRow(makeCharacterKeys('~!@#$%^&*'));
        addRow(makeCharacterKeys('()-_=+[]{}'));
        addRow(makeCharacterKeys(';:\'"`,.?/\\|'));
      } else {
        addRow(makeCharacterKeys('1234567890'));
        addRow(makeCharacterKeys('qwertyuiop'), '', 'letter');
        addRow(makeCharacterKeys('asdfghjkl'), '', 'letter');
        addActionRow([
          ['Shift', 'shift', 'keyboard-wide', 'shift'],
          ...makeCharacterKeys('zxcvbnm').map(([label, key]) => [label, key, '', 'letter']),
          ['⌫', 'backspace', 'keyboard-wide', 'backspace']
        ]);
      }

      addRow([
        ['😀', '😀'], ['😂', '😂'], ['🥰', '🥰'], ['❤️', '❤️'],
        ['👍', '👍'], ['😮', '😮'], ['😢', '😢'], ['🔥', '🔥']
      ]);
      addActionRow([
        [isSymbolLayout ? 'ABC' : '?123', 'layout', 'keyboard-wide', 'layout'],
        ['Space', ' ', 'keyboard-space', 'space'],
        ['Enter', 'enter', 'keyboard-wide', 'enter'],
        ['Hide', 'hide', 'keyboard-wide', 'hide']
      ]);
      keyboard.dataset.layout = layout;
    };

    let layout = 'letters';
    renderKeyboard(layout);
    shell.insertBefore(keyboard, shell.querySelector('.bottom-nav'));

    let shifted = false;
    const setShift = (value) => {
      shifted = value;
      const shiftKey = keyboard.querySelector('[data-action="shift"]');
      shiftKey?.classList.toggle('keyboard-key-active', shifted);
      shiftKey?.setAttribute('aria-pressed', String(shifted));
      keyboard.querySelectorAll('[data-letter]').forEach((key) => {
        key.textContent = shifted ? key.dataset.letter.toUpperCase() : key.dataset.letter;
      });
    };

    const setOpen = (open) => {
      shell.classList.toggle('keyboard-open', open);
      keyboard.classList.toggle('keyboard-visible', open);
      keyboard.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      if (open) input.focus();
    };

    toggle.addEventListener('click', () => setOpen(!shell.classList.contains('keyboard-open')));
    keyboard.addEventListener('click', (event) => {
      const keyButton = event.target.closest('.keyboard-key');
      if (!keyButton) return;
      const key = keyButton.dataset.key;
      const action = keyButton.dataset.action;

      if (action === 'hide') {
        setOpen(false);
        return;
      }
      if (action === 'layout') {
        layout = layout === 'letters' ? 'symbols' : 'letters';
        shifted = false;
        renderKeyboard(layout);
        return;
      }
      if (action === 'shift') {
        setShift(!shifted);
        return;
      }
      if (action === 'enter') {
        form.requestSubmit();
        return;
      }

      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? start;
      if (action === 'backspace') {
        if (start === end && start > 0) input.setRangeText('', start - 1, end, 'end');
        else input.setRangeText('', start, end, 'end');
      } else {
        const value = keyButton.dataset.letter && shifted ? key.toUpperCase() : key;
        input.setRangeText(value, start, end, 'end');
        if (keyButton.dataset.letter && shifted) setShift(false);
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });

    if (window.matchMedia('(pointer: coarse)').matches) toggle.hidden = true;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && shell.classList.contains('keyboard-open')) setOpen(false);
    });
  }

  function getReactionCounts(group) {
    const counts = {};
    group.querySelectorAll('.reaction-badge').forEach((badge) => {
      const symbol = badge.querySelector('.reaction-symbol')?.dataset.reaction
        || badge.dataset.reaction
        || '';
      const count = Number.parseInt(badge.textContent.trim(), 10) || 0;
      if (symbol && count > 0) counts[symbol] = (counts[symbol] || 0) + count;
    });
    return counts;
  }

  function renderReactionBadges(group, counts, selectedEmoji = '') {
    group.querySelectorAll('.reaction-badge').forEach((badge) => badge.remove());
    const content = group.querySelector('.message-content');
    if (!content) return;
    Object.entries(counts).forEach(([emoji, count]) => {
      if (count <= 0) return;
      const badge = document.createElement('div');
      badge.className = 'reaction-badge';
      badge.dataset.reaction = emoji;
      if (emoji === selectedEmoji) badge.classList.add('reaction-bounce');
      const symbol = document.createElement('span');
      symbol.className = 'reaction-symbol';
      symbol.dataset.reaction = emoji;
      const icon = document.createElement('i');
      icon.className = `fa-solid ${REACTION_ICONS[emoji]}`;
      icon.setAttribute('aria-hidden', 'true');
      symbol.append(icon);
      badge.append(symbol, document.createTextNode(String(count)));
      content.append(badge);
    });
  }

  function initializeMessageReactions() {
    const messages = document.querySelector('.chat-messages');
    const shell = document.querySelector('.phone-shell');
    if (!messages || !shell) return;

    const storedReactions = readStorage(reactionStorageKey(), {});
    if (!storedReactions || typeof storedReactions !== 'object' || Array.isArray(storedReactions)) {
      console.error(`MutantComms found invalid saved reactions for "${conversation}".`);
      return;
    }

    const menu = document.createElement('div');
    menu.className = 'reaction-menu';
    menu.setAttribute('role', 'toolbar');
    menu.setAttribute('aria-label', 'React to message');
    REACTIONS.forEach((emoji) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'reaction-option';
      option.dataset.reaction = emoji;
      option.setAttribute('aria-label', `React ${REACTION_LABELS[emoji]}`);
      const icon = document.createElement('i');
      icon.className = `fa-solid ${REACTION_ICONS[emoji]}`;
      icon.setAttribute('aria-hidden', 'true');
      option.append(icon);
      menu.append(option);
    });
    shell.append(menu);

    let targetGroup = null;
    let longPressTimer = 0;
    let suppressClick = false;

    const messageGroups = [...messages.querySelectorAll('.message-group')];
    messageGroups.forEach((group) => {
      group.querySelectorAll('.reaction-badge').forEach((badge) => badge.remove());
    });

    Object.entries(storedReactions).forEach(([id, state]) => {
      if (!state || !state.counts || typeof state.counts !== 'object') {
        delete storedReactions[id];
        return;
      }

      const counts = Object.fromEntries(
        Object.entries(state.counts).filter(([emoji, count]) =>
          REACTIONS.includes(emoji) && Number.isFinite(Number(count)) && Number(count) > 0)
      );
      const userReaction = REACTIONS.includes(state.userReaction) ? state.userReaction : '';
      if (Object.keys(counts).length === 0 && !userReaction) {
        delete storedReactions[id];
        return;
      }
      storedReactions[id] = { counts, userReaction };
      const group = messageGroups.find((message) => message.dataset.messageId === id);
      if (group) renderReactionBadges(group, counts, userReaction);
    });
    writeStorage(reactionStorageKey(), storedReactions);

    window.mutantCommsAddCharacterReaction = (messageId, emoji) => {
      if (!REACTIONS.includes(emoji)) return;
      const group = [...messages.querySelectorAll('.message-group')]
        .find((message) => message.dataset.messageId === messageId);
      if (!group) return;
      const state = storedReactions[messageId] || {
        counts: getReactionCounts(group),
        userReaction: ''
      };
      state.counts[emoji] = (Number(state.counts[emoji]) || 0) + 1;
      storedReactions[messageId] = state;
      writeStorage(reactionStorageKey(), storedReactions);
      renderReactionBadges(group, state.counts, state.userReaction);
    };

    const closeMenu = () => {
      menu.classList.remove('reaction-menu-visible');
      targetGroup = null;
    };

    const openMenu = (bubble) => {
      const group = bubble.closest('.message-group');
      if (!group?.dataset.messageId) return;
      const messageBubble = group.querySelector('.message-bubble');
      if (!messageBubble) return;
      const bubbleRect = messageBubble.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const menuWidth = 242;
      const menuHeight = 46;
      const left = Math.max(8, Math.min(
        bubbleRect.left - shellRect.left,
        shell.clientWidth - menuWidth - 8
      ));
      let top = bubbleRect.top - shellRect.top - menuHeight - 6;
      if (top < 8) top = bubbleRect.bottom - shellRect.top + 6;
      top = Math.min(top, shell.clientHeight - menuHeight - 8);
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
      targetGroup = group;
      menu.classList.add('reaction-menu-visible');
    };

    messages.addEventListener('click', (event) => {
      const reactionTarget = event.target.closest('.message-bubble, .reaction-badge');
      if (!reactionTarget) return;
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      openMenu(reactionTarget);
    });

    messages.addEventListener('pointerdown', (event) => {
      const bubble = event.target.closest('.message-bubble');
      if (!bubble || event.pointerType !== 'touch') return;
      window.clearTimeout(longPressTimer);
      longPressTimer = window.setTimeout(() => {
        openMenu(bubble);
        suppressClick = true;
        window.setTimeout(() => { suppressClick = false; }, 800);
      }, 500);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
      messages.addEventListener(type, () => window.clearTimeout(longPressTimer));
    });

    menu.addEventListener('click', (event) => {
      const option = event.target.closest('.reaction-option');
      if (!option || !targetGroup) return;
      const id = targetGroup.dataset.messageId;
      const state = storedReactions[id] || {
        counts: getReactionCounts(targetGroup),
        userReaction: ''
      };
      const chosen = option.dataset.reaction;

      if (state.userReaction === chosen) {
        state.counts[chosen] = Math.max(0, (Number(state.counts[chosen]) || 0) - 1);
        state.userReaction = '';
      } else {
        if (state.userReaction) {
          state.counts[state.userReaction] = Math.max(
            0,
            (Number(state.counts[state.userReaction]) || 0) - 1
          );
        }
        state.counts[chosen] = (Number(state.counts[chosen]) || 0) + 1;
        state.userReaction = chosen;
      }
      storedReactions[id] = state;
      writeStorage(reactionStorageKey(), storedReactions);
      renderReactionBadges(targetGroup, state.counts, state.userReaction);
      closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !event.target.closest('.message-bubble, .reaction-badge')) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  function initializeNetworkIndicator() {
    document.querySelectorAll('.status-indicator').forEach((indicator) => {
      indicator.setAttribute('aria-hidden', 'true');
    });
  }

  const openWelcomeExperience = initializeWelcomeExperience();
  initializeChatResetListener();
  createSettingsPanel();
  initializeArchiveAccess();
  initializeTipsPanel();
  decorateVisibleAvatars();
  initializeNetworkIndicator();
  initializeInfoPanel();
  initializeSearch();
  initializeNotifications();
  initializeConversationPreviews();

  if (isChatPage) {
    initializeConversationMessages();
    const typing = initializeTypingIndicator();
    initializeMessageComposer(typing);
    initializeCustomKeyboard();
    initializeMessageReactions();
    window.setTimeout(maybePublishAvatarReaction, 600);
  }
});
