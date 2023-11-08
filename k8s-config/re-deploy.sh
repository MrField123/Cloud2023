# Point your Docker CLI to Minikube's Docker daemon
eval $(minikube docker-env)

# Build local Docker images
cd ../client
docker build -t voucher-hub-app .

cd ../services/write
docker build -t write-service .

cd ../read
docker build -t read-service .

cd ../../k8s-config

# Delete deployments
kubectl delete deployment --all

# Delete services
kubectl delete svc --all

kubectl delete ingress --all

# Create Kubernetes resources
kubectl apply -f app-deployment-frontend.yaml
kubectl apply -f voucher-hub-service.yaml
kubectl apply -f mariadb-deployment.yaml
kubectl apply -f mariadb-service.yaml
kubectl apply -f write-service-deployment.yaml
kubectl apply -f read-service-deployment.yaml
kubectl apply -f write-service-service.yaml
kubectl apply -f read-service-service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f pv.yaml


