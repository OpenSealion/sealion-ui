FROM node:16-alpine as builder
WORKDIR /build/
ADD ./ /build/
RUN npm install --registry=http://10.1.32.251:18081/repository/npm-all/
RUN npm run build-storybook
RUN ls /build/storybook-static

FROM nginx:1.21-alpine
COPY --from=builder /build/storybook-static /usr/share/nginx/html
RUN ls /usr/share/nginx/html
COPY ./nginx/conf.d /etc/nginx/conf.d
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \&& echo 'Asia/Shanghai' > /etc/timezone
EXPOSE 80/TCP
