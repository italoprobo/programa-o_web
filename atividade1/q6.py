import requests
from bs4 import BeautifulSoup

response = requests.get("https://www.meutimao.com.br/tabela-de-classificacao/campeonato_brasileiro/")
soup = BeautifulSoup(response.text, "html.parser")

table = soup.find('table', {'class':'classificacao_campeonato campeonato_brasileiro'})

tbody = table.find('tbody')

for tr in tbody.find_all('tr'):
    posicao = tr.find('th', {'class':'posicao'}).text.strip()
    nome = tr.find('th', {'class':'nome-comum'}).text.strip()
    pontos = tr.find('td', {'class':'pg'}).text.strip()
    print("Nome:",nome)
    print("Posição:",posicao)
    print('Pontos:', pontos)
    print("")
