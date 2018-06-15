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
                        modification_image(locals[cdt][cdn]);
                    }, 500);
                }
            }
        });
    });

    if((!frm.doc.__islocal || frm.doc.__islocal == 0) && frm.doc.docstatus == 0) {
        if(frm.doc.copied_attachments == 0 && frm.doc.items && frm.doc.items.length > 0 && frm.doc.items[0].prevdoc_docname) {
            frappe.call({
                method: 'erpbg.erpbg.sales_order.get_attachments_of_quotation',
                args: {
                    "quotation_name": frm.doc.items[0].prevdoc_docname,
                    "sales_order_name": frm.doc.name
                },
                callback: function(r) {
                    if(r.message) {
                        r.message.forEach(function(attachment){
                            frm.attachments.update_attachment(attachment);
                        });
                        frm.refresh();
                    }
                }
            });
            frappe.call({
                method: 'erpbg.erpbg.sales_order.copy_quotation_attachments',
                args: {
                    "quotation_name": frm.doc.items[0].prevdoc_docname,
                    "sales_order_name": frm.doc.name
                },
                callback: function(r) {
                    frm.refresh();
                }
            });
            frappe.model.set_value(cdt, cdn, "copied_attachments", 1);
            frm.save();
        }
    }

    if(frm.doc.docstatus == 1) {
        cur_frm.set_df_property("sales_order_attachment", "hidden", false);
    } else {
        cur_frm.set_df_property("sales_order_attachment", "hidden", true);
    }
});


frappe.ui.form.on("Sales Order", "refresh", function (frm, cdt, cdn) {
    if(frm.doc.docstatus == 1) {
        if(frm.doc.status != 'Closed') {
            frm.add_custom_button(
                __('BOM'),
                function() { make_bom(locals[cdt][cdn]) }, __("Make")
            );
        }
    }
    if(frm.doc.docstatus == 1) {
        cur_frm.set_df_property("sales_order_attachment", "hidden", false);
        return;
    }

    if((!frm.doc.__islocal || frm.doc.__islocal == 0) && frm.doc.itemimagecopy == 0) {
        var added = [];
        cur_frm.doc.items.forEach(function(item) {
            if(item.image) {
                var skip = false;
                cur_frm.doc.sales_order_attachment.forEach(function(attachment) {
                    if(attachment.name == item.image.name) {
                        skip = true;
                    }
                });
                added.forEach(function(added){
                    if(added.name == item.image.name) {
                        skip = true;
                    }
                });
                if(!skip) {
                    added.push(item.image);
                    var child = cur_frm.add_child("sales_order_attachment");
                    frappe.model.set_value(child.doctype, child.name, "attachment", item.image);
                    cur_frm.refresh();
                }
            }
        });
        cur_frm.set_value("itemimagecopy", 1);
    }

    if(frm.doc.docstatus == 1) {
        cur_frm.set_df_property("sales_order_attachment", "hidden", false);
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


var custom_button_attached_handler = function(wrapper) {
    if(frappe.pages["List/Sales Order"] !== undefined && frappe.pages["List/Sales Order"].list_view !== undefined && frappe.pages["List/Sales Order"].list_view.page !== undefined) {
        frappe.pages["List/Sales Order"].list_view.page.add_menu_item(__("Make Report"), function() {
            if(frappe.pages["List/Sales Order"].list_view.get_checked_items().length > 0) {
                var me = frappe.pages["List/Sales Order"].list_view;
                var url = "/?names=[";
                var separator = false;
                frappe.pages["List/Sales Order"].list_view.get_checked_items().forEach(function(doc){
                    if(separator) {
                        url += ",";
                    }
                    separator = true;
                    url += "\""+doc.name+"\"";
                });
                url += "]&cmd=erpbg.erpbg.sales_order.make_report";
                window.open(url);
            } else {
                frappe.msgprint(__("No selected Sales Orders to make Report!"));
            }
        });
        jQuery(document).unbind("ajaxComplete", custom_button_attached_handler);
    }
};
jQuery(document).bind("ajaxComplete", custom_button_attached_handler);
