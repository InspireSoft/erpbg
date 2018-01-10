import frappe


@frappe.whitelist()
def make_production_order(doc_name):
    bom = frappe.db.sql("""SELECT * FROM `tabBOM` WHERE `name`=%s""", (doc_name), as_dict=True)
    if not bom:
        return "False"
    bom = bom[0]
    production_order = frappe.get_doc(dict(
        doctype='Production Order',
        production_item=bom.item_name,
        qty=bom.quantity,
        company=bom.company,
        sales_order=bom.sales_order,
        fg_warehouse=bom.fg_warehouse,
        bom_no=bom.name
    )).insert()
    production_order.ignore_permissions = True
    production_order.flags.ignore_mandatory = True
    production_order.set_production_order_operations()
    production_order.save()
    return production_order