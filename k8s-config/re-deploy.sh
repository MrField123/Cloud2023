# Point your Docker CLI to Minikube's Docker daemon
eval $(minikube docker-env)

# Build local Docker images
cd ../client
docker build -t voucher-hub-app .

cd ../a_server
docker build -t my-super-web-app .

cd ../k8s-config

# Delete deployments
kubectl delete deployment/voucher-hub-deployment
kubectl delete deployment/my-super-app-deployment
kubectl delete deployment/mariadb-deployment

# Delete services
kubectl delete svc/voucher-hub-service
kubectl delete svc/my-app-mariadb-service
kubectl delete svc/my-super-app-service

kubectl delete ingress my-super-app-ingress

# Create Kubernetes resources
kubectl apply -f app-deployment-frontend.yaml
kubectl apply -f voucher-hub-service.yaml
kubectl apply -f mariadb-deployment.yaml
kubectl apply -f k8s-mariadb-service.yaml
kubectl apply -f app-deployment-minikube.yaml
kubectl apply -f microservice-service.yaml
kubectl apply -f ingress.yaml


#kubectl run -i --tty --rm debug --image=curlimages/curl --restart=Never



#Get _URL minikube service voucher-hub-service --url