/**
 * Created by Danick takam on 16/06/2017.
 */

var MainPhotoAdd = function()
{
    this.params = {
        page: $("#Main-Subphotos-add"),
        html: $("html"),
        link_add:$("#Main-Subphotos-add #link-photo-list"),
        api:{
            upload:
            {
                url : baseUrl+"auth/upload",
                method: "POST",
                type: "json"
            },
            webcam:
            {
                url : baseUrl+"auth/webcam",
                method: "POST",
                type: "json"
            }
        },
        id: {
            uploadfile : $("#Main-Subphotos-add #uploadfile"),
            uploadfile_col : $("#Main-Subphotos-add #uploadfile .col-12"),
            file: $("#file"),
            uploadfile_context: $("#Main-Subphotos-add #uploadfile .col-12 #context"),
            uploadfile_h1: $("#Main-Subphotos-add #uploadfile .col-12 h1"),
            uploadfile_btn: $("#Main-Subphotos-add #uploadfile .col-12 button"),
            form : $("form"),
            bg: $("#bg"),
            bg_message: $("#bg #bloc_message"),
            modal_photo : $("#modal-photo")

        },
        class:{
            upload_area: $(".upload-area"),
            upload_area_col: $(".upload-area .col-12"),
            upload_area_thumbnail: $(".upload-area .col-12 div.thumbnail")
        },
        webcam:{
            webcam_show: $("#webcam-show span"),
            webcam_modal : $("#webcam-modal"),
            video : document.querySelector('#webcam-video'),
            cover: $('#webcam-cover'),
            photo: $('#webcam-photo'),
            startbutton: $('#webcam-startbutton'),
            save: $('#webcam-save'),
            canvas: document.querySelector('#webcam-canvas'),
            audio: document.querySelector('#webcam-audio'),
            audio_off: document.querySelector('#webcam-audio-off'),
            webcam_loader: $('#webcam-loader'),
            webcam_notification: $('#webcam-notification')
        }
    };

};


