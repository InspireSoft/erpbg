/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Sales Invoice", "onload_post_render", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].letter_head != "Dimela-Logo-Head") {
        locals[cdt][cdn].letter_head = "Dimela-Logo-Head";
    }
});