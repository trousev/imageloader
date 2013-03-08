    function ImageLoader(selector)
    {
        var ___root_selector = selector;
        var ___fileid = 1;
        var ___exid = 1;
        var exid = function()
        {
            ___exid += 1;
            return ___exid + "";
        }
        var createimage = function(id)
        {
          design 
              = '<div id="im_'+id+'" class="imageloader-external" >'
              + "  <div class='imageloader-cross imageloader-delete-image' id='remove' affects='"+id+"'></div>"
              + "  <div id='image' class='imageloader-pic'></div>"
              + "</div>"
          ;
          $(design).appendTo(___root_selector+" #images");
          
        }
        $(___root_selector).append(
             '<div id="images"></div>  '
            +'<div id="images_new"></div>'
            +'<input  type="file" id="on_append_image" name="file0"></input>'
            +'<div class="imageloader-hidden" id="images_hidden"></div>'
            );
        $(___root_selector+" img").each(function()
        {
          exfid = 'ex_'+exid();
          createimage(exfid);
          imageremovehandler(exfid);
          $(this).attr('height', 200);
          $(this).attr("class","imageloader-image");
          $(___root_selector+" #im_"+exfid+ " #image").append($(this));
        });
        var fileid = function()
        {
            ___fileid += 1;
            return ___fileid + "";
        }
        function imageremovehandler (id)
        {
            $(___root_selector+" #im_"+id+" #remove ").click(function(){
                $(___root_selector+" #images_hidden").append($('<input>', {name: 'remove_'+id, value: $(___root_selector+" #im_"+id+"  img").attr("context") } ));
                $(___root_selector+" #im_"+id).remove();
            });
        }
        var imagenewhandler = function(id)
        {
          $(___root_selector+" #im_"+id + " #remove ").click(function(){
             $(___root_selector+" #"+$(this).attr("affects")).remove();
             $(___root_selector+" #im_"+$(this).attr("affects")).remove();
          });
        }
        var on_new_clicked = function()
        {
                /*var input = $('<input>', {
                    type: 'file',
                    name: 'file',
                });
                $('#images').append(input);*/
                oldfid = $(this).attr("name");
                $(this).attr("id",oldfid);
                $(this).appendTo($(___root_selector+" #images_hidden"));
                fid = 'file'+fileid();
                new_me = $("<input>", {
                    type: 'file',
                    name: fid, 
                });
                new_me.appendTo(___root_selector+" #images_new");
                new_me.change(on_new_clicked);
                createimage(oldfid);
                imagenewhandler(oldfid);
                
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('<img>', {height: 200, class: "imageloader-image"}).attr('src', e.target.result).appendTo(___root_selector+' #im_'+oldfid + " #image");
                };
                reader.readAsDataURL(file);
                
        }
        
        this.init = function()
        {
            $(___root_selector+" #on_append_image").change(on_new_clicked);
        }
        this.init();
    }
