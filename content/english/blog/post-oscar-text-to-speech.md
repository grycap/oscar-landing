---
title: "Convert Text to Speech with OSCAR"
date: 2022-05-09T18:00:00+01:00
# post image
image: "images/blog/post-text-to-speech/text-to-speech.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "Using OSCAR's synchronous invocations to convert text to audio files"
# post draft
draft: false
---


This use case implements text to speech transformation using the OSCAR serverless platform and the [Google Speech](https://pypi.org/project/google-speech/) library, where an input of plain text returns an audio file.

### Previous step: Deploy the OSCAR cluster on an IaaS Cloud and install OSCAR-CLI

Follow the [deployment instructions with IM Dashboard](https://docs.oscar.grycap.net/deploy-im-dashboard/). Or you can execute this script to install it locally.

```bash
curl -L http://go.oscar.grycap.net | bash
```
To create the function, we will use the command line interface [OSCAR-CLI](https://docs.oscar.grycap.net/oscar-cli/).

![01-oscar-login.png](../../images/blog/post-text-to-speech/01-oscar-login.png)




### STEP 1: Deploy the Service

We will use OSCAR-CLI to deploy the use-case service, [this](https://github.com/grycap/oscar/tree/master/examples/text-to-speech) directory contains all the required files. You can open and see all the files:
  * The Dockerfile to create our [text-to-speech container image](https://github.com/orgs/grycap/packages/container/package/text-to-speech), using Ubuntu 20.04 as base image and installing all the required dependencies.
  * The code, implemented Python, uses the [Google Speech](https://pypi.org/project/google-speech/) library to convert text to speech.
  * The user-script that will be executed inside the container when the service is triggered is in the file "script.sh" and it will start the Python program.
  * Last but not least, the YAML-based Functions Definition File (FDL) provides the definition to create the service via oscar-cli.


#### STEP 1.1: Get the YAML file ready

Check in the yaml file that the cluster identifier is defined (OSCAR-CLI has to be configured with the same cluster identifier) and set the "language" environment variable to the language you want to hear the output voice. If you do not know the language code, you can find it [here](https://www.andiamo.co.uk/resources/iso-language-codes/).

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

To deploy the service, use the command:
```sh
oscar-cli apply tts.yaml
```
![03-oscar-apply.png](../../images/blog/post-text-to-speech/03-oscar-apply.png)



### STEP 2: Verify the Service

After some seconds, the service will be created. The input and output buckets will be automatically created as well. Verify that the service is up and running with the command:

```sh
oscar-cli service list
```

![04-oscar-checkServices.png](../../images/blog/post-text-to-speech/04-oscar-checkServices.png)


### STEP 3: Invoke the Service Synchronously and Access the Output Files

To run the service synchronously, use the command:

```sh
oscar-cli service run text-to-speech --text-input "Hello everyone"  --output output.mp3
```

You also can pass a text file by substituting the flag `--text-input {string}` to `--input {filepath}`

And if you have installed vlc and you want to directly play the result, use this one:

```sh
oscar-cli service run text-to-speech --text-input "Hello everyone"  --output output.mp3 && vlc output.mp3
```

![05-oscar-run.png](../../images/blog/post-text-to-speech/05-oscar-run.png)


#### STEP 3.1: Asynchronously

You can also trigger the service asynchronously by uploading a text file to a MinIO bucket in `text-to-speech/input` and, when the execution finishes, the result file can be found in `text-to-speech/output`. Input and output fields in the YAML file can be removed if we are only going to use the service synchronously.


### STEP 4: Remove the Function

Once you have finished, you can delete the service using the command:

```sh
oscar-cli service remove text-to-speech
```

![06-oscar-remove.png](../../images/blog/post-text-to-speech/06-oscar-remove.png)


[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
