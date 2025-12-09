const PROXY_CONFIG = [
  {
    context: ["/api-efact-ose"],
    target: "https://odin-dev.efact.pe",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
