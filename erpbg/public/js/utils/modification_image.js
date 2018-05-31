

function modification_image(item) {
    // if(item.divan_modification_link) {
    //     frappe.call({
    //         method: "erpbg.erpbg.doctype.item_modification.item_modification.get_modification_image",
    //         args: {
    //             "name": item.divan_modification_link
    //         },
    //         callback: function(r) {
    //             if(r.message)  {
    //                 type_image(r.message.file_url);
    //             }
    //         }
    //     })
    // } else {
    //     type_image("");
    // }
}


function type_image(url) {
    console.log("type_image url: "+url);
    if(url=="") {
        jQuery("div[data-fieldname='divan_modification_image']").css("display", "none");
     } else {
        var hasI = false;
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").each(function() {
            if (jQuery(this).find('img').length) {
                hasI = true;
            }
        });
        if(!hasI) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html(jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html()+"<img src=\""+url+"\" />");
        } else {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image img").attr("src", url);
        }
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-color","white");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("width","auto");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("height","auto");
        if(jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").removeClass("octicon");
        }
        if(jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon-circle-slash")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").removeClass("octicon-circle-slash");
        }
        jQuery("div[data-fieldname='divan_modification_image']").css("display", "inherit");
    }
}