from datetime import datetime

from django.shortcuts import render
from django.http import HttpResponse, FileResponse, HttpResponseRedirect
from django.urls import reverse
import requests
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
import json



# Create your views here.
def home(request):
    print(request.GET)
    errorMsg = request.GET.get("error")
    data = {"error": errorMsg}
    return render(request, 'index.html',data)

def analysedpic(request):
    if request.method == 'POST': 
        myfile = request.FILES['img_logo']
        fs = FileSystemStorage()
        newimagestamp = datetime.now().strftime('%Y-%m-%d') + "_" + datetime.now().strftime('%H-%M-%S') + "_" + datetime.now().strftime('%f')
        newimage = "firstimage" + newimagestamp + ".jpg"
        filename = fs.save(newimage, myfile)
        uploaded_file_url = fs.url(filename)
        imagePath = settings.BASE_DIR+uploaded_file_url
        if os.path.exists(imagePath):
            checkFile = open(imagePath, 'rb') 
            print("CHECKFILE")
            print(checkFile)  
            url = 'https://kira-api.lenskart.com/getfaceattributesapi/'
            files = {'webphoto': open(imagePath, 'rb')}
            req = requests.post(url, files=files)
            res = req.json()
            data = json.dumps(res)
            #print(data['message'])

            isValid = validateJSON(data)
            if isValid:
                data = json.loads(data)
                #print(data)
                error = data.get('message','0') 
                if error !='0':
                    #url = reverse('home', kwargs={'error': error})
                    #return HttpResponseRedirect(url)
                    return render(request, 'index.html', {'error': data['message']})
                else:
                    data['landmarksArr'] = data['landmarks'].split(',')
                    #data = json.dumps(data)
                    return render(request, 'analysedpic.html', data)
            else:
                return render(request, 'index.html', {'error':"Invalid image"})
        else:
            return render(request, 'index.html', {'error': "Invalid file try another picture"})
    else:
        return render(request, 'index.html', {'error':"Invalid image"})


def userlist(request):
    url = 'https://kira-api.lenskart.com/getresultfetched'
    req = requests.get(url)
    res = req.json()

    return render(request, 'list.html', res)

def validateJSON(jsonData):
    try:
        json.loads(jsonData)
    except ValueError as err:
        return False
    return True   