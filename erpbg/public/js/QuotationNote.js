// Quotation Note

frappe.ui.form.on("Quotation Note", "note", function (frm, cdt, cdn) {
    cur_frm.doc.notes.forEach(function(note2) {
        if(note2.name == cdn) {
            cur_frm.doc.notes[note2.idx-1].note_view = stripHtml(note2.note);
        }
    });
    frm.refresh_field('notes');
});