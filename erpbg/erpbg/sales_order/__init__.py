#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import json
from frappe import _



def safe_str(obj):
    """ return the byte string representation of obj """
    try:
        return str(obj)
    except UnicodeEncodeError:
        # obj is unicode
        return str(unicode(obj).encode('utf-8')).decode('utf-8')


@frappe.whitelist()
def get_bomed_items(sales_order_name):
    '''Returns items with BOM that already do not have a linked Sales Order'''
    items = []
    sales_order_items = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `parent`=%s""", (sales_order_name), as_dict=True)

    for item in sales_order_items:
        bom = get_default_bom_item_object(safe_str(item["item_code"]))
        if bom:
            items.append(dict(
                item_code=safe_str(item["item_code"]),
                sales_order=sales_order_name,
                warehouse=safe_str(item["warehouse"])
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
        if not i.get("qty"):
            frappe.throw(_("Please select Qty against item {0}").format(i.get("item_code")))

        bom = frappe.new_doc("BOM")
        bom.item = i['item_code']
        bom.quantity = i['qty']
        bom.company = company
        bom.sales_order = sales_order
        bom.fg_warehouse = 'Stores - DD'
        bom.append("items", {
            'item_code': '-15',
            'qty': 1,
            'conversion_factor': 1.0,
            'rate': 0.01,
            'amount': 1
        })

        bom.ignore_permissions = True
        bom.insert()
        bom.save()
        bom.submit()

        out.append(bom)

    return [p.name for p in out]


@frappe.whitelist()
def get_sales_order_item(item_code, sales_order):
    soi = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `item_code`=%s AND `parent`=%s""", (item_code, sales_order), as_dict=True)
    return soi[0]


@frappe.whitelist()
def get_attachments_of_quotation(quotation_name, sales_order_name):
    existing_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Sales Order' AND `attached_to_name`=%s""", (sales_order_name), as_dict=True)
    if len(existing_attachments) > 0:
        return False

    qattachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Quotation' AND `attached_to_name`=%s""", (quotation_name), as_dict=True)
    sattachments = []
    for qattachment in qattachments:
        sattachment = frappe.new_doc("File")
        sattachment.update(qattachment)
        sattachment.name = None
        sattachment.attached_to_name = sales_order_name
        sattachment.attached_to_doctype = "Sales Order"
        sattachment.save(ignore_permissions=True)
        sattachments.append(sattachment)
        frappe.db.commit()
    return sattachments


@frappe.whitelist()
def copy_quotation_attachments(quotation_name, sales_order_name):
    existing_attachments = frappe.db.sql("""SELECT * FROM `tabSales Order Attachment` WHERE `parenttype`='Sales Order' AND `parent`=%s""", (sales_order_name), as_dict=True)
    if len(existing_attachments) > 0:
        return False

    qattachments = frappe.db.sql("""SELECT * FROM `tabQuotation Attachment` WHERE `parenttype`='Quotation' AND `parent`=%s""", (quotation_name), as_dict=True)
    sattachments = []
    id = 1
    for qattachment in qattachments:
        sattachment = frappe.new_doc("Sales Order Attachment")

        sattachment.modified = qattachment.modified
        sattachment.modified_by = qattachment.modified_by
        sattachment.attachment_name = qattachment.attachment_name
        sattachment.owner = qattachment.owner
        sattachment.attachment = qattachment.attachment
        sattachment.idx = id
        id = id + 1

        sattachment.name = None
        sattachment.parent = sales_order_name
        sattachment.parenttype = "Sales Order"
        sattachment.parentfield = "sales_order_attachment"
        sattachment.docstatus = 0
        sattachment.save(ignore_permissions=True)
        sattachments.append(sattachment)
        frappe.db.commit()
    return sattachments


