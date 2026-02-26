# with maximum size 100 MB
proxy_cache_path /var/cache/nginx keys_zone=mycache:100m;

# cada alvo tem seu arquivo
# expires não influencia no cache

server {
  root /home/rcd/joaquina;
  expires -1;
  location /ws/userclients {
    proxy_cache mycache;
    proxy_cache_valid 200 10m;
    proxy_pass http://localhost:8000;
  } 
  location /ws {
    proxy_pass http://localhost:8000;
  }
}
