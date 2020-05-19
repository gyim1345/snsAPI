if [ -d /home/ubuntu/build ]; then
    rm -rf /home/ubuntu/build
fi
mkdir -vp /home/ubuntu/build


if [[ "$(docker images -q gyim1345/snsapi:latest 2> /dev/null)" != "" ]]; then
docker rm -f $(docker ps -a -q --filter="ancestor=gyim1345/snsapi:latest")
docker rmi -f $(docker images --format '{{.Repository}}:{{.Tag}}' --filter=reference='gyim1345/snsapi:latest')
docker image prune -a
fi
