import requests


parametro = {
    "q": input("Digite sua busca: ")
}

response = requests.get('https://www.google.com/search', params=parametro)

print(response.text)