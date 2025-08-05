#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛑 Trading Journal - Stop Script${NC}"
echo "=============================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed.${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Stopping the application...${NC}"

# Stop and remove the container
docker stop trading-journal-app 2>/dev/null || true
docker rm trading-journal-app 2>/dev/null || true

echo -e "${GREEN}✅ Application stopped successfully!${NC}"
echo -e "${BLUE}📝 To start again, run: ./run.sh${NC}" 