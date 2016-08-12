FROM mongo-express:latest

RUN mkdir -p /usr/src/app/qskj-fullstack
WORKDIR /usr/src/app/qskj-fullstack

COPY ./server /usr/src/app/qskj-fullstack
RUN rm -rf node_modules
RUN npm install
EXPOSE 8008
CMD ["npm", "run", "server"]

