/**
 * Created by Simeon on 4-Dec-17.
 */
frappe.ui.form.on("Quotation Item", "divan_modification", function (frm, cdt, cdn) {
    console.log("http://test.aes-systems.de:8003/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png");
    cur_frm.set_df_property('website_image', 'options', "http://test.aes-systems.de:8003/private/files/divan_"+(locals[cdt][cdn].divan_modification.replace("L/20","L20").replace("R/20","R20").replace(" ","_"))+".png");
    refresh_field('items');
});