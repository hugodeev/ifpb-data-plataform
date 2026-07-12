// Conversor INEP
// Categorias administrativas
const CATEGORIA_ADMIN = {
    '1': 'Pública Federal', '2': 'Pública Estadual', '3': 'Pública Municipal',
    '4': 'Privada com fins lucrativos', '5': 'Privada sem fins lucrativos',
    '7': 'Especial', '8': 'Comunitária/Confessional'
};

// Organizações acadêmicas
const ORG_ACADEMICA = {
    '10019': 'Centro Federal de Educação Tecnológica', '10020': 'Centro Universitário',
    '10022': 'Faculdade', '10026': 'Instituto Federal', '10028': 'Universidade'
};

// Áreas de conhecimento
const AREAS_COMPLETAS = {
    '1': 'Administração', '2': 'Direito', '13': 'Ciências Econômicas', '18': 'Psicologia',
    '22': 'Ciências Contábeis', '26': 'Design', '29': 'Turismo', '38': 'Serviço Social',
    '67': 'Secretariado Executivo', '81': 'Relações Internacionais',
    '83': 'Tecnologia em Design de Moda', '84': 'Tecnologia em Marketing',
    '85': 'Tecnologia em Processos Gerenciais', '86': 'Tecnologia em Gestão de RH',
    '87': 'Tecnologia em Gestão Financeira', '88': 'Tecnologia em Gastronomia',
    '93': 'Tecnologia em Gestão Comercial', '94': 'Tecnologia em Logística',
    '100': 'Administração Pública', '101': 'Teologia',
    '102': 'Tecnologia em Comércio Exterior', '103': 'Tecnologia em Design de Interiores',
    '104': 'Tecnologia em Design Gráfico', '105': 'Tecnologia em Gestão da Qualidade',
    '106': 'Tecnologia em Gestão Pública', '803': 'Jornalismo', '804': 'Publicidade e Propaganda',
    // Engenharias
    '5710': 'Engenharia Civil', '5711': 'Engenharia de Recursos Hídricos',
    '5712': 'Engenharia Sanitária', '5806': 'Engenharia Elétrica',
    '5807': 'Engenharia Industrial Elétrica', '5808': 'Engenharia Eletrotécnica',
    '5809': 'Engenharia de Computação', '5811': 'Engenharia de Redes de Comunicação',
    '5812': 'Engenharia Eletrônica', '5813': 'Engenharia Mecatrônica',
    '5814': 'Engenharia de Controle e Automação', '5815': 'Engenharia de Telecomunicações',
    '5901': 'Engenharia Industrial Mecânica', '5902': 'Engenharia Mecânica',
    '5903': 'Engenharia Aeroespacial', '5904': 'Engenharia Aeronáutica',
    '5905': 'Engenharia Automotiva', '5906': 'Engenharia Naval',
    '6002': 'Engenharia de Alimentos', '6005': 'Engenharia Bioquímica',
    '6006': 'Engenharia de Biotecnologia', '6007': 'Engenharia Industrial Química',
    '6008': 'Engenharia Química', '6009': 'Engenharia de Alimentos',
    '6011': 'Engenharia Têxtil', '6106': 'Engenharia de Materiais',
    '6107': 'Engenharia Física', '6108': 'Engenharia Metalúrgica',
    '6109': 'Engenharia de Materiais (Madeira)', '6110': 'Engenharia de Materiais (Plástico)',
    '6208': 'Engenharia de Produção', '6209': 'Engenharia de Produção Mecânica',
    '6210': 'Engenharia de Produção Elétrica', '6211': 'Engenharia de Produção Química',
    '6213': 'Engenharia de Produção de Materiais', '6214': 'Engenharia de Produção Civil',
    '6306': 'Engenharia', '6307': 'Engenharia Ambiental', '6308': 'Engenharia Industrial',
    '6309': 'Engenharia de Minas', '6310': 'Engenharia de Petróleo',
    '6404': 'Engenharia Agrícola', '6405': 'Engenharia Florestal', '6406': 'Engenharia de Pesca',
    // Tecnologias
    '69': 'Tecnologia em Radiologia', '70': 'Tecnologia em Agroindústria',
    '71': 'Tecnologia em Alimentos', '72': 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    '73': 'Tecnologia em Automação Industrial', '74': 'Tecnologia em Construção de Edifícios',
    '75': 'Tecnologia em Fabricação Mecânica', '76': 'Tecnologia em Gestão da Produção Industrial',
    '77': 'Tecnologia em Manutenção Industrial', '78': 'Tecnologia em Processos Químicos',
    '79': 'Tecnologia em Redes de Computadores', '80': 'Tecnologia em Saneamento Ambiental',
    '90': 'Tecnologia em Agronegócios', '91': 'Tecnologia em Gestão Hospitalar',
    '92': 'Tecnologia em Gestão Ambiental', '95': 'Tecnologia em Estética e Cosmética',
    '6410': 'Tecnologia em Segurança no Trabalho', '6409': 'Tecnologia em Gestão da TI',
    // Ciências exatas
    '701': 'Matemática (Bacharelado)', '702': 'Matemática (Licenciatura)',
    '1401': 'Física (Bacharelado)', '1402': 'Física (Licenciatura)',
    '1501': 'Química (Bacharelado)', '1502': 'Química (Licenciatura)',
    '1601': 'Ciências Biológicas (Bacharelado)', '1602': 'Ciências Biológicas (Licenciatura)',
    // Licenciaturas
    '903': 'Letras-Português (Bacharelado)', '904': 'Letras-Português (Licenciatura)',
    '905': 'Letras-Português e Inglês (Licenciatura)', '906': 'Letras-Português e Espanhol (Licenciatura)',
    '6407': 'Letras-Inglês (Licenciatura)', '2001': 'Pedagogia (Licenciatura)',
    '2401': 'História (Bacharelado)', '2402': 'História (Licenciatura)',
    '2501': 'Artes Visuais (Licenciatura)', '3001': 'Geografia (Bacharelado)',
    '3002': 'Geografia (Licenciatura)', '3201': 'Filosofia (Bacharelado)',
    '3202': 'Filosofia (Licenciatura)', '3501': 'Educação Física (Bacharelado)',
    '3502': 'Educação Física (Licenciatura)', '4301': 'Música (Licenciatura)',
    '5401': 'Ciências Sociais (Bacharelado)', '5402': 'Ciências Sociais (Licenciatura)',
    // Saúde
    '5': 'Medicina Veterinária', '6': 'Odontologia', '12': 'Medicina',
    '17': 'Agronomia', '19': 'Farmácia', '21': 'Arquitetura e Urbanismo',
    '23': 'Enfermagem', '27': 'Fonoaudiologia', '28': 'Nutrição',
    '36': 'Fisioterapia', '51': 'Zootecnia', '52': 'Terapia Ocupacional', '55': 'Biomedicina'
};

