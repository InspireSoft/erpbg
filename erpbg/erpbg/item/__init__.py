import frappe


@frappe.whitelist()
def update_price_list(iname, iprice):
    item = frappe.db.sql("""SELECT * FROM `tabItem` WHERE `name`=%s""", (iname), as_dict=True)
    item = item[0]

    price_check = frappe.db.sql("""SELECT * FROM `tabItem Price` WHERE `price_list`='Standard Selling' AND `item_code`=%s""", (item.item_code), as_dict=True)
    if price_check and price_check[0]:
        price_check = price_check[0]
        price_check.rate = iprice
        price_check.save()
    else:
        price = frappe.new_doc("Item Price")
        price.currency = "BGN"
        price.item_name = iname
        price.item_code = item.item_code
        price.selling = 1
        price.price_list = "Standard Selling"
        price.item_description = item.description
        price.rate = iprice
        price.save()
