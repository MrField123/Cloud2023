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