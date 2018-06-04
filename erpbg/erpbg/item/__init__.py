import frappe


@frappe.whitelist()
def update_price_list(iname, iprice):
    item = frappe.db.sql("""SELECT * FROM `tabItem` WHERE `name`=%s""", (iname), as_dict=True)
    item = item[0]

    price_check = frappe.db.sql("""SELECT * FROM `tabItem Price` WHERE `price_list`='Standard Selling' AND `item_code`=%s""", (item.item_code), as_dict=True)
    if price_check and price_check[0]:
        price_check = price_check[0]
        frappe.db.sql("""UPDATE `tabItem Price` SET `price_list_rate`=%s WHERE `price_list`='Standard Selling' AND `name`=%s""",
                      (iprice, price_check.name))
    else:
        price = frappe.new_doc("Item Price")
        price.currency = "BGN"
        price.item_name = iname
        price.item_code = item.item_code
        price.selling = 1
        price.price_list = "Standard Selling"
        price.item_description = item.description
        price.price_list_rate = iprice
        price.save()


@frappe.whitelist()
def generate_code():
    import random
    code = 0
    free = 0
    itera = 0
    max = 999999
    while free == 0 and itera < max:
        code = random.randint(1, max)
        item = frappe.db.sql("""SELECT * FROM `tabItem` WHERE `item_code`=%s""", (code), as_dict=True)
        if not item or len(item) <= 0:
            free = 1
        itera += 1
    if code == 0:
        code = max + 1
        while free == 0:
            item = frappe.db.sql("""SELECT * FROM `tabItem` WHERE `item_code`=%s""", (code), as_dict=True)
            if not item or len(item) <= 0:
                free = 1
            code += 1
    return code