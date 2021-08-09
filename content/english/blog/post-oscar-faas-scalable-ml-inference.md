---
title: "Using OSCAR as a FaaS platform for scalable asynchronous inference of a machine learning model"
date: 2021-08-09T09:00:00+01:00
# post image
image: "images/blog/post-20210803-1/posenet.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "How to use oscar-cli and Oscar GUI to deploy and use an inference deep learning model"
# post draft
draft: false
---

OSCAR is a framework to efficiently support on-premises FaaS (Functions as a Service) for general-purpose file-processing computing applications. Users upload files to a bucket and this automatically triggers the execution of parallel invocations to a function responsible for processing each file. For example, you can deploy a machine learning inference environment by defining a function in your OSCAR cluster, and every time you upload an image to your bucket the inference process is triggered, and the result is stored. 

To manage your elastic OSCAR cluster and define functions you have two options: either the [Oscar graphical user interface, i.e. OSCAR-GUI](https://grycap.github.io/oscar/usage/), or [a command line tool called OSCAR-CLI](https://github.com/grycap/oscar-cli). 

In the following guide you are going to learn how to deploy a machine learning inference environment and to use it employing both tools. You  can also find a [YouTube]({{< relref "post-oscar-faas-scalable-ml-inference.md#youtube-video" >}}) video of the whole process below.

Some useful information before beginning:

* The elastic OSCAR cluster can be deployed using the IM Dashboard as explained [here in the documentation](https://grycap.github.io/oscar/deploy-im-dashboard/).
* The OSCAR GUI is exposed via a Kubernetes ingress and it is accessible via the Kubernetes master node IP.
* The OSCAR-CLI can be easily [installed in your local](https://github.com/grycap/oscar-cli#install-from-source).
* The chosen model is the Posenet model, developed by Google and available in the [DEEP Open Catalog](https://marketplace.deep-hybrid-datacloud.eu/modules/deep-oc-posenet-tf.html), that detects the pose of a person in an image. The *predict* method expects an RGB image as input and returns as output the different body keypoints with the corresponding coordinates and the associated key score. 

### Add a cluster to OSCAR-CLI

**Step 1:** Once your OSCAR cluster is deployed, and OSCAR-CLI installed, you can add the cluster by simply executing:
{{< highlight bash>}}$ oscar-cli cluster add IDENTIFIER ENDPOINT USERNAME {PASSWORD | --password-stdin} [flags]{{< / highlight >}}
Where:
* IDENTIFIER is a name for your cluster.
* ENDPOINT is where OSCAR is exposed.
* USERNAME and PASSWORD are the values you chose when deploying your cluster.

**Step 2:** Check the added cluster: {{< highlight bash>}}$ oscar-cli cluster list {{< / highlight >}}

![OSCAR-CLI add cluster](../../images/blog/post-20210803-1/add-list-cluster.png)
As you can see, the cluster *oscar-cluster* is added and marked as *Default*. Now, you are ready to deploy a service.

### Create a FaaS in our elastic OSCAR cluster

To create a FaaS you need to create a new service in your elastic OSCAR cluster. You can use either OSCAR-CLI or the OSCAR graphical interface.

#### Using OSCAR-CLI to deploy a new service

**Step 1:** First, create a FDL file:

{{< highlight yaml "linenos=inline">}}

functions:
  oscar:
  - oscar-cluster:
      name: posenet
      memory: 2Gi
      cpu: '1.0'
      image: deephdc/deep-oc-posenet-tf
      script: deepaas.sh
      input:
      - storage_provider: minio.default
        path: posenet/input
      output:
      - storage_provider: minio.default
        path: posenet/output

{{< / highlight >}}

In this example, your cluster *oscar-cluster* deploys the service *posenet* using the image *deephdc/deep-oc-posenet-tf*. It uses a MinIO bucket to store the input images (that triggers the inference) and the output results. And it executes the following script (saved as `deepass.sh`):

{{< highlight bash "linenos=inline">}}
#!/bin/bash

IMAGE_NAME=`basename "$INPUT_FILE_PATH"`
OUTPUT_IMAGE="$TMP_OUTPUT_DIR/"

deepaas-predict -i "$INPUT_FILE_PATH" -ct application/zip -o $OUTPUT_IMAGE
{{< / highlight >}}

**Step 2:** Add the service to your cluster by applying the FDL file:

{{< highlight bash>}}$ oscar-cli apply posenet-fdl.yaml{{< / highlight >}}

![oscar-cli apply posenet-fdl.yaml](../../images/blog/post-20210803-1/apply-posenet-fdl.png)

**Step 3:** Check the deployed service:

![oscar-cli service list](../../images/blog/post-20210803-1/service-list.png)

**Step 4:** To modify some parameters in the deployed service you can just edit the FDL file and apply it again.

#### Using OSCAR graphical interface to deploy a new service

Alternatively, you can use the GUI as shown [here in the documentation](https://grycap.github.io/oscar/usage/#deploying-services):

![OSCAR-GUI Deploy New Service](../../images/blog/post-20210803-1/create_service_gui.png)

To inspect the just created service and edit the values (such as the assigned memory):

**Step 1:** Click the button to display the Service Info:

![Display Service Info](../../images/blog/post-20210803-1/service-info-1.png)

**Step 2:** From this section you can inspect the Service Info:

![Service info and edit](../../images/blog/post-20210803-1/service-info-edit.png)

**Step 3:** By clicking the edit button you can modify the values:

![Edit Service Info](../../images/blog/post-20210803-1/service-info-2.png)

**Step 4:** For example, to modify the assigned memory, go to the *Memory* section and edit the value:

![Edit memory Service Info](../../images/blog/post-20210803-1/service-info-3.png)

**Step 5:** Click *Next* to continue the wizard, and finally click *Submit*.

### Launching the POSENET inference service

As explained at the beginning, the deployed service will be triggered by uploading images to your input folder in your MinIO bucket. This process can also be done using either the OSCAR-CLI tool or the graphical interface.

#### Launch the service using OSCAR-CLI

**Step 1:** Keep track of the submitted jobs:

{{< highlight bash>}}$ watch oscar-cli service logs list posenet {{< / highlight >}}

For the moment, the logs are empty.

**Step 2:** Upload images to the input bucket:

{{< highlight bash>}}$ oscar-cli service put-file SERVICE_NAME STORAGE_PROVIDER LOCAL_FILE REMOTE_FILE {{< / highlight >}}

Where:
* SERVICE_NAME is *posenet* in the example.
* STORAGE_PROVIDER is *minio* in the example.
* LOCAL_FILE is the path to your image in your local machine.
* REMOTE_FILE is the path to the file to be store in your input folder in MinIO.

![oscar-cli service put-file](../../images/blog/post-20210803-1/put-file.png)

This upload triggers the execution of the jobs.

**Step 3:** Check the jobs complete successfully:

![watch oscar-cli service logs](../../images/blog/post-20210803-1/watch-service-logs.png)

**Step 4:** List files in the output folder of the MinIO bucket:

![oscar-cli service list-files](../../images/blog/post-20210803-1/list-files.png)

**Step 5:** Get a file and store it in your local machine:

![oscar-cli service get-file](../../images/blog/post-20210803-1/get-file.png)

**Step 6:** Unzip and inspect the results:

![Inference result](../../images/blog/post-20210803-1/result-inference.png)

#### Launch the service using Oscar graphical interface

**Step 1:** Upload images to the input bucket, from the OSCAR GUI, go to *Minio Storage* at the left menu, select the input folder, click *SELECT FILES* and then *UPLOAD*:

![Upload images from OSCAR-GUI](../../images/blog/post-20210803-1/oscar-gui-upload.png)

**Step 2:** Check the logs for a job by clicking the *LOGS* button of the service, and click the rightmost button to display it:

![Check the logs from OSCAR-GUI](../../images/blog/post-20210803-1/oscar-gui-logs-3.png)

**Step 3:** Download the output results by clicking *Minio Storage* at the left menu, go to the output folder, select the items to download, and click *DOWNLOAD ALL AS ZIP*:

![Download images from OSCAR-GUI](../../images/blog/post-20210803-1/oscar-gui-download.png)

### Scaling up

Deploying an elastic Kubernetes cluster with the OSCAR platform means using [EC3](https://github.com/grycap/ec3), a tool that deploys elastic virtual clusters, and [CLUES](https://www.grycap.upv.es/clues/), a tool to power off internal cluster nodes when they are not being used, and conversely to power them on when they are needed.

Watch the status of the provisioned node(s) by issuing:
{{< highlight bash>}}$ watch clues status {{< / highlight >}}

This is an example of the clues status while launching a batch of approximately 100 images:

![Clues status](../../images/blog/post-20210803-1/clues-status.png)

### Youtube video

Finally, here you have a follow along video including all the steps, enjoy!

{{< youtube bAkEA-kX9ps >}}

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) tools shown on this post are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
