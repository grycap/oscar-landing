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
Different mature use cases were deployed in production for inference with OSCAR. All these use cases have developed their own AI models and have packaged them into Docker images that can be easily deployed in OSCAR. Let's have a look to some of them:

##### Marine litter Assessment 
This service analyses drone images, observing litter floating at surface waters in seas, rivers and lakes, and lying at beaches and shores, delivering standardised classified litter data sets, which are fit for purpose of environmental management and indicators.

![iMagine Use Case 1 Litter assessment architecture](../../images/blog/post-imagine/imagine-uc1.png)

The model, available at the [iMagine Marketplace](https://dashboard.cloud.imagine-ai.eu/catalog/modules/litter-assessment) has been deployed for inference in OSCAR. It has been used primarily by asynchronous calls that store outputs in MinIO.

##### ZooProcess Service
This use case has established an operational image handling service at the iMagine platform that ingests, stores, processes images of marine water samples taken by the Zooscan instrument and uploads the resulting regions of interest to the EcoTaxa platform for later taxonomic Identification. The service consists of two different AI models: the [Classifier](https://dashboard.cloud.imagine-ai.eu/catalog/modules/zooprocess-multiple-classifier) and the [Separator](https://dashboard.cloud.imagine-ai.eu/catalog/modules/zooprocess-multiple-separator), both available at the iMagine Marketplace.

The models have been deployed in OSCAR using “exposed services”. In that mode, the service’s API ([DEEPaaS API](https://github.com/ai4os/DEEPaaS)) is exposed outside of the underlying Kubernetes cluster. Therefore, users interact directly with the DEEPaaS API.

##### AI-Powered Ecosystem Monitoring: the EMSO OBSEA use case
This use case has developed a service at the iMagine platform for automatic processing of video imagery, collected by cameras at EMSO underwater OBSEA site, identifying and analysing different fish species. Moreover, at the EMSO-Obsea site, there was a significant unexploited image data collected from an underwater camera observing various fish species. The analysis of this data was a challenge, where thousands of images needed to be analysed by the [AI model](https://dashboard.cloud.imagine-ai.eu/catalog/modules/obsea-fish-detection). This is where OSCAR has played an important role.

The usage of OSCAR in this use case was through [OSCAR Batch](https://github.com/grycap/oscar-batch), a tool specifically developed for this purpose to launch batches of tasks to the OSCAR cluster, thereby accelerating the analysis of historical images from the observatory. Thousands of images were thus analyzed in different tests and experiments, where the invocations received a compressed zip file containing the images to analyze.

![iMagine OBSEA use case architecture integrated with OSCAR](../../images/blog/post-imagine/imagine-obsea.png)

##### Flowcam Phytoplankton Identification 
The Flowcam Phytoplankton Identification Service has been implemented through an AI model that analyzes and processes FlowCam images for determining taxonomic composition of phytoplankton samples. The model is available at the [iMagine Marketplace](https://dashboard.cloud.imagine-ai.eu/catalog/modules/phyto-plankton-classification). This model has been deployed in OSCAR for inference, tested both by synchronous and, more commonly, asynchronous calls, and it has been used in education. 

In total, more than ~2.000 invocations were processed by the OSCAR cluster. These invocations took more than ~9,570 CPU hours.

![iMagine Metrics collected by Grafana](../../images/blog/post-imagine/imagine-metrics.png)

### Conclusion
The iMagine project has demonstrated how serverless AI infrastructures like OSCAR can transform marine science by enabling scalable, automated, and privacy-preserving analysis of massive image datasets. By leveraging the OSCAR platform, researchers were able to focus on scientific innovation rather than computational complexity, accelerating discoveries in areas such as pollution monitoring, marine biodiversity, and ecosystem health.

Although the project has officially concluded, its technological foundations, built on open, interoperable, and reusable components, will continue to support new research efforts within the European Open Science Cloud and beyond, fostering a sustainable future for AI-driven aquatic research.


[OSCAR](https://grycap.github.io/oscar/) is developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/). [iMagine](https://www.imagine-ai.eu/) has received funding from the European Union, Grant Agreement Number 101058625.
