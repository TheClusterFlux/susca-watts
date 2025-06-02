#!/bin/bash

# Susca Watts Academy - TLS Certificate Setup Script
# This script sets up Let's Encrypt certificates for suscawatts.com

echo "🚀 Setting up TLS certificates for suscawatts.com..."

# Step 1: Check if cert-manager is installed
echo "📋 Checking cert-manager installation..."
if ! kubectl get namespace cert-manager &> /dev/null; then
    echo "📦 Installing cert-manager..."
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.2/cert-manager.yaml
    
    echo "⏳ Waiting for cert-manager to be ready..."
    kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=300s
else
    echo "✅ cert-manager is already installed"
fi

# Step 2: Apply ClusterIssuer for Let's Encrypt
echo "🔐 Setting up Let's Encrypt ClusterIssuer..."
kubectl apply -f cluster-issuer.yaml

# Step 3: Deploy the application with TLS
echo "🚢 Deploying Susca Watts Academy with TLS..."
kubectl apply -f deployment.yaml

# Step 4: Check certificate status
echo "📊 Checking certificate status..."
sleep 10
kubectl get certificate -n default
kubectl get certificaterequests -n default

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📝 Next steps for Squarespace DNS:"
echo "1. In Squarespace, go to Settings > Domains"
echo "2. Click on 'Use a domain I own'"
echo "3. Add these DNS records:"
echo "   - A record: suscawatts.com → YOUR_CLUSTER_IP"
echo "   - A record: www.suscawatts.com → YOUR_CLUSTER_IP"
echo ""
echo "🔍 To get your cluster IP:"
echo "kubectl get svc -n ingress-nginx | grep LoadBalancer"
echo ""
echo "📊 Monitor certificate creation:"
echo "kubectl describe certificate suscawatts-tls -n default"
echo "kubectl get certificaterequests -n default"
