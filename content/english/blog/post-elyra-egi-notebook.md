---
title: "Composing AI Inference workflows based on OSCAR services with Elyra in EGI Notebooks"
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

[Elyra](https://elyra.readthedocs.io/en/latest/index.html) is an open-source extension for [Jupyter Notebooks](https://jupyter.org/), designed to enhance the workflow of AI projects by supporting machine learning pipelines visually. It integrates seamlessly with various systems for orchestrating workflows, allowing users to create, run, and monitor their workflows within Jupyter environments. [EGI Notebooks](https://notebooks.egi.eu/hub/welcome), provided by the EGI cloud services, offer a cloud-based environment for running Jupyter Notebooks. This service simplifies the deployment and scaling of computational notebooks, providing researchers with powerful computational resources and a collaborative space for their scientific inquiries.


# How a workflow in Elyra works?

In Elyra, a workflow is a set of nodes or steps, each representing a script or notebook, connected in a flow that defines the execution order. Users can drag and drop nodes to create a visual representation of their workflow. Each node can be configured with specific parameters, inputs, and outputs. When a pipeline is run, Elyra executes the nodes sequentially or in parallel, depending on their dependencies. This visual approach not only simplifies the understanding and editing of machine learning workflows but also integrates with platforms like Kubeflow Pipelines and Apache Airflow to manage the execution in scalable environments.

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


# Summary

Elyra simplifies the integration of OSCAR services within the EGI Notebooks environment, offering a user-friendly approach to managing complex pipelines. This post outlines how Elyra enhances productivity by streamlining processes, from repository cloning to workflow execution.

We hope this overview inspires you to explore the capabilities of Elyra and OSCAR in EGI Notebooks, helping you to leverage these powerful tools for your projects. Enjoy the innovative computing possibilities!






