var assert = require("assert");
var http = require("http");

describe("Testar criação do usuário", function(){

  it("Criar usuario teste 1", function(done){

    var data = {
      nome:"Gabriel Mendonca",
      email:"gabrielmendoncanf@gmail.com",
      senha: "123456",
      telefones:[
        {
          numero: "2227983345",
          ddd: "22"
        },
        {
          numero: "998234433",
          ddd: "21"
        }
      ]
    };

    var content = JSON.stringify(data)

    const options = {
      'hostname': 'localhost',
      'port': 3000,
      'method': 'POST',
      'path': 'localhost:3000/signup',
      'headers': {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {

      console.log(res);
      assert.equal(res.statusCode, 200);
      done();

    });    

    req.write(content);
    req.end();

  });

});

