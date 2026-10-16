const cases = [
  ["Hey Logan, you around?", "Wolverine"],
  ["Good morning, Ororo.", "Storm"],
  ["Yo Wade!", "Deadpool"],
  ["Hello Nathan, got a minute?", "Cable"],
  ["How are you doing today?", "Storm"],
  ["How have you been, Logan?", "Wolverine"],
  ["What are you up to right now?", "Deadpool"],
  ["Wyd, Cable?", "Cable"],
  ["I'm having a rough day.", "Storm"],
  ["Guess what, I passed my exam!", "Deadpool"],
  ["I got some bad news.", "Wolverine"],
  ["Thanks for checking in.", "Cable"],
  ["I appreciate you helping me.", "Storm"],
  ["Sorry, that was my bad.", "Wolverine"],
  ["Can you help me decide what to do?", "Cable"],
  ["I need advice about a friend.", "Storm"],
  ["How do I talk to someone I'm worried about?", "Wolverine"],
  ["Goodbye, talk to you later.", "Cable"],
  ["I have to go, take care.", "Storm"],
  ["Night, Wade. Try not to cause trouble.", "Deadpool"],
  ["What should I say to apologize?", "Storm"],
  ["I'm excited about the weekend.", "Deadpool"],
  ["I feel lonely and a little scared.", "Storm"],
  ["I'm okay, just tired.", "Wolverine"],
  ["Do you ever need a day off?", "Cable"],
  ["Logan, would you survive being thrown into the sun?", "Wolverine"],
  ["Wade, what if I ate a Sentinel?", "Deadpool"],
  ["Could you make it rain inside my house?", "Storm"],
  ["Nathan, what happens if I marry my future self?", "Cable"],
  ["Would your healing factor survive the vacuum of space?", "Wolverine"],
  ["Can Storm control a tiny cloud over one person's head?", "Storm"],
  ["Could Cable build a time machine out of a toaster?", "Cable"],
  ["What if Wolverine had to fight one hundred ducks?", "Wolverine"],
  ["Would Deadpool eat a whole pizza sideways?", "Deadpool"],
  ["Is lightning louder when it is angry?", "Storm"],
  ["Can you regenerate from a bad haircut?", "Deadpool"],
  ["What if the Danger Room became a laundromat?", "Cable"],
  ["Would a Sentinel fit in the X-Mansion garage?", "Wolverine"],
  ["If I clone myself, do I have to share my snacks?", "Deadpool"],
  ["Is the moon made of cheese in any timeline?", "Cable"],
  ["Do you think time is just a very long hallway?", "Storm"],
  ["Why do socks disappear in the dryer?", "Wolverine"],
  ["What would happen if a cloud got stage fright?", "Storm"],
  ["Is cereal a soup?", "Deadpool"],
  ["Do trees gossip when the wind blows?", "Cable"],
  ["Could a telepath hear a song stuck in my head?", "Storm"],
  ["Would adamantium chopsticks be practical?", "Wolverine"],
  ["What is your most unusual personal habit?", "Deadpool"],
  ["Do you think free will exists?", "Storm"],
  ["Why are we here, really?", "Cable"],
  ["Wolverine, you are a great friend.", "Wolverine"],
  ["Storm, I admire your leadership.", "Storm"],
  ["Wade, you're hilarious.", "Deadpool"],
  ["Cable, nice work on the plan.", "Cable"],
  ["You are an idiot, Wade.", "Deadpool"],
  ["I think Logan is kind of cute.", "Wolverine"],
  ["Storm, would you ever go on a date with me?", "Storm"],
  ["Tell me some gossip about Scott.", "Cable"],
  ["What happened between Wolverine and Cyclops?", "Wolverine"],
  ["Do you like Scott Summers?", "Wolverine"],
  ["Why?", "Wolverine"],
  ["Would you fight him?", "Wolverine"],
  ["Who would win in a fight, Logan or Storm?", "Wolverine"],
  ["Storm versus Cable: who wins?", "Cable"],
  ["Can Deadpool and Wolverine get along?", "Deadpool"],
  ["Did you ever have an embarrassing moment at school?", "Storm"],
  ["Can I challenge Xavier's decision?", "Cable"],
  ["Is Magneto always wrong?", "Wolverine"],
  ["What do you think of Erik?", "Storm"],
  ["Please tell me if this sounds like a bad idea.", "Cable"],
  ["I'm joking, but what if the mansion had a secret taco room?", "Deadpool"],
  ["That was rude of me. I'm sorry.", "Storm"],
  ["I love your claws, Logan.", "Wolverine"],
  ["Does Wade ever take anything seriously?", "Deadpool"],
  ["Would you trust your own future self?", "Cable"],
  ["Would you rather fight a horse-sized duck or ten duck-sized Sentinels?", "Wolverine"],
  ["What is the weirdest thing someone has asked you?", "Deadpool"],
  ["Do you ever get angry when people disrespect you?", "Storm"],
  ["Tell me a joke about time travel.", "Cable"],
  ["Would you let Professor X read your mind?", "Wolverine"],
  ["Did you ever lose a bet?", "Deadpool"],
  ["I am serious: what gives you hope?", "Storm"],
  ["I failed my driving test and feel awful.", "Cable"],
  ["My cat just stole my homework.", "Wolverine"],
  ["Blorfle rotates quietly behind the purple spoon.", "Deadpool"],
  ["The toaster has declared itself mayor.", "Storm"],
  ["I think my sandwich is judging me.", "Cable"],
  ["My left shoe has a better social life.", "Wolverine"],
  ["The moon misplaced my socks again.", "Deadpool"],
  ["A very polite pigeon knows my password.", "Storm"],
  ["My umbrella keeps making dramatic entrances.", "Cable"],
  ["The soup is suspiciously confident today.", "Wolverine"],
  ["I found a tiny hat in the refrigerator.", "Deadpool"],
  ["The elevator hummed the theme song.", "Storm"],
  ["My calendar just challenged me to a duel.", "Cable"],
  ["The clouds are holding a very quiet meeting.", "Storm"],
  ["I saw three raccoons negotiating a treaty.", "Wolverine"],
  ["My houseplant is writing a memoir.", "Deadpool"],
  ["The hallway seems longer on Tuesdays.", "Cable"],
  ["I laughed at a joke before I understood it.", "Storm"],
  ["Can you repeat that in fewer than four timelines?", "Cable"],
  ["Wait, what about Jean?", "Wolverine"],
  ["What about him, then?", "Storm"],
  ["You serious?", "Deadpool"],
  ["Tell me about mutant discrimination and the Sentinels.", "Storm"],
  ["How did Weapon X change Logan?", "Wolverine"],
  ["What's the deal with Krakoa and the Quiet Council?", "Cable"],
  ["Does the Phoenix Force choose Jean?", "Storm"],
  ["What is the Brotherhood of Mutants trying to do?", "Deadpool"],
  ["Is the Xavier Institute the same as the mansion?", "Wolverine"],
  ["What did you learn in Japan, Logan?", "Wolverine"],
  ["Could the Danger Room predict an alternate timeline?", "Cable"],
  ["Do you believe Xavier's dream can work?", "Storm"],
  ["How do you feel about Magneto's choices?", "Cable"],
  ["The Phoenix and Jean Grey have a complicated history.", "Storm"],
  ["I don't know what to say about this.", "Wolverine"],
  ["Thanks, that actually helped.", "Deadpool"],
  ["brb, need coffee", "Cable"],
  ["u ok, Ororo?", "Storm"],
  ["helo, can u help me?", "Wolverine"],
  ["This is extremely long and full of details that are probably not all relevant, but I wanted to explain the whole situation before asking whether you think I should talk to my friend, apologize for being late, and offer to help them with their project this weekend.", "Storm"],
  ["What if Magneto fought the Sentinels, and then the timeline changed?", "Cable"],
  ["😅", "Deadpool"],
  ["", "Wolverine"],
  ["   ", "Storm"],
  ["I said hello. Hello again. Actually, never mind.", "Deadpool"],
  ["Seriously, what is the point of all this?", "Cable"],
  ["You been hanging around Wade too much?", "Wolverine"]
];

