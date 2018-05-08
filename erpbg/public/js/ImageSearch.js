
var imageSearchResultElementBody = "";
frappe.ui.form.on("Image Search", "onload_post_render", function (frm, cdt, cdn) {
    frappe.call({method: "erpbg.erpbg.pyimagesearch.update_dataset",callback: function (r) {}});
    frm.fields_dict.searching_image.clear_attachment();

    console.log(jQuery("div.form-page").find("h6.form-section-heading").filter(function(){ return jQuery(this).html() == __("Result");}).parent().parent().html());
    imageSearchResultElementBody = jQuery("div.form-page").find("h6.form-section-heading").filter(function(){ return jQuery(this).html() == __("Result");}).parent().parent();
    imageSearchResultElementBody.removeClass("hide-control").addClass("visible-section");
    imageSearchResultElementBody = imageSearchResultElementBody.children("div.section-body");
    console.log(imageSearchResultElementBody);
});

frappe.ui.form.on("Image Search", "refresh", function(frm, cdt, cdn){
    if(jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().hasClass("collapsed")) {
        jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
    }
    if(imageSearchResultElementBody && (imageSearchResultElementBody.parent().hasClass("hide-control") || imageSearchResultElementBody.parent().hasClass("empty-section") || !imageSearchResultElementBody.parent().hasClass("visible-section") || !imageSearchResultElementBody.parent().hasClass("shaded-section"))) {
        imageSearchResultElementBody = imageSearchResultElementBody.parent().removeClass("hide-control").removeClass("empty-section").addClass("visible-section").addClass("shaded-section").children("div.section-body");
    }
});

frappe.ui.form.on("Image Search", "searching_image", function (frm, cdt, cdn) {
    console.log("change in image");
    if(frm.doc.searching_image) {
        if(frm.doc.searching_image.substring(frm.doc.searching_image.length -4).toLowerCase() != ".jpg" && frm.doc.searching_image.slice(frm.doc.searching_image.length -4).toLowerCase() != ".png") {
            imageSearchResultElementBody.html("");
            imageSearchResultElementBody.html("extention not supported " + frm.doc.searching_image.substring(frm.doc.searching_image.length -4));
            console.log("extention not supported");
            console.log(frm.doc.searching_image.substring(frm.doc.searching_image.length -4));
        } else {
            var url_addon = "";
            if(frm.doc.searching_image.indexOf("/private/")!=-1) {
                url_addon = "private/";
            } else {
                url_addon = "public/";
            }
            var file_name = frm.doc.searching_image.substr(frm.doc.searching_image.lastIndexOf('/') + 1);
            jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
            console.log("starting search based on "+file_name+" in foolder '"+url_addon+"'");
            frappe.call({
                method: "erpbg.erpbg.pyimagesearch.search_result",
                args: { "file_name": file_name, "url_addon": url_addon },
                callback: function (r) {
                    console.log("got result for the search");
                    console.log(r);
                    if(typeof r.message === "string") {
                        console.log("found error in response");
                        if(imageSearchResultElementBody.parent().hasClass("hide-control") || imageSearchResultElementBody.parent().hasClass("empty-section") || !imageSearchResultElementBody.parent().hasClass("visible-section")) {
                            imageSearchResultElementBody = imageSearchResultElementBody.parent().removeClass("hide-control").removeClass("empty-section").addClass("visible-section").children("div.section-body");
                        }
                        if(!jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().hasClass("collapsed")) {
                            jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
                        }
                        var html = "<b><font color='red'>Error in image file, can not process!</font><br/><br/>" + r.message + "</b>";
                        console.log("adding result to ");
                        console.log(imageSearchResultElementBody);
                        imageSearchResultElementBody.html(html);
                        return;
                    }
                    if(r.message) {
                        console.log("found message in response");
                        if(imageSearchResultElementBody.parent().hasClass("hide-control") || imageSearchResultElementBody.parent().hasClass("empty-section") || !imageSearchResultElementBody.parent().hasClass("visible-section")) {
                            imageSearchResultElementBody = imageSearchResultElementBody.parent().removeClass("hide-control").removeClass("empty-section").addClass("visible-section").children("div.section-body");
                        }
                        if(!jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().hasClass("collapsed")) {
                            jQuery('.section-head').find("a").filter(function(){ return jQuery(this).text() == "Searching Image" ;}).parent().click();
                        }
                        var html = "";
                        html += "<table><tr><td style='padding: 30px; border-bottom: 2px dashed black;'>";
                        html += r.message.join("</td></tr><tr><td style='padding: 30px; border-bottom: 2px dashed black;'>");
                        html += "</td></tr></table>";
                        console.log("adding result to ");
                        console.log(imageSearchResultElementBody);
                        imageSearchResultElementBody.html(html);
                    } else {
                        console.log("could not find message in response");
                    }
                }
            });
        }
    } else {
        imageSearchResultElementBody.html("");
    }
});