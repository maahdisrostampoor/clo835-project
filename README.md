# Fullstack Application with Kubernetes

This repository contains a fullstack application that includes a frontend, backend, and MongoDB database, all deployed using Kubernetes. The application consists of a Node.js API server (backend), an Nginx server serving a static website (frontend), and a MongoDB database.

### 1. Backend

- **Dockerfile**: Instructions to build the Docker image for the Node.js API server.
- **index.js**: Main file for the Node.js API server, containing the application logic.
- **package.json**: Configuration file for managing dependencies for the Node.js application.
- **package-lock.json**: Automatically generated file that locks the versions of the installed dependencies.

### 2. Frontend

- **Dockerfile**: Instructions to build the Docker image for the Nginx server to serve the static files.
- **index.html**: Main HTML file for the frontend.
- **script.js**: JavaScript file for adding dynamic functionality to the frontend.
- **styles.css**: Stylesheet file for styling the frontend.

### 3. K8s (Kubernetes Configuration Files)

- **Mongodb**
  - `deployment.yaml`: Defines the deployment strategy for the MongoDB instance, including replica settings.
  - `service.yaml`: Exposes MongoDB as a service within the Kubernetes cluster using a ClusterIP.

- **Nginx**
  - `deployment.yaml`: Defines the deployment strategy for the Nginx server, including replica settings.
  - `service.yaml`: Exposes the Nginx server using a NodePort to make it accessible externally.

- **Nodejs**
  - `deployment.yaml`: Defines the deployment strategy for the Node.js API server, including replica settings.
  - `service.yaml`: Exposes the Node.js API server within the Kubernetes cluster.
  - `configMap.yaml`: Contains environment-specific configurations for the Node.js application, such as MongoDB connection strings.

- **pv.yaml**: PersistentVolume configuration for MongoDB to ensure data is not lost when the MongoDB pod is restarted.
- **secret.yaml**: Stores sensitive data, such as MongoDB credentials, securely within Kubernetes.
- **configMap.yaml**: Contains environment-specific configurations for the Node.js application, such as MongoDB connection strings.

## Getting Started

### Prerequisites

- Docker
- Kubernetes (Minikube or any Kubernetes cluster)
- kubectl

### Build and Push Docker Images

Before deploying to Kubernetes, ensure the Docker images for the backend and frontend are built and pushed to Docker Hub.

```bash
# Backend
cd Backend
docker build -t <Your-docker-Hub-account>/node-backend .
docker push <Your-docker-Hub-account>/node-backend

# Frontend
cd Frontend
docker build -t <Your-docker-Hub-account>/nginx-frontend .
docker push <Your-docker-Hub-account>/nginx-frontend
```
# Deploy to Kubernetes
```bash
## Create the namespace
kubectl create namespace fullstack-app

## Deploy Config map
kubectl apply -f K8s/configMap.yaml -n fullstack-app

## Deploy Persistent Volume and persistent Volume Claim
kubectl apply -f K8s/pv.yaml -n fullstack-app

## Deploy Secret
kubectl apply -f K8s/secret.yaml -n fullstack-app

## Deploy MongoDB
kubectl apply -f K8s/Mongodb/ -n fullstack-app

## Deploy Node.js backend
kubectl apply -f K8s/Nodejs/ -n fullstack-app

## Deploy Nginx frontend
kubectl apply -f K8s/Nginx/ -n fullstack-app
```

# Verify Deployments
Ensure all pods are running correctly:

```bash
kubectl get pods -n fullstack-app
```
# Access the frontend application:

```bash
kubectl get svc -n fullstack-app
minukube ip
```
Access the application using the NodePort exposed by the Nginx service. **http://\<minikubeip\>:\<node-port\>**
