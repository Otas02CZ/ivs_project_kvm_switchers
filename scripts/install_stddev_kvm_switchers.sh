#!/bin/bash

# Function to check if a command is available
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if node of version 20 is installed
if ! command_exists node || ! node -v | grep -q "v20"; then
    echo "Node.js version 20 is not installed."

    # Check if curl is installed
    if ! command_exists curl; then
        echo "curl is not installed. Installing curl..."
        sudo apt-get update && sudo apt-get install -y curl
    fi

    # download and run the NodeSource Node.js 20.x repo script
    curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh

    sudo bash ./nodesource_setup.sh

    sudo apt install nodejs
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