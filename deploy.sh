#!/bin/sh
git pull
yarn install
yarn build
yarn pm2:reload