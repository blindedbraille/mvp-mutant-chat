document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_PREFIX = 'mutant-comms:';
  const REACTIONS = ['❤️', '😂', '👍', '😮', '😢', '❗'];
  const MAX_MESSAGE_LENGTH = 1200;
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

  function messageStorageKey() {
    return `${STORAGE_PREFIX}messages:${conversation}`;
  }

  function reactionStorageKey() {
    return `${STORAGE_PREFIX}reactions:${conversation}`;
  }

  function displayAuthor(name) {
    return LEGACY_AUTHOR_NAMES[name] || name;
  }

  function conversationItemId(item) {
    const explicitId = item.dataset.conversationId;
    if (explicitId) return explicitId;
    const href = item.querySelector('a')?.getAttribute('href') || '';
    return href.replace(/\.html$/, '').split('/').pop() || '';
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

    button.setAttribute('aria-expanded', 'false');
    const close = () => {
      panel.classList.remove('visible');
      button.setAttribute('aria-expanded', 'false');
    };

    button.addEventListener('click', () => {
      const isVisible = panel.classList.toggle('visible');
      button.setAttribute('aria-expanded', String(isVisible));
    });

    document.addEventListener('click', (event) => {
      if (!panel.contains(event.target) && !button.contains(event.target)) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  function initializeSearch() {
    const input = document.querySelector('.search-field');
    const list = document.querySelector('.conversation-list');
    if (!input || !list) return;

    const items = [...list.querySelectorAll('.conversation-item')];
    const noResults = document.createElement('p');
    noResults.className = 'search-empty';
    noResults.textContent = 'No matching contacts found';
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
      noResults.hidden = visibleCount !== 0;
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

    if (isChatPage && conversation) setUnreadCount(conversation, 0);

    window.mutantCommsNotify = (name, count = 1) => {
      const key = name;
      const current = getUnreadStates();
      if (isChatPage && conversation === key) {
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

    window.addEventListener('pageshow', updateHomeUnreadStates);
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
    if (historyChanged) writeStorage(messageStorageKey(), storedMessages);

    const existingIds = new Set(initialGroups.map((group) => group.dataset.messageId));
    storedMessages.forEach((record) => {
      if (!record || typeof record.id !== 'string' || existingIds.has(record.id) ||
          typeof record.text !== 'string' || typeof record.time !== 'string') return;
      messages.insertBefore(createMessageGroup(record), messages.querySelector('.typing-row'));
      existingIds.add(record.id);
    });

    messages.scrollTop = messages.scrollHeight;
  }

  function createMessageGroup(record) {
    const article = document.createElement('article');
    article.className = record.author
      ? 'message-group'
      : 'message-group message-you';
    article.dataset.messageId = record.id;

    if (record.author) {
      const author = document.createElement('h2');
      author.className = 'message-author';
      author.textContent = displayAuthor(record.author);
      article.append(author);
    }

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    const text = document.createElement('p');
    text.textContent = record.text;
    const time = document.createElement('time');
    time.textContent = record.time;
    bubble.append(text, time);
    article.append(bubble);
    return article;
  }

  function persistMessage(record) {
    const history = readStorage(messageStorageKey(), []);
    if (!Array.isArray(history)) {
      console.error(`MutantComms cannot append to invalid message history for "${conversation}".`);
      return;
    }
    if (!history.some((message) => message.id === record.id)) {
      history.push(record);
      writeStorage(messageStorageKey(), history);
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

  function initializeMessageComposer(typing) {
    const form = document.querySelector('.message-composer');
    const input = form?.querySelector('input');
    const messages = document.querySelector('.chat-messages');
    const sendButton = form?.querySelector('.send-button');
    if (!form || !input || !messages || !sendButton) return;

    const draftKey = `${STORAGE_PREFIX}draft:${conversation}`;
    const savedDraft = readStorage(draftKey, '');
    if (typeof savedDraft === 'string') input.value = savedDraft;

    let pendingResponse = false;
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
      const record = {
        id: `user-${window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`,
        text,
        time: formatTime()
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
        await requestCharacterResponse(text);
      } catch (error) {
        console.error('MutantComms local response handler failed.', error);
      } finally {
        pendingResponse = false;
        updateComposer();
        setTypingVisible(typing, false);
      }
    };

    form.addEventListener('submit', submitMessage);
  }

  function requestCharacterResponse(text) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        try {
          const handler = window.mutantCommsResponseHandler;
          resolve(typeof handler === 'function' ? handler(text) : null);
        } catch (error) {
          console.error('MutantComms local response handler failed.', error);
          resolve(null);
        }
      }, 700);
    });
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
      const symbol = badge.querySelector('.reaction-symbol')?.textContent || '';
      const count = Number.parseInt(badge.textContent.replace(symbol, '').trim(), 10) || 0;
      if (symbol && count > 0) counts[symbol] = (counts[symbol] || 0) + count;
    });
    return counts;
  }

  function renderReactionBadges(group, counts, selectedEmoji = '') {
    group.querySelectorAll('.reaction-badge').forEach((badge) => badge.remove());
    Object.entries(counts).forEach(([emoji, count]) => {
      if (count <= 0) return;
      const badge = document.createElement('div');
      badge.className = 'reaction-badge';
      if (emoji === selectedEmoji) badge.classList.add('reaction-bounce');
      const symbol = document.createElement('span');
      symbol.className = 'reaction-symbol';
      symbol.textContent = emoji;
      badge.append(symbol, document.createTextNode(String(count)));
      group.append(badge);
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
      option.setAttribute('aria-label', `React ${emoji}`);
      option.textContent = emoji;
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
      const previousAiReaction = REACTIONS.includes(state.aiReaction) ? state.aiReaction : '';
      if (previousAiReaction) {
        counts[previousAiReaction] = Math.max(0, (Number(counts[previousAiReaction]) || 0) - 1);
      }
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

  initializeNetworkIndicator();
  initializeInfoPanel();
  initializeSearch();
  initializeNotifications();

  if (isChatPage) {
    initializeConversationMessages();
    const typing = initializeTypingIndicator();
    initializeMessageComposer(typing);
    initializeCustomKeyboard();
    initializeMessageReactions();
  }
});
