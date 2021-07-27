const app = require('express')();

app.get('/', (req, res) => 
    res.json({message: "Docker running"})
);

const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log("App listening on http://localhost:8080"))