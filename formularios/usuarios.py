from pymongo import MongoClient

uri = "mongodb://localhost:27017"
cliente = MongoClient(uri)
banco = cliente["biblioteca"]
colecao = banco["usuarios"]

def editar_usuario(email, novos_dados):
    resultado = colecao.update_one({"email": email}, {"$set": novos_dados})
    if resultado.matched_count > 0:
        print("Usuário atualizado com sucesso")
    else:
        print("Usuário não encontrado")

def excluir_usuario(email):
    resultado = colecao.delete_one({"email": email})
    if resultado.deleted_count > 0:
        print("Usuário excluído com sucesso")
    else:
        print("Usuário não encontrado")

editar_usuario("maria@email.com", {"nome": "Maria Silva", "idade": 28})
excluir_usuario("joao@email.com")

cliente.close()
