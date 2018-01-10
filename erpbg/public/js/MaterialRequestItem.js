/**
 * Created by Simeon on 19-Dec-17.
 */
frappe.ui.form.on("Material Request Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});