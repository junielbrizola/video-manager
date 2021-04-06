# video-manager
Video manager

# frontend
cd frontend

# development
docker-compose -f docker-compose.dev.yml up -d 

# check logs
docker-compose logs -f -t

# backend
cd backend

# development
docker-compose -f docker-compose.dev.yml up -d 

# check logs
docker-compose logs -f -t

# ci process
git checkout develop && git push origin {branche}

# cd process
git push main
