import json
from collections import Counter

# ============================================================
# CONFIGURAÇÃO: caminhos dos arquivos JSON
# ============================================================
caminho_discentes = r"H:\HUGO\ProjetoPIBIC\Projeto-PIBIC-Site\ifpb-data-plataform\assets\data\DadosFormularios\dadosDiscentes.json"
caminho_docentes = r"H:\HUGO\ProjetoPIBIC\Projeto-PIBIC-Site\ifpb-data-plataform\assets\data\DadosFormularios\dadosDocentes.json"

# ============================================================
# FUNÇÕES AUXILIARES
# ============================================================
def contar_por_campo(dados, campo):
    """Conta quantos responderam a uma pergunta específica (resposta não vazia)"""
    count = 0
    for item in dados:
        val = item.get(campo, "")
        if val and val != "":
            count += 1
    return count

def contar_individual_contem(dados, campo, palavras_chave):
    """
    Conta respondentes cuja resposta CONTÉM alguma das palavras-chave
    """
    count = 0
    for item in dados:
        val = item.get(campo, "")
        if val and val != "":
            val_lower = val.lower()
            for palavra in palavras_chave:
                if palavra.lower() in val_lower:
                    count += 1
                    break
    return count

def contar_individual_exato(dados, campo, opcoes_validas):
    """Conta respondentes que selecionaram EXATAMENTE uma das opções"""
    count = 0
    for item in dados:
        val = item.get(campo, "")
        if val and val != "":
            if val in opcoes_validas:
                count += 1
    return count

# ============================================================
# NORMALIZAÇÃO DOS DADOS
# ============================================================
def normalizar_dados_discentes(raw):
    dados = []
    for item in raw:
        # Pula registros vazios (sem campus)
        campus = item.get("Em qual campus do IFPB você estuda?", "")
        if not campus or campus == "":
            continue
            
        dados.append({
            'campus': campus,
            'cidade': item.get("Em qual cidade você reside atualmente?", ""),
            'curso': item.get("Qual é o seu curso no IFPB? (Exemplo: Técnico em Informática, Sistemas para Internet, etc.)", "") or item.get("Qual é o seu curso no IFPB?", ""),
            'turno': item.get("Em qual turno você realiza a maior parte das disciplinas do curso?", ""),
            'residencia': item.get("Sobre a cidade onde você estuda:", ""),
            'distancia': item.get("[Se deslocamento] Qual é a distância aproximada (em km) da sua cidade até a cidade onde você estuda?", ""),
            'tempo_deslocamento': item.get("[Se deslocamento] Quanto tempo, em média, você gasta no deslocamento (ida e volta) para frequentar as aulas presenciais ou atividades no polo?", ""),
            'transporte': item.get("[Se deslocamento] Qual meio de transporte você utiliza com mais frequência para esse deslocamento?", ""),
            'trabalha': item.get("Durante o Ensino Médio, você trabalha?", ""),
            'horas_estudo': item.get("Quantas horas por dia você dedica aos estudos (fora da sala de aula)?", ""),
            'impacto': item.get("Como você avalia o impacto de trabalhar e estudar (se for o caso) no seu desempenho acadêmico?", ""),
            'conhece_assistencia': item.get("Você conhece os programas de assistência estudantil oferecidos pelo IFPB?", ""),
            'auxilios': item.get("Você já recebeu ou recebe algum dos seguintes auxílios/benefícios do IFPB? ", ""),
            'importancia_auxilio': item.get("[Se recebe algum auxílio] Como você avalia a importância do auxílio para sua permanência no curso?", ""),
            'participa_projetos': item.get("Você participa ou já participou de algum projeto no IFPB? ", ""),
            'motivo_participacao': item.get("[Se participa de projeto] Qual o principal motivo que levou você a participar de projetos?", ""),
            'motivo_nao_participar': item.get("[Se NÃO participa de projetos] Qual o principal motivo para não participar?", ""),
            'pensou_desistir': item.get("Você já pensou em desistir do curso?", ""),
            'motivo_desistencia': item.get("[Se já pensou em desistir] Qual o principal motivo? ", "")
        })
    return dados

