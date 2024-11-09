import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';


const app = express();
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let html = '';
    const file = await import('./pages/index');
    let data = {}
    const Component = file.default
    if (file.getServerSideProps) {
        const { getServerSideProps } = file;
        const props = await getServerSideProps();
        data = props;
        console.log('props', props);
        html = renderToString(<Component {...props} />);
    }
    res.send(`
        
        <html>
            <body>
                <div id="root">${html}</div>
            </body>
            <script>
                window.__DATA__ = ${JSON.stringify(data)}
            </script>
            <script src="/index.js"></script>
        </html>
    `);
});

app.listen(4000, () => {
    console.log('server is running on port 4000, you can open http://localhost:4000 in your browser');
});