def divan_pillow_collection(item, number):
    html = "<tr>"

    html += '<td style="width: 95px;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>'
    html += u"Колекция " + safe_str(number) + ": "
    html += "</b></td>"

    html += '<td style="border-bottom: 1px dotted black;min-width: 200px;text-align: center;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;">'
    if item["divan_pcollection_" + safe_str(number) + "_supplier"]:
        html += " " + safe_str(item["divan_pcollection_" + safe_str(number) + "_supplier"])
    if item["divan_pcollection_" + safe_str(number) + "_name"]:
        html += " " + safe_str(item["divan_pcollection_" + safe_str(number) + "_name"])
    if item["divan_pcollection_" + safe_str(number) + "_design"]:
        html += " " + safe_str(item["divan_pcollection_" + safe_str(number) + "_design"])
    if item["divan_pcollection_" + safe_str(number) + "_damaska_color"]:
        html += " " + safe_str(item["divan_pcollection_" + safe_str(number) + "_damaska_color"])
    html += '</td>'

    html += u'<td style="text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>л.м.</b></td>'
    if item["divan_pcollection_" + safe_str(number) + "_quantity"]:
        html += '<td style="border-bottom: 1px dotted black;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;">'
        html += safe_str(item["divan_pcollection_" + safe_str(number) + "_quantity"])
        html += '</td>'
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"></td></td>'

    if item["divan_pcollection_" + safe_str(number) + "_number"]:
        html += u'<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>Брой:</b>'
        html += safe_str(item["divan_pcollection_" + safe_str(number) + "_number"])
        html += "</td>"
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"></td>'

    html += "</tr><tr>"

    html += u'<td style="width: 90px;text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>поръчан на</b>: </td>'
    if item["divan_pcollection_" + safe_str(number) + "_ordered_on"]:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;">'
        html += item["divan_pcollection_" + safe_str(number) + "_ordered_on"].strftime("%d") + "." + item["divan_pcollection_" + safe_str(number) + "_ordered_on"].strftime("%m") + "." + item["divan_pcollection_" + safe_str(number) + "_ordered_on"].strftime("%Y")
        html += '</div></td>'
    else:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;"></div></td>'

    html += u'<td colspan="2" style="text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>при нас на</b>: </td>'
    if item["divan_pcollection_" + safe_str(number) + "_arraiving_on"]:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;">'
        html += item["divan_pcollection_" + safe_str(number) + "_arraiving_on"].strftime("%d") + "." + item["divan_pcollection_" + safe_str(number) + "_arraiving_on"].strftime("%m") + "." + item["divan_pcollection_" + safe_str(number) + "_arraiving_on"].strftime("%Y")
        html += '</div></td>'
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;"></div></td>'

    return html + "</tr>"


def collection(item, number):
    html = "<tr>"

    html += '<td style="width: 95px;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>'
    html += u"Колекция " + safe_str(number) + ": "
    html += "</b></td>"

    html += '<td style="border-bottom: 1px dotted black;min-width: 200px;text-align: center;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;">'
    if item["supplier_" + safe_str(number)]:
        html += " " + safe_str(item["supplier_" + safe_str(number)])
    if item["name_" + safe_str(number)]:
        html += " " + safe_str(item["name_" + safe_str(number)])
    if item["design_" + safe_str(number)]:
        html += " " + safe_str(item["design_" + safe_str(number)])
    if item["color_" + safe_str(number)]:
        html += " " + safe_str(item["color_" + safe_str(number)])
    html += '</td>'

    html += u'<td style="text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>л.м.</b></td>'
    if item["quantity_" + safe_str(number)]:
        html += '<td style="border-bottom: 1px dotted black;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;">'
        html += safe_str(item["quantity_" + safe_str(number)])
        html += '</td>'
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"></td></td>'

    if item["purpose_" + safe_str(number)]:
        html += u'<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>за:</b>'
        html += safe_str(item["purpose_" + safe_str(number)])
        html += "</td>"
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"></td>'

    html += "</tr><tr>"

    html += u'<td style="width: 90px;text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>поръчан на</b>: </td>'
    if item["ordered_on_" + safe_str(number)]:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;">'
        html += item["ordered_on_" + safe_str(number)].strftime("%d") + "." + item["ordered_on_" + safe_str(number)].strftime("%m") + "." + item["ordered_on_" + safe_str(number)].strftime("%Y")
        html += '</div></td>'
    else:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;"></div></td>'

    html += u'<td colspan="2" style="text-align: right;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><b>при нас на</b>: </td>'
    if item["arraiving_on_" + safe_str(number)]:
        html += '<td style="text-align: left;padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;">'
        html += item["arraiving_on_" + safe_str(number)].strftime("%d") + "." + item["arraiving_on_" + safe_str(number)].strftime("%m") + "." + item["arraiving_on_" + safe_str(number)].strftime("%Y")
        html += '</div></td>'
    else:
        html += '<td style="padding-bottom: 0px !important;padding-top: 0px !important;margin-top: 0px !important;margin-bottom: 0px !important;"><div style="border-bottom: 1px dotted black; width:70px;height: 18px;"></div></td>'

    return html+"</tr>"


