import frappe
import datetime


@frappe.whitelist()
def generate_custom_number(qname, customer):

    number = ""

    if len(qname) == 0:
        year_and_month = str(datetime.datetime.now().strftime("%Y")) + "-" + str(datetime.datetime.now().strftime("%m"))
    else:
        quotation = frappe.db.get_values("Quotation", qname, "*", as_dict=True)[0]
        if quotation.customer == customer:
            return quotation.cnumber
        year_and_month = str(quotation.transaction_date)[0:7]

    quotations = frappe.db.sql('''SELECT `name` FROM `tabQuotation` WHERE `customer`=%s AND `transaction_date` LIKE %s;''',
                               (customer, year_and_month+"%"), as_dict=True)
    print ""
    print year_and_month
    print quotations
    print ""

    number_of_quotations_that_month = len(quotations) + 1
    if len(qname) > 0:
        number_of_quotations_that_month -= 1
        that_month_number = str(datetime.datetime.now().strftime("%m"))
    else:
        that_month_number = year_and_month[-2:]
    number += str(number_of_quotations_that_month).zfill(2) + that_month_number

    customer = frappe.db.get_values("Customer", customer, "*")[0]
    if customer.customer_commision > 0:
        if len(number) > 0:
            number += "-"
        number += "00" + str(customer.customer_commision)
    if customer.customer_cnumber:
        if len(number) > 0:
            number += "-"
        number += str(customer.customer_cnumber)
    return number