def normalizar_dados_docentes(raw):
    dados = []
    for item in raw:
        campus = item.get("Em qual campus do IFPB você está lotado atualmente?", "")
        if not campus or campus == "":
            continue
            
        dados.append({
            'campus': campus,
            'area': item.get("Qual a sua área de formação/atuação principal?", ""),
            'tempo_docencia': item.get("Há quanto tempo você é docente no IFPB?", ""),
            'regime': item.get("Qual o seu regime de trabalho? ", ""),
            'titulacao': item.get("Qual a sua titulação máxima?", ""),
            'nivel_ensino': item.get("Qual é o principal nível de ensino em que você atua atualmente? (Selecione apenas uma opção)", ""),
            'turmas': item.get("Quantas turmas você leciona atualmente?", ""),
            'horas_ensino': item.get("Em média, quantas horas semanais você dedica às atividades de ensino (preparação de aulas, correção, atendimento a alunos)?", ""),
            'pesquisa': item.get("Você atua/atuou como pesquisador em projetos no IFPB?", ""),
            'qtd_projetos': item.get("[Se atua em pesquisa] Quantos projetos de pesquisa você está envolvido ou já se envolveu no IFPB?", ""),
            'fonte_fomento': item.get("Quais as principais fontes de fomento dos seus projetos?   (Selecione apenas uma opção)", ""),
            'motivo_nao_pesquisa': item.get("[Se NÃO atua em pesquisa] Qual o principal motivo para não atuar em pesquisa?", ""),
            'cargo_adm': item.get("Você exerce ou já exerceu algum cargo/função administrativa no IFPB?", ""),
            'funcao_adm': item.get("[Se sim] Qual(is) função(ões)? (Selecione apenas uma opção)", ""),
            'horas_gestao': item.get("Quantas horas semanais você dedica às atividades de gestão (se aplicável)?", ""),
            'infra_ensino': item.get("Como você avalia a infraestrutura do seu campus para o desenvolvimento das atividades de ensino?", ""),
            'infra_pesquisa': item.get("Como você avalia a infraestrutura para pesquisa no seu campus?", ""),
            'acesso_recursos': item.get("Você possui acesso aos recursos necessários para sua atuação (laboratórios, equipamentos, biblioteca, etc.)?", ""),
            'residencia': item.get("Em relação à sua residência e local de trabalho:", ""),
            'distancia': item.get(" [Se deslocamento] Qual a distância aproximada (em km) da sua cidade até o campus onde trabalha?", ""),
            'tempo_deslocamento': item.get("[Se deslocamento] Quanto tempo, em média, você gasta no deslocamento (ida e volta) por dia?", ""),
            'satisfacao': item.get("Qual seu nível de satisfação com o trabalho no IFPB?", ""),
            'mudar_instituicao': item.get("Você considera mudar de instituição de ensino nos próximos 5 anos?", ""),
            'reconhecimento': item.get("Como você avalia o reconhecimento do seu trabalho pela gestão do campus?", ""),
            'relacionamento_alunos': item.get("Como você avalia o relacionamento com os alunos de maneira geral?", ""),
            'deixar_carreira': item.get("Você considera deixar a carreira docente nos próximos 5 anos?", "")
        })
    return dados

# ============================================================
# CARREGAR DADOS DOS DISCENTES
# ============================================================
print("=" * 70)
print("ANÁLISE DOS FORMULÁRIOS - DISCENTES")
print("=" * 70)

