// Quotation Note


frappe.ui.form.on("Quotation Note", "Quotation Note", function (frm, cdt, cdn) {
    frappe.model.set_value("Quotation Note", cdn, "note_view", jQuery(frm[cdt][cdn].note).text());
});



frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
    frappe.model.set_value("Quotation Note", cdn, "note_view", jQuery(frm[cdt][cdn].note).text());
});