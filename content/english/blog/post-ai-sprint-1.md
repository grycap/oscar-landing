---
title: "OSCAR in AI-SPRINT"
date: 2023-04-25T09:00:00+01:00
# post image
image: "../../images/blog/post-ai-sprint/ai-sprint.svg"
# post type (regular/featured)
type: "featured"
# meta description
description: "OSCAR in AI-SPRINT project."
# post draft
draft: false
---

European projects like [AI-SPRINT](https://www.ai-sprint-project.eu/) use OSCAR as a Serverless framework. In this post, we will take a look at use cases.

### What is AI-SPRINT?

[AI-SPRINT](https://www.ai-sprint-project.eu/) is an Alliance of multiple specialists that work for:

- Create new tools for developing AI applications whose components will run seamlessly and securely across distributed heterogeneous infrastructures.
- Provide advanced strategies to design and optimally partition AI models considering model accuracy, application performance, security and privacy constraints.
- Deliver solutions for the agile delivery and secure automatic deployment and execution of AI applications and models across the cloud-edge continuum while preserving the privacy of users’ data.
- Implement a runtime environment to monitor application executions with data load variations of sensor streams or component failures.
- Support continuous training and application architecture enhancement to add new data to AI applications, exploiting novel edge AI-based sensor capabilities.

### Personalized Healthcare

[Personalized Healthcare](https://ai-sprint-project.eu/use-cases/personalised-healthcare) use case has the objective of deploying AI models for health monitoring using wearable and mobile devices. Specifically, it focuses on assessing stroke risk by combining quantitative data (sensor data) and qualitative data (lifestyle information) to create risk stratification models operating in the edge-cloud continuum.

Continuous and non-invasive AI-driven monitoring through smart wearable and mobile devices is an excellent strategy for preventing stroke. The synergy of the workload between IoT, cloud and edge allows the capture of data and prevents strokes in real-time and in future, improves AI models. The most critical issue in this project is ensuring the protection of sensitive data through GDPR compliance and mechanisms to preserve privacy and security, including data anonymization and federated learning.

OSCAR executes the inference job models as Faas, such as MLaaS. OSCAR side by side with [PyCOMPSs](https://oscar.grycap.net/blog/post-guide-to-use-compss-in-oscar) improves the hardware performance.OSCAR was used in BSC hackathon for contributing to [La Marató de TV3](https://www.fib.upc.edu/ca/la-marato), a public Catalan charity effort.

### Maintenance & Inspection

[Maintenance & Inspection](https://ai-sprint-project.eu/use-cases/maintenance-inspection) use case exploits AI models for identifying windmill blade damage based on vision and thermal images collected by drones. The relevant images are selected at the edge (ground station) and only relevant data are transmitted over the edge-cloud channel. Edge processing will also be in charge of calling for a new acquisition (detailed images of specific regions) when required. AI-SPRINT assets will enable optimal interaction of cloud-based (computationally intensive, longer) analysis and local processing using lighter data pattern recognition routines.

Previously, all the computation was made as a batch job. Every step processes all the data then we proceed to the next one only when a previous step is finished:

- Data acquisition
- Data upload
- Initial data analysis
- Final data analysis and report preparation

OSCAR creates real-time feedback becoming a pivotal component in making all the steps simultaneously:

- Data acquisition
- Initial data assessment
- Cloud data processing
- Data post-processing

### Farming 4.0

The primary task of the [Farming 4.0](https://ai-sprint-project.eu/use-cases/farming-40) use case is to develop an AI-driven system to compute the required quantity of phytosanitary treatment. The tractor is in motion during computation time. On board, the tractor are sensors that provide inputs to estimate the phytosanitary treatment volume.
So, the computation must be in real-time, around 2-3 seconds of time frame.

To achieve this goal. The computation is made in an OSCAR cluster on edge devices. First, the camera system is started, and a continuous stream of depth information is recorded and saved as images with a frequency of 2-4 frames per second. Saving each image triggers a synchronous call of the volume estimation function that runs in an OSCAR cluster. After the internal calculations, the volume information for each sprayer is sent as output, as well as at which the sprayer should switch to the new setting.

In parallel, the application infrastructure will run on the edge device with the possibility of cloud deployment. For this, the necessary steps for the workflow were split up into components designed to run as FaaS to allow for re-deployment between edge and cloud as needed. To configure the cluster, had used the OSCAR Function Definition Language. Infrastructure Manager (IM) was used to deploy an OSCAR cluster in Amazon Web Services (AWS). The synergy between OSCAR and IM solves the interoperability problem between clouds and edge-cloud when you work for the complete stack with a specific cloud provider:

- Provider change would have a high cost.
- You own your data, but It does not keep it in your infrastructure.
- Interoperability among the big cloud providers or between private and public clouds is minimal or non-existing.
- The infrastructure configuration would need to be defined using trial & error.
- Training of models would take longer.
- Edge Devices would be less secure.

[OSCAR](https://grycap.github.io/oscar/) and [IM](http://www.grycap.upv.es/im) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
