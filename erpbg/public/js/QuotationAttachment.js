
function imageEditor(attachment) {

}

frappe.ui.form.on("Quotation Attachment", "attachment", function (frm, cdt, cdn) {
    frm.doc.filename = frm.doc.attachment.replace(/^.*[\\\/]/, '');
});

frappe.ui.form.on("Quotation", "quotation_attachment_add", function (frm, cdt, cdn) {
    frm.save();
});