#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import json
from frappe import _


@frappe.whitelist()
def get_bomed_items(sales_order_name):
    '''Returns items with BOM that already do not have a linked Sales Order'''
    items = []
    sales_order_items = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `parent`=%s""", (sales_order_name), as_dict=True)

    for item in sales_order_items:
        bom = get_default_bom_item_object(str(item["item_code"]))
        if bom:
            items.append(dict(
                item_code=str(item["item_code"]),
                sales_order=sales_order_name,
                warehouse=str(item["warehouse"])
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
def get_quotation_attachments(quotation_name, sales_order_name):
    existing_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Sales Order' AND `attached_to_name`=%s""", (sales_order_name), as_dict=True)
    if len(existing_attachments) > 0:
        return False

    qattachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Quotation' AND `attached_to_name`=%s""", (quotation_name), as_dict=True)
    sattachments = []
    for qattachment in qattachments:
        sattachment = frappe.new_doc("File")
        sattachment.update(qattachment)
        sattachment.attached_to_name = sales_order_name
        sattachment.attached_to_doctype = "Sales Order"
        sattachment.save(ignore_permissions=True)
        sattachments.append(sattachment)
        frappe.db.commit()
    return sattachments


def divan_pillow_collection(item, number):
    html = ""
    space = False
    if item["divan_pcollection_" + str(number) + "_supplier"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Доставчик " + item["divan_pcollection_" + str(number) + "_supplier"]

    if item["divan_pcollection_" + str(number) + "_design"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Дезайн " + item["divan_pcollection_" + str(number) + "_design"]

    if item["divan_pcollection_" + str(number) + "_name"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += " " + item["divan_pcollection_" + str(number) + "_name"]

    if item["divan_pcollection_" + str(number) + "_damaska_color"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Дамаска цвят: " + item["divan_pcollection_" + str(number) + "_damaska_color"]

    if item["divan_pcollection_" + str(number) + "_quantity"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Дамаска количество: " + item["divan_pcollection_" + str(number) + "_quantity"] + " л.м."

    if item["divan_pcollection_" + str(number) + "_number"]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += str(item["divan_pcollection_" + str(number) + "_number"]) + u" броя"

    return html


def collection(item, number):
    html = ""

    space = False
    if item["name_" + str(number)]:
        html += " " + item["name_" + str(number)]

    if item["purpose_" + str(number)]:
        if space:
            html += " "
        else:
            html += " "
            space = True
        html += u"(приложение - " + item["purpose_" + str(number)] + ")"

    if item["color_" + str(number)]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Цвят: " + item["color_" + str(number)]

    if item["supplier_" + str(number)]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += u"Доставчик: " + item["supplier_" + str(number)]

    if item["quantity_" + str(number)]:
        if space:
            html += ", "
        else:
            html += " "
            space = True
        html += item["quantity_" + str(number)] + u" броя"

    return html


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
    docs = frappe.db.get_values("Sales Order", {"name":("in", names)}, "*", as_dict=True, order_by="execution_date_limit")

    # header
    html += u"<h1 align=center> Поръчки "
    if len(docs) > 0:
        if docs[0].execution_date_limit:
            html += u"от " + str(docs[0].execution_date_limit.strftime("%d") + "-" + docs[0].execution_date_limit.strftime("%m") + "-" + docs[0].execution_date_limit.strftime("%Y")) + u"г. "
        if len(docs) > 1 and docs[len(docs) - 1].execution_date_limit:
            html += u"до " + str(docs[len(docs) - 1].execution_date_limit.strftime("%d") + "-" + docs[len(docs) - 1].execution_date_limit.strftime("%m") + "-" + docs[len(docs) - 1].execution_date_limit.strftime("%Y")) + u"г. "
    html += "</h1><br/><br/>"

    # doc info and attachments
    for doc in docs:
        attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Sales Order' AND `attached_to_name`=%s;""", (doc.name), as_dict=True)
        items = frappe.db.sql("""SELECT * FROM `tabSales Order Item` WHERE `parent`=%s;""", (doc.name), as_dict=True)

        # doc name
        html += "<font style='font-weight: bold'>" + doc.title + "</font>"

        # doc date
        info = False
        if doc.execution_date_limit:
            if not info:
                html += " - "
            info = True
            html += u"Срок "
            date = str(doc.execution_date_limit.strftime("%d") + "-" + doc.execution_date_limit.strftime("%m") + "-" + doc.execution_date_limit.strftime("%Y"))
            import datetime
            d = datetime.now()
            now = '-'.join(str(x) for x in (d.day, d.month, d.year))
            html += "<font"
            if datetime.strptime(now, "%d/%m/%Y") >= datetime.strptime(date, "%d/%m/%Y"):
                html += " color='red'"
            html += ">"+date + u"г. </font>"

        # doc item info and type image
        html += "<br/>"
        for item in items:
            # doc item name
            html += "<div style='padding-left: 30px; padding-right: 30px;'>- " + item.item_name + u"; описание: " + item.cdescription + "<br/>"
            image = frappe.db.sql("""SELECT `image` FROM `tabItem` WHERE `name`='%s';""", (item.name), as_dict=True)

            # doc item koja section
            koja = False
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
                koja = True
            if koja:
                html += u" от:<br/>"
                if item.collection_1:
                    koja = False
                    html += u"Колекция: "
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
                    html += " " + collection(item, 1) + "<br/>"
                if item.collection_2:
                    koja = False
                    html += u"Колекция: "
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
                    html += " " + collection(item, 2) + "<br/>"
                if item.collection_3:
                    koja = False
                    html += u"Колекция: "
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
                    html += " " + collection(item, 3) + "<br/>"

            # doc item pillow section
            if item.divan_pillow_collection_1:
                html += u"Колекция декоративни възглавници:"
                html += divan_pillow_collection(item, 1) + "<br/>"
            if item.divan_pillow_collection_2:
                html += u"Колекция декоративни възглавници:"
                html += divan_pillow_collection(item, 2) + "<br/>"
            if item.divan_pillow_collection_3:
                html += u"Колекция декоративни възглавници:"
                html += divan_pillow_collection(item, 3) + "<br/>"

            # doc item type image
            html += "</div>"
            if item.divan_modification or image:
                html += "<div style='margin-left: auto; margin-right: auto; display: block; text-align: center;'>"
                if item.divan_modification:
                    html += "<img src='/private/files/divan_" + item.divan_modification + "' alt='' style='vertical-align: top;max-height: 600px;' />"
                if image:
                    html += "<img src='/private/files/divan_" + item.image + "' alt='' style='vertical-align: top;max-height: 600px;' />"
                html += "</div><br/>"

        # doc attachment images
        if len(attachments) > 0:
            html += "<div style='margin-left: auto; margin-right: auto; display: block; text-align: center;'>"
            for doc_file in attachments:
                html += "<img src='" + doc_file.file_url + "' alt='' style='vertical-align: top;max-height: 600px;' />"
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