const results = document.querySelector('#results');
const summary = document.querySelector('#summary');
const engine = window.MutantCommsConversationEngine;
let passed = 0;
let failed = 0;

function report(label, success, detail = '') {
  const item = document.createElement('li');
  item.textContent = `${success ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`;
  results.append(item);
  if (success) passed += 1;
  else failed += 1;
}

cases.forEach(([text, character], index) => {
  const id = `suite-case-${index}`;
  engine.reset(id);
  const result = engine.respond({ conversationId: id, character, text });
  const expectedEmpty = !text.trim();
  const valid = expectedEmpty
    ? result.messages.length === 0
    : result.messages.length > 0 &&
      result.messages.every((message) => typeof message.text === 'string' && message.text.length > 0);
  report(`Case ${index + 1}: ${JSON.stringify(text)}`, valid, valid ? '' : 'unexpected response shape');
});
report('At least 100 varied prompt cases', cases.length >= 100, `${cases.length} supplied`);
report('Each supported character has at least 20 fallback lines',
  Object.values(window.MutantCommsDialogue.fallbacks).every((lines) => lines.length >= 20));

const varietyId = 'suite-fallback-variety';
engine.reset(varietyId);
const weirdMessages = [
  'My teacup has started a book club.',
  'The purple bicycle is negotiating with a sandwich.',
  'A sleepy comet borrowed my umbrella.',
  'My shoelaces are rehearsing a musical.',
  'A tiny cactus asked for directions.',
  'The refrigerator is learning to whistle.',
  'Yesterday my notebook challenged a cloud.',
  'A polite spoon is running for mayor.',
  'The hallway adopted a small echo.',
  'My breakfast filed a travel request.',
  'A green pebble knows the secret handshake.',
  'The lamp is wearing an invisible scarf.'
];
const fallbackReplies = weirdMessages.map((text) => engine.respond({
  conversationId: varietyId,
  character: 'Wolverine',
  text
}).messages[0]?.text);
report('Unknown statements receive varied fallback replies',
  fallbackReplies.every(Boolean) && new Set(fallbackReplies).size >= 8,
  `${new Set(fallbackReplies).size} distinct replies`);

