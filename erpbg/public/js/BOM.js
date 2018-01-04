/**
 * Created by Simeon on 21-Nov-17.
 */

function make_call_for_soi(doc) {
    frappe.call({
        method: "erpbg.erpbg.sales_order.get_sales_order_item",
        args: { "item_name": doc.item, "sales_order": doc.sales_order },
        callback: function(r) {
            if(r.message)  {
                console.log(r.message);
                soi = r.message;
                if(soi.type != doc.type) {
                    set_values_from_item(soi);
                }
            }
        }
    })
}

frappe.ui.form.on("BOM", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("BOM", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.divan_modification != "") {
        type_image(doc);
    } else if(doc.sales_order) {
        make_call_for_soi(doc);
    }
});

frappe.ui.form.on("BOM", "sales_order", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.item) {
        make_call_for_soi(doc);
    }
});

frappe.ui.form.on("BOM", "item", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.sales_order) {
        make_call_for_soi(doc);
    }
});