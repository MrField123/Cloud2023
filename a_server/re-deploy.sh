# Point your Docker CLI to Minikube's Docker daemon
eval $(minikube docker-env)

# Build the container image in Minikube's VM
docker build -t my-super-web-app .

# Delete deployments
kubectl delete deployment/my-super-app-deployment
kubectl delete deployment/mariadb-deployment

# Delete services
kubectl delete svc/my-app-mariadb-service


# Create Kubernetes resources
kubectl apply -f mariadb-deployment.yaml
kubectl apply -f k8s-mariadb-service.yaml
kubectl apply -f app-deployment-minikube.yaml

