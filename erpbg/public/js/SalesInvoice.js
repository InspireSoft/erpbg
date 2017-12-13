/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Sales Invoice", "onload_post_render", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].letter_head != "Dimela-Logo-Head") {
        cur_frm.set_value("letter_head", "Dimela-Info-Head");
    }
    if(frm.doc.customer) {
        cur_frm.set_value("customer", frm.doc.customer);
    }
});