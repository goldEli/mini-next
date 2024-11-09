import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.static("public"));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const pagesDir = path.join(process.cwd(), "/pages");
const pages = fs.readdirSync(pagesDir).map((page) => page.split(".")[0]);

const expiresTime = 1000 * 10;

async function build() {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }

  await asyncForEach(pages, async (page) => {
    const file = await import(`./pages/${page}`);
    const Component = file.default;

    let content = "";
    const data = {
      props: {},
      page,
    };
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
                <script src="/index.js"></script>
            </body>
        </html>
    `;

    fs.writeFileSync(`./output/${page}.html`, html);
  });
}



app.get(/.*$/, async (req, res) => {
    const pathname = req.path.split('/')[1];
    const page = pathname ? pathname : 'index';

    if (!pages.includes(page)) {
        return res.status(404).send(`${page} 404 Not Found`);
    }

    const htmlPath = path.join(process.cwd(), `./output/${page}.html`);

    fs.stat(htmlPath, async (err, stats) => {
        if (err) {
            await build();
            return res.sendFile(htmlPath);
        }
        if (Date.now() - stats.mtime.getTime() > expiresTime) {
            await build();
        }
        return res.sendFile(htmlPath);
    });

});

app.listen(4000, () => {
    console.log('server is running on port 4000, you can open http://localhost:4000 in your browser');
});
