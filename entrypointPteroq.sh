#!/bin/bash
cd /home/container

echo "Update webdir"
rm -rf dist
rm -rf package.json

mkdir dist
cp -rf /home/www/dist .
cp /home/www/package.json .

npm run serve:ssr
