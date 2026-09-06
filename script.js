'use strict';

/* auxiliares */
function debounce(fn, delay = 100) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function formatarNumero(num) {
    if (num === undefined || num === null || isNaN(num)) return '---';
    return num.toLocaleString('pt-BR');
}

function abreviarCampus(nome) {
    const siglas = {
        'CAMPUS JOÃO PESSOA': 'JP',
        'CAMPUS CAMPINA GRANDE': 'CG',
        'CAMPUS CABEDELO': 'CB',
        'CAMPUS SOUSA': 'SS',
        'CAMPUS CAJAZEIRAS': 'CZ',
        'CAMPUS PATOS': 'PT',
        'CAMPUS MONTEIRO': 'MT',
        'CAMPUS PICUÍ': 'PC',
        'CAMPUS GUARABIRA': 'GB',
        'CAMPUS SANTA RITA': 'SR',
        'CAMPUS ESPERANÇA': 'ES',
        'CAMPUS ITABAIANA': 'IB',
        'CAMPUS CATOLÉ DO ROCHA': 'CR',
        'CAMPUS ITAPORANGA': 'IP',
        'CAMPUS SANTA LUZIA': 'SL',
        'CAMPUS PEDRAS DE FOGO': 'PF',
        'CAMPUS SOLEDADE': 'SD',
        'CAMPUS AREIA': 'AR',
        'CAMPUS MANGABEIRA': 'MG',
        'CAMPUS SAPÉ': 'SP',
        'CAMPUS QUEIMADAS': 'QM',
        'CAMPUS CABEDELO CENTRO': 'CC',
        'CAMPUS ALAGOA GRANDE': 'AG',
        'CAMPUS MAMANGUAPE': 'MM'
    };
    return siglas[nome] || nome.substring(0, 3).toUpperCase();
}

/* parse notas */
function parseNota(valor) {
    if (!valor || valor === '') return null;
    let str = String(valor).trim();
    str = str.replace(/[^0-9.,]/g, '');
    str = str.replace(',', '.');
    const parts = str.split('.');
    if (parts.length > 2) str = parts.slice(0, -1).join('') + '.' + parts[parts.length - 1];
    const parsed = parseFloat(str);
    if (isNaN(parsed)) return null;
    if (parsed < 0 || parsed > 100) return null;
    return parsed;
}

/* coordenadas */
const coordenadas = {
    'JOÃO PESSOA': [-7.1355914, -34.8737658],
    'MANGABEIRA': [-7.144524049356752, -34.84309308192913],
    'CABEDELO': [-7.004253756122571, -34.83429622482614],
    'CABEDELO CENTRO': [-6.972477256482318, -34.83284496251898],
    'SANTA RITA': [-7.146405401696038, -35.00017880373486],
    'PEDRAS DE FOGO': [-7.402130107282982, -35.116958997056194],
    'SAPÉ': [-7.088087839399216, -35.24219855045258],
    'MAMANGUAPE': [-6.8430, -35.1322],
    'CAMPINA GRANDE': [-7.240083292649547, -35.916440283654204],
    'GUARABIRA': [-6.85614486154378, -35.47118560492858],
    'ESPERANÇA': [-7.036382672849143, -35.87264400018975],
    'QUEIMADAS': [-7.363718929525841, -35.902364405575426],
    'ALAGOA GRANDE': [-7.050440678515558, -35.62812103768465],
    'AREIA': [-6.971811416211238, -35.69208555256188],
    'ITABAIANA': [-7.304585270376579, -35.34658406045916],
    'PATOS': [-7.074063937163226, -37.286673292057856],
    'SOUSA': [-6.77972656614948, -38.230661598562975],
    'CAJAZEIRAS': [-6.889503178694285, -38.545272237752144],
    'CATOLÉ DO ROCHA': [-6.34076246254725, -37.75561476257022],
    'MONTEIRO': [-7.905585607948157, -37.12096978124849],
    'PRINCESA ISABEL': [-7.757790284177818, -38.01746961671981],
    'ITAPORANGA': [-7.318675434110364, -38.14184020323397],
    'PICUÍ': [-6.508625031820252, -36.360657868318356],
    'SANTA LUZIA': [-6.8624879022738785, -36.911487582678966],
    'SOLEDADE': [-7.060223036828175, -36.35652361471836]
};

/* dados globais */
let dadosReais = {
    totalCampi: 0,
    totalEstudantes: 0,
    totalDocentes: 0,
    totalTAEs: 0,
    totalServidores: 0,
    ultimoAno: null,
    topCampi: [],
    mapaDados: {},
    orcamento: {
        totalGeral: 0,
        anoMaisRecente: null,
        valorNoAno: 0,
        porAno: {}
    },
    pesquisa: {
        alunosRespondentes: 0,
        professoresRespondentes: 0,
        satisfacaoMedia: 0,
        dataColeta: null
    },
    enade: {
        faixaAnos: '',
        cursosAvaliados: 0,
        notaMedia: 0,
        cursosConceitoMaximo: 0
    },
    dadosCampiMapa: []
};

