/**
 * Created by Simeon on 4-Dec-17.
 */
function load_image(item) {
    console.log("load_image");
    if(item.divan_modification=="") {

        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").each(function() {
            if (jQuery(this).find('img').length) {
                jQuery(this).remove();
            }
        });

        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-color","#fafbfc");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("width","140px");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("height","140px");
        if(!jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").addClass("octicon");
        }
        if(!jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon-circle-slash")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").addClass("octicon-circle-slash");
        }
     } else {
        console.log("url('/private/files/divan_"+(item.divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_").replace(" ","_"))+".png') no-repeat center center fixed");

        var hasI = false;
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").each(function() {
            if (jQuery(this).find('img').length) {
                hasI = true;
            }
        });
        if(!hasI) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html(jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html()+"<img src=\"/private/files/divan_"+(item.divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png\" />");
        } else {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image img").attr("src",function() {return "/private/files/divan_"+(item.divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png";});
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
    }
}


frappe.ui.form.on("Quotation", "onload_post_render", function (frm, cdt, cdn) {
    console.log("onload");
    jQuery("div[data-fieldname='items'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        console.log(a);
        console.log(a.attr("data-name"));
        cur_frm.doc.items.forEach(function(item) {
            if(item.name == a.attr("data-name")) {
                window.setTimeout(function() {
                    load_image(item);
                }, 500);
            }
        });
    });
});


frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    load_image(locals[cdt][cdn]);
});