// Mapeamento cursos
const CURSOS_MAP = {
    '49960': 'Design de Interiores', '58391': 'Redes de Computadores',
    '81312': 'Química', '95089': 'Automação Industrial', '95093': 'Automação Industrial',
    '95104': 'Análise e Desenvolvimento de Sistemas', '1166614': 'Análise e Desenvolvimento de Sistemas',
    '114944': 'Construção de Edifícios', '1167926': 'Gestão Comercial',
    '123002': 'Gestão Ambiental', '123105': 'Design Gráfico', '123116': 'Segurança no Trabalho',
    '123120': 'Gestão Ambiental', '103481': 'Engenharia Elétrica', '1262856': 'Engenharia Civil',
    '1342196': 'Engenharia de Computação', '1457168': 'Engenharia Civil', '1457169': 'Engenharia Civil',
    '1457171': 'Engenharia Mecânica', '1128030': 'Matemática', '1128096': 'Matemática',
    '1176228': 'Letras - Língua Portuguesa', '1188374': 'Física', '1188396': 'Educação Física',
    '123233': 'Química', '1307356': 'Computação e Informática', '1341255': 'Ciências Biológicas',
    '100260': 'Administração', '123237': 'Medicina Veterinária', '1261262': 'Administração Pública'
};

// Mapeamento campus
const CAMPUS_MAP = {
    '2507507': 'João Pessoa',
    '2503704': 'Cajazeiras',
    '2512309': 'Princesa Isabel',
    '2506301': 'Guarabira',
    '2503209': 'Cabedelo',
    '2504009': 'Campina Grande',
    '2509701': 'Monteiro',
    '2516201': 'Sousa',
    '2510808': 'Patos'
};

// Demográficos
const MODALIDADE = { '0': 'EaD', '1': 'Presencial' };
const REGIAO = { '1': 'Norte', '2': 'Nordeste', '3': 'Sudeste', '4': 'Sul', '5': 'Centro-Oeste' };
const TURNO_GRADUACAO = { '1': 'Matutino', '2': 'Vespertino', '3': 'Integral', '4': 'Noturno' };
const TIPO_INSCRICAO = { '0': 'Concluinte', '1': 'Tradicional', '2': 'Administrativa' };
const SEXO = { 'F': 'Feminino', 'M': 'Masculino', '9': 'Indefinido' };

// Estado civil
const ESTADO_CIVIL = {
    'A': 'Solteiro(a)',
    'B': 'Casado(a)',
    'C': 'Separado(a)/desquitado(a)/divorciado(a)',
    'D': 'Viúvo(a)',
    'E': 'Outro'
};

// Cor/Raça
const COR_RACA = {
    'A': 'Branco(a)',
    'B': 'Negro(a)',
    'C': 'Pardo(a)/mulato(a)',
    'D': 'Amarelo(a) (de origem oriental)',
    'E': 'Indígena ou de origem indígena',
    'F': 'Não quero declarar'
};

// Nacionalidade
const NACIONALIDADE = { 'A': 'Brasileira', 'B': 'Naturalizada', 'C': 'Estrangeira' };

// Escolaridade
const ESCOLARIDADE = {
    'A': 'Nenhuma escolaridade',
    'B': 'Ensino fundamental: 1º ao 5º ano (antiga 1ª à 4ª série)',
    'C': 'Ensino fundamental: 6º ao 9º ano (antiga 5ª à 8ª série)',
    'D': 'Ensino médio',
    'E': 'Ensino superior',
    'F': 'Pós-graduação'
};

// Moradia
const MORADIA = {
    'A': 'Em casa ou apartamento, sozinho',
    'B': 'Em casa ou apartamento, com pais e/ou parentes',
    'C': 'Em casa ou apartamento, com cônjuge e/ou filhos',
    'D': 'Em casa ou apartamento, com outras pessoas (incluindo república)',
    'E': 'Em alojamento universitário da própria instituição',
    'F': 'Em outros tipos de habitação (hotel, hospedaria, pensionato, etc.)'
};

