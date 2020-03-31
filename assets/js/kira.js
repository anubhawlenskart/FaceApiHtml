function handleCaptureImage(imgdata){
    PlaySound();
    $.ajax({
        type: "POST",
        url: "https://kira.lenskart.com",
        data: { images: imgdata },
        callback: '?',
        crossOrigin: true,
    }).done(function (data) {
        setTimeout(function(){
            $("#loader").fadeOut(300);
            $(".content-main").hide();
            $("#content").show();
            $(".capture-photo").hide();
        },4560);
        var obj = data;
        img = obj.image_url;
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
        var landmarkList = landmarks.split('~');
        var f = $('#heart');
        var landmark1 = landmarkList[1].replace("'","");
        landmark1 = landmark1.replace("'","");
        landmark1 = landmark1.replace("~",",");
        f.contents().find('#annotate1').text(landmark1);
        
        var landmark5 = landmarkList[5].replace("'","");
        landmark5 = landmark5.replace("'","");
        landmark5 = landmark5.replace("~",",");
        f.contents().find('#annotate5').text(landmark5); 

        var landmark9 = landmarkList[9].replace("'","");
        landmark9 = landmark9.replace("'","");
        landmark9 = landmark9.replace("~",",");
        f.contents().find('#annotate9').text(landmark9); 

        var landmark13 = landmarkList[13].replace("'","");
        landmark13 = landmark13.replace("'","");
        landmark13 = landmark13.replace("~",",");
        f.contents().find('#annotate13').text(landmark13);
        
        var landmark17 = landmarkList[17].replace("'","");
        landmark17 = landmark17.replace("'","");
        landmark17 = landmark17.replace("~",",");
        f.contents().find('#annotate17').text(landmark17); 

        var landmark28 = landmarkList[28].replace("'","");
        landmark28 = landmark28.replace("'","");
        landmark28 = landmark28.replace("~",",");
        f.contents().find('#annotate28').text(landmark28); 

        var landmark31 = landmarkList[31].replace("'","");
        landmark31 = landmark31.replace("'","");
        landmark31 = landmark31.replace("~",",");

        f.contents().find('#annotate31').text(landmark31); 

        var landmark32 = landmarkList[32].replace("'","");
        landmark32 = landmark32.replace("'","");
        landmark32 = landmark32.replace("~",",");
        f.contents().find('#annotate32').text(landmark32);
        
        var landmark34 = landmarkList[32].replace("'","");
        landmark34 = landmark34.replace("'","");
        landmark34 = landmark34.replace("~",",");
        f.contents().find('#annotate34').text(landmark34); 

        var landmark36 = landmarkList[36].replace("'","");
        landmark36 = landmark36.replace("'","");
        landmark36 = landmark36.replace("~",",");
        f.contents().find('#annotate36').text(landmark36); 

        var landmark37 = landmarkList[37].replace("'","");
        landmark37 = landmark37.replace("'","");
        landmark37 = landmark37.replace("~",",");
        f.contents().find('#annotate37').text(landmark37); 

        var landmark40 = landmarkList[40].replace("'","");
        landmark40 = landmark40.replace("'","");
        landmark40 = landmark40.replace("~",",");
        f.contents().find('#annotate40').text(landmark40);

        var landmark43 = landmarkList[43].replace("'","");
        landmark43 = landmark43.replace("'","");
        landmark43 = landmark43.replace("~",",");
        f.contents().find('#annotate43').text(landmark43);

        var landmark46 = landmarkList[46].replace("'","");
        landmark46 = landmark46.replace("'","");
        landmark46 = landmark46.replace("~",",");
        f.contents().find('#annotate46').text(landmark46);

        var landmark49 = landmarkList[49].replace("'","");
        landmark49 = landmark49.replace("'","");
        landmark49 = landmark49.replace("~",",");
        f.contents().find('#annotate49').text(landmark49);

        var landmark55 = landmarkList[55].replace("'","");
        landmark55 = landmark55.replace("'","");
        landmark55 = landmark55.replace("~",",");
        f.contents().find('#annotate55').text(landmark55);
    });
}
// function PlaySound() {
//     var path = 'audio/capture.mp3';
//     var audioElement = document.createElement('audio');
//     audioElement.setAttribute('src', path);
//     audioElement.play();
//   }

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
