export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface SentenceItem {
  id: string;
  es: string;
  zh: string;
  en: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: Array<{ es: string; zh: string }>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  level: CEFRLevel;
  title: string;
  titleZh: string;
  category: string;
  readingTime: string;
  summary: string;
  paragraphs: SentenceItem[][];
  grammarPoints: GrammarPoint[];
  quiz: QuizQuestion[];
}

export const COURSES: Lesson[] = [
  // ==================== A1: UN CAFÉ EN MADRID ====================
  {
    id: 'a1-cafe-madrid',
    level: 'A1',
    title: 'Un café con leche en Madrid',
    titleZh: '马德里的一杯牛奶咖啡',
    category: '日常生活',
    readingTime: '3 分钟',
    summary: '跟随主人公走进马德里典型的传统咖啡馆，学习西班牙日常早餐文化、点餐用语以及问候技巧。',
    paragraphs: [
      [
        {
          id: 's1-1',
          es: 'Son las ocho de la mañana en una cafetería tradicional del centro de Madrid.',
          zh: '现在是早上八点，在马德里市中心的一家传统咖啡馆里。',
          en: 'It is eight o’clock in the morning in a traditional café in central Madrid.'
        },
        {
          id: 's1-2',
          es: 'El camarero, un hombre muy amable llamado Manuel, saluda a los clientes con una sonrisa: "¡Buenos días! ¿Qué te pongo hoy?".',
          zh: '服务员名叫曼努埃尔，是个非常和善的人，他微笑着向顾客打招呼：“早上好！今天给你来点什么？”',
          en: 'The waiter, a very friendly man named Manuel, greets customers with a smile: "Good morning! What can I get you today?".'
        }
      ],
      [
        {
          id: 's1-3',
          es: 'Muchos madrileños piden un café con leche caliente y una tostada con tomate y aceite de oliva.',
          zh: '许多马德里人会点一杯热牛奶咖啡，配上一份抹了番茄碎和橄榄油的烤面包。',
          en: 'Many locals from Madrid order a hot coffee with milk and toast with tomato and olive oil.'
        },
        {
          id: 's1-4',
          es: 'Otros prefieren los churros crujientes con chocolate espeso.',
          zh: '其他人则更偏爱香脆的西班牙油条配浓热巧克力。',
          en: 'Others prefer crispy churros with thick hot chocolate.'
        },
        {
          id: 's1-5',
          es: 'El ambiente es cálido y lleno de energía para empezar el nuevo día.',
          zh: '整个咖啡馆氛围温馨，充满了开启新一天的活力。',
          en: 'The atmosphere is warm and full of energy to start the new day.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-1',
        title: '点单核心句型：¿Qué te pongo? & Ponerse',
        explanation: '在西班牙酒吧或餐厅，店员最常说的不是 "¿Qué quieres?"，而是非常亲切地问 "¿Qué te pongo?"（直译：我给你放/盛点什么？即“您要点什么？”）。回答时可以直接用 "Ponme... por favor"（请给我来一份……）。',
        examples: [
          { es: 'Ponme un café solo y un vaso de agua, por favor.', zh: '请给我来一杯浓缩黑咖啡和一杯水。' },
          { es: '¿Qué van a tomar los señores?', zh: '先生女士们想要喝点什么？' }
        ]
      },
      {
        id: 'gp-2',
        title: '阳性与阴性定冠词：El vs La',
        explanation: '西班牙语所有名词都有阴阳性之分。一般以 -o 结尾的名词多为阳性（如 el centro, el camarero, el tomate），以 -a 结尾的多为阴性（如 la mañana, la cafetería, la sonrisa, la tostada）。',
        examples: [
          { es: 'El café está muy caliente.', zh: '咖啡非常热（el café 阳性）。' },
          { es: 'La comida es deliciosa.', zh: '食物很美味（la comida 阴性）。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '¿Qué saluda el camarero Manuel a los clientes?',
        options: ['¡Buenas noches!', '¡Buenos días!', '¡Adiós!', '¡Hasta pronto!'],
        correctIndex: 1,
        explanation: '课文中第一段写到：Manuel, saluda a los clientes con una sonrisa: "¡Buenos días!".'
      },
      {
        id: 'q2',
        question: '¿Con qué se acompaña tradicionalmente la tostada en España?',
        options: ['Mantequilla y azúcar', 'Tomate y aceite de oliva', 'Queso y carne', 'Chocolate con leche'],
        correctIndex: 1,
        explanation: '西班牙最经典的早餐搭配是：tostada con tomate y aceite de oliva（番茄配橄榄油烤面包）。'
      }
    ]
  },

  // ==================== A1: MI FAMILIA Y MI HOGAR ====================
  {
    id: 'a1-familia-hogar',
    level: 'A1',
    title: 'Mi familia y mi nueva casa',
    titleZh: '我的家庭与新家',
    category: '日常生活',
    readingTime: '3 分钟',
    summary: '学习如何用简单地道的西班牙语介绍家庭成员的职业、年龄以及房间的布局。',
    paragraphs: [
      [
        {
          id: 's2-1',
          es: 'Me llamo Carlos y vivo en una casa pequeña con mi familia en Valencia.',
          zh: '我叫卡洛斯，我和家人住在巴伦西亚的一套小房子里。',
          en: 'My name is Carlos and I live in a small house with my family in Valencia.'
        },
        {
          id: 's2-2',
          es: 'Somos cuatro personas: mis padres, mi hermana menor Lucía y yo.',
          zh: '我们家有四口人：我的父母、我的妹妹露西亚和我。',
          en: 'We are four people: my parents, my younger sister Lucía and me.'
        }
      ],
      [
        {
          id: 's2-3',
          es: 'Mi padre es profesor de historia en el instituto y tiene cincuenta años.',
          zh: '我的父亲是中学的历史老师，他今年五十岁。',
          en: 'My father is a history teacher at the high school and he is fifty years old.'
        },
        {
          id: 's2-4',
          es: 'Mi madre es médica en un hospital y trabaja mucho todos los días.',
          zh: '我的母亲是一家医院的医生，每天都忙碌工作。',
          en: 'My mother is a doctor in a hospital and works hard every day.'
        },
        {
          id: 's2-5',
          es: 'Los domingos nos gusta cocinar juntos y hablar de nuestras cosas en el salón.',
          zh: '星期天，我们喜欢一起做饭，在客厅里聊各自的趣事。',
          en: 'On Sundays we like to cook together and talk about our things in the living room.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-3',
        title: '表述年龄用 Tener 而不用 Ser',
        explanation: '在英语或中文里说“他是五十岁 / I am 50 years old”，但在西班牙语中必须使用动词 tener（拥有年龄），不能用 ser！',
        examples: [
          { es: 'Tengo veinte años.', zh: '我二十岁（我拥有二十岁）。' },
          { es: '¿Cuántos años tienes?', zh: '你多大了？' }
        ]
      },
      {
        id: 'gp-4',
        title: '动词 Gustar 的结构：Nos gusta + 动词原形',
        explanation: 'gustar 是使动词，主语其实是后面的动作或事物。"Nos gusta cocinar" 相当于“烹饪让我们感到喜爱”。当后面接动词原形时，gustar 一律保持单数形式 gusta。',
        examples: [
          { es: 'Me gusta la música.', zh: '我喜欢音乐。' },
          { es: 'Nos gusta viajar en verano.', zh: '我们喜欢在夏天旅行。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q3',
        question: '¿Cuántas personas son en la familia de Carlos?',
        options: ['Tres', 'Cuatro', 'Cinco', 'Seis'],
        correctIndex: 1,
        explanation: '课文中第二句提到："Somos cuatro personas: mis padres, mi hermana menor Lucía y yo."'
      },
      {
        id: 'q4',
        question: '¿Qué profesión tiene el padre de Carlos?',
        options: ['Médico', 'Camarero', 'Profesor de historia', 'Ingeniero'],
        correctIndex: 2,
        explanation: '课文中说明："Mi padre es profesor de historia en el instituto."'
      }
    ]
  },

  // ==================== A2: EL RASTRO DE MADRID ====================
  {
    id: 'a2-rastro-madrid',
    level: 'A2',
    title: 'Un domingo en el Rastro de Madrid',
    titleZh: '马德里埃尔拉斯特洛跳蚤市场的周日',
    category: '旅行见闻',
    readingTime: '4 分钟',
    summary: '感受马德里百年历史露天市集的烟火气，掌握简单过去时（Pretérito Indefinido）叙述周末经历。',
    paragraphs: [
      [
        {
          id: 's3-1',
          es: 'El domingo pasado fue un día soleado y decidí visitar el Rastro con mis amigos.',
          zh: '上周日是个阳光明媚的日子，我决定和朋友们一起去逛埃尔拉斯特洛跳蚤市场。',
          en: 'Last Sunday was a sunny day and I decided to visit the Rastro with my friends.'
        },
        {
          id: 's3-2',
          es: 'El Rastro es el mercado al aire libre más antiguo y famoso de Madrid, en el barrio de La Latina.',
          zh: '埃尔拉斯特洛是马德里最古老、最著名的露天市集，坐落在拉丁区。',
          en: 'The Rastro is the oldest and most famous open-air market in Madrid, in the La Latina neighborhood.'
        }
      ],
      [
        {
          id: 's3-3',
          es: 'Caminamos por las calles estrechas y vimos cientos de puestos con libros viejos, ropa de segunda mano y cuadros antiguos.',
          zh: '我们穿行在狭窄的街巷中，看到了数百个售卖旧书、二手衣物和古董画作的摊位。',
          en: 'We walked along narrow streets and saw hundreds of stalls with old books, second-hand clothes, and vintage paintings.'
        },
        {
          id: 's3-4',
          es: 'Compré una lámpara pequeña de bronce por solo doce euros.',
          zh: '我只花了十二欧元买了一盏小巧的青铜台灯。',
          en: 'I bought a small bronze lamp for only twelve euros.'
        },
        {
          id: 's3-5',
          es: 'Después del paseo, fuimos a una taberna típica y comimos unas raciones de calamares y patatas bravas.',
          zh: '逛完之后，我们去了一家地道的小酒馆，吃了几份炸鱿鱼圈和辣味炸土豆。',
          en: 'After the walk, we went to a typical tavern and ate portions of calamari and patatas bravas.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-5',
        title: '简单过去时（Pretérito Indefinido）叙述已完成事件',
        explanation: '用于描述在过去某个明确时间段（如 el domingo pasado 上周日）已经结束的确定动作。规则变位：decidí (decidir), caminamos (caminar), compré (comprar)；不规则变位：fue (ser/ir), vimos (ver), fuimos (ir)。',
        examples: [
          { es: 'Ayer compré un libro nuevo.', zh: '昨天我买了一本新书。' },
          { es: 'El año pasado fuimos a España.', zh: '去年我们去了西班牙。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q5',
        question: '¿Dónde está ubicado el mercado del Rastro?',
        options: ['En el barrio de Salamanca', 'En el barrio de La Latina', 'Cerca del aeropuerto', 'En Barcelona'],
        correctIndex: 1,
        explanation: '课文中写明："El Rastro es el mercado al aire libre más antiguo... en el barrio de La Latina."'
      },
      {
        id: 'q6',
        question: '¿Cuánto costó la lámpara que compró el autor?',
        options: ['Diez euros', 'Doce euros', 'Veinte euros', 'Cincuenta euros'],
        correctIndex: 1,
        explanation: '课文中提到："Compré una lámpara pequeña de bronce por solo doce euros."'
      }
    ]
  },

  // ==================== A2: CASA BATLLÓ Y GAUDÍ ====================
  {
    id: 'a2-casa-batllo',
    level: 'A2',
    title: 'La magia marina de la Casa Batlló',
    titleZh: '巴特罗之家的海洋魔幻之美',
    category: '艺术与建筑',
    readingTime: '4 分钟',
    summary: '走进安东尼·高迪为巴塞罗那打造的建筑杰作，领略如同深海与龙鳞般的马赛克奇观。',
    paragraphs: [
      [
        {
          id: 's4-1',
          es: 'En el corazón del Paseo de Gracia en Barcelona se encuentra una obra fascinante: la Casa Batlló.',
          zh: '在巴塞罗那格拉西亚大道的中心，坐落着一座令人着迷的建筑杰作：巴特罗之家。',
          en: 'In the heart of Passeig de Gràcia in Barcelona stands a fascinating work: Casa Batlló.'
        },
        {
          id: 's4-2',
          es: 'Fue diseñada por el genial arquitecto Antoni Gaudí a principios del siglo veinte.',
          zh: '它由天才建筑大师安东尼·高迪于二十世纪初设计改建。',
          en: 'It was designed by the brilliant architect Antoni Gaudí at the beginning of the twentieth century.'
        }
      ],
      [
        {
          id: 's4-3',
          es: 'Su fachada parece un mar ondulado de cristal y cerámica con colores azules, verdes y dorados.',
          zh: '其建筑外立面宛如一片起伏荡漾的玻璃与陶瓷海洋，闪烁着蓝、绿与金黄的华彩。',
          en: 'Its façade resembles a wavy sea of glass and ceramics with blue, green, and golden colors.'
        },
        {
          id: 's4-4',
          es: 'El tejado tiene la forma del lomo de un dragón, cubierto de escamas cerámicas brillantes.',
          zh: '屋顶的轮廓如同一条盘踞的巨龙之脊，铺满了晶莹剔透的陶瓷鳞片。',
          en: 'The roof has the shape of a dragon’s spine, covered with shiny ceramic scales.'
        },
        {
          id: 's4-5',
          es: 'Cuando la luz del sol mediterráneo ilumina las paredes, toda la casa parece cobrar vida.',
          zh: '当地中海温暖的阳光洒在墙壁上时，整栋房屋仿佛获得了生命一般灵动呼吸。',
          en: 'When the Mediterranean sunlight illuminates the walls, the entire house seems to come alive.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-6',
        title: '代词式动词与自复动词：Encontrarse & Parecer',
        explanation: '动词 "encontrarse" 常用来表示“坐落于、位于”，强调处于某个位置；而 "parecer" 表示“看起来像/似乎”，与前置介词短语结合描写生动场景。',
        examples: [
          { es: 'La catedral se encuentra en el centro histórico.', zh: '大教堂坐落于历史中心。' },
          { es: 'Esta escultura parece una flor gigante.', zh: '这座雕塑看起来像一朵巨大的花。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q7',
        question: '¿Quién diseñó la Casa Batlló?',
        options: ['Pablo Picasso', 'Salvador Dalí', 'Antoni Gaudí', 'Federico García Lorca'],
        correctIndex: 2,
        explanation: '课文中第一段明确指出："Fue diseñada por el genial arquitecto Antoni Gaudí."'
      },
      {
        id: 'q8',
        question: '¿A qué animal recuerda la forma del tejado de la Casa Batlló?',
        options: ['Un pez espada', 'Un dragón', 'Un caballo', 'Un pájaro'],
        correctIndex: 1,
        explanation: '课文中提到："El tejado tiene la forma del lomo de un dragón..."（屋顶形如巨龙之脊）。'
      }
    ]
  },

  // ==================== B1: FERIA DE ABRIL EN SEVILLA ====================
  {
    id: 'b1-feria-sevilla',
    level: 'B1',
    title: 'La Feria de Abril en Sevilla: Música, color y alegría',
    titleZh: '塞维利亚四月节：乐音、色彩与欢庆',
    category: '节日文化',
    readingTime: '5 分钟',
    summary: '沉浸于安达卢西亚最具魅力的传统节日，感受弗拉门戈裙装、灯火通明的帐篷与塞维利亚欢歌。',
    paragraphs: [
      [
        {
          id: 's5-1',
          es: 'Cada primavera, dos semanas después de la Semana Santa, Sevilla se transforma por completo para celebrar la Feria de Abril.',
          zh: '每年春天，在复活节圣周两周之后，塞维利亚都会换上盛装，迎来一年一度的四月节。',
          en: 'Every spring, two weeks after Holy Week, Seville is completely transformed to celebrate the April Fair.'
        },
        {
          id: 's5-2',
          es: 'El recinto ferial se llena de más de mil casetas decoradas con farolillos de colores brillantes.',
          zh: '整个集市园区内搭起了上千座帐篷（casetas），点缀着五彩斑斓的纸灯笼。',
          en: 'The fairgrounds are filled with more than a thousand stalls decorated with brightly colored lanterns.'
        }
      ],
      [
        {
          id: 's5-3',
          es: 'Las mujeres se visten con el tradicional traje de flamenca, lleno de volantes elegantes y flores en el pelo.',
          zh: '妇女们身着传统的弗拉门戈长裙，裙摆层层荷叶边轻扬，发髻上别着娇艳的花朵。',
          en: 'Women dress in the traditional flamenco gown, full of elegant ruffles and flowers in their hair.'
        },
        {
          id: 's5-4',
          es: 'Por las calles de arena dorada pasean carruajes tirados por caballos andaluces de pura raza.',
          zh: '在泛着金黄光泽的沙道上，纯种安达卢西亚骏马拉着雕花马车悠然漫步。',
          en: 'Along streets of golden sand, carriages drawn by purebred Andalusian horses stroll by.'
        },
        {
          id: 's5-5',
          es: 'La gente baila sevillanas, canta con pasión y comparte platos de jamón ibérico y una copa de rebujito fresco hasta el amanecer.',
          zh: '人们热烈地跳起塞维利亚那民俗舞，纵情放歌，分食伊比利亚火腿，把盏冰爽的雪莉调饮，直至拂晓天明。',
          en: 'People dance sevillanas, sing passionately, and share plates of Iberian ham and glasses of cool rebujito until dawn.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-7',
        title: '代词 se 表示被动或无人称：Se llena / Se transforma',
        explanation: '在西班牙语中，经常用 "se + 第三人称单数动词" 来表达被动句或客观叙述（Sevilla se transforma = 塞维利亚被改变了/换新貌；El recinto se llena = 园区被充满）。这是 B1 等级必须熟练掌握的高级表达。',
        examples: [
          { es: 'Aquí se habla español.', zh: '这里讲西班牙语。' },
          { es: 'Se venden entradas en la puerta.', zh: '门口有门票出售。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q9',
        question: '¿Cuándo se celebra normalmente la Feria de Abril?',
        options: ['En pleno invierno', 'Dos semanas después de Semana Santa', 'En agosto', 'Durante la Navidad'],
        correctIndex: 1,
        explanation: '课文开头明确说明："dos semanas después de la Semana Santa, Sevilla se transforma..."'
      },
      {
        id: 'q10',
        question: '¿Qué baile tradicional baila la gente en la Feria?',
        options: ['Tango', 'Salsa', 'Sevillanas', 'Bachata'],
        correctIndex: 2,
        explanation: '课文说明："La gente baila sevillanas, canta con pasión..."（塞维利亚那舞曲是四月节的灵魂舞步）。'
      }
    ]
  },

  // ==================== B1: LA DIETA MEDITERRÁNEA ====================
  {
    id: 'b1-dieta-mediterranea',
    level: 'B1',
    title: 'La Dieta Mediterránea: Salud y cultura',
    titleZh: '地中海饮食：健康与生活哲学',
    category: '美食风情',
    readingTime: '5 分钟',
    summary: '深入了解被联合国教科文组织列为非物质文化遗产的地中海饮食，剖析 Por 与 Para 的经典辨析。',
    paragraphs: [
      [
        {
          id: 's6-1',
          es: 'La dieta mediterránea no es solo un modelo nutricional saludable, sino también un valioso patrimonio cultural.',
          zh: '地中海饮食不仅是一种健康的营养饮食模式，更是一份弥足珍贵的人类文化遗产。',
          en: 'The Mediterranean diet is not just a healthy nutritional model, but also a valuable cultural heritage.'
        },
        {
          id: 's6-2',
          es: 'Sus pilares fundamentales son el aceite de oliva virgen extra, las verduras frescas, las legumbres y el pescado.',
          zh: '它的核心基石是特级初榨橄榄油、新鲜蔬菜、豆类以及海鱼。',
          en: 'Its fundamental pillars are extra virgin olive oil, fresh vegetables, legumes, and fish.'
        }
      ],
      [
        {
          id: 's6-3',
          es: 'En los países del sur de Europa, cocinar y comer en torno a una mesa compartida es un acto social de profunda conexión.',
          zh: '在南欧诸国，围坐在一张餐桌旁烹饪与共餐，是一种富有深刻情感联结的社交行为。',
          en: 'In southern European countries, cooking and eating around a shared table is a social act of deep connection.'
        },
        {
          id: 's6-4',
          es: 'Los médicos recomiendan esta alimentación para prevenir enfermedades cardiovasculares y alargar la esperanza de vida.',
          zh: '医学家们普遍推崇这种饮食，以预防心血管疾病并延长人类预期寿命。',
          en: 'Doctors recommend this diet to prevent cardiovascular diseases and extend life expectancy.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-8',
        title: '重点难点：Por vs Para 的核心区分',
        explanation: '• PARA 表示目的、目标或接收者（如：comer para vivir 为了生活而吃；para prevenir 为了预防）。\n• POR 表示原因、动机、途径或时间跨度（如：gracias por cocinar 谢谢你做饭；por la salud 由于健康原因）。',
        examples: [
          { es: 'Estudio español para viajar por Andalucía.', zh: '我学西语是为了（para 目的）在安达卢西亚漫游（por 空间途径）。' },
          { es: 'Lo hago por ti.', zh: '我是为了你/因为你的缘故才这么做的（por 动机/原因）。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q11',
        question: '¿Cuál es uno de los pilares fundamentales de la dieta mediterránea?',
        options: ['La comida rápida', 'El aceite de oliva virgen extra', 'Los refrescos azucarados', 'La mantequilla'],
        correctIndex: 1,
        explanation: '课文中提到核心基石："Sus pilares fundamentales son el aceite de oliva virgen extra..."'
      }
    ]
  },

  // ==================== B2: REALISMO MÁGICO ====================
  {
    id: 'b2-realismo-magico',
    level: 'B2',
    title: 'García Márquez y las raíces del realismo mágico',
    titleZh: '加西亚·马尔克斯与魔幻现实主义的根脉',
    category: '文学与思考',
    readingTime: '6 分钟',
    summary: '深度阅读诺贝尔文学奖得主加夫列尔·加西亚·马尔克斯笔下的马孔多与魔幻现实主义文学意象，掌握虚拟式从句精髓。',
    paragraphs: [
      [
        {
          id: 's7-1',
          es: 'Con la publicación de "Cien años de soledad" en 1967, el escritor colombiano Gabriel García Márquez transformó la literatura universal.',
          zh: '随着1967年《百年孤独》的问世，哥伦比亚作家加夫列尔·加西亚·马尔克斯彻底改写了世界文学的面貌。',
          en: 'With the publication of "One Hundred Years of Solitude" in 1967, Colombian writer Gabriel García Márquez transformed world literature.'
        },
        {
          id: 's7-2',
          es: 'El realismo mágico no consiste en inventar monstruos fantásticos, sino en narrar lo insólito con la naturalidad cotidiana de quien cuenta una verdad incuestionable.',
          zh: '魔幻现实主义并非在于凭空捏造奇幻怪兽，而是以讲述不容置疑的事实那般的日常语气，去诉说不可思议的奇迹。',
          en: 'Magical realism does not consist of inventing fantastic monsters, but of narrating the extraordinary with the everyday naturalness of someone telling an unquestionable truth.'
        }
      ],
      [
        {
          id: 's7-3',
          es: 'En el pueblo imaginario de Macondo, las mariposas amarillas anuncian la llegada del amor y los muertos conversan serenamente con los vivos.',
          zh: '在虚构的马孔多小镇上，黄色蝴蝶预示着爱情的降临，亡魂亦能与生者安然攀谈。',
          en: 'In the imaginary town of Macondo, yellow butterflies announce the arrival of love and the dead converse serenely with the living.'
        },
        {
          id: 's7-4',
          es: 'Es imprescindible que los lectores comprendan que esta corriente literaria refleja las complejidades políticas, históricas y míticas de América Latina.',
          zh: '读者们有必要认识到，这一文学流派深刻折射出拉丁美洲政治、历史与神话纠葛交织的多重复杂性。',
          en: 'It is essential for readers to understand that this literary movement reflects the political, historical, and mythical complexities of Latin America.'
        }
      ]
    ],
    grammarPoints: [
      {
        id: 'gp-9',
        title: 'B2 核心语法：无人称评价句 + 虚拟式（Es imprescindible que + subjuntivo）',
        explanation: '当主句表达“必然性、重要性、观点评价”时（如 Es necesario que..., Es importante que..., Es imprescindible que...），如果从句有具体主语，从句动词必须使用虚拟式（Subjuntivo）。例如：comprendan 是 comprender 的虚拟式现在时第三人称复数。',
        examples: [
          { es: 'Es importante que estudies todos los días.', zh: '你每天都学习，这很重要（estudies 为虚拟式）。' },
          { es: 'Es necesario que hablemos pronto.', zh: '我们有必要尽快聊一聊（hablemos 为虚拟式）。' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q12',
        question: '¿En qué año se publicó "Cien años de soledad"?',
        options: ['1950', '1967', '1982', '2000'],
        correctIndex: 1,
        explanation: '课文第一句指出："Con la publicación de \"Cien años de soledad\" en 1967..."'
      },
      {
        id: 'q13',
        question: '¿Por qué se usa el subjuntivo "comprendan" en la última frase?',
        options: [
          'Porque describe una acción pasada',
          'Porque sigue a la expresión impersonal de necesidad "Es imprescindible que..."',
          'Porque es una pregunta indirecta',
          'Porque expresa una condición futura'
        ],
        correctIndex: 1,
        explanation: '在无人称评价结构 "Es imprescindible que..." 后面接具体主语从句时，必须使用虚拟式（Subjuntivo）。'
      }
    ]
  }
];

export { ALL_COURSES_POOL } from './allCoursesData';

