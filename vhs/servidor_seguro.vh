server {
  expires -1;
  root /home/rcd/joaquina;
  error_page 401 /signin.html;  
  location = /index.html {
    auth_request /grant;
  }  
  location = /grant {
    internal;
    proxy_pass http://localhost:8000/ws/grant$request_uri;
  }
  location /ws {
    proxy_pass http://localhost:8000;
  }
}
