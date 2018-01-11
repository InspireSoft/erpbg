/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Sales Order", "onload_post_render", function (frm, cdt, cdn) {
    jQuery("div[data-fieldname='items'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        cur_frm.doc.items.forEach(function(item) {
            if(item.name == a.attr("data-name")) {
                if(item.divan_modification != "") {
                    window.setTimeout(function() {
                        type_image(item);
                    }, 500);
                }
            }
        });
    });
});


frappe.ui.form.on("Sales Order", "refresh", function (frm, cdt, cdn) {
    if(frm.doc.docstatus==1) {
        if(frm.doc.status != 'Closed') {
            frm.add_custom_button(
                __('BOM'),
                function() { make_bom(locals[cdt][cdn]) }, __("Make")
            );
        }
    }
});


function make_bom(doc) {
    frappe.call({
        method: 'erpbg.erpbg.sales_order.get_bomed_items',
        args: {
            "sales_order_name": doc.name
        },
        callback: function(r) {
            console.log("before");
            if(r.message && !r.message.every( function(d) { return !!d.pending_qty } )) {
                console.log("if");
                frappe.msgprint({
                    title: __('BOM not created'),
                    message: __('BOM already created for all items'),
                    indicator: 'orange'
                });
                return;
            } else {
                console.log("else");
                var fields = [
                    {fieldtype:'Table', fieldname: 'items',
                        description: __('Select items for BOMs'),
                        fields: [
                            {fieldtype:'Read Only', fieldname:'item_code',
                                label: __('Item Code'), in_list_view:1},
                            {fieldtype:'Float', fieldname:'pending_qty', reqd: 1,
                                label: __('Qty'), in_list_view:1},
                        ],
                        get_data: function() {
                            return r.message
                        }
                    }
                ]
                console.log("make dialog");
                var d = new frappe.ui.Dialog({
                    title: __('Select Items to create BOMs'),
                    fields: fields,
                    primary_action: function() {
                        var data = d.get_values();
                        console.log("primary action in dialog");
                        frappe.call({
                            method: 'erpbg.erpbg.sales_order.make_boms',
                            args: {
                                items: data,
                                company: doc.company,
                                sales_order: doc.name
                            },
                            freeze: true,
                            callback: function(r) {
                                console.log("response in dialog");
                                if(r.message) {
                                    frappe.msgprint({
                                        message: __('BOMs Created: {0}',
                                            [r.message.map(function(d) {
                                                return repl('<a href="#Form/BOM/%(name)s">%(name)s</a>', {name:d})
                                            }).join(', ')]),
                                        indicator: 'green'
                                    })
                                }
                                d.hide();
                            }
                        });
                    },
                    primary_action_label: __('Make')
                });
                console.log("show dialog");
                d.show();
            }
        }
    });
}
