
function imageEditor(attachment) {

}

frappe.ui.form.on("Quotation Attachment", "attachment", function (frm, cdt, cdn) {
    frm.doc.filename = frm.doc.attachment.replace(/^.*[\\\/]/, '');
});