// Pessoas família
const PESSOAS_FAMILIA = {
    'A': 'Nenhuma', 'B': 'Uma', 'C': 'Duas', 'D': 'Três',
    'E': 'Quatro', 'F': 'Cinco', 'G': 'Seis', 'H': 'Mais de seis'
};

// Estágio
const ESTAGIO = {
    'A': 'Não fiz nenhum tipo de estágio',
    'B': 'Fiz ou faço somente estágio obrigatório',
    'C': 'Fiz ou faço somente estágio não obrigatório',
    'D': 'Fiz ou faço estágio obrigatório e não obrigatório'
};

// Renda 2010
const RENDA_2010 = {
    'A': 'Nenhuma',
    'B': 'Até 1,5 salário mínimo (até R$ 765,00)',
    'C': 'Acima de 1,5 até 3 salários mínimos (R$ 765,01 a R$ 1.530,00)',
    'D': 'Acima de 3 até 4,5 salários mínimos (R$ 1.530,01 a R$ 2.295,00)',
    'E': 'Acima de 4,5 até 6 salários mínimos (R$ 2.295,01 a R$ 3.060,00)',
    'F': 'Acima de 6 até 10 salários mínimos (R$ 3.060,01 a R$ 5.100,00)',
    'G': 'Acima de 10 até 30 salários mínimos (R$ 5.100,01 a R$ 15.300,00)',
    'H': 'Acima de 30 salários mínimos (mais de R$ 15.300,01)'
};

// Renda 2011-2012
const RENDA_2011_2012 = {
    'A': 'Nenhuma',
    'B': 'Até 1,5 salário mínimo',
    'C': 'De 1,5 a 3 salários mínimos',
    'D': 'De 3 a 4,5 salários mínimos',
    'E': 'De 4,5 a 6 salários mínimos',
    'F': 'De 6 a 10 salários mínimos',
    'G': 'De 10 a 30 salários mínimos',
    'H': 'Acima de 30 salários mínimos'
};

// Renda 2013-2019
const RENDA_2013_2019 = {
    'A': 'Até 1,5 salário mínimo',
    'B': 'De 1,5 a 3 salários mínimos',
    'C': 'De 3 a 4,5 salários mínimos',
    'D': 'De 4,5 a 6 salários mínimos',
    'E': 'De 6 a 10 salários mínimos',
    'F': 'De 10 a 30 salários mínimos',
    'G': 'Acima de 30 salários mínimos'
};

// Renda 2021
const RENDA_2021 = {
    'A': 'Até 1,5 SM (R$ 1.650,00)',
    'B': 'De 1,5 a 3 SM (R$ 1.650,01 a R$ 3.300,00)',
    'C': 'De 3 a 4,5 SM (R$ 3.300,01 a R$ 4.950,00)',
    'D': 'De 4,5 a 6 SM (R$ 4.950,01 a R$ 6.600,00)',
    'E': 'De 6 a 10 SM (R$ 6.600,01 a R$ 11.000,00)',
    'F': 'De 10 a 30 SM (R$ 11.000,01 a R$ 33.000,00)',
    'G': 'Acima de 30 SM (mais de R$ 33.000,00)'
};

// Renda 2022
const RENDA_2022 = {
    'A': 'Até 1,5 SM (R$ 1.818,00)',
    'B': 'De 1,5 a 3 SM (R$ 1.818,01 a R$ 3.636,00)',
    'C': 'De 3 a 4,5 SM (R$ 3.636,01 a R$ 5.454,00)',
    'D': 'De 4,5 a 6 SM (R$ 5.454,01 a R$ 7.272,00)',
    'E': 'De 6 a 10 SM (R$ 7.272,01 a R$ 12.120,00)',
    'F': 'De 10 a 30 SM (R$ 12.120,01 a R$ 36.360,00)',
    'G': 'Acima de 30 SM (mais de R$ 36.360,00)'
};

// Renda 2023
const RENDA_2023 = {
    'A': 'Até 1,5 SM (R$ 1.980,00)',
    'B': 'De 1,5 a 3 SM (R$ 1.980,01 a R$ 3.960,00)',
    'C': 'De 3 a 4,5 SM (R$ 3.960,01 a R$ 5.940,00)',
    'D': 'De 4,5 a 6 SM (R$ 5.940,01 a R$ 7.920,00)',
    'E': 'De 6 a 10 SM (R$ 7.920,01 a R$ 13.200,00)',
    'F': 'De 10 a 30 SM (R$ 13.200,01 a R$ 39.600,00)',
    'G': 'Acima de 30 SM (mais de R$ 39.600,00)'
};

// Situação financeira
const SITUACAO_FINANCEIRA = {
    'A': 'Não tenho renda e meus gastos são financiados pela minha família ou por outras pessoas',
    'B': 'Tenho renda, mas recebo ajuda da família ou de outras pessoas para financiar meus gastos',
    'C': 'Tenho renda e me sustento totalmente',
    'D': 'Tenho renda, me sustento e contribuo com o sustento da família',
    'E': 'Tenho renda, me sustento e sou o principal responsável pelo sustento da família'
};

// Situação trabalho
const SITUACAO_TRABALHO = {
    'A': 'Não estou trabalhando',
    'B': 'Trabalho eventualmente',
    'C': 'Trabalho até 20 horas semanais',
    'D': 'Trabalho mais de 20 horas semanais e menos de 40 horas semanais',
    'E': 'Trabalho em tempo integral – 40 horas semanais ou mais'
};

