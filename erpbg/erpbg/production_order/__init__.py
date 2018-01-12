import frappe


@frappe.whitelist()
def get_sales_order_item(item_code, sales_order_name):
    soi = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `item_code`=%s AND `parent`=%s""", (item_code, sales_order_name), as_dict=True)
    return soi[0]


@frappe.whitelist()
def get_sales_order_attachments(production_order_name, sales_order_name):
    existing_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Production Order' AND `attached_to_name`=%s""", (production_order_name), as_dict=True)
    if len(existing_attachments) > 0:
        return False
    # Sales Order
    sattachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Sales Order' AND `attached_to_name`=%s""", (sales_order_name), as_dict=True)
    pattachments = []
    for sattachment in sattachments:
        pattachment = frappe.new_doc("File")
        pattachment.update(sattachment)
        pattachment.attached_to_name = production_order_name
        pattachment.attached_to_doctype = "Production Order"
        pattachment.save(ignore_permissions=True)
        pattachments.append(pattachment)
        frappe.db.commit()
    return pattachments
