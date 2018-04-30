
function imageEditor(attachment) {

}

frappe.ui.form.on("Quotation Attachment", "attachment", function (frm, cdt, cdn) {
    frm[cdt][cdn].filename = frm[cdt][cdn].attachment.replace(/^.*[\\\/]/, '');
});