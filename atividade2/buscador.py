import requests
from bs4 import BeautifulSoup
import requests_cache

requests_cache.install_cache('buscador_cache')

def search(keyword, url, depth):
    if depth < 0:
        return

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith(('http', 'https')):
            links.append(href)
            search(keyword, href, depth-1)

    if keyword.lower() in soup.get_text().lower():
        start = max(soup.get_text().lower().index(keyword.lower()) - 20, 0)
        end = min(soup.get_text().lower().index(keyword.lower()) + 20, len(soup.get_text()))
        print(f"Palavra-chave encontrada em {url}: {soup.get_text()[start:end].strip()}")
        print("")

    termos_relacionados = ['programação', 'linguagens', 'algoritmos']
    relevancia = 0
    referencias = 0

    for link in links:
        if url in link:
            referencias += 1
    if 'blog' in url or 'forum' in url:
        relevancia -= 1
    for termo in termos_relacionados:
        if termo in soup.get_text().lower():
            relevancia += 1

    if relevancia or referencias:
        print(f"Ranking de {url}: relevância = {relevancia}, referências = {referencias}")

search('python', 'https://www.python.org/', 1)
