#!/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;


# Check if node of version 20 is installed
node --version > /dev/null
if [ $? -eq 1 ] || ! node -v | grep -q "v20"; then
    echo "Node.js version 20 is not installed."

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    export NVM_DIR=$HOME/.nvm;
	source $NVM_DIR/nvm.sh;

    nvm install 20

fi
