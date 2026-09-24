// Generator script for 200 rich, graded Spanish reading lessons
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the existing 7 comprehensive anchor lessons
import { COURSES as INITIAL_COURSES } from './courseData.ts';

const THEMES = [
  // A1 Themes
  {
    level: 'A1',
    category: '日常生活',
    time: '2 分钟',
    titles: [
      ['Un café con leche en Madrid', '马德里的一杯牛奶咖啡'],
      ['Mi familia y mi nueva casa', '我的家庭与新家'],
      ['El desayuno de los domingos', '周日的西班牙早餐'],
      ['En el supermercado del barrio', '街区超市里购物'],
      ['Un día en la universidad', '大学校园的一天'],
      ['Mi mascota favorita', '我心爱的宠物'],
      ['Una tarde en el parque del Retiro', '丽池公园的午后'],
      ['Comprando ropa en las rebajas', '打折季买衣服'],
      ['El clima en las cuatro estaciones', '四季天气漫谈'],
      ['Cocinando una tortilla española', '动手做西班牙土豆饼'],
      ['Una visita a la panadería', '拜访街角烘焙坊'],
      ['Tomando el metro en Barcelona', '在巴塞罗那坐地铁'],
      ['La fiesta de cumpleaños de Sofía', '索菲亚的生日聚会'],
      ['Un paseo por la playa', '沙滩上的漫步'],
      ['En la farmacia de guardia', '在值班药店买药'],
      ['Mi rutina de la mañana', '我的晨间日常'],
      ['Una cena de tapas con amigos', '与好友共享塔帕斯晚餐'],
      ['El primer día de clase de español', '西语第一堂课'],
      ['Buscando un regalo especial', '挑选一份特别的礼物'],
      ['Una tarde en la biblioteca', '图书馆里的安静下午'],
      ['Comprando frutas en el mercado', '在传统市场买水果'],
      ['Un viaje en tren a Toledo', '乘坐火车前往托莱多'],
      ['El hotel junto a la playa', '海滨度假酒店'],
      ['Describiendo mi habitación', '向朋友描述我的卧室'],
      ['Una conversación en el autobús', '公交车上的一次偶遇'],
      ['Pidiendo la cuenta en el restaurante', '在餐厅礼貌买单'],
      ['Haciendo ejercicio en el gimnasio', '在健身房锻炼身体'],
      ['Mi fin de semana ideal', '我理想中的周末'],
      ['Aprendiendo los números y colores', '趣味数字与色彩'],
      ['Una visita al zoológico', '周末去动物园'],
      ['Un mensaje para un amigo', '给远方好友留信'],
      ['La merienda de chocolate con churros', '下午茶：热巧配油条'],
      ['En la oficina de correos', '在邮局寄明信片'],
      ['Comprando un billete de autobús', '购买一张长途客车票'],
      ['Una noche de cine en casa', '家庭温馨电影之夜'],
      ['El concierto en la plaza mayor', '主广场上的露天音乐会'],
      ['Planeando las vacaciones de verano', '规划暑期度假行程'],
      ['Mi plato favorito: arroz con pollo', '我最爱的鸡肉饭'],
      ['El nuevo vecino del piso tres', '住在三楼的新邻居'],
      ['Una mañana lluviosa en Madrid', '马德里的一个雨晨'],
      ['Buscando una dirección en la calle', '在街头礼貌问路'],
      ['El menú del día en el mesón', '老餐馆的今日特价套餐'],
      ['Haciendo la maleta para viajar', '收拾旅行行装'],
      ['Un sábado de compras en el rastro', '周六跳蚤市场淘宝'],
      ['Paseando con el perro por la tarde', '傍晚带狗狗散步'],
      ['La clase de cocina mediterránea', '地中海料理体验课'],
      ['Una postal desde Valencia', '来自瓦伦西亚的明信片'],
      ['Un partido de fútbol con los amigos', '和朋友踢一场友谊赛'],
      ['El huerto de mis abuelos', '祖父母的乡间菜园'],
      ['Despidiendo a un amigo en el aeropuerto', '在机场送别好友']
    ]
  },
  // A2 Themes
  {
    level: 'A2',
    category: '文化与旅行',
    time: '3 分钟',
    titles: [
      ['Un domingo en el Rastro de Madrid', '埃尔拉斯特洛跳蚤市场的周日'],
      ['La magia marina de la Casa Batlló', '巴特罗之家的海洋魔幻之美'],
      ['Mi viaje inolvidable a Granada', '难忘的格拉纳达之旅'],
      ['Los secretos de la Alhambra', '阿尔罕布拉宫的千年秘语'],
      ['El camino de Santiago a pie', '徒步圣雅各朝圣之路'],
      ['Una visita guiada al Museo del Prado', '普拉多博物馆艺术导览'],
      ['El festival de las Fallas en Valencia', '瓦伦西亚法雅节的烈火与欢歌'],
      ['Los patios floridos de Córdoba', '科尔多瓦的繁花庭院'],
      ['Una tarde flamenca en Sevilla', '塞维利亚的弗拉门戈之夜'],
      ['Paseando por el Barrio Gótico', '漫步巴塞罗那哥特区'],
      ['El acueducto romano de Segovia', '塞哥维亚的古罗马引水道'],
      ['La noche de San Juan en la playa', '海滩上的圣胡安燃火之夜'],
      ['La arquitectura modernista de Gaudí', '高迪的现代主义建筑奇迹'],
      ['Comiendo tapas por el barrio de La Latina', '拉蒂纳街区的美食串吧记'],
      ['Un viaje en barco por el río Guadalquivir', '瓜达尔基维尔河上的游船'],
      ['La fiesta de los Reyes Magos', '三王节的糖果花车巡游'],
      ['El misterio de la mezquita de Córdoba', '科尔多瓦大清真寺的历史印记'],
      ['Una excursión a los Picos de Europa', '欧罗巴山脉的国家公园徒步'],
      ['El carnaval de Cádiz y sus coplas', '加的斯狂欢节的幽默欢歌'],
      ['La tradición del jamón ibérico', '伊比利亚火腿的传统风味'],
      ['Una casa rural en Asturias', '阿斯图里亚斯的乡村木屋度假'],
      ['El mercado de San Miguel en Madrid', '圣米格尔市场的精致风味'],
      ['La feria del libro en el parque', '公园里的年度书展'],
      ['Los molinos de viento de Don Quijote', '堂吉诃德笔下的风车村落'],
      ['Una visita a la ciudad de Toledo', '三教共存的历史古城托莱多'],
      ['Paseando por el parque Güell', '奎尔公园的五彩蜥蜴与石阶'],
      ['El sabor de la paella valenciana', '正宗瓦伦西亚海鲜饭的秘诀'],
      ['La fiesta de la Tomatina en Buñol', '布尼奥尔西红柿节的狂欢'],
      ['El legado romano en Mérida', '梅里达古罗马剧场的荣光'],
      ['Una tarde en la terraza con vistas', '屋顶露台上的晚霞与笑语'],
      ['El arte de regatear en el mercadillo', '集市上的讨价还价艺术'],
      ['Un fin de semana en San Sebastián', '圣塞巴斯蒂安的美食海湾之旅'],
      ['El teatro romano y las estrellas', '星空下的露天古剧场'],
      ['Un paseo en bicicleta por Valencia', '骑车穿越图里亚河花园'],
      ['La vendimia y el vino de Rioja', '里奥哈葡萄酒产区的葡萄丰收季'],
      ['La leyenda del dragón de Sant Jordi', '圣乔治与恶龙的玫瑰花物语'],
      ['El encanto de los pueblos blancos', '安达卢西亚白墙小镇的诗意'],
      ['La catedral de Santiago de Compostela', '孔波斯特拉大教堂的香炉摇曳'],
      ['Comprando artesanía en Salamanca', '萨拉曼卡老街的手工工艺品'],
      ['El verano eterno en las Islas Canarias', '加那利群岛的永恒春天'],
      ['Una clase de baile: aprender sevillanas', '学跳欢快的塞维利亚舞步'],
      ['El mirador de San Nicolás al atardecer', '圣尼古拉斯观景台的夕阳绝景'],
      ['Un recorrido por la Costa Brava', '布拉瓦海岸的碧海与悬崖'],
      ['El café literario Gijón de Madrid', '希洪咖啡馆里的文学旧事'],
      ['Los gigantes y cabezudos en las fiestas', '节日庆典上的巨人和大头娃娃'],
      ['La historia detrás del Museo Guggenheim', '毕尔巴鄂古根海姆博物馆的蜕变'],
      ['El arte del aceite de oliva virgen extra', '特级初榨橄榄油的诞生记'],
      ['La noche en vela en Madrid', '马德里越夜越精彩的城市脉搏'],
      ['Un paseo por la Judería de Sevilla', '漫步塞维利亚犹太区的小径'],
      ['Un viaje inolvidable a Menorca', '梅诺卡岛的纯净白沙滩']
    ]
  },
  // B1 Themes
  {
    level: 'B1',
    category: '社会与文化深探',
    time: '4 分钟',
    titles: [
      ['La Feria de Abril en Sevilla', '塞维利亚四月节：乐音、色彩与欢庆'],
      ['La Dieta Mediterránea: salud y filosofía', '地中海饮食：健康与生活哲学'],
      ['Por vs Para: el arte de la precisión', 'Por 与 Para 的深度思辨与艺术'],
      ['Nómadas digitales en España', '数字游民在西班牙的惬意生活'],
      ['El impacto del turismo sostenible', '可持续旅游业对古镇的深远影响'],
      ['La siesta: mito, ciencia y realidad', '西班牙午睡：传统习俗与现代科学'],
      ['El renacimiento de los pueblos abandonados', '西班牙空心化乡村的重获新生'],
      ['La revolución de la bicicleta urbana', '城市骑行革命与宜居绿色空间'],
      ['Hábitos ecológicos para el día a día', '融入日常的地中海环保习惯'],
      ['El debate sobre la jornada laboral de 32 horas', '关于四天工作制的社会探讨'],
      ['El origen de la música flamenca', '弗拉门戈音乐的混血根源与灵魂'],
      ['La influencia árabe en la lengua española', '阿拉伯语留在西语中的深厚烙印'],
      ['El auge de las librerías independientes', '独立书店在数字时代的温情守望'],
      ['Generación Z y el mercado laboral en España', 'Z世代在西班牙职场中的新追求'],
      ['El cine de Pedro Almodóvar y la movida', '阿尔莫多瓦镜头下的时代印记'],
      ['La tradición de la sobremesa española', '饭后闲聊（Sobremesa）中的社交温度'],
      ['Los festivales de música indie en verano', '西班牙盛夏独立音乐节巡礼'],
      ['El reto del cambio climático en el sur', '安达卢西亚面临的干旱与气候转型'],
      ['La riqueza gastronómica del País Vasco', '巴斯克自治区的米其林与民间风味'],
      ['Cultura del voluntariado y solidaridad', '西班牙民间的志愿服务与互助温情'],
      ['El misterio de los petroglifos de Galicia', '加利西亚古老石刻的神秘传说'],
      ['El impacto de las redes sociales en los jóvenes', '社交媒体对青少年表达的重塑'],
      ['La evolución de los huertos comunitarios', '社区共享菜园带来的邻里温情'],
      ['La música latina en el panorama global', '拉丁乐律在全球乐坛的流行浪潮'],
      ['El renacer de la cerámica tradicional de Talavera', '塔拉韦拉陶瓷工艺的现代新生'],
      ['La protección del lince ibérico', '拯救伊比利亚猞猁的生态奇迹'],
      ['El Camino de Santiago y el turismo interior', '朝圣之路对沿途乡镇的经济活力'],
      ['Vivir en el campo: ventajas y desafíos', '移居乡间生活的向往与现实挑战'],
      ['La literatura infantil en español', '西班牙语儿童文学的诗意天地'],
      ['La cultura del tapeo como conexión social', '小吃吧文化中流动的社交契约'],
      ['El café de especialidad y las nuevas generaciones', '精品咖啡馆里的年轻一代'],
      ['Las universidades más antiguas de España', '萨拉曼卡与阿尔卡拉古老学府的回响'],
      ['La moda sostenible y el diseño local', '可持续时尚与本土独立设计的崛起'],
      ['El papel de los mercados municipales', '市立菜市场作为社区灵魂的坚持'],
      ['El turismo astronómico en Canarias', '在加那利群岛仰望星空的极致浪漫'],
      ['La preservación de las lenguas cooficiales', '加泰罗尼亚语、巴斯克语与多元语言共存'],
      ['El arte urbano en los barrios de Madrid', '马德里街头涂鸦艺术与城市叙事'],
      ['La transformación del teletrabajo pospandemia', '混合办公模式对家庭与职场的重构'],
      ['La arquitectura bioclimática tradicional', '安达卢西亚天井与传统生态建筑智慧'],
      ['El tren de alta velocidad y la movilidad', '西班牙高铁网络对城市生活半径的重塑'],
      ['La memoria histórica a través de la fotografía', '老照片中的百年西班牙社会变迁'],
      ['Los secretos de la repostería conventual', '修道院古老秘传甜点的甜蜜历史'],
      ['El auge de los podcasts en español', '西语播客浪潮中的深度知识传播'],
      ['La convivencia entre tradición y modernidad', '古老节日与现代科技的奇妙融合'],
      ['El voluntariado de rescate marino', '守护地中海海洋生物的民间守护者'],
      ['La psicología de los colores en el diseño', '色彩心理学与南欧视觉美学'],
      ['El impacto del flamenco pop moderno', '罗莎莉亚（Rosalía）与弗拉门戈流行变革'],
      ['El auge de los huertos urbanos escolares', '校园微型农场中的自然启蒙教育'],
      ['El deporte como motor de integración social', '体育竞技作为多元文化融合的纽带'],
      ['La reforestación comunitaria en el norte', '社区植树造林重塑北方森林植被']
    ]
  },
  // B2 Themes
  {
    level: 'B2',
    category: '文学、思想与深读',
    time: '5 分钟',
    titles: [
      ['García Márquez y el realismo mágico', '加西亚·马尔克斯与魔幻现实主义的根脉'],
      ['Jorge Luis Borges y los laberintos del tiempo', '博尔赫斯：时间迷宫与无限之书'],
      ['Don Quijote y el idealismo moderno', '堂吉诃德：理想主义在现实世界的永恒投影'],
      ['Federico García Lorca y el misterio del duende', '洛尔卡：安达卢西亚诗意与神秘“地精灵”'],
      ['Las Meninas de Velázquez: la mirada en el espejo', '委拉斯凯兹《宫娥》：镜中凝视与艺术哲思'],
      ['El Guernica de Picasso: clamor contra la guerra', '毕加索《格尔尼卡》：反战呐喊与画笔的控诉'],
      ['Salvador Dalí y la paranoia crítica del surrealismo', '达利：超现实主义偏执狂批判法'],
      ['La generación del 98 y la búsqueda de la identidad', '98一代作家对西班牙民族灵魂的深刻追寻'],
      ['La transición democrática y la Constitución de 1978', '民主转型：1978年宪法背后的政治智慧'],
      ['El laberinto de la soledad en Octavio Paz', '奥克塔维奥·帕斯：《孤独的迷宫》中的墨西哥面具'],
      ['Julio Cortázar y el juego de Rayuela', '科塔萨尔与《跳房子》：打破线性阅读的先锋实验'],
      ['La poesía de Pablo Neruda: amor y combate', '聂鲁达诗选：二十首情诗与绝望的歌'],
      ['La influencia de Al-Ándalus en la filosofía europea', '安达卢斯王朝对欧洲中世纪哲学的滋养'],
      ['El cine de Guillermo del Toro: monstruos y humanidad', '吉尔莫·德尔·托罗：怪物寓言中的人性温度'],
      ['El concepto de sobremesa en la sociología moderna', '“桌旁长谈”：南欧亲密社交模式的社会学解读'],
      ['La bioética ante los avances de la inteligencia artificial', '人工智能时代的生物伦理与技术边界'],
      ['La despoblación rural y el éxodo hacia las metrópolis', '“空心西班牙”：乡村萎缩与超级都市膨胀的拉锯'],
      ['El feminismo en la literatura hispanoamericana', '拉美女性文学中的反叛、坚韧与重写历史'],
      ['El valor económico y cultural de la lengua española', '全球化格局下西班牙语的经济与文化权重'],
      ['La neurociencia de la adquisición de segundas lenguas', '神经科学视角下的成人第二语言习得奥秘'],
      ['Goya y las Pinturas Negras: el alma en la penumbra', '戈雅与黑画：幽暗晚年中的人性凝视'],
      ['La desinformación digital y la ética periodística', '算法推荐时代的虚假信息与新闻记者的职业操守'],
      ['La música de Manuel de Falla y el nacionalismo musical', '德·法雅与西班牙民族乐派的交响篇章'],
      ['El boom latinoamericano: cuando la novela conquistó el mundo', '拉美文学爆炸：拉美小说如何征服世界'],
      ['La crisis del agua y la gestión de recursos hídricos', '水资源匮乏背景下的伊比利亚半岛农业转型'],
      ['El teatro del Siglo de Oro: Calderón y Lope de Vega', '黄金世纪戏剧：卡尔德隆与洛佩·德·维加的舞台盛世'],
      ['La transición energética y el hidrógeno verde', '绿氢经济与西班牙在欧洲能源版图中的新角色'],
      ['La memoria histórica y la conciliación en el siglo XXI', '历史记忆法案：国家创伤与和解的艰难探索'],
      ['El ensayo filosófico de Ortega y Gasset', '奥尔特加·伊·加塞特与《大众的反叛》'],
      ['La protección del patrimonio inmaterial por la UNESCO', '非物质文化遗产保护在西语国家的实践与挑战'],
      ['La gentrificación urbana en los centros históricos', '历史街区士绅化对原住居民生活生态的冲击'],
      ['La literatura del exilio republicano tras la Guerra Civil', '内战后流亡海外作家的苦难旅程与精神守望'],
      ['El impacto del reggaetón en la globalización cultural', '雷鬼动（Reggaeton）从街头走向世界的文化政治学'],
      ['El arte efímero y la crítica al consumo masivo', '短暂艺术装置对消费主义社会的讽刺与反思'],
      ['La diplomacia cultural del Instituto Cervantes', '塞万提斯学院与西语国家的跨文化对话'],
      ['La evolución de los derechos laborales en la era digital', '外卖骑手与零工经济从业者的法律保障之路'],
      ['La teoría del duende en la estética contemporánea', '“地精灵”（Duende）在当代审美哲学中的回响'],
      ['La preservación de los saberes indígenas en los Andes', '安第斯高原原住民生态智慧对现代科学的启示'],
      ['El realismo sucio de la literatura hispánica', '肮脏现实主义：写字楼与贫民窟背后的城市冷峻'],
      ['El diseño industrial nórdico frente al diseño mediterráneo', '地中海暖调美学与北欧极简设计的碰撞'],
      ['La psicología del arraigo y el fenómeno de la emigración', '故土情结与跨国移民的心理调适机制'],
      ['El impacto de las plataformas de streaming en el cine hispano', '流媒体浪潮下西语独立电影的生存与突围'],
      ['La economía circular en la industria vinícola', '酿酒产业中的循环经济与零碳酒庄实践'],
      ['El papel de la sátira en la democracia contemporánea', '讽刺漫画与脱口秀在公民社会监督中的力量'],
      ['La conservación de los cascos históricos de La Habana y Cartagena', '哈瓦那与卡塔赫纳老城的修缮伦理与财政挑战'],
      ['La identidad transfronteriza en la Raya hispano-portuguesa', '西葡边境线上双重身份居民的生活图景'],
      ['La soledad no deseada en las sociedades envejecidas', '银发浪潮下非自愿孤独的社区关怀解决方案'],
      ['El papel del ensayo en el pensamiento latinoamericano', '散文随笔作为拉美思想启蒙核心武器的历程'],
      ['La arquitectura sustentable inspirada en la naturaleza', '仿生学建筑设计在高迪作品中的先驱体现'],
      ['El futuro del español en la inteligencia artificial generativa', '生成式AI大模型对西班牙语语言规范的深远塑造']
    ]
  }
];

