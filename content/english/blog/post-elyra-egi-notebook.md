---
title: "Composing AI Inference pipelines based on OSCAR services with Elyra in EGI Notebooks"
date: 2024-03-29T09:00:00+01:00
# post image
image: "/images/blog/post-elyra-egi-notebooks/elyra_icon.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "A step-by-step guide to using Elyra within EGI Notebooks to interact with OSCAR services."
# post draft
draft: false
---

{{< youtube 1pFjs0LND4E >}}

In this blog, we aim to provide a comprehensive guide on using [Elyra](https://elyra.readthedocs.io/en/latest/), an AI-focused extension for [Jupyter Notebooks](https://jupyter.org/), within the [EGI Notebooks](https://notebooks.egi.eu/hub/welcome) framework. Our primary focus will be on how to interact with [OSCAR](https://github.com/grycap/oscar) clusters and services through Elyra's enhanced capabilities for creating AI workflows. These workflows facilitate the execution of OSCAR services across remote clusters in multiple distributed cloud infrastructures.

This initiative is part of the AI4Compose efforts within the [AI4EOSC](https://ai4eosc.eu) European Project.

We'll guide you through the entire process, from setting up your initial environment to executing specific OSCAR services, such as the `Cowsay` tool among others, to demonstrate the practical applications of these technologies.

![Cowsay example](../../images/blog/post-elyra-egi-notebooks/cowsay_example.png)

For those seeking additional information on utilizing EGI Notebooks, we recommend consulting the [official documentation](https://docs.egi.eu/users/dev-env/notebooks/).

This guide aims to be straightforward and insightful, designed for end-users looking to leverage these powerful tools in their projects.

# 1. Setting up the environment


## 1.1 Accessing EGI notebooks

The first step is to access the [EGI Notebooks](https://notebooks.egi.eu/) service. Then choose the preferred server option. We will select the Default EGI environment:

![Selecting server options](../../images/blog/post-elyra-egi-notebooks/accessing_egi_notebooks.png)


## 1.2 Importing OSCAR Elyra from Github

To get started, you will need to clone the repository that contains the example files for Elyra and OSCAR services: https://github.com/ai4os/ai4-compose

You can use the Elyra git tool on the left side panel to clone the repository in the EGI Notebooks environment. This repository contains various examples, including those for Elyra, such as Cowsay, Grayify, and Plants-Classifitacion.

![Importing the Repository](../../images/blog/post-elyra-egi-notebooks/importing_from_github.png)

![Cloning the Repository](../../images/blog/post-elyra-egi-notebooks/cloning_repo_elyra.png)


# 2. Prerequisites for all the examples


## 2.1 Types of recipes

To use the nodes that employ OSCAR, it is necessary to invoke a service. This service has two recipes:

1. The first recipe solely uses an EGI Check-in token. This is the best option if you use the AI4EOSC OSCAR cluster authenticating with your EGI account.

2. The second recipe uses our own credentials: node ID, endpoint, username, and password. This is an alternative for when you want to use your own OSCAR clusters.


## 2.2 How to use the EGI Token


If you wish to use the EGI token, there’s a node that is already prepared to get the token and save it in your files to use it directly in your OSCAR pipelines.

![Get EGI Token node](../../images/blog/post-elyra-egi-notebooks/getting_token.png)

To configure this node, you only need to use its environment variables to set its path and file name.

![Configuring EGI Token node](../../images/blog/post-elyra-egi-notebooks/getting_token_2.png)

Additionally, if you wish to know where the EGI token is located, it can be found at this path within EGI Notebooks

```python
with open("/var/run/secrets/egi.eu/access_token") as f:
    access_token = f.read(../../images/blog/post-elyra-egi-notebooks/getting_token_2.png)
```

## 2.3 How to generate our own credentials

In case you do not wish to use the EGI Token, you can use the 'generate credentials' node found within the nodes folder. Its functionality is similar to that of the 'get EGI Token' node, but for this post, we will focus on the use of the EGI Token node.

![Generate credentials node](../../images/blog/post-elyra-egi-notebooks/generate_credentials.png)

![Configuring generate credentials node](../../images/blog/post-elyra-egi-notebooks/generate_credentials_2.png)


# 3. Deploying a pipeline 

# 3.1 Running the Cowsay Example

Now let's get our cow to talk! Follow these steps to set up the workflow in Elyra:


1. Use the cowsay service node and connect it to the previous node (if the node is not already connected).
2. Pass the token file and the text for the cow as environment variables, for example 'Hello again!'.

![Cowsay node](../../images/blog/post-elyra-egi-notebooks/cowsay_variables.png)

3. Use the start button to execute the pipeline

![Executing the node](../../images/blog/post-elyra-egi-notebooks/how_to_start_elyra_pipeline.png)

4. After setting up the environment variables, proceed to the notebook within this node. Once executed, the notebook should display the cow uttering the text you provided.

![Cowsay Output](../../images/blog/post-elyra-egi-notebooks/cowsay_output.png)


## Additional Examples: Grayify and Plants-Theano

For these examples, you'll again need the EGI Token node to pass the necessary variables. Additionally, other nodes will be involved to perform tasks like converting images to and from Base64 format.

![Plants classification pipeline example](../../images/blog/post-elyra-egi-notebooks/others_examples_1.png)

![Grayify pipeline example](../../images/blog/post-elyra-egi-notebooks/others_examples_2.png)


## Summary


Elyra offers a robust and user-friendly way to interact with OSCAR services right within the EGI Notebooks environment. From cloning the repository to setting up the workflow in Elyra, the process is smooth and straightforward.


We hope this post serves as a practical guide to unlock the full potential of Elyra and OSCAR services within EGI Notebooks. Happy computing!


![Elyra Workflow](../../images/blog/post-elyra-egi-notebooks/elyra_icon_1.png)





