module.exports = {
  basePath: '',
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    THIRDWEB_API_KEY: process.env.THIRDWEB_API_KEY,
    CREST_SMARTWALLET_FACTORY_ADDRESS: process.env.CREST_SMARTWALLET_FACTORY_ADDRESS,
    COVALENT_API_KEY: process.env.COVALENT_API_KEY,
    AWS_RECEIPIENT_EMAIL: process.env.AWS_RECEIPIENT_EMAIL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    SERVICE_PROVIDER: process.env.SERVICE_PROVIDER,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASS: process.env.USER_PASS,
    PORT: process.env.PORT,
  },
};