// Bolsa mensalidades
const BOLSA_MENSALIDADE = {
    'A': 'ProUni integral',
    'B': 'ProUni parcial',
    'C': 'FIES',
    'D': 'ProUni Parcial e FIES',
    'E': 'Outro tipo de bolsa oferecido por governo estadual, distrital ou municipal',
    'F': 'Bolsa integral ou parcial oferecida pela própria instituição de ensino',
    'G': 'Bolsa integral ou parcial oferecida por outra entidade (empresa, ONG, etc)',
    'H': 'Financiamento oferecido pela própria instituição de ensino',
    'I': 'Financiamento oferecido por outra entidade (banco privado, etc.)',
    'J': 'Mais de um dos tipos de bolsa ou financiamento citados'
};

// Bolsa outras despesas
const BOLSA_OUTRAS_DESPESAS = {
    'A': 'Sim, bolsa permanência do ProUni',
    'B': 'Sim, bolsa da própria instituição de ensino',
    'C': 'Sim, outro tipo de bolsa oferecido por órgão governamental',
    'D': 'Sim, outro tipo de bolsa oferecido por órgão não-governamental',
    'E': 'Não'
};

// Ação afirmativa
const ACAO_AFIRMATIVA = {
    'A': 'Não',
    'B': 'Sim, por critério étnico-racial (negros, pardos e indígenas)',
    'C': 'Sim, por critério de renda',
    'D': 'Sim, por ter estudado em escola pública ou particular com bolsa de estudos',
    'E': 'Sim, por sistema que combina dois ou mais critérios anteriores',
    'F': 'Sim, por sistema diferente dos anteriores'
};

// UF ensino médio
const UF = {
    '11': 'Rondônia', '12': 'Acre', '13': 'Amazonas', '14': 'Roraima',
    '15': 'Pará', '16': 'Amapá', '17': 'Tocantins', '21': 'Maranhão',
    '22': 'Piauí', '23': 'Ceará', '24': 'Rio Grande do Norte', '25': 'Paraíba',
    '26': 'Pernambuco', '27': 'Alagoas', '28': 'Sergipe', '29': 'Bahia',
    '31': 'Minas Gerais', '32': 'Espírito Santo', '33': 'Rio de Janeiro',
    '35': 'São Paulo', '41': 'Paraná', '42': 'Santa Catarina',
    '43': 'Rio Grande do Sul', '50': 'Mato Grosso do Sul', '51': 'Mato Grosso',
    '52': 'Goiás', '53': 'Distrito Federal', '99': 'Não se aplica'
};

// Mudança cidade
const MUDANCA_CIDADE = {
    'A': 'Não',
    'B': 'Sim, mudei de uma cidade para outra, dentro do mesmo estado',
    'C': 'Sim, mudei de estado',
    'D': 'Sim, mudei de país'
};

// Tipo escola EM
const TIPO_ESCOLA_EM = {
    'A': 'Todo em escola pública',
    'B': 'Todo em escola privada (particular)',
    'C': 'A maior parte em escola pública',
    'D': 'A maior parte em escola privada (particular)',
    'E': 'Metade em escola pública e metade em escola privada (particular)',
    'F': 'Todo no exterior'
};

// Modalidade EM
const MODALIDADE_EM = {
    'A': 'Ensino médio tradicional',
    'B': 'Profissionalizante técnico (eletrônica, contabilidade, agrícola, etc.)',
    'C': 'Profissionalizante magistério (Curso Normal)',
    'D': 'Educação de Jovens e Adultos (EJA) / Supletivo',
    'E': 'Outro'
};

// Livros lidos
const LIVROS_LIDOS = {
    'A': 'Nenhum', 'B': 'Um ou dois', 'C': 'Entre três e cinco',
    'D': 'Entre seis e oito', 'E': 'Mais de oito'
};

// Horas estudo
const HORAS_ESTUDO = {
    'A': 'Nenhuma, apenas assisto às aulas', 'B': 'Uma a três',
    'C': 'Quatro a sete', 'D': 'Oito a doze', 'E': 'Mais de doze'
};

// Turno concentrado
const TURNO_CONCENTRADO = {
    'A': 'Diurno (integral)', 'B': 'Diurno (matutino)',
    'C': 'Diurno (vespertino)', 'D': 'Noturno',
    'E': 'Não há concentração em um turno'
};

// Infraestrutura e metodologia
const METODOLOGIA_SIM_NAO = {
    'A': 'Sim, todos', 'B': 'Sim, a maior parte',
    'C': 'Somente alguns', 'D': 'Nenhum'
};

// Acesso internet
const ACESSO_INTERNET = {
    'A': 'Plenamente', 'B': 'Parcialmente',
    'C': 'Não viabiliza para os estudantes do meu curso',
    'D': 'Não viabiliza para nenhum estudante'
};

// Recursos audiovisuais
const RECURSOS_AUDIOVISUAIS = {
    'A': 'Amplo e adequado', 'B': 'Amplo, mas inadequado',
    'C': 'Restrito, mas adequado', 'D': 'Restrito e inadequado',
    'E': 'A minha instituição não dispõe desses recursos/meios'
};

// Frequência biblioteca
const FREQUENCIA_BIBLIOTECA = {
    'A': 'Diariamente', 'B': 'Entre duas e quatro vezes por semana',
    'C': 'Uma vez por semana', 'D': 'Uma vez a cada 15 dias',
    'E': 'Somente em época de provas e/ou trabalhos',
    'F': 'Nunca a utilizo', 'G': 'A instituição não tem biblioteca'
};

