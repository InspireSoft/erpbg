

function set_values_from_item(cdt, cdn, item) {

    // headers

    frappe.model.set_value(cdt, cdn, "type", item.type);
    frappe.model.set_value(cdt, cdn, "divan_modification_link", item.divan_modification_link);
    frappe.model.set_value(cdt, cdn, "divan_modification_image", item.divan_modification_image);
    frappe.model.set_value(cdt, cdn, "note", item.note);
    frappe.model.set_value(cdt, cdn, "cdescription", item.cdescription);
    frappe.model.set_value(cdt, cdn, "description", item.cdescription);
    frappe.model.set_value(cdt, cdn, "pulnej", item.pulnej);
    frappe.model.set_value(cdt, cdn, "item_private_calculations", item.item_private_calculations);

    // damaska / eko koja / estestvena koja

    frappe.model.set_value(cdt, cdn, "damaska", item.damaska);
    frappe.model.set_value(cdt, cdn, "seeable_back", item.seeable_back);
    frappe.model.set_value(cdt, cdn, "estestvena_koja", item.estestvena_koja);
    frappe.model.set_value(cdt, cdn, "eco_koja", item.eco_koja);

    frappe.model.set_value(cdt, cdn, "collection_1", item.collection_1);
    frappe.model.set_value(cdt, cdn, "supplier_1", item.supplier_1);
    frappe.model.set_value(cdt, cdn, "name_1", item.name_1);
    frappe.model.set_value(cdt, cdn, "design_1", item.design_1);
    frappe.model.set_value(cdt, cdn, "color_1", item.color_1);
    frappe.model.set_value(cdt, cdn, "purpose_1", item.purpose_1);
    frappe.model.set_value(cdt, cdn, "quantity_1", item.quantity_1);

    frappe.model.set_value(cdt, cdn, "collection_2", item.collection_2);
    frappe.model.set_value(cdt, cdn, "supplier_2", item.supplier_2);
    frappe.model.set_value(cdt, cdn, "name_2", item.name_2);
    frappe.model.set_value(cdt, cdn, "design_2", item.design_2);
    frappe.model.set_value(cdt, cdn, "color_2", item.color_2);
    frappe.model.set_value(cdt, cdn, "purpose_2", item.purpose_2);
    frappe.model.set_value(cdt, cdn, "quantity_2", item.quantity_2);

    frappe.model.set_value(cdt, cdn, "collection_3", item.collection_3);
    frappe.model.set_value(cdt, cdn, "supplier_3", item.supplier_3);
    frappe.model.set_value(cdt, cdn, "name_3", item.name_3);
    frappe.model.set_value(cdt, cdn, "design_3", item.design_3);
    frappe.model.set_value(cdt, cdn, "color_3", item.color_3);
    frappe.model.set_value(cdt, cdn, "purpose_3", item.purpose_3);
    frappe.model.set_value(cdt, cdn, "quantity_3", item.quantity_3);

    // pillows

    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_1", item.divan_pillow_collection_1);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_supplier", item.divan_pcollection_1_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_name", item.divan_pcollection_1_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_damaska_color", item.divan_pcollection_1_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_number", item.divan_pcollection_1_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_design", item.divan_pcollection_1_design);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_quantity", item.divan_pcollection_1_quantity);

    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_2", item.divan_pillow_collection_2);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_supplier", item.divan_pcollection_2_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_name", item.divan_pcollection_2_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_damaska_color", item.divan_pcollection_2_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_number", item.divan_pcollection_2_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_design", item.divan_pcollection_2_design);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_quantity", item.divan_pcollection_2_quantity);

    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_3", item.divan_pillow_collection_3);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_supplier", item.divan_pcollection_3_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_name", item.divan_pcollection_3_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_damaska_color", item.divan_pcollection_3_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_number", item.divan_pcollection_3_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_design", item.divan_pcollection_3_design);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_quantity", item.divan_pcollection_3_quantity);

    // legs

    frappe.model.set_value(cdt, cdn, "legs_model", item.legs_model);
    frappe.model.set_value(cdt, cdn, "legs_size", item.legs_size);
    frappe.model.set_value(cdt, cdn, "divan_legs_number", item.divan_legs_number);
    frappe.model.set_value(cdt, cdn, "legs_color", item.legs_color);
    frappe.model.set_value(cdt, cdn, "legs_supplier", item.legs_supplier);
    frappe.model.set_value(cdt, cdn, "legs_image", item.legs_image);
    frappe.model.set_value(cdt, cdn, "divan_legs_other", item.divan_legs_other);

    // Bed

    frappe.model.set_value(cdt, cdn, "bed_model", item.bed_model);
    frappe.model.set_value(cdt, cdn, "bed_lenth", item.bed_lenth);
    frappe.model.set_value(cdt, cdn, "bed_height", item.bed_height);
    frappe.model.set_value(cdt, cdn, "bed_depth", item.bed_depth);

    // cargi

    frappe.model.set_value(cdt, cdn, "cargi_model", item.cargi_model);
    frappe.model.set_value(cdt, cdn, "cargi_design", item.cargi_design);
    frappe.model.set_value(cdt, cdn, "cargi_height", item.cargi_height);
    frappe.model.set_value(cdt, cdn, "cargi_weight", item.cargi_weight);

    // matrac

    frappe.model.set_value(cdt, cdn, "matrac_lenght", item.matrac_lenght);
    frappe.model.set_value(cdt, cdn, "matrac_width", item.matrac_width);
    frappe.model.set_value(cdt, cdn, "matrac_weight", item.matrac_weight);

    // sitting_height

    frappe.model.set_value(cdt, cdn, "sit_height", item.sit_height);

    // sitting_depth_matrac

    frappe.model.set_value(cdt, cdn, "matrac_sitting_depth", item.matrac_sitting_depth);

    // inner_construction

    frappe.model.set_value(cdt, cdn, "from_dimela", item.from_dimela);
    frappe.model.set_value(cdt, cdn, "inner_construction_material", item.inner_construction_material);
    frappe.model.set_value(cdt, cdn, "inner_construction_bottom", item.inner_construction_bottom);
    frappe.model.set_value(cdt, cdn, "inner_construction_mechanic", item.inner_construction_mechanic);

    // undermatric_frame

    frappe.model.set_value(cdt, cdn, "undermatric_frame_from_dimela", item.undermatric_frame_from_dimela);
    frappe.model.set_value(cdt, cdn, "undermatric_order", item.undermatric_order);
    frappe.model.set_value(cdt, cdn, "undermatric_metal", item.undermatric_metal);
    frappe.model.set_value(cdt, cdn, "undermatric_wood", item.undermatric_wood);
    frappe.model.set_value(cdt, cdn, "undermatric_lifting_mechanic", item.undermatric_lifting_mechanic);
    frappe.model.set_value(cdt, cdn, "undermatric_no_mechanic", item.undermatric_no_mechanic);

    // mechanic

    frappe.model.set_value(cdt, cdn, "name_or_catalog_number", item.name_or_catalog_number);
    frappe.model.set_value(cdt, cdn, "mechanic_supplier", item.mechanic_supplier);

    // pillow_or_pane

    frappe.model.set_value(cdt, cdn, "pptype", item.pptype);
    frappe.model.set_value(cdt, cdn, "ppmodel", item.ppmodel);
    frappe.model.set_value(cdt, cdn, "bodna", item.bodna);

    // pillow_or_pane_size

    frappe.model.set_value(cdt, cdn, "pp_lenght", item.pp_lenght);
    frappe.model.set_value(cdt, cdn, "pp_height", item.pp_height);
    frappe.model.set_value(cdt, cdn, "pp_thickness", item.pp_thickness);

    // tabla

    frappe.model.set_value(cdt, cdn, "tabla_attachable", item.tabla_attachable);
    frappe.model.set_value(cdt, cdn, "tabla_depth", item.tabla_depth);
    frappe.model.set_value(cdt, cdn, "tabla_height", item.tabla_height);
    frappe.model.set_value(cdt, cdn, "tabla_model", item.tabla_model);
    frappe.model.set_value(cdt, cdn, "tabla_seeable_back", item.tabla_seeable_back);
    frappe.model.set_value(cdt, cdn, "tabla_width", item.tabla_width);
}