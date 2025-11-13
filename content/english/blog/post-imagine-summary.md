---
title: "Bringing Serverless to Marine Science: Our Journey with OSCAR and iMagine."
date: 2025-11-11T09:00:00+01:00
# post image
image: "../../images/blog/post-imagine/imagine.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "OSCAR in the iMagine project."
# post draft
draft: false
---

The [iMagine](https://www.imagine-ai.eu/) European Project uses the OSCAR serverless platform to support the scalable execution of the inference phase of marine AI models in mature thematic services. As the project has finished recently (in August 2025), in this post, we want to highlight the achievements and 

### What is iMagine?

The [iMagine](https://www.imagine-ai.eu/) project is an EU-funded project with the mission to deploy, operate, validate, and promote a dedicated iMagine AI framework and platform connected to EOSC, giving researchers in aquatic sciences open access to a diverse portfolio of AI based image analysis services and image repositories from multiple RIs, working on and of relevance to the overarching theme of Healthy oceans, seas, coastal and inland waters. This AI framework is based on the [AI4OS](https://github.com/ai4os) software stack provided by the [AI4EOSC project](https://ai4eosc.eu/) (read our post for more details about AI4EOSC and the role of OSCAR in the project).

![iMagine Dashboard screenshot](../../images/blog/post-imagine/imagine-dashboard.png)

### OSCAR in Aquatic Sciences
Four mature use cases were deployed in production for inference with OSCAR at Walton site:

##### UC1- Marine litter assessment
used mostly by asynchronous calls 

##### UC2- Zooscan
Deployed using “exposed services”. In that mode, the service’s API (DEEPaaS API) is exposed outside of the underlying Kubernetes cluster. Therefore, users interact directly with the DEEPaaS API and the OSCAR monitoring system does not register those requests. 
OSCAR monitoring system is based on Prometheus and Grafana. With this system, we are able to account all the calls that arrive to the OSCAR API, both synchronous (calls directly made to an OSCAR service to be executed) and asynchronous calls (calls automatically triggered due to an event caused by uploading files to the object storage system), the CPU usage, and information about the users (amount and origin countries).

##### UC3o- OBSEA
The usage of OSCAR in this use case was through [OSCAR Batch](https://github.com/grycap/oscar-batch), a tool developed for this use case to launch batches of tasks to the OSCAR cluster in order to accelerate the analysis of historical images from the observatory. Thousands of images were thus analyzed in different tests and experiments, although the invocations received a compressed zip file containing the images to analyze.

![iMagine OBSEA use case architecture integrated with OSCAR](../../images/blog/post-imagine/imagine-obsea.png)

##### UC5- Flowcam Phytoplankton
invoked by synchronous (6 service invocations) and, more commonly, asynchronous calls (~150 service invocations). 

In total, more than ~2.000 invocations were processed by the OSCAR services. Commonly, an invocation corresponds directly with an image or input file processed, although some services are prepared to receive a zip file with several images to be analyzed in the same execution (this is the case of UC3o). These invocations took more than ~9,570 CPU hours.

![iMagine Metrics collected by Grafana](../../images/blog/post-imagine/imagine-metrics.png)


