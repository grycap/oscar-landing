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

This post summarizes the work carried out in the InterTwin project to extend the OSCAR serverless platform across the cloud–HPC continuum. We introduced a data-driven ingestion path with dCache and Apache NiFi (via dCNiOS), enabled seamless offloading of OSCAR workloads to HPC via interLink, added interactive Jupyter notebooks as exposed services, integrated Common Workflow Language (CWL) with `oscar-python`, and broadened event sources to S3 (through SQS), Kafka, and Rucio.

### Why cloud–HPC serverless?

Cloud platforms provide elastic, on-demand resources and are a natural fit for event-driven AI/ML pipelines—from ingestion and curation to inference. HPC systems offer extreme-scale, accelerator-rich computing for the heaviest training and inference tasks, but they come with specialized access patterns and schedulers. We bridged these worlds by:

- Using containers to deliver portable execution across environments.
- Extending serverless/event-driven workflows from Kubernetes to HPC via secure offloading.
- Preserving user identity and access policies end-to-end with OIDC-based authentication.
- Respecting HPC network and storage policies through secure tunneling and credential propagation.

The result is a unified path where an event in object storage (or a message bus) can trigger scalable serverless functions that run on cloud or—when needed—transparently burst to HPC.

### Data-driven ingestion with dCNiOS (dCache + NiFi)

We built dCNiOS to connect dCache storage events with OSCAR through Apache NiFi. dCNiOS provides a YAML-based approach and a CLI tool to define and deploy the dataflow that listens to dCache Server-Sent Events (SSE) and triggers OSCAR services.

- What it solves: decouples ingestion rate (dCache) from processing rate (OSCAR) while keeping flows reconfigurable.
- How it’s delivered: a NiFi-based image with SSE client support and reusable process groups.
- Details and screenshots: see our post “Data-driven Processing with dCache, Apache NiFi and OSCAR.”

For a deep dive, check the original article:

- Dataflow overview and examples: `content/english/blog/data-driven-processing-with-dcache-nifi-oscar.md`.

### Offloading OSCAR workloads to HPC with interLink (itwinai use case)

We integrated OSCAR with interLink to transparently offload computation from Kubernetes to HPC systems, keeping the serverless UX intact. In this setup:

- OSCAR handles the event-driven lifecycle and user-friendly APIs.
- interLink securely offloads pods to HPC under the user’s identity, preserving site policies.
- OIDC-based auth and secure tunneling align with HPC security and networking constraints.
- Storage credentials are propagated from Kubernetes to HPC so data access remains consistent.

We showcased this with an inference service deployed using itwinai (developed by CERN in InterTwin), invoking HPC compute from OSCAR in a serverless manner.

{{< youtube NoVCfSxwtX0 >}}

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