try:
    with open(caminho_discentes, 'r', encoding='utf-8') as f:
        raw_discentes = json.load(f)
    
    dados_discentes = normalizar_dados_discentes(raw_discentes)
    total_discentes = len(dados_discentes)
    
    print(f"Total de respostas válidas de discentes: {total_discentes}")
    print()
    
    # ============ INDICADORES DO TEXTO ============
    
    # 1. TRABALHA OU ESTAGIA (57,7% dos que responderam)
    total_responderam_trabalho = contar_por_campo(dados_discentes, 'trabalha')
    trabalha = contar_individual_contem(dados_discentes, 'trabalha', 
                                       ["trabalho", "estágio", "estagio", "jovem aprendiz", "ajudo", "Sim"])
    
    print("1. SITUAÇÃO DE TRABALHO")
    print(f"   Total que responderam à pergunta: {total_responderam_trabalho}")
    print(f"   Trabalha ou estagia: {trabalha} ({trabalha/total_responderam_trabalho*100:.1f}% dos que responderam)")
    print(f"   Trabalha ou estagia: {trabalha} ({trabalha/total_discentes*100:.1f}% do total de discentes)")
    print()
    
    # 2. TRANSPORTE PÚBLICO (48,7% dos que responderam)
    total_responderam_transporte = contar_por_campo(dados_discentes, 'transporte')
    transporte = contar_individual_contem(dados_discentes, 'transporte',
                                         ["ônibus", "onibus", "público", "publico", "metrô", "metro", "trem"])
    
    print("2. MEIO DE TRANSPORTE")
    print(f"   Total que responderam à pergunta: {total_responderam_transporte}")
    print(f"   Utiliza transporte público: {transporte} ({transporte/total_responderam_transporte*100:.1f}% dos que responderam)")
    print(f"   Utiliza transporte público: {transporte} ({transporte/total_discentes*100:.1f}% do total de discentes)")
    print()
    
    # 3. CONHECE ASSISTÊNCIA (71,8% dos que responderam)
    total_responderam_assistencia = contar_por_campo(dados_discentes, 'conhece_assistencia')
    conhece = contar_individual_contem(dados_discentes, 'conhece_assistencia',
                                      ["Sim", "conheço", "conheco", "Já ouvi"])
    
    print("3. CONHECIMENTO SOBRE ASSISTÊNCIA ESTUDANTIL")
    print(f"   Total que responderam à pergunta: {total_responderam_assistencia}")
    print(f"   Conhece os programas: {conhece} ({conhece/total_responderam_assistencia*100:.1f}% dos que responderam)")
    print(f"   Conhece os programas: {conhece} ({conhece/total_discentes*100:.1f}% do total de discentes)")
    print()
    
    # 4. JÁ PENSOU EM DESISTIR (41,0% dos que responderam)
    total_responderam_desistir = contar_por_campo(dados_discentes, 'pensou_desistir')
    pensou = contar_individual_contem(dados_discentes, 'pensou_desistir',
                                     ["Já", "Sim", "pensei", "frequência", "frequencia", "considerando"])
    
    print("4. INTENÇÃO DE DESISTÊNCIA")
    print(f"   Total que responderam à pergunta: {total_responderam_desistir}")
    print(f"   Já pensou em desistir: {pensou} ({pensou/total_responderam_desistir*100:.1f}% dos que responderam)")
    print(f"   Já pensou em desistir: {pensou} ({pensou/total_discentes*100:.1f}% do total de discentes)")
    
    # Cruzamento: trabalho × desistência (57,7% dos que trabalham pensaram em desistir)
    trabalha_e_pensou = 0
    for item in dados_discentes:
        if item.get('trabalha', '') and item.get('trabalha', '') != "Não, apenas estudo":
            if item.get('pensou_desistir', '') and item.get('pensou_desistir', '') != "Nunca pensei":
                trabalha_e_pensou += 1
    
    print(f"   Cruzamento (trabalha ∩ já pensou em desistir): {trabalha_e_pensou} ({trabalha_e_pensou/trabalha*100:.1f}% dos que trabalham)")
    print()
    
    # 5. PARTICIPA DE PROJETOS
    total_responderam_projetos = contar_por_campo(dados_discentes, 'participa_projetos')
    participa = contar_individual_contem(dados_discentes, 'participa_projetos',
                                        ["Sim", "participei", "participo", "Já", "Programa", "Projeto"])
    
    print("5. PARTICIPAÇÃO EM PROJETOS")
    print(f"   Total que responderam à pergunta: {total_responderam_projetos}")
    print(f"   Participa ou já participou: {participa} ({participa/total_responderam_projetos*100:.1f}% dos que responderam)")
    print(f"   Participa ou já participou: {participa} ({participa/total_discentes*100:.1f}% do total de discentes)")
    
except FileNotFoundError:
    print("❌ Arquivo de discentes não encontrado!")
except Exception as e:
    print(f"❌ Erro ao processar dados dos discentes: {e}")

# ============================================================
# CARREGAR DADOS DOS DOCENTES
# ============================================================
print()
print("=" * 70)
print("ANÁLISE DOS FORMULÁRIOS - DOCENTES")
print("=" * 70)

