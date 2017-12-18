/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Production Order", "divan_modification", function (frm, cdt, cdn) {
    type_image(locals[cdt][cdn]);
});
frappe.ui.form.on("Production Order", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn]
    if(doc.sales_order) {
        frappe.call({
            method: "erpbg.erpbg.production_order.get_sales_order_item",
            args: { "item_name": doc.production_item, "sales_order": doc.sales_order },
            callback: function(r) {
                if(r.message)  {
                    console.log(r.message);
                    soi = r.message;
                    if(soi.type != doc.type) {
                        cur_frm.set_value("type", soi.type);
                        cur_frm.set_value("divan_modification", soi.divan_modification);
                        cur_frm.set_value("divan_modification_image", soi.divan_modification_image);
                        cur_frm.set_value("pulnej", soi.pulnej);
                        cur_frm.set_value("dulbo4ina_sedalka", soi.dulbo4ina_sedalka);
                        cur_frm.set_value("gabarit_6irina", soi.gabarit_6irina);
                        cur_frm.set_value("gabarit_viso4ina", soi.gabarit_viso4ina);
                        cur_frm.set_value("gabarit_dulbo4ina", soi.gabarit_dulbo4ina);
                        cur_frm.set_value("grub_viso4ina", soi.grub_viso4ina);
                        cur_frm.set_value("dulbo4ina_na_sqdane", soi.dulbo4ina_na_sqdane);
                        cur_frm.set_value("oblegalka_6irina_gore", soi.oblegalka_6irina_gore);
                        cur_frm.set_value("oblegalka_6irina_dolu", soi.oblegalka_6irina_dolu);
                        cur_frm.set_value("oblegalka_ugul", soi.oblegalka_ugul);
                        cur_frm.set_value("grub_6irina," soi.grub_6irina);
                        cur_frm.set_value("tabla_or_vuzglavnica_model", soi.tabla_or_vuzglavnica_model);
                        cur_frm.set_value("spalnq", soi.spalnq);
                        cur_frm.set_value("tabla", soi.tabla);
                        cur_frm.set_value("cargi", soi.cargi);
                        cur_frm.set_value("tapicirane_na_gotovi_konstrukcii", soi.tapicirane_na_gotovi_konstrukcii);
                        cur_frm.set_value("tabla_razmeri", soi.tabla_razmeri);
                        cur_frm.set_value("cagari_h", soi.cagari_h);
                        cur_frm.set_value("cagari_d", soi.cagari_d);
                        cur_frm.set_value("dve_g_obrazni", soi.dve_g_obrazni);
                        cur_frm.set_value("edna_p_obrazna", soi.edna_p_obrazna);
                        cur_frm.set_value("three", soi.three);
                        cur_frm.set_value("separate", soi.separate);
                        cur_frm.set_value("size_matrac", soi.size_matrac);
                        cur_frm.set_value("thinkness_matrac", soi.thinkness_matrac);
                        cur_frm.set_value("height_sitting", soi.height_sitting);
                        cur_frm.set_value("sinking_matrac", soi.sinking_matrac);
                        cur_frm.set_value("under_matric_by_dimela", soi.under_matric_by_dimela);
                        cur_frm.set_value("under_matric_order", soi.under_matric_order);
                        cur_frm.set_value("under_matric_metal", soi.under_matric_metal);
                        cur_frm.set_value("under_matric_wood", soi.under_matric_wood);
                        cur_frm.set_value("with_mechanics_for_lifting", soi.with_mechanics_for_lifting);
                        cur_frm.set_value("under_matric_no_mechanic", soi.under_matric_no_mechanic);
                        cur_frm.set_value("inner_base_by_dimela", soi.inner_base_by_dimela);
                        cur_frm.set_value("inner_no_mechanic", soi.inner_no_mechanic);
                        cur_frm.set_value("inner_mechanic", soi.inner_mechanic);
                        cur_frm.set_value("damaska", soi.damaska);
                        cur_frm.set_value("estestvena_koja", soi.estestvena_koja);
                        cur_frm.set_value("eco_koja", soi.eco_koja);

                        cur_frm.set_value("collection_1", soi.collection_1);
                        cur_frm.set_value("name_1", soi.name_1);
                        cur_frm.set_value("purpose_1", soi.purpose_1);
                        cur_frm.set_value("supplier_1", soi.supplier_1);
                        cur_frm.set_value("color_1", soi.color_1);
                        cur_frm.set_value("quantity_1", soi.quantity_1);

                        cur_frm.set_value("collection_2", soi.collection_2);
                        cur_frm.set_value("name_2", soi.name_2);
                        cur_frm.set_value("purpose_2", soi.purpose_2);
                        cur_frm.set_value("supplier_2", soi.supplier_2);
                        cur_frm.set_value("color_2", soi.color_2);
                        cur_frm.set_value("quantity_2", soi.quantity_2);

                        cur_frm.set_value("collection_3", soi.collection_3);
                        cur_frm.set_value("name_3", soi.name_3);
                        cur_frm.set_value("purpose_3", soi.purpose_3);
                        cur_frm.set_value("supplier_3", soi.supplier_3);
                        cur_frm.set_value("color_3", soi.color_3);
                        cur_frm.set_value("quantity_3", soi.quantity_3);

                        cur_frm.set_value("divan_pillow_collection_1", soi.divan_pillow_collection_1);
                        cur_frm.set_value("divan_pcollection_1_name", soi.divan_pcollection_1_name);
                        cur_frm.set_value("divan_pcollection_1_size", soi.divan_pcollection_1_size);
                        cur_frm.set_value("divan_pcollection_1_number", soi.divan_pcollection_1_number);
                        cur_frm.set_value("divan_pcollection_1_supplier", soi.divan_pcollection_1_supplier);
                        cur_frm.set_value("divan_pcollection_1_damaska_color", soi.divan_pcollection_1_damaska_color);
                        cur_frm.set_value("divan_pcollection_1_quantity", soi.divan_pcollection_1_quantity);

                        cur_frm.set_value("divan_pillow_collection_2", soi.divan_pillow_collection_2);
                        cur_frm.set_value("divan_pcollection_2_name", soi.divan_pcollection_2_name);
                        cur_frm.set_value("divan_pcollection_2_size", soi.divan_pcollection_2_size);
                        cur_frm.set_value("divan_pcollection_2_number", soi.divan_pcollection_2_number);
                        cur_frm.set_value("divan_pcollection_2_supplier", soi.divan_pcollection_2_supplier);
                        cur_frm.set_value("divan_pcollection_2_damaska_color", soi.divan_pcollection_2_damaska_color);
                        cur_frm.set_value("divan_pcollection_2_quantity", soi.divan_pcollection_2_quantity);

                        cur_frm.set_value("divan_pillow_collection_3", soi.divan_pillow_collection_3);
                        cur_frm.set_value("divan_pcollection_3_name", soi.divan_pcollection_3_name);
                        cur_frm.set_value("divan_pcollection_3_size", soi.divan_pcollection_3_size);
                        cur_frm.set_value("divan_pcollection_3_number", soi.divan_pcollection_3_number);
                        cur_frm.set_value("divan_pcollection_3_supplier", soi.divan_pcollection_3_supplier);
                        cur_frm.set_value("divan_pcollection_3_damaska_color", soi.divan_pcollection_3_damaska_color);
                        cur_frm.set_value("divan_pcollection_3_quantity", soi.divan_pcollection_3_quantity);

                        cur_frm.set_value("divan_legs_color", soi.divan_legs_color);
                        cur_frm.set_value("divan_legs_number", soi.divan_legs_number);
                        cur_frm.set_value("divan_legs_other", soi.divan_legs_other);
                        cur_frm.set_value("divan_mechanic", soi.divan_mechanic);
                        cur_frm.set_value("divan_mechanics_others", soi.divan_mechanics_others);
                        cur_frm.set_value("divan_mechanics_others", soi.divan_mechanics_others);
                    }
                }
            }
        })
    }
});

function mrss (str) {
    return str.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
        switch (s) {
          case "\0":
            return "\\0";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "\b":
            return "\\b";
          case "\t":
            return "\\t";
          case "\x1a":
            return "\\Z";
          case "'":
            return "''";
          case '"':
            return '""';
          default:
            return "\\" + s;
        }
    });
}