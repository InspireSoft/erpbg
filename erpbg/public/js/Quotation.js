/**
 * Created by Simeon on 21-Nov-17.
 */

function check_for_communication_images(frm) {
    if((!frm.doc.__islocal || frm.doc.__islocal == 0) && frm.doc.status && (frm.doc.status == 0 || frm.doc.status == "Draft")&& frm.doc.communicationlink && frm.doc.imagecopy == 0) {
        frm.doc.imagecopy = 1;
        frappe.call({
            method: "erpbg.erpbg.quotation.copy_attachments",
            args: { "qname": frm.doc.name, "communicationlink": frm.doc.communicationlink },
            callback: function (r) {
                if (r.message == "None") {
                } else if (r.message !== undefined) {
                    r.message.forEach(function(attachment){
                        frm.attachments.update_attachment(attachment);
                    });
                    frm.save();
                }
            }
        });
    }
}

frappe.ui.form.on("Quotation Item", "item_code", function (frm, cdt, cdn) {
    if(cur_frm.doctype != "Quotation" || !locals[cdt][cdn].item_code) {
        return;
    }
    frappe.call({
        method: "erpbg.erpbg.quotation.get_item_note",
        args: { "item_code": locals[cdt][cdn].item_code },
        callback: function (r) {
            if (r.message !== undefined && r.message!=="") {
                if(!frm.doc.note) {
                    cur_frm.set_value("note", r.message[0]["note"]);
                } else {
                    cur_frm.set_value("note", frm.doc.note + "<br/>" + r.message[0]["note"]);
                }
            }
        }
    });
});

frappe.ui.form.on("Quotation", "refresh", function (frm, cdt, cdn) {

    if(frm.doc.__islocal && !locals[cdt][cdn].customer) {
        cur_frm.get_field("customer").$input.focus();
    }

    if((!frm.doc.__islocal || frm.doc.__islocal == 0) && frm.doc.itemimagecopy == 0) {
        cur_frm.doc.items.forEach(function(item) {
            if(item.image) {
                var skip = false;
                cur_frm.doc.quotation_attachment.forEach(function(attachment) {
                    if(attachment.name == item.image.name) {
                        skip = true;
                    }
                });
                if(!skip) {
                    var child = cur_frm.add_child("quotation_attachment");
                    frappe.model.set_value(child.doctype, child.name, "attachment", item.image);
                    cur_frm.refresh();
                }
            }
        });
        cur_frm.set_value("itemimagecopy", 1);
    }

    check_for_communication_images(frm);
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        cur_frm.set_df_property("quotation_attachment", "hidden", false);
        return;
    }
});


frappe.ui.form.on("Quotation", "onload_post_render", function (frm, cdt, cdn) {

    if(Quotation_From_Communication != null) {
        frm.doc.communicationlink = Quotation_From_Communication;
        Quotation_From_Communication = null;
    }
    check_for_communication_images(frm);
    jQuery("div[data-fieldname='items'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        cur_frm.doc.items.forEach(function(item) {
            if(item.name == a.attr("data-name")) {
                if(item.divan_modification_link != "") {
                    window.setTimeout(function() {
                        modification_image(locals[cdt][cdn]);
                    }, 500);
                }
            }
        });
    });
    jQuery("div[data-fieldname='quotation_attachment'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        cur_frm.doc.quotation_attachment.forEach(function(attachment) {
            if(attachment.name == a.attr("data-name")) {
                if(attachment.attachment != "") {
                    window.setTimeout(function() {
                        imageEditor(attachment);
                    }, 500);
                }
            }
        });
    });

    if(!frm.doc.letter_head && frm.doc.letter_head != "Dimela-Info-Head") {
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
    }
    if(!frm.doc.taxes_and_charges && frm.doc.taxes_and_charges != "ДДС 20%") {
        cur_frm.set_value("taxes_and_charges", "ДДС 20%");
    }
    frm.refresh();

    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        cur_frm.set_df_property("quotation_attachment", "hidden", false);
        return;
    }

    cur_frm.set_df_property("quotation_attachment", "hidden", true);

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "50% авансово плащане");

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "50% при издаване на готово изделие");

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "Банкова сметка на „Димела мебел”ООД:\nIBAN: BG55BPBI79421022579401\nБАНКА: Пощенска Банка\nБулстат: 204948360");

    frm.refresh();
});

frappe.ui.form.on("Quotation", "customer", function(frm, cdt, cdn){
    var name = "";
    if(!locals[cdt][cdn].customer) {
        return;
    }
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        name = locals[cdt][cdn].name;
    }
    frappe.call({
        method: "erpbg.erpbg.quotation.generate_custom_number",
        args: { "qname": name, "customer": locals[cdt][cdn].customer },
        callback: function (r) {
            if (r.message !== undefined) {
                cur_frm.set_value("cnumber", r.message);
            }
        }
    });
});

frappe.ui.form.on("Quotation", "cnumber", function(frm, cdt, cdn){
    console.log(frm.doc);
    frm.doc.title = frm.doc.cnumber;
});