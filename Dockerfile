FROM node:12-alpine as builder
RUN apk add g++ make python2
ARG STAGE=prod
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app
RUN if [ "${STAGE}" = "prod" ] ; then node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng build --configuration=production ; else node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng build -c $STAGE ; fi

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/transcriptor-web /usr/share/nginx/html
COPY config/site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
