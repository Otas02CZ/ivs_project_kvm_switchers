#FILE:          	Makefile
#AUTHORS:        	Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
#                	<>
#TEAM            	KVM Switchers FIT BUT
#CREATED:        	24/04/2024
#LAST MODIFIED:  	24/04/2024
#DESCRIPTION:    	Makefile for calculator project
#NOTES:				This makefile expects to be used on Ubuntu
#					targets do no depend on install-dep target, because then the nodesource_setup.sh would be downloaded every time


ARCHIVE_NAME=xkocio00_xvalenk00_247581.zip

.PHONY: all pack run test doc profile build help clean install-dep

all: install-dep run


pack: doc
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
	cp ../dist/make/deb/x64/calculator-kvm-switchers_1.0.0_amd64.deb ../tmp/install

	cd .. && cp -r docs/code_docs tmp/doc

	cd ../tmp && zip -r ../$(ARCHIVE_NAME) repo doc install



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
	echo ""

clean:
	rm -rf ../dist ../src/node_modules package-lock.json js/*.log ../profiling/output.txt ../docs/code_docs ../tmp  ../$(ARCHIVE_NAME)

install-dep:
# sudo apt install curl dpkg rpm fakeroot
# cd ~  && curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
# sudo bash ~/nodesource_setup.sh
# sudo apt install nodejs
	npm install
