frappe.ui.form.on("Sales Order Item", "divan_modification_link", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification_link != "") {
        modification_image(locals[cdt][cdn]);
    }
});


frappe.ui.form.on("Sales Order Item", "cdescription", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});


frappe.ui.form.on("Sales Order Item", "refresh", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});

frappe.ui.form.on("Sales Order Item", "item_code", function (frm, cdt, cdn) {

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
                    cur_frm.doc.sales_order_attachment.forEach(function(qa) {
                        if(qa.attachment == r.message.image.file_url) {
                            skip = true;
                        }
                    });
                    if(!skip) {
                        var child = cur_frm.add_child("sales_order_attachment");
                        frappe.model.set_value(child.doctype, child.name, "attachment", r.message.image);
                        cur_frm.refresh();
                    }
                }
            }
        });
    }
});

frappe.ui.form.on("Sales Order Item", "onload_post_render", item_query );
frappe.ui.form.on("Sales Order Item", "refresh", item_query );