# video-manager
Video manager

# configure mode development - nano /etc/hosts
{ip} host.docker.internal

# backend
cd backend

# development
docker-compose -f docker-compose.dev.yml up -d 

# check logs
docker-compose -f docker-compose.dev.yml logs -f -t

# frontend
cd frontend

# development
docker-compose -f docker-compose.dev.yml up -d 

# check logs
docker-compose -f docker-compose.dev.yml logs -f -t

# server development
http://localhost:3000/
http://host.docker.internal:3000/

# server production
http://157.245.255.18

# ci process
git checkout develop && git push origin {branche}

# cd process
git push main


