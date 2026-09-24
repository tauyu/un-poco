import type { ConjugationInfo } from './types';

// Map of common irregular verb forms to their infinitive and grammatical details
export const IRREGULAR_VERBS_MAP: Record<string, ConjugationInfo[]> = {
  // SER (是 / to be)
  soy: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  eres: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  es: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  somos: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  sois: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  son: [{ infinitive: 'ser', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  era: [{ infinitive: 'ser', tense: '过去未完成时 (Pret. Imperfecto)', person: 'yo / él / ella (一/三人称单数)' }],
  eras: [{ infinitive: 'ser', tense: '过去未完成时 (Pret. Imperfecto)', person: 'tú (第二人称单数)' }],
  éramos: [{ infinitive: 'ser', tense: '过去未完成时 (Pret. Imperfecto)', person: 'nosotros/as (第一人称复数)' }],
  erais: [{ infinitive: 'ser', tense: '过去未完成时 (Pret. Imperfecto)', person: 'vosotros/as (第二人称复数)' }],
  eran: [{ infinitive: 'ser', tense: '过去未完成时 (Pret. Imperfecto)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  fui: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }
  ],
  fuiste: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }
  ],
  fue: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }
  ],
  fuimos: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }
  ],
  fuisteis: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'vosotros/as (第二人称复数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'vosotros/as (第二人称复数)' }
  ],
  fueron: [
    { infinitive: 'ser', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' },
    { infinitive: 'ir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }
  ],
  sea: [{ infinitive: 'ser', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  seas: [{ infinitive: 'ser', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  seamos: [{ infinitive: 'ser', tense: '虚拟式现在时 (Subjuntivo)', person: 'nosotros/as (第一人称复数)' }],
  sean: [{ infinitive: 'ser', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  siendo: [{ infinitive: 'ser', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  sido: [{ infinitive: 'ser', tense: '过去分词 (Participio)', person: '-' }],

  // ESTAR (在 / 处于 / to be)
  estoy: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  estás: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  está: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  estamos: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  estáis: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  están: [{ infinitive: 'estar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  estuve: [{ infinitive: 'estar', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  estuviste: [{ infinitive: 'estar', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  estuvo: [{ infinitive: 'estar', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  estuvimos: [{ infinitive: 'estar', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  estuvieron: [{ infinitive: 'estar', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  esté: [{ infinitive: 'estar', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  estés: [{ infinitive: 'estar', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  estén: [{ infinitive: 'estar', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  estando: [{ infinitive: 'estar', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  estado: [{ infinitive: 'estar', tense: '过去分词 (Participio)', person: '-' }],

  // IR (去 / to go)
  voy: [{ infinitive: 'ir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  vas: [{ infinitive: 'ir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  va: [{ infinitive: 'ir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  vamos: [{ infinitive: 'ir', tense: '陈述式现在时 / 祈使句', person: 'nosotros/as (第一人称复数)' }],
  vais: [{ infinitive: 'ir', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  van: [{ infinitive: 'ir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  iba: [{ infinitive: 'ir', tense: '过去未完成时 (Pret. Imperfecto)', person: 'yo / él / ella (一/三人称单数)' }],
  ibas: [{ infinitive: 'ir', tense: '过去未完成时 (Pret. Imperfecto)', person: 'tú (第二人称单数)' }],
  íbamos: [{ infinitive: 'ir', tense: '过去未完成时 (Pret. Imperfecto)', person: 'nosotros/as (第一人称复数)' }],
  ibais: [{ infinitive: 'ir', tense: '过去未完成时 (Pret. Imperfecto)', person: 'vosotros/as (第二人称复数)' }],
  iban: [{ infinitive: 'ir', tense: '过去未完成时 (Pret. Imperfecto)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  vaya: [{ infinitive: 'ir', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  vayas: [{ infinitive: 'ir', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  vayamos: [{ infinitive: 'ir', tense: '虚拟式现在时 (Subjuntivo)', person: 'nosotros/as (第一人称复数)' }],
  vayan: [{ infinitive: 'ir', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  ve: [{ infinitive: 'ir', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' }],
  yendo: [{ infinitive: 'ir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  ido: [{ infinitive: 'ir', tense: '过去分词 (Participio)', person: '-' }],

  // TENER (有 / to have)
  tengo: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  tienes: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  tiene: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  tenemos: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  tenéis: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  tienen: [{ infinitive: 'tener', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  tuve: [{ infinitive: 'tener', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  tuviste: [{ infinitive: 'tener', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  tuvo: [{ infinitive: 'tener', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  tuvimos: [{ infinitive: 'tener', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  tuvieron: [{ infinitive: 'tener', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  tendré: [{ infinitive: 'tener', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  tendrás: [{ infinitive: 'tener', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' }],
  tendrá: [{ infinitive: 'tener', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' }],
  tendremos: [{ infinitive: 'tener', tense: '将来未完成时 (Futuro)', person: 'nosotros/as (第一人称复数)' }],
  tendrán: [{ infinitive: 'tener', tense: '将来未完成时 (Futuro)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  tendría: [{ infinitive: 'tener', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  tenga: [{ infinitive: 'tener', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  tengas: [{ infinitive: 'tener', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  tengan: [{ infinitive: 'tener', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  ten: [{ infinitive: 'tener', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' }],
  teniendo: [{ infinitive: 'tener', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  tenido: [{ infinitive: 'tener', tense: '过去分词 (Participio)', person: '-' }],

  // HACER (做 / to do, make)
  hago: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  haces: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  hace: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  hacemos: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  hacéis: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  hacen: [{ infinitive: 'hacer', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  hice: [{ infinitive: 'hacer', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  hiciste: [{ infinitive: 'hacer', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  hizo: [{ infinitive: 'hacer', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  hicimos: [{ infinitive: 'hacer', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  hicieron: [{ infinitive: 'hacer', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  haré: [{ infinitive: 'hacer', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  harás: [{ infinitive: 'hacer', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' }],
  hará: [{ infinitive: 'hacer', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' }],
  haremos: [{ infinitive: 'hacer', tense: '将来未完成时 (Futuro)', person: 'nosotros/as (第一人称复数)' }],
  harán: [{ infinitive: 'hacer', tense: '将来未完成时 (Futuro)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  haría: [{ infinitive: 'hacer', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  haga: [{ infinitive: 'hacer', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  hagas: [{ infinitive: 'hacer', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  hagan: [{ infinitive: 'hacer', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  haz: [{ infinitive: 'hacer', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' }],
  haciendo: [{ infinitive: 'hacer', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  hecho: [{ infinitive: 'hacer', tense: '过去分词 (Participio)', person: '-' }],

  // DECIR (说 / to say, tell)
  digo: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  dices: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  dice: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  decimos: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  decís: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  dicen: [{ infinitive: 'decir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  dije: [{ infinitive: 'decir', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  dijiste: [{ infinitive: 'decir', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  dijo: [{ infinitive: 'decir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  dijimos: [{ infinitive: 'decir', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  dijeron: [{ infinitive: 'decir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  diré: [{ infinitive: 'decir', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  dirás: [{ infinitive: 'decir', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' }],
  dirá: [{ infinitive: 'decir', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' }],
  diga: [{ infinitive: 'decir', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  digas: [{ infinitive: 'decir', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  digan: [{ infinitive: 'decir', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  di: [
    { infinitive: 'decir', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' },
    { infinitive: 'dar', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }
  ],
  diciendo: [{ infinitive: 'decir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  dicho: [{ infinitive: 'decir', tense: '过去分词 (Participio)', person: '-' }],

  // PODER (能够 / can, be able)
  puedo: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  puedes: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  puede: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  podemos: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  podéis: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'vosotros/as (第二人称复数)' }],
  pueden: [{ infinitive: 'poder', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  pude: [{ infinitive: 'poder', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  pudiste: [{ infinitive: 'poder', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  pudo: [{ infinitive: 'poder', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  pudimos: [{ infinitive: 'poder', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  pudieron: [{ infinitive: 'poder', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  podré: [{ infinitive: 'poder', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  podría: [{ infinitive: 'poder', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  pueda: [{ infinitive: 'poder', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  puedas: [{ infinitive: 'poder', tense: '虚拟式现在时 (Subjuntivo)', person: 'tú (第二人称单数)' }],
  puedan: [{ infinitive: 'poder', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  pudiendo: [{ infinitive: 'poder', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  podido: [{ infinitive: 'poder', tense: '过去分词 (Participio)', person: '-' }],

  // SABER (知道 / to know)
  sé: [{ infinitive: 'saber', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  sabes: [{ infinitive: 'saber', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  sabe: [{ infinitive: 'saber', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  sabemos: [{ infinitive: 'saber', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  saben: [{ infinitive: 'saber', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  supe: [{ infinitive: 'saber', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  supiste: [{ infinitive: 'saber', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  supo: [{ infinitive: 'saber', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  supimos: [{ infinitive: 'saber', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  supieron: [{ infinitive: 'saber', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  sabré: [{ infinitive: 'saber', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  sabría: [{ infinitive: 'saber', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  sepa: [{ infinitive: 'saber', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  sepan: [{ infinitive: 'saber', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // QUERER (想要 / to want, love)
  quiero: [{ infinitive: 'querer', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  quieres: [{ infinitive: 'querer', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  quiere: [{ infinitive: 'querer', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  queremos: [{ infinitive: 'querer', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  quieren: [{ infinitive: 'querer', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  quise: [{ infinitive: 'querer', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  quisiste: [{ infinitive: 'querer', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  quiso: [{ infinitive: 'querer', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  quisimos: [{ infinitive: 'querer', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  quisieron: [{ infinitive: 'querer', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  querré: [{ infinitive: 'querer', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  querría: [{ infinitive: 'querer', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  quiera: [{ infinitive: 'querer', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  quieran: [{ infinitive: 'querer', tense: '虚拟式现在时 (Subjuntivo)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // PONER (放置 / to put)
  pongo: [{ infinitive: 'poner', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  pones: [{ infinitive: 'poner', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  pone: [{ infinitive: 'poner', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  ponemos: [{ infinitive: 'poner', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  ponen: [{ infinitive: 'poner', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  puse: [{ infinitive: 'poner', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  pusiste: [{ infinitive: 'poner', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  puso: [{ infinitive: 'poner', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  pusimos: [{ infinitive: 'poner', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  pusieron: [{ infinitive: 'poner', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  pondré: [{ infinitive: 'poner', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  pondría: [{ infinitive: 'poner', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  ponga: [{ infinitive: 'poner', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  pon: [{ infinitive: 'poner', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' }],
  puesto: [{ infinitive: 'poner', tense: '过去分词 (Participio)', person: '-' }],

  // VENIR (来 / to come)
  vengo: [{ infinitive: 'venir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  vienes: [{ infinitive: 'venir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  viene: [{ infinitive: 'venir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  venimos: [{ infinitive: 'venir', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  vienen: [{ infinitive: 'venir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  vine: [{ infinitive: 'venir', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],
  viniste: [{ infinitive: 'venir', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  vino: [{ infinitive: 'venir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  vinimos: [{ infinitive: 'venir', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  vinieron: [{ infinitive: 'venir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  vendré: [{ infinitive: 'venir', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' }],
  vendría: [{ infinitive: 'venir', tense: '条件式 (Condicional)', person: 'yo / él / ella (一/三人称单数)' }],
  venga: [{ infinitive: 'venir', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  ven: [{ infinitive: 'venir', tense: '命令式肯定 (Imperativo)', person: 'tú (第二人称单数)' }],
  viniendo: [{ infinitive: 'venir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],
  venido: [{ infinitive: 'venir', tense: '过去分词 (Participio)', person: '-' }],

  // VER (看 / to see)
  veo: [{ infinitive: 'ver', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  ves: [{ infinitive: 'ver', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  veía: [{ infinitive: 'ver', tense: '过去未完成时 (Pret. Imperfecto)', person: 'yo / él / ella (一/三人称单数)' }],
  veías: [{ infinitive: 'ver', tense: '过去未完成时 (Pret. Imperfecto)', person: 'tú (第二人称单数)' }],
  veíamos: [{ infinitive: 'ver', tense: '过去未完成时 (Pret. Imperfecto)', person: 'nosotros/as (第一人称复数)' }],
  veían: [{ infinitive: 'ver', tense: '过去未完成时 (Pret. Imperfecto)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  vio: [{ infinitive: 'ver', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  viste: [{ infinitive: 'ver', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  visto: [{ infinitive: 'ver', tense: '过去分词 (Participio)', person: '-' }],

  // DAR (给予 / to give)
  doy: [{ infinitive: 'dar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  das: [{ infinitive: 'dar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  da: [{ infinitive: 'dar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  damos: [{ infinitive: 'dar', tense: '陈述式现在时 (Presente)', person: 'nosotros/as (第一人称复数)' }],
  dan: [{ infinitive: 'dar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  diste: [{ infinitive: 'dar', tense: '简单过去时 (Pret. Indefinido)', person: 'tú (第二人称单数)' }],
  dio: [{ infinitive: 'dar', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  dimos: [{ infinitive: 'dar', tense: '简单过去时 (Pret. Indefinido)', person: 'nosotros/as (第一人称复数)' }],
  dieron: [{ infinitive: 'dar', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  dado: [{ infinitive: 'dar', tense: '过去分词 (Participio)', person: '-' }],

  // HABER (有，助动词 / there is, have)
  hay: [{ infinitive: 'haber', tense: '无人生人称陈述式现在时 (There is/are)', person: '-' }],
  había: [{ infinitive: 'haber', tense: '过去未完成时 (There was/were / Pret. Imperfecto)', person: 'yo / él / ella (一/三人称单数)' }],
  hubo: [{ infinitive: 'haber', tense: '简单过去时 (There was/were / Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  habrá: [{ infinitive: 'haber', tense: '将来未完成时 (There will be / Futuro)', person: 'él/ella/usted (第三人称单数)' }],
  habría: [{ infinitive: 'haber', tense: '条件式 (There would be / Condicional)', person: 'él/ella/usted (第三人称单数)' }],
  haya: [{ infinitive: 'haber', tense: '虚拟式现在时 (Subjuntivo)', person: 'yo / él / ella (一/三人称单数)' }],
  he: [{ infinitive: 'haber', tense: '助动词现在时 (yo he...)', person: 'yo (第一人称单数)' }],
  has: [{ infinitive: 'haber', tense: '助动词现在时 (tú has...)', person: 'tú (第二人称单数)' }],
  ha: [{ infinitive: 'haber', tense: '助动词现在时 (él ha...)', person: 'él/ella/usted (第三人称单数)' }],
  hemos: [{ infinitive: 'haber', tense: '助动词现在时 (nosotros hemos...)', person: 'nosotros/as (第一人称复数)' }],
  han: [{ infinitive: 'haber', tense: '助动词现在时 (ellos han...)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // DORMIR (睡觉 / to sleep)
  duermo: [{ infinitive: 'dormir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  duermes: [{ infinitive: 'dormir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  duerme: [{ infinitive: 'dormir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  duermen: [{ infinitive: 'dormir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  durmió: [{ infinitive: 'dormir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  durmieron: [{ infinitive: 'dormir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  durmiendo: [{ infinitive: 'dormir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],

  // PEDIR (请求，点餐 / to ask for, order)
  pido: [{ infinitive: 'pedir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  pides: [{ infinitive: 'pedir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  pide: [{ infinitive: 'pedir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  piden: [{ infinitive: 'pedir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  pidió: [{ infinitive: 'pedir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  pidieron: [{ infinitive: 'pedir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  pidiendo: [{ infinitive: 'pedir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],

  // PREFERIR (更喜欢 / to prefer)
  prefiero: [{ infinitive: 'preferir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  prefieres: [{ infinitive: 'preferir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  prefiere: [{ infinitive: 'preferir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  prefieren: [{ infinitive: 'preferir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  prefirió: [{ infinitive: 'preferir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  prefirieron: [{ infinitive: 'preferir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  prefiriendo: [{ infinitive: 'preferir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],

  // SERVIR (服务，提供 / to serve)
  sirvo: [{ infinitive: 'servir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  sirves: [{ infinitive: 'servir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  sirve: [{ infinitive: 'servir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  sirven: [{ infinitive: 'servir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  sirvió: [{ infinitive: 'servir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  sirvieron: [{ infinitive: 'servir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  sirviendo: [{ infinitive: 'servir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],

  // VOLVER (返回 / to return)
  vuelvo: [{ infinitive: 'volver', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  vuelves: [{ infinitive: 'volver', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  vuelve: [{ infinitive: 'volver', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  vuelven: [{ infinitive: 'volver', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  vuelto: [{ infinitive: 'volver', tense: '过去分词 (Participio)', person: '-' }],

  // ENCONTRAR (找到，处于 / to find)
  encuentro: [{ infinitive: 'encontrar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  encuentras: [{ infinitive: 'encontrar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  encuentra: [{ infinitive: 'encontrar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  encuentran: [{ infinitive: 'encontrar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // CONTAR (讲述，数数 / to count, tell)
  cuento: [{ infinitive: 'contar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  cuentas: [{ infinitive: 'contar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  cuenta: [{ infinitive: 'contar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  cuentan: [{ infinitive: 'contar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // SENTIR (感觉，遗憾 / to feel)
  siento: [{ infinitive: 'sentir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  sientes: [{ infinitive: 'sentir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  siente: [{ infinitive: 'sentir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  sienten: [{ infinitive: 'sentir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  sintió: [{ infinitive: 'sentir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  sintieron: [{ infinitive: 'sentir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  sintiendo: [{ infinitive: 'sentir', tense: '副动词 / 现在分词 (Gerundio)', person: '-' }],

  // PENSAR (思考，想 / to think)
  pienso: [{ infinitive: 'pensar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  piensas: [{ infinitive: 'pensar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  piensa: [{ infinitive: 'pensar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  piensan: [{ infinitive: 'pensar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // EMPEZAR (开始 / to begin)
  empiezo: [{ infinitive: 'empezar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  empiezas: [{ infinitive: 'empezar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  empieza: [{ infinitive: 'empezar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  empiezan: [{ infinitive: 'empezar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  empecé: [{ infinitive: 'empezar', tense: '简单过去时 (Pret. Indefinido)', person: 'yo (第一人称单数)' }],

  // CERRAR (关，关闭 / to close)
  cierro: [{ infinitive: 'cerrar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  cierras: [{ infinitive: 'cerrar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  cierra: [{ infinitive: 'cerrar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  cierran: [{ infinitive: 'cerrar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // ENTENDER (明白，理解 / to understand)
  entiendo: [{ infinitive: 'entender', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  entiendes: [{ infinitive: 'entender', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  entiende: [{ infinitive: 'entender', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  entienden: [{ infinitive: 'entender', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // JUGAR (玩，游戏 / to play)
  juego: [{ infinitive: 'jugar', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  juegas: [{ infinitive: 'jugar', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  juega: [{ infinitive: 'jugar', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  juegan: [{ infinitive: 'jugar', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],

  // CONOCER (认识 / to know)
  conozco: [{ infinitive: 'conocer', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],

  // MORIR (死亡 / to die)
  muero: [{ infinitive: 'morir', tense: '陈述式现在时 (Presente)', person: 'yo (第一人称单数)' }],
  mueres: [{ infinitive: 'morir', tense: '陈述式现在时 (Presente)', person: 'tú (第二人称单数)' }],
  muere: [{ infinitive: 'morir', tense: '陈述式现在时 (Presente)', person: 'él/ella/usted (第三人称单数)' }],
  mueren: [{ infinitive: 'morir', tense: '陈述式现在时 (Presente)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  murió: [{ infinitive: 'morir', tense: '简单过去时 (Pret. Indefinido)', person: 'él/ella/usted (第三人称单数)' }],
  murieron: [{ infinitive: 'morir', tense: '简单过去时 (Pret. Indefinido)', person: 'ellos/ellas/ustedes (第三人称复数)' }],
  muerto: [{ infinitive: 'morir', tense: '过去分词 (Participio)', person: '-' }]
};

// Common enclitic pronouns attached to infinitives, gerunds, or imperatives
const ENCLITIC_PRONOUNS = [
  'melo', 'mela', 'melos', 'melas',
  'telo', 'tela', 'telos', 'telas',
  'selo', 'sela', 'selos', 'selas',
  'noslo', 'nosla', 'noslos', 'noslas',
  'oslo', 'osla', 'oslos', 'oslas',
  'me', 'te', 'se', 'nos', 'os', 'lo', 'la', 'le', 'los', 'las', 'les'
];

interface SuffixRule {
  suffix: string;
  infinitiveEnding: 'ar' | 'er' | 'ir';
  tense: string;
  person: string;
}

// Suffix table for regular -ar, -er, -ir verbs
const REGULAR_SUFFIX_RULES: SuffixRule[] = [
  // -AR VERBS
  // Presente
  { suffix: 'o', infinitiveEnding: 'ar', tense: '陈述式现在时', person: 'yo (第一人称单数)' },
  { suffix: 'as', infinitiveEnding: 'ar', tense: '陈述式现在时', person: 'tú (第二人称单数)' },
  { suffix: 'a', infinitiveEnding: 'ar', tense: '陈述式现在时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'amos', infinitiveEnding: 'ar', tense: '陈述式现在时 / 简单过去时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'áis', infinitiveEnding: 'ar', tense: '陈述式现在时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'an', infinitiveEnding: 'ar', tense: '陈述式现在时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Indefinido
  { suffix: 'é', infinitiveEnding: 'ar', tense: '简单过去时', person: 'yo (第一人称单数)' },
  { suffix: 'aste', infinitiveEnding: 'ar', tense: '简单过去时', person: 'tú (第二人称单数)' },
  { suffix: 'ó', infinitiveEnding: 'ar', tense: '简单过去时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'asteis', infinitiveEnding: 'ar', tense: '简单过去时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'aron', infinitiveEnding: 'ar', tense: '简单过去时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Imperfecto
  { suffix: 'aba', infinitiveEnding: 'ar', tense: '过去未完成时', person: 'yo / él / ella (一/三人称单数)' },
  { suffix: 'abas', infinitiveEnding: 'ar', tense: '过去未完成时', person: 'tú (第二人称单数)' },
  { suffix: 'ábamos', infinitiveEnding: 'ar', tense: '过去未完成时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'abais', infinitiveEnding: 'ar', tense: '过去未完成时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'aban', infinitiveEnding: 'ar', tense: '过去未完成时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Participio & Gerundio
  { suffix: 'ado', infinitiveEnding: 'ar', tense: '过去分词', person: '-' },
  { suffix: 'ando', infinitiveEnding: 'ar', tense: '现在分词 / 副动词', person: '-' },

  // -ER & -IR VERBS
  // Presente -ER
  { suffix: 'o', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'yo (第一人称单数)' },
  { suffix: 'es', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'tú (第二人称单数)' },
  { suffix: 'e', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'emos', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'éis', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'en', infinitiveEnding: 'er', tense: '陈述式现在时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Presente -IR
  { suffix: 'o', infinitiveEnding: 'ir', tense: '陈述式现在时', person: 'yo (第一人称单数)' },
  { suffix: 'es', infinitiveEnding: 'ir', tense: '陈述式现在时', person: 'tú (第二人称单数)' },
  { suffix: 'e', infinitiveEnding: 'ir', tense: '陈述式现在时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'imos', infinitiveEnding: 'ir', tense: '陈述式现在时 / 简单过去时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'ís', infinitiveEnding: 'ir', tense: '陈述式现在时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'en', infinitiveEnding: 'ir', tense: '陈述式现在时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Indefinido -ER/-IR
  { suffix: 'í', infinitiveEnding: 'er', tense: '简单过去时', person: 'yo (第一人称单数)' },
  { suffix: 'í', infinitiveEnding: 'ir', tense: '简单过去时', person: 'yo (第一人称单数)' },
  { suffix: 'iste', infinitiveEnding: 'er', tense: '简单过去时', person: 'tú (第二人称单数)' },
  { suffix: 'iste', infinitiveEnding: 'ir', tense: '简单过去时', person: 'tú (第二人称单数)' },
  { suffix: 'ió', infinitiveEnding: 'er', tense: '简单过去时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'ió', infinitiveEnding: 'ir', tense: '简单过去时', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'isteis', infinitiveEnding: 'er', tense: '简单过去时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'isteis', infinitiveEnding: 'ir', tense: '简单过去时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'ieron', infinitiveEnding: 'er', tense: '简单过去时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  { suffix: 'ieron', infinitiveEnding: 'ir', tense: '简单过去时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Imperfecto -ER/-IR
  { suffix: 'ía', infinitiveEnding: 'er', tense: '过去未完成时', person: 'yo / él / ella (一/三人称单数)' },
  { suffix: 'ía', infinitiveEnding: 'ir', tense: '过去未完成时', person: 'yo / él / ella (一/三人称单数)' },
  { suffix: 'ías', infinitiveEnding: 'er', tense: '过去未完成时', person: 'tú (第二人称单数)' },
  { suffix: 'ías', infinitiveEnding: 'ir', tense: '过去未完成时', person: 'tú (第二人称单数)' },
  { suffix: 'íamos', infinitiveEnding: 'er', tense: '过去未完成时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'íamos', infinitiveEnding: 'ir', tense: '过去未完成时', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'íais', infinitiveEnding: 'er', tense: '过去未完成时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'íais', infinitiveEnding: 'ir', tense: '过去未完成时', person: 'vosotros/as (第二人称复数)' },
  { suffix: 'ían', infinitiveEnding: 'er', tense: '过去未完成时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  { suffix: 'ían', infinitiveEnding: 'ir', tense: '过去未完成时', person: 'ellos/ellas/ustedes (第三人称复数)' },
  // Participio & Gerundio -ER/-IR
  { suffix: 'ido', infinitiveEnding: 'er', tense: '过去分词', person: '-' },
  { suffix: 'ido', infinitiveEnding: 'ir', tense: '过去分词', person: '-' },
  { suffix: 'iendo', infinitiveEnding: 'er', tense: '现在分词 / 副动词', person: '-' },
  { suffix: 'iendo', infinitiveEnding: 'ir', tense: '现在分词 / 副动词', person: '-' },

  // FUTURO (all infinitives + é, ás, á, emos, éis, án)
  { suffix: 'aré', infinitiveEnding: 'ar', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' },
  { suffix: 'arás', infinitiveEnding: 'ar', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' },
  { suffix: 'ará', infinitiveEnding: 'ar', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'aremos', infinitiveEnding: 'ar', tense: '将来未完成时 (Futuro)', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'arán', infinitiveEnding: 'ar', tense: '将来未完成时 (Futuro)', person: 'ellos/ellas/ustedes (第三人称复数)' },
  { suffix: 'eré', infinitiveEnding: 'er', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' },
  { suffix: 'erás', infinitiveEnding: 'er', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' },
  { suffix: 'erá', infinitiveEnding: 'er', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'eremos', infinitiveEnding: 'er', tense: '将来未完成时 (Futuro)', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'erán', infinitiveEnding: 'er', tense: '将来未完成时 (Futuro)', person: 'ellos/ellas/ustedes (第三人称复数)' },
  { suffix: 'iré', infinitiveEnding: 'ir', tense: '将来未完成时 (Futuro)', person: 'yo (第一人称单数)' },
  { suffix: 'irás', infinitiveEnding: 'ir', tense: '将来未完成时 (Futuro)', person: 'tú (第二人称单数)' },
  { suffix: 'irá', infinitiveEnding: 'ir', tense: '将来未完成时 (Futuro)', person: 'él/ella/usted (第三人称单数)' },
  { suffix: 'iremos', infinitiveEnding: 'ir', tense: '将来未完成时 (Futuro)', person: 'nosotros/as (第一人称复数)' },
  { suffix: 'irán', infinitiveEnding: 'ir', tense: '将来未完成时 (Futuro)', person: 'ellos/ellas/ustedes (第三人称复数)' }
];

// Sort suffixes by length descending so longer suffixes match first (e.g. "ábamos" before "as")
REGULAR_SUFFIX_RULES.sort((a, b) => b.suffix.length - a.suffix.length);

/**
 * Remove accent marks for base matching
 */
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Attempt to peel off enclitic pronouns from a verb form
 * e.g. "diciéndolo" -> "diciendo" + "lo"
 * e.g. "hacerlo" -> "hacer" + "lo"
 */
export function peelEncliticPronouns(word: string): { stem: string; pronouns: string } | null {
  const lower = word.toLowerCase();
  for (const pron of ENCLITIC_PRONOUNS) {
    if (lower.endsWith(pron) && lower.length > pron.length + 2) {
      const stem = lower.slice(0, -pron.length);
      // Restore common accent reduction: e.g. hablándole -> hablando
      let normalizedStem = stem;
      if (normalizedStem.endsWith('ándo')) normalizedStem = normalizedStem.replace(/ándo$/, 'ando');
      if (normalizedStem.endsWith('iéndo')) normalizedStem = normalizedStem.replace(/iéndo$/, 'iendo');
      if (normalizedStem.endsWith('ár')) normalizedStem = normalizedStem.replace(/ár$/, 'ar');
      if (normalizedStem.endsWith('ér')) normalizedStem = normalizedStem.replace(/ér$/, 'er');
      if (normalizedStem.endsWith('ír')) normalizedStem = normalizedStem.replace(/ír$/, 'ir');
      return { stem: normalizedStem, pronouns: pron };
    }
  }
  return null;
}

/**
 * Analyze a Spanish word and find potential infinitive forms + conjugation info
 */
export function analyzeConjugation(rawWord: string): Array<{ infinitive: string; info: ConjugationInfo }> {
  const word = rawWord.trim().toLowerCase();
  const results: Array<{ infinitive: string; info: ConjugationInfo }> = [];

  // 1. Direct match in irregular verb dictionary
  if (IRREGULAR_VERBS_MAP[word]) {
    for (const item of IRREGULAR_VERBS_MAP[word]) {
      results.push({ infinitive: item.infinitive, info: { ...item, irregular: true } });
    }
  }

  // 2. Check with enclitics peeled
  const enclitic = peelEncliticPronouns(word);
  if (enclitic) {
    if (IRREGULAR_VERBS_MAP[enclitic.stem]) {
      for (const item of IRREGULAR_VERBS_MAP[enclitic.stem]) {
        results.push({
          infinitive: item.infinitive,
          info: { ...item, irregular: true, notes: `附加代词: +${enclitic.pronouns}` }
        });
      }
    }
  }

  // 3. Regular conjugation suffix matching on the word directly
  for (const rule of REGULAR_SUFFIX_RULES) {
    if (word.endsWith(rule.suffix)) {
      const stem = word.slice(0, -rule.suffix.length);
      if (stem.length >= 2) {
        const potentialInfinitive = stem + rule.infinitiveEnding;
        results.push({
          infinitive: potentialInfinitive,
          info: {
            infinitive: potentialInfinitive,
            tense: rule.tense,
            person: rule.person,
            irregular: false
          }
        });
      }
    }
  }

  // 4. Accent-insensitive suffix matching (e.g. hablabamos -> hablar, vivia -> vivir)
  const normWord = removeAccents(word);
  for (const rule of REGULAR_SUFFIX_RULES) {
    const normSuffix = removeAccents(rule.suffix);
    if (normWord.endsWith(normSuffix)) {
      const stem = normWord.slice(0, -normSuffix.length);
      if (stem.length >= 2) {
        const potentialInfinitive = stem + rule.infinitiveEnding;
        if (!results.some((r) => r.infinitive === potentialInfinitive && r.info.tense === rule.tense)) {
          results.push({
            infinitive: potentialInfinitive,
            info: {
              infinitive: potentialInfinitive,
              tense: rule.tense,
              person: rule.person,
              irregular: false
            }
          });
        }
      }
    }
  }

  // 5. Enclitic suffix matching (e.g. "hacerlo" -> "hacer", "diciéndolo" -> "decir")
  if (enclitic) {
    for (const rule of REGULAR_SUFFIX_RULES) {
      if (enclitic.stem.endsWith(rule.suffix)) {
        const stem = enclitic.stem.slice(0, -rule.suffix.length);
        if (stem.length >= 2) {
          const potentialInfinitive = stem + rule.infinitiveEnding;
          results.push({
            infinitive: potentialInfinitive,
            info: {
              infinitive: potentialInfinitive,
              tense: rule.tense,
              person: rule.person,
              irregular: false,
              notes: `附加代词: +${enclitic.pronouns}`
            }
          });
        }
      }
    }
  }

  return results;
}