const contextId = 'suite-followup-memory';
engine.reset(contextId);
engine.respond({ conversationId: contextId, character: 'Wolverine', text: 'Do you like Scott?' });
const followup = engine.respond({ conversationId: contextId, character: 'Wolverine', text: 'Why?' });
const memory = engine.inspect(contextId);
report('Pronoun/short follow-up retains topic and persisted conversation memory',
  followup.analysis.topics.includes('cyclops') &&
  followup.messages[0].text.includes('respect') &&
  memory.currentTopic === 'cyclops' &&
  memory.recentMessages.length >= 4);

const loreReplies = ['Wolverine', 'Deadpool', 'Storm', 'Cable'].map((character) =>
  engine.respond({
    conversationId: `suite-magneto-${character}`,
    character,
    text: 'What do you think of Magneto?'
  }).messages[0]?.text);
report('Same lore topic receives distinct character perspectives',
  new Set(loreReplies).size === loreReplies.length);

engine.reset('gold-squad');
const group = engine.respond({
  conversationId: 'gold-squad',
  character: 'Gold Squad',
  participants: ['Wolverine', 'Storm'],
  text: 'Who would win in a fight, Wolverine or Storm?'
});
report('Gold Squad replies only from configured participants',
  group.messages.length >= 2 &&
  group.messages.every((message) => ['Wolverine', 'Storm'].includes(message.author)) &&
  !group.messages.some((message) => message.author === 'Deadpool'));

engine.reset('gold-squad');
report('Group chat produces no unscheduled author when no supported members are present',
  engine.respond({
    conversationId: 'gold-squad',
    character: 'Gold Squad',
    participants: ['Beast'],
    text: 'What is happening?'
  }).messages.length === 0);

report('Typo, slang, and entity recognition', (() => {
  const result = engine.respond({
    conversationId: 'suite-typo-slang',
    character: 'Wolverine',
    text: 'helo Logan, thnaks for the help'
  });
  return result.analysis.intent === 'greeting' ||
    result.analysis.intent === 'thanks' ||
    result.analysis.entities.includes('Wolverine');
})());
report('Common misspellings map to intended intents',
  engine.analyze('helo', engine.inspect('suite-typo-slang')).intent === 'greeting' &&
  engine.analyze('thnaks', engine.inspect('suite-typo-slang')).intent === 'thanks');
report('Slang is normalized for wellbeing and activity intents',
  engine.analyze('u ok?', engine.inspect('suite-typo-slang')).intent === 'wellbeing' &&
  engine.analyze('wyd rn?', engine.inspect('suite-typo-slang')).intent === 'activity');
report('Character-specific ability questions are identified correctly',
  engine.analyze('Can Storm control a tiny cloud?', engine.inspect('suite-character-power')).intent === 'power');

