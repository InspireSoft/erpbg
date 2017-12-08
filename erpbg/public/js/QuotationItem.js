/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification=="") {
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-image","");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-color","#fafbfc");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-repeat","");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-size","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("width","140px");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("height","140px");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-webkit-background-size","");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-moz-background-size","");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-o-background-size","");
        if(!jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").addClass("octicon");
        }
        if(!jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").hasClass("octicon-circle-slash")) {
            jQuery("div[data-fieldname='divan_modification_image'] div.missing-image i").addClass("octicon-circle-slash");
        }
     } else {
        console.log("url('/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png') no-repeat center center fixed");

//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-color","white");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-repeat","no-repeat");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-size","cover");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-image","url('/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png') no-repeat center center fixed");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-webkit-background-size","cover");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-moz-background-size","cover");
//        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-o-background-size","cover");
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