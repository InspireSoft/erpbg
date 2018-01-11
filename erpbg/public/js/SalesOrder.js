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
            if(r.message && !r.message.every( function(d) { return !!d.pending_qty } )) {
                frappe.msgprint({
                    title: __('BOM not created'),
                    message: __('BOM already created for all items'),
                    indicator: 'orange'
                });
                return;
            } else {
                var d = new frappe.ui.Dialog({
                    title: __('Select Items to create BOMs'),
                    fields: [{
                        fieldtype:'Table',
                        fieldname: 'items',
                        description: __('Select Items and Qty for BOMs'),
                        fields: [
                            {
                                fieldtype:'Read Only',
                                fieldname:'item_code',
                                label: __('Item Code'),
                                in_list_view:1
                            },
                            {
                                fieldtype:'Float',
                                fieldname:'qty',
                                reqd: 1,
                                label: __('Qty'),
                                in_list_view:1
                            }
                        ],
                        get_data: function() {
                            var items_without_bom = [];
                            doc.items.forEach(function(entry) {
                                if(!r.message) {
                                    items_without_bom.push(entry);
                                } else {
                                    var hasBom = false;
                                    r.message.forEach(function(bom_entry){
                                        hasBom = hasBom || bom_entry.item_code == entry.item_code;
                                    });
                                    if(!hasBom) {
                                        items_without_bom.push(entry);
                                    }
                                }
                            });
                            if(items_without_bom.lenght <= 0) {
                                d.hide();
                                frappe.msgprint({
                                    title: __('BOM not created'),
                                    message: __('No Items avaliable for BOM'),
                                    indicator: 'orange'
                                });
                            }
                            return items_without_bom
                        }
                    }],
                    primary_action: function() {
                        var data = d.get_values();
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
                                console.log(r);
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
                d.show();
            }
        }
    });
}
