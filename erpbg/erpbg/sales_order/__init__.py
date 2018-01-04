import frappe
import json
import ast


@frappe.whitelist()
def get_bomed_items(sales_order_items_string, sales_order_name):
    '''Returns items with BOM that already do not have a linked Sales Order'''
    items = []
    sales_order_items = ast.literal_eval(sales_order_items_string)

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
            qty=i['pending_qty'],
            company=company,
            sales_order=sales_order,
            fg_warehouse=i['warehouse']
        )).insert()
    bom.set_production_order_operations()
    bom.save()
    out.append(bom)

    return [p.name for p in out]
