#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import json
from frappe import _



@frappe.whitelist()
def get_doc_from_print(doctype, docname):

    html = "<b>test</b>"

    from werkzeug.wrappers import Response
    response = Response()
    response.mimetype = 'application/msword'
    response.charset = 'utf-8'
    response.data = html
    return response