import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.static('public'));

const pagesDir = path.join(process.cwd(), '/pages');
const pages = fs.readdirSync(pagesDir).map(page => page.split('.')[0]);

if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

pages.forEach(async page => {
    const file = await import(`./pages/${page}`);
    const Component = file.default;

    let content = '';
    const data = {
        props: {},
        page
    }
    if (file.getServerSideProps) {
        const { getServerSideProps } = file;
        const props = await getServerSideProps();
        data.props = props;
        content = renderToString(<Component {...props} />);
    }

    const html = `
        <html>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__DATA__ = ${JSON.stringify(data)}
                </script>
                <script src="../public/index.js"></script>
            </body>
        </html>
    `;

    fs.writeFileSync(`./output/${page}.html`, html);
});

// app.get(/.*$/, async (req, res) => {
//     const pathname = req.path.split('/')[1];
//     const page = pathname ? pathname : 'index';

//     if (!pages.includes(page)) {
//         return res.status(404).send(`${page} 404 Not Found`);
//     }

//     let html = '';
//     const file = await import(`./pages/${page}`);
//     const data = {
//         props: {},
//         page
//     }
//     const Component = file.default
//     if (file.getServerSideProps) {
//         const { getServerSideProps } = file;
//         const props = await getServerSideProps({ query: req.query });
//         data.props = props;
//         console.log('props', props);
//         html = renderToString(<Component {...props} />);
//     }
//     res.send(`
        
//         <html>
//             <body>
//                 <div id="root">${html}</div>
//             </body>
//             <script>
//                 window.__DATA__ = ${JSON.stringify(data)}
//             </script>
//             <script src="/index.js"></script>
//         </html>
//     `);
// });

// app.listen(4000, () => {
//     console.log('server is running on port 4000, you can open http://localhost:4000 in your browser');
// });