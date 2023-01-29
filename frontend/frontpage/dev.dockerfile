FROM node:lts
WORKDIR /home/app/portfolio
COPY package.json /home/app/portfolio/package.json
COPY package-lock.json /home/app/portfolio/package-lock.json
RUN npm i
COPY . .
CMD ["npm", "run", "start"]