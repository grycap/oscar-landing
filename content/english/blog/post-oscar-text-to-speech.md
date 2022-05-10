---
title: "Convert Text to Speech with OSCAR"
date: 2022-05-09T18:00:00+01:00
# post image
image: "images/blog/post-text-to-speech/text-to-speech.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "Using OSCAR invoke synchronously running both on edge and in an IaaS Cloud for Edge AI inference"
# post draft
draft: false
---



This use case implements text to speech transform using the serverless platform OSCAR and [Google Speech](https://pypi.org/project/google-speech/) library, where introducing an input of text string or text file return an audio file.

### Previews STEPs : Deploy the OSCAR cluster on an IaaS Cloud and install OSCAR-CLI

Follow the [deployment instructions](https://o-scar.readthedocs.io/en/latest/deploy.html). Or you can execute this script to install it locally.
```
curl -L http://go.oscar.grycap.net | bash
```

To create the function we are going to use the command line interface [OSCAR-CLI](https://docs.oscar.grycap.net/oscar-cli/).



Log in into the OSCAR UI using the [Default Service Endpoints](https://o-scar.readthedocs.io/en/latest/usage.html#default-service-endpoints) and access credentials. To verify the succesfull installation.

![01-oscar-login.png](../../images/blog/post-text-to-speech/01-oscar-login.png)




### STEP 1: Deploy the Service

To deploy the service we are going to use OSCAR-CLI and the directory that we provide you [here](https://github.com/grycap/oscar/tree/master/examples/text-to-speech). You can open and see all the files:
  * The Dockerfile creates a image from an ubuntu 20.04 container and installs all the dependencies, after that copies into the container the code we would like to execute
  * Because it is a python program which is an interpreter language program we can open it and see the code inside. We are using the [Google Speech](https://pypi.org/project/google-speech/) library to convert text to speech
  * The code that is going to execute inside the container when the services get invoked is the file script.sh and it will trigger the python program
  * Last but not least the yaml file provide all the infrastructure to create the services

As an advise we can give you:
 * Dont change this two last files (script.sh and tss.yaml)
 * When you execute yaml file you should have both files in the same directory

#### STEP 1.1: Get the file .yaml ready

Check in the yaml file that the cluster name exist(as well OSCAR-CLI has to be configured with the same cluster name) and select in which language you want to hear the voice. If you do not know the code language, you will found it in this [page](https://www.andiamo.co.uk/resources/iso-language-codes/).

```
functions:
  oscar:
  - oscar-cluster:
      name: text-to-speech
      memory: 1Gi
      cpu: '1.0'
      image: ghcr.io/grycap/text-to-speech
      script: script.sh
      log_level: CRITICAL
      input:
      - storage_provider: minio
        path: text-to-speech/input
      output:
      - storage_provider: minio
        path: text-to-speech/output
      environment: 
        Variables:
          language: en
```




#### STEP 1.2: Use OSCAR-CLI to Deploy the Service

To deploy the service use the command:
```sh
oscar-cli apply tts.yaml
```
![03-oscar-apply.png](../../images/blog/post-text-to-speech/03-oscar-apply.png)



### STEP 2: Verify the Service

After some minutes the service will be created. The input and output buckets will be automatically created as well. Verify that the service is up with the command:

```sh
oscar-cli services list
```

![04-oscar-checkServices.png](../../images/blog/post-text-to-speech/04-oscar-checkServices.png)


### STEP 3: Invoke the Service Synchronously And Access the Output Files

To run the service synchronously use the command:
```sh
oscar-cli service run text-to-speech --text-input "Hello everyone"  --output "output.mp3"
```
You also can pass a file text substituing the flag `--text-input {string}` to `--input {filepath}`

And if you have installed vlc and you want to play it use this one:
```sh
oscar-cli service run text-to-speech --text-input "Hello everyone"  --output "output.mp3" && vlc output.mp3
```
![05-oscar-run.png](../../images/blog/post-text-to-speech/05-oscar-run.png)


#### STEP 3.1: Asynchronously

You can trigger the service in an asynchronous way just uploading a file to a minio bucket in `text-to-speech/input` and the result can be found in `text-to-speech/output`. Input and output fields in yaml file could be remove if only we are going to use the services synchronously.

### STEP 4: Remove the Function


Once you have finished you could delete the service using the command:

```sh
oscar-cli services remove text-to-speech
```

![06-oscar-remove.png](../../images/blog/post-text-to-speech/06-oscar-remove.png)


[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
