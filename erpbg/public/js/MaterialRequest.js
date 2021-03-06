/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Material Request", "onload_post_render", function (frm, cdt, cdn) {
    if(frm.doc.letter_head != "Dimela-Logo-Head") {
        cur_frm.set_value("letter_head", "Dimela-Logo-Head");
    }
    jQuery("div[data-fieldname='items'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        cur_frm.doc.items.forEach(function(item) {
            if(item.name == a.attr("data-name")) {
                if(item.divan_modification != "") {
                    window.setTimeout(function() {
                        modification_image(locals[cdt][cdn]);
                    }, 500);
                }
            }
        });
    });
});