# database.py
from pymongo import MongoClient


MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "trabalho_carlos_db"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]


usuarios_collection = db["usuarios"]