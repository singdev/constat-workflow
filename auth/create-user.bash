#!/bin/bash

curl -H "Accept: application/json" -H "Content-Type: application/json" -d @root.json http://localhost:2471/users/auth/root >> token.txt

token=`cat token.txt`
echo $token

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @rufus.json http://localhost:2471/users

rm token.txt
