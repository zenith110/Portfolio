FROM node:lts
WORKDIR /home/app/portfolio
COPY package.*json /home/app/portfolio/package.*json
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start"]