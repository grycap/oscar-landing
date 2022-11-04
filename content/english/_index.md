---
####################### Banner #########################
banner:
  title : "Open Source Serverless Computing for Data-Processing Applications (OSCAR)"
  image : "images/undraw_to_the_moon_v1mv.svg"
  content : "Serverless computing for Docker-based computationally-intensive applications on elastic Kubernetes clusters deployed on multi-Clouds."
  button:
    enable : true
    label : "Deploy your Cluster"
    link : "https://im.egi.eu/im-dashboard/configure?selected_tosca=oscar.yaml&childs="

##################### Feature ##########################
feature:
  enable : true
  title : "Key Features"
  feature_item:
    # feature item loop
    - name : "Multi-cloud Support"
      icon : "fas fa-cloud"
      content : "Provision OSCAR clusters on on-premises, public and federated Clouds"
      
    # feature item loop
    - name : "Elasticity"
      icon : "fas fa-expand"
      content : "Kubernetes clusters grow and shrink according to the workload"
      
    # feature item loop
    - name : "Workflows"
      icon : "fas fa-bars"
      content : "Compose data-driven serverless workflows with a [Functions Definition Language](https://grycap.github.io/oscar/fdl/)"
        
    # feature item loop
    - name : "Flexible Interfaces"
      icon : "fas fa-file-invoice"
      content : "[REST API](https://grycap.github.io/oscar/api/), [Web-based GUI](https://grycap.github.io/oscar/usage/) and [CLI](https://github.com/grycap/oscar-cli) (Command-line Interface)"
      
    # feature item loop
    - name : "Built on Kubernetes"
      icon : "fas fa-cloud"
      content : "OSCAR's services use Kubernetes components for easier extensibility"
      
    # feature item loop  
    - name : "Open Source"
      icon : "fas fa-heart"
      content : "Distributed under the Apache 2.0 License in [GitHub](https://github.com/grycap/oscar). Also offered as SaaS"

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
    
      content : "OSCAR supports data-driven serverless computing for file-processing applications. Services will be triggered in response to a file upload to an object storage back-end in order to execute a user-defined shell script inside a container provisioned out of an user-defined Docker image. These will be orchestrated as a Kubernetes batch jobs. The output data will be uploaded to any object storage back-ends support. Synchronous invocations available."
     # button:
     #   enable : true
     #   label : "Check it out"
     #   link : "#"
        
    # service item loop
    - title : "Support for Multiple Storage Back-ends"
      images:      
      - "images/minio-seeklogo.com.svg"
      - "images/amazon-s3.png"
      - "images/onedata-logo.png"

      content : "Each OSCAR cluster features a [MinIO](https://min.io/) installation so that file uploads trigger the execution of the file-processing applications. Other storage back-ends are supported for file storage output including [Amazon S3](https://aws.amazon.com/s3) and the [EGI DataHub](https://www.egi.eu/services/datahub/) (based on [Onedata](https://onedata.org)). These can be chained to create data-driven workflows of functions"
   #   button:
   #     enable : true
   #     label : "Check it out"
   #     link : "#"
        
    # service item loop
    - title : "Kubernetes-based Architecture"
      images:
      #- "images/logo-im1.png"
      # - "images/oscar-components.png"
      - "images/oscar-arch.svg"      
      content : "An OSCAR cluster is entirely based on dynamically deployed elastic Kubernetes clusters that can grow and shrink in terms of the number of nodes thanks to the [CLUES](https://github.com/grycap/clues) elasticity system. Clusters self-adapt to the incoming workload by provisioning additional nodes up the limit configured at deployment time."
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
      content : "An OSCAR cluster can be provisioned from the CLI using [EC3](https://www.grycap.upv.es/ec3) but the simplest approach is to use the Infrastructure Manager (IM) Dashboard, which provides a streamlined process of deploying the cluster on any Cloud that you have access to."
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
      content : "OSCAR is integrated with [SCAR](https://github.com/grycap/scar), an open-source tool to execute generic applications on [AWS Lambda](https://aws.amazon.com/lambda), the Functions as a Service (FaaS) provided of Amazon Web Services (AWS). This allows to create serverless workflows across the Cloud computing continuum, where some lightweight processing occurs in an on-premises Cloud (or in the edge) and intensive computing takes place in AWS Lambda.
      SCAR is also integrated in with [AWS Batch](https://aws.amazon.com/batch), a managed service to provision auto-scaled clusters in AWS Batch. This allows to execute event-driven serverless workflows for applications that require intensive computing or specialized accelerated hardware such as GPUs."
    
            
  
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
  content : "You can deploy an OSCAR cluster on your favourite Cloud via the [IM Dashboard](https://im.egi.eu/im-dashboard/configure?selected_tosca=oscar.yaml&childs=). No need to register. You will authenticate via [EGI Check-In](https://www.egi.eu/services/check-in/). Not ready yet? Get acquainted first with OSCAR by browsing its [documentation](https://grycap.github.io/oscar). Whenever you are ready ..."
  button:
    enable : true
    label : "Deploy your Cluster"
    link : "https://im.egi.eu/im-dashboard/configure?selected_tosca=oscar.yaml&childs="
---