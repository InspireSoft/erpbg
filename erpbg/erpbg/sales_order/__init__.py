import frappe
import json


@frappe.whitelist()
def get_bom_items(doc):
    '''Returns items with BOM that already do not have a linked production order'''
    items = []

    for table in [doc.items, doc.packed_items]:
        for i in table:
            bom = get_default_bom_item(i.item_code)
            if bom:
                # stock_qty = i.qty if i.doctype == 'Packed Item' else i.stock_qty
                items.append(dict(
                    item_code= i.item_code,
                    bom = bom,
                    warehouse = i.warehouse,
                    # pending_qty= stock_qty - flt(frappe.db.sql('''select sum(qty) from `tabBOM`
                    #     where production_item=%s and sales_order=%s''', (i.item_code, doc.name))[0][0])
                ))

    return items



def get_default_bom_item(item_code):
	bom = frappe.get_all('BOM', dict(item=item_code, is_active=True),
			order_by='is_default desc')
	bom = bom[0].name if bom else None

	return bom

@frappe.whitelist()
def make_boms(items, sales_order, company, project=None):
	'''Make BOMs against the given Sales Order for the given `items`'''
	items = json.loads(items).get('items')
	out = []

	for i in items:
		if not i.get("pending_qty"):
			frappe.throw(_("Please select Qty against item {0}").format(i.get("item_code")))

		bom = frappe.get_doc(dict(
			doctype='BOM',
			production_item=i['item_code'],
			bom_no=i.get('bom'),
			qty=i['pending_qty'],
			company=company,
			sales_order=sales_order,
			project=project,
			fg_warehouse=i['warehouse']
		)).insert()
        bom.set_production_order_operations()
        bom.save()
        out.append(bom)

	return [p.name for p in out]