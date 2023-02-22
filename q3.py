import requests
from bs4 import BeautifulSoup

url = 'https://www.leagueoflegends.com/pt-br/'
term = input("term that you wanna find: ")

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
texts = soup.get_text()

qnt = soup.body.findAll(text=lambda text: term in text)

if qnt:
    print(f"Quantidade de vezes do termo: '{term}': ")
    for qt in qnt:
        print(f" {qt}")