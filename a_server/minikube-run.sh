# Point your Docker CLI to Minikube's Docker daemon
eval $(minikube docker-env)

# Build the container image in Minikube's VM
docker build -t my-super-web-app .

# Delete deployments
kubectl delete deployment/memcache-deployment
kubectl delete deployment/my-super-app-deployment
kubectl delete deployment/mariadb-deployment

# Delete services
kubectl delete svc/my-super-app-service
kubectl delete svc/my-memcached-service
kubectl delete svc/my-app-mariadb-service

# Delete Ingress
kubectl delete ingress/my-super-app-ingress

# Create Kubernetes resources
kubectl apply -f mariadb-deployment.yaml
kubectl apply -f k8s-mariadb-service.yaml
#kubectl apply -f 03-memcached-deployment-and-service.yaml
kubectl apply -f app-deployment-minikube.yaml
#kubectl apply -f 04-app-service-and-ingress.yaml
