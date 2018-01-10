import frappe


@frappe.whitelist()
def get_user_lang(user):
    return frappe.translate.get_user_lang(user)