#FILE:          	Makefile
#AUTHORS:        	Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
#                	<>
#TEAM            	KVM Switchers FIT BUT
#CREATED:        	24/04/2024
#LAST MODIFIED:  	24/04/2024
#DESCRIPTION:    	Makefile for calculator project
#NOTES:				This makefile expects to be used on Ubuntu
#					Run target install-dep as first to install required dependencies (mainly nodejs)
#					then reload shell paths and run make install to install required node packages


ARCHIVE_NAME=xkocio00_xvalenk00_247581.zip

.PHONY: all pack run test doc profile build help clean install-dep

all: install-dep

pack: doc build
	cd .. && rm -rf tmp
	cd .. && mkdir tmp
	cd .. && mkdir tmp/repo
	cd .. && mkdir tmp/doc
	cd .. && mkdir tmp/install

	rsync -av --exclude='tmp' ../. ../tmp/repo
	cd ../tmp/repo && rm -rf tmp
	cd ../tmp/repo && rm -rf src/node_modules
	cd ../tmp/repo && rm -rf src/package-lock.json
	cd ../tmp/repo && rm -rf src/js/*.log
	cd ../tmp/repo && rm -rf profiling/output.txt
	cd ../tmp/repo && rm -rf docs/code_docs
	cd ../tmp/repo && rm -rf dist

	cd .. && cp -r scripts/stddev_kvm_switchers tmp/install/stddev_kvm_switchers
	cd .. && cp scripts/install_stddev_kvm_switchers.sh tmp/install/install_stddev_kvm_switchers.sh
	cd .. && cp scripts/uninstall_stddev_kvm_switchers.sh tmp/install/uninstall_stddev_kvm_switchers.sh
	cd .. && cp scripts/stddev_kvm_switchers.sh tmp/install/stddev_kvm_switchers.sh

	cp ../dist/make/deb/x64/calculator-kvm-switchers_1.0.0_amd64.deb ../tmp/install

	cd .. && cp -r docs/code_docs tmp/doc
	cd .. && mv tmp xkocio00_xvalenk00_247581
	cd .. && zip -r $(ARCHIVE_NAME) xkocio00_xvalenk00_247581

run:
	npm start

test:
	npm test

doc:
	npm run make-docs

profile:
	cd js && node --prof std_dev.js < ../../profiling/data/data_50000.txt && node --prof-process *-v8.log > ../../profiling/output.txt

build:
	npm run make

help:
	echo "Use make install-dep to install node and other dependencies, then reload shell paths and run make install to install needed node packages."
	echo "After that you can use below targets."
	echo "Use make run to run the application."
	echo "Use make test to run tests."
	echo "Use make doc to generate documentation."
	echo "Use make profile to profile the application."
	echo "Use make build to build the application."
	echo "Use make pack to pack the application into zip archive."

clean:
	rm -rf ../dist ../src/node_modules package-lock.json js/*.log ../profiling/output.txt ../docs/code_docs ../tmp  ../$(ARCHIVE_NAME) ../xkocio00_xvalenk00_247581

install:
	npm install

install-dep:
	sudo apt install curl dpkg rpm fakeroot
	sudo ./install_node.sh
