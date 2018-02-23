/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Quotation", "refresh", function (frm, cdt, cdn) {
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        cur_frm.set_df_property("quotation_attachment", "hidden", false);
        return;
    }
});


frappe.ui.form.on("Quotation", "onload_post_render", function (frm, cdt, cdn) {
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
    frappe.model.set_value(child.doctype, child.name, "description", "Банкова сметка на „Димела Дизайн”ООД:\nIBAN: BG71BPBI79421020455201\nБАНКА: Пощенска Банка\nБулстат: 175278203");

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

    if(!frm.doc.letter_head && frm.doc.letter_head != "Dimela-Info-Head") {
        frm.doc.letter_head = "Dimela-Info-Head"
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
    }
    if(!frm.doc.taxes_and_charges && frm.doc.taxes_and_charges != "ДДС 20%") {
        frm.doc.taxes_and_charges = "ДДС 20%";
        cur_frm.set_value("taxes_and_charges", "ДДС 20%");
    }
    frm.refresh();
});
