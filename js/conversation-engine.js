window.MutantCommsConversationEngine = (() => {
  const STORAGE_PREFIX = 'mutant-comms:memory:';
  const dialogue = window.MutantCommsDialogue;
  const characters = ['Wolverine', 'Deadpool', 'Storm', 'Cable'];
  const relatedTopics = {
    xavier: ['mansion', 'discrimination'],
    magneto: ['brotherhood', 'discrimination'],
    discrimination: ['sentinels', 'brotherhood', 'krakoa'],
    brotherhood: ['magneto', 'discrimination'],
    dangerRoom: ['sentinels', 'mansion'],
    sentinels: ['discrimination', 'dangerRoom'],
    weaponX: ['wolverine', 'discrimination'],
    phoenix: ['jean', 'timeTravel'],
    mansion: ['xavier', 'dangerRoom'],
    krakoa: ['discrimination', 'magneto'],
    timeTravel: ['cyclops', 'phoenix'],
    cyclops: ['jean', 'xavier'],
    jean: ['phoenix', 'cyclops'],
    japan: ['weaponX', 'wolverine']
  };
  Object.entries(dialogue.topics).forEach(([name, topic]) => {
    topic.tag = name;
    topic.relatedCharacters = Object.keys(topic.responses);
    topic.intents = ['question', 'opinion', 'history', 'relationship'];
    topic.relatedTopics = relatedTopics[name] || [];
  });
  const aliases = {
    wolverine: 'Wolverine',
    logan: 'Wolverine',
    james: 'Wolverine',
    deadpool: 'Deadpool',
    wade: 'Deadpool',
    wilson: 'Deadpool',
    storm: 'Storm',
    ororo: 'Storm',
    munroe: 'Storm',
    cable: 'Cable',
    nathan: 'Cable',
    summers: 'Cable',
    cyclops: 'Cyclops',
    scott: 'Cyclops',
    jean: 'Jean Grey',
    magneto: 'Magneto',
    erik: 'Magneto',
    xavier: 'Professor X',
    charles: 'Professor X',
    beast: 'Beast',
    hank: 'Beast',
    mystique: 'Mystique'
  };
  const topicEntries = Object.entries(dialogue.topics);
  const intentRules = [
    ['goodbye', /\b(bye|goodbye|see you|talk later|gotta go|signing off|take care)\b/],
    ['greeting', /\b(hi|hello|hey|hiya|yo|morning|good evening|what'?s up)\b/],
    ['thanks', /\b(thanks|thank you|thx|appreciate it|grateful)\b/],
    ['apology', /\b(sorry|apologi[sz]e|my bad|i messed up|forgive me)\b/],
    ['activity', /\b(what are you doing|what're you doing|wyd|what are you up to|what you up to|where are you)\b/],
    ['wellbeing', /\b(how are you|how're you|how r u|how are you doing|how have you been|are you okay|you ok|you good|how are ya)\b/],
    ['advice', /\b(advice|what should i do|what do you recommend|help me decide|how do i deal|need your help|need help|can you help|help me|help with|advise me)\b/],
    ['support', /\b(rough day|hard day|bad day|feel (sad|scared|lonely|worried|overwhelmed|anxious)|feeling (sad|scared|lonely|worried|overwhelmed|anxious)|i am (sad|scared|lonely|worried|overwhelmed|anxious))\b/],
    ['compliment', /\b(you('re| are) (great|amazing|cool|kind|awesome|beautiful|handsome|strong)|i admire|love your|nice work|good job)\b/],
    ['insult', /\b(you('re| are) (stupid|useless|awful|pathetic|annoying)|idiot|hate you|shut up|worthless)\b/],
    ['flirt', /\b(flirt|date me|love you|crush on you|cute|hot|marry me|kiss me)\b/],
    ['relationship', /\b(love|like|dating|relationship|marry|married|girlfriend|boyfriend|ex\b|together|jealous|family)\b/],
    ['fight', /\b(fight|versus|vs\b|who would win|beat up|take on|punch|duel|battle)\b/],
    ['power', /\b(power|powers|healing factor|regenerat|claws|weather|lightning|telepath|optic blast|survive|strong|ability|abilities|rain inside|thrown into the sun|eat a sentinel)\b/],
    ['philosophy', /\b(meaning of life|free will|destiny|purpose|existence|what is life|why are we|future of|morality|hope)\b/],
    ['gossip', /\b(gossip|rumou?r|secret|embarrass|awkward|what happened between|tell me about|what do you think of)\b/],
    ['news', /\b(good news|bad news|guess what|i got|i passed|i failed|i'm excited|i am excited|i'm worried|i am worried)\b/],
    ['question', /\b(what|who|where|when|why|how|can|could|would|do|does|is|are)\b/]
  ];
  const fuzzyIntents = {
    greeting: ['hello', 'hey', 'hiya'],
    thanks: ['thanks', 'thank'],
    apology: ['sorry'],
    advice: ['help', 'advice'],
    wellbeing: ['okay', 'doing'],
    relationship: ['relationship', 'dating'],
    philosophy: ['destiny', 'purpose'],
    lore: ['magneto', 'sentinel', 'krakoa', 'xavier']
  };
  const slang = {
    u: 'you', ur: 'your', r: 'are', im: 'i am', idk: 'i do not know',
    omg: 'oh my god', lol: 'laughing', lmao: 'laughing', wtf: 'what the',
    pls: 'please', plz: 'please', rn: 'right now', bc: 'because', cuz: 'because',
    gonna: 'going to', wanna: 'want to', kinda: 'kind of', tbh: 'to be honest',
    tho: 'though', fr: 'for real', wyd: 'what are you doing'
  };

  function normalize(text) {
    return String(text || '')
      .toLocaleLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/([a-z])\1{2,}/g, '$1$1')
      .replace(/[^a-z0-9'\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => slang[word] || word)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function distance(left, right) {
    if (Math.abs(left.length - right.length) > 1) return 2;
    const row = Array.from({ length: right.length + 1 }, (_, index) => index);
    for (let i = 1; i <= left.length; i += 1) {
      let diagonal = row[0];
      row[0] = i;
      for (let j = 1; j <= right.length; j += 1) {
        const previous = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (left[i - 1] === right[j - 1] ? 0 : 1));
        diagonal = previous;
      }
    }
    return row[right.length];
  }

  function oneTypoApart(left, right) {
    if (distance(left, right) <= 1) return true;
    if (left.length !== right.length) return false;
    const differences = [];
    for (let index = 0; index < left.length; index += 1) {
      if (left[index] !== right[index]) differences.push(index);
    }
    return differences.length === 2 &&
      differences[1] === differences[0] + 1 &&
      left[differences[0]] === right[differences[1]] &&
      left[differences[1]] === right[differences[0]];
  }

  function matchAlias(text, alias) {
    if (text.includes(alias)) return true;
    if (alias.includes(' ')) return false;
    const words = text.split(' ');
    return alias.length > 5 && words.some((word) =>
      word.length > 5 && oneTypoApart(word, alias));
  }

  function findEntities(text) {
    return [...new Set(Object.entries(aliases)
      .filter(([alias]) => matchAlias(text, alias))
      .map(([, name]) => name))];
  }

  function findTopics(text) {
    return topicEntries
      .filter(([, topic]) => topic.aliases.some((alias) => matchAlias(text, normalize(alias))))
      .map(([name]) => name);
  }

  function findIntent(text) {
    const direct = intentRules.find(([, pattern]) => pattern.test(text))?.[0];
    if (direct) return direct;
    const words = text.split(' ');
    for (const [intent, terms] of Object.entries(fuzzyIntents)) {
      if (words.some((word) => terms.some((term) =>
        word.length >= 4 && oneTypoApart(word, term)))) return intent;
    }
    return '';
  }

  function loadMemory(conversationId) {
    try {
      const value = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${conversationId}`) || 'null');
      if (!value || typeof value !== 'object' || Array.isArray(value)) return createMemory();
      return {
        recentMessages: Array.isArray(value.recentMessages) ? value.recentMessages.slice(-20) : [],
        currentTopic: typeof value.currentTopic === 'string' ? value.currentTopic : '',
        previousTopic: typeof value.previousTopic === 'string' ? value.previousTopic : '',
        branches: Array.isArray(value.branches) ? value.branches.slice(-12) : [],
        mentionedCharacters: Array.isArray(value.mentionedCharacters) ? value.mentionedCharacters.slice(-12) : [],
        recognizedQuestions: Number(value.recognizedQuestions) || 0,
        mood: typeof value.mood === 'string' ? value.mood : 'neutral',
        tone: typeof value.tone === 'string' ? value.tone : 'unknown',
        responseIds: Array.isArray(value.responseIds) ? value.responseIds.slice(-8) : [],
        unusualStreak: Number(value.unusualStreak) || 0,
        branch: typeof value.branch === 'string' ? value.branch : '',
        relationship: Number(value.relationship) || 0
      };
    } catch (error) {
      console.error(`MutantComms could not read conversation memory for "${conversationId}".`, error);
      return createMemory();
    }
  }

  function createMemory() {
    return {
      recentMessages: [],
      currentTopic: '',
      previousTopic: '',
      branches: [],
      mentionedCharacters: [],
      recognizedQuestions: 0,
      mood: 'neutral',
      tone: 'unknown',
      responseIds: [],
      unusualStreak: 0,
      branch: '',
      relationship: 0
    };
  }

  function saveMemory(conversationId, memory) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${conversationId}`, JSON.stringify(memory));
    } catch (error) {
      console.error(`MutantComms could not save conversation memory for "${conversationId}".`, error);
    }
  }

  function choose(items, memory, key) {
    const available = items.filter((item) => {
      const label = typeof item === 'string' ? item : item.text;
      return !memory.responseIds.includes(`${key}:${label}`);
    });
    const choices = available.length ? available : items;
    const totalWeight = choices.reduce((total, item) =>
      total + (typeof item === 'string' ? 1 : Math.max(0, Number(item.weight) || 1)), 0);
    let threshold = Math.random() * totalWeight;
    let selected = choices[choices.length - 1];
    for (const item of choices) {
      threshold -= typeof item === 'string' ? 1 : Math.max(0, Number(item.weight) || 1);
      if (threshold < 0) {
        selected = item;
        break;
      }
    }
    const choice = typeof selected === 'string' ? selected : selected.text;
    const id = `${key}:${choice}`;
    memory.responseIds.push(id);
    memory.responseIds = memory.responseIds.slice(-8);
    return choice;
  }

  function detectMood(text) {
    const value = String(text).toLocaleLowerCase();
    if (/\b(thank|grateful|happy|excited|great|love|yay)\b|[😊😄😁🎉]/u.test(value)) return 'positive';
    if (/\b(sad|angry|upset|scared|worried|lonely|hate|bad day|rough day|hard day|overwhelmed|anxious)\b|[😢😭😟]/u.test(value)) return 'difficult';
    if (/\b(joking|kidding|lol|laughing|absurd|ridiculous)\b|[😂😅]/u.test(value)) return 'playful';
    return 'neutral';
  }

  function getIntentResponse(character, intent, memory) {
    const library = dialogue.intents[intent]?.[character] || [];
    return library.length ? choose(library, memory, `${character}:${intent}`) : '';
  }

  function getFallback(character, memory, analysis) {
    const topic = analysis.topics[0];
    if (topic) {
      const lines = dialogue.topics[topic]?.responses[character] || [];
      if (lines.length) return choose(lines, memory, `${character}:${topic}`);
    }
    const fallbacks = dialogue.fallbacks[character];
    const callback = memory.unusualStreak >= 2 ? {
      Wolverine: ["That's another one. You keeping score?"],
      Deadpool: ["PLEASE never stop asking these."],
      Storm: ["You have asked several unexpected questions. What has captured your imagination?"],
      Cable: ["I'm starting to think you're testing the security protocols."]
    }[character] : [];
    return choose([
      ...fallbacks,
      ...callback.map((text) => ({
        text,
        weight: memory.unusualStreak >= 4 ? 2 : 0.15
      }))
    ], memory, `${character}:fallback`);
  }

  function makeReply(character, text, intent, memory, analysis) {
    let response = '';
    const resolvedIntent = intent || (analysis.topics.length ? 'lore' : '');
    const topic = analysis.topics[0];
    if (analysis.unusual && memory.unusualStreak >= 3) {
      return getFallback(character, memory, analysis);
    }
    if (topic && (!intent || ['lore', 'question', 'relationship', 'gossip'].includes(intent))) {
      const topicLines = dialogue.topics[topic]?.responses[character] || [];
      if (topicLines.length) response = choose(topicLines, memory, `${character}:${topic}`);
    }
    if (!response && resolvedIntent) response = getIntentResponse(character, resolvedIntent, memory);
    if (!response && analysis.mood === 'difficult') response = getIntentResponse(character, 'support', memory);
    if (!response) response = getFallback(character, memory, analysis);

    if (intent === 'question' && analysis.isFollowup && memory.currentTopic === 'cyclops' &&
        character === 'Wolverine') {
      response = "We've had our differences. Doesn't mean I don't respect the guy.";
    }
    if (intent === 'relationship' && /\b(why|how come|what happened)\b/.test(text)) {
      const followup = {
        Wolverine: "We've had our differences. Doesn't mean I don't respect the guy.",
        Deadpool: "Because history is messy. Also, the writers keep adding footnotes.",
        Storm: "Because trust is built through choices, not simply history.",
        Cable: "Because the history is more complicated than one message can explain."
      };
      if (memory.currentTopic === 'cyclops') response = followup[character];
    }
    if (intent === 'fight' && memory.currentTopic === 'cyclops' && character === 'Wolverine') {
      response = "Again? Haven't we done that enough?";
    }

    return response;
  }

  function chooseGroupResponders(participants, entities, topic, memory, text) {
    const roster = [...new Set(participants.filter((name) => characters.includes(name)))];
    if (!roster.length) return [];
    const mentioned = entities.filter((name) => roster.includes(name));
    let first = mentioned[0];
    if (!first && topic === 'cyclops' && roster.includes('Wolverine')) first = 'Wolverine';
    if (!first && topic === 'phoenix' && roster.includes('Storm')) first = 'Storm';
    if (!first && /\b(logan|fight|wolverine)\b/.test(text) && roster.includes('Wolverine')) first = 'Wolverine';
    if (!first && /\b(wade|deadpool)\b/.test(text) && roster.includes('Deadpool')) first = 'Deadpool';
    if (!first) {
      const recentAuthors = memory.recentMessages.slice(-4).map((item) => item.author).filter(Boolean);
      first = roster.find((name) => !recentAuthors.includes(name)) || roster[0];
    }

    const replies = [first];
    const responseLower = text.toLocaleLowerCase();
    const asksComparison = /\b(who would win|versus|vs\b|fight)\b/.test(responseLower);
    if (asksComparison) {
      const second = roster.find((name) => name !== first &&
        (name === 'Storm' || name === 'Wolverine' || entities.includes(name)));
      if (second) replies.push(second);
    } else if (Math.random() < 0.18) {
      const second = roster.find((name) => name !== first && !memory.recentMessages.slice(-3)
        .some((item) => item.author === name));
      if (second) replies.push(second);
    }
    return replies;
  }

  function analyze(text, memory) {
    const normalized = normalize(text);
    const topics = findTopics(normalized);
    const entities = findEntities(normalized);
    let intent = findIntent(normalized);
    if (intent === 'question' && entities.length &&
        /\b(can|could|would|survive|control|use|lift|heal|regenerate|read minds?)\b/.test(normalized)) {
      intent = 'power';
    }
    const isFollowup = normalized.split(' ').length <= 5 &&
      /^(why|how|what about him|what about her|then what|really|and then|would you|would he|would she|but why)\b/.test(normalized);

    if (isFollowup && memory.currentTopic && !topics.length) topics.push(memory.currentTopic);
    if (!intent && topics.length && /\?/.test(text)) intent = 'lore';
    if (!intent && /\?/.test(text) && /\b(what|who|where|when|why|how|can|could|would|do|does|is|are)\b/.test(normalized)) {
      intent = topics.length ? 'lore' : 'question';
    }
    if (!intent && /\b(danger room|weapon x|sentinel|magneto|xavier|krakoa|phoenix)\b/.test(normalized)) {
      intent = 'lore';
    }
    const unusual = (!intent || intent === 'question') && !topics.length;
    return {
      normalized,
      intent,
      topics,
      entities,
      isFollowup,
      unusual,
      mood: detectMood(text),
      tone: /\b(joking|kidding|lol|lmao|haha|😂|😅)\b/.test(String(text).toLocaleLowerCase())
        ? 'joking'
        : /\b(i am serious|seriously|for real|not joking)\b/.test(normalized) ? 'serious' : 'unknown'
    };
  }

  function respond({ conversationId, character, text, participants = [] }) {
    if (typeof conversationId !== 'string' || !conversationId ||
        typeof text !== 'string' || !text.trim()) {
      return { messages: [], analysis: null };
    }

    const memory = loadMemory(conversationId);
    const analysis = analyze(text, memory);
    memory.previousTopic = memory.currentTopic;
    if (analysis.topics.length) memory.currentTopic = analysis.topics[0];
    else if (analysis.intent && !analysis.isFollowup) memory.currentTopic = analysis.intent;
    else if (!analysis.isFollowup) memory.currentTopic = '';
    if (!analysis.isFollowup && (analysis.intent || analysis.topics.length)) {
      memory.branches.push(analysis.intent || analysis.topics[0]);
      memory.branches = memory.branches.slice(-12);
    }
    memory.mentionedCharacters = [...new Set([...memory.mentionedCharacters, ...analysis.entities])].slice(-12);
    memory.recognizedQuestions += text.includes('?') && (analysis.intent || analysis.topics.length) ? 1 : 0;
    memory.mood = analysis.mood;
    memory.tone = analysis.tone;
    if (['thanks', 'compliment', 'greeting'].includes(analysis.intent)) memory.relationship = Math.min(10, memory.relationship + 1);
    if (analysis.intent === 'insult') memory.relationship = Math.max(-10, memory.relationship - 1);
    memory.unusualStreak = analysis.unusual ? memory.unusualStreak + 1 : 0;
    memory.branch = analysis.isFollowup ? memory.currentTopic : analysis.intent || analysis.topics[0] || '';
    memory.recentMessages.push({
      text: text.slice(0, 500),
      intent: analysis.intent,
      topics: analysis.topics,
      entities: analysis.entities,
      author: ''
    });

    const responders = conversationId === 'gold-squad'
      ? chooseGroupResponders(participants, analysis.entities, analysis.topics[0], memory, analysis.normalized)
      : [character].filter((name) => characters.includes(name));
    const messages = responders.map((name) => ({
      author: name,
      text: makeReply(name, analysis.normalized, analysis.intent, memory, analysis)
    })).filter((reply) => reply.text);
    if (!messages.length && responders.length) {
      const fallbackCharacter = responders[0];
      messages.push({ author: fallbackCharacter, text: getFallback(fallbackCharacter, memory, analysis) });
    }

    if (conversationId !== 'gold-squad' && character === 'Deadpool' &&
        messages.length === 1 && messages[0].text.length > 65 && Math.random() < 0.24) {
      const parts = messages[0].text.match(/^(.+?[.!?])\s+(.+)$/);
      if (parts) {
        messages[0].text = parts[1];
        messages.push({ author: 'Deadpool', text: parts[2] });
      }
    }
    messages.forEach((message) => {
      memory.recentMessages.push({
        text: message.text,
        author: message.author,
        intent: analysis.intent,
        topics: analysis.topics
      });
    });
    memory.recentMessages = memory.recentMessages.slice(-20);
    const reaction = messages.some((message) => message.author === 'Deadpool') && Math.random() < 0.4
      ? choose(['😂', '❤️', '👍', '😮'], memory, 'Deadpool:reaction')
      : '';
    saveMemory(conversationId, memory);
    return { messages, analysis, reaction };
  }

  function inspect(conversationId) {
    return loadMemory(conversationId);
  }

  function reset(conversationId) {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${conversationId}`);
    } catch (error) {
      console.error(`MutantComms could not clear conversation memory for "${conversationId}".`, error);
    }
  }

  return { respond, inspect, reset, analyze, findEntities, findTopics };
})();
