# K8s-with-Jenkins
CI/CD with Jenkins and deploying application on K8s

dev -> push code to GitHub(SCM) -> notifies Jenkins -> Build and Test w Maven -> Static Code Analysis w SonarQube -> build & push docker image -> scan this docker image -> w Trivy Artifact scan -> update k8s manifests to DevOps Repo -> to ArgoCD(monitors repo for changes) -> deploy to k8s -> send notification on slack

install k3d, minkube uses a lot of resources and k3d is lightening quick

- install java

- run/install jenkins

- use initial password

- install suggested plugins

- usually accessed on port 8080

install nginx for reverse proxy for jenkins

- now we have to point nginx to jenkins

- open sudo nano default inside /etc/nginx/sites-available

- add this config file:

```
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

    server_name localhost;  # Change this to your domain if needed

    location / {
        proxy_pass http://localhost:8080;  # Forward requests to Jenkins
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Handle requests for static files if necessary
    location /jenkins/ {
        proxy_pass http://localhost:8080/jenkins/;  # Ensure Jenkins can serve its resources
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- access jenkins on http://localhost:8080

install Certbot - for encryption and security. - to get SSL


sudo apt install certbot python3-certbot-nginx

sudo certbot --nginx -d localhost  - use this command if you direct your jenkins to a specific domain name instead of localhost.

- create a basic node app locally and push it to git repo

- go to jenkins -> Create New Item -> docker-automation ->  click on pipeline and create it.

- necessary installed plugins - nodeJS and docker pipeline

- then add the NOdJS location inside the MANAGE JENKINS>TOOLS, select the version and save.

- 

- troubleshooting going on for couple of hours now - docker not installing in ubuntu 24.04, 2 docker.list files were created so had to delete one, - now git was not configuring in jenkins so did that as well by providing the local path of git to jenkins - now trying to solve the permissions of docker in jenkins so that it can use sudo w/o password so editing the visudo file. - then encountered this error "ERROR: invalid tag "adishrijain/nodeJS-app": repository name must be lowercase" - will change this now in the script - sorted - but then when I built it again, the container was already there so it threw an error so am changing the script accordingly - that was sorted - new error : docker push stage - denied: requested access to the resource is denied -added docker login and the problem is solved. - 

- finally the image is pushed to the docker hub.

-  

























