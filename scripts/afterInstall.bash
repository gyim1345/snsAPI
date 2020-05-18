cd /home/ubuntu/build
npm install
mkdir config
cd /
cp /env/.env.production /home/ubuntu/build/
cp /env/awsconfig.json /home/ubuntu/build/config/
docker pull gyim1345/snsapi:latest
docker run --env-file /env/.env.production .en--publish 8383:8383 --detach --name bb gyim1345/snsapi:latest