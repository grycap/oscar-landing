---
title: "Visualize OSCAR services with Gradio"
date: 2022-09-08T09:00:00+01:00
# post image
image: "/images/blog/post-guide-to-use-OSCAR/main.jpeg"
# post type (regular/featured)
type: "featured"
# meta description
description: "This is a guide for developers to create their first service in OSCAR."
# post draft
draft: false
---

OSCAR deploy services can be triggered by uploading files to a MinIo bucket using the MinIO user interface, MinIO tab in OSCAR user interfaces, HTTP call, or OSCAR-CLI. It can be done with OSCAR-CLI or HTTP calls if we want to run a service with a synchronous invocation. Once the services are finished, the only way to watch the results is to download the output file from the output bucket. A specific OSCAR service can not visualize the input and output on the same web. Gradio is a tool for creating a user interface as a demo.

### Create an interface for the model

Check the input, output type, and format in the OSCAR service. Search the components that fit with it in [Gradio](https://gradio.app/docs/). Add them to the interface. There are many components like Textbox, File, Video, Audio, Image, and Dataframe. You should assign the component to a variable. Create a button. Configure the action of a click button, and introduce the component as input and output with the variable name. Return the result in the same order as the output field.

``` python
image=gr.Image()
button = gr.Button()
textbox=gr.Textbox()
label=gr.Label()
button.click(fn=plant_classification,inputs=[image], outputs=[textbox,label])
```

### Preprocess the data and postprocess the result

The same input and output can be represented in different formats. The same image can be represented as image bytes or as a NumPy array. This will depend on the input necessities of the services. So change the type of data before triggering the services.

The same problems happen with the output. For example, the Label component needs a dictionary as input, but if the services return two arrays with the representation of key and value, we need to put them into a dictionary.

``` python
""" output format
  "labels": [
        "Taraxacum officinale",
        "Taraxacum erythrospermum",
        "Agoseris grandiflora",
        "Tragopogon pratensis",
        "Eriophorum virginicum"
    ],
    "probabilities": [
        0.3481447398662567,
        0.3105199933052063,
        0.19190344214439392,
        0.028038162738084793,
        0.027458030730485916
    ],
"""
dict={}
    index=0
    for plant in parsed["labels"]:
        dict[plant]= parsed["probabilities"][index]
        index+=1
```

Another example is when an OSCAR service returns a plot, but as an image, you should select the Image component instead the Plot component.

### Synchronously invocation

We are going to invocate an OSCAR service synchronously with a POST call.

It requires the endpoint, the services name, the service token (it changes every time the service is updated or created), and the data.

We are going to make a GET call to ${endpoint}/system/services to automate the process of obtain the token, It needs the login and password of OSCAR encoded in base64 but those two parameters are not going to change.

``` python
def get_token(servicename):
    url=baseurl+"/system/services"
    as_bytes=bytes(oscarlogin+":"+oscarpassword,"utf-8")
    userAndPass = base64.b64encode(as_bytes).decode("utf-8")
    headers = {"Authorization": "Basic "+ userAndPass}
    x = requests.get(url, headers=headers , verify=ssl)
    result=json.loads(x.text)
    for service in result:
        if service["name"] == servicename:
            return service["token"]
    return None 
```

Once we have obtained the token, the next step is to make the POST call, but first, encode in base64 the data is going to send.

``` python
url=baseurl+"/run/plant-classification-sync"
headers = {"Authorization": "Bearer "+token}
f=open(image,"rb")
file=f.read()
f.close()
file64=base64.b64encode(file)
x = requests.post(url, headers=headers, data = file64, verify=True)
```

### Asynchronously invocation

There is an option to trigger an OSCAR service asynchronously. Using the MinIo API in python. This way to invocate services is not well practiced. Because in theory, between the time of putting a file in the bucket and keep listening to the output, the service could finish before, but in run time, that will not happen because if the processing time is that short, processing in remote is not even worth it.

``` python
client = Minio(
        ${minio_endpoint},
        access_key=${minio_access_key},
        secret_key=${minio_secret_key},
        secure=True,
    )
```

Update a file into a bucket. If the file does not exist, create a temporary file, send it, and remove it later.

``` python
client.fput_object(
  ${bucket}, ${other_folders/file_name}, ${filename_localhost},
)
```

Once the file is uploaded to the bucket, it is necessary to wait until the output is ready.

``` python
with client.listen_bucket_notification(
      ${bucket},
      prefix=${folder},
      events=["s3:ObjectCreated:*", "s3:ObjectRemoved:*"],
  ) as events:
      for event in events:
          info=event
          break 
```

Download the output file to localhost.

``` python
client.fget_object(${bucket}, ${other_folders/file_name}, ${filename_localhost})
```

### Authorization

When Gradio is executed, a server is created, and you will receive a URL to access the web side, but there is not secure because there is no authentication process.
In the launch function, use auth parameter to enable the authentication process.

``` python
.launch(auth=authorization)
```

Credentials can be provided in the same line of redirect into a function, which will verify the authentication with an API call. Create two global variables where credentials are going to be saved. They will be used in the obtain token process.

``` python
def authorization(login, password):
    global oscarlogin
    oscarlogin = login
    global oscarpassword
    oscarpassword=password
    url=baseurl+"/system/config"
    as_bytes=bytes(login+":"+password,"utf-8")
    userAndPass = base64.b64encode(as_bytes).decode("utf-8")
    headers = {"Authorization": "Basic "+ userAndPass}
    x = requests.get(url, headers=headers , verify=ssl)
    if x.status_code == 200:
        return True
    return False
```

[OSCAR](https://grycap.github.io/oscar/), [IM](http://www.grycap.upv.es/im), [EC3](https://github.com/grycap/ec3), and [CLUES](https://www.grycap.upv.es/clues/) are developed by the [GRyCAP](https://www.grycap.upv.es/) research group at the [Universitat Politècnica de València](https://www.upv.es/).
