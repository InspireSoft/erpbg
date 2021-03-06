/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification_link", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification_link != "") {
        modification_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Quotation Item", "item_code", function (frm, cdt, cdn) {

    if(locals[cdt][cdn].item_code && !locals[cdt][cdn].type) {
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "Item",
                filters: {
                    item_code: locals[cdt][cdn].item_code
                }
            },
            callback: function(r) {
                set_values_from_item(cdt, cdn, r.message);
                if(r.divan_modification_link != "") {
                    modification_image(locals[cdt][cdn]);
                }
            }
        });
    } else if(locals[cdt][cdn].item_code) {
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "Item",
                filters: {
                    item_code: locals[cdt][cdn].item_code
                }
            },
            callback: function(r) {
                set_values_from_item(cdt, cdn, r.message);
            }
        });
    }
});

frappe.ui.form.on("Quotation Item", "cdescription", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});


frappe.ui.form.on("Quotation Item", "refresh", function (frm, cdt, cdn) {

    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});

frappe.ui.form.on("Quotation Item", "onload_post_render", item_query );
frappe.ui.form.on("Quotation Item", "refresh", item_query );