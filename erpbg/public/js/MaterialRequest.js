/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Material Request", "onload_post_render", function (frm, cdt, cdn) {
    if(frm.doc.letter_head != "Dimela-Logo-Head") {
        cur_frm.set_value("letter_head", "Dimela-Logo-Head");
        cur_frm.set_value("taxes_and_charges", "Bulgaria VAT 20%");
        console.log(frm.doc.letter_head);
    }
});