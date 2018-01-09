/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Quotation Item", "item_code", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].type == "") {
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
                if(r.divan_modification != "") {
                    type_image(r.message);
                }
            }
        });
    }
});

