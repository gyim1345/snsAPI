# cd /home/ubuntu/build
# npm install
# mkdir config
# cd /
# cp /env/.env.production /home/ubuntu/build/
# cp /env/awsconfig.json /home/ubuntu/build/config/
docker pull gyim1345/snsapi:latest
docker run --env-file /env/.env.production --publish 8383:8383 -it --detach --name ab gyim1345/snsapi:latest /bin/bash