---
title: "Visualize OSCAR services with Gradio"
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

[Gradio](https://gradio.app/docs/) is a Python library for building user web interfaces. Those interfaces can be custom with the components that Gradio provides, like Textbox, File, Video, Audio, Image, and Dataframe in a short period, saving time. Also, an authentication process can be implemented to grant access.

### Gradio in OSCAR

Gradio is a helpful tool to integrate with the OSCAR environment.
Gradio provides a visualization of the OSCAR services and their interaction with them.
It abstracts all the technologic issues for the final user. Ready to be used.
Gradio is deployed in Kubernetes inside a Pod. Gradio must aim for an OSCAR cluster, and OSCAR must have deployed the services that will be triggered.
The interaction between Gradio and OSCAR must occur through the [OSCAR REST API](https://docs.oscar.grycap.net/api).
In case there is an interaction with MinIO, get the MinIO credential in `/system/config` and interact with MinIO using [MinIO Python Client API](https://min.io/docs/minio/linux/developers/python/API.html)

![gradio-oscar.png](../../images/blog/post-oscar-with-gradio/gradio-oscar.png)

### Using Gradio for stabble difussion in OSCAR

Each example of Gradio must be integrated with specified services.
Exists an implementation of Gradio with the stable diffusion services example on [Github](https://github.com/grycap/oscar-gradio/tree/master/examples/stable_diffusion).
Here is an example of the result of the execution of Gradio with stable diffusion.

![stable-difussion.png](../../images/blog/post-oscar-with-gradio/stable-diffusion.png)

For more visualization examples with Gradio, visit the [oscar-gradio repository](https://github.com/grycap/oscar-gradio)

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).