/* renderizar mapa */
function renderizarMapaPreview() {
    const container = document.getElementById('map-preview-container');
    if (!container) {
        console.warn('Container do mapa nao encontrado.');
        return;
    }

    if (typeof L === 'undefined') {
        console.warn('Leaflet nao carregado. Tentando novamente em 1s...');
        setTimeout(renderizarMapaPreview, 1000);
        return;
    }

    if (container._leaflet_id) {
        container.innerHTML = '';
    }

    const dadosCampi = dadosReais.dadosCampiMapa || [];
    if (dadosCampi.length === 0) {
        console.warn('Nenhum dado de campi disponivel. Usando fallback.');
        const fallbackCampi = Object.keys(coordenadas).map(nome => ({
            Nome: nome,
            Municipio: nome,
            Situacao: 'Campus Regular',
            AreaFisica: '',
            Total_Servidores: 0,
            Docentes: 0,
            TAEs: 0
        }));
        dadosReais.dadosCampiMapa = fallbackCampi;
        renderizarMapaPreview();
        return;
    }

    const map = L.map(container, {
        zoomControl: true,
        attributionControl: true
    }).setView([-7.2, -36.5], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const cores = {
        'Campus Regular': '#1cc88a',
        'Campus Avançado': '#f6c23e',
        'Em implatação': '#e74a3b',
        'Em implantação': '#e74a3b',
        'Centro administrativo e executivo': '#36b9cc'
    };

    const ordenados = [...dadosCampi].sort((a, b) => a.Nome.localeCompare(b.Nome, 'pt-BR'));

    let marcadores = [];
    ordenados.forEach((campus, idx) => {
        let cidade = (campus.Municipio || '').toUpperCase().trim();
        let coords = coordenadas[cidade];
        if (!coords) {
            const nomeSemCampus = campus.Nome.replace(/^CAMPUS\s+/i, '').toUpperCase().trim();
            coords = coordenadas[nomeSemCampus];
        }
        if (!coords) {
            console.warn('Coordenadas nao encontradas para:', campus.Nome);
            return;
        }
        const situacao = (campus.Situacao || '').trim();
        const cor = cores[situacao] || '#858796';
        const numero = idx + 1;

        const icon = L.divIcon({
            html: `<div style="background-color: ${cor}; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${numero}</div>`,
            className: 'custom-marker',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        const marker = L.marker(coords, { icon: icon })
            .bindPopup(`
                <strong>${campus.Nome}</strong><br>
                Municipio: ${campus.Municipio || ''}<br>
                Situacao: ${situacao}<br>
                Servidores: ${campus.Total_Servidores || 'N/D'}<br>
                Docentes: ${campus.Docentes || 'N/D'}<br>
                TAEs: ${campus.TAEs || 'N/D'}<br>
                Area: ${campus.AreaFisica || 'N/D'}
            `);
        marker.addTo(map);
        marcadores.push({ numero, nome: campus.Nome, coords });
    });

    if (marcadores.length > 0) {
        const group = L.featureGroup(marcadores.map(m => L.marker(m.coords)));
        map.fitBounds(group.getBounds().pad(0.1));
    }

    const legendContainer = document.getElementById('map-legend');
    if (legendContainer) {
        const situacoes = ['Campus Regular', 'Campus Avançado', 'Em implantação', 'Centro administrativo e executivo'];
        let legendHtml = '';
        situacoes.forEach(sit => {
            const cor = cores[sit] || '#858796';
            legendHtml += `<span><span style="display:inline-block;width:16px;height:16px;background:${cor};border-radius:4px;vertical-align:middle;"></span> ${sit}</span>`;
        });
        legendContainer.innerHTML = legendHtml;
    }

    container.style.cursor = 'pointer';
    container.addEventListener('click', function(e) {
        if (!e.target.closest('.leaflet-marker-icon')) {
            window.location.href = 'institucional.html#chart-mapa';
        }
    });

    console.log('Mapa renderizado com ' + marcadores.length + ' marcadores.');
}

/* carregar dados */
async function carregarDadosReais() {
    try {
        const basePath = 'assets/data/';
        const caminhoCampi = basePath + 'Campi/campi.json';
        const caminhoServ = basePath + 'EstruturaAdministrativa/DadosDocentesIFS.json';
        const caminhoMat = basePath + 'EstruturaAdministrativa/dadosAdministrativos.json';
        const caminhoOrc = basePath + 'DadosOrçamentario/dadosOrcamentario.json';
        const caminhoDiscentes = basePath + 'DadosFormularios/dadosDiscentes.json';
        const caminhoDocentes = basePath + 'DadosFormularios/dadosDocentes.json';
        const caminhoEnade = basePath + 'DadosENADE/DADOSENADEGERAL.json';
        const caminhoInst = basePath + 'Dadosinstitucionais/AnoCriaçãoAreaFísica.json';

        console.log('Carregando dados...');

        const [resCampi, resServ, resMat, resOrc, resDiscentes, resDocentes, resEnade, resInst] = await Promise.all([
            fetch(caminhoCampi),
            fetch(caminhoServ),
            fetch(caminhoMat),
            fetch(caminhoOrc),
            fetch(caminhoDiscentes),
            fetch(caminhoDocentes),
            fetch(caminhoEnade),
            fetch(caminhoInst).catch(() => ({ ok: false }))
        ]);

        if (!resCampi.ok || !resServ.ok || !resMat.ok || !resOrc.ok) {
            throw new Error('HTTP ' + resCampi.status + ' / ' + resServ.status + ' / ' + resMat.status + ' / ' + resOrc.status);
        }

        const campi = await resCampi.json();
        const dadosServ = await resServ.json();
        const dadosMat = await resMat.json();
        const dadosOrc = await resOrc.json();

        /* dados institucionais */
        let dadosInst = [];
        if (resInst && resInst.ok) {
            dadosInst = await resInst.json();
            console.log('Institucional (AnoCriacaoAreaFisica.json): ' + dadosInst.length + ' registros carregados');
        } else {
            console.warn('Arquivo institucional (AnoCriacaoAreaFisica.json) nao encontrado. Usando fallback.');
        }

        /* dados pesquisa */
        let discentes = [];
        let docentes = [];
        let dataColeta = null;

        if (resDiscentes.ok) {
            discentes = await resDiscentes.json();
            console.log('Discentes: ' + discentes.length + ' respostas');
        } else {
            console.warn('Arquivo de discentes nao encontrado. Usando fallback.');
        }

        if (resDocentes.ok) {
            docentes = await resDocentes.json();
            console.log('Docentes: ' + docentes.length + ' respostas');
        } else {
            console.warn('Arquivo de docentes nao encontrado. Usando fallback.');
        }

        /* processa datas */
        const todasRespostas = [...discentes, ...docentes];
        if (todasRespostas.length > 0) {
            const timestamps = todasRespostas
                .map(r => r['Carimbo de data/hora'])
                .filter(ts => ts && ts.trim() !== '')
                .map(ts => new Date(ts).getTime())
                .filter(ts => !isNaN(ts));
            if (timestamps.length > 0) {
                const maisRecente = new Date(Math.max(...timestamps));
                dataColeta = maisRecente.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
            }
        }

        /* satisfacao media */
        let somaSatisfacao = 0;
        let countSatisfacao = 0;
        const mapaSatisfacao = {
            'Muito satisfeito': 5,
            'Satisfeito': 4,
            'Neutro': 3,
            'Insatisfeito': 2,
            'Muito insatisfeito': 1
        };
        docentes.forEach(d => {
            const nivel = d['Qual seu nível de satisfação com o trabalho no IFPB?'];
            if (nivel && mapaSatisfacao[nivel] !== undefined) {
                somaSatisfacao += mapaSatisfacao[nivel];
                countSatisfacao++;
            }
        });
        const satisfacaoMedia = countSatisfacao > 0 ? (somaSatisfacao / countSatisfacao) : 0;

        /* dados enade */
        let dadosEnade = [];
        let faixaAnos = 'Todos os anos';
        let cursosAvaliados = 0;
        let notaMedia = 0;
        let cursosConceitoMaximo = 0;

        if (resEnade.ok) {
            dadosEnade = await resEnade.json();
            window.dadosEnadeBrutos = dadosEnade;
            console.log('ENADE: ' + dadosEnade.length + ' registros carregados');

            let minAno = Infinity;
            let maxAno = 0;
            dadosEnade.forEach(item => {
                const ano = parseInt(item.ANO_EXAME);
                if (!isNaN(ano) && ano >= 1000) {
                    if (ano < minAno) minAno = ano;
                    if (ano > maxAno) maxAno = ano;
                }
            });
            if (minAno !== Infinity && maxAno > 0) {
                faixaAnos = minAno === maxAno ? '' + minAno : minAno + ' – ' + maxAno;
            } else {
                faixaAnos = 'Dados indisponiveis';
            }

            const cursosSet = new Set();
            dadosEnade.forEach(item => {
                cursosSet.add(item.CODIGO_CURSO);
            });
            cursosAvaliados = cursosSet.size;

            /* calculo media geral */
            let somaNotas = 0;
            let countNotas = 0;
            dadosEnade.forEach(item => {
                let nota = parseNota(item.NOTA_GERAL);
                if (nota !== null) {
                    somaNotas += nota;
                    countNotas++;
                }
            });
            notaMedia = countNotas > 0 ? somaNotas / countNotas : 0;

            const notasPorCurso = {};
            dadosEnade.forEach(item => {
                let nota = parseNota(item.NOTA_GERAL);
                if (nota === null) nota = parseNota(item.NOTA_DISC_FG);
                if (nota !== null) {
                    const curso = item.CODIGO_CURSO;
                    if (!notasPorCurso[curso]) notasPorCurso[curso] = [];
                    notasPorCurso[curso].push(nota);
                }
            });
            let cursosAlta = 0;
            for (let curso in notasPorCurso) {
                const medias = notasPorCurso[curso];
                const mediaCurso = medias.reduce((a, b) => a + b, 0) / medias.length;
                if (mediaCurso >= 80) cursosAlta++;
            }
            cursosConceitoMaximo = cursosAlta;

        } else {
            console.warn('Arquivo ENADE nao encontrado. Usando fallback.');
        }

        /* processamento institucional */
        const mapaServ = {};
        dadosServ.forEach(item => {
            const nome = item.Estrutura.trim().toUpperCase();
            mapaServ[nome] = {
                Total_Servidores: parseFloat(item['Total de Servidores']) || 0,
                TAEs: parseFloat(item['TAEs']) || 0,
                Docentes: parseFloat(item['Docentes']) || 0,
                Docentes_Efetivos: parseFloat(item['Docentes Efetivos']) || 0,
                ITCD: item.ITCD || null
            };
        });

        /* construir dados mapa */
        let dadosCampiParaMapa = [];

        if (dadosInst && dadosInst.length > 0) {
            dadosCampiParaMapa = dadosInst
                .filter(c => c.Nome && c.Nome.trim() !== '')
                .map(c => {
                    const nome = c.Nome || c.Campi || '';
                    const nomeLimpo = nome.trim().toUpperCase();
                    const serv = mapaServ[nomeLimpo] || {};
                    let municipio = '';
                    const cidades = Object.keys(coordenadas);
                    for (let cidade of cidades) {
                        if (nome.toUpperCase().includes(cidade)) {
                            municipio = cidade;
                            break;
                        }
                    }
                    if (!municipio) {
                        const partes = nome.replace(/^CAMPUS\s+/i, '').trim().split(' ');
                        municipio = partes[0] || '';
                    }
                    return {
                        Nome: nome.trim(),
                        Municipio: municipio,
                        Situacao: c.Situação || 'Campus Regular',
                        AreaFisica: c['Área física (m²)'] || '',
                        Ano: c.Ano || '',
                        Total_Servidores: serv.Total_Servidores || 0,
                        TAEs: serv.TAEs || 0,
                        Docentes: serv.Docentes || 0,
                        Docentes_Efetivos: serv.Docentes_Efetivos || 0,
                        ITCD: serv.ITCD || null
                    };
                });
        }

        if (dadosCampiParaMapa.length === 0) {
            console.warn('Usando campi.json como fallback para o mapa.');
            dadosCampiParaMapa = campi
                .filter(item => item.Nome && item.Nome.toUpperCase().includes('CAMPUS'))
                .map(c => {
                    const nomeLimpo = c.Nome.trim().toUpperCase();
                    const serv = mapaServ[nomeLimpo] || {};
                    let municipio = c.Municipio || '';
                    if (!municipio) {
                        const partes = c.Nome.replace(/^CAMPUS\s+/i, '').trim().split(' ');
                        municipio = partes[0] || '';
                    }
                    return {
                        Nome: c.Nome.trim(),
                        Municipio: municipio,
                        Situacao: c.Situação || 'Campus Regular',
                        AreaFisica: c['Área física (m²)'] || '',
                        Ano: c.Ano || '',
                        Total_Servidores: serv.Total_Servidores || 0,
                        TAEs: serv.TAEs || 0,
                        Docentes: serv.Docentes || 0,
                        Docentes_Efetivos: serv.Docentes_Efetivos || 0,
                        ITCD: serv.ITCD || null
                    };
                });
            if (!dadosCampiParaMapa.some(d => d.Nome.toUpperCase().includes('REITORIA'))) {
                dadosCampiParaMapa.push({
                    Nome: 'REITORIA',
                    Municipio: 'Joao Pessoa',
                    Situacao: 'Centro administrativo e executivo',
                    AreaFisica: '1,63 hectare = 16.315 m²',
                    Ano: '29 de dezembro de 2008',
                    Total_Servidores: mapaServ['REITORIA'] ? mapaServ['REITORIA'].Total_Servidores : 0,
                    TAEs: mapaServ['REITORIA'] ? mapaServ['REITORIA'].TAEs : 0,
                    Docentes: mapaServ['REITORIA'] ? mapaServ['REITORIA'].Docentes : 0,
                    Docentes_Efetivos: mapaServ['REITORIA'] ? mapaServ['REITORIA'].Docentes_Efetivos : 0,
                    ITCD: null
                });
            }
        }

        dadosReais.dadosCampiMapa = dadosCampiParaMapa;
        console.log(dadosCampiParaMapa.length + ' campi preparados para o mapa.');

        /* processamento cards */
        const campiFiltrados = campi.filter(item => 
            item.Nome && item.Nome.toUpperCase().includes('CAMPUS')
        );
        const totalCampi = campiFiltrados.length;

        let totalServidores = 0;
        let totalDocentes = 0;
        let totalTAEs = 0;
        Object.values(mapaServ).forEach(d => {
            totalServidores += d.Total_Servidores;
            totalDocentes += d.Docentes;
            totalTAEs += d.TAEs;
        });

        let totalEstudantes = 0;
        dadosMat.forEach(item => {
            const mat = parseFloat(item.Matrículas);
            if (!isNaN(mat)) totalEstudantes += mat;
        });

        let totalOrcamento = 0;
        dadosOrc.forEach(item => {
            const valor = parseFloat(item.valor_empenhado) || 0;
            totalOrcamento += valor;
        });

        let ultimoAno = 0;
        dadosMat.forEach(item => {
            if (item.Ano && parseInt(item.Ano) > ultimoAno) ultimoAno = parseInt(item.Ano);
        });

        const topCampi = campiFiltrados
            .map(c => {
                const nome = c.Nome.trim().toUpperCase();
                const dados = mapaServ[nome] || {};
                return {
                    Nome: c.Nome,
                    Total_Servidores: dados.Total_Servidores || 0,
                    Docentes: dados.Docentes || 0,
                    TAEs: dados.TAEs || 0,
                    Docentes_Efetivos: dados.Docentes_Efetivos || 0
                };
            })
            .sort((a, b) => b.Total_Servidores - a.Total_Servidores)
            .slice(0, 8);
        dadosReais.topCampi = topCampi;

        /* atualizar cards ifpb */
        const ifpbCard = document.querySelector('.data-card[data-type="ifpb"]');
        if (ifpbCard) {
            const valores = ifpbCard.querySelectorAll('.data-stat-value');
            if (valores.length >= 4) {
                valores[0].textContent = totalCampi + ' unidades';
                valores[1].textContent = totalEstudantes.toLocaleString('pt-BR') + ' mil';
                valores[2].textContent = totalServidores.toLocaleString('pt-BR');
                let orcFormatado;
                if (totalOrcamento >= 1e9) {
                    orcFormatado = 'R$ ' + (totalOrcamento / 1e9).toFixed(2) + ' bi';
                } else if (totalOrcamento >= 1e6) {
                    orcFormatado = 'R$ ' + (totalOrcamento / 1e6).toFixed(2) + ' mi';
                } else {
                    orcFormatado = 'R$ ' + totalOrcamento.toLocaleString('pt-BR');
                }
                valores[3].textContent = orcFormatado;
            }
        }

        /* atualizar cards enade */
        const enadeCard = document.querySelector('.data-card[data-type="enade"]');
        if (enadeCard) {
            const valores = enadeCard.querySelectorAll('.data-stat-value');
            if (valores.length >= 4) {
                valores[0].textContent = faixaAnos;
                valores[1].textContent = cursosAvaliados || '23';
                valores[2].textContent = notaMedia > 0 ? notaMedia.toFixed(1) : '62.5';
                valores[3].textContent = cursosConceitoMaximo > 0 ? cursosConceitoMaximo + ' cursos' : '5 cursos';
            }
        }

        /* atualizar cards pesquisa */
        const pesquisaCard = document.querySelector('.data-card[data-type="pesquisa"]');
        if (pesquisaCard) {
            const valores = pesquisaCard.querySelectorAll('.data-stat-value');
            if (valores.length >= 4) {
                valores[0].textContent = discentes.length.toLocaleString('pt-BR');
                valores[1].textContent = docentes.length.toLocaleString('pt-BR');
                valores[2].textContent = satisfacaoMedia > 0 ? satisfacaoMedia.toFixed(1) + ' / 5' : '---';
                valores[3].textContent = dataColeta || '---';
            }
        }

        const campiEl = document.getElementById('campi-count');
        if (campiEl) campiEl.textContent = totalCampi;

        const studentsEl = document.getElementById('students-count');
        if (studentsEl) studentsEl.textContent = totalEstudantes.toLocaleString('pt-BR') + ' mil';

        const teachersEl = document.getElementById('teachers-count');
        if (teachersEl) teachersEl.textContent = totalServidores.toLocaleString('pt-BR');

        const budgetEl = document.getElementById('budget-value');
        if (budgetEl) {
            let orcFormatado;
            if (totalOrcamento >= 1e9) {
                orcFormatado = (totalOrcamento / 1e9).toFixed(2) + ' bi';
            } else if (totalOrcamento >= 1e6) {
                orcFormatado = (totalOrcamento / 1e6).toFixed(2) + ' mi';
            } else {
                orcFormatado = totalOrcamento.toLocaleString('pt-BR');
            }
            budgetEl.textContent = orcFormatado;
            const card = budgetEl.closest('.card');
            if (card) {
                const h3 = card.querySelector('h3');
                if (h3) h3.textContent = 'Orçamento';
            }
        }

        /* atualizar globais */
        dadosReais.totalCampi = totalCampi;
        dadosReais.totalEstudantes = totalEstudantes;
        dadosReais.totalServidores = totalServidores;
        dadosReais.totalDocentes = totalDocentes;
        dadosReais.totalTAEs = totalTAEs;
        dadosReais.orcamento.totalGeral = totalOrcamento;
        dadosReais.orcamento.anoMaisRecente = ultimoAno;
        dadosReais.pesquisa.alunosRespondentes = discentes.length;
        dadosReais.pesquisa.professoresRespondentes = docentes.length;
        dadosReais.pesquisa.satisfacaoMedia = satisfacaoMedia;
        dadosReais.pesquisa.dataColeta = dataColeta;
        dadosReais.enade.faixaAnos = faixaAnos;
        dadosReais.enade.cursosAvaliados = cursosAvaliados;
        dadosReais.enade.notaMedia = notaMedia;
        dadosReais.enade.cursosConceitoMaximo = cursosConceitoMaximo;

        console.log('Dados atualizados:');
        console.log('Campi: ' + totalCampi + ', Estudantes: ' + totalEstudantes + ', Servidores: ' + totalServidores + ', Docentes: ' + totalDocentes + ', TAEs: ' + totalTAEs + ', Orcamento: ' + totalOrcamento);
        console.log('Pesquisa: ' + discentes.length + ' alunos, ' + docentes.length + ' docentes, satisfacao: ' + satisfacaoMedia.toFixed(1) + '/5, coleta: ' + dataColeta);
        console.log('ENADE: ' + faixaAnos + ' | ' + cursosAvaliados + ' cursos | nota media: ' + notaMedia.toFixed(1) + ' | ' + cursosConceitoMaximo + ' cursos com nota >= 80');

        /* renderizar mapa */
        renderizarMapaPreview();

        /* graficos */
        renderizarEvolucao(dadosMat);
        renderizarComparativos();

        /* radar perfil cursos */
        renderizarRadarPerfilCursos(discentes);

        return true;
    } catch (erro) {
        console.warn('Falha ao carregar dados. Usando fallback estatico.', erro);
        return false;
    }
}

/* atualizar elementos */
function atualizarElementosComDadosReais() {
    const campiEl = document.getElementById('campi-count');
    if (campiEl) campiEl.textContent = dadosReais.totalCampi || '23';

    const studentsEl = document.getElementById('students-count');
    if (studentsEl) {
        studentsEl.textContent = dadosReais.totalEstudantes > 0 ? formatarNumero(dadosReais.totalEstudantes) + ' mil' : '305.450 mil';
    }

    const teachersEl = document.getElementById('teachers-count');
    if (teachersEl) {
        teachersEl.textContent = dadosReais.totalServidores > 0 ? formatarNumero(dadosReais.totalServidores) : '2.614';
    }

    const budgetEl = document.getElementById('budget-value');
    if (budgetEl && dadosReais.orcamento) {
        const total = dadosReais.orcamento.totalGeral;
        let valorFormatado;
        if (total >= 1e9) {
            valorFormatado = (total / 1e9).toFixed(2) + ' bi';
        } else if (total >= 1e6) {
            valorFormatado = (total / 1e6).toFixed(2) + ' mi';
        } else {
            valorFormatado = total.toLocaleString('pt-BR');
        }
        budgetEl.textContent = valorFormatado;
    }

    const yearEl = document.querySelector('.hero-card-year');
    if (yearEl) yearEl.textContent = dadosReais.ultimoAno || '2025';

    const trendBadge = document.querySelector('.trend-badge');
    if (trendBadge && dadosReais.ultimoAno) {
        trendBadge.innerHTML = '<i class="fas fa-calendar-alt"></i> Dados de ' + dadosReais.ultimoAno;
    }

    const pesquisaCard = document.querySelector('.data-card[data-type="pesquisa"]');
    if (pesquisaCard) {
        const valores = pesquisaCard.querySelectorAll('.data-stat-value');
        if (valores.length >= 4) {
            valores[0].textContent = dadosReais.pesquisa.alunosRespondentes > 0 ? formatarNumero(dadosReais.pesquisa.alunosRespondentes) : '1.247';
            valores[1].textContent = dadosReais.pesquisa.professoresRespondentes > 0 ? formatarNumero(dadosReais.pesquisa.professoresRespondentes) : '342';
            valores[2].textContent = dadosReais.pesquisa.satisfacaoMedia > 0 ? dadosReais.pesquisa.satisfacaoMedia.toFixed(1) + ' / 5' : '4.2 / 5';
            valores[3].textContent = dadosReais.pesquisa.dataColeta || 'Marco/2026';
        }
    }

    const enadeCard = document.querySelector('.data-card[data-type="enade"]');
    if (enadeCard) {
        const valores = enadeCard.querySelectorAll('.data-stat-value');
        if (valores.length >= 4) {
            valores[0].textContent = dadosReais.enade.faixaAnos || '2023';
            valores[1].textContent = dadosReais.enade.cursosAvaliados > 0 ? formatarNumero(dadosReais.enade.cursosAvaliados) : '23';
            valores[2].textContent = dadosReais.enade.notaMedia > 0 ? dadosReais.enade.notaMedia.toFixed(1) : '62.5';
            valores[3].textContent = dadosReais.enade.cursosConceitoMaximo > 0 ? dadosReais.enade.cursosConceitoMaximo + ' cursos' : '5 cursos';
        }
    }
}

/* grafico evolucao */
function renderizarEvolucao(dados) {
    const ctx = document.getElementById('timelineChart')?.getContext('2d');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js nao carregado. Grafico de evolucao nao renderizado.');
        return;
    }

    const mapa = {};
    dados.forEach(item => {
        const ano = item.Ano;
        const mat = parseFloat(item.Matrículas);
        if (!isNaN(mat) && ano) {
            mapa[ano] = (mapa[ano] || 0) + mat;
        }
    });
    const anos = Object.keys(mapa).map(Number).sort((a, b) => a - b);
    const valores = anos.map(a => mapa[a]);

    if (anos.length === 0) {
        console.warn('Nenhum dado para o grafico de evolucao.');
        return;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [{
                label: 'Matriculas',
                data: valores,
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78,115,223,0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.parsed.y.toLocaleString('pt-BR')
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

/* grafico comparativos */
function renderizarComparativos() {
    const ctx = document.getElementById('comparisonChart')?.getContext('2d');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js nao carregado. Grafico de comparativos nao renderizado.');
        return;
    }

    const top = dadosReais.topCampi || [];
    const labels = top.map(c => c.Nome || c.campus);
    const servidores = top.map(c => c.Total_Servidores || c.servidores || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Servidores',
                data: servidores,
                backgroundColor: '#36b9cc',
                borderColor: '#2c9faf',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.parsed.y.toLocaleString('pt-BR')
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

/* media geral anual */
function renderizarMediaGeralAnual() {
    const canvas = document.getElementById('mediaGeralAnualChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js nao carregado.');
        return;
    }

    const dados = window.dadosEnadeBrutos;
    if (!dados || dados.length === 0) {
        console.warn('Dados do ENADE nao disponiveis para o grafico de media geral.');
        return;
    }

    const anos = [...new Set(dados.map(d => d.ANO_EXAME).filter(a => a && a !== ''))].sort();
    const medias = anos.map(ano => {
        const registros = dados.filter(d => d.ANO_EXAME === ano);
        const notas = registros
            .map(d => parseNota(d.NOTA_GERAL) ?? parseNota(d.NOTA_FORMACAO_GERAL))
            .filter(n => n !== null);
        return notas.length ? notas.reduce((a,b) => a+b, 0) / notas.length : null;
    });

    const labels = anos.map(a => String(a).replace(/\.0$/, ''));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Media Geral',
                data: medias,
                borderColor: '#2c3e50',
                backgroundColor: 'rgba(44,62,80,0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: '#2c3e50',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => 'Media: ' + (ctx.parsed.y?.toFixed(1) || 'N/D')
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

/* radar perfil cursos */
function renderizarRadarPerfilCursos(dadosDiscentes) {
    const canvas = document.getElementById('radarPerfilCursos');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js nao carregado.');
        return;
    }

    if (!dadosDiscentes || dadosDiscentes.length === 0) {
        console.warn('Nenhum dado de discentes disponivel para o radar.');
        return;
    }

    const contagemCursos = {};
    dadosDiscentes.forEach(d => {
        const curso = d['Qual e o seu curso no IFPB?'] ||
                      d['Qual e o seu curso no IFPB? (Exemplo: Tecnico em Informatica, Sistemas para Internet, etc.)'] ||
                      'Desconhecido';
        if (curso && curso !== 'Desconhecido') {
            contagemCursos[curso] = (contagemCursos[curso] || 0) + 1;
        }
    });

    const cursos = Object.entries(contagemCursos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(e => e[0]);

    if (cursos.length === 0) {
        console.warn('Nenhum curso com dados suficientes para o radar.');
        return;
    }

    const metricas = [
        'Trabalha/estagia',
        'Transporte publico',
        'Conhece assistencia',
        'Ja pensou em desistir',
        'Participa de projetos'
    ];

    const cores = ['#387f1c', '#36b9cc', '#f6c23e', '#e74a3b', '#4e73df'];

    const datasets = cursos.map((curso, idx) => {
        const alunosCurso = dadosDiscentes.filter(d => {
            const c = d['Qual e o seu curso no IFPB?'] ||
                      d['Qual e o seu curso no IFPB? (Exemplo: Tecnico em Informatica, Sistemas para Internet, etc.)'] ||
                      '';
            return c === curso;
        });
        const total = alunosCurso.length;
        if (total === 0) return null;

        const valores = metricas.map(metrica => {
            if (metrica === 'Trabalha/estagia') {
                const count = alunosCurso.filter(d => {
                    const val = d['Durante o Ensino Medio, voce trabalha?'] || '';
                    return val && val !== 'Nao, apenas estudo' && val !== '';
                }).length;
                return (count / total) * 100;
            }
            if (metrica === 'Transporte publico') {
                const count = alunosCurso.filter(d => {
                    const val = d['[Se deslocamento] Qual meio de transporte voce utiliza com mais frequencia para esse deslocamento?'] || '';
                    return val === 'Transporte publico (onibus, trem, metro)';
                }).length;
                return (count / total) * 100;
            }
            if (metrica === 'Conhece assistencia') {
                const count = alunosCurso.filter(d => {
                    const val = d['Voce conhece os programas de assistencia estudantil oferecidos pelo IFPB?'] || '';
                    return val === 'Sim, conheco todos' || val === 'Conheco alguns';
                }).length;
                return (count / total) * 100;
            }
            if (metrica === 'Ja pensou em desistir') {
                const count = alunosCurso.filter(d => {
                    const val = d['Voce ja pensou em desistir do curso?'] || '';
                    return val && val !== 'Nunca pensei' && val !== '';
                }).length;
                return (count / total) * 100;
            }
            if (metrica === 'Participa de projetos') {
                const count = alunosCurso.filter(d => {
                    const val = d['Voce participa ou ja participou de algum projeto no IFPB? '] || '';
                    return val && val !== 'Nunca participei' && val !== '';
                }).length;
                return (count / total) * 100;
            }
            return 0;
        });

        let label = curso;
        if (curso.length > 20) label = curso.substring(0, 17) + '…';

        return {
            label: label,
            data: valores,
            backgroundColor: cores[idx % cores.length] + '20',
            borderColor: cores[idx % cores.length],
            borderWidth: 2,
            pointBackgroundColor: cores[idx % cores.length],
            pointBorderColor: '#fff',
            pointRadius: 4
        };
    }).filter(Boolean);

    if (datasets.length === 0) return;

    if (window._radarChart) {
        window._radarChart.destroy();
    }

    try {
        window._radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: metricas,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function(v) { return v + '%'; },
                            font: { size: 9 }
                        },
                        pointLabels: {
                            font: { size: 9, weight: 'bold' }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw.toFixed(1) + '%';
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 9 },
                            usePointStyle: true,
                            boxWidth: 6,
                            padding: 8
                        }
                    }
                }
            }
        });
    } catch (e) {
        console.error('Erro ao criar grafico radar:', e);
    }
}

