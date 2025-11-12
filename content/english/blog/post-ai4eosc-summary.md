---
title: "Serverless Computing for Artificial Intelligence: The OSCAR–AI4EOSC Integration Story."
date: 2025-11-10T09:00:00+01:00
# post image
image: "../../images/blog/post-ai4eosc-summary/ai4eosc.svg"
# post type (regular/featured)
type: "featured"
# meta description
description: "OSCAR in the AI4EOSC project."
# post draft
draft: false
---

The [AI4EOSC](https://ai4eosc.eu/) European Project uses the OSCAR serverless platform to support the scalable execution of the inference phase of AI models along the computing continuum in all the uses cases: personalized healthcare, maintenance & inspection and, finally, farming 4.0.

This post briefly summarises the integration.

### What is AI4EOSC?

[AI4EOSC](https://ai4eosc.eu/) stands for "Artificial Intelligence for the European Open Science Cloud." It is an initiative aimed at integrating artificial intelligence (AI) technologies into the [European Open Science Cloud (EOSC)](https://eosc.eu/), a federated ecosystem that enables researchers to access, process, and share data and services across Europe. 

The AI4EOSC project focuses on simplifying how scientists develop, train, and deploy AI models. Thus, the main goal of AI4EOSC is to enhance the capabilities of EOSC by leveraging AI to improve data management, analysis, and sharing, thereby fostering innovation and collaboration in scientific research. Aligned with this aim, the project has successfully delivered the [AI4OS](https://github.com/ai4os) software stack and the [AI4EOSC Dashboard](https://dashboard.cloud.ai4eosc.eu/catalog/modules), where, among others, users can find the catalogue of available AI models and can easily deploy or re-train them.

### OSCAR: The Serverless Solution for Inference of AI Models

The scalable inference of AI models is performed by the AI4OS inference platform, which is based on the open-source serverless platform OSCAR. The AI4OS inference platform consists of a pre-deployed production instance of  the OSCAR cluster that is exclusively accessible to users belonging to the virtual organisation of AI4EOSC (vo.ai4eosc.eu). 

OSCAR has been evolved during the AI4EOSC project, and these are the key features we have developed during this collaboration:
- Pre-trained AI models are delivered directly via OSCAR, ready for inference without additional setup. [More info](https://docs.ai4os.eu/en/latest/howtos/deploy/oscar.html).
- Provided multiple execution modes: asynchronous (event-triggered), synchronous (HTTP requests), and exposed services (REST APIs).
- Supported deployment on multi-cloud and edge devices (e.g., Raspberry Pi), with elastic scaling and integration with object storage (MinIO, dCache).
- Enhanced privacy and multitenancy, with bucket management and Kubernetes secrets for secure data handling.
- Streamlined authentication via integration with Keycloak for unified access control.
- A redesigned dashboard, built with React, provides a user-friendly interface, while Prometheus and Grafana enable real-time monitoring and accounting.
- Automated testing ensures reliability through Robot Framework acceptance tests, executed regularly via Jenkins pipelines.


### Use Cases Integration

The use cases of the project have been using OSCAR for the deployment of their AI models for inference. Let's have a closer look to them to know how they have been using OSCAR.

##### UC1 - Agrometeorological forecasts

In agriculture, timely weather insights are critical. The OSCAR instance has been used to deploy multiple forecasting models (eight in total, one for each prediction lead time) as part of an [agrometeorological nowcasting pipeline](https://dashboard.cloud.ai4eosc.eu/catalog/modules/thunderstorm-nowcast-microstep). Here’s how it works:

1. Input data are transferred from a forecasting virtual machine to the MinIO object storage system.
2. This automatically triggers asynchronous inference on OSCAR.
3. The model’s predictions are stored and transferred back, where they feed into a GeoServer to visualize warnings for farmers using a simple three-color (traffic light) system — and trigger notifications when needed.

This workflow ensures automated, scalable, and real-time decision support for agricultural management. This work has been done in collaboration with the colleagues of [MicroStep-MIS](https://www.microstep-mis.com/).

##### UC2 - Integrated plant protection scenario

A proof-of-concept integration with OSCAR has enabled a [plant protection application](https://dashboard.cloud.ai4eosc.eu/catalog/modules/integrated-plant-protection) to be deployed directly through the AI4EOSC marketplace. Researchers can test and experiment with this service using try-out deployments or containerized (Docker) access, paving the way for broader adoption in agricultural monitoring and pest management. This work has been done in collaboration with the colleagues of [PSNC](https://www.psnc.pl/).

##### UC3 - Automated Thermography

In the field of energy efficiency, OSCAR supports continuous inference for [Thermal Bridges on Building Rooftops Detection (TBBRDet)](https://dashboard.cloud.ai4eosc.eu/catalog/modules/thermal-bridges-rooftops-detector) model.
Through a secure and user-friendly interface, building owners or urban planners can analyze thermographic data to detect energy losses — all without sharing raw data or inference results. 

This demonstrates OSCAR’s privacy-preserving design: enabling powerful AI analysis while keeping sensitive information under control. This work has been done in collaboration with the colleagues of [KIT](https://www.kit.edu/).

[OSCAR](https://grycap.github.io/oscar/) is developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/). [AI4EOSC](https://ai4eosc.eu/) has received funding from the European Union's Horizon Europe 2022 research and innovation programme under agreement #101058593.
