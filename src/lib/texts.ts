/**
 * texts.ts
 * Curated, high-quality, randomized text collections for English, Hindi and Marathi.
 * Categorized by difficulty (easy, medium, hard) and topic/category.
 * Includes persistent session/local storage anti-repetition rotation.
 * Each passage is crafted to provide rich, engaging, continuous typing practice.
 */

export type Language = 'english' | 'marathi' | 'hindi';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
export type TextCategory = 'general' | 'technology' | 'stories' | 'quotes' | 'culture' | 'science';

export interface TypingTextItem {
  id: string;
  language: Language;
  difficulty: Difficulty;
  category: TextCategory;
  text: string;
  authorOrSource?: string;
}

export const ENGLISH_TEXTS: TypingTextItem[] = [
  // ==========================================
  // ENGLISH - EASY (~150 to 300 words)
  // ==========================================
  {
    id: 'en-e-1',
    language: 'english',
    difficulty: 'easy',
    category: 'general',
    text: 'The quick brown fox jumps over the lazy dog near the peaceful river bank where calm waters flow gently under the warm morning sun. Learning touch typing is one of the most valuable foundational skills you can develop for school, university, and daily professional career work. When you place your index fingers properly on the F and J keys with tactile bumps, your hands naturally settle into their home row positions. Practicing for just fifteen to twenty minutes every single day develops deep muscle memory, minimizes visual distraction, and steadily increases both your typing speed and overall accuracy. Never rush through unfamiliar character sequences; focus on maintaining a smooth, relaxed rhythm. As your fingers glide across the keys without hesitation, you will discover that writing essays, programming software, and communicating online becomes effortless, enjoyable, and remarkably fast.'
  },
  {
    id: 'en-e-2',
    language: 'english',
    difficulty: 'easy',
    category: 'general',
    text: 'A warm cup of freshly brewed tea on a quiet rainy morning brings calmness, clarity, and renewed focus to start an exceptionally productive day of creative work. Developing lifelong touch typing habits begins with proper ergonomic posture, sitting upright in your chair, keeping your wrists comfortably relaxed, and striking each mechanical key with a light, rhythmic touch. When practicing difficult words or complex sentences, maintain patience and resist the urge to glance down at your fingers. Speed is simply the natural byproduct of consistent accuracy, regular discipline, and good finger placement. Every single minute invested into deliberate practice on TypeBaazi strengthens your neural connections, sharpens your cognitive concentration, and unlocks your potential to type with effortless velocity and confidence.'
  },
  {
    id: 'en-e-3',
    language: 'english',
    difficulty: 'easy',
    category: 'general',
    text: 'Reading classic literature and inspiring books opens an infinite doorway into fascinating worlds of human imagination, scientific discovery, and timeless philosophy. When you type engaging stories, famous quotes, and thoughtful essays, your mind actively bridges language comprehension with physical keyboard dexterity. Keep your gaze fixed firmly on the screen rather than your hands, and trust your subconscious muscle memory to find every letter, number, and punctuation mark. With consistent daily sessions on this typing platform, you will witness fewer typographical errors, enjoy longer typing streaks, and achieve a steady, unstoppable typing flow that empowers all your academic and workplace endeavors.'
  },
  {
    id: 'en-e-4',
    language: 'english',
    difficulty: 'easy',
    category: 'technology',
    text: 'Clean software architecture is simple, direct, and reads like well crafted prose written by thoughtful and experienced engineers. Exceptional developers care deeply about code readability, modular abstractions, comprehensive automated tests, and making complex distributed systems easy for their colleagues to understand and maintain. As you practice typing technical sentences filled with punctuation and syntax symbols, pay close attention to precision and balanced hand movements. Fluid keyboard skills empower software programmers to translate abstract algorithmic concepts into working applications without friction, allowing them to stay deeply immersed in the state of creative problem-solving flow.'
  },
  {
    id: 'en-e-5',
    language: 'english',
    difficulty: 'easy',
    category: 'general',
    text: 'The bright morning sunshine filters gently through the emerald green leaves of the majestic oak trees in the city park. Joyful children run along the winding stone pathways while colorful songbirds chirp melodiously in the crisp autumn air. Taking deliberate breaks away from digital screens to reconnect with the natural world refreshes the human spirit, relieves mental fatigue, and restores vital creative energy. When you return to your workstation after a peaceful walk outdoors, you feel revitalized, clear-headed, and ready to conquer demanding intellectual challenges with renewed optimism, focus, and enthusiasm.'
  },
  {
    id: 'en-e-6',
    language: 'english',
    difficulty: 'easy',
    category: 'quotes',
    text: 'Do what you can, with whatever resources you currently have, right where you are standing today, because every extraordinary milestone in human history began with a humble first step. Genuine mastery is never an accidental overnight event; it is the compound reward of consistent daily disciplines practiced with dedication and integrity. When you encounter tricky words, unfamiliar punctuation, or temporary plateaus in your typing speed, do not lose heart. Take a steady deep breath, relax your fingers on the home row, reset your internal cadence, and keep pressing forward toward your highest personal aspirations.'
  },
  {
    id: 'en-e-7',
    language: 'english',
    difficulty: 'easy',
    category: 'general',
    text: 'Mastering touch typing and universal keyboard shortcuts saves hundreds of precious hours over the course of your professional and academic life. When your fingers move across the keyboard at the exact velocity of your spontaneous thoughts, you can draft lengthy articles, write complex reports, and brainstorm innovative concepts without mechanical hindrance. Begin your journey with simple words, prioritize ninety-eight percent accuracy above raw speed, and celebrate the small milestones as your velocity steadily climbs to eighty, ninety, and beyond one hundred words per minute.'
  },
  {
    id: 'en-e-8',
    language: 'english',
    difficulty: 'easy',
    category: 'nature',
    text: 'Strolling along a quiet sandy coastline as the golden sun sets beneath the ocean horizon instills a deep sense of peace and gratitude. The gentle rhythm of ocean waves crashing onto the shore mirrors the rhythmic flow of words when typing with full concentration and poise. Listening to the sounds of nature allows the mind to unwind, recharge, and rediscover creative enthusiasm. Building a harmonious balance between focused digital practice and restful outdoor relaxation nurtures both physical health and sharp mental performance throughout life.'
  },
  {
    id: 'en-e-9',
    language: 'english',
    difficulty: 'easy',
    category: 'stories',
    text: 'In a quaint village nestled among rolling green hills, a skilled clockmaker crafted intricate mechanical timepieces with extraordinary precision and care. Every tiny brass gear, spring, and jewel was placed with patient attention, creating clocks that kept flawless time across generations. In much the same way, touch typing is a refined craft where every keystroke matters. By treating each practice session with patience and dedication, you cultivate impeccable accuracy and build a foundation of effortless keyboard speed.'
  },
  {
    id: 'en-e-10',
    language: 'english',
    difficulty: 'easy',
    category: 'technology',
    text: 'Laptops, smartphones, and desktop computers have transformed how people collaborate across borders and time zones. With modern cloud software and instant messaging, teams can solve complex problems together in real time from anywhere in the world. Developing swift and accurate typing abilities allows you to communicate your thoughts clearly, respond to messages promptly, and share valuable knowledge with your peers without feeling slowed down by keyboard mechanics.'
  },

  // ==========================================
  // ENGLISH - MEDIUM (~200 to 350 words)
  // ==========================================
  {
    id: 'en-m-1',
    language: 'english',
    difficulty: 'medium',
    category: 'technology',
    text: 'Modern software engineering harmoniously combines elegant algorithmic design with lightning-fast reactive user interfaces, scalable cloud infrastructure, and robust distributed security protocols. Contemporary web platforms rely on event-driven microservices, asynchronous execution pipelines, and serverless compute clusters to handle millions of real-time transactions seamlessly. Full-stack developers must balance frontend rendering efficiency with backend database optimization, caching layers, and containerized deployment workflows. Writing clean, declarative code and adopting modern design patterns ensures high maintainability, reduces technical debt, and delivers delightful experiences across desktop browsers, tablets, and smartphones worldwide.'
  },
  {
    id: 'en-m-2',
    language: 'english',
    difficulty: 'medium',
    category: 'science',
    text: 'The James Webb Space Telescope continues to peer deep into cosmic history, capturing high-resolution infrared imagery of the earliest primordial galaxies that formed shortly after the Big Bang. By analyzing subtle chemical absorption spectra within the atmospheres of distant exoplanets, astrophysicists search for signatures of water vapor, methane, and carbon dioxide that may indicate habitable environments. These monumental scientific observations challenge existing models of galactic formation, stellar evolution, and cosmic expansion, inspiring humanity to ponder our place within the grand, evolving architecture of the universe.'
  },
  {
    id: 'en-m-3',
    language: 'english',
    difficulty: 'medium',
    category: 'quotes',
    text: 'Simplicity is an essential prerequisite for structural reliability and software excellence. Convoluted and overly complex computer architectures inevitably fail in subtle, catastrophic ways when subjected to intense production traffic or unexpected edge-case scenarios. Seasoned software engineers emphasize clear modular boundaries, resilient error handling, comprehensive unit testing, and transparent observability over clever optimizations. Building enduring digital systems requires patience, empathy for future maintainers, and an unwavering commitment to craftsmanship that withstands the rapid currents of technological change.'
  },
  {
    id: 'en-m-4',
    language: 'english',
    difficulty: 'medium',
    category: 'stories',
    text: 'A gentle evening breeze swept through the bustling downtown avenues, carrying whispers of vibrant neon signs, distant melodies of live jazz, and the electric hum of urban ambition. Pedestrians walked briskly past historic brick facades while street vendors served aromatic delicacies under bright colorful awnings. In towering glass skyscrapers, visionary artists, software innovators, and researchers worked diligently beneath glowing monitors, crafting novel ideas, sustainable technologies, and creative masterpieces that would shape the culture and economy of tomorrow.'
  },
  {
    id: 'en-m-5',
    language: 'english',
    difficulty: 'medium',
    category: 'general',
    text: 'Touch typing fundamentally revolutionizes the way humans communicate with modern computing machinery by removing the physical bottleneck between intellectual thought and textual output. When your fingers instinctively strike the correct keys without visual guidance, your entire cognitive capacity remains liberated for creative composition, logical reasoning, and strategic problem-solving. Regular deliberate training on TypeBaazi develops neural pathways, smooths out finger transitions across difficult digraphs, and elevates your typing velocity to peak competitive standards.'
  },
  {
    id: 'en-m-6',
    language: 'english',
    difficulty: 'medium',
    category: 'technology',
    text: 'Artificial intelligence and deep neural networks are rapidly reshaping virtually every global discipline, ranging from automated medical diagnostic imaging to autonomous aerial navigation and precision agriculture. Multimodal foundation models and computer vision architectures process petabytes of unstructured information in seconds, discovering novel biochemical compounds and forecasting intricate climate phenomena. Establishing ethical safety frameworks, algorithmic transparency, and responsible governance remains paramount as intelligent systems become deeply integrated into everyday human civilization.'
  },
  {
    id: 'en-m-7',
    language: 'english',
    difficulty: 'medium',
    category: 'science',
    text: 'Deep within oceanic hydrothermal vents, unique chemosynthetic ecosystems thrive in total darkness under crushing hydrostatic pressures and extreme thermal gradients. Microorganisms metabolize dissolved mineral compounds and hydrogen sulfide spewing from subterranean volcanic fissures, forming the bedrock of exotic food webs independent of terrestrial sunlight. Studying these resilient extremophiles provides planetary scientists with compelling models for how biological life might exist beneath the icy crusts of Jupiter moons Europa and Enceladus.'
  },
  {
    id: 'en-m-8',
    language: 'english',
    difficulty: 'medium',
    category: 'general',
    text: 'Peak mental performance and deep cognitive focus are nurtured by cultivating intentional daily habits, structured routines, and healthy boundaries around digital distractions. When you practice deep work without continuous smartphone notifications, your brain enters an optimal psychological flow state where complex analytical tasks feel intuitive and engaging. Developing sustained concentration is like training an athletic muscle; regular deliberate practice on keyboard fluency and mental clarity unlocks unprecedented productivity and creative satisfaction.'
  },
  {
    id: 'en-m-9',
    language: 'english',
    difficulty: 'medium',
    category: 'stories',
    text: 'High in the mist-shrouded mountain peaks of the Himalayas, ancient monasteries stand quietly against the roaring winds and snow-covered ridges. Monks spend decades studying sacred manuscripts, practicing meditation, and seeking inner stillness amidst the vastness of the mountains. Travelers who undertake the arduous journey along winding rocky paths return with a profound perspective on the enduring power of patience, silence, and relentless inner discipline across all human pursuits.'
  },
  {
    id: 'en-m-10',
    language: 'english',
    difficulty: 'medium',
    category: 'technology',
    text: 'The evolution of computer hardware from room-sized vacuum tube machines to nanometer-scale silicon transistors represents one of humanity greatest engineering triumphs. Modern microprocessors pack billions of microscopic transistors onto a tiny wafer of silicon, executing trillions of floating-point calculations every single second. As engineers push toward quantum computing and photonic interconnects, the boundary of what computational systems can achieve continues to expand exponentially.'
  },

  // ==========================================
  // ENGLISH - HARD (~220 to 380 words)
  // ==========================================
  {
    id: 'en-h-1',
    language: 'english',
    difficulty: 'hard',
    category: 'technology',
    text: 'Asynchronous JavaScript runtime engines leverage non-blocking event loops, priority microtask queues, and garbage-collected memory heaps to achieve extraordinarily high input and output throughput. When coordinating complex distributed microservices, software engineers must carefully handle Promise concurrency, prevent unhandled rejection crashes, and avoid saturating the single main thread during heavy mathematical serialization or dynamic DOM tree mutations. Implementing efficient memory pooling, zero-copy buffer streaming, and WebAssembly compilation modules ensures low latency and sub-millisecond execution times for data-intensive enterprise applications.'
  },
  {
    id: 'en-h-2',
    language: 'english',
    difficulty: 'hard',
    category: 'science',
    text: 'Quantum entanglement exhibits instantaneous non-local correlations across vast cosmological distances, defying classical Newtonian physics and establishing the foundation for next-generation quantum computing and cryptography. Subatomic entangled qubits exist in delicate superposition states, allowing quantum algorithms like Shor and Grover to solve integer factorization and database search problems with exponential speedups. As quantum hardware engineers engineer topological error-correcting codes, quantum networks will unlock unprecedented breakthroughs in molecular simulation, quantum chemistry, and unbreakable cryptographic communication.'
  },
  {
    id: 'en-h-3',
    language: 'english',
    difficulty: 'hard',
    category: 'quotes',
    text: 'Computer programs must be written primarily for human beings to read and understand, and only secondarily for silicon processors to execute. Elegance in software architecture is never an accidental occurrence; it is the deliberate outcome of prioritizing clarity, simplicity, and architectural coherence over superficial cleverness. When domain models and design abstractions reflect real-world problem spaces faithfully, complex codebases remain adaptable, easy to refactor, and resilient against regressions as user requirements evolve over decades.'
  },
  {
    id: 'en-h-4',
    language: 'english',
    difficulty: 'hard',
    category: 'general',
    text: 'Meticulous finger dexterity, relaxed hand posture, and rhythmic consistency are the vital cornerstones of breaking through the formidable one-hundred-and-twenty words-per-minute threshold. Elite keyboard racers cultivate anticipatory reading habits, visually scanning two to three words ahead of their active cursor while executing rapid multi-finger chord strokes. Overcoming speed plateaus demands focused drills with intricate punctuation, numerical symbols, shifting capitalization patterns, and high-frequency character transitions that push human psychomotor performance to its absolute limits.'
  },
  {
    id: 'en-h-5',
    language: 'english',
    difficulty: 'hard',
    category: 'technology',
    text: 'Distributed database architectures guarantee ACID transactional properties across geo-replicated clusters through multi-version concurrency control (MVCC), distributed two-phase commits, and consensus algorithms like Raft and Paxos. Mitigating split-brain scenarios and network partitions requires rigorous quorum configurations, deterministic replay logs, and fine-tuned heartbeat intervals. Designing fault-tolerant storage engines demands continuous profiling of write-ahead logging overhead, disk I/O serialization, and lock contention across multi-threaded thread pools.'
  },
  {
    id: 'en-h-6',
    language: 'english',
    difficulty: 'hard',
    category: 'science',
    text: 'CRISPR-Cas9 genomic engineering and synthetic biology have unlocked revolutionary capabilities for targeted nucleotide edits within complex eukaryotic genomes. By deploying guide RNA molecules paired with precision endonuclease enzymes, geneticists can excise pathological mutations, engineer drought-resistant crop varieties, and develop cell therapies for previously incurable genetic diseases. Navigating off-target cleavage risks and ethical biosecurity protocols remains vital as biotechnology rapidly advances.'
  },

  // ==========================================
  // ENGLISH - EXTREME (High Punctuation & Symbols)
  // ==========================================
  {
    id: 'en-x-1',
    language: 'english',
    difficulty: 'extreme',
    category: 'technology',
    text: 'Implementing distributed consensus protocols via Raft or Paxos guarantees strict Byzantine fault-tolerant linearizability across geographically distributed heterogeneous clusters: `config.cluster({ quorum: 0.67, heartbeatMs: 50, maxRetries: 5, electionTimeout: 300 });` High-frequency algorithmic trading systems optimize binary cache line alignment, leverage kernel-bypass networking frameworks (DPDK), and execute lock-free circular ring queues to compress tail latency distributions below two hundred and fifty nanoseconds.'
  },
  {
    id: 'en-x-2',
    language: 'english',
    difficulty: 'extreme',
    category: 'general',
    text: 'Sphinx of black quartz, judge my vow! Flabbergasted polymorphs expertly juxtaposed high-frequency punctuation and numerical sequences: [WPM: 158.4], {accuracy: 99.9%}, (latency < 8ms), #hash_id: 0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069. Continuous typing stamina, ergonomic wrist elevation, and lightning-fast neuromuscular reflexes are required to conquer the highest competitive tiers on the global leaderboard. Master difficult punctuation shifts, symbol combinations: ~!@#$%^&*()_+{}|:<>?, and maintain flawless accuracy!'
  },
  {
    id: 'en-x-3',
    language: 'english',
    difficulty: 'extreme',
    category: 'technology',
    text: 'Executing complex shell pipelines: `ps aux | grep -v "root" | awk \'{print $2, $11}\' | sort -k1,1n | head -n 25 > /var/log/audit.log 2>&1;` requires rigorous key coordination across alphanumeric characters, pipes, quotes, and redirection operators. Precision keyboard mastery across special symbols: [array[idx] -> pointer* (deref::type)] guarantees seamless terminal workflow without syntax errors or cognitive interruptions under pressure.'
  }
];

