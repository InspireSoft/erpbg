/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Quotation", "onload_post_render", function (frm, cdt, cdn) {
    if(!frm.doc.__islocal || frm.doc.__islocal == 0 || !frm.doc.__unsaved || frm.doc.__unsaved == 0) {
        return;
    }

    var doc = locals[cdt][cdn];
    doc.letter_head = "Dimela-Quotation-Head";
    frm.refresh_field("letter_head");

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "50% авансово плащане");

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "50% при издаване на готово изделие");

    var child = frm.add_child("payment_ways");
    frappe.model.set_value(child.doctype, child.name, "description", "Банкова сметка на „Димела Дизайн”ООД:\nIBAN: BG71BPBI79421020455201\nБАНКА: Пощенска Банка\nБулстат: 175278203");

    frm.refresh_field("payment_ways");
});