/**
 * Created by gameReseter on 5/31/2018.
 */

function imageEditor(attachment) {

}

frappe.ui.form.on("Sales Order Attachment", "refresh", function (frm, cdt, cdn) {
    frm.set_df_property("has_file", "hidden", true);
});