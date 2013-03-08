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
        var createinputfile = function(id)
        {
            ans = $('<div class="imageloader-external" id="ext_'+id+'"  style="background: url(add.png) no-repeat center center; cursor: pointer; text-align: left; vertical-align:top; overflow: hidden; width: 120px; height: 200px; border: 1px dotted #031a8f; ">'
             +    '<div style="color: #fff; font-size: 2px; font-weight: bold;"></div>'
             +    '<input id="on_append_image" type="file" name="'+id+'" size="1" style="cursor: pointer; margin-top: -1px; margin-left:-410px; -moz-opacity: 0; filter: alpha(opacity=0); opacity: 0; font-size: 320px; height: 200px;">'
             +'</div>');
            return ans;
        }
        $(___root_selector).append('<div id="images"></div>  ');
        $(___root_selector).append('<div id="images_new"></div>');
        $(___root_selector).append('<div class="imageloader-hidden" id="images_hidden"></div>');

        $(___root_selector+" img").each(function()
        {
          exfid = 'ex_'+exid();
          createimage(exfid);
          imageremovehandler(exfid);
          $(this).attr('height', 200);
          $(this).attr("class","imageloader-image");
          $(___root_selector+" #im_"+exfid+ " #image").append($(this));
        });
        createinputfile('file0').appendTo(___root_selector+" #images");

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
                me = $(this);
                if($(this).attr('id').indexOf("ext_") !== -1) 
                {
                    me = $(this).find('input');
                }
                oldfid = me.attr("name");
                me.attr("id",oldfid);
                $("#ext_"+oldfid).appendTo($(___root_selector+" #images_hidden"));
                fid = 'file'+fileid();
                /*new_me = $("<input>", {
                    type: 'file',
                    name: fid, 
                });*/
                //alert(oldfid+"=>"+fid);
                new_me = createinputfile(fid);
                new_me.change(on_new_clicked);
                createimage(oldfid);
                new_me.appendTo(___root_selector+" #images");
                imagenewhandler(oldfid);
                //alert(this);
                //alert(me[0]);
                var file = me[0].files[0];
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
