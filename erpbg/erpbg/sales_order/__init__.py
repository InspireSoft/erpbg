import frappe
import json


@frappe.whitelist()
def get_bomed_items(sales_order_name):
    '''Returns items with BOM that already do not have a linked Sales Order'''
    items = []
    sales_order_items = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `parent`=%s""", (sales_order_name), as_dict=True)

    for item in sales_order_items:
        bom = get_default_bom_item_object(str(item["item_code"]))
        if bom:
            items.append(dict(
                item_code=str(item["item_code"]),
                sales_order=sales_order_name,
                warehouse=str(item["warehouse"])
            ))
    return items


def get_default_bom_item_object(item_code):
    bom = frappe.get_all('BOM', dict(item=item_code, is_active=True),
                         order_by='is_default desc')
    bom = bom[0].name if bom else None
    return bom


@frappe.whitelist()
def make_boms(items, sales_order, company):
    '''Make BOMs against the given Sales Order for the given `items`'''
    items = json.loads(items).get('items')
    out = []

    for i in items:
        if not i.get("pending_qty"):
            frappe.throw(_("Please select Qty against item {0}").format(i.get("item_code")))

        bom = frappe.get_doc(dict(
            doctype='BOM',
            production_item=i['item_code'],
            quantity=i['pending_qty'],
            company=company,
            sales_order=sales_order,
            fg_warehouse=i['warehouse']
        )).insert()
    bom.ignore_permissions = True
    bom.flags.ignore_mandatory = True
    bom.save()
    out.append(bom)

    return [p.name for p in out]


@frappe.whitelist()
def get_sales_order_item(item_name, sales_order):
    soi = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `item_name`=%s AND `parent`=%s""", (item_name, sales_order), as_dict=True)
    return soi[0]
