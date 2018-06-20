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
    } else {
        frm.doc.imagecopy = 0;
    }
}

function notes_on_refresh() {
    if(cur_frm.doc.notes && cur_frm.doc.notes.length>0) {
        cur_frm.doc.notes.forEach(function(note) {
            if(!note.cdn && note.iidx) {
                cur_frm.doc.notes[note.idx-1].cdn = cur_frm.doc.items[note.iidx-1].name;
                cur_frm.doc.notes[note.idx-1].iidx = "";
                cur_frm.refresh_field('notes');
            }
        });
    }
}

frappe.ui.form.on('Quotation Item', {
    items_remove: function(doc,cdt,cdn) {
        var nidx = -1;
        if(cur_frm.doc.notes && cur_frm.doc.notes.length>0) {
            cur_frm.doc.notes.forEach(function (note) {
                console.error(note);
                if (note.cdn == cdn) {
                    nidx = note.idx;
                }
            });
            if (nidx != -1) {
                cur_frm.get_field("notes").grid.grid_rows[nidx - 1].remove()
                cur_frm.refresh_field('notes');
            }
        }
    }
});

frappe.ui.form.on("Quotation Item", "item_code", function (frm, cdt, cdn) {

    // do nothing if code is not set:
    if(cur_frm.doctype != "Quotation" || !locals[cdt][cdn].item_code) {
        return;
    }

    // add item note to Quotation note:
    frappe.call({
        method: "erpbg.erpbg.quotation.get_item_note",
        args: { "item_code": locals[cdt][cdn].item_code },
        callback: function (r) {
            if (r.message) {

                var nidx = 1;
                if(cur_frm.doc.notes && cur_frm.doc.notes.length>0) {
                    cur_frm.doc.notes.forEach(function (notes) {
                        nidx++;
                    });
                }
                var child = cur_frm.add_child("notes");
                frappe.model.set_value(child.doctype, child.name, "note", r.message[0]["note"]);
                frappe.model.set_value(child.doctype, child.name, "iidx", locals[cdt][cdn].idx);
                cur_frm.save();
            }
        }
    });
});

function add_to_attachments(image) {
    var skipta = false;
    if(cur_frm.doc.quotation_attachment && cur_frm.doc.quotation_attachment.length>0) {
        cur_frm.doc.quotation_attachment.forEach(function (attachment) {
            if (attachment.name == image.name) {
                skipta = true;
            }
        });
    }
    if(!skipta) {
        var child = cur_frm.add_child("quotation_attachment");
        frappe.model.set_value(child.doctype, child.name, "attachment",image);
    }
}

frappe.ui.form.on("Quotation", "refresh", function (frm, cdt, cdn) {

    notes_on_refresh();

    if(cur_frm.doc.items && cur_frm.doc.items.length>0) {
        cur_frm.doc.items.forEach(function(item) {
            add_to_attachments(item.image);
        });
    }

    // focus not on first field (e-mail link):
    if(frm.doc.__islocal && !locals[cdt][cdn].customer) {
        cur_frm.get_field("customer").$input.focus();
    }

    if(frm.doc.__islocal || frm.doc.__islocal == 1) {
        cur_frm.set_value("itemimagecopy", 0);
    }

    // get images from e-mail:
    check_for_communication_images(frm);

    // hide attachments for unsaved documents:
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        cur_frm.set_df_property("quotation_attachment", "hidden", false);
        return;
    }
});

frappe.ui.form.on("Quotation", "onload_post_render", function (frm, cdt, cdn) {

    // link to e-mail:
    if(Quotation_From_Communication != null) {
        frm.doc.communicationlink = Quotation_From_Communication;
        Quotation_From_Communication = null;
    }
    // get images from e-mail:
    check_for_communication_images(frm);

    // set modification_image on Quotation item open window
    jQuery("div[data-fieldname='items'] span.octicon-triangle-down").click(function() {
        var a = jQuery(this).closest("div[data-idx]");
        cur_frm.doc.items.forEach(function(item) {
            if(item.name == a.attr("data-name")) {
                if(item.divan_modification_link) {
                    window.setTimeout(function() {
                        modification_image(locals[cdt][cdn]);
                    }, 500);
                }
            }
        });
    });

    // image editor (cropper):
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

    // hide attachments for unsaved documents:
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        cur_frm.set_df_property("quotation_attachment", "hidden", false);
        return;
    }

    cur_frm.set_value("itemimagecopy", 0);

    // Default values setters for new documents:

    if(!frm.doc.letter_head && frm.doc.letter_head != "Dimela-Info-Head") {
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
    }
    if(!frm.doc.taxes_and_charges && frm.doc.taxes_and_charges != "ДДС 20%") {
        cur_frm.set_value("taxes_and_charges", "ДДС 20%");
    }

    cur_frm.set_df_property("quotation_attachment", "hidden", true);

    var skippm = false;
    if(cur_frm.doc.payment_ways && cur_frm.doc.payment_ways.length>0) {
        cur_frm.doc.payment_ways.forEach(function(payment_ways) {
            if(!skippm && payment_ways.description) {
                skippm = True;
            }
        });
    }

    if(!skippm) {
        var child = frm.add_child("payment_ways");
        frappe.model.set_value(child.doctype, child.name, "description", "60% авансово плащане");

        var child = frm.add_child("payment_ways");
        frappe.model.set_value(child.doctype, child.name, "description", "40% при издаване на готово изделие");

        var child = frm.add_child("payment_ways");
        frappe.model.set_value(child.doctype, child.name, "description", "Банкова сметка на „Димела мебел”ООД:\nIBAN: BG55BPBI79421022579401\nБАНКА: Пощенска Банка\nБулстат: 204948360");
    }

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

frappe.ui.form.on("Quotation", "onload_post_render", item_query );
frappe.ui.form.on("Quotation", "refresh", item_query );