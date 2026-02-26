server {
  expires -1;
  root /home/rcd/apps/novo/dist;
  location /ws {
    proxy_pass http://localhost:8000;
  }
}
