

function modification_image(item) {
    if(item.divan_modification_link) {
        frappe.call({
            method: "erpbg.erpbg.doctype.item_modification.item_modification.get_modification_image",
            args: {
                "name": item.divan_modification_link
            },
            callback: function(r) {
                if(r.message)  {
                    cur_frm.set_df_property('divan_modification_image', 'options', [r.message.file_url]);
                    cur_frm.set_df_property("divan_modification_image", "hidden", false);
                    cur_frm.refresh_field('divan_modification_image');
                }
            }
        })
    } else {
        cur_frm.set_df_property("divan_modification_image", "hidden", true);
        cur_frm.refresh_field('divan_modification_image');
    }
}