@frappe.whitelist()
def make_report(names):
    import json
    if names[0] != "[":
        names = [names]
    else:
        names = json.loads(names)

    # setup html tags
    html = "<html><head><title>Print Report</title></head><body style='margin: 0; padding-left: 100px; padding-right: 100px;'>"
    # get all docs
    docs = frappe.db.get_values("Sales Order", {"name":("in", names)}, "*", as_dict=True, order_by="delivery_date")

    # header
    html += u"<h1 align=center> Поръчки "
    if len(docs) > 0:
        if docs[0].delivery_date:
            if len(docs) > 1 and docs[len(docs) - 1].delivery_date:
                html += u"от "
            else:
                html += u"за ";
            html += safe_str(docs[0].delivery_date.strftime("%d") + "-" + docs[0].delivery_date.strftime("%m") + "-" + docs[0].delivery_date.strftime("%Y")) + u"г. "
        if len(docs) > 1 and docs[len(docs) - 1].delivery_date:
            html += u"до " + safe_str(docs[len(docs) - 1].delivery_date.strftime("%d") + "-" + docs[len(docs) - 1].delivery_date.strftime("%m") + "-" + docs[len(docs) - 1].delivery_date.strftime("%Y")) + u"г. "
    html += "</h1><br/><br/>"

    # doc info and attachments
    for doc in docs:
        attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Sales Order' AND `attached_to_name`=%s;""", (doc.name), as_dict=True)
        items = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `parent`=%s;""", (doc.name), as_dict=True)

        # doc name
        html += "<font style='font-weight: bold'>" + doc.title + "</font>"

        # doc date
        info = False
        if doc.delivery_date:
            if not info:
                html += " - "
            info = True
            html += u"Срок "
            date = safe_str(doc.delivery_date.strftime("%d") + "-" + doc.delivery_date.strftime("%m") + "-" + doc.delivery_date.strftime("%Y"))
            import datetime
            d = datetime.datetime.now()
            now = '-'.join(safe_str(x) for x in (d.day, d.month, d.year))
            html += "<font"
            if datetime.datetime.strptime(now, "%d-%m-%Y") >= datetime.datetime.strptime(date, "%d-%m-%Y"):
                html += " color='red'"
            html += ">"+date + u"г. </font>"

        # doc item info and type image
        html += "<br/>"
        for item in items:
            # doc item name
            html += "<div style='padding-left: 30px; padding-right: 30px;'>- " + item.item_name + u"; описание: " + item.cdescription + "<br/>"

            # doc item koja section
            if item.estestvena_koja or item.eco_koja or item.damaska:
                koja = False
                html += "<b>"
                if item.estestvena_koja:
                    html += u"Естествена кожа"
                    koja = True
                if item.eco_koja:
                    if koja:
                        html += ", "
                    html += u"Еко кожа"
                    koja = True
                if item.damaska:
                    if koja:
                        html += ", "
                    html += u"Дамаска"
                html += u" от Димела</b>"

                if item.collection_1 or item.collection_2 or item.collection_3:
                    html += '<table style="width:100%;border-collapse: collapse;border 0px;">'
                if item.collection_1:
                    html += collection(item, 1)
                if item.collection_2:
                    html += collection(item, 2)
                if item.collection_3:
                    html += collection(item, 3)
                if item.collection_1 or item.collection_2 or item.collection_3:
                    html += "</table>"

            # doc item pillow section

            if item.collection_1 or item.collection_2 or item.collection_3:
                    html += '<b>Декоративни възглавници</b><table style="width:100%;border-collapse: collapse;border 0px;">'
            if item.divan_pillow_collection_1:
                html += divan_pillow_collection(item, 1)
            if item.divan_pillow_collection_2:
                html += divan_pillow_collection(item, 2)
            if item.divan_pillow_collection_3:
                html += divan_pillow_collection(item, 3)
            if item.divan_pillow_collection_1 or item.divan_pillow_collection_2 or item.divan_pillow_collection_3:
                html += "</table>"

            # doc item type image
            html += "</div>"
            if item.divan_modification or item.image:
                html += "<div style='margin-left: auto; margin-right: auto; display: block; text-align: center;'>"
                if item.divan_modification:
                    html += "<img src='/private/files/divan_" + item.divan_modification + "' alt='' style='vertical-align: top;max-height: 150px;' />"
                if item.image:
                    html += "<img src='/private/files/divan_" + item.image + "' alt='' style='vertical-align: top;max-height: 150px;' />"
                html += "</div><br/>"

        # doc attachment images
        if len(attachments) > 0:
            html += "<div style='margin-left: auto; margin-right: auto; display: block; text-align: center;'>"
            for doc_file in attachments:
                html += "<img src='" + doc_file.file_url + "' alt='' style='vertical-align: top;max-height: 150px;' />"
            html += "</div><br/>"
        html += "<br/>"

    # html end tags
    html += "</body></html>"

    from werkzeug.wrappers import Response
    response = Response()
    response.mimetype = 'text/html'
    response.charset = 'utf-8'
    response.data = html

    return response
