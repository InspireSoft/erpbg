# -*- coding: utf-8 -*-
# Copyright (c) 2018, InspireSoft and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class Itemmodification(Document):
    pass


@frappe.whitelist()
def get_modification_image(name):
    image = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`='Item modification' AND `attached_to_name`=%s""", (name), as_dict=True)
    if len(image) <= 0:
        return {}
    return image[0]