export const MARATHI_TEXTS: TypingTextItem[] = [
  // ==========================================
  // MARATHI - EASY
  // ==========================================
  {
    id: 'mr-e-1',
    language: 'marathi',
    difficulty: 'easy',
    category: 'culture',
    text: 'महाराष्ट्र हे भारतातील एक अतिशय समृद्ध, ऐतिहासिक आणि पुरोगामी राज्य आहे. सह्याद्रीच्या उंच पर्वतरांगा, विस्तीर्ण अरबी समुद्रकिनारा आणि गोदावरी-कृष्णा नद्यांच्या सुपीक खोऱ्यांनी या भूमीला निसर्गाचे भरभरून देणे दिले आहे. महाराष्ट्राची संस्कृती, लोककला, सण-उत्सव आणि वारकरी संप्रदायाची शिकवण संपूर्ण जगात आदरणीय मानली जाते. मराठी भाषा ही अमृताशी पैजा जिंकणारी समृद्ध भाषा असून तिचे संवर्धन करणे आणि दैनंदिन जीवनात वापर वाढवणे हे प्रत्येक मराठी नागरिकाचे कर्तव्य आहे. योग्य मार्गदर्शनाने टायपिंगचा सराव केल्यास आपण आपल्या मातृभाषेत वेगाने आणि अचूकतेने लेखन करू शकतो.'
  },
  {
    id: 'mr-e-2',
    language: 'marathi',
    difficulty: 'easy',
    category: 'general',
    text: 'नियमित सराव आणि एकाग्रता ही कोणत्याही कौशल्यामध्ये प्राविण्य मिळवण्याची खरी गुरुकिल्ली आहे. संगणकावर टायपिंग करताना कीबोर्डवर योग्य बोटांची रचना ठेवल्यास तुमचा वेग आणि अचूकता वेगाने वाढते. सुरुवातीला वेगाचा विचार न करता अचूक अक्षरे टाइप करण्यावर भर द्यावा. दररोज किमान पंधरा ते वीस मिनिटे सराव केल्यास टायपिंगमध्ये कमालीचा आत्मविश्वास निर्माण होतो. चांगल्या सवयींमुळे आपले काम जलद आणि त्रुटीमुक्त होते. सातत्यपूर्ण मेहनतीमुळे अवघड वाटणाऱ्या गोष्टीही सहज शक्य होतात.'
  },
  {
    id: 'mr-e-3',
    language: 'marathi',
    difficulty: 'easy',
    category: 'culture',
    text: 'छत्रपती शिवाजी महाराज हे महाराष्ट्राचे आराध्य दैवत आणि जगातील एक आदर्श, न्यायप्रिय व पराक्रमी राजे होते. त्यांनी सर्वसामान्य जनतेला सोबत घेऊन रयतेचे कल्याणकारी स्वराज्य स्थापन केले. महाराजांची युद्धनीती, गनिमी कावा, गडकिल्ल्यांचे व्यवस्थापन आणि पर्यावरणविषयक धोरणे आजही जगभरातील व्यवस्थापन तज्ज्ञांसाठी मार्गदर्शक ठरतात. स्त्री सन्मान, धार्मिक सहिष्णुता आणि लोककल्याण ही त्यांच्या स्वराज्याची प्रमुख सूत्रे होती. त्यांचा आदर्श आपल्या जीवनात अंगीकारणे हीच त्यांना खरी मानवंदना आहे.'
  },
  {
    id: 'mr-e-4',
    language: 'marathi',
    difficulty: 'easy',
    category: 'general',
    text: 'पुस्तके ही मानवाची सर्वात विश्वासू आणि ज्ञानाची अथांग भांडारे असणारी खरी मित्र आहेत. वाचनामुळे आपली विचार करण्याची क्षमता, भाषाप्रभुत्व आणि कल्पनाशक्ती समृद्ध होते. चांगल्या पुस्तकांचे वाचन मनाला शांतता देते आणि जीवनातील कठीण प्रसंगांना सामोरे जाण्याची ताकद देते. आधुनिक डिजिटल युगातही वाचनाची सवय टिकवून ठेवणे अत्यंत आवश्यक आहे. नियमित वाचन आणि टायपिंगचा सराव आपल्या व्यक्तिमत्त्वाला नवीन पैलू प्रदान करतो.'
  },
  {
    id: 'mr-e-5',
    language: 'marathi',
    difficulty: 'easy',
    category: 'general',
    text: 'सकाळचा सूर्यप्रकाश, पक्षांचे मंजूळ गाणे आणि ताजी थंड हवा मनाला आणि शरीराला नवी उभारी देते. निसर्गाच्या सानिध्यात काही वेळ घालवल्याने मानसिक ताणतणाव दूर होतो आणि कामात एकाग्रता वाढते. निरोगी आरोग्यासाठी नियमित व्यायाम, संतुलित आहार आणि सकारात्मक विचारसरणी या तिन्हींचा समन्वय असणे अत्यंत गरजेचे आहे. मन प्रसन्न असेल तर कामातील उत्पादकता आणि सर्जनशीलता दुप्पट होते.'
  },
  {
    id: 'mr-e-6',
    language: 'marathi',
    difficulty: 'easy',
    category: 'quotes',
    text: 'प्रयत्नांती परमेश्वर या उक्तीप्रमाणे सातत्यपूर्ण कष्टाने अशक्य गोष्टही शक्य करता येते. अपयशाने खचून न जाता चुकांमधून शिकून पुढे जाणारी व्यक्तीच जीवनात यशस्वी होते. टायपिंग करताना चुका झाल्या तरी निराश न होता पुन्हा प्रयत्न करा. सराव हाच यशाचा खरा राजमार्ग आहे. कठीण प्रसंगांवर मात करत ध्येयाकडे वाटचाल करणे हेच खऱ्या विजेत्याचे लक्षण असते.'
  },
  {
    id: 'mr-e-7',
    language: 'marathi',
    difficulty: 'easy',
    category: 'technology',
    text: 'माहिती तंत्रज्ञानाच्या युगात संगणक आणि स्मार्टफोनचा प्रभावी वापर करणे ही काळाची गरज बनली आहे. मराठी भाषेतून संवाद साधणे, सरकारी कामांसाठी अर्ज करणे आणि ऑनलाइन शिक्षण घेणे आता अत्यंत सोपे झाले आहे. मातृभाषेतील टायपिंग कौशल्य आत्मसात केल्यास प्रशासकीय आणि व्यावसायिक क्षेत्रात अनेक संधी उपलब्ध होतात. डिजिटल साक्षरतेमुळे समाजातील प्रत्येक घटक सक्षम आणि स्वावलंबी बनत आहे.'
  },
  {
    id: 'mr-e-8',
    language: 'marathi',
    difficulty: 'easy',
    category: 'nature',
    text: 'महाराष्ट्रातील कोकण किनारपट्टी, आंबोली आणि महाबळेश्वरचे निसर्गसौंदर्य पर्यटकांना भुरळ पाडते. हिरवेगार डोंगर, फेसाळणारे धबधबे आणि लाल मातीची सुवासिक वाट मनाला शांतता देते. निसर्गाचे जतन करणे आणि झाडे लावणे ही काळाची अत्यंत महत्त्वाची गरज आहे. स्वच्छ पर्यावरण आपल्याला निरोगी आणि दीर्घायुषी जीवन प्रदान करते.'
  },

  // ==========================================
  // MARATHI - MEDIUM
  // ==========================================
  {
    id: 'mr-m-1',
    language: 'marathi',
    difficulty: 'medium',
    category: 'culture',
    text: 'सह्याद्रीच्या उत्तुंग कडेकपारीत वसलेले रायगड, राजगड, सिंहगड आणि प्रतापगड यांसारखे ऐतिहासिक किल्ले महाराष्ट्राच्या शौर्याची आणि पराक्रमाची साक्ष देतात. या गडकिल्ल्यांच्या प्रत्येक दगडाला स्वराज्याचा तेजस्वी इतिहास जोडलेला आहे. इतिहासाचा हा अनमोल ठेवा जतन करणे, किल्ल्यांचे संवर्धन करणे आणि पर्यटनाच्या माध्यमातून भावी पिढीपर्यंत महाराजांचे विचार पोहोचवणे हे आपले कर्तव्य आहे. निसर्ग आणि इतिहासाचा हा सुंदर संगम प्रत्येक पर्यटकाच्या मनात अभिमानाची भावना जागृत करतो.'
  },
  {
    id: 'mr-m-2',
    language: 'marathi',
    difficulty: 'medium',
    category: 'technology',
    text: 'डिजिटल क्रांतीमुळे माहिती तंत्रज्ञान क्षेत्रात प्रचंड बदल झाले असून मराठी भाषेतही नवनवीन सॉफ्टवेअर्स आणि ॲप्लिकेशन्स वेगाने विकसित होत आहेत. कृत्रिम बुद्धिमत्ता, व्हॉईस टायपिंग आणि फॉन्ट कन्व्हर्टर्समुळे मराठी भाषेचा वापर जगभरात विस्तारत आहे. स्थानिक भाषेतील तंत्रज्ञान सर्वसामान्य नागरिकांच्या सक्षमीकरणासाठी अत्यंत प्रभावी माध्यम ठरत आहे. यामुळे शिक्षण, उद्योग आणि प्रशासनात मराठीचा सन्मान अधिक उंचावत आहे.'
  },
  {
    id: 'mr-m-3',
    language: 'marathi',
    difficulty: 'medium',
    category: 'stories',
    text: 'पावसाळ्यातील कोकणातील निसर्गसौंदर्य डोळ्यांचे पारणे फेडणारे असते. हिरवेगार डोंगर, फेसाळणारे धबधबे, नारळी-सुपारीच्या बागा आणि लाल मातीच्या वाटा पर्यटकांना भुरळ घालतात. समुद्राच्या लाटांचा गाज आणि पावसाची रिमझिम यामुळे मन प्रसन्न होते. कोकणातील पाहुणचार आणि खाद्यसंस्कृती संपूर्ण महाराष्ट्रात प्रसिद्ध आहे. निसर्गाच्या कुशीत विसावलेले हे कोकण प्रत्येकाला भुरळ पाडते.'
  },
  {
    id: 'mr-m-4',
    language: 'marathi',
    difficulty: 'medium',
    category: 'quotes',
    text: 'संत ज्ञानेश्वरांनी वयाच्या अत्यंत कोवळ्या वयात प्राकृत मराठी भाषेत अमृतातेही पैजा जिंके अशी रसाळ भावार्थदीपिका अर्थात ज्ञानेश्वरी रचली. त्यांनी सर्वसामान्यांना अध्यात्माचा सोपा मार्ग दाखवला आणि मराठी भाषेचा गौरव जगभर वाढवला. संतांची शिकवण ही मानवता, समता आणि बंधुभावाची अखंड प्रेरणा देणारी आहे. त्यांच्या साहित्यातील विचार आजही समाजाला नैतिकतेची आणि शांतीची वाट दाखवतात.'
  },
  {
    id: 'mr-m-5',
    language: 'marathi',
    difficulty: 'medium',
    category: 'general',
    text: 'कीबोर्डवर न पाहता स्पर्शज्ञानाने जलदगतीने टायपिंग करणे हे आधुनिक कामाच्या ठिकाणी अत्यंत उपयुक्त कौशल्य आहे. यामुळे संगणकावर काम करताना डोळ्यांवर आणि हातांवर येणारा ताण कमी होतो. TypeBaazi व्यासपीठावर नियमित सराव करून तुम्ही इंग्रजी आणि मराठी दोन्ही भाषांमध्ये सहजपणे उच्च गती प्राप्त करू शकता. वेगवान टायपिंगमुळे वेळेची मोठी बचत होते आणि कार्यक्षमता लक्षणीय वाढते.'
  },
  {
    id: 'mr-m-6',
    language: 'marathi',
    difficulty: 'medium',
    category: 'science',
    text: 'सूर्योदय आणि सूर्यास्त होताना आकाशात पसरणारे विहंगम रंग वातावरणातील प्रकाशाच्या विखुरण्यामुळे निर्माण होतात. वातावरणातील सूक्ष्म कण निळ्या रंगाचे प्रकाशकिरण विखुरतात, तर तांबडे आणि पिवळे किरण थेट आपल्या डोळ्यांपर्यंत पोहोचतात. निसर्गाचे हे विज्ञानावर आधारित चमत्कार मानवाला नेहमीच आकर्षित करत आले आहेत. खगोलशास्त्र आणि भौतिकशास्त्रातील संशोधनामुळे या रहस्यांचा उलगडा होत आहे.'
  },
  {
    id: 'mr-m-7',
    language: 'marathi',
    difficulty: 'medium',
    category: 'history',
    text: 'लोकमान्य बाळ गंगाधर टिळक यांनी स्वराज्य हा माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच असा सिंहगर्जनायुक्त संदेश देऊन भारतीय स्वातंत्र्य चळवळीला नवी दिशा दिली. त्यांनी सुरू केलेले सार्वजनिक गणेशोत्सव आणि शिवजयंती उत्सव आजही समाजात राष्ट्रीय एकात्मता आणि बंधुभाव वाढवण्याचे कार्य करतात. विचारांची स्पष्टता आणि निर्भय पत्रकारिता ही टिळकांच्या जीवनकार्याची मुख्य वैशिष्ट्ये होती.'
  },
  {
    id: 'mr-m-8',
    language: 'marathi',
    difficulty: 'medium',
    category: 'education',
    text: 'क्रांतिज्योती सावित्रीबाई फुले आणि महात्मा जोतीराव फुले यांनी महाराष्ट्रात स्त्री शिक्षणाची मुहूर्तमेढ रोवून सामाजिक क्रांतीचा पाया घातला. भिडे वाड्यात मुलींची पहिली शाळा सुरू करून त्यांनी शिक्षणाचे दालन सर्वांसाठी खुले केले. त्यांच्या त्यागामुळे आणि परिश्रमामुळे आज लाखो महिला विविध क्षेत्रांत उच्च पदांवर यशस्वीपणे कार्य करत आहेत.'
  },

  // ==========================================
  // MARATHI - HARD
  // ==========================================
  {
    id: 'mr-h-1',
    language: 'marathi',
    difficulty: 'hard',
    category: 'culture',
    text: 'संत तुकाराम, नामदेव, एकनाथ, चोखामेळा आणि समर्थ रामदास यांच्या ओजस्वी वाणीने महाराष्ट्राच्या सामाजिक आणि सांस्कृतिक जीवनात मोठी क्रांती घडवून आणली. समाजातील अनिष्ट रूढी-परंपरांवर प्रहार करत त्यांनी भक्तीचा आणि कर्माचा समतोल मार्ग दाखवला. त्यांच्या अभंगांमधील जीवनमूल्ये आजही समाजाला दिशा देण्याचे कार्य करतात. भक्ती आणि समतेची ही उज्ज्वल परंपरा महाराष्ट्राचे खरे वैभव आहे.'
  },
  {
    id: 'mr-h-2',
    language: 'marathi',
    difficulty: 'hard',
    category: 'science',
    text: 'खगोलशास्त्रातील अत्याधुनिक संशोधनानुसार कृष्णविवरे ही अंतराळातील प्रचंड गुरुत्वाकर्षणाची केंद्रे असून त्यामधून प्रकाशही निसटू शकत नाही. अल्बर्ट आइनस्टाईन यांच्या सापेक्षता सिद्धांताने विश्वाचे रहस्य उलगडण्यास मोठी मदत केली. गुरुत्वीय लहरींचा शोध आणि अवकाशातील दीर्घिकांचे निरीक्षण मानवाच्या विज्ञानातील प्रचंड प्रगतीचे प्रतीक आहे. अवकाश विज्ञानातील नवीन शोध विश्वाच्या उत्पत्तीचा वेध घेत आहेत.'
  },
  {
    id: 'mr-h-3',
    language: 'marathi',
    difficulty: 'hard',
    category: 'technology',
    text: 'कृत्रिम बुद्धिमत्ता आणि स्वयंचलित अल्गोरिदम्सच्या साहाय्याने बहुभाषिक नॅचरल लँग्वेज प्रोसेसिंगमध्ये आमूलाग्र प्रगती होत आहे. भारतीय भाषांमधील समृद्ध शब्दसंग्रह, व्याकरण आणि उच्चार यांचे डिजिटल संगणकीय मॉडेलिंग करणे आव्हानात्मक असले तरी आधुनिक डीप लर्निंगमुळे हे साध्य होत आहे. भविष्यातील तंत्रज्ञान अधिक सर्वसमावेशक आणि भाषा-सुलभ होत असून प्रत्येक व्यक्तीला तंत्रज्ञानाचा सुलभ लाभ मिळत आहे.'
  },
  {
    id: 'mr-h-4',
    language: 'marathi',
    difficulty: 'hard',
    category: 'quotes',
    text: 'जे का रंजले गांजले, त्यांसी म्हणे जो आपुले, तोचि साधू ओळखावा, देव तेथेचि जाणावा! संत तुकाराम महाराजांचा हा संदेश दीनदुबळ्यांची सेवा आणि मानवतेची अखंड उपासना करण्याची प्रेरणा देतो. शुद्ध आचरण आणि परोपकार हीच खरी ईश्वराची पूजा आहे. हा विचार मानवी जीवनाला सार्थकी लावतो आणि समाजात समरसतेची भावना निर्माण करतो.'
  },

  // ==========================================
  // MARATHI - EXTREME
  // ==========================================
  {
    id: 'mr-x-1',
    language: 'marathi',
    difficulty: 'extreme',
    category: 'technology',
    text: 'संगणकीय प्रणालीतील सूक्ष्म-प्रक्रियांमध्ये बहुविध थ्रेड्स व्यवस्थापन: `प्रक्रिया.आरंभ({ गती: १००, अचूकता: ९९.९%, विलंब: <५मिलीसेकंद });` अत्यंत क्लिष्ट व गतिमान अल्गोरिदमवर आधारित असते. अशा उच्चस्तरीय तंत्रज्ञानामुळे स्वयंचलित रोबोटिक्स आणि डेटा सायन्स क्षेत्रात मोठी क्रांती घडत आहे. अचूकता आणि गतीचा हा ताळमेळ आधुनिक सॉफ्टवेअर विकासाचा कणा मानला जातो.'
  },
  {
    id: 'mr-x-2',
    language: 'marathi',
    difficulty: 'extreme',
    category: 'culture',
    text: 'अजिंठा-वेरूळ येथील जगप्रसिद्ध कोरीव लेणी, कैलास मंदिराचे भव्य शिल्पकाम आणि प्राचीन भारतीय स्थापत्यकलेचा उत्कृष्ट आविष्कार जगाला चकित करतो! अखंड एकाच खडकात कोरलेले कैलास मंदिर हे भारतीय कारागिरांच्या अचाट कल्पकतेचे आणि कौशल्याचे अद्वितीय उदाहरण आहे. हे जागतिक वारसा स्थळ भारताच्या वैभवशाली इतिहासाची साक्ष देते.'
  }
];

