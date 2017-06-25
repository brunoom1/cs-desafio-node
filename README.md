# cs desafio node

O objetivo do desafio era criar um webservice com as opções de: 
- cadastro do usuário (signup)
- login do usuário (signin)
- busca pelo usuário 

As urls para as chamadas a api seguiram o seguinte padrão:

POST /signup - Cadastra um novo usuário e no caso de tudo ok, retorna o objeto usuário com o token de acesso

Ex: 

```
POST /signup HTTP/1.1
Host: csdnode.herokuapp.com
Content-Type: application/json
Cache-Control: no-cache

{
	"nome":"Gabriel Mendonca",
	"email":"gabrielmendoncanf@gmail.com",
	"senha": "123456",
	"telefones":[
		{
			"numero": "2227983345",
			"ddd": "22"
		},
		{
			"numero": "998234433",
			"ddd": "21"
		}
	]
}
```

POST /signin - loga com o usuário e recebe o token de acesso

```
POST /signin HTTP/1.1
Host: csdnode.herokuapp.com
Content-Type: application/json
Cache-Control: no-cache

{
	"email":"gabrielmendoncanf@gmail.com",
	"senha": "123456"
}
```

GET /users - buscando o usuário com o token de acesso

```
GET /users HTTP/1.1
Host: csdnode.herokuapp.com
Content-Type: application/json
Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1ZjM2NWMwLTU5NTUtMTFlNy05MmM0LWU1YzE1YjJiMDQwNSIsIm5vbWUiOiJHYWJyaWVsIE1lbmRvbmNhIiwiZW1haWwiOiJnYWJyaWVsbWVuZG9uY2FuZkBnbWFpbC5jb20iLCJpYXQiOjE0OTgzNjEzNTQsImV4cCI6MTQ5ODM2MzE1NH0.BHfxApw0e3G_TNtJR_4hCLpt8_VMDXaqDv53HfJkb-c
Cache-Control: no-cache
```

