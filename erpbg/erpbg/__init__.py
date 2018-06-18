#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from werkzeug.wrappers import Response
import sys, traceback



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    try:
        doc = frappe.get_doc(doctype, docname)
        html = frappe.get_print(doctype=doc.doctype, name=doc.name, doc=doc)

        response = Response()
        response.mimetype = 'application/msword'
        response.charset = 'utf-8'
        response.filename = "{name}.doc".format(name=doc.title.replace(" ", "-").replace("/", "-"))
        response.data = html
    except Exception as e:
        return traceback.format_exc().splitlines()
    return response