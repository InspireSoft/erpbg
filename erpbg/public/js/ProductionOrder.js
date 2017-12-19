/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Production Order", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});
frappe.ui.form.on("Production Order", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.divan_modification != "") {
        type_image(doc);
    } else if(doc.sales_order) {
        frappe.call({
            method: "erpbg.erpbg.production_order.get_sales_order_item",
            args: { "item_name": doc.production_item, "sales_order": doc.sales_order },
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
});