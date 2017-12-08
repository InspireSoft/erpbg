/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification=="") {

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
        console.log("url('/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png') no-repeat center center fixed");

        var hasI = false;
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").each(function() {
            if (jQuery(this).find('img').length) {
                hasI = true;
            }
        });
        if(!hasI) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html(jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").html()+"<img src=\"/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png\" />");
        } else {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image img").attr("src=","/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png");
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
});