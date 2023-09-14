---
title: "Utilising Elyra within EGI Notebooks to Invoke OSCAR Services"
date: 2023-09-06T09:00:00+01:00
# post image
image: "/images/blog/post-elyra-egi-notebooks/elyra_icon.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "A step-by-step guide to using Elyra within EGI Notebooks to interact with OSCAR services."
# post draft
draft: false
---


In this blog, we aim to provide a hands-on guide to utilising [Elyra](https://elyra.readthedocs.io/en/latest/), an AI-centric extension for [Jupyter Notebooks](https://jupyter.org/), within the framework of [EGI Notebooks](https://notebooks.egi.eu/hub/welcome). The primary focus will be on interacting with [OSCAR](https://github.com/grycap/oscar) clusters and services using Elyra's enhanced capabilities.


We will walk through the entire process, from setting up the initial environment to running specific OSCAR services like the amusing `Cowsay` and others.

![Cowsay example](../../images/blog/post-elyra-egi-notebooks/cowsay_example.png)

> For additional information on using EGI Notebooks, refer to the [official documentation](https://docs.egi.eu/users/dev-env/notebooks/).


## Clone the Repository


To get started, you will need the repository that contains the example files for Elyra and OSCAR services. You can use the elyra git tool, it is located on the left side panel, being the fourth option


This repository contains various examples, including those for Elyra such as `Cowsay`, `Grayify`, and `Plants-Theano`.


![Clone the Repository](../../images/blog/post-elyra-egi-notebooks/cloning_repo_elyra.png)


## Setting Up Credentials: A Prerequisite for All Examples
### Credentials Node in Elyra


Before running any example, we need to create a credentials node in Elyra. This node will handle the environment variables necessary to interact with your OSCAR cluster. Here's how to do it:


1. Use the node "Create Credentials."

2. Open properties of this node, set up the environment variables: `ID`, `ENDPOINT`, `USERNAME`, and `PASSWORD`.

![Credentials node](../../images/blog/post-elyra-egi-notebooks/creating_credentials_1.png)


3. Save these as a JSON file, for instance, also, you can give it a name with the envoiroment variable, for example: `credentials.json`.

![Credentials node](../../images/blog/post-elyra-egi-notebooks/creating_credentials_2.png)


This JSON file will be passed as an environment variable to the subsequent nodes in your workflow.

* NOTE: in this example we will use the token that you have in the EGI so it is not necessary to enter a username and password. Below an example how to get the EGI token.

![Credentials node](../../images/blog/post-elyra-egi-notebooks/get_egi_token.png)

## Running the Cowsay Example
### Setting Up the Workflow


Now let's get our cow to talk! Follow these steps to set up the workflow in Elyra:


1. Use the cowsay service node and connect it to the previously node (
if the node is not already connected).
2. Pass the `credentials.json` and the text for the cow as environment variables, for example 'moo'.

![Cowsay node](../../images/blog/post-elyra-egi-notebooks/cowsay_variables.png)

### Executing the Pipeline

![Executing the node](../../images/blog/post-elyra-egi-notebooks/how_to_start_elyra_pipeline.png)

After setting up the environment variables, proceed to the notebook within this node. Once executed, the notebook should display the cow uttering the text you provided.


![Cowsay Output](../../images/blog/post-elyra-egi-notebooks/cowsay_output.png)


## Additional Examples: Grayify and Plants-Theano

For these examples, you'll again need the credentials node to pass the necessary variables. Additionally, other nodes will be involved to perform tasks like converting images to and from Base64 format.

![Grayify and Plants Theano](../../images/blog/post-elyra-egi-notebooks/others_examples.png)


## Summary


Elyra offers a robust and user-friendly way to interact with OSCAR services right within the EGI Notebooks environment. From cloning the repository to setting up the workflow in Elyra, the process is smooth and straightforward.


We hope this post serves as a practical guide to unlock the full potential of Elyra and OSCAR services within EGI Notebooks. Happy computing!


![Elyra Workflow](../../images/blog/post-elyra-egi-notebooks/elyra_icon_1.png)





