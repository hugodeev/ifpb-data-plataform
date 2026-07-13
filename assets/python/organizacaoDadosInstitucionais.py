import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))         
projeto_root = os.path.dirname(os.path.dirname(script_dir))    

pasta_dados = os.path.join(projeto_root, "assets", "data", "Dadosinstitucionais")

if not os.path.exists(pasta_dados):
    print(f"ERRO: A pasta '{pasta_dados}' não existe!")
    print("Verifique a estrutura de pastas.")
    exit(1)

print("Arquivos encontrados na pasta Dadosinstitucionais:")
for arquivo in os.listdir(pasta_dados):
    print(f"  - {arquivo}")
print()

arquivo_principal = os.path.join(pasta_dados, "ListaCompletaCampiIFPB.json")  
arquivo_metadados = os.path.join(pasta_dados, "AnoCriaçãoAreaFísica.json")  
arquivo_saida = os.path.join(pasta_dados, "dadosInstitucionais.json")

if not os.path.exists(arquivo_principal):
    print(f"ERRO: Arquivo não encontrado: {arquivo_principal}")
    exit(1)
if not os.path.exists(arquivo_metadados):
    print(f"ERRO: Arquivo não encontrado: {arquivo_metadados}")
    exit(1)

with open(arquivo_principal, "r", encoding="utf-8") as f:
    dados_principais = json.load(f)

with open(arquivo_metadados, "r", encoding="utf-8") as f:
    dados_metadados = json.load(f)

metadados_dict = {}
for item in dados_metadados:
    chave = item["Campi"].strip()
    metadados_dict[chave] = {
        "Ano": item["Ano"].strip(),
        "Área física (m²)": item["Área física (m²)"].strip(),
        "Situação": item["Situação"].strip()
    }

resultado = []
for campus in dados_principais:
    nome = campus["Nome"].strip()
    meta = metadados_dict.get(nome, {})
    novo_campus = {
        **campus,
        "Ano": meta.get("Ano"),
        "Área física (m²)": meta.get("Área física (m²)"),
        "Situação": meta.get("Situação")
    }
    resultado.append(novo_campus)

with open(arquivo_saida, "w", encoding="utf-8") as f:
    json.dump(resultado, f, ensure_ascii=False, indent=2)

print(f"Arquivo salvo com sucesso em: {arquivo_saida}")
print(f"Total de registros: {len(resultado)}")