const originalRandom = Math.random;
let splitResponse;
engine.reset('suite-deadpool-split');
try {
  Math.random = () => 0.1;
  splitResponse = engine.respond({
    conversationId: 'suite-deadpool-split',
    character: 'Deadpool',
    text: 'What do you think of Magneto?'
  });
} finally {
  Math.random = originalRandom;
}
report('Occasional multi-message replies split without duplicating dialogue',
  splitResponse.messages.length === 2 &&
  splitResponse.messages[0].text !== splitResponse.messages[1].text &&
  `${splitResponse.messages[0].text} ${splitResponse.messages[1].text}` ===
    'Magneto can bend metal. I can bend a conversation until it files a complaint.');

const supportResponse = engine.respond({
  conversationId: 'suite-support',
  character: 'Storm',
  text: "I'm having a rough day."
});
report('Emotional cues receive an empathetic in-character response',
  supportResponse.analysis.mood === 'difficult' &&
  /sorry|deserve care|difficult day alone|here with you/i.test(supportResponse.messages[0].text));

const unclearResponse = engine.respond({
  conversationId: 'suite-unclear-question',
  character: 'Cable',
  text: 'What is the color of my imaginary spaceship?'
});
report('Unclear questions avoid claiming understanding',
  unclearResponse.analysis.topics.length === 0 &&
  !/^(i understand|i know what you mean|that makes sense)/i.test(unclearResponse.messages[0].text));
const unusualId = 'suite-unusual-callback';
engine.reset(unusualId);
['Is soup a liquid?', 'Can a cloud learn chess?', 'Why does my pencil look suspicious?', 'Would Tuesday wear a hat?']
  .forEach((text) => engine.respond({ conversationId: unusualId, character: 'Wolverine', text }));
report('Repeated unusual questions are remembered for callbacks',
  engine.inspect(unusualId).unusualStreak === 4);
report('Dialogue data declares its comic continuity',
  window.MutantCommsDialogue.continuity.includes('Earth-616'));
const expectedIntentCategories = [
  'profanity_casual', 'profanity_aggressive', 'playful_insult', 'compliment',
  'crush_question', 'dating_question', 'romantic_history', 'flirting', 'jealousy',
  'appearance_question', 'avatar_changed', 'avatar_roast', 'roast_request',
  'awkward_question', 'spicy_banter'
];
report('Every new dialogue category has multiple normal and spicy replies per character',
  expectedIntentCategories.every((intent) =>
    ['normal', 'spicy'].every((mode) =>
      ['Wolverine', 'Deadpool', 'Storm', 'Cable'].every((character) =>
        window.MutantCommsDialogue.modeIntents[intent]?.[mode]?.[character]?.length >= 2))));

const profanityCases = [
  ['What the fuck?', 'profanity_casual'],
  ["This is fucking annoying.", 'profanity_casual'],
  ['Shut the fuck up.', 'profanity_aggressive'],
  ["You're a funny bastard.", 'playful_insult'],
  ["You're fucking awesome.", 'compliment']
];
profanityCases.forEach(([text, expected]) => {
  report(`Profanity context: ${JSON.stringify(text)}`,
    engine.analyze(text, engine.inspect('suite-profanity')).intent === expected);
});
report('Profanity recognition does not erase frustration tone',
  engine.analyze('This is fucking annoying.', engine.inspect('suite-profanity')).mood === 'difficult');

const romanceCases = [
  ["Who's your crush?", 'crush_question'],
  ['Do you like Jean?', 'crush_question'],
  ['Are you dating anyone?', 'dating_question'],
  ['Have you ever kissed someone?', 'romantic_history'],
  ['Would you date me?', 'flirting'],
  ['Are you jealous of Scott?', 'jealousy'],
  ["Who's the most attractive X-Man?", 'appearance_question']
];
romanceCases.forEach(([text, expected]) => {
  report(`Romance recognition: ${JSON.stringify(text)}`,
    engine.analyze(text, engine.inspect('suite-romance')).intent === expected);
});
[
  ['Can you roast me?', 'roast_request'],
  ['That is an awkward question.', 'awkward_question'],
  ['Be brutally honest with me.', 'spicy_banter']
].forEach(([text, expected]) => {
  report(`Personal banter recognition: ${JSON.stringify(text)}`,
    engine.analyze(text, engine.inspect('suite-banter')).intent === expected);
});

const originalRandomForMode = Math.random;
let normalFlirt;
let spicyFlirt;
try {
  Math.random = () => 0;
  engine.reset('suite-normal-flirt');
  normalFlirt = engine.respond({
    conversationId: 'suite-normal-flirt',
    character: 'Storm',
    text: 'Would you date me?'
  }).messages[0]?.text;
  engine.reset('suite-spicy-flirt');
  spicyFlirt = engine.respond({
    conversationId: 'suite-spicy-flirt',
    character: 'Storm',
    text: 'Would you date me?',
    spicyMode: true
  }).messages[0]?.text;
} finally {
  Math.random = originalRandomForMode;
}
report('Spicy Mode selects a distinct character-appropriate flirt response',
  Boolean(normalFlirt && spicyFlirt && normalFlirt !== spicyFlirt));

