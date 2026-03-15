#!/bin/bash
echo "Deploying PayFlow API..."
# Simulate deployment steps
git pull origin main
npm install
echo "Restarting services..."
# docker-compose restart server-backend
echo "Deployment successful."
