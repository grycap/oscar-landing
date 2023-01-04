---
title: "FDL Composer to create a workflow with OSCAR"
date: 2022-06-06T18:00:00+01:00
# post image
image: "images/blog/post-oscar-fdl-composer/1-fdl-composer.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "Using FDL-Composer tool to create a workflow in OSCAR"
# post draft
draft: false
---


[FDL-Composer](http://composer.oscar.grycap.net) is a tool to visually design workflows for [OSCAR](https://oscar.grycap.net) and [SCAR](https://github.com/grycap/scar). We are going to simulate the example [video-process](https://github.com/grycap/oscar/tree/master/examples/video-process)

This example supports highly-scalable event-driven video analysis using [ffmpeg](https://ffmpeg.org) to extract keyframes of the video and [Darknet](https://pjreddie.com/darknet/) to perform object recognition on the keyframes. It requires two OSCAR services: one where the video is going to get split into frames, and  another to process those frames. It also requires three MinIO buckets. One for the input. One for the output. And the last one for the connection between both services. So when a video is uploaded to the input bucket, the "split video" OSCAR service will be triggered and let the frames in an intermediate bucket. That will trigger the "processing frame" OSCAR service. Furthermore, the result will be stored in the last bucket.

Drag the OSCAR functions we are going to use. In this case, two.

![2-fdl-composer.png](images/blog/post-oscar-fdl-composer/2-fdl-composer.png)

Double click in the node. Fill in the different input fields.

Split Video             |  Object Detection
:-------------------------:|:-------------------------:
![3-fdl-composer.png](images/blog/post-oscar-fdl-composer/3-fdl-composer.png)  |  ![4-fdl-composer.png](images/blog/post-oscar-fdl-composer/4-fdl-composer.png)

Create a new MinIO storage.

![5-fdl-composer.png](images/blog/post-oscar-fdl-composer/5-fdl-composer.png)

![6-fdl-composer.png](images/blog/post-oscar-fdl-composer/6-fdl-composer.png)

Drag into the canvas three MinIo buckets.

![7-fdl-composer.png](images/blog/post-oscar-fdl-composer/7-fdl-composer.png)

Connect all the components and make a workflow.

![8-fdl-composer.png](images/blog/post-oscar-fdl-composer/8-fdl-composer.png)

Put the name in the different buckets.

Input Bucket      |  Medium Bucket |  Output Bucket
:-------------------------:|:-------------------------:|:-------------------------:
![9-fdl-composer.png](images/blog/post-oscar-fdl-composer/9-fdl-composer.png) | ![10-fdl-composer.png](images/blog/post-oscar-fdl-composer/10-fdl-composer.png) | ![11-fdl-composer.png](images/blog/post-oscar-fdl-composer/11-fdl-composer.png)

Export YAML

![12-fdl-composer.png](images/blog/post-oscar-fdl-composer/12-fdl-composer.png)

Here is the result:

``` yaml
functions:
  oscar:
    - oscar-cluster:
        name: split-video
        memory: 1Gi
        cpu: '1'
        image: grycap/ffmpeg
        script: split-video.sh
        input:
          - path: video-process/in
            storage_provider: minio.minio
        output:
          - path: video-process/med
            storage_provider: minio.minio
    - oscar-cluster:
        name: darknet
        memory: 1Gi
        cpu: '1'
        image: grycap/darknet-v3
        script: yolov3-object-detection.sh
        input:
          - path: video-process/med
            storage_provider: minio.minio
        output:
          - path: video-process/out
            storage_provider: minio.minio
storage_providers:
  minio:
    minio:
      endpoint: 'http://localhost:443'
      region: us-east-1
      access_key: minio
      secret_key: miniopassword
      verify: false
```

This FDL file can be used as input to OSCAR in order to deploy the services within a specific OSCAR cluster.

[FDL Composer](https://composer.oscar.grycap.net), [OSCAR](https://grycap.github.io/oscar/) and [SCAR](https://github.com/grycap/scar) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
