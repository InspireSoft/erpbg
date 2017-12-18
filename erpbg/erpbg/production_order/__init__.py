import frappe
import datetime


@frappe.whitelist()
def generate_custom_number(production_item, sales_order):
    soi = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `item_name`=%s `parent`=%s""", (production_item, sales_order))
    return soi[0]
