
function imageEditor(attachment) {

}

frappe.ui.form.on("Quotation Attachment", "refresh", function (frm, cdt, cdn) {
    frm.set_df_property("has_file", "hidden", true);
});