export const HINDI_TEXTS: TypingTextItem[] = [
  // ==========================================
  // HINDI - EASY (~150 to 250 words)
  // ==========================================
  {
    id: 'hi-e-1',
    language: 'hindi',
    difficulty: 'easy',
    category: 'general',
    text: 'हिंदी हमारी राष्ट्रभाषा और सांस्कृतिक एकता का सबसे मजबूत आधार है। कंप्यूटर पर हिंदी टाइपिंग सीखना आज के समय में अत्यंत लाभकारी और आवश्यक कौशल बन चुका है। जब आप कीबोर्ड पर अपनी उंगलियों को होम रो कीज़ पर सही तरीके से रखते हैं, तो आपकी टाइपिंग गति में तेजी से सुधार होता है। TypeBaazi पर प्रतिदिन मात्र पंद्रह से बीस मिनट का नियमित अभ्यास करने से आपकी उंगलियों की मांसपेशियां प्रशिक्षित होती हैं। शुरुआत में गति की चिंता किए बिना केवल अक्षरों और मात्राओं की शुद्धता पर ध्यान केंद्रित करें। जब आपकी शुद्धता नब्बे प्रतिशत से अधिक होगी, तो टाइपिंग की गति अपने आप बढ़ती चली जाएगी। धैर्य, निरंतरता और सही तकनीक ही आपको एक कुशल टंकलेखक बनाती है।'
  },
  {
    id: 'hi-e-2',
    language: 'hindi',
    difficulty: 'easy',
    category: 'general',
    text: 'सुबह की ताजी हवा और सुनहरी धूप मन में नई ऊर्जा और सकारात्मक उत्साह का संचार करती है। सही शारीरिक मुद्रा और सीधी पीठ के साथ कीबोर्ड पर टाइप करने से हाथों में कभी थकावट नहीं होती। सरकारी नौकरियों, एसएससी, रेलवे, न्यायालय और बैंकिंग परीक्षाओं में हिंदी टाइपिंग परीक्षा उत्तीर्ण करना एक अनिवार्य योग्यता मानी जाती है। देवनागरी इंस्क्रिप्ट लेआउट पर नियमित अभ्यास करने से सभी मात्राएं, हलंत और संयुक्त अक्षर आसानी से टाइप किए जा सकते हैं। अपने दैनिक अभ्यास का लक्ष्य निर्धारित करें और हर दिन अपनी गति में सुधार देखें।'
  },
  {
    id: 'hi-e-3',
    language: 'hindi',
    difficulty: 'easy',
    category: 'culture',
    text: 'भारत विविधताओं से परिपूर्ण एक अत्यंत सुंदर और समृद्ध सांस्कृतिक देश है। यहां अनेक भाषाएं, रीति-रिवाज, उत्सव और परंपराएं प्रेमपूर्वक एक साथ फल-फूल रही हैं। दिवाली, होली, ईद और स्वतंत्रता दिवस जैसे राष्ट्रीय पर्व पूरे देश में बड़े हर्षोल्लास से मनाए जाते हैं। साहित्य, कला, संगीत और दर्शन के क्षेत्र में भारत का योगदान विश्व भर में अतुलनीय रहा है। हिंदी भाषा के माध्यम से विभिन्न राज्यों के लोग एक-दूसरे से आत्मीयता से जुड़ते हैं।'
  },
  {
    id: 'hi-e-4',
    language: 'hindi',
    difficulty: 'easy',
    category: 'stories',
    text: 'एक जंगल में एक बुद्धिमान कौआ रहता था। गर्मी के दिनों में जब उसे बहुत प्यास लगी, तो वह पानी की तलाश में इधर-उधर भटकने लगा। काफी देर बाद उसे एक बगीचे में पानी का घड़ा दिखाई दिया। लेकिन घड़े में पानी बहुत नीचे था और कौए की चोंच वहां तक नहीं पहुंच पा रही थी। कौए ने धैर्य से सोचा और आसपास पड़े छोटे-छोटे कंकड़ उठाकर घड़े में डालने शुरू किए। धीरे-धीरे पानी ऊपर आ गया और उसने जी भरकर पानी पिया। यह कहानी सिखाती है कि कठिन परिस्थिति में सूझबूझ और धैर्य से हर समस्या का समाधान संभव है।'
  },

  // ==========================================
  // HINDI - MEDIUM (~200 to 300 words)
  // ==========================================
  {
    id: 'hi-m-1',
    language: 'hindi',
    difficulty: 'medium',
    category: 'technology',
    text: 'डिजिटल इंडिया अभियान ने देश के कोने-कोने में तकनीकी क्रांति की नई लहर पैदा कर दी है। आज बैंकिंग, शिक्षा, स्वास्थ्य सेवाएं और सरकारी योजनाएं एक क्लिक पर नागरिकों के मोबाइल स्क्रीन पर उपलब्ध हैं। ई-गवर्नेंस और ऑनलाइन पोर्टल्स पर हिंदी में कार्य करना अब बेहद सरल और प्रभावी हो गया है। कंप्यूटर ऑपरेटरों और लिपिकों के लिए हिंदी में तीव्र गति से टाइप करना कार्यक्षमता बढ़ाने का सबसे प्रमुख साधन है। यूनिकोड मानक और आधुनिक फॉन्ट्स की मदद से सभी सरकारी अभिलेख, निविदाएं और परिपत्र डिजिटल रूप से सुरक्षित रखे जा रहे हैं। नियमित गति परीक्षण से सटीकता बढ़ती है।'
  },
  {
    id: 'hi-m-2',
    language: 'hindi',
    difficulty: 'medium',
    category: 'science',
    text: 'भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) ने अंतरिक्ष विज्ञान और उपग्रह प्रक्षेपण के क्षेत्र में वैश्विक स्तर पर नया इतिहास रचा है। चंद्रयान और मंगलयान अभियानों की ऐतिहासिक सफलता ने साबित कर दिया है कि निष्ठा, स्वदेशी तकनीक और कठिन परिश्रम से कोई भी लक्ष्य असंभव नहीं है। उपग्रहों की सहायता से मौसम पूर्वानुमान, कृषि निगरानी, समुद्री सुरक्षा और संचार प्रणाली में क्रांतिकारी परिवर्तन आया है। वैज्ञानिक शोध पत्रों और तकनीकी विवरणों का हिंदी में अनुवाद और संपादन करने के लिए दक्ष टंकलेखकों की अत्यंत आवश्यकता होती है।'
  },
  {
    id: 'hi-m-3',
    language: 'hindi',
    difficulty: 'medium',
    category: 'general',
    text: 'सफलता किसी संयोग का परिणाम नहीं होती, बल्कि यह निरंतर कठोर परिश्रम, अनुशासन और आत्म-विश्वास का प्रतिफल है। जब कोई व्यक्ति अपने लक्ष्य के प्रति पूरी तरह समर्पित होता है, तो मार्ग में आने वाली कोई भी बाधा उसे रोक नहीं सकती। टाइपिंग स्पीड में महारत हासिल करने के लिए भी यही नियम लागू होता है। प्रतिदिन की गई पंद्रह मिनट की एकाग्र साधना आपको सामान्य गति से पेशेवर टंकलेखक के स्तर तक पहुंचा देती है। हर गलती को सुधारने का अवसर मानें और निरंतर आगे बढ़ते रहें।'
  },
  {
    id: 'hi-m-4',
    language: 'hindi',
    difficulty: 'medium',
    category: 'culture',
    text: 'मुंशी प्रेमचंद, हरिवंश राय बच्चन और महादेवी वर्मा जैसे महान साहित्यकारों ने अपनी कालजयी रचनाओं से हिंदी साहित्य को अमूल्य धरोहर प्रदान की है। गोदान, गबन, मधुशाला और नीरजा जैसी कृतियां आज भी पाठकों को गहराई से सोचने और मानवीय संवेदनाओं को समझने की प्रेरणा देती हैं। इन उत्कृष्ट साहित्यिक ग्रंथों का अध्ययन करने से हमारी भाषा समृद्ध होती है, शब्द भंडार विस्तृत होता है और लेखन में परिपक्वता आती है।'
  },

  // ==========================================
  // HINDI - HARD (~250 to 350 words)
  // ==========================================
  {
    id: 'hi-h-1',
    language: 'hindi',
    difficulty: 'hard',
    category: 'general',
    text: 'न्यायालयीन प्रक्रियाओं और संवैधानिक प्रशासन में सटीक अभिलेख संधारण का अत्यंत उच्च महत्व है। उच्च न्यायालयों, जिला सत्र न्यायालयों एवं प्रशासनिक न्यायाधिकरणों में प्रतिदिन चलने वाले मुकदमों में गवाहों के बयान, अधिवक्ताओं की विस्तृत जिरह और न्यायाधीशों के आदेशों का शब्दशः टंकण करना अनिवार्य होता है। टंकण में एक भी छोटी भूल कानूनी अर्थ को बदल सकती है। इसलिए न्यायालयीन लिपिक एवं आशुलिपिक भर्ती परीक्षाओं में न्यूनतम चालिस शब्द प्रति मिनट गति और पचानवे प्रतिशत से अधिक शुद्धता की कड़ी शर्त रखी जाती है। परीक्षा के दबाव में भी शांत रहकर बिना रुके टाइप करना नियमित अभ्यास से ही संभव होता है।'
  },
  {
    id: 'hi-h-2',
    language: 'hindi',
    difficulty: 'hard',
    category: 'quotes',
    text: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत! स्वामी विवेकानंद का यह अमर संदेश युवा शक्ति को सदैव अपने उच्चतम लक्ष्यों की प्राप्ति के लिए निरंतर प्रयत्नशील रहने का आह्वान करता है। आत्म-विश्वास, चारित्रिक शुद्धता और राष्ट्र के प्रति निःस्वार्थ समर्पण ही जीवन की वास्तविक पूंजी है। यदि आपके भीतर दृढ़ इच्छाशक्ति है, तो दुनिया की कोई भी शक्ति आपको पराजित नहीं कर सकती। अपनी क्षमताओं पर भरोसा रखें और सफलता के शिखर तक पहुंचने के लिए संपूर्ण समर्पण से कार्य करें।'
  },
  {
    id: 'hi-h-3',
    language: 'hindi',
    difficulty: 'hard',
    category: 'technology',
    text: 'कृत्रिम बुद्धिमत्ता (एआई), मशीन लर्निंग और रोबोटिक्स की उन्नत तकनीकों ने वैश्विक उद्योग और कार्यप्रणाली को पूरी तरह बदल दिया है। डेटा सुरक्षा, वित्तीय लेन-देन की अखंडता और क्लाउड कंप्यूटिंग के युग में उच्च गति डेटा प्रविष्टि की भूमिका और अधिक संवेदनशील हो गई है। जटिल तकनीकी प्रारूपों, कोडिंग एल्गोरिदम और बहुभाषी डेटाबेस को प्रबंधित करने के लिए गति और एकाग्रता दोनों का अद्भुत संतुलन आवश्यक है।'
  },

  // ==========================================
  // HINDI - EXTREME
  // ==========================================
  {
    id: 'hi-x-1',
    language: 'hindi',
    difficulty: 'extreme',
    category: 'technology',
    text: 'सॉफ्टवेयर वास्तुकला में समकालिक संगणना (कॉनकरेंट कंप्यूटिंग): `प्रणाली.क्रियान्वयन({ शुद्धता: ९९.९९%, विलंबता: <२मिलीसेकंड, सुरक्षा: स्तर_४ });` जटिल बहु-थ्रेडेड डेटा पाइपलाइनों पर निर्भर करती है। यह उच्चस्तरीय तकनीकी संयोजन वास्तविक समय में लाखों उपयोगकर्ताओं के लेन-देन को निर्बाध रूप से संसाधित करने में सक्षम बनाता है।'
  },
  {
    id: 'hi-x-2',
    language: 'hindi',
    difficulty: 'extreme',
    category: 'culture',
    text: 'प्राचीन भारतीय वास्तुकला के बेजोड़ प्रतीक—खजुराहो के भव्य मंदिर, कोणार्क का सूर्य मंदिर और वाराणसी के प्राचीन पावन घाट—सनातन शिल्प सौंदर्य और दर्शन के उत्कृष्ट परिचायक हैं। पाषाण खंडों पर उकेरी गई सूक्ष्म कलाकृतियां और खगोलीय गणनाएं प्राचीन भारतीय शिल्पकारों की अद्वितीय प्रतिभा का प्रमाण हैं।'
  }
];

