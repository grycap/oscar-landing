---
title: "A Serverless Cloud-to-Edge Computing Continuum Approach for Edge AI inference"
date: 2022-01-12T18:00:00+01:00
# post image
image: "images/blog/masks-painting.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "Using OSCAR running both on edge and in an IaaS Cloud for Edge AI inference"
# post draft
draft: false
---

[OSCAR](https://oscar.grycap.net) is an open-source framework for data-processing serverless computing. Users upload files to an object storage which invokes a function responsible for processing each file. This runs on an elastic Kubernetes cluster, managed by the [CLUES](https://github.com/grycap/clues) elasticity manager, that can be deployed on multiple Cloud providers thanks to the [Infrastructure Manager (IM)](https://www.grycap.upv.es/im). 

Functions can be chained to create data-driven serverless workflows which can run on different OSCAR clusters along several Cloud infrastructures. This way, the file-based output of a function is fed as input to another function through the corresponding object storage systems, thus using resources from multiple infrastructures.

OSCAR has been adapted to run on the edge by supporting the [K3S](https://k3s.io) minified distribution of Kubernetes. This way, it can run, for example, on ARM-based devices like clusters of [Raspberry PIs](https://www.raspberrypi.com) such as the one depicted below:


![Raspberry Pis cluster](../../images/blog/cluster-raspberry-pis-small.jpg)

This allows to tackle a Deep Learning mask recognition use case to process anonymised images on the EGI Federated Cloud (a dynamically deployed OSCAR cluster) out of videos processed at the edge (the aforementioned cluster of Raspberry Pis). This allows to create a serverless workflows for event-driven processing along the Cloud-to-Edge Computing Continuum such as the one depicted below:

![OSCAR continuum workflow](../../images/blog/oscar-continuum-workflow.png)

The videos are uploaded into the MinIO object storage in the OSCAR cluster running at the edge (in the Raspberry Pis), where they are split into sampled images that are later anonymised, applying a pre-trained Deep Learning model to blur the faces. These images are uploaded into the MinIO object storage in the OSCAR cluster running in the EGI Federated Cloud, where the mask detection procedure is applied. The resulting images are then further uploaded into the [EGI DataHub](https://www.egi.eu/services/datahub/) (based on [Onedata](https://onedata.org)) for mid-term data storage.

This approach allows to perform data acquisition and anonymisation at the edge, as close as possible to where the data is being generated. This allows to implement Edge AI for inference, where AI algorithms are processed either directly on the device or as close as possible to the device generating the data. More computationally intensive tasks are delegated to IaaS Clouds, by using the very same software stack along the computing continuum, provided by OSCAR.


### YouTube video

Here you have a video showing the platform action, as presented in the the [EGI Conference 2021](https://www.egi.eu/egi-conference/2021-beyond-the-horizon/): 

Here's what you'll see:

1. Deploy an OSCAR cluster in the EGI Federated Cloud through the IM Dashboard
2. Configure both clusters (Cloud and Edge) in [OSCAR-CLI](https://github.com/grycap/oscar-cli)
3. Show the [Functions Definition Language (FDL)](https://docs.oscar.grycap.net/fdl/) file to compose the workflow and the scripts of both services
4. Deploy the workflow
5. Perform a workflow execution:
   1. Upload a video to the MinIO input bucket in the OSCAR cluster at the edge.
   2. Show the logs in the OSCAR web interface
   3. Check that the result images are uploaded and compare them using [BLISS](https://grycap.github.com/bliss)
   4. Show the result files stored in the defined Onedata space
6. Delete the deployed cluster.

{{< youtube _Ao5f3OfoLQ >}}

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
