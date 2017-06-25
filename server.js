var app = require("./src/app");

app.listen(process.env.PORT, (req, res) => {
  console.log('Servidor iniciado');
});