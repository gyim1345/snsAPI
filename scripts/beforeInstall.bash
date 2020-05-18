if [ -d /home/ubuntu/build ]; then
    rm -rf /home/ubuntu/build
fi
mkdir -vp /home/ubuntu/build

docker rmi -f $(docker images --format '{{.Repository}}:{{.Tag}}' --filter=reference='gyim1345/snsapi:latest')