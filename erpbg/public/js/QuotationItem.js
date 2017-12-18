/**
 * Created by Simeon on 4-Dec-17.
 */
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
    type_image(locals[cdt][cdn]);
});