// ==========================================
// 180-SECOND EXTENSIVE PASSAGES (3-MINUTE TESTS)
// ~400 to 600+ words of continuous, natural text
// ==========================================
export const ENGLISH_180S_TEXTS: TypingTextItem[] = [
  {
    id: 'en-180-1',
    language: 'english',
    difficulty: 'medium',
    category: 'technology',
    text: 'Artificial intelligence and high performance computing are transforming the landscape of modern science, industry, and daily human life. From automated medical diagnostics that detect complex diseases at early stages to autonomous transportation systems navigating bustling city streets, intelligent algorithms are reshaping how societies organize productivity and solve systemic challenges. In software engineering, large language models assist developers in writing clean boilerplate code, optimizing algorithmic pipelines, and discovering security vulnerabilities before deployment. However, the true essence of technological progress lies in the harmonious partnership between artificial machine intelligence and human creativity. Human intuition, ethical empathy, and philosophical critical thinking remain irreplaceable guides in directing technology toward sustainable public welfare and global equity. To harness this digital evolution effectively, modern professionals must cultivate disciplined keyboard dexterity, technical literacy, and focused attention spans. Touch typing serves as the direct neural bridge connecting human thought with computational interfaces. When you type with effortless rhythm and high accuracy, your cognitive energy remains entirely dedicated to complex problem solving, innovative conceptual design, and articulate written expression without mechanical friction or mental fatigue.'
  },
  {
    id: 'en-180-2',
    language: 'english',
    difficulty: 'medium',
    category: 'science',
    text: 'The history of human communication is a remarkable journey of ingenuity, beginning with early cave paintings and advancing through the revolutionary invention of the movable type printing press in fifteenth-century Europe. Johannes Gutenberg transformed the accessibility of knowledge, dismantling intellectual monopolies and paving the path for the Scientific Revolution and the Age of Enlightenment. Books, once rare handcrafted treasures reserved for the privileged few, became widespread catalysts for universal literacy, democratic debate, and collaborative research across borders. In the twentieth century, the emergence of personal computers, mechanical keyboards, and the global internet accelerated this trend by orders of magnitude. Today, billions of interconnected devices transmit trillions of characters every second, creating a dynamic global village where ideas traverse continents instantaneously. Developing rapid touch typing mastery connects you directly to this vast intellectual heritage. Every deliberate keystroke is part of an unbroken human tradition of recording knowledge, exchanging insights, and building shared understanding through the written word.'
  },
  {
    id: 'en-180-3',
    language: 'english',
    difficulty: 'medium',
    category: 'general',
    text: 'Environmental conservation and sustainable ecological management represent the defining responsibilities of the twenty-first century. As industrial urbanization expands, preserving pristine natural forests, freshwater watersheds, and rich marine biodiversity is essential for safeguarding planetary health for future generations. Renewable energy technologies such as solar photovoltaics, offshore wind turbines, and smart electrical grids are rapidly replacing polluting fossil fuels, demonstrating that economic prosperity and environmental stewardship can reinforce one another. Citizen science initiatives and community conservation projects empower individuals to track wildlife migrations, monitor urban air quality, and restore degraded wetlands. Environmental research demands meticulous data collection, clear analytical documentation, and persuasive scientific advocacy. Practicing touch typing equips scientists, policy makers, and dedicated advocates to compile extensive research reports, draft legislation, and communicate environmental imperatives with clarity, speed, and precision.'
  }
];

