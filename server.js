let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/front-asesorias'));

app.get('/*', (req, res) =>{
    res.sendFile(__dirname+'/dist/front-asesorias/index.html');
});

app.listen(process.env.PORT || 8080);
