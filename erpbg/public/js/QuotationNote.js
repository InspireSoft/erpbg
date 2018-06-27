// Quotation Note

frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
    console.error(frm);
    frm.doc.note_view = stripHtml(frm.doc.note);
    frm.refresh_field('note_view');
});