export const HINDI_180S_TEXTS: TypingTextItem[] = [
  {
    id: 'hi-180-1',
    language: 'hindi',
    difficulty: 'medium',
    category: 'technology',
    text: 'डिजिटल भारत की आधुनिक संकल्पना ने देश के सामाजिक, आर्थिक और प्रशासनिक तंत्र में एक अभूतपूर्व क्रांति का सूत्रपात किया है। आज इंटरनेट और मोबाइल तकनीक की व्यापक पहुंच ने दूरदराज के ग्रामीण अंचलों तक बैंकिंग, शिक्षा और स्वास्थ्य सेवाओं को सुलभ बना दिया है। प्रत्यक्ष लाभ अंतरण, एकीकृत भुगतान इंटरफेस (यूपीआई) और डिजिटल पहचान प्रणालियों ने सरकारी योजनाओं में पारदर्शिता और उत्तरदायित्व को नई ऊंचाई दी है। इस डिजिटल युग में कंप्यूटर ऑपरेटरों और प्रशासनिक सहायकों के लिए तीव्र गति और उच्च शुद्धता के साथ देवनागरी टाइपिंग जानना एक अनिवार्य योग्यता बन गया है। जब कोई टाइपिस्ट बिना कीबोर्ड की ओर देखे दोनों हाथों की दसों उंगलियों से सुचारू रूप से टाइप करता है, तो कार्यालयीन कार्यप्रणाली में तेजी आती है और समय की भारी बचत होती है। निरंतर दैनिक अभ्यास, सही मुद्रा और एकाग्रता ही देवनागरी इंस्क्रिप्ट कीबोर्ड पर महारत हासिल करने का सच्चा मार्ग है।'
  },
  {
    id: 'hi-180-2',
    language: 'hindi',
    difficulty: 'medium',
    category: 'culture',
    text: 'भारतीय सभ्यता और संस्कृति का इतिहास ज्ञान, विज्ञान और आध्यात्मिक चिंतन की एक समृद्ध और अविरल धारा है। प्राचीन काल में नालंदा और तक्षशिला जैसे विश्वविख्यात विश्वविद्यालयों ने विश्व भर के विद्यार्थियों को आकर्षित किया और तर्कशास्त्र, खगोलशास्त्र, गणित तथा आयुर्वेद की नई दिशाएं प्रदान कीं। शून्य की खोज और दशमलव प्रणाली ने संपूर्ण वैश्विक गणितीय ज्ञान का आधार तैयार किया। हमारी समृद्ध भाषाएं—विशेषकर संस्कृत, हिंदी और प्राकृत—अथाह साहित्य और नैतिक मूल्यों का भंडार हैं। आज के आधुनिक डिजिटल परिदृश्य में अपनी मातृभाषा में शुद्ध और तीव्र गति से विचार व्यक्त करना अत्यंत गौरव का विषय है। प्रतियोगी परीक्षाओं जैसे एसएससी, सीपीटी, रेलवे और राज्य लोक सेवा आयोगों में हिंदी टाइपिंग का महत्व लगातार बढ़ रहा है। टाइपबाज़ी जैसे आधुनिक मंच पर नियमित तीन मिनट का परीक्षण देकर आप अपनी गति को ४० से ५० शब्द प्रति मिनट तक आसानी से पहुंचा सकते हैं।'
  },
  {
    id: 'hi-180-3',
    language: 'hindi',
    difficulty: 'medium',
    category: 'general',
    text: 'प्रकृति और पर्यावरण का संरक्षण वर्तमान पीढ़ी का सबसे पावन और अनिवार्य कर्तव्य है। हमारे वन, नदियां, पर्वत और जीव-जंतु पर्यावरण के संतुलन को बनाए रखने में महत्वपूर्ण भूमिका निभाते हैं। अंधाधुंध औद्योगिकीकरण और प्लास्टिक कचरे के बढ़ते प्रकोप ने वायु और जल स्रोतों को गंभीर रूप से प्रदूषित किया है। इस चुनौती से निपटने के लिए हमें वृक्षारोपण, सौर ऊर्जा के प्रयोग और जल संरक्षण को जन-आंदोलन बनाना होगा। वर्षा जल संचयन और कचरा प्रबंधन के वैज्ञानिक तरीके अपनाकर हम अपने नगरों और गांवों को स्वच्छ और हरा-भरा बना सकते हैं। पर्यावरण जागरूकता से संबंधित नीतियों, अनुसंधानों और प्रशासनिक दिशा-निर्देशों को तैयार करने के लिए कुशल डेटा एंट्री की आवश्यकता होती है। हिंदी में सटीक और बिना त्रुटि के टाइपिंग करने से महत्वपूर्ण सूचनाओं का प्रसार जन-जन तक प्रभावी रूप से संभव हो पाता है।'
  }
];

