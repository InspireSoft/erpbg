/**
 * Created by Simeon on 21-Nov-17.
 */

function make_call_for_soi(cdt, cdn) {
    frappe.call({
        method: "erpbg.erpbg.sales_order.get_sales_order_item",
        args: {
            "item_code": locals[cdt][cdn].item,
            "sales_order": locals[cdt][cdn].sales_order
        },
        callback: function(r) {
            if(r.message)  {
                soi = r.message;
                if(soi.type != locals[cdt][cdn].type) {
                    set_values_from_item(cdt, cdn, soi);
                    frm.save();
                }
            }
        }
    })
}

function make_production_order(doc) {
    frappe.call({
        method: 'erpbg.erpbg.bom.make_production_order',
        args: {
            doc_name: doc.name
        },
        freeze: true,
        callback: function(r) {
            if(r.message) {
                frappe.msgprint({
                    message: __('Production Orders Created: {0}', [repl('<a href="#Form/Production Order/%(name)s">%(name)s</a>', {name:r.message.name})]),
                    indicator: 'green'
                })
            }
            d.hide();
        }
    });
}

frappe.ui.form.on("BOM", "onload_post_render", function (frm, cdt, cdn) {
    if(frm.doc.docstatus==1) {
        if(frm.doc.status != 'Closed') {
            frm.add_custom_button(
                __('Production Order'),
                function() { make_production_order(locals[cdt][cdn]) }, __("Make")
            );
        }
    }
});

frappe.ui.form.on("BOM", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("BOM", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    } else if(doc.sales_order) {
        make_call_for_soi(cdt, cdn);
    }
});

frappe.ui.form.on("BOM", "sales_order", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.item) {
        make_call_for_soi(cdt, cdn);
    }
});

frappe.ui.form.on("BOM", "item", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn];
    if(doc.sales_order) {
        make_call_for_soi(cdt, cdn);
    }
});