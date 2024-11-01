const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Khidki na khadkao raja</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
          font-family: Arial, sans-serif;
        }
        button {
          background-color: grey;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: not-allowed;
        }
      </style>
    </head>
    <body>
      <h1>khidki na khadkao raja</h1>
      <button disabled>seedhe andar</button>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
