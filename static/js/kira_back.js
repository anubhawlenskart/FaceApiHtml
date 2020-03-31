function handleCaptureImage(imgdata){
    PlaySound();
    //console.log(imgdata);
    // Split the base64 string in data and contentType
//    var block = imgdata.split(";");
    // Get the content type of the image
//    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
//    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
//    contentType = 'image/png';
//    var blob = b64toBlob(realData, contentType);

//    var formData = new FormData();
//    formData.append('images', blob);
      $.ajax({
	type: "POST",
	url: "https://kira.lenskart.com",
	data: { images: imgdata },
        callback: '?',
	//datatype: 'application/json',
        crossOrigin: true,
	success: function (data, status, xhr) {
      	  console.log(data);
		setTimeout(function(){
            $("#loader").fadeOut(300);
            $(".content-main").hide();
            $("#content").show();
            $(".capture-photo").hide();
        },4560);
console.log('Test');
        //var obj = jQuery.parseJSON(data);
        var obj = data;
        img = obj.image_url;
        console.log('https://kira.lenskart.com/'+img);
        $('#genderval').text(obj.gender);
        $('#ageval').text(obj.age);
        $('#faceshapeval').text(obj.shape);
        $('#frameshapeval').text(obj.frame_types);
        $('#userpic').attr('src','https://kira.lenskart.com/'+img);
        var imgurl = obj.urls;
        var str = '';
        $.each( imgurl, function( index, value ){
            str += '<li><div class="frame-box">'
            str += '<img src="'+value+'" alt="" title="">';
            str += '</div>';
            str += '<div class="frame-info">';
            str += '<small></small>'; 
            str += '<span></span>';
            str += '</div>'; 
            str += '</li>';
        });
        $('#kira_frames').html(str);
    
        var landmarks = obj.landmarks;
        var landmarkList = landmarks.split(',');
        var f = $('#heart');
        console.log(landmarkList[1]);
        var landmark1 = landmarkList[1].replace("'","");
        landmark1 = landmark1.replace("'","");
	console.log(landmark1);
        landmark1 = landmark1.replace("~",",");
        f.contents().find('#annotate1').text(landmark1);
        f.contents().find('#annotate5').text(landmarkList[5]);
        f.contents().find('#annotate9').text(landmarkList[9]);
        f.contents().find('#annotate13').text(landmarkList[13]);
        f.contents().find('#annotate17').text(landmarkList[17]);
        f.contents().find('#annotate28').text(landmarkList[28]);
        f.contents().find('#annotate31').text(landmarkList[31]);
        f.contents().find('#annotate32').text(landmarkList[32]);
        f.contents().find('#annotate34').text(landmarkList[34]);
        f.contents().find('#annotate36').text(landmarkList[36]);
        f.contents().find('#annotate37').text(landmarkList[37]);
        f.contents().find('#annotate40').text(landmarkList[40]);
        f.contents().find('#annotate43').text(landmarkList[43]);
        f.contents().find('#annotate46').text(landmarkList[46]);
        f.contents().find('#annotate49').text(landmarkList[49]);
        f.contents().find('#annotate55').text(landmarkList[55]);
    	},
	
	error: function (jqXhr, textStatus, errorMessage) {
            console.log( errorMessage);
    	}

      });
}
function PlaySound() {
    var path = 'audio/capture.mp3';
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
  }

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
