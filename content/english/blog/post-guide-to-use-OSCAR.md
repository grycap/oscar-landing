---
title: "Guide to create a service in OSCAR"
date: 2022-05-10T09:00:00+01:00
# post image
image: "/images/oscar3-logo-trans.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for developers to create their first service in OSCAR."
# post draft
draft: false
---


This is a step by step guide to show developers how to create their first service in OSCAR. 


### Previous steps:

#### Deploy the OSCAR cluster

Follow the [deployment instructions with the IM Dashboard](https://docs.oscar.grycap.net/deploy-im-dashboard/). Alternatively, you can execute this script to install it locally.

```bash
curl -L http://go.oscar.grycap.net | bash
```

Log in to the OSCAR UI using the previously provided credentials to verify that the cluster has been successfully deployed.

![01-oscar-login.png](../../images/blog/post-text-to-speech/01-oscar-login.png)

#### Install OSCAR-CLI

As a recommendation, you can use the command line interface [OSCAR-CLI](https://docs.oscar.grycap.net/oscar-cli/).

Here we have an example of how to install it:

  * Create the directory where you want to place oscar-cli. You can use others directories already created in the system.
    ```bash
    mkdir -p $HOME/.ownpath
    ```

  * Export the path, so the next time we open the terminal, it will be searching in the `.ownpath` directory. If you are using a directory that is already in the path, skip this step 
    ``` bash
    echo 'export PATH="$HOME/.ownpath:$PATH"' >> $HOME/.bashrc
    ```

  * Download the binary file. The URL can change depending on the version
    ``` bash
    GET https://github.com/grycap/oscar-cli/releases/download/v1.2.5/oscar-cli > $HOME/.ownpath/oscar-cli
    ```

  * Assign execute permissions to the binary file
    ``` bash
    chmod +x $HOME/.ownpath/oscar-cli
    ```

  * OSCAR-CLI is already installed. Now you have to add the new cluster. In this case, the cluster name is going to be `oscar-cluster`. You have to use the user and password from OSCAR.  
    ``` bash
    oscar-cli cluster add oscar-cluster https://localhost $OSCARuser $OSCARpass
    ```

#### Login to a public container image registry

The best way to test your use-case container images is by pushing them to a public registry. We recommend you to use [GitHub Container Registry](https://github.com/features/packages) or [Docker Hub](https://hub.docker.com/).

``` bash
docker login
```

By default, the `docker login` command will log you in Docker Hub. If you want to log in to GitHub Container Registry, you should generate a [token](https://github.com/settings/tokens) and use the next command:

``` bash
docker login ghcr.io
```


### STEP 1: Create or adapt the use-case program

Create or adapt a program in the programming language you want. Remember that your application will need, at least, two parameters: the input (which could be a text string or a file) and the output (which is the path of the file you are going to write). Test it.


### STEP 2: Dockerfile

Now we need to make the Dockerfile in order to build the container image. We need to have in mind that the structure will always be the same:

``` Dockerfile
FROM {image}
RUN {add dependencies}
COPY {executable file from my computer} {path where the files are going to state}
```

If the language you are using is an interpreter language, you will need to copy all the files, but in case you are using another language like Java or C, you must copy the java machine code or the binary code after compiling it.


### STEP 3: Testing the container image locally

Now is time to test the program in the docker environment. First, we need to build the image. If some mistake shows up here means that Dockerfile is not well made.

``` bash
docker build -t $docker_repo/$docker_name .
```

Once we have built it, we need to run it and try to execute our code. When you run the next command, a new terminal will open. If you have to pass a file or you want to get the output file use the volume option (`-v`).

``` bash
docker run -it $docker_repo/$docker_name
docker run -it -v {$PWD or the path you desire}:{path input/output} $docker_repo/$docker_name
```

Execute your code. If you get an error due to missing dependencies, update the Dockerfile, build, and run it again.


### STEP 4: Upload the image to a repository

To push the image to a public repository, you first have to build it. If you look at some tutorials, you will see that they create the image, tag it and push it into the repository. You can skip the tagging process by just building it with the final name. If you are using Docker Hub, the name will be like `$username/$containername`, but if you are using GitHub Container Registry instead, you have to add `ghcr.io/` at the beginning.

```bash
docker build -t $docker_repo/$docker_name .
docker push $docker_repo/$docker_name
```


### STEP 5: Create the script

The following script is going to be executed inside the container when you trigger the service by uploading a file to the specified input bucket, by invoking the service via the OSCAR's API or using OSCAR-CLI. The path of the input file is the environment variable `$INPUT_FILE_PATH`, and the directory where you need to put the output is in the environment variable `$TMP_OUTPUT_DIR`. To get the output file name, parse the input like this:

``` bash 
FILE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$FILE_NAME"
```
If your use-case can run just with a script you can directly use a distribution base image, or if you only need to install some dependencies you can comment the COPY line in the Dockerfile to make the image lighter.


### STEP 6: Function Definition File

Right now, our container image with the code and dependencies is in a public repository, and we have created the script that will run inside the container. We can create the OSCAR service using the UI, but it's better to create a YAML file to deploy the services whenever you want and automate the process. You can check the [FDL section in the OSCAR documentation](https://docs.oscar.grycap.net/fdl/), but also you can see [other examples](https://github.com/grycap/oscar/tree/master/examples). Once you have created the file, you need to deploy the services with the next command:

``` bash
oscar-cli apply $yaml_file
```




[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).