cd /home/ubuntu/build
npm install
mkdir config
cd /
cp /env/.env.production /home/ubuntu/build/
cp /env/awsconfig.json /home/ubuntu/build/config/
docker pull gyim1345/snsapi