---
title: "Design of workflows on OSCAR cluster with Node-RED (Part 1)."
date: 2023-02-23T09:00:00+01:00
# post image
image: "/images/blog/post-node-oscar/image/oscar.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for creating nodes and subflows in Node-RED to interact with OSCAR services."
# post draft
draft: false
---
In this post, we will be explaining the integration of the [Node-RED](https://nodered.org/) software with the [OSCAR platform](https://oscar.grycap.net/). The necessary tools will be given to achieve workflows between OSCAR and Node-RED in a simple and intuitive way through flow-based programming techniques. For this, a series of nodes and subflows are developed that will interact with a series of services implemented in OSCAR.

## 1. Introduction to working with Node-RED software.

Node-RED is a tool created by IBM's Emerging Technologies Services group, it serves to communicate hardware and services in a very fast and easy way. It greatly simplifies the task of programming on the server side thanks to visual programming (Figure 1).

It was created by Nick O'Leary and Dave Conway-Jones from IBM's Emerging Technologies Services group in 2013. Its goal is to solve the complexity that arises when you want to integrate hardware with other services.

The minimal structure is the nodes. These are dragged through the graphical interface and allow you to do a specific task. Receive an HTTP call, an MQTT message or the activation of a button. All these nodes are organized in flows or flows that group nodes that connect to each other. Everything in a visual way, with hardly having to program. 

Node-RED is built from [NodeJS](https://nodejs.org) and the [D3.js JavaScript library](https://d3js.org/).

NodeJS provides enough power to make Node-RED reliable and scalable as it is very powerful software that allows server-side JavaScript programming. Its most important advantage is that it is optimized to be able to treat multiple concurrent connections in an optimal way. It is the largest open source ecosystem in the world and is being used by leading companies such as PayPal and Netflix.

On the other hand, D3.js is in charge of the web interface. Node-RED is accessible through a browser, that is, you only need to access a web page to be able to create your own systems, you do not need to install any development environment or IDE.

<div align="center">
<img src="../../images/blog/post-node-oscar/image/node-red.png" alt="Official node-red icon." title="Figure 1. Official Node-RED icon."> <
<figcaption>Figure 1. Official Node-RED icon.</figcaption>
 </div>


### 1.1. Installation of Node-RED.

Node-RED has the possibility of being installed in several operating systems and devices (for more information consult [1](https://nodered.org/docs/getting-started/)), due to the great possibility of connecting applications that it presents.

For the installation process, some prerequisites are needed, such as the installation of NodeJS and npm [Node Package Manage](https://www.npmjs.com/). Now with these elements you can go to the installation through the command:

 ``` bash
 npm install -g –unsafe-perm node-red
 ```
Once Node-RED is installed, it must be executed from the command window (node-red), starting the execution process in the terminal (Figure 2).

<div align="center"><p><img src="../../images/blog/post-node-oscar/image/node-command-initial.png" alt="Execution of Node-RED in command window" title="Figure 2. Execution of Node-RED in command window."> </p>
<figcaption>Figure 2. Execution of Node-RED in command window.</figcaption>
 </div>


Once executed, the local address of the computer will be written to a browser (Mozilla or Chrome) or 127.0.0.1:1880 or localhost:1880. Then everything will be ready to carry out the first works (Figure 3).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-workflow-initial.png" alt="View of the Node-RED workspace in a browser" title="Figure 3. View of the Node-RED workspace in a browser."></p>
<figcaption>Figure 3. View of the Node-RED workspace in a browser.</figcaption>
 </div>

### 1.2. User creation and security.

The Node-RED installation process allows anyone to have permissions to use the program, so it is necessary to implement certain configurations and permissions to the different users who may have access to the tool [2](https://nodered.org/docs/user-guide/runtime/securing-node-red). 

Since the latest versions it is possible to configure and secure it, by editing the configuration file settings.js. Its location is at the address shown in the execution process in the Settings file section (Figure 4).

![Location of Settings file](../../images/blog/post-node-oscar/image/node-setting-file.png "Figure 4. Location of Settings file.")
<div align="center">
<figcaption >Figure 4. Location of Settings file.</figcaption> </div>

The file comes by default with several commented options, to enable them it is only necessary to remove the comment ("//") and edit the option with the data by default or modified by the user.

To enable authentication based on username and password , you must uncomment the adminAuth property of the configuration file. You can include as many users as you want, it is only necessary to modify the values of username, password and permissions. The password is securely encrypted using the bcrypt algorithm through the command.

``` bash
sudo node-red admin hash-pw 
```

It will ask for the password to use and then returns the hash that should be copied into the configuration file belonging to a given user. 
In the case of the permissions that users can have, the “*” means that the user has all the permissions (read and write). If you want the user to have only read permissions, use “read”.

Once this process is done, restart Node-RED again and the following window will appear as shown in figure 5, where the credentials of each user must be entered to use the platform.

![Node-RED view for credentials entry.](../../images/blog/post-node-oscar/image/node-credential.png "Figure 5. Node-RED view for credentials entry.")
<div align="center">
<figcaption >Figure 5. Node-RED view for credentials entry.</figcaption> </div>

Once the credentials have been entered, you reach the work area and if you go to the upper right you can see the user for whom you entered the platform (Figure 6).



<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-user-enter.png" alt="View of the user who enters the platform." title="Figure 6. View of the user who enters the platform."></p>
<figcaption >Figure 6. View of the user who enters the platform.</figcaption> </div>

### 1.3 Node-RED work environment.

When Node-RED is running, it exposes a web access (whose port and access protection are configurable) that allows to remotely launch a fully browser-based graphical stream editor as shown in figure 7.

![Node-RED work environment.](../../images/blog/post-node-oscar/image/node-workspace-parts.png "Figure 7. Node-RED work environment.")
<div align="center">
<figcaption >Figure 7. Node-RED work environment. </figcaption></div>


The first is the nodes palette [3](https://nodered.org/docs/user-guide/nodes) that can normally be found on the left side of the screen and there will contain all the new assets that can be used to create programs through the flow of these nodes, the second part It is the work environment where the program is carried out through the nodes. The right part is the section that corresponds to the configuration or drawing help area, this will be enabled depending on the node that is selected from the workflow.

Once inside the browser, new flows can be created by dragging some of the available node types from a side palette in the workspace, connecting them to each other, establishing the data process flow and configuring the parameters and attributes of said nodes.

The nodes are connected using link lines ('wires') that join their ports ('ports'). A node can have at most one input port and one or more output ports. These link lines ('wires') define the data flow that is established between the different nodes.

 > If you want to go deeper into these topics, you can see [4](https://nodered.org/docs/user-guide/concepts) and [5](https://nodered.org/docs/user-guide/editor/). 

Once you have a project with everything you need, you always want to save it to a directory for safety or to send it to other developers. All the logic resulting from the work done through the editor is stored internally in a JSON file. This allows it to be easily shared by work teams through source and version management repositories, imported into other Node-RED environments, or served as a starter template for creating new flows in separate environments.

Therefore, if you want to save the developed workflow, go to the upper right and a series of elements are displayed. To save the flow, click on Export. For obvious security reasons, the credentials (for example passwords) that are stored in the so-called configuration nodes are not persisted in the file and must be configured again in the environments into which they are imported, thus allowing a clean separation of the credentials that must be configured specifically for each environment (Figure 8).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-save-flow.png "  alt="Interface to save a flow." title="Figure 8. Interface to save a flow." width=500px></p>
<figcaption >Figure 8. Interface to save a flow.</figcaption> </div>

Once you have all the nodes you must click on the Deploy tab (upper right). This results in the workflow running, where the blue dots above each node disappear and the Deploy tab is no longer red. Any modification of the flow or of the nodes returns the blue dots and the Deploy tab returns to red. 

With a simple click on the Deploy dropdown, the flow that has just been created (or modified) is saved and redeployed (along with the other flows that accompany it in the other tabs) in the environment where it is running and the overall workflow resumes (Figure 9).

![Execution of a workflow in Node-RED.](../../images/blog/post-node-oscar/image/node-view-workspace.png "Figure 9. Execution of a workflow in Node-RED.")
<div align="center">
<figcaption >Figure 9. Execution of a workflow in Node-RED.</figcaption>  </div>

### 1.4. Installation of new nodes.

When Node-RED is installed, it presents few nodes, but due to the large community of developers, more and more new nodes are created. To see the catalog of nodes, see [6](https://flows.nodered.org/). Therefore, it is necessary to incorporate them into our catalog of nodes. For this there are two ways, one through manual installation through commands with npm [7](https://nodered.org/docs/user-guide/runtime/adding-nodes) and another through the graphical interface of Node-RED itself. The second way will be shown below.

Once here through keywords you can search for the node you want. In this case, the node node-red-dashboard will be installed (Figure 10).

This node has the function of creating a series of interfaces for the visualization and collection of information in a more user-friendly way. Among its functionalities is the ability to create and deploy Control Panels (Dashboards) that can be accessed remotely via browser and whose access can be, as described for the editor, protected with access credentials. [8](https://stevesnoderedguide.com/node-red-dashboard)[9](https://flows.nodered.org/node/node-red-dashboard).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-dashboard-install.png" alt="Dashboard node installation." title="Figure 10. Dashboard node installation." width=500px></p>
<figcaption >Figure 10. Dashboard node installation.</figcaption> </div>

Once a node is installed, it should appear as a new nodegroup in the workspace. In the event that they do not exit, Node-RED must be restarted. 

 > If you want to investigate more about the elements of the dashboard node, you can consult the following bibliographies [8](https://stevesnoderedguide.com/node-red-dashboard) and [9](https://flows.nodered.org/node/node-red-dashboard).


## 2. Creation of new nodes for interaction with OSCAR services.

When the work in Node-RED starts, an infinite number of nodes can be joined in the same work flows. This can bring over time a disorder of nodes and unions that can make it difficult to find specific parts within the flows, sometimes causing errors at work time. For this reason, it was necessary to develop a series of nodes that interact directly with OSCAR. As flows are created, common parts can be found that are used in multiple flows. Keeping multiple copies of these parts should be avoided, as they become more difficult to maintain. Node-RED provides two ways to create reusable flows [10](https://nodered.org/docs/developing-flows/flow-structure):
    - link nodes[11](https://techexplorations.com/guides/esp32/node-red-esp32-project/node-red-link/).
    - subflows.

### 2.1 Creating subflows for OSCAR services.

There are several ways to create a subflow. A subflow is a collection of nodes that collapse to a single node in the workspace. They can be used to reduce the visual complexity of a flow or to bundle a group of nodes together as a reusable flow that is used in multiple places.

Once created, the subflow is added to the palette of available nodes. Individual instances of the subflow can be added to the workspace like any other node. One of the advantages is that they can be closed and will continue to work contrary to the flows. If you want to consult how to design a subflow, you can consult [12](https://nodered.org/docs/user-guide/editor/workspace/subflows).

Once the subflows have been created, it appears in the left side window as if it were another work node. 

Figure 11 shows an example of a subflow created to obtain information about an installed OSCAR cluster.

![OSCAR Info node subflow.](../../images/blog/post-node-oscar/image/node-oscar-info-subflow.png "Figure 11. OSCAR Info node subflow.")
<div align="center">
<figcaption >Figure 11. OSCAR Info node subflow. </figcaption></div>

For the different services that have been installed in OSCAR, subflows (Figure 12) were created to access each specific service and a generic subflow to access the service that the user deems appropriate.

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-subflow.png" alt="Subflows created to interact with OSCAR." title="Figure 12. Subflows created to interact with OSCAR."></p>
<figcaption >Figure 12. Subflows created to interact with OSCAR.</figcaption> </div>

### 2.2. Development of new nodes for interaction with OSCAR.

Once the different subflows have been created, they can be exported just like any workflow. Therefore, it is necessary to export them so that the community can interact with them, that is, make them public and that they can be installed by anyone from their own Node-RED but without being able to modify them. This process would be creating own nodes to interact with OSCAR. 
There are several ways to create nodes as shown in [13](https://aprendiendoarduino.wordpress.com/2021/12/16/creacion-y-modificacion-nodos-en-node-red/) and [14](https://aprendiendoarduino.wordpress.com/2021/12/16/creacion-y-modificacion-nodos-en-node-red/). In the present work, the nodes were created following the methodology developed by [15](https://kazuhitoyokoi.medium.com/creating-custom-node-from-subflow-in-node-red-ce52cc42bbba), which is based on the creation of nodes through subflows and their interaction with GitHub, as shown in the diagram shown in figure 13.

![Methodology for creating nodes [15].](../../images/blog/post-node-oscar/image/node-creating-proccess.png "Figure 13. Methodology for creating nodes [15].")

<div align="center">
<figcaption >Figure 13. Methodology for creating nodes <a href="https://kazuhitoyokoi.medium.com/creating-custom-node-from-subflow-in-node-red-ce52cc42bbba">[15]</a>. </figcaption></div>

The node development process leaves ready to download a .tgz file that must have the name node-red-contrib-service-version.tgz. Where service would be the name of the service for which the node has been created. 

Once you have the .tgz file it can be used as a node by the whole community. To install it, you must go to the option that was explained about importing nodes, only here you have to load the file through a file as shown in figure 14.

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-import-node.png" alt="Figure 14. Import created node." title="Figure 14. Import created node." width=600px></p>

<figcaption >Figure 14. Import created node. </figcaption></div>

From there, the location of the file is searched for in our directory and click on select. The installation process of the new node will then start and can be checked in the installed nodes or in the side menu of the workspace.

### 2.3. Examples of Node-RED workflows with OSCAR services.

Once a series of nodes and subflows have been developed in Node-RED, it will be shown how workflows work using the subflows or nodes created to interact with OSCAR services.

#### 2.3.1 Subflow OSCAR Info.

This subflow has the function of obtaining all the information of the created OSCAR cluster. It is structured in such a way that the data entered by the user is read. The request that will be sent to the OSCAR server is created. Once the request is made and the server returns the requested data, the variables used for greater security are deleted (Figure 15).

![OSCAR Info node subflow.](../../images/blog/post-node-oscar/image/node-oscar-info-subflow-1.png "Figure 15. OSCAR Info node subflow.")
<div align="center">
<figcaption >Figure 15. OSCAR Info node subflow. </figcaption></div>

Once a workflow has been created, said node must be configured. Its configuration process is very simple, as shown in figure 16. When the node is in the work area, the configuration process is carried out by double-clicking on said node and entering the requested data:
    - Server.
    - User.
    - Password.

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-info-config-credential.png" alt="Figure 16. OSCAR Info node configuration." title="Figure 16. OSCAR Info node configuration." width=600px></p>
<figcaption >Figure 16. OSCAR Info node configuration. </figcaption></div>

With these elements, a request [16](https://docs.oscar.grycap.net/api/) is made to the OSCAR server to obtain its information (Figure 17).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-info-run.png" alt="Figure 17. Running the OSCAR Info node." title="Figure 17. Running the OSCAR Info node." ></p>
<figcaption >Figure 17. Running the OSCAR Info node. </figcaption></div>

The information that is returned by the server is related to all the services that are implemented in OSCAR. This information can be seen as a debug node is used.

> If you want to download the [OSCAR Info](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Info) node files, you can get it from the  [oscar_nodered repository](https://github.com/grycap/oscar_nodered).

#### 2.3.2 Nodo OSCAR Cowsay Services.

This node runs the OSCAR cowsay service. The process that is carried out is similar for all the subflows or nodes that interact with OSCAR services. First, the data is taken and a GET request is made to obtain the service token. Once the message to be sent is taken with the token to be processed by the service and a POST request is made to the service, the entire process of interaction with the services can be seen in [16](https://docs.oscar.grycap.net/api/).

![OSCAR Cowsay Services node subflow.](../../images/blog/post-node-oscar/image/node-oscar-cowsay-subflow.png "Figure 18. OSCAR Cowsay Services node subflow.")
<div align="center">
<figcaption >Figure 18. OSCAR Cowsay Services node subflow.</figcaption></div>

Once you have the node or subflow (Figure 18) in the work area, proceed to configure it. A section is added to the nodes that interact with services, which is the name of the service (Figure 19), since in the installation process of the service in OSCAR it can be given a different name from the one it should have by default, in this case you have the same (cowsay).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-cowsay-config.png" alt="igure 19. OSCAR Cowsay Services node configuration." title="igure 19. OSCAR Cowsay Services node configuration." width=800px></p>
<figcaption >Figure 19. OSCAR Cowsay Services node configuration. </figcaption></div>

Another important element to take into account is the type of message that is going to be sent to be processed by the Cowsay service in OSCAR, for this an inject node is used, sending a string type msg.payload with the text to be processed ( Figure 20).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-inject.png " alt="Figure 20. Interaction with inject node." title="Figure 20. Interaction with inject node."></p>
<figcaption >Figure 20. Interaction with inject node.</figcaption> </div>

When the flow is deployed, the result shown in figure 21 is obtained. Remember that the service invocation result comes in msg.payload in case you want to use it in some other process.

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-cowsay-run.png " alt="Flow execution for interaction with the Cowsay service." title="Figure 21. Flow execution for interaction with the Cowsay service."></p>
<figcaption >Figure 21. Flow execution for interaction with the Cowsay service.</figcaption> </div>

>If you want to download the [OSCAR Cowsay Services](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Cowsay_Services) node files and [sample workflow](https://github.com/grycap/oscar_nodered/tree/main/Examples_NodeRED_OSCAR/Examples_NodeRED_flow/OSCAR_Cowsay_Services), you can get it from the [oscar_nodered repository](https://github.com/grycap/oscar_nodered).


#### 2.3.3 OSCAR Grayify Services and OSCAR Plants Services node.

These two nodes in terms of operation are quite similar, which is why they will be explained in the same section (Figure 22 and Figure 23). Here the process of invoking the service by the node or subflow is the same as that explained in the previous section, so the image to be processed must be sent in base64 format and the response returned by the services are the same images in base64 format. There is a little difference in the response of giving the base64 image of each service but that is resolved by processing the response differently.

![OSCAR Grayify Services node subflow.](../../images/blog/post-node-oscar/image/node-oscar-grayify-subflow.png "Figure 22. OSCAR Grayify Services node subflow.")
<div align="center">
<figcaption >Figure 22. OSCAR Grayify Services node subflow.</figcaption></div>


![OSCAR Plants Services node subflow.](../../images/blog/post-node-oscar/image/node-oscar-plants-subflow.png "Figure 23. OSCAR Plants Services node subflow.")
<div align="center">
<figcaption >Figure 23. OSCAR Plants Services node subflow.</figcaption></div>


The configuration process is the same as in all the nodes, only putting in the service name section the name that was given to each of the services in OSCAR. The workflow is done by calling the two services at the same time with the same image to which two different services will be applied. To load the image, the read file node is used, which is given the address of the image to be processed, as shown in figure 24.

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-load-image.png" alt="Figure 24. Process of loading image in read file node." title="Figure 24. Process of loading image in read file node."></p>
<figcaption >Figure 24. Process of loading image in read file node.</figcaption> </div>

Once everything is configured, the two services are executed and wait for the OSCAR cluster to return the processed images (Figure 25). To achieve a better visualization of the information, the image preview node is used, although the responses from the services always come in msg.payload.

![Workflow execution calling OSCAR's Grayify and Plants services.](../../images/blog/post-node-oscar/image/node-oscar-grayify-plants-run.png "Figure 25. Workflow execution calling OSCAR's Grayify and Plants services.")
<div align="center">
<figcaption >Figure 25. Workflow execution calling OSCAR's Grayify and Plants services.</figcaption></div>

>If you want to download the [OSCAR Grayify Services](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Grayify_Services) and [OSCAR Plants Services](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Plants_Services)  node files and [sample workflow](https://github.com/grycap/oscar_nodered/tree/main/Examples_NodeRED_OSCAR/Examples_NodeRED_flow/OSCAR_GrayifyPlants_Services), you can get it from the [oscar_nodered repository](https://github.com/grycap/oscar_nodered).

#### 2.3.4 OSCAR Text-Speech Services node.

This node runs the text-to-speech-google service, which is passed a text as a parameter and it returns the corresponding audio with the text passed as a parameter. The process is the same as the service invocation is the same as all the previous ones, except that the audio output format is in base64 format (Figure 26). 

![OSCAR Text-Speech Services node subflow.](../../images/blog/post-node-oscar/image/node-oscar-textspeech-subflow.png "Figure 26. OSCAR Text-Speech Services node subflow.")
<div align="center">
<figcaption >Figure 26. OSCAR Text-Speech Services node subflow.</figcaption></div>


The service is passed a text as an input parameter, in the same way as in the OSCAR Cowsay Services node. The node configuration is the same as the previous nodes. To hear the audio, the audio out node is used, which is found in the list of Dashboard nodes (Figure 27).

![Execution of flow calling text-to-speech-google service.](../../images/blog/post-node-oscar/image/node-oscar-textspeech-run.png "Figure 27. Execution of flow calling text-to-speech-google service.")
<div align="center">
<figcaption >Figure 27. Execution of flow calling text-to-speech-google service.</figcaption></div>

> If you want to download the [OSCAR Text-Speech Services](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Text-Speech_Services) node files and [sample workflow](https://github.com/grycap/oscar_nodered/tree/main/Examples_NodeRED_OSCAR/Examples_NodeRED_flow/OSCAR_Text-Speech_Services), you can get it from the [oscar_nodered repository](https://github.com/grycap/oscar_nodered).

#### 2.3.5 OSCAR Services node.

This node has the function of integrating all the services that were previously described. The node is configured in such a way that it will invoke the service that is passed to it as a parameter in the service name section (Figure 28).

<div align="center">
<p><img src="../../images/blog/post-node-oscar/image/node-oscar-services-config.png " alt="Figure 28. OSCAR Services node configuration." title="Figure 28. OSCAR Services node configuration."></p>
<figcaption >Figure 28. OSCAR Services node configuration.</figcaption> </div>

Regarding the operation of the node, it only has the difference that distinguishes the service that is to be executed and from that it carries out the corresponding process (Figure 29).

![OSCAR Services node subflow.](../../images/blog/post-node-oscar/image/node-oscar-services-subflow.png "Figure 29. OSCAR Services node subflow.")
<div align="center">
<figcaption >Figure 29. OSCAR Services node subflow.</figcaption></div>

The flow shown in figure 30 can execute any of the services implemented in the OSCAR cluster, you just have to change the service you want to invoke.

![Execution of workflows of all OSCAR services.](../../images/blog/post-node-oscar/image/node-oscar-services-run.png "Figure 30. Execution of workflows of all OSCAR services.")
<div align="center">
<figcaption >Figure 30. Execution of workflows of all OSCAR services.</figcaption></div>

> If you want to download the [OSCAR Services](https://github.com/grycap/oscar_nodered/tree/main/Nodes_OSCAR/OSCAR_Services) node files and [sample workflow](https://github.com/grycap/oscar_nodered/tree/main/Examples_NodeRED_OSCAR/Examples_NodeRED_flow/OSCAR_Services), you can get it from the [oscar_nodered repository](https://github.com/grycap/oscar_nodered).


> ##### **In a future blog, there will be an explanation of the creation of workflows for the interaction of Node-RED and OSCAR using dashboards to create web interfaces for easy interaction with users**.




[OSCAR-Node-RED](https://github.com/grycap/oscar_nodered) is  developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
  
