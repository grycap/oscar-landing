---
title: "Composing AI Inference pipelines based on OSCAR services with Elyra in EGI Notebooks"
date: 2024-04-15T09:00:00+01:00
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


# What is Elyra and EGI Notebooks?

![Elyra Icon](../../images/blog/post-elyra-egi-notebooksS/elyra_icon_1.png)

Elyra is an open-source extension for Jupyter Notebooks, designed to enhance the workflow of AI projects by supporting machine learning pipelines visually. It integrates seamlessly with various systems for orchestrating workflows, allowing users to create, run, and monitor their workflows within Jupyter environments. EGI Notebooks, provided by the EGI cloud services, offer a cloud-based environment for running Jupyter Notebooks. This service simplifies the deployment and scaling of computational notebooks, providing researchers with powerful computational resources and a collaborative space for their scientific inquiries.


# What is OSCAR and Python OSCAR client?

OSCAR is an open-source platform that supports event-driven, serverless computing for data processing applications. It uses Docker containers on dynamically scaling Kubernetes clusters to handle tasks across multiple clouds or on-premises. The Python client for OSCAR enables programmatic interaction with its API, allowing for effective integration and automation in managing serverless functions. 

# How works a workflow in Elyra?

In Elyra, a pipeline is a set of nodes or steps, each representing a script or notebook, connected in a flow that defines the execution order. Users can drag and drop nodes to create a visual representation of their workflow. Each node can be configured with specific parameters, inputs, and outputs. When a pipeline is run, Elyra executes the nodes sequentially or in parallel, depending on their dependencies. This visual approach not only simplifies the understanding and editing of machine learning workflows but also integrates with platforms like Kubeflow Pipelines and Apache Airflow to manage the execution in scalable environments.

![Elyra Pipeline 1](../../images/blog/post-elyra-egi-notebooksS/others_examples_1.png)

![Elyra Pipeline 2](../../images/blog/post-elyra-egi-notebooksS/others_examples_2.png)

# Deploying a pipeline 


Deploying a pipeline in Elyra involves several key steps:

1. Designing the Pipeline: Start by organizing your scripts or notebooks into nodes within the Elyra pipeline editor.
2. Configuring Nodes: Set up each node with the necessary parameters, such as file paths, environment variables, and dependencies.
3. Connecting Nodes: Connect the nodes to define the flow of data and execution sequence.
4. Running the Pipeline: Execute the pipeline directly from Elyra, which will orchestrate the workflow based on the configured platform, such as local, Kubeflow, or Airflow.
5. Monitoring Execution: Elyra provides tools to monitor the pipeline’s progress and debug if needed, ensuring that any issues can be addressed promptly.

This process enables users to efficiently manage complex workflows and automate repetitive tasks, enhancing productivity and focusing on strategic tasks.


## Summary


Elyra offers a robust and user-friendly way to interact with OSCAR services right within the EGI Notebooks environment. From cloning the repository to setting up the workflow in Elyra, the process is smooth and straightforward.


We hope this post serves as a practical guide to unlock the full potential of Elyra and OSCAR services within EGI Notebooks. Happy computing!


![Elyra Workflow](../../images/blog/post-elyra-egi-notebooks/elyra_icon_1.png)





