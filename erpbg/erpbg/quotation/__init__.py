import frappe


@frappe.whitelist()
def generate_custom_number(customer):
    number = ""
    quotations = frappe.db.get_values("Quotation", {"customer": ("==", customer)}, "*")
    if len(quotations) > 0:
        number += str(len(quotations)).zfill(2) + "-"
    customer = frappe.db.get_values("Customer", customer, "*")[0]
    if customer.customer_commision > 0:
        if len(number) > 0:
            number += "-"
        number += "01"+customer.customer_commision
    if customer.customer_cnumber:
        if len(number) > 0:
            number += "-"
        number += customer.customer_cnumber
    return number