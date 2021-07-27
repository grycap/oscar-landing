---
title: "Deployment of an OSCAR cluster in the EGI Federated Cloud"
date: 2021-07-25T13:00:00+01:00
# post image
image: "images/blog/post-20210726-1/portada_blog_oscar_synergy.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is meta description"
# post draft
draft: false
---

Here we present a step by step guide to help you deploy an OSCAR cluster in the [EGI Federated Cloud]( https://www.egi.eu), specifically in the [EOSC-Synergy VO](https://infra.eosc-synergy.eu/vos/#synergy). We are using the [IM Dashboard](https://appsgrycap.i3m.upv.es:31443/im-dashboard/login), a tool developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/) to facilitate the deployment of infrastructures in a lot of cloud providers. Alternatively, you can follow our YouTube video, at the end of the post.

**Step 1:** Go the the [IM Dashboard](https://appsgrycap.i3m.upv.es:31443/im-dashboard/login) and click the button "Login with EGI-Check-in".

![Welcome to the IM Dashboard](../../images/blog/post-20210726-1/001.png)

**Step 2:** EGI Check-in supports multiple identity providers, select one and access the IM Dashboard.

![EGI Check-in](../../images/blog/post-20210726-1/002.png)

**Step 3:** Go to the top right corner and click on your username to access "Cloud Credentials".

![Cloud Credentials](../../images/blog/post-20210726-1/003.png)

**Step 4:** Click "New Credential" button and select EGI.

![New EGI Credential](../../images/blog/post-20210726-1/005.png)

**Step 5:** Write a new name for your new credential, select the EOSC-Synergy VO, and select the desired provider (the dropdown list can take a few seconds to load). Click "Add" to finish.

![Synergy VO Credential](../../images/blog/post-20210726-1/006.png)

**Step 6:** Return to the IM Dashboard by clicking on "IM Dashboard" at the top left corner. Go to "Launch an OSCAR Virtual Cluster" and click "Configure".

![Launch OSCAR Cluster](../../images/blog/post-20210726-1/009.png)

**Step 7:** "HW Data" tab will open. Give your infrastructure a name of your choice, and fill out the hardware data.

![HW Data](../../images/blog/post-20210726-1/010.png)

**Step 8:** Click "OSCAR Parameters" tab and fill out the form.

![OSCAR Parameters](../../images/blog/post-20210726-1/011.png)

**Step 9:** Click "Cloud Provider Selection" tab and select the newly created cloud provider in step 5. Choose the desired images for your OSCAR cluster. Click "Submit".

![Cloud Provider Selection](../../images/blog/post-20210726-1/013.png)

**Step 10:** The page "My Infrastructures" will open, and we can see the deployed or in deployment infrastructures. 

![My Infrastructures](../../images/blog/post-20210726-1/014.png)

**Step 11: (Optional)** By clicking the button "Logs" we can check the current status of our deployment.

![Logs](../../images/blog/post-20210726-1/015.png)

**Step 12:** Once our OSCAR cluster is deployed, the "Logs" button changes to "Outputs". Click the button: we get custom URLs to the Kubernetes dashboard, the MinIO portal, and the OSCAR UI.

![Outputs](../../images/blog/post-20210726-1/017.png)

**Step 13:** By clicking on the "oscarui_endpoint" URL we get the OSCAR UI that can be accessed with the username *oscar* and the specified password in step 8.

![OSCAR UI](../../images/blog/post-20210726-1/018.png)

**Step 14:** The OSCAR cluster is prepared to be used, click "Deploy new service" to start.

![Deploy new service](../../images/blog/post-20210726-1/019.png)

**Step 15:** To stop/delete the OSCAR cluster, return to the IM Dashboard -> "My Infrastructures" and select the appropriate option.

![Options on My Infrastructures](../../images/blog/post-20210726-1/016.png)

### Youtube video

Here you have a follow along video including all the steps, enjoy!

{{< youtube 2ES2V4bnjbQ >}}