#!/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

sudo apt install curl

# Check if node of version 20 is installed
node > /dev/null
if [ $? -eq 1 ] || ! node -v | grep -q "v20"; then
    echo "Node.js version 20 is not installed."

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    export NVM_DIR=$HOME/.nvm;
	source $NVM_DIR/nvm.sh;

    nvm install 20

fi

# Copy std_dev_kvm_switchers folder to /usr/lib
sudo cp -r stddev_kvm_switchers /usr/lib/
sudo chmod -R 777 /usr/lib/stddev_kvm_switchers

# Copy std_dev_kvm_switchers.sh script to /usr/bin
sudo cp stddev_kvm_switchers.sh /usr/bin/
sudo chmod +x /usr/bin/stddev_kvm_switchers.sh

sudo cp uninstall_stddev_kvm_switchers.sh /usr/bin/
sudo chmod +x /usr/bin/uninstall_stddev_kvm_switchers.sh

echo "Installation completed successfully."