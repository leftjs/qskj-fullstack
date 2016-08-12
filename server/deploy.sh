#!/usr/bin/env bash
cd ..
git pull origin master
npm install
npm run dist
cd server
npm install