/* inicializacao */
function atualizarGraficoAnimado() {
    const container = document.querySelector('.chart-animation');
    if (!container) return;
    console.log('Grafico animado mantido estatico.');
}

function atualizarDataAtualizacao() {
    const now = new Date();
    const opts = { day: '2-digit', month: 'long', year: 'numeric' };
    const dataStr = now.toLocaleDateString('pt-BR', opts);
    const statusEl = document.querySelector('.status-indicator:last-child');
    if (statusEl) {
        statusEl.innerHTML = '<i class="fas fa-calendar-alt"></i> Atualizado em ' + dataStr;
    }
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;
    let isOpen = false;
    function toggle(open) {
        isOpen = open;
        btn.classList.toggle('active', open);
        btn.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('open', open);
        nav.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
    }
    btn.addEventListener('click', () => toggle(!isOpen));
    document.addEventListener('click', (e) => {
        if (isOpen && !btn.contains(e.target) && !nav.contains(e.target)) toggle(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) toggle(false);
    });
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 900 && isOpen) toggle(false);
    }, 200));
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-right');
    if (!elements.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach(el => observer.observe(el));
}

function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    const onScroll = debounce(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* dom ready */
document.addEventListener('DOMContentLoaded', async function() {
    console.log('IFPB Data Platform - Inicializando...');

    initMobileMenu();
    initScrollReveal();
    initHeaderScroll();

    try {
        await carregarDadosReais();
        atualizarElementosComDadosReais();
        atualizarDataAtualizacao();
        renderizarMediaGeralAnual();
    } catch (e) {
        console.warn('Erro no carregamento de dados, mas pagina continua funcionando.', e);
        atualizarElementosComDadosReais();
    }

    window.recarregarDados = carregarDadosReais;
});