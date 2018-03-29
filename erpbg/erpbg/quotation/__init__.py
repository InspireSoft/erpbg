#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import datetime


@frappe.whitelist()
def generate_custom_number(qname, customer):
    if not customer:
        return

    if len(qname) > 0:
        quotation = frappe.db.get_values("Quotation", qname, "*", as_dict=True)[0]
        if quotation.customer == customer:
            return quotation.cnumber

    return generate_cnumber(customer, len(qname) > 0)


def generate_cnumber(customer, generatedQuotation):
    number = ""
    quotations = frappe.db.sql(
        '''SELECT `name`,`transaction_date` FROM `tabQuotation` WHERE `customer`=%s AND `transaction_date` LIKE %s;''',
        (customer,
         str(datetime.datetime.now().strftime("%Y")) + "-" + str(datetime.datetime.now().strftime("%m")) + "%"),
        as_dict=True)

    if len(quotations) > 0:
        year_and_month = str(quotations[0].transaction_date)[0:7]
    else:
        year_and_month = datetime.datetime.now().strftime("%Y-%m")

    number_of_quotations_that_month = len(quotations) + 1
    if generatedQuotation:
        number_of_quotations_that_month -= 1
        that_month_number = str(datetime.datetime.now().strftime("%m"))
    else:
        that_month_number = year_and_month[-2:]
    number += str(number_of_quotations_that_month).zfill(2) + that_month_number

    customer = frappe.db.get_values("Customer", customer, "*")[0]
    number += "-"
    if customer.customer_commision > 0:
        number += "90" + str(customer.customer_commision)
    elif customer.customer_commision <= 0:
        number += "01"
    if customer.customer_cnumber:
        if len(number) > 0:
            number += "-"
        number += str(customer.customer_cnumber)

    return number


@frappe.whitelist()
def make_quick_quotation(customer_name, contact_name, email, communication):

    # check for existing contact
    contact = frappe.db.sql('''SELECT `name` FROM `tabContact` WHERE `name`=%s;''', (contact_name), as_dict=True)

    # check for existing customer
    customer = frappe.db.sql('''SELECT `name` FROM `tabCustomer` WHERE `name`=%s;''', (customer_name), as_dict=True)

    if customer:
        has_customer = True
    else:
        has_customer = False

    if contact:
        has_contact = True
    else:
        has_contact = False

    if not customer:
        # create customer
        customer = frappe.new_doc("Customer")
        customer.docname = customer_name
        customer.customer_name = customer_name
        customer.save()
    else:
        customer = customer[0]

    if not contact:
        # create contact
        contact = frappe.new_doc("Contact")
        contact.name = contact_name + "-" + customer_name
        contact.first_name = contact_name
        contact.last_name = ""
        contact.email_id = email
        contact.save()
    else:
        contact = contact[0]

    if not has_contact or not has_customer:
        # link contact to customer
        link = frappe.get_doc(dict(
            doctype = "Dynamic Link",
            parentfield = "links",
            parenttype = "Contact",
            parent = contact.name,
            link_doctype = "Customer",
            link_name = customer.name
        ))
        link.flags.ignore_permissions = True
        link.save()


    # create quotation
    quotation = frappe.new_doc("Quotation")
    quotation.communicationlink = communication
    quotation.customer = customer.name
    quotation.cnumber = generate_cnumber(customer.name, False)
    quotation.title = quotation.cnumber
    quotation.transaction_date = str(datetime.datetime.now().strftime("%Y")) + "-" + str(datetime.datetime.now().strftime("%m")) + "-" + str(datetime.datetime.now().strftime("%d"))
    quotation.flags.ignore_mandatory = True
    quotation.flags.ignore_permissions = True
    quotation.save()

    taxes = frappe.new_doc("Sales Taxes and Charges")
    taxes.parent = quotation.name
    taxes.charge_type = "On Net Total"
    taxes.account_head = u"ДДС 20% - DD"
    taxes.docstatus = 0
    taxes.parentfield = "taxes"
    taxes.parenttype = "Quotation"
    taxes.idx = 1
    taxes.description = u"ДДС 20%"
    taxes.rate = 20.000000
    taxes.save()

    payment1 = frappe.new_doc("Payment ways")
    payment2 = frappe.new_doc("Payment ways")
    payment3 = frappe.new_doc("Payment ways")

    payment1.idx = 1
    payment2.idx = 2
    payment3.idx = 3

    payment1.docstatus = 0
    payment2.docstatus = 0
    payment3.docstatus = 0

    payment1.parent = quotation.name
    payment2.parent = quotation.name
    payment3.parent = quotation.name

    payment1.parentfield = "payment_ways"
    payment2.parentfield = "payment_ways"
    payment3.parentfield = "payment_ways"

    payment1.parenttype = "Quotation"
    payment2.parenttype = "Quotation"
    payment3.parenttype = "Quotation"

    payment1.description = u"50% авансово плащане"
    payment2.description = u"50% при издаване на готово изделие"
    payment3.description = u"Банкова сметка на „Димела мебел”ООД:\nIBAN: BG55BPBI79421022579401\nБАНКА: Пощенска Банка\nБулстат: 204948360"

    payment1.save()
    payment2.save()
    payment3.save()

    frappe.db.commit()

    return [quotation.name, quotation.title, customer.name, contact.name]


@frappe.whitelist()
def copy_attachments(qname, communicationlink):
    existing_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Quotation' AND `attached_to_name`=%s""", (qname), as_dict=True)
    if len(existing_attachments) > 0:
        return False

    cattachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Communication' AND `attached_to_name`=%s""", (communicationlink), as_dict=True)
    if len(cattachments)<=0:
        return "None"
    qattachments = []
    for cattachment in cattachments:
        qattachment = frappe.new_doc("File")
        qattachment.update(cattachment)
        qattachment.attached_to_name = qname
        qattachment.attached_to_doctype = "Quotation"
        qattachment.save(ignore_permissions=True)
        qattachments.append(qattachment)
        frappe.db.commit()
    return qattachments


@frappe.whitelist()
def get_item_note(item_code):
    item = frappe.db.sql("""SELECT `note` FROM `tabItem` WHERE `item_code`=%s""", (item_code), as_dict=True)
    if len(item) > 1:
        item = item[0]
    return item
    if "note" not in item:
        return "none"
    return item.note

