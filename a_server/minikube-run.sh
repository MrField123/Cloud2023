# Point your Docker CLI to Minikube's Docker daemon
eval $(minikube docker-env)

# Build the container image in Minikube's VM
docker build -t my-super-web-app .

# Create Kubernetes resources
kubectl apply -f mariadb-deployment.yaml
#kubectl apply -f 02-k8s-mariadb-service.yaml
#kubectl apply -f 03-memcached-deployment-and-service.yaml
#kubectl apply -f 04-app-deployment-minikube.yaml
#kubectl apply -f 04-app-service-and-ingress.yaml
