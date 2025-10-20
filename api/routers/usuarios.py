from fastapi import APIRouter, HTTPException, status
from typing import List
from ..models import UsuarioCreate, UsuarioUpdate, UsuarioOut, UsuarioLogin

@router.put("/{username}", response_model=UsuarioOut)
def update_user(username: str, usuario_data: UsuarioUpdate):
    
    dados_atualizados = usuario_data.model_dump(exclude_none=True)

    if "username" in dados_atualizados:
        del dados_atualizados["username"]
        
    if not dados_atualizados:
        raise HTTPException(status_code=400, detail="Nenhum campo fornecido para atualização.")
        
    resultado = usuarios_collection.update_one(
        {"username": username},
        {"$set": dados_atualizados}
    )
    
    if resultado.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"Usuário '{username}' não encontrado")
    
    usuario_atualizado = usuarios_collection.find_one({"username": username})
    
    return serialize_usuario(usuario_atualizado)


@router.delete("/{username}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(username: str):
    

    resultado = usuarios_collection.delete_one({"username": username})
    
    if resultado.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Usuário '{username}' não encontrado")
        
    return
