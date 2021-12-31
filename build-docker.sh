# đoạn script này sẽ build ra docker image,
# với name là DOCKER_IMAGE và tag của docker image chính là git branch name
#-----------------------------------------------------------------------
REGISTRY=khaingo2000
DOCKER_IMAGE=game_store_fe
# replace "/" by "-", vì docker tag không cho phép dấu "/"
ORIGINAL_BRAND_NAME=$(git symbolic-ref --short HEAD)
BRAND_NAME=${ORIGINAL_BRAND_NAME//[\/]/-}
#-----------------------------------------------------------------------
docker build . -t ${REGISTRY}/${DOCKER_IMAGE}:${BRAND_NAME}
docker push ${REGISTRY}/${DOCKER_IMAGE}:${BRAND_NAME}
echo -----------------------------------------------------------------------
echo Image sau khi build thành công sẽ có tên: ${REGISTRY}/${DOCKER_IMAGE}:${BRAND_NAME}