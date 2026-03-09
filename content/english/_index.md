---
####################### Banner #########################
banner:
  title : "Open Source Serverless Computing for Data-Processing Applications"
  image : "images/banner-art.svg"
  content : "A flexible Virtual Research Environment (VRE) to run Docker-based, compute-intensive workloads with serverless workflows on elastic Kubernetes clusters deployed across multiple clouds."
  button:
    enable : true
    label : "Deploy on a Cloud"
    link : "https://im.egi.eu/im-dashboard/configure?selected_tosca=oscar.yaml"
  secondary_buttons:
    - label: "Quick Start"
      link: "https://docs.oscar.grycap.net/"

##################### Feature ##########################
feature:
  enable : true
  title : "Key Features"
  feature_item:
    # feature item loop
    - name : "Multi-cloud Support"
      icon : "fas fa-cloud"
      content : "Deploy across many clouds via the [Infrastructure Manager (IM)](https://im.egi.eu)."
      
    # feature item loop
    - name : "Elasticity"
      icon : "fas fa-expand"
      content : "Kubernetes clusters scale up and down automatically based on workload."
      
    # feature item loop
    - name : "Workflows"
      icon : "fas fa-bars"
      content : "Compose data-driven serverless workflows with the [Functions Definition Language](https://grycap.github.io/oscar/fdl/)."
        
    # feature item loop
    - name : "Multiple Interfaces"
      icon : "fas fa-file-invoice"
      content : "Secure OIDC [REST API](https://grycap.github.io/oscar/api/), [Dashboard](https://grycap.github.io/oscar/usage/), and [CLI](https://github.com/grycap/oscar-cli) available for multi-tenant usage."
      
    # feature item loop
    - name : "Built on Kubernetes"
      icon : "fas fa-cloud"
      content : Built on Kubernetes components for easier extension and integration."
      
    # feature item loop  
    - name : "Open Source"
      icon : "fas fa-heart"
      content : "Apache 2.0 License, also available as a managed SaaS."

    # feature item loop
    - name : "Edge-Ready Runtime"
      icon : "fas fa-microchip"
      content : "Runs on ARM-based edge devices (e.g., Raspberry Pi and NVIDIA Jetson Nano)."

    # feature item loop
    - name : "Scale to Zero"
      icon : "fas fa-power-off"
      content : "Reduces idle resource usage by scaling services down depending onn the workload."

    # feature item loop
    - name : "Observability & Operations"
      icon : "fas fa-chart-line"
      content : "Tracks service status and metrics. Enforces quota allocations."

######################### Service #####################
service:
  enable : true
  service_item:
  
    # service item loop
    - title : "Serverless for Compute-Intensive Processing"
      images:
    #  - "images/undraw_server_cluster_jwwq.svg"
      - "images/undraw_server_status_5pbv.svg" 
    #  - "images/Kubernetes_logo.svg"
    
      content : "OSCAR provides data-driven serverless computing for data-processing applications. Services can be triggered by file uploads to an object storage backend, executing a user-defined shell script inside a container based on a user-defined Docker image. Executions are orchestrated as Kubernetes batch jobs, and output data can be uploaded to supported object storage backends. Synchronous invocations with scale-to-zero support and exposed services for those who provide APIs are also available. "
     # button:
     #   enable : true
     #   label : "Check it out"
     #   link : "#"
        
    # service item loop
    - title : "Support for Multiple Storage Back-ends"
      images:
      - "images/oscar-components.png"

      content : "Each OSCAR cluster includes [MinIO](https://min.io/) so file uploads can trigger data-processing applications. Services can be chained to build data-driven workflows. Output storage also supports other backends, including [Amazon S3](https://aws.amazon.com/s3) and [EGI DataHub](https://www.egi.eu/services/datahub/) (based on [Onedata](https://onedata.org))."
   #   button:
   #     enable : true
   #     label : "Check it out"
   #     link : "#"
        
    # service item loop
    - title : "Kubernetes-based Architecture"
      images:
      #- "images/logo-im1.png"
      # - "images/oscar-components.png"
      - "images/oscar-arch.png"
      content : "An OSCAR cluster is built on dynamically deployed, elastic Kubernetes infrastructure. With the [CLUES](https://github.com/grycap/clues) elasticity system, clusters self-adapt to incoming workload by scaling node capacity up to the deployment limits you define."
     # button:
     #   enable : true
     #   label : "Check it out"
     #   link : "#"
        
    # service item loop
    - title : "Automated Deployment on Multi-Clouds"
      images:
      - "images/im-dashboard-00a.png"
      - "images/im-dashboard-01a.png"
      - "images/im-dashboard-03a.png"
      - "images/im-dashboard-04b.png"
      - "images/im-dashboard-05a.png"
      - "images/im-dashboard-06a.png"
      content : "Provision OSCAR clusters through the [Infrastructure Manager (IM)](https://www.grycap.upv.es/im) with a guided, streamlined workflow. From a single interface you can select your target cloud, apply deployment settings, and launch a reproducible OSCAR cluster in minutes."
      #button:
      #  enable : true
      #  label : "Check it out"
      #  link : "#"

  # service item loop
    - title : "Serverless Workflows for the Cloud Computing Continuum"
      images:
      - "images/hybrid-workflow.svg"
      - "images/workflow.svg"
      - "images/arch-scar-batch.svg"
      content : "OSCAR integrates with [SCAR](https://github.com/grycap/scar), an open-source tool for running generic applications on [AWS Lambda](https://aws.amazon.com/lambda) (AWS Functions as a Service). OSCAR can also run on ARM-based edge devices such as Raspberry Pi and NVIDIA Jetson Nano boards. This enables serverless workflows across the cloud computing continuum: lightweight processing can run on-premises or at the edge, while heavier workloads run in AWS Lambda. SCAR also integrates with [AWS Batch](https://aws.amazon.com/batch), enabling event-driven workflows for compute-intensive applications or workloads that require specialized hardware such as GPUs."
    
    - title : "An Integrated Dashboard"
      images:
      - "images/oscar-dashboard-00-login.jpg"
      - "images/oscar-dashboard-01-buckets.jpg"
      - "images/oscar-dashboard-02-services.jpg"
      - "images/oscar-dashboard-03-notebooks.jpg"
      - "images/oscar-dashboard-03-notebooks-2.jpg"
      - "images/oscar-dashboard-04-flows.jpg"
      - "images/oscar-dashboard-05-hub.jpg"
      - "images/oscar-dashboard-06-status.jpg"
      content : "Manage the full OSCAR lifecycle from a web-based dashboard: access clusters securely, configure buckets and services, compose workflows, connect Jupyter notebook-based environments, and monitor platform status in real time. "
      #button:
      #  enable : true
      #  label : "Check it out"
      #  link : "#"
           
  
################### Screenshot ########################
#screenshot:
#  title : "Start composing your serverless workflows"
#  image : "images/undraw_User_flow_re_bvfx.svg"
##  enable : false


##################### Call to action #####################
call_to_action:
  enable : true
  title : "Ready to get started?"
  image : "images/undraw_version_control_re_mg66.svg"
  content : "Deploy an OSCAR cluster on your preferred cloud through the [IM Dashboard](https://im.egi.eu). No registration is required. Not ready yet? Start with the [documentation](https://docs.oscar.grycap.net) and come back when you are ready."
  button:
    enable : true
    label : "Deploy on a Cloud"
    link : "https://im.egi.eu/im-dashboard/configure?selected_tosca=oscar.yaml"
---
