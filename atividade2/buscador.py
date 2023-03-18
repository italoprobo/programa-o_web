from bs4 import BeautifulSoup
import requests
import requests_cache

requests_cache.install_cache('search_cache')

pages = {}
pages_visited = set()

def search(keyword, url, depth):
    if url in pages_visited:
        return

    pages_visited.add(url)
    response = requests.get(url)
    print("Buscando: ", url)

    soup = BeautifulSoup(response.content, 'html.parser')
    texto = soup.get_text()

    if keyword in texto:
        start_index = max(0, texto.index(keyword) - 20)
        end_index = min(len(texto), texto.index(keyword) + 20)
        text_snippet = texto[start_index:end_index].strip()
        print(text_snippet.strip())

        if url not in pages:
            pages[url] = 0

        pages[url] += 1

    if depth > 0:
        html = BeautifulSoup(response.text, 'html.parser')
        links = html.find_all('a')

        for link in links:
            if link.has_attr('href') and not link['href'].startswith('#') and not link['href'].startswith('javascript:'):
                link_url = link['href']
                if not link_url.startswith('http'):
                    link_url = url + '/' + link_url.lstrip('/')

                search(keyword, link_url, depth - 1)

                if link_url in pages:
                    pages[link_url] += 1

def calculate_score(page, keyword, links):
    refs = 0
    for link in links:
        if page in link:
            refs += 1
    score = refs

    title = get_title(page)
    description = get_description(page)
    if keyword in title or keyword in description:
        score *= 2 

    depth = len(page.split('/')) - len(url.split('/'))
    if depth == 0:
        score *= 5  
    elif depth == 1:
        score *= 3  
    else:
        score /= depth  

    return score

def show_results():
    count = 0
    sorted_pages = sorted(pages, key=lambda x: calculate_score(x, keyword, links), reverse=True)

    for page in sorted_pages:
        count += 1
        print(count, page)
        print("Score:", calculate_score(page, keyword, links))

def get_title(page):
    html = BeautifulSoup(requests.get(page).text, 'html5lib')
    return html.title.string if html.title else ''

def get_description(page):
    html = BeautifulSoup(requests.get(page).text, 'html5lib')
    description = html.find('meta', attrs={'name': 'description'})
    return description['content'] if description else ''

keyword = 'python'
url = 'https://www.python.org/'
depth = 1

search(keyword, url, depth)
links = list(pages.keys())

show_results()
