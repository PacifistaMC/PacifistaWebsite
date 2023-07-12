ACTUAL_TIME=$(date +%s)

sed -i "s/TIME-UPDATE-BUILD-FNG/${ACTUAL_TIME}/g" deployment.yml

kubectl apply -f certificate.yml
kubectl apply -f deployment.yml
kubectl apply -f ingress.yml
