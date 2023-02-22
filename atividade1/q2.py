import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.leagueoflegends.com/pt-br/')
soup = BeautifulSoup(response.text, 'html.parser')

tag = input("Type a tag to show: ")
see = soup.find(tag)
print(see)
