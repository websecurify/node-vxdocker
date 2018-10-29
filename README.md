[![Follow on Twitter](https://img.shields.io/twitter/follow/websecurify.svg?logo=twitter)](https://twitter.com/websecurify)


	__   ____  _____   ___   ___ _  _____ ___ 
	\ \ / /\ \/ /   \ / _ \ / __| |/ / __| _ \
	 \ V /  >  <| |) | (_) | (__| ' <| _||   /
	  \_/  /_/\_\___/ \___/ \___|_|\_\___|_|_\
	
	by Websecurify
	  
# Introduction

VxDocker is a [Vortex](http://www.websecurify.com/extra/vortex.html) wrapper for [Docker](http://www.docker.io/). The purpose of VxDocker is to make seamless integration between docker and operating systems, which do not support LXC containers such as Windows and Mac OS.

# Installation

The easiest way to install VxDocker is via node's npm. You need to have nodejs installed for this. Simply type the following command:

	npm install -g vxdocker

An alternative approach is to just copy the source files and execute them manually though nodejs.

# Usage

Once the tool is installed, it is as easy to use as docker itself. For example:

	vxdocker images 				# lists all images
	vxdocker run ubuntu ls -la 		# performs a list inside the ubuntu docker image

Essentially the docker command doesn't change, it is only mapped to vxdocker instead.

# Behind The Scenes

Behind the scenes, VxDocker uses Vortex to boot a virtual machine in VirtualBox and fire up docker itself. The first time you run the `vxdocker` command you will notice a delay. This is due to the booting of the virtual machine. The virtual machine will be automatically destroyed after 30 minutes of inactivity.
