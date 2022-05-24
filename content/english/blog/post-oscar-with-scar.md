---
title: "Deploy functions in OSCAR and AWS Lambda through SCAR"
date: 2022-05-09T18:00:00+01:00
# post image
image: "images/blog/post-oscar-with-scar/scar.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "Using SCAR to deploy functions in OSCAR and other infrastructures"
# post draft
draft: false
---

Here is an example of using several infrastructures. It shows how to use [SCAR](https://scar.readthedocs.io/en/latest/) tool to deploy functions in [OSCAR](https://oscar.grycap.net/) and AWS Lambda.

### Previous step: Deploy the OSCAR cluster on an IaaS Cloud and install OSCAR-CLI

Follow the [deployment instructions with IM Dashboard](https://docs.oscar.grycap.net/deploy-im-dashboard/). Alternatively, can be executed this script to install locally.

```bash
curl -sSL http://go.oscar.grycap.net | bash
```

To deploy functions in AWS Lambda and OSCAR, you must install [SCAR](https://scar.readthedocs.io/en/latest/installation.html), highly recommended to create an alias in the command line.

### STEP 1: Configure SCAR

SCAR must be configured to be able to handle OSCAR services transparently.
Add to the file `.scar/scar.cfg` with a structure similar to:

``` cfg
"oscar": {
    "oscar-cluster": {
      "endpoint": $oscar-endpoint,
      "auth_user": $oscar-user,
      "auth_password": $oscar-password,
      "ssl_verify": false,
      "memory": "256Mi",
      "cpu": "0.2",
      "log_level": "INFO"
    }
  },
```

Default endpoint `https://localhost:443`. If oscar-cli is already configured search the configuration in `.oscar-cli/config.yaml`

To confirm that SCAR is configured to handle OSCAR services, use the following command:

```sh
scar ls
```

The result will list your OSCAR services and your AWS functions.

``` text
AWS FUNCTIONS:
NAME       MEMORY    TIME  IMAGE_ID    API_URL    SUPERVISOR_VERSION

OSCAR SERVICES - CLUSTER "oscar-cluster" ():
NAME                       MEMORY      CPU  IMAGE_ID
```

### STEP 2: Permissions AWS account

### STEP 3: YAML

When a function is deployed in Lambda services by SCAR, the name of the functions must start with `scar-`. Inside the YAML files must be declared the different authentication keys. To access AWS sources, you need two keys, the access Key (It starts with the prefix AK) and the secret Key.

``` yaml
storage_providers:
  s3:
    my_s3:
      access_key: AK
      secret_key: 
      region: us-east-1
```

### STEP 4: Deploy the services in both clouds with scar

```sh
scar init -f posenet-video-aws.yaml -r $ARN
```

A role in AWS must be assigned to you to use SCAR. It is not enough just put the name role. It must be a complete identification. So search the service IAM, go to the role tab, search your role name, select it, and copy the ARN.

### STEP 5: Make it work

A file must be uploaded to the folder `video-split/input` in the bucket of MinIo to invoke this workflow.

Uploading a file must be done in many different ways.

- If you can access the buckets in oscar UI. It is the easiest way.
- If not, use [MinIo UI](http://localhost:30301)
- In a real cluster. Use the following command:

```sh
oscar-cli service put-file split $STORAGE_PROVIDER $LOCAL_FILE $REMOTE_FILE
```

### STEP 6: Remove Services

To delete all the workflow. The best way is to use the flag `-f` in SCAR.

``` sh
scar rm -f posenet-video-aws.yaml 
```

### STEP 7: All in localhost

This workflow can be deployed using only the OSCAR infrastructure,
Use the YAML file `posenet-video.yaml`. Can be deployed with OSCAR-CLI and scar.

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
