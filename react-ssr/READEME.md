# React SSR

1. renderToString 将 react 组件转成 html 发送到客户端
2. 客户端可看到 html 但不能交互
3. 利用 csr 进行水合(hydration 时间绑定)

已上会有两次渲染，一次是服务端，一次是客户端

### hydrateRoot
