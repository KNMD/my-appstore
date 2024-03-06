#!/bin/sh

cmd="docker-compose -p my-appstore up  --force-recreate -d"

echo $cmd
eval $cmd

docker logs -f my-appstore

# 备注：只需要docker-compose.yml、.env、start.sh三个文件即可启动，无需重复执行build.sh
