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
                if(item.divan_modification != "") {
                    window.setTimeout(function() {
                        type_image(item);
                    }, 500);
                }
            }
        });
    });
    if(frm.doc.letter_head != "Dimela-Info-Head") {
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
        cur_frm.set_value("taxes_and_charges", "ДДС 20%");
    }

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
});

frappe.ui.form.on("Quotation", "customer", function(frm, cdt, cdn){
    var name = "";
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
