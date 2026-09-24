import type { DictEntry } from './types';

/**
 * Comprehensive Spanish-Chinese General Dictionary
 * Covering high-frequency daily vocabulary, dining, household, clothing,
 * health, shopping, travel, nature, adjectives, and core communication verbs.
 */
export const COMPREHENSIVE_SPANISH_WORDS: DictEntry[] = [
  // === HOUSEHOLD & DAILY OBJECTS ===
  {
    word: 'desayuno',
    pronunciation: '[de.saˈʝu.no]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '早餐，早点',
    meaningEn: 'breakfast',
    examples: [{ es: 'El desayuno continental está incluido.', zh: '欧式早餐已包含在内。' }]
  },
  {
    word: 'almuerzo',
    pronunciation: '[alˈmweɾ.so]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '午餐，午饭',
    meaningEn: 'lunch',
    examples: [{ es: 'Quedamos para el almuerzo a las dos.', zh: '我们约好两点吃午饭。' }]
  },
  {
    word: 'cena',
    pronunciation: '[ˈse.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '晚餐，夜饭',
    meaningEn: 'dinner, supper',
    examples: [{ es: 'En España la cena se sirve tarde.', zh: '在西班牙，晚餐通常吃得很晚。' }]
  },
  {
    word: 'espejo',
    pronunciation: '[esˈpe.xo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '镜子',
    meaningEn: 'mirror',
    examples: [{ es: 'Se miró en el espejo antes de salir.', zh: '出门前他照了照镜子。' }]
  },
  {
    word: 'paraguas',
    pronunciation: '[paˈɾa.ɣwas]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '雨伞',
    meaningEn: 'umbrella',
    examples: [{ es: 'Lleva el paraguas porque va a llover.', zh: '带上雨伞，因为要下雨了。' }]
  },
  {
    word: 'computadora',
    pronunciation: '[kom.pu.taˈðo.ɾa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '电脑，计算机（拉美常用；西班牙多用 ordenador）',
    meaningEn: 'computer',
    examples: [{ es: 'Trabajo con la computadora todo el día.', zh: '我整天都在用电脑工作。' }]
  },
  {
    word: 'ordenador',
    pronunciation: '[oɾ.ðe.naˈðoɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '电脑，计算机（西班牙常用）',
    meaningEn: 'computer',
    examples: [{ es: 'Encendí el ordenador portatil.', zh: '我打开了笔记本电脑。' }]
  },
  {
    word: 'móvil',
    pronunciation: '[ˈmo.βil]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '手机，移动电话（西班牙）',
    meaningEn: 'mobile phone',
    examples: [{ es: '¿Dónde dejé mi móvil?', zh: '我把手机放哪儿了？' }]
  },
  {
    word: 'celular',
    pronunciation: '[se.luˈlaɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '手机，蜂窝电话（拉美常用）',
    meaningEn: 'cell phone',
    examples: [{ es: 'Recibí un mensaje en el celular.', zh: '我手机上收到了一条短信。' }]
  },
  {
    word: 'llave',
    pronunciation: '[ˈʝa.βe]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '钥匙；扳手',
    meaningEn: 'key',
    examples: [{ es: 'No olvides la llave de la habitación.', zh: '别忘了房间的钥匙。' }]
  },
  {
    word: 'puerta',
    pronunciation: '[ˈpweɾ.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '门，大门',
    meaningEn: 'door, gate',
    examples: [{ es: 'Por favor, cierre la puerta al salir.', zh: '离开时请关门。' }]
  },
  {
    word: 'ventana',
    pronunciation: '[benˈta.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '窗户，窗口',
    meaningEn: 'window',
    examples: [{ es: 'Abrió la ventana para que entrara aire fresco.', zh: '他打开窗户让新鲜空气进来。' }]
  },
  {
    word: 'cama',
    pronunciation: '[ˈka.ma]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '床',
    meaningEn: 'bed',
    examples: [{ es: 'Una cama doble muy cómoda.', zh: '一张非常舒服的双人床。' }]
  },
  {
    word: 'silla',
    pronunciation: '[ˈsi.ʝa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '椅子',
    meaningEn: 'chair',
    examples: [{ es: 'Tome asiento en esta silla, por favor.', zh: '请坐在这把椅子上。' }]
  },
  {
    word: 'mesa',
    pronunciation: '[ˈme.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '桌子，餐桌',
    meaningEn: 'table',
    examples: [{ es: 'Una mesa para dos personas, por favor.', zh: '请给我们一张两人桌。' }]
  },
  {
    word: 'cocina',
    pronunciation: '[koˈsi.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '厨房；烹饪，菜肴',
    meaningEn: 'kitchen; cuisine',
    examples: [{ es: 'La cocina mediterránea es muy saludable.', zh: '地中海菜系非常健康。' }]
  },
  {
    word: 'baño',
    pronunciation: '[ˈba.ɲo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '卫生间，洗手间；浴室；沐浴',
    meaningEn: 'bathroom, toilet',
    examples: [{ es: '¿Dónde está el baño, por favor?', zh: '请问洗手间在哪里？' }]
  },
  {
    word: 'ducha',
    pronunciation: '[ˈdu.tʃa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '淋浴，淋浴喷头',
    meaningEn: 'shower',
    examples: [{ es: 'Me di una ducha caliente.', zh: '我冲了个热水澡。' }]
  },
  {
    word: 'toalla',
    pronunciation: '[toˈa.ʝa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '毛巾，浴巾',
    meaningEn: 'towel',
    examples: [{ es: '¿Nos puede traer otra toalla limpia?', zh: '能给我们再拿一条干净毛巾吗？' }]
  },
  {
    word: 'reloj',
    pronunciation: '[reˈlox]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '钟表，手表',
    meaningEn: 'clock, watch',
    examples: [{ es: 'Miró su reloj y vio que eran las cinco.', zh: '他看了看手表，发现已经五点了。' }]
  },

  // === CLOTHING & ACCESSORIES ===
  {
    word: 'ropa',
    pronunciation: '[ˈro.pa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '衣服，衣物',
    meaningEn: 'clothes, clothing',
    examples: [{ es: 'Compré ropa cómoda para el viaje.', zh: '我买了旅行穿的舒适衣物。' }]
  },
  {
    word: 'camisa',
    pronunciation: '[kaˈmi.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '衬衫，男衬衣',
    meaningEn: 'shirt',
    examples: [{ es: 'Lleva una camisa blanca de lino.', zh: '他穿着一件白色亚麻衬衫。' }]
  },
  {
    word: 'camiseta',
    pronunciation: '[ka.miˈse.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: 'T恤衫，短袖汗衫',
    meaningEn: 't-shirt',
    examples: [{ es: 'Una camiseta de algodón suave.', zh: '一件柔软的纯棉T恤。' }]
  },
  {
    word: 'pantalón',
    pronunciation: '[pan.taˈlon]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '裤子，长裤',
    meaningEn: 'trousers, pants',
    examples: [{ es: 'Me probé este pantalón azul.', zh: '我试穿了这条蓝色裤子。' }]
  },
  {
    word: 'pantalones',
    pronunciation: '[pan.taˈlo.nes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '裤子（复数形式）',
    meaningEn: 'trousers, pants',
    examples: [{ es: 'Un par de pantalones vaqueros.', zh: '一条牛仔裤。' }]
  },
  {
    word: 'zapato',
    pronunciation: '[saˈpa.to]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鞋子，皮鞋',
    meaningEn: 'shoe',
    examples: [{ es: 'Zapatos cómodos para caminar.', zh: '适合步行的舒适鞋子。' }]
  },
  {
    word: 'zapatos',
    pronunciation: '[saˈpa.tos]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鞋子（复数）',
    meaningEn: 'shoes',
    examples: [{ es: 'Me quité los zapatos al entrar.', zh: '进门时我脱了鞋。' }]
  },
  {
    word: 'calcetín',
    pronunciation: '[kal.seˈtin]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '袜子，短袜',
    meaningEn: 'sock',
    examples: [{ es: 'Calcetines de lana calentitos.', zh: '暖和的羊毛袜。' }]
  },
  {
    word: 'abrigo',
    pronunciation: '[aˈβɾi.ɣo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '大衣，外套，防寒服',
    meaningEn: 'coat, overcoat',
    examples: [{ es: 'Ponte el abrigo que hace frío afuera.', zh: '穿上大衣，外面很冷。' }]
  },
  {
    word: 'chaqueta',
    pronunciation: '[tʃaˈke.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '夹克，短上衣',
    meaningEn: 'jacket',
    examples: [{ es: 'Una chaqueta ligera para la noche.', zh: '一件适合晚间的轻便夹克。' }]
  },
  {
    word: 'vestido',
    pronunciation: '[besˈti.ðo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '连衣裙，裙子；服装',
    meaningEn: 'dress',
    examples: [{ es: 'Llevaba un vestido rojo muy elegante.', zh: '她穿了一条非常优雅的红裙。' }]
  },
  {
    word: 'falda',
    pronunciation: '[ˈfal.da]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '短裙，半身裙',
    meaningEn: 'skirt',
    examples: [{ es: 'Una falda larga de verano.', zh: '一条夏日长裙。' }]
  },
  {
    word: 'sombrero',
    pronunciation: '[somˈbɾe.ɾo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '帽子（多指有檐帽）',
    meaningEn: 'hat',
    examples: [{ es: 'Un sombrero de paja para el sol.', zh: '一顶遮阳草帽。' }]
  },
  {
    word: 'gorra',
    pronunciation: '[ˈɡo.ra]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '便帽，鸭舌帽，棒球帽',
    meaningEn: 'cap',
    examples: [{ es: 'Lleva una gorra deportiva.', zh: '他戴着一顶运动鸭舌帽。' }]
  },
  {
    word: 'gafas',
    pronunciation: '[ˈɡa.fas]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '眼镜',
    meaningEn: 'glasses, spectacles',
    examples: [{ es: 'Gafas de sol para la playa.', zh: '海滩用的太阳镜。' }]
  },
  {
    word: 'bolso',
    pronunciation: '[ˈbol.so]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '女手提包，皮包',
    meaningEn: 'handbag, purse',
    examples: [{ es: 'Guardó el monedero en su bolso.', zh: '她把零钱包放进了手提包里。' }]
  },
  {
    word: 'bolsa',
    pronunciation: '[ˈbol.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '袋子，塑料袋；证券交易所',
    meaningEn: 'bag; stock exchange',
    examples: [{ es: '¿Necesita una bolsa para las compras?', zh: '您买的东西需要袋子吗？' }]
  },
  {
    word: 'cartera',
    pronunciation: '[kaɾˈte.ɾa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '钱包，公文包',
    meaningEn: 'wallet, portfolio',
    examples: [{ es: 'Llevo mi tarjeta en la cartera.', zh: '我把银行卡放在钱包里。' }]
  },
  {
    word: 'dinero',
    pronunciation: '[diˈne.ɾo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '钱，金钱',
    meaningEn: 'money',
    examples: [{ es: 'No tengo mucho dinero en efectivo.', zh: '我没有很多现金。' }]
  },
  {
    word: 'efectivo',
    pronunciation: '[e.fekˈti.βo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '现金；有效的',
    meaningEn: 'cash; effective',
    examples: [{ es: '¿Puedo pagar en efectivo o con tarjeta?', zh: '我可以用现金还是刷卡？' }]
  },
  {
    word: 'tarjeta',
    pronunciation: '[taɾˈxe.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '卡片，银行卡，信用卡',
    meaningEn: 'card, credit card',
    examples: [{ es: 'Aceptamos pagos con tarjeta de crédito.', zh: '我们接受信用卡支付。' }]
  },
  {
    word: 'precio',
    pronunciation: '[ˈpɾe.sjo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '价格，价钱',
    meaningEn: 'price',
    examples: [{ es: '¿Cuál es el precio de este plato?', zh: '这道菜的价格是多少？' }]
  },
  {
    word: 'cuenta',
    pronunciation: '[ˈkwen.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '账单；账户；计算',
    meaningEn: 'bill, account',
    examples: [{ es: 'La cuenta, por favor.', zh: '请结账/买单。' }]
  },
  {
    word: 'propina',
    pronunciation: '[pɾoˈpi.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '小费',
    meaningEn: 'tip, gratuity',
    examples: [{ es: 'Dejamos una buena propina al camarero.', zh: '我们给服务员留了一笔丰厚的小费。' }]
  },

  // === FOOD, TABLE & DINING ===
  {
    word: 'plato',
    pronunciation: '[ˈpla.to]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '盘子，碟子；菜肴，一道菜',
    meaningEn: 'plate, dish',
    examples: [{ es: 'El plato del día es paella mixta.', zh: '今日特色菜是什锦海鲜饭。' }]
  },
  {
    word: 'vaso',
    pronunciation: '[ˈba.so]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '玻璃杯，水杯',
    meaningEn: 'glass, tumbler',
    examples: [{ es: 'Un vaso de agua fría, por favor.', zh: '请给我一杯凉水。' }]
  },
  {
    word: 'taza',
    pronunciation: '[ˈta.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '杯子，咖啡杯，茶杯',
    meaningEn: 'cup, mug',
    examples: [{ es: 'Una taza de café cortado.', zh: '一杯加少许牛奶的咖啡。' }]
  },
  {
    word: 'botella',
    pronunciation: '[boˈte.ʝa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '瓶子，一瓶',
    meaningEn: 'bottle',
    examples: [{ es: 'Una botella de agua sin gas.', zh: '一瓶不带气的水。' }]
  },
  {
    word: 'cuchara',
    pronunciation: '[kuˈtʃa.ɾa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '勺子，调羹',
    meaningEn: 'spoon',
    examples: [{ es: 'Necesito una cuchara para la sopa.', zh: '我需要一把喝汤的勺子。' }]
  },
  {
    word: 'tenedor',
    pronunciation: '[te.neˈðoɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '叉子',
    meaningEn: 'fork',
    examples: [{ es: 'Se le cayó el tenedor al suelo.', zh: '他的叉子掉在地上了。' }]
  },
  {
    word: 'cuchillo',
    pronunciation: '[kuˈtʃi.ʝo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '刀，餐刀',
    meaningEn: 'knife',
    examples: [{ es: 'Este cuchillo corta muy bien.', zh: '这把刀切东西很快。' }]
  },
  {
    word: 'servilleta',
    pronunciation: '[seɾ.βiˈʝe.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '餐巾，纸巾',
    meaningEn: 'napkin',
    examples: [{ es: '¿Me da otra servilleta, por favor?', zh: '能再给我一张餐巾纸吗？' }]
  },
  {
    word: 'azúcar',
    pronunciation: '[aˈsu.kaɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '糖，蔗糖',
    meaningEn: 'sugar',
    examples: [{ es: 'Café sin azúcar, gracias.', zh: '咖啡不要放糖，谢谢。' }]
  },
  {
    word: 'sal',
    pronunciation: '[sal]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '食盐，盐',
    meaningEn: 'salt',
    examples: [{ es: '¿Me pasa la sal, por favor?', zh: '能把盐递给我一下吗？' }]
  },
  {
    word: 'pimienta',
    pronunciation: '[piˈmjen.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '胡椒粉，胡椒',
    meaningEn: 'pepper',
    examples: [{ es: 'Añadir un poco de sal y pimienta.', zh: '加入少许盐和胡椒。' }]
  },
  {
    word: 'mantequilla',
    pronunciation: '[man.teˈki.ʝa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '黄油，奶油',
    meaningEn: 'butter',
    examples: [{ es: 'Tostada con mantequilla y mermelada.', zh: '抹了黄油和果酱的烤吐司。' }]
  },
  {
    word: 'aceite',
    pronunciation: '[aˈsej.te]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '油，橄榄油',
    meaningEn: 'oil, olive oil',
    examples: [{ es: 'Aceite de oliva virgen extra.', zh: '特级初榨橄榄油。' }]
  },
  {
    word: 'arroz',
    pronunciation: '[aˈros]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '米，米饭，大米',
    meaningEn: 'rice',
    examples: [{ es: 'Arroz con leche casero.', zh: '自制的西式大米布丁。' }]
  },
  {
    word: 'pan',
    pronunciation: '[pan]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '面包',
    meaningEn: 'bread',
    examples: [{ es: 'Pan recién horneado.', zh: '刚出炉的面包。' }]
  },
  {
    word: 'queso',
    pronunciation: '[ˈke.so]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '奶酪，起司',
    meaningEn: 'cheese',
    examples: [{ es: 'Queso manchego curado.', zh: '成熟的曼彻格奶酪。' }]
  },
  {
    word: 'huevo',
    pronunciation: '[ˈwe.βo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鸡蛋，蛋',
    meaningEn: 'egg',
    examples: [{ es: 'Huevos revueltos para desayunar.', zh: '早餐吃炒鸡蛋。' }]
  },
  {
    word: 'huevos',
    pronunciation: '[ˈwe.βos]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鸡蛋（复数）',
    meaningEn: 'eggs',
    examples: [{ es: 'Una tortilla de patatas con cuatro huevos.', zh: '用四个鸡蛋做的土豆煎蛋饼。' }]
  },
  {
    word: 'carne',
    pronunciation: '[ˈkaɾ.ne]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '肉，牛肉/猪肉',
    meaningEn: 'meat',
    examples: [{ es: 'Prefiero la carne bien hecha.', zh: '我更喜欢全熟的肉。' }]
  },
  {
    word: 'pollo',
    pronunciation: '[ˈpo.ʝo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鸡肉，小鸡',
    meaningEn: 'chicken',
    examples: [{ es: 'Pollo asado con patatas fritas.', zh: '烤鸡配薯条。' }]
  },
  {
    word: 'pescado',
    pronunciation: '[pesˈka.ðo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '鱼肉，食用鱼',
    meaningEn: 'fish (food)',
    examples: [{ es: 'Pescado fresco del día.', zh: '当天捕捞的新鲜鱼肉。' }]
  },
  {
    word: 'pez',
    pronunciation: '[pes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '水中的鱼（活鱼）',
    meaningEn: 'fish (living)',
    examples: [{ es: 'Peces de colores en el acuario.', zh: '水族馆里的彩色鱼。' }]
  },
  {
    word: 'fruta',
    pronunciation: '[ˈfɾu.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '水果',
    meaningEn: 'fruit',
    examples: [{ es: 'Comer fruta fresca todos los días.', zh: '每天吃新鲜水果。' }]
  },
  {
    word: 'manzana',
    pronunciation: '[manˈsa.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '苹果；街区',
    meaningEn: 'apple; city block',
    examples: [{ es: 'Una manzana roja y crujiente.', zh: '一个红而香脆的苹果。' }]
  },
  {
    word: 'plátano',
    pronunciation: '[ˈpla.ta.no]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '香蕉（加那利香蕉）',
    meaningEn: 'banana',
    examples: [{ es: 'Plátano de Canarias muy dulce.', zh: '非常甘甜的加那利香蕉。' }]
  },
  {
    word: 'naranja',
    pronunciation: '[naˈɾaŋ.xa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '橙子，柑橘；橙色',
    meaningEn: 'orange (fruit & color)',
    examples: [{ es: 'Zumo de naranja natural recién exprimido.', zh: '鲜榨纯橙汁。' }]
  },
  {
    word: 'limón',
    pronunciation: '[liˈmon]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '柠檬',
    meaningEn: 'lemon',
    examples: [{ es: 'Té con una rodaja de limón.', zh: '加了一片柠檬的红茶。' }]
  },
  {
    word: 'fresa',
    pronunciation: '[ˈfɾe.sa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '草莓',
    meaningEn: 'strawberry',
    examples: [{ es: 'Fresas con nata fresca.', zh: '鲜奶油草莓。' }]
  },
  {
    word: 'uva',
    pronunciation: '[ˈu.βa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '葡萄',
    meaningEn: 'grape',
    examples: [{ es: 'Las doce uvas de la Nochevieja.', zh: '跨年夜的十二颗幸运葡萄。' }]
  },
  {
    word: 'tomate',
    pronunciation: '[toˈma.te]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '番茄，西红柿',
    meaningEn: 'tomato',
    examples: [{ es: 'Pan con tomate y jamón ibérico.', zh: '番茄擦面包配伊比利亚火腿。' }]
  },
  {
    word: 'patata',
    pronunciation: '[paˈta.ta]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '土豆，马铃薯（西班牙）',
    meaningEn: 'potato',
    examples: [{ es: 'Tortilla de patata española.', zh: '西班牙传统土豆煎蛋饼。' }]
  },
  {
    word: 'papa',
    pronunciation: '[ˈpa.pa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '土豆（拉美）；教皇（阳性 el Papa）',
    meaningEn: 'potato (LatAm); Pope',
    examples: [{ es: 'Papas fritas con salsa criolla.', zh: '炸土豆配克里奥尔酱汁。' }]
  },
  {
    word: 'cebolla',
    pronunciation: '[seˈβo.ʝa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '洋葱',
    meaningEn: 'onion',
    examples: [{ es: '¿La tortilla con o sin cebolla?', zh: '土豆饼加洋葱还是不加洋葱？' }]
  },
  {
    word: 'ajo',
    pronunciation: '[ˈa.xo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '大蒜，蒜',
    meaningEn: 'garlic',
    examples: [{ es: 'Gambas al ajillo muy sabrosas.', zh: '香气四溢的蒜蓉大虾。' }]
  },
  {
    word: 'ensalada',
    pronunciation: '[en.saˈla.ða]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '沙拉，凉拌菜',
    meaningEn: 'salad',
    examples: [{ es: 'Una ensalada mixta de primero.', zh: '第一道菜来一份什锦沙拉。' }]
  },

  // === WEATHER & NATURE ===
  {
    word: 'sol',
    pronunciation: '[sol]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '太阳，阳光',
    meaningEn: 'sun, sunshine',
    examples: [{ es: 'Hace mucho sol hoy en Sevilla.', zh: '今天塞维利亚艳阳高照。' }]
  },
  {
    word: 'luna',
    pronunciation: '[ˈlu.na]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '月亮，月光',
    meaningEn: 'moon',
    examples: [{ es: 'La luna llena ilumina la noche.', zh: '满月照亮了夜空。' }]
  },
  {
    word: 'lluvia',
    pronunciation: '[ˈʝu.βja]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '雨，雨水',
    meaningEn: 'rain',
    examples: [{ es: 'El sonido relajante de la lluvia.', zh: '令人放松的雨声。' }]
  },
  {
    word: 'nieve',
    pronunciation: '[ˈnje.βe]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '雪，降雪',
    meaningEn: 'snow',
    examples: [{ es: 'Las montañas están cubiertas de nieve.', zh: '群山已被白雪覆盖。' }]
  },
  {
    word: 'viento',
    pronunciation: '[ˈbjen.to]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '风',
    meaningEn: 'wind',
    examples: [{ es: 'Hace bastante viento en la costa.', zh: '海岸边风相当大。' }]
  },
  {
    word: 'calor',
    pronunciation: '[kaˈloɾ]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '热，热度，炎热',
    meaningEn: 'heat, warmth',
    examples: [{ es: 'Tengo mucho calor en verano.', zh: '夏天我觉得非常热。' }]
  },
  {
    word: 'frío',
    pronunciation: '[ˈfɾi.o]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '寒冷，冷；冷的（形容词）',
    meaningEn: 'cold (noun & adj)',
    examples: [{ es: 'Hace frío en invierno en Madrid.', zh: '马德里的冬天天很冷。' }]
  },
  {
    word: 'primavera',
    pronunciation: '[pɾi.maˈβe.ɾa]',
    partOfSpeech: 'noun',
    gender: 'f',
    meaningZh: '春季，春天',
    meaningEn: 'spring',
    examples: [{ es: 'Las flores brotan en primavera.', zh: '百花在春天绽放。' }]
  },
  {
    word: 'verano',
    pronunciation: '[beˈɾa.no]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '夏季，夏天',
    meaningEn: 'summer',
    examples: [{ es: 'En verano nos gusta ir a la playa.', zh: '夏天我们喜欢去海滩。' }]
  },
  {
    word: 'otoño',
    pronunciation: '[oˈto.ɲo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '秋季，秋天',
    meaningEn: 'autumn, fall',
    examples: [{ es: 'Las hojas caen en otoño.', zh: '秋日落叶纷飞。' }]
  },
  {
    word: 'invierno',
    pronunciation: '[imˈbjeɾ.no]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '冬季，冬天',
    meaningEn: 'winter',
    examples: [{ es: 'En invierno anochece más temprano.', zh: '冬天黑夜来得更早。' }]
  },

  // === DAYS & MONTHS ===
  {
    word: 'lunes',
    pronunciation: '[ˈlu.nes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期一，周一',
    meaningEn: 'Monday',
    examples: [{ es: 'El lunes empieza la semana laboral.', zh: '周一开始工作周。' }]
  },
  {
    word: 'martes',
    pronunciation: '[ˈmaɾ.tes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期二，周二',
    meaningEn: 'Tuesday',
    examples: [{ es: 'El martes tengo clase de español.', zh: '周二我有西语课。' }]
  },
  {
    word: 'miércoles',
    pronunciation: '[ˈmjeɾ.ko.les]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期三，周三',
    meaningEn: 'Wednesday',
    examples: [{ es: 'Mitad de semana es el miércoles.', zh: '周三是一周的中间。' }]
  },
  {
    word: 'jueves',
    pronunciation: '[ˈxwe.βes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期四，周四',
    meaningEn: 'Thursday',
    examples: [{ es: 'Los jueves por la tarde salimos de tapas.', zh: '周四傍晚我们常去吃塔帕斯。' }]
  },
  {
    word: 'viernes',
    pronunciation: '[ˈbjeɾ.nes]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期五，周五',
    meaningEn: 'Friday',
    examples: [{ es: '¡Por fin es viernes!', zh: '终于周五了！' }]
  },
  {
    word: 'sábado',
    pronunciation: '[ˈsa.βa.ðo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期六，周六',
    meaningEn: 'Saturday',
    examples: [{ es: 'El sábado dormimos hasta tarde.', zh: '周六我们睡到很晚。' }]
  },
  {
    word: 'domingo',
    pronunciation: '[doˈmiŋ.ɡo]',
    partOfSpeech: 'noun',
    gender: 'm',
    meaningZh: '星期日，周日',
    meaningEn: 'Sunday',
    examples: [{ es: 'Los domingos las tiendas suelen cerrar.', zh: '周日商店通常会关门。' }]
  },

  // === COMMON ESSENTIAL VERBS (INFINITIVES) ===
  {
    word: 'buscar',
    pronunciation: '[busˈkaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '寻找，查找，搜寻',
    meaningEn: 'to look for, to search',
    examples: [{ es: 'Busco la estación de metro más cercana.', zh: '我在找最近的地铁站。' }]
  },
  {
    word: 'encontrar',
    pronunciation: '[eŋ.konˈtɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '找到，遇到，发现',
    meaningEn: 'to find, to meet',
    examples: [{ es: 'Por fin encontré mis llaves.', zh: '我终于找到了我的钥匙。' }]
  },
  {
    word: 'pagar',
    pronunciation: '[paˈɣaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '支付，付钱，结账',
    meaningEn: 'to pay',
    examples: [{ es: '¿Puedo pagar con tarjeta contactless?', zh: '我可以用非接触式刷卡付款吗？' }]
  },
  {
    word: 'costar',
    pronunciation: '[kosˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '花费，价值；困难',
    meaningEn: 'to cost',
    examples: [{ es: '¿Cuánto cuesta este billete?', zh: '这张票多少钱？' }]
  },
  {
    word: 'comprar',
    pronunciation: '[komˈpɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '购买，买',
    meaningEn: 'to buy',
    examples: [{ es: 'Voy a comprar fruta en el mercado.', zh: '我要去市场上买水果。' }]
  },
  {
    word: 'vender',
    pronunciation: '[benˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '出售，出卖，卖',
    meaningEn: 'to sell',
    examples: [{ es: 'Aquí venden recuerdos artesanales.', zh: '这里售卖手工艺纪念品。' }]
  },
  {
    word: 'ayudar',
    pronunciation: '[a.ʝuˈðaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '帮助，协助',
    meaningEn: 'to help',
    examples: [{ es: '¿Le puedo ayudar en algo?', zh: '有什么我可以帮您的吗？' }]
  },
  {
    word: 'necesitar',
    pronunciation: '[ne.se.siˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '需要，必须',
    meaningEn: 'to need',
    examples: [{ es: 'Necesito información turística de la ciudad.', zh: '我需要这座城市的旅游咨询。' }]
  },
  {
    word: 'recordar',
    pronunciation: '[re.koɾˈdaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '记得，想起，回忆起',
    meaningEn: 'to remember',
    examples: [{ es: 'No recuerdo su nombre exacto.', zh: '我不记得他的确切名字了。' }]
  },
  {
    word: 'olvidar',
    pronunciation: '[ol.biˈðaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '忘记，遗忘',
    meaningEn: 'to forget',
    examples: [{ es: 'Nunca olvidaré este viaje.', zh: '我永远不会忘记这次旅行。' }]
  },
  {
    word: 'esperar',
    pronunciation: '[es.peˈɾaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '等待；希望，期盼',
    meaningEn: 'to wait; to hope',
    examples: [{ es: 'Esperamos el autobús en la parada.', zh: '我们在公交站等公交车。' }]
  },
  {
    word: 'viajar',
    pronunciation: '[bjaˈxaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '旅行，游览',
    meaningEn: 'to travel',
    examples: [{ es: 'Me encanta viajar por toda España.', zh: '我喜欢游历整个西班牙。' }]
  },
  {
    word: 'caminar',
    pronunciation: '[ka.miˈnaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '步行，散步，走',
    meaningEn: 'to walk',
    examples: [{ es: 'Caminamos por las estrechas calles del barrio.', zh: '我们漫步在街区狭窄的小道上。' }]
  },
  {
    word: 'abrir',
    pronunciation: '[aˈβɾiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '打开，开门，开启',
    meaningEn: 'to open',
    examples: [{ es: '¿A qué hora abren el museo?', zh: '博物馆几点开门？' }]
  },
  {
    word: 'cerrar',
    pronunciation: '[seˈraɾ]',
    partOfSpeech: 'verb',
    meaningZh: '关闭，合上，关门',
    meaningEn: 'to close',
    examples: [{ es: 'Cierran a las ocho de la tarde.', zh: '他们傍晚八点关门。' }]
  },
  {
    word: 'pedir',
    pronunciation: '[peˈðiɾ]',
    partOfSpeech: 'verb',
    meaningZh: '请求，要求；点餐，点菜',
    meaningEn: 'to ask for, to order',
    examples: [{ es: '¿Estamos listos para pedir la comida?', zh: '我们可以开始点餐了吗？' }]
  },
  {
    word: 'preguntar',
    pronunciation: '[pɾe.ɣunˈtaɾ]',
    partOfSpeech: 'verb',
    meaningZh: '提问，询问',
    meaningEn: 'to ask a question',
    examples: [{ es: 'Quiero preguntar por el horario del tren.', zh: '我想询问一下火车时刻表。' }]
  },
  {
    word: 'responder',
    pronunciation: '[res.ponˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '回答，答复，响应',
    meaningEn: 'to answer, to respond',
    examples: [{ es: 'El profesor respondió a todas las dudas.', zh: '老师解答了所有疑问。' }]
  },
  {
    word: 'entender',
    pronunciation: '[en.tenˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '理解，明白，懂得',
    meaningEn: 'to understand',
    examples: [{ es: 'No entiendo muy bien, ¿puede repetir más despacio?', zh: '我不太明白，您能慢点重复一遍吗？' }]
  },
  {
    word: 'comprender',
    pronunciation: '[kom.pɾenˈdeɾ]',
    partOfSpeech: 'verb',
    meaningZh: '理解，体谅，包含',
    meaningEn: 'to comprehend, to understand',
    examples: [{ es: 'Comprendo perfectamente su situación.', zh: '我完全理解您的处境。' }]
  },

  // === COMMON ADJECTIVES ===
  {
    word: 'fácil',
    pronunciation: '[ˈfa.sil]',
    partOfSpeech: 'adjective',
    meaningZh: '容易的，简单的',
    meaningEn: 'easy, simple',
    examples: [{ es: 'La gramática de esta lección es fácil.', zh: '这一课的语法很简单。' }]
  },
  {
    word: 'difícil',
    pronunciation: '[diˈfi.sil]',
    partOfSpeech: 'adjective',
    meaningZh: '困难的，费力的',
    meaningEn: 'difficult, hard',
    examples: [{ es: 'Al principio la pronunciación parece difícil.', zh: '起初发音似乎有点难。' }]
  },
  {
    word: 'caro',
    pronunciation: '[ˈka.ɾo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '昂贵的，贵的',
    meaningEn: 'expensive',
    examples: [{ es: 'Este restaurante no es nada caro.', zh: '这家餐厅一点也不贵。' }]
  },
  {
    word: 'barato',
    pronunciation: '[baˈɾa.to]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '便宜的，经济实惠的',
    meaningEn: 'cheap, inexpensive',
    examples: [{ es: 'Un menú del día muy barato y completo.', zh: '一份非常实惠又丰盛的今日套餐。' }]
  },
  {
    word: 'rápido',
    pronunciation: '[ˈra.pi.ðo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '快速的；快地（副词）',
    meaningEn: 'fast, quick',
    examples: [{ es: 'El tren de alta velocidad es muy rápido.', zh: '高铁非常快。' }]
  },
  {
    word: 'lento',
    pronunciation: '[ˈlen.to]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '慢的，缓慢的',
    meaningEn: 'slow',
    examples: [{ es: 'Por favor, hable un poco más lento.', zh: '请说得稍微慢一点。' }]
  },
  {
    word: 'limpio',
    pronunciation: '[ˈlim.pjo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '干净的，整洁的',
    meaningEn: 'clean',
    examples: [{ es: 'La habitación del hotel está muy limpia.', zh: '酒店房间非常干净。' }]
  },
  {
    word: 'sucio',
    pronunciation: '[ˈsu.sjo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '脏的，污秽的',
    meaningEn: 'dirty',
    examples: [{ es: 'Puso la ropa sucia en la lavadora.', zh: '他把脏衣服放进了洗衣机。' }]
  },
  {
    word: 'nuevo',
    pronunciation: '[ˈnwe.βo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '新的，刚出现的',
    meaningEn: 'new',
    examples: [{ es: 'Tengo un nuevo libro de lectura en español.', zh: '我有一本新的西语阅读书。' }]
  },
  {
    word: 'viejo',
    pronunciation: '[ˈbje.xo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '旧的，年老的，古旧的',
    meaningEn: 'old',
    examples: [{ es: 'Paseamos por el casco viejo de la ciudad.', zh: '我们漫步在城市的老城区。' }]
  },
  {
    word: 'amable',
    pronunciation: '[aˈma.βle]',
    partOfSpeech: 'adjective',
    meaningZh: '亲切的，和蔼的，友善的',
    meaningEn: 'kind, friendly',
    examples: [{ es: 'La camarera fue muy amable con nosotros.', zh: '服务员对我们非常亲切友好。' }]
  },
  {
    word: 'tranquilo',
    pronunciation: '[tɾaŋˈki.lo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '安静的，平静的，安心的',
    meaningEn: 'quiet, calm',
    examples: [{ es: 'Un rincón tranquilo para leer y descansar.', zh: '一个适合阅读和休息的宁静角落。' }]
  },
  {
    word: 'cansado',
    pronunciation: '[kanˈsa.ðo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '疲劳的，疲倦的',
    meaningEn: 'tired',
    examples: [{ es: 'Estoy un poco cansado después de la caminata.', zh: '徒步后我感觉稍微有点累。' }]
  },
  {
    word: 'listo',
    pronunciation: '[ˈlis.to]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '准备好的（estar）；聪明的（ser）',
    meaningEn: 'ready (estar); smart (ser)',
    examples: [{ es: '¿Estás listo para salir?', zh: '你准备好出发了吗？' }]
  },
  {
    word: 'seguro',
    pronunciation: '[seˈɣu.ɾo]',
    partOfSpeech: 'adjective',
    gender: 'm',
    meaningZh: '安全的；确信的；保险（名词）',
    meaningEn: 'safe; sure, certain; insurance',
    examples: [{ es: 'Es un barrio muy seguro para pasear de noche.', zh: '这是一个夜间散步很安全的街区。' }]
  }
];
