---
title: "User interfaces with Gradio for AI model inference in OSCAR services"
date: 2022-09-08T09:00:00+01:00
# post image
image: "https://gradio.app/assets/img/header-image.jpg"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for developers to create their first service in OSCAR."
# post draft
draft: false
---


### What is Gradio?

[Gradio](https://gradio.app/docs/) is a Python library for building user web interfaces for Machine Learning (ML) applications. Those interfaces can be customized with the components that Gradio provides, like Textbox, File, Video, Audio, Image, and Dataframe in a short period, saving time. Also, an authentication process can be implemented to grant access. This allows to create nice web-based user interfaces for the inference process of a ML application.

OSCAR can be employed as a serverless platform for AI model inference along the computing continuum, as is being done in the [AI-SPRINT](http://ai-sprint-project.eu/) project. Therefore, Gradio stands out as a perfect match to create customized user interfaces for AI model inference.

### Gradio in OSCAR

Gradio provides a user-friendly web-based interface to use an OSCAR service for AI inference, thus abstracting all the technology being used under the hood.

Gradio is deployed inside a Pod in the same Kubernetes cluster that runs the rest of the OSCAR services.

The interaction between Gradio and OSCAR can be done through synchronous invocations via the [OSCAR REST API](https://docs.oscar.grycap.net/api), which executes KNative under-the-hood to perform the AI model inference. Asynchronous invocations via uploading a file to MinIO can also be achieved.  


![gradio-oscar.png](../../images/blog/post-oscar-with-gradio/gradio-oscar.png)

### Using Gradio for Stable Difussion in OSCAR

[Stable Diffusion](https://stability.ai/blog/stable-diffusion-public-release) is an open-source AI model that provides impressive text-to-image generation capabilities. 

Each Gradio application must be integrated with a specific OSCAR service.
We produced a Gradio application with the Stable Diffusion service for OSCAR as an example on [GitHub](https://github.com/grycap/oscar-gradio/tree/master/examples/stable_diffusion).


As shown in the picture below, the usage of web-based user interfaces produced by Gradio simplify the interaction with the OSCAR service for AI model inference, since the user no longer needs to query a REST API, or upload a file to MinIO, or use the OSCAR command-line interface to trigger the AI model inference. 

![stable-difussion.png](../../images/blog/post-oscar-with-gradio/stable-diffusion.png)

More visualization examples with Gradio will be published in the [oscar-gradio](https://github.com/grycap/oscar-gradio) repository.

[OSCAR](https://grycap.github.io/oscar/) is  developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).