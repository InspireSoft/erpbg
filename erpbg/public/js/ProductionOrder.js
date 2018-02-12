/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Production Order", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    }
});
frappe.ui.form.on("Production Order", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    } else if(doc.sales_order) {
        if(!frm.doc.__islocal || frm.doc.__islocal == 0 || frm.doc.docstatus == 0) {
            frappe.call({
                method: "erpbg.erpbg.production_order.get_sales_order_item",
                args: { "item_code": doc.production_item, "sales_order_name": doc.sales_order },
                callback: function(r) {
                    if(r.message)  {
                        soi = r.message;
                        if(soi.type != doc.type) {
                            set_values_from_item(cdt, cdn, soi);
                            frm.save();
                        }
                    }
                }
            })
        }
    }

    if(frm.doc.copied_attachments == 0) {
        frappe.call({
            method: 'erpbg.erpbg.production_order.get_sales_order_attachments',
            args: {
                "production_order_name": frm.doc.name,
                "sales_order_name": frm.doc.sales_order
            },
            callback: function(r) {
                console.log(r);
                if(r.message) {
                    r.message.forEach(function(attachment){
                        frm.attachments.update_attachment(attachment);
                    });
                    frm.refresh();
                }
            }
        });
        frappe.model.set_value(cdt, cdn, "copied_attachments", 1);
        if(!frm.doc.__islocal || frm.doc.__islocal == 0 || frm.doc.docstatus == 0) {
            frm.save();
        }
    }
});