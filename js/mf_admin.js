jQuery(document).ready(function($) {
  //Custom Validataion methods 
  jQuery.validator.addMethod( "lowercase", function(value, element) {
    return this.optional(element) || /^[0-9a-z\_]+$/.test(value);
  },'Only  are accepted lowercase characters,numbers or underscores');

  $('#addPostType').validate({meta:"validate"});
  $('#addCustomTaxonomy').validate({meta:"validate"});
  $('#addCustomGroup').validate({meta:"validate"});
  $('#addCustomField').validate({meta:"validate"});

  //validation type(name)
  $('#addPostType').submit(function(){
    name = $('#posttype-type').val();
    id = $('#posttype-id').val();
    var status = 0;
     
     jQuery.ajax({
       url: ajaxurl,
       type: 'POST',
       async: false,
       dataType: 'json',
       data: "action=mf_call&type=check_name_post_type&post_type="+name+"&post_type_id="+id,
       success: function(response){
         $("#message_post_type").hide();
         if(response.success){
           status = 1;
         }else{
           $('#message_post_type p').empty().append(response.msg);
           $("#message_post_type").show();
           $("#posttype-type").focus();
         }
       }
     });

    if(status)
      return true;

    return false;
  });
  
  //validation custom group
  $('#addCustomGroup').submit(function(){
    name = $("#custom_group_name").val();
    group_id = $("#custom_group_id").val();
    post_type = $("#custom_group_post_type").val();
    var status = 0;
    if(name){
      jQuery.ajax({
         url: ajaxurl,
         type: 'POST',
         async: false,
         dataType: 'json',
         data: "action=mf_call&type=check_name_custom_group&group_name="+name+"&post_type="+post_type+"&group_id="+group_id,
         success: function(response){
           $("#message_mf_error").hide();
           if(response.success){
             status = 1;
           }else{
             $('#message_mf_error p').empty().append(response.msg);
             $("#message_mf_error").show();
             $("#custom_group_name").focus();
           }
         }
       });
    }
    if(status)
      return true;

    return false;
        
  });
  
  //validation custom field
  $('#addCustomField').submit(function(){
  	var data = {
  		action: "mf_call",
  		type: "check_name_custom_field",
  		field_name: $("#customfield-name").val(),
  		field_id: $("#customfield_id").val(),
    	post_type: $("#customfield-post_type").val(),
    	group_id: $("#customfield_custom_group_id").val()
  	}
    var name = $("#customfield-name").val();
    var field_id = $("#customfield_id").val();
    var status = 0;
    if(name){
      jQuery.ajax({
         url: ajaxurl,
         type: 'POST',
         async: false,
         dataType: 'json',
         data: data,
         success: function(response){
           $("#message_mf_error").hide();
           if(response.success){
             status = 1;
           }else{
             $('#message_mf_error p').empty().append(response.msg);
             $("#message_mf_error").show();
             $("#customfield-name").focus();
           }
         }
       });
    }
    if(status)
      return true;
      
    return false;    
  });
  
  //validation custom taxonomy
  $('#addCustomTaxonomy').submit(function(){
    type = $("#custom-taxonomy-type").val();
    taxonomy_id = $("#custom-taxonomy-id").val();
    var status = 0;
    if(type){
      jQuery.ajax({
         url: ajaxurl,
         type: 'POST',
         async: false,
         dataType: 'json',
         data: "action=mf_call&type=check_type_custom_taxonomy&taxonomy_type="+type+"&taxonomy_id="+taxonomy_id,
        success: function(response){
           $("#message_mf_error").hide();
           if(response.success){
             status = 1;
           }else{
             $('#message_mf_error p').empty().append(response.msg);
             $("#message_mf_error").show();
             $("#custom-taxonomy-type").focus();
           }
         }
       });
    }
    if(status)
      return true;
      
    return false;    
  });
  
  //Confirm for display a confirm box 
  $('.mf_confirm').click(function() {
    message = $(this).attr('alt');     

    return confirm_message(message);
  });

  $('#change-post-type').change(function(){

    post_type = $(this).val();
    url = 'admin.php?page=mf_dispatcher&mf_section=mf_custom_fields&mf_action=fields_list&post_type=';
    window.location= url +  post_type;
  });

  /* change options of custom field */
  $('#customfield-type').change( function(){
    type = $(this).val();
    if(type != ''){
      jQuery.post(
        ajaxurl,
        {
          'action':'mf_call',
          'type': 'change_custom_field',
          'field_type': type
        },
        function(response){
          $('#options_field_legend').hide();
          $("#options_field").empty().append(response);
        }
      );
    }else{
      $("#options_field_legend").show();
      $("#options_field").empty();
    }
  });

  $('#customfield-label').change(function(e){
    name = $("#customfield-name").val();
    if(name == ''){
      suggestCustomFieldName();
    }
  });

});

function suggestCustomFieldName(){

  var desc = jQuery('#customfield-label').val();
  desc = desc.replace(/\s?\([^\)]*\)/gi, "");     
  var nv = jQuery.slug(desc, { sep: "_" });
  var name_group = jQuery('#name_group_slug').val();

  if(name_group != ""){
    var prefix = jQuery.slug(name_group, { sep: "_" });
    if (prefix != "" && prefix != "_") {
      nv = prefix + "_" + nv;
    }

  }
  jQuery('#customfield-name').val(nv);
}

confirm_message = function(message) {

  if( confirm( message ) ){
    return true;
  } else {
    return false;
  }
}

function load_link_in_media_upload(){
 
  jQuery('a.del-link').each(function(){
    id = jQuery(this).next().attr('id');
    check_repet = jQuery(this).prev().attr('class');
    if(check_repet == "mf_media_upload"){
    }else{
      check = parent.window.mf_field_id;
      if(check == "" || check == undefined ){}else{
        set = parent.window.mf_js.mf_image_media_set;
        jQuery(this).before('<a href="#" class="mf_media_upload button" onclick="mf_set_image_field(\''+id+'\'); return false;">'+set+'</a>');
        jQuery(this).parent().find("input:submit").remove();        
      }
    }
  });
}

function mf_set_image_field(id){
  id_element = parent.window.mf_field_id;
  jQuery.post(parent.window.mf_js.mf_url+"admin/MF_ImageMedia.php", { "image_id": id, 'field_id': id_element },
     function(data){
       jQuery('#img_thumb_'+data.field_id, top.document).attr('src',data.image);
       jQuery('#'+data.field_id, top.document).attr('value',data.image_value);
       jQuery('#edit-'+data.field_id, top.document).attr('href',data.image_path);
       jQuery('#photo_edit_link_'+data.field_id, top.document).show();
       parent.window.mf_field_id = '';
       parent.window.tb_remove();
     }, "json");
}

//load button for image media
jQuery(document).ready(function($){
  jQuery('.del-link').each(function(){
    id = jQuery(this).next().attr('id');
    check = parent.window.mf_field_id;
    if(check == ""){}else{
      set = parent.window.mf_js.mf_image_media_set;
      $(this).before('<a href="#"  class="mf_media_upload button" onclick="mf_set_image_field(\''+id+'\'); return false;">'+set+'</a>');
      $(this).parent().find("input:submit").remove();        
    }
  });
  
  $('.update_field_media_upload').live('click', function(){
    window.mf_field_id = jQuery(this).attr('id');
  });
	
  $('#set-post-thumbnail , #add_image').click( function(){
    window.mf_field_id = '';
  });
	
  $(".mce_add_image , .mce_add_video , .mce_add_audio , .mce_add_media").live('click',function(){
    window.mf_field_id = '';
  });
});