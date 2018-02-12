# -*- coding: utf-8 -*-
# Copyright (c) 2018, InspireSoft and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class Itemmodification(Document):
    pass


@frappe.whitelist()
def get_modification(name):
    mod = frappe.db.sql("""SELECT * FROM `tabItem modification` WHERE `name1`=%s""", (name), as_dict=True)
    if len(mod) <= 0:
        return {}
    return mod[0]
