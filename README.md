# K8s-with-Jenkins

## CI/CD with Jenkins and deploying application on K8s 

**Pipiline** - dev -> push code to GitHub(SCM) -> notifies Jenkins -> Build the pipeline -> Static Code Analysis w SonarQube -> build & push docker image -> scan this docker image -> w Trivy Artifact scan(if) -> update k8s manifests to DevOps Repo -> to ArgoCD(monitors repo for changes) -> deploy to k8s -> send notification on slack

### System procedures

- install k3d(minkube uses a lot of resources and k3d is lightening quick)
- install java
- run/install jenkins
- use initial password
- install suggested plugins
- usually accessed on port 8080
- access jenkins on http://localhost:8080

*Only if required*

- install Certbot - for encryption and security. - to get SSL
- sudo apt install certbot python3-certbot-nginx
- sudo certbot --nginx -d localhost  - use this command if you direct your jenkins to a specific domain name instead of localhost.

*Continued..*

- create a basic node app locally and push it to git repo
- go to jenkins -> Create New Item -> docker-automation ->  click on pipeline and create it.
- necessary installed plugins - nodeJS and docker pipeline and Git
- then add the NodJS location inside the MANAGE JENKINS>TOOLS, select the version and save.

### List of problems that I troubleshooted 
- troubleshooting going on for couple of hours now
- docker not installing in ubuntu 24.04, 2 docker.list files were created so had to delete one,
- now git was not configuring in jenkins so did that as well by providing the local path of git to jenkins
- now trying to troubleshoot the permissions of docker in jenkins so that it can use sudo w/o password so editing the visudo file.
- edit visudo file in your terminal by running *sudo visudo* and add *jenkins ALL=(ALL) NOPASSWD: /usr/bin/docker*
- then encountered this error "ERROR: invalid tag "adishrijain/nodeJS-app": repository name must be lowercase" - ugghhhh
- will change this now in the script
- sorted
- but then when I built it again, the container was already there so it threw an error so am changing the script accordingly
- add a command of rm -rf any container having the same name and then do the RUN command.
- that was sorted
- new error : docker push stage
- denied: requested access to the resource is denied
- you have to login to the docker first and then the image can be pushed.
- so add new credentials of docker and add it to groovy to create a script.
- added docker login and the problem is solved.
- finally the image is pushed to the docker hub.


























