---
title: "Design of workflows across OSCAR services with Node-RED(Part 2)."
date: 2023-02-23T09:00:00+01:00
# post image
image: "/images/blog/post-node-oscar/image_2/oscar-dashboard.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for creating workflows in Node-RED using dashboard to interact with OSCAR services."
# post draft
draft: false
---
In this post, the work with Node-RED and its interaction with OSCAR services will be continued. Two workflows will be presented where you interact with OSCAR services using the Dashboard tool, which will ultimately provide a web interface for the user. In general, there will be a choreography of various OSCAR services, where the backend part will be in the workflow programming part and the frontend will be in the web interface provided by the dashboard.

### 1. Choreography of OSCAR services with Node-RED using web interface with dashboard.

Two examples of interaction with OSCAR will be shown below. The first workflow shows a dashboard where the user can interact with all OSCAR services. Through a web interface, the user can enter the input data to the services (text messages or images), which will process and in turn display the results returned by the services. All this through a simple and easy-to-use interface. 

The second workflow shows us an interface where, through the introduction of an image, its processing is done. Here two services (grayify and plants) are called, where the output of the first service (grayify) is the input of the second service (plants). Being able to invoke two services synchronously with a single data entry. All the results of each process are displayed in a web interface where the user has to enter the location of the image to be processed and the processing of the same will be returned by this created workflow.

### 1.1. Dashboard as a visualization element in Node-RED.

One of the advantages of Node-RED is that web interfaces can be created from workflows that allow users to interact with different services without having to modify the workflow. Making a comparison, the dashboard displayed by Node-RED would be the front-end and the flows would be the back-end of an application . 
The dashboard layout should be thought of as a grid. Each item in the group has a width: 6 units by default (one unit is 48 pixels wide by default with a 6 pixel gap). Each widget in the group also has a width: by default, 'auto', which means it will take up the width of the group it's in, but you can set it to a fixed number of units. It is possible to use multiple groups if possible, instead of one big group, so that the page can dynamically resize on smaller screens (Figure 1).


<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-element.png" alt="Figure 1. Elements of a dashboard." title="Figure 1. Elements of a dashboard."> </p>
<figcaption>Figure 1. Elements of a dashboard.</figcaption>
 </div>

The dashboard is accessed with `http://IP_NodeRED:1880/ui` (Figure 2).

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-view.png" alt="Figure 2. Dashboard web interface." title="Figure 2. Dashboard web interface."> </p>
<figcaption>Figure 2. Dashboard web interface.</figcaption>
</div>

