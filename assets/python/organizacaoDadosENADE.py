import json

with open('dadosENADE.json', 'r', encoding='utf-8') as f:
    dados_estudante = json.load(f)

with open('dadosCodigoIfpb.json', 'r', encoding='utf-8') as f:
    dados_cursos = json.load(f)

lookup = {}
for linha in dados_cursos:
    ano = str(linha['NU_ANO']).replace('.0', '')
    curso = str(linha['CO_CURSO']).replace('.0', '')
    key = f"{ano}_{curso}"
    lookup[key] = linha

campos_institucionais = [
    'CO_IES', 'CO_CATEGAD', 'CO_ORGACAD', 'CO_GRUPO',
    'CO_MODALIDADE', 'CO_MUNIC_CURSO', 'CO_UF_CURSO', 'CO_REGIAO_CURSO'
]

for registro in dados_estudante:
    ano = str(registro['ANO_EXAME']).replace('.0', '')
    curso = str(registro['CODIGO_CURSO']).replace('.0', '')
    key = f"{ano}_{curso}"
    if key in lookup:
        info = lookup[key]
        for campo in campos_institucionais:
            registro[campo] = info.get(campo, '')
    else:
        for campo in campos_institucionais:
            registro[campo] = ''

with open('DADOSENADEGERAL.json', 'w', encoding='utf-8') as f:
    json.dump(dados_estudante, f, ensure_ascii=False, indent=2)

print(f"Arquivo enriquecido gerado com {len(dados_estudante)} registros.")