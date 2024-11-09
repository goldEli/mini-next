import React from 'react';
import { hydrateRoot } from 'react-dom/client';

// ssr 模式 会渲染两次
// const root = createRoot(document.getElementById('root'));

// root.render(<App />);

// 使用 hydrateRoot 进行水合 会复用服务端渲染的 html
const { page, props } = window.__DATA__;
const importFile = async (page) => {
    const file = await import(`./pages/${page}`);
    return file;
}
const data = await importFile(page);
const Component = data.default;
hydrateRoot(document.getElementById('root'), <Component {...props} />);