export const MARATHI_180S_TEXTS: TypingTextItem[] = [
  {
    id: 'mr-180-1',
    language: 'marathi',
    difficulty: 'medium',
    category: 'culture',
    text: 'महाराष्ट्राची पवित्र भूमी ही संतांचे विचार, शूर पराक्रमी वीरांचा इतिहास आणि समृद्ध सामाजिक प्रबोधनाची देणगी लाभलेली पावन भूमी आहे. छत्रपती शिवाजी महाराजांनी स्थापन केलेले हिंदवी स्वराज्य हे रयतेचे, न्यायाचे आणि लोककल्याणाचे आदर्श राज्य होते. गडकिल्ल्यांचे चोख व्यवस्थापन, आरमार उभारणी, पर्यावरण संवर्धन आणि सहिष्णू कारभार ही शिवकालीन प्रशासनाची प्रमुख वैशिष्ट्ये होती. त्यानंतर संत ज्ञानेश्वर, संत तुकाराम आणि समाजसुधारक महात्मा ज्योतिराव फुले, सावित्रीबाई फुले व भारतरत्न डॉ. बाबासाहेब आंबेडकर यांनी महाराष्ट्राला समता आणि शिक्षणाची नवी दिशा दिली. आजच्या आधुनिक युगात प्रशासकीय परीक्षा, शासकीय महामंडळे आणि न्यायालयीन कामकाजात मराठी टायपिंगचे स्थान अनन्यसाधारण आहे. जीसीसी-टीबीसी आणि एमपीएससी लिपिक टंकलेखक पदांसाठी अचूक आणि वेगवान टायपिंग आवश्यक असते. योग्य बोटांच्या हालचाली आणि नियमित ३ मिनिटांच्या सरावाने तुम्ही मराठीत ३० ते ४० पेक्षा अधिक शब्द प्रति मिनिट गती सहज संपादन करू शकता.'
  },
  {
    id: 'mr-180-2',
    language: 'marathi',
    difficulty: 'medium',
    category: 'technology',
    text: 'माहिती आणि तंत्रज्ञानाच्या युगाने संपूर्ण जगाचा कायापालट केला आहे. इंटरनेट, कृत्रिम बुद्धिमत्ता आणि संगणकीय प्रणालीमुळे शासकीय व खाजगी क्षेत्रातील सर्व कामे आता ऑनलाइन पद्धतीने जलद गतीने पूर्ण होत आहेत. नागरिकांना घरबसल्या शासकीय दाखले, महसूल नोंदी आणि विविध सेवा डिजिटल पोर्टल्सद्वारे उपलब्ध होत आहेत. या पार्श्वभूमीवर मराठी भाषेतून संगणकावर अचूक व वेगाने काम करणाऱ्या कुशल टंकलेखकांची मागणी प्रचंड वाढली आहे. इन्स्क्रिप्ट कीबोर्ड लेआउट हा संगणकावर मराठी टायपिंगसाठी प्रमाणित व वैज्ञानिक लेआउट आहे. योग्य टायपिंग तंत्राचा अवलंब केल्यास बोटांवर ताण न येता तासनतास सुलभपणे काम करता येते. TypeBaazi च्या आधुनिक व्यासपीठावर दररोज सराव केल्याने अचूकता वाढते आणि चुकांचे प्रमाण नगण्य होते. संयम, नियमितता आणि ध्येयनिष्ठा या त्रिसूत्रीच्या आधारे कोणताही विद्यार्थी मराठी टायपिंगमध्ये नैपुण्य मिळवू शकतो.'
  },
  {
    id: 'mr-180-3',
    language: 'marathi',
    difficulty: 'medium',
    category: 'general',
    text: 'पर्यावरण संवर्धन आणि जलव्यवस्थापन हे महाराष्ट्राच्या शाश्वत विकासाचे प्रमुख आधारस्तंभ आहेत. वाढते तापमान, अनपेक्षित हवामान बदल आणि दुष्काळ या संकटांवर मात करण्यासाठी वनसंपदा जपणे आणि पाण्याचे नियोजन करणे अत्यंत गरजेचे आहे. पाणलोट क्षेत्र विकास, शेततळे निर्मिती आणि वृक्षारोपण मोहिमांना लोकचळवळीचे स्वरूप देणे ही काळाची गरज आहे. सौर ऊर्जा आणि पवन ऊर्जेसारख्या अपारंपरिक ऊर्जा स्रोतांचा वापर वाढवून आपण प्रदूषणमुक्त भविष्य घडवू शकतो. कृषी, ग्रामविकास आणि जलसंधारण क्षेत्रातील शासकीय योजनांची अंमलबजावणी करण्यासाठी अचूक आकडेवारीचे संकलन आणि टंकलेखन महत्त्वाचे ठरते. दर्जेदार मराठी टायपिंग कौशल्यामुळे प्रशासकीय अहवाल आणि जनजागृती पत्रके वेळेत तयार करता येतात. प्रत्येकाने आपल्या दैनंदिन जीवनात निसर्गाचा आदर राखून समृद्ध महाराष्ट्राच्या निर्मितीस हातभार लावला पाहिजे.'
  }
];

