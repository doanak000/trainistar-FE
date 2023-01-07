#!/bin/sh
git pull
yarn build
yarn pm2:reload