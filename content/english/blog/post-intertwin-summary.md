---
title: "InterTwin: Bridging Cloud Serverless and HPC with OSCAR"
date: 2025-12-03T09:00:00+01:00
# post image
image: "../../images/blog/post-dCNiOS/intertwin-logo.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "How OSCAR integrated with dCache, NiFi (dCNiOS), interLink, and new event sources to enable serverless AI workflows across Cloud and HPC in the InterTwin project."
# post draft
draft: false
---

This post summarizes the work carried out in the InterTwin project to extend the OSCAR serverless platform across the cloud–HPC continuum. We developed DCNiOS, a Data Connector through Apache NiFi for OSCAR, that facilitates the creation of event-driven dataflows connecting storages system like dCache, S3 (via SQS), Kafka, and Rucio, enabled seamless offloading of OSCAR workloads to HPC via interLink, added interactive Jupyter notebooks as exposed services, and integrated Common Workflow Language (CWL) using `oscar-python` from them.

### Data-driven ingestion with DCNiOS 

We built DCNiOS to connect dCache storage events with OSCAR through Apache NiFi. DCNiOS provides a YAML-based approach and a CLI tool to define and deploy the dataflow that listens to dCache Server-Sent Events (SSE) and triggers OSCAR services.

- What it solves: decouples ingestion rate (dCache) from processing rate (OSCAR) while keeping flows reconfigurable.
- How it’s delivered: a NiFi-based image with SSE client support and reusable process groups.
- Details and screenshots: see our post [Data-driven Processing with dCache, Apache NiFi and OSCAR](/blog/data-driven-processing-with-dcache-nifi-oscar/).

### Offloading OSCAR workloads to HPC with interLink (itwinai use case)

We integrated OSCAR with [interLink](https://interlink-project.dev/) to transparently offload computation from OSCAR clusters to HPC systems. In this setup:

- OSCAR handles the event-driven lifecycle and user-friendly APIs.
- interLink securely offloads pods to HPC under the user’s identity, preserving site policies.
- OIDC-based auth and secure tunneling align with HPC security and networking constraints.
- Storage credentials are propagated from the OSCAR cluster to HPC so data access remains consistent.

We showcased this with an inference service deployed using [itwinai](https://itwinai.readthedocs.io/latest/) (developed by CERN in InterTwin), invoking HPC compute from OSCAR in a serverless manner to perform an inference of a generative machine learning model.

{{< youtube cSN-b4r21u0eSWT5 >}}

### Interactive work: Jupyter Notebooks as Exposed Services

We added first-class support to deploy Jupyter Notebooks inside OSCAR as exposed services. Users can interactively develop and run workflows using the `oscar-python` library, with the notebook’s working directory mounted on MinIO. This allows a notebook to trigger OSCAR functions directly by writing to storage or calling OSCAR APIs—making iterative experimentation simple and reproducible.

- Feature docs: https://docs.oscar.grycap.net/latest/exposed-services/
- Library: https://pypi.org/project/oscar-python/

Demo video: deploying notebooks and running a CWL workflow from within OSCAR.

{{< youtube EgdDqHmcstQ >}}

### EURAC: Drought early warning from a notebook

With EURAC, we demonstrated triggering OSCAR services for drought early warning directly from a Jupyter notebook, validating the interactive, event-driven pattern in a real scientific context.

{{< youtube jjiS-Mt9sds >}}

### CWL integration with `oscar-python` (Deltares FloodAdapt)

We enabled the execution of CWL pipelines that call OSCAR services by embedding Python steps using `oscar-python` into users’ CWL workflows. With Deltares’ FloodAdapt digital twin (focused on compound flood risk assessment and rapid scenario evaluation), we demonstrated how CWL can orchestrate OSCAR functions end-to-end.

{{< youtube owvBLRTBAPQ >}}

### New event sources for serverless triggers

We broadened the event-driven integration surface to support:

- S3 via SQS: process object-storage events at scale.
- Kafka: stream-processing triggers for high-throughput event flows.
- Rucio: scientific data management events feeding directly into OSCAR functions.

These sources complement existing triggers, enabling flexible pipelines across scientific and enterprise ecosystems.

### Rucio demo

We will showcase a Rucio-to-OSCAR pipeline demo here. If you already have a video ID, we’ll embed it like:

{{< youtube VIDEO_ID_GOES_HERE >}}

### Closing remarks

InterTwin helped us push OSCAR beyond cloud-only serverless by connecting it to HPC through interLink, streamlining interactive development with notebooks, and widening event-driven integrations. Together, these capabilities simplify building scalable, policy-compliant AI and simulation pipelines across the compute continuum—right where research needs them most.

[OSCAR](https://grycap.github.io/oscar/) is developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/). InterTwin received funding from the European Union; details at https://www.intertwin.eu.
