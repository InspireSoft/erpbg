

function item_query(frm, cdt, cdn) {
    cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(doc, cdt, cdn) {
        return {query: "erpbg.erpbg.item_query"}
    }
}