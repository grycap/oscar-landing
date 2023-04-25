---
title: "Dcnios=Dcache+Nifi+OSCAR"
date: 2023-03-21T09:00:00+01:00
# post image
image: "../../images/blog/post-dcnios/dcnios.jpeg"
# post type (regular/featured)
type: "featured"
# meta description
description: "Dcnios tools. It is the combination between Dcache, Nifi and OSCAR."
# post draft
draft: false
---

This post will attend to the connection between OSCAR and dcache. OSCAR services will be triggered with dcache events.
This is an excellent combination because the data will be stored in dcache and computation will be done in OSCAR.
In OSCAR it will only remain the logs of the services and the sensitive data will keep centralized in dcache.

### What is Dcache?

[Dcache](https://dcache.org/) is a system for storing data in distributed and heterogenous server nodes that works like a single virtual filesystem tree.
The system can be expanded or contracted by adding/removing data servers at any time.

### What is OSCAR?

[OSCAR](https://oscar.grycap.net/) is an open-source serverless platform for event-driven data-processing containerized applications that execute on elastic [Kubernetes](http://kubernetes.io) clusters that are dynamically provisioned on multiple Clouds.

Version 2.6.1 or newer versions have implemented the handle of the dcache events.

### What is Nifi? and Why use Nifi?

[Apache NiFi](https://nifi.apache.org/) was made for dataflow. It supports highly configurable directed data routing, transformation, and system mediation logic graphs.

Nifi works as an Event Ingestion Platform between dcache and OSCAR in this architecture.
The SSE protocol is one method to create active listening in dcache.
Nifi will be in active listening with dcache and when an event happens there, an OSCAR service will be triggered.
Nifi does not have a process with SSE protocol. So, a new Docker image (from the Nifi image with version 1.20.0) has been created. In this new image has been added an example of [SSE protocol](https://github.com/paulmillar/dcache-sse).

Using Nifi brings us advantages instead using an active pod listening and triggering OSCAR services.

- It is a generic tool to create a specific dataflow.
- It can create complex dataflows, redirecting one event into some services.
- It can change and adapt dataflow by the web user interface.
- It can create recipes of dataflows to automate deployment.
- The data ingestion in OSCAR can be changed at any time.
- In this case, Nifi is deployed in the cluster node to keep the persistence.

For more technical information, visit our repository [dcnios](https://github.com/grycap/dcnios).

[OSCAR](https://grycap.github.io/oscar/) and [IM](http://www.grycap.upv.es/im) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
