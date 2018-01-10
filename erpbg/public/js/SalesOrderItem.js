frappe.ui.form.on("Sales Order Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        type_image(locals[cdt][cdn]);
    }
});