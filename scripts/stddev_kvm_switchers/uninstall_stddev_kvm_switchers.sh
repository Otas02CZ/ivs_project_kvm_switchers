#!/bin/bash

# Remove std_dev_kvm_switchers folder from /usr/lib
sudo rm -rf /usr/lib/stddev_kvm_switchers

# Remove std_dev_kvm_switchers.sh script from /usr/bin
sudo rm -f /usr/bin/stddev_kvm_switchers.sh

sudo rm -f /usr/bin/uninstall_stddev_kvm_switchers.sh

echo "Uninstallation completed successfully."
