
var imageSearchResultElementBody = "";
frappe.ui.form.on("Image Search", "onload_post_render", function (frm, cdt, cdn) {
//    frappe.call({method: "erpbg.erpbg.pyimagesearch.update_dataset",callback: function (r) {}});
    frm.fields_dict.searching_image.clear_attachment();

    console.log(jQuery("div.form-page").find("h6.form-section-heading").filter(function(){ return jQuery(this).html() == "Result" ;}).parent().parent().html());
    imageSearchResultElementBody = jQuery("div.form-page").find("h6.form-section-heading").filter(function(){ return jQuery(this).html() == "Result" ;}).parent().parent();
    imageSearchResultElementBody.removeClass("hide-control").addClass("visible-section");
    imageSearchResultElementBody = imageSearchResultElementBody.children("div.section-body");
    console.log(imageSearchResultElementBody);
});

frappe.ui.form.on("Image Search", "refresh", function(frm, cdt, cdn){
    if(jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().hasClass("collapsed")) {
        jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
    }
});

frappe.ui.form.on("Image Search", "searching_image", function (frm, cdt, cdn) {
    if(frm.doc.searching_image.substring(frm.doc.searching_image.length -4) != ".jpg" && frm.doc.searching_image.slice(frm.doc.searching_image.length -4) != ".png") {
        imageSearchResultElementBody.html("");
        console.log(frm.doc.searching_image.substring(frm.doc.searching_image.length -4));

    } else if(frm.doc.searching_image) {
        var url_addon = "";
        if(frm.doc.searching_image.indexOf("/private/")!=-1) {
            url_addon = "private/";
        } else if(frm.doc.searching_image.indexOf("/public/")!=-1) {
            url_addon = "public/";
        }
        var file_name = frm.doc.searching_image.substr(frm.doc.searching_image.lastIndexOf('/') + 1);
        jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
        frappe.call({
            method: "erpbg.erpbg.pyimagesearch.search_result",
            args: { "file_name": file_name, "url_addon": url_addon },
            callback: function (r) {
                console.log(r);
                if(r.message) {
                    if(imageSearchResultElementBody.parent().hasClass("hide-control") || !imageSearchResultElementBody.parent().hasClass("visible-section")) {
                        imageSearchResultElementBody = imageSearchResultElementBody.parent().removeClass("hide-control").removeClass("empty-section").addClass("visible-section").children("div.section-body");
                    }
                    if(!jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().hasClass("collapsed")) {
                        jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
                    }
                    var html = "";
                    html += "<table><tr><td style='padding-bottom: 5px;'>";
                    html += r.message.join("</td></tr><tr><td style='padding-bottom: 5px;'>");
                    html += "</td></tr></table>";
                    imageSearchResultElementBody.html(html);
                }
            }
        });
    } else {
        imageSearchResultElementBody.html("");
    }
});