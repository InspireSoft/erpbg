/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Material Request", "onload_post_render", function (frm, cdt, cdn) {
    if(frm.doc.letter_head != "Dimela-Logo-Head") {
        cur_frm.set_value("letter_head", "Dimela-Logo-Head");
    }
});

frappe.ui.form.on("Material Request Item", "onload_post_render", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Material Request Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});