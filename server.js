const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'index')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'index.js'));
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
