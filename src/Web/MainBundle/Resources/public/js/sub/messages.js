var MainSubMessages = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Messages"),
        bg_action:$('#bg-action'),
        path: path.flags,
        api:{
            getAll: {
                url : baseUrl+"auth/Message/all",
                method: "get",
                type: "json"
            },
            get: {
                url : baseUrl+"auth/Message/conversation",
                method: "get",
                type: "json"
            },
            post:{
                url : baseUrl+"auth/Message/add",
                method: "post",
                type: "json"
            },
            put:{
                url : baseUrl+"auth/Message/update",
                method: "put",
                type: "json"
            },
            delete:{
                url : baseUrl+"auth/Message/delete",
                method: "delete",
                type: "json"
            }
        },

        body:{
            message_text: $('#Main-Messages #message-text')
        }
    },
   this.getAll = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.getAll.url,
               type: this.params.api.getAll.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.getAll.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.get = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
                url: this.params.api.get.url,
                type: this.params.api.get.method,
                data: objet,
                crossDomain: true,
                dataType:  this.params.api.get.type,
                success: function (data) {
                    console.log(data);
                    cb(data);
                },
                error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
                }
            }
        );
    },
    this.post = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.post.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.post.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                  console.log(xhr.responseText);
                  bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.put = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.put.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.put.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                   console.log(xhr.responseText);
                   bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.delete = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.delete.url,
               type: this.params.api.delete.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.delete.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    }

};


