#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe


@frappe.whitelist()
def mark_as_seen(cname):
    com = frappe.get_doc("Communication", cname)
    com.seen = 1
    com.save()
    return 1

