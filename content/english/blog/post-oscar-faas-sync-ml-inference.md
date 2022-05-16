---
title: "Using OSCAR as a FaaS platform for synchronous inference of a machine learning model"
date: 2022-05-16T09:00:00+01:00
# post image 
image: "images/blog/post-20220516-1/plants.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "How to use oscar-cli to deploy and use an inference deep learning model synchronously"
# post draft
draft: false
---

<!--- TODO 1. Hablar sobre el modelo del ejemplo --->

This guide is going to be about the use of the OSCAR platform to the inference of the machine learning model PlantsClassification, a pre-trained Convolutional Neural network classification model by DEEP-Hybrid-DataCloud [Plants species classifier](https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-plants-classification-tf.html) to classify plants pictures by specie. The PREDICT method works with an RGB image as input and returns a JSON with the top 5 predictions of the plant's specie.

<!--- 2. Hablar sobre las invocaciones síncronas (referenciar post con invocaciones asíncronas) --->

The example is going to be focused on synchronous invocations. OSCAR supports two types of invocations:

* **Asynchronous**: Where users upload files to a bucket which triggers the execution of the corresponding function. An example of this type of invocation can be found on [Using OSCAR as a FaaS platform for scalable asynchronous inference of a machine learning model](https://oscar.grycap.net/blog/post-oscar-faas-scalable-ml-inference/)

* **Synchronous**: The user runs the function specifying a file to process, so instead of running a function by the trigger of a webhook event, there is a serverless backend listening to petitions of execution. In this method, the result file is, as well as in the previous example, stored into an output bucket but if you are using oscar-cli it will also prompt the results on the terminal or in a local file if it is indicated. 


<!--- 3. Explicar si el cluster es local o se ha usado i3m (referenciar documentación de como usar) --->
In order to deploy the OSCAR cluster to go ahead with this example, you can either use a local deployment for testing ([How to test OSCAR localy here](https://docs.oscar.grycap.net/local-testing/)) or the GryCAP Infrastructure Manager's Dashboard (IM Dashboard) ([How to deploy OSCAR with the IM Dashboard here](https://docs.oscar.grycap.net/deploy-im-dashboard/)).


Synchronous functions have two ways of beeing invoked, either using the `oscar-cli` or making a petition to the OSCAR API. 
This example shows how to use `oscar-cli` to deploy and invoke your function. You can see how to install `oscar-cli` [here](https://github.com/grycap/oscar-cli).

<!--- 4. Pasos con oscar-cli  --->
### Steps using oscar-cli

**Step 1:** Add the cluster to the `oscar-cli` list of clusters. 
``` bash
$ oscar-cli cluster add [IDENTIFIER] [ENDPOINT] [USERNAME] {PASSWORD | --password-stdin} [flags]
```
Where:
* `IDENTIFIER` is the name of your cluster.
* `ENDPOINT` is the URL where OSCAR is exposed.
* `USERNAME` and PASSWORD are the values you chose when deploying your cluster.

**Step 2:** Add the definition of the function using the [OSCAR FDL (Functions Definition Language)](https://docs.oscar.grycap.net/fdl/) with the following command, where `FDL_FILE` is the name of the function file.

``` bash
$ oscar-cli apply [FDL_FILE]
```

You can see below the definition of the function for this example alongside with the script to be executed on the service container. 

Some important things to outline on this definition:
* As you can see, there is no need to specify an input storage. This is because, as mentioned before, synchronous functions aren't triggered by uploading files to a bucket but with an explicit petition.
* To get the correct output, synchronous services need to set the parameter `log_level: CRITICAL`. This can also be done on the OSCAR ui either during the service creation or after by editing such service.

``` yaml
functions:
  oscar:
  - oscar-cluster:
      name: plants-sync
      memory: 2Gi
      cpu: '1.0'
      image: deephdc/deep-oc-plants-classification-tf
      log_level: CRITICAL
      script: plants-sync.sh
      output:
      - storage_provider: minio.default
        path: plants-sync/output
```

``` bash
#!/bin/bash

IMAGE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$IMAGE_NAME"

# Adding the extension to the input file received as a base64 payload
mv $INPUT_FILE_PATH "$INPUT_FILE_PATH.jpg"

echo "SCRIPT: Invoked deepaas-predict command. File available in $INPUT_FILE_PATH." 
deepaas-predict -i "$INPUT_FILE_PATH.jpg" -o $OUTPUT_FILE
```
<!--- 5. Referenciar a documentación para ejemplo de uso de la interfaz OSCAR--->

**_Note:_** *This process so far can be made with the OSCAR-UI as it is shown on the [asynchronous example](https://oscar.grycap.net/blog/post-oscar-faas-scalable-ml-inference/) mentioned before.*

<!--- 6. Ejecución de la función --->
**Step 3:** Invoke the function.

Using OSCAR-CLI you can run the following command to invoke the function:

``` bash
$ oscar-cli service run [SERVICE_NAME] {--input | --text-input}
```

or make the following petition:

``` bash
$ curl --location --request POST 'https://[CLUSTER_ENDPOINT]/run/[SERVICE_NAME]' \
--header 'Authorization: Bearer [TOKEN]' \
--form '=@"[PATH_FILE]"'
```
So, in this example, with a plant image as input, the result would be a JSON such as the one shown below.

![Service invocation](../../images/blog/post-20220516-1/service-invocation-example.png)

**_Note:_** 
-  *For more information about the usage of `oscar-cli` visit [OSCAR Documentation - oscar-cli](https://docs.oscar.grycap.net/oscar-cli/)*
- *For more information about the OSCAR API visit [OSCAR Documentation - OSCAR API](https://docs.oscar.grycap.net/api/)*