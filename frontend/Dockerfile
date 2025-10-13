FROM nginx:alpine

COPY . /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
