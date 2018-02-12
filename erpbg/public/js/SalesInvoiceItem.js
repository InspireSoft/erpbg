frappe.ui.form.on("Sales Invoice Item", "divan_modification", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    }
});