try:
    with open(caminho_docentes, 'r', encoding='utf-8') as f:
        raw_docentes = json.load(f)
    
    dados_docentes = normalizar_dados_docentes(raw_docentes)
    total_docentes = len(dados_docentes)
    
    print(f"Total de respostas válidas de docentes: {total_docentes}")
    print()
    
    # ============ INDICADORES DO TEXTO ============
    
    # 1. TITULAÇÃO
    doutores = contar_individual_contem(dados_docentes, 'titulacao', ["Doutorado", "Doutor"])
    mestres = contar_individual_contem(dados_docentes, 'titulacao', ["Mestrado", "Mestre"])
    
    print("1. TITULAÇÃO")
    print(f"   Doutores: {doutores} ({doutores/total_docentes*100:.1f}%)")
    print(f"   Mestres: {mestres} ({mestres/total_docentes*100:.1f}%)")
    print()
    
    # 2. ATUAÇÃO EM PESQUISA
    atua_pesquisa = contar_individual_contem(dados_docentes, 'pesquisa',
                                            ["coordeno", "colaborador", "pesquisador", "atuo"])
    
    print("2. ATUAÇÃO EM PESQUISA")
    print(f"   Atua ou já atuou em pesquisa: {atua_pesquisa} ({atua_pesquisa/total_docentes*100:.1f}%)")
    print()
    
    # 3. INFRAESTRUTURA PARA ENSINO (63,6% dos que responderam)
    total_responderam_infra_ensino = contar_por_campo(dados_docentes, 'infra_ensino')
    boa_otima_ensino = contar_individual_contem(dados_docentes, 'infra_ensino',
                                               ["Boa", "Ótima", "Otima"])
    
    print("3. INFRAESTRUTURA PARA ENSINO")
    print(f"   Total que responderam à pergunta: {total_responderam_infra_ensino}")
    print(f"   Avaliam como boa ou ótima: {boa_otima_ensino} ({boa_otima_ensino/total_responderam_infra_ensino*100:.1f}% dos que responderam)")
    print(f"   Avaliam como boa ou ótima: {boa_otima_ensino} ({boa_otima_ensino/total_docentes*100:.1f}% do total de docentes)")
    print()
    
    # 4. INFRAESTRUTURA PARA PESQUISA (45,5% dos que responderam)
    total_responderam_infra_pesquisa = contar_por_campo(dados_docentes, 'infra_pesquisa')
    boa_otima_pesquisa = contar_individual_contem(dados_docentes, 'infra_pesquisa',
                                                 ["Boa", "Ótima", "Otima"])
    
    print("4. INFRAESTRUTURA PARA PESQUISA")
    print(f"   Total que responderam à pergunta: {total_responderam_infra_pesquisa}")
    print(f"   Avaliam como boa ou ótima: {boa_otima_pesquisa} ({boa_otima_pesquisa/total_responderam_infra_pesquisa*100:.1f}% dos que responderam)")
    print(f"   Avaliam como boa ou ótima: {boa_otima_pesquisa} ({boa_otima_pesquisa/total_docentes*100:.1f}% do total de docentes)")
    print()
    
    # 5. SATISFAÇÃO
    satisfeitos = contar_individual_contem(dados_docentes, 'satisfacao',
                                          ["Satisfeito", "Muito satisfeito"])
    
    print("5. SATISFAÇÃO COM O TRABALHO")
    print(f"   Satisfeitos ou muito satisfeitos: {satisfeitos} ({satisfeitos/total_docentes*100:.1f}%)")
    print()
    
    # 6. INTENÇÃO DE DEIXAR A CARREIRA (36,4% dos que responderam)
    total_responderam_deixar = contar_por_campo(dados_docentes, 'deixar_carreira')
    considera_deixar = contar_individual_contem(dados_docentes, 'deixar_carreira',
                                               ["Sim", "Talvez", "avaliando"])
    
    print("6. INTENÇÃO DE DEIXAR A CARREIRA")
    print(f"   Total que responderam à pergunta: {total_responderam_deixar}")
    print(f"   Considera deixar a carreira: {considera_deixar} ({considera_deixar/total_responderam_deixar*100:.1f}% dos que responderam)")
    print(f"   Considera deixar a carreira: {considera_deixar} ({considera_deixar/total_docentes*100:.1f}% do total de docentes)")

except FileNotFoundError:
    print("❌ Arquivo de docentes não encontrado!")
except Exception as e:
    print(f"❌ Erro ao processar dados dos docentes: {e}")

print()
print("=" * 70)
print("FIM DA ANÁLISE")
print("=" * 70)