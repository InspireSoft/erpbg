/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Sales Invoice", "onload_post_render", function (frm, cdt, cdn) {
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

frappe.ui.form.on("Sales Invoice", "onload_post_render", function (frm, cdt, cdn) {
    cur_frm.set_df_property("naming_series", "hidden", true);
    if(locals[cdt][cdn].letter_head != "Dimela-Logo-Head") {
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
    }
    if(frm.doc.customer) {
        cur_frm.set_value("customer", frm.doc.customer);
    }
});

frappe.ui.form.on("Sales Invoice", "refresh", function (frm, cdt, cdn) {
    cur_frm.set_df_property("naming_series", "hidden", true);
});