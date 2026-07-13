import os
import json
from collections import defaultdict

script_dir = os.path.dirname(os.path.abspath(__file__))       
projeto_root = os.path.dirname(os.path.dirname(script_dir))    

caminho_matriculas = os.path.join(projeto_root, "assets", "data", "EstruturaAdministrativa", "DadosMatriculasDiscentes.json")
caminho_servidores = os.path.join(projeto_root, "assets", "data", "EstruturaAdministrativa", "DadosDocentesIFS.json")

if not os.path.exists(caminho_matriculas):
    print(f"ERRO: Arquivo de matrículas não encontrado em:\n  {caminho_matriculas}")
    exit(1)

if not os.path.exists(caminho_servidores):
    print(f"ERRO: Arquivo de servidores não encontrado em:\n  {caminho_servidores}")
    exit(1)

with open(caminho_matriculas, "r", encoding="utf-8") as f:
    dados_matriculas = json.load(f)

with open(caminho_servidores, "r", encoding="utf-8") as f:
    dados_servidores = json.load(f)

print(f"Matrículas: {len(dados_matriculas)} registros carregados.")
print(f"Servidores: {len(dados_servidores)} registros carregados.")

servidores_dict = {}
for item in dados_servidores:
    campus = item["Estrutura"]
    servidores_dict[campus] = {
        "Total de Servidores": item.get("Total de Servidores"),
        "TAEs": item.get("TAEs"),
        "Docentes": item.get("Docentes"),
        "Docentes Efetivos": item.get("Docentes Efetivos"),
        "ITCD": item.get("ITCD")
    }

resultado = []

for item in dados_matriculas:
    campus = item["Estrutura com Matrícula"]
    ano = item["Ano"]
    valor = item["Matrículas"]

    if valor == "(Em branco)":
        valor = None
    else:
        try:
            valor = int(valor)
        except:
            pass 

    serv = servidores_dict.get(campus, {})

    linha = {
        "Instituição": "IFPB",
        "Estrutura": campus,
        "Total de Servidores": serv.get("Total de Servidores"),
        "TAEs": serv.get("TAEs"),
        "Docentes": serv.get("Docentes"),
        "Docentes Efetivos": serv.get("Docentes Efetivos"),
        "ITCD": serv.get("ITCD"),
        "Ano": ano,
        "Matrículas": valor
    }
    resultado.append(linha)

resultado.sort(key=lambda x: (x["Estrutura"], x["Ano"] if isinstance(x["Ano"], int) else 0))

pasta_saida = os.path.dirname(caminho_servidores) 
arquivo_saida = os.path.join(pasta_saida, "dadosAdministrativos.json")

with open(arquivo_saida, "w", encoding="utf-8") as f:
    json.dump(resultado, f, ensure_ascii=False, indent=2)

print(f"Tabela gerada com {len(resultado)} linhas.")
print(f"Arquivo salvo em: {arquivo_saida}")

# Mostra um exemplo
if resultado:
    print("\nExemplo da primeira linha:")
    print(json.dumps(resultado[0], ensure_ascii=False, indent=2))