// Acesso acervo
const ACESSO_ACERVO = {
    'A': 'Sim, todas as vezes', 'B': 'Sim, a maior parte das vezes',
    'C': 'Somente algumas vezes', 'D': 'Nunca'
};

// Atualização acervo
const ATUALIZACAO_ACERVO = {
    'A': 'É atualizado', 'B': 'É parcialmente atualizado',
    'C': 'É pouco atualizado', 'D': 'É desatualizado'
};

// Periódicos científicos
const PERIODICOS_CIENTIFICOS = {
    'A': 'É atualizado', 'B': 'É parcialmente atualizado',
    'C': 'É desatualizado', 'D': 'Não existe acervo de periódicos especializados',
    'E': 'Não sei responder'
};

// Horário biblioteca
const HORARIO_BIBLIOTECA = {
    'A': 'Plenamente', 'B': 'Parcialmente', 'C': 'Não atende'
};

// Exigência idioma
const EXIGENCIA_IDIOMA = {
    'A': 'Sim, em todas as disciplinas',
    'B': 'Sim, na maior parte das disciplinas',
    'C': 'Sim, somente em algumas disciplinas',
    'D': 'Não, nenhuma disciplina exige'
};

// Contextualização
const CONTEXTUALIZACAO = {
    'A': 'Sim, em todas as disciplinas',
    'B': 'Sim, na maior parte das disciplinas',
    'C': 'Sim, somente em algumas disciplinas',
    'D': 'Não contextualiza'
};

// Integração currículo
const INTEGRACAO_CURRICULO = {
    'A': 'É bem integrado', 'B': 'É relativamente integrado',
    'C': 'É pouco integrado', 'D': 'Não apresenta integração'
};

// Atividades complementares
const ATIVIDADES_COMPLEMENTARES = {
    'A': 'Sim, regularmente, com programação diversificada',
    'B': 'Sim, regularmente, com programação pouco diversificada',
    'C': 'Sim, eventualmente, com programação diversificada',
    'D': 'Sim, eventualmente, com programação pouco diversificada',
    'E': 'Não oferece atividades complementares'
};

// Participação programas
const PARTICIPACAO_PROGRAMA = {
    'A': 'Sim, participei e teve grande contribuição',
    'B': 'Sim, participei e teve pouca contribuição',
    'C': 'Sim, participei e não percebi nenhuma contribuição',
    'D': 'Não participei, mas a instituição oferece',
    'E': 'A instituição não oferece esse tipo de programa'
};

// Apoio eventos
const APOIO_EVENTOS = {
    'A': 'Sim, sem restrições', 'B': 'Sim, mas apenas eventualmente',
    'C': 'Não apoia de modo algum', 'D': 'Não sei responder'
};

// Nível exigência
const NIVEL_EXIGENCIA = {
    'A': 'Deveria exigir muito mais', 'B': 'Deveria exigir um pouco mais',
    'C': 'Exige na medida certa', 'D': 'Deveria exigir um pouco menos',
    'E': 'Deveria exigir muito menos'
};

// Contribuição curso
const CONTRIBUICAO_CURSO = {
    'A': 'Contribui amplamente', 'B': 'Contribui parcialmente',
    'C': 'Contribui muito pouco', 'D': 'Não contribui'
};

// Avaliação curso
const AVALIACAO_GERAL_CURSO = {
    'A': 'Muito boa', 'B': 'Boa', 'C': 'Regular',
    'D': 'Fraca', 'E': 'Muito fraca'
};

// Percepção prova
const PERCEPCAO_DIFICULDADE = { 'A': 'Muito fácil', 'B': 'Fácil', 'C': 'Médio', 'D': 'Difícil', 'E': 'Muito difícil' };
const PERCEPCAO_EXTENSAO = { 'A': 'Muito longa', 'B': 'Longa', 'C': 'Adequada', 'D': 'Curta', 'E': 'Muito curta' };
const PERCEPCAO_CLAREZA = { 'A': 'Sim, todos', 'B': 'Sim, a maioria', 'C': 'Cerca da metade', 'D': 'Poucos', 'E': 'Não, nenhum' };
const PERCEPCAO_SUFICIENCIA = { 'A': 'Sim, até excessivas', 'B': 'Sim, em todas', 'C': 'Sim, na maioria', 'D': 'Sim, somente em algumas', 'E': 'Não, em nenhuma' };
const PERCEPCAO_DIFICULDADE_RESPONDER = { 'A': 'Desconhecimento do conteúdo', 'B': 'Abordagem diferente', 'C': 'Espaço insuficiente', 'D': 'Falta de motivação', 'E': 'Não tive dificuldade' };
const PERCEPCAO_CONHECIMENTO = { 'A': 'Não estudou ainda a maioria', 'B': 'Estudou alguns, mas não aprendeu', 'C': 'Estudou a maioria, mas não aprendeu', 'D': 'Estudou e aprendeu muitos', 'E': 'Estudou e aprendeu todos' };
const PERCEPCAO_TEMPO = { 'A': 'Menos de 1h', 'B': '1 a 2h', 'C': '2 a 3h', 'D': '3 a 4h', 'E': '4h e não consegui terminar' };

// Presença prova
const TIPO_PRESENCA = {
    '222': 'Ausente', '333': 'Prova em branco', '334': 'Eliminado',
    '335': 'Zerada', '336': 'Resposta desconsiderada', '444': 'Ausente (dupla graduação)',
    '555': 'Presente com resultado válido', '556': 'Resultado desconsiderado',
    '565': 'Dispensado (sem ensalamento)', '585': 'Dispensado (fenômenos)',
    '666': 'Questão anulada', '888': 'Resultado desconsiderado pelo Inep',
    '889': 'Não realizada por problemas admin'
};

