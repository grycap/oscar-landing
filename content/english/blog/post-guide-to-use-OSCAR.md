---
title: "Guide to create a service in OSCAR"
date: 2022-05-10T09:00:00+01:00
# post image
image: "/images/blog/post-guide-to-use-OSCAR/main.jpeg"
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

Follow the [deployment instructions with the IM Dashboard](https://docs.oscar.grycap.net/deploy-im-dashboard/). Alternatively, you can execute this script to deploy the cluster locally using kind. Kind will name the cluster `oscar-test`.

```bash
curl -sSL http://go.oscar.grycap.net | bash
```

Log in to the OSCAR UI using the previously provided credentials to verify that the cluster has been successfully deployed, and save them to use later in the guide.

![01-oscar-login.png](/images/blog/post-guide-to-use-OSCAR/01-oscar-login.png)

#### Install OSCAR-CLI

To easily interact and manage an OSCAR cluster, it is recommended the use of the command line interface [OSCAR-CLI](https://docs.oscar.grycap.net/oscar-cli/).

Here we have an example of how to install it:

  * Create the directory where you want to place oscar-cli. You can use other directories already created in the system.
    ```bash
    mkdir -p $HOME/.oscar-cli_path
    ```

  * Export the path, so the next time we open the terminal, it will be searching in the `.oscar-cli_path` directory. If you are using a directory that is already in the path, skip this step 
    ``` bash
    echo 'export PATH="$HOME/.oscar-cli_path:$PATH"' >> $HOME/.bashrc
    ```

  * Download the binary file. The URL can change depending on the version
    ``` bash
    GET https://github.com/grycap/oscar-cli/releases/download/v1.2.5/oscar-cli > $HOME/.oscar-cli_path/oscar-cli
    ```

  * Assign execute permissions to the binary file
    ``` bash
    chmod +x $HOME/.oscar-cli_path/oscar-cli
    ```

  * Now OSCAR-CLI has been installed. Add the `oscar-test` cluster previously created to the OSCAR-CLI tool with the [add command](https://docs.oscar.grycap.net/oscar-cli/#add) to be able to manipulate the cluster with OSCAR-CLI. In this case, we will name the cluster `oscar-cluster`, so from now on whenever we want to work with our cluster when using OSCAR-CLI, we will refer to it as `oscar-cluster`. Use the user and password you obtained earlier when creating the OSCAR cluster. To use OSCAR-CLI in a local deployment, you should set the `--disable-ssl` flag at the end to disable verification of the self-signed certificates
    ``` bash
    oscar-cli cluster add oscar-cluster https://localhost $OSCARuser $OSCARpass
    ```

    You can check that the cluster has been properly added to the OSCAR-CLI tool by opening the configuration file with a text editor with the following command, or edit the credentials in case you misspelled any parameter:
    ``` bash
    vi $HOME/.oscar-cli_path/config.yaml
    ```

#### Login to a public container image registry

The best way to test your use-case container images is by pushing them to a public registry. We recommend you to use [GitHub Container Registry](https://github.com/features/packages) or [Docker Hub](https://hub.docker.com/). To get more details, refer to the [Docker](https://docs.docker.com/) documentation.

``` bash
docker login
```

By default, the `docker login` command will log you in Docker Hub. If you want to log in to GitHub Container Registry, you should generate a [token](https://github.com/settings/tokens) and use the next command:

``` bash
docker login ghcr.io
```


### STEP 1: Create or adapt the use-case program

Create or adapt a program in the programming language you want. Remember that your application will need, at least, two parameters: the input (which could be a text string or a file) and the output (which is the path of the file you are going to write). Test it.
Some examples of programs can be checked [here](https://github.com/grycap/oscar/tree/master/examples).


### STEP 2: Dockerfile

Once we have our program, we need to make a Dockerfile in order to build a container image. The structure will be similar to this:

``` Dockerfile
FROM {image}
RUN {add dependencies}
COPY {executable file from my computer} {path where the files are going to state in the image}
```

If the language you are using is an interpreter language, you will need to copy all the files, but in case you are using another language like Java or C, you must copy the java machine code or the binary code after compiling it.


### STEP 3: Testing the container image locally

Now is time to test the program in the docker environment. First, we need to build the image. If some mistake shows up here means that the Dockerfile is not well made.
Remember that if you don't run the command in the same directory where the Dockerfile is, you will have to use the `-f` flag and write the path to it.

``` bash
docker build -t $name_of_the_repository/$name_of_the_image .
```

Once we have built it, we need to launch it and try to execute our code. When you run the next command, a new terminal will open. If you have to pass a file or you want to get the output file use the volume option (`-v`).

``` bash
docker run -it $name_of_the_repository/$name_of_the_image
docker run -it -v {$PWD or the local path of the file}:{input/output path on the image} $name_of_the_repository/$name_of_the_image
```

Execute your code. If you get an error due to missing dependencies, update the Dockerfile, build, and run it again to test the program.


### STEP 4: Upload the image to a repository

Once you have built and run the image to check that the program is working properly, you have to push the image to a public repository like [DockerHub](https://hub.docker.com/repositories) or [GitHub Container Registry](url??). To directly push the image and skip the tagging process,you need to build the image with the final name. If you are using Docker Hub, the name will be like `$username/$containername`, but if you are using GitHub Container Registry instead, you have to add `ghcr.io/` at the beginning.

```bash
docker build -t $name_of_the_repository/$name_of_the_image .

docker push $name_of_the_repository/$name_of_the_image
```


### STEP 5: Create the script

Now we will create the script that will allow our program to communicate with the OSCAR cluster and run it. The script is going to be automatically executed inside the container when you trigger the OSCAR service by uploading the input file (via OSCAR-CLI or the OSCAR's API). The path where the input file is located is represented by the environment variable `$INPUT_FILE_PATH`, whereas the path where the output file is going to be created will be represented by the environment variable `$TMP_OUTPUT_DIR`. To get the output file name, parse the input like this:

``` bash 
FILE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$FILE_NAME"
```
Remember that this communication is automatically done by OSCAR and the only thing you have to add in order to trigger the service is the command to run your program along with the input and output paths. For example, if your program was written on Python, you would have to add the following line:

``` bash 
python3 /path/to/program.py $INPUT_FILE_PATH -o "$OUTPUT_FILE"
```

If your use-case can run just with a script you can directly use a distribution base image, or if you only need to install some dependencies you can comment the COPY line in the Dockerfile to make the image lighter.


### STEP 6: Function Definition File

Finally, our container image with the code and dependencies are in a public repository and we have created the script that will run inside the container to communicate with the OSCAR cluster.
Now we can create the OSCAR service using the UI, but it's recommended to create a YAML file to deploy the service(s) whenever you want and automate the process. You can check the [FDL section in the OSCAR documentation](https://docs.oscar.grycap.net/fdl/) for more information, but the simplest YAML file should look like the following:

``` bash
functions:
  oscar:
  - oscar-cluster:
      name: name_of_service
      memory: 1Gi
      cpu: '1.0'
      image: name_of_the_repository/name_of_the_image:tag
      script: path/to/script.sh
      input:
      - storage_provider: minio
        path: name_of_bucket/in
      output:
      - storage_provider: minio
        path: name_of_bucket/out
```
*Keep in mind that the name of the service cannot contain the "-" or "_" characters.*

You can also check the [other examples](https://github.com/grycap/oscar/tree/master/examples) already listed before to see how the whole process for the creation of a service looks like. Once you have created the file, you have to deploy the service(s) with the next command:

``` bash
oscar-cli apply $yaml_file
```




[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).