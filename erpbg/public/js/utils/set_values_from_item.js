

function set_values_from_item(cdt, cdn, soi) {

    // headers
console.error("copy headers");
    frappe.model.set_value(cdt, cdn, "type", soi.type);
    frappe.model.set_value(cdt, cdn, "divan_modification_link", soi.divan_modification_link);
    frappe.model.set_value(cdt, cdn, "divan_modification_image", soi.divan_modification_image);
    frappe.model.set_value(cdt, cdn, "note", soi.note);
    frappe.model.set_value(cdt, cdn, "cdescription", soi.cdescription);
    frappe.model.set_value(cdt, cdn, "description", soi.cdescription);
    frappe.model.set_value(cdt, cdn, "pulnej", soi.pulnej);
    frappe.model.set_value(cdt, cdn, "item_private_calculations", soi.item_private_calculations);

    // damaska / eko koja / estestvena koja
console.error("copy damaska / eko koja / estestvena koja");
    frappe.model.set_value(cdt, cdn, "damaska", soi.damaska);
    frappe.model.set_value(cdt, cdn, "seeable_back", soi.seeable_back);
    frappe.model.set_value(cdt, cdn, "estestvena_koja", soi.estestvena_koja);
    frappe.model.set_value(cdt, cdn, "eco_koja", soi.eco_koja);

    frappe.model.set_value(cdt, cdn, "collection_1", soi.collection_1);
    frappe.model.set_value(cdt, cdn, "supplier_1", soi.supplier_1);
    frappe.model.set_value(cdt, cdn, "name_1", soi.name_1);
    frappe.model.set_value(cdt, cdn, "design_1", soi.design_1);
    frappe.model.set_value(cdt, cdn, "color_1", soi.color_1);
    frappe.model.set_value(cdt, cdn, "purpose_1", soi.purpose_1);
    frappe.model.set_value(cdt, cdn, "quantity_1", soi.quantity_1);

    frappe.model.set_value(cdt, cdn, "collection_2", soi.collection_2);
    frappe.model.set_value(cdt, cdn, "supplier_2", soi.supplier_2);
    frappe.model.set_value(cdt, cdn, "name_2", soi.name_2);
    frappe.model.set_value(cdt, cdn, "design_2", soi.design_2);
    frappe.model.set_value(cdt, cdn, "color_2", soi.color_2);
    frappe.model.set_value(cdt, cdn, "purpose_2", soi.purpose_2);
    frappe.model.set_value(cdt, cdn, "quantity_2", soi.quantity_2);

    frappe.model.set_value(cdt, cdn, "collection_3", soi.collection_3);
    frappe.model.set_value(cdt, cdn, "supplier_3", soi.supplier_3);
    frappe.model.set_value(cdt, cdn, "name_3", soi.name_3);
    frappe.model.set_value(cdt, cdn, "design_3", soi.design_3);
    frappe.model.set_value(cdt, cdn, "color_3", soi.color_3);
    frappe.model.set_value(cdt, cdn, "purpose_3", soi.purpose_3);
    frappe.model.set_value(cdt, cdn, "quantity_3", soi.quantity_3);

    // pillows
console.error("copy pillows");
    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_1", soi.divan_pillow_collection_1);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_supplier", soi.divan_pcollection_1_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_name", soi.divan_pcollection_1_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_damaska_color", soi.divan_pcollection_1_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_number", soi.divan_pcollection_1_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_design", soi.divan_pcollection_1_purpose);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_1_quantity", soi.divan_pcollection_1_quantity);

    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_2", soi.divan_pillow_collection_2);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_supplier", soi.divan_pcollection_2_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_name", soi.divan_pcollection_2_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_damaska_color", soi.divan_pcollection_2_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_number", soi.divan_pcollection_2_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_design", soi.divan_pcollection_2_purpose);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_2_quantity", soi.divan_pcollection_2_quantity);

    frappe.model.set_value(cdt, cdn, "divan_pillow_collection_3", soi.divan_pillow_collection_3);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_supplier", soi.divan_pcollection_3_supplier);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_name", soi.divan_pcollection_3_name);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_damaska_color", soi.divan_pcollection_3_damaska_color);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_number", soi.divan_pcollection_3_number);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_design", soi.divan_pcollection_3_purpose);
    frappe.model.set_value(cdt, cdn, "divan_pcollection_3_quantity", soi.divan_pcollection_3_quantity);

    // legs