// Situação questões
const SITUACAO_QUESTAO = {
    '222': 'Não se aplica (ausente)', '333': 'Em branco (zero)',
    '335': 'Zerada (resposta nula)', '336': 'Divergente (zero)',
    '555': 'Válida', '556': 'Desconsiderada', '565': 'Dispensado',
    '585': 'Dispensado', '666': 'Anulada', '888': 'Desconsiderada pelo Inep',
    '889': 'Não realizada'
};

// Concordância
const CONCORDANCIA = {
    '1': 'Discordo totalmente', '2': 'Discordo', '3': 'Discordo parcialmente',
    '4': 'Concordo parcialmente', '5': 'Concordo', '6': 'Concordo totalmente',
    '7': 'Não sei responder', '8': 'Não se aplica'
};

// Funções principais
function detectarAno(obj) {
    if (typeof obj === 'number') return obj;
    if (typeof obj === 'string') {
        const parsed = parseInt(obj);
        if (!isNaN(parsed)) return parsed;
    }
    if (obj && typeof obj === 'object') {
        const ano = obj.NU_ANO || obj.ANO_EXAME;
        if (ano) return parseInt(String(ano).replace(/\.0$/, ''));
    }
    return null;
}

// Tabela mapeamentos
const MAPEAMENTOS = {
    'CO_CATEGAD': CATEGORIA_ADMIN,
    'CO_ORGACAD': ORG_ACADEMICA,
    'CO_MODALIDADE': MODALIDADE,
    'CO_REGIAO_CURSO': REGIAO,
    'CO_TURNO_GRADUACAO': TURNO_GRADUACAO,
    'TP_INSCRICAO': TIPO_INSCRICAO,
    'TP_INSCRICAO_ADM': TIPO_INSCRICAO,
    'CO_GRUPO': AREAS_COMPLETAS,
    'CODIGO_CURSO': CURSOS_MAP,
    'CO_CURSO': CURSOS_MAP,
    'CO_MUNIC_CURSO': CAMPUS_MAP,
    'SEXO': SEXO,
    'TP_SEXO': SEXO,
    'ESTADO_CIVIL': ESTADO_CIVIL,
    'QE_I01': ESTADO_CIVIL,
    'COR_RACA': COR_RACA,
    'QE_I02': COR_RACA,
    'QE_I03': NACIONALIDADE,
    'ESCOLARIDADE_PAI': ESCOLARIDADE,
    'QE_I04': ESCOLARIDADE,
    'ESCOLARIDADE_MAE': ESCOLARIDADE,
    'QE_I05': ESCOLARIDADE,
    'MORADIA': MORADIA,
    'QE_I06': MORADIA,
    'PESSOAS_FAMILIA': PESSOAS_FAMILIA,
    'QE_I07': PESSOAS_FAMILIA,
    'RENDA_FAMILIAR': null,
    'QE_I08': null,
    'ESTAGIO': ESTAGIO,
    'QE_I08_ESTAGIO': ESTAGIO,
    'SITUACAO_FINANCEIRA': SITUACAO_FINANCEIRA,
    'QE_I10': SITUACAO_FINANCEIRA,
    'SITUACAO_TRABALHO': SITUACAO_TRABALHO,
    'QE_I11': SITUACAO_TRABALHO,
    'QE_I07': SITUACAO_TRABALHO,
    'BOLSA_MENSALIDADE': BOLSA_MENSALIDADE,
    'QE_I12': BOLSA_MENSALIDADE,
    'BOLSA_FINANCIAMENTO_TIPO': BOLSA_MENSALIDADE,
    'BOLSA_OUTRAS_DESPESAS': BOLSA_OUTRAS_DESPESAS,
    'QE_I13': BOLSA_OUTRAS_DESPESAS,
    'BOLSA_CUSTEIO': BOLSA_OUTRAS_DESPESAS,
    'ACAO_AFIRMATIVA': ACAO_AFIRMATIVA,
    'QE_I14': ACAO_AFIRMATIVA,
    'UF_ENSINO_MEDIO': UF,
    'QE_I16': UF,
    'QE_I15': UF,
    'MUDANCA_CIDADE_CURSO': MUDANCA_CIDADE,
    'QE_I17': MUDANCA_CIDADE,
    'TIPO_ESCOLA_EM': TIPO_ESCOLA_EM,
    'QE_I18': TIPO_ESCOLA_EM,
    'TIPO_CURSO_EM': MODALIDADE_EM,
    'QE_I19': MODALIDADE_EM,
    'LIVROS_LIDOS_ANO': LIVROS_LIDOS,
    'QE_I20': LIVROS_LIDOS,
    'HORAS_ESTUDO_SEMANA': HORAS_ESTUDO,
    'QE_I21': HORAS_ESTUDO,
    'TURNO_CONCENTRADO': TURNO_CONCENTRADO,
    'QE_I22': TURNO_CONCENTRADO,
    'INSTALACOES_GERAIS': METODOLOGIA_SIM_NAO,
    'SALAS_AULA': METODOLOGIA_SIM_NAO,
    'LABORATORIOS': METODOLOGIA_SIM_NAO,
    'AMBIENTES_PRATICAS': METODOLOGIA_SIM_NAO,
    'EQUIPAMENTOS_PRATICAS': METODOLOGIA_SIM_NAO,
    'PLANOS_ENSINO': METODOLOGIA_SIM_NAO,
    'COERENCIA_CONTEUDOS': METODOLOGIA_SIM_NAO,
    'ATIVIDADES_PESQUISA': METODOLOGIA_SIM_NAO,
    'USO_LIVROS_TEXTO': METODOLOGIA_SIM_NAO,
    'USO_ARTIGOS_CIENTIFICOS': METODOLOGIA_SIM_NAO,
    'MATERIAIS_PROFESSORES': METODOLOGIA_SIM_NAO,
    'DISPONIBILIDADE_PROFESSORES': METODOLOGIA_SIM_NAO,
    'DOMINIO_CONTEUDO': METODOLOGIA_SIM_NAO,
    'ACESSO_INTERNET': ACESSO_INTERNET,
    'QE_I28': ACESSO_INTERNET,
    'RECURSOS_AUDIOVISUAIS': RECURSOS_AUDIOVISUAIS,
    'QE_I29': RECURSOS_AUDIOVISUAIS,
    'FREQUENCIA_BIBLIOTECA': FREQUENCIA_BIBLIOTECA,
    'QE_I30': FREQUENCIA_BIBLIOTECA,
    'ACESSO_ACERVO': ACESSO_ACERVO,
    'QE_I31': ACESSO_ACERVO,
    'ATUALIZACAO_ACERVO': ATUALIZACAO_ACERVO,
    'QE_I32': ATUALIZACAO_ACERVO,
    'PERIODICOS_CIENTIFICOS': PERIODICOS_CIENTIFICOS,
    'QE_I33': PERIODICOS_CIENTIFICOS,
    'HORARIO_BIBLIOTECA': HORARIO_BIBLIOTECA,
    'QE_I34': HORARIO_BIBLIOTECA,
    'EXIGENCIA_IDIOMA': EXIGENCIA_IDIOMA,
    'QE_I41': EXIGENCIA_IDIOMA,
    'CONTEXTUALIZACAO': CONTEXTUALIZACAO,
    'QE_I44': CONTEXTUALIZACAO,
    'INTEGRACAO_CURRICULO': INTEGRACAO_CURRICULO,
    'QE_I45': INTEGRACAO_CURRICULO,
    'ATIVIDADES_COMPLEMENTARES': ATIVIDADES_COMPLEMENTARES,
    'QE_I46': ATIVIDADES_COMPLEMENTARES,
    'INICIACAO_CIENTIFICA': PARTICIPACAO_PROGRAMA,
    'QE_I47': PARTICIPACAO_PROGRAMA,
    'MONITORIA': PARTICIPACAO_PROGRAMA,
    'QE_I48': PARTICIPACAO_PROGRAMA,
    'EXTENSAO': PARTICIPACAO_PROGRAMA,
    'QE_I49': PARTICIPACAO_PROGRAMA,
    'APOIO_EVENTOS': APOIO_EVENTOS,
    'QE_I50': APOIO_EVENTOS,
    'NIVEL_EXIGENCIA': NIVEL_EXIGENCIA,
    'QE_I51': NIVEL_EXIGENCIA,
    'CONTRIBUICAO_CULTURA_GERAL': CONTRIBUICAO_CURSO,
    'QE_I52': CONTRIBUICAO_CURSO,
    'CONTRIBUICAO_FORMACAO_TEORICA': CONTRIBUICAO_CURSO,
    'QE_I53': CONTRIBUICAO_CURSO,
    'CONTRIBUICAO_EXERCICIO_PROFISSIONAL': CONTRIBUICAO_CURSO,
    'QE_I54': CONTRIBUICAO_CURSO,
    'AVALIACAO_GERAL_CURSO': AVALIACAO_GERAL_CURSO,
    'QE_I55': AVALIACAO_GERAL_CURSO,
    'CO_RS_I1': PERCEPCAO_DIFICULDADE,
    'PERCEPCAO_DIFICULDADE_FG': PERCEPCAO_DIFICULDADE,
    'CO_RS_I2': PERCEPCAO_DIFICULDADE,
    'PERCEPCAO_DIFICULDADE_CE': PERCEPCAO_DIFICULDADE,
    'CO_RS_I3': PERCEPCAO_EXTENSAO,
    'PERCEPCAO_EXTENSAO_PROVA': PERCEPCAO_EXTENSAO,
    'CO_RS_I4': PERCEPCAO_CLAREZA,
    'PERCEPCAO_CLAREZA_FG': PERCEPCAO_CLAREZA,
    'CO_RS_I5': PERCEPCAO_CLAREZA,
    'PERCEPCAO_CLAREZA_CE': PERCEPCAO_CLAREZA,
    'CO_RS_I6': PERCEPCAO_SUFICIENCIA,
    'PERCEPCAO_SUFICIENCIA_INFO': PERCEPCAO_SUFICIENCIA,
    'CO_RS_I7': PERCEPCAO_DIFICULDADE_RESPONDER,
    'PERCEPCAO_DIFICULDADE_RESPONDER': PERCEPCAO_DIFICULDADE_RESPONDER,
    'CO_RS_I8': PERCEPCAO_CONHECIMENTO,
    'PERCEPCAO_CONHECIMENTO_CONTEUDO': PERCEPCAO_CONHECIMENTO,
    'CO_RS_I9': PERCEPCAO_TEMPO,
    'PERCEPCAO_TEMPO_GASTO': PERCEPCAO_TEMPO,
    'TP_PRES': TIPO_PRESENCA,
    'TP_PR_GER': TIPO_PRESENCA,
    'TP_PR_OB_FG': TIPO_PRESENCA,
    'TP_PR_DI_FG': TIPO_PRESENCA,
    'TP_PR_OB_CE': TIPO_PRESENCA,
    'TP_PR_DI_CE': TIPO_PRESENCA,
    'PRESENCA_ENADE': TIPO_PRESENCA,
    'PRESENCA_PROVA': TIPO_PRESENCA,
    'PRESENCA_OBJ_FG': TIPO_PRESENCA,
    'PRESENCA_DISC_FG': TIPO_PRESENCA,
    'PRESENCA_OBJ_CE': TIPO_PRESENCA,
    'PRESENCA_DISC_CE': TIPO_PRESENCA,
    'TP_SFG_D1': SITUACAO_QUESTAO,
    'TP_SFG_D2': SITUACAO_QUESTAO,
    'TP_SCE_D1': SITUACAO_QUESTAO,
    'TP_SCE_D2': SITUACAO_QUESTAO,
    'TP_SCE_D3': SITUACAO_QUESTAO,
    'SITUACAO_FG_Q1': SITUACAO_QUESTAO,
    'SITUACAO_FG_Q2': SITUACAO_QUESTAO,
    'SITUACAO_CE_Q1': SITUACAO_QUESTAO,
    'SITUACAO_CE_Q2': SITUACAO_QUESTAO,
    'SITUACAO_CE_Q3': SITUACAO_QUESTAO,
};

