#!/bin/bash

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js to run this script."
    exit 1
fi

# Run the script with provided arguments
node /usr/lib/std_dev_kvm_switchers/std_dev.js "$@"
