import pandas as pd

# Charger le fichier CSV
data = pd.read_csv('data.csv', delimiter='\t')

# Enlever le signe € et convertir les prix en nombres décimaux
data['pricen'] = data['price'].str.replace('€', '').str.replace(',', '.').astype(float)

# Définir le taux de change entre l'euro et le CFA
taux_de_change = 655.957  # Remplacez cette valeur par le taux de change réel

# Convertir les prix en euros en CFA
data['prix_en_CFA'] = data['pricen'] * taux_de_change

# Enlever la colonne de prix en euros
data = data.drop('price', axis=1)

# Enregistrer le fichier CSV avec les prix en CFA
data.to_csv('dat.csv', index=False, sep='\t')
