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
    if(doc.docstatus==1) {
        if(doc.status != 'Closed') {
            this.frm.add_custom_button(
                __('BOM'),
                function() { make_bom(frm) }, __("Make")
            );
        }
    }
});


make_bom(frm) {
    frappe.call({
        method: 'erpbg.erpbg.sales_order.get_bom_items',
        args: { "doc": frm.doc },
        callback: function(r) {
            if(!r.message.every(function(d) { return !!d.pending_qty })) {
                frappe.msgprint({
                    title: __('BOM not created'),
                    message: __('BOM already created for all items'),
                    indicator: 'orange'
                });
                return;
            } else {
                var fields = [
                    {fieldtype:'Table', fieldname: 'items',
                        description: __('Select BOM and Qty for Production'),
                        fields: [
                            {fieldtype:'Read Only', fieldname:'item_code',
                                label: __('Item Code'), in_list_view:1},
                            {fieldtype:'Link', fieldname:'bom', options: 'BOM', reqd: 1,
                                label: __('Select BOM'), in_list_view:1, get_query: function(doc) {
                                    return {filters: {item: doc.item_code}};
                                }},
                            {fieldtype:'Float', fieldname:'pending_qty', reqd: 1,
                                label: __('Qty'), in_list_view:1},
                        ],
                        get_data: function() {
                            return r.message
                        }
                    }
                ]
                var d = new frappe.ui.Dialog({
                    title: __('Select Items to Manufacture'),
                    fields: fields,
                    primary_action: function() {
                        var data = d.get_values();
                        frappe.call({
                            method: 'erpbg.erpbg.sales_order.make_boms',
                            args: {
                                items: data,
                                company: me.frm.doc.company,
                                sales_order: me.frm.docname,
                                project: me.frm.project
                            },
                            freeze: true,
                            callback: function(r) {
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
