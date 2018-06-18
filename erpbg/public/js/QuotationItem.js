/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification_link", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification_link != "") {
        modification_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Quotation Item", "item_code", function (frm, cdt, cdn) {
    if(!locals[cdt][cdn].type) {
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
    }
    if(!frm.doc.__islocal || frm.doc.__islocal == 0) {
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "Item",
                filters: {
                    item_code: locals[cdt][cdn].item_code
                }
            },
            callback: function(r) {
                if(r.message.image) {
                    var skip = false;
                    cur_frm.doc.quotation_attachment.forEach(function(qa) {
                        if(qa.attachment.name == r.message.image.name) {
                            skip = true;
                        }
                    });
                    if(!skip) {
                        var child = cur_frm.add_child("quotation_attachment");
                        frappe.model.set_value(child.doctype, child.name, "attachment", r.message.image);
                        cur_frm.refresh();
                    }
                }
            }
        });
    }
});

frappe.ui.form.on("Quotation Item", "onload_post_render", function (frm,cdt,cdn) {
    cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(doc, cdt, cdn) {
        return {query: "erpbg.erpbg.item_query"}
    }
});


frappe.ui.form.on("Quotation Item", "cdescription", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});


frappe.ui.form.on("Quotation Item", "refresh", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});