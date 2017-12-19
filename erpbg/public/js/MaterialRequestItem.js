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