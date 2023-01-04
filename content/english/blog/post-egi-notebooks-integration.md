---
title: "Use of OSCAR API through EGI Notebooks"
date: 2023-01-04T09:00:00+01:00
# post image
image: "/images/blog/post-egi-notebooks/main.png"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for the use of the OSCAR API through EGI Notebooks."
# post draft
draft: false
---

In this post, we are going to showcase the usage of the OSCAR python API, implemented to interact with OSCAR clusters and its services through EGI Notebooks, a tool based on JupyterHub for data analysis.

Through this post, we will create an EGI notebook and test the OSCAR API with a simple service ([cowsay service](https://github.com/grycap/oscar/tree/master/examples/cowsay)) that receives a text input and shows it on the terminal.  

> You can see more information about the use of EGI notebooks on https://docs.egi.eu/users/dev-env/notebooks/

## Create EGI Notebook
As the [main page](https://notebooks.egi.eu/hub/welcome) states, to create an EGI Notebook is required to:
- Have an EGI account
- Enroll in the **vo.notebooks.egi.eu** VO.
  
If you have an EGI account but are not enrolled in the VO, you will not be able to use the Notebooks tool. 
Once you meet the requirements and press the "Start your notebooks" buttons, a wizard is shown with the available environments. For this example, the default setting is enough. 

![Notebook creation page](../../images/blog/post-egi-notebooks/notebook_create.png)

Once we have our notebook, we will create the files for this example. These are the notebook file with the code that interacts with the cluster and the service files (script and FDL), as shown in the following image.

![Notebook tree](../../images/blog/post-egi-notebooks/files.png)

You can copy the code of each file for the example on the [OSCAR API repository](https://github.com/grycap/oscar_python/tree/main/jupyter_example).

## Interact with the cluster

In this section, we will overview the code of each cell on the notebook.

The first step is to install the package from Pypi.
```python
# Install a pip package in the current Jupyter kernel
import sys
!{sys.executable} -m pip install oscar-python==1.0.3
```
With the package installed, you can now create the client, replacing the cluster credentials, endpoint, and ID or cluster name fields for your own.

```python
from oscar_python.client import Client

client = Client("your-cluster-id","https://your-cluster-url.net", "username", "password", True)
```
Once the client is created, you can call the function `create_service` with the path to the FDL file wich contains the function definition. The cluster ID on the FDL file has to match the one provided on the client definition, otherwise the function will throw an exception.
```python
try:
    client.create_service("services/cowsay_example/cowsay.yaml")
    print("Service created")
except Exception as ex:
    print("Error creating service: ", ex)
```
Then, you can run a synchronous invocation with the function `run_service` and the input parameters that the function requires, in this case a simple message.

```python
try:
    res = client.run_service("cowsay", input = '{"message": "Hi there"}')
    if res.status_code == 200:
        print(res.text)
except Exception as ex:
    print("Error running service: ", ex)
```

![Cowsay output](../../images/blog/post-egi-notebooks/cowsay.png)
