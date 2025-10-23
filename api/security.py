from passlib.context import CryptContext

# Define o contexto de hash, usando bcrypt como algoritmo padrão
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    

    safe_password = password[:72] 
    return pwd_context.hash(safe_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
 
    safe_plain_password = plain_password[:72]
    return pwd_context.verify(safe_plain_password, hashed_password)