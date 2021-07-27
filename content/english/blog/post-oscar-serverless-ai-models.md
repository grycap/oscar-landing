---
title: "Event-driven inference of AI models for mask detection with the OSCAR serverless platform"
date: 2021-07-22T10:07:21+01:00
# post image
image: "images/blog/mask-detection-result-image.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is meta description"
# post draft
draft: false
---


#### What is OSCAR?

OSCAR is an open-source platform to support the Functions as a Service (FaaS) computing model for file-processing applications. It can be automatically deployed on multi-Clouds in order to create highly-parallel event-driven file-processing serverless applications that execute on customized runtime environments provided by Docker containers than run on an elastic Kubernetes cluster.

#### Why use OSCAR for inference of AI models?

Artificial Intelligence (AI) models are used once they have been trained in order to perform the inference phase on a set of files. This requires event-driven capabilities and automated provisioning of resources in order to cope with the dynamic changes in the workload. By using auto-scaled Kubernetes clusters, OSCAR can execute the inference phase of the models for each file that is uploaded to the object storage used (e.g MinIO). 

#####  On the mask detection use case

![image](../../images/blog/mask-detection-problem-statement.png)

These are the AI models employed:

* [BlurryFaces](https://github.com/asmaamirkhan/BlurryFaces)
* [face-mask-detector](https://github.com/adityap27/face-mask-detector)

In this use case, both functions run within the same OSCAR cluster, but they could be running on different infrastructures (edge, on-premises and public Cloud), as shown in the following paper, where the [SCAR](https://github.com/grycap/scar) tool is also employed to accelerate executions via [AWS Lambda](https://aws.amazon.com/lambda):

> Risco, S., Moltó, G., Naranjo, D.M., Blanquer, I., 2021. Serverless Workflows for Containerised Applications in the Cloud Continuum. J. Grid Comput. 19, 30. https://doi.org/10.1007/s10723-021-09570-2

![image](../../images/blog/hybrid-workflow.png)


##### Deploying your OSCAR cluster

You can deploy your own OSCAR cluster using the [IM Dashboard](https://appsgrycap.i3m.upv.es:31443/im-dashboard/?filter=OSCAR) on your favourite cloud ([Guide](https://grycap.github.io/oscar/deploy-im-dashboard.html)).

![image](../../images/blog/mask-detection-im-dashboard.png)



##### Youtube video

You can follow along the demo, from infrastructure deployment to event-driven AI inference for mask detection within an OSCAR cluster, as shown in the video:

{{< youtube T0CGrE0EgLI >}}

