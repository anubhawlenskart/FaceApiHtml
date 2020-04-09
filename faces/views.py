from django.shortcuts import render
from django.http import HttpResponse, FileResponse
import requests
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
import json



# Create your views here.
def home(request):
    return render(request, 'index.html',{})

def analysedpic(request):
    if request.method == 'POST': 
        myfile = request.FILES['img_logo']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        imagePath = settings.BASE_DIR+uploaded_file_url   
        url = 'https://kira-api.lenskart.com/getfaceattributesapi/'
        files = {'webphoto': open(imagePath, 'rb')}
        req = requests.post(url, files=files)
        res = req.json()
        data = json.dumps(res)
        isValid = validateJSON(data)
        if isValid:
            data = json.loads(data)
            print(data)
            data['landmarksArr'] = data['landmarks'].split(',')
            #data = json.dumps(data)
            return render(request, 'analysedpic.html', data)
        else:
           return render(request, 'index.html', {'error':"Somthing went wrong"})
    else:
        return render(request, 'index.html')


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