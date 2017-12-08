/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    locals[cdt][cdn].divan_modification_image = "/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png";
});