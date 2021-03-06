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
    cur_frm.set_df_property("quotation_attachment", "hidden", true);
    if((!frm.doc.__islocal || frm.doc.__islocal == 0) && locals[cdt][cdn].name && locals[cdt][cdn].standard_rate) {
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
    if((frm.doc.__islocal || frm.doc.__islocal == 0) && locals[cdt][cdn].item_code == 1) {
        var doc = locals[cdt][cdn];
        frappe.call({
            method: "erpbg.erpbg.item.generate_code",
            callback: function (r) {
                if(r.message) {
                    cur_frm.set_value("item_code", r.message);
                    cur_frm.set_value("item_name", "Име");
                }
            }
        });
    }
});


frappe.ui.form.on("Item", "onload_post_render", function (frm, cdt, cdn) {
    cur_frm.set_df_property("quotation_attachment", "hidden", true);
    if((frm.doc.__islocal || frm.doc.__islocal == 0) && locals[cdt][cdn].item_code == 1) {
        var doc = locals[cdt][cdn];
        frappe.call({
            method: "erpbg.erpbg.item.generate_code",
            callback: function (r) {
                if(r.message) {
                    cur_frm.set_value("item_code", r.message);
                    cur_frm.set_value("item_name", "Име");
                }
            }
        });
    }
    if(!locals[cdt][cdn].cdescription) {
        cur_frm.set_value("cdescription", " ");
    }
    if(!locals[cdt][cdn].note) {
        cur_frm.set_value("note", " ");
    }
    if(!locals[cdt][cdn].item_private_calculations) {
        cur_frm.set_value("item_private_calculations", " ");
    }
});