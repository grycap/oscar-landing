---
title: "Data-driven Processing with dCache, Apache Nifi and OSCAR"
date: 2023-03-21T09:00:00+01:00
# post image
image: "../../images/blog/post-dCNiOS/dCNiOS.jpeg"
# post type (regular/featured)
type: "featured"
# meta description
description: "Integration among dCache, Apache Nifi and OSCAR."
# post draft
draft: false
---

This post describes the integration between OSCAR and dCache. Data stored in dCache triggers the invocation of an OSCAR service to perform the processing of that data file within the scalable OSCAR cluster. This work is being done in the context of the [InterTwin](http://intertwin.eu) EU project.

### What is dCache?

[dCache](https://dcache.org/) is a system for storing data in distributed and heterogenous server nodes that works like a single virtual filesystem tree. The system can be expanded or contracted by adding/removing data servers at any time. dCache is developed by [DESY](https://www.desy.de/index_eng.html).

### What is OSCAR?

[OSCAR](https://oscar.grycap.net/) is an open-source serverless platform for event-driven data-processing containerized applications that execute on elastic [Kubernetes](http://kubernetes.io) clusters that are dynamically provisioned on multiple Clouds.

Version 2.6.1 or newer versions have implemented the handle of the [dCache storage events](https://dcache.org/old/manuals/UserGuide-latest/frontend.shtml#storage-events).

### What is Nifi? and Why use Nifi?

[Apache NiFi](https://nifi.apache.org/) was made for dataflows. It supports highly configurable directed data routing, transformation, and system mediation logic graphs.

Nifi works as an event ingestion platform between dCache and OSCAR in this architecture.
The [SSE (Server-Sent Events)](https://www.w3.org/TR/2012/WD-eventsource-20120426/) specification is one method to create active listening in dCache.
Nifi will be actively listening dCache so that a file upload triggers an OSCAR service.
Nifi does not have a process that supports the SSE specification. Therefore, a new Docker image (from the Nifi image with version 1.20.0) has been created. This new image includes a [Python-based client-side implementation of this SSE support in dCache](https://github.com/paulmillar/dcache-sse)), kindly provided by [Paul Millar](https://github.com/paulmillar).

Using Nifi brings us advantages instead of using an active pod listening to trigger OSCAR services when new files are uploaded.

- It is a generic tool to create a specific dataflow.
- It can create complex dataflows, redirecting one event into some services.
- It can change and adapt the dataflow through the web user interface.
- It can create recipes for dataflows to automate deployment.
- The data ingestion in OSCAR can be changed at any time, to decouple the file ingestion rate in dCache with data processing rate in OSCAR.
- In this case, Nifi is deployed in the cluster node to keep the persistence.

To facilitate the process of defining the dataflow in Nifi between dCache and OSCAR, a new client-side tool called [dCNiOS](https://github.com/grycap/dcnios) has been created. This provides a YAML-based definition of the endpoints and provides a command-line interface to facilitate the dataflow deployment and modification at runtime, as shown in the figure below:

![workflow](../../images/blog/post-dCNiOS/dCNiOS-workflow.png)

We have an example of a dataflow between dCache and OSCAR with two process groups: *dcachelistening* and *invokecowsay*.
![dataflow](../../images/blog/post-dCNiOS/dCNiOS-dataflow.png)

Inside the first process group, *dcachelistening* we found two processes:

- ExecuteProcess: Keeps listening to events in dCache with the SSE protocol and caches the events in a temporary folder .
- GetFile: Is listening in a folder and introducing the events in the dataflow.
![dataflow](../../images/blog/post-dCNiOS/dCNiOS-dcache.png)

In the second process group, *invokecowsay* makes an HTTP call creating an asynchronous invocation of an OSCAR service using the [OSCAR API](https://docs.oscar.grycap.net/api/)
![dataflow](../../images/blog/post-dCNiOS/dCNiOS-invoke.png)

Finally, we have a video where you can see all the steps to connect Nifi and OSCAR with more details.

{{< youtube mpy8veWS-ss >}}

[OSCAR](https://grycap.github.io/oscar/) and [IM](http://www.grycap.upv.es/im) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).


