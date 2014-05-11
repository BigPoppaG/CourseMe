$(document).ready(function () {

    $('#new_prerequisite_form_group').find('.dynamic-list-new-item-label').text("Enter new prerequisite for this objective");
    $('#new_prerequisite_form_group').find('.dynamic-list-heading').text("Prerequisites");    

    //Button to bring up new empty form modal to create a new objective with prerequisites
    $("#create_objective").click(function(){
            $("#edit_objective_id").val("");
            $("#edit_objective_name").val("");
            $("#edit_objective_form").find(".dynamic-list-new-item").val("");
            $("#edit_objective_form").find(".help-block").text("");
            $("#edit_objective_form").find(".has-error").removeClass("has-error");
            $("#edit_objective_form").find(".dynamic-list-item").remove();
            $("#edit_objective_modal").modal('show');
            return false;
    });

    //Button to post the new or updated objective data to the server for validation and storage
    $("#save_objective").click(function(){
        var prerequisites = new Array();
        $("#edit_objective_form").find(".dynamic-list-item-data").each(function() {
            prerequisites.push($(this).text());
        });
        
        var data = $("#edit_objective_form").serializeArray();     //DJG - http://stackoverflow.com/questions/6627936/jquery-post-with-serialize-and-extra-data
        data.push({name: 'prerequisites', value: prerequisites});

        console.log(prerequisites);
        console.log(data);          //DJG - not sure why edit_objective_id is getting repeated in the data array


        //data_json = JSON.stringify(data)        //DJG - Played with alternatives to passing data back that allows the list of prerequisites to be parsed as a list object by the view function. This approach leaves the wtf form unpopulated so fails validation and no csrf, needs reviewing
        //console.log(jQuery.isPlainObject( data ));
        //console.log(typeof data);
        //console.log(data_json);      
        //console.log(jQuery.isPlainObject( data_json ));
        //console.log(typeof data_json);        
        
        $.post(  
            flask_util.url_for('objective_add_update'),  
            data,  
            function(json) {
                
                console.log(json);
                
                var result = $.parseJSON(json);
                console.log(result);
                console.log(result["savedsuccess"]);
                console.log(result.savedsuccess);                
                
                $("#edit_objective_form").find(".help-block").text("");
                            
                if(result.savedsuccess)
                {
                    $("#edit_objective_modal").modal('hide');
                    location.reload();
                }
                else
                {       
                    if(result.edit_objective_name!=undefined) {
                        $("#error_edit_objective_name").text(result.edit_objective_name[0]);
                        $("#edit_objective_name_form_group").addClass("has-error");
                    }
                    if(result.new_prerequisite!=undefined) {
                        $("#edit_objective_form").find(".dynamic-list-help").text(result.new_prerequisite[0]);
                        $("#edit_objective_form").find(".dynamic-list-form").addClass("has-error");
                    }    
                }
            }
        );
    });
    
//    $(function() {            DJG - could use ajax to get the list of objectives here, better to move this bit to the individual templates as may also want to autopopulate other stuff and already have objective list there
//        
//        var availableTags = [];
//        {% for objective in objectives %}
//            availableTags.push('{{ objective.name }}')    
//        {% endfor %}    
//
//        $( "#new_prerequisite" ).autocomplete({
//            source: availableTags
//        });
//    });
//    

});

function loadEditObjectiveModal(objective) {
    $("#edit_objective_id").val(objective.id);
    $("#edit_objective_name").val(objective.name);
    $("#edit_objective_form").find(".dynamic-list-new-item").val("");
    $("#edit_objective_form").find(".help-block").text("");
    $("#edit_objective_form").find(".has-error").removeClass("has-error");
    $("#edit_objective_form").find(".dynamic-list-item").remove();
    var num_prerequisites = objective.prerequisites.length;
    for (var p = 0; p < num_prerequisites; p++) {
        dynamicList_addNewItem(objective.prerequisites[p], $("#edit_objective_form").find(".dynamic-list")); 
    }
    $("#edit_objective_modal").modal('show');
    return false;
}