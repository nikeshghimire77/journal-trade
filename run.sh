#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Trading Journal - Easy Run Script${NC}"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building and starting the application...${NC}"

# Stop any existing container
docker stop trading-journal-app 2>/dev/null || true
docker rm trading-journal-app 2>/dev/null || true

# Build the Docker image
docker build -t trading-journal .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build Docker image.${NC}"
    exit 1
fi

       # Try to run the container on different ports
       for port in 8080 8081 8082 8083 8084 3000 3001 3002 3003 3004; do
           if docker run -d --name trading-journal-app -p $port:3000 trading-journal 2>/dev/null; then
               PORT=$port
               break
           fi
       done
       
       if [ -z "$PORT" ]; then
           echo -e "${RED}❌ Failed to start container. All ports 8080-8084 and 3000-3004 are busy.${NC}"
           exit 1
       fi

# Wait a moment for the app to start
sleep 3

       # Check if the app is running
       if curl -s http://localhost:$PORT > /dev/null; then
           echo -e "${GREEN}✅ Application is running successfully!${NC}"
           echo -e "${BLUE}🌐 Open your browser and go to: http://localhost:$PORT${NC}"
           echo -e "${YELLOW}📝 To stop the application, run: ./stop.sh${NC}"
       else
           echo -e "${RED}❌ Application failed to start. Check the logs with: docker logs trading-journal-app${NC}"
           exit 1
       fi 