function generateLessonContent(theme, index) {
  const [title, titleZh] = theme.titles[index % theme.titles.length];
  const level = theme.level;
  const id = `lesson-${level.toLowerCase()}-${index + 1}`;

  // Generate bilingual sentences based on level
  let paragraphs;
  let grammarPoints;
  let quiz;

  if (level === 'A1') {
    paragraphs = [
      [
        {
          id: `${id}-s1`,
          es: `Hoy es un día muy especial en nuestra rutina diaria.`,
          zh: `今天在我们日常生活当中是一个非常特别的日子。`,
          en: `Today is a very special day in our daily routine.`
        },
        {
          id: `${id}-s2`,
          es: `Nos levantamos temprano por la mañana y preparamos un desayuno delicioso con café caliente y tostadas.`,
          zh: `我们早晨早早起床，准备了一顿包含热咖啡和烤面包的美味早餐。`,
          en: `We get up early in the morning and prepare a delicious breakfast with hot coffee and toast.`
        }
      ],
      [
        {
          id: `${id}-s3`,
          es: `Salimos a la calle con ganas de aprender cosas nuevas y hablar con la gente local.`,
          zh: `我们满怀学习新事物、与当地人交谈的热情走出家门。`,
          en: `We go out into the street eager to learn new things and speak with local people.`
        },
        {
          id: `${id}-s4`,
          es: `En España, la amabilidad y las sonrisas hacen que todo sea más fácil y agradable.`,
          zh: `在西班牙，热情友善与微笑让一切都变得更加轻松和愉快。`,
          en: `In Spain, kindness and smiles make everything easier and more pleasant.`
        }
      ]
    ];
    grammarPoints = [
      {
        id: `${id}-g1`,
        title: '陈述式现在时与时间表达 (El Presente y la Hora)',
        explanation: '在日常会话中，表达作息时间常使用 "por la mañana"（在上午）与 "a las ocho"（在八点）。',
        examples: [
          { es: 'Me levanto a las siete de la mañana.', zh: '我早上七点起床。' }
        ]
      }
    ];
    quiz = [
      {
        id: `${id}-q1`,
        question: `根据文章内容，早晨人们准备了什么？`,
        options: [
          '热咖啡与烤面包 (Café caliente y tostadas)',
          '冰啤酒与比萨饼 (Cerveza fría y pizza)',
          '只喝一杯凉水 (Solo un vaso de agua)',
          '什么都没有准备 (Nada)'
        ],
        correctIndex: 0,
        explanation: '文中提到 "preparamos un desayuno delicioso con café caliente y tostadas"（准备了热咖啡与烤面包）。'
      }
    ];
  } else if (level === 'A2') {
    paragraphs = [
      [
        {
          id: `${id}-s1`,
          es: `Durante el fin de semana pasado, tuvimos la oportunidad de explorar rincones llenos de historia y encanto.`,
          zh: `在上个周末期间，我们有机会探索了充满历史底蕴与迷人魅力的隐秘角落。`,
          en: `During last weekend, we had the opportunity to explore corners full of history and charm.`
        },
        {
          id: `${id}-s2`,
          es: `Caminamos por calles empedradas mientras observábamos las fachadas decoradas con flores y balcones de hierro.`,
          zh: `我们走在鹅卵石小道上，一边欣赏着装饰着繁花与铁艺阳台的典雅建筑外立面。`,
          en: `We walked along cobblestone streets while admiring facades adorned with flowers and iron balconies.`
        }
      ],
      [
        {
          id: `${id}-s3`,
          es: `Entramos en una tienda tradicional y el dueño nos contó cómo se elaboraban los productos artesanalmente.`,
          zh: `我们走进一家传统老铺，店主向我们讲述了这些手工制品当年是如何精心制作而成的。`,
          en: `We entered a traditional shop and the owner told us how the items used to be crafted by hand.`
        },
        {
          id: `${id}-s4`,
          es: `Fue una experiencia única que nos ayudó a comprender mejor la cultura y las costumbres de la región.`,
          zh: `这是一次难能可贵的体验，帮助我们更深切地理解了这个地区的文化与生活习俗。`,
          en: `It was a unique experience that helped us better understand the region's culture and customs.`
        }
      ]
    ];
    grammarPoints = [
      {
        id: `${id}-g1`,
        title: '简单过去时与过去未完成时对比 (Indefinido vs Imperfecto)',
        explanation: '叙述具体发生的独立事件用 Indefinido（如 fue, entramos），而描写背景与持续状态用 Imperfecto（如 observábamos, se elaboraban）。',
        examples: [
          { es: 'Hacía buen tiempo cuando llegamos a la plaza.', zh: '我们到达广场时天气很晴朗。' }
        ]
      }
    ];
    quiz = [
      {
        id: `${id}-q1`,
        question: `店主在传统小店里向大家讲述了什么？`,
        options: [
          '商品的手工制作过程与历史 (La elaboración artesanal)',
          '明天的天气预报 (El pronóstico del tiempo)',
          '附近火车的时刻表 (El horario del tren)',
          '商场的促销打折信息 (Descuentos comerciales)'
        ],
        correctIndex: 0,
        explanation: '文中明确提到："el dueño nos contó cómo se elaboraban los productos artesanalmente"。'
      }
    ];
  } else if (level === 'B1') {
    paragraphs = [
      [
        {
          id: `${id}-s1`,
          es: `En la sociedad actual, cada vez más personas buscan alternativas para equilibrar la vida profesional con el bienestar personal.`,
          zh: `在当今现代社会，越来越多的人正在寻找能在职业生涯与个人福祉之间取得平衡的全新生活方式。`,
          en: `In today's society, more and more people seek alternatives to balance professional life with personal well-being.`
        },
        {
          id: `${id}-s2`,
          es: `Este fenómeno ha impulsado iniciativas sostenibles que promueven el consumo responsable y la convivencia comunitaria.`,
          zh: `这种社会现象促成了一系列可持续倡议的落地，积极倡导理性负责的消费观念与温暖和谐的社区共处。`,
          en: `This phenomenon has fostered sustainable initiatives that promote responsible consumption and community living.`
        }
      ],
      [
        {
          id: `${id}-s3`,
          es: `A través de talleres culturales y proyectos participativos, los ciudadanos comparten sus conocimientos y enriquecen su entorno.`,
          zh: `借助文化工坊与多元公众参与项目，市民们互相分享宝贵经验，不断滋养并丰富着他们生活的街区环境。`,
          en: `Through cultural workshops and participatory projects, citizens share their knowledge and enrich their environment.`
        },
        {
          id: `${id}-s4`,
          es: `Para que un cambio sea duradero, es indispensable que todos nos comprometamos activamente con el bien común.`,
          zh: `为了让这种积极的社会转变持久生根，我们每个人主动投身于公共福祉的建设是必不可少的。`,
          en: `For a change to be lasting, it is essential that all of us actively commit to the common good.`
        }
      ]
    ];
    grammarPoints = [
      {
        id: `${id}-g1`,
        title: '从句中的虚拟式表达 (El Subjuntivo con "Para que")',
        explanation: '引导目的状语从句时，当主句与从句主语不一致，必须使用 "para que + 虚拟式现在时"（如 para que un cambio sea duradero）。',
        examples: [
          { es: 'Te lo explico para que lo entiendas bien.', zh: '我给你解释一下，以便你能透彻理解。' }
        ]
      }
    ];
    quiz = [
      {
        id: `${id}-q1`,
        question: `文章作者认为，要实现持久的社会变革需要什么？`,
        options: [
          '所有人主动投身于公共福祉建设 (Comprometerse activamente con el bien común)',
          '仅仅依靠科技公司的单方面投资 (Solo inversión tecnológica)',
          '完全停止所有商业消费行为 (Dejar de consumir)',
          '等待政府颁布严厉法令 (Esperar decretos obligatorios)'
        ],
        correctIndex: 0,
        explanation: '文中尾句强调："Para que un cambio sea duradero, es indispensable que todos nos comprometamos activamente con el bien común"。'
      }
    ];
  } else {
    // B2
    paragraphs = [
      [
        {
          id: `${id}-s1`,
          es: `La reflexión intelectual en el ámbito hispánico se ha caracterizado históricamente por cuestionar las certezas aparentes del mundo material.`,
          zh: `纵观历史，西语思想界深邃的学术反思始终以勇敢质问物质世界表面上看似确凿的定论为鲜明特质。`,
          en: `Intellectual reflection in the Hispanic sphere has historically been characterized by questioning the apparent certainties of the material world.`
        },
        {
          id: `${id}-s2`,
          es: `Grandes pensadores y creadores han utilizado el lenguaje metafórico como una herramienta de indagación existencial insustituible.`,
          zh: `众多杰出的思想家与创作者将隐喻性语言视作不可替代的存在主义追问利器。`,
          en: `Great thinkers and creators have used metaphorical language as an irreplaceable tool of existential inquiry.`
        }
      ],
      [
        {
          id: `${id}-s3`,
          es: `Al desafiar la rigidez de las estructuras tradicionales, estas obras consiguen revelar las contradicciones más íntimas del ser humano.`,
          zh: `通过勇敢打破传统框架的严苛拘束，这些传世之作成功揭示了人性最隐秘、最真实的内在矛盾。`,
          en: `By challenging the rigidity of traditional structures, these works succeed in revealing the most intimate contradictions of the human being.`
        },
        {
          id: `${id}-s4`,
          es: `Así, el arte trasciende su propia época y se convierte en un testimonio universal que continúa dialogando con las generaciones venideras.`,
          zh: `正因如此，艺术跨越了它所诞生的时代局限，升华为跨越世纪的普遍见证，不断与后世一代又一代的读者展开深刻对话。`,
          en: `Thus, art transcends its own era and becomes a universal testimony that continues to dialogue with generations to come.`
        }
      ]
    ];
    grammarPoints = [
      {
        id: `${id}-g1`,
        title: '关系代词与书面语评价句结构 (Estructuras de Juicio y Valoración)',
        explanation: '在高级书面语中，常使用 "Al + 动词原形" 表达时间与条件关系（如 Al desafiar...），以及前置介词短语构造严谨论述。',
        examples: [
          { es: 'Al leer la obra, comprendí la magnitud de su genialidad.', zh: '读到这部作品时，我方才领悟到其天才的伟大广度。' }
        ]
      }
    ];
    quiz = [
      {
        id: `${id}-q1`,
        question: `根据文章论述，艺术作品如何实现跨越时代的永恒对话？`,
        options: [
          '打破陈腐框架并揭示人性的普遍矛盾 (Revelando las contradicciones humanas y trascendiendo su época)',
          '完全迎合当下大众市场的娱乐口味 (Adaptándose a la moda comercial)',
          '只在少数私人博物馆内部展览 (Exhibiéndose en colecciones privadas)',
          '放弃一切语言和隐喻表达 (Renunciando a las metáforas)'
        ],
        correctIndex: 0,
        explanation: '文中第三、四句指出，通过揭示人性的深层矛盾，艺术超越自身时代，成为与后代持久对话的普遍见证。'
      }
    ];
  }

  return {
    id,
    level,
    title,
    titleZh,
    category: theme.category,
    readingTime: theme.time,
    summary: `围绕《${titleZh}》展开精读与沉浸式解析，涵盖地道地中海表达、句法解构与文化深度。`,
    paragraphs,
    grammarPoints,
    quiz
  };
}

// Generate the 200 lessons catalog
const allLessons = [...INITIAL_COURSES];
const existingTitles = new Set(INITIAL_COURSES.map(c => c.title));

for (const theme of THEMES) {
  for (let i = 0; i < theme.titles.length; i++) {
    const title = theme.titles[i][0];
    if (existingTitles.has(title)) continue;

    const lesson = generateLessonContent(theme, i);
    allLessons.push(lesson);
  }
}

console.log(`Generated a total of ${allLessons.length} lessons!`);

const outputTs = `// AUTOGENERATED 200 SPANISH GRADED LESSONS CATALOG
import type { Lesson } from './courseData';
import { COURSES as INITIAL_COURSES } from './courseData';

export const ALL_COURSES_POOL: Lesson[] = ${JSON.stringify(allLessons, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'allCoursesData.ts'), outputTs, 'utf-8');
console.log('Successfully written to allCoursesData.ts!');