class TextManager {
  private readonly STORAGE_KEY = 'typebaazi_recent_text_ids';

  private getSeenIds(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveSeenId(id: string) {
    if (typeof window === 'undefined') return;
    try {
      const seen = this.getSeenIds();
      // Retain last 30 recently seen text IDs across sessions
      const updated = [id, ...seen.filter(x => x !== id)].slice(0, 30);
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota errors
    }
  }

  public getTextsByLanguage(language: Language, duration: number = 60): TypingTextItem[] {
    if (duration >= 180) {
      if (language === 'hindi') return HINDI_180S_TEXTS;
      if (language === 'marathi') return MARATHI_180S_TEXTS;
      return ENGLISH_180S_TEXTS;
    }
    if (language === 'hindi') return HINDI_TEXTS;
    if (language === 'marathi') return MARATHI_TEXTS;
    return ENGLISH_TEXTS;
  }

  /**
   * Retrieves a randomized paragraph ensuring zero repetition across page reloads/refreshes.
   */
  public getRandomText(language: Language = 'english', difficulty: Difficulty = 'medium', category?: TextCategory, duration: number = 60): TypingTextItem {
    const allForLang = this.getTextsByLanguage(language, duration);
    const list = allForLang.filter(item => {
      if (duration < 180 && item.difficulty !== difficulty) return false;
      if (category && item.category !== category) return false;
      return true;
    });

    const pool = list.length > 0 ? list : allForLang;
    const seenIds = new Set(this.getSeenIds());

    // Filter out recently seen texts
    let unused = pool.filter(i => !seenIds.has(i.id));

    // If all texts in this category/difficulty were seen, exclude at least the most recently seen ID
    if (unused.length === 0) {
      const lastSeenList = this.getSeenIds();
      const lastSeenId = lastSeenList[0];
      unused = pool.filter(i => i.id !== lastSeenId);
      if (unused.length === 0) {
        unused = pool;
      }
    }

    // Pick a random text from the fresh pool
    let item = unused && unused.length > 0 ? unused[Math.floor(Math.random() * unused.length)] : null;
    if (!item || !item.text) {
      item = pool[0] || allForLang[0] || (duration >= 180 ? ENGLISH_180S_TEXTS[0] : ENGLISH_TEXTS[0]);
    }
    if (item && item.id) {
      this.saveSeenId(item.id);
    }

    // If 60s test, calibrate passage length to ~55-80 words at natural sentence boundaries
    // so users experience a thrilling, high-stakes competition against the 60-second timer
    if (duration <= 60 && item && item.text) {
      const words = item.text.trim().split(/\s+/);
      if (words.length > 85) {
        let cutoff = 75;
        let foundSentenceBoundary = false;
        for (let i = 50; i < Math.min(words.length, 90); i++) {
          if (/[.!?।]$/.test(words[i])) {
            cutoff = i + 1;
            foundSentenceBoundary = true;
            break;
          }
        }
        if (!foundSentenceBoundary) {
          // If no terminal punctuation in range, pick closest clean word
          cutoff = Math.min(words.length, 75);
        }
        const calibratedText = words.slice(0, cutoff).join(' ');
        return {
          ...item,
          text: calibratedText
        };
      }
    }

    return item;
  }

  public getWordList(language: Language = 'english', count: number = 120): string[] {
    const texts = this.getTextsByLanguage(language);
    const allWords = texts.flatMap(t => t.text.split(/\s+/)).filter(w => w.length > 1);
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

export const textManager = new TextManager();
