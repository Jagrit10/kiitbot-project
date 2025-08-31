// PM2 ecosystem config (CommonJS) for BotTalk
// Use this file when package.json has "type": "module" so Node treats .js as ESM.
// Usage: pm2 start ecosystem.config.cjs --env production

module.exports = {
  apps: [
    {
      name: 'bottalk',
      // run the built entry produced by `npm run build` which bundles server/index.ts -> dist/index.js
      script: './dist/index.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        // Set your production DATABASE_URL here or supply it via your environment/CI
        // DATABASE_URL: 'postgresql://user:pass@host:5432/dbname?sslmode=require'
      }
    }
  ]
};
