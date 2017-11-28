import frappe


@frappe.whitelist()
def generate_custom_number():
    number = "test"
    return number