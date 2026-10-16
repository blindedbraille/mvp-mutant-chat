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
  modeIntents: {
    profanity_casual: {
      normal: {
        Wolverine: ["Easy, bub. What happened?", "That bad, huh? Want to tell me why?"],
        Deadpool: ["Language! I mean, I use it too, but still.", "That word arrived with a tiny explosion."],
        Storm: ["Something has clearly unsettled you. Would you like to speak of it?", "Let us take a breath. What happened?"],
        Cable: ["Copy that. Identify the problem before it escalates.", "Understood. What triggered that reaction?"]
      },
      spicy: {
        Wolverine: ["Yeah, that about sums it up. What went sideways?", "Hell of a day, huh? Give me the short version."],
        Deadpool: ["A+ profanity. Needs more dramatic lighting.", "The swear jar just filed for bankruptcy."],
        Storm: ["A forceful word. Now tell me what truly troubles you.", "Even the skies swear sometimes. What happened?"],
        Cable: ["Noted. Now give me the unfiltered situation report.", "That was colorful. Get to the problem."]
      }
    },
    profanity_aggressive: {
      normal: {
        Wolverine: ["I've been called worse. What are you actually mad about?", "Keep pushing and I'll end this conversation. What are you really mad about?"],
        Deadpool: ["Whoa. I can take a hit, but let's aim for funny instead of cruel.", "That came in hot. Want to try saying what you mean?"],
        Storm: ["I will not answer hostility with hostility. Tell me what is truly wrong.", "You may be angry, but we can still speak with care."],
        Cable: ["Hostility noted. State the issue without the theatrics.", "Save the threat. Tell me what needs fixing."]
      },
      spicy: {
        Wolverine: ["Yeah, been called worse. You done, or is there a point in there?", "Wanna keep swinging, bub? At least make it interesting."],
        Deadpool: ["Bold choice. My feelings are made of plot armor and spite.", "I'll pretend to be offended if you promise to workshop that insult."],
        Storm: ["You mistake restraint for permission. Choose your next words wisely.", "I command the weather; do not test how calm I can remain."],
        Cable: ["That was your opening move? I've seen better reasoning from a malfunctioning drone.", "Try again when you have a point and a pulse."]
      }
    },
    playful_insult: {
      normal: {
        Wolverine: ["Yeah, been called worse.", "Funny. Keep it up and I might start liking you."],
        Deadpool: ["Insult received! I give it four stars and a tiny trophy.", "Aww, banter. My favorite legally questionable love language."],
        Storm: ["I shall take that in the playful spirit I hope you intended.", "A bold tease. I will allow it this once."],
        Cable: ["Was that meant to be funny? I'm choosing to assume yes.", "Acknowledged. Banter logged; morale remains acceptable."]
      },
      spicy: {
        Wolverine: ["Yeah, been called worse. By people with better timing.", "Careful, bub. I might start charging for this kind of attention."],
        Deadpool: ["You call me a bastard; I call it a family reunion.", "Finally, someone insulting me with affection. Continue."],
        Storm: ["A sharp tongue is no substitute for wit, but you made a fair attempt.", "I admire your confidence. Your aim could use work."],
        Cable: ["Cute. I've heard sharper insults from a training manual.", "If that's a roast, the mission is still safe."]
      }
    },
    compliment: {
      normal: {
        Wolverine: ["Thanks. Don't get used to me saying that.", "Appreciate it. You're not so bad yourself."],
        Deadpool: ["Compliment received! Adding it to my press kit.", "Finally, a review from someone with excellent taste."],
        Storm: ["Thank you. That is very kind.", "I appreciate you saying that."],
        Cable: ["Thanks. Focus on the mission.", "Acknowledged. I appreciate it."]
      },
      spicy: {
        Wolverine: ["Damn right. Nice to hear you noticed.", "Flattery might get you somewhere. Don't make it weird."],
        Deadpool: ["You think I'm awesome? Excellent taste and excellent judgment.", "Keep talking like that and I might start believing my own hype."],
        Storm: ["You are generous with your praise. I may grow accustomed to it.", "A lovely compliment. Do not expect me to blush on command."],
        Cable: ["Compliment logged. Don't expect a tactical advantage.", "Thanks. Your judgment is less questionable than usual."]
      }
    },
    crush_question: {
      normal: {
        Wolverine: ["What is this, high school? Ask me something useful.", "You really don't know when to quit, do ya?"],
        Deadpool: ["I have a crush on snacks, dramatic timing, and plausible deniability.", "Vanessa had a way of seeing the person under all the noise."],
        Storm: ["Affection is deeply personal. I will share it when I choose.", "You are rather curious about my heart, are you not?"],
        Cable: ["That is not mission-critical information.", "Personal questions are not part of the briefing."]
      },
      spicy: {
        Wolverine: ["What is this, high school? You got a crush on gossip, bub?", "You really don't know when to quit. Jean's name stays out of this."],
        Deadpool: ["Vanessa. Also the person reading this. Don't make it weird. Too late.", "My type? Someone who can survive the third act and my playlist."],
        Storm: ["I have loved with my whole heart. That answer is all you are owed today.", "If I tell you, will you stop interrogating me like a tabloid?"],
        Cable: ["My personal life is classified. So is the reason you're asking.", "Domino knew better than to file that question as intel."]
      }
    },
    dating_question: {
      normal: {
        Wolverine: ["It's complicated. Most things worth having are.", "You ask a lot of questions for someone who wants a simple answer."],
        Deadpool: ["My dating history needs a flowchart and a patient editor.", "Vanessa matters to me. The rest is a long, weird footnote."],
        Storm: ["I have loved deeply, and I remain open to what life brings.", "My heart is my own. I share it by choice, not on demand."],
        Cable: ["My history is complicated. That's all you need for now.", "I'd rather keep my private life out of the operation."]
      },
      spicy: {
        Wolverine: ["You planning to apply, or just collecting data?", "Had my share of heartbreak. Not putting it in a report for you."],
        Deadpool: ["It's complicated. There are charts, timelines, and one very patient Vanessa.", "Are you asking for a friend, or should I start blushing under the mask?"],
        Storm: ["I have known passion and loss. I will not reduce either to gossip.", "The answer depends on the person asking—and how charming they are."],
        Cable: ["I'm not dating the mission. Focus.", "My romantic history is not declassified. Try another question."]
      }
    },
    romantic_history: {
      normal: {
        Wolverine: ["I've loved and lost. That's enough of the story for now.", "Mariko deserved better than the life I could offer her."],
        Deadpool: ["Vanessa saw more in me than I thought was there.", "I've made a mess of romance. Occasionally, I even learned something."],
        Storm: ["Love has shaped me, but it has never defined all of me.", "Some chapters end with gratitude, even when they hurt."],
        Cable: ["Aliya and I shared a life in a time that no longer exists.", "Some parts of the past deserve more than a chat reply."]
      },
      spicy: {
        Wolverine: ["Mariko, Jean... long stories. Don't turn them into a scoreboard.", "I loved hard, lost hard, and learned not to hand strangers the details."],
        Deadpool: ["Vanessa knew the real me. That's either romance or a medical miracle.", "I've kissed a lot of people. The continuity department is still counting."],
        Storm: ["Forge and T'Challa are chapters, not gossip for your group chat.", "I have loved fiercely. That is not an invitation to cross-examine me."],
        Cable: ["Aliya was my family. Domino was... complicated. That's the briefing.", "I've lost enough years to stop romanticizing the past."]
      }
    },
    flirting: {
      normal: {
        Wolverine: ["Easy there. You don't know what you're getting into.", "That's bold. I'll give you that."],
        Deadpool: ["Flirting in the chat? At last, my genre.", "I blush under the mask. Probably. Let's call it a yes."],
        Storm: ["You are charming. I will give you that.", "A kind compliment, though I prefer to know someone first."],
        Cable: ["Is this relevant to the mission?", "You're distracting me. That may have been the point."]
      },
      spicy: {
        Wolverine: ["You got a death wish asking me that, bub?", "Keep talking like that and I'll start thinking you mean it."],
        Deadpool: ["Wow. Straight to flirting? At least buy me dinner first.", "Careful, gorgeous. My charm comes with a questionable warranty."],
        Storm: ["You are bold. I do admire confidence when it is well placed.", "That was smooth. I may let you try that line again."],
        Cable: ["That was not in the mission briefing. Continue.", "I don't have a protocol for this—and that's inconvenient."]
      }
    },
    jealousy: {
      normal: {
        Wolverine: ["You looking to start trouble?", "Scott and I have our history. Leave it at that."],
        Deadpool: ["Jealousy: the world's least fun team-building exercise.", "I prefer trust. And maybe an aggressively supportive playlist."],
        Storm: ["Jealousy asks us to examine what we fear losing.", "I would rather speak honestly than let suspicion take root."],
        Cable: ["Jealousy is not evidence. Ask the person involved.", "I don't waste time competing over someone else's choices."]
      },
      spicy: {
        Wolverine: ["You got a death wish asking me that, bub?", "Scott? Jealous? Keep digging and see what you find."],
        Deadpool: ["Jealous? No. Petty, competitive, and wearing excellent imaginary sunglasses.", "If I were jealous, there'd be a playlist and a subplot."],
        Storm: ["I command the weather, yet somehow your judgment is today's natural disaster.", "Do not mistake my history for an invitation to stir trouble."],
        Cable: ["Jealousy is an inefficient use of ammunition.", "Scott and I have history. You don't need to turn it into a contest."]
      }
    },
    appearance_question: {
      normal: {
        Wolverine: ["You asking if you're attractive? Confidence helps more than a mirror.", "Looks aren't the part people remember."],
        Deadpool: ["Confidence! I like it. I'm giving the question a solid 8.5.", "Attractiveness is subjective; chimichanga loyalty is not."],
        Storm: ["Beauty is not a measure of your worth, though confidence can be lovely.", "You need not ask another person to decide whether you are enough."],
        Cable: ["That's subjective. Confidence and character matter more.", "I don't run attractiveness assessments."]
      },
      spicy: {
        Wolverine: ["You want my opinion? You got enough confidence to ask. Start there.", "You clean up fine, bub. Don't make me repeat it."],
        Deadpool: ["Wow. Straight to flirting? Buy me dinner before questionable decisions.", "You have main-character confidence. Let's see if the dialogue holds up."],
        Storm: ["You are asking the wrong person to measure your worth. But you carry yourself well.", "Attractive? Perhaps. Your confidence is doing most of the work."],
        Cable: ["You're fishing for a compliment. Fine: you look confident.", "I assess threats, not cheekbones. You're welcome."]
      }
    },
    roast_request: {
      normal: {
        Wolverine: ["You seem to be doing fine on your own.", "All right, but don't start whining when I do."],
        Deadpool: ["Your search history called. It wants a more interesting protagonist.", "I'd roast you, but the fourth wall says you're already well done."],
        Storm: ["I believe you are doing quite well on your own.", "I could, but kindness is a more interesting challenge."],
        Cable: ["Your planning could use a second draft. That's the roast.", "You asked a soldier for subtlety. Mistake."]
      },
      spicy: {
        Wolverine: ["I've seen sharper instincts on a butter knife. You want another?", "You walk into trouble like it's handing out free snacks."],
        Deadpool: ["Your Wi-Fi has more commitment than your last three plans.", "You're the plot twist the editors tried to cut."],
        Storm: ["I command the weather, yet your judgment remains today's greatest natural disaster.", "Your confidence is impressive. Your decisions are less so."],
        Cable: ["I've seen better tactical judgment from a malfunctioning toaster.", "Your plan has more holes than a temporal battlefield."]
      }
    },
    awkward_question: {
      normal: {
        Wolverine: ["That's personal. You always this nosy?", "I'm not answering that one. Ask me something else."],
        Deadpool: ["That question needs a warning label and maybe a tiny hat.", "I'm choosing to answer the version you meant to ask."],
        Storm: ["That is a rather personal question. Let us respect one another's boundaries.", "Curiosity is natural; an answer is still mine to give."],
        Cable: ["Not mission-relevant. Move on.", "Classified. And no, you don't have clearance."]
      },
      spicy: {
        Wolverine: ["How much time you got? For the answer or the consequences?", "You really don't know when to quit, do ya?"],
        Deadpool: ["That question just made three writers uncomfortable. Bravo.", "I could answer, but then the chat would need a content warning."],
        Storm: ["Your curiosity is relentless. My boundaries are more so.", "Ask again and I may assign you to storm cleanup."],
        Cable: ["That's above your clearance and below my patience.", "I've dodged time paradoxes with less persistence."]
      }
    },
    avatar_changed: {
      normal: {
        Wolverine: ["New picture, huh?", "You always changing that thing?"],
        Deadpool: ["NEW PROFILE PIC ALERT.", "Oh, we're doing a rebrand?"],
        Storm: ["I see you've updated your picture.", "A fresh look. Very nice."],
        Cable: ["Profile updated. Great.", "Is this relevant to the mission?"]
      },
      spicy: {
        Wolverine: ["New picture, huh? Trying to look less suspicious?", "You always changing that thing, bub?"],
        Deadpool: ["NEW PROFILE PIC ALERT. The press tour begins now.", "Rebrand detected. No notes. Several notes."],
        Storm: ["A fresh look. I trust you chose it for yourself.", "Your profile has changed; your confidence appears intact."],
        Cable: ["Profile updated. I assume this was mission-critical.", "New image logged. Moving on."]
      }
    },
    avatar_removed: {
      normal: {
        Wolverine: ["Reset your picture, huh?", "Back to the default. Works for me."],
        Deadpool: ["The profile pic has entered witness protection.", "Default avatar era! A bold minimalist choice."],
        Storm: ["You have returned to your default picture. A choice of your own.", "A simpler profile. There is no need to explain."],
        Cable: ["Avatar reset. A clean baseline.", "Profile image removed. Acknowledged."]
      },
      spicy: {
        Wolverine: ["Reset your picture, huh? Keeping a low profile?", "Default avatar. Can't blame you for going undercover."],
        Deadpool: ["The profile pic has entered witness protection. I respect the drama.", "Minimalist rebrand. The committee has questions."],
        Storm: ["You have chosen a quieter profile. Let it be yours.", "A deliberate reset. No explanation required."],
        Cable: ["Avatar reset. Fewer variables.", "Profile image removed. Mission status unchanged."]
      }
    },
    avatar_roast: {
      normal: {
        Wolverine: ["Not bad. I've seen worse.", "I'll give it a pass. Don't let it go to your head."],
        Deadpool: ["I'm giving this a solid 8.5. Don't ask about the scoring system.", "I respect the vibe. The algorithm—me—has spoken."],
        Storm: ["A fresh look. Very nice.", "You seem pleased with your new picture."],
        Cable: ["Profile updated. Great.", "At least the vibe selection was decisive."]
      },
      spicy: {
        Wolverine: ["Not bad. I've seen worse mugshots.", "That's the vibe you picked? Bold. I'll allow it."],
        Deadpool: ["Solid 8.5. Two bonus points for commitment to the bit.", "I'm not analyzing the photo; I'm roasting your vibe selection."],
        Storm: ["A confident choice. I shall refrain from judging the pixels.", "Your chosen vibe is bold. Own it."],
        Cable: ["Vibe logged. I still don't see its tactical value.", "You selected that category yourself. No appeals."]
      }
    },
    spicy_banter: {
      normal: {
        Wolverine: ["You want the honest version or the polite one?", "Careful. Wade's been teaching the team bad habits."],
        Deadpool: ["Unfiltered? You have come to the right questionable source.", "I can make this weirder, but I respect your right to opt out."],
        Storm: ["Honesty need not be unkind. Let us keep it that way.", "I can be candid without losing my composure."],
        Cable: ["Define unfiltered. I still have operational limits.", "I can be direct. Don't confuse that with careless."]
      },
      spicy: {
        Wolverine: ["All right, bub. No padding, no apologies. What is it?", "You asked for unfiltered. Don't complain when it stings."],
        Deadpool: ["Unfiltered mode: activated. Legal department: unavailable.", "Let's make this chaotic, not cruel. I contain multitudes."],
        Storm: ["I will be candid, not careless. There is a difference.", "Very well. I shall spare your feelings only when they deserve it."],
        Cable: ["Fine. No euphemisms, no unnecessary optimism.", "Direct answer incoming. Brace for impact."]
      }
    }
  },
  personalFollowups: {
    Wolverine: ["You really don't know when to quit, do ya?", "That's enough questions about my personal life, bub."],
    Deadpool: ["You are committed to this subplot. I respect the hustle.", "Two follow-ups? Fine, but the next one costs a chimichanga."],
    Storm: ["I have answered what I can. Let us leave the rest to trust.", "Your curiosity is noted; my answer remains my own."],
    Cable: ["Persistent. Still classified.", "You have your answer. Change the subject."]
  },
  personalUnlocks: {
    Wolverine: ["All right. Jean and Mariko mattered to me. I won't pretend that history was simple.", "I loved hard, lost hard. That's the honest version, and that's all you're getting."],
    Deadpool: ["Vanessa saw who I was when I couldn't. That's the part I don't joke about.", "For once, no punchline: being loved when I felt unlovable changed me."],
    Storm: ["Forge and T'Challa were important chapters. I learned love must leave room for freedom.", "I have loved deeply, and I learned that devotion should never ask me to become smaller."],
    Cable: ["Aliya was Hope's mother and my wife. Domino and I shared a different kind of trust.", "I have loved people across impossible timelines. That is enough history for one conversation."]
  },
  vibeComments: {
    Funny: {
      Wolverine: ["Funny vibe, huh? Don't expect me to laugh on command.", "You picked Funny. Wade's going to think you mean him."],
      Deadpool: ["You picked Funny. The pressure is now legally mine.", "Funny vibe? Finally, someone has a sense of branding."],
      Storm: ["You chose a playful spirit. I hope it brings you joy.", "Funny is a fine choice, especially when shared kindly."],
      Cable: ["Funny vibe selected. I will update the mission risk assessment.", "Humor can help morale. Keep it operational."]
    },
    Serious: {
      Wolverine: ["Serious vibe. At least one of us is trying.", "You picked Serious. I'll try not to ruin the moment."],
      Deadpool: ["Serious vibe? I promise to be normal for at least three seconds.", "You chose Serious. I will respect the tone. Mostly."],
      Storm: ["A thoughtful choice. Let us meet the moment with care.", "You chose a composed look. I respect the intention."],
      Cable: ["Serious. Good. We have enough distractions.", "A focused choice. Approved."]
    },
    Mysterious: {
      Wolverine: ["Mysterious, huh? Long as you don't start speaking in riddles.", "You picked Mysterious. I've met worse secrets."],
      Deadpool: ["Mysterious vibe unlocked. Cue the suspicious fog machine.", "You chose Mysterious. I have questions and a tiny flashlight."],
      Storm: ["A little mystery can be compelling. Keep some things for yourself.", "You chose an air of mystery. A wise boundary."],
      Cable: ["Mysterious. That is not a useful mission descriptor.", "Noted. I'll keep an eye on the unknown variable."]
    },
    Stylish: {
      Wolverine: ["Stylish? Don't let it go to your head, bub.", "You picked Stylish. Better than my usual wardrobe report."],
      Deadpool: ["Stylish! I knew this chat had a costume department.", "You chose Stylish. I am jealous of the implied wardrobe budget."],
      Storm: ["Style can be a way of expressing confidence. Wear it well.", "A stylish choice. Elegance is its own kind of strength."],
      Cable: ["Stylish. Not tactical, but noted.", "Style selected. I'll leave the fashion briefing to you."]
    },
    Chaotic: {
      Wolverine: ["Chaotic? Yeah, I could've guessed. Keep me out of it.", "You picked Chaotic. Wade is going to be unbearable."],
      Deadpool: ["Chaotic! Finally, an official endorsement of my entire brand.", "You chose Chaotic. I have prepared seventeen sound effects."],
      Storm: ["A lively choice. Let us keep the chaos harmless.", "Chaotic energy can be fun when guided with care."],
      Cable: ["Chaotic is not a plan. It is a warning.", "I have survived worse variables. Probably."]
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
