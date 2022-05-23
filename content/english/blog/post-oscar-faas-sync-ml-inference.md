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

This guide aims to show the usage of the OSCAR platform for Machine Learning inference using a pre-trained Convolutional Neural network classification model by [DEEP-Hybrid-DataCloud](https://deep-hybrid-datacloud.eu/): the [Plants species classifier](https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-plants-classification-tf.html), to classify plant pictures by specie. The PREDICT method works with an RGB image as input and returns a JSON with the top 5 predictions of the plant's specie.

The example is going to be focused on synchronous invocations. OSCAR supports two types of invocations:

* Asynchronous: Where users upload files to a bucket which triggers the execution of the corresponding service as a Kubernetes job, which result will be stored in a specified output bucket. An example of this type of invocation can be found on: [Using OSCAR as a FaaS platform for scalable asynchronous inference of a machine learning model](https://oscar.grycap.net/blog/post-oscar-faas-scalable-ml-inference/)

* Synchronous: The user invokes the service by sending the content of the file to be processed and, instead of creating a Kubernetes job per invocation, the HTTP client, or oscar-cli, waits until the execution finishes. To manage this, a serverless backend is required, OSCAR currently supports [Knative](https://knative.dev) and [OpenFaaS](https://www.openfaas.com/). In this method, the result file is returned in the response and, optionally, it could be stored into an output bucket.

![Synchronous invocations diagram](../../images/blog/post-20220516-1/oscar-sync.png)

In order to deploy the OSCAR cluster to go ahead with this example, you can either use a local deployment for testing ([How to test OSCAR localy here](https://docs.oscar.grycap.net/local-testing/)) or the GRyCAP Infrastructure Manager's Dashboard (IM Dashboard) ([How to deploy OSCAR with the IM Dashboard here](https://docs.oscar.grycap.net/deploy-im-dashboard/)).

OSCAR services can be invoked synchronously in two ways: using the `oscar-cli` or making a HTTP request to the [OSCAR API](https://docs.oscar.grycap.net/api/). 
This example shows how to use `oscar-cli` to deploy and invoke your function. You can see how to install `oscar-cli` [here](https://github.com/grycap/oscar-cli).

### Steps using oscar-cli

*All the required files to deploy this example can be found on the [OSCAR github repository](https://github.com/grycap/oscar/tree/master/examples/plant-classification-sync).*

**Step 1:** Add the cluster to the `oscar-cli` list of clusters. 

You can add a cluster to the `oscar-cli` list of clusters with the command
``` bash
$ oscar-cli cluster add [IDENTIFIER] [ENDPOINT] [USERNAME] {PASSWORD | --password-stdin} [flags]
```
where:
* `IDENTIFIER` is the name of your cluster.
* `ENDPOINT` is the URL where OSCAR is exposed.
* `USERNAME` and `PASSWORD` are the values you chose when deploying your cluster.

For example, if we have a local cluster with the name `oscar-cluster` and `oscar` as username and password (which is not a recommendable password), the command to add the cluster would look something like this:

``` bash
$ oscar-cli cluster add oscar-cluster "https://localhost" oscar oscar
```

**Step 2:** Create the service(s) defined in the [OSCAR's FDL (Functions Definition Language)](https://docs.oscar.grycap.net/fdl/) YAML with the following command, where `FDL_FILE` is the name of the FDL file. 

```bash
$ oscar-cli apply FDL_FILE
```
In order to use the function of this example, the command would be as it follows.
```bash
$ oscar-cli apply function.yaml
```

You can see below the definition of the service for this example, that is the content of the function.yaml file, alongside with the script to be executed on the service container. 

Some important things to outline on this definition:
* As you can see, there is no need to specify an input storage. This is because, as mentioned before, synchronous functions aren't triggered by uploading files to a bucket but with an explicit request. Additionally, the storage of the output on synchronous invocations is optional, so it is not specified in this definition.
* To get the correct output, synchronous services need to set the parameter `log_level: CRITICAL` in order to avoid logs mixed within the output. This can also be done on the OSCAR user interface either during the service creation or afterwards by editing such service.

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
```

``` bash
#!/bin/bash

IMAGE_NAME=`basename $INPUT_FILE_PATH`
OUTPUT_FILE="$TMP_OUTPUT_DIR/$IMAGE_NAME"

# Adding the extension to the input file
mv $INPUT_FILE_PATH "$INPUT_FILE_PATH.jpg"

echo "SCRIPT: Invoked deepaas-predict command. File available in $INPUT_FILE_PATH." 
deepaas-predict -i "$INPUT_FILE_PATH.jpg" -o $OUTPUT_FILE
```

**_Note:_** *This process so far can be made with the OSCAR-UI as it is shown on the [asynchronous example](https://oscar.grycap.net/blog/post-oscar-faas-scalable-ml-inference/) mentioned before.*

**Step 3:** Invoke the function.

The command to invoke a function through OSCAR-CLI is at it follows.

``` bash
$ oscar-cli service run [SERVICE_NAME] {--input | --text-input}
```

To invoke the example service using an image from the example repository you can run one of the following commands, depending on the way you want to get the output.  

``` bash
# Invocation of "plants-sync" service
$ oscar-cli service run plants-sync --input images/image3.jpg

# Invocation of "plants-sync" service storing the result
$ oscar-cli service run plants-sync --input images/image3.jpg --output image3-output.json
```

So, with the plant picture `image3.jpg` as input, the result would be a JSON such as the one shown beautified below.

![Result of the execution](../../images/blog/post-20220516-1/service-invocation-example.png)

Besides that, if you want to make the invocation whithin the API, you need to get first the authorization token. It can be found on the OSCAR UI by accessing the service or by command line running `oscar-cli service get [SERVICE_NAME]`.

``` bash
$ curl --location --request POST 'https://[CLUSTER_ENDPOINT]/run/[SERVICE_NAME]' \
--header 'Authorization: Bearer [TOKEN]' \
--form '="[FILE]"'
```

**_Note:_** *`FILE` parameter must be a base64 payload of the input file.*

Following the example of a local test cluster and a service called `plants-sync` the API call would look as follows:

``` bash
$ curl --location --request POST 'https://localhost/run/plants-sync' \
--header 'Authorization: Bearer [some token]' \
--form '="[some base64 payload]"'
```

**_Note:_** 
-  *For more information about the usage of `oscar-cli` visit [OSCAR Documentation - oscar-cli](https://docs.oscar.grycap.net/oscar-cli/)*
- *For more information about the OSCAR API visit [OSCAR Documentation - OSCAR API](https://docs.oscar.grycap.net/api/)*