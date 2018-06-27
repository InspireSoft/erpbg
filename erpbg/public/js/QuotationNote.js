// Quotation Note

frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
console.log(frm);
    frm.doc.note_view = jQuery(frm[cdt][cdn].note).text();
    frm.refresh_field('note_view');
});