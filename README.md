# cs desafio node

O objetivo do desafio era criar um webservice com as opções de: 
- cadastro do usuário (signup)
- login do usuário (signin)
- busca pelo usuário 

As urls para as chamadas a api seguiram o seguinte padrão:

POST /signup - passando no body o padrão json especificado

POST /signin - passando no body o objeto com email e senha

GET /user - passando o token com o header authentication

