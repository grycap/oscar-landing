---
title: "Guide to creating a service in OSCAR"
date: 2022-05-10T09:00:00+01:00
# post image
image: "/images/oscar3-logo-trans.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide to show the developers how to create a their first service in OSCAR."
# post draft
draft: false
---


This is a guide to show the developers how to create their first service in OSCAR. Once you see it, you will know to do it faster.


### Previews STEPs :



#### Previews STEPs 0.1: Deploy the OSCAR cluster


Follow the [deployment instructions](https://o-scar.readthedocs.io/en/latest/deploy.html). Or you can execute this script to install it locally.
```
curl -L http://go.oscar.grycap.net | bash
```
Log in to the OSCAR UI using the [Default Service Endpoints](https://o-scar.readthedocs.io/en/latest/usage.html#default-service-endpoints) and access credentials to verify the successful installation.

![01-oscar-login.png](../../images/blog/post-text-to-speech/01-oscar-login.png)


#### Previews STEPs 0.2: Install OSCAR-CLI

As a recommendation, you should use the command line interface [OSCAR-CLI](https://docs.oscar.grycap.net/oscar-cli/).

Here we have an example of how to install it:

  * Create the directory where it is going to be oscar-cli. You can use others directories that are already in the system
    ```bash
    mkdir -p $HOME/.ownpath
    ```

  * Export the path, so the next time we open the terminal, it will be searching in ".ownpath" directory. If you are using a directory that is already in the path, skip this step 
    ``` bash
    echo 'export PATH="$HOME/.ownpath:$PATH"' >> $HOME/.bashrc
    ```

  * Download the binary file. The URL can change depending on the version
    ``` bash
    GET https://github.com/grycap/oscar-cli/releases/download/v1.2.5/oscar-cli > $HOME/.ownpath/oscar-cli
    ```

  * Must assign execute permissions to the binary file that you just download
    ``` bash
    chmod +x $HOME/.ownpath/oscar-cli
    ```

  * OSCAR-CLI is already installed. Now you have to add the new cluster. In this case, the cluster name is going to be oscar-cluster. You have to use the user and password from OSCAR.  
    ``` bash
    oscar-cli cluster add oscar-cluster https://localhost:443 $OSCARuser $OSCARpass
    ```
#### Previews STEPs 0.3: Have Docker repository public

To have access from OSCAR to the image. The best way to do it is using a public repository. We recommend you to use docker hub or Github    
``` bash
docker login
```
By default, you will log in to the docker hub. If you want to log in to Github, use the next command, and you should generate a [token](https://github.com/settings/tokens):
``` bash
docker login ghcr.io
```


### STEP 1: Create the program and adapt params
Create a program in the language you want. Remember that you need the parameters, at least 2, the input (which could be a string or a file) and output(which is the path of the file you are going to write, you always have to write there). Test it.


### STEP 2: Dockerfile
Now we need to make the Dockerfile that creates the image. We need to have in mind that the structure will always be the same:

``` Dockerfile
FROM {image}
RUN {add dependencies}
COPY {executable file from my computer} {path where the files are going to state}
```

If the language you are using is an interpreter language, you will copy all the files, but in case we are using another language like Java or C, we will copy the java machine code or the binary code after we compile them.


### STEP 3: Testing image docker in local 

Now is time to test the program in the docker environment. First, we need to build the image. If some mistake shows up here means that Dockerfile is not well made

``` bash
docker build -t $docker_repor/$docker_name .
```

Once we have built it, we need to run it and try to execute our code. When you run the next command, a new terminal will open. If you have to pass a file or you want to get the output file use the volume option

``` bash
docker run -it $docker_repor/$docker_name
docker run -it -v {$PWD or the path you desire}:{path input/output} $docker_repor/$docker_name
```

Execute your code. The command will change depending on the language. If you get an error due to dependence, change the Dockerfile, build it, and run it again.


### STEP 4: Use repository / Upload the image to a repository

To push the image to the public repository, you have to build it and push it. If you look at some tutorials, you will see that they create the image, tag it and push it into the repository. You can skip the tagging process by just building it with the final name. If you are using docker hub, the name will be like `$username/$namecontainer`, but if you are using Github instead have to add `ghcr.io/` at the beginning.

```bash
docker build -t $docker_repor/$docker_name .
docker push $docker_repor/$docker_name
```


### STEP 5: Create the script

The next script is going to be executed inside the docker when you trigger the services by uploading a file to the bucket you specified or invoking the service. The path of the input files is the variable `$INPUT_FILE_PATH`, and the directory where you need to put the output is in the variable `$TMP_OUTPUT_DIR`. To get the output file name, parse the input like this:

``` bash 
FILE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$FILE_NAME"
```

If you just run a script like a program and don't need to add any files to the container, so this step and the first one are the same. In Dockerfile, you can comment on the line of COPY to make the image container lighter. But the dependencies will state the same.



### STEP 6: Yaml

Right now, our container image with the code and dependencies is in a public repository, and we have created the script that will run inside the docker. We can create the service using the UI, but it is better to create a YAML file to deploy the services whenever you want and automate the process. You can check the [oscar documentation in the FDL section](https://docs.oscar.grycap.net/fdl/), but also you can see [other examples](https://github.com/grycap/oscar/tree/master/examples). Once you have created the file, you need to deploy the services with the next command:

``` bash
oscar-cli apply $yaml_file
```




[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).