$(function(){

    var mainPhotoAdd = new MainPhotoAdd();

    if(mainPhotoAdd.params.page.data('inc')=="photo-request")
    {

        //varibales

        // save the upload zone content
        var lastcontent = lastcontent==null? mainPhotoAdd.params.id.uploadfile_context.html():lastcontent;

        // le nombre total de fichier
        var countfile = 0;

        //lindex courent
        var currentIndex = 0;

        //image courent
        var currentImg = [];

        // force le background a ne pas reagir lorsqu'on   clic
        mainPhotoAdd.params.id.modal_photo.click(function(){
            mainPhotoAdd.params.id.modal_photo.modal("show");
        });


        // force le background a ne pas reagir lorsqu'on   clic pour la webcam
        mainPhotoAdd.params.webcam.webcam_modal.click(function(){
            mainPhotoAdd.params.webcam.webcam_modal.modal("show");
        });

        // preventing page from redirecting
        mainPhotoAdd.params.html.on("dragover", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var  message = Translator.trans('drag', {}, 'photo');
            //alert(message);
            mainPhotoAdd.params.id.uploadfile_context.slideDown();
            mainPhotoAdd.params.id.uploadfile_h1.text(message);
        });

        mainPhotoAdd.params.html.on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

        // Drag enter
        mainPhotoAdd.params.class.upload_area.on('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
            mainPhotoAdd.params.id.uploadfile_context.slideUp();
            var  message = Translator.trans('drop', {}, 'photo');
            mainPhotoAdd.params.id.uploadfile_h1.text(message);
            //mainPhotoAdd.params.id.uploadfile_h1.text("");
        });

        // Drag over
        mainPhotoAdd.params.class.upload_area.on('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var  message = Translator.trans('drop', {}, 'photo');
            mainPhotoAdd.params.id.uploadfile_h1.text(message);
        });


        // Drop
        mainPhotoAdd.params.class.upload_area.on('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();

            //declancher le procussus de telechargerment
            mainPhotoAdd.params.id.bg.height($(window).height()+50+"px");
            // alert( "lengt : " + mainPhotoAdd.params.id.bg.height() + " ---"+$(window).height());
            mainPhotoAdd.params.id.bg.slideDown();

            //show the upload button
            mainPhotoAdd.params.id.uploadfile_context.slideDown();
            mainPhotoAdd.params.id.uploadfile_h1.text("");

            var files = e.originalEvent.dataTransfer.files;

            //recuperer le nombre de fichier
            countfile = files.length;

            //initialiser  l'index
            currentIndex=0;

            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];
                currentImg.push(file.name);
                fd.append('file',file);
                uploadData(fd);
            }
        });

        // Open file selector on button click
        mainPhotoAdd.params.id.uploadfile_btn.click(function(){
            mainPhotoAdd.params.id.file.click();
        });

        // file selected
        mainPhotoAdd.params.id.file.change(function(e){
            e.stopPropagation();
            e.preventDefault();

            //declancher le procussus de telechargerment
            mainPhotoAdd.params.id.bg.css({height:$(window).height()+50+"px"});
           // alert( "lengt : " + mainPhotoAdd.params.id.bg.height() + " ---"+$(window).height());
            mainPhotoAdd.params.id.bg.slideDown();


            //var fd = new FormData(mainPhotoAdd.params.id.form);
            var  inputfile  =mainPhotoAdd.params.id.file;

            var files = inputfile[0].files;
            //recuperer le nombre de fichier
            countfile = files.length;

            //initialiser  l'index
            currentIndex=0;
           // mainPhotoAdd.params.id.uploadfile_context.empty();
            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];
                currentImg.push(file.name);
                fd.append('file',file);
                // console.log(fd.get('file'));
                uploadData(fd);
            }
        });


        // Sending AJAX request and upload file
        function uploadData(formdata){

            //console.log("apply User current where id :"+ currentUser.id);

            mainPhotoAdd.params.id.bg_message.empty();
            var  message = Translator.trans('processing', {}, 'photo');
            mainPhotoAdd.params.id.bg_message.html("<span class='text-success'>1/"+ countfile+ "</span> <br/> "+message+"<span class='text-danger'>"+ currentImg[0]+ "</span> ... ");

            formdata.append('id',currentUser.id);
            // alert(mainPhotoAdd.params.api.url);
            // console.log(formdata.get("file"));
            $.ajax({
                url: mainPhotoAdd.params.api.upload.url,
                type:  mainPhotoAdd.params.api.upload.method,
                data: formdata,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                processData: false,
                dataType:  mainPhotoAdd.params.api.upload.type,
                success: function(response){
                    console.log(response);
                    //incrementer l'index
                    currentIndex++;
                    if(currentImg[currentIndex]!=null)
                    {
                        mainPhotoAdd.params.id.bg_message.empty();
                        var  message = Translator.trans('processing', {}, 'photo');
                        mainPhotoAdd.params.id.bg_message.html("<span class='text-success'>"+(currentIndex+1)+"/"+ countfile+ "</span> <br/> "+ message+"<span class='text-danger'>"+ currentImg[currentIndex]+ "</span> ... ");
                    }
                    addThumbnail(response);
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });


        }


        // Added thumbnail
        function addThumbnail(data){
           // mainPhotoAdd.params.id.uploadfile_context.slideDown();
            var len = mainPhotoAdd.params.class.upload_area_thumbnail.length;
            var num = Number(len);
            num = num + 1;
            var name = data.name;
            var size = convertSize(data.size);
            var src = baseHost+data.src;

            //au  debut  on cree un div pour contenir toutes les photos
            if(currentIndex==1)
            {
                // Creating an thumbnail
                mainPhotoAdd.params.id.uploadfile_col.append('<div class="thumbnail row" id="thumbnail_'+num+'"'+'></div>');
            }

            $("#thumbnail_"+num).append('<div class="col node"> <img src="'+src+'" >');
            $("#thumbnail_"+num).append('<div class="size">'+size+'</div></div>');


            // on teste si  le countfile a attient l'index max du  tableau  de fichier
            if(countfile==currentIndex)
            {
                //on cache le bg
               mainPhotoAdd.params.id.bg.slideUp();


                // affiche le modal pour la notification
               mainPhotoAdd.params.id.modal_photo.modal("show");

            }

        }


        // Bytes conversion
        function convertSize(size) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (size == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
            return Math.round(size / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }


        // webcam

        streaming = false,
            width = 0,
            height = 270;


        function init() {
            navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
            navigator.getMedia(
                {
                    video: true,
                    audio: false
                },
                function(stream) {
                    if (navigator.mozGetUserMedia) {
                        mainPhotoAdd.params.webcam.video.mozSrcObject = stream;
                    } else {
                        var vendorURL = window.URL || window.webkitURL;
                        mainPhotoAdd.params.webcam.video.src = vendorURL.createObjectURL(stream);
                    }
                    mainPhotoAdd.params.webcam.video.play();
                    mainPhotoAdd.params.webcam.startbutton.prop("disabled",false);
                },
                function(err) {
                    console.log("An error occured! " + err);
                }
            );
        }




        mainPhotoAdd.params.webcam. video.addEventListener('canplay', function(e){
            if (!streaming) {
                width = mainPhotoAdd.params.webcam.video.videoWidth / (mainPhotoAdd.params.webcam.video.videoHeight/height);
                mainPhotoAdd.params.webcam.video.setAttribute('width', width);
                mainPhotoAdd.params.webcam.video.setAttribute('height', height);
                mainPhotoAdd.params.webcam.canvas.setAttribute('width', width);
                mainPhotoAdd.params.webcam.canvas.setAttribute('height', height);
                streaming = true;
            }
        });

        function takepicture() {
            mainPhotoAdd.params.webcam.audio.play();
            mainPhotoAdd.params.webcam.canvas.width = width;
            mainPhotoAdd.params.webcam.canvas.height = height;
            mainPhotoAdd.params.webcam.canvas.getContext('2d').drawImage(mainPhotoAdd.params.webcam.video, 0, 0, width, height);
            var data = mainPhotoAdd.params.webcam.canvas.toDataURL('image/png');
            mainPhotoAdd.params.webcam.photo.attr('src', data);
        }

        mainPhotoAdd.params.webcam.startbutton.click(function(e){
            takepicture();
            mainPhotoAdd.params.webcam.save.prop("disabled",false);
            e.preventDefault();
        });

        mainPhotoAdd.params.webcam.save.click(function(e){
            upload();
            e.preventDefault();
        });

        function upload() {
            mainPhotoAdd.params.webcam.audio_off.play();
            mainPhotoAdd.params.webcam.webcam_loader.fadeIn();
            mainPhotoAdd.params.webcam.save.prop("disabled",true);
            mainPhotoAdd.params.webcam.startbutton.prop("disabled",true);
            var head = /^data:image\/(png|jpeg);base64,/,
                data = '',
                formdata = new FormData(),
                xhr = new XMLHttpRequest();
            data = mainPhotoAdd.params.webcam.canvas.toDataURL('image/png', 0.9).replace(head, '');
            formdata.append('file', data);
            formdata.append('id', currentUser.id);

            $.ajax({
                url: mainPhotoAdd.params.api.webcam.url,
                type:  mainPhotoAdd.params.api.webcam.method,
                data: formdata,
                headers : {"X-Auth-Token" : currentUser.token},
                crossDomain: true,
                contentType: false,
                processData: false,
                success: function(response){
                    console.log(response);
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                    mainPhotoAdd.params.webcam.webcam_loader.fadeOut();
                    mainPhotoAdd.params.webcam.webcam_notification.fadeIn();
                    mainPhotoAdd.params.webcam.startbutton.prop("disabled",false);
                     t =setInterval(function(){
                         mainPhotoAdd.params.webcam.webcam_notification.fadeOut();
                        clearInterval(t);
                    },3000);
                }

            });

            }

        //mainPhotoAdd.params.webcam.webcam_modal.modal("show");
        //initialiser la webcam
        mainPhotoAdd.params.webcam.webcam_show.click(function(){
            // affiche le modal pour la notification
            mainPhotoAdd.params.webcam.webcam_modal.modal("show");
            mainPhotoAdd.params.webcam.save.prop("disabled",true);
            mainPhotoAdd.params.webcam.startbutton.prop("disabled",true);
            init();
        });
    }
});