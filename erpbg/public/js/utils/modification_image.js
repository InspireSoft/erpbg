

function modification_image(item) {
    if(item.divan_modification_link) {
        frappe.call({
            method: "erpbg.erpbg.doctype.item_modification.item_modification.get_modification",
            args: {
                "name": item.divan_modification_link
            },
            callback: function(r) {
                if(r.message)  {
                    mod = r.message;
                    item.divan_modification_image = mod.schematic;
                }
            }
        })
        cur_frm.set_df_property("divan_modification_image", "hidden", false);
    } else {
        cur_frm.set_df_property("divan_modification_image", "hidden", true);
    }
}