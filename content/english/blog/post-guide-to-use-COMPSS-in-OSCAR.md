---
title: "Use COMPSs with OSCAR"
date: 2023-02-02T09:00:00+01:00
# post image
image: "https://compss-doc.readthedocs.io/en/stable/_images/COMPSs_logo.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "Introduction guide for developers in how to use COMPSs with OSCAR."
# post draft
draft: false
---

This is a tutorial to integrate COMPSs with OSCAR.
In this post, we will explain what COMPSs is and the integration with OSCAR to have high-performance hardware in a serverless platform.

### What is OSCAR?

[OSCAR](https://oscar.grycap.net/) is an open-source serverless platform for event-driven data-processing containerized applications that execute on elastic [Kubernetes](http://kubernetes.io) clusters that are dynamically provisioned on multiple Clouds.

### What is COMPSs?

[COMP Superscalar (COMPSs)](https://compss-doc.readthedocs.io/en/stable/index.html) is a task-based programming model which aims to ease the development of applications for distributed infrastructures, such as large High-Performance clusters (HPC), clouds and container managed clusters. COMPSs provides a programming interface for the development of the applications and a runtime system that exploits the inherent parallelism of applications at execution time.

COMPSs helps the programmer by offering a model that:

1. Deal with parallelization and distribution even if the code is made as sequential programming.
2. Manage the memory and file system as one.
3. Abstracts the application from distributed infrastructure. It does not need a specification like deployment or a resource management.
4. Is supported in Java, Python, and C/C++ languages.
5. It does not require the use any special API call, pragma, or construct in the application; everything is a pure standard Java syntax and libraries.

### Benefit of the integration of OSCAR with COMPSs

This combination of COMPSs and OSCAR allows the execution of parallelized code in a serverless distributed infrastructure
triggered by events. This means that, meanwhile, there is no executing code. It has no resources cost. When a service invocation appears, the OSCAR service is executed with a high hardware performance due to COMPSs parallelization.

### Install OSCAR and COMPSs

[OSCAR](https://oscar.grycap.net/) can be deployed in localhost or using [IAM Dashboard](https://www.grycap.upv.es/im/index.php)
It is necessary to install Docker, Kubectl, Helm, and Kind as prerequisites. After that, run the following command:

```
curl -sSL http://go.oscar.grycap.net | bash
```

However, to deploy OSCAR with more details, visit the [local testing](https://docs.oscar.grycap.net/local-testing/) section in our documentation.
Also, in case you want to deploy OSCAR in IM Dashboard, follow the tutorial in [Deployment with IM Dashboard](https://docs.oscar.grycap.net/deploy-im-dashboard/) section.

For setup [COMPSs](https://compss-doc.readthedocs.io/en/stable/index.html) it is highly recommended clone [tutorial_apps](https://github.com/bsc-wdc/tutorial_apps) repository. Then:

1. Pull the docker image `docker pull compss/compss-tutorial:3.1`
2. Install PyCOMPSs Linux: `sudo python3 -m pip install pycompss-cli` or  Mac-os: `pip install pycompss-cli`
3. Install [maven](https://maven.apache.org/install.html)
4. (Optional) A Java IDE is recommended for editing Java code, such as [Eclipse](https://www.eclipse.org/downloads/)

### Deploy an OSCAR service with COMPSs

OSCAR services need a Docker with the COMPSs code inside the image.
So, create a new Docker image from an image in [COMPSs docker hub](https://hub.docker.com/u/compss)
Copy your code inside the docker:

  1. In python, it will be the code.
  2. In Java, it will be the .jar file generated with maven.
  3. In C/C++, it will be the entire proyect.

The way to execute COMPSs with simple docker is by executing a script that runs all the commands.
Declare that file with some changes as the script of the service. This script will:

1. Parse the input file.
2. Enable ssh.
3. (Only in C/C++) Build the binary file.
4. Run COMPSs and redirect the output to the output file.

There are three different examples of the integration of OSCAR with [COMPSs](https://github.com/grycap/oscar/tree/master/examples/compss)

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
