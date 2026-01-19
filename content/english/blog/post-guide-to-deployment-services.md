---
title: "Guide to deploying a service in OSCAR"
date: 2025-12-17T09:00:00+01:00
# post image
image: "/images/blog/post-guide-to-deployment-services/deployment-service.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for developers to create their first service in OSCAR."
# post draft
draft: false
---

[OSCAR](https://oscar.grycap.net/) is an open-source platform that supports event-driven serverless computing for data processing applications. It can be automatically deployed across multiple clouds, and even on low-power devices, to create highly parallel, event-driven serverless data processing applications across the computing continuum. These applications run in custom runtime environments provided by Docker containers running on elastic Kubernetes clusters.

#### Prerequisites for deploying a service in OSCAR. 

To deploy an OSCAR cluster, whether locally or remotely, you must ensure that you have the following tools installed:
 - Docker
 - kubectl
 - Helm 
 - Kind
 - npm >=10.6.0
 - node >=20.11.0
 - Go

#### Deployment of an OSCAR cluster locally or remotely.

To set up our test environment, either locally or on a remote device, we will use a script that automatically executes all the necessary steps to deploy an OSCAR cluster with all the tools.

```
curl -sSL http://go.oscar.grycap.net | bash
```

You can also download the script using the following command

```
curl -sSL http://go.oscar.grycap.net -o oscar-install.sh
```
At the end of the execution, the login credentials for OSCAR and MinIO will be displayed, which you should save.

![OSCAR-Deployment](/images/blog/post-guide-to-deployment-services/oscar-deployment.png)

As a result, we should have two containers running locally, `local-registry` and `oscar-test-control-panel`.

`local-registry`: It is used to store Docker images created locally without needing to publish them in public repositories.

`oscar-test-control-panel`: It is the node created with the Kind where OSCAR runs with all the other services (e.g., MinIO).

Next, log in to the OSCAR user interface using the credentials provided above to verify that the cluster has been deployed correctly and save them for later use in the guide.

![OSCAR-LOCAL login](/images/blog/post-guide-to-deployment-services/oscar-local-login.png)


#### Create a Docker image of the function to be executed.

In the OSCAR ecosystem, the Docker image is the heart of the service. It's not simply a technical requirement, but the component that ensures the developed functionality runs exactly the same on a computer as it does on a high-performance cluster.

Below are a series of steps to help you create and deploy an OSCAR service.

##### STEP 0: Login to a public container image registry

The best way to test your use-case container images is by pushing them to a public registry. We recommend you to use [GitHub Container Registry](https://github.com/features/packages) or [Docker Hub](https://hub.docker.com/). For more details, refer to the [Docker](https://docs.docker.com/) documentation.

```
docker login
```

By default, the `docker login` command will log you in Docker Hub. If you want to log in to GitHub Container Registry, you should generate a [token](https://github.com/settings/tokens) and use the next command:

``` 
docker login ghcr.io
```

##### STEP 1: Create or adapt the use-case program

Create or adapt a program in the programming language (e.g, C, Java, Python) you want. Remember that your application will need, at least, two parameters: the input (which could be a text string or a file) and the output (which is the path of the file you are going to write). Test it.
Some examples of programs can be checked [here](https://github.com/grycap/oscar/tree/master/examples).


##### STEP 2: Create Dockerfile

Once we have our program, we need to make a Dockerfile in order to build a container image. The structure will be similar to this:

```
FROM {image}
RUN {add dependencies}
COPY {local file} {path where the files are going to state in the image}
```

If the language you are using is an interpreter language, you will need to copy all the files, but in case you are using another language like Java or C, you must copy the java machine code or the binary code after compiling it.


##### STEP 3: Test the container image locally

Now, it is time to test the program in the docker environment. First, we need to build the image. If some mistake shows up here means that the Dockerfile is not well made.
Remember that if you don't run the command in the same directory where the Dockerfile is, you will have to use the `-f` flag and write the path to it.

``` 
docker build -t $docker-hub-user/$docker-hub-image .
```

Once we have built it, we need to launch it and try to execute our code. When you run the next command, a new terminal will open. If you have to pass a file or you want to get the output file use the volume option (`-v`).

``` 
docker run -it $docker-hub-user/$docker-hub-image
docker run -it -v {$PWD or the local path of the file}:{input/output path on the image} $docker-hub-user/$docker-hub-image
```

Execute your code. If you get an error due to missing dependencies, update the Dockerfile, build, and run it again to test the program.


##### STEP 4: Upload the image to a repository

Once you have built and run the image to check that the program is working properly, you have to push the image to a public repository like [DockerHub](https://hub.docker.com/repositories) or [GitHub Container Registry](url??). To directly push the image and skip the tagging process,you need to build the image with the final name. If you are using Docker Hub, the name will be like `$username/$containername`, but if you are using GitHub Container Registry instead, you have to add `ghcr.io/` at the beginning.

```
docker build -t $docker-hub-user/$docker-hub-image .
docker push $docker-hub-user/$docker-hub-image
```
If you need the created image to work on both x86_64 clusters and ARM64 nodes, such as Raspberry Pi, the secret is to build a Multi-Arch Image.

By default, `docker build` creates images for your computer's architecture. To create a cross-platform image, you need the `buildx` plugin.

```
# Create a new builder that supports multiple platforms
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap
```
Instead of the traditional command, we'll use `buildx` to generate the AMD64 (Intel/AMD) and ARM64 versions simultaneously.

```
docker buildx build --platform linux/amd64,linux/arm64 \  -t $docker-hub-user/$docker-hub-image:multi \  --push .
```
 
##### STEP 5: Create the script

Now we will create the script that will allow our program to communicate with the OSCAR cluster and run it. The script is going to be automatically executed inside the container when you trigger the OSCAR service by uploading the input file (via OSCAR-CLI or the OSCAR's API). The path where the input file is located is represented by the environment variable `$INPUT_FILE_PATH`, whereas the path where the output file is going to be created will be represented by the environment variable `$TMP_OUTPUT_DIR`. To get the output file name, parse the input like this:

```  
FILE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$FILE_NAME"
```

Remember that this communication is automatically done by OSCAR and the only thing you have to add in order to trigger the service is the command to run your program along with the input and output paths. For example, if your program was written on Python, you would have to add the following line:

``` 
python3 /path/to/program.py $INPUT_FILE_PATH -o "$OUTPUT_FILE"
```

If your use-case can run just with a script you can directly use a distribution base image, or if you only need to install some dependencies you can comment the COPY line in the Dockerfile to make the image lighter.


##### STEP 6: Function Definition File

Finally, our container image with the code and dependencies are in a public repository and we have created the script that will run inside the container to communicate with the OSCAR cluster.
Now we can create the OSCAR service using the UI, but it's recommended to create a YAML file to deploy the service(s) whenever you want and automate the process. You can check the [FDL section in the OSCAR documentation](https://docs.oscar.grycap.net/fdl/) for more information, but the simplest YAML file should look like the following:

```
functions:
  oscar:
  - oscar-cluster:
      name: name-of-service
      memory: 1Gi
      cpu: '1.0'
      image: docker-hub-user/docker-hub-image:tag
      script: path/to/script.sh
      vo: "vo.ai4eosc.eu"
      input:
      - storage_provider: minio
        path: name_of_bucket/in
      output:
      - storage_provider: minio
        path: name_of_bucket/out
```
*Keep in mind that the name of the service cannot contain the "_" character.*

You can also check the [other examples](https://github.com/grycap/oscar/tree/master/examples) already listed before to see how the whole process for the creation of a service looks like. Once you have created the file, you have to deploy the service(s) with the next command:

##### STEP 7: Deploying a service on the OSCAR cluster

To facilitate interaction and integration with OSCAR services, a secure, high-performance [REST API](https://docs.oscar.grycap.net/latest/api/) is available. This API is compatible with any programming language (Python, C, Java, etc.) or API interaction tool such as Postman, cURL, etc. Once you have the service image to be deployed, along with the configuration files (.yaml and script.sh), it must be deployed on a cluster, either remote or local.

There are several ways to deploy a service on an OSCAR cluster. Below, we discuss some of these methods, which are available `Deployment Service section` of the [OSCAR documentation](https://docs.oscar.grycap.net).

- `OSCAR API`: The [OSCAR API section](https://docs.oscar.grycap.net/latest/deployment-api) demonstrates service deployment primarily through two alternatives: [cURL](https://curl.se/), a command-line tool ideal for automation that allows integrating the definition file and script into a single POST request, and [Postman](https://www.postman.com/), a graphical platform popular among developers for testing and documenting APIs through a visual interface. In both methods, configuring security is essential, either through an OIDC token (Bearer) or basic authentication (username and password), to correctly send the request body with the service configuration to the remote cluster.

Example using cURL

```
curl -X POST "https://oscar-cluster-remote/system/services" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
  "name": "cowsay",
  "cpu": "1.0",
  "memory": "1Gi",
  "image": "ghcr.io/grycap/cowsay",
  "script": "#!/bin/sh\n\nif [ \"$INPUT_TYPE\" = \"json\" ]\nthen\n    jq \".message\" \"$INPUT_FILE_PATH\" -r | /usr/games/cowsay\nelse\n    cat \"$INPUT_FILE_PATH\" | /usr/games/cowsay\nfi",
  "log_level": "CRITICAL",
  "vo": "vo.ai4eosc.eu",
  "environment": { "Variables": { "INPUT_TYPE": "json" } }
}'
```
Example using Postman

![API-Postman](/images/blog/post-guide-to-deployment-services/api-postman-init.png)

- `OSCAR CLI`: The [OSCAR CLI section](https://docs.oscar.grycap.net/latest/deployment-oscar-cli) uses the [OSCAR-CLI](https://github.com/grycap/oscar-cli) tool, which provides a command-line interface for easily interacting with OSCAR clusters. It supports service management, workflow definition from FDL (Function Definition Language) files, and the ability to manage files from OSCAR-compatible storage providers. Deploying a service involves three main steps: first, the cluster must be linked using the `cluster add` command, where an alias (e.g., oscar-cluster) is defined, and credentials are provided, either via username/password, OIDC agents, or shortcut tokens. Once configured, deployment is performed declaratively by running `oscar-cli apply` along with the FDL (.yaml) file containing all the service configuration. Finally, the tool allows you to verify the deployment status with the `service list` command, which shows a summary of the allocated resources (CPU, Memory and Image).

Example of deployment for OSCAR CLI

```
oscar-cli apply $yaml_file
```

- `OSCAR Dashboard`: The [OSCAR Dashboard section](https://docs.oscar.grycap.net/latest/deployment-oscar-dashboard) demonstrates the deployment of services through an OSCAR cluster dashboard. The dashboard offers an intuitive graphical interface that significantly streamlines interaction with cluster elements. To deploy a service, the panel offers two paths: the `FDL option`, where the `.yaml` configuration file and corresponding script are uploaded directly, or the `Form option`, which allows manual entry of service characteristics (names, resources, and variables) in a web form. In both cases, after completing the upload or the form and clicking `Create Service`, the service is deployed and ready for execution.

Example using the OSCAR Dashboard

![OSCAR-Dashboard](/images/blog/post-guide-to-deployment-services/dashboard-form.png)

- `OSCAR Python`: The [OSCAR Python section](https://docs.oscar.grycap.net/latest/deployment-oscar-python) shows how to deploy services to an OSCAR cluster from Python. You can use the OSCAR API directly or, more easily, the [oscar-python client](https://github.com/grycap/oscar_python) developed for this language. The process begins with installing the [oscar-python library](https://pypi.org/project/oscar-python/) (`pip install oscar-python`) and initializing the client, which requires configuring an options object with the cluster endpoint and the authentication method, either using basic credentials (username and password) or a valid OIDC token. Once the Client object is configured, deployment is simplified using the `client.create_service` function, passing the path to the FDL file containing the service definition as the only parameter.

Example using Python client 

```
try:
    client.create_service("cowsay.yaml")
except Exception as err:
    print("Failed with: ", err)
```

>!
> Through any of these methods, the service is implemented and ready to run (see the [`Service Execution section`](https://docs.oscar.grycap.net/latest/invoking/) in the OSCAR documentation).

