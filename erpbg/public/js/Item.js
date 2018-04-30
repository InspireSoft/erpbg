/**
 * Created by Simeon on 03-Jan-18.
 */
frappe.ui.form.on("Item", "onload_post_render", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Item", "divan_modification_link", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification != "") {
        modification_image(locals[cdt][cdn]);
    }
});

frappe.ui.form.on("Item", "refresh", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].name && locals[cdt][cdn].standard_rate) {
        frappe.call({
            method: "erpbg.erpbg.item.update_price_list",
            args: { "iname": locals[cdt][cdn].name, "iprice": locals[cdt][cdn].standard_rate },
            callback: function (r) {}
        });
    }
});

frappe.ui.form.on("Item", "cdescription", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});

frappe.ui.form.on("Item", "refresh", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});