// Expressão regular QE_I27 a QE_I92
const regexQE = /^QE_I(2[7-9]|[3-8][0-9]|9[0-2])$/;

// Converte valor
function converterValor(campo, valor, ano = null) {
    if (valor === null || valor === undefined || valor === '' || valor === '.' || valor === ' ' || valor === '*') {
        return 'Não informado';
    }
    const valorStr = String(valor).replace(/\.0$/, '');

    // Renda por ano
    if (campo === 'RENDA_FAMILIAR' || campo === 'QE_I08') {
        if (ano === 2023) return RENDA_2023[valorStr] || valorStr;
        if (ano === 2022) return RENDA_2022[valorStr] || valorStr;
        if (ano === 2021) return RENDA_2021[valorStr] || valorStr;
        if (ano >= 2013 && ano <= 2019) return RENDA_2013_2019[valorStr] || valorStr;
        if (ano >= 2011 && ano <= 2012) return RENDA_2011_2012[valorStr] || valorStr;
        if (ano === 2010) return RENDA_2010[valorStr] || valorStr;
        return RENDA_2013_2019[valorStr] || valorStr;
    }

    // Outros campos
    const mapeamento = MAPEAMENTOS[campo];
    if (mapeamento) {
        return mapeamento[valorStr] || valorStr;
    }

    // Concordância
    if (regexQE.test(campo)) {
        return CONCORDANCIA[valorStr] || valorStr;
    }

    // Infraestrutura genérica
    if (/^QE_I(2[3-7]|3[5-9]|4[0-3])$/.test(campo)) {
        return METODOLOGIA_SIM_NAO[valorStr] || valorStr;
    }

    // Turnos
    if (['TURNO_MATUTINO','TURNO_VESPERTINO','TURNO_NOTURNO','TURNO_CONCENTRADO'].includes(campo)) {
        return valorStr === '1' ? 'Sim' : (valorStr === '0' ? 'Não' : valorStr);
    }

    // Notas
    if (campo.match(/^NT_|^NOTA_/)) {
        if (/^\d{4}-\d{2}-\d{2}T/.test(valorStr)) return 'Não disponível';
        if (valorStr && !isNaN(valorStr)) return parseFloat(valorStr).toFixed(1);
        return 'Não disponível';
    }

    // Idade e ano
    if (campo === 'NU_IDADE' || campo === 'IDADE') return `${valorStr} anos`;
    if (campo === 'NU_ANO' || campo === 'ANO_EXAME') return `Edição ${valorStr}`;

    return valorStr;
}

