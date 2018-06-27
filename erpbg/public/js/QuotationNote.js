// Quotation Note


frappe.ui.form.on("Quotation Note", "onload_post_render", function (frm, cdt, cdn) {
    if(frm.doc.docstatus == 1 || frm.doc.status == 'Closed' || !frm.doc.items || frm.doc.items.length <= 0) {
        // saved / canceled doc protection
        return;
    }
    frm.doc.note_view = jQuery(frm[cdt][cdn].note).text();
    frm.refresh_field('note_view');
});



frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
console.log(frm);
    frm.doc.note_view = jQuery(frm[cdt][cdn].note).text();
    frm.refresh_field('note_view');
});