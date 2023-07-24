import json
import psycopg2
with open('Scraping-API-JS/data_mode.json') as file:
    data = json.load(file)
# connexion la connexion à la base de données
conn = psycopg2.connect(database="data_api", user="anna", password="12345678", host="postgresql-136064-0.cloudclusters.net", port="19824")

# Créer un curseur pour exécuter des requêtes
cur = conn.cursor()

# Parcourir les données JSON et insérer chaque enregistrement dans la table
for item in data:
    name = item['name']
    price = item['price']
    img = item['img']
    
    # Exécuter la requête d'insertion
    cur.execute("INSERT INTO mode (name, price, img) VALUES (%s, %s, %s)", (name, price, img))

# Valider les changements et fermer la connexion
conn.commit()
cur.close()
conn.close()
