module.exports = {
  apps: [
    {
      name: 'trainistar.ncdai.dev',
      script: 'yarn serve:start',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
