#!/bin/sh
while true
do
    node nitrobot.js
    echo "If you want to completely stop the server process now, press Ctrl+C beforore the time is up!"
    echo "Rebooting in:"
    for i in 5 4 3 2 1
    do
        echo "$i..."
        sleep 1
    done
    echo "Rebooting now!"
done