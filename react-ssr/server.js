import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './pages/index';

const html = renderToString(<App />);

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
        
        <html>
            <body>
                <div id="root">${html}</div>
            </body>
            <script src="/index.js"></script>
        </html>
    `);
});

app.listen(4000, () => {
    console.log('server is running on port 4000, you can open http://localhost:4000 in your browser');
});