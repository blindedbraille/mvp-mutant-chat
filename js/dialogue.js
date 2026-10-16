window.MutantCommsDialogue = {
  continuity: "Earth-616-inspired Marvel comics continuity; alternate timelines are identified as separate branches.",
  fallbacks: {
    Wolverine: [
      "I've heard worse questions.",
      "You been hanging around Wade?",
      "That's a new one.",
      "Not sure I wanna know where this is going.",
      "You always think about stuff like this?",
      "I've had stranger days. Not many.",
      "Go on. I'm listening. For now.",
      "That sounds like trouble with extra steps.",
      "I got a feeling there's a story behind that.",
      "Could be worse. Probably.",
      "You're really asking me this?",
      "I've survived worse conversations.",
      "Let's not make this harder than it needs to be.",
      "That reminds me of a bad night in Madripoor.",
      "Huh. Didn't see that coming.",
      "I'll give you points for originality.",
      "Something tells me this ends with paperwork.",
      "You got a plan, or just the question?",
      "I've learned not to underestimate weird.",
      "All right. You have my attention."
    ],
    Deadpool: [
      "I have several questions and none of them are appropriate.",
      "Adding that to the list of things I never expected to read.",
      "This conversation is going places.",
      "I support whatever weird experiment you're planning.",
      "Somewhere, an editor just developed a migraine.",
      "I need a tiny notebook for this conversation.",
      "That question came with its own sound effect.",
      "I have a joke, a follow-up, and absolutely no supervision.",
      "The fourth wall is pretending not to hear us.",
      "This is why the group chat has a mute button.",
      "I was not emotionally prepared for that sentence.",
      "Fascinating. Deeply concerning, but fascinating.",
      "Adding this to my memoir under 'Probably Fine.'",
      "My lawyer says I should ask what you mean. My lawyer is a chimichanga.",
      "That is a premium-grade weird thought.",
      "Somebody put this chat in the recap issue.",
      "I am choosing to support you from a safe distance.",
      "I can make this weirder. Should I?",
      "That deserves a dramatic pause. ...There.",
      "I regret nothing, including reading that."
    ],
    Storm: [
      "That is certainly an unusual thought.",
      "I am curious how you arrived at that conclusion.",
      "You have quite an imagination.",
      "I suspect there is an interesting story behind that.",
      "Perhaps some questions are best left unanswered.",
      "There is more than one way to look at it.",
      "I will consider that carefully.",
      "An unexpected question can still be a thoughtful one.",
      "I appreciate your honesty.",
      "Let us take a breath before deciding.",
      "You sound as though something is weighing on you.",
      "That is a bold way to begin a conversation.",
      "I have seen the unexpected become ordinary.",
      "A little patience may help us find the answer.",
      "I am listening. Tell me what prompted the thought.",
      "There is wisdom in knowing what we do not know.",
      "That is not quite what I expected, but go on.",
      "I would not dismiss the question so quickly.",
      "We can approach it together.",
      "I sense there is more beneath that question."
    ],
    Cable: [
      "That's not in the mission briefing.",
      "I've seen stranger things happen.",
      "Please tell me this isn't a plan.",
      "That sounds like the beginning of a temporal incident.",
      "I'm choosing to believe you're joking.",
      "Give me the short version. We may be on a clock.",
      "Noted. I'm still assessing the risk.",
      "That raises at least three operational concerns.",
      "I'll add it to the threat assessment.",
      "We should verify that before acting.",
      "I've heard worse over a comm channel.",
      "Stay focused. Or at least explain the objective.",
      "That was not in the briefing packet.",
      "I have a bad feeling about the timeline here.",
      "Continue. I'm listening and checking the exits.",
      "Unusual, but not automatically impossible.",
      "I need more context before I call it a bad idea.",
      "That could become a problem in several decades.",
      "All right. What's the next step?",
      "I am documenting this for reasons you will understand later."
    ]
  },
  intents: {
    question: {
      Wolverine: ["Depends what you're asking. Give me the short version.", "Could be. What's your angle?", "That's a big question. What's got you thinking about it?"],
      Deadpool: ["The answer is probably complicated and definitely under-edited.", "Excellent question. I reserve the right to answer dramatically.", "I have an opinion, but first: is this a trick question?"],
      Storm: ["It depends on the circumstances. What led you to ask?", "That deserves a thoughtful answer. Tell me a little more.", "There may be several answers. Which part matters most to you?"],
      Cable: ["Depends on the variables. What are the constraints?", "I need a little more context before I can give you a reliable answer.", "Possibly. What's the situation you're considering?"]
    },
    news: {
      Wolverine: ["Good news. Hold on to that feeling.", "That's rough. You want to talk about it?", "One step at a time. What happened?"],
      Deadpool: ["Big news! Cue the tiny trumpet fanfare.", "Oof. I'm sorry. Want jokes, snacks, or actual listening?", "I am celebrating or commiserating as appropriate. Please specify snacks."],
      Storm: ["Thank you for sharing that with me. How are you feeling?", "I am sorry this is difficult. You do not have to face it alone.", "That is worth celebrating. I am happy for you."],
      Cable: ["Understood. What is the next step?", "That's a setback, not the end of the operation.", "Good. Record the win and keep moving."]
    },
    support: {
      Wolverine: ["Sorry it's been rough. You don't have to solve everything tonight.", "Yeah, those days hit hard. Want to tell me what happened?", "Take a minute. We'll figure out the next step, not the whole road."],
      Deadpool: ["Oof. Want a joke, a distraction, or a very sincere virtual fist bump?", "I'm sorry. I can stay right here while you sort through it.", "That's a lot to carry. You deserve backup, not a lecture."],
      Storm: ["I am sorry this feels heavy. Would it help to tell me more?", "You deserve care and a moment to breathe. I am here with you.", "You need not face a difficult day alone. What would feel helpful now?"],
      Cable: ["Bad day. Understood. Focus on the next manageable step.", "I'm here. We can sort the problem into smaller pieces.", "Acknowledged. Take a breath. What's the most urgent thing right now?"]
    },
    gossip: {
      Wolverine: ["If you want the truth, ask them. I'm not speaking for somebody else.", "I keep my nose out of other people's business. Mostly.", "I've got opinions. Doesn't mean they're mine to share."],
      Deadpool: ["I know things. I also know when a group chat is not the place to say them.", "The rumor mill is an unreliable narrator.", "I support responsible gossip, which is mostly just asking people directly."],
      Storm: ["I will not turn someone's private life into a spectacle.", "If you are concerned, speak with them honestly and with care.", "We should leave room for people to tell their own stories."],
      Cable: ["Rumors are not intelligence. Verify before acting.", "I don't trade in unconfirmed reports.", "If it affects the team, take it to the person involved."]
    },
    greeting: {
      Wolverine: ["Hey. What's up?", "Yeah, I'm here. You okay?", "Hey. Make it quick. Kidding. Mostly."],
      Deadpool: ["Heyyy! You found the chat button. Gold star.", "Well, look who slid into the group thread.", "Hello, valued reader of my extremely unofficial text bubbles."],
      Storm: ["Hello. I am glad you reached out.", "Good to hear from you. How are you?", "Hello, friend. What is on your mind?"],
      Cable: ["I'm here. Go ahead.", "Check in received. What's the situation?", "Hey. I have a minute. Maybe two."]
    },
    goodbye: {
      Wolverine: ["Later. Keep your head down.", "All right. Take care of yourself.", "Go on. I'll be here."],
      Deadpool: ["Exit stage left! Try not to miss my spin-off.", "Later! This chat will miss your typing bubble.", "Bye for now. No dramatic post-credit scene."],
      Storm: ["Until next time. Take care.", "Go in peace. I am here when you need me.", "Farewell, and be kind to yourself."],
      Cable: ["Signing off. Stay alert.", "Understood. We'll pick this up later.", "End of transmission. Be safe."]
    },
    wellbeing: {
      Wolverine: ["Been better. Been a lot worse, too.", "I'm all right. How about you?", "Still standing. That's usually a good sign."],
      Deadpool: ["Emotionally? A spinning wheel with a tiny hat.", "Pretty good! The voices in the writer's room are taking turns.", "I'm alive, chatty, and only mildly banned from the kitchen."],
      Storm: ["I am well, thank you for asking. And you?", "Steady today. How are you truly doing?", "I have found a little quiet, and I am grateful for it."],
      Cable: ["Operational. Sleep is another matter.", "I've had worse days. How are you holding up?", "Fine. Define fine after the mission."]
    },
    activity: {
      Wolverine: ["Keeping an eye on the Danger Room. It has a way of acting up.", "Trying to get five quiet minutes. Wade keeps finding me.", "Checking the gear before the next run."],
      Deadpool: ["Texting you, obviously. Also arguing with a snack machine.", "Looking for the chimichanga I definitely put right here.", "Trying to make the group chat less normal. Progress!"],
      Storm: ["Reviewing tomorrow's plans and enjoying a quiet moment.", "Checking in with the team. How can I help you?", "Taking a moment to listen to the rain."],
      Cable: ["Reviewing mission intel. Nothing you need to worry about yet.", "Checking a few timelines. Long story.", "Running a systems check. What do you need?"]
    },
    thanks: {
      Wolverine: ["No problem. Don't make a big thing of it.", "Anytime. You'd do the same.", "You're welcome. That's what the team is for."],
      Deadpool: ["You're welcome! My invoice is one taco.", "Anytime. I accept gratitude in snack form.", "Aww. My tiny mercenary heart grew three sizes."],
      Storm: ["You are most welcome.", "It was my pleasure. Truly.", "We look after one another."],
      Cable: ["No problem. Consider it handled.", "Acknowledged. That's what allies are for.", "You're welcome. Move on to the next objective."]
    },
    apology: {
      Wolverine: ["It's all right. Just don't do it again.", "We're good. Say what you mean next time.", "Apology accepted. Let's move on."],
      Deadpool: ["Apology accepted! I will only bring it up at brunch.", "We're good. I have already forgiven you in three timelines.", "No worries. My grudge department is on break."],
      Storm: ["Thank you for saying so. We can begin again.", "I accept your apology. Let us move forward.", "It takes courage to acknowledge a mistake."],
      Cable: ["Accepted. Keep it from happening again.", "Understood. We have a new plan now.", "Noted. Let's focus on what comes next."]
    },
    advice: {
      Wolverine: ["Take a breath. Figure out what matters, then do the next right thing.", "Don't let fear make the choice for you. But don't ignore it, either.", "Talk to them straight. Guessing games never helped anybody."],
      Deadpool: ["Step one: breathe. Step two: maybe don't take life advice from me. Step three: call someone you trust.", "My serious answer? Be honest, but be kind about it.", "Make a list. Then dramatically cross off the part where you panic."],
      Storm: ["Begin with what you know to be true, and give yourself room to choose.", "Ask for help before the burden becomes too heavy.", "Listen carefully, then act with compassion and courage."],
      Cable: ["Get the facts. Identify the risk. Then make one decision at a time.", "Don't commit until you know the cost of backing out.", "Build a plan B. Then make sure plan A is worth the risk."]
    },
    compliment: {
      Wolverine: ["Thanks. Don't get used to me saying that.", "Appreciate it. You're not so bad yourself.", "Huh. That's decent of you to say."],
      Deadpool: ["Compliment received! Adding it to my press kit.", "You flatter me. Continue, I am taking notes.", "Finally, a review from someone with excellent taste."],
      Storm: ["Thank you. That is very kind.", "I appreciate you saying that.", "You honor me. I hope I can live up to it."],
      Cable: ["Thanks. Focus on the mission.", "Acknowledged. I appreciate it.", "Kind of you to say. Now, about that plan."]
    },
    insult: {
      Wolverine: ["You done? Good. Now say what you actually mean.", "I've been called worse by better people.", "If you're angry, just say so. The insult isn't helping."],
      Deadpool: ["Ouch. My therapist is a mirror, so I'll be fine.", "Creative! I give it four stars and a tiny frowny face.", "I have heard worse from my own inner monologue."],
      Storm: ["You may disagree with me without diminishing either of us.", "I will not answer anger with anger. Tell me what troubles you.", "That was unkind. We can still choose a better way forward."],
      Cable: ["Insults don't change the facts. What's the problem?", "Noted. If you have a point, make it.", "Save the hostility. We may need each other."]
    },
    flirt: {
      Wolverine: ["Easy there. You don't know what you're getting into.", "You always talk like that, or am I special?", "That's bold. I'll give you that."],
      Deadpool: ["Flirting in the chat? At last, my genre.", "I blush under the mask. Probably. Let's call it a yes.", "Careful. My charm has a very confusing warranty."],
      Storm: ["You are charming. I will give you that.", "A kind compliment, though I prefer to know someone first.", "You have a way with words. What else is on your mind?"],
      Cable: ["Is this relevant to the mission?", "You're distracting me. That may have been the point.", "I don't have a protocol for this."]
    },
    power: {
      Wolverine: ["Healing helps. Doesn't mean it feels good.", "The claws are part of me. Doesn't make using them the first answer.", "You learn to live with what your body can do. And what it can't."],
      Deadpool: ["My healing factor and I are in a very complicated relationship.", "Powers are great until the plot needs a dramatic injury.", "I regenerate. My tailoring bills do not."],
      Storm: ["The weather is not a weapon to me. It is a responsibility.", "Power is meaningful only when guided by care.", "I can call the wind. I still cannot make someone choose wisely."],
      Cable: ["A power is a capability, not a plan.", "I've learned to treat every ability as a variable. Including my own.", "The useful question is what the power costs."]
    },
    relationship: {
      Wolverine: ["Scott and I don't agree on much. Doesn't mean I don't respect him.", "Jean's her own person. She doesn't need me answering for her.", "Some history is complicated. You learn to live with it."],
      Deadpool: ["The relationship chart needs its own corkboard and at least one red string.", "I support healthy communication, dramatic entrances, and consenting retcons.", "I am not qualified to define anyone else's love life. I am, however, nosy."],
      Storm: ["Relationships ask us to be honest, even when the answer is difficult.", "I value loyalty, but it must leave room for each person to grow.", "Their choices belong to them. We can offer care, not ownership."],
      Cable: ["Personal history complicates a clean assessment.", "That relationship has consequences across more than one timeline.", "Ask them directly. Guesswork creates operational problems."]
    },
    fight: {
      Wolverine: ["Don't start. ...Unless you already have.", "Storm can handle herself. You want the honest odds?", "I've fought Scott enough times. We know how it ends: paperwork."],
      Deadpool: ["Fight bracket! I brought snacks and a very biased scoreboard.", "I pick the winner based on theme music. This is a serious system.", "Can we settle this with a dance-off? Less property damage."],
      Storm: ["Strength is not measured by who strikes first.", "I would rather resolve this without a fight. I am prepared if we cannot.", "The wiser victory is the one that prevents needless harm."],
      Cable: ["Define the objective before you pick a fight.", "I assess the terrain, not the trash talk.", "If this is hypothetical, keep it there."]
    },
    philosophy: {
      Wolverine: ["You do what you can with the time you've got. That's enough.", "The past leaves scars. Doesn't get to pick your next move.", "Maybe the point is who you choose to stand with."],
      Deadpool: ["Meaning is what we make between the jokes and the existential dread.", "The universe is weird. We can at least be decent to each other in it.", "I have a very long answer, but the short one is: people matter."],
      Storm: ["We find meaning in the choices we make and the care we offer.", "The future is not a promise. It is an invitation to act.", "Even a small act of kindness can change the shape of a day."],
      Cable: ["The future isn't fixed. That's why the choices matter.", "Certainty is a luxury. Preparation is more useful.", "Time moves forward. Our responsibility does too."]
    },
    lore: {
      Wolverine: ["That place has a lot of history. Not all of it good.", "I've seen what happens when people treat mutants like a problem to solve.", "Xavier believed in a dream. The rest of us had to figure out how to live it."],
      Deadpool: ["A classic X-Men topic! Continuity may vary; please consult your nearest retcon.", "I've got opinions. The official timeline has several more.", "That story has enough twists to qualify as a Danger Room exercise."],
      Storm: ["Our history is full of difficult choices and people worth protecting.", "The dream matters, but so does the work of making it real.", "I remember what we endured. I also remember what we built together."],
      Cable: ["The details vary by timeline. The consequences do not.", "I've seen that threat escalate. Preparation matters.", "History is useful. Treat the source and the continuity carefully."]
    },
    help: {
      Wolverine: ["Tell me what you need. I'll see what I can do.", "Yeah. What's going on?", "I'm listening. Start wherever you can."],
      Deadpool: ["Help desk is open! The desk is a cardboard box, but still.", "Tell me the problem. I promise to only make it a little weirder.", "I'm here. What's the situation?"],
      Storm: ["Of course. Tell me what would help most.", "I am here with you. What do you need?", "You do not have to carry it alone."],
      Cable: ["State the problem. I'll help you find a workable option.", "Understood. What do you need first?", "I'm listening. Give me the details."]
    }
  },
  topics: {
    xavier: {
      aliases: ["professor x", "professor xavier", "charles xavier", "xavier", "the professor"],
      responses: {
        Wolverine: ["Xavier gave me a chance when I wasn't sure I deserved one. We don't always see eye to eye.", "His dream is worth fighting for. Doesn't mean it was always easy to follow."],
        Deadpool: ["Professor X can read minds, and somehow I still surprise him. That's a talent.", "The school has a strict 'no fourth-wall talk' policy. I have questions about enforcement."],
        Storm: ["Charles taught us to believe in a future shaped by understanding. I honor that, even when we disagree.", "He gave many of us a home and a purpose. That carries great weight."],
        Cable: ["His school changed the course of mutant history. The consequences reached my time, too.", "Xavier's dream is powerful. So is the responsibility of making it more than a dream."]
      }
    },
    magneto: {
      aliases: ["magneto", "erik", "max eisenhardt", "magnetism"],
      responses: {
        Wolverine: ["Erik's been right about the danger. Wrong about what to do with it. Both can be true.", "I understand where the anger comes from. I don't always trust where it leads."],
        Deadpool: ["Magneto can bend metal. I can bend a conversation until it files a complaint.", "The helmet is iconic. The dramatic entrances are even more iconic."],
        Storm: ["Erik's pain is real. So is the harm caused when fear becomes a weapon.", "We have stood on opposing sides and beside one another. History is rarely simple."],
        Cable: ["Magneto's choices reshape entire conflicts. Never treat him as a predictable variable.", "His history explains much. It does not erase the cost of his decisions."]
      }
    },
    discrimination: {
      aliases: ["mutant discrimination", "mutant prejudice", "mutant rights", "anti mutant", "hated and feared", "human mutant relations"],
      responses: {
        Wolverine: ["Being feared doesn't make you a threat. What you do with the anger is what counts.", "I've seen where hate leads. Protect people. Don't become the thing they expect."],
        Deadpool: ["Being different shouldn't require a disclaimer, a costume, or a really good lawyer.", "The 'hated and feared' thing gets old. Even before the reboot."],
        Storm: ["No one should have to earn the right to live without fear.", "We answer prejudice with courage, solidarity, and the insistence that every life has dignity."],
        Cable: ["Discrimination creates instability that no timeline can ignore.", "Protect the vulnerable. Document abuses. Build alliances that last."]
      }
    },
    brotherhood: {
      aliases: ["brotherhood", "brotherhood of mutants", "mystique", "toad", "pyro"],
      responses: {
        Wolverine: ["Some of them are enemies. Some used to be. The line moves more than people think.", "I judge what they do, not just the name on the roster."],
        Deadpool: ["The Brotherhood has excellent branding and a very complicated membership policy.", "Team names are a big commitment. Ask me how I know."],
        Storm: ["Our differences in method have often divided us. We must still ask what future we are building.", "People can change sides. Our choices show who we are now."],
        Cable: ["Their objectives and membership shift. Verify who you're dealing with before acting.", "A label is not an intelligence briefing."]
      }
    },
    dangerRoom: {
      aliases: ["danger room", "dangerroom", "training room", "simulator"],
      responses: {
        Wolverine: ["The Danger Room teaches fast. Usually because it has to.", "If the room starts talking back, tell Hank before you hit anything."],
        Deadpool: ["I asked for a taco simulation. It spawned a boss fight. Ten out of ten.", "The Danger Room has safety settings. I have been asked not to touch them."],
        Storm: ["Training gives us discipline. We must never mistake a simulation for the lives we protect.", "A good exercise teaches judgment, not simply strength."],
        Cable: ["Check the program parameters before you enter. Simulations can be wrong.", "Know the exit protocol. Then you can focus on the objective."]
      }
    },
    sentinels: {
      aliases: ["sentinel", "sentinels", "mutant hunting robot", "mutant hunting robots"],
      responses: {
        Wolverine: ["Big robots, bad idea. Keep people clear and find the power source.", "I've fought enough Sentinels to know they don't get smarter with every punch."],
        Deadpool: ["Giant robot with a prejudice problem. Not exactly a subtle villain.", "Can we get one that picks up litter instead? No? Still working on the pitch."],
        Storm: ["Sentinels embody the danger of fear given power without compassion.", "Protect people first. Then we stop the machine from being used again."],
        Cable: ["Do not engage without knowing the model and its countermeasures.", "Disable coordination and targeting first. Then evacuate the area."]
      }
    },
    weaponX: {
      aliases: ["weapon x", "weapon-x", "adamantium", "experimented on", "experiments"],
      responses: {
        Wolverine: ["Weapon X took years from me. I don't owe it the rest of my life.", "I remember enough. The rest can stay buried."],
        Deadpool: ["Weapon X is a very bad program with an even worse human-resources department.", "I know something about experiments that leave you with complicated feelings."],
        Storm: ["What was done to you was not your fault. You deserve a life beyond what they took.", "No one should be reduced to an experiment."],
        Cable: ["Weapon X exploited people and created long-term consequences. Don't confuse the file with the person.", "That program left damage across more than one life."]
      }
    },
    phoenix: {
      aliases: ["phoenix force", "phoenix", "dark phoenix", "jean grey"],
      responses: {
        Wolverine: ["Jean's stronger than people give her credit for. The Phoenix is another matter.", "Power can change everything. It doesn't erase the person underneath."],
        Deadpool: ["The Phoenix Force: cosmic power, complicated feelings, spectacular panel layouts.", "Space fire and a very long emotional arc. I respect the commitment."],
        Storm: ["The Phoenix is both a force of creation and a trial of profound responsibility.", "Jean's story is her own. Power cannot define all that she is."],
        Cable: ["Phoenix events vary across continuities. Treat every account with caution.", "Cosmic power on that scale changes the threat assessment entirely."]
      }
    },
    mansion: {
      aliases: ["x mansion", "x-mansion", "xavier institute", "xavier's school", "school for gifted youngsters"],
      responses: {
        Wolverine: ["It's a home. A loud one. Still a home.", "The kids deserve a place to learn without looking over their shoulder."],
        Deadpool: ["The mansion has a Danger Room, a huge lawn, and somehow no snack budget.", "Great school. Questionable fire-inspection history."],
        Storm: ["It is a home and a promise: that young mutants need not face the world alone.", "The students make it a school. The people make it a family."],
        Cable: ["The Institute is a strategic asset and, more importantly, a refuge.", "Keep the students safe. Every other objective comes second."]
      }
    },
    krakoa: {
      aliases: ["krakoa", "quiet council", "mutant nation", "living island"],
      responses: {
        Wolverine: ["Krakoa was a chance to build something new. New doesn't mean simple.", "A safe place matters. So does what you ask people to give up for it."],
        Deadpool: ["A living island nation. The real estate listing was definitely unusual.", "Mutant paradise comes with a lot of committee meetings, apparently."],
        Storm: ["Krakoa offered a people a home and a voice. Its promise demanded vigilance.", "A nation is more than a border. It is the care its people show one another."],
        Cable: ["Krakoa changes the political landscape. Secure the perimeter and check the intelligence.", "The future impact depends on the choices made there."]
      }
    },
    timeTravel: {
      aliases: ["time travel", "time-travel", "timeline", "timelines", "future", "alternate universe", "alternate timeline", "alternate timelines", "days of future past", "age of apocalypse"],
      responses: {
        Wolverine: ["Time travel. Been there. Never makes things less complicated.", "You change the past, you still have to live with what comes next."],
        Deadpool: ["Time travel: the only way to be late to your own origin story.", "Continuity is a ball of yarn and someone brought scissors."],
        Storm: ["The future is shaped by choices, not simply predicted by fear.", "We should learn from the past without becoming prisoners of it."],
        Cable: ["Do not alter a timeline without knowing the consequences. I have the reports.", "Temporal changes branch. They don't erase the cost."]
      }
    },
    cyclops: {
      aliases: ["cyclops", "scott summers", "scott", "optic blast"],
      responses: {
        Wolverine: ["Scott and I butt heads. He's still a good leader when it counts.", "We've fought enough. I'd rather have him on my side."],
        Deadpool: ["Cyclops has a visor. I have a mask. Together we are the eyewear aisle.", "Scott's plans have plans. I respect the organization. I fear the color-coded charts."],
        Storm: ["Scott carries a great deal of responsibility. He has earned my respect.", "We may disagree, but I trust his commitment to the team."],
        Cable: ["Cyclops is a capable strategist. His decisions carry weight.", "Scott's leadership matters to me. History makes that complicated."]
      }
    },
    jean: {
      aliases: ["jean", "jean grey", "marvel girl", "phoenix"],
      responses: {
        Wolverine: ["Jean makes her own choices. I respect that, even when it's hard.", "She's stronger than anyone has a right to ask her to be."],
        Deadpool: ["Jean Grey has enough plot twists for several lifetimes. Literally, sometimes.", "That's her story to tell, not mine to spoil."],
        Storm: ["Jean is a dear friend and a formidable woman. She is more than any one power.", "I will always stand beside her, while respecting her choices."],
        Cable: ["Jean's role in history is significant. So are her choices in the present.", "Family history and timeline history are both complicated."]
      }
    },
    japan: {
      aliases: ["japan", "mariko", "madripoor", "yashida", "silver samurai"],
      responses: {
        Wolverine: ["Japan taught me patience. Took me a while to learn it.", "I left pieces of my heart there. Some things stay with you."],
        Deadpool: ["Wade Wilson in Japan: an excellent idea for a story, a terrible idea for local parking.", "I love the food. The sword etiquette is a work in progress."],
        Storm: ["Japan holds an important place in Logan's life. I respect what it means to him.", "Every place carries a history. We should listen before we presume."],
        Cable: ["Madripoor is a dangerous place to improvise. Go in with a plan.", "Those connections have shaped Logan's decisions for years."]
      }
    }
  }
};