> If you want more information you can get it in [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard) or [getting started node-red-dashboard](https://randomnerdtutorials.com/getting-started-node-red-dashboard/)


Below are two dashboard developments that interact with the services implemented in OSCAR. A first dashboard has the function of interacting with all the services independently where you only have to enter the data to be processed and the OSCAR credentials. The second example presents a cascading development of two services (grayify and plants) that process images. In other words, the result of the grayify service (converts the image to grayscale), the plant detection algorithm is applied to it, which is implemented in the plants service. Here the user only introduces the image to be processed and the OSCAR credentials, resulting in what was stated above.

### 1.2. OSCAR services dashboard.

The developed interface is capable of invoking all the services that are in the OSCAR cluster without the need to modify the work flow. It should be noted that the flow was developed without using its own nodes or subflows (Figure 3), which shows that it is always necessary to use these elements since they can facilitate the work.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-oscar-allservices-flow.png" alt="Figure 3. Workflow for all OSCAR services." title="Figure 3. Workflow for all OSCAR services."> </p>
<figcaption>Figure 3. Workflow for all OSCAR services.</figcaption>
</div>

As it can be seen, it has a large number of nodes and connections, the `.json` file can be seen in the work attachments. Now once all the flows have been developed, the dashboard must be raised to be able to interact with the OSCAR services. For that, go to the upper right part (Figure 4).

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-deploy.png" alt="Figure 4. Deployment of the dashboard." title="Figure 4. Deployment of the dashboard."> </p>
<figcaption>Figure 4. Deployment of the dashboard.</figcaption>
</div>

Once here, click on the icon that runs the dashboard and a new window is launched within the browser with the interface . Within this interface, the first thing to do is select the service that you want to invoke, as shown in figure 5.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-view.png" alt="Figure 5. Dashboard to interact with OSCAR services." title="Figure 5. Dashboard to interact with OSCAR services."> </p>
<figcaption>Figure 5. Dashboard to interact with OSCAR services.</figcaption>
</div>

In the first case, the Cowsay service is sectioned. Once selected, a series of components are displayed that must be filled out. These include the cluster username and password, as well as the text to be processed. Another element that could be useful can be selecting to see the information of the service, which will be displayed if the user wishes, as shown in figure 6.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-config-cowsay.png" alt="Figure 6. Dashboard configuration for Cowsay service." title="Figure 6. Dashboard configuration for Cowsay service."> </p>
<figcaption>Figure 6. Dashboard configuration for Cowsay service.</figcaption>
</div>

After having all the data ready, the service is executed through the connect button and, depending on the service, the results of the service will be displayed in a more user-friendly way (Figure 7). If you want to run the service again with another word, you only need to modify the cowsay data field.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-run-cowsay.png" alt="Figure 7. Running the Cowsay service on the dashboard." title="Figure 7. Running the Cowsay service on the dashboard."> </p>
<figcaption>Figure 7. Running the Cowsay service on the dashboard.</figcaption>
</div>

To execute another service, select it as shown in figure 8 and the work interface of said service will appear (Figure 9).

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-select.png" alt="Figure 8. Selection of a new service to run." title="Figure 8. Selection of a new service to run."> </p>
<figcaption>Figure 8. Selection of a new service to run.</figcaption>
</div>

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-view-grayify.png" alt="Figure 9. Dashboard interface for Grayify service." title="Figure 9. Dashboard interface for Grayify service."> </p>
<figcaption>Figure 9. Dashboard interface for Grayify service.</figcaption>
</div>

This grayify interface is the same as that of plants, so only one of the two is explained. Here, as before, the OSCAR cluster credentials will be entered. To load the image that you want to process, click on the Load Image button and the image will be searched.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-load-grayify.png" alt="Figure 10. Image capture to be processed." title="Figure 10. Image capture to be processed."> </p>
<figcaption>Figure 10. Image capture to be processed.</figcaption>
</div>

Once you have the image (Figure 10) and the credentials, you can run the service as shown in Figure 11. If you want to run the service again with another image, just load another image and run the service again. 

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-run-grayify.png" alt="Figure 11. Running the Grayify service on the dashboard." title="Figure 11. Running the Grayify service on the dashboard."> </p>
<figcaption>Figure 11. Running the Grayify service on the dashboard.</figcaption>
</div>

In the case of the text-to-speech-google service, it is very similar to that of Cowsay, except that here an audio would come out with the text that was sent (Figure 12).

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-allservices-run-textspeech.png" alt="Figure 12. Running the text-to-speech-google service on the dashboard." title="Figure 12. Running the text-to-speech-google service on the dashboard."> </p>
<figcaption>Figure 12. Running the text-to-speech-google service on the dashboard.</figcaption>
</div>

These interfaces have the objective that the user does not have to change anything in the work flows and in turn reproduce in an easier way the work with the services that are implemented in the OSCAR cluster.

>If you want to download the `.json` file of the [workflow for all services](https://github.com/grycap/oscar_nodered/blob/main/examples_nodered_oscar/example_workflows_dashboard/workflow_all_services.json) for this example, you can get it from the  [oscar_nodered repository](https://github.com/grycap/oscar_nodered).

### 1.3 OSCAR Continuum Services Workflow Dashboard (Grayify-Plants).

In the following example we want to exemplify the workflow of invoking two OSCAR services consecutively (Figure 13). In other words, firstly, the grayify service is invoked and a grayscale image is obtained, and then this image is taken and the plants service is invoked to carry out the classification that this algorithm displays. For this, a flow is developed with its respective dashboard to be able to carry out said process.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-workflow.png" alt="Figure 13. Grayify and Plants service invocation workflow." title="Figure 13. Grayify and Plants service invocation workflow."> </p>
<figcaption>Figure 13. Grayify and Plants service invocation workflow.</figcaption>
</div>

The dashboard interface is very simple and it is only necessary to load the image for which you want to develop the process and enter the OSCAR cluster credentials as shown in figure 14.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-load.png" alt="Figure 14. Interface for invoking the Grayify and Plants services." title="Figure 14. Interface for invoking the Grayify and Plants services."> </p>
<figcaption>Figure 14. Interface for invoking the Grayify and Plants services.</figcaption>
</div>

From here, click on the connect button and the process will begin. Initially the first service will be displayed and then the second service will be executed. Visualizing the result of these processes in the interface developed as shown in figures 15 and 16.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-run-grayify.png" alt="Figure 15. Execution of the first service (Grayify)." title="Figure 15. Execution of the first service (Grayify)."> </p>
<figcaption>Figure 15. Execution of the first service (Grayify).</figcaption>
</div>

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-run-plants.png" alt="Figure 16. Execution of the second service (Plants)." title="Figure 16. Execution of the second service (Plants)."> </p>
<figcaption>Figure 16. Execution of the second service (Plants).</figcaption>
</div>

If you want to run the process again with another image, load it (Figure 17) and run the process (Figure 18). Clarify that when the process is executed for security reasons, the credentials that the user entered previously will be deleted, so it is necessary to re-enter them.

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-load-2.png" alt="Figure 17. Process of capturing the new image to be processed." title="Figure 17. Process of capturing the new image to be processed."> </p>
<figcaption>Figure 17. Process of capturing the new image to be processed.</figcaption>
</div>

<div align="center"><p><img src="../../images/blog/post-node-oscar/image_2/node-dashboard-twoservices-run-2.png" alt="Figure 18. Execution of a new workflows on a new image." title="Figure 18. Execution of a new workflows on a new image."> </p>
<figcaption>Figure 18. Execution of a new workflows on a new image.</figcaption>
</div>

>If you want to download the `.json` file of the [workflow for two continuos services](https://github.com/grycap/oscar_nodered/blob/main/examples_nodered_oscar/example_workflows_dashboard/workflow_two_services.json) for this example, you can get it from the [oscar_nodered repository](https://github.com/grycap/oscar_nodered).

This process demonstrates how easy it could be to invoke OSCAR Shell Services through Node-RED without having to execute command lines just using the OSCAR API. 
In a future blog entry these two dashboards will be shown using the nodes and subflows created in the previous entry.

[OSCAR-Node-RED](https://github.com/grycap/oscar_nodered) is  developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
  
