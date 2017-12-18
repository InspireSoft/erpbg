/**
 * Created by Simeon on 21-Nov-17.
 */
frappe.ui.form.on("Production Order", "divan_modification", function (frm, cdt, cdn) {
    type_image(locals[cdt][cdn]);
});
frappe.ui.form.on("Production Order", "onload_post_render", function (frm, cdt, cdn) {
    doc = locals[cdt][cdn]
    if(doc.sales_order) {
        soi =  frappe.db.sql("SELECT * FROM `tabSales Order Item` WHERE `item_name`='"+mrss(doc.production_item)+"' `parent`='"+mrss(doc.sales_order)+"'")
        if(soi.type != doc.type) {
            doc.type = soi.type;
            doc.divan_modification = soi.divan_modification;
            doc.divan_modification_image = soi.divan_modification_image;
            doc.pulnej = soi.pulnej;
            doc.dulbo4ina_sedalka = soi.dulbo4ina_sedalka;
            doc.gabarit_6irina = soi.gabarit_6irina;
            doc.gabarit_viso4ina = soi.gabarit_viso4ina;
            doc.gabarit_dulbo4ina = soi.gabarit_dulbo4ina;
            doc.grub_viso4ina = soi.grub_viso4ina;
            doc.dulbo4ina_na_sqdane = soi.dulbo4ina_na_sqdane;
            doc.oblegalka_6irina_gore = soi.oblegalka_6irina_gore;
            doc.oblegalka_6irina_dolu = soi.oblegalka_6irina_dolu;
            doc.oblegalka_ugul = soi.oblegalka_ugul;
            doc.grub_6irina = soi.grub_6irina;
            doc.tabla_or_vuzglavnica_model = soi.tabla_or_vuzglavnica_model;
            doc.spalnq = soi.spalnq;
            doc.tabla = soi.tabla;
            doc.cargi = soi.cargi;
            doc.tapicirane_na_gotovi_konstrukcii = soi.tapicirane_na_gotovi_konstrukcii;
            doc.tabla_razmeri = soi.tabla_razmeri;
            doc.cagari_h = soi.cagari_h;
            doc.cagari_d = soi.cagari_d;
            doc.dve_g_obrazni = soi.dve_g_obrazni;
            doc.edna_p_obrazna = soi.edna_p_obrazna;
            doc.three = soi.three;
            doc.separate = soi.separate;
            doc.size_matrac = soi.size_matrac;
            doc.thinkness_matrac = soi.thinkness_matrac;
            doc.height_sitting = soi.height_sitting;
            doc.sinking_matrac = soi.sinking_matrac;
            doc.under_matric_by_dimela = soi.under_matric_by_dimela;
            doc.under_matric_order = soi.under_matric_order;
            doc.under_matric_metal = soi.under_matric_metal;
            doc.under_matric_wood = soi.under_matric_wood;
            doc.with_mechanics_for_lifting = soi.with_mechanics_for_lifting;
            doc.under_matric_no_mechanic = soi.under_matric_no_mechanic;
            doc.inner_base_by_dimela = soi.inner_base_by_dimela;
            doc.inner_no_mechanic = soi.inner_no_mechanic;
            doc.inner_mechanic = soi.inner_mechanic;
            doc.damaska = soi.damaska;
            doc.estestvena_koja = soi.estestvena_koja;
            doc.eco_koja = soi.eco_koja;

            doc.collection_1 = soi.collection_1;
            doc.name_1 = soi.name_1;
            doc.purpose_1 = soi.purpose_1;
            doc.supplier_1 = soi.supplier_1;
            doc.color_1 = soi.color_1;
            doc.quantity_1 = soi.quantity_1;

            doc.collection_2 = soi.collection_2;
            doc.name_2 = soi.name_2;
            doc.purpose_2 = soi.purpose_2;
            doc.supplier_2 = soi.supplier_2;
            doc.color_2 = soi.color_2;
            doc.quantity_2 = soi.quantity_2;

            doc.collection_3 = soi.collection_3;
            doc.name_3 = soi.name_3;
            doc.purpose_3 = soi.purpose_3;
            doc.supplier_3 = soi.supplier_3;
            doc.color_3 = soi.color_3;
            doc.quantity_3 = soi.quantity_3;

            doc.divan_pillow_collection_1 = soi.divan_pillow_collection_1;
            doc.divan_pcollection_1_name = soi.divan_pcollection_1_name;
            doc.divan_pcollection_1_size = soi.divan_pcollection_1_size;
            doc.divan_pcollection_1_number = soi.divan_pcollection_1_number;
            doc.divan_pcollection_1_supplier = soi.divan_pcollection_1_supplier;
            doc.divan_pcollection_1_damaska_color = soi.divan_pcollection_1_damaska_color;
            doc.divan_pcollection_1_quantity = soi.divan_pcollection_1_quantity;

            doc.divan_pillow_collection_2 = soi.divan_pillow_collection_2;
            doc.divan_pcollection_2_name = soi.divan_pcollection_2_name;
            doc.divan_pcollection_2_size = soi.divan_pcollection_2_size;
            doc.divan_pcollection_2_number = soi.divan_pcollection_2_number;
            doc.divan_pcollection_2_supplier = soi.divan_pcollection_2_supplier;
            doc.divan_pcollection_2_damaska_color = soi.divan_pcollection_2_damaska_color;
            doc.divan_pcollection_2_quantity = soi.divan_pcollection_2_quantity;

            doc.divan_pillow_collection_3 = soi.divan_pillow_collection_3;
            doc.divan_pcollection_3_name = soi.divan_pcollection_3_name;
            doc.divan_pcollection_3_size = soi.divan_pcollection_3_size;
            doc.divan_pcollection_3_number = soi.divan_pcollection_3_number;
            doc.divan_pcollection_3_supplier = soi.divan_pcollection_3_supplier;
            doc.divan_pcollection_3_damaska_color = soi.divan_pcollection_3_damaska_color;
            doc.divan_pcollection_3_quantity = soi.divan_pcollection_3_quantity;

            doc.divan_legs_color = soi.divan_legs_color;
            doc.divan_legs_number = soi.divan_legs_number;
            doc.divan_legs_other = soi.divan_legs_other;
            doc.divan_mechanic = soi.divan_mechanic;
            doc.divan_mechanics_others = soi.divan_mechanics_others;
            doc.divan_mechanics_others = soi.divan_mechanics_others;
        }
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