import requests 
import requests_cache
requests_cache.install_cache('my_cache')
from bs4 import BeautifulSoup

def search(key, url, depth):
    response = requests.get(url)
    resultado = []

    soup = BeautifulSoup(response.content, 'html.parser')
    texto = soup.get_text(strip=True)
    i = texto.find(key)
    if i != -1:
        start = max(i-20, 0)
        end = min(i+20+len(key), len(texto))
        resultado.append(texto[start:end].strip())

    if depth > 0:
        links = soup.find_all("a")
        for link in links:
            url = link.get("href")
            if url.startswith('http'):
                resultado += search(key, url, depth-1)
    return resultado

key = 'python'
url = 'https://realpython.com/'
depth = 3

resultados = search(key, url, depth)
for resultado in resultados:
    print(resultado.strip())