const romanceFollowupId = 'suite-romance-followup';
engine.reset(romanceFollowupId);
engine.respond({ conversationId: romanceFollowupId, character: 'Wolverine', text: "Who's your crush?" });
const romanceFollowup = engine.respond({
  conversationId: romanceFollowupId,
  character: 'Wolverine',
  text: 'Come on, tell me.'
});
report('Persistent romantic questions unlock a character-specific follow-up',
  romanceFollowup.analysis.intent === 'crush_question' &&
  /quit|enough questions/i.test(romanceFollowup.messages[0]?.text || '') &&
  engine.inspect(romanceFollowupId).personalQuestions >= 2);
const romanceUnlock = engine.respond({
  conversationId: romanceFollowupId,
  character: 'Wolverine',
  text: 'Really?'
});
report('Further personal questions unlock a more candid relationship branch',
  romanceUnlock.analysis.intent === 'crush_question' &&
  /jean|mariko|loved hard/i.test(romanceUnlock.messages[0]?.text || ''));

const profanityFollowupId = 'suite-profane-followup';
engine.reset(profanityFollowupId);
engine.respond({
  conversationId: profanityFollowupId,
  character: 'Wolverine',
  text: "Logan, you're a fucking asshole."
});
const profanityFollowup = engine.respond({
  conversationId: profanityFollowupId,
  character: 'Wolverine',
  text: 'By who?'
});
report('Profanity banter remembers and answers its short follow-up',
  profanityFollowup.analysis.isFollowup &&
  profanityFollowup.messages[0]?.text === 'How much time you got?');

const groupReactionId = 'gold-squad';
engine.reset(groupReactionId);
const originalRandomForGroup = Math.random;
let groupBanter;
try {
  Math.random = () => 0;
  groupBanter = engine.respond({
    conversationId: groupReactionId,
    character: 'Gold Squad',
    participants: ['Wolverine', 'Storm', 'Deadpool'],
    text: "Who's your crush?"
  });
} finally {
  Math.random = originalRandomForGroup;
}
report('Group romance prompts can invite multiple roster-only reactions',
  groupBanter.messages.length > 1 &&
  groupBanter.messages.every((message) => ['Wolverine', 'Storm', 'Deadpool'].includes(message.author)));

const originalRandomForInsult = Math.random;
let groupInsult;
try {
  Math.random = () => 0;
  engine.reset('gold-squad');
  groupInsult = engine.respond({
    conversationId: 'gold-squad',
    character: 'Gold Squad',
    participants: ['Wolverine', 'Storm'],
    text: "You're a funny bastard."
  });
} finally {
  Math.random = originalRandomForInsult;
}
report('Group profanity banter stays in character and inside the roster',
  groupInsult.analysis.intent === 'playful_insult' &&
  groupInsult.messages.length > 1 &&
  groupInsult.messages.every((message) => ['Wolverine', 'Storm'].includes(message.author)));

const originalRandomForAvatar = Math.random;
let avatarComment;
try {
  Math.random = () => 0;
  avatarComment = engine.avatarReaction({
    conversationId: 'suite-avatar-comment',
    character: 'Storm',
    vibe: 'Mysterious',
    hasPicture: true
  });
} finally {
  Math.random = originalRandomForAvatar;
}
report('Avatar reactions use the selected vibe without claiming image recognition',
  avatarComment?.author === 'Storm' &&
  /mystery|mysterious/i.test(avatarComment.text) &&
  !/you look|i can see|in the picture/i.test(avatarComment.text));

let avatarResetComment;
try {
  Math.random = () => 0;
  avatarResetComment = engine.avatarReaction({
    conversationId: 'suite-avatar-reset',
    character: 'Cable',
    hasPicture: false
  });
} finally {
  Math.random = originalRandomForAvatar;
}
report('Removing an avatar produces a distinct scripted reset reaction',
  avatarResetComment?.author === 'Cable' && /reset|removed|default/i.test(avatarResetComment.text));

summary.textContent = `${passed} passed, ${failed} failed.`;
summary.style.color = failed ? '#b00020' : '#08752d';
