import requests
from bs4 import BeautifulSoup
import requests_cache

requests_cache.install_cache('buscador_cache')

def search(keyword, url, depth, ranking):
    if depth < 0:
        return

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith(('http', 'https')):
            links.append(href)
            search(keyword, href, depth-1, ranking)

    page_text = soup.get_text().lower()
    keyword_index = page_text.find(keyword.lower())
    if keyword_index != -1:
        start = max(keyword_index - 20, 0)
        end = min(keyword_index + 20, len(page_text))
        context = page_text[start:end].strip()
        print(f"Palavra-chave encontrada em {url}: {context}")
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
        ranking.append((url, relevancia, referencias))

ranking = []
search('python', 'https://www.python.org/', 1, ranking)

ranking.sort(key=lambda x: (x[1], x[2]), reverse=True)
for i, (url, relevancia, referencias) in enumerate(ranking):
    print(f"{i+1}. Ranking de {url}: relevância = {relevancia}, referências = {referencias}")

