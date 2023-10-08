FROM nginx:1.23-alpine
EXPOSE 80/tcp
EXPOSE 443/tcp
ENV ENVIRONMENT development
ENV BASIC_AUTH override_if_needed
ENV TLS_MODE off
ENV SITE_HOST localhost
ENV IMGPROXY_SITE_HOST imgproxy.localhost
RUN apk upgrade
RUN apk add --no-cache esh curl openssl
RUN curl https://get.acme.sh | sh
RUN ln -s  /root/.acme.sh/acme.sh  /usr/local/bin/acme.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf.esh ssl_params backend frontend /etc/nginx/
CMD ["/bin/sh", "-c", "echo $HTPASSWD >/etc/nginx/.htpasswd && esh -o /etc/nginx/conf.d/nginx.conf /etc/nginx/nginx.conf.esh && exec nginx -g 'daemon off;'"]