$(function () {
    var mainSubMessages = new MainSubMessages(),
        mainUserProfile_messages = new MainUserProfile();

    if(mainSubMessages.params.sub.data('sub')=="messages") {

            mainSubMessages.params.body.message_text.keyup(function(){
               translateEmotion(listEmoticons(),$(this),path.emoticon);

            });
         function setOwnMessage(content) {

         }

        function listEmoticons(){
                    return  data = {
                            ":Blanco" : "/00 Blanco.png",
                            ":centaur" : "/001-centaur.png",
                            ":leggings" : "/001-leggings.png",
                            ":sick-1" : "/001-sick-1.png",
                            ":Smile" : "/01 Smile.png",
                            ":gloves" : "/002-gloves.png",
                            ":in-love" : "/002-in-love.png",
                            ":kraken" : "/002-kraken.png",
                            ":Laugh" : "/02 Laugh.png",
                            ":dinosaur" : "/003-dinosaur.png",
                            ":scared" : "/003-scared.png",
                            ":socks" : "/003-socks.png",
                            ":Silly" : "/03 Silly.png",
                            ":sun-lotion" : "/004-sun-lotion.png",
                            ":tree-1" : "/004-tree-1.png",
                            ":004-waiting" : "/004-waiting.png",
                            ":04 Wink" : "/04 Wink.png",
                            ":005-employee" : "/005-employee.png",
                            ":005-hand" : "/005-hand.png",
                            ":005-shoe" : "/005-shoe.png",
                            ":05 Blush" : "/05 Blush.png",
                            ":006-echidna" : "/006-echidna.png",
                            ":006-sign" : "/006-sign.png",
                            ":006-writer" : "/006-writer.png",
                            ":06 Sad" : "/06 Sad.png",
                            ":007-robot" : "/007-robot.png",
                            ":007-stopwatch" : "/007-stopwatch.png",
                            ":007-wrestler" : "/007-wrestler.png",
                            ":07 Cool" : "/07 Cool.png",
                            ":008-helmet-1" : "/008-helmet-1.png",
                            ":008-model" : "/008-model.png",
                            ":008-mushroom" : "/008-mushroom.png",
                            ":08 Angry" : "/08 Angry.png",
                            ":009-hello" : "/009-hello.png",
                            ":009-location" : "/009-location.png",
                            ":09 Surprised" : "/09 Surprised.png",
                            ":010-bicycle" : "/010-bicycle.png",
                            ":010-phoenix" : "/010-phoenix.png",
                            ":010-troglodyte" : "/010-troglodyte.png",
                            ":10 Speechless" : "/10 Speechless.png",
                            ":011-dragon-1" : "/011-dragon-1.png",
                            ":011-pulsometer" : "/011-pulsometer.png",
                            ":011-space" : "/011-space.png",
                            ":11 Geek" : "/11 Geek.png",
                            ":012-devil" : "/012-devil.png",
                            ":012-heart-rate" : "/012-heart-rate.png",
                            ":012-pirate" : "/012-pirate.png",
                            ":12 Tease" : "/12 Tease.png",
                            ":013-light" : "/013-light.png",
                            ":013-troll" : "/013-troll.png",
                            ":013-worker" : "/013-worker.png",
                            ":13 Crazy" : "/13 Crazy.png",
                            ":014-alien" : "/014-alien.png",
                            ":014-wrench" : "/014-wrench.png",
                            ":014-zombie" : "/014-zombie.png",
                            ":14 Fools" : "/14 Fools.png",
                            ":015-minotaur" : "/015-minotaur.png",
                            ":015-plant" : "/015-plant.png",
                            ":015-wheel" : "/015-wheel.png",
                            ":15 Cry" : "/15 Cry.png",
                            ":016-finish-2" : "/016-finish-2.png",
                            ":016-madre-monte" : "/016-madre-monte.png",
                            ":016-painter" : "/016-painter.png",
                            ":16 XD" : "/16 XD.png",
                            ":017-cry" : "/017-cry.png",
                            ":017-finish-1" : "/017-finish-1.png",
                            ":017-satyr" : "/017-satyr.png",
                            ":17 Devil" : "/17 Devil.png",
                            ":018-karakasakozou" : "/018-karakasakozou.png",
                            ":018-panel" : "/018-panel.png",
                            ":018-shower" : "/018-shower.png",
                            ":18 Angel" : "/18 Angel.png",
                            ":019-glasses" : "/019-glasses.png",
                            ":019-music" : "/019-music.png",
                            ":019-pirate" : "/019-pirate.png",
                            ":19 Ill" : "/19 Ill.png",
                            ":020-finish" : "/020-finish.png",
                            ":020-guitar-player" : "/020-guitar-player.png",
                            ":020-werewolf" : "/020-werewolf.png",
                            ":20 Meow" : "/20 Meow.png",
                            ":021-run" : "/021-run.png",
                            ":021-scarecrow" : "/021-scarecrow.png",
                            ":021-start" : "/021-start.png",
                            ":21 Zip it" : "/21 Zip it.png",
                            ":022-computer" : "/022-computer.png",
                            ":022-gun" : "/022-gun.png",
                            ":022-valkyrie" : "/022-valkyrie.png",
                            ":22 Annoyed" : "/22 Annoyed.png",
                            ":023-chain" : "/023-chain.png",
                            ":023-coffee" : "/023-coffee.png",
                            ":023-curupira" : "/023-curupira.png",
                            ":23 Please" : "/23 Please.png",
                            ":024-clutch" : "/024-clutch.png",
                            ":024-loch-ness-monster" : "/024-loch-ness-monster.png",
                            ":024-reading" : "/024-reading.png",
                            ":24 Hay" : "/24 Hay.png",
                            ":025-money" : "/025-money.png",
                            ":025-pump" : "/025-pump.png",
                            ":025-tree" : "/025-tree.png",
                            ":25 Not guilty" : "/25 Not guilty.png",
                            ":026-cerberus" : "/026-cerberus.png",
                            ":026-eat" : "/026-eat.png",
                            ":026-helmet" : "/026-helmet.png",
                            ":26 Kissy" : "/26 Kissy.png",
                            ":027-angel" : "/027-angel.png",
                            ":027-gryphon" : "/027-gryphon.png",
                            ":027-road" : "/027-road.png",
                            ":27 Goatse" : "/27 Goatse.png",
                            ":028-mermaid" : "/028-mermaid.png",
                            ":028-rain" : "/028-rain.png",
                            ":028-water" : "/028-water.png",
                            ":28 Nomnomnom" : "/28 Nomnomnom.png",
                            ":029-phone-call" : "/029-phone-call.png",
                            ":029-uniform" : "/029-uniform.png",
                            ":029-vampire" : "/029-vampire.png",
                            ":29 Zzz" : "/29 Zzz.png",
                            ":030-bike" : "/030-bike.png",
                            ":030-goblin" : "/030-goblin.png",
                            ":030-kiss" : "/030-kiss.png",
                            ":30 Total shock" : "/30 Total shock.png",
                            ":031-laughing" : "/031-laughing.png",
                            ":031-yeti" : "/031-yeti.png",
                            ":31 In love" : "/31 In love.png",
                            ":032-leprechaun" : "/032-leprechaun.png",
                            ":032-surprised" : "/032-surprised.png",
                            ":32 Not one care" : "/32 Not one care.png",
                            ":033-angry" : "/033-angry.png",
                            ":033-medusa" : "/033-medusa.png",
                            ":33 Boring" : "/33 Boring.png",
                            ":034-chimera" : "/034-chimera.png",
                            ":034-sick" : "/034-sick.png",
                            ":34 Minishock" : "/34 Minishock.png",
                            ":035-car" : "/035-car.png",
                            ":035-elf" : "/035-elf.png",
                            ":35 Devil laugh" : "/35 Devil laugh.png",
                            ":036-hydra" : "/036-hydra.png",
                            ":036-love" : "/036-love.png",
                            ":36 James" : "/36 James.png",
                            ":037-cyclops" : "/037-cyclops.png",
                            ":037-selfie" : "/037-selfie.png",
                            ":37 Oh" : "/37 Oh.png",
                            ":038-pegasus" : "/038-pegasus.png",
                            ":038-rich" : "/038-rich.png",
                            ":38 Why thank you" : "/38 Why thank you.png",
                            ":039-narwhal" : "/039-narwhal.png",
                            ":039-thinking" : "/039-thinking.png",
                            ":39 Alien 1" : "/39 Alien 1.png",
                            ":040-ghost" : "/040-ghost.png",
                            ":040-woodcutter" : "/040-woodcutter.png",
                            ":40 Alien 2" : "/40 Alien 2.png",
                            ":041-detective" : "/041-detective.png",
                            ":041-zombie" : "/041-zombie.png",
                            ":41 Male" : "/41 Male.png",
                            ":042-dragon" : "/042-dragon.png",
                            ":042-exercise" : "/042-exercise.png",
                            ":42 Female" : "/42 Female.png",
                            ":043-frankenstein" : "/043-frankenstein.png",
                            ":043-sleeping" : "/043-sleeping.png",
                            ":43 Ghost" : "/43 Ghost.png",
                            ":044-cooker" : "/044-cooker.png",
                            ":044-witch" : "/044-witch.png",
                            ":44 Mario" : "/44 Mario.png",
                            ":045-bad" : "/045-bad.png",
                            ":045-fairy" : "/045-fairy.png",
                            ":046-beard" : "/046-beard.png",
                            ":046-genie" : "/046-genie.png",
                            ":047-pinocchio" : "/047-pinocchio.png",
                            ":047-sad" : "/047-sad.png",
                            ":048-cool" : "/048-cool.png",
                            ":048-ghost" : "/048-ghost.png",
                            ":049-birthday" : "/049-birthday.png",
                            ":049-wizard" : "/049-wizard.png",
                            ":050-happy" : "/050-happy.png",
                            ":050-unicorn" : "/050-unicorn.png",
                            ":angel" : "/angel.png",
                            ":angry-1" : "/angry-1.png",
                            ":bored" : "/bored.png",
                            ":bored-1" : "/bored-1.png",
                            ":bored-2" : "/bored-2.png",
                            ":BRB" : "/BRB.png",
                            ":Cellphone" : "/Cellphone.png",
                            ":Clock" : "/Clock.png",
                            ":clown" : "/clown.png",
                            ":confused-1" : "/confused-1.png",
                            ":cool" : "/cool.png",
                            ":cool-1" : "/cool-1.png",
                            ":cool-2" : "/cool-2.png",
                            ":cool-3" : "/cool-3.png",
                            ":couple" : "/couple.png",
                            ":couplekiss(p)" : "/couplekiss(p).png",
                            ":crying-1" : "/crying-1.png",
                            ":dancer(bk)" : "/dancer(bk).png",
                            ":dancer" : "/dancer.png",
                            ":depression" : "/depression.png",
                            ":dislike" : "/dislike.png",
                            ":embarrassed" : "/embarrassed.png",
                            ":emoticons" : "/emoticons.png",
                            ":female_farmer" : "/female_farmer.png",
                            ":File Blanco" : "/File Blanco.png",
                            ":File Picture" : "/File Picture.png",
                            ":File Text" : "/File Text.png",
                            ":Flower" : "/Flower.png",
                            ":gay" : "/gay.png",
                            ":geek" : "/geek.png",
                            ":Gift" : "/Gift.png",
                            ":giftest" : "/giftest.png",
                            ":happy-4" : "/happy-4.png",
                            ":Heart" : "/Heart.png",
                            ":hugging_face" : "/hugging_face.png",
                            ":ill" : "/ill.png",
                            ":Info" : "/Info.png",
                            ":kiss" : "/kiss.png",
                            ":kissing" : "/kissing.png",
                            ":laughing" : "/laughing.png",
                            ":like" : "/like.png",
                            ":love" : "/love.png",
                            ":mad" : "/mad.png",
                            ":Mail" : "/Mail.png",
                            ":man-and-woman" : "/man-and-woman.png",
                            ":me" : "/me.png",
                            ":metalfist" : "/metalfist.png",
                            ":money" : "/money.png",
                            ":moustache" : "/moustache.png",
                            ":Music 1" : "/Music 1.png",
                            ":Music 2" : "/Music 2.png",
                            ":nerd-1" : "/nerd-1.png",
                            ":ninja" : "/ninja.png",
                            ":Pencil" : "/Pencil.png",
                            ":PhotoCamera" : "/PhotoCamera.png",
                            ":Private 1" : "/Private 1.png",
                            ":Private 2" : "/Private 2.png",
                            ":punk" : "/punk.png",
                            ":quiet" : "/quiet.png",
                            ":robot" : "/robot.png",
                            ":sad" : "/sad.png",
                            ":sleep" : "/sleep.png",
                            ":smart" : "/smart.png",
                            ":smiling" : "/smiling.png",
                            ":star" : "/star.png",
                            ":stuck_out_tongue(br)" : "/stuck_out_tongue(br).png",
                            ":surprise" : "/surprise.png",
                            ":surprised" : "/surprised.png",
                            ":surprised-1" : "/surprised-1.png",
                            ":suspicious" : "/suspicious.png",
                            ":suspicious-1" : "/suspicious-1.png",
                            ":thumbsup" : "/thumbsup.png",
                            ":tongue" : "/tongue.png",
                            ":tongue-out" : "/tongue-out.png",
                            ":tongue-out-1" : "/tongue-out-1.png",
                            ":unhappy" : "/unhappy.png",
                            ":waou" : "/waou.png",
                            ":Web" : "/Web.png",
                            ":chine1" : "/chine1.png",
                            ":chine2" : "/chine2.png",
                            ":chine3" : "/chine3.png",
                            ":chine4" : "/chine4.png",
                            ":chine5" : "/chine5.png"
                    };
            }

        function getEmotions(path,icon)
        {
            return "<img src='"+path+icon+"'/>";
        }

        function  translateEmotion(list,element,path){
           $.each(list, function(key, value)
           {
                   element.html(element.html().replace(key, getEmotions(path,value)));
           });
                element.selectionStart = element.html().length;
                console.log(element.html());
        }
    }
});



