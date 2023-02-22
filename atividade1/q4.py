import requests

response = requests.get("https://www.leagueoflegends.com/static/assassin-d64d3ffdda15e1eed637aefe6a2c7fee.png")
with open('akali.png', 'wb') as f:
    f.write(response.content)
