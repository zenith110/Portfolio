FROM node:lts
WORKDIR /home/app/admin-tool
COPY package.json /home/app/admin-tool/package.json
COPY package-lock.json /home/app/admin-tool/package-lock.json
RUN npm i
EXPOSE 5000
COPY . .
CMD ["npm", "run", "start"]