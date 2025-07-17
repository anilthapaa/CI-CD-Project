# Use Nginx to serve static files
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY weather.js /usr/share/nginx/html/


# Default port for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]