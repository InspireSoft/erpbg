// Quotation Note

frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
console.log(frm);
    frm.doc.note_view = stripHtml(frm[cdt][cdn].note);
    frm.refresh_field('note_view');
});