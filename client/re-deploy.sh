# m
eval $(minikube docker-env)

# Build the container image in Minikube's VM
docker build -t voucher-hub-app .

# Delete deployments
kubectl delete deployment/voucher-hub-deployment


# Delete services
kubectl delete svc/voucher-hub-service


# Create Kubernetes resources
kubectl apply -f app-deployment-frontend.yaml
kubectl apply -f voucher-hub-service.yaml


#Get _URL minikube service voucher-hub-service --url