// Converte dados
function converterDados(obj, ano = null) {
    if (!obj || typeof obj !== 'object') return obj;
    if (!ano) ano = detectarAno(obj);
    const resultado = { ...obj };
    Object.keys(obj).forEach(campo => {
        const valor = obj[campo];
        if (valor !== null && valor !== undefined && valor !== '') {
            const convertido = converterValor(campo, valor, ano);
            if (convertido !== String(valor).replace(/\.0$/, '')) {
                resultado[campo + '_TEXTO'] = convertido;
            }
        }
    });
    return resultado;
}

// Converte lista
function converterLista(lista, ano = null) {
    if (!Array.isArray(lista)) return lista;
    return lista.map(item => converterDados(item, ano));
}

// Obtém texto
function getTexto(obj, campo, ano = null) {
    if (!obj) return 'Não informado';
    if (obj[campo + '_TEXTO']) return obj[campo + '_TEXTO'];
    if (obj[campo] !== undefined) {
        if (!ano) ano = detectarAno(obj);
        return converterValor(campo, obj[campo], ano);
    }
    return 'Não informado';
}

// Exportação global
window.converterValor = converterValor;
window.converterDados = converterDados;
window.converterLista = converterLista;
window.getTexto = getTexto;
window.detectarAno = detectarAno;

console.log('Conversor INEP carregado com sucesso!');
console.log(`Suporte para todos os anos do ENADE (2010-2023)`);