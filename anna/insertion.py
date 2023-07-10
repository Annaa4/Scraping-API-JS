import json
import psycopg2
with open('dakardiscount.json') as file:
    data = json.load(file)
# connexion la connexion à la base de données
conn = psycopg2.connect(database="data-api", user="anna", password="12345678", host="postgresql-134127-0.cloudclusters.net", port="19529")

# Créer un curseur pour exécuter des requêtes
cur = conn.cursor()

# Parcourir les données JSON et insérer chaque enregistrement dans la table
for item in data:
    name = item['name']
    price = item['price']
    img = item['img']
    
    # Exécuter la requête d'insertion
    cur.execute("INSERT INTO equipements (name, price, img) VALUES (%s, %s, %s)", (name, price, img))

# Valider les changements et fermer la connexion
conn.commit()
cur.close()
conn.close()
