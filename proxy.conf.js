const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */
const proxyConfig = [
  {
    context: '/ecommerce',
    pathRewrite: { '^/ecommerce': '' },
    target: 'http://localhost:9006/ecommerce',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/account',
    pathRewrite: { '^/account': '' },
    target: 'http://localhost:9005/account',
    changeOrigin: true,
    secure: false
  }
//   {
//     context: '/case',
//     pathRewrite: { '^/case': '' },
//     target: 'http://localhost:8302/case',
//     changeOrigin: true,
//     secure: false
//   },
//   {
//     context: '/query',
//     pathRewrite: { '^/query': '' },
//     target: 'http://localhost:8305/query',
//     changeOrigin: true,
//     secure: false
//   },
//   {
//     context: '/auth',
//     pathRewrite: { '^/auth': '' },
//     target: 'http://10.124.13.134:8301/auth',
//     changeOrigin: true,
//     secure: false
//   },
//   {
//     context: '/report',
//     pathRewrite: { '^/report': '' },
//     target: 'http://10.124.13.134:8304/report',
//     changeOrigin: true,
//     secure: false
//   },
//   {
//     context: '/open-api',
//     pathRewrite: { '^/open-api': '' },
//     target: 'http://localhost:8081/open-api',
//     changeOrigin: true,
//     secure: false
//   }
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => {
      entry.agent = agent;
    });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
