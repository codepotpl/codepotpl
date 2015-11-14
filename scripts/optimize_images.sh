#!/usr/bin/env bash

# https://tinypng.com/developers

# SELECT ONE
API_KEY='vyMxyN-TZO5L72m8b_RQpkxYejUqpdO4'
#API_KEY='fbZsqLrBzamzKBJwRzCLQv2zRgV2hoQv'
#API_KEY='BSJbnwLRMAFavB2ga14kxP__qjfyv9s1'

function optimize {
  for image in `find . -type f -name "*.$1"`; do
    echo "Opimizing $image"
    JSON=`curl -s --user api:"$API_KEY" --data-binary @$image https://api.tinify.com/shrink`
    URL=${JSON/*url\":\"/};
    URL=${URL/\"*/};
    curl -s $URL > $image
  done
}

optimize 'jpeg'
optimize 'jpg'
optimize 'png'
