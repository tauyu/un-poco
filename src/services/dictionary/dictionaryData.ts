import type { DictEntry } from './types';
import { EXPANDED_SPANISH_WORDS } from './expandedDictionary';
import { LESSON_VOCABULARY } from './lessonVocabulary';
import { COMPREHENSIVE_SPANISH_WORDS } from './comprehensiveDictionary';
import { removeAccents } from './conjugations';

export const CORE_SPANISH_DICTIONARY: DictEntry[] = [
  // === GREETINGS & ESSENTIAL PHRASES ===
  {
    word: 'hola',
    pronunciation: '[ˈo.la]',
    partOfSpeech: 'interjection',
    meaningZh: '你好，嗨',
    meaningEn: 'hello, hi',
    examples: [{ es: '¡Hola! ¿Cómo estás?', zh: '你好！你好吗？', en: 'Hello! How are you?' }]
  },
  {
    word: 'adiós',
    pronunciation: '[aˈðjos]',
    partOfSpeech: 'interjection',
    meaningZh: '再见，拜拜',
    meaningEn: 'goodbye, bye',
    examples: [{ es: 'Adiós, nos vemos mañana.', zh: '再见，明天见。', en: 'Goodbye, see you tomorrow.' }]
  },
  {
    word: 'gracias',
    pronunciation: '[ˈɡɾa.sjas]',
    partOfSpeech: 'interjection',
    meaningZh: '谢谢，感谢',
    meaningEn: 'thank you, thanks',
    examples: [{ es: 'Muchas gracias por tu ayuda.', zh: '非常感谢你的帮助。', en: 'Thank you very much for your help.' }]
  },
  {
    word: 'por favor',
    partOfSpeech: 'phrase',
    meaningZh: '请',
    meaningEn: 'please',
    examples: [{ es: 'Un café solo, por favor.', zh: '请给我一杯浓缩咖啡。', en: 'An espresso, please.' }]
  },
  {
    word: 'de nada',
    partOfSpeech: 'phrase',
    meaningZh: '不用谢，不客气',
    meaningEn: "you're welcome",
    examples: [{ es: '—Gracias. —De nada.', zh: '—谢谢。—不客气。', en: '—Thanks. —You are welcome.' }]
  },
  {
    word: 'bueno',
    pronunciation: '[ˈbwe.no]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '好的，优质的；善良的',
    meaningEn: 'good, nice',
    examples: [{ es: '¡Buenos días a todos!', zh: '大家早上好！', en: 'Good morning everyone!' }]
  },
  {
    word: 'bien',
    pronunciation: '[bjen]',
    partOfSpeech: 'adverb',
    meaningZh: '好，很好',
    meaningEn: 'well, fine',
    examples: [{ es: 'Estoy muy bien, gracias.', zh: '我很好，谢谢。', en: "I'm very well, thanks." }]
  },
  {
    word: 'mal',
    pronunciation: '[mal]',
    partOfSpeech: 'adverb',
    meaningZh: '糟糕地，不好',
    meaningEn: 'badly, wrong',
    examples: [{ es: 'Hoy me siento mal.', zh: '今天我感觉不舒服。', en: 'Today I feel sick.' }]
  },

  // === HIGH-FREQUENCY VERBS (CORE 100) ===
  {
    word: 'ser',
    pronunciation: '[seɾ]',
    partOfSpeech: 'verb',
    meaningZh: '是（固有特征、身份、国籍、时间、本质）',
    meaningEn: 'to be (permanent essence/identity)',
    examples: [
      { es: 'Soy estudiante de español.', zh: '我是西语学生。', en: 'I am a Spanish student.' },
      { es: 'Madrid es la capital de España.', zh: '马德里是西班牙的首都。', en: 'Madrid is the capital of Spain.' }
    ],
    commonPhrases: ['ser de (来自)', 'es decir (也就是说)']
  },
  {
    word: 'estar',
    pronunciation: '[esˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '在（位置）；处于（临时状态、心境、正在进行）',
    meaningEn: 'to be (location / temporary state)',
    examples: [
      { es: '¿Dónde está el museo?', zh: '博物馆在哪里？', en: 'Where is the museum?' },
      { es: 'Estamos muy contentos hoy.', zh: '我们今天非常高兴。', en: 'We are very happy today.' }
    ],
    commonPhrases: ['estar de acuerdo (同意)', 'estar a punto de (正要...)']
  },
  {
    word: 'tener',
    pronunciation: '[teˈneɾ]',
    partOfSpeech: 'verb',
    meaningZh: '有，拥有；感觉（冷/饿等）；年龄',
    meaningEn: 'to have, possess; to be (age/feelings)',
    examples: [
      { es: 'Tengo veinte años.', zh: '我二十岁。', en: 'I am twenty years old.' },
      { es: 'Tenemos que salir temprano.', zh: '我们得早点出发。', en: 'We have to leave early.' }
    ],
    commonPhrases: ['tener que + inf (必须做)', 'tener hambre/sed (饥饿/口渴)', 'tener razón (有道理)']
  },
  {
    word: 'hacer',
    pronunciation: '[aˈseɾ]',
    partOfSpeech: 'verb',
    meaningZh: '做，制造；天气（hace sol/frío）；时间（hace dos días）',
    meaningEn: 'to do, to make, weather',
    examples: [
      { es: '¿Qué haces este fin de semana?', zh: '你这周末做什么？', en: 'What are you doing this weekend?' },
      { es: 'Hoy hace mucho sol.', zh: '今天阳光明媚。', en: 'Today is very sunny.' }
    ],
    commonPhrases: ['hace falta (需要)', 'hacer preguntas (提问)']
  },
  {
    word: 'ir',
    pronunciation: '[iɾ]',
    partOfSpeech: 'verb',
    meaningZh: '去，前往；进展；打算（ir a + inf）',
    meaningEn: 'to go',
    examples: [
      { es: 'Voy a la playa con mis amigos.', zh: '我和朋友们去海滩。', en: 'I go to the beach with my friends.' },
      { es: 'Vamos a comer una paella.', zh: '我们去吃海鲜饭吧。', en: "We are going to eat a paella." }
    ],
    commonPhrases: ['ir a + inf (将要...)', 'irse (离开，走掉)']
  },
  {
    word: 'haber',
    pronunciation: '[aˈβeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '有（客观存在 hay / había）；助动词（he comido）',
    meaningEn: 'there is/are, auxiliary to have',
    examples: [
      { es: 'Hay muchos libros en la biblioteca.', zh: '图书馆里有很多书。', en: 'There are many books in the library.' },
      { es: 'Hay que practicar todos los días.', zh: '必须每天练习。', en: 'One must practice every day.' }
    ],
    commonPhrases: ['hay que + inf (应当/必须...)', 'hay (有)']
  },
  {
    word: 'decir',
    pronunciation: '[deˈsiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '说，告诉',
    meaningEn: 'to say, to tell',
    examples: [
      { es: '¿Cómo se dice esto en español?', zh: '这个用西班牙语怎么说？', en: 'How do you say this in Spanish?' },
      { es: 'Me dijo la verdad.', zh: '他对我说了实话。', en: 'He told me the truth.' }
    ]
  },
  {
    word: 'poder',
    pronunciation: '[poˈðeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '能够，可以；许可',
    meaningEn: 'can, to be able to',
    examples: [
      { es: '¿Puedo hacer una pregunta?', zh: '我能提一个问题吗？', en: 'Can I ask a question?' },
      { es: 'No puedo hablar ahora.', zh: '我现在不能说话。', en: "I can't talk right now." }
    ],
    commonPhrases: ['puede ser (可能是)']
  },
  {
    word: 'querer',
    pronunciation: '[keˈɾeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '想要；爱，喜爱',
    meaningEn: 'to want, to love',
    examples: [
      { es: 'Quiero aprender español bien.', zh: '我想把西班牙语学好。', en: 'I want to learn Spanish well.' },
      { es: 'Te quiero mucho.', zh: '我非常爱你。', en: 'I love you very much.' }
    ]
  },
  {
    word: 'saber',
    pronunciation: '[saˈβeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '知道；会（技能，saber nadar）；品尝起来',
    meaningEn: 'to know (facts/skills)',
    examples: [
      { es: 'No sé la respuesta correcta.', zh: '我不知道正确答案。', en: "I don't know the right answer." },
      { es: 'Ella sabe hablar tres idiomas.', zh: '她会说三种语言。', en: 'She knows how to speak three languages.' }
    ]
  },
  {
    word: 'conocer',
    pronunciation: '[ko.noˈseɾ]',
    partOfSpeech: 'verb',
    meaningZh: '认识（某人）；熟悉（某地/某事物）',
    meaningEn: 'to know (people/places), meet',
    examples: [
      { es: 'Mucho gusto en conocerte.', zh: '很高兴认识你。', en: 'Nice to meet you.' },
      { es: 'Conozco muy bien esta ciudad.', zh: '我对这座城市很熟悉。', en: 'I know this city very well.' }
    ]
  },
  {
    word: 'poner',
    pronunciation: '[poˈneɾ]',
    partOfSpeech: 'verb',
    meaningZh: '放，放置；穿上（ponerse）；变得（ponerse contento）',
    meaningEn: 'to put, place; put on',
    examples: [
      { es: 'Puso el libro sobre la mesa.', zh: '他把书放在了桌子上。', en: 'He put the book on the table.' },
      { es: 'Ponte el abrigo, hace frío.', zh: '穿上外套，天冷。', en: 'Put on your coat, it is cold.' }
    ]
  },
  {
    word: 'dar',
    pronunciation: '[daɾ]',
    partOfSpeech: 'verb',
    meaningZh: '给，给予；产生；通往',
    meaningEn: 'to give',
    examples: [
      { es: 'Me dio un regalo maravilloso.', zh: '他给了我一份极好的礼物。', en: 'He gave me a wonderful gift.' },
      { es: 'Me da igual.', zh: '我无所谓。', en: 'It makes no difference to me.' }
    ],
    commonPhrases: ['darse cuenta de (意识到)', 'dar un paseo (散步)']
  },
  {
    word: 'ver',
    pronunciation: '[beɾ]',
    partOfSpeech: 'verb',
    meaningZh: '看，看见；会面',
    meaningEn: 'to see, watch',
    examples: [
      { es: '¿Has visto esa película?', zh: '你看过那部电影吗？', en: 'Have you seen that movie?' },
      { es: 'Nos vemos pronto.', zh: '我们很快再见。', en: 'See you soon.' }
    ]
  },
  {
    word: 'mirar',
    pronunciation: '[miˈɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '注视，看，瞧',
    meaningEn: 'to look at, watch',
    examples: [{ es: 'Mira ese cuadro tan bonito.', zh: '看那幅好漂亮的画。', en: 'Look at that beautiful painting.' }]
  },
  {
    word: 'escuchar',
    pronunciation: '[es.kuˈt͡ʃaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '倾听，听',
    meaningEn: 'to listen to',
    examples: [{ es: 'Me gusta escuchar música española.', zh: '我喜欢听西班牙音乐。', en: 'I like listening to Spanish music.' }]
  },
  {
    word: 'hablar',
    pronunciation: '[aˈβlaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '说，讲话，谈论',
    meaningEn: 'to speak, to talk',
    examples: [
      { es: 'Hablo un poco de español.', zh: '我说一点西班牙语。', en: 'I speak a little Spanish.' },
      { es: '¿Podemos hablar un momento?', zh: '我们能聊一会儿吗？', en: 'Can we talk for a moment?' }
    ]
  },
  {
    word: 'comer',
    pronunciation: '[koˈmeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '吃，吃午饭',
    meaningEn: 'to eat, have lunch',
    examples: [
      { es: 'Vamos a comer juntos hoy.', zh: '我们今天一起吃午饭吧。', en: 'Let us eat lunch together today.' },
      { es: 'Como fruta todos los días.', zh: '我每天吃水果。', en: 'I eat fruit every day.' }
    ]
  },
  {
    word: 'beber',
    pronunciation: '[beˈβeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '喝，饮用',
    meaningEn: 'to drink',
    examples: [{ es: 'Hay que beber dos litros de agua.', zh: '每天应该喝两升水。', en: 'One should drink two liters of water.' }]
  },
  {
    word: 'vivir',
    pronunciation: '[biˈβiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '生活，居住；度过',
    meaningEn: 'to live, reside',
    examples: [{ es: 'Vivo en el centro de la ciudad.', zh: '我住在市中心。', en: 'I live in the city center.' }]
  },
  {
    word: 'leer',
    pronunciation: '[leˈeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '阅读，读',
    meaningEn: 'to read',
    examples: [{ es: 'Leo una novela en español.', zh: '我在读一本西语小说。', en: 'I am reading a novel in Spanish.' }]
  },
  {
    word: 'escribir',
    pronunciation: '[es.kɾiˈβiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '写，书写，写作',
    meaningEn: 'to write',
    examples: [{ es: 'Escríbeme un mensaje cuando llegues.', zh: '你到了给我发个消息。', en: 'Write me a message when you arrive.' }]
  },
  {
    word: 'aprender',
    pronunciation: '[a.pɾenˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '学习，学会',
    meaningEn: 'to learn',
    examples: [{ es: 'Aprender vocabulario es divertido.', zh: '学词汇很有趣。', en: 'Learning vocabulary is fun.' }]
  },
  {
    word: 'comprender',
    pronunciation: '[kom.pɾenˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '理解，明白',
    meaningEn: 'to understand, comprehend',
    examples: [{ es: 'Comprendo perfectamente tu situación.', zh: '我完全理解你的处境。', en: 'I understand your situation completely.' }]
  },
  {
    word: 'entender',
    pronunciation: '[en.tenˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '懂，理解，领会',
    meaningEn: 'to understand',
    examples: [{ es: '¿Entiendes lo que dice el profesor?', zh: '你听得懂老师说的吗？', en: 'Do you understand what the teacher says?' }]
  },
  {
    word: 'estudiar',
    pronunciation: '[es.tuˈðjaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '学习，钻研，念书',
    meaningEn: 'to study',
    examples: [{ es: 'Estudio gramática española cada tarde.', zh: '我每天下午学习西语语法。', en: 'I study Spanish grammar every afternoon.' }]
  },
  {
    word: 'trabajar',
    pronunciation: '[tɾa.βaˈxaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '工作，干活',
    meaningEn: 'to work',
    examples: [{ es: 'Trabaja en una empresa internacional.', zh: '他在一家跨国公司工作。', en: 'He works at an international company.' }]
  },
  {
    word: 'viajar',
    pronunciation: '[bjaˈxaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '旅行，游历',
    meaningEn: 'to travel',
    examples: [{ es: 'Me encanta viajar por Andalucía.', zh: '我非常喜欢在安达卢西亚旅行。', en: 'I love traveling in Andalusia.' }]
  },
  {
    word: 'comprar',
    pronunciation: '[komˈpɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '买，购买',
    meaningEn: 'to buy, purchase',
    examples: [{ es: 'Quiero comprar este diccionario.', zh: '我想买这本字典。', en: 'I want to buy this dictionary.' }]
  },
  {
    word: 'gustar',
    pronunciation: '[ɡusˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '令人喜爱（使动词：me gusta... 我喜欢...）',
    meaningEn: 'to please, to like',
    examples: [
      { es: 'Me gusta mucho esta canción.', zh: '我很喜欢这首歌。', en: 'I really like this song.' },
      { es: '¿Te gustan las tapas?', zh: '你喜欢西班牙小吃吗？', en: 'Do you like tapas?' }
    ]
  },
  {
    word: 'encantar',
    pronunciation: '[eŋ.kanˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '极其喜爱，着迷（使动词：me encanta...）',
    meaningEn: 'to love, delight',
    examples: [{ es: 'Me encanta el clima de Sevilla.', zh: '我太喜欢塞维利亚的气候了。', en: 'I love the weather in Seville.' }]
  },
  {
    word: 'llegar',
    pronunciation: '[ʎeˈɣaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '到达，抵达',
    meaningEn: 'to arrive, reach',
    examples: [{ es: 'El tren llega a las diez en punto.', zh: '火车十点整准时到达。', en: 'The train arrives at ten on the dot.' }]
  },
  {
    word: 'salir',
    pronunciation: '[saˈliɾ]',
    partOfSpeech: 'verb',
    meaningZh: '出去，离开；出发；出版',
    meaningEn: 'to go out, leave',
    examples: [{ es: 'Salimos con los amigos los viernes.', zh: '我们周五常和朋友们出去玩。', en: 'We go out with friends on Fridays.' }]
  },
  {
    word: 'entrar',
    pronunciation: '[enˈtɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '进入，走入',
    meaningEn: 'to enter, go in',
    examples: [{ es: 'Entra, por favor, no te quedes fuera.', zh: '请进，别站在外面。', en: 'Come in, please, do not stay outside.' }]
  },
  {
    word: 'volver',
    pronunciation: '[bolˈβeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '返回，回来；重新做（volver a + inf）',
    meaningEn: 'to return, come back, do again',
    examples: [
      { es: 'Vuelvo a casa a las siete.', zh: '我七点回家。', en: 'I return home at seven.' },
      { es: 'Volvió a llamar más tarde.', zh: '他晚些时候又打了一次电话。', en: 'He called again later.' }
    ]
  },
  {
    word: 'pedir',
    pronunciation: '[peˈðiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '请求；点单，点餐；要求',
    meaningEn: 'to ask for, order (food)',
    examples: [{ es: '¿Qué vas a pedir para cenar?', zh: '你晚饭打算点什么？', en: 'What are you going to order for dinner?' }]
  },
  {
    word: 'preguntar',
    pronunciation: '[pɾe.ɣunˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '询问，打听，问问题',
    meaningEn: 'to ask (a question)',
    examples: [{ es: 'Quiero preguntar por el precio.', zh: '我想问一下价格。', en: 'I want to ask about the price.' }]
  },
  {
    word: 'responder',
    pronunciation: '[res.ponˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '回答，回复，响应',
    meaningEn: 'to answer, reply',
    examples: [{ es: 'Respondió con una gran sonrisa.', zh: '她微笑着回答。', en: 'She answered with a big smile.' }]
  },
  {
    word: 'pensar',
    pronunciation: '[penˈsaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '想，思考；认为（pensar que）；打算（pensar + inf）',
    meaningEn: 'to think, intend',
    examples: [
      { es: 'Pienso que es una gran idea.', zh: '我认为这是一个好主意。', en: 'I think it is a great idea.' },
      { es: '¿En qué piensas?', zh: '你在想什么呢？', en: 'What are you thinking about?' }
    ]
  },
  {
    word: 'creer',
    pronunciation: '[kɾeˈeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '相信，以为，认为',
    meaningEn: 'to believe, think',
    examples: [{ es: 'Creo que va a llover.', zh: '我觉得要下雨了。', en: 'I believe it is going to rain.' }]
  },
  {
    word: 'sentir',
    pronunciation: '[senˈtiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '感觉，觉得；遗憾，抱歉（lo siento）',
    meaningEn: 'to feel, regret',
    examples: [
      { es: 'Lo siento mucho.', zh: '非常抱歉。', en: 'I am very sorry.' },
      { es: 'Me siento lleno de energía.', zh: '我感觉充满活力。', en: 'I feel full of energy.' }
    ]
  },
  {
    word: 'esperar',
    pronunciation: '[es.peˈɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '等待；希望，期盼',
    meaningEn: 'to wait, to hope',
    examples: [
      { es: 'Espero verte pronto.', zh: '我希望能很快见到你。', en: 'I hope to see you soon.' },
      { es: 'Espérame aquí cinco minutos.', zh: '在这儿等我五分钟。', en: 'Wait for me here for five minutes.' }
    ]
  },
  {
    word: 'buscar',
    pronunciation: '[busˈkaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '寻找，搜寻',
    meaningEn: 'to look for, search',
    examples: [{ es: 'Busco información sobre el curso.', zh: '我在查找关于这门课程的信息。', en: 'I am looking for information about the course.' }]
  },
  {
    word: 'encontrar',
    pronunciation: '[eŋ.konˈtɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '找到，发现；遇见',
    meaningEn: 'to find, encounter',
    examples: [{ es: 'Al fin encontré mis llaves.', zh: '我终于找到了钥匙。', en: 'I finally found my keys.' }]
  },
  {
    word: 'dejar',
    pronunciation: '[deˈxaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '留下；放下；让/允许；停止（dejar de + inf）',
    meaningEn: 'to leave, let, stop doing',
    examples: [
      { es: 'Déjame ayudarte con eso.', zh: '让我帮你吧。', en: 'Let me help you with that.' },
      { es: 'Ha dejado de llover.', zh: '雨已经停了。', en: 'It has stopped raining.' }
    ]
  },
  {
    word: 'seguir',
    pronunciation: '[seˈɣiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '跟随；继续（seguir + gerundio）',
    meaningEn: 'to follow, continue',
    examples: [{ es: 'Sigo aprendiendo todos los días.', zh: '我每天都在继续学习。', en: 'I keep learning every day.' }]
  },
  {
    word: 'tomar',
    pronunciation: '[toˈmaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '拿，取；喝/吃（tomar café）；乘坐（tomar el autobús）',
    meaningEn: 'to take, drink',
    examples: [{ es: 'Vamos a tomar una copa.', zh: '我们去喝一杯吧。', en: 'Let us have a drink.' }]
  },
  {
    word: 'llevar',
    pronunciation: '[ʎeˈβaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '带走，携带；穿戴；度过（llevar tiempo）',
    meaningEn: 'to take, carry, wear',
    examples: [
      { es: 'Lleva gafas de sol.', zh: '他戴着太阳镜。', en: 'He wears sunglasses.' },
      { es: 'Llevo dos meses en España.', zh: '我来西班牙两个月了。', en: 'I have been in Spain for two months.' }
    ]
  },
  {
    word: 'traer',
    pronunciation: '[tɾaˈeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '带来，拿来',
    meaningEn: 'to bring',
    examples: [{ es: '¿Me puedes traer la cuenta?', zh: '能帮我拿一下账单吗？', en: 'Can you bring me the bill?' }]
  },
  {
    word: 'parecer',
    pronunciation: '[pa.ɾeˈseɾ]',
    partOfSpeech: 'verb',
    meaningZh: '似乎，看起来；觉得（me parece bien 我觉得行）',
    meaningEn: 'to seem, appear',
    examples: [{ es: 'Me parece una excelente propuesta.', zh: '我觉得这是一个极好的提议。', en: 'It seems to me an excellent proposal.' }]
  },
  {
    word: 'quedar',
    pronunciation: '[keˈðaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '约定见面；停留/待在（quedarse）；剩余；穿起来合适',
    meaningEn: 'to stay, meet up, remain',
    examples: [
      { es: '¿Dónde quedamos esta tarde?', zh: '我们今天下午在哪里碰头？', en: 'Where are we meeting this afternoon?' },
      { es: 'Me quedo en casa hoy.', zh: '我今天待在家里。', en: 'I stay at home today.' }
    ]
  },
  {
    word: 'abrir',
    pronunciation: '[aˈβɾiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '打开，开门，开启',
    meaningEn: 'to open',
    examples: [{ es: 'La tienda abre a las nueve.', zh: '商店九点开门。', en: 'The store opens at nine.' }]
  },
  {
    word: 'cerrar',
    pronunciation: '[seˈraɾ]',
    partOfSpeech: 'verb',
    meaningZh: '关上，关闭，合上',
    meaningEn: 'to close, shut',
    examples: [{ es: 'Por favor, cierra la ventana.', zh: '请把窗户关上。', en: 'Please close the window.' }]
  },
  {
    word: 'empezar',
    pronunciation: '[em.peˈsaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '开始，着手',
    meaningEn: 'to begin, start',
    examples: [{ es: 'La clase empieza ahora mismo.', zh: '课程现在立刻开始。', en: 'Class starts right now.' }]
  },
  {
    word: 'terminar',
    pronunciation: '[teɾ.miˈnaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '结束，完成',
    meaningEn: 'to finish, end',
    examples: [{ es: 'Terminé el trabajo a tiempo.', zh: '我按时完成了工作。', en: 'I finished the work on time.' }]
  },
  {
    word: 'ayudar',
    pronunciation: '[a.ʝuˈðaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '帮助，协助',
    meaningEn: 'to help, assist',
    examples: [{ es: '¿Me puedes ayudar con este ejercicio?', zh: '你能帮我做这道练习吗？', en: 'Can you help me with this exercise?' }]
  },
  {
    word: 'cambiar',
    pronunciation: '[kamˈbjaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '改变，变化；兑换；更换',
    meaningEn: 'to change, exchange',
    examples: [{ es: 'El clima cambia rápidamente en otoño.', zh: '秋季天气变化很快。', en: 'Weather changes quickly in autumn.' }]
  },

  // === NOUNS (CORE) ===
  {
    word: 'tiempo',
    pronunciation: '[ˈtjem.po]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '时间；天气',
    meaningEn: 'time, weather',
    examples: [
      { es: 'No tengo mucho tiempo hoy.', zh: '我今天没有太多时间。', en: 'I do not have much time today.' },
      { es: '¿Qué tiempo hace en Madrid?', zh: '马德里天气怎么样？', en: 'How is the weather in Madrid?' }
    ]
  },
  {
    word: 'año',
    pronunciation: '[ˈa.ɲo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '年，岁',
    meaningEn: 'year',
    examples: [{ es: '¡Feliz año nuevo!', zh: '新年快乐！', en: 'Happy New Year!' }]
  },
  {
    word: 'día',
    pronunciation: '[ˈdi.a]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '天，日子，白天（阳性词）',
    meaningEn: 'day (masculine noun)',
    examples: [{ es: 'Hoy es un día muy especial.', zh: '今天是一个非常特别的日子。', en: 'Today is a very special day.' }]
  },
  {
    word: 'noche',
    pronunciation: '[ˈno.t͡ʃe]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '夜，夜晚，晚上',
    meaningEn: 'night, evening',
    examples: [{ es: 'Buenas noches, que descanses.', zh: '晚安，好好休息。', en: 'Good night, rest well.' }]
  },
  {
    word: 'tarde',
    pronunciation: '[ˈtaɾ.ðe]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '下午，傍晚；(副词) 迟，晚',
    meaningEn: 'afternoon; (adv) late',
    examples: [{ es: 'Llegó muy tarde anoche.', zh: '他昨晚很晚才到。', en: 'He arrived very late last night.' }]
  },
  {
    word: 'mañana',
    pronunciation: '[maˈɲa.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '早晨，上午；(副词) 明天',
    meaningEn: 'morning; (adv) tomorrow',
    examples: [{ es: 'Por la mañana tomo un café.', zh: '早晨我喝一杯咖啡。', en: 'In the morning I have a coffee.' }]
  },
  {
    word: 'semana',
    pronunciation: '[seˈma.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '星期，周',
    meaningEn: 'week',
    examples: [{ es: 'Buen fin de semana.', zh: '周末愉快。', en: 'Have a good weekend.' }]
  },
  {
    word: 'mes',
    pronunciation: '[mes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '月份，月',
    meaningEn: 'month',
    examples: [{ es: 'El mes que viene viajo a España.', zh: '下个月我去西班牙旅行。', en: 'Next month I travel to Spain.' }]
  },
  {
    word: 'persona',
    pronunciation: '[peɾˈso.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '人，人员',
    meaningEn: 'person',
    examples: [{ es: 'Es una persona muy amable y generosa.', zh: '他是一个非常亲切大方的人。', en: 'He is a very kind and generous person.' }]
  },
  {
    word: 'gente',
    pronunciation: '[ˈxen.te]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '人们，大家（集合名词，作单数）',
    meaningEn: 'people',
    examples: [{ es: 'Hay mucha gente en la plaza.', zh: '广场上有很多人。', en: 'There are many people in the square.' }]
  },
  {
    word: 'amigo',
    pronunciation: '[aˈmi.ɣo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '朋友（阴性 amiga）',
    meaningEn: 'friend',
    examples: [{ es: 'Juan es mi mejor amigo.', zh: '胡安是我最好的朋友。', en: 'Juan is my best friend.' }]
  },
  {
    word: 'familia',
    pronunciation: '[faˈmi.lja]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '家庭，家人',
    meaningEn: 'family',
    examples: [{ es: 'Mi familia vive en Valencia.', zh: '我的家人住在巴伦西亚。', en: 'My family lives in Valencia.' }]
  },
  {
    word: 'casa',
    pronunciation: '[ˈka.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '家，房子',
    meaningEn: 'house, home',
    examples: [{ es: 'Bienvenido a mi casa.', zh: '欢迎来我家。', en: 'Welcome to my house.' }]
  },
  {
    word: 'ciudad',
    pronunciation: '[sjuˈðað]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '城市',
    meaningEn: 'city',
    examples: [{ es: 'Barcelona es una ciudad hermosa.', zh: '巴塞罗那是一座美丽的城市。', en: 'Barcelona is a beautiful city.' }]
  },
  {
    word: 'país',
    pronunciation: '[paˈis]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '国家，故土',
    meaningEn: 'country, nation',
    examples: [{ es: 'España es un país con gran historia.', zh: '西班牙是一个拥有悠久历史的国家。', en: 'Spain is a country with rich history.' }]
  },
  {
    word: 'vida',
    pronunciation: '[ˈbi.ða]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '生活，生命，一生',
    meaningEn: 'life',
    examples: [{ es: 'Así es la vida.', zh: '这就是生活。', en: 'That is life.' }]
  },
  {
    word: 'mundo',
    pronunciation: '[ˈmun.do]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '世界；所有人（todo el mundo）',
    meaningEn: 'world; everyone (todo el mundo)',
    examples: [
      { es: 'Viajar por todo el mundo.', zh: '周游全世界。', en: 'Travel around the whole world.' },
      { es: 'Todo el mundo sabe eso.', zh: '人人都知道那件事。', en: 'Everyone knows that.' }
    ]
  },
  {
    word: 'lugar',
    pronunciation: '[luˈɣaɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '地方，地点，位置',
    meaningEn: 'place, spot',
    examples: [{ es: 'Este lugar es muy tranquilo.', zh: '这个地方非常安静。', en: 'This place is very quiet.' }]
  },
  {
    word: 'trabajo',
    pronunciation: '[tɾaˈβa.xo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '工作，职业，劳动',
    meaningEn: 'work, job',
    examples: [{ es: 'Me gusta mi trabajo.', zh: '我喜欢我的工作。', en: 'I like my job.' }]
  },
  {
    word: 'agua',
    pronunciation: '[ˈa.ɣwa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '水（阴性名词，但单数冠词用 el agua 避音）',
    meaningEn: 'water (feminine, takes "el" in singular)',
    examples: [{ es: 'Un vaso de agua fría, por favor.', zh: '请给我一杯凉水。', en: 'A glass of cold water, please.' }]
  },
  {
    word: 'comida',
    pronunciation: '[koˈmi.ða]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '食物，菜肴，午饭',
    meaningEn: 'food, meal, lunch',
    examples: [{ es: 'La comida española es deliciosa.', zh: '西班牙菜很美味。', en: 'Spanish food is delicious.' }]
  },
  {
    word: 'palabra',
    pronunciation: '[paˈla.βɾa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '词，单词，话语',
    meaningEn: 'word',
    examples: [{ es: '¿Qué significa esta palabra?', zh: '这个词是什么意思？', en: 'What does this word mean?' }]
  },
  {
    word: 'libro',
    pronunciation: '[ˈli.βɾo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '书，书籍',
    meaningEn: 'book',
    examples: [{ es: 'Leo un libro interesante.', zh: '我在读一本有趣的书。', en: 'I am reading an interesting book.' }]
  },
  {
    word: 'idioma',
    pronunciation: '[iˈðjo.ma]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '语言（以-ma结尾的希腊源阳性词：el idioma）',
    meaningEn: 'language (masculine noun)',
    examples: [{ es: 'El español es un idioma hermoso.', zh: '西班牙语是一门优美的语言。', en: 'Spanish is a beautiful language.' }]
  },
  {
    word: 'problema',
    pronunciation: '[pɾoˈβle.ma]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '问题，难题（阳性词：el problema）',
    meaningEn: 'problem (masculine noun)',
    examples: [{ es: 'No hay ningún problema.', zh: '没有任何问题。', en: 'There is no problem at all.' }]
  },
  {
    word: 'cosa',
    pronunciation: '[ˈko.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '事物，东西，事情',
    meaningEn: 'thing, matter',
    examples: [{ es: 'Hay una cosa importante que decirte.', zh: '有件重要的事要告诉你。', en: 'There is an important thing to tell you.' }]
  },
  {
    word: 'vez',
    pronunciation: '[bes]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '次，回（复数 veces）',
    meaningEn: 'time, occasion',
    examples: [
      { es: 'Es la primera vez que vengo aquí.', zh: '这是我第一次来这里。', en: 'It is the first time I come here.' },
      { es: 'A veces leo en voz alta.', zh: '有时候我大声朗读。', en: 'Sometimes I read aloud.' }
    ]
  },

  // === ADJECTIVES (CORE) ===
  {
    word: 'grande',
    pronunciation: '[ˈɡɾan.de]',
    partOfSpeech: 'adjective',
    meaningZh: '大的，巨大的；伟大的（置于单数名词前变为 gran）',
    meaningEn: 'big, large, great',
    examples: [{ es: 'Una casa grande y luminosa.', zh: '一座宽敞明亮的房子。', en: 'A big and bright house.' }]
  },
  {
    word: 'pequeño',
    pronunciation: '[peˈke.ɲo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '小的，幼小的（阴性 pequeña）',
    meaningEn: 'small, little',
    examples: [{ es: 'Un pueblo pequeño y acogedor.', zh: '一个温馨小巧的村落。', en: 'A small and cozy town.' }]
  },
  {
    word: 'nuevo',
    pronunciation: '[ˈnwe.βo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '新的，刚出现的',
    meaningEn: 'new',
    examples: [{ es: 'Tengo un trabajo nuevo.', zh: '我有一份新工作。', en: 'I have a new job.' }]
  },
  {
    word: 'viejo',
    pronunciation: '[ˈbje.xo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '旧的，老旧的，年纪大的',
    meaningEn: 'old, aged',
    examples: [{ es: 'El casco viejo de la ciudad.', zh: '城市的旧城区。', en: 'The old quarter of the city.' }]
  },
  {
    word: 'importante',
    pronunciation: '[im.poɾˈtan.te]',
    partOfSpeech: 'adjective',
    meaningZh: '重要的，重大的',
    meaningEn: 'important',
    examples: [{ es: 'Es un examen muy importante.', zh: '这是一场非常重要的考试。', en: 'It is a very important exam.' }]
  },
  {
    word: 'fácil',
    pronunciation: '[ˈfa.sil]',
    partOfSpeech: 'adjective',
    meaningZh: '容易的，简单的',
    meaningEn: 'easy, simple',
    examples: [{ es: 'El ejercicio es muy fácil.', zh: '这道练习很简单。', en: 'The exercise is very easy.' }]
  },
  {
    word: 'difícil',
    pronunciation: '[diˈfi.sil]',
    partOfSpeech: 'adjective',
    meaningZh: '困难的，艰巨的',
    meaningEn: 'difficult, hard',
    examples: [{ es: 'La gramática no es tan difícil.', zh: '语法没有那么难。', en: 'Grammar is not so difficult.' }]
  },
  {
    word: 'bonito',
    pronunciation: '[boˈni.to]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '漂亮的，好看的，悦人的',
    meaningEn: 'pretty, beautiful',
    examples: [{ es: '¡Qué jardín tan bonito!', zh: '多漂亮的花园啊！', en: 'What a pretty garden!' }]
  },
  {
    word: 'hermoso',
    pronunciation: '[eɾˈmo.so]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '美丽的，俊美的',
    meaningEn: 'beautiful, gorgeous',
    examples: [{ es: 'Un paisaje realmente hermoso.', zh: '真是一处美丽的风景。', en: 'A truly beautiful landscape.' }]
  },
  {
    word: 'feliz',
    pronunciation: '[feˈlis]',
    partOfSpeech: 'adjective',
    meaningZh: '幸福的，快乐的',
    meaningEn: 'happy, joyful',
    examples: [{ es: '¡Feliz cumpleaños!', zh: '生日快乐！', en: 'Happy birthday!' }]
  },
  {
    word: 'triste',
    pronunciation: '[ˈtɾis.te]',
    partOfSpeech: 'adjective',
    meaningZh: '悲伤的，忧郁的',
    meaningEn: 'sad, sorrowful',
    examples: [{ es: 'La película tiene un final triste.', zh: '那部电影有一个悲伤的结局。', en: 'The movie has a sad ending.' }]
  },
  {
    word: 'rápido',
    pronunciation: '[ˈra.pi.ðo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '快的，迅速的；(副词) 迅速地',
    meaningEn: 'fast, quick',
    examples: [{ es: 'Habla demasiado rápido.', zh: '他讲话太快了。', en: 'He speaks too fast.' }]
  },
  {
    word: 'mismo',
    pronunciation: '[ˈmis.mo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '相同的，同一的；自己（yo mismo 我自己）',
    meaningEn: 'same, self',
    examples: [{ es: 'Vivimos en la misma calle.', zh: '我们住在同一条街上。', en: 'We live on the same street.' }]
  },
  {
    word: 'otro',
    pronunciation: '[ˈo.tɾo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '另一个，其他的',
    meaningEn: 'other, another',
    examples: [{ es: 'Dame otro ejemplo, por favor.', zh: '请再给我举一个例子。', en: 'Give me another example, please.' }]
  },

  // === PREPOSITIONS & CONJUNCTIONS (CRITICAL FOR GRAMMAR) ===
  {
    word: 'por',
    pronunciation: '[poɾ]',
    partOfSpeech: 'preposition',
    meaningZh: '为了/由于（原因）；经过/沿着（空间）；经由（手段）；大约时间',
    meaningEn: 'for (reason/cause), through, by',
    examples: [
      { es: 'Paseamos por el parque.', zh: '我们在公园里散步。', en: 'We strolled through the park.' },
      { es: 'Gracias por tu ayuda.', zh: '谢谢你的帮助（表原因）。', en: 'Thanks for your help.' }
    ]
  },
  {
    word: 'para',
    pronunciation: '[ˈpa.ɾa]',
    partOfSpeech: 'preposition',
    meaningZh: '为了（目的 para + inf）；给（接受者）；向/朝向（目的地）；截止期',
    meaningEn: 'for (purpose/goal), toward, in order to',
    examples: [
      { es: 'Estudio para aprobar el examen.', zh: '我学习是为了通过考试。', en: 'I study in order to pass the exam.' },
      { es: 'Este regalo es para ti.', zh: '这份礼物是给你的。', en: 'This gift is for you.' }
    ]
  },
  {
    word: 'con',
    pronunciation: '[kon]',
    partOfSpeech: 'preposition',
    meaningZh: '和……一起；用（工具）；带有',
    meaningEn: 'with',
    examples: [
      { es: 'Café con leche, por favor.', zh: '请给我一杯牛奶咖啡。', en: 'Coffee with milk, please.' },
      { es: 'Voy con mi hermano.', zh: '我和我哥哥一起去。', en: 'I go with my brother.' }
    ],
    commonPhrases: ['conmigo (和我一起)', 'contigo (和你一起)']
  },
  {
    word: 'sin',
    pronunciation: '[sin]',
    partOfSpeech: 'preposition',
    meaningZh: '无，没有，缺乏',
    meaningEn: 'without',
    examples: [{ es: 'Café solo sin azúcar.', zh: '黑咖啡，不加糖。', en: 'Black coffee without sugar.' }]
  },
  {
    word: 'en',
    pronunciation: '[en]',
    partOfSpeech: 'preposition',
    meaningZh: '在……里；在……上；乘（交通工具）',
    meaningEn: 'in, on, at',
    examples: [{ es: 'Estamos en el salón de clase.', zh: '我们在教室里。', en: 'We are in the classroom.' }]
  },
  {
    word: 'de',
    pronunciation: '[de]',
    partOfSpeech: 'preposition',
    meaningZh: '……的（所有格）；来自（出处）；由……制成；关于',
    meaningEn: 'of, from, about',
    examples: [
      { es: 'El libro de María.', zh: '玛丽亚的书。', en: "Maria's book." },
      { es: 'Soy de China.', zh: '我来自中国。', en: 'I am from China.' }
    ]
  },
  {
    word: 'a',
    pronunciation: '[a]',
    partOfSpeech: 'preposition',
    meaningZh: '到，向；在（时间）；针对（宾语是人时需加 personal "a"）',
    meaningEn: 'to, at, personal "a"',
    examples: [
      { es: 'Voy a la escuela.', zh: '我去学校。', en: 'I go to school.' },
      { es: 'Veo a mi madre.', zh: '我看着我的母亲（指人直接宾语前加 a）。', en: 'I see my mother.' }
    ]
  },
  {
    word: 'pero',
    pronunciation: '[ˈpe.ɾo]',
    partOfSpeech: 'conjunction',
    meaningZh: '但是，然而',
    meaningEn: 'but, however',
    examples: [{ es: 'Es caro, pero vale la pena.', zh: '这很贵，但值得。', en: 'It is expensive, but it is worth it.' }]
  },
  {
    word: 'porque',
    pronunciation: '[poɾˈke]',
    partOfSpeech: 'conjunction',
    meaningZh: '因为，由于',
    meaningEn: 'because',
    examples: [{ es: 'No salí porque llovía.', zh: '我没出门是因为在下雨。', en: 'I did not go out because it was raining.' }]
  },
  {
    word: 'cuando',
    pronunciation: '[ˈkwan.do]',
    partOfSpeech: 'conjunction',
    meaningZh: '当……的时候',
    meaningEn: 'when',
    examples: [{ es: 'Cuando era niño, jugaba al fútbol.', zh: '当我是个孩子时，我常踢足球。', en: 'When I was a kid, I played soccer.' }]
  },
  {
    word: 'si',
    pronunciation: '[si]',
    partOfSpeech: 'conjunction',
    meaningZh: '如果，要是；是否',
    meaningEn: 'if, whether',
    examples: [{ es: 'Si tienes dudas, pregúntame.', zh: '如果你有疑问，就问我。', en: 'If you have questions, ask me.' }]
  },
  {
    word: 'sí',
    pronunciation: '[si]',
    partOfSpeech: 'adverb',
    meaningZh: '是的，对（带重音符号标示肯定回答）',
    meaningEn: 'yes',
    examples: [{ es: 'Sí, estoy listo.', zh: '是的，我准备好了。', en: 'Yes, I am ready.' }]
  },
  {
    word: 'no',
    pronunciation: '[no]',
    partOfSpeech: 'adverb',
    meaningZh: '不，不是，没有',
    meaningEn: 'no, not',
    examples: [{ es: 'No comprendo esa palabra.', zh: '我不明白那个词。', en: 'I do not understand that word.' }]
  },
  {
    word: 'también',
    pronunciation: '[tamˈbjen]',
    partOfSpeech: 'adverb',
    meaningZh: '也，同样',
    meaningEn: 'also, too',
    examples: [{ es: 'Yo también quiero ir.', zh: '我也想去。', en: 'I also want to go.' }]
  },
  {
    word: 'tampoco',
    pronunciation: '[tamˈpo.ko]',
    partOfSpeech: 'adverb',
    meaningZh: '也不（否定否定句中对应的"也"）',
    meaningEn: 'neither, not either',
    examples: [{ es: 'Yo tampoco lo sé.', zh: '我也不知道。', en: 'I do not know either.' }]
  },
  {
    word: 'muy',
    pronunciation: '[mwi]',
    partOfSpeech: 'adverb',
    meaningZh: '很，非常（修饰形容词或副词）',
    meaningEn: 'very',
    examples: [{ es: 'Es un tema muy interesante.', zh: '这是一个非常有趣的话题。', en: 'It is a very interesting topic.' }]
  },
  {
    word: 'mucho',
    pronunciation: '[ˈmu.t͡ʃo]',
    partOfSpeech: 'adverb',
    meaningZh: '很多，大量；非常（修饰动词或修饰名词时有性数变化 mucho/a/os/as）',
    meaningEn: 'much, a lot',
    examples: [{ es: 'Muchas gracias.', zh: '多谢。', en: 'Thank you very much.' }]
  },
  {
    word: 'poco',
    pronunciation: '[ˈpo.ko]',
    partOfSpeech: 'adverb',
    meaningZh: '少，一点点；稍稍（un poco）',
    meaningEn: 'little, few',
    examples: [{ es: 'Hablo un poco de español.', zh: '我讲一点点西班牙语。', en: 'I speak a little Spanish.' }]
  },
  {
    word: 'ya',
    pronunciation: '[ʝa]',
    partOfSpeech: 'adverb',
    meaningZh: '已经；立刻；（ya no 不再）',
    meaningEn: 'already, now',
    examples: [{ es: 'Ya he terminado el libro.', zh: '我已经读完了这本书。', en: 'I have already finished the book.' }]
  },
  {
    word: 'todavía',
    pronunciation: '[to.ðaˈβi.a]',
    partOfSpeech: 'adverb',
    meaningZh: '仍然，还；（todavía no 还没有）',
    meaningEn: 'still, yet',
    examples: [{ es: 'Todavía no he comido.', zh: '我还没有吃午饭。', en: 'I have not eaten yet.' }]
  },
  {
    word: 'siempre',
    pronunciation: '[ˈsjem.pɾe]',
    partOfSpeech: 'adverb',
    meaningZh: '总是，永远',
    meaningEn: 'always',
    examples: [{ es: 'Siempre me levanto temprano.', zh: '我总是起得很早。', en: 'I always wake up early.' }]
  },
  {
    word: 'nunca',
    pronunciation: '[ˈnuŋ.ka]',
    partOfSpeech: 'adverb',
    meaningZh: '从不，绝不',
    meaningEn: 'never',
    examples: [{ es: 'Nunca he estado en México.', zh: '我从未去过墨西哥。', en: 'I have never been to Mexico.' }]
  },
  {
    word: 'hoy',
    pronunciation: '[oi]',
    partOfSpeech: 'adverb',
    meaningZh: '今天',
    meaningEn: 'today',
    examples: [{ es: '¿Qué día es hoy?', zh: '今天是星期几？', en: 'What day is today?' }]
  },
  {
    word: 'ayer',
    pronunciation: '[aˈʝeɾ]',
    partOfSpeech: 'adverb',
    meaningZh: '昨天',
    meaningEn: 'yesterday',
    examples: [{ es: 'Ayer fue un día largo.', zh: '昨天是漫长的一天。', en: 'Yesterday was a long day.' }]
  },
  {
    word: 'ahora',
    pronunciation: '[aˈo.ɾa]',
    partOfSpeech: 'adverb',
    meaningZh: '现在，目前',
    meaningEn: 'now',
    examples: [{ es: 'Ahora empezamos la lección.', zh: '现在我们开始上课。', en: 'Now we start the lesson.' }]
  },
  {
    word: 'después',
    pronunciation: '[desˈpwes]',
    partOfSpeech: 'adverb',
    meaningZh: '之后，后来，晚些时候',
    meaningEn: 'afterwards, later',
    examples: [{ es: 'Hablamos después de la cena.', zh: '我们晚饭后再聊。', en: 'We talk after dinner.' }]
  },
  {
    word: 'antes',
    pronunciation: '[ˈan.tes]',
    partOfSpeech: 'adverb',
    meaningZh: '以前，之前，先',
    meaningEn: 'before, formerly',
    examples: [{ es: 'Llegué antes de la hora acordada.', zh: '我比约定时间提前到达了。', en: 'I arrived before the agreed time.' }]
  },
  {
    word: 'aquí',
    pronunciation: '[aˈki]',
    partOfSpeech: 'adverb',
    meaningZh: '这里，在这儿',
    meaningEn: 'here',
    examples: [{ es: 'Ven aquí, por favor.', zh: '请到这儿来。', en: 'Come here, please.' }]
  },
  {
    word: 'allí',
    pronunciation: '[aˈʎi]',
    partOfSpeech: 'adverb',
    meaningZh: '那里，在那儿',
    meaningEn: 'there',
    examples: [{ es: 'La farmacia está allí enfrente.', zh: '药店就在对面那里。', en: 'The pharmacy is right over there.' }]
  },
  {
    word: 'más',
    pronunciation: '[mas]',
    partOfSpeech: 'adverb',
    meaningZh: '更，更加；加号（+）',
    meaningEn: 'more',
    examples: [{ es: 'Quiero aprender más palabras.', zh: '我想多学些单词。', en: 'I want to learn more words.' }]
  },
  {
    word: 'menos',
    pronunciation: '[ˈme.nos]',
    partOfSpeech: 'adverb',
    meaningZh: '更少，较少；减号（-）',
    meaningEn: 'less, minus',
    examples: [{ es: 'Cuesta menos de diez euros.', zh: '不到十欧元。', en: 'It costs less than ten euros.' }]
  },
  ...EXPANDED_SPANISH_WORDS,
  ...LESSON_VOCABULARY,
  ...COMPREHENSIVE_SPANISH_WORDS
];

// Fast lowercase lookup index
export const DICTIONARY_MAP = new Map<string, DictEntry>();

// Fast normalized (accent-free & tilde-free) lookup index for fuzzy search (e.g. manana -> mañana)
export const NORMALIZED_DICTIONARY_MAP = new Map<string, DictEntry[]>();

for (const entry of CORE_SPANISH_DICTIONARY) {
  const lower = entry.word.toLowerCase();
  DICTIONARY_MAP.set(lower, entry);

  const normalized = removeAccents(lower);
  if (!NORMALIZED_DICTIONARY_MAP.has(normalized)) {
    NORMALIZED_DICTIONARY_MAP.set(normalized, []);
  }
  NORMALIZED_DICTIONARY_MAP.get(normalized)!.push(entry);
}
