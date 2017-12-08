/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    if(!locals[cdt][cdn].divan_modification) {
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-repeat","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-size","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-webkit-background-size","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-moz-background-size","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-o-background-size","");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-image","");
     } else {
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-image","url('/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png') no-repeat center center fixed");
    //    jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("width","400px");
    //    jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("height","400px");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-repeat","no-repeat");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("background-size","cover");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-webkit-background-size","cover");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-moz-background-size","cover");
        jQuery("div[data-fieldname='divan_modification_image'] div.missing-image").css("-o-background-size","cover");
    //    background-image: url("/private/files/divan_01.png");
    //    width: 400px;
    //    height: 400px;
    //    background-repeat: no-repeat;
    //  -webkit-background-size: cover;
    //  -moz-background-size: cover;
    //  -o-background-size: cover;
    //  background-size: cover;
    }
});