frappe.ui.form.on("Sales Invoice Item", "divan_modification_link", function (frm, cdt, cdn) {
    if(locals[cdt][cdn].divan_modification_link != "") {
        modification_image(locals[cdt][cdn]);
    }
});


frappe.ui.form.on("Sales Invoice Item", "cdescription", function (frm, cdt, cdn) {
    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});


frappe.ui.form.on("Sales Invoice Item", "refresh", function (frm, cdt, cdn) {

    cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(doc, cdt, cdn) {
        return {query: "erpbg.erpbg.item_query"}
    }

    locals[cdt][cdn].description = locals[cdt][cdn].cdescription;
});


frappe.ui.form.on("Sales Invoice Item", "onload_post_render", function (frm, cdt, cdn) {

    cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(doc, cdt, cdn) {
        return {query: "erpbg.erpbg.item_query"}
    }
});