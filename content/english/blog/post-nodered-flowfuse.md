---
title: "Composing AI Inference pipelines with Node-RED & Flowfuse"
date: 2024-04-16T09:00:00+01:00
# post image
image: "/images/blog/post-nodered-flowfuse/post-image.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for the use of the OSCAR API through Node-RED and FlowFuse."
# post draft
draft: false
---

In this post, we are going to learn about Composing AI Inference workflows by invoking OSCAR services with Node-RED & FlowFuse. Both tools facilitate the graphical composition of pipelines, a user-friendly approach with drag & drop capabilities that allow us to easyly compose a pipeline involving different OSCAR services. For that, we have prepared a video demo that we invite you to watch. The developments are part of the [AI4EOSC](https://ai4eosc.eu/) project. 

{{< youtube 9a019SA5GW4 >}}

## Knowing more about Node-RED and FlowFuse

![Node-RED icon](../../images/blog/post-nodered-flowfuse/node-red.png)

On the one hand, [Node-RED](https://nodered.org/) is an open-source visual programming tool. Built on Node.js, it allows users to create event-driven systems by connecting nodes representing different functionalities. With a user-friendly web interface and a rich library of pre-built nodes, Node-RED simplifies the visual composition of workflows. 

[FlowFuse](https://flowfuse.com/), on the other hand, is the DevOps platform for Node-RED application development and delivery. It adds to the Node-RED functionalities the ability to perform collaborative development by hosting various Node-RED applications, the management of remote deployments and the support for DevOps delivery pipelines. 

The combination of these tools with OSCAR allows users to visually compose AI model inference pipelines. But let's learn more about how Node-RED works.

## How a workflow in Node-RED works?

![Node-RED workflow](../../images/blog/post-nodered-flowfuse/example.png)

A workflow in Node-RED is a set of nodes connected together to create a flow of operations. Each node performs an operation, and the data moves between nodes via wires in the visual interface. Users can drag and drop different types of nodes from the palette into a workspace and configure them to perform tasks like receiving data, processing it, and sending it elsewhere. Flows can be triggered by web requests, handle files, interact with APIs, and perform a multitude of other functions.

In the context of AI4EOSC, we have developed new custom nodes created to simplify performing the AI model inference on a remote OSCAR cluster. These nodes correspond with a model available for inference in the AI4EOSC Marketplace, like for example the [Plants Species Classifier](https://dashboard.cloud.ai4eosc.eu/marketplace/modules/deep-oc-plants-classification-tf), and are publicliy available in the Node-RED Library, a repository that allows users to share and reuse flows and function nodes. You can access them by following this [link](https://flows.nodered.org/search?term=ai4eosc). Note that the number of nodes will be updated progressively and according to the models developed in the project.

## Designing and deploying a workflow 

![Node-RED workflow](../../images/blog/post-nodered-flowfuse/deploy.png)

As showed in the video demo, after creating an application in FlowFuse, and a Node-RED instance (that is automatically created when we create an application), we can start creating our workflow. To design the workflow, users select nodes available on the left-side panel, drag & drop the boxes to the central panel, and connect them, as you can see in the video. The Node-RED interface is very intuitive, and facilitates the composition of complex workflows. In the video, you can see that we have composed two different pipelines:

+ Cowsay: this is the first toy example, where we use a custom module that interacts with an [OSCAR service](https://github.com/grycap/oscar/tree/master/examples/cowsay) that takes text as input and returns an ASCII art of a cow repeating the same text as output.
+ Plant Classification workflow with input preprocessing: this second example shows how to compose a workflow for AI inference where we two different OSCAR services are involved: the first one will convert the color image of a plant to black and white and then, the second one classifies the plant to determine its species. 

Once the workflows have been designed, we can deploy them. For that, before running the resulting pipeline, we need we need to configure each module appropiately. This means adding the input data that OSCAR services will receive and configuring the custom OSCAR nodes by providing the endpoint of the OSCAR cluster we will use, the name of the service in the OSCAR cluster and the token. With all set, we can start the execution of the pipeline and wait for the results. See the video demo to discover the ouptuts of the two example workflows.

## Summary

Node-RED enhances the automation capabilities within the FlowFuse environment, providing an intuitive method for integrating various OSCAR services and managing complex AI inference workflows. For more information, there is a [documentation entry](https://docs.ai4os.eu/en/latest/user/howto/ai4-compose/flows.html) in the official AI4OS docs repo, where you can find more details to start testing it.

We hope this overview encourages you to discover how to use OSCAR through Node-RED and FlowFuse, aiding you in harnessing these robust tools for your automation projects. Explore the potential for innovative automation solutions!

















