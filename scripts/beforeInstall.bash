if [ -d /home/ubuntu/build ]; then
    rm -rf /home/ubuntu/build
fi
mkdir -vp /home/ubuntu/build

npm install

npm start