console.error("copy legs");
    frappe.model.set_value(cdt, cdn, "legs_model", soi.legs_model);
    frappe.model.set_value(cdt, cdn, "legs_size", soi.legs_size);
    frappe.model.set_value(cdt, cdn, "divan_legs_number", soi.divan_legs_number);
    frappe.model.set_value(cdt, cdn, "legs_color", soi.divan_legs_number);
    frappe.model.set_value(cdt, cdn, "legs_supplier", soi.divan_legs_number);
    frappe.model.set_value(cdt, cdn, "legs_image", soi.divan_legs_number);
    frappe.model.set_value(cdt, cdn, "divan_legs_other", soi.divan_legs_other);

    // Bed
console.error("copy Bed");
    frappe.model.set_value(cdt, cdn, "bed_model", soi.bed_model);
    frappe.model.set_value(cdt, cdn, "bed_lenth", soi.bed_lenth);
    frappe.model.set_value(cdt, cdn, "bed_height", soi.bed_height);
    frappe.model.set_value(cdt, cdn, "bed_depth", soi.bed_depth);

    // cargi
console.error("copy cargi");
    frappe.model.set_value(cdt, cdn, "cargi_model", soi.cargi_model);
    frappe.model.set_value(cdt, cdn, "cargi_design", soi.cargi_design);
    frappe.model.set_value(cdt, cdn, "cargi_height", soi.cargi_height);
    frappe.model.set_value(cdt, cdn, "cargi_weight", soi.cargi_weight);

    // matrac
console.error("copy matrac");
    frappe.model.set_value(cdt, cdn, "matrac_lenght", soi.matrac_lenght);
    frappe.model.set_value(cdt, cdn, "matrac_width", soi.matrac_width);
    frappe.model.set_value(cdt, cdn, "matrac_weight", soi.matrac_weight);

    // sitting_height
console.error("copy sitting_height");
    frappe.model.set_value(cdt, cdn, "sit_height", soi.sit_height);

    // sitting_depth_matrac
console.error("copy sitting_depth_matrac");
    frappe.model.set_value(cdt, cdn, "matrac_sitting_depth", soi.matrac_sitting_depth);

    // inner_construction
console.error("copy inner_construction");
    frappe.model.set_value(cdt, cdn, "from_dimela", soi.from_dimela);
    frappe.model.set_value(cdt, cdn, "inner_construction_material", soi.inner_construction_material);
    frappe.model.set_value(cdt, cdn, "inner_construction_bottom", soi.inner_construction_bottom);
    frappe.model.set_value(cdt, cdn, "inner_construction_mechanic", soi.inner_construction_mechanic);

    // undermatric_frame
console.error("copy undermatric_frame");
    frappe.model.set_value(cdt, cdn, "undermatric_frame_from_dimela", soi.undermatric_frame_from_dimela);
    frappe.model.set_value(cdt, cdn, "undermatric_order", soi.undermatric_order);
    frappe.model.set_value(cdt, cdn, "undermatric_metal", soi.undermatric_metal);
    frappe.model.set_value(cdt, cdn, "undermatric_wood", soi.undermatric_wood);
    frappe.model.set_value(cdt, cdn, "undermatric_lifting_mechanic", soi.undermatric_lifting_mechanic);
    frappe.model.set_value(cdt, cdn, "undermatric_no_mechanic", soi.undermatric_no_mechanic);

    // mechanic
console.error("copy mechanic");
    frappe.model.set_value(cdt, cdn, "name_or_catalog_number", soi.name_or_catalog_number);
    frappe.model.set_value(cdt, cdn, "mechanic_supplier", soi.mechanic_supplier);

    // pillow_or_pane
console.error("copy pillow_or_pane");
    frappe.model.set_value(cdt, cdn, "pptype", soi.pp_lenght);
    frappe.model.set_value(cdt, cdn, "ppmodel", soi.pp_height);
    frappe.model.set_value(cdt, cdn, "bodna", soi.pp_thickness);

    // pillow_or_pane_size
console.error("copy pillow_or_pane_size");
    frappe.model.set_value(cdt, cdn, "pp_lenght", soi.pp_lenght);
    frappe.model.set_value(cdt, cdn, "pp_height", soi.pp_height);
    frappe.model.set_value(cdt, cdn, "pp_thickness", soi.pp_thickness);

    // tabla
console.error("copy tabla");
    frappe.model.set_value(cdt, cdn, "tabla_attachable", soi.pp_lenght);
    frappe.model.set_value(cdt, cdn, "tabla_depth", soi.pp_height);
    frappe.model.set_value(cdt, cdn, "tabla_height", soi.pp_thickness);
    frappe.model.set_value(cdt, cdn, "tabla_model", soi.pp_thickness);
    frappe.model.set_value(cdt, cdn, "tabla_seeable_back", soi.pp_thickness);
    frappe.model.set_value(cdt, cdn, "tabla_width", soi.pp_thickness);
}