const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000); 

app.get('/', (req, res) => {
    res.send